import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { showToast } from './toasts.js';
import { recordFollow } from './progressByArtist.js';

const STORAGE_KEY = 'maxess.followedArtists';

function readInitial(): string[] {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export const followedArtists = writable<string[]>(readInitial());

if (browser) {
  followedArtists.subscribe((list) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* quota */ }
  });
}

export const followedSet = derived(followedArtists, ($f) => new Set($f));

export function isFollowing(artistId: string): boolean {
  return get(followedSet).has(artistId);
}

export function toggleFollowArtist(
  artistId: string,
  artistName: string,
  seed: { category?: 'music' | 'sports'; points?: number } = {}
): boolean {
  const currentlyOn = isFollowing(artistId);
  if (currentlyOn) {
    followedArtists.update((list) => list.filter((id) => id !== artistId));
    showToast(`Unfollowed ${artistName}. Progress saved.`);
    return false;
  }
  followedArtists.update((list) => (list.includes(artistId) ? list : [...list, artistId]));
  recordFollow({
    id: artistId,
    name: artistName,
    category: seed.category ?? 'music',
    points: seed.points ?? 0,
  });
  showToast(`Following ${artistName}.`);
  return true;
}
