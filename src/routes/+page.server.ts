// Home page server load — fan profile, upcoming events, leaderboard preview
import { db, getUserByFanId, getLeaderboard, getFriendActivity, getFriendUserIds, getXpBreakdown, getXpHistory } from '$lib/server/database.js';
import { transformUserToFan, transformLeaderboardEntry, transformFriendActivity } from '$lib/server/transforms.js';
import { TicketmasterClient } from '$lib/api/ticketmaster.js';
import { normalizeTicketmasterEvent, filterNearYouThisWeek } from '$lib/server/events.js';
import { enrichEventsWithMusicData, getUserTopArtists } from '$lib/server/music.js';
import { serverConfig } from '$lib/config/env.js';
import { mockEvents } from '$lib/data/mockData.js';
import { FOLLOWED_ARTISTS, FOLLOWED_TEAMS, type FollowedFandom } from '$lib/data/seedFandoms.js';
import { classifyArtistTier, pointsToNextArtistTier } from '$lib/domain/xp.js';
import { universalBalance, topByBalance, topByLifetime } from '$lib/server/home.js';
import {
  XP_PER_CHECKIN,
  XP_PER_LISTENING_HOUR,
  XP_PER_TRIVIA_CORRECT,
  XP_PER_STREAK_BONUS,
} from '$lib/domain/xp-rules.js';

export async function load({ url }) {
  // Optional location bias from the client-side location store (see
  // src/lib/stores/location.ts). When present, Ticketmaster is queried with
  // latlong+radius instead of a hardcoded city, and Near You skips its city filter.
  const latParam = url.searchParams.get('lat');
  const lonParam = url.searchParams.get('lon');
  const lat = latParam ? Number(latParam) : null;
  const lon = lonParam ? Number(lonParam) : null;
  const usingLocation = lat !== null && lon !== null
    && Number.isFinite(lat) && Number.isFinite(lon);
  const latlong = usingLocation ? `${lat},${lon}` : undefined;

  // Load fan profile from DB (hardcoded demo user)
  const dbUser = await getUserByFanId('fan_001');
  const xpBreakdown = await getXpBreakdown('fan_001');

  const fan = dbUser
    ? { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown }
    : null;

  // Load leaderboard preview. Weekly drives the UI card; all-time is used
  // separately below for peer-compare math (the user's xp_total is all-time,
  // so comparing it to weekly peers is meaningless — see #7).
  const friendIds = dbUser ? await getFriendUserIds('fan_001') : [];
  const dbLeaderboard = await getLeaderboard('WEEKLY');
  const dbLeaderboardAllTime = await getLeaderboard('ALL_TIME');
  const leaderboardPreview = dbLeaderboard
    .slice(0, 5)
    .map(e => transformLeaderboardEntry(e, dbUser?.id ?? '', friendIds));

  // Load friend activity
  const dbFriendActivity = await getFriendActivity('fan_001', 5);
  const friendActivity = dbFriendActivity.map(transformFriendActivity);

  // Load upcoming events — try Ticketmaster (music + sports), fall back to mock data.
  // Returns both categories so the home-page toggle can filter client-side.
  let upcomingEvents = mockEvents;

  if (serverConfig.ticketmaster.apiKey) {
    try {
      const tmClient = new TicketmasterClient(serverConfig.ticketmaster.apiKey);
      const baseQuery = usingLocation
        ? { latlong, radius: '25', size: 6, sort: 'date,asc' as const }
        : { city: 'Los Angeles', size: 6, sort: 'date,asc' as const };
      const [musicResult, sportsResult] = await Promise.all([
        tmClient.searchEvents({ ...baseQuery, classificationName: 'Music' }),
        tmClient.searchEvents({ ...baseQuery, classificationName: 'Sports' }),
      ]);

      const now = new Date();
      const tmEvents = [musicResult, sportsResult]
        .filter(r => r.success && r.data?._embedded?.events)
        .flatMap(r => r.data!._embedded!.events!.map(tmEvent => normalizeTicketmasterEvent(tmEvent, now)));

      if (tmEvents.length > 0) {
        const userArtists = await getUserTopArtists(dbUser?.lastfm_username ?? undefined);
        upcomingEvents = enrichEventsWithMusicData(tmEvents, userArtists);
      }
    } catch {
      // Fall back to mock events
    }
  }

  // Progress threads — per-artist/team tier progression sourced from the live
  // FanTier table so points stay in sync with /access (which writes
  // points_balance + lifetime_points on every redemption / award). Previously
  // these were read from the compile-time seed constants in seedFandoms.ts,
  // which meant the hero pill and /access disagreed any time a user actually
  // earned or spent points. Canonical metadata (name, category, image) still
  // comes from FOLLOWED_ARTISTS / FOLLOWED_TEAMS — only the numeric points
  // value is sourced from the DB row.
  const allFandomMeta: FollowedFandom[] = [...FOLLOWED_ARTISTS, ...FOLLOWED_TEAMS];
  const fanTiers = dbUser
    ? await db.fanTier.findMany({ where: { user_id: dbUser.id } })
    : [];
  const progressThreads = fanTiers.map(ft => {
    const meta = allFandomMeta.find(m => m.id === ft.fandom_id);
    const points = ft.lifetime_points;
    const tier = classifyArtistTier(points);
    const next = pointsToNextArtistTier(points);
    return {
      id: ft.fandom_id,
      name: meta?.name ?? ft.fandom_id,
      category: meta?.category ?? 'music',
      image: meta?.image ?? null,
      points,
      tier_name: tier.name,
      tier_color: tier.color_hex,
      next_tier_name: next.nextTier?.name ?? null,
      points_to_next: next.pointsNeeded,
      progress: next.progress,
    };
  });

  // Rank comparison — your score vs nearby peers. Real friend/avg numbers if we
  // can compute them from the leaderboard; otherwise derive from the user score.
  // myScore is the user's all-time xp_total, so peer-compare must use the
  // ALL_TIME leaderboard slice — comparing against WEEKLY peers (orders of
  // magnitude smaller) produced a nonsense delta.
  const myScore = fan?.xp_total ?? 0;
  const friendsAhead = friendActivity.filter(f => f.delta_type === 'up').length;
  const peerScores = dbLeaderboardAllTime
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
    skipCityFilter: usingLocation,
  });

  // Top fandom (highest-points followed artist/team) drives the Universal
  // Balance hero pill ("[Tier] for [Fandom name]") + current-fandom line.
  const topFandom = [...progressThreads]
    .sort((a, b) => b.points - a.points)[0] ?? null;

  // 14-day XP history for the sparkline on the Universal Balance card.
  // The DB helper returns rows shaped either {date, amount} or {date, total}
  // depending on which path it took; coerce defensively.
  const xpHistoryRaw = await getXpHistory('fan_001', 14).catch(() => [] as Array<Record<string, unknown>>);
  const xpHistory = xpHistoryRaw.map((d: any) => Number(d.total ?? d.amount ?? 0));

  // ── Home-mockup data: Universal Balance + top-3 fandoms by balance ────
  // Universal Balance = sum of FanTier.points_balance across all of Alex's
  // fandoms (the spendable, post-redemption number — distinct from xp_total).
  // Top 3 by balance drives the "Your fandoms" preview list.
  // (allFandomMeta + fanTiers were already loaded above for progressThreads.)
  let universalBalanceTotal = 0;
  let topFandomsByBalance: Array<{
    fan_tier_id: string;
    fandom_id: string;
    name: string;
    image: string | null;
    points_balance: number;
    lifetime_points: number;
    tier: string;
    tier_color: string;
  }> = [];
  let selectedFandomTier: { name: string; color_hex: string; fandom_name: string } | null = null;

  if (dbUser) {
    universalBalanceTotal = universalBalance(fanTiers);

    // Top fandoms by spendable points_balance — the "Your fandoms" preview
    // list is sorted by current balance so the row order matches what the
    // user could redeem right now. Tier chip still uses lifetime_points.
    const top3 = topByBalance(fanTiers, 3);
    topFandomsByBalance = top3.map(t => {
      const meta = allFandomMeta.find(m => m.id === t.fandom_id);
      const tier = classifyArtistTier(t.lifetime_points);
      return {
        fan_tier_id: t.id,
        fandom_id: t.fandom_id,
        name: meta?.name ?? t.fandom_id,
        image: meta?.image ?? null,
        points_balance: t.points_balance,
        lifetime_points: t.lifetime_points,
        tier: tier.name,
        tier_color: tier.color_hex,
      };
    });

    // Hero pill: tier for the user's selected fandom. Fallback chain is
    // (1) top fandom by spendable balance, then (2) top fandom by lifetime
    // points — covers the case where every fandom has been redeemed down to
    // a 0 balance (topByBalance filters those out) but the user still has
    // tier-driving lifetime totals on record.
    const topByLifetime3 = topByLifetime(fanTiers, 3);
    const selectedId = dbUser.selected_fandom_id
      ?? topFandomsByBalance[0]?.fandom_id
      ?? topByLifetime3[0]?.fandom_id;
    if (selectedId) {
      const selected = fanTiers.find(f => f.fandom_id === selectedId);
      const meta = allFandomMeta.find(m => m.id === selectedId);
      if (selected && meta) {
        const tier = classifyArtistTier(selected.lifetime_points);
        selectedFandomTier = {
          name: tier.name,
          color_hex: tier.color_hex,
          fandom_name: meta.name,
        };
      }
    }
  }

  // Featured upcoming event for the home "Upcoming" preview — first event whose
  // artist matches the user's selected fandom, otherwise the first upcoming
  // event in the loaded list.
  const upcomingPreview = (() => {
    const selName = selectedFandomTier?.fandom_name?.toLowerCase();
    const match = selName
      ? upcomingEvents.find(e => e.title.toLowerCase().includes(selName.split(' ')[0]))
      : null;
    return match ?? upcomingEvents[0] ?? null;
  })();

  // Canonical earn-rate constants for the "Earn more points" card row.
  const earnRates = [
    { id: 'checkin', label: 'Verified check-in', amount: `+${XP_PER_CHECKIN}`,            icon: 'check'   },
    { id: 'spotify', label: 'Spotify',           amount: `+${XP_PER_LISTENING_HOUR}/hr`,  icon: 'spotify' },
    { id: 'trivia',  label: 'Trivia',            amount: `+${XP_PER_TRIVIA_CORRECT}`,     icon: 'trivia'  },
    { id: 'streak',  label: 'Streak',            amount: `+${XP_PER_STREAK_BONUS}`,       icon: 'streak'  },
  ];

  return {
    fan,
    upcomingEvents,
    leaderboardPreview,
    friendActivity,
    progressThreads,
    rankComparison,
    improveRankSuggestions,
    nearYouThisWeek,
    usingLocation,
    topFandom,
    xpHistory,
    universalBalance: universalBalanceTotal,
    topFandomsByBalance,
    selectedFandomTier,
    upcomingPreview,
    earnRates,
  };
}
