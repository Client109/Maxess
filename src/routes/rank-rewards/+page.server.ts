// Rank & Rewards page server load — leaderboard, challenges, passes
import {
  getUserByFanId,
  getLeaderboard,
  getUserChallenges,
  getFriendActivity,
  getUserPasses,
  getFeaturedOffers,
} from '$lib/server/database.js';
import {
  transformUserToFan,
  transformLeaderboardEntry,
  transformChallenge,
  transformPass,
  transformFriendActivity,
  getTierPerks,
} from '$lib/server/transforms.js';
import { getXpBreakdown } from '$lib/server/database.js';

export async function load({ url }) {
  const tab = url.searchParams.get('tab') || 'rank';
  const dbUser = await getUserByFanId('fan_001');

  if (!dbUser) {
    return { tab, fan: null, rank: null, rewards: null };
  }

  const xpBreakdown = await getXpBreakdown('fan_001');
  const fan = { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown };

  // My Rank data
  const dbLeaderboard = await getLeaderboard('WEEKLY');
  const leaderboard = dbLeaderboard.map(e => transformLeaderboardEntry(e, dbUser.id));

  const dbChallenges = await getUserChallenges('fan_001');
  const challenges = dbChallenges.map(transformChallenge);

  const dbFriendActivity = await getFriendActivity('fan_001', 10);
  const friendActivity = dbFriendActivity.map(transformFriendActivity);

  // My Rewards data
  const dbPasses = await getUserPasses('fan_001');
  const passes = dbPasses.map(transformPass);

  const dbFeaturedOffers = await getFeaturedOffers(5);
  const featuredOffers = dbFeaturedOffers.map(transformPass);

  const tierPerks = getTierPerks();

  return {
    tab,
    fan,
    rank: {
      leaderboard,
      challenges,
      friendActivity,
    },
    rewards: {
      passes,
      featuredOffers,
      tierPerks,
    },
  };
}
