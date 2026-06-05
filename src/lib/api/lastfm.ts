import { BaseApiClient } from './base.js';
import { apiLimits } from '../config/env.js';
import type { LastFmArtist, LastFmTrack } from '../domain/types.js';

export class LastFmClient extends BaseApiClient {
  private apiKey: string;

  constructor(apiKey: string) {
    super(apiLimits.lastfm.baseUrl);
    this.apiKey = apiKey;
  }

  async getUserTopArtists(username: string, period = '7day', limit = 10) {
    return this.get<{ topartists: { artist: LastFmArtist[] } }>('', {
      method: 'user.gettopartists',
      user: username,
      period,
      limit,
      api_key: this.apiKey,
      format: 'json',
    }, `lastfm-top-artists-${username}-${period}`);
  }

  async getUserTopTracks(username: string, period = '7day', limit = 10) {
    return this.get<{ toptracks: { track: LastFmTrack[] } }>('', {
      method: 'user.gettoptracks',
      user: username,
      period,
      limit,
      api_key: this.apiKey,
      format: 'json',
    });
  }

  async getArtistInfo(artist: string) {
    return this.get('', {
      method: 'artist.getinfo',
      artist,
      api_key: this.apiKey,
      format: 'json',
    }, `lastfm-artist-${artist}`);
  }

  async getSimilarArtists(artist: string, limit = 10) {
    return this.get('', {
      method: 'artist.getsimilar',
      artist,
      limit,
      api_key: this.apiKey,
      format: 'json',
    });
  }

  // Recent scrobbles for the user. `from` is a UNIX-seconds cursor — only
  // tracks played at or after that timestamp are returned. The currently
  // playing track (if any) has no `date` field and is skipped at the call site.
  async getUserRecentTracks(username: string, opts: { from?: number; limit?: number } = {}) {
    const params: Record<string, string | number> = {
      method: 'user.getrecenttracks',
      user: username,
      limit: opts.limit ?? 50,
      api_key: this.apiKey,
      format: 'json',
    };
    if (opts.from) params.from = opts.from;
    return this.get<{
      recenttracks: {
        track: Array<{
          name: string;
          artist: { '#text': string } | { name: string };
          date?: { uts: string };
          duration?: string;
          '@attr'?: { nowplaying?: string };
        }>;
      };
    }>('', params);
  }
}
