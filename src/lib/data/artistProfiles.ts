// Per-artist / per-team detail registry — feeds the /artist/[id] page.
//
// Resolution order in getArtistProfile():
//   1. Curated registry entry (handcrafted top tracks, listening data, etc.)
//   2. Derived default from src/lib/data/seedFandoms.ts canonical follow seed
//      (zeroed listening fields, tier color from points, sport→genre for teams)
//   3. null  → caller throws 404
//
// Adding a new entry to FOLLOWED_ARTISTS / FOLLOWED_TEAMS in seedFandoms.ts
// is sufficient to make /artist/{newId} render. Curated detail is opt-in by
// adding the same id to ARTIST_PROFILES below.

import { FOLLOWED_ARTISTS, FOLLOWED_TEAMS, type FollowedFandom } from './seedFandoms.js';
import { classifyArtistTier } from '$lib/domain/xp.js';

export type ArtistProfile = {
  id: string;
  name: string;
  genre: string;
  image_color: string;
  image?: string;
  superfan_score: number;
  tier: string;
  tier_color: string;
  tier_progress: number;
  shows_attended: number;
  hours_listened: number;
  listener_rank: number;
  listener_rank_total: number;
  monthly_plays: number;
  monthly_hours: number;
  top_track: string;
  top_tracks: Array<{ title: string; plays: number }>;
  longest_session_min: number;
  peak_day: string;
  peak_day_hours: number;
  discovery_count: number;
};

const weekndData: ArtistProfile = {
  id: 'weeknd',
  name: 'The Weeknd',
  genre: 'R&B / Pop',
  image_color: '#1a0a2e',
  superfan_score: 87,
  tier: 'Elite',
  tier_color: '#FF5C00',
  tier_progress: 0.83,
  shows_attended: 4,
  hours_listened: 312,
  listener_rank: 847,
  listener_rank_total: 125000,
  monthly_plays: 186,
  monthly_hours: 28,
  top_track: 'Blinding Lights',
  top_tracks: [
    { title: 'Blinding Lights', plays: 47 },
    { title: 'Save Your Tears', plays: 38 },
    { title: 'After Hours', plays: 29 },
  ],
  longest_session_min: 107,
  peak_day: 'Wed, May 14',
  peak_day_hours: 4.2,
  discovery_count: 12,
};

export const ARTIST_PROFILES: Record<string, ArtistProfile> = {
  'weeknd': weekndData,
  'the-weeknd': weekndData,
  'kaytranada': {
    id: 'kaytranada',
    name: 'Kaytranada',
    genre: 'Electronic / R&B',
    image_color: '#0d1a30',
    superfan_score: 78,
    tier: 'Superfan',
    tier_color: '#3B28CC',
    tier_progress: 0.93,
    shows_attended: 3,
    hours_listened: 245,
    listener_rank: 1200,
    listener_rank_total: 90000,
    monthly_plays: 142,
    monthly_hours: 21,
    top_track: 'BUBBA',
    top_tracks: [
      { title: '10%', plays: 36 },
      { title: 'You’re The One', plays: 31 },
      { title: 'Lite Spots', plays: 24 },
    ],
    longest_session_min: 84,
    peak_day: 'Fri, May 9',
    peak_day_hours: 3.1,
    discovery_count: 9,
  },
  'daniel-caesar': {
    id: 'daniel-caesar',
    name: 'Daniel Caesar',
    genre: 'R&B / Soul',
    image_color: '#1a1a2e',
    superfan_score: 64,
    tier: 'Superfan',
    tier_color: '#3B28CC',
    tier_progress: 0.64,
    shows_attended: 2,
    hours_listened: 168,
    listener_rank: 2800,
    listener_rank_total: 110000,
    monthly_plays: 88,
    monthly_hours: 13,
    top_track: 'Best Part',
    top_tracks: [
      { title: 'Best Part', plays: 22 },
      { title: 'Get You', plays: 18 },
      { title: 'Japanese Denim', plays: 14 },
    ],
    longest_session_min: 62,
    peak_day: 'Sun, May 11',
    peak_day_hours: 2.4,
    discovery_count: 6,
  },
  'odesza': {
    id: 'odesza',
    name: 'ODESZA',
    genre: 'Electronic',
    image_color: '#0a1e33',
    superfan_score: 55,
    tier: 'Loyal',
    tier_color: '#1A9E56',
    tier_progress: 0.73,
    shows_attended: 2,
    hours_listened: 134,
    listener_rank: 3500,
    listener_rank_total: 85000,
    monthly_plays: 72,
    monthly_hours: 11,
    top_track: 'A Moment Apart',
    top_tracks: [
      { title: 'A Moment Apart', plays: 19 },
      { title: 'Bloom', plays: 15 },
      { title: 'Say My Name', plays: 12 },
    ],
    longest_session_min: 73,
    peak_day: 'Sat, May 17',
    peak_day_hours: 2.7,
    discovery_count: 5,
  },
  'ariana-grande': {
    id: 'ariana-grande',
    name: 'Ariana Grande',
    genre: 'Pop',
    image_color: '#1f0d2e',
    superfan_score: 42,
    tier: 'Fan',
    tier_color: '#1A9E56',
    tier_progress: 0.42,
    shows_attended: 1,
    hours_listened: 92,
    listener_rank: 5400,
    listener_rank_total: 240000,
    monthly_plays: 64,
    monthly_hours: 9,
    top_track: 'we can’t be friends (wait for your love)',
    top_tracks: [
      { title: 'we can’t be friends', plays: 21 },
      { title: 'yes, and?', plays: 17 },
      { title: 'the boy is mine', plays: 14 },
    ],
    longest_session_min: 58,
    peak_day: 'Fri, May 16',
    peak_day_hours: 2.2,
    discovery_count: 4,
  },
  'ducks': {
    id: 'ducks',
    name: 'Anaheim Ducks',
    genre: 'NHL Hockey',
    image_color: '#000000',
    superfan_score: 82,
    tier: 'Elite',
    tier_color: '#FF5C00',
    tier_progress: 0.85,
    shows_attended: 12,
    hours_listened: 0,
    listener_rank: 340,
    listener_rank_total: 45000,
    monthly_plays: 0,
    monthly_hours: 0,
    top_track: 'N/A',
    top_tracks: [],
    longest_session_min: 0,
    peak_day: '',
    peak_day_hours: 0,
    discovery_count: 0,
  },
  'lakers': {
    id: 'lakers',
    name: 'Los Angeles Lakers',
    genre: 'NBA Basketball',
    image_color: '#552583',
    superfan_score: 88,
    tier: 'Elite',
    tier_color: '#FF5C00',
    tier_progress: 0.88,
    shows_attended: 14,
    hours_listened: 0,
    listener_rank: 210,
    listener_rank_total: 96000,
    monthly_plays: 0,
    monthly_hours: 0,
    top_track: 'N/A',
    top_tracks: [],
    longest_session_min: 0,
    peak_day: '',
    peak_day_hours: 0,
    discovery_count: 0,
  },
  'rams': {
    id: 'rams',
    name: 'LA Rams',
    genre: 'NFL Football',
    image_color: '#003594',
    superfan_score: 62,
    tier: 'Superfan',
    tier_color: '#3B28CC',
    tier_progress: 0.62,
    shows_attended: 5,
    hours_listened: 0,
    listener_rank: 1800,
    listener_rank_total: 72000,
    monthly_plays: 0,
    monthly_hours: 0,
    top_track: 'N/A',
    top_tracks: [],
    longest_session_min: 0,
    peak_day: '',
    peak_day_hours: 0,
    discovery_count: 0,
  },
  'dodgers': {
    id: 'dodgers',
    name: 'Los Angeles Dodgers',
    genre: 'MLB Baseball',
    image_color: '#005A9C',
    superfan_score: 45,
    tier: 'Loyal',
    tier_color: '#2667FF',
    tier_progress: 0.45,
    shows_attended: 3,
    hours_listened: 0,
    listener_rank: 3200,
    listener_rank_total: 110000,
    monthly_plays: 0,
    monthly_hours: 0,
    top_track: 'N/A',
    top_tracks: [],
    longest_session_min: 0,
    peak_day: '',
    peak_day_hours: 0,
    discovery_count: 0,
  },
  'kings': {
    id: 'kings',
    name: 'LA Kings',
    genre: 'NHL Hockey',
    image_color: '#111111',
    superfan_score: 28,
    tier: 'Fan',
    tier_color: '#1A9E56',
    tier_progress: 0.28,
    shows_attended: 1,
    hours_listened: 0,
    listener_rank: 6400,
    listener_rank_total: 40000,
    monthly_plays: 0,
    monthly_hours: 0,
    top_track: 'N/A',
    top_tracks: [],
    longest_session_min: 0,
    peak_day: '',
    peak_day_hours: 0,
    discovery_count: 0,
  },
  'kendrick-lamar': {
    id: 'kendrick-lamar',
    name: 'Kendrick Lamar',
    genre: 'Hip-Hop',
    image_color: '#1a0a2e',
    superfan_score: 72,
    tier: 'Loyal',
    tier_color: '#CD7F32',
    tier_progress: 0.58,
    shows_attended: 2,
    hours_listened: 198,
    listener_rank: 2340,
    listener_rank_total: 200000,
    monthly_plays: 124,
    monthly_hours: 18,
    top_track: 'HUMBLE.',
    top_tracks: [
      { title: 'HUMBLE.', plays: 32 },
      { title: 'DNA.', plays: 27 },
      { title: 'Money Trees', plays: 21 },
    ],
    longest_session_min: 91,
    peak_day: 'Thu, May 15',
    peak_day_hours: 3.4,
    discovery_count: 8,
  },
  'sza': {
    id: 'sza',
    name: 'SZA',
    genre: 'R&B',
    image_color: '#1a0d2e',
    superfan_score: 64,
    tier: 'Loyal',
    tier_color: '#CD7F32',
    tier_progress: 0.42,
    shows_attended: 1,
    hours_listened: 156,
    listener_rank: 3100,
    listener_rank_total: 180000,
    monthly_plays: 98,
    monthly_hours: 14,
    top_track: 'Kill Bill',
    top_tracks: [
      { title: 'Kill Bill', plays: 26 },
      { title: 'Snooze', plays: 22 },
      { title: 'Good Days', plays: 17 },
    ],
    longest_session_min: 68,
    peak_day: 'Tue, May 13',
    peak_day_hours: 2.9,
    discovery_count: 7,
  },
};

// Stable hash → hex color for derived defaults that don't have a curated
// image_color. Keeps each fandom's hero gradient consistent across reloads.
function derivedImageColor(id: string): string {
  let h = 5381;
  for (let i = 0; i < id.length; i++) h = ((h << 5) + h + id.charCodeAt(i)) | 0;
  const palette = ['#1a0a2e', '#0d1a30', '#1a1a2e', '#0a1e33', '#1f0d2e', '#0a1530', '#1a0d2e', '#101a2e'];
  return palette[Math.abs(h) % palette.length];
}

function deriveProfile(seed: FollowedFandom): ArtistProfile {
  const tier = classifyArtistTier(seed.points);
  const superfan_score = Math.min(100, Math.round((seed.points / 1_000_000) * 100));
  // Sports rows carry their sport label in `sport`; surface it as the genre so
  // the artist page subtitle reads e.g. "Basketball" instead of falling back
  // to the music default.
  const genre = seed.category === 'sports' ? (seed.sport ?? 'Sports') : 'Music';
  return {
    id: seed.id,
    name: seed.name,
    genre,
    image_color: derivedImageColor(seed.id),
    image: seed.image ?? undefined,
    superfan_score,
    tier: tier.name,
    tier_color: tier.color_hex,
    tier_progress: 0,        // pointsToNextArtistTier is computed in the route
    shows_attended: 0,
    hours_listened: 0,
    listener_rank: 0,
    listener_rank_total: 0,
    monthly_plays: 0,
    monthly_hours: 0,
    top_track: 'N/A',
    top_tracks: [],
    longest_session_min: 0,
    peak_day: '',
    peak_day_hours: 0,
    discovery_count: 0,
  };
}

// Optional second arg is for tests that want to inject a synthetic seed list
// without mutating the canonical FOLLOWED_ARTISTS/FOLLOWED_TEAMS arrays.
export function getArtistProfile(
  id: string,
  seedOverride?: FollowedFandom[],
): ArtistProfile | null {
  if (!id) return null;
  const curated = ARTIST_PROFILES[id];
  if (curated) return curated;

  const pool = seedOverride ?? [...FOLLOWED_ARTISTS, ...FOLLOWED_TEAMS];
  const seed = pool.find(s => s.id === id);
  if (seed) return deriveProfile(seed);

  return null;
}
