// Seed script to populate database with demo data
import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { totalSeededXp, REWARDS_XP_TOTAL, FOLLOWED_ARTISTS, FOLLOWED_TEAMS } from '../src/lib/data/seedFandoms.js';
import { XP_PER_CHECKIN, XP_PER_LISTENING_HOUR, XP_PER_TRIVIA_CORRECT, XP_PER_STREAK_BONUS } from '../src/lib/domain/xp-rules.js';

// pg.Pool only speaks raw postgres. If DATABASE_URL is a `prisma+postgres://`
// proxy URL (from `prisma dev`), fall back to the embedded raw-postgres port.
const envUrl = process.env.DATABASE_URL;
const connectionString = envUrl && envUrl.startsWith('postgres://')
  ? envUrl
  : 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable';
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Deterministic pseudo-random from a string seed (for consistent rankings per period)
function seedHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return (h & 0x7fffffff) / 0x7fffffff; // 0..1
}

function tierFromXp(xp: number): 'GENERAL' | 'LOYAL' | 'SUPERFAN' | 'ELITE' {
  // Mirrors calculateTier() in src/lib/server/database.ts. Keep these in sync.
  if (xp >= 1_000_000) return 'ELITE';
  if (xp >= 250_000) return 'SUPERFAN';
  if (xp >= 100_000) return 'LOYAL';
  return 'GENERAL';
}

function initials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  await prisma.userEvent.deleteMany();
  await prisma.userChallenge.deleteMany();
  await prisma.xpTransaction.deleteMany();
  await prisma.leaderboardEntry.deleteMany();
  await prisma.friendActivity.deleteMany();
  await prisma.recentActivity.deleteMany();
  await prisma.attendanceVerification.deleteMany();
  await prisma.listeningEvent.deleteMany();
  await prisma.followedArtist.deleteMany();
  await prisma.rewardRedemption.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.fanTier.deleteMany();
  await prisma.pass.deleteMany();
  await prisma.event.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.user.deleteMany();

  // ── Main user (Alex Chen — demo protagonist) ──────────────────────────
  // xp_total is derived from the canonical follow seed so it always equals
  // Σ followed artists + Σ followed teams + reward XP. See
  // src/lib/data/seedFandoms.ts. The xp_transactions block below must sum to
  // REWARDS_XP_TOTAL for the audit log to balance.
  const ALEX_XP_TOTAL = totalSeededXp();
  const mainUser = await prisma.user.create({
    data: {
      fan_id: 'fan_001',
      name: 'Alex Chen',
      handle: 'alexchen',
      avatar_initials: 'AC',
      avatar_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces',
      rewards_redeemed: 12,
      city: 'Los Angeles',
      xp_total: ALEX_XP_TOTAL,
      current_tier: tierFromXp(ALEX_XP_TOTAL),
      streak_days: 12,
      rank: 18,
      percentile: 3,
      top_artist: 'The Weeknd',
      top_venue: 'SoFi Stadium',
      events_attended: 9,
      lastfm_username: 'alexchen_music',
    },
  });

  // ── LA Users (29) ───────────────────────────────────────────────────────
  // Re-authored to span all five display tiers under the 10K/100K/250K/1M
  // scale: ~2 Elite, several Superfan, a band of Loyal, a band of Fan, and a
  // tail of Newcomer (sub-Fan) so demo screens can show every state.
  const laUsers: { name: string; xp: number }[] = [
    { name: 'Sarah Kim', xp: 1_180_000 },       // Elite
    { name: 'Mike Rodriguez', xp: 1_080_000 },  // Elite
    { name: 'Emma Davis', xp: 970_000 },        // Superfan
    { name: 'Jordan Lee', xp: 880_000 },
    { name: 'Aaliyah Thompson', xp: 800_000 },
    { name: 'Kai Morales', xp: 720_000 },
    { name: 'Sofia Ramirez', xp: 650_000 },
    { name: 'Marcus Davis', xp: 580_000 },
    { name: 'Zoe Park', xp: 510_000 },
    { name: 'Liam Foster', xp: 440_000 },
    { name: 'Maya Chen', xp: 380_000 },
    { name: 'Noah Williams', xp: 320_000 },
    { name: 'Olivia Nguyen', xp: 270_000 },     // Superfan floor
    { name: 'Ethan Brooks', xp: 230_000 },      // Loyal
    { name: 'Isabella Torres', xp: 190_000 },
    { name: 'Aiden Rivera', xp: 160_000 },
    { name: 'Mia Jackson', xp: 130_000 },
    { name: 'Lucas Hernandez', xp: 105_000 },   // Loyal floor
    { name: 'Ava Mitchell', xp: 88_000 },       // Fan
    { name: 'Jayden Cooper', xp: 65_000 },
    { name: 'Chloe Anderson', xp: 48_000 },
    { name: 'Ryan Evans', xp: 35_000 },
    { name: 'Lily Morgan', xp: 25_000 },
    { name: 'Tyler Reed', xp: 18_000 },
    { name: 'Grace Kim', xp: 12_000 },          // Fan floor
    { name: 'David Patel', xp: 8_500 },         // Newcomer
    { name: 'Hannah Scott', xp: 5_200 },
    { name: 'Brandon White', xp: 2_800 },
    { name: 'Emily Flores', xp: 1_100 },
  ];

  // ── SF Users (25) ──────────────────────────────────────────────────────
  const sfUsers: { name: string; xp: number }[] = [
    { name: 'Ryan Nakamura', xp: 1_030_000 },   // Elite
    { name: 'Priya Sharma', xp: 880_000 },      // Superfan
    { name: 'Derek Chang', xp: 760_000 },
    { name: 'Nina Volkov', xp: 660_000 },
    { name: 'Tommy Tran', xp: 570_000 },
    { name: 'Jasmine Wu', xp: 490_000 },
    { name: 'Connor Bailey', xp: 420_000 },
    { name: 'Aisha Okafor', xp: 360_000 },
    { name: 'Leo Tanaka', xp: 310_000 },        // Superfan floor
    { name: 'Rachel Meyer', xp: 265_000 },
    { name: 'Kevin Huang', xp: 220_000 },       // Loyal
    { name: 'Simone Baptiste', xp: 175_000 },
    { name: 'Danny Ortiz', xp: 140_000 },
    { name: 'Megan Fitzgerald', xp: 115_000 },  // Loyal floor
    { name: 'Andre Williams', xp: 95_000 },     // Fan
    { name: 'Yuki Sato', xp: 75_000 },
    { name: 'Tessa Grant', xp: 55_000 },
    { name: 'Omar Hassan', xp: 40_000 },
    { name: 'Jade Liu', xp: 28_000 },
    { name: 'Carlos Medina', xp: 19_000 },
    { name: 'Natalie Ross', xp: 13_000 },       // Fan floor
    { name: 'Finn Callahan', xp: 7_500 },       // Newcomer
    { name: 'Vera Kim', xp: 4_200 },
    { name: 'Isaac Brown', xp: 1_800 },
    { name: 'Amara Jackson', xp: 500 },
  ];

  // ── NYC Users (25) ─────────────────────────────────────────────────────
  const nycUsers: { name: string; xp: number }[] = [
    { name: 'Darius Washington', xp: 1_210_000 },  // Elite (top global)
    { name: 'Lucia Fernandez', xp: 950_000 },      // Superfan
    { name: 'Brian O\'Malley', xp: 820_000 },
    { name: 'Zara Ahmed', xp: 700_000 },
    { name: 'Marcus Thompson', xp: 600_000 },
    { name: 'Hannah Goldstein', xp: 520_000 },
    { name: 'Jake Martinez', xp: 450_000 },
    { name: 'Tyler Jefferson', xp: 390_000 },
    { name: 'Chiara Romano', xp: 330_000 },
    { name: 'Devon Clarke', xp: 280_000 },         // Superfan floor
    { name: 'Sonia Patel', xp: 235_000 },          // Loyal
    { name: 'James Kowalski', xp: 195_000 },
    { name: 'Destiny Robinson', xp: 155_000 },
    { name: 'Antoine Dubois', xp: 125_000 },
    { name: 'Michelle Santos', xp: 100_000 },      // Loyal floor (exact)
    { name: 'Keith Washington', xp: 80_000 },      // Fan
    { name: 'Gabriella Cruz', xp: 60_000 },
    { name: 'Trevor Simmons', xp: 45_000 },
    { name: 'Nina Petrova', xp: 32_000 },
    { name: 'Isaiah Moore', xp: 22_000 },
    { name: 'Lauren McCarthy', xp: 14_000 },
    { name: 'Vincent Tao', xp: 10_500 },           // Fan floor (just above)
    { name: 'Daniela Ruiz', xp: 6_500 },           // Newcomer
    { name: 'Nathan Foster', xp: 3_200 },
    { name: 'Alana Mitchell', xp: 800 },
  ];

  // Create all users with auto-generated fan_ids
  let fanCounter = 2; // fan_001 is Alex Chen
  const allCityUsers = [
    ...laUsers.map(u => ({ ...u, city: 'Los Angeles' })),
    ...sfUsers.map(u => ({ ...u, city: 'San Francisco' })),
    ...nycUsers.map(u => ({ ...u, city: 'New York' })),
  ];

  for (const u of allCityUsers) {
    const fanId = `fan_${String(fanCounter).padStart(3, '0')}`;
    fanCounter++;
    const tier = tierFromXp(u.xp);
    const streak = Math.floor(seedHash(u.name + 'streak') * 30);
    const events = Math.floor(seedHash(u.name + 'events') * 50) + 1;

    await prisma.user.create({
      data: {
        fan_id: fanId,
        name: u.name,
        avatar_initials: initials(u.name),
        city: u.city,
        xp_total: u.xp,
        current_tier: tier,
        streak_days: streak,
        events_attended: events,
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

  // ── XP Transactions (rewards audit log for Alex Chen) ────────────────
  // Must sum to REWARDS_XP_TOTAL (currently 90,000). Each amount is derived
  // from the canonical rate constants in src/lib/domain/xp-rules.js so the
  // "Universal Point System" card on /score (which displays the same per-unit
  // rates) is internally consistent with the ledger.
  //   60 × +500   = 30,000  Verified check-ins
  //   3000 × +10  = 30,000  Spotify listening hours
  //   400 × +50   = 20,000  Live trivia correct answers
  //   50 × +200   = 10,000  Consecutive event streak bonus
  //                ─────
  //                90,000  = REWARDS_XP_TOTAL
  const xpTransactions = [
    { amount: 60 * XP_PER_CHECKIN,             source: 'Verified Check-ins',       description: '60 verified event check-ins × 500' },
    { amount: 3000 * XP_PER_LISTENING_HOUR,    source: 'Spotify Listening',        description: '3000 listening hours × 10/hr' },
    { amount: 400 * XP_PER_TRIVIA_CORRECT,     source: 'Live Trivia',              description: '400 trivia correct answers × 50' },
    { amount: 50 * XP_PER_STREAK_BONUS,        source: 'Streak Bonus',             description: '50 consecutive-event streak bonuses × 200' },
  ];

  // Sanity-check at seed time: a refactor to the per-source amounts above must
  // keep the sum in lockstep with REWARDS_XP_TOTAL, otherwise xp_total stops
  // equalling Σ follows + Σ rewards.
  const rewardsSum = xpTransactions.reduce((s, tx) => s + tx.amount, 0);
  if (rewardsSum !== REWARDS_XP_TOTAL) {
    throw new Error(
      `xp_transactions sum (${rewardsSum}) != REWARDS_XP_TOTAL (${REWARDS_XP_TOTAL})`,
    );
  }

  for (const tx of xpTransactions) {
    await prisma.xpTransaction.create({
      data: { user_id: mainUser.id, ...tx },
    });
  }

  // ── Leaderboard entries (all periods, with variation) ─────────────────
  const allUsers = await prisma.user.findMany({ orderBy: { xp_total: 'desc' } });

  const periods = ['WEEKLY', 'MONTHLY', 'ALL_TIME'] as const;
  for (const period of periods) {
    // Apply XP variation per period so rankings differ
    const adjusted = allUsers.map(user => {
      let xp = user.xp_total;
      if (period === 'WEEKLY') {
        // Weekly: more variance — some users had big weeks, others quiet
        xp = Math.round(xp * (0.5 + seedHash(user.name + 'WEEKLY') * 1.0));
      } else if (period === 'MONTHLY') {
        // Monthly: moderate variance
        xp = Math.round(xp * (0.75 + seedHash(user.name + 'MONTHLY') * 0.5));
      }
      return { ...user, adjustedXp: xp };
    });

    // Sort by adjusted XP and assign ranks per city
    const cities = ['Los Angeles', 'San Francisco', 'New York'];
    for (const city of cities) {
      const cityUsers = adjusted
        .filter(u => u.city === city)
        .sort((a, b) => b.adjustedXp - a.adjustedXp);

      const entries = cityUsers.map((user, index) => ({
        user_id: user.id,
        name: user.name,
        xp_total: user.adjustedXp,
        tier: user.current_tier,
        rank: index + 1,
        city: user.city,
        period,
      }));

      if (entries.length > 0) {
        await prisma.leaderboardEntry.createMany({ data: entries });
      }
    }
  }

  // ── Demo events (so TICKET passes can link to them) ───────────────────
  await prisma.event.createMany({
    data: [
      {
        event_id: 'evt_ariana_grande_2026_06_13',
        title: 'Ariana Grande — The Eternal Sunshine Tour',
        artist: 'Ariana Grande',
        venue: 'Crypto.com Arena',
        city: 'Los Angeles',
        date: new Date('2026-06-13T19:30:00Z'),
        category: 'MUSIC',
        status: 'upcoming',
        featured: true,
        trending: true,
      },
      {
        event_id: 'evt_don_toliver_2026_06_28',
        title: 'Don Toliver: Octane Tour',
        artist: 'Don Toliver',
        venue: 'Crypto.com Arena',
        city: 'Los Angeles',
        date: new Date('2026-06-28T20:00:00Z'),
        category: 'MUSIC',
        status: 'upcoming',
        featured: false,
        trending: true,
      },
    ],
  });

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
        pass_kind: 'PERK',
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
      // Wallet-enabled TICKET passes for the attendance demo
      {
        pass_id: 'pass_tkt_ariana_001',
        user_id: mainUser.id,
        title: 'Ariana Grande · Floor GA',
        description: 'Eternal Sunshine Tour — Crypto.com Arena, Jun 13 2026',
        tier: 'ELITE',
        status: 'ACTIVE',
        valid_until: new Date('2026-06-14'),
        claimed_at: new Date('2026-05-20'),
        pass_kind: 'TICKET',
        event_id: 'evt_ariana_grande_2026_06_13',
        apple_wallet_serial: 'mxs-ticket-ariana-fan001-001',
      },
      {
        pass_id: 'pass_tkt_dontoliver_001',
        user_id: mainUser.id,
        title: 'Don Toliver · Sec 101 Row 12',
        description: 'Octane Tour — Crypto.com Arena, Jun 28 2026',
        tier: 'SUPERFAN',
        status: 'ACTIVE',
        valid_until: new Date('2026-06-29'),
        claimed_at: new Date('2026-05-22'),
        pass_kind: 'TICKET',
        event_id: 'evt_don_toliver_2026_06_28',
        apple_wallet_serial: 'mxs-ticket-toliver-fan001-001',
      },
    ],
  });

  // ── Friend activities (for Alex Chen) ─────────────────────────────────
  // LA friends
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
      // SF friends
      { user_id: mainUser.id, friend_name: 'Priya Sharma', activity: 'attended Outside Lands festival', xp_change: 450 },
      { user_id: mainUser.id, friend_name: 'Tommy Tran', activity: 'discovered 3 new artists this week', xp_change: 120 },
      { user_id: mainUser.id, friend_name: 'Aisha Okafor', activity: 'reached Superfan tier', xp_change: 300 },
      // NYC friends
      { user_id: mainUser.id, friend_name: 'Lucia Fernandez', activity: 'attended Bad Bunny at MSG', xp_change: 380 },
      { user_id: mainUser.id, friend_name: 'Tyler Jefferson', activity: 'completed Weekend Warrior challenge', xp_change: 600 },
      { user_id: mainUser.id, friend_name: 'Sonia Patel', activity: 'referred 5 friends to join', xp_change: 250 },
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

  // ── Followed artists (for Alex Chen) ──────────────────────────────────
  const followedSeed = [
    { display_name: 'The Weeknd' },
    { display_name: 'Kaytranada' },
    { display_name: 'Daniel Caesar' },
    { display_name: 'ODESZA' },
  ];
  await prisma.followedArtist.createMany({
    data: followedSeed.map(f => ({
      user_id: mainUser.id,
      display_name: f.display_name,
      lastfm_name: f.display_name.trim().toLowerCase(),
    })),
  });

  // ── Sample listening events for Alex Chen (recent listens panel) ──────
  // Mix of followed-artist plays (is_followed=true) and others. played_at
  // spaced across the last 24 hours so the "Recent listens" demo isn't all
  // bunched up.
  const now = Date.now();
  const minuteMs = 60_000;
  const listens = [
    { artist: 'The Weeknd',     track: 'Blinding Lights',      ago: 15,  dur: 200, followed: true },
    { artist: 'The Weeknd',     track: 'Save Your Tears',      ago: 19,  dur: 215, followed: true },
    { artist: 'Kaytranada',     track: '10%',                  ago: 47,  dur: 198, followed: true },
    { artist: 'Daniel Caesar',  track: 'Best Part',            ago: 88,  dur: 230, followed: true },
    { artist: 'ODESZA',         track: 'A Moment Apart',       ago: 140, dur: 248, followed: true },
    { artist: 'Tame Impala',    track: 'The Less I Know',      ago: 250, dur: 220, followed: false },
    { artist: 'Kaytranada',     track: 'Lite Spots',           ago: 480, dur: 215, followed: true },
    { artist: 'SZA',            track: 'Snooze',               ago: 720, dur: 200, followed: false },
    { artist: 'The Weeknd',     track: 'After Hours',          ago: 900, dur: 360, followed: true },
    { artist: 'Frank Ocean',    track: 'Pink + White',         ago: 1200, dur: 184, followed: false },
  ];
  await prisma.listeningEvent.createMany({
    data: listens.map(l => ({
      user_id: mainUser.id,
      artist_display_name: l.artist,
      artist_name_canonical: l.artist.trim().toLowerCase(),
      track_name: l.track,
      played_at: new Date(now - l.ago * minuteMs),
      source: 'LASTFM',
      duration_seconds: l.dur,
      is_followed: l.followed,
    })),
  });

  // ── FanTier rows (Alex Chen) ──────────────────────────────────────────
  // One row per followed artist + team, with lifetime_points equal to the
  // canonical seed. points_balance starts == lifetime_points; redemptions below
  // subtract from balance only.
  const fanTierRows = [
    ...FOLLOWED_ARTISTS.map(a => ({
      user_id: mainUser.id,
      fandom_id: a.id,
      fandom_kind: 'ARTIST' as const,
      lifetime_points: a.points,
      points_balance: a.points,
    })),
    ...FOLLOWED_TEAMS.map(t => ({
      user_id: mainUser.id,
      fandom_id: t.id,
      fandom_kind: 'TEAM' as const,
      lifetime_points: t.points,
      points_balance: t.points,
    })),
  ];
  await prisma.fanTier.createMany({ data: fanTierRows });

  // Alex's default selected fandom = The Weeknd (highest-points music fandom)
  await prisma.user.update({
    where: { id: mainUser.id },
    data: { selected_fandom_id: 'weeknd' },
  });

  // ── Reward catalog ────────────────────────────────────────────────────
  // Per-fandom rewards split by tier_required. Point costs come from the
  // /access mockup (48hr Early Presale = 600, Soundcheck = 1,200, Meet &
  // Greet = 2,500, Backstage Experience = 3,000). Included-from-lower-tier
  // perks are flagged is_included_perk=true and have no cost.
  type RewardSeed = {
    name: string; point_cost: number; tier_required: 'NEWCOMER' | 'FAN' | 'LOYAL' | 'SUPERFAN' | 'ELITE';
    icon?: string; is_included?: boolean; image_url?: string;
  };
  const ARTIST_REWARDS: RewardSeed[] = [
    // Elite-tier unlockables (the four hero cards in the mockup)
    { name: '48hr Early Presale',  point_cost: 600,   tier_required: 'ELITE', image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop' },
    { name: 'Soundcheck Access',   point_cost: 1_200, tier_required: 'ELITE', image_url: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=400&fit=crop' },
    { name: 'Meet and Greet',      point_cost: 2_500, tier_required: 'ELITE', image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop' },
    { name: 'Backstage Experience', point_cost: 3_000, tier_required: 'ELITE', image_url: 'https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=400&h=400&fit=crop' },
    // Included from lower tiers
    { name: 'Presale Access Window', point_cost: 0, tier_required: 'SUPERFAN', icon: 'Ticket', is_included: true },
    { name: 'VIP Lane',              point_cost: 0, tier_required: 'LOYAL',    icon: 'Users',  is_included: true },
    { name: 'Food Credit',           point_cost: 0, tier_required: 'FAN',      icon: 'UtensilsCrossed', is_included: true },
  ];
  const TEAM_REWARDS: RewardSeed[] = [
    { name: 'Season Ticket Presale', point_cost: 500,  tier_required: 'ELITE',    image_url: null as any },
    { name: 'Courtside Upgrade',     point_cost: 2_000, tier_required: 'ELITE',    image_url: null as any },
    { name: 'Locker Room Tour',      point_cost: 2_800, tier_required: 'ELITE',    image_url: null as any },
    { name: 'Pre-Game Warmups Pass', point_cost: 3_200, tier_required: 'ELITE',    image_url: null as any },
    { name: 'Single-Game Presale',   point_cost: 0,    tier_required: 'SUPERFAN', icon: 'Ticket', is_included: true },
    { name: 'Express Entry',         point_cost: 0,    tier_required: 'LOYAL',    icon: 'Users',  is_included: true },
    { name: 'Concession Credit',     point_cost: 0,    tier_required: 'FAN',      icon: 'UtensilsCrossed', is_included: true },
  ];

  const rewardData = [
    ...FOLLOWED_ARTISTS.flatMap(a => ARTIST_REWARDS.map((r, i) => ({
      fandom_id: a.id, fandom_kind: 'ARTIST' as const,
      name: r.name, point_cost: r.point_cost, tier_required: r.tier_required,
      image_url: r.image_url ?? null, icon_name: r.icon ?? null,
      is_included_perk: r.is_included ?? false, sort_order: i,
    }))),
    ...FOLLOWED_TEAMS.flatMap(t => TEAM_REWARDS.map((r, i) => ({
      fandom_id: t.id, fandom_kind: 'TEAM' as const,
      name: r.name, point_cost: r.point_cost, tier_required: r.tier_required,
      image_url: r.image_url ?? null, icon_name: r.icon ?? null,
      is_included_perk: r.is_included ?? false, sort_order: i,
    }))),
  ];
  await prisma.reward.createMany({ data: rewardData });

  // ── Reward redemptions (Alex Chen) ────────────────────────────────────
  // A chronological log of what Alex has redeemed across his followed fandoms.
  // Each entry resolves a real Reward row, writes a RewardRedemption with a
  // spaced-out redeemed_at, decrements that fandom's points_balance, and
  // sets User.rewards_redeemed (the denormalized profile counter).
  // points_spent matches the catalog cost for that reward.
  type RedemptionSeed = {
    fandom_id: string;
    reward_name: string;
    days_ago: number;
  };
  const redemptionSeeds: RedemptionSeed[] = [
    { fandom_id: 'weeknd',        reward_name: 'Backstage Experience',  days_ago: 7   },
    { fandom_id: 'weeknd',        reward_name: 'Meet and Greet',        days_ago: 24  },
    { fandom_id: 'weeknd',        reward_name: 'Soundcheck Access',     days_ago: 52  },
    { fandom_id: 'weeknd',        reward_name: '48hr Early Presale',    days_ago: 88  },
    { fandom_id: 'kaytranada',    reward_name: 'Soundcheck Access',     days_ago: 14  },
    { fandom_id: 'kaytranada',    reward_name: '48hr Early Presale',    days_ago: 41  },
    { fandom_id: 'daniel-caesar', reward_name: '48hr Early Presale',    days_ago: 33  },
    { fandom_id: 'lakers',        reward_name: 'Courtside Upgrade',     days_ago: 12  },
    { fandom_id: 'lakers',        reward_name: 'Season Ticket Presale', days_ago: 65  },
    { fandom_id: 'lakers',        reward_name: 'Pre-Game Warmups Pass', days_ago: 110 },
    { fandom_id: 'ducks',         reward_name: 'Season Ticket Presale', days_ago: 19  },
    { fandom_id: 'rams',          reward_name: 'Season Ticket Presale', days_ago: 28  },
  ];

  // Tally per-fandom spend to apply a single points_balance decrement per
  // FanTier row at the end — keeps the math obvious if a redemption is added
  // and avoids N round-trips through .update() inside the loop.
  const spentByFandom = new Map<string, number>();
  for (const r of redemptionSeeds) {
    const reward = await prisma.reward.findFirst({
      where: { fandom_id: r.fandom_id, name: r.reward_name },
    });
    if (!reward) {
      throw new Error(`Reward not found for redemption seed: ${r.fandom_id} / ${r.reward_name}`);
    }
    await prisma.rewardRedemption.create({
      data: {
        user_id: mainUser.id,
        reward_id: reward.id,
        points_spent: reward.point_cost,
        redeemed_at: new Date(now - r.days_ago * 24 * 60 * minuteMs),
      },
    });
    spentByFandom.set(r.fandom_id, (spentByFandom.get(r.fandom_id) ?? 0) + reward.point_cost);
  }

  for (const [fandom_id, spent] of spentByFandom) {
    await prisma.fanTier.update({
      where: { user_id_fandom_id: { user_id: mainUser.id, fandom_id } },
      data: { points_balance: { decrement: spent } },
    });
  }

  // ── Override balances to match the Home mockup precisely ─────────────
  // Hero Universal Balance must read 8,750 = sum of the three rows below.
  // Everything else is zeroed so the top-3-by-balance list also matches.
  // lifetime_points are untouched so tier chips still resolve correctly
  // (Weeknd Elite, Ducks Loyal, Ariana Fan).
  const MOCKUP_BALANCES: Record<string, number> = {
    'weeknd': 5_480,
    'ducks': 2_340,
    'ariana-grande': 930,
  };
  const allFanTiers = await prisma.fanTier.findMany({
    where: { user_id: mainUser.id },
    select: { fandom_id: true },
  });
  for (const { fandom_id } of allFanTiers) {
    const target = MOCKUP_BALANCES[fandom_id] ?? 0;
    await prisma.fanTier.update({
      where: { user_id_fandom_id: { user_id: mainUser.id, fandom_id } },
      data: { points_balance: target },
    });
  }

  // Sync the denormalized counter so the Profile stats card matches the table.
  await prisma.user.update({
    where: { id: mainUser.id },
    data: { rewards_redeemed: redemptionSeeds.length },
  });

  const totalUsers = await prisma.user.count();
  const totalLeaderboard = await prisma.leaderboardEntry.count();
  const totalFriendActivities = await prisma.friendActivity.count();
  const totalFollowed = await prisma.followedArtist.count();
  const totalListens = await prisma.listeningEvent.count();
  const totalFanTiers = await prisma.fanTier.count();
  const totalRewards = await prisma.reward.count();
  console.log(`Seed completed: ${totalUsers} users, ${totalLeaderboard} leaderboard entries, ${totalFriendActivities} friend activities, 8 challenges, 10 passes (2 wallet tickets), 2 events, ${totalFollowed} followed artists, ${totalListens} listening events, ${totalFanTiers} fan tiers, ${totalRewards} rewards`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
