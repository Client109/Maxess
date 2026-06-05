// Home page server load — fan profile, upcoming events, leaderboard preview
import { getUserByFanId, getLeaderboard, getFriendActivity, getXpBreakdown } from '$lib/server/database.js';
import { transformUserToFan, transformLeaderboardEntry, transformFriendActivity } from '$lib/server/transforms.js';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent, filterNearYouThisWeek } from '$lib/server/events.js';
import { enrichEventsWithMusicData, getUserTopArtists } from '$lib/server/music.js';
import { serverConfig } from '$lib/config/env.js';
import { mockEvents } from '$lib/data/mockData.js';
import { classifyArtistTier, pointsToNextArtistTier } from '$lib/domain/xp.js';

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

  // Load upcoming events — try Ticketmaster (music + sports), fall back to mock data.
  // Returns both categories so the home-page toggle can filter client-side.
  let upcomingEvents = mockEvents;

  if (serverConfig.ticketmaster.apiKey) {
    try {
      const tmClient = new TicketmasterClient(serverConfig.ticketmaster.apiKey);
      const [musicResult, sportsResult] = await Promise.all([
        tmClient.searchEvents({ city: 'Los Angeles', classificationName: 'Music', size: 6, sort: 'date,asc' }),
        tmClient.searchEvents({ city: 'Los Angeles', classificationName: 'Sports', size: 6, sort: 'date,asc' }),
      ]);

      const tmEvents = [musicResult, sportsResult]
        .filter(r => r.success && r.data?._embedded?.events)
        .flatMap(r => r.data!._embedded!.events!.map(normalizeTicketmasterEvent));

      if (tmEvents.length > 0) {
        const userArtists = await getUserTopArtists(dbUser?.lastfm_username ?? undefined);
        upcomingEvents = enrichEventsWithMusicData(tmEvents, userArtists);
      }
    } catch {
      // Fall back to mock events
    }
  }

  // Progress threads — per-artist/team tier progression. Tiers (Elite, Superfan,
  // etc.) are scoped to each thread; the user has a *separate* tier per artist.
  const progressThreadsRaw = [
    { id: 'weeknd', name: 'The Weeknd', category: 'music' as const, points: 5840 },
    { id: 'ducks', name: 'Anaheim Ducks', category: 'sports' as const, points: 5120 },
    { id: 'kaytranada', name: 'Kaytranada', category: 'music' as const, points: 2780 },
    { id: 'lakers', name: 'LA Lakers', category: 'sports' as const, points: 1640 },
  ];
  const progressThreads = progressThreadsRaw.map(t => {
    const tier = classifyArtistTier(t.points);
    const next = pointsToNextArtistTier(t.points);
    return {
      ...t,
      tier_name: tier.name,
      tier_color: tier.color_hex,
      next_tier_name: next.nextTier?.name ?? null,
      points_to_next: next.pointsNeeded,
      progress: next.progress,
    };
  });

  // Rank comparison — your score vs nearby peers. Real friend/avg numbers if we
  // can compute them from the leaderboard; otherwise derive from the user score.
  const myScore = fan?.xp_total ?? 0;
  const friendsAhead = friendActivity.filter(f => f.delta_type === 'up').length;
  const peerScores = dbLeaderboard
    .map(e => e.xp_total)
    .filter(s => Math.abs(s - myScore) < myScore * 0.3 && s !== myScore);
  const peerAvg = peerScores.length > 0
    ? Math.round(peerScores.reduce((a, b) => a + b, 0) / peerScores.length)
    : Math.round(myScore * 0.92);
  const rankComparison = {
    my_score: myScore,
    peer_avg: peerAvg,
    friends_ahead: friendsAhead,
    delta_vs_peers: myScore - peerAvg,
  };

  // Improve-rank suggestions tied to upcoming events. Pick events with high
  // heat or strong match and frame them as actions worth points.
  const rankedEvents = [...upcomingEvents]
    .filter(e => e.heat_score || e.match_percentage)
    .sort((a, b) => ((b.heat_score ?? 0) + (b.match_percentage ?? 0)) - ((a.heat_score ?? 0) + (a.match_percentage ?? 0)))
    .slice(0, 5);
  const improveRankSuggestions = rankedEvents.map(e => ({
    event_id: e.event_id,
    title: e.title,
    category: e.category,
    points_reward: 100 + Math.round((e.heat_score ?? 50) * 3),
    reason: e.match_percentage
      ? `${e.match_percentage}% match`
      : e.heat_score
        ? `${e.heat_score}% trending`
        : 'Recommended',
  }));

  // Music events near the user happening in the next 7 days.
  // "Near you" mirrors the Ticketmaster query above (Los Angeles).
  const nearYouThisWeek = filterNearYouThisWeek(upcomingEvents, {
    city: 'Los Angeles',
    category: 'music',
    now: new Date(),
  });

  return {
    fan,
    upcomingEvents,
    leaderboardPreview,
    friendActivity,
    progressThreads,
    rankComparison,
    improveRankSuggestions,
    nearYouThisWeek,
  };
}
