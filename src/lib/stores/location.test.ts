import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { get } from 'svelte/store';

type GeoCoords = { latitude: number; longitude: number; accuracy: number };
type GeoSuccess = (pos: { coords: GeoCoords; timestamp: number }) => void;
type GeoError = (err: { code: number; message: string }) => void;
type GetCurrentPosition = (s: GeoSuccess, e?: GeoError, opts?: PositionOptions) => void;

const PERMISSION_DENIED = 1;
const TIMEOUT = 3;

let getCurrentPositionImpl: GetCurrentPosition = () => {};

function setGeolocation(impl: GetCurrentPosition | null) {
  if (impl === null) {
    vi.unstubAllGlobals();
    return;
  }
  getCurrentPositionImpl = impl;
  vi.stubGlobal('navigator', {
    geolocation: {
      getCurrentPosition: (s: GeoSuccess, e?: GeoError, o?: PositionOptions) => getCurrentPositionImpl(s, e, o),
    },
  });
}

function setSecureContext(secure: boolean) {
  vi.stubGlobal('window', { ...(globalThis as any).window, isSecureContext: secure });
}

// Fresh import per test so the store's module-scope state resets.
async function freshStore() {
  vi.resetModules();
  return await import('./location.js');
}

const toasts: string[] = [];
vi.mock('./toasts.js', () => ({
  showToast: (msg: string) => { toasts.push(msg); },
}));

beforeEach(() => {
  toasts.length = 0;
  // Minimal localStorage shim.
  const store = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v); },
    removeItem: (k: string) => { store.delete(k); },
    clear: () => store.clear(),
  });
  setSecureContext(true);
  setGeolocation((success) => success({
    coords: { latitude: 34.05, longitude: -118.25, accuracy: 25 },
    timestamp: Date.now(),
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('location store', () => {
  it('defaults to off mode with no stored location', async () => {
    const { locationMode, lastLocation } = await freshStore();
    expect(get(locationMode)).toBe('off');
    expect(get(lastLocation)).toBeNull();
  });

  it('once mode captures a single fix then reverts to off', async () => {
    const { locationMode, requestLocation, lastLocation } = await freshStore();
    locationMode.set('once');
    const result = await requestLocation();
    expect(result).not.toBeNull();
    expect(result?.lat).toBeCloseTo(34.05);
    expect(result?.lon).toBeCloseTo(-118.25);
    expect(get(lastLocation)?.lat).toBeCloseTo(34.05);
    expect(get(locationMode)).toBe('off');
  });

  it('while_using mode stays sticky across multiple requests', async () => {
    const { locationMode, requestLocation } = await freshStore();
    locationMode.set('while_using');
    await requestLocation();
    await requestLocation();
    expect(get(locationMode)).toBe('while_using');
  });

  it('while_using reuses a cached fix within the freshness window', async () => {
    const { locationMode, requestLocation } = await freshStore();
    locationMode.set('while_using');
    let calls = 0;
    setGeolocation((success) => {
      calls += 1;
      success({ coords: { latitude: 34.05, longitude: -118.25, accuracy: 10 }, timestamp: Date.now() });
    });
    await requestLocation();
    await requestLocation();
    expect(calls).toBe(1);
  });

  it('refuses to call geolocation when mode is off (unless forceOnce is passed)', async () => {
    const { requestLocation } = await freshStore();
    let calls = 0;
    setGeolocation((success) => {
      calls += 1;
      success({ coords: { latitude: 1, longitude: 2, accuracy: 5 }, timestamp: Date.now() });
    });
    const result = await requestLocation();
    expect(result).toBeNull();
    expect(calls).toBe(0);
  });

  it('forceOnce bypasses off mode for inline opt-in (e.g. Near You chip)', async () => {
    const { requestLocation, locationMode } = await freshStore();
    const result = await requestLocation({ forceOnce: true });
    expect(result).not.toBeNull();
    expect(get(locationMode)).toBe('off');
  });

  it('permission denied reverts mode to off and shows a toast', async () => {
    const { locationMode, requestLocation } = await freshStore();
    locationMode.set('while_using');
    setGeolocation((_s, err) => err?.({ code: PERMISSION_DENIED, message: 'denied' }));
    const result = await requestLocation();
    expect(result).toBeNull();
    expect(get(locationMode)).toBe('off');
    expect(toasts.some(t => /Location blocked/i.test(t))).toBe(true);
  });

  it('timeout reverts once mode to off and keeps while_using', async () => {
    const mod = await freshStore();
    mod.locationMode.set('once');
    setGeolocation((_s, err) => err?.({ code: TIMEOUT, message: 'timeout' }));
    await mod.requestLocation();
    expect(get(mod.locationMode)).toBe('off');

    mod.locationMode.set('while_using');
    await mod.requestLocation();
    expect(get(mod.locationMode)).toBe('while_using');
  });

  it('is SSR-safe: importing in a non-browser env yields off + null and no throw', async () => {
    vi.unstubAllGlobals();
    const { locationMode, lastLocation, isGeolocationAvailable } = await freshStore();
    expect(get(locationMode)).toBe('off');
    expect(get(lastLocation)).toBeNull();
    expect(isGeolocationAvailable()).toBe(false);
  });
});
