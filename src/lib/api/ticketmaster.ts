import { BaseApiClient } from './base.js';
import { apiLimits } from '../config/env.js';
import type { TicketmasterEventsResponse } from '../domain/types.js';

export class TicketmasterClient extends BaseApiClient {
  private apiKey: string;

  constructor(apiKey: string) {
    super(apiLimits.ticketmaster.baseUrl);
    this.apiKey = apiKey;
  }

  async searchEvents(params: {
    keyword?: string;
    city?: string;
    stateCode?: string;
    classificationName?: string;
    startDateTime?: string;
    endDateTime?: string;
    size?: number;
    sort?: string;
    latlong?: string;
    radius?: string;
  }) {
    return this.get<TicketmasterEventsResponse>('/events.json', {
      apikey: this.apiKey,
      ...params,
    }, `tm-events-${JSON.stringify(params)}`);
  }

  async getEvent(eventId: string) {
    return this.get(`/events/${eventId}.json`, {
      apikey: this.apiKey,
    }, `tm-event-${eventId}`);
  }

  async getVenue(venueId: string) {
    return this.get(`/venues/${venueId}.json`, {
      apikey: this.apiKey,
    }, `tm-venue-${venueId}`);
  }
}
