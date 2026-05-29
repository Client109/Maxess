import type { HotListArtist, HotListProgress, AppleMusicListeningHistory, Event } from './types.js';

export function calculateArtistXP(artist: HotListArtist, playCount: number): number {
  const baseXP = playCount * artist.xp_per_play * artist.xp_multiplier;

  let bonusXP = 0;
  for (const tier of artist.bonus_tiers) {
    if (playCount >= tier.plays_required) {
      bonusXP += tier.bonus_xp;
    }
  }

  return Math.round(baseXP + bonusXP);
}

export function buildProgress(artist: HotListArtist, listeningHistory: AppleMusicListeningHistory[]): HotListProgress {
  const historyEntry = listeningHistory.find(h => h.artist_id === artist.artist_id);
  const playCount = historyEntry?.play_count ?? 0;
  const xpEarned = calculateArtistXP(artist, playCount);

  // Find current bonus tier (highest reached)
  let currentBonusTier = 0;
  for (let i = 0; i < artist.bonus_tiers.length; i++) {
    if (playCount >= artist.bonus_tiers[i].plays_required) {
      currentBonusTier = i + 1;
    }
  }

  // Find next bonus threshold
  const nextTier = artist.bonus_tiers.find(t => t.plays_required > playCount);
  const nextBonusAt = nextTier?.plays_required ?? null;

  return {
    artist_id: artist.artist_id,
    user_play_count: playCount,
    xp_earned: xpEarned,
    current_bonus_tier: currentBonusTier,
    next_bonus_at: nextBonusAt
  };
}

export function totalHotListXP(hotList: HotListArtist[], listeningHistory: AppleMusicListeningHistory[]): number {
  return hotList.reduce((total, artist) => {
    const progress = buildProgress(artist, listeningHistory);
    return total + progress.xp_earned;
  }, 0);
}

export function matchArtistsToEvents(
  userArtistNames: string[],
  events: Event[]
): Map<string, { matched: boolean; matchedArtist?: string }> {
  const matches = new Map<string, { matched: boolean; matchedArtist?: string }>();

  for (const event of events) {
    const titleLower = event.title.toLowerCase();
    const matchedArtist = userArtistNames.find(name => titleLower.includes(name.toLowerCase()));

    matches.set(event.event_id, {
      matched: !!matchedArtist,
      matchedArtist: matchedArtist
    });
  }

  return matches;
}
