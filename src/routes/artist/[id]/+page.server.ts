import { error } from '@sveltejs/kit';
import { mockEvents, mockFanProfile } from '$lib/data/mockData.js';

// Mock artist data keyed by slug
type MockArtist = {
  id: string;
  name: string;
  genre: string;
  image_color: string;
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
};

const weekndData: MockArtist = {
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
};

const mockArtists: Record<string, MockArtist> = {
  // IDs used by profile and access pages
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
  },
};

export async function load({ params }) {
  const artist = mockArtists[params.id];

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

  return {
    artist,
    upcomingEvents,
    leaderboard,
  };
}
