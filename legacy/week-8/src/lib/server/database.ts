// Database client and utilities for Maxxes
import { PrismaClient } from '../../../generated/prisma/index.js';
import { dev } from '$app/environment';

// Singleton pattern for Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: dev ? ['query', 'error', 'warn'] : ['error'],
  });

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
      current_tier: 'BRONZE',
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

// Helper function to calculate tier based on XP
function calculateTier(xp: number): 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' {
  if (xp >= 20000) return 'DIAMOND';
  if (xp >= 10000) return 'PLATINUM';
  if (xp >= 5000) return 'GOLD';
  if (xp >= 2000) return 'SILVER';
  return 'BRONZE';
}

// Cleanup function
export async function disconnect() {
  await db.$disconnect();
}