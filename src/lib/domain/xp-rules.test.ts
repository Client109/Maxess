import { describe, it, expect } from 'vitest';
import {
  XP_PER_TRACK_LISTEN,
  XP_PER_LISTENING_HOUR,
  DAILY_LISTENING_XP_CAP,
  XP_PER_CONCERT_ATTENDANCE,
  XP_PER_CHECKIN,
  XP_PER_TRIVIA_CORRECT,
  XP_PER_STREAK_BONUS,
  computeDailyListeningXp,
  concertAttendanceXp,
} from './xp-rules.js';

describe('XP rule constants', () => {
  it('exports the locked rates', () => {
    expect(XP_PER_TRACK_LISTEN).toBe(1);
    expect(XP_PER_LISTENING_HOUR).toBe(10);
    expect(DAILY_LISTENING_XP_CAP).toBe(100);
    expect(XP_PER_CONCERT_ATTENDANCE).toBe(10_000);
    expect(XP_PER_CHECKIN).toBe(500);
    expect(XP_PER_TRIVIA_CORRECT).toBe(50);
    expect(XP_PER_STREAK_BONUS).toBe(200);
  });
});

describe('computeDailyListeningXp', () => {
  it('awards 1 XP per track listen and 10 XP per hour', () => {
    const result = computeDailyListeningXp({
      signal: { trackListens: 5, minutesListened: 60 },
    });
    expect(result.rawXp).toBe(15); // 5 + 10
    expect(result.cappedXp).toBe(15);
    expect(result.awarded).toBe(15);
  });

  it('clamps at the 100 XP daily cap', () => {
    const result = computeDailyListeningXp({
      signal: { trackListens: 50, minutesListened: 600 }, // 50 + 100 = 150 raw
    });
    expect(result.rawXp).toBe(150);
    expect(result.cappedXp).toBe(100);
    expect(result.awarded).toBe(100);
  });

  it('returns 0 awarded if the cap was already hit earlier in the day', () => {
    const result = computeDailyListeningXp({
      signal: { trackListens: 50, minutesListened: 600 },
      alreadyToday: 100,
    });
    expect(result.cappedXp).toBe(100);
    expect(result.awarded).toBe(0);
  });

  it('returns the delta when partial listening XP was already awarded today', () => {
    const result = computeDailyListeningXp({
      signal: { trackListens: 10, minutesListened: 180 }, // 10 + 30 = 40
      alreadyToday: 25,
    });
    expect(result.cappedXp).toBe(40);
    expect(result.awarded).toBe(15);
  });

  it('floors fractional XP — partial hours do not award fractional points', () => {
    const result = computeDailyListeningXp({
      signal: { trackListens: 0, minutesListened: 75 }, // 75/60 * 10 = 12.5
    });
    expect(result.cappedXp).toBe(12);
  });

  it('rejects negative inputs by clamping to zero', () => {
    const result = computeDailyListeningXp({
      signal: { trackListens: -10, minutesListened: -60 },
    });
    expect(result.rawXp).toBe(0);
    expect(result.awarded).toBe(0);
  });
});

describe('concertAttendanceXp', () => {
  it('returns the full per-concert reward', () => {
    expect(concertAttendanceXp()).toBe(10_000);
  });
});
