import { describe, it, expect } from 'vitest';
import { partitionRewards, resolveSelectedFandom, tierRank } from './access.js';

describe('tierRank', () => {
  it('orders Newcomer < Fan < Loyal < Superfan < Elite', () => {
    expect(tierRank('NEWCOMER')).toBeLessThan(tierRank('FAN'));
    expect(tierRank('FAN')).toBeLessThan(tierRank('LOYAL'));
    expect(tierRank('LOYAL')).toBeLessThan(tierRank('SUPERFAN'));
    expect(tierRank('SUPERFAN')).toBeLessThan(tierRank('ELITE'));
  });
  it('is case-insensitive', () => {
    expect(tierRank('elite')).toBe(tierRank('ELITE'));
  });
});

describe('partitionRewards', () => {
  const rewards = [
    { id: 'r1', tier_required: 'FAN',      is_included_perk: true  },  // included perk below tier
    { id: 'r2', tier_required: 'LOYAL',    is_included_perk: true  },  // included perk below tier
    { id: 'r3', tier_required: 'SUPERFAN', is_included_perk: true  },  // included perk below tier
    { id: 'r4', tier_required: 'ELITE',    is_included_perk: false },  // unlocked at user tier
    { id: 'r5', tier_required: 'ELITE',    is_included_perk: false },  // unlocked at user tier
    { id: 'r6', tier_required: 'LOYAL',    is_included_perk: false },  // lower-tier non-perk → included
  ];

  it('user at ELITE: all tier-Elite hero cards unlocked; sub-Elite go to included', () => {
    const out = partitionRewards(rewards, 'ELITE');
    expect(out.unlocked.map(r => r.id)).toEqual(['r4', 'r5']);
    expect(out.included.map(r => r.id).sort()).toEqual(['r1', 'r2', 'r3', 'r6']);
    expect(out.locked).toEqual([]);
  });

  it('user at SUPERFAN: ELITE rewards become locked; SUPERFAN perk now unlocked at tier', () => {
    const out = partitionRewards(rewards, 'SUPERFAN');
    expect(out.locked.map(r => r.id).sort()).toEqual(['r4', 'r5']);
    // r3 is is_included_perk=true so it stays in 'included' even when reqRank === userRank
    expect(out.included.map(r => r.id).sort()).toEqual(['r1', 'r2', 'r3', 'r6']);
    expect(out.unlocked).toEqual([]);
  });

  it('user at FAN: only the FAN-and-below perks reachable; Loyal+ all locked', () => {
    const out = partitionRewards(rewards, 'FAN');
    expect(out.unlocked).toEqual([]);
    expect(out.included.map(r => r.id)).toEqual(['r1']);
    expect(out.locked.map(r => r.id).sort()).toEqual(['r2', 'r3', 'r4', 'r5', 'r6']);
  });
});

describe('resolveSelectedFandom', () => {
  const fandoms = [
    { fandom_id: 'weeknd', lifetime_points: 280_000 },
    { fandom_id: 'lakers', lifetime_points: 240_000 },
    { fandom_id: 'ducks',  lifetime_points: 55_000 },
  ];

  it('returns the explicit selection when it exists in the list', () => {
    expect(resolveSelectedFandom(fandoms, 'lakers')?.fandom_id).toBe('lakers');
  });

  it('falls back to the top-points fandom when no explicit selection', () => {
    expect(resolveSelectedFandom(fandoms, null)?.fandom_id).toBe('weeknd');
    expect(resolveSelectedFandom(fandoms, undefined)?.fandom_id).toBe('weeknd');
  });

  it('falls back to top-points when the explicit selection is stale (not in list)', () => {
    expect(resolveSelectedFandom(fandoms, 'orphaned-fandom')?.fandom_id).toBe('weeknd');
  });

  it('returns null for an empty fandom list', () => {
    expect(resolveSelectedFandom([], 'anything')).toBe(null);
    expect(resolveSelectedFandom([], null)).toBe(null);
  });
});
