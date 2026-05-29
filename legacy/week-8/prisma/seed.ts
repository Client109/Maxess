// Seed script to populate database with mock data
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.userEvent.deleteMany();
  await prisma.userChallenge.deleteMany();
  await prisma.xpTransaction.deleteMany();
  await prisma.leaderboardEntry.deleteMany();
  await prisma.friendActivity.deleteMany();
  await prisma.recentActivity.deleteMany();
  await prisma.pass.deleteMany();
  await prisma.event.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.user.deleteMany();

  // Create main user (from mock data)
  const mainUser = await prisma.user.create({
    data: {
      fan_id: 'fan_001',
      name: 'Alex Chen',
      avatar_initials: 'AC',
      city: 'Los Angeles',
      xp_total: 8750,
      current_tier: 'GOLD',
      streak_days: 12,
      rank: 18,
      percentile: 3,
      top_artist: 'The Midnight',
      top_venue: 'The Fillmore',
      events_attended: 34,
    },
  });

  // Create sample events
  const events = await prisma.event.createMany({
    data: [
      {
        event_id: 'evt_001',
        title: 'The Midnight',
        subtitle: 'Endless Summer Tour',
        artist: 'The Midnight',
        venue: 'The Greek Theatre',
        city: 'Los Angeles',
        date: new Date('2026-06-15T20:00:00Z'),
        category: 'MUSIC',
        image_url: '/api/placeholder/400/300',
        featured: true,
        trending: true,
      },
      {
        event_id: 'evt_002',
        title: 'Dua Lipa',
        subtitle: 'Future Nostalgia Tour',
        artist: 'Dua Lipa',
        venue: 'Crypto.com Arena',
        city: 'Los Angeles',
        date: new Date('2026-07-20T19:30:00Z'),
        category: 'MUSIC',
        image_url: '/api/placeholder/400/300',
        trending: true,
      },
      {
        event_id: 'evt_003',
        title: 'Lakers vs Warriors',
        subtitle: 'NBA Regular Season',
        venue: 'Crypto.com Arena',
        city: 'Los Angeles',
        date: new Date('2026-06-25T19:00:00Z'),
        category: 'SPORTS',
        image_url: '/api/placeholder/400/300',
      },
      {
        event_id: 'evt_004',
        title: 'Tame Impala',
        subtitle: 'The Slow Rush Tour',
        artist: 'Tame Impala',
        venue: 'Hollywood Bowl',
        city: 'Los Angeles',
        date: new Date('2026-08-10T20:00:00Z'),
        category: 'MUSIC',
        image_url: '/api/placeholder/400/300',
      },
    ],
  });

  // Create challenges
  const challenges = await prisma.challenge.createMany({
    data: [
      {
        challenge_id: 'chal_001',
        title: 'Music Explorer',
        description: 'Attend concerts from 3 different genres',
        category: 'Discovery',
        xp_reward: 500,
        difficulty: 'Medium',
        tasks: JSON.stringify([
          { id: 1, text: 'Attend a rock concert', completed: true },
          { id: 2, text: 'Attend an electronic show', completed: true },
          { id: 3, text: 'Attend a jazz performance', completed: false },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'chal_002',
        title: 'Venue Veteran',
        description: 'Visit 5 different venues in your city',
        category: 'Attendance',
        xp_reward: 300,
        difficulty: 'Easy',
        tasks: JSON.stringify([
          { id: 1, text: 'Visit The Greek Theatre', completed: true },
          { id: 2, text: 'Visit Hollywood Bowl', completed: true },
          { id: 3, text: 'Visit The Troubadour', completed: false },
          { id: 4, text: 'Visit El Rey Theatre', completed: false },
          { id: 5, text: 'Visit The Wiltern', completed: false },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'chal_003',
        title: 'Social Butterfly',
        description: 'Share 10 events with friends',
        category: 'Social',
        xp_reward: 200,
        difficulty: 'Easy',
        tasks: JSON.stringify([
          { id: 1, text: 'Share your first event', completed: true },
          { id: 2, text: 'Share 5 events', completed: false },
          { id: 3, text: 'Share 10 events', completed: false },
        ]),
        progress_target: 100,
      },
    ],
  });

  // Create user challenge progress
  await prisma.userChallenge.createMany({
    data: [
      {
        user_id: mainUser.id,
        challenge_id: 'chal_001',
        completed: false,
        progress: 67,
        tasks_completed: JSON.stringify([1, 2]),
      },
      {
        user_id: mainUser.id,
        challenge_id: 'chal_002',
        completed: false,
        progress: 40,
        tasks_completed: JSON.stringify([1, 2]),
      },
      {
        user_id: mainUser.id,
        challenge_id: 'chal_003',
        completed: false,
        progress: 33,
        tasks_completed: JSON.stringify([1]),
      },
    ],
  });

  // Create XP transaction history
  await prisma.xpTransaction.createMany({
    data: [
      {
        user_id: mainUser.id,
        amount: 6200,
        source: 'Event Attendance',
        description: 'XP from attending 34 events',
      },
      {
        user_id: mainUser.id,
        amount: 1800,
        source: 'Venue Check-ins',
        description: 'XP from venue check-ins',
      },
      {
        user_id: mainUser.id,
        amount: 450,
        source: 'Challenges',
        description: 'XP from challenge progress',
      },
      {
        user_id: mainUser.id,
        amount: 300,
        source: 'Referrals',
        description: 'XP from friend referrals',
      },
    ],
  });

  // Create some other users for leaderboard
  const otherUsers = await prisma.user.createMany({
    data: [
      {
        fan_id: 'fan_002',
        name: 'Sarah Martinez',
        avatar_initials: 'SM',
        city: 'Los Angeles',
        xp_total: 12500,
        current_tier: 'PLATINUM',
        streak_days: 25,
        events_attended: 48,
      },
      {
        fan_id: 'fan_003',
        name: 'Mike Johnson',
        avatar_initials: 'MJ',
        city: 'Los Angeles',
        xp_total: 9200,
        current_tier: 'GOLD',
        streak_days: 8,
        events_attended: 29,
      },
      {
        fan_id: 'fan_004',
        name: 'Emily Rodriguez',
        avatar_initials: 'ER',
        city: 'Los Angeles',
        xp_total: 15800,
        current_tier: 'PLATINUM',
        streak_days: 45,
        events_attended: 67,
      },
      {
        fan_id: 'fan_005',
        name: 'David Kim',
        avatar_initials: 'DK',
        city: 'Los Angeles',
        xp_total: 6400,
        current_tier: 'SILVER',
        streak_days: 3,
        events_attended: 22,
      },
    ],
  });

  // Create leaderboard entries
  const allUsers = await prisma.user.findMany({
    orderBy: { xp_total: 'desc' },
  });

  const leaderboardEntries = allUsers.map((user, index) => ({
    user_id: user.id,
    name: user.name,
    xp_total: user.xp_total,
    tier: user.current_tier,
    rank: index + 1,
    city: user.city,
    period: 'ALL_TIME' as const,
  }));

  await prisma.leaderboardEntry.createMany({
    data: leaderboardEntries,
  });

  // Create friend activities for main user
  await prisma.friendActivity.createMany({
    data: [
      {
        user_id: mainUser.id,
        friend_name: 'Sarah Martinez',
        activity: 'reached Platinum tier',
        xp_change: 500,
      },
      {
        user_id: mainUser.id,
        friend_name: 'Mike Johnson',
        activity: 'attended Tame Impala concert',
        xp_change: 150,
      },
      {
        user_id: mainUser.id,
        friend_name: 'Emily Rodriguez',
        activity: 'completed Music Explorer challenge',
        xp_change: 500,
      },
    ],
  });

  // Create recent activities for main user
  await prisma.recentActivity.createMany({
    data: [
      {
        user_id: mainUser.id,
        activity: 'Attended The Midnight concert',
        description: 'The Greek Theatre, Los Angeles',
        xp_earned: 200,
      },
      {
        user_id: mainUser.id,
        activity: 'Completed venue check-in',
        description: 'The Fillmore, San Francisco',
        xp_earned: 50,
      },
      {
        user_id: mainUser.id,
        activity: 'Started new challenge',
        description: 'Music Explorer challenge',
        xp_earned: 0,
      },
    ],
  });

  console.log('✅ Database seed completed successfully!');
  console.log(`Created ${allUsers.length} users`);
  console.log(`Created 4 events`);
  console.log(`Created 3 challenges`);
  console.log(`Main user: ${mainUser.name} (${mainUser.fan_id})`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });