import { error } from '@sveltejs/kit';
import { mockEvents, mockFansAttending, fansAttendingCount } from '$lib/data/mockData.js';

export async function load({ params }) {
  const event = mockEvents.find(e => e.event_id === params.id);

  if (!event) {
    throw error(404, 'Event not found');
  }

  // Recommended events: same category, excluding current
  const recommended = mockEvents
    .filter(e => e.event_id !== params.id && e.category === event.category)
    .slice(0, 3);

  return {
    event,
    recommended,
    fansAttending: mockFansAttending,
    fansAttendingCount,
  };
}
