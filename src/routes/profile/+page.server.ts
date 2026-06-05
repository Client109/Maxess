// Profile page server load — fan identity, artists, sports teams, and point system
import { getUserByFanId, getXpBreakdown } from '$lib/server/database.js';
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

  const [xpBreakdown, teams] = await Promise.all([
    getXpBreakdown('fan_001'),
    loadSportsTeams(),
  ]);
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
  };
}
