import { describe, it, expect } from 'vitest';
import {
  FOLLOWED_ARTISTS,
  FOLLOWED_TEAMS,
  REWARDS_XP_TOTAL,
  totalSeededXp,
} from './seedFandoms.js';
import { mockFanProfile } from './mockData.js';
import { classifyTier } from '../domain/xp.js';

describe('seedFandoms canonical totals', () => {
  it('totalSeededXp = Σ artists + Σ teams + rewards', () => {
    const artists = FOLLOWED_ARTISTS.reduce((s, a) => s + a.points, 0);
    const teams   = FOLLOWED_TEAMS.reduce((s, t) => s + t.points, 0);
    expect(totalSeededXp()).toBe(artists + teams + REWARDS_XP_TOTAL);
  });

  it('mockFanProfile.xp_total mirrors totalSeededXp (drift guard)', () => {
    // If you change a fandom's points or REWARDS_XP_TOTAL, update
    // src/lib/data/mockData.ts to keep this dead-code fallback in sync.
    expect(mockFanProfile.xp_total).toBe(totalSeededXp());
  });

  it('mockFanProfile.current_tier is consistent with xp_total', () => {
    const tier = classifyTier(mockFanProfile.xp_total);
    expect(mockFanProfile.current_tier).toBe(tier.name);
  });

  it('every followed-artist id is unique', () => {
    const ids = FOLLOWED_ARTISTS.map(a => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every followed-team id is unique', () => {
    const ids = FOLLOWED_TEAMS.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
