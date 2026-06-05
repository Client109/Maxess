// Seed script to populate database with demo data
import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

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
  if (xp >= 5000) return 'ELITE';
  if (xp >= 2500) return 'SUPERFAN';
  if (xp >= 1000) return 'LOYAL';
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

  // ── LA Users (29) ───────────────────────────────────────────────────────
  const laUsers: { name: string; xp: number }[] = [
    { name: 'Sarah Kim', xp: 12450 },
    { name: 'Mike Rodriguez', xp: 11890 },
    { name: 'Emma Davis', xp: 11200 },
    { name: 'Jordan Lee', xp: 8690 },
    { name: 'Aaliyah Thompson', xp: 8200 },
    { name: 'Kai Morales', xp: 7800 },
    { name: 'Sofia Ramirez', xp: 7200 },
    { name: 'Marcus Davis', xp: 6800 },
    { name: 'Zoe Park', xp: 6400 },
    { name: 'Liam Foster', xp: 5900 },
    { name: 'Maya Chen', xp: 5500 },
    { name: 'Noah Williams', xp: 4900 },
    { name: 'Olivia Nguyen', xp: 4500 },
    { name: 'Ethan Brooks', xp: 4100 },
    { name: 'Isabella Torres', xp: 3700 },
    { name: 'Aiden Rivera', xp: 3300 },
    { name: 'Mia Jackson', xp: 2900 },
    { name: 'Lucas Hernandez', xp: 2600 },
    { name: 'Ava Mitchell', xp: 2200 },
    { name: 'Jayden Cooper', xp: 1900 },
    { name: 'Chloe Anderson', xp: 1600 },
    { name: 'Ryan Evans', xp: 1300 },
    { name: 'Lily Morgan', xp: 1100 },
    { name: 'Tyler Reed', xp: 900 },
    { name: 'Grace Kim', xp: 700 },
    { name: 'David Patel', xp: 500 },
    { name: 'Hannah Scott', xp: 350 },
    { name: 'Brandon White', xp: 200 },
    { name: 'Emily Flores', xp: 100 },
  ];

  // ── SF Users (25) ──────────────────────────────────────────────────────
  const sfUsers: { name: string; xp: number }[] = [
    { name: 'Ryan Nakamura', xp: 11200 },
    { name: 'Priya Sharma', xp: 10600 },
    { name: 'Derek Chang', xp: 9800 },
    { name: 'Nina Volkov', xp: 9200 },
    { name: 'Tommy Tran', xp: 8500 },
    { name: 'Jasmine Wu', xp: 7900 },
    { name: 'Connor Bailey', xp: 7300 },
    { name: 'Aisha Okafor', xp: 6700 },
    { name: 'Leo Tanaka', xp: 6100 },
    { name: 'Rachel Meyer', xp: 5600 },
    { name: 'Kevin Huang', xp: 5100 },
    { name: 'Simone Baptiste', xp: 4600 },
    { name: 'Danny Ortiz', xp: 4100 },
    { name: 'Megan Fitzgerald', xp: 3600 },
    { name: 'Andre Williams', xp: 3100 },
    { name: 'Yuki Sato', xp: 2700 },
    { name: 'Tessa Grant', xp: 2300 },
    { name: 'Omar Hassan', xp: 1900 },
    { name: 'Jade Liu', xp: 1500 },
    { name: 'Carlos Medina', xp: 1200 },
    { name: 'Natalie Ross', xp: 900 },
    { name: 'Finn Callahan', xp: 650 },
    { name: 'Vera Kim', xp: 400 },
    { name: 'Isaac Brown', xp: 250 },
    { name: 'Amara Jackson', xp: 120 },
  ];

  // ── NYC Users (25) ─────────────────────────────────────────────────────
  const nycUsers: { name: string; xp: number }[] = [
    { name: 'Darius Washington', xp: 13100 },
    { name: 'Lucia Fernandez', xp: 12200 },
    { name: 'Brian O\'Malley', xp: 11400 },
    { name: 'Zara Ahmed', xp: 10700 },
    { name: 'Marcus Thompson', xp: 10000 },
    { name: 'Hannah Goldstein', xp: 9200 },
    { name: 'Jake Martinez', xp: 9500 },
    { name: 'Tyler Jefferson', xp: 8400 },
    { name: 'Chiara Romano', xp: 7800 },
    { name: 'Devon Clarke', xp: 7200 },
    { name: 'Sonia Patel', xp: 6600 },
    { name: 'James Kowalski', xp: 6000 },
    { name: 'Destiny Robinson', xp: 5400 },
    { name: 'Antoine Dubois', xp: 4800 },
    { name: 'Michelle Santos', xp: 4300 },
    { name: 'Keith Washington', xp: 3800 },
    { name: 'Gabriella Cruz', xp: 3300 },
    { name: 'Trevor Simmons', xp: 2800 },
    { name: 'Nina Petrova', xp: 2400 },
    { name: 'Isaiah Moore', xp: 2000 },
    { name: 'Lauren McCarthy', xp: 1600 },
    { name: 'Vincent Tao', xp: 1300 },
    { name: 'Daniela Ruiz', xp: 850 },
    { name: 'Nathan Foster', xp: 500 },
    { name: 'Alana Mitchell', xp: 200 },
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

  const totalUsers = await prisma.user.count();
  const totalLeaderboard = await prisma.leaderboardEntry.count();
  const totalFriendActivities = await prisma.friendActivity.count();
  console.log(`Seed completed: ${totalUsers} users, ${totalLeaderboard} leaderboard entries, ${totalFriendActivities} friend activities, 8 challenges, 10 passes (2 wallet tickets), 2 events`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
