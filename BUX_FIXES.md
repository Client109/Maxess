# BUX_FIXES — Implementation Plan

Parallel execution plan for the 2026-06-11 bug audit (39 findings + typecheck).

## How to read this

Each **Track** is a set of fixes that all touch the same file (or non-overlapping files), so one worker can own it end-to-end without merge conflicts. Tracks marked `parallel-safe` can run simultaneously. Tracks marked with an arrow (`⇒ X`) must merge before track X starts.

**Merge cadence:** every track produces ONE commit. The integrator merges them in the order shown so the typecheck noise drops smoothly.

**Per CLAUDE.md:** no schema changes are required (Track M uses a code-level alias, not a Prisma field). No `prisma db push` needed. Seed changes in Track D **do** require `npm run db:seed` against prod before pushing — flagged in that track.

---

## Wave 1 — Foundation (run first, blocks nothing else but cleans the typecheck signal)

### Track P1 — Exclude `legacy/` from svelte-check / tsconfig  ⇒ everyone
**File:** `tsconfig.json` (+ possibly `svelte.config.js`)
**Why first:** ~40 of 142 typecheck errors come from `legacy/week-8/svelte.config.js` failing to resolve `@sveltejs/adapter-static`. Killing this noise makes every other track's verify step honest.
**Change:** add `"exclude": ["legacy/**", "_archive/**", "_llm-artifacts/**", "static-preview/**", "build/**", "generated/**"]` to `tsconfig.json`. If svelte-check still recurses, add a `.svelte-check.json` or pass `--ignore "legacy"`.
**Verify:** `npx svelte-kit sync && npx svelte-check 2>&1 | tail -50` — expect ~100 errors remaining (down from 142).

### Track P2 — `vite.config.js` vitest typing
**File:** `vite.config.js`
**Change:** swap `import { defineConfig } from 'vite'` for `import { defineConfig } from 'vitest/config'`.
**Verify:** typecheck `vite.config.js:6` error gone.

Both Wave 1 tracks land in <10 lines and are blockers for nothing semantic, but unblock honest verification for everything else. Worker can do both in one commit.

---

## Wave 2 — All semantic tracks run in parallel

Workers A–O are independent — every track owns its files. Order within a track is sequential; across tracks is parallel.

### Track A — XP ledger correctness  (HIGH priority)
**Owner file:** `src/lib/server/database.ts`
**Findings:** #1 (acceptInvitation race), #2 (events_attended double-count), #3 (xp_total race), #15 (getFriendUserIds non-unique name), #21 (acceptInvitation split updates), #25 (null-assertion in toggle/update), #28 (no re-rank in slice).

**Steps (commit as one diff):**
1. **#3** — `addXpTransaction`: replace read-modify-write with `db.user.update({ data: { xp_total: { increment: amount } } })`, then compute tier from the returned row.
2. **#1 + #21** — `acceptInvitation`: move email-in-use + status checks INSIDE `$transaction`. Use `tx.invitation.update({ where: { code, status: 'SENT' }, … })` so the second concurrent caller's update affects 0 rows (catch P2025). Collapse referrer increment + tier recompute into a single `tx.user.update`.
3. **#2** — `recordAttendanceVerification`: guard `events_attended` increment behind a prior-row check: `const hadAny = await tx.attendanceVerification.findFirst({ where: { user_id, event_id } }); if (!hadAny) { increment }`. Wrap the whole helper in a transaction.
4. **#15** — `getFriendUserIds`: don't resolve by `User.name`. Either add a friend join table (out of scope) OR seed the friend list as DB CUIDs in the canonical seed and read those directly. **Minimal fix:** dedupe by `findMany({ where: { name: { in: names } }, distinct: ['name'] })` AND log a warning if `result.length < names.length`.
5. **#25** — `toggleEventBookmark`, `updateChallengeProgress`: drop `!`; return `null` if user is missing. Update callers (none in current routes — safe).
6. **#28** — `getLeaderboard`: when `city` filter is set, re-rank the slice by `xp_total desc` and overwrite `rank` before returning.

**Verify:** `npx vitest run src/lib/server/database` (if a spec exists) + manual: simulate two concurrent `acceptInvitation` against the same code in a script under `tools/`.

---

### Track B — Transforms layer  (HIGH + MEDIUM)
**Owner file:** `src/lib/server/transforms.ts`
**Findings:** #4 (LOYAL → 'general'), #17 (missing 'unclaimed'), #24 (param rename), #36 (timeAgo).

**Steps:**
1. **#4** — `tierMap`: add `LOYAL: 'loyal'`. Audit `colorMap` for parity (Loyal should be `#2667FF`, the canonical Loyal blue from `src/lib/domain/xp.ts`).
2. **#17** — `statusMap`: add `'unclaimed'` branch. Decide the trigger: probably `Pass.status === 'AVAILABLE' && user_id === null` OR a `valid_until` proximity check. Document with a one-line comment.
3. **#24** — Rename `currentFanId` → `currentUserId` in `transformLeaderboardEntry` signature. Update all callers (`+page.server.ts`, `score/+page.server.ts`).
4. **#36** — `transformRecentActivity`: compute `timeAgo` from `ra.created_at` using `Date.now() - created_at.getTime()`. Bucket into "Just now / N min ago / N h ago / N d ago".

**Verify:** `npx vitest run src/lib/server/transforms` if present; manual: render `/passes/pass_007` (LOYAL), `/profile` recent activity row.

---

### Track C — Artist profile tier/color drift  (HIGH)
**Owner file:** `src/lib/data/artistProfiles.ts`
**Finding:** #5.

**Steps:**
1. Import `classifyArtistTier` and `TIERS` from `src/lib/domain/xp.ts`.
2. For each profile, **delete the hardcoded `tier`, `tier_color`, `tier_progress` fields** and resolve them at read time from the canonical points in `FOLLOWED_ARTISTS` via `classifyArtistTier(points)`. Keep the type for back-compat but mark these fields derived.
3. Add a test in `src/lib/data/artistProfiles.test.ts` that asserts every profile's derived tier matches `classifyArtistTier(canonical_points)`.

**Verify:** `npx vitest run src/lib/data/artistProfiles`. Visit `/artist/kaytranada`, `/artist/daniel-caesar`, `/artist/odesza`, `/artist/kendrick-lamar`, `/artist/sza` and confirm badges match `/access` and `/score`.

---

### Track D — Seed labels  (HIGH)  ⚠ requires prod seed re-run
**Owner file:** `prisma/seed.ts`
**Finding:** #6.

**Steps:**
1. Lines 358–373: split the "60 verified event check-ins × 500" rows into two source labels:
   - `source: 'Event Check-ins'` at `XP_PER_CHECKIN = 500` (the going-signal)
   - `source: 'Verified Check-ins'` at `XP_PER_CONCERT_ATTENDANCE = 10_000` (only for the subset truly attended)
2. Adjust counts so the resulting `xp_total` still hits the canonical `1_528_500`.
3. Update `src/routes/profile/+page.server.ts` `pickXp` keys to allow both sources into the check-ins bucket (also handled in Track K).

**Prod step (MUST run before push):**
```
vercel env pull .env.production --environment production --yes
set -a && source .env.production && set +a && npm run db:seed
```
Then verify `/profile` and `/score` against `maxess-test.vercel.app`.

---

### Track E — Home page  (HIGH + MEDIUM + LOW)
**Owner file:** `src/routes/+page.server.ts`
**Findings:** #7 (peer-compare uses weekly XP), #14 (frozen seed points), #16 (missing friendIds), #31 (fallback to lifetime not balance).

**Depends on:** Track A's `getLeaderboard` shape (re-rank) — read latest before starting; in practice no API change so parallel-safe.

**Steps:**
1. **#7** — load BOTH all-time leaderboard (for peer-compare math) and weekly (for the home card). Use all-time for the `delta_vs_peers` calc.
2. **#14** — replace the compile-time `FOLLOWED_ARTISTS`/`FOLLOWED_TEAMS` derivation with a query off `db.fanTier.findMany({ where: { user_id } })`, joining canonical metadata only for display name/image.
3. **#16** — pass `friendIds = await getFriendUserIds(dbUser.id, fan.friends)` to `transformLeaderboardEntry`.
4. **#31** — change fallback to `topFandomsByBalance[0]?.fandom_id ?? topByLifetime[0]?.fandom_id`. Compute `topFandomsByBalance` from `fan_tiers.points_balance desc`.

**Verify:** `/` renders, hero pill matches `/access` for the same fandom, peer card no longer inflates.

---

### Track F — Events surface  (HIGH + MEDIUM + LOW)
**Owner files:** `src/lib/server/events.ts`, `src/routes/events/[id]/+page.server.ts`, `src/routes/events/+page.svelte`
**Findings:** #8 (UTC date filter), #13 (presale TZ), #32 (recommended carousel), #39 (line-clamp CSS).

**Steps:**
1. **#8** — `filterNearYouThisWeek`: build `start` from local date using `new Date()` and `toLocaleDateString('en-CA', { timeZone: userTz })`, or accept user tz via param. Simplest: compute today's `YYYY-MM-DD` in the user's tz (Apr LA = `America/Los_Angeles` from `selected_fandom` or a default constant).
2. **#13** — `derivePresaleStart`: append a timezone designator. For Ticketmaster events the city is known; map city → IANA tz (small lookup table, fall back to `'America/New_York'`). Use `Intl.DateTimeFormat` or `Temporal` polyfill if available.
3. **#32** — pull peer events from the same TM query (`classifications`/`segmentId`), not from `mockEvents`. If no TM peers, return `[]` instead of mislabelled mocks.
4. **#39** — add `line-clamp: …;` next to `-webkit-line-clamp` in both pages.

**Verify:** typecheck no longer warns about line-clamp; smoke: `/events`, `/events/[tm-event-id]`.

---

### Track G — Cron auth  (HIGH abuse-risk)
**Owner file:** `src/routes/api/cron/sync-listens/+server.ts`
**Finding:** #9.

**Step:** drop the `x-vercel-cron`-only branch. Require the bearer secret (`CRON_SECRET`) unconditionally; Vercel cron does send it. Optionally keep `x-vercel-cron` as a soft check but require it AND the bearer to match.

**Verify:** curl with and without the header — without bearer should 401.

---

### Track H — Streak calendar-day fix  (MEDIUM)
**Owner file:** `src/lib/server/streak.ts`
**Finding:** #10.

**Step:** replace the elapsed-ms branching with calendar-day diff in the user's tz (default `'America/Los_Angeles'` until a `User.timezone` field is added). Pseudocode:
```ts
const tz = 'America/Los_Angeles';
const today = ymdInTz(now, tz);
const last = user.last_streak_at ? ymdInTz(user.last_streak_at, tz) : null;
if (!last) start streak at 1
else if (last === today) no-op
else if (dayDiff(last, today) === 1) increment
else reset to 1
```
Update doc comment to match.

**Verify:** add `streak.test.ts` cases: late-night → next-morning bumps; skip-day resets; same-day no-op.

---

### Track I — Listens recompute  (MEDIUM + LOW)
**Owner file:** `src/lib/server/listens.ts`
**Findings:** #11 (missing MIN_LISTEN filter on recount), #35 (Last.fm +1s cursor).

**Steps:**
1. **#11** — the `todayPlays` recount query must mirror `attributeListens`' MIN_LISTEN_SECONDS filter. Either add `AND duration_seconds >= MIN_LISTEN_SECONDS OR duration_seconds IS NULL` to the where clause, OR call the attribution helper instead of re-scanning DB.
2. **#35** — drop the `+1`. The `@@unique([user_id, source, played_at, track_name])` already prevents duplicate inserts; the +1 only causes drop-outs.

**Verify:** `npx vitest run src/lib/server/listens` (suite already exists).

---

### Track J — XP rules NaN + fractional  (MEDIUM + LOW)
**Owner file:** `src/lib/domain/xp-rules.ts`
**Findings:** #12 (NaN poisoning), #38 (sub-hour under-count).

**Steps:**
1. **#12** — at the top of `computeDailyListeningXp`, coerce: `const minutes = Number.isFinite(opts.signal.minutesListened) ? opts.signal.minutesListened : 0;`. Throw on NaN in dev (assert) but degrade in prod.
2. **#38** — keep the rate `XP_PER_HOUR` but compute over minutes directly with rounding rather than floor: `Math.round((minutes / 60) * XP_PER_HOUR)`. Or change the rule to `XP_PER_MINUTE = XP_PER_HOUR / 60` and remove the division.

**Verify:** `npx vitest run src/lib/domain/xp-rules` (suite exists; add NaN test).

---

### Track K — Profile rollup buckets  (MEDIUM)
**Owner file:** `src/routes/profile/+page.server.ts`
**Findings:** #22 (streak catch-all), #23 (trivia mis-bucketing).

**Steps:**
1. **#22** — change the `Math.max(0, total − classified)` residual from "streak bonus" to a separate "Other" bucket. Streak bonus should only count rows whose `source` matches the streak allowlist.
2. **#23** — remove `'Challenges'` from the trivia `pickXp` call; give Challenges its own row OR fold into Other.
3. Coordinate with Track D's seed labels — verified vs going-signal check-ins need separate buckets too.

**Verify:** `/profile` totals add up to `xp_total` exactly; each row label matches the underlying source.

---

### Track L — Wallet pkpass  (MEDIUM)
**Owner file:** `src/lib/server/wallet/pkpass.ts` (+ `static/wallet/`)
**Finding:** #20.

**Steps:**
1. Add `static/wallet/icon.png` (29×29), `icon@2x.png` (58×58), `logo.png` (≤160×50), `logo@2x.png`. Use the existing Maxxes mark.
2. Read them in `pkpass.ts`, add to the zip bundle, include in `manifest.json` with SHA-1 hashes.
3. Re-test signed and unsigned modes.

**Verify:** generate a `.pkpass` locally, `unzip -l` shows `icon.png`, `icon@2x.png`, manifest includes hashes. Email to a test device (only when signing key present).

---

### Track M — Access partition + tier enum alias  (MEDIUM)
**Owner file:** `src/lib/server/access.ts`
**Findings:** #18 (silent -1 fallback), #19 (Tier vs FanTierBand vocabulary drift).

**Steps:**
1. **#18** — `tierRank`: when the input is unknown, throw `new Error(`unknown tier ${label}`)` in dev / return `Infinity` (locks the reward) in prod. Add a `console.warn`.
2. **#19** — add a `src/lib/domain/tierAlias.ts` helper:
   ```ts
   export const PASS_TIER_TO_FAN_BAND = {
     GENERAL: 'NEWCOMER', LOYAL: 'LOYAL', SUPERFAN: 'SUPERFAN', ELITE: 'ELITE'
   } as const satisfies Record<Tier, FanTierBand>;
   ```
   Re-export both enums alongside. Use this helper anywhere `Pass.tier` is compared to `Reward.tier_required`. NO schema change.

**Verify:** unit test for `tierRank('bogus')` (should throw or lock); call site greps to confirm alias is used at all enum crossings.

---

### Track N — Small route + util fixes  (LOW)
**Files (all independent of each other — can subdivide further if you want):**
- `src/routes/api/artists/follow/[id]/+server.ts` — #26: try/catch around `unfollowArtist`, return 404 on "User not found".
- `src/routes/admin/scan/+page.server.ts` — #29: include null-`pass_id` rows in match by switching `scannedKey` to `${v.event_id}|${v.user_id}` (or `${v.event_id}|${v.method}`).
- `src/routes/api/passes/[passId]/wallet/+server.ts` — #30: drop the dynamic `import('$lib/server/database.js')`, use the static import already present.
- `src/lib/domain/xp.ts:177-182` — #27: change `findIndex(score >= userXP)` to `findIndex(score < userXP)`; clamp result to `[0, 100]`. Add `userXP >= max → 100` test.
- `src/lib/api/base.ts:303` — #37: guard the `setInterval` behind `if (typeof window !== 'undefined' && !(window as any).__maxessCacheCleanup)` flag, store handle on window.

**Verify:** smoke-test each route; `npx vitest run src/lib/domain/xp`.

---

### Track O — Mock data demo coherence  (LOW)
**Owner file:** `src/lib/data/mockData.ts`
**Findings:** #33 (xp_breakdown sums wrong), #34 (is_me weekly mismatch).

**Steps:**
1. Recompute `xp_breakdown` so it sums to `xp_total = 1_528_500`. Match the seed-side proportions from `prisma/seed.ts`.
2. Update the `is_me` weekly leaderboard row to a value consistent with the weekly numbers in the same array (likely ~15K, not 750K). Update `rank` accordingly.

**Verify:** `npx vitest run src/lib/data` (seedFandoms test guards `mockFanProfile`; extend it to assert breakdown sum).

---

## Wave 3 — Typecheck mop-up (run after Wave 2 lands)

Once semantic tracks are in, the remaining typecheck errors are easier to fix without conflicts:

### Track P3 — Real type bugs
**Files & one-liners:**
- `src/lib/data/mockData.ts:4` — add `connected_accounts: []` (or update the type to make it optional).
- `src/lib/push/client.ts:78` — cast `keyBuffer` to `BufferSource` via `new Uint8Array(buf).buffer as ArrayBuffer`.
- `src/lib/server/database.ts:93` — type `current_tier` as `Tier` from `@prisma/client`, not `string`. (Covered partially by Track A.)
- `src/routes/+page.server.ts:66`, `api/events/+server.ts:45`, `events/+page.server.ts:43` — fix `.filter((tm, _idx, _arr) => …)` arg order. Almost certainly `now` is being passed as the index because of a stray closure-capture mismatch.
- `src/routes/api/passes/[passId]/wallet/+server.ts:30` — wrap `Uint8Array` in `new Blob([buf])` before returning, or cast `as unknown as BodyInit`.
- `src/lib/components/LeaderboardCard.svelte:12` — annotate the prop type so `top_team` is reachable.
- `src/routes/artist/[id]/+page.svelte:140` — narrow `kind` with a type guard before assigning to the `'music' | 'sports'` slot.
- `src/routes/profile/notifications/+page.svelte:36` — add `social: …` to the icon map (use `Users` from lucide-svelte).
- `src/routes/events/[id]/+page.svelte:30-31` — guard `presaleMs` with `?? Infinity` before the arithmetic.
- `src/lib/navigation.test.js:35` — assert non-null before deref.

### Track P4 — Implicit-any sweep
Add explicit param types to the ~60 implicit-any sites in Svelte components. Group by component:
- `FollowingCard`, `HotListSection`, `RecentListensCard`, `UpcomingEvents`, `+page.svelte`, `events/+page.svelte`, `score/+page.svelte`, `passes/[id]/+page.svelte`, `profile/rewards/+page.svelte`, `admin/scan/+page.svelte`.

Either:
- a) add `lang="ts"` + types to each component (preferred), or
- b) loosen `tsconfig.json` `noImplicitAny` for Svelte glob only (faster, less safe).

---

## Dependency graph

```
Wave 1:  P1 ──┐                                    P2
             │
Wave 2:  A   B   C   D   E   F   G   H   I   J   K   L   M   N   O
                                     (parallel)
                 │                       ↑
                 └─ E reads A's getLeaderboard shape (no API break)
                 D ⚠ run db:seed against prod before push (CLAUDE.md)

Wave 3:  P3 ──── P4
```

**Sequencing rules:**
- Wave 1 lands first.
- Wave 2 tracks merge in any order; integrator runs `npx svelte-check` and `npx vitest run` after each merge.
- Track D's prod-seed step happens **immediately before** `git push origin main` of the commit that contains it, per CLAUDE.md.
- Wave 3 starts only after Wave 2 is fully merged (so type signatures are stable).

---

## Per-track verification checklist (integrator runs after each merge)

```bash
npx svelte-kit sync
npx svelte-check 2>&1 | tail -20      # error count should monotonically decrease
npx vitest run                        # must stay 110+ passing

# Spot-check the affected surface:
npm run dev    # then hit the route the track touched
```

For Track D specifically, follow CLAUDE.md's "Prisma schema + seed sync" section verbatim — even though there is no schema change, the seed change qualifies.

---

## Out of scope (intentionally not in this plan)

- Security findings — user excluded these from the audit.
- Refactors / abstractions beyond the minimum each fix requires.
- A `User.timezone` column (Track H uses a constant; column addition is a follow-up).
- A friend-graph join table (Track A #15 uses a defensive workaround; proper graph is a follow-up).
- Replacing the curated `artistProfiles.ts` static module with DB-backed records (Track C derives tier dynamically but keeps the file).
