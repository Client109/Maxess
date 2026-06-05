import type { Fan, Event, LeaderboardEntry, Challenge, Pass, FriendActivity, RecentActivity, Notification } from '../domain/types.js';

// Mock Fan Profile
export const mockFanProfile: Fan = {
  fan_id: 'fan_001',
  name: 'Alex Chen',
  xp_total: 750_000,
  superfan_score: 75,
  current_tier: 'Superfan',
  streak_days: 12,
  rank: 12,
  percentile: 3,
  top_artist: 'The Weeknd',
  top_team: 'Anaheim Ducks',
  top_venue: 'SoFi Stadium',
  events_attended: 9,
  xp_breakdown: {
    'Event Attendance': 480_000,   // 48 verified concerts × 10,000
    'Streaming': 215_000,
    'Watch Points': 30_000,
    'Spend Points': 15_000,
    'Challenges': 10_000
  },
  city: 'Los Angeles',
  member_since: '2023-08-15',
  avatar_initials: 'AC'
};

// Mock Events
export const mockEvents: Event[] = [
  // ── Trending / Featured ─────────────────────────────────────────────────────
  {
    event_id: 'evt_001',
    title: 'Kendrick Lamar',
    subtitle: 'Grand National Tour',
    category: 'music',
    date: '2026-06-14',
    date_display: 'Jun 14, 2026',
    time: '7:00 PM',
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    location_display: 'Los Angeles, CA',
    access_type: 'MUSIC ACCESS',
    status: 'upcoming',
    featured: true,
    image_color: '#0a1530',
    image_url: '/images/events/concert-hiphop.jpg',
    genre_tag: 'HIP-HOP',
    heat_score: 98,
    match_percentage: 94,
    sale_status: 'On Sale',
    external_url: 'https://www.ticketmaster.com/kendrick-lamar-tickets/artist/1907571',
    trending: true
  },
  // ── All Events ──────────────────────────────────────────────────────────────
  {
    event_id: 'evt_002',
    title: 'Tyler, the Creator',
    subtitle: 'Chromakopia World Tour',
    category: 'music',
    date: '2026-06-22',
    date_display: 'Jun 22, 2026',
    time: '8:00 PM',
    venue: 'Madison Square Garden',
    city: 'New York',
    location_display: 'New York, NY',
    access_type: 'MUSIC ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#0a1a3d',
    image_url: '/images/events/concert-rap.jpg',
    genre_tag: 'RAP',
    heat_score: 86,
    match_percentage: 88,
    sale_status: 'Selling Fast',
    external_url: 'https://www.ticketmaster.com/tyler-the-creator-tickets/artist/1672573'
  },
  {
    event_id: 'evt_003',
    title: 'SZA',
    subtitle: 'LANA Tour — Encore',
    category: 'music',
    date: '2026-07-05',
    date_display: 'Jul 5, 2026',
    time: '7:30 PM',
    venue: 'United Center',
    city: 'Chicago',
    location_display: 'Chicago, IL',
    access_type: 'MUSIC ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#0d1530',
    image_url: '/images/events/concert-rnb.jpg',
    genre_tag: 'R&B',
    heat_score: 91,
    match_percentage: 82,
    sale_status: 'Available',
    external_url: 'https://www.ticketmaster.com/sza-tickets/artist/2110882'
  },
  {
    event_id: 'evt_004',
    title: 'Coachella 2025',
    subtitle: 'Weekend 1 — Indio, CA',
    category: 'festival',
    date: '2026-04-11',
    date_display: 'Apr 11, 2026',
    time: '12:00 PM',
    venue: 'Empire Polo Club',
    city: 'Indio',
    location_display: 'Indio, CA',
    access_type: 'MUSIC ACCESS',
    status: 'limited',
    featured: false,
    image_color: '#3d2200',
    image_url: '/images/events/festival-outdoor.jpg',
    genre_tag: 'FESTIVAL',
    heat_score: 95,
    match_percentage: 76,
    sale_status: 'Limited',
    external_url: 'https://www.coachella.com'
  },
  {
    event_id: 'evt_005',
    title: 'Lakers vs Celtics',
    subtitle: 'NBA Finals — Game 3',
    category: 'sports',
    date: '2026-06-10',
    date_display: 'Jun 10, 2026',
    time: '6:00 PM',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles',
    location_display: 'Los Angeles, CA',
    access_type: 'SPORTS ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#2e1500',
    image_url: '/images/events/basketball.jpg',
    genre_tag: 'NBA',
    heat_score: 93,
    match_percentage: 71,
    sale_status: 'Selling Fast',
    external_url: 'https://www.ticketmaster.com/los-angeles-lakers-tickets/artist/805946',
    trending: true
  },
  {
    event_id: 'evt_006',
    title: 'Dave Chappelle',
    subtitle: 'Live at the Hollywood Bowl',
    category: 'comedy',
    date: '2026-06-20',
    date_display: 'Jun 20, 2026',
    time: '9:00 PM',
    venue: 'Hollywood Bowl',
    city: 'Los Angeles',
    location_display: 'Los Angeles, CA',
    access_type: 'VENUE ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#1a1a1a',
    image_url: '/images/events/comedy-stage.jpg',
    genre_tag: 'STAND-UP',
    heat_score: 89,
    match_percentage: 65,
    sale_status: 'Available',
    external_url: 'https://www.ticketmaster.com/dave-chappelle-tickets/artist/852860'
  },
  {
    event_id: 'evt_007',
    title: 'Doja Cat',
    subtitle: 'The Scarlet Tour',
    category: 'music',
    date: '2026-07-12',
    date_display: 'Jul 12, 2026',
    time: '8:00 PM',
    venue: 'Kia Forum',
    city: 'Los Angeles',
    location_display: 'Inglewood, CA',
    access_type: 'MUSIC ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#0a1530',
    image_url: '/images/events/concert-pop.jpg',
    genre_tag: 'POP',
    heat_score: 84,
    match_percentage: 79,
    sale_status: 'On Sale',
    external_url: 'https://www.ticketmaster.com/doja-cat-tickets/artist/2517022'
  },
  {
    event_id: 'evt_008',
    title: 'Lollapalooza 2025',
    subtitle: '4-Day Pass — Chicago',
    category: 'festival',
    date: '2026-07-31',
    date_display: 'Jul 31, 2026',
    time: '11:00 AM',
    venue: 'Grant Park',
    city: 'Chicago',
    location_display: 'Chicago, IL',
    access_type: 'MUSIC ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#0a1530',
    image_url: '/images/events/festival-crowd.jpg',
    genre_tag: 'FESTIVAL',
    heat_score: 88,
    match_percentage: 73,
    sale_status: 'Available',
    external_url: 'https://www.lollapalooza.com'
  },
  {
    event_id: 'evt_009',
    title: 'Dodgers vs Giants',
    subtitle: 'MLB Rivalry Week',
    category: 'sports',
    date: '2026-06-15',
    date_display: 'Jun 15, 2026',
    time: '7:10 PM',
    venue: 'Dodger Stadium',
    city: 'Los Angeles',
    location_display: 'Los Angeles, CA',
    access_type: 'SPORTS ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#2e1500',
    image_url: '/images/events/baseball.jpg',
    genre_tag: 'MLB',
    heat_score: 78,
    match_percentage: 68,
    sale_status: 'Available',
    external_url: 'https://www.ticketmaster.com/los-angeles-dodgers-tickets/artist/805956'
  },
  {
    event_id: 'evt_010',
    title: 'John Mulaney',
    subtitle: 'All Over the Place Tour',
    category: 'comedy',
    date: '2026-06-28',
    date_display: 'Jun 28, 2026',
    time: '8:00 PM',
    venue: 'The Wiltern',
    city: 'Los Angeles',
    location_display: 'Los Angeles, CA',
    access_type: 'VENUE ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#0a1a2e',
    image_url: '/images/events/comedy-mic.jpg',
    genre_tag: 'STAND-UP',
    heat_score: 82,
    match_percentage: 60,
    sale_status: 'Selling Fast',
    external_url: 'https://www.ticketmaster.com/john-mulaney-tickets/artist/1352382'
  }
];

// Mock Fans Attending (for "Fans Like You Are Going" section)
export interface FanAttending {
  name: string;
  avatar_initials: string;
  avatar_color: string;
}

export const mockFansAttending: FanAttending[] = [
  { name: 'Jordan', avatar_initials: 'JL', avatar_color: '#FF5C00' },
  { name: 'Kai', avatar_initials: 'KM', avatar_color: '#3B28CC' },
  { name: 'Sofia', avatar_initials: 'SR', avatar_color: '#1A9E56' },
  { name: 'Marcus', avatar_initials: 'MD', avatar_color: '#2667FF' }
];

export const fansAttendingCount = 28;

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  // LA — This week
  { rank: 1, name: 'Sarah Kim', score: 12450, delta: 23, is_me: false, is_friend: false, city: 'LA', time_period: 'This week' },
  { rank: 2, name: 'Mike Rodriguez', score: 11890, delta: -5, is_me: false, is_friend: true, city: 'LA', time_period: 'This week' },
  { rank: 3, name: 'Emma Davis', score: 11200, delta: 18, is_me: false, is_friend: false, city: 'LA', time_period: 'This week' },
  { rank: 12, name: 'Alex Chen', score: 750_000, delta: 12, is_me: true, is_friend: false, city: 'LA', time_period: 'This week' },
  { rank: 19, name: 'Jordan Lee', score: 8690, delta: 8, is_me: false, is_friend: true, city: 'LA', time_period: 'This week' },

  // LA — This month
  { rank: 4, name: 'Priya Shah', score: 38200, delta: 41, is_me: false, is_friend: false, city: 'LA', time_period: 'This month' },
  { rank: 5, name: 'Marcus Diaz', score: 35800, delta: 27, is_me: false, is_friend: false, city: 'LA', time_period: 'This month' },
  { rank: 22, name: 'Kai Wong', score: 24100, delta: -2, is_me: false, is_friend: true, city: 'LA', time_period: 'This month' },

  // LA — All time
  { rank: 6, name: 'Olivia Park', score: 184500, delta: 0, is_me: false, is_friend: false, city: 'LA', time_period: 'All time' },
  { rank: 7, name: 'Devon Brooks', score: 172300, delta: 0, is_me: false, is_friend: false, city: 'LA', time_period: 'All time' },

  // SF
  { rank: 1, name: 'Lin Yang', score: 13100, delta: 14, is_me: false, is_friend: false, city: 'SF', time_period: 'This week' },
  { rank: 2, name: 'Theo Carter', score: 10980, delta: 9, is_me: false, is_friend: false, city: 'SF', time_period: 'This week' },
  { rank: 3, name: 'Nadia Hill', score: 10220, delta: -3, is_me: false, is_friend: true, city: 'SF', time_period: 'This week' },
  { rank: 8, name: 'Ravi Kapoor', score: 42100, delta: 6, is_me: false, is_friend: false, city: 'SF', time_period: 'This month' },
  { rank: 9, name: 'Jules Moreau', score: 39750, delta: 18, is_me: false, is_friend: false, city: 'SF', time_period: 'This month' },
  { rank: 10, name: 'Sienna Walsh', score: 201400, delta: 0, is_me: false, is_friend: false, city: 'SF', time_period: 'All time' },

  // NYC
  { rank: 1, name: 'Avery Nguyen', score: 14820, delta: 31, is_me: false, is_friend: false, city: 'NYC', time_period: 'This week' },
  { rank: 2, name: 'Cole Bennett', score: 12740, delta: -7, is_me: false, is_friend: false, city: 'NYC', time_period: 'This week' },
  { rank: 3, name: 'Maya Goldberg', score: 12010, delta: 22, is_me: false, is_friend: true, city: 'NYC', time_period: 'This week' },
  { rank: 4, name: 'Ezra Fields', score: 44650, delta: 15, is_me: false, is_friend: false, city: 'NYC', time_period: 'This month' },
  { rank: 5, name: 'Tasha Reilly', score: 41020, delta: 4, is_me: false, is_friend: false, city: 'NYC', time_period: 'This month' },
  { rank: 6, name: 'Hiro Tanaka', score: 218900, delta: 0, is_me: false, is_friend: false, city: 'NYC', time_period: 'All time' }
];

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    challenge_id: 'ch_001',
    title: 'Venue Explorer',
    subtitle: 'Visit 3 different venues this month',
    reward_name: 'Free drink voucher',
    tasks: [
      { task_id: 'task_001', description: 'Check in to The Troubadour', is_complete: true },
      { task_id: 'task_002', description: 'Check in to The Roxy', is_complete: true },
      { task_id: 'task_003', description: 'Check in to Whisky a Go Go', is_complete: false }
    ],
    progress_fraction: 0.67,
    is_limited: true,
    thumbnail_image: '🎪',
    expires_in: '5 days'
  },
  {
    challenge_id: 'ch_002',
    title: 'Streak Master',
    subtitle: 'Maintain a 14-day check-in streak',
    reward_name: '500 Bonus Points',
    tasks: [
      { task_id: 'task_004', description: 'Check in 14 consecutive days', is_complete: false }
    ],
    progress_fraction: 0.86,
    is_limited: false,
    thumbnail_image: '🔥',
    expires_in: '2 weeks'
  }
];

// Mock Passes
export const mockPasses: Pass[] = [
  {
    pass_id: 'pass_001',
    name: 'VIP Music Pass',
    venue: 'The Troubadour',
    date: 'Valid through June',
    status: 'active',
    pass_type: 'elite',
    xp_tier_required: 1_000_000,
    icon_color: '#FF5C00',
    metadata: 'Skip lines, priority seating'
  },
  {
    pass_id: 'pass_002',
    name: 'Lakers Season Access',
    venue: 'Crypto.com Arena',
    date: 'Starts June 15',
    status: 'starts_soon',
    pass_type: 'diamond',
    xp_tier_required: 250_000,
    icon_color: '#FFD700',
    metadata: 'Premium seats, meet & greets'
  },
  {
    pass_id: 'pass_003',
    name: 'Local Venues Pass',
    venue: 'Multiple locations',
    date: 'Waiting list position #45',
    status: 'waiting',
    pass_type: 'general',
    xp_tier_required: 10_000,
    icon_color: '#8E8E93',
    metadata: 'Access to partner venues'
  },
  {
    pass_id: 'pass_004',
    name: 'Backstage Lounge Pass',
    venue: 'The Wiltern',
    date: 'Claim by Jul 1',
    status: 'unclaimed',
    pass_type: 'elite',
    xp_tier_required: 1_000_000,
    icon_color: '#3B28CC',
    metadata: 'You earned this — tap to claim'
  }
];

// Mock Friend Activity
export const mockFriendActivity: FriendActivity[] = [
  {
    name: 'Sarah',
    avatar_initials: 'SK',
    activity_label: 'attended Arctic Monkeys, gained 2 ranks',
    delta: 2,
    delta_type: 'up'
  },
  {
    name: 'Mike',
    avatar_initials: 'MR',
    activity_label: 'completed Venue Explorer challenge',
    delta: 1,
    delta_type: 'up'
  },
  {
    name: 'Emma',
    avatar_initials: 'ED',
    activity_label: 'checked into 3 venues this week',
    delta: 0,
    delta_type: 'neutral'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    type: 'event',
    title: 'Presale starts soon',
    body: 'Kendrick Lamar presale opens in 2 hours. You have Elite access.',
    icon: '🎟️',
    time: '2h ago',
    read: false,
    action_url: '/events/evt_001',
  },
  {
    id: 'notif_002',
    type: 'social',
    title: 'Sarah passed you!',
    body: 'Sarah Kim moved to #17, pushing you to #18 on the LA leaderboard.',
    icon: '📊',
    time: '4h ago',
    read: false,
    action_url: '/score',
  },
  {
    id: 'notif_003',
    type: 'reward',
    title: 'Reward unlocked',
    body: 'You completed the Venue Explorer challenge! Claim your free drink voucher.',
    icon: '🎉',
    time: '1d ago',
    read: false,
    action_url: '/access',
  },
  {
    id: 'notif_004',
    type: 'tier',
    title: 'Almost Elite',
    body: "You're 250,000 points away from Elite tier. Keep going!",
    icon: '⭐',
    time: '2d ago',
    read: true,
    action_url: '/profile',
  },
  {
    id: 'notif_005',
    type: 'event',
    title: 'Tyler, the Creator selling fast',
    body: 'Tickets are 80% sold. Get yours before they\'re gone.',
    icon: '🔥',
    time: '3d ago',
    read: true,
    action_url: '/events/evt_002',
  },
];

// Mock Recent Activity
export const mockRecentActivity: RecentActivity[] = [
  {
    activity_id: 'act_001',
    description: 'Checked into The Troubadour',
    xp_amount: 150,
    timestamp: '2 hours ago',
    source_icon: '📍'
  },
  {
    activity_id: 'act_002',
    description: 'Completed daily streak (Day 12)',
    xp_amount: 50,
    timestamp: '1 day ago',
    source_icon: '🔥'
  },
  {
    activity_id: 'act_003',
    description: 'Attended Phoebe Bridgers concert',
    xp_amount: 300,
    timestamp: '3 days ago',
    source_icon: '🎵'
  },
  {
    activity_id: 'act_004',
    description: 'Referred friend Sarah',
    xp_amount: 200,
    timestamp: '1 week ago',
    source_icon: '👥'
  }
];