# Maxxes Data Wiring Plan

## Status: DRAFT — Ready for Implementation

**Date:** 2026-05-28
**Purpose:** Wire real data sources to the Maxxes UI. Replace all mock data with live API calls and database queries. Deploy to Vercel with hosted PostgreSQL.

---

## Executive Summary

The Maxxes frontend is feature-complete with four screens (Home, Events, Rank & Rewards, Profile) running on mock data. The backend architecture exists (Prisma schema, database functions, Zod types, base API client) but nothing is connected. This plan wires three external data sources (Ticketmaster, Spotify, Last.fm) to the UI through SvelteKit server routes backed by Vercel-hosted PostgreSQL.

**Auth is explicitly deferred.** This is a demo prototype. A hardcoded demo user (Alex Chen) is used throughout. Auth0 integration is earmarked for the product roadmap.

---

## Data Source Decisions

| Source | Role | Priority | Status |
|--------|------|----------|--------|
| **Ticketmaster Discovery API** | Primary event source — all events, venues, sale windows, pricing | P0 | API key pending, types ready |
| **Spotify Web API** | Primary music intelligence — top artists, listening history, artist matching | P0 | Types ready, needs OAuth client credentials flow |
| **Last.fm API** | Secondary music intelligence — fallback when Spotify unavailable, scrobble history, artist stats | P1 | Types ready, simpler auth (API key only) |
| **PostgreSQL (Vercel Postgres)** | All user data — profile, XP, leaderboard, challenges, passes, activity | P0 | Schema defined, functions written, needs hosting |
| **Apple Music** | EXCLUDED from this plan per product decision | — | — |
| **Discord** | Deferred — community features, not needed for demo | P2 | Config stubs exist |
| **Auth0** | Deferred — demo prototype uses hardcoded user | Roadmap | Config stubs exist |

### Spotify + Last.fm Strategy

Use **both**, with Spotify as default:

1. **Spotify** is the primary source for top artists, recently played tracks, and listening history
2. **Last.fm** is the fallback when Spotify data is unavailable or for enrichment (deeper scrobble history, artist tags, similar artists)
3. For the demo prototype, Spotify uses **Client Credentials flow** (no user OAuth needed — sufficient for artist data, search, and track metadata). User-specific endpoints (top artists, recently played) require Authorization Code flow, which we simulate with seed data until auth is implemented.
4. Last.fm uses a simple **API key** (no OAuth) — can query user data if a Last.fm username is stored

---

## Critical Blockers to Resolve First

### Blocker 1: Adapter Switch

**Current:** `@sveltejs/adapter-static` — precompiles all pages at build time, cannot serve server routes.

**Required:** `@sveltejs/adapter-vercel` (or `adapter-auto`) — enables `+page.server.ts` and `+server.ts` files.

**Fix:**
```bash
npm uninstall @sveltejs/adapter-static
npm install @sveltejs/adapter-vercel
```

Update `svelte.config.js`:
```js
import adapter from '@sveltejs/adapter-vercel';
export default {
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    })
  }
};
```

Remove `prerender` configuration from `+layout.ts`.

### Blocker 2: Tier Naming Mismatch

The codebase has **two conflicting tier systems**:

| Location | Tier Names | Thresholds |
|----------|-----------|------------|
| Prisma schema (`schema.prisma`) | BRONZE, SILVER, GOLD, PLATINUM, DIAMOND | — |
| `domain/xp.ts` | BRONZE(0), SILVER(2000), GOLD(5000), PLATINUM(10000), DIAMOND(20000) | Different |
| APP_SPEC.md / UI mockups | General(0), Loyal(1000), Superfan(2500), Elite(5000) | Canonical |
| `database.ts` createUser | defaults to `'BRONZE'` | Wrong |

**Resolution:** The APP_SPEC naming is canonical. Update:

1. Prisma enum `Tier` → `GENERAL, LOYAL, SUPERFAN, ELITE`
2. `domain/xp.ts` → thresholds: General(0), Loyal(1000), Superfan(2500), Elite(5000)
3. `database.ts` createUser → default to `'GENERAL'`
4. Run `prisma migrate` to update the enum in PostgreSQL

### Blocker 3: Hosted Database

**Current:** Local Prisma accelerate URL only.

**Required:** Vercel Postgres (or Neon/Supabase Postgres).

**Steps:**
1. Create Vercel project, link repo
2. Add Vercel Postgres integration (provisions Neon-hosted Postgres)
3. Copy `DATABASE_URL` and `DIRECT_URL` to Vercel env vars
4. Update `schema.prisma` datasource for Vercel Postgres:
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL")
     directUrl = env("DIRECT_URL")
   }
   ```
5. Run `npx prisma migrate deploy`
6. Run `npx prisma db seed`

### Blocker 4: API Keys

| Key | Source | How to Get |
|-----|--------|-----------|
| `TICKETMASTER_API_KEY` | [developer.ticketmaster.com](https://developer.ticketmaster.com) | Free developer account, instant key |
| `SPOTIFY_CLIENT_ID` | [developer.spotify.com](https://developer.spotify.com/dashboard) | Create app, get client ID + secret |
| `SPOTIFY_CLIENT_SECRET` | Same as above | Same dashboard |
| `LASTFM_API_KEY` | [last.fm/api/account/create](https://www.last.fm/api/account/create) | Free, instant |

All keys go in Vercel environment variables (not `.env` in repo).

---

## Architecture: What Exists vs What's Needed

### Already Built (Ready to Wire)

| Asset | Location | Status |
|-------|----------|--------|
| Prisma schema (10 models) | `prisma/schema.prisma` | Ready (needs tier enum fix) |
| Database query functions (12) | `src/lib/server/database.ts` | Ready (needs tier enum fix) |
| Base API client (rate limiting, caching, dedup) | `src/lib/api/base.ts` | Ready |
| Zod schemas for all APIs | `src/lib/domain/types.ts` | Ready |
| Environment config | `src/lib/config/env.ts` | Ready |
| XP domain logic | `src/lib/domain/xp.ts` | Ready (needs tier threshold fix) |
| Hot List domain logic | `src/lib/domain/hotlist.ts` | Ready |
| Seed data script | `prisma/seed.ts` | Ready (needs expansion) |
| Mock data (structure reference) | `src/lib/data/mockData.ts` | Reference only — will be replaced |

### Must Build

| Asset | Location | Purpose |
|-------|----------|---------|
| **TicketmasterClient** | `src/lib/api/ticketmaster.ts` | Extends BaseApiClient. Fetches events, venues, attractions. |
| **SpotifyClient** | `src/lib/api/spotify.ts` | Extends BaseApiClient. Client credentials auth, artist search, track metadata. |
| **LastFmClient** | `src/lib/api/lastfm.ts` | Extends BaseApiClient. Artist info, user top artists, scrobbles. |
| **Event normalizer** | `src/lib/server/events.ts` | Transforms Ticketmaster responses → internal Event schema. |
| **Music intelligence service** | `src/lib/server/music.ts` | Spotify-first, Last.fm-fallback. Artist matching, relevance scoring. |
| **Server route: Home** | `src/routes/+page.server.ts` | Loads fan profile, score, upcoming events, leaderboard preview |
| **Server route: Events** | `src/routes/events/+page.server.ts` | Loads events from Ticketmaster via normalizer |
| **Server route: Rank & Rewards** | `src/routes/rank-rewards/+page.server.ts` | Loads leaderboard, challenges, passes, friend activity |
| **Server route: Profile** | `src/routes/profile/+page.server.ts` | Loads full fan profile, XP breakdown, recent activity |
| **API route: Events search** | `src/routes/api/events/+server.ts` | Server-side event search (proxies Ticketmaster) |

---

## Wiring Plan: Route by Route

### Route 1: Home (`/`)

**File:** `src/routes/+page.server.ts`

```typescript
// Data loaded server-side via SvelteKit load function
export async function load() {
  const fan = await getUserByFanId('fan_001'); // hardcoded demo user
  const upcomingEvents = await getUpcomingEvents(undefined, 'Los Angeles', 6);
  const leaderboard = await getLeaderboard('WEEKLY', 'Los Angeles');
  const friendActivity = await getFriendActivity('fan_001', 5);

  return {
    fan: transformFanForUI(fan),
    upcomingEvents: upcomingEvents.map(transformEventForUI),
    leaderboardPreview: leaderboard.slice(0, 5),
    friendActivity
  };
}
```

**What changes in `+page.svelte`:**
- Remove `import { mockEvents, mockFriendActivity } from '$lib/data/mockData'`
- Replace with `export let data;` (SvelteKit page data)
- Access `data.fan`, `data.upcomingEvents`, etc.

### Route 2: Events (`/events`)

**File:** `src/routes/events/+page.server.ts`

```typescript
export async function load({ url }) {
  const category = url.searchParams.get('category') || 'all';
  const city = url.searchParams.get('city') || 'Los Angeles';

  // Fetch from Ticketmaster
  const tmClient = getTicketmasterClient();
  const tmEvents = await tmClient.searchEvents({
    city,
    classificationName: category === 'music' ? 'Music' : category === 'sports' ? 'Sports' : undefined,
    size: 40,
    sort: 'date,asc'
  });

  // Normalize to internal schema
  const events = tmEvents.map(normalizeTicketmasterEvent);

  // Enrich with Spotify artist matching
  const spotifyClient = getSpotifyClient();
  const enrichedEvents = await enrichEventsWithSpotify(events, spotifyClient);

  return {
    events: enrichedEvents,
    featuredEvent: enrichedEvents.find(e => e.featured) || enrichedEvents[0],
    filters: { category, city }
  };
}
```

**Search endpoint:** `src/routes/api/events/+server.ts`
- Client-side search input hits this endpoint
- Proxies to Ticketmaster search with debounce
- Returns normalized events

### Route 3: Rank & Rewards (`/rank-rewards`)

**File:** `src/routes/rank-rewards/+page.server.ts`

```typescript
export async function load({ url }) {
  const tab = url.searchParams.get('tab') || 'rank';
  const fan = await getUserByFanId('fan_001');

  // My Rank data
  const leaderboard = await getLeaderboard('WEEKLY', 'Los Angeles');
  const challenges = await getUserChallenges('fan_001');
  const friendActivity = await getFriendActivity('fan_001', 10);

  // My Rewards data
  const passes = await getUserPasses('fan_001');
  const featuredOffers = await getFeaturedOffers('fan_001');
  const tierPerks = getTierPerks(); // static config

  return {
    tab,
    fan: transformFanForUI(fan),
    rank: {
      leaderboard,
      challenges: challenges.map(transformChallengeForUI),
      friendActivity
    },
    rewards: {
      passes: passes.map(transformPassForUI),
      featuredOffers,
      tierPerks
    }
  };
}
```

**Note:** The current route is `/access`. This must be renamed to `/rank-rewards` to match the four-tab redesign. Update `src/routes/` directory structure accordingly.

### Route 4: Profile (`/profile`)

**File:** `src/routes/profile/+page.server.ts`

```typescript
export async function load() {
  const fan = await getUserByFanId('fan_001');
  const recentActivity = await getRecentActivity('fan_001', 20);
  const xpBreakdown = await getXpBreakdown('fan_001');

  return {
    fan: transformFanForUI(fan),
    recentActivity,
    xpBreakdown,
    connectedAccounts: getConnectedAccountsStatus(fan)
  };
}
```

---

## API Client Implementations

### TicketmasterClient (`src/lib/api/ticketmaster.ts`)

```typescript
import { BaseApiClient } from './base.js';
import { apiLimits } from '../config/env.js';
import type { TicketmasterEventsResponse } from '../domain/types.js';

export class TicketmasterClient extends BaseApiClient {
  private apiKey: string;

  constructor(apiKey: string) {
    super(apiLimits.ticketmaster.baseUrl);
    this.apiKey = apiKey;
  }

  async searchEvents(params: {
    keyword?: string;
    city?: string;
    stateCode?: string;
    classificationName?: string;
    startDateTime?: string;
    endDateTime?: string;
    size?: number;
    sort?: string;
    latlong?: string;
    radius?: string;
  }) {
    return this.get<TicketmasterEventsResponse>('/events.json', {
      apikey: this.apiKey,
      ...params
    }, `tm-events-${JSON.stringify(params)}`);
  }

  async getEvent(eventId: string) {
    return this.get(`/events/${eventId}.json`, {
      apikey: this.apiKey
    }, `tm-event-${eventId}`);
  }

  async getVenue(venueId: string) {
    return this.get(`/venues/${venueId}.json`, {
      apikey: this.apiKey
    }, `tm-venue-${venueId}`);
  }
}
```

**Rate limits:** 5,000 requests/day, 5 requests/second. The `RateLimiter` in `base.ts` handles this.

**Cache strategy:** Event search results cached 5 minutes. Individual events cached 15 minutes.

### SpotifyClient (`src/lib/api/spotify.ts`)

```typescript
import { BaseApiClient } from './base.js';
import { apiLimits, serverConfig } from '../config/env.js';

export class SpotifyClient extends BaseApiClient {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    super(apiLimits.spotify.baseUrl);
  }

  // Client Credentials flow — no user auth needed
  private async authenticate() {
    if (this.accessToken && Date.now() < this.tokenExpiry) return;

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${serverConfig.spotify.clientId}:${serverConfig.spotify.clientSecret}`)}`
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // 1min buffer
    this.headers['Authorization'] = `Bearer ${this.accessToken}`;
  }

  async searchArtists(query: string, limit = 5) {
    await this.authenticate();
    return this.get('/search', {
      q: query, type: 'artist', limit
    }, `spotify-artist-${query}`);
  }

  async getArtist(artistId: string) {
    await this.authenticate();
    return this.get(`/artists/${artistId}`, {}, `spotify-artist-${artistId}`);
  }

  async getArtistTopTracks(artistId: string, market = 'US') {
    await this.authenticate();
    return this.get(`/artists/${artistId}/top-tracks`, { market });
  }

  async getRelatedArtists(artistId: string) {
    await this.authenticate();
    return this.get(`/artists/${artistId}/related-artists`);
  }
}
```

**Note:** Client Credentials flow gives access to artist data, search, and track metadata — but NOT user-specific data (top artists, recently played). For the demo prototype, user listening data comes from seed data. Full Spotify OAuth (Authorization Code + PKCE) is deferred to the auth roadmap.

### LastFmClient (`src/lib/api/lastfm.ts`)

```typescript
import { BaseApiClient } from './base.js';
import { apiLimits, serverConfig } from '../config/env.js';
import type { LastFmArtist, LastFmTrack, LastFmUser } from '../domain/types.js';

export class LastFmClient extends BaseApiClient {
  private apiKey: string;

  constructor() {
    super(apiLimits.lastfm.baseUrl);
    this.apiKey = serverConfig.lastfm.apiKey;
  }

  async getUserTopArtists(username: string, period = '7day', limit = 10) {
    return this.get<{ topartists: { artist: LastFmArtist[] } }>('', {
      method: 'user.gettopartists',
      user: username,
      period,
      limit,
      api_key: this.apiKey,
      format: 'json'
    }, `lastfm-top-artists-${username}-${period}`);
  }

  async getUserTopTracks(username: string, period = '7day', limit = 10) {
    return this.get<{ toptracks: { track: LastFmTrack[] } }>('', {
      method: 'user.gettoptracks',
      user: username,
      period,
      limit,
      api_key: this.apiKey,
      format: 'json'
    });
  }

  async getArtistInfo(artist: string) {
    return this.get('', {
      method: 'artist.getinfo',
      artist,
      api_key: this.apiKey,
      format: 'json'
    }, `lastfm-artist-${artist}`);
  }

  async getSimilarArtists(artist: string, limit = 10) {
    return this.get('', {
      method: 'artist.getsimilar',
      artist,
      limit,
      api_key: this.apiKey,
      format: 'json'
    });
  }
}
```

**Fallback logic:** When Spotify artist data is unavailable (rate limit, missing data), the music intelligence service falls back to Last.fm for artist info, tags, and similar artists.

---

## Event Normalizer (`src/lib/server/events.ts`)

Transforms Ticketmaster API responses into the internal `Event` schema used by the UI:

```typescript
import type { TicketmasterEvent } from '$lib/domain/types.js';
import type { Event } from '$lib/domain/types.js';

export function normalizeTicketmasterEvent(tmEvent: TicketmasterEvent): Event {
  const venue = tmEvent._embedded.venues[0];
  const attraction = tmEvent._embedded.attractions?.[0];
  const classification = tmEvent.classifications?.[0];
  const segment = classification?.segment?.name?.toLowerCase();

  return {
    event_id: `tm_${tmEvent.id}`,
    title: tmEvent.name,
    subtitle: attraction?.name || '',
    category: segment === 'sports' ? 'sports' : 'music',
    date: tmEvent.dates.start.localDate,
    time: tmEvent.dates.start.localTime || '',
    venue: venue.name,
    city: venue.city.name,
    access_type: 'MUSIC ACCESS', // derive from classification
    status: mapTmStatus(tmEvent.dates.status.code),
    featured: false, // set by curation logic
    image_color: '#1a1a2e', // fallback
    genre_tag: classification?.genre?.name,
    sale_status: mapSaleStatus(tmEvent.dates.status.code),
    trending: false,
    near_you: true,
    upcoming_for_you: true
  };
}

function mapTmStatus(code: string): 'active' | 'upcoming' | 'limited' | 'sold_out' {
  switch (code) {
    case 'onsale': return 'active';
    case 'offsale': return 'upcoming';
    case 'cancelled': return 'sold_out';
    default: return 'upcoming';
  }
}

function mapSaleStatus(code: string): string {
  switch (code) {
    case 'onsale': return 'On Sale';
    case 'offsale': return 'Coming Soon';
    case 'cancelled': return 'Cancelled';
    default: return 'Available';
  }
}
```

---

## Music Intelligence Service (`src/lib/server/music.ts`)

Spotify-first, Last.fm-fallback service for artist matching and relevance scoring:

```typescript
import { SpotifyClient } from '$lib/api/spotify.js';
import { LastFmClient } from '$lib/api/lastfm.js';
import type { Event } from '$lib/domain/types.js';

const spotify = new SpotifyClient();
const lastfm = new LastFmClient();

// Match events to user's listening data for relevance scoring
export async function enrichEventsWithMusicData(
  events: Event[],
  userTopArtists: string[] // from seed data or future auth
): Promise<Event[]> {
  return events.map(event => {
    const artistMatch = userTopArtists.some(
      artist => event.title.toLowerCase().includes(artist.toLowerCase()) ||
                event.subtitle?.toLowerCase().includes(artist.toLowerCase())
    );

    return {
      ...event,
      match_percentage: artistMatch ? 95 : undefined,
      upcoming_for_you: artistMatch || event.upcoming_for_you
    };
  });
}

// Get artist data with Spotify-first, Last.fm-fallback
export async function getArtistData(artistName: string) {
  // Try Spotify first
  try {
    const spotifyResult = await spotify.searchArtists(artistName, 1);
    if (spotifyResult.success && spotifyResult.data) {
      return { source: 'spotify', data: spotifyResult.data };
    }
  } catch {
    // Spotify failed, fall through to Last.fm
  }

  // Fallback to Last.fm
  try {
    const lastfmResult = await lastfm.getArtistInfo(artistName);
    if (lastfmResult.success && lastfmResult.data) {
      return { source: 'lastfm', data: lastfmResult.data };
    }
  } catch {
    // Both failed
  }

  return null;
}
```

---

## Seed Data Expansion

The current seed script (`prisma/seed.ts`) has minimal data. Expand to:

| Table | Current Rows | Target Rows | Notes |
|-------|-------------|-------------|-------|
| `users` | 5 | 30+ | Need enough for realistic leaderboard |
| `events` | 4 | 0 (live from TM) | Events come from Ticketmaster now |
| `challenges` | 3 | 8-10 | More variety, tied to reward passes |
| `xp_transactions` | ~5 | 30+ | Realistic XP history for Alex Chen |
| `leaderboard` | 5 | 50+ | Full leaderboard with weekly/monthly/all-time |
| `passes` | 0 | 8-10 | Access passes for all tiers |
| `friend_activities` | ~5 | 15+ | Realistic social feed |
| `recent_activities` | ~5 | 20+ | Realistic activity log |

**Events are no longer seeded.** They come live from Ticketmaster. The seed only provides user data, challenges, leaderboard, and passes.

---

## Route Rename: `/access` → `/rank-rewards`

Per the four-tab redesign (Home, Events, Rank & Rewards, Profile):

1. Rename `src/routes/access/` → `src/routes/rank-rewards/`
2. Update `+layout.svelte` bottom navigation links
3. Update any internal links/routes referencing `/access` or `/score`
4. The Score screen (`/score`) is also merged — remove it as a separate route
5. Single route `/rank-rewards` with `?tab=rank|rewards` query parameter

---

## Implementation Order

### Phase 1: Unblock (Day 1)
1. Switch adapter-static → adapter-vercel
2. Fix tier enum (Prisma schema, domain/xp.ts, database.ts)
3. Remove prerender config from +layout.ts
4. Verify `npm run build` succeeds with new adapter

### Phase 2: Database (Day 1-2)
1. Create Vercel project, link repo
2. Provision Vercel Postgres
3. Run `prisma migrate deploy`
4. Expand seed data
5. Run `prisma db seed`
6. Verify queries work from a test server route

### Phase 3: API Clients (Day 2-3)
1. Build TicketmasterClient extending BaseApiClient
2. Build SpotifyClient with Client Credentials auth
3. Build LastFmClient with API key auth
4. Build event normalizer (Ticketmaster → internal schema)
5. Build music intelligence service (Spotify-first, Last.fm-fallback)
6. Test each client independently

### Phase 4: Server Routes (Day 3-4)
1. Create `src/routes/+page.server.ts` (Home)
2. Create `src/routes/events/+page.server.ts` (Events)
3. Rename `/access` → `/rank-rewards`, create `+page.server.ts`
4. Create `src/routes/profile/+page.server.ts`
5. Create `src/routes/api/events/+server.ts` (search endpoint)

### Phase 5: Frontend Swap (Day 4-5)
1. Update each `+page.svelte` to consume `data` from server load
2. Remove all `mockData.ts` imports
3. Update bottom nav for four-tab structure
4. Update any hardcoded routes
5. Test all screens with real data

### Phase 6: Deploy & Verify (Day 5)
1. Push to Vercel
2. Set all env vars (API keys, DATABASE_URL)
3. Run migrations on production
4. Seed production database
5. Verify all four screens with live data
6. Test Ticketmaster event search end-to-end

---

## Environment Variables Required at Deploy

```
# Database
DATABASE_URL=          # Vercel Postgres connection string (pooled)
DIRECT_URL=            # Vercel Postgres direct connection (for migrations)

# Ticketmaster
TICKETMASTER_API_KEY=  # From developer.ticketmaster.com

# Spotify
SPOTIFY_CLIENT_ID=     # From developer.spotify.com
SPOTIFY_CLIENT_SECRET= # From developer.spotify.com

# Last.fm
LASTFM_API_KEY=        # From last.fm/api
```

---

## Data Flow Diagrams

### Events Screen Data Flow

```
User opens /events
  → SvelteKit server load()
    → TicketmasterClient.searchEvents({ city: 'Los Angeles' })
      → Ticketmaster Discovery API
      ← Raw TM events
    → normalizeTicketmasterEvent() for each
    → enrichEventsWithMusicData() using Spotify/Last.fm
    ← Enriched internal Event[]
  → +page.svelte receives { events, featuredEvent, filters }
  → UI renders with real data
```

### Rank & Rewards Data Flow

```
User opens /rank-rewards?tab=rank
  → SvelteKit server load()
    → getUserByFanId('fan_001')          ← PostgreSQL
    → getLeaderboard('WEEKLY', 'LA')     ← PostgreSQL
    → getUserChallenges('fan_001')       ← PostgreSQL
    → getFriendActivity('fan_001', 10)   ← PostgreSQL
    ← Combined rank data
  → +page.svelte receives { fan, rank: { leaderboard, challenges, friendActivity } }
  → User switches to My Rewards tab (client-side, data already loaded)
  → UI renders rewards: { passes, featuredOffers, tierPerks }
```

### Music Intelligence Fallback

```
getArtistData("The Weeknd")
  → SpotifyClient.searchArtists("The Weeknd")
    → 200 OK? Return Spotify data
    → 429 Rate Limit? Fall through
    → Error? Fall through
  → LastFmClient.getArtistInfo("The Weeknd")
    → 200 OK? Return Last.fm data
    → Error? Return null
```

---

## What This Plan Does NOT Cover (Deferred)

| Item | Reason | When |
|------|--------|------|
| **Auth0 / user authentication** | Demo prototype — hardcoded user | Product roadmap |
| **Spotify user OAuth (Authorization Code)** | Requires auth system | After auth implementation |
| **Apple Music / MusicKit** | Product decision to exclude | TBD |
| **Discord community features** | Not needed for demo | Post-launch |
| **Real-time data (WebSockets)** | Leaderboard/activity can poll | V2 |
| **Push notifications** | Requires auth + device registration | Post-launch |
| **Venue POS / check-in trust module** | Partner integration | Post-launch |
| **Partner dashboard** | B2B feature | Post-launch |
| **Predictive churn modeling** | Data science | Post-launch |
| **Caching layer (Redis/Vercel KV)** | In-memory SimpleCache sufficient for demo | Scale concern |

---

## Success Criteria

- [ ] All four screens load with real data (no mock imports remaining)
- [ ] Events come live from Ticketmaster Discovery API
- [ ] Artist data enriched via Spotify (fallback Last.fm)
- [ ] Leaderboard, challenges, passes loaded from PostgreSQL
- [ ] Fan profile (Alex Chen) loaded from database
- [ ] XP breakdown computed from xp_transactions table
- [ ] Search on Events page hits Ticketmaster in real time
- [ ] App deployed at public Vercel URL
- [ ] No hardcoded mock data in any `+page.svelte` file
- [ ] Four-tab navigation: Home, Events, Rank & Rewards, Profile
