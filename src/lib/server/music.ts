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
