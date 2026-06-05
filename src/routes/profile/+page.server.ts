// Profile page server load — fan identity, artists, sports teams, and point system
import { getUserByFanId, getXpBreakdown } from '$lib/server/database.js';
import { getFollowedArtists, getRecentListens } from '$lib/server/listens.js';
import { transformUserToFan } from '$lib/server/transforms.js';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { getArtistImage } from '$lib/server/music.js';
import { serverConfig } from '$lib/config/env.js';

type ProfileTeam = {
  id: string;
  name: string;
  sport: string;
  points: number;
  tier: 'Fan' | 'Loyal' | 'Superfan' | 'Elite';
  tier_color: string;
  pts_to_next: number;
  next_tier: string;
  progress: number;
  listener_percentile: number;
  image: string | null;
};

const TIERS = [
  { name: 'Fan',      min: 0,    color: '#1A9E56' },
  { name: 'Loyal',    min: 1000, color: '#1A9E56' },
  { name: 'Superfan', min: 3000, color: '#3B28CC' },
  { name: 'Elite',    min: 5000, color: '#FF5C00' },
] as const;

// Deterministic pseudo-random in [0,1) from a string — stable per team across reloads
function seeded(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function deriveTier(points: number) {
  let current = TIERS[0];
  let next: typeof TIERS[number] | null = null;
  for (let i = 0; i < TIERS.length; i++) {
    if (points >= TIERS[i].min) {
      current = TIERS[i];
      next = TIERS[i + 1] ?? null;
    }
  }
  const ceiling = next?.min ?? current.min + 2000;
  const floor = current.min;
  const progress = Math.min(1, Math.max(0, (points - floor) / Math.max(1, ceiling - floor)));
  return {
    tier: current.name,
    tier_color: current.color,
    next_tier: (next?.name ?? current.name),
    pts_to_next: Math.max(0, ceiling - points),
    progress,
  };
}

const FALLBACK_TEAMS: { name: string; sport: string }[] = [
  { name: 'Los Angeles Lakers', sport: 'Basketball' },
  { name: 'LA Clippers', sport: 'Basketball' },
  { name: 'Los Angeles Dodgers', sport: 'Baseball' },
  { name: 'LA Rams', sport: 'Football' },
  { name: 'LA Kings', sport: 'Hockey' },
];

function buildTeam(id: string, name: string, image: string | null, sport: string): ProfileTeam {
  const r = seeded(id || name);
  const points = Math.round(500 + r * 5500); // 500–6000
  const percentile = Math.max(1, Math.round((1 - r) * 30)); // 1–30
  const t = deriveTier(points);
  return {
    id, name, image, sport,
    points,
    listener_percentile: percentile,
    tier: t.tier as ProfileTeam['tier'],
    tier_color: t.tier_color,
    next_tier: t.next_tier,
    pts_to_next: t.pts_to_next,
    progress: t.progress,
  };
}

function fallbackTeams(): ProfileTeam[] {
  return FALLBACK_TEAMS.map((t, i) => buildTeam(`fallback-${i}`, t.name, null, t.sport));
}

async function loadSportsTeams(): Promise<ProfileTeam[]> {
  if (!serverConfig.ticketmaster.apiKey) return fallbackTeams();

  try {
    const tm = new TicketmasterClient(serverConfig.ticketmaster.apiKey);
    const result = await tm.searchEvents({
      city: 'Los Angeles',
      classificationName: 'Sports',
      size: 50,
      sort: 'date,asc',
    });

    if (!result.success || !result.data?._embedded?.events) return fallbackTeams();

    const seen = new Map<string, ProfileTeam>();
    for (const ev of result.data._embedded.events) {
      const attractions = ev._embedded?.attractions ?? [];
      // The Ticketmaster genre on a Sports attraction is the sport
      // (e.g. "Basketball", "Hockey"). Fall back to the event-level
      // classification if the attraction's own is missing.
      const eventGenre = ev.classifications?.find(c => c.primary)?.genre?.name
        ?? ev.classifications?.[0]?.genre?.name;

      for (const a of attractions) {
        if (seen.has(a.id)) continue;
        // Defensive segment guard: Ticketmaster's Sports-classified events
        // occasionally surface mis-tagged music attractions (cross-genre
        // venues, one-off benefit concerts in arenas). Drop anything whose
        // attraction-level segment isn't Sports so the "All Teams" list on
        // Profile can never display a music artist.
        const segment = (a.classifications?.find(c => c.primary)?.segment?.name
          ?? a.classifications?.[0]?.segment?.name
          ?? '').toLowerCase();
        if (segment && segment !== 'sports') continue;
        const img = a.images?.find(im => im.width >= 200 && im.width <= 800)?.url
          ?? a.images?.[0]?.url
          ?? null;
        const sport = a.classifications?.find(c => c.primary)?.genre?.name
          ?? a.classifications?.[0]?.genre?.name
          ?? eventGenre
          ?? 'Other';
        seen.set(a.id, buildTeam(a.id, a.name, img, sport));
        if (seen.size >= 16) break;
      }
      if (seen.size >= 16) break;
    }

    const teams = [...seen.values()].sort((a, b) => b.points - a.points);
    return teams.length > 0 ? teams : fallbackTeams();
  } catch {
    return fallbackTeams();
  }
}

export async function load() {
  const dbUser = await getUserByFanId('fan_001');

  if (!dbUser) {
    return { fan: null, artists: [], teams: [], topConnection: null, topTeamConnection: null };
  }

  const [xpBreakdown, teams, followedArtists, recentListens] = await Promise.all([
    getXpBreakdown('fan_001'),
    loadSportsTeams(),
    getFollowedArtists('fan_001'),
    getRecentListens('fan_001', 10),
  ]);
  const fan = { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown };

  // Per-artist mock data. Points + tier_color span every tier band so the
  // "All Artists" list demonstrates all four rank colors plus the Newcomer
  // sky-blue. Thresholds (xp.ts → TIERS): 10K / 100K / 250K / 1M.
  const artists = [
    {
      id: 'weeknd',
      name: 'The Weeknd',
      points: 1_250_000,
      tier: 'Elite',
      tier_color: '#FF5C00',
      pts_to_next: 0,
      next_tier: 'Elite',
      progress: 1,
      listener_percentile: 2,
      image: '/images/weeknd.jpg',
    },
    {
      id: 'kaytranada',
      name: 'Kaytranada',
      points: 410_000,
      tier: 'Superfan',
      tier_color: '#3B28CC',
      pts_to_next: 590_000,
      next_tier: 'Elite',
      progress: 0.21,
      listener_percentile: 8,
      image: '/images/kaytranada.jpg',
    },
    {
      id: 'daniel-caesar',
      name: 'Daniel Caesar',
      points: 165_000,
      tier: 'Loyal',
      tier_color: '#2667FF',
      pts_to_next: 85_000,
      next_tier: 'Superfan',
      progress: 0.43,
      listener_percentile: 12,
      image: '/images/daniel-caesar.jpg',
    },
    {
      id: 'odesza',
      name: 'ODESZA',
      points: 42_000,
      tier: 'Fan',
      tier_color: '#1A9E56',
      pts_to_next: 58_000,
      next_tier: 'Loyal',
      progress: 0.36,
      listener_percentile: 15,
      image: '/images/odesza.jpg',
    },
    {
      id: 'arctic-monkeys',
      name: 'Arctic Monkeys',
      points: 4_500,
      tier: 'Newcomer',
      tier_color: '#5AC8FA',
      pts_to_next: 5_500,
      next_tier: 'Fan',
      progress: 0.45,
      listener_percentile: 22,
      image: null,
    },
  ];

  // Pull real portrait images from Spotify (falls back to Last.fm, then null).
  // Done in parallel so the four lookups don't serialize the page load.
  // Each lookup is independently wrapped so one failure doesn't blank the row.
  const artistImages = await Promise.all(
    artists.map(a => getArtistImage(a.name).catch(() => null)),
  );
  const artistsWithImages = artists.map((a, i) => ({
    ...a,
    image: artistImages[i] ?? a.image,
  }));

  const topConnection = artistsWithImages[0];
  const topTeamConnection = teams[0] ?? null;

  return {
    fan,
    artists: artistsWithImages,
    teams,
    topConnection,
    topTeamConnection,
    followedArtists: followedArtists.map(a => ({
      id: a.id,
      display_name: a.display_name,
      image_url: a.image_url,
      followed_at: a.followed_at.toISOString(),
    })),
    recentListens: recentListens.map(l => ({
      id: l.id,
      artist: l.artist_display_name,
      track: l.track_name,
      played_at: l.played_at.toISOString(),
      source: l.source,
      is_followed: l.is_followed,
    })),
  };
}
