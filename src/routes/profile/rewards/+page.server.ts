// Profile → My Rewards — redeemed-rewards log for fan_001.
// Joins RewardRedemption → Reward, decorates each row with the fandom display
// name + image from the canonical seed (src/lib/data/seedFandoms.ts), and
// surfaces a per-row "time ago" string and the chronological ordering used by
// the dark list UI.

import { db } from '$lib/server/database.js';
import { FOLLOWED_ARTISTS, FOLLOWED_TEAMS } from '$lib/data/seedFandoms.js';

const DEMO_FAN_ID = 'fan_001';

function fandomDisplay(id: string, kind: 'ARTIST' | 'TEAM') {
  const pool = kind === 'ARTIST' ? FOLLOWED_ARTISTS : FOLLOWED_TEAMS;
  return pool.find(f => f.id === id);
}

// "2d ago" / "3w ago" / "5mo ago" / "Today" — same shape as iOS settings logs.
// Pure helper; the page render is otherwise static so we precompute server-side.
function timeAgo(date: Date, nowMs: number): string {
  const diffMs = Math.max(0, nowMs - date.getTime());
  const day = 24 * 60 * 60 * 1000;
  const days = Math.floor(diffMs / day);
  if (days < 1) return 'Today';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export async function load() {
  const user = await db.user.findUnique({ where: { fan_id: DEMO_FAN_ID } });
  if (!user) {
    return { user: null, redemptions: [], totalSpent: 0 };
  }

  const rows = await db.rewardRedemption.findMany({
    where: { user_id: user.id },
    include: { reward: true },
    orderBy: { redeemed_at: 'desc' },
  });

  const now = Date.now();
  const redemptions = rows.map(r => {
    const meta = fandomDisplay(
      r.reward.fandom_id,
      r.reward.fandom_kind as 'ARTIST' | 'TEAM',
    );
    return {
      id: r.id,
      reward_name: r.reward.name,
      reward_image: r.reward.image_url,
      reward_icon: r.reward.icon_name,
      fandom_id: r.reward.fandom_id,
      fandom_name: meta?.name ?? r.reward.fandom_id,
      fandom_kind: r.reward.fandom_kind as 'ARTIST' | 'TEAM',
      points_spent: r.points_spent,
      redeemed_at: r.redeemed_at.toISOString(),
      time_ago: timeAgo(r.redeemed_at, now),
    };
  });

  const totalSpent = redemptions.reduce((s, r) => s + r.points_spent, 0);

  return {
    user: { name: user.name, fan_id: user.fan_id },
    redemptions,
    totalSpent,
  };
}
