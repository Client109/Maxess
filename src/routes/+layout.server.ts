// Root layout server load — runs on every navigation. Currently used to ping
// the user's streak (opening the app counts; see src/lib/server/streak.ts).
// touchUserStreak short-circuits if we already touched within 24h, so the DB
// write happens at most once per active day even though this fires on every
// page nav.

import { touchUserStreak } from '$lib/server/streak.js';

// Hardcoded demo user until auth ships (auth0 stubs in src/lib/config/env.ts).
const DEMO_FAN_ID = 'fan_001';

export async function load() {
  const streak = await touchUserStreak(DEMO_FAN_ID).catch(() => null);
  return { streak };
}
