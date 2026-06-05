import { describe, it, expect } from 'vitest';
import { getArtistProfile, ARTIST_PROFILES } from './artistProfiles.js';
import { FOLLOWED_ARTISTS, FOLLOWED_TEAMS } from './seedFandoms.js';

describe('getArtistProfile', () => {
  it('returns null for unknown ids', () => {
    expect(getArtistProfile('this-id-does-not-exist')).toBeNull();
    expect(getArtistProfile('')).toBeNull();
  });

  it('returns the curated registry entry verbatim for known ids', () => {
    const weeknd = getArtistProfile('weeknd');
    expect(weeknd).not.toBeNull();
    expect(weeknd?.id).toBe('weeknd');
    expect(weeknd?.name).toBe('The Weeknd');
    expect(weeknd?.genre).toBe('R&B / Pop');
    expect(weeknd?.superfan_score).toBe(87);
    expect(weeknd?.tier).toBe('Elite');
    expect(weeknd?.top_tracks.length).toBeGreaterThan(0);
  });

  it('resolves the `the-weeknd` alias to the same registry entry', () => {
    const a = getArtistProfile('weeknd');
    const b = getArtistProfile('the-weeknd');
    expect(a?.name).toBe(b?.name);
    expect(a?.top_tracks).toEqual(b?.top_tracks);
  });

  it('every FOLLOWED_ARTISTS id resolves', () => {
    for (const a of FOLLOWED_ARTISTS) {
      const profile = getArtistProfile(a.id);
      expect(profile, `expected /artist/${a.id} to resolve`).not.toBeNull();
      expect(profile?.id).toBe(a.id);
    }
  });

  it('every FOLLOWED_TEAMS id resolves', () => {
    for (const t of FOLLOWED_TEAMS) {
      const profile = getArtistProfile(t.id);
      expect(profile, `expected /artist/${t.id} to resolve`).not.toBeNull();
      expect(profile?.id).toBe(t.id);
    }
  });

  it('bonus registry entries (no canonical follow) keep resolving', () => {
    expect(getArtistProfile('kendrick-lamar')?.name).toBe('Kendrick Lamar');
    expect(getArtistProfile('sza')?.name).toBe('SZA');
  });

  it('derived default for an unknown canonical follow uses seed name + zeroed listening fields', () => {
    // Synthesize a seed entry that is NOT in the registry to prove derivation
    // works. We can't easily mutate the seed array at runtime, so we instead
    // assert on a real canonical row that ISN'T in the curated registry. None
    // of the current FOLLOWED_TEAMS are curated except ducks/lakers/etc., so
    // this isn't reachable today — but the explicit derivation branch is
    // covered by the synthesizing test below using a hand-crafted seed.
    const seed = { id: 'synth-test', name: 'Synth Test', category: 'music' as const, points: 50_000, listener_percentile: 50, image: '/x.jpg' };
    // The helper accepts an optional second arg for tests that want to inject
    // a seed directly without mutating the imported array.
    const profile = getArtistProfile(seed.id, [seed]);
    expect(profile).not.toBeNull();
    expect(profile?.name).toBe('Synth Test');
    expect(profile?.image_color).toMatch(/^#/);   // some hex color
    expect(profile?.top_tracks).toEqual([]);       // listening fields zeroed
    expect(profile?.monthly_plays).toBe(0);
    expect(profile?.hours_listened).toBe(0);
    expect(profile?.top_track).toBe('N/A');
    expect(profile?.tier).toBe('Fan');              // 50K points → Fan band
  });

  it('derived default for a team carries sport into genre', () => {
    const seed = { id: 'synth-team', name: 'Synth Team', category: 'sports' as const, sport: 'Curling', points: 25_000, listener_percentile: 20, image: null };
    const profile = getArtistProfile(seed.id, [seed]);
    expect(profile?.genre).toBe('Curling');
  });

  it('derived default tier_color reflects the points band', () => {
    const elite = getArtistProfile('synth-elite', [{ id: 'synth-elite', name: 'Synth', category: 'music', points: 1_500_000, listener_percentile: 1, image: null }]);
    const fan   = getArtistProfile('synth-fan',   [{ id: 'synth-fan',   name: 'Synth', category: 'music', points: 50_000,    listener_percentile: 30, image: null }]);
    expect(elite?.tier).toBe('Elite');
    expect(elite?.tier_color).toBe('#FF5C00');
    expect(fan?.tier).toBe('Fan');
    expect(fan?.tier_color).toBe('#1A9E56');
  });

  it('ARTIST_PROFILES still includes every previously-handcrafted entry', () => {
    const expected = ['weeknd', 'the-weeknd', 'kaytranada', 'daniel-caesar', 'odesza', 'ariana-grande', 'ducks', 'lakers', 'rams', 'dodgers', 'kings', 'kendrick-lamar', 'sza'];
    for (const id of expected) {
      expect(ARTIST_PROFILES[id], `expected ${id} to be in ARTIST_PROFILES`).toBeDefined();
    }
  });
});
