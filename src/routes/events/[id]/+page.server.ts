import { error } from '@sveltejs/kit';
import { mockEvents, mockFansAttending, fansAttendingCount } from '$lib/data/mockData.js';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent } from '$lib/server/events.js';
import { serverConfig } from '$lib/config/env.js';
import type { Event, TicketmasterEvent } from '$lib/domain/types.js';

// "Presale window opens 48 hours before general sale" — the same rule the
// detail page advertises in its perks copy. Used to derive a synthetic
// presale_starts_at for mock events that don't carry a real one. Returns
// null for malformed dates so the countdown UI hides cleanly.
function derivePresaleStart(event: Event): string | null {
  if (event.presale_starts_at) return event.presale_starts_at;
  const time24 = event.time && /^\d{1,2}:\d{2}/.test(event.time)
    ? convert12to24(event.time)
    : '19:00';
  const showMs = Date.parse(`${event.date}T${time24}:00`);
  if (!Number.isFinite(showMs)) return null;
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

  // Recommended events: same category, excluding current
  const recommended = mockEvents
    .filter(e => e.event_id !== params.id && e.category === event!.category)
    .slice(0, 3);

  return {
    event,
    recommended,
    fansAttending: mockFansAttending,
    fansAttendingCount,
  };
}
