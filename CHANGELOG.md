# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.1] - 2026-06-04

### Added
- Location sharing — user-controlled native geolocation with three modes (Off | Once | While Using). Profile → Settings hosts a custom Svelte segmented control; Home → Near You This Week gets an inline "Use my location" chip for one-shot opt-in. Coordinates stay on-device (localStorage + in-memory Svelte store); never sent to the server.
- `src/lib/stores/location.ts` — `locationMode` and `lastLocation` writables, `requestLocation({ forceOnce? })` helper, `isGeolocationAvailable()` capability check, `isFreshEnough()` cache helper. Auto-reverts `once` → `off` after capture; reuses fixes within 30 min for `while_using`; hard-discards readings older than 24 h on cold load.
- Permission handling: `PERMISSION_DENIED` flips mode to off + toast; 10 s timeout reverts `once` to off; insecure-context detection renders the control disabled with "Not supported on this device" caption.
- `src/lib/stores/location.test.ts` — 9 vitest cases covering mode transitions, cache freshness, permission denial, timeout, force-once bypass, SSR safety.
- App spec: new `location_sharing` section documenting modes, consumers, privacy posture, store shape, and test coverage.

## [0.6.0] - 2026-06-04

### Added
- Apple Wallet attendance verification (`/admin/scan` demo page, `/api/passes/[passId]/wallet` download, `/api/passes/scan/[serial]` ingest)
- `src/lib/server/wallet/pkpass.ts` — `.pkpass` generator with pluggable signer; unsigned-mode default, signed-mode stub for when Apple Pass certs land
- Prisma schema: `Pass.apple_wallet_serial`, `Pass.wallet_added_at`, `Pass.pass_kind`, `Pass.event_id`; new `AttendanceVerification` model; `PassKind` + `VerificationMethod` enums
- `recordAttendanceVerification()` in `src/lib/server/database.ts` — idempotent on `(user_id, event_id, method)`, awards XP through the existing ledger, increments `User.events_attended`
- `APPLE_PASS_TYPE_ID`, `APPLE_TEAM_ID`, `APPLE_PASS_CERT_P12_BASE64`, `APPLE_PASS_CERT_PASSWORD`, `APPLE_PASS_ORGANIZATION_NAME` env vars (all optional)
- "Add to Apple Wallet" button on `/passes/[id]` for wallet-enabled ticket passes
- Seed: two demo `Event` rows + two `TICKET`-kind passes for Alex Chen with pre-assigned wallet serials
- `jszip` dependency for `.pkpass` zip container

### Fixed
- `prisma/seed.ts` now falls back to the raw-postgres port when `DATABASE_URL` is a `prisma+postgres://` proxy URL (same fallback already used by `src/lib/server/database.ts`)

## [0.5.0] - 2026-05-28

### Added
- Server-side data loading via SvelteKit `+page.server.ts` load functions for all screens
- PostgreSQL direct TCP connection via `@prisma/adapter-pg` (replaces accelerateUrl proxy)
- New dependencies: `pg`, `@prisma/adapter-pg` for direct database access
- API client modules: `src/lib/api/ticketmaster.ts`, `src/lib/api/spotify.ts`, `src/lib/api/lastfm.ts`
- Server modules: `src/lib/server/events.ts`, `src/lib/server/music.ts`, `src/lib/server/transforms.ts`
- Rank & Rewards screen at `/rank-rewards` route with server-loaded data
- Expanded seed data: 32 users, 8 challenges, 8 passes, 15 friend activities, 20 recent activities

### Changed
- Theme switched from dark (#0A0A1A) to light (#F8F8FA) across all surfaces and components
- Tier system renamed: Bronze/Silver/Gold/Platinum/Diamond → General/Loyal/Superfan/Elite
- Tier thresholds updated: General 0, Loyal 1000, Superfan 2500, Elite 5000
- Rewards tab route changed from `/access` to `/rank-rewards`, nav label from "Access" to "Rewards"
- Bottom navigation restyled: white background (#FFFFFF), #E5E5EA border, #8E8E93 inactive text
- Prisma schema: output to `node_modules/.prisma/client`, datasource URL from config
- `database.ts` uses `PrismaPg` adapter with direct TCP pool connection
- `seed.ts` uses `PrismaPg` adapter with direct TCP pool connection
- Build adapter switched from `adapter-static` to `adapter-vercel`
- Home page redesigned with server data (`export let data`) replacing client-side store fetching
- All test cases updated for new routes, light theme, and tier system (15 tests)

### Removed
- Fake iOS status bar (signal bars, wifi, battery icons) from home page
- Center FAB (floating action button) from bottom navigation
- Plus icon import from bottom navigation
- Dark theme color values from tokens.css

## [0.4.0] - 2026-05-28

### Added
- App-wide dark theme with updated CSS custom properties (tokens.css, app.css)
- Redesigned home page matching mockup: MAXESS brand header with Zap icon, time-based greeting, Momentum Score card with sparkline SVG, XP progress bar, upcoming events with Unsplash concert images, Your Ranking card, Community Activity feed, Trending Near You section
- Center FAB (floating action button) with Plus icon in bottom navigation
- Search icon for Events tab in bottom navigation
- Dark theme tests and home page structure tests (8 new test cases)

### Changed
- Color palette switched from light (#FFFFFF background) to dark (#0A0A1A background) across all surfaces
- Bottom navigation background updated to #0D0D1F with dark theme styling
- Events page restyled for dark theme consistency
- App spec updated: visual_design section reflects dark theme, home screen spec matches new design, navigation spec includes center FAB

## [0.3.0] - 2026-05-28

### Added
- Unified "Access & Rewards" screen merging former Score and Access screens into one
- Internal tab toggle (My Rank / My Rewards) with orange pill switcher matching Home screen pattern
- Challenge-to-reward linkage: completed challenges surface unlocked rewards in My Rewards tab
- "Newly unlocked" section in My Rewards showing claimable rewards from completed challenges
- "Unlock next" progress bar showing XP progress toward next tier
- Friends-only filter toggle on community leaderboard
- Perks by tier horizontal scroll carousel with 4 tiers (Fan, Loyal, Superfan, Elite)
- Notification dot on My Rewards toggle when unlocked rewards are available
- Trophy icon for merged Access tab in bottom navigation

### Changed
- Bottom navigation reduced from 5 tabs to 4 tabs (Home, Events, Access, Profile)
- Access tab icon changed from Key to Trophy to communicate both ranking and access
- LeaderboardCard "See leaderboard" link updated from /score to /access
- Prerender entries updated in svelte.config.js to reflect 4-screen structure

### Removed
- Separate Score screen (`/score` route) — all content merged into Access & Rewards
- Score tab from bottom navigation
- Target icon from bottom navigation imports

## [0.2.0] - 2026-05-20

### Added
- Apple MusicKit integration with mock/simulated auth (no developer account needed)
- Hot List feature: app-curated artists where listening earns XP
- HotListSection component on home page with connect CTA and artist progress cards
- Hot List XP logic: per-play XP with multipliers and bonus tiers
- Events page "For you" filter sorts matched events first with "Based on your listening" badge
- Profile page shows Listening XP in breakdown when Apple Music is connected
- Profile settings item to connect/view Apple Music status
- Domain types for AppleMusicUser, HotListArtist, HotListProgress
- Apple Music store with derived stores for progress, XP, and event matching

## [0.1.2] - 2026-05-20

### Fixed
- Events page search now filters by title, subtitle, and venue
- Events page filter chips (Music, Sports) now filter displayed events
- Score page leaderboard dropdown filters (location, period) now use `bind:value` and filter data
- Score page empty state shown when no leaderboard entries match filters

### Added
- Events page "Notify me" button toggles to "Notified" with green style
- Events page bookmark buttons toggle orange fill on trending cards
- UpcomingEvents component bookmark buttons toggle orange fill
- Access page "Claim access" button toggles to "Claimed" with green style
- Access page "View pass" button toggles to "Viewing" with highlighted style
- Profile page settings menu shows "Coming soon" badge on tap (1.5s, then reverts)

### Removed
- 20 dead files: dashboard components (11), ScenarioToggle, domain modules (6), data modules (2)
- Score page non-navigable "View full leaderboard" and "View all challenges" spans
- Access page non-navigable "View all" span from passes section

### Changed
- Moved `TOKENS.jsonl`, `START_SERVER.sh`, `score-card-concepts.png`, `.specstory/` into `_llm-artifacts/`
- Deleted empty `static/server.log`

## [0.1.1] - 2026-05-20

### Fixed
- Home page "Climb the Ranks" link pointed to non-existent `/leaderboard` route; now correctly links to `/score`
- Updated app spec navigation tabs to match implemented routes (Score + Access instead of Challenges + Leaderboard)

### Added
- Navigation link tests (`src/lib/navigation.test.js`) verifying all hrefs resolve to valid routes
- vitest dev dependency for test runner
- VERSION file for version tracking
