import { writable, get } from 'svelte/store';
import { showToast } from './toasts.js';

// Capability checks use typeof guards rather than $app/environment's `browser`
// flag so the store behaves consistently under vitest, SSR, and the real
// browser. Anything below that calls `localStorage` / `navigator` must guard
// with hasLocalStorage() / hasNavigatorGeolocation().
const hasLocalStorage = () => typeof localStorage !== 'undefined';
const hasNavigatorGeolocation = () =>
  typeof navigator !== 'undefined' && !!navigator.geolocation;

export type LocationMode = 'off' | 'once' | 'while_using';
export type StoredLocation = {
  lat: number;
  lon: number;
  accuracy: number;
  capturedAt: number;
};

const MODE_KEY = 'maxess.locationMode';
const LOC_KEY = 'maxess.lastLocation';

// while_using cache window: re-use a fix taken within the last 30 min.
const FRESH_MS = 30 * 60 * 1000;
// Hard discard: ignore anything older than a day on cold load.
const HARD_DISCARD_MS = 24 * 60 * 60 * 1000;
const GEO_TIMEOUT_MS = 10_000;

const VALID_MODES: LocationMode[] = ['off', 'once', 'while_using'];

function readMode(): LocationMode {
  if (!hasLocalStorage()) return 'off';
  try {
    const v = localStorage.getItem(MODE_KEY);
    return VALID_MODES.includes(v as LocationMode) ? (v as LocationMode) : 'off';
  } catch {
    return 'off';
  }
}

function readLocation(): StoredLocation | null {
  if (!hasLocalStorage()) return null;
  try {
    const raw = localStorage.getItem(LOC_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredLocation;
    if (Date.now() - parsed.capturedAt > HARD_DISCARD_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export const locationMode = writable<LocationMode>(readMode());
export const lastLocation = writable<StoredLocation | null>(readLocation());

if (hasLocalStorage()) {
  locationMode.subscribe((m) => {
    try { localStorage.setItem(MODE_KEY, m); } catch { /* quota */ }
  });
  lastLocation.subscribe((l) => {
    try {
      if (l) localStorage.setItem(LOC_KEY, JSON.stringify(l));
      else localStorage.removeItem(LOC_KEY);
    } catch { /* quota */ }
  });
}

export function isGeolocationAvailable(): boolean {
  if (!hasNavigatorGeolocation()) return false;
  // window.isSecureContext is false on plain http://, which makes geolocation
  // fail unconditionally on most browsers; treat as unavailable up-front.
  if (typeof window !== 'undefined' && window.isSecureContext === false) return false;
  return true;
}

function getCurrentPositionPromise(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: GEO_TIMEOUT_MS,
      maximumAge: 0,
    });
  });
}

export type RequestLocationOptions = {
  // Inline opt-in: capture a single fix even when global mode is 'off'.
  // Used by per-page CTAs like the "Use my location" chip on Near You.
  forceOnce?: boolean;
};

export async function requestLocation(opts: RequestLocationOptions = {}): Promise<StoredLocation | null> {
  if (!isGeolocationAvailable()) return null;

  const mode = get(locationMode);
  const force = opts.forceOnce === true;

  if (mode === 'off' && !force) return null;

  // while_using: reuse a recent fix.
  if (mode === 'while_using' && !force) {
    const cached = get(lastLocation);
    if (cached && Date.now() - cached.capturedAt < FRESH_MS) return cached;
  }

  try {
    const pos = await getCurrentPositionPromise();
    const stored: StoredLocation = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      capturedAt: Date.now(),
    };
    lastLocation.set(stored);

    // 'once' auto-reverts so we don't silently re-query later.
    if (mode === 'once') locationMode.set('off');

    return stored;
  } catch (err) {
    const code = (err as GeolocationPositionError | undefined)?.code;
    if (code === 1) {
      // PERMISSION_DENIED — flip off so the UI reflects reality and stop asking.
      locationMode.set('off');
      showToast('Location blocked. Re-enable in your browser settings to use this feature.');
    } else if (code === 3) {
      // TIMEOUT
      showToast('Location request timed out.');
      if (mode === 'once') locationMode.set('off');
    } else {
      showToast('Could not get your location.');
      if (mode === 'once') locationMode.set('off');
    }
    return null;
  }
}

// Convenience for consumer UIs to display "X min ago" or fall back gracefully.
export function isFreshEnough(loc: StoredLocation | null, maxAgeMs: number = FRESH_MS): boolean {
  if (!loc) return false;
  return Date.now() - loc.capturedAt < maxAgeMs;
}
