// Canonical "fandoms followed by Alex Chen (fan_001)" — single source of truth
// for the per-artist / per-team points rendered on Profile + Home, and the
// authoritative inputs for the demo user's xp_total in prisma/seed.ts.
//
//   xp_total  =  Σ FOLLOWED_ARTISTS.points
//             +  Σ FOLLOWED_TEAMS.points
//             +  REWARDS_XP_TOTAL
//
// Tier bands (xp.ts → TIERS): Newcomer 0–9.9K · Fan 10K–99.9K · Loyal 100K–249.9K
// · Superfan 250K–999.9K · Elite 1M+. Values intentionally span four of the
// five bands so the demo renders Newcomer/Fan/Loyal/Superfan tier colors under
// YOUR PROGRESS without pushing the user past the Superfan band.

export type FollowedFandom = {
  id: string;
  name: string;
  category: 'music' | 'sports';
  sport?: string;
  points: number;
  listener_percentile: number; // 1–100 (lower = bigger fan)
  image: string | null;
};

export const FOLLOWED_ARTISTS: FollowedFandom[] = [
  { id: 'weeknd',         name: 'The Weeknd',     category: 'music', points: 280_000, listener_percentile: 2,  image: '/images/weeknd.jpg' },
  { id: 'kaytranada',     name: 'Kaytranada',     category: 'music', points: 45_000,  listener_percentile: 10, image: '/images/kaytranada.jpg' },
  { id: 'daniel-caesar',  name: 'Daniel Caesar',  category: 'music', points: 15_000,  listener_percentile: 18, image: '/images/daniel-caesar.jpg' },
  { id: 'odesza',         name: 'ODESZA',         category: 'music', points: 8_000,   listener_percentile: 28, image: '/images/odesza.jpg' },
  { id: 'arctic-monkeys', name: 'Arctic Monkeys', category: 'music', points: 2_000,   listener_percentile: 40, image: null },
];

export const FOLLOWED_TEAMS: FollowedFandom[] = [
  { id: 'lakers',  name: 'Los Angeles Lakers',  category: 'sports', sport: 'Basketball', points: 240_000, listener_percentile: 3,  image: null },
  { id: 'ducks',   name: 'Anaheim Ducks',       category: 'sports', sport: 'Hockey',     points: 55_000,  listener_percentile: 14, image: null },
  { id: 'rams',    name: 'LA Rams',             category: 'sports', sport: 'Football',   points: 10_000,  listener_percentile: 28, image: null },
  { id: 'dodgers', name: 'Los Angeles Dodgers', category: 'sports', sport: 'Baseball',   points: 3_500,   listener_percentile: 42, image: null },
  { id: 'kings',   name: 'LA Kings',            category: 'sports', sport: 'Hockey',     points: 1_500,   listener_percentile: 58, image: null },
];

// XP earned from non-follow activity (challenges, attendance scans, streaming,
// watch, spend). The xp_transactions seeded in prisma/seed.ts must sum to this.
export const REWARDS_XP_TOTAL = 90_000;

export function totalSeededXp(): number {
  const artists = FOLLOWED_ARTISTS.reduce((s, a) => s + a.points, 0);
  const teams = FOLLOWED_TEAMS.reduce((s, t) => s + t.points, 0);
  return artists + teams + REWARDS_XP_TOTAL;
}

// Used by the Profile page when overlaying canonical follow-points onto the
// Ticketmaster-loaded teams browse. Returns the seeded entry whose name matches
// (case-insensitive, substring tolerant — "Los Angeles Lakers" / "LA Lakers" /
// "Lakers" all collapse to the same seed).
export function getSeededTeamByName(name: string): FollowedFandom | undefined {
  const target = name.toLowerCase().trim();
  return FOLLOWED_TEAMS.find(t => {
    const seedName = t.name.toLowerCase();
    return seedName === target
      || target.includes(seedName)
      || seedName.includes(target);
  });
}
