# TODO

## Navigation
- [x] Fix broken `/leaderboard` link on home page → `/score`
- [x] Score page "View full leaderboard" span is not navigable — removed
- [x] Score page "View all challenges" span is not navigable — removed

## Functionality
- [x] Events page search bar bound but not filtering results — wired up
- [x] Events page filter chips don't filter events — wired up
- [x] Score page filter dropdowns (location, time period) don't filter data — wired up

## Dead Code
- [x] Remove unused dashboard components in `src/lib/components/dashboard/`
- [x] Remove unused domain modules (`readiness.js`, `rewards.js`, `weak-points.js`, `leadership-brief.js`, `format.js`)

## Followups (2026-06-05)

### Streak counter
- [ ] Swap the hardcoded `'fan_001'` in `src/routes/+layout.server.ts` for the authenticated user id once Auth0 ships. The streak ledger code itself (`src/lib/server/streak.ts → touchUserStreak`) is already keyed by `fan_id`.
- [ ] Decide whether the 24/48h streak windows should be calendar-day based instead of wall-clock based. Current behavior: 11pm Mon + 10am Tue = no increment (only 11h apart). Switching to ISO-date comparison would count that as a streak day. If switching, update `touchUserStreak` to compare `now.toISOString().slice(0,10)` vs `last_streak_at.toISOString().slice(0,10)` and add a timezone offset param.

### Fandom routing
- [x] Derive `mockArtists` (in `src/routes/artist/[id]/+page.server.ts`) from `FOLLOWED_ARTISTS` / `FOLLOWED_TEAMS` in `src/lib/data/seedFandoms.ts` so adding a new canonical follow never produces a 404. Either inline the per-artist detail fields (genre, superfan_score, top_tracks, etc.) into `seedFandoms.ts`, or create a sibling `artistProfiles.ts` keyed by id and merge at load time. *(0.10.1 — landed as sibling `artistProfiles.ts` with `getArtistProfile()` helper)*
- [ ] Long-term: split `/artist/[id]` into `/artist/[id]` (music) and `/team/[id]` (sports). Currently teams ride the artist route with listening-derived fields zeroed; a dedicated team route would surface season schedule, standings, roster instead of "Top Tracks: N/A".

### Optional integrations (currently degraded gracefully)
- [ ] `SPOTIFY_CLIENT_ID` + `SPOTIFY_CLIENT_SECRET` — replaces the Deezer image fallback with first-party Spotify portraits + listening match.
- [ ] `LASTFM_API_KEY` — real per-user top-artists list (currently a hardcoded seed list inside `src/lib/server/music.ts`).
- [ ] `PUBLIC_VAPID_PUBLIC_KEY` + `VAPID_PRIVATE_KEY` + `VAPID_SUBJECT` — push notifications actually deliver. Generate with `npx web-push generate-vapid-keys`.
- [ ] `RESEND_API_KEY` + `RESEND_FROM_EMAIL` — invite emails actually send from the (currently stubbed) InviteCard flow.
- [ ] Apple Wallet certs (`APPLE_PASS_TYPE_ID`, `APPLE_TEAM_ID`, `APPLE_PASS_CERT_P12_BASE64`, `APPLE_PASS_CERT_PASSWORD`) — real installable `.pkpass` files instead of the unsigned demo build.

## Mocked / Deferred
- [ ] Re-wire the invite/referral flow end-to-end. Currently `src/lib/components/InviteCard.svelte` is stubbed: clicking "Invite" copies a fake referral link to the clipboard and shows a success toast — no email is sent, no Invitation row is created, no pending-list / revoke / accepted summary is rendered. The full implementation already exists on disk and just needs to be re-enabled:
  - `POST /api/invites` (create + dispatch email), `GET /api/invites` (list), `DELETE /api/invites/[code]` (revoke), `POST /api/invites/[code]/accept` (signup + reward) — see `src/routes/api/invites/`.
  - Server helpers in `src/lib/server/database.ts` (`createInvitation`, `listInvitationsByReferrer`, `revokeInvitation`, `acceptInvitation`) and `src/lib/server/invites.ts` (validation + code gen).
  - Email module `src/lib/server/email.ts` (Resend; needs `RESEND_API_KEY` env to actually send).
  - Prisma `Invitation` model + `InviteStatus` enum still in `prisma/schema.prisma`. Run `npm run db:push` once the table doesn't yet exist on the target DB.
  - To re-enable: replace `InviteCard.svelte` with the popover + form + pending list UI from commit `188b072` (or git restore that version of the file).
  - See `specs/app.yml` → `referral_program` for the contract.
