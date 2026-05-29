import type { Fan, Event, LeaderboardEntry, Challenge, Pass, FriendActivity, RecentActivity } from '../domain/types.js';

// Mock Fan Profile
export const mockFanProfile: Fan = {
  fan_id: 'fan_001',
  name: 'Alex Chen',
  xp_total: 8750,
  current_tier: 'Gold',
  streak_days: 12,
  rank: 18,
  percentile: 3,
  top_artist: 'The Midnight',
  top_venue: 'The Fillmore',
  events_attended: 34,
  xp_breakdown: {
    'Event Attendance': 6200,
    'Venue Check-ins': 1800,
    'Challenges': 450,
    'Referrals': 300,
    'Listening': 0
  },
  city: 'Los Angeles',
  member_since: '2023-08-15',
  avatar_initials: 'AC'
};

// Mock Events
export const mockEvents: Event[] = [
  {
    event_id: 'evt_001',
    title: 'Arctic Monkeys',
    subtitle: 'Tranquility Base Hotel Tour',
    category: 'music',
    date: '2024-06-15',
    time: '8:00 PM',
    venue: 'Hollywood Bowl',
    city: 'Los Angeles',
    access_type: 'VENUE ACCESS',
    status: 'upcoming',
    featured: true,
    image_color: '#2667FF',
    metadata: 'Alternative Rock • Presale Tomorrow'
  },
  {
    event_id: 'evt_002',
    title: 'Lakers vs Warriors',
    subtitle: 'Western Conference Showdown',
    category: 'sports',
    date: '2024-06-18',
    time: '7:30 PM',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles',
    access_type: 'GAME ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#FFD700',
    metadata: 'NBA • Playoff Push'
  },
  {
    event_id: 'evt_003',
    title: 'Phoebe Bridgers',
    subtitle: 'Reunion Tour',
    category: 'music',
    date: '2024-06-22',
    time: '8:30 PM',
    venue: 'Greek Theatre',
    city: 'Berkeley',
    access_type: 'PRESALE ACCESS',
    status: 'limited',
    featured: false,
    image_color: '#3B28CC',
    metadata: 'Indie Folk • Limited Tickets'
  },
  {
    event_id: 'evt_004',
    title: 'Dodgers vs Giants',
    subtitle: 'Rivalry Week',
    category: 'sports',
    date: '2024-06-25',
    time: '7:10 PM',
    venue: 'Dodger Stadium',
    city: 'Los Angeles',
    access_type: 'GAME ACCESS',
    status: 'active',
    featured: true,
    image_color: '#1A9E56',
    metadata: 'MLB • Premium Seats Available'
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah Kim', score: 12450, delta: 23, is_me: false, city: 'LA', time_period: 'This week' },
  { rank: 2, name: 'Mike Rodriguez', score: 11890, delta: -5, is_me: false, city: 'LA', time_period: 'This week' },
  { rank: 3, name: 'Emma Davis', score: 11200, delta: 18, is_me: false, city: 'LA', time_period: 'This week' },
  { rank: 18, name: 'Alex Chen', score: 8750, delta: 12, is_me: true, city: 'LA', time_period: 'This week' },
  { rank: 19, name: 'Jordan Lee', score: 8690, delta: 8, is_me: false, city: 'LA', time_period: 'This week' }
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
    reward_name: '500 Bonus XP',
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
    xp_tier_required: 5000,
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
    xp_tier_required: 10000,
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
    xp_tier_required: 2500,
    icon_color: '#8E8E93',
    metadata: 'Access to partner venues'
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