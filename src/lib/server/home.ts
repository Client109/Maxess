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

// Top N fandoms by lifetime_points (tier-driving total). Used by the home
// "Your fandoms" preview so the displayed numbers stay consistent with the
// lifetime points shown on /score, /profile, and /access (where lifetime is
// also what drives the tier chip). Balance-only ranking left Lakers (240K
// lifetime, 0 balance) hidden behind Ariana Grande (10K lifetime, 930 balance).
export interface LifetimeRow {
  fandom_id: string;
  lifetime_points: number;
}
export function topByLifetime<R extends LifetimeRow>(rows: R[], n: number): R[] {
  return [...rows]
    .filter(r => r.lifetime_points > 0)
    .sort((a, b) => {
      if (b.lifetime_points !== a.lifetime_points) return b.lifetime_points - a.lifetime_points;
      return a.fandom_id.localeCompare(b.fandom_id);
    })
    .slice(0, n);
}
