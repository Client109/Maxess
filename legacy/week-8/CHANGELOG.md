# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
