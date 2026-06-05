// Pure helpers for the Home page. Extracted so tests don't need a DB.

export interface BalanceRow {
  fandom_id: string;
  points_balance: number;
}

// Universal Balance = sum of points_balance across ALL of the user's
// FanTier rows. Mockup spec: Weeknd 5,480 + Ducks 2,340 + Ariana 930 = 8,750.
export function universalBalance(rows: BalanceRow[]): number {
  return rows.reduce((sum, r) => sum + Math.max(0, r.points_balance), 0);
}

// Top N fandoms by current spendable points_balance. Ties broken by fandom_id
// for deterministic ordering. Skips rows with balance <= 0 so empty fandoms
// don't displace fandoms the user has spendable points in.
export function topByBalance<R extends BalanceRow>(rows: R[], n: number): R[] {
  return [...rows]
    .filter(r => r.points_balance > 0)
    .sort((a, b) => {
      if (b.points_balance !== a.points_balance) return b.points_balance - a.points_balance;
      return a.fandom_id.localeCompare(b.fandom_id);
    })
    .slice(0, n);
}
