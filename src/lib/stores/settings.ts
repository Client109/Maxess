import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'maxess.showPointsGraph';

const initial = browser
  ? localStorage.getItem(STORAGE_KEY) === 'true'
  : false;

export const showPointsGraph = writable<boolean>(initial);

if (browser) {
  showPointsGraph.subscribe(v => {
    localStorage.setItem(STORAGE_KEY, String(v));
  });
}

// Recommendation category preferences. Default to both on so the user sees
// suggestions across music and sports until they narrow it down.
function persistedBool(key: string, defaultValue: boolean) {
  const initial = browser
    ? (localStorage.getItem(key) ?? String(defaultValue)) === 'true'
    : defaultValue;
  const store = writable<boolean>(initial);
  if (browser) {
    store.subscribe(v => localStorage.setItem(key, String(v)));
  }
  return store;
}

export const recMusic = persistedBool('maxess.recMusic', true);
export const recSports = persistedBool('maxess.recSports', true);

// Cross-page Music/Sports preference. Pages with a Music↔Sports toggle
// (home, profile, events) read from and write to this store so the choice
// carries over when navigating (e.g. home → See All → events). In-memory
// only — matches the spec rule "persists during session, resets on reload".
export type Category = 'music' | 'sports';
export const activeCategory = writable<Category>('music');

// Color theme. Persisted in localStorage so the user's choice survives reloads.
// The layout subscribes to this store and writes the value to
// `document.documentElement.dataset.theme`; tokens.css defines both
// :root and :root[data-theme="light"] palettes against that hook.
export type Theme = 'dark' | 'light';
const THEME_KEY = 'maxess.theme';
const initialTheme: Theme = browser
  ? (localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark')
  : 'dark';
export const theme = writable<Theme>(initialTheme);
if (browser) {
  theme.subscribe(v => localStorage.setItem(THEME_KEY, v));
}
