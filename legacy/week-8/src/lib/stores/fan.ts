// Update the fan store to use mock data initially
import { writable, derived } from 'svelte/store';
import type { Fan } from '../domain/types.js';
import { classifyTier, xpToNextTier, tierProgress } from '../domain/xp.js';
import { mockFanProfile } from '../data/mockData.js';

export const fanProfile = writable<Fan | null>(null);

export const fanStats = derived(fanProfile, ($fanProfile) => {
  if (!$fanProfile) {
    return null;
  }

  const currentTier = classifyTier($fanProfile.xp_total);
  const xpToNext = xpToNextTier($fanProfile.xp_total);
  const progress = tierProgress($fanProfile.xp_total);

  return {
    tier: currentTier,
    xpToNextTier: xpToNext,
    tierProgress: progress,
    progressPercentage: Math.round(progress * 100)
  };
});

export async function loadFanProfile(): Promise<Fan> {
  try {
    // For now, use mock data. In production this would be an API call
    const data = mockFanProfile;
    
    fanProfile.set(data);
    return data;
  } catch (error) {
    console.error('Error loading fan profile:', error);
    throw error;
  }
}