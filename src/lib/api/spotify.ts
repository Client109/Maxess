import { BaseApiClient } from './base.js';
import { apiLimits } from '../config/env.js';

export class SpotifyClient extends BaseApiClient {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(clientId: string, clientSecret: string) {
    super(apiLimits.spotify.baseUrl);
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  // Client Credentials flow — no user auth needed
  private async authenticate() {
    if (this.accessToken && Date.now() < this.tokenExpiry) return;

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // 1min buffer
    this.headers['Authorization'] = `Bearer ${this.accessToken}`;
  }

  async searchArtists(query: string, limit = 5) {
    await this.authenticate();
    return this.get('/search', {
      q: query, type: 'artist', limit,
    }, `spotify-artist-${query}`);
  }

  async getArtist(artistId: string) {
    await this.authenticate();
    return this.get(`/artists/${artistId}`, {}, `spotify-artist-${artistId}`);
  }

  async getArtistTopTracks(artistId: string, market = 'US') {
    await this.authenticate();
    return this.get(`/artists/${artistId}/top-tracks`, { market });
  }

  async getRelatedArtists(artistId: string) {
    await this.authenticate();
    return this.get(`/artists/${artistId}/related-artists`);
  }
}
