// API route for client-side event search — proxies to Ticketmaster
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent } from '$lib/server/events.js';
import { serverConfig } from '$lib/config/env.js';
import { mockEvents } from '$lib/data/mockData.js';

export const GET: RequestHandler = async ({ url }: { url: URL }) => {
  const keyword = url.searchParams.get('q') || '';
  const category = url.searchParams.get('category') || '';
  // `city=any` opts out of the city filter — used by the Events page Following
  // tab so an artist's events show up regardless of where they're touring.
  const rawCity = url.searchParams.get('city');
  const cityParam = rawCity ?? 'Los Angeles';
  const cityFilter = cityParam === 'any' ? undefined : cityParam;

  // If no Ticketmaster API key, search mock data
  if (!serverConfig.ticketmaster.apiKey) {
    const q = keyword.toLowerCase();
    const filtered = mockEvents.filter(e => {
      const matchesSearch = !q ||
        e.title.toLowerCase().includes(q) ||
        (e.subtitle ?? '').toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q);
      const matchesCategory = !category || category === 'all' || e.category === category;
      return matchesSearch && matchesCategory;
    });
    return json({ events: filtered });
  }

  try {
    const tmClient = new TicketmasterClient(serverConfig.ticketmaster.apiKey);
    const result = await tmClient.searchEvents({
      keyword: keyword || undefined,
      city: cityFilter,
      classificationName: category === 'music' ? 'Music' :
                          category === 'sports' ? 'Sports' :
                          category === 'comedy' ? 'Comedy' : undefined,
      size: 20,
      sort: 'date,asc',
    });

    if (result.success && result.data?._embedded?.events) {
      const now = new Date();
      const events = result.data._embedded.events.map(tmEvent => normalizeTicketmasterEvent(tmEvent, now));
      return json({ events });
    }

    return json({ events: [] });
  } catch (error) {
    return json({ events: [], error: 'Search failed' }, { status: 500 });
  }
};
