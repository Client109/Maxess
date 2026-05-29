# Week 9 Lab — Game Plan

**Date**: Week of May 26, 2026
**Version**: 0.2.0 → target 0.3.0 by end of week
**Status**: Frontend complete (mock data), backend schema defined but not connected, not deployed
**Goal**: Wire up Prisma/PostgreSQL, deploy to Vercel, add tests, lock demo flow

> Week 10 is the final presentation. Everything must be demo-stable by end of Week 9.

---

## Current State Summary

| Area | Status | Details |
|------|--------|---------|
| **5 screens (UI)** | Done | Home, Events, Score, Access, Profile — all functional |
| **Components** | Done | ScoreHeroCard, ProgressCard, HotListSection, UpcomingEvents, LeaderboardCard, BottomNav |
| **Domain logic** | Done | XP tiers, hot list XP calc, event matching |
| **Mock data** | Done | Hardcoded in `mockData.ts` and `mockMusicKit.ts` |
| **Prisma schema** | Defined | 10 models, enums, relations — not deployed to a database |
| **Server functions** | Written | `src/lib/server/database.ts` — all CRUD, not connected to UI |
| **Deployment** | Not started | No public URL exists |
| **Tests** | Not started | vitest installed, zero test files |
| **Apple Music** | Mock only | Simulated auth, no real API calls |

### Critical Path for Week 9

```
1. Stand up PostgreSQL + seed data          (Ethan)
2. Create SvelteKit API routes              (Ethan + Luke)
3. Swap mock imports for fetch calls        (Luke)
4. Deploy to Vercel                         (Kayah)
5. Write unit + E2E tests                   (Justin)
6. Polish responsive + demo flow            (Kyle)
```

---

## Task Breakdown by Role

### Kayah Whipps — Technical Lead / Architecture

**Primary goal**: Get the app deployed and ensure all integration points connect cleanly.

| # | Task | Priority | Details |
|---|------|----------|---------|
| K1 | **Set up Vercel project** | CRITICAL | Create Vercel project, connect to GitHub repo, configure build settings. Switch adapter from `adapter-static` to `adapter-auto` or `adapter-vercel` so server routes work. |
| K2 | **Provision PostgreSQL** | CRITICAL | Set up a hosted Postgres instance (Vercel Postgres, Supabase, or Neon). Get the `DATABASE_URL` connection string. Add to Vercel env vars and local `.env`. |
| K3 | **Run Prisma migrations on hosted DB** | CRITICAL | Run `npx prisma db push` or `npx prisma migrate deploy` against the hosted database to create all tables. Verify with `npx prisma studio`. |
| K4 | **Verify deployment pipeline** | HIGH | Push to main, confirm Vercel builds and deploys. Fix any build errors (likely: server imports in client code, missing env vars). |
| K5 | **Scope control** | MEDIUM | Review all PRs/changes this week. Make sure nobody introduces new features — this is a stabilization week. No new screens, no new integrations. |
| K6 | **Write technical tradeoff notes** | MEDIUM | Document architecture decisions for final presentation: why SvelteKit, why Prisma, why static → server migration, what would change with real APIs. |

**Deliverables**: Live Vercel URL, working database, deployment docs.

**Blockers**: None — can start immediately.

---

### Kyle Rumble — Design / Creative

**Primary goal**: Lock the visual polish, ensure desktop responsiveness, prepare demo storyboard.

| # | Task | Priority | Details |
|---|------|----------|---------|
| D1 | **Desktop responsive pass** | HIGH | The app is mobile-first. Add max-width constraint (e.g., 430px centered) or a proper desktop layout for the demo. Currently cards stretch to full width on desktop — looks wrong on a projector. |
| D2 | **Demo storyboard** | HIGH | Script the exact click path for the Week 10 presentation: Home → scroll → Events → search → Score → filter leaderboard → Access → Profile → Apple Music connect → back to Home. Write it down step-by-step with what the presenter says at each screen. |
| D3 | **Screenshot portfolio** | HIGH | Take clean screenshots of all 5 screens (mobile viewport, ~390px wide) for the final slide deck. Include before/after Apple Music connection. |
| D4 | **Visual QA sweep** | MEDIUM | Check every screen for: inconsistent spacing, color mismatches, truncated text, missing hover/active states, broken icons. File issues or fix directly in CSS. |
| D5 | **Loading / empty states** | MEDIUM | When the app switches from mock to real data, there will be loading delays. Ensure skeleton states or spinners exist on every screen. Check what happens if data is empty (0 events, 0 friends, etc.). |
| D6 | **Presentation slide template** | LOW | Create or pick a slide template for the Week 10 presentation. Match the Maxxes brand colors (#FF5C00 orange, dark backgrounds). |

**Deliverables**: Responsive desktop layout, demo script, screenshots, polished UI.

**Blockers**: D5 depends on backend data being connected (coordinate with Ethan/Luke).

---

### Luke Pollard — Frontend Developer

**Primary goal**: Replace all mock data imports with real API calls. Wire the frontend to the backend.

| # | Task | Priority | Details |
|---|------|----------|---------|
| F1 | **Create SvelteKit server load functions** | CRITICAL | For each route, create `+page.server.ts` files that call the database functions from `src/lib/server/database.ts`. Return data as props instead of importing from `mockData.ts`. |
| F2 | **Home page (`/`) data wiring** | CRITICAL | Load fan profile, upcoming events, leaderboard preview from DB. Keep Apple Music / Hot List as client-side store (it's a third-party integration, not DB data). |
| F3 | **Events page (`/events`) data wiring** | CRITICAL | Load events from DB via server function. Search and filter can stay client-side (filter the loaded array). "For you" matching stays client-side (depends on Apple Music store). |
| F4 | **Score page (`/score`) data wiring** | CRITICAL | Load leaderboard entries and challenges from DB. Wire dropdown filters to re-fetch or client-filter. Friends activity can stay mock for now (no social graph in DB). |
| F5 | **Access + Profile pages** | HIGH | Load passes and user profile from DB. Profile XP breakdown comes from DB user record. Recent activity from DB. |
| F6 | **Handle loading states** | HIGH | Add `{#if data}...{:else}Loading...{/if}` patterns in each page. The switch from sync mock imports to async DB loads will break pages without this. |
| F7 | **Remove mock data imports** | MEDIUM | Once all pages use server-loaded data, delete or gate the `mockData.ts` imports. Keep `mockMusicKit.ts` (Apple Music stays mocked). |
| F8 | **Fix `adapter-static` → `adapter-auto`** | CRITICAL | Server load functions won't work with `adapter-static`. Update `svelte.config.js` to use `adapter-auto` (Vercel) or `adapter-node`. Remove `prerender = true` from `+layout.ts` or make it per-route. |

**Deliverables**: All 5 screens reading from PostgreSQL, no hardcoded mock data in main flow.

**Blockers**: Needs K2 (database provisioned) and K3 (schema deployed) before data flows. Can start F1/F8 immediately.

**Implementation notes for F1**:
```
src/routes/+page.server.ts         → getUserByFanId(), getUpcomingEvents(), getLeaderboard()
src/routes/events/+page.server.ts  → getUpcomingEvents() (all), searchEvents()
src/routes/score/+page.server.ts   → getLeaderboard(), getUserChallenges()
src/routes/access/+page.server.ts  → passes query (need to add to database.ts)
src/routes/profile/+page.server.ts → getUserByFanId(), recent activity query
```

---

### Ethan King — Backend / Data Logic

**Primary goal**: Seed the database with realistic demo data and ensure all server functions work.

| # | Task | Priority | Details |
|---|------|----------|---------|
| B1 | **Expand seed data** | CRITICAL | Current `prisma/seed.ts` has minimal data. Expand to match MVP acceptance criteria: 25+ leaderboard entries, 10+ events (mix of music/sports), 5+ challenges, 5+ passes, 10+ friend activities, 20+ recent activities. Data must look realistic for a live demo. |
| B2 | **Test all database functions** | CRITICAL | Run each function in `src/lib/server/database.ts` against the seeded database manually or with a script. Fix any Prisma query errors (e.g., missing `include`, wrong field names, enum mismatches). |
| B3 | **Add missing database functions** | HIGH | `database.ts` is missing functions for: passes (get user passes by status), recent activity (get user activity feed), friend activity. Add these. |
| B4 | **Wire XP transaction flow** | HIGH | When a user completes a challenge or earns XP, the `addXpTransaction()` function should update the user's total XP and recalculate their tier. Verify this works end-to-end. |
| B5 | **Leaderboard seeding** | HIGH | Seed leaderboard entries with realistic scores, multiple cities, weekly/monthly/all-time periods. Make sure "Alex Chen" (the demo user) appears at rank #18 with 8,750 XP to match the current UI. |
| B6 | **Event bookmark toggle** | MEDIUM | Verify `toggleEventBookmark()` works. This is an interactive feature the frontend needs for the "Notify me" and bookmark buttons on Events page. |
| B7 | **Document data contracts** | MEDIUM | Write a brief doc (or update this file) listing every API endpoint, what it returns, and what params it takes. Luke needs this to wire the frontend. |

**Deliverables**: Seeded database with demo-quality data, all CRUD functions tested and working.

**Blockers**: Needs K2 (database provisioned) before B2 can run against real DB. Can start B1 and B3 immediately (code changes, no DB needed).

**Seed data targets**:
```
Users:          1 primary (Alex Chen) + 25 leaderboard entries
Events:         10-12 (6 music, 4 sports, 2 this week)
Challenges:     5 with varying progress (2 complete, 3 in-progress)
Passes:         5 (2 active, 1 upcoming, 1 waiting, 1 expired)
FriendActivity: 10+ with realistic names and score changes
RecentActivity: 15+ spanning last 7 days
LeaderboardEntry: 25+ across 3 periods and 4+ cities
XpTransaction:  20+ showing history of XP gains
```

---

### Justin Hurst — QA / Documentation

**Primary goal**: Write tests, run QA, maintain the evidence trail for final submission.

| # | Task | Priority | Details |
|---|------|----------|---------|
| Q1 | **Unit tests for XP/tier logic** | HIGH | Write vitest tests for `src/lib/domain/xp.ts`: `classifyTier()` at all boundaries (0, 999, 1000, 4999, 5000, etc.), `xpToNextTier()`, `tierProgress()`. |
| Q2 | **Unit tests for hot list XP** | HIGH | Write vitest tests for `src/lib/domain/hotlist.ts`: `calculateArtistXP()` with various play counts, bonus tier thresholds, `totalHotListXP()`. |
| Q3 | **Integration test: data loading** | HIGH | Once backend is connected, write tests that verify each page loads without errors. Can use vitest with mock Prisma or just test the domain logic layer. |
| Q4 | **Manual QA checklist** | HIGH | Create a checklist testing every interactive element across all 5 screens. Run through it on Chrome and Safari. Document pass/fail with screenshots. |
| Q5 | **Acceptance criteria audit** | CRITICAL | Go through every item in the MVP Build Requirements (Section 07) acceptance criteria. Mark each as pass/fail/partial. This is what the graders will check. |
| Q6 | **Contribution evidence** | MEDIUM | Compile git log by author, screenshots of working features, and a revision history doc. Each team member needs evidence of their contributions. |
| Q7 | **Final documentation** | MEDIUM | Update README.md with final deployment URL, setup instructions, and architecture overview. Clean up any stale docs. |

**Deliverables**: Test suite (aim for 15+ passing tests), QA checklist with results, acceptance criteria audit.

**Blockers**: Q3 depends on backend being connected. Q1 and Q2 can start immediately.

**Test file locations**:
```
src/lib/domain/xp.test.ts          → tier classification, XP calculations
src/lib/domain/hotlist.test.ts      → artist XP, bonus tiers, matching
src/lib/navigation.test.js          → already exists (update if routes changed)
```

---

## Shared / Coordination Tasks

| Task | Owner | When | Details |
|------|-------|------|---------|
| **Daily standups (async)** | All | Start of each work session | Post in group chat: what you did, what you're doing, what's blocking you. |
| **Branch strategy** | Kayah | Day 1 | Decide: feature branches + PRs, or everyone on main? With 5 people and 1 week, short-lived branches with fast merges is safest. |
| **Demo dry run** | All | End of Week 9 | Full run-through of the demo flow on the live Vercel URL. Record it. Fix anything that breaks. |
| **.env coordination** | Kayah + Ethan | Day 1 | Share `DATABASE_URL` securely. Everyone needs it in local `.env` for dev. |

---

## Open Questions (Need Answers This Week)

### Architecture / Backend

1. **Which hosted Postgres provider?**
   Neon (free tier, serverless) vs Supabase (free tier, dashboard) vs Vercel Postgres (tight integration but costs). Need to decide Day 1.

2. **How does the Prisma client work on Vercel?**
   Vercel serverless functions have cold starts. Prisma needs `prisma generate` in the build step. The `prisma.config.ts` file in the repo root suggests this was started — is it configured correctly?

3. **What happens to Apple Music integration in the live app?**
   Currently mocked client-side. Does it stay mocked for the demo? Or do we need it to look "real" (i.e., simulated auth flow that hits a server route)?

4. **Fan ID for the demo user?**
   The server functions take a `fanId` parameter. What's the primary key for "Alex Chen" in the database? Need a hardcoded user ID or a simple auth stub that always returns the demo user.

### Data / Demo

5. **What fan profile do we demo?**
   Currently "Alex Chen" with 8,750 XP, Gold tier, rank #18, 12-day streak. Is this locked, or should the demo show a different starting state?

6. **Should any actions be "live" in the demo?**
   e.g., clicking "Complete" on a challenge → XP increases → tier progress updates → leaderboard re-ranks. This requires write operations (POST endpoints). Is that in scope for Week 9, or is read-only from DB sufficient?

7. **Are the 4 events enough?**
   Currently only 4 events in mock data. The Events page looks sparse. Ethan needs to seed at least 10-12 for the demo to look credible.

### Presentation / Grading

8. **What format is the Week 10 presentation?**
   Live demo + slides? Just slides with screenshots? How long? This affects how much polish Kyle needs to do.

9. **Does each team member present their own section?**
   Or does one person drive the demo while others present slides? Affects demo storyboard.

10. **Is there a written deliverable alongside the presentation?**
    Final report, code submission, documentation package? Justin needs to know what to prepare.

### Deployment

11. **Custom domain or Vercel subdomain?**
    `maxxes.vercel.app` is fine for a class demo, but if the team wants `maxxes.app` or similar, that needs to happen early in the week.

12. **Environment variables on Vercel?**
    `DATABASE_URL` is the critical one. Any others? The `.env` file in the repo root should NOT be committed — verify `.gitignore` covers it.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Prisma cold starts cause slow page loads on Vercel | Medium | Medium | Use Neon serverless driver adapter, or add loading spinners to mask delay |
| Database connection fails in production | Medium | Critical | Test deploy early (Day 1). Have fallback plan to revert to mock data if DB integration isn't stable by Thursday. |
| Merge conflicts from 5 people editing simultaneously | High | Medium | Use feature branches. Luke owns all `+page.svelte` files. Ethan owns `database.ts` and `seed.ts`. Minimize overlap. |
| Demo breaks during presentation | Medium | Critical | Record a backup video of the demo flow. Practice on the actual Vercel URL, not localhost. |
| Not enough time to complete everything | Medium | High | Prioritize: deploy > data wiring > tests > polish. A deployed app with mock data is better than an undeployed app with a perfect backend. |

---

## Fallback Plan

If the Prisma/PostgreSQL integration proves too complex to stabilize in one week:

1. **Keep `adapter-static`** and mock data
2. **Deploy the static build to Vercel** (this works today and takes 10 minutes)
3. **Show the database schema and server functions as "designed but not connected"** in the presentation
4. **Frame it as**: "Frontend complete, backend architected, integration planned for next phase"

This is a valid demo outcome. Don't let the perfect be the enemy of the good.

---

## Acceptance Criteria Checklist (from MVP Build Requirements)

### Must-Pass for Week 10

- [ ] App is live at a public URL
- [ ] All 5 screens load and are navigable
- [ ] Superfan Score displays with correct tier and XP
- [ ] Events page has working search and filter
- [ ] Leaderboard shows ranked entries with filters
- [ ] Challenges show progress
- [ ] Access page shows passes and tier perks
- [ ] Profile shows user stats and settings
- [ ] Bottom navigation works across all screens
- [ ] App is responsive at mobile and desktop widths
- [ ] Data is loaded from a data source (DB or JSON), not hardcoded in components
- [ ] Interactive elements respond to user input (bookmarks, filters, toggles)
- [ ] Each team member can demonstrate their contribution

### Nice-to-Have

- [ ] Apple Music mock integration demo
- [ ] Hot List XP earning flow
- [ ] Unit tests passing in CI
- [ ] Score animation on home page
- [ ] "Notify me" toggle persists
