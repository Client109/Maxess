import { describe, it, expect } from 'vitest';
import { attributeListens, canonicalArtistName, type RawListen } from './listens.js';

const NOW = new Date('2026-06-04T12:00:00Z');

function listen(over: Partial<RawListen> = {}): RawListen {
  return {
    artist_display_name: 'The Weeknd',
    track_name: 'Blinding Lights',
    played_at: new Date('2026-06-04T10:00:00Z'),
    source: 'LASTFM',
    duration_seconds: 200,
    ...over,
  };
}

describe('canonicalArtistName', () => {
  it('lowercases and trims', () => {
    expect(canonicalArtistName(' The Weeknd ')).toBe('the weeknd');
    expect(canonicalArtistName('KAYTRANADA')).toBe('kaytranada');
  });
});

describe('attributeListens', () => {
  it('flags listens whose canonical artist name is in the followed set', () => {
    const followed = new Set(['the weeknd', 'kaytranada']);
    const { tagged } = attributeListens(
      [
        listen({ artist_display_name: 'The Weeknd' }),
        listen({ artist_display_name: 'Kaytranada' }),
        listen({ artist_display_name: 'Tame Impala' }),
      ],
      followed,
      NOW
    );
    expect(tagged.map(t => t.is_followed)).toEqual([true, true, false]);
  });

  it('aggregates only followed plays from today into the signal', () => {
    const followed = new Set(['the weeknd']);
    const { signalToday } = attributeListens(
      [
        listen({ artist_display_name: 'The Weeknd', duration_seconds: 180 }),
        listen({ artist_display_name: 'The Weeknd', duration_seconds: 240 }),
        listen({ artist_display_name: 'Tame Impala', duration_seconds: 300 }), // not followed
        listen({ artist_display_name: 'The Weeknd', played_at: new Date('2026-06-03T22:00:00Z'), duration_seconds: 200 }), // yesterday
      ],
      followed,
      NOW
    );
    expect(signalToday.trackListens).toBe(2);
    expect(signalToday.minutesListened).toBeCloseTo((180 + 240) / 60, 5);
  });

  it('skips followed plays whose explicit duration is under MIN_LISTEN_SECONDS', () => {
    const followed = new Set(['the weeknd']);
    const { signalToday } = attributeListens(
      [
        listen({ duration_seconds: 10 }), // below threshold, has explicit duration → skipped
        listen({ duration_seconds: 200 }), // counted
      ],
      followed,
      NOW
    );
    expect(signalToday.trackListens).toBe(1);
  });

  it('counts followed plays with no duration info (Last.fm omits some)', () => {
    const followed = new Set(['the weeknd']);
    const { signalToday } = attributeListens(
      [
        listen({ duration_seconds: undefined }),
        listen({ duration_seconds: undefined }),
      ],
      followed,
      NOW
    );
    expect(signalToday.trackListens).toBe(2);
    expect(signalToday.minutesListened).toBe(0);
  });

  it('returns zero signal when no plays are from followed artists', () => {
    const followed = new Set(['someone-else']);
    const { signalToday } = attributeListens([listen(), listen()], followed, NOW);
    expect(signalToday).toEqual({ trackListens: 0, minutesListened: 0 });
  });
});

// ─── aggregateArtistListens ──────────────────────────────────────────────────

import { aggregateArtistListens } from './listens.js';

function row(over: Partial<{
  artist_name_canonical: string;
  track_name: string;
  played_at: Date;
  duration_seconds: number | null;
}> = {}) {
  return {
    artist_name_canonical: 'the weeknd',
    track_name: 'Blinding Lights',
    played_at: new Date('2026-06-04T10:00:00Z'),
    duration_seconds: 200,
    ...over,
  };
}

const AGG_NOW = new Date('2026-06-05T12:00:00Z');

describe('aggregateArtistListens', () => {
  it('returns an empty summary when no rows match the artist', () => {
    const result = aggregateArtistListens([row({ artist_name_canonical: 'other' })], 'the weeknd', AGG_NOW);
    expect(result.hours_listened).toBe(0);
    expect(result.monthly_plays).toBe(0);
    expect(result.top_tracks).toEqual([]);
    expect(result.peak_day).toBe('');
  });

  it('counts monthly plays and hours within the 30-day window', () => {
    const result = aggregateArtistListens([
      row({ played_at: new Date('2026-05-20T10:00:00Z'), duration_seconds: 200 }),
      row({ played_at: new Date('2026-06-01T10:00:00Z'), duration_seconds: 240 }),
      row({ played_at: new Date('2026-06-04T10:00:00Z'), duration_seconds: 200 }),
      row({ played_at: new Date('2026-04-01T10:00:00Z'), duration_seconds: 200 }), // outside window
    ], 'the weeknd', AGG_NOW);
    expect(result.monthly_plays).toBe(3);
    expect(result.monthly_hours).toBe(0); // (200+240+200)/3600 ≈ 0.18 → rounded 0
    expect(result.hours_listened).toBe(0); // all-time still tiny
  });

  it('returns top tracks ranked by play count, capped at 3', () => {
    const result = aggregateArtistListens([
      row({ track_name: 'Blinding Lights', played_at: new Date('2026-06-01T10:00:00Z') }),
      row({ track_name: 'Blinding Lights', played_at: new Date('2026-06-02T10:00:00Z') }),
      row({ track_name: 'Save Your Tears', played_at: new Date('2026-06-01T10:00:00Z') }),
      row({ track_name: 'After Hours',     played_at: new Date('2026-06-01T10:00:00Z') }),
      row({ track_name: 'Starboy',         played_at: new Date('2026-06-01T10:00:00Z') }),
    ], 'the weeknd', AGG_NOW);
    expect(result.top_tracks).toEqual([
      { title: 'Blinding Lights', plays: 2 },
      { title: 'Save Your Tears', plays: 1 },
      { title: 'After Hours', plays: 1 },
    ]);
    expect(result.top_track).toBe('Blinding Lights');
  });

  it('computes longest contiguous session, splitting on >30 min gaps', () => {
    const result = aggregateArtistListens([
      // Session A: 3 back-to-back plays (200s + 240s + 200s = 640s ≈ 11 min)
      row({ played_at: new Date('2026-06-01T10:00:00Z'), duration_seconds: 200 }),
      row({ played_at: new Date('2026-06-01T10:04:00Z'), duration_seconds: 240 }),
      row({ played_at: new Date('2026-06-01T10:09:00Z'), duration_seconds: 200 }),
      // 2-hour gap — new session
      row({ played_at: new Date('2026-06-01T12:30:00Z'), duration_seconds: 180 }),
    ], 'the weeknd', AGG_NOW);
    expect(result.longest_session_min).toBe(11);
  });

  it('peak_day is the date with the highest seconds in the window', () => {
    const result = aggregateArtistListens([
      row({ played_at: new Date('2026-06-01T10:00:00Z'), duration_seconds: 200 }),
      row({ played_at: new Date('2026-06-03T10:00:00Z'), duration_seconds: 300 }),
      row({ played_at: new Date('2026-06-03T11:00:00Z'), duration_seconds: 400 }),
      row({ played_at: new Date('2026-06-04T10:00:00Z'), duration_seconds: 100 }),
    ], 'the weeknd', AGG_NOW);
    expect(result.peak_day).toContain('Jun 3');
    expect(result.peak_day_hours).toBe(0.2); // 700/3600 = 0.194 → 0.2
  });

  it('discovery_count is tracks whose earliest play is inside the window', () => {
    const result = aggregateArtistListens([
      // "Blinding Lights" — first played WAY before window (not a discovery)
      row({ track_name: 'Blinding Lights', played_at: new Date('2026-01-01T10:00:00Z') }),
      row({ track_name: 'Blinding Lights', played_at: new Date('2026-06-01T10:00:00Z') }),
      // "Save Your Tears" — first played inside window (counts)
      row({ track_name: 'Save Your Tears', played_at: new Date('2026-06-01T10:00:00Z') }),
      // "After Hours" — first played inside window (counts)
      row({ track_name: 'After Hours',     played_at: new Date('2026-06-02T10:00:00Z') }),
    ], 'the weeknd', AGG_NOW);
    expect(result.discovery_count).toBe(2);
  });

  it('null/undefined duration_seconds is treated as zero', () => {
    const result = aggregateArtistListens([
      row({ duration_seconds: null }),
      row({ duration_seconds: 200 }),
    ], 'the weeknd', AGG_NOW);
    expect(result.monthly_plays).toBe(2);
    expect(result.monthly_hours).toBe(0); // 200/3600 ≈ 0.055 → 0
  });
});
