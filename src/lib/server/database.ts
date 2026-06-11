// Database client and utilities for Maxxes
import prismaPkg from '@prisma/client';
import type { Tier } from '@prisma/client';
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
  // Neon hands out `postgresql://` URLs; we accept either spelling so prod
  // doesn't silently drop into the local fallback.
  const envUrl = env.DATABASE_URL;
  const isRawPostgres = !!envUrl && (envUrl.startsWith('postgres://') || envUrl.startsWith('postgresql://'));
  const connectionString = isRawPostgres
    ? envUrl!
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
  current_tier?: Tier;
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

  // For city slices, the stored `rank` is global — re-rank by xp_total so the
  // filtered view shows 1..N within the city.
  const rows = await db.leaderboardEntry.findMany({
    where,
    orderBy: city
      ? [{ xp_total: 'desc' }, { name: 'asc' }]
      : [{ rank: 'asc' }],
    take: 100,
  });

  if (city) {
    return rows.map((row, i) => ({ ...row, rank: i + 1 }));
  }
  return rows;
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

  // User.name is not unique — distinct prevents duplicate ids and warns
  // when a friend_name resolves to multiple users (or none).
  const friends = await db.user.findMany({
    where: { name: { in: friendNames } },
    select: { id: true, name: true },
    distinct: ['name'],
  });

  if (friends.length < friendNames.length) {
    console.warn(
      `[getFriendUserIds] ambiguous or missing friend resolves: requested ${friendNames.length} names, got ${friends.length} unique users (fan_id=${fanId})`,
    );
  }

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

  // Atomic increment avoids the read-modify-write race when two awards land at once.
  const updated = await db.user.update({
    where: { fan_id: fanId },
    data: { xp_total: { increment: data.amount } },
    select: { xp_total: true, current_tier: true },
  });

  const newTier = calculateTier(updated.xp_total);
  if (newTier !== updated.current_tier) {
    await db.user.update({
      where: { fan_id: fanId },
      data: { current_tier: newTier },
    });
  }

  return transaction;
}

export async function toggleEventBookmark(fanId: string, eventId: string): Promise<Awaited<ReturnType<typeof db.userEvent.update>> | null> {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return null;

  const existing = await db.userEvent.findUnique({
    where: {
      user_id_event_id: {
        user_id: user.id,
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

export async function updateChallengeProgress(fanId: string, challengeId: string, progress: number, completed: boolean = false): Promise<Awaited<ReturnType<typeof db.userChallenge.update>> | null> {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return null;

  const existing = await db.userChallenge.findUnique({
    where: {
      user_id_challenge_id: {
        user_id: user.id,
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
  // GENERAL covers both pre-Fan ("Newcomer", 0–9,999) and the Fan band
  // (10,000–99,999). The Prisma enum stays 4-wide; the display layer in
  // src/lib/server/transforms.ts splits GENERAL into Newcomer vs Fan using
  // the same 10,000 threshold.
  if (xp >= 1_000_000) return 'ELITE';
  if (xp >= 250_000) return 'SUPERFAN';
  if (xp >= 100_000) return 'LOYAL';
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

// Attendance verification — XP / confidence per method. Aligned with the
// xp_scoring_model.xp_per_concert_attendance constant (10,000) in
// src/lib/domain/xp-rules.ts. Verified methods (wallet scan, webhook) award
// the full concert reward; lower-confidence methods award a proportional share.
export const VERIFICATION_XP: Record<
  'WALLET_SCAN' | 'SELF_CHECKIN' | 'MANUAL' | 'TICKETMASTER_WEBHOOK',
  { xp: number; confidence: number }
> = {
  WALLET_SCAN: { xp: 10_000, confidence: 90 },
  SELF_CHECKIN: { xp: 2_500, confidence: 30 },
  MANUAL: { xp: 5_000, confidence: 70 },
  TICKETMASTER_WEBHOOK: { xp: 10_000, confidence: 95 },
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

  // The unique constraint is (user, event, method) — a fan can verify the same
  // event via multiple methods. Only count events_attended on the FIRST method.
  const attendance = await db.$transaction(async (tx) => {
    const hadAny = await tx.attendanceVerification.findFirst({
      where: { user_id: opts.userId, event_id: opts.eventId },
      select: { id: true },
    });

    const created = await tx.attendanceVerification.create({
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

    if (!hadAny) {
      await tx.user.update({
        where: { id: opts.userId },
        data: { events_attended: { increment: 1 } },
      });
    }

    return created;
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

  // Pre-fetch is fine for the not_found / revoked branches, but the
  // already_accepted + email_in_use checks need to live inside the tx so two
  // concurrent callers can't both pass validation.
  const inviteCheck = await db.invitation.findUnique({ where: { code } });
  if (!inviteCheck) return { ok: false as const, reason: 'not_found' as const };
  if (inviteCheck.status === 'REVOKED') return { ok: false as const, reason: 'revoked' as const };

  try {
    return await db.$transaction(async tx => {
      // Re-read invite + referrer inside the tx so we have current status.
      const invite = await tx.invitation.findUnique({
        where: { code },
        include: { referrer: true },
      });
      if (!invite) return { ok: false as const, reason: 'not_found' as const };
      if (invite.status === 'REVOKED') return { ok: false as const, reason: 'revoked' as const };

      // Email-in-use check must be inside the tx to race-protect signup.
      const emailTaken = await tx.user.findUnique({ where: { email: inputEmail } });
      if (emailTaken) return { ok: false as const, reason: 'email_in_use' as const };

      // Conditional update on status='SENT' so a concurrent acceptor's update
      // affects 0 rows and throws P2025; we surface that as already_accepted.
      try {
        await tx.invitation.update({
          where: { code, status: 'SENT' },
          data: {
            status: 'ACCEPTED',
            accepted_at: new Date(),
            xp_awarded: REFERRAL_XP_REWARD,
          },
        });
      } catch (err: unknown) {
        const e = err as { code?: string };
        if (e.code === 'P2025') return { ok: false as const, reason: 'already_accepted' as const };
        throw err;
      }

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

      // Backfill accepted_user_id now that we know the new user's id.
      await tx.invitation.update({
        where: { code },
        data: { accepted_user_id: newUser.id },
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

      // Single atomic increment; only do a second write if the tier changed.
      const refreshedReferrer = await tx.user.update({
        where: { id: invite.referrer.id },
        data: { xp_total: { increment: REFERRAL_XP_REWARD } },
        select: { xp_total: true, current_tier: true },
      });
      const newTier = calculateTier(refreshedReferrer.xp_total);
      if (newTier !== refreshedReferrer.current_tier) {
        await tx.user.update({
          where: { id: invite.referrer.id },
          data: { current_tier: newTier },
        });
      }

      return { ok: true as const, newUser, xp_awarded: REFERRAL_XP_REWARD };
    });
  } catch (err: unknown) {
    const e = err as { code?: string; meta?: { target?: string[] } };
    // Unique email constraint can still trip if two parallel txs both pass the
    // email check and race to create — surface as email_in_use.
    if (e.code === 'P2002' && (e.meta?.target ?? []).includes('email')) {
      return { ok: false as const, reason: 'email_in_use' as const };
    }
    throw err;
  }
}

// Cleanup function
export async function disconnect() {
  await db.$disconnect();
}