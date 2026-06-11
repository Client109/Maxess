import type { Tier, FanTierBand } from '@prisma/client';

// Maps the 4-wide Pass tier enum to the 5-wide FanTierBand. GENERAL has no
// 1:1 in FanTierBand — it covers both NEWCOMER and FAN. The mapping below
// picks NEWCOMER as the safe lower bound.
export const PASS_TIER_TO_FAN_BAND = {
  GENERAL: 'NEWCOMER',
  LOYAL: 'LOYAL',
  SUPERFAN: 'SUPERFAN',
  ELITE: 'ELITE',
} as const satisfies Record<Tier, FanTierBand>;

export const FAN_BAND_TO_PASS_TIER = {
  NEWCOMER: 'GENERAL',
  FAN: 'GENERAL',
  LOYAL: 'LOYAL',
  SUPERFAN: 'SUPERFAN',
  ELITE: 'ELITE',
} as const satisfies Record<FanTierBand, Tier>;
