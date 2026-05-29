import type { AppleMusicUser, HotListArtist } from '../domain/types.js';

export const mockAppleMusicUser: AppleMusicUser = {
  id: 'am_user_001',
  display_name: 'Alex Chen',
  subscription_type: 'individual',
  top_artists: [
    { id: 'am_art_001', name: 'Arctic Monkeys', genre: 'Alternative Rock', play_count: 342 },
    { id: 'am_art_002', name: 'The Midnight', genre: 'Synthwave', play_count: 289 },
    { id: 'am_art_003', name: 'Phoebe Bridgers', genre: 'Indie Folk', play_count: 214 },
    { id: 'am_art_004', name: 'Tame Impala', genre: 'Psychedelic Pop', play_count: 178 },
    { id: 'am_art_005', name: 'Billie Eilish', genre: 'Pop', play_count: 156 },
    { id: 'am_art_006', name: 'Kendrick Lamar', genre: 'Hip-Hop', play_count: 134 }
  ],
  listening_history: [
    { artist_id: 'am_art_001', artist_name: 'Arctic Monkeys', play_count: 342, last_played: '2026-05-20' },
    { artist_id: 'am_art_002', artist_name: 'The Midnight', play_count: 289, last_played: '2026-05-19' },
    { artist_id: 'am_art_003', artist_name: 'Phoebe Bridgers', play_count: 214, last_played: '2026-05-18' },
    { artist_id: 'am_art_004', artist_name: 'Tame Impala', play_count: 178, last_played: '2026-05-17' },
    { artist_id: 'am_art_005', artist_name: 'Billie Eilish', play_count: 156, last_played: '2026-05-16' },
    { artist_id: 'am_art_006', artist_name: 'Kendrick Lamar', play_count: 134, last_played: '2026-05-15' },
    { artist_id: 'hl_001', artist_name: 'SZA', play_count: 98, last_played: '2026-05-20' },
    { artist_id: 'hl_003', artist_name: 'Tyler the Creator', play_count: 45, last_played: '2026-05-18' }
  ]
};

export const mockHotList: HotListArtist[] = [
  {
    artist_id: 'hl_001',
    name: 'SZA',
    genre: 'R&B',
    xp_per_play: 10,
    xp_multiplier: 2,
    is_featured: true,
    bonus_tiers: [
      { plays_required: 25, bonus_xp: 100 },
      { plays_required: 50, bonus_xp: 250 },
      { plays_required: 100, bonus_xp: 500 }
    ],
    rotation_label: 'This Week'
  },
  {
    artist_id: 'hl_002',
    name: 'Metro Boomin',
    genre: 'Hip-Hop',
    xp_per_play: 10,
    xp_multiplier: 1.5,
    is_featured: false,
    bonus_tiers: [
      { plays_required: 25, bonus_xp: 100 },
      { plays_required: 50, bonus_xp: 250 },
      { plays_required: 100, bonus_xp: 500 }
    ],
    rotation_label: 'This Week'
  },
  {
    artist_id: 'hl_003',
    name: 'Tyler the Creator',
    genre: 'Hip-Hop',
    xp_per_play: 10,
    xp_multiplier: 1.5,
    is_featured: false,
    bonus_tiers: [
      { plays_required: 25, bonus_xp: 100 },
      { plays_required: 50, bonus_xp: 250 },
      { plays_required: 100, bonus_xp: 500 }
    ],
    rotation_label: 'This Week'
  },
  {
    artist_id: 'hl_004',
    name: 'Doja Cat',
    genre: 'Pop/Rap',
    xp_per_play: 10,
    xp_multiplier: 1,
    is_featured: false,
    bonus_tiers: [
      { plays_required: 25, bonus_xp: 100 },
      { plays_required: 50, bonus_xp: 250 }
    ],
    rotation_label: 'This Week'
  }
];
