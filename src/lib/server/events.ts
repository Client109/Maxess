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

  // Get best image — prefer 16:9 ratio, fallback to first available
  const images = tmEvent.images || [];
  const bestImage = images.find(img => img.width >= 640 && img.width / img.height > 1.5)
    || images.find(img => img.width >= 400)
    || images[0];
  const imageUrl = bestImage?.url;

  // Derive a tint color from category for fallback.
  // Music → blue family, sports → orange family (matches --color-music / --color-sports tokens).
  const categoryColors: Record<string, string> = {
    music: '#0a1530',
    sports: '#2e1500',
    comedy: '#2e1a0a',
    festival: '#1a2e0a',
  };

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
    image_color: categoryColors[category] || '#1a1a2e',
    image_url: imageUrl,
    genre_tag: genre?.toUpperCase(),
    heat_score: undefined,
    match_percentage: undefined,
    sale_status: mapSaleStatus(tmEvent.dates.status.code),
    external_url: tmEvent.url,
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

// Filter events to "Near You This Week" — same-city, single category, within an
// N-day window from `now`. `now` is injected so callers (and tests) control the
// clock; date math uses ISO YYYY-MM-DD string compare to avoid timezone drift.
export function filterNearYouThisWeek(
  events: Event[],
  options: { city: string; category: 'music' | 'sports' | 'comedy' | 'festival'; now: Date; days?: number; limit?: number },
): Event[] {
  const { city, category, now, days = 7, limit = 5 } = options;
  const start = now.toISOString().slice(0, 10);
  const end = new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return events
    .filter(e => e.category === category && e.city === city && e.date >= start && e.date <= end)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}
