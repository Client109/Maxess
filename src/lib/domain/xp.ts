import type { Tier } from './types.js';

export const TIERS: Tier[] = [
  { name: 'General', xp_threshold: 0, perks: ['Early event updates', 'Basic support'], color_hex: '#8E8E93' },
  { name: 'Loyal', xp_threshold: 1000, perks: ['Priority notifications', 'Early access'], color_hex: '#C0C0C0' },
  { name: 'Superfan', xp_threshold: 2500, perks: ['Presale access', 'Exclusive content'], color_hex: '#FF5C00' },
  { name: 'Elite', xp_threshold: 5000, perks: ['VIP access', 'Lounge + more'], color_hex: '#FFD700' }
];

export function classifyTier(xp: number): Tier {
  // Find the highest tier the user qualifies for
  const qualifiedTiers = TIERS.filter(tier => xp >= tier.xp_threshold);
  return qualifiedTiers[qualifiedTiers.length - 1] || TIERS[0];
}

export function xpToNextTier(xp: number): number {
  const currentTier = classifyTier(xp);
  const currentTierIndex = TIERS.findIndex(tier => tier.name === currentTier.name);
  
  // If already at highest tier
  if (currentTierIndex === TIERS.length - 1) {
    return 0;
  }
  
  const nextTier = TIERS[currentTierIndex + 1];
  return nextTier.xp_threshold - xp;
}

export function tierProgress(xp: number): number {
  const currentTier = classifyTier(xp);
  const currentTierIndex = TIERS.findIndex(tier => tier.name === currentTier.name);
  
  // If at highest tier, progress is 100%
  if (currentTierIndex === TIERS.length - 1) {
    return 1.0;
  }
  
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
  
  if (position === -1) {
    return 100; // User has highest score
  }
  
  return Math.round((position / sortedScores.length) * 100);
}