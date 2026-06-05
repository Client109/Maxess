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
