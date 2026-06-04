import { error } from '@sveltejs/kit';
import { mockEvents, mockFansAttending, fansAttendingCount } from '$lib/data/mockData.js';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent } from '$lib/server/events.js';
import { serverConfig } from '$lib/config/env.js';
import type { Event, TicketmasterEvent } from '$lib/domain/types.js';

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
