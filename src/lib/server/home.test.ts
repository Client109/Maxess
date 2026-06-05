import { describe, it, expect } from 'vitest';
import { universalBalance, topByBalance } from './home.js';

describe('universalBalance', () => {
  it('sums points_balance across all fandom rows', () => {
    const rows = [
      { fandom_id: 'weeknd',        points_balance: 5_480 },
      { fandom_id: 'ducks',         points_balance: 2_340 },
      { fandom_id: 'ariana-grande', points_balance: 930 },
    ];
    expect(universalBalance(rows)).toBe(8_750);
  });

  it('returns 0 for an empty list', () => {
    expect(universalBalance([])).toBe(0);
  });

  it('ignores negative balances (defensive)', () => {
    const rows = [
      { fandom_id: 'a', points_balance: 100 },
      { fandom_id: 'b', points_balance: -50 }, // shouldn't happen, but if it does, treat as 0
    ];
    expect(universalBalance(rows)).toBe(100);
  });
});

describe('topByBalance', () => {
  it('returns the top N rows by points_balance, highest first', () => {
    const rows = [
      { fandom_id: 'kings',  points_balance: 0 },
      { fandom_id: 'weeknd', points_balance: 5_480 },
      { fandom_id: 'rams',   points_balance: 0 },
      { fandom_id: 'ducks',  points_balance: 2_340 },
      { fandom_id: 'ariana-grande', points_balance: 930 },
    ];
    const top3 = topByBalance(rows, 3);
    expect(top3.map(r => r.fandom_id)).toEqual(['weeknd', 'ducks', 'ariana-grande']);
  });

  it('drops rows with balance == 0 (no spendable points)', () => {
    const rows = [
      { fandom_id: 'a', points_balance: 100 },
      { fandom_id: 'b', points_balance: 0 },
      { fandom_id: 'c', points_balance: 0 },
    ];
    expect(topByBalance(rows, 3)).toEqual([{ fandom_id: 'a', points_balance: 100 }]);
  });

  it('breaks ties on fandom_id alphabetically for deterministic ordering', () => {
    const rows = [
      { fandom_id: 'b', points_balance: 100 },
      { fandom_id: 'a', points_balance: 100 },
    ];
    expect(topByBalance(rows, 2).map(r => r.fandom_id)).toEqual(['a', 'b']);
  });

  it('returns fewer than N when not enough rows have positive balance', () => {
    expect(topByBalance([{ fandom_id: 'a', points_balance: 1 }], 3)).toHaveLength(1);
  });

  it('returns an empty array for an empty input', () => {
    expect(topByBalance([], 3)).toEqual([]);
  });
});
