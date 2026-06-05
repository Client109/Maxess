// Pure helpers for the /access page. Extracted so tests don't need a DB.

export const TIER_ORDER = ['NEWCOMER', 'FAN', 'LOYAL', 'SUPERFAN', 'ELITE'] as const;
export type TierBand = (typeof TIER_ORDER)[number];

export function tierRank(t: string): number {
  return TIER_ORDER.indexOf(t.toUpperCase() as TierBand);
}

export interface RewardLike {
  id: string;
  tier_required: string;
  is_included_perk: boolean;
}

// Partition a fandom's rewards into the three buckets the access UI uses.
export function partitionRewards<R extends RewardLike>(
  rewards: R[],
  userTierBand: string,
): { unlocked: R[]; included: R[]; locked: R[] } {
  const userRank = tierRank(userTierBand);
  const unlocked: R[] = [];
  const included: R[] = [];
  const locked: R[] = [];

  for (const r of rewards) {
    const reqRank = tierRank(r.tier_required);
    if (reqRank > userRank) {
      locked.push(r);
    } else if (r.is_included_perk) {
      included.push(r);
    } else if (reqRank === userRank) {
      unlocked.push(r);
    } else {
      included.push(r);
    }
  }
  return { unlocked, included, locked };
}

export interface SelectableFandom {
  fandom_id: string;
  lifetime_points: number;
}

// Resolve which fandom is "selected" for the /access page: explicit choice if
// the user has one and it's still in their fandom list, otherwise the top-
// points fandom from the supplied list.
export function resolveSelectedFandom<F extends SelectableFandom>(
  fandoms: F[],
  explicitId: string | null | undefined,
): F | null {
  if (fandoms.length === 0) return null;
  if (explicitId) {
    const hit = fandoms.find(f => f.fandom_id === explicitId);
    if (hit) return hit;
  }
  return [...fandoms].sort((a, b) => b.lifetime_points - a.lifetime_points)[0];
}
