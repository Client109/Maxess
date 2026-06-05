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

## Mocked / Deferred
- [ ] Re-wire the invite/referral flow end-to-end. Currently `src/lib/components/InviteCard.svelte` is stubbed: clicking "Invite" copies a fake referral link to the clipboard and shows a success toast — no email is sent, no Invitation row is created, no pending-list / revoke / accepted summary is rendered. The full implementation already exists on disk and just needs to be re-enabled:
  - `POST /api/invites` (create + dispatch email), `GET /api/invites` (list), `DELETE /api/invites/[code]` (revoke), `POST /api/invites/[code]/accept` (signup + reward) — see `src/routes/api/invites/`.
  - Server helpers in `src/lib/server/database.ts` (`createInvitation`, `listInvitationsByReferrer`, `revokeInvitation`, `acceptInvitation`) and `src/lib/server/invites.ts` (validation + code gen).
  - Email module `src/lib/server/email.ts` (Resend; needs `RESEND_API_KEY` env to actually send).
  - Prisma `Invitation` model + `InviteStatus` enum still in `prisma/schema.prisma`. Run `npm run db:push` once the table doesn't yet exist on the target DB.
  - To re-enable: replace `InviteCard.svelte` with the popover + form + pending list UI from commit `188b072` (or git restore that version of the file).
  - See `specs/app.yml` → `referral_program` for the contract.
