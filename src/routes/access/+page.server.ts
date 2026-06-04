// Access page — presales, perks, and progress
import {
  getUserByFanId,
  getUserPasses,
  getFeaturedOffers,
} from '$lib/server/database.js';
import {
  transformUserToFan,
  transformPass,
} from '$lib/server/transforms.js';

export async function load() {
  const dbUser = await getUserByFanId('fan_001');

  if (!dbUser) {
    return { fan: null, passes: [], featuredOffers: [], topArtists: [] };
  }

  const [dbPasses, dbFeaturedOffers] = await Promise.all([
    getUserPasses('fan_001'),
    getFeaturedOffers(5),
  ]);

  const fan = transformUserToFan(dbUser);
  const passes = dbPasses.map(transformPass);
  const featuredOffers = dbFeaturedOffers.map(transformPass);

  // Mock top artists/teams with per-artist progress
  const topArtists = [
    { id: 'weeknd', name: 'The Weeknd', image: '/images/weeknd.jpg', points: 5840, tier: 'Elite', tier_color: '#FF5C00', next_tier: 'Elite+', pts_to_next: 1160, progress: 0.83 },
    { id: 'ducks', name: 'Anaheim Ducks', image: '/images/ducks.jpg', points: 5120, tier: 'Elite', tier_color: '#FF5C00', next_tier: 'Elite+', pts_to_next: 880, progress: 0.85 },
    { id: 'kaytranada', name: 'Kaytranada', image: '/images/kaytranada.jpg', points: 2780, tier: 'Superfan', tier_color: '#3B28CC', next_tier: 'Elite', pts_to_next: 220, progress: 0.93 },
  ];

  const activePasses = passes.filter(p => p.status === 'active');
  const expiringSoon = passes.filter(p => p.status === 'starts_soon');

  return {
    fan,
    passes,
    featuredOffers,
    topArtists,
    activePasses: activePasses.length,
    expiringSoon: expiringSoon.length,
  };
}
