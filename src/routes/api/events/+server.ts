// API route for client-side event search — proxies to Ticketmaster
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent } from '$lib/server/events.js';
import { serverConfig } from '$lib/config/env.js';
import { mockEvents } from '$lib/data/mockData.js';

export const GET: RequestHandler = async ({ url }) => {
  const keyword = url.searchParams.get('q') || '';
  const category = url.searchParams.get('category') || '';
  const city = url.searchParams.get('city') || 'Los Angeles';

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
      city,
      classificationName: category === 'music' ? 'Music' :
                          category === 'sports' ? 'Sports' :
                          category === 'comedy' ? 'Comedy' : undefined,
      size: 20,
      sort: 'date,asc',
    });

    if (result.success && result.data?._embedded?.events) {
      const events = result.data._embedded.events.map(normalizeTicketmasterEvent);
      return json({ events });
    }

    return json({ events: [] });
  } catch (error) {
    return json({ events: [], error: 'Search failed' }, { status: 500 });
  }
};
