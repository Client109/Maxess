import { describe, it, expect } from 'vitest';
import { decideStreak, ymd, dayDiff, STREAK_TZ } from './streak.js';

// All "now" timestamps are UTC. America/Los_Angeles is UTC-8 (PST) in winter
// and UTC-7 (PDT) in summer. The cases below pick concrete UTC instants
// whose LA-local date is unambiguous.

describe('ymd', () => {
  it('formats LA-local date as YYYY-MM-DD', () => {
    // 2026-06-04T12:00:00Z is 05:00 LA on 2026-06-04
    expect(ymd(new Date('2026-06-04T12:00:00Z'), STREAK_TZ)).toBe('2026-06-04');
  });

  it('rolls over at LA midnight, not UTC midnight', () => {
    // 2026-06-04T06:00:00Z is 2026-06-03 23:00 LA
    expect(ymd(new Date('2026-06-04T06:00:00Z'), STREAK_TZ)).toBe('2026-06-03');
    // 2026-06-04T08:00:00Z is 2026-06-04 01:00 LA
    expect(ymd(new Date('2026-06-04T08:00:00Z'), STREAK_TZ)).toBe('2026-06-04');
  });
});

describe('dayDiff', () => {
  it('returns whole-day delta between YYYY-MM-DD strings', () => {
    expect(dayDiff('2026-06-04', '2026-06-04')).toBe(0);
    expect(dayDiff('2026-06-04', '2026-06-05')).toBe(1);
    expect(dayDiff('2026-06-04', '2026-06-06')).toBe(2);
    expect(dayDiff('2026-06-05', '2026-06-04')).toBe(-1);
  });

  it('handles month boundaries', () => {
    expect(dayDiff('2026-05-31', '2026-06-01')).toBe(1);
  });
});

describe('decideStreak', () => {
  it('first visit ever → streak = 1', () => {
    const result = decideStreak(
      { streak_days: 0, last_streak_at: null },
      new Date('2026-06-04T17:00:00Z')
    );
    expect(result).toEqual({ streak_days: 1, reason: 'first', bumped: true });
  });

  it('same-day second visit → no change, no write', () => {
    // last = 2026-06-04 09:00 LA, now = 2026-06-04 18:00 LA
    const result = decideStreak(
      { streak_days: 5, last_streak_at: new Date('2026-06-04T16:00:00Z') },
      new Date('2026-06-05T01:00:00Z') // = 2026-06-04 18:00 LA
    );
    expect(result).toEqual({ streak_days: 5, reason: 'same-day', bumped: false });
  });

  it('next-day visit (any hour) → +1', () => {
    // last = 2026-06-04 noon LA, now = 2026-06-05 noon LA (~24h later)
    const result = decideStreak(
      { streak_days: 5, last_streak_at: new Date('2026-06-04T19:00:00Z') },
      new Date('2026-06-05T19:00:00Z')
    );
    expect(result).toEqual({ streak_days: 6, reason: 'increment', bumped: true });
  });

  it('skip-a-day visit → reset to 1', () => {
    // last = 2026-06-04 LA, now = 2026-06-06 LA (skipped Jun 5)
    const result = decideStreak(
      { streak_days: 10, last_streak_at: new Date('2026-06-04T19:00:00Z') },
      new Date('2026-06-06T19:00:00Z')
    );
    expect(result).toEqual({ streak_days: 1, reason: 'reset', bumped: true });
  });

  it('late-night → next-morning (11:55pm LA → 12:05am LA next day) → +1', () => {
    // 2026-06-04 23:55 LA = 2026-06-05T06:55:00Z (LA is UTC-7 in June, DST)
    // 2026-06-05 00:05 LA = 2026-06-05T07:05:00Z — only 10 min elapsed
    const result = decideStreak(
      { streak_days: 3, last_streak_at: new Date('2026-06-05T06:55:00Z') },
      new Date('2026-06-05T07:05:00Z')
    );
    expect(result).toEqual({ streak_days: 4, reason: 'increment', bumped: true });
  });

  it('early-morning → next-day (9am Mon → 8am Tue) → +1 even though <24h elapsed', () => {
    // 2026-06-08 09:00 LA = 2026-06-08T16:00:00Z (Mon, DST UTC-7)
    // 2026-06-09 08:00 LA = 2026-06-09T15:00:00Z (Tue) — 23h elapsed
    const result = decideStreak(
      { streak_days: 2, last_streak_at: new Date('2026-06-08T16:00:00Z') },
      new Date('2026-06-09T15:00:00Z')
    );
    expect(result).toEqual({ streak_days: 3, reason: 'increment', bumped: true });
  });

  it('Mon → Wed (~47h, Tuesday skipped) → reset, NOT an increment', () => {
    // The old elapsed-ms logic would treat <48h as an increment. Calendar
    // logic correctly notices Tuesday was skipped.
    // 2026-06-08 09:00 LA = 2026-06-08T16:00:00Z
    // 2026-06-10 08:00 LA = 2026-06-10T15:00:00Z (~47h)
    const result = decideStreak(
      { streak_days: 7, last_streak_at: new Date('2026-06-08T16:00:00Z') },
      new Date('2026-06-10T15:00:00Z')
    );
    expect(result).toEqual({ streak_days: 1, reason: 'reset', bumped: true });
  });
});
