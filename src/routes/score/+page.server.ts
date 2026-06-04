// Score page server load — leaderboard, challenges, friend activity
import {
  getUserByFanId,
  getAllLeaderboardEntries,
  getFriendUserIds,
  getUserChallenges,
  getFriendActivity,
  getXpBreakdown,
} from '$lib/server/database.js';
import {
  transformUserToFan,
  transformLeaderboardEntry,
  transformChallenge,
  transformFriendActivity,
} from '$lib/server/transforms.js';

export async function load() {
  const dbUser = await getUserByFanId('fan_001');

  if (!dbUser) {
    return { fan: null, rank: null };
  }

  const [xpBreakdown, dbLeaderboard, friendIds, dbChallenges, dbFriendActivity] =
    await Promise.all([
      getXpBreakdown('fan_001'),
      getAllLeaderboardEntries(),
      getFriendUserIds('fan_001'),
      getUserChallenges('fan_001'),
      getFriendActivity('fan_001', 15),
    ]);

  const fan = { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown };
  const leaderboard = dbLeaderboard.map(e => transformLeaderboardEntry(e, dbUser.id, friendIds));
  const challenges = dbChallenges.map(transformChallenge);
  const friendActivity = dbFriendActivity.map(transformFriendActivity);

  return {
    fan,
    rank: {
      leaderboard,
      challenges,
      friendActivity,
    },
  };
}
