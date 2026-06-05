// Streak ledger — opening the app (any page navigation) is the streak-touch
// signal. Computed entirely from User.last_streak_at + User.streak_days; no
// separate audit table because the only information that matters is "did the
// user open the app within the last 24h, and how long is the active streak?".
//
// Behavior (elapsed = now − last_streak_at):
//   never touched        → streak = 1, last_streak_at = now
//   elapsed < 24h        → no-op (same streak day; avoids per-navigation writes)
//   24h ≤ elapsed < 48h  → streak += 1, last_streak_at = now
//   elapsed ≥ 48h        → streak = 1 (broken), last_streak_at = now
//
// Returned shape is small + serialization-friendly so layout loads can pipe it
// straight into page data without massaging.

import { db } from './database.js';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export type StreakTouch = {
  streak_days: number;
  last_streak_at: string;        // ISO
  bumped: boolean;               // true when the row was actually written
  reason: 'first' | 'same-day' | 'increment' | 'reset';
};

export async function touchUserStreak(fanId: string, now: Date = new Date()): Promise<StreakTouch | null> {
  const user = await db.user.findUnique({
    where: { fan_id: fanId },
    select: { id: true, streak_days: true, last_streak_at: true },
  });
  if (!user) return null;

  const last = user.last_streak_at;
  const elapsed = last ? now.getTime() - last.getTime() : null;

  // Same calendar window — no write. Return current state so the UI can still
  // surface streak_days without forcing a round-trip.
  if (elapsed !== null && elapsed < DAY_MS) {
    return {
      streak_days: user.streak_days,
      last_streak_at: last!.toISOString(),
      bumped: false,
      reason: 'same-day',
    };
  }

  let nextStreak: number;
  let reason: StreakTouch['reason'];
  if (last === null) {
    nextStreak = 1;
    reason = 'first';
  } else if (elapsed! < 2 * DAY_MS) {
    nextStreak = user.streak_days + 1;
    reason = 'increment';
  } else {
    nextStreak = 1;
    reason = 'reset';
  }

  await db.user.update({
    where: { id: user.id },
    data: { streak_days: nextStreak, last_streak_at: now },
  });

  return {
    streak_days: nextStreak,
    last_streak_at: now.toISOString(),
    bumped: true,
    reason,
  };
}
