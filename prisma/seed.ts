// Seed script to populate database with demo data
import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new pg.Pool({
  connectionString: 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable',
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');

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

  // ── Main user (Alex Chen — demo protagonist) ──────────────────────────
  const mainUser = await prisma.user.create({
    data: {
      fan_id: 'fan_001',
      name: 'Alex Chen',
      avatar_initials: 'AC',
      city: 'Los Angeles',
      xp_total: 8750,
      current_tier: 'ELITE',
      streak_days: 12,
      rank: 18,
      percentile: 3,
      top_artist: 'The Weeknd',
      top_venue: 'SoFi Stadium',
      events_attended: 9,
      lastfm_username: 'alexchen_music',
    },
  });

  // ── Other users for leaderboard (30+) ─────────────────────────────────
  const otherUsersData = [
    { fan_id: 'fan_002', name: 'Sarah Kim', initials: 'SK', city: 'Los Angeles', xp: 12450, tier: 'ELITE' as const, streak: 28, events: 48 },
    { fan_id: 'fan_003', name: 'Mike Rodriguez', initials: 'MR', city: 'Los Angeles', xp: 11890, tier: 'ELITE' as const, streak: 22, events: 41 },
    { fan_id: 'fan_004', name: 'Emma Davis', initials: 'ED', city: 'Los Angeles', xp: 11200, tier: 'ELITE' as const, streak: 45, events: 67 },
    { fan_id: 'fan_005', name: 'Jordan Lee', initials: 'JL', city: 'Los Angeles', xp: 8690, tier: 'ELITE' as const, streak: 10, events: 29 },
    { fan_id: 'fan_006', name: 'Aaliyah Thompson', initials: 'AT', city: 'Los Angeles', xp: 8200, tier: 'ELITE' as const, streak: 15, events: 35 },
    { fan_id: 'fan_007', name: 'Kai Morales', initials: 'KM', city: 'Los Angeles', xp: 7800, tier: 'ELITE' as const, streak: 8, events: 26 },
    { fan_id: 'fan_008', name: 'Sofia Ramirez', initials: 'SR', city: 'Los Angeles', xp: 7200, tier: 'ELITE' as const, streak: 14, events: 31 },
    { fan_id: 'fan_009', name: 'Marcus Davis', initials: 'MD', city: 'Los Angeles', xp: 6800, tier: 'ELITE' as const, streak: 6, events: 22 },
    { fan_id: 'fan_010', name: 'Zoe Park', initials: 'ZP', city: 'Los Angeles', xp: 6400, tier: 'ELITE' as const, streak: 20, events: 28 },
    { fan_id: 'fan_011', name: 'Liam Foster', initials: 'LF', city: 'Los Angeles', xp: 5900, tier: 'ELITE' as const, streak: 11, events: 19 },
    { fan_id: 'fan_012', name: 'Maya Chen', initials: 'MC', city: 'Los Angeles', xp: 5500, tier: 'ELITE' as const, streak: 7, events: 24 },
    { fan_id: 'fan_013', name: 'Noah Williams', initials: 'NW', city: 'Los Angeles', xp: 4900, tier: 'SUPERFAN' as const, streak: 9, events: 18 },
    { fan_id: 'fan_014', name: 'Olivia Nguyen', initials: 'ON', city: 'Los Angeles', xp: 4500, tier: 'SUPERFAN' as const, streak: 5, events: 15 },
    { fan_id: 'fan_015', name: 'Ethan Brooks', initials: 'EB', city: 'Los Angeles', xp: 4100, tier: 'SUPERFAN' as const, streak: 13, events: 20 },
    { fan_id: 'fan_016', name: 'Isabella Torres', initials: 'IT', city: 'Los Angeles', xp: 3700, tier: 'SUPERFAN' as const, streak: 4, events: 12 },
    { fan_id: 'fan_017', name: 'Aiden Rivera', initials: 'AR', city: 'Los Angeles', xp: 3300, tier: 'SUPERFAN' as const, streak: 16, events: 17 },
    { fan_id: 'fan_018', name: 'Mia Jackson', initials: 'MJ', city: 'Los Angeles', xp: 2900, tier: 'SUPERFAN' as const, streak: 3, events: 10 },
    { fan_id: 'fan_019', name: 'Lucas Hernandez', initials: 'LH', city: 'Los Angeles', xp: 2600, tier: 'SUPERFAN' as const, streak: 8, events: 14 },
    { fan_id: 'fan_020', name: 'Ava Mitchell', initials: 'AM', city: 'Los Angeles', xp: 2200, tier: 'LOYAL' as const, streak: 2, events: 8 },
    { fan_id: 'fan_021', name: 'Jayden Cooper', initials: 'JC', city: 'Los Angeles', xp: 1900, tier: 'LOYAL' as const, streak: 6, events: 11 },
    { fan_id: 'fan_022', name: 'Chloe Anderson', initials: 'CA', city: 'Los Angeles', xp: 1600, tier: 'LOYAL' as const, streak: 1, events: 6 },
    { fan_id: 'fan_023', name: 'Ryan Evans', initials: 'RE', city: 'Los Angeles', xp: 1300, tier: 'LOYAL' as const, streak: 4, events: 9 },
    { fan_id: 'fan_024', name: 'Lily Morgan', initials: 'LM', city: 'Los Angeles', xp: 1100, tier: 'LOYAL' as const, streak: 2, events: 5 },
    { fan_id: 'fan_025', name: 'Tyler Reed', initials: 'TR', city: 'Los Angeles', xp: 900, tier: 'GENERAL' as const, streak: 3, events: 7 },
    { fan_id: 'fan_026', name: 'Grace Kim', initials: 'GK', city: 'Los Angeles', xp: 700, tier: 'GENERAL' as const, streak: 1, events: 4 },
    { fan_id: 'fan_027', name: 'David Patel', initials: 'DP', city: 'Los Angeles', xp: 500, tier: 'GENERAL' as const, streak: 5, events: 3 },
    { fan_id: 'fan_028', name: 'Hannah Scott', initials: 'HS', city: 'Los Angeles', xp: 350, tier: 'GENERAL' as const, streak: 0, events: 2 },
    { fan_id: 'fan_029', name: 'Brandon White', initials: 'BW', city: 'Los Angeles', xp: 200, tier: 'GENERAL' as const, streak: 1, events: 1 },
    { fan_id: 'fan_030', name: 'Emily Flores', initials: 'EF', city: 'Los Angeles', xp: 100, tier: 'GENERAL' as const, streak: 0, events: 1 },
    // Out-of-city users for diversity
    { fan_id: 'fan_031', name: 'Jake Martinez', initials: 'JM', city: 'New York', xp: 9500, tier: 'ELITE' as const, streak: 18, events: 38 },
    { fan_id: 'fan_032', name: 'Samira Ali', initials: 'SA', city: 'Chicago', xp: 7100, tier: 'ELITE' as const, streak: 12, events: 25 },
  ];

  for (const u of otherUsersData) {
    await prisma.user.create({
      data: {
        fan_id: u.fan_id,
        name: u.name,
        avatar_initials: u.initials,
        city: u.city,
        xp_total: u.xp,
        current_tier: u.tier,
        streak_days: u.streak,
        events_attended: u.events,
      },
    });
  }

  // ── Challenges (8) ────────────────────────────────────────────────────
  await prisma.challenge.createMany({
    data: [
      {
        challenge_id: 'ch_001',
        title: 'Venue Explorer',
        description: 'Visit 3 different venues this month',
        category: 'Attendance',
        xp_reward: 300,
        difficulty: 'Medium',
        tasks: JSON.stringify([
          { id: 1, text: 'Check in to The Troubadour', completed: true },
          { id: 2, text: 'Check in to The Roxy', completed: true },
          { id: 3, text: 'Check in to Whisky a Go Go', completed: false },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'ch_002',
        title: 'Streak Master',
        description: 'Maintain a 14-day check-in streak',
        category: 'Attendance',
        xp_reward: 500,
        difficulty: 'Hard',
        tasks: JSON.stringify([
          { id: 1, text: 'Check in 14 consecutive days', completed: false },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'ch_003',
        title: 'Genre Hopper',
        description: 'Attend events in 3 different genres',
        category: 'Discovery',
        xp_reward: 400,
        difficulty: 'Medium',
        tasks: JSON.stringify([
          { id: 1, text: 'Attend a hip-hop show', completed: true },
          { id: 2, text: 'Attend a rock concert', completed: true },
          { id: 3, text: 'Attend a jazz performance', completed: false },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'ch_004',
        title: 'Social Butterfly',
        description: 'Share 5 events with friends',
        category: 'Social',
        xp_reward: 200,
        difficulty: 'Easy',
        tasks: JSON.stringify([
          { id: 1, text: 'Share your first event', completed: true },
          { id: 2, text: 'Share 3 events', completed: false },
          { id: 3, text: 'Share 5 events', completed: false },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'ch_005',
        title: 'First Timer',
        description: 'Attend your first event through Maxess',
        category: 'Attendance',
        xp_reward: 150,
        difficulty: 'Easy',
        tasks: JSON.stringify([
          { id: 1, text: 'Browse events', completed: true },
          { id: 2, text: 'RSVP to an event', completed: true },
          { id: 3, text: 'Check in at the venue', completed: true },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'ch_006',
        title: 'Weekend Warrior',
        description: 'Attend 3 events in one weekend',
        category: 'Attendance',
        xp_reward: 600,
        difficulty: 'Hard',
        tasks: JSON.stringify([
          { id: 1, text: 'Attend Friday event', completed: false },
          { id: 2, text: 'Attend Saturday event', completed: false },
          { id: 3, text: 'Attend Sunday event', completed: false },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'ch_007',
        title: 'Music Maven',
        description: 'Stream 50 hours of music this month',
        category: 'Discovery',
        xp_reward: 350,
        difficulty: 'Medium',
        tasks: JSON.stringify([
          { id: 1, text: 'Stream 10 hours', completed: true },
          { id: 2, text: 'Stream 25 hours', completed: false },
          { id: 3, text: 'Stream 50 hours', completed: false },
        ]),
        progress_target: 100,
      },
      {
        challenge_id: 'ch_008',
        title: 'Refer a Friend',
        description: 'Invite 3 friends to join Maxess',
        category: 'Social',
        xp_reward: 250,
        difficulty: 'Easy',
        tasks: JSON.stringify([
          { id: 1, text: 'Send first invite', completed: true },
          { id: 2, text: 'First friend joins', completed: true },
          { id: 3, text: '3 friends joined', completed: false },
        ]),
        progress_target: 100,
      },
    ],
  });

  // ── User challenge progress (for Alex Chen) ──────────────────────────
  await prisma.userChallenge.createMany({
    data: [
      { user_id: mainUser.id, challenge_id: 'ch_001', completed: false, progress: 67, tasks_completed: JSON.stringify([1, 2]) },
      { user_id: mainUser.id, challenge_id: 'ch_002', completed: false, progress: 86, tasks_completed: JSON.stringify([]) },
      { user_id: mainUser.id, challenge_id: 'ch_003', completed: false, progress: 67, tasks_completed: JSON.stringify([1, 2]) },
      { user_id: mainUser.id, challenge_id: 'ch_004', completed: false, progress: 33, tasks_completed: JSON.stringify([1]) },
      { user_id: mainUser.id, challenge_id: 'ch_005', completed: true, progress: 100, tasks_completed: JSON.stringify([1, 2, 3]), completed_at: new Date('2026-04-15') },
      { user_id: mainUser.id, challenge_id: 'ch_007', completed: false, progress: 40, tasks_completed: JSON.stringify([1]) },
      { user_id: mainUser.id, challenge_id: 'ch_008', completed: false, progress: 67, tasks_completed: JSON.stringify([1, 2]) },
    ],
  });

  // ── XP Transactions (detailed history for Alex Chen) ──────────────────
  const xpTransactions = [
    { amount: 3600, source: 'Event Attendance', description: 'XP from attending 9 events' },
    { amount: 2840, source: 'Streaming', description: 'Music streaming XP' },
    { amount: 960, source: 'Watch XP', description: 'Watching live streams and replays' },
    { amount: 440, source: 'Spend XP', description: 'Merchandise and ticket purchases' },
    { amount: 910, source: 'Challenges', description: 'Challenge completion rewards' },
  ];

  for (const tx of xpTransactions) {
    await prisma.xpTransaction.create({
      data: {
        user_id: mainUser.id,
        ...tx,
      },
    });
  }

  // ── Leaderboard entries (all periods) ──────────────────────────────────
  const allUsers = await prisma.user.findMany({ orderBy: { xp_total: 'desc' } });

  const periods = ['WEEKLY', 'MONTHLY', 'ALL_TIME'] as const;
  for (const period of periods) {
    const entries = allUsers.map((user, index) => ({
      user_id: user.id,
      name: user.name,
      xp_total: user.xp_total,
      tier: user.current_tier,
      rank: index + 1,
      city: user.city,
      period,
    }));

    await prisma.leaderboardEntry.createMany({ data: entries });
  }

  // ── Passes (for Alex Chen) ────────────────────────────────────────────
  await prisma.pass.createMany({
    data: [
      {
        pass_id: 'pass_001',
        user_id: mainUser.id,
        title: 'VIP Music Pass',
        description: 'Skip lines, priority seating at 12+ partner venues',
        tier: 'ELITE',
        status: 'ACTIVE',
        valid_until: new Date('2026-06-30'),
        claimed_at: new Date('2026-05-01'),
      },
      {
        pass_id: 'pass_002',
        user_id: mainUser.id,
        title: 'Lakers Season Access',
        description: 'Premium seats + meet & greet opportunities',
        tier: 'ELITE',
        status: 'CLAIMED',
        valid_until: new Date('2026-07-15'),
        claimed_at: new Date('2026-05-15'),
      },
      {
        pass_id: 'pass_003',
        user_id: mainUser.id,
        title: 'Local Venues Pass',
        description: 'Access to all partner venues in LA',
        tier: 'SUPERFAN',
        status: 'ACTIVE',
        valid_until: new Date('2026-08-01'),
        claimed_at: new Date('2026-04-20'),
      },
      // Available passes (not assigned to anyone)
      {
        pass_id: 'pass_004',
        user_id: null,
        title: 'Backstage Experience',
        description: 'Meet artists backstage at select shows',
        tier: 'ELITE',
        status: 'AVAILABLE',
        valid_until: new Date('2026-09-01'),
      },
      {
        pass_id: 'pass_005',
        user_id: null,
        title: 'Festival VIP Upgrade',
        description: 'VIP area access at upcoming festivals',
        tier: 'ELITE',
        status: 'AVAILABLE',
        valid_until: new Date('2026-08-15'),
      },
      {
        pass_id: 'pass_006',
        user_id: null,
        title: 'Comedy Club Access',
        description: 'Priority seating at Hollywood Improv',
        tier: 'SUPERFAN',
        status: 'AVAILABLE',
        valid_until: new Date('2026-07-31'),
      },
      {
        pass_id: 'pass_007',
        user_id: null,
        title: 'Sports Lounge Pass',
        description: 'Access to premium sports bar partners',
        tier: 'LOYAL',
        status: 'AVAILABLE',
        valid_until: new Date('2026-09-30'),
      },
      {
        pass_id: 'pass_008',
        user_id: null,
        title: 'Merch Discount Pass',
        description: '20% off at all partner merch stores',
        tier: 'GENERAL',
        status: 'AVAILABLE',
        valid_until: new Date('2026-12-31'),
      },
    ],
  });

  // ── Friend activities (for Alex Chen) ──────────────────────────────────
  await prisma.friendActivity.createMany({
    data: [
      { user_id: mainUser.id, friend_name: 'Sarah Kim', activity: 'attended Arctic Monkeys, gained 2 ranks', xp_change: 280 },
      { user_id: mainUser.id, friend_name: 'Mike Rodriguez', activity: 'completed Venue Explorer challenge', xp_change: 300 },
      { user_id: mainUser.id, friend_name: 'Emma Davis', activity: 'checked into 3 venues this week', xp_change: 150 },
      { user_id: mainUser.id, friend_name: 'Jordan Lee', activity: 'reached Elite tier', xp_change: 500 },
      { user_id: mainUser.id, friend_name: 'Aaliyah Thompson', activity: 'attended Kendrick Lamar show', xp_change: 350 },
      { user_id: mainUser.id, friend_name: 'Kai Morales', activity: 'streamed 20 hours this week', xp_change: 100 },
      { user_id: mainUser.id, friend_name: 'Sofia Ramirez', activity: 'unlocked VIP Music Pass', xp_change: 200 },
      { user_id: mainUser.id, friend_name: 'Marcus Davis', activity: 'completed First Timer challenge', xp_change: 150 },
      { user_id: mainUser.id, friend_name: 'Zoe Park', activity: 'attended Lakers game', xp_change: 250 },
      { user_id: mainUser.id, friend_name: 'Liam Foster', activity: 'referred 3 friends', xp_change: 250 },
      { user_id: mainUser.id, friend_name: 'Maya Chen', activity: 'completed Music Maven challenge', xp_change: 350 },
      { user_id: mainUser.id, friend_name: 'Noah Williams', activity: 'attended Coachella Weekend 1', xp_change: 400 },
      { user_id: mainUser.id, friend_name: 'Olivia Nguyen', activity: 'checked in at SoFi Stadium', xp_change: 100 },
      { user_id: mainUser.id, friend_name: 'Ethan Brooks', activity: 'maintained 13-day streak', xp_change: 130 },
      { user_id: mainUser.id, friend_name: 'Isabella Torres', activity: 'discovered 5 new artists', xp_change: 75 },
    ],
  });

  // ── Recent activities (for Alex Chen) ──────────────────────────────────
  await prisma.recentActivity.createMany({
    data: [
      { user_id: mainUser.id, activity: 'Checked into The Troubadour', description: 'Venue check-in', xp_earned: 150 },
      { user_id: mainUser.id, activity: 'Completed daily streak (Day 12)', description: 'Streak bonus', xp_earned: 50 },
      { user_id: mainUser.id, activity: 'Attended Phoebe Bridgers concert', description: 'Event attendance', xp_earned: 300 },
      { user_id: mainUser.id, activity: 'Referred friend Sarah', description: 'Social referral', xp_earned: 200 },
      { user_id: mainUser.id, activity: 'Completed Genre Hopper task', description: 'Challenge progress', xp_earned: 100 },
      { user_id: mainUser.id, activity: 'Streamed 10 hours of music', description: 'Streaming milestone', xp_earned: 75 },
      { user_id: mainUser.id, activity: 'Purchased Lakers tickets', description: 'Spend XP bonus', xp_earned: 120 },
      { user_id: mainUser.id, activity: 'Checked into Crypto.com Arena', description: 'Venue check-in', xp_earned: 150 },
      { user_id: mainUser.id, activity: 'Completed First Timer challenge', description: 'Challenge completed', xp_earned: 150 },
      { user_id: mainUser.id, activity: 'Attended Tyler the Creator show', description: 'Event attendance', xp_earned: 300 },
      { user_id: mainUser.id, activity: 'Watched live stream replay', description: 'Watch XP', xp_earned: 40 },
      { user_id: mainUser.id, activity: 'Shared SZA event with friends', description: 'Social sharing', xp_earned: 25 },
      { user_id: mainUser.id, activity: 'Completed daily streak (Day 7)', description: 'Weekly streak bonus', xp_earned: 100 },
      { user_id: mainUser.id, activity: 'Checked into The Roxy', description: 'Venue check-in', xp_earned: 150 },
      { user_id: mainUser.id, activity: 'Attended Dave Chappelle show', description: 'Event attendance', xp_earned: 300 },
      { user_id: mainUser.id, activity: 'Earned Watch XP for replay', description: 'Watch XP', xp_earned: 40 },
      { user_id: mainUser.id, activity: 'Referred friend Mike', description: 'Social referral', xp_earned: 200 },
      { user_id: mainUser.id, activity: 'Discovered new artist via Spotify', description: 'Discovery bonus', xp_earned: 50 },
      { user_id: mainUser.id, activity: 'Purchased merch at show', description: 'Spend XP bonus', xp_earned: 80 },
      { user_id: mainUser.id, activity: 'Joined Maxess', description: 'Welcome bonus', xp_earned: 100 },
    ],
  });

  const totalUsers = await prisma.user.count();
  console.log(`Seed completed: ${totalUsers} users, 8 challenges, 8 passes, 15 friend activities, 20 recent activities`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
