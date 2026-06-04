// Home page server load — fan profile, upcoming events, leaderboard preview
import { getUserByFanId, getLeaderboard, getFriendActivity, getXpBreakdown } from '$lib/server/database.js';
import { transformUserToFan, transformLeaderboardEntry, transformFriendActivity } from '$lib/server/transforms.js';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent } from '$lib/server/events.js';
import { enrichEventsWithMusicData, getUserTopArtists } from '$lib/server/music.js';
import { serverConfig } from '$lib/config/env.js';
import { mockEvents } from '$lib/data/mockData.js';

export async function load() {
  // Load fan profile from DB (hardcoded demo user)
  const dbUser = await getUserByFanId('fan_001');
  const xpBreakdown = await getXpBreakdown('fan_001');

  const fan = dbUser
    ? { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown }
    : null;

  // Load leaderboard preview
  const dbLeaderboard = await getLeaderboard('WEEKLY');
  const leaderboardPreview = dbLeaderboard
    .slice(0, 5)
    .map(e => transformLeaderboardEntry(e, dbUser?.id ?? ''));

  // Load friend activity
  const dbFriendActivity = await getFriendActivity('fan_001', 5);
  const friendActivity = dbFriendActivity.map(transformFriendActivity);

  // Load upcoming events — try Ticketmaster, fall back to mock data
  let upcomingEvents = mockEvents.slice(0, 6);

  if (serverConfig.ticketmaster.apiKey) {
    try {
      const tmClient = new TicketmasterClient(serverConfig.ticketmaster.apiKey);
      const result = await tmClient.searchEvents({
        city: 'Los Angeles',
        classificationName: 'Music',
        size: 6,
        sort: 'date,asc',
      });

      if (result.success && result.data?._embedded?.events) {
        const normalized = result.data._embedded.events.map(normalizeTicketmasterEvent);
        const userArtists = await getUserTopArtists(dbUser?.lastfm_username ?? undefined);
        upcomingEvents = enrichEventsWithMusicData(normalized, userArtists);
      }
    } catch {
      // Fall back to mock events
    }
  }

  return {
    fan,
    upcomingEvents,
    leaderboardPreview,
    friendActivity,
  };
}
