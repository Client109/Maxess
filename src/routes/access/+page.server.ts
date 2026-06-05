// Access page — selected fandom + per-tier rewards.
// Loads the user's FanTier rows, derives display tiers from lifetime_points,
// resolves the selected fandom (User.selected_fandom_id or top-points
// fallback), and splits its Reward catalog into Unlocked-for-Tier vs
// Included-from-Lower-Tier lists for the dark-theme mockup.

import { db } from '$lib/server/database.js';
import {
  getUserPasses,
  getFeaturedOffers,
} from '$lib/server/database.js';
import { transformPass } from '$lib/server/transforms.js';
import { FOLLOWED_ARTISTS, FOLLOWED_TEAMS, type FollowedFandom } from '$lib/data/seedFandoms.js';
import { classifyArtistTier } from '$lib/domain/xp.js';
import { partitionRewards, resolveSelectedFandom } from '$lib/server/access.js';

const DEMO_FAN_ID = 'fan_001';

function fandomMeta(id: string, kind: 'ARTIST' | 'TEAM'): FollowedFandom | undefined {
  const pool: FollowedFandom[] = kind === 'ARTIST' ? FOLLOWED_ARTISTS : FOLLOWED_TEAMS;
  return pool.find(f => f.id === id);
}

export async function load() {
  const user = await db.user.findUnique({ where: { fan_id: DEMO_FAN_ID } });
  if (!user) {
    return { user: null, fandoms: [], selected: null };
  }

  const [fanTiers, dbPasses, dbFeaturedOffers] = await Promise.all([
    db.fanTier.findMany({
      where: { user_id: user.id },
      orderBy: { lifetime_points: 'desc' },
    }),
    getUserPasses(DEMO_FAN_ID),
    getFeaturedOffers(5),
  ]);

  if (fanTiers.length === 0) {
    return { user: { name: user.name }, fandoms: [], selected: null };
  }

  // Resolve selected fandom: explicit choice or top-points fallback.
  const selectedTier = resolveSelectedFandom(fanTiers, user.selected_fandom_id) ?? fanTiers[0];

  // Decorate each tier row with display data + classified tier band.
  const fandoms = fanTiers.map(t => {
    const meta = fandomMeta(t.fandom_id, t.fandom_kind as 'ARTIST' | 'TEAM');
    const band = classifyArtistTier(t.lifetime_points);
    return {
      fan_tier_id: t.id,
      fandom_id: t.fandom_id,
      kind: t.fandom_kind,
      name: meta?.name ?? t.fandom_id,
      image: meta?.image ?? null,
      sport: meta?.sport ?? null,
      lifetime_points: t.lifetime_points,
      points_balance: t.points_balance,
      tier: band.name,                       // 'Newcomer' | 'Fan' | 'Loyal' | 'Superfan' | 'Elite'
      tier_band: band.name.toUpperCase(),    // for comparison vs Reward.tier_required
      tier_color: band.color_hex,
    };
  });

  const selected = fandoms.find(f => f.fandom_id === selectedTier.fandom_id) ?? fandoms[0];

  // Rewards for the selected fandom, partitioned by tier band relative to the
  // user's current tier:
  //   unlocked          = tier_required == user's tier AND not an included perk
  //   includedFromLower = tier_required <  user's tier OR is_included_perk=true (and reachable)
  //   locked            = tier_required >  user's tier
  const allRewards = await db.reward.findMany({
    where: { fandom_id: selected.fandom_id, fandom_kind: selected.kind as 'ARTIST' | 'TEAM' },
    orderBy: [{ tier_required: 'asc' }, { sort_order: 'asc' }],
  });

  const { unlocked: unlockedAtTier, included: includedFromLower, locked } =
    partitionRewards(allRewards, selected.tier_band);

  // Per-fandom tier line for the footnote.
  const tierLine = fandoms.slice(0, 3).map(f => `${f.tier} for ${f.name}`);

  // Legacy passes data — preserved for the Passes tab in the segmented toggle.
  const passes = dbPasses.map(transformPass);
  const featuredOffers = dbFeaturedOffers.map(transformPass);

  return {
    user: { name: user.name, fan_id: user.fan_id },
    fandoms,
    selected,
    rewards: {
      unlocked: unlockedAtTier.map(serializeReward),
      included: includedFromLower.map(serializeReward),
      locked: locked.map(serializeReward),
    },
    tierLine,
    passes,
    featuredOffers,
  };
}

function serializeReward(r: {
  id: string; name: string; point_cost: number; tier_required: string;
  image_url: string | null; icon_name: string | null; is_included_perk: boolean;
}) {
  return {
    id: r.id,
    name: r.name,
    point_cost: r.point_cost,
    tier_required: r.tier_required,
    image_url: r.image_url,
    icon_name: r.icon_name,
    is_included_perk: r.is_included_perk,
  };
}
