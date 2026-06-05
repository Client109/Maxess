# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.10.0] - 2026-06-04

### Added
- **Home page rewired to the dark mockup.**
  - **Universal Balance** = sum of `FanTier.points_balance` across all of the user's fandoms (distinct from `xp_total`/lifetime). Pure helper `universalBalance()` in `src/lib/server/home.ts` with 3 vitest cases.
  - **Your fandoms list** now reads top 3 by `points_balance` from `FanTier` via new `topByBalance()` helper (3 vitest cases including tie-breaker + zero-balance exclusion). Falls back to the client-side `followedArtists` store when server data is absent.
  - **Hero pill** ("`<Tier>` for `<Fandom>`") sourced from `User.selected_fandom_id` → classified via `classifyArtistTier()`. Links to `/access`.
  - **Upcoming preview** picks the first event whose title matches the user's selected fandom (otherwise first upcoming event).
  - **"Earn more points" row** renders four cards driven by `XP_PER_CHECKIN` / `XP_PER_LISTENING_HOUR` / `XP_PER_TRIVIA_CORRECT` / `XP_PER_STREAK_BONUS` constants from `xp-rules.ts`.
  - 14-day sparkline on the hero card sourced from `getXpHistory(14)` with soft orange gradient fill + end-of-line dot.
- **Fandom data adjusted to match the mockup tier chips:**
  - The Weeknd lifetime 280K → **1,000,000** (Elite floor).
  - Anaheim Ducks lifetime 55K → **105,000** (Loyal floor).
  - Ariana Grande lifetime 2K → **10,500** (Fan floor).
  - FanTier balance override block in seed pins Weeknd 5,480 / Ducks 2,340 / Ariana 930; all other fandom balances zeroed so Universal Balance reads **8,750** and the top-3 fandom list matches the mockup precisely.

### Changed
- Hero card label is now **Universal Balance** (sum of spendable balances) instead of **Universal Points** (lifetime `xp_total`).
- `src/routes/+page.server.ts` queries `FanTier` and exposes `universalBalance`, `topFandomsByBalance`, `selectedFandomTier`, `upcomingPreview`, and `earnRates` on the page payload.
- `visual_design.dark_pages` adds `/` (home) to the dark-route list.
- Pushing The Weeknd to Elite-floor lifetime moves Alex's `xp_total` from Superfan into Elite app-wide; leaderboard rank shifts accordingly. Per mockup precision.

### Fixed
- `navigation.test.js` updated for the dark-theme `--bg-card: #0B0B0D` token value (was asserting the pre-refactor `#1A1A1C`).

## [0.9.0] - 2026-06-04

### Added
- **/access page redesigned to the dark mockup with a full per-fandom tier model.**
  - Prisma: `FanTier` (per-user × per-fandom lifetime/balance), `Reward` catalog (tier-gated, with `is_included_perk` for the lower-tier list), `RewardRedemption` ledger, `User.selected_fandom_id`. New enums `FandomKind` (`ARTIST | TEAM`) and `FanTierBand` (`NEWCOMER | FAN | LOYAL | SUPERFAN | ELITE`).
  - `src/routes/access/+page.svelte` rewritten in dark theme (`#000` page bg, `#0E0E10` cards, `#FF5C00` accent). Sections: page header with notification bell, selected-fandom card (portrait + tier chip + spendable balance), explainer copy, Rewards/Passes segmented toggle (custom themed, no native input), Unlocked-for-Tier horizontal-scroll reward grid with image + check overlay, Included-from-lower-tiers list, per-fandom tier footnote ("You are Elite for The Weeknd, …").
  - `src/lib/server/access.ts` — pure helpers `partitionRewards()` and `resolveSelectedFandom()` (extracted so they're unit-testable without a DB). 12 vitest cases in `access.test.ts`.
  - `src/routes/access/+page.server.ts` — loads FanTier rows, joins display metadata from `seedFandoms.ts`, resolves selected fandom (explicit-or-top-points), partitions rewards by tier vs the user's current tier.
  - `POST /api/fandoms/select` — switches `User.selected_fandom_id`. Guards 404 when fandom isn't in the user's FanTier list.
  - Fandom switcher: tapping the selected-fandom card opens a bottom sheet listing all the user's FanTier rows; selecting one swaps the page.
  - Seed: FanTier rows for all 10 of Alex's fandoms (5 artists + 5 teams) from `FOLLOWED_ARTISTS`/`FOLLOWED_TEAMS`; 70 Reward catalog rows (7 per fandom: 4 Elite hero unlockables + 3 included-from-lower perks); RewardRedemption row dropping Weeknd balance to **5,480** to match the mockup. `selected_fandom_id = 'weeknd'` for the demo user.
  - Earn-and-burn model: redeeming a reward subtracts from `FanTier.points_balance` but never decreases `lifetime_points`, so tier is sticky.

### Changed
- **BottomNav reordered** to `Home / Score / Access / Events / Profile` (was `Home / Events / Score / Access / Profile`). Icons updated to match the mockup: Score → `Trophy`, Access → `Ticket`, Events → `Calendar` (was `Target` / `Crown` / `Compass`).
- `specs/app.yml:visual_design` adds a `dark_pages` carve-out documenting `/access` (and the already-dark `/profile`) so the "light theme app-wide" rule has an explicit exception.

## [0.8.0] - 2026-06-04

### Changed
- **Tier thresholds rescaled** to a "lifetime fan" curve: Fan 10,000 / Loyal 100,000 / Superfan 250,000 / Elite 1,000,000 XP (previously 0 / 1,000 / 2,500 / 5,000).
- **Display tiers** now expose a 5th band: "Newcomer" covers 0–9,999 XP. Prisma `Tier` enum stays 4-wide (`GENERAL | LOYAL | SUPERFAN | ELITE`); the display layer in `src/lib/server/transforms.ts:tierDisplayName(prismaTier, xpTotal)` splits `GENERAL` into "Newcomer" vs "Fan" at 10,000 XP.
- `superfan_score` normalization in `transforms.ts:transformUserToFan` now scales `xp_total / 1_000_000` (was `/ 12000`) so the 0–100 score tracks the new Elite ceiling.
- `VERIFICATION_XP` in `src/lib/server/database.ts` realigned with the 10,000 concert reward: WALLET_SCAN / TICKETMASTER_WEBHOOK = 10,000, MANUAL = 5,000, SELF_CHECKIN = 2,500. Tests in `src/lib/server/wallet/verification.test.ts` updated.
- `prisma/seed.ts`: Alex Chen and all 79 city users re-authored to land across all five display tiers (≥4 Elite, broad Superfan/Loyal/Fan bands, sub-Fan Newcomer tail). Alex now sits at 750,000 XP (Superfan, rank 12 globally).
- Mock data (`src/lib/data/mockData.ts`) and `specs/app.yml:demo_user` updated to match Alex's new totals.
- Profile page tier reference list (`src/routes/profile/+page.svelte`) shows the new XP ranges (10K–99K / 100K–249K / 250K–999K / 1M+).

### Added
- `src/lib/domain/xp-rules.ts` — canonical constants for the points economy: `XP_PER_TRACK_LISTEN = 1`, `XP_PER_LISTENING_HOUR = 10`, `DAILY_LISTENING_XP_CAP = 100`, `XP_PER_CONCERT_ATTENDANCE = 10_000`, `MIN_LISTEN_SECONDS = 30`. Exports `computeDailyListeningXp({ signal, alreadyToday? })` (clamps to the daily cap, returns the awardable delta) and `concertAttendanceXp()`.
- `src/lib/domain/xp-rules.test.ts` — 9 vitest cases covering constants, daily cap clamping, partial-day deltas, fractional-hour flooring, and negative-input handling.
- `specs/app.yml:xp_scoring_model` rewritten around the new constants plus an `anti_grind` section documenting the daily cap, 30-second listen threshold, idempotent concert verification, and worked earn-rate estimates (active fan ≈ 107K XP/yr, casual fan ≈ 33K XP/yr).
- `specs/app.yml:tier_thresholds` expanded to a 5-row table with `prisma_enum`, `display_only`, and explicit `min_xp` / `max_xp` columns so the GENERAL → Newcomer/Fan split is unambiguous.
- **Sophisticated Spotify/Last.fm listening capture** — periodically pulls each user's scrobbles, attributes plays to followed artists, and awards Streaming XP through the existing `computeDailyListeningXp()` helper.
  - Prisma: `FollowedArtist` model (`user_id`, `lastfm_name` canonical, `display_name`, `spotify_id?`, `image_url?`), `ListeningEvent` model (idempotent on `(user_id, source, played_at, track_name)`, `is_followed` flag), `ListenSource` enum (`LASTFM | SPOTIFY`).
  - `src/lib/server/listens.ts` — `syncUserListens(fanId)` polls Last.fm `user.getRecentTracks` from a per-user cursor, dedupes via unique constraint, recomputes today's followed-artist signal, writes the XP delta with source `Streaming`. Pure `attributeListens()` helper unit-tested. Spotify OAuth path stubbed for when auth lands.
  - Endpoints: `POST /api/artists/follow`, `DELETE /api/artists/follow/[id]`, `GET /api/artists/followed`, `POST /api/listens/sync` (on-demand), `GET /api/cron/sync-listens` (Vercel Cron; recognized via `x-vercel-cron` header or `Authorization: Bearer ${CRON_SECRET}`).
  - `vercel.json` — hourly cron schedule (`0 * * * *`). Vercel Hobby tier only supports daily cron; downgrade to `0 0 * * *` on Hobby.
  - `LastFmClient.getUserRecentTracks(username, { from, limit })` — new method on `src/lib/api/lastfm.ts`.
  - UI: `FollowingCard.svelte` on Profile (followed-artist chips with unfollow + "Sync now" button), `RecentListensCard.svelte` (last 10 plays with "Followed" badge), Follow/Unfollow button on `/artist/[id]` now also POSTs/DELETEs the server API so listens capture can attribute plays.
  - Seed: pre-follows 4 artists for Alex (The Weeknd, Kaytranada, Daniel Caesar, ODESZA) + 10 sample `ListeningEvent` rows across the last 24 h so the demo UI populates without a real sync.
  - `CRON_SECRET` env var documented (optional; only needed for manual cron triggering outside Vercel's automatic header).
  - `src/lib/server/listens.test.ts` — 6 vitest cases covering canonical-name normalization, follow-set tagging, daily aggregation, MIN_LISTEN_SECONDS filtering, and missing-duration handling.

## [0.7.0] - 2026-06-04

### Added
- Invite / referral program — earn 250 XP for every friend who joins via your invite link.
- `InviteCard.svelte` on Profile: themed button + popover with email input, "Send invite", pending-invites list with Copy/Revoke actions, and joined-count summary.
- `/invite/[code]` public landing page with a themed signup form (name + email + optional city). Successful signup creates a `User` row, marks the invite `ACCEPTED`, and appends a `Referral` `xp_transactions` row for the referrer.
- API endpoints: `POST /api/invites` (create), `GET /api/invites` (list mine), `DELETE /api/invites/[code]` (revoke), `POST /api/invites/[code]/accept` (signup + reward).
- Prisma: new `Invitation` model + `InviteStatus` enum (`SENT | ACCEPTED | REVOKED`), `User.invitations_sent` relation, unique constraints on `(referrer_id, invitee_email)` and `accepted_user_id`.
- Email dispatch: `src/lib/server/email.ts` sends via Resend when `RESEND_API_KEY` is configured; otherwise the UI falls back to copying the share link / mailto for manual sharing. New env keys: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.
- `src/lib/server/invites.ts` — pure helpers: `generateInviteCode()` (12-char base64url), `validateInviteRequest()` (email format, self-invite block, duplicate-pending check), `buildAcceptUrl()`. Plus `REFERRAL_XP_REWARD = 250` and `REFERRAL_XP_SOURCE = 'Referral'`.
- `src/lib/server/invites.test.ts` — 8 vitest cases covering code shape/uniqueness, validation paths, and URL builder.
- App spec: new `referral_program` section documenting lifecycle, schema additions, endpoints, email strategy, UI, and constraints. Profile screen spec updated to reference the Invite friends card.

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
