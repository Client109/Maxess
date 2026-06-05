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

  it('/rank-rewards route no longer exists (renamed to /score)', () => {
    expect(routeExists('/rank-rewards')).toBe(false);
  });

  it('BottomNav has exactly 5 tabs', () => {
    const nav = readFileSync(resolve('src/lib/components/BottomNav.svelte'), 'utf-8');
    const hrefMatches = nav.match(/href:\s*'([^']+)'/g) || [];
    expect(hrefMatches.length).toBe(5);
  });

  it('BottomNav tabs only reference valid routes', () => {
    const nav = readFileSync(resolve('src/lib/components/BottomNav.svelte'), 'utf-8');
    const hrefMatches = nav.match(/href:\s*'([^']+)'/g) || [];
    for (const match of hrefMatches) {
      const route = match.match(/href:\s*'([^']+)'/)[1];
      expect(VALID_ROUTES, `BottomNav href "${route}" should be a valid route`).toContain(route);
    }
  });

  it('BottomNav does not reference /rank-rewards', () => {
    const nav = readFileSync(resolve('src/lib/components/BottomNav.svelte'), 'utf-8');
    expect(nav).not.toContain("'/rank-rewards'");
  });

  it('BottomNav has no FAB button (removed)', () => {
    const nav = readFileSync(resolve('src/lib/components/BottomNav.svelte'), 'utf-8');
    expect(nav).not.toContain('fab-button');
    expect(nav).not.toContain('Plus');
  });
});

describe('Dark theme', () => {
  it('tokens.css defines dark theme bg-primary', () => {
    const tokens = readFileSync(resolve('src/lib/styles/tokens.css'), 'utf-8');
    expect(tokens).toContain('--bg-primary: #000000');
    expect(tokens).toContain('--text-primary: #FFFFFF');
    expect(tokens).toContain('--bg-card: #0B0B0D');
  });

  it('layout.svelte uses theme CSS variables', () => {
    const layout = readFileSync(resolve('src/routes/+layout.svelte'), 'utf-8');
    expect(layout).toContain('var(--bg-primary)');
    expect(layout).toContain('var(--text-primary)');
  });
});

describe('Home page', () => {
  it('home page contains Maxess brand header', () => {
    const home = readFileSync(resolve('src/routes/+page.svelte'), 'utf-8');
    expect(home.toLowerCase()).toContain('maxess');
  });

  it('home page does not contain fake iOS status bar', () => {
    const home = readFileSync(resolve('src/routes/+page.svelte'), 'utf-8');
    expect(home).not.toContain('status-bar');
    expect(home).not.toContain('signal-bars');
  });

  it('home page uses server data via export let data', () => {
    const home = readFileSync(resolve('src/routes/+page.svelte'), 'utf-8');
    expect(home).toContain('export let data');
  });
});

describe('Database layer', () => {
  it('database.ts uses @prisma/adapter-pg for direct TCP connection', () => {
    const db = readFileSync(resolve('src/lib/server/database.ts'), 'utf-8');
    expect(db).toContain('PrismaPg');
    expect(db).toContain('adapter');
  });

  it('seed.ts uses @prisma/adapter-pg for direct TCP connection', () => {
    const seed = readFileSync(resolve('prisma/seed.ts'), 'utf-8');
    expect(seed).toContain('PrismaPg');
    expect(seed).toContain('adapter');
  });

  it('prisma schema uses GENERAL/LOYAL/SUPERFAN/ELITE tiers', () => {
    const schema = readFileSync(resolve('prisma/schema.prisma'), 'utf-8');
    expect(schema).toContain('GENERAL');
    expect(schema).toContain('LOYAL');
    expect(schema).toContain('SUPERFAN');
    expect(schema).toContain('ELITE');
    expect(schema).not.toContain('BRONZE');
    expect(schema).not.toContain('DIAMOND');
  });
});
