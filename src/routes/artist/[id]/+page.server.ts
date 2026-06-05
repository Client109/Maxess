import { error } from '@sveltejs/kit';
import { mockEvents, mockFanProfile } from '$lib/data/mockData.js';
import { isArtistFollowed, getArtistListeningSummary } from '$lib/server/listens.js';
import { getArtistImage } from '$lib/server/music.js';
import { classifyArtistTier, pointsToNextArtistTier } from '$lib/domain/xp.js';
import { getArtistProfile } from '$lib/data/artistProfiles.js';
import { FOLLOWED_ARTISTS, FOLLOWED_TEAMS } from '$lib/data/seedFandoms.js';

// Bonus artists (kendrick-lamar, sza) aren't in the canonical FOLLOWED_*
// seed but still resolve via the ARTIST_PROFILES registry. Their points
// live here so the hero card shows a sensible tier; canonical fandoms read
// straight from seedFandoms.ts to avoid drift.
const BONUS_ARTIST_POINTS: Record<string, number> = {
  'kendrick-lamar': 320_000,  // Superfan
  'sza':            180_000,  // Loyal
};

// Canonical seed lookup. The 'weeknd' / 'the-weeknd' alias collapses to one
// canonical id so both URLs return the same lifetime points.
function canonicalSeedPoints(id: string): number | null {
  const lookup = id === 'the-weeknd' ? 'weeknd' : id;
  const artist = FOLLOWED_ARTISTS.find(a => a.id === lookup);
  if (artist) return artist.points;
  const team = FOLLOWED_TEAMS.find(t => t.id === lookup);
  if (team) return team.points;
  return null;
}

export async function load({ params }) {
  const artist = getArtistProfile(params.id);

  if (!artist) {
    throw error(404, 'Artist not found');
  }

  // Upcoming events for this artist
  const upcomingEvents = mockEvents
    .filter(e => e.title.toLowerCase().includes(artist.name.split(' ')[0].toLowerCase()))
    .slice(0, 3);

  // Mock community leaderboard
  const leaderboard = [
    { rank: 1, name: 'Maya J.', score: 94, city: 'LA' },
    { rank: 2, name: 'Chris T.', score: 91, city: 'NYC' },
    { rank: 3, name: mockFanProfile.name, score: artist.superfan_score, city: mockFanProfile.city, is_me: true },
    { rank: 4, name: 'Alex R.', score: 82, city: 'Chicago' },
    { rank: 5, name: 'Sam K.', score: 79, city: 'LA' },
  ];

  // Server-side follow state from FollowedArtist table (authoritative across reloads)
  const followState = await isArtistFollowed('fan_001', artist.name);

  // Hero portrait. Music artists get a Spotify/Last.fm fetched image; sports
  // teams skip the lookup (it would return a wrong artist with the same name)
  // and fall back to the first upcoming event's image when one exists. Always
  // resolves to `null` on miss so the template can render the initial-letter
  // placeholder.
  const isSportsGenre = /hockey|basketball|baseball|football|nfl|nba|mlb|nhl|soccer/i.test(artist.genre);
  let heroImage: string | null = null;
  if (isSportsGenre) {
    heroImage = upcomingEvents.find(e => e.image_url)?.image_url ?? null;
  } else {
    heroImage = await getArtistImage(artist.name).catch(() => null);
  }

  // Resolve precise points + canonical tier for this artist. Fall back to
  // deriving points from the mock superfan_score if no explicit entry exists
  // (kept so unmapped slugs still render coherently).
  // Resolution order, in priority of correctness:
  //   1. Canonical seed (FOLLOWED_ARTISTS/FOLLOWED_TEAMS) — single source of
  //      truth shared with /home, /score, /profile.
  //   2. BONUS_ARTIST_POINTS — for kendrick-lamar / sza that aren't in seed.
  //   3. Derive from the 0–100 mock superfan_score as a last resort.
  const points = canonicalSeedPoints(params.id)
    ?? BONUS_ARTIST_POINTS[params.id]
    ?? Math.round((artist.superfan_score ?? 0) * 12_000);
  const tier = classifyArtistTier(points);
  const next = pointsToNextArtistTier(points);

  // Real listening aggregates from ListeningEvent rows. Skipped for sports
  // (no streaming signal); when a music artist has zero captured listens we
  // fall back to the hand-authored mock fields below.
  const listening = isSportsGenre
    ? null
    : await getArtistListeningSummary('fan_001', artist.name).catch(() => null);

  const artistWithImage = {
    ...artist,
    image: heroImage,
    points,
    tier: tier.name,
    tier_color: tier.color_hex,
    tier_progress: next.progress,           // 0–1 within the current tier band
    points_to_next: next.pointsNeeded,
    next_tier_name: next.nextTier?.name ?? null,
    // Listening fields prefer real aggregates; mock values stay as fallback so
    // artists with no captured plays still render a populated Monthly recap.
    hours_listened: listening?.hours_listened ?? artist.hours_listened,
    monthly_plays: listening?.monthly_plays ?? artist.monthly_plays,
    monthly_hours: listening?.monthly_hours ?? artist.monthly_hours,
    top_track: listening?.top_track || artist.top_track,
    top_tracks: (listening && listening.top_tracks.length > 0)
      ? listening.top_tracks
      : artist.top_tracks,
    longest_session_min: listening?.longest_session_min || artist.longest_session_min,
    peak_day: listening?.peak_day || artist.peak_day,
    peak_day_hours: listening?.peak_day_hours || artist.peak_day_hours,
    discovery_count: listening?.discovery_count ?? artist.discovery_count,
    // Flag the source so the UI could badge "Real listening data" later.
    listening_is_real: listening !== null,
  };

  return {
    artist: artistWithImage,
    upcomingEvents,
    leaderboard,
    serverFollow: followState,
  };
}
