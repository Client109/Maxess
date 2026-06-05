// XP earn rules — pure constants + helpers. Server code that writes
// xp_transactions rows should reference these so a rate change is one edit.
// See specs/app.yml → xp_scoring_model for the canonical contract.

export const XP_PER_TRACK_LISTEN = 1;
export const XP_PER_LISTENING_HOUR = 10;
export const DAILY_LISTENING_XP_CAP = 100;
export const XP_PER_CONCERT_ATTENDANCE = 10_000;
// Soft pre-event "I'm going" / on-arrival check-in. Distinct from a verified
// attendance scan — this is the tap-from-your-phone signal we surface on event
// cards as "Check in to earn +500". Verified attendance (WALLET_SCAN /
// TICKETMASTER_WEBHOOK) still pays the full 10,000.
export const XP_PER_CHECKIN = 500;
// Live trivia: per correct answer during a live-event trivia round.
export const XP_PER_TRIVIA_CORRECT = 50;
// Consecutive-event streak bonus: paid when the user attends N events in a row
// within the streak window. Demo-fixed value; in production this would scale
// with streak length, but the Score-page "Universal Point System" card commits
// to a flat +200 reward chip so we mirror that constant here.
export const XP_PER_STREAK_BONUS = 200;

// Minimum playback duration before a track counts as a "listen" — matches the
// 30-second threshold Last.fm/Spotify use for scrobbles.
export const MIN_LISTEN_SECONDS = 30;

export type ListeningSignal = {
  trackListens: number;     // count of tracks played ≥ MIN_LISTEN_SECONDS today
  minutesListened: number;  // total minutes of audio played today
};

// Combine the two listening signals into a single daily XP figure, clamped to
// the daily cap. Pure — caller controls "today" by passing aggregates for the
// relevant day. Returned `awarded` is what should be written to xp_transactions
// (delta from any XP the user already earned today, supplied via `alreadyToday`).
export function computeDailyListeningXp(opts: {
  signal: ListeningSignal;
  alreadyToday?: number;
}): { rawXp: number; cappedXp: number; awarded: number } {
  const rawXp =
    Math.max(0, Math.floor(opts.signal.trackListens)) * XP_PER_TRACK_LISTEN +
    Math.max(0, opts.signal.minutesListened / 60) * XP_PER_LISTENING_HOUR;
  const cappedXp = Math.min(DAILY_LISTENING_XP_CAP, Math.floor(rawXp));
  const already = Math.max(0, Math.floor(opts.alreadyToday ?? 0));
  const awarded = Math.max(0, cappedXp - already);
  return { rawXp, cappedXp, awarded };
}

// One concert grants the full attendance reward. The xp_transactions table
// is the audit log; idempotency at the (user, event) tuple is enforced by
// AttendanceVerification @@unique in the Prisma schema, not here.
export function concertAttendanceXp(): number {
  return XP_PER_CONCERT_ATTENDANCE;
}
