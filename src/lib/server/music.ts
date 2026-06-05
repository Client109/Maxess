// Music Intelligence Service — Spotify-first, Last.fm-fallback
import { SpotifyClient } from '$lib/api/spotify.js';
import { LastFmClient } from '$lib/api/lastfm.js';
import { serverConfig } from '$lib/config/env.js';
import type { Event } from '$lib/domain/types.js';

function getSpotifyClient(): SpotifyClient | null {
  if (!serverConfig.spotify.clientId || !serverConfig.spotify.clientSecret) return null;
  return new SpotifyClient(serverConfig.spotify.clientId, serverConfig.spotify.clientSecret);
}

function getLastFmClient(): LastFmClient | null {
  if (!serverConfig.lastfm.apiKey) return null;
  return new LastFmClient(serverConfig.lastfm.apiKey);
}

// Match events to user's listening data for relevance scoring
export function enrichEventsWithMusicData(
  events: Event[],
  userTopArtists: string[]
): Event[] {
  return events.map(event => {
    const artistMatch = userTopArtists.some(
      artist =>
        event.title.toLowerCase().includes(artist.toLowerCase()) ||
        (event.subtitle?.toLowerCase().includes(artist.toLowerCase()) ?? false)
    );

    return {
      ...event,
      match_percentage: artistMatch ? 95 : undefined,
      upcoming_for_you: artistMatch || event.upcoming_for_you,
    };
  });
}

// Resolve a portrait image URL for an artist. Spotify-first (artist endpoint
// returns square portrait images at multiple resolutions), Last.fm-fallback.
// Returns null when no API key is configured or the artist isn't found.
export async function getArtistImage(artistName: string): Promise<string | null> {
  const spotify = getSpotifyClient();
  if (spotify) {
    try {
      const result = await spotify.searchArtists(artistName, 1);
      const item = (result as any)?.data?.artists?.items?.[0];
      const images: Array<{ url: string; width: number; height: number }> = item?.images ?? [];
      if (images.length > 0) {
        // Prefer ~300px for the connection avatar; fall back to first available.
        const mid = images.find(im => im.width >= 200 && im.width <= 640);
        return (mid ?? images[0]).url;
      }
    } catch { /* fall through */ }
  }

  const lastfm = getLastFmClient();
  if (lastfm) {
    try {
      const result = await lastfm.getArtistInfo(artistName);
      const images: Array<{ '#text': string; size: string }> = (result as any)?.data?.artist?.image ?? [];
      const extraLarge = images.find(im => im.size === 'extralarge')?.['#text'];
      const large = images.find(im => im.size === 'large')?.['#text'];
      const url = extraLarge || large || images.find(im => im['#text'])?.['#text'];
      if (url && url.length > 0) return url;
    } catch { /* fall through */ }
  }

  // No-auth fallback: Deezer's public search returns artist portraits without
  // a key. Resilient enough for the demo when Spotify/Last.fm aren't configured.
  try {
    const res = await fetch(
      `https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}&limit=1`,
      { headers: { 'User-Agent': 'Maxxes/1.0.0' } },
    );
    if (res.ok) {
      const json = await res.json() as { data?: Array<{ picture_xl?: string; picture_big?: string; picture_medium?: string; picture?: string }> };
      const first = json.data?.[0];
      const url = first?.picture_xl || first?.picture_big || first?.picture_medium || first?.picture;
      if (url && url.length > 0) return url;
    }
  } catch { /* network/parse failure — give up gracefully */ }

  return null;
}

// Get artist data with Spotify-first, Last.fm-fallback
export async function getArtistData(artistName: string) {
  const spotify = getSpotifyClient();
  if (spotify) {
    try {
      const result = await spotify.searchArtists(artistName, 1);
      if (result.success && result.data) {
        return { source: 'spotify' as const, data: result.data };
      }
    } catch {
      // Spotify failed, fall through to Last.fm
    }
  }

  const lastfm = getLastFmClient();
  if (lastfm) {
    try {
      const result = await lastfm.getArtistInfo(artistName);
      if (result.success && result.data) {
        return { source: 'lastfm' as const, data: result.data };
      }
    } catch {
      // Both failed
    }
  }

  return null;
}

// Get user's top artists from Last.fm (for demo — no Spotify user auth)
export async function getUserTopArtists(lastfmUsername?: string): Promise<string[]> {
  if (!lastfmUsername) {
    // Fallback: return seed data top artists for demo
    return ['The Weeknd', 'Kendrick Lamar', 'SZA', 'Tyler, the Creator', 'Bad Bunny'];
  }

  const lastfm = getLastFmClient();
  if (!lastfm) {
    return ['The Weeknd', 'Kendrick Lamar', 'SZA', 'Tyler, the Creator', 'Bad Bunny'];
  }

  try {
    const result = await lastfm.getUserTopArtists(lastfmUsername, '3month', 10);
    if (result.success && result.data?.topartists?.artist) {
      return result.data.topartists.artist.map(a => a.name);
    }
  } catch {
    // Fall through to defaults
  }

  return ['The Weeknd', 'Kendrick Lamar', 'SZA', 'Tyler, the Creator', 'Bad Bunny'];
}
