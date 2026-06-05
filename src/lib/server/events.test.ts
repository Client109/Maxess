import { describe, it, expect } from 'vitest';
import { filterNearYouThisWeek, earliestFuturePresaleStart } from './events.js';
import type { Event } from '$lib/domain/types.js';

function ev(over: Partial<Event>): Event {
  return {
    event_id: 'evt_x',
    title: 'Test',
    category: 'music',
    date: '2026-06-05',
    date_display: 'Jun 5, 2026',
    venue: 'Venue',
    city: 'Los Angeles',
    access_type: 'MUSIC ACCESS',
    status: 'upcoming',
    featured: false,
    image_color: '#000',
    ...over,
  } as Event;
}

const NOW = new Date('2026-06-04T12:00:00Z');

describe('filterNearYouThisWeek', () => {
  it('includes events in the 7-day window matching city + category', () => {
    const events = [
      ev({ event_id: 'a', date: '2026-06-05' }),
      ev({ event_id: 'b', date: '2026-06-11' }),
    ];
    const result = filterNearYouThisWeek(events, { city: 'Los Angeles', category: 'music', now: NOW });
    expect(result.map(e => e.event_id)).toEqual(['a', 'b']);
  });

  it('excludes events outside the window', () => {
    const events = [
      ev({ event_id: 'past', date: '2026-06-03' }),       // before today
      ev({ event_id: 'future', date: '2026-06-12' }),     // 8 days out
      ev({ event_id: 'in', date: '2026-06-07' }),
    ];
    const result = filterNearYouThisWeek(events, { city: 'Los Angeles', category: 'music', now: NOW });
    expect(result.map(e => e.event_id)).toEqual(['in']);
  });

  it('excludes events in a different city or category', () => {
    const events = [
      ev({ event_id: 'wrong-city', date: '2026-06-06', city: 'New York' }),
      ev({ event_id: 'wrong-cat', date: '2026-06-06', category: 'sports' }),
      ev({ event_id: 'match', date: '2026-06-06' }),
    ];
    const result = filterNearYouThisWeek(events, { city: 'Los Angeles', category: 'music', now: NOW });
    expect(result.map(e => e.event_id)).toEqual(['match']);
  });

  it('sorts by date ascending', () => {
    const events = [
      ev({ event_id: 'c', date: '2026-06-10' }),
      ev({ event_id: 'a', date: '2026-06-05' }),
      ev({ event_id: 'b', date: '2026-06-07' }),
    ];
    const result = filterNearYouThisWeek(events, { city: 'Los Angeles', category: 'music', now: NOW });
    expect(result.map(e => e.event_id)).toEqual(['a', 'b', 'c']);
  });

  it('caps the result to the limit (default 5)', () => {
    const events = Array.from({ length: 8 }, (_, i) =>
      ev({ event_id: `e${i}`, date: `2026-06-0${(i % 7) + 4}` }),
    );
    const result = filterNearYouThisWeek(events, { city: 'Los Angeles', category: 'music', now: NOW });
    expect(result).toHaveLength(5);
  });

  it('honors custom days + limit options', () => {
    const events = [
      ev({ event_id: 'in-14', date: '2026-06-15' }),
      ev({ event_id: 'in-7', date: '2026-06-08' }),
      ev({ event_id: 'in-7b', date: '2026-06-09' }),
    ];
    const result = filterNearYouThisWeek(events, {
      city: 'Los Angeles', category: 'music', now: NOW, days: 14, limit: 2,
    });
    expect(result.map(e => e.event_id)).toEqual(['in-7', 'in-7b']);
  });

  it('returns empty when no events match', () => {
    expect(filterNearYouThisWeek([], { city: 'Los Angeles', category: 'music', now: NOW })).toEqual([]);
  });
});

describe('earliestFuturePresaleStart', () => {
  const NOW = new Date('2026-06-05T12:00:00Z');

  it('returns null when there are no presales', () => {
    expect(earliestFuturePresaleStart(undefined, NOW)).toBeNull();
    expect(earliestFuturePresaleStart([], NOW)).toBeNull();
  });

  it('picks the earliest future presale and ignores past ones', () => {
    const result = earliestFuturePresaleStart([
      { startDateTime: '2026-06-04T08:00:00Z' }, // past
      { startDateTime: '2026-06-10T09:00:00Z' },
      { startDateTime: '2026-06-06T12:00:00Z' }, // earliest future
      { startDateTime: '2026-06-20T20:00:00Z' },
    ], NOW);
    expect(result).toBe('2026-06-06T12:00:00Z');
  });

  it('returns null when every presale is already past', () => {
    const result = earliestFuturePresaleStart([
      { startDateTime: '2026-06-01T08:00:00Z' },
      { startDateTime: '2026-06-04T08:00:00Z' },
    ], NOW);
    expect(result).toBeNull();
  });

  it('skips entries with missing or malformed startDateTime', () => {
    const result = earliestFuturePresaleStart([
      {},
      { startDateTime: 'not-a-date' },
      { startDateTime: '2026-06-09T00:00:00Z' },
    ], NOW);
    expect(result).toBe('2026-06-09T00:00:00Z');
  });
});
