import { error } from '@sveltejs/kit';
import { mockEvents, mockFansAttending, fansAttendingCount } from '$lib/data/mockData.js';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent } from '$lib/server/events.js';
import { serverConfig } from '$lib/config/env.js';
import type { Event, TicketmasterEvent } from '$lib/domain/types.js';

// Map a venue city → IANA timezone. We only carry the cities we currently
// seed mock data for plus the launch-market US zones. Anything we don't
// recognise falls through to America/New_York — wrong by up to 3 hours but
// better than implicit-UTC, which on Vercel makes an LA 8pm show count down
// from 8pm UTC (i.e. starts 3 hours early).
const CITY_TZ: Record<string, string> = {
  'los angeles': 'America/Los_Angeles',
  'san francisco': 'America/Los_Angeles',
  'oakland': 'America/Los_Angeles',
  'seattle': 'America/Los_Angeles',
  'portland': 'America/Los_Angeles',
  'las vegas': 'America/Los_Angeles',
  'san diego': 'America/Los_Angeles',
  'denver': 'America/Denver',
  'phoenix': 'America/Phoenix',
  'chicago': 'America/Chicago',
  'houston': 'America/Chicago',
  'dallas': 'America/Chicago',
  'austin': 'America/Chicago',
  'nashville': 'America/Chicago',
  'new orleans': 'America/Chicago',
  'new york': 'America/New_York',
  'brooklyn': 'America/New_York',
  'boston': 'America/New_York',
  'philadelphia': 'America/New_York',
  'washington': 'America/New_York',
  'atlanta': 'America/New_York',
  'miami': 'America/New_York',
  'orlando': 'America/New_York',
};

function tzFor(city: string | undefined): string {
  if (!city) return 'America/New_York';
  return CITY_TZ[city.toLowerCase()] ?? 'America/New_York';
}

// Returns the timezone offset (minutes) for `tz` at the given absolute ms.
// e.g. America/Los_Angeles in summer → -420. Built off Intl.DateTimeFormat
// parts so we don't bundle a tz database.
function tzOffsetMinutes(tz: string, atMs: number): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const parts = dtf.formatToParts(new Date(atMs));
  const get = (t: string) => Number(parts.find(p => p.type === t)?.value);
  const asUtc = Date.UTC(
    get('year'), get('month') - 1, get('day'),
    get('hour'), get('minute'), get('second'),
  );
  return Math.round((asUtc - atMs) / 60_000);
}

// "Presale window opens 48 hours before general sale" — the same rule the
// detail page advertises in its perks copy. Used to derive a synthetic
// presale_starts_at for mock events that don't carry a real one. Returns
// null for malformed dates so the countdown UI hides cleanly.
//
// The event's `date` + `time` are wall-clock at the venue (TM's localDate /
// localTime convention), so we interpret them in the venue's timezone before
// converting to absolute ms — otherwise the countdown is off by the host's
// UTC offset (3h on Vercel for an LA show).
function derivePresaleStart(event: Event): string | null {
  if (event.presale_starts_at) return event.presale_starts_at;
  const time24 = event.time && /^\d{1,2}:\d{2}/.test(event.time)
    ? convert12to24(event.time)
    : '19:00';
  const tz = tzFor(event.city);
  // Treat `${date}T${time}` as wall-clock in `tz`. First read it as UTC, then
  // correct by the zone's offset at that moment.
  const asUtc = Date.parse(`${event.date}T${time24}:00Z`);
  if (!Number.isFinite(asUtc)) return null;
  const offsetMin = tzOffsetMinutes(tz, asUtc);
  const showMs = asUtc - offsetMin * 60_000;
  return new Date(showMs - 48 * 60 * 60 * 1000).toISOString();
}

function convert12to24(t: string): string {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!m) return '19:00';
  let h = parseInt(m[1], 10);
  const mer = (m[3] || '').toUpperCase();
  if (mer === 'PM' && h < 12) h += 12;
  if (mer === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}

export async function load({ params }) {
  let event: Event | undefined = mockEvents.find(e => e.event_id === params.id);

  // Fall back to Ticketmaster lookup for tm_* ids
  if (!event && params.id.startsWith('tm_') && serverConfig.ticketmaster.apiKey) {
    const tmId = params.id.slice(3);
    const tmClient = new TicketmasterClient(serverConfig.ticketmaster.apiKey);
    const result = await tmClient.getEvent(tmId);
    if (result.success && result.data) {
      event = normalizeTicketmasterEvent(result.data as TicketmasterEvent);
    }
  }

  if (!event) {
    throw error(404, 'Event not found');
  }

  // Decorate with a derived presale_starts_at when one isn't supplied. The
  // detail page's countdown gates on this field — without it the line hides.
  event = { ...event, presale_starts_at: derivePresaleStart(event) };

  // Recommended events: same category, excluding current. For Ticketmaster-
  // backed events we'd be mixing real TM data with our hand-tagged mock
  // catalog, which surfaces obviously-fake "Demo Stadium" rows under a real
  // artist's page. Return [] in that case — the carousel hides cleanly — until
  // we wire a peer query against TM's `classifications` / `segmentId`.
  const isTmEvent = params.id.startsWith('tm_');
  const recommended = isTmEvent
    ? []
    : mockEvents
        .filter(e => e.event_id !== params.id && e.category === event!.category)
        .slice(0, 3);

  return {
    event,
    recommended,
    fansAttending: mockFansAttending,
    fansAttendingCount,
  };
}
