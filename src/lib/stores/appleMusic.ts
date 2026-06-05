import { writable, derived } from 'svelte/store';
import type { AppleMusicUser, HotListArtist, HotListProgress } from '../domain/types.js';
import { buildProgress, totalHotListXP, matchArtistsToEvents } from '../domain/hotlist.js';
import { mockAppleMusicUser, mockHotList } from '../data/mockMusicKit.js';
import { mockEvents } from '../data/mockData.js';

export const appleMusicConnected = writable<boolean>(false);
export const appleMusicUser = writable<AppleMusicUser | null>(null);
export const appleMusicLoading = writable<boolean>(false);
export const hotListArtists = writable<HotListArtist[]>(mockHotList);

export const hotListProgress = derived(
  [hotListArtists, appleMusicUser],
  ([$hotListArtists, $appleMusicUser]): HotListProgress[] => {
    if (!$appleMusicUser) return [];
    return $hotListArtists.map(artist =>
      buildProgress(artist, $appleMusicUser.listening_history)
    );
  }
);

export const listeningXP = derived(
  [hotListArtists, appleMusicUser],
  ([$hotListArtists, $appleMusicUser]): number => {
    if (!$appleMusicUser) return 0;
    return totalHotListXP($hotListArtists, $appleMusicUser.listening_history);
  }
);

export const eventMatches = derived(
  [appleMusicUser, appleMusicConnected],
  ([$appleMusicUser, $appleMusicConnected]): Map<string, { matched: boolean; matchedArtist?: string }> => {
    if (!$appleMusicConnected || !$appleMusicUser) return new Map();
    const artistNames = $appleMusicUser.top_artists.map(a => a.name);
    return matchArtistsToEvents(artistNames, mockEvents);
  }
);

export const topMatchedArtists = derived(
  appleMusicUser,
  ($appleMusicUser): { id: string; name: string }[] => {
    if (!$appleMusicUser) return [];
    return $appleMusicUser.top_artists.slice(0, 4).map(a => ({ id: a.id, name: a.name }));
  }
);

export async function connectAppleMusic(): Promise<void> {
  appleMusicLoading.set(true);
  // Simulate auth delay
  await new Promise(resolve => setTimeout(resolve, 600));
  appleMusicUser.set(mockAppleMusicUser);
  appleMusicConnected.set(true);
  appleMusicLoading.set(false);
}

export function disconnectAppleMusic(): void {
  appleMusicUser.set(null);
  appleMusicConnected.set(false);
}
