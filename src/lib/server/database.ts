// Database client and utilities for Maxxes
import prismaPkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

const { PrismaClient } = prismaPkg;

// Singleton pattern for Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

function createPrismaClient() {
  // pg.Pool only speaks raw postgres. If DATABASE_URL is a `prisma+postgres://`
  // proxy URL (from `prisma dev`), fall back to the embedded raw-postgres port.
  const envUrl = env.DATABASE_URL;
  const connectionString = envUrl && envUrl.startsWith('postgres://')
    ? envUrl
    : 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable';
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: dev ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (dev) globalForPrisma.prisma = db;

// Helper functions for common database operations

export async function getUserByFanId(fanId: string) {
  return await db.user.findUnique({
    where: { fan_id: fanId },
    include: {
      event_interactions: {
        include: { event: true }
      },
      challenge_progress: {
        include: { challenge: true }
      }
    },
  });
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: {
  email?: string;
  name: string;
  city: string;
  fan_id?: string;
}) {
  const fanId = data.fan_id || `fan_${Math.random().toString(36).substr(2, 9)}`;
  
  return await db.user.create({
    data: {
      fan_id: fanId,
      email: data.email,
      name: data.name,
      city: data.city,
      avatar_initials: data.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      xp_total: 0,
      current_tier: 'GENERAL',
      streak_days: 0,
      events_attended: 0,
    },
  });
}

export async function updateUserProfile(fanId: string, data: {
  xp_total?: number;
  current_tier?: string;
  streak_days?: number;
  events_attended?: number;
  top_artist?: string;
  top_venue?: string;
  city?: string;
}) {
  return await db.user.update({
    where: { fan_id: fanId },
    data,
  });
}

export async function getLeaderboard(period: 'WEEKLY' | 'MONTHLY' | 'ALL_TIME' = 'ALL_TIME', city?: string) {
  const where: any = { period };
  if (city) where.city = city;

  return await db.leaderboardEntry.findMany({
    where,
    orderBy: { rank: 'asc' },
    take: 100,
  });
}

export async function getAllLeaderboardEntries() {
  return await db.leaderboardEntry.findMany({
    orderBy: [{ period: 'asc' }, { rank: 'asc' }],
    take: 300,
  });
}

export async function getFriendUserIds(fanId: string): Promise<string[]> {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return [];

  const activities = await db.friendActivity.findMany({
    where: { user_id: user.id },
    select: { friend_name: true },
  });

  const friendNames = [...new Set(activities.map(a => a.friend_name))];
  if (friendNames.length === 0) return [];

  const friends = await db.user.findMany({
    where: { name: { in: friendNames } },
    select: { id: true },
  });

  return friends.map(f => f.id);
}

export async function getUserEvents(fanId: string) {
  return await db.userEvent.findMany({
    where: { 
      user: { fan_id: fanId } 
    },
    include: {
      event: true,
    },
    orderBy: {
      event: { date: 'asc' },
    },
  });
}

export async function getUpcomingEvents(category?: string, city?: string, limit: number = 20) {
  const where: any = {
    date: { gte: new Date() },
  };
  
  if (category && category !== 'all') {
    where.category = category.toUpperCase();
  }
  
  if (city) {
    where.city = city;
  }

  return await db.event.findMany({
    where,
    orderBy: [
      { featured: 'desc' },
      { trending: 'desc' }, 
      { date: 'asc' },
    ],
    take: limit,
  });
}

export async function searchEvents(query: string, category?: string, limit: number = 20) {
  const where: any = {
    date: { gte: new Date() },
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { artist: { contains: query, mode: 'insensitive' } },
      { venue: { contains: query, mode: 'insensitive' } },
    ],
  };
  
  if (category && category !== 'all') {
    where.category = category.toUpperCase();
  }

  return await db.event.findMany({
    where,
    orderBy: { date: 'asc' },
    take: limit,
  });
}

export async function getUserChallenges(fanId: string, completed?: boolean) {
  const where: any = { 
    user: { fan_id: fanId } 
  };
  
  if (typeof completed === 'boolean') {
    where.completed = completed;
  }

  return await db.userChallenge.findMany({
    where,
    include: {
      challenge: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
}

export async function addXpTransaction(fanId: string, data: {
  amount: number;
  source: string;
  reference?: string;
  description?: string;
}) {
  // Add XP transaction
  const transaction = await db.xpTransaction.create({
    data: {
      user: { connect: { fan_id: fanId } },
      amount: data.amount,
      source: data.source,
      reference: data.reference,
      description: data.description,
    },
  });

  // Update user's total XP
  const user = await db.user.findUnique({
    where: { fan_id: fanId },
  });

  if (user) {
    const newTotal = user.xp_total + data.amount;
    const newTier = calculateTier(newTotal);

    await db.user.update({
      where: { fan_id: fanId },
      data: {
        xp_total: newTotal,
        current_tier: newTier,
      },
    });
  }

  return transaction;
}

export async function toggleEventBookmark(fanId: string, eventId: string) {
  const existing = await db.userEvent.findUnique({
    where: {
      user_id_event_id: {
        user_id: (await db.user.findUnique({ where: { fan_id: fanId } }))!.id,
        event_id: eventId,
      },
    },
  });

  if (existing) {
    return await db.userEvent.update({
      where: { id: existing.id },
      data: { bookmarked: !existing.bookmarked },
    });
  } else {
    return await db.userEvent.create({
      data: {
        user: { connect: { fan_id: fanId } },
        event: { connect: { event_id: eventId } },
        bookmarked: true,
      },
    });
  }
}

export async function updateChallengeProgress(fanId: string, challengeId: string, progress: number, completed: boolean = false) {
  const existing = await db.userChallenge.findUnique({
    where: {
      user_id_challenge_id: {
        user_id: (await db.user.findUnique({ where: { fan_id: fanId } }))!.id,
        challenge_id: challengeId,
      },
    },
  });

  const data = {
    progress,
    completed,
    completed_at: completed ? new Date() : null,
  };

  if (existing) {
    return await db.userChallenge.update({
      where: { id: existing.id },
      data,
    });
  } else {
    return await db.userChallenge.create({
      data: {
        user: { connect: { fan_id: fanId } },
        challenge: { connect: { challenge_id: challengeId } },
        ...data,
      },
    });
  }
}

// Helper function to calculate tier based on XP (matches domain/xp.ts thresholds)
function calculateTier(xp: number): 'GENERAL' | 'LOYAL' | 'SUPERFAN' | 'ELITE' {
  if (xp >= 5000) return 'ELITE';
  if (xp >= 2500) return 'SUPERFAN';
  if (xp >= 1000) return 'LOYAL';
  return 'GENERAL';
}

// Get friend activity for a user
export async function getFriendActivity(fanId: string, limit: number = 10) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return [];

  return await db.friendActivity.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: 'desc' },
    take: limit,
  });
}

// Get recent activity for a user
export async function getRecentActivity(fanId: string, limit: number = 20) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return [];

  return await db.recentActivity.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: 'desc' },
    take: limit,
  });
}

// Get daily XP totals over the last N days (oldest → newest, gaps filled with 0)
export async function getXpHistory(fanId: string, days: number = 14) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return [];

  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  since.setUTCDate(since.getUTCDate() - (days - 1));

  const transactions = await db.xpTransaction.findMany({
    where: { user_id: user.id, created_at: { gte: since } },
    select: { amount: true, created_at: true },
  });

  const totals = new Map<string, number>();
  for (const tx of transactions) {
    const key = tx.created_at.toISOString().slice(0, 10);
    totals.set(key, (totals.get(key) ?? 0) + tx.amount);
  }

  const series: { date: string; amount: number }[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setUTCDate(since.getUTCDate() + i);
    const key = d.toISOString().slice(0, 10);
    series.push({ date: key, amount: totals.get(key) ?? 0 });
  }
  return series;
}

// Get XP breakdown by source for a user
export async function getXpBreakdown(fanId: string) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return {};

  const transactions = await db.xpTransaction.findMany({
    where: { user_id: user.id },
  });

  const breakdown: Record<string, number> = {};
  for (const tx of transactions) {
    breakdown[tx.source] = (breakdown[tx.source] || 0) + tx.amount;
  }
  return breakdown;
}

// Get passes for a user
export async function getUserPasses(fanId: string) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return [];

  return await db.pass.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: 'desc' },
  });
}

// Get featured offers (available passes not yet claimed)
export async function getFeaturedOffers(limit: number = 5) {
  return await db.pass.findMany({
    where: { status: 'AVAILABLE', user_id: null },
    take: limit,
    orderBy: { created_at: 'desc' },
  });
}

// Get a single pass by pass_id
export async function getPassByPassId(passId: string) {
  return await db.pass.findUnique({ where: { pass_id: passId } });
}

// Get a single pass by its Apple Wallet serial number
export async function getPassByWalletSerial(serial: string) {
  return await db.pass.findUnique({ where: { apple_wallet_serial: serial } });
}

// Stamp wallet_added_at on first download of the .pkpass
export async function markPassWalletAdded(passId: string) {
  return await db.pass.update({
    where: { pass_id: passId },
    data: { wallet_added_at: new Date() },
  });
}

// Attendance verification — XP / confidence per method
export const VERIFICATION_XP: Record<
  'WALLET_SCAN' | 'SELF_CHECKIN' | 'MANUAL' | 'TICKETMASTER_WEBHOOK',
  { xp: number; confidence: number }
> = {
  WALLET_SCAN: { xp: 200, confidence: 90 },
  SELF_CHECKIN: { xp: 50, confidence: 30 },
  MANUAL: { xp: 100, confidence: 70 },
  TICKETMASTER_WEBHOOK: { xp: 200, confidence: 95 },
};

// Record an attendance verification (idempotent on user+event+method).
// Returns { attendance, xp_awarded, duplicate }.
export async function recordAttendanceVerification(opts: {
  userId: string;
  eventId: string;
  passId?: string | null;
  method: 'WALLET_SCAN' | 'SELF_CHECKIN' | 'MANUAL' | 'TICKETMASTER_WEBHOOK';
  scannerIp?: string | null;
  metadata?: Record<string, unknown> | null;
}) {
  const existing = await db.attendanceVerification.findUnique({
    where: {
      user_id_event_id_method: {
        user_id: opts.userId,
        event_id: opts.eventId,
        method: opts.method,
      },
    },
  });

  if (existing) {
    return { attendance: existing, xp_awarded: 0, duplicate: true as const };
  }

  const { xp, confidence } = VERIFICATION_XP[opts.method];

  const attendance = await db.attendanceVerification.create({
    data: {
      user_id: opts.userId,
      event_id: opts.eventId,
      pass_id: opts.passId ?? null,
      method: opts.method,
      confidence,
      xp_awarded: xp,
      scanner_ip: opts.scannerIp ?? null,
      metadata: (opts.metadata as any) ?? undefined,
    },
  });

  // Award XP via the existing ledger (recomputes xp_total + current_tier).
  const user = await db.user.findUnique({ where: { id: opts.userId } });
  if (user) {
    await addXpTransaction(user.fan_id, {
      amount: xp,
      source: 'Event Attendance',
      reference: opts.eventId,
      description: `Attendance verified via ${opts.method.toLowerCase()}`,
    });

    // Bump the events_attended counter on the user row.
    await db.user.update({
      where: { id: opts.userId },
      data: { events_attended: { increment: 1 } },
    });
  }

  return { attendance, xp_awarded: xp, duplicate: false as const };
}

// ── Invitations / referral program ─────────────────────────────────────────

import { generateInviteCode, REFERRAL_XP_REWARD, REFERRAL_XP_SOURCE } from './invites.js';

export async function listInvitationsByReferrer(fanId: string) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return [];
  return await db.invitation.findMany({
    where: { referrer_id: user.id },
    orderBy: { sent_at: 'desc' },
  });
}

export async function createInvitation(opts: { referrerFanId: string; inviteeEmail: string }) {
  const referrer = await db.user.findUnique({ where: { fan_id: opts.referrerFanId } });
  if (!referrer) throw new Error('referrer_not_found');

  // Retry on unlikely code collision (column is unique).
  for (let attempt = 0; attempt < 3; attempt++) {
    const code = generateInviteCode();
    try {
      return await db.invitation.create({
        data: {
          code,
          referrer_id: referrer.id,
          invitee_email: opts.inviteeEmail.trim().toLowerCase(),
          status: 'SENT',
        },
      });
    } catch (err: unknown) {
      const e = err as { code?: string; meta?: { target?: string[] } };
      // P2002 = unique constraint. If on `code`, retry; otherwise rethrow.
      const target = e.meta?.target ?? [];
      if (e.code === 'P2002' && target.includes('code')) continue;
      throw err;
    }
  }
  throw new Error('invite_code_collision');
}

export async function getInvitationByCode(code: string) {
  return await db.invitation.findUnique({
    where: { code },
    include: { referrer: { select: { id: true, name: true, fan_id: true, email: true } } },
  });
}

export async function revokeInvitation(code: string, referrerFanId: string) {
  const invite = await db.invitation.findUnique({
    where: { code },
    include: { referrer: { select: { fan_id: true } } },
  });
  if (!invite) return { ok: false as const, reason: 'not_found' as const };
  if (invite.referrer.fan_id !== referrerFanId) return { ok: false as const, reason: 'forbidden' as const };
  if (invite.status !== 'SENT') return { ok: false as const, reason: 'not_pending' as const };
  await db.invitation.update({ where: { code }, data: { status: 'REVOKED' } });
  return { ok: true as const };
}

// Accept an invitation: create the new User, mark ACCEPTED, append a Referral
// xp_transactions row for the referrer, all in one transaction so partial
// failure can't leave dangling state.
export async function acceptInvitation(opts: {
  code: string;
  newUserName: string;
  newUserEmail: string;
  newUserCity?: string;
}) {
  const code = opts.code;
  const inputEmail = opts.newUserEmail.trim().toLowerCase();

  const invite = await db.invitation.findUnique({
    where: { code },
    include: { referrer: true },
  });
  if (!invite) return { ok: false as const, reason: 'not_found' as const };
  if (invite.status === 'ACCEPTED') return { ok: false as const, reason: 'already_accepted' as const };
  if (invite.status === 'REVOKED') return { ok: false as const, reason: 'revoked' as const };

  const existing = await db.user.findUnique({ where: { email: inputEmail } });
  if (existing) return { ok: false as const, reason: 'email_in_use' as const };

  // Transaction: create user → mark invite ACCEPTED → award referrer XP.
  return await db.$transaction(async tx => {
    const newFanId = `fan_${Math.random().toString(36).slice(2, 11)}`;
    const newUser = await tx.user.create({
      data: {
        fan_id: newFanId,
        email: inputEmail,
        name: opts.newUserName.trim(),
        city: opts.newUserCity?.trim() || invite.referrer.city,
        avatar_initials: opts.newUserName.trim().split(/\s+/).map(n => n[0]).join('').slice(0, 2).toUpperCase(),
        xp_total: 0,
        current_tier: 'GENERAL',
        streak_days: 0,
        events_attended: 0,
      },
    });

    await tx.invitation.update({
      where: { code },
      data: {
        status: 'ACCEPTED',
        accepted_at: new Date(),
        accepted_user_id: newUser.id,
        xp_awarded: REFERRAL_XP_REWARD,
      },
    });

    await tx.xpTransaction.create({
      data: {
        user_id: invite.referrer.id,
        amount: REFERRAL_XP_REWARD,
        source: REFERRAL_XP_SOURCE,
        reference: code,
        description: `Referred ${newUser.name}`,
      },
    });
    const refreshedReferrer = await tx.user.update({
      where: { id: invite.referrer.id },
      data: { xp_total: { increment: REFERRAL_XP_REWARD } },
    });
    // Recompute tier outside the increment so we use the new total.
    await tx.user.update({
      where: { id: invite.referrer.id },
      data: { current_tier: calculateTier(refreshedReferrer.xp_total) },
    });

    return { ok: true as const, newUser, xp_awarded: REFERRAL_XP_REWARD };
  });
}

// Cleanup function
export async function disconnect() {
  await db.$disconnect();
}