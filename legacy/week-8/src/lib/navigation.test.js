import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const VALID_ROUTES = ['/', '/events', '/score', '/access', '/profile'];

function routeExists(route) {
  if (route === '/') {
    return existsSync(resolve('src/routes/+page.svelte'));
  }
  return existsSync(resolve(`src/routes${route}/+page.svelte`));
}

describe('Navigation links', () => {
  it('all valid routes have corresponding page files', () => {
    for (const route of VALID_ROUTES) {
      expect(routeExists(route), `Route ${route} should have a +page.svelte`).toBe(true);
    }
  });

  it('home page "Climb the Ranks" links to /score', () => {
    const home = readFileSync(resolve('src/routes/+page.svelte'), 'utf-8');
    // The "See All" link next to "Climb the Ranks" should point to /score
    expect(home).toContain('href="/score"');
    expect(home).not.toContain('href="/leaderboard"');
  });

  it('BottomNav tabs only reference valid routes', () => {
    const nav = readFileSync(resolve('src/lib/components/BottomNav.svelte'), 'utf-8');
    const hrefMatches = nav.match(/href:\s*'([^']+)'/g) || [];
    for (const match of hrefMatches) {
      const route = match.match(/href:\s*'([^']+)'/)[1];
      expect(VALID_ROUTES, `BottomNav href "${route}" should be a valid route`).toContain(route);
    }
  });

  it('no page references non-existent /leaderboard route', () => {
    const pages = [
      'src/routes/+page.svelte',
      'src/routes/score/+page.svelte',
      'src/lib/components/BottomNav.svelte'
    ];
    for (const page of pages) {
      const content = readFileSync(resolve(page), 'utf-8');
      expect(content, `${page} should not link to /leaderboard`).not.toContain('"/leaderboard"');
      expect(content, `${page} should not link to /leaderboard`).not.toContain("'/leaderboard'");
    }
  });
});
