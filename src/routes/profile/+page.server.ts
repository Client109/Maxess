// Profile page server load — fan identity, artists, sports teams, and point system
import { getUserByFanId, getXpBreakdown, getRecentActivity } from '$lib/server/database.js';
import { getFollowedArtists, getRecentListens } from '$lib/server/listens.js';
import { transformUserToFan, transformRecentActivity } from '$lib/server/transforms.js';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { getArtistImage } from '$lib/server/music.js';
import { serverConfig } from '$lib/config/env.js';
import { classifyArtistTier, pointsToNextArtistTier } from '$lib/domain/xp.js';
import { FOLLOWED_ARTISTS, getSeededTeamByName } from '$lib/data/seedFandoms.js';

type ProfileTeam = {
  id: string;
  name: string;
  sport: string;
  points: number;
  tier: string;
  tier_color: string;
  pts_to_next: number;
  next_tier: string;
  progress: number;
  listener_percentile: number;
  image: string | null;
  is_followed_seed: boolean;
};

// Deterministic pseudo-random in [0,1) from a string — stable per team across reloads
function seeded(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

// Derive tier display fields from raw points using the canonical xp.ts tiers
// (Newcomer 0–9.9K · Fan 10K–99.9K · Loyal 100K–249.9K · Superfan 250K–999.9K
// · Elite 1M+). Returned shape matches what the row UI expects.
function deriveTierDisplay(points: number) {
  const tier = classifyArtistTier(points);
  const next = pointsToNextArtistTier(points);
  return {
    tier: tier.name,
    tier_color: tier.color_hex,
    next_tier: next.nextTier?.name ?? tier.name,
    pts_to_next: next.pointsNeeded,
    progress: next.progress,
  };
}

const FALLBACK_TEAMS: { name: string; sport: string }[] = [
  { name: 'Los Angeles Lakers', sport: 'Basketball' },
  { name: 'LA Clippers', sport: 'Basketball' },
  { name: 'Los Angeles Dodgers', sport: 'Baseball' },
  { name: 'LA Rams', sport: 'Football' },
  { name: 'LA Kings', sport: 'Hockey' },
];

// Build a team row for the Profile "All Teams" list. If the team's name matches
// a canonical FOLLOWED_TEAMS entry, we overlay seeded points + canonical id (so
// follow state and the user's xp_total math stay consistent across the app).
// Non-followed teams get small deterministic points (browse-only).
function buildTeam(id: string, name: string, image: string | null, sport: string): ProfileTeam {
  const seed = getSeededTeamByName(name);
  if (seed) {
    const t = deriveTierDisplay(seed.points);
    return {
      id: seed.id,
      name,
      image,
      sport: seed.sport ?? sport,
      points: seed.points,
      listener_percentile: seed.listener_percentile,
      tier: t.tier,
      tier_color: t.tier_color,
      next_tier: t.next_tier,
      pts_to_next: t.pts_to_next,
      progress: t.progress,
      is_followed_seed: true,
    };
  }
  const r = seeded(id || name);
  const points = Math.round(500 + r * 5500); // 500–6000 (browse-only)
  const percentile = Math.max(20, Math.round(40 + (1 - r) * 50)); // 20–90 (lower-fan than followed teams)
  const t = deriveTierDisplay(points);
  return {
    id, name, image, sport,
    points,
    listener_percentile: percentile,
    tier: t.tier,
    tier_color: t.tier_color,
    next_tier: t.next_tier,
    pts_to_next: t.pts_to_next,
    progress: t.progress,
    is_followed_seed: false,
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

  const [xpBreakdown, teams, followedArtists, recentListens, rawRecentActivity] = await Promise.all([
    getXpBreakdown('fan_001'),
    loadSportsTeams(),
    getFollowedArtists('fan_001'),
    getRecentListens('fan_001', 10),
    getRecentActivity('fan_001', 8).catch(() => [] as any[]),
  ]);
  const fan = { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown };

  // Followed artists — canonical seed (src/lib/data/seedFandoms.ts). Tier color
  // and progress are derived from xp.ts so the bands stay in lockstep with the
  // home page YOUR PROGRESS section.
  const artists = FOLLOWED_ARTISTS.map(a => {
    const t = deriveTierDisplay(a.points);
    return { ...a, ...t };
  });

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
  // YOUR TOP CONNECTION (sports) should be the highest-points team the user
  // actually follows, not the first row in the Ticketmaster browse catalog.
  const topTeamConnection = teams.find(t => t.is_followed_seed) ?? teams[0] ?? null;

  // ── Mockup-driven derived values ──────────────────────────────────────────
  // "Fandom breakdown" on the redesigned Profile shows the user's top 3
  // fandoms across BOTH music and sports, ranked by points. Each row is
  // (image / name / points / tier chip).
  const followedTeamsOnly = teams.filter(t => t.is_followed_seed);
  const fandomBreakdown = [
    ...artistsWithImages.map(a => ({
      id: a.id,
      kind: 'artist' as const,
      name: a.name,
      points: a.points,
      tier: a.tier,
      tier_color: a.tier_color,
      image: a.image,
    })),
    ...followedTeamsOnly.map(t => ({
      id: t.id,
      kind: 'team' as const,
      name: t.name,
      points: t.points,
      tier: t.tier,
      tier_color: t.tier_color,
      image: t.image,
    })),
  ]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  // "Active Fandoms" stat = followed artists + followed teams.
  const activeFandomsCount = artists.length + followedTeamsOnly.length;

  // "Point sources" on the redesigned Profile. Map our existing xp_breakdown
  // categories onto the four labels in the mockup (verified check-ins,
  // Spotify listening, live trivia, streak bonuses). Anything not classified
  // falls back into "Streak bonuses" so the totals reconcile to xp_total.
  const pickXp = (...keys: string[]) =>
    keys.reduce((sum, k) => sum + (xpBreakdown[k] ?? 0), 0);
  const sourceCheckIns = pickXp('Event Attendance', 'Venue Check-ins', 'Attendance', 'Check-ins');
  const sourceStreaming = pickXp('Streaming', 'Spotify', 'Listening', 'Spotify Listening');
  const sourceTrivia = pickXp('Trivia', 'Live Trivia', 'Challenges');
  const allClassified = sourceCheckIns + sourceStreaming + sourceTrivia;
  const sourceStreak = Math.max(0, fan.xp_total - allClassified);

  const pointSources = [
    { id: 'checkins',  label: 'Verified check-ins', points: sourceCheckIns,  icon: 'check'   },
    { id: 'spotify',   label: 'Spotify listening',  points: sourceStreaming, icon: 'spotify' },
    { id: 'trivia',    label: 'Live trivia',        points: sourceTrivia,    icon: 'trivia'  },
    { id: 'streak',    label: 'Streak bonuses',     points: sourceStreak,    icon: 'flame'   },
  ];

  return {
    fan,
    artists: artistsWithImages,
    teams,
    topConnection,
    topTeamConnection,
    fandomBreakdown,
    activeFandomsCount,
    pointSources,
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
    // Real RecentActivity rows (seed populates them; getRecentActivity helper
    // existed but had no consumer until now). Transformed into the same shape
    // mockData.mockRecentActivity used to expose.
    recentActivity: rawRecentActivity.map((ra: any, i: number) => transformRecentActivity(ra, i)),
  };
}
