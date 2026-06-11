// Transform database records to UI-compatible types
import { classifyTier } from '$lib/domain/xp.js';
import type { Fan, LeaderboardEntry, Challenge, ChallengeTask, Pass, FriendActivity, RecentActivity } from '$lib/domain/types.js';
import type { Tier } from '@prisma/client';

type PassTier = 'elite' | 'diamond' | 'loyal' | 'superfan' | 'general';

// Map Prisma tier enum + xp to UI tier name. The Prisma enum stays 4-wide
// (GENERAL | LOYAL | SUPERFAN | ELITE), but the display layer splits GENERAL
// into "Newcomer" (0–9,999) vs "Fan" (10,000–99,999) at the 10K Fan-floor.
const FAN_THRESHOLD = 10_000;
function tierDisplayName(prismaTier: string, xpTotal: number): 'Newcomer' | 'Fan' | 'Loyal' | 'Superfan' | 'Elite' {
  if (prismaTier === 'ELITE') return 'Elite';
  if (prismaTier === 'SUPERFAN') return 'Superfan';
  if (prismaTier === 'LOYAL') return 'Loyal';
  return xpTotal >= FAN_THRESHOLD ? 'Fan' : 'Newcomer';
}

export function transformUserToFan(user: any): Fan {
  return {
    fan_id: user.fan_id,
    name: user.name,
    xp_total: user.xp_total,
    superfan_score: Math.min(100, Math.round((user.xp_total / 1_000_000) * 100)),
    current_tier: tierDisplayName(user.current_tier, user.xp_total),
    streak_days: user.streak_days,
    rank: user.rank ?? 0,
    percentile: user.percentile ?? 0,
    top_artist: user.top_artist ?? 'Unknown',
    top_venue: user.top_venue ?? 'Unknown',
    events_attended: user.events_attended,
    xp_breakdown: {}, // Populated separately via getXpBreakdown
    city: user.city,
    member_since: user.member_since?.toISOString?.() ?? user.created_at?.toISOString?.() ?? '',
    avatar_initials: user.avatar_initials,
    avatar_url: user.avatar_url ?? null,
    handle: user.handle ?? null,
    rewards_redeemed: user.rewards_redeemed ?? 0,
    spotify_id: user.spotify_id ?? undefined,
    lastfm_username: user.lastfm_username ?? undefined,
    connected_accounts: [
      ...(user.spotify_id ? ['spotify'] : []),
      ...(user.lastfm_username ? ['lastfm'] : []),
      ...(user.discord_id ? ['discord'] : []),
    ],
  };
}

// `currentUserId` is the canonical DB CUID (User.id), not the `fan_id`. Callers
// pass it positionally; the LeaderboardEntry.user_id column we compare against is
// the same User.id, so we match on that.
export function transformLeaderboardEntry(entry: any, currentUserId: string, friendIds: string[] = []): LeaderboardEntry {
  // Deterministic delta based on name + period so it doesn't change on every page load
  let hash = 0;
  const key = entry.name + entry.period;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  }
  const delta = (Math.abs(hash) % 21) - 5; // -5 to +15

  return {
    rank: entry.rank,
    name: entry.name,
    score: entry.xp_total,
    delta,
    is_me: entry.user_id === currentUserId,
    is_friend: friendIds.includes(entry.user_id),
    city: entry.city || 'Los Angeles',
    time_period: entry.period === 'WEEKLY' ? 'This week' : entry.period === 'MONTHLY' ? 'This month' : 'All time',
  };
}

export function transformChallenge(uc: any): Challenge {
  const challenge = uc.challenge;
  const rawTasks = typeof challenge.tasks === 'string' ? JSON.parse(challenge.tasks) : challenge.tasks;
  const completedTaskIds = typeof uc.tasks_completed === 'string' ? JSON.parse(uc.tasks_completed) : uc.tasks_completed;

  const tasks: ChallengeTask[] = rawTasks.map((t: any) => ({
    task_id: `task_${t.id}`,
    description: t.text,
    is_complete: completedTaskIds.includes(t.id) || t.completed === true,
  }));

  const completedCount = tasks.filter(t => t.is_complete).length;

  return {
    challenge_id: challenge.challenge_id,
    title: challenge.title,
    subtitle: challenge.description || '',
    reward_name: `${challenge.xp_reward} pts`,
    tasks,
    progress_fraction: tasks.length > 0 ? completedCount / tasks.length : 0,
    is_limited: challenge.difficulty === 'Hard',
    thumbnail_image: challenge.category === 'Attendance' ? '🎪' :
                      challenge.category === 'Discovery' ? '🎵' :
                      challenge.category === 'Social' ? '👥' : '⭐',
    expires_in: challenge.difficulty === 'Hard' ? '5 days' : '2 weeks',
  };
}

export function transformPass(pass: any): Pass {
  const statusMap: Record<string, 'active' | 'starts_soon' | 'waiting' | 'unclaimed'> = {
    'ACTIVE': 'active',
    'CLAIMED': 'starts_soon',
    'AVAILABLE': 'waiting',
    'EXPIRED': 'waiting',
  };

  const tierMap: Record<Tier, PassTier> = {
    GENERAL: 'general',
    LOYAL: 'loyal',
    SUPERFAN: 'superfan',
    ELITE: 'elite',
  };

  // LOYAL resolves to #2667FF (Loyal blue, matches xp.ts TIERS palette).
  const colorMap: Record<Tier, string> = {
    GENERAL: '#8E8E93',
    LOYAL: '#2667FF',
    SUPERFAN: '#3B28CC',
    ELITE: '#FF5C00',
  };

  // An AVAILABLE pass with no claimant (user_id === null) hasn't been picked up
  // by anyone yet — surface that as 'unclaimed' instead of the generic 'waiting'.
  const baseStatus = statusMap[pass.status] || 'waiting';
  const status = pass.status === 'AVAILABLE' && pass.user_id == null ? 'unclaimed' : baseStatus;

  return {
    pass_id: pass.pass_id,
    name: pass.title,
    venue: pass.description || '',
    date: pass.valid_until
      ? `Valid through ${new Date(pass.valid_until).toLocaleDateString('en-US', { month: 'long' })}`
      : '',
    status,
    pass_type: tierMap[pass.tier as Tier] || 'general',
    xp_tier_required: pass.tier === 'ELITE' ? 1_000_000 : pass.tier === 'SUPERFAN' ? 250_000 : pass.tier === 'LOYAL' ? 100_000 : 10_000,
    icon_color: colorMap[pass.tier as Tier] || '#8E8E93',
    metadata: pass.description,
  };
}

export function transformFriendActivity(fa: any): FriendActivity {
  const initials = fa.friend_name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  const xpChange = fa.xp_change || 0;

  return {
    name: fa.friend_name.split(' ')[0], // First name only
    avatar_initials: initials,
    activity_label: fa.activity,
    delta: Math.ceil(xpChange / 100),
    delta_type: xpChange > 0 ? 'up' : xpChange < 0 ? 'down' : 'neutral',
  };
}

export function transformRecentActivity(ra: any, index: number): RecentActivity {
  const icons: Record<string, string> = {
    'Venue check-in': '📍',
    'Streak bonus': '🔥',
    'Event attendance': '🎵',
    'Social referral': '👥',
    'Challenge progress': '⭐',
    'Streaming milestone': '🎧',
    'Spend Points bonus': '💳',
    'Challenge completed': '🏆',
    'Watch Points': '📺',
    'Social sharing': '📤',
    'Weekly streak bonus': '🔥',
    'Discovery bonus': '🔍',
    'Welcome bonus': '👋',
  };

  // Derive timeAgo from the row's actual created_at, not the array index — the
  // index-based version made every newly-inserted activity appear "2 hours ago"
  // regardless of when it was actually written.
  let timeAgo: string;
  const ms = Date.now() - new Date(ra.created_at).getTime();
  const min = Math.floor(ms / 60_000);
  if (min < 1) timeAgo = 'Just now';
  else if (min < 60) timeAgo = `${min} min ago`;
  else if (min < 24 * 60) timeAgo = `${Math.floor(min / 60)} h ago`;
  else timeAgo = `${Math.floor(min / (24 * 60))} d ago`;

  return {
    activity_id: ra.id || `act_${index}`,
    description: ra.activity,
    xp_amount: ra.xp_earned,
    timestamp: timeAgo,
    source_icon: icons[ra.description] || '⚡',
  };
}

// Static tier perks config
export function getTierPerks() {
  return {
    fan: {
      name: 'Fan',
      color: '#8E8E93',
      perks: ['Basic event access', 'Standard ticketing', 'Community membership'],
    },
    loyal: {
      name: 'Loyal',
      color: '#CD7F32',
      perks: ['Early notifications', 'Points on purchases', 'Member pricing'],
    },
    superfan: {
      name: 'Superfan',
      color: '#3B28CC',
      perks: ['Priority notifications', 'Early bird pricing', 'VIP seating options'],
    },
    elite: {
      name: 'Elite',
      color: '#FF5C00',
      perks: ['Presale access', 'Backstage passes', 'Meet & greets', 'Personal concierge'],
    },
  };
}
