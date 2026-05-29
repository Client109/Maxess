// Profile page server load — fan profile, XP breakdown, recent activity
import { getUserByFanId, getXpBreakdown, getRecentActivity } from '$lib/server/database.js';
import { transformUserToFan, transformRecentActivity } from '$lib/server/transforms.js';

export async function load() {
  const dbUser = await getUserByFanId('fan_001');

  if (!dbUser) {
    return { fan: null, recentActivity: [], xpBreakdown: {} };
  }

  const xpBreakdown = await getXpBreakdown('fan_001');
  const fan = { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown };

  const dbRecentActivity = await getRecentActivity('fan_001', 20);
  const recentActivity = dbRecentActivity.map(transformRecentActivity);

  return {
    fan,
    recentActivity,
    xpBreakdown,
  };
}
