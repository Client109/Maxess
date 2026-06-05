// Score page server load — leaderboard, challenges, friend activity, plus
// the Universal Balance + Tier Progression + Point Source data the redesigned
// /score page needs.
import {
  getUserByFanId,
  getAllLeaderboardEntries,
  getFriendUserIds,
  getUserChallenges,
  getFriendActivity,
  getXpBreakdown,
  getXpHistory,
} from '$lib/server/database.js';
import {
  transformUserToFan,
  transformLeaderboardEntry,
  transformChallenge,
  transformFriendActivity,
} from '$lib/server/transforms.js';
import { FOLLOWED_ARTISTS, FOLLOWED_TEAMS } from '$lib/data/seedFandoms.js';
import { TIERS, classifyArtistTier } from '$lib/domain/xp.js';
import { getArtistImage } from '$lib/server/music.js';
import {
  XP_PER_CHECKIN,
  XP_PER_LISTENING_HOUR,
  XP_PER_TRIVIA_CORRECT,
  XP_PER_STREAK_BONUS,
} from '$lib/domain/xp-rules.js';

export async function load() {
  const dbUser = await getUserByFanId('fan_001');

  if (!dbUser) {
    return { fan: null, rank: null };
  }

  const [xpBreakdown, dbLeaderboard, friendIds, dbChallenges, dbFriendActivity, xpHistory] =
    await Promise.all([
      getXpBreakdown('fan_001'),
      getAllLeaderboardEntries(),
      getFriendUserIds('fan_001'),
      getUserChallenges('fan_001'),
      getFriendActivity('fan_001', 15),
      getXpHistory('fan_001', 14),
    ]);

  const fan = { ...transformUserToFan(dbUser), xp_breakdown: xpBreakdown };
  const leaderboard = dbLeaderboard.map(e => transformLeaderboardEntry(e, dbUser.id, friendIds));
  const challenges = dbChallenges.map(transformChallenge);
  const friendActivity = dbFriendActivity.map(transformFriendActivity);

  // Universal Balance card — top-3 fandoms across both artists and teams,
  // ranked by points. Each row gets a tier name + color via classifyArtistTier
  // so the chip color stays in sync with the canonical TIERS palette.
  const allFandoms = [
    ...FOLLOWED_ARTISTS.map(a => ({ id: a.id, kind: 'artist' as const, name: a.name, image: a.image, points: a.points })),
    ...FOLLOWED_TEAMS.map(t => ({ id: t.id, kind: 'team' as const,   name: t.name, image: t.image, points: t.points })),
  ].sort((a, b) => b.points - a.points);

  const top3 = allFandoms.slice(0, 3);
  // Pull real portrait images for any artist rows missing one (Deezer fallback
  // inside getArtistImage). Done in parallel and individually error-wrapped so
  // one provider miss can't blank the row.
  const top3Images = await Promise.all(
    top3.map(f => f.kind === 'artist' && !f.image ? getArtistImage(f.name).catch(() => null) : Promise.resolve(f.image)),
  );
  const universalBreakdown = top3.map((f, i) => {
    const tier = classifyArtistTier(f.points);
    return {
      id: f.id,
      kind: f.kind,
      name: f.name,
      points: f.points,
      image: top3Images[i] ?? f.image,
      tier_name: tier.name,
      tier_color: tier.color_hex,
    };
  });

  // Tier progression card — render every TIER band with its range, perks, and
  // an `active` flag for the user's top-fandom tier (the orange-outlined row
  // in the mockup). We highlight the user's HIGHEST current fandom tier so the
  // demo always shows a meaningful Elite/Superfan callout when available.
  const highestTier = universalBreakdown[0]?.tier_name ?? 'Newcomer';
  const tierProgression = TIERS.map((t, i) => {
    const next = TIERS[i + 1];
    const rangeLow = t.xp_threshold;
    const rangeHigh = next ? next.xp_threshold - 1 : null;
    return {
      name: t.name,
      color: t.color_hex,
      range_low: rangeLow,
      range_high: rangeHigh,
      perks: t.perks,
      is_active: t.name === highestTier,
    };
  });

  // Point sources — labels + rates straight from the canonical XP rules so the
  // diagram never drifts from the rates the seed actually uses.
  const pointSources = [
    { id: 'checkin', label: 'Verified event check-in',      rate_label: `+${XP_PER_CHECKIN}`,       icon: 'check'   },
    { id: 'spotify', label: 'Spotify listening time',       rate_label: `+${XP_PER_LISTENING_HOUR}/hr`, icon: 'spotify' },
    { id: 'trivia',  label: 'Live trivia correct answers',  rate_label: `+${XP_PER_TRIVIA_CORRECT}`, icon: 'trivia'  },
    { id: 'streak',  label: 'Consecutive event streak bonus', rate_label: `+${XP_PER_STREAK_BONUS}`, icon: 'flame'   },
  ];

  return {
    fan,
    xpHistory,
    universalBreakdown,
    tierProgression,
    pointSources,
    rank: {
      leaderboard,
      challenges,
      friendActivity,
    },
  };
}
