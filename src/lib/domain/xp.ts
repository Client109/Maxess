import type { Tier } from './types.js';

// Tier thresholds — canonical for the app. 0–9,999 is the unranked "Newcomer"
// band (Prisma enum value stays GENERAL; display label is translated to
// "Newcomer" in src/lib/server/transforms.ts). See specs/app.yml
// → tier_thresholds for the canonical contract.
export const TIERS: Tier[] = [
  { name: 'Newcomer', xp_threshold: 0, perks: ['Welcome to Maxess'], color_hex: '#8E8E93' },
  { name: 'Fan', xp_threshold: 10_000, perks: ['Early event updates', 'Basic support'], color_hex: '#1A9E56' },
  { name: 'Loyal', xp_threshold: 100_000, perks: ['Priority notifications', 'Early access'], color_hex: '#2667FF' },
  { name: 'Superfan', xp_threshold: 250_000, perks: ['Presale access', 'Exclusive content'], color_hex: '#3B28CC' },
  { name: 'Elite', xp_threshold: 1_000_000, perks: ['VIP access', 'Lounge + more'], color_hex: '#FF5C00' }
];

// ── Levels System (gradual ramp up to 1,000,000 points) ───────────────────
// ~50 levels with exponential spacing: early levels are quick, later levels take more
const LEVEL_THRESHOLDS: number[] = [
  0,        // Level 1
  250,      // Level 2
  600,      // Level 3
  1_000,    // Level 4
  1_500,    // Level 5
  2_200,    // Level 6
  3_000,    // Level 7
  4_000,    // Level 8
  5_200,    // Level 9
  6_500,    // Level 10
  8_000,    // Level 11
  10_000,   // Level 12
  12_500,   // Level 13
  15_000,   // Level 14
  18_000,   // Level 15
  22_000,   // Level 16
  26_000,   // Level 17
  31_000,   // Level 18
  37_000,   // Level 19
  44_000,   // Level 20
  52_000,   // Level 21
  61_000,   // Level 22
  72_000,   // Level 23
  85_000,   // Level 24
  100_000,  // Level 25
  118_000,  // Level 26
  138_000,  // Level 27
  160_000,  // Level 28
  185_000,  // Level 29
  215_000,  // Level 30
  250_000,  // Level 31
  290_000,  // Level 32
  335_000,  // Level 33
  385_000,  // Level 34
  440_000,  // Level 35
  500_000,  // Level 36
  560_000,  // Level 37
  625_000,  // Level 38
  695_000,  // Level 39
  770_000,  // Level 40
  845_000,  // Level 41
  920_000,  // Level 42
  1_000_000 // Level 43 (max)
];

export interface LevelInfo {
  level: number;
  currentThreshold: number;
  nextThreshold: number | null;
  progress: number;       // 0.0–1.0 within current level
  pointsInLevel: number;  // points earned within this level
  pointsForLevel: number; // total points needed for this level
  isMax: boolean;
}

export function getLevel(points: number): LevelInfo {
  let levelIndex = 0;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= LEVEL_THRESHOLDS[i]) {
      levelIndex = i;
      break;
    }
  }

  const isMax = levelIndex >= LEVEL_THRESHOLDS.length - 1;
  const currentThreshold = LEVEL_THRESHOLDS[levelIndex];
  const nextThreshold = isMax ? null : LEVEL_THRESHOLDS[levelIndex + 1];

  let progress = 1.0;
  let pointsInLevel = 0;
  let pointsForLevel = 0;

  if (!isMax && nextThreshold !== null) {
    pointsForLevel = nextThreshold - currentThreshold;
    pointsInLevel = points - currentThreshold;
    progress = Math.min(1.0, pointsInLevel / pointsForLevel);
  }

  return {
    level: levelIndex + 1,
    currentThreshold,
    nextThreshold,
    progress,
    pointsInLevel,
    pointsForLevel,
    isMax
  };
}

export function pointsToNextLevel(points: number): number {
  const info = getLevel(points);
  if (info.isMax || info.nextThreshold === null) return 0;
  return info.nextThreshold - points;
}

export const MAX_LEVEL = LEVEL_THRESHOLDS.length;
export const MAX_POINTS = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];

// ── Tier functions ────────────────────────────────────────────────────────
// Tiers (Elite, Superfan, etc.) apply per-artist / per-team, not as a global
// user attribute. classifyArtistTier(points) is the canonical helper; pass the
// user's points *with a specific artist or team*. classifyTier(xp) is retained
// as a thin alias so legacy callers keep compiling.

export function classifyTier(xp: number): Tier {
  const qualifiedTiers = TIERS.filter(tier => xp >= tier.xp_threshold);
  return qualifiedTiers[qualifiedTiers.length - 1] || TIERS[0];
}

export function classifyArtistTier(artistPoints: number): Tier {
  return classifyTier(artistPoints);
}

export function pointsToNextArtistTier(artistPoints: number): { nextTier: Tier | null; pointsNeeded: number; progress: number } {
  const current = classifyTier(artistPoints);
  const currentIndex = TIERS.findIndex(t => t.name === current.name);
  if (currentIndex === TIERS.length - 1) {
    return { nextTier: null, pointsNeeded: 0, progress: 1 };
  }
  const next = TIERS[currentIndex + 1];
  const range = next.xp_threshold - current.xp_threshold;
  const inTier = artistPoints - current.xp_threshold;
  return {
    nextTier: next,
    pointsNeeded: next.xp_threshold - artistPoints,
    progress: Math.min(1, Math.max(0, inTier / range)),
  };
}

export function xpToNextTier(xp: number): number {
  const currentTier = classifyTier(xp);
  const currentTierIndex = TIERS.findIndex(tier => tier.name === currentTier.name);
  if (currentTierIndex === TIERS.length - 1) return 0;
  const nextTier = TIERS[currentTierIndex + 1];
  return nextTier.xp_threshold - xp;
}

export function tierProgress(xp: number): number {
  const currentTier = classifyTier(xp);
  const currentTierIndex = TIERS.findIndex(tier => tier.name === currentTier.name);
  if (currentTierIndex === TIERS.length - 1) return 1.0;
  const nextTier = TIERS[currentTierIndex + 1];
  const currentTierStart = currentTier.xp_threshold;
  const nextTierStart = nextTier.xp_threshold;
  const progressInTier = xp - currentTierStart;
  const tierRange = nextTierStart - currentTierStart;
  return Math.min(1.0, progressInTier / tierRange);
}

export function getTierByName(name: string): Tier | undefined {
  return TIERS.find(tier => tier.name === name);
}

export function calculateRank(userXP: number, allScores: number[]): number {
  const sortedScores = [...allScores].sort((a, b) => b - a);
  const rank = sortedScores.findIndex(score => score <= userXP) + 1;
  return rank || sortedScores.length + 1;
}

export function calculatePercentile(userXP: number, allScores: number[]): number {
  const sortedScores = [...allScores].sort((a, b) => a - b);
  const position = sortedScores.findIndex(score => score >= userXP);
  if (position === -1) return 100;
  return Math.round((position / sortedScores.length) * 100);
}
