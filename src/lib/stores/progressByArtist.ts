import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'maxess.progressByArtist';

export type ArtistProgress = {
  id: string;
  name: string;
  category: 'music' | 'sports';
  points: number;
  firstFollowedAt: number;
  lastFollowedAt: number;
};

export type ProgressSeed = {
  id: string;
  name: string;
  category: 'music' | 'sports';
  points: number;
};

function read(): Record<string, ArtistProgress> {
  if (!browser) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, ArtistProgress>) : {};
  } catch {
    return {};
  }
}

export const progressByArtist = writable<Record<string, ArtistProgress>>(read());

if (browser) {
  progressByArtist.subscribe((map) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); } catch { /* quota */ }
  });
}

// Ensure a progress entry exists for this artist. Preserves prior `points`
// if the user previously followed and then unfollowed.
export function recordFollow(seed: ProgressSeed) {
  const now = Date.now();
  progressByArtist.update((map) => {
    const existing = map[seed.id];
    return {
      ...map,
      [seed.id]: {
        id: seed.id,
        name: seed.name,
        category: seed.category,
        points: existing?.points ?? seed.points,
        firstFollowedAt: existing?.firstFollowedAt ?? now,
        lastFollowedAt: now,
      },
    };
  });
}

// Seed multiple entries. On first run (`overwrite=false`, the default), only
// fills in missing entries — preserves user-earned points. On a reward-system
// revision (`overwrite=true`), force-updates points/category/name from the
// catalog so the demo reflects the new tier math; firstFollowedAt is preserved.
export function hydrateProgress(seeds: ProgressSeed[], overwrite: boolean = false) {
  if (seeds.length === 0) return;
  const now = Date.now();
  progressByArtist.update((map) => {
    const next = { ...map };
    for (const s of seeds) {
      const existing = next[s.id];
      if (existing && !overwrite) continue;
      next[s.id] = {
        id: s.id,
        name: s.name,
        category: s.category,
        points: s.points,
        firstFollowedAt: existing?.firstFollowedAt ?? now,
        lastFollowedAt: now,
      };
    }
    return next;
  });
}

export function getProgress(id: string): ArtistProgress | undefined {
  return get(progressByArtist)[id];
}
