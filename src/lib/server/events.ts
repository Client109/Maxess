// Event normalizer — transforms Ticketmaster API responses into internal Event schema
import type { TicketmasterEvent, Event } from '$lib/domain/types.js';

export function normalizeTicketmasterEvent(tmEvent: TicketmasterEvent): Event {
  const venue = tmEvent._embedded.venues[0];
  const attraction = tmEvent._embedded.attractions?.[0];
  const classification = tmEvent.classifications?.[0];
  const segment = classification?.segment?.name?.toLowerCase();
  const genre = classification?.genre?.name;

  // Map category from TM classification
  let category: 'music' | 'sports' | 'comedy' | 'festival' = 'music';
  if (segment === 'sports') category = 'sports';
  else if (genre?.toLowerCase().includes('comedy') || segment === 'arts & theatre') category = 'comedy';

  // Format date for display
  const dateObj = new Date(tmEvent.dates.start.localDate);
  const dateDisplay = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Get image URL if available
  const image = tmEvent.images?.[0];

  return {
    event_id: `tm_${tmEvent.id}`,
    title: tmEvent.name,
    subtitle: attraction?.name !== tmEvent.name ? attraction?.name : undefined,
    category,
    date: tmEvent.dates.start.localDate,
    date_display: dateDisplay,
    time: tmEvent.dates.start.localTime || '',
    venue: venue.name,
    city: venue.city.name,
    location_display: venue.state
      ? `${venue.city.name}, ${venue.state.stateCode}`
      : venue.city.name,
    access_type: category === 'sports' ? 'SPORTS ACCESS' : 'MUSIC ACCESS',
    status: mapTmStatus(tmEvent.dates.status.code),
    featured: false,
    image_color: '#1a1a2e',
    genre_tag: genre?.toUpperCase(),
    heat_score: undefined,
    match_percentage: undefined,
    sale_status: mapSaleStatus(tmEvent.dates.status.code),
    trending: false,
    near_you: true,
    upcoming_for_you: true,
  };
}

function mapTmStatus(code: string): 'active' | 'upcoming' | 'limited' | 'sold_out' {
  switch (code) {
    case 'onsale': return 'active';
    case 'offsale': return 'upcoming';
    case 'cancelled': return 'sold_out';
    case 'rescheduled': return 'upcoming';
    default: return 'upcoming';
  }
}

function mapSaleStatus(code: string): string {
  switch (code) {
    case 'onsale': return 'On Sale';
    case 'offsale': return 'Coming Soon';
    case 'cancelled': return 'Cancelled';
    case 'rescheduled': return 'Rescheduled';
    default: return 'Available';
  }
}
