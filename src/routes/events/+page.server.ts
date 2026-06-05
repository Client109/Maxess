// Events page server load — Ticketmaster events with music intelligence enrichment
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent } from '$lib/server/events.js';
import { enrichEventsWithMusicData, getUserTopArtists } from '$lib/server/music.js';
import { getUserByFanId } from '$lib/server/database.js';
import { serverConfig } from '$lib/config/env.js';
import { mockEvents, mockFansAttending, fansAttendingCount } from '$lib/data/mockData.js';
import type { Event } from '$lib/domain/types.js';

export async function load({ url }) {
  const category = url.searchParams.get('category') || 'all';
  const city = url.searchParams.get('city') || 'Los Angeles';

  // Optional latlong bias from the client-side location store. When present,
  // Ticketmaster is queried with latlong+radius instead of city.
  const latParam = url.searchParams.get('lat');
  const lonParam = url.searchParams.get('lon');
  const lat = latParam ? Number(latParam) : null;
  const lon = lonParam ? Number(lonParam) : null;
  const usingLocation = lat !== null && lon !== null
    && Number.isFinite(lat) && Number.isFinite(lon);
  const latlong = usingLocation ? `${lat},${lon}` : undefined;

  let events: Event[] = mockEvents;
  let featuredEvent: Event | undefined = mockEvents.find(e => e.featured && e.trending);

  // Try Ticketmaster if API key is configured
  if (serverConfig.ticketmaster.apiKey) {
    try {
      const tmClient = new TicketmasterClient(serverConfig.ticketmaster.apiKey);
      const result = await tmClient.searchEvents({
        ...(usingLocation
          ? { latlong, radius: '25' }
          : { city }),
        classificationName: category === 'music' ? 'Music' :
                           category === 'sports' ? 'Sports' :
                           category === 'comedy' ? 'Comedy' : undefined,
        size: 40,
        sort: 'date,asc',
      });

      if (result.success && result.data?._embedded?.events) {
        const normalized = result.data._embedded.events.map(normalizeTicketmasterEvent);

        // Enrich with user's listening data
        const dbUser = await getUserByFanId('fan_001');
        const userArtists = await getUserTopArtists(dbUser?.lastfm_username ?? undefined);
        events = enrichEventsWithMusicData(normalized, userArtists);

        // Mark the first event as featured
        if (events.length > 0) {
          events[0] = { ...events[0], featured: true, trending: true };
          featuredEvent = events[0];
        }
      }
    } catch {
      // Fall back to mock events
    }
  }

  return {
    events,
    featuredEvent,
    fansAttending: mockFansAttending,
    fansAttendingCount,
    filters: { category, city },
    usingLocation,
  };
}
