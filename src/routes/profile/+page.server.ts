// Profile page server load — fan identity, artists, and point system
import { getUserByFanId, getXpBreakdown } from '$lib/server/database.js';
import { transformUserToFan } from '$lib/server/transforms.js';

export async function load() {
  const dbUser = await getUserByFanId('fan_001');

  if (!dbUser) {
    return { fan: null, artists: [], topConnection: null };
  }

  const xpBreakdown = await getXpBreakdown('fan_001');
  const fan = { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown };

  // Mock per-artist data matching week-9 profile mockup
  const artists = [
    {
      id: 'weeknd',
      name: 'The Weeknd',
      points: 5840,
      tier: 'Elite',
      tier_color: '#FF5C00',
      pts_to_next: 1160,
      next_tier: 'Elite',
      progress: 0.83,
      listener_percentile: 2,
      image: '/images/weeknd.jpg',
    },
    {
      id: 'kaytranada',
      name: 'Kaytranada',
      points: 2780,
      tier: 'Superfan',
      tier_color: '#3B28CC',
      pts_to_next: 220,
      next_tier: 'Superfan',
      progress: 0.93,
      listener_percentile: 8,
      image: '/images/kaytranada.jpg',
    },
    {
      id: 'daniel-caesar',
      name: 'Daniel Caesar',
      points: 1920,
      tier: 'Superfan',
      tier_color: '#3B28CC',
      pts_to_next: 1080,
      next_tier: 'Superfan',
      progress: 0.64,
      listener_percentile: 12,
      image: '/images/daniel-caesar.jpg',
    },
    {
      id: 'odesza',
      name: 'ODESZA',
      points: 1450,
      tier: 'Loyal',
      tier_color: '#1A9E56',
      pts_to_next: 550,
      next_tier: 'Loyal',
      progress: 0.73,
      listener_percentile: 15,
      image: '/images/odesza.jpg',
    },
  ];

  const topConnection = artists[0];

  return {
    fan,
    artists,
    topConnection,
  };
}
