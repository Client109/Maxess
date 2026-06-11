// Streak ledger — opening the app (any page navigation) is the streak-touch
// signal. Computed entirely from User.last_streak_at + User.streak_days; no
// separate audit table because the only information that matters is "did the
// user visit on a new calendar day, and how long is the active streak?".
//
// Calendar-day model (timezone fixed to America/Los_Angeles until a per-user
// timezone column exists):
//   never touched           → streak = 1, last_streak_at = now
//   same calendar day       → no-op (avoids per-navigation writes)
//   next calendar day       → streak += 1, last_streak_at = now
//   gap ≥ 2 calendar days   → streak = 1 (broken), last_streak_at = now
//
// We deliberately use a calendar-day boundary instead of an elapsed-ms
// rolling window. The old elapsed-ms logic both under-counted (11:55pm →
// 12:05am the next day was treated as same-day) and over-counted (9am Mon →
// 8am Wed was treated as a clean increment even though Tuesday was skipped).
//
// Returned shape is small + serialization-friendly so layout loads can pipe
// it straight into page data without massaging.

import { db } from './database.js';

export const STREAK_TZ = 'America/Los_Angeles';

export type StreakTouch = {
  streak_days: number;
  last_streak_at: string;        // ISO
  bumped: boolean;               // true when the row was actually written
  reason: 'first' | 'same-day' | 'increment' | 'reset';
};

/** YYYY-MM-DD in the given IANA timezone. */
export function ymd(date: Date, tz: string = STREAK_TZ): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz }).format(date);
}

/** Whole-day difference between two YYYY-MM-DD strings (b - a). */
export function dayDiff(aYmd: string, bYmd: string): number {
  const a = new Date(`${aYmd}T00:00:00Z`).getTime();
  const b = new Date(`${bYmd}T00:00:00Z`).getTime();
  return Math.round((b - a) / 86_400_000);
}

/**
 * Pure decision for a streak touch. Extracted so it can be unit tested
 * without a DB. `last_streak_at` is the previously-stored timestamp (or
 * null if the user has never been touched).
 */
export function decideStreak(
  prev: { streak_days: number; last_streak_at: Date | null },
  now: Date,
  tz: string = STREAK_TZ
): { streak_days: number; reason: StreakTouch['reason']; bumped: boolean } {
  const today = ymd(now, tz);
  const last = prev.last_streak_at ? ymd(prev.last_streak_at, tz) : null;

  if (last === null) {
    return { streak_days: 1, reason: 'first', bumped: true };
  }
  if (last === today) {
    return { streak_days: prev.streak_days, reason: 'same-day', bumped: false };
  }
  if (dayDiff(last, today) === 1) {
    return { streak_days: prev.streak_days + 1, reason: 'increment', bumped: true };
  }
  return { streak_days: 1, reason: 'reset', bumped: true };
}

export async function touchUserStreak(fanId: string, now: Date = new Date()): Promise<StreakTouch | null> {
  const user = await db.user.findUnique({
    where: { fan_id: fanId },
    select: { id: true, streak_days: true, last_streak_at: true },
  });
  if (!user) return null;

  const decision = decideStreak(
    { streak_days: user.streak_days, last_streak_at: user.last_streak_at },
    now
  );

  if (!decision.bumped) {
    return {
      streak_days: decision.streak_days,
      last_streak_at: user.last_streak_at!.toISOString(),
      bumped: false,
      reason: decision.reason,
    };
  }

  await db.user.update({
    where: { id: user.id },
    data: { streak_days: decision.streak_days, last_streak_at: now },
  });

  return {
    streak_days: decision.streak_days,
    last_streak_at: now.toISOString(),
    bumped: true,
    reason: decision.reason,
  };
}
