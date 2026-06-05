# AGENTS.md — repo-level agent instructions for Maxxes

> Symlinked from `CLAUDE.md` so Claude Code reads the same file.

## Prisma schema + seed sync — MUST happen before commit/push

Several past production outages were caused by deploying code that referenced
a Prisma schema change or new seed data without applying them to the
production Neon branch first. Examples:

- A column added to `User` (e.g. `last_streak_at`, `selected_fandom_id`) made
  every `db.user.findUnique()` 500 on prod until `prisma db push` ran against
  Neon.
- A new model (`FanTier`, `Reward`, `ListeningEvent`) shipped in code but the
  table didn't exist in prod, so every page that touched it 500'd.
- A schema push succeeded against prod but the seed wasn't re-run, so the new
  tables existed but were empty — pages returned 200 but rendered "unable to
  load" empty states (e.g. `/access` showed `fandoms: []`, `selected: null`).

**Whenever you run `/feature`, `/bug`, or `/checkpoint`, before staging
files for the commit you MUST:**

1. **Detect changes that need DB-side action:**
   - Schema: `git diff HEAD -- prisma/schema.prisma`
   - Seed: `git diff HEAD -- prisma/seed.ts src/lib/data/seedFandoms.ts`
     (and any other file the seed reads from)
   - If both diffs are empty, skip the rest of this section.

2. **Apply locally first** so you know everything is valid:
   ```bash
   npx prisma generate
   npx prisma db push   # local Prisma dev DB — only if schema changed
   npm run db:seed      # only if seed data changed (or schema added new tables that need data)
   ```

3. **Apply to production Neon BEFORE `git push`:**
   ```bash
   vercel env pull .env.production --environment production --yes

   # Only if schema changed:
   set -a && source .env.production && set +a && npx prisma db push

   # If seed changed OR a schema change added a new table the UI reads from:
   set -a && source .env.production && set +a && npm run db:seed
   ```
   Both steps must happen *before* `git push origin` so the new deploy doesn't
   go live against a stale prod DB. Schema push without seed is just as broken
   as seed without schema push — the UI 500s or renders empty states either
   way.

4. **Verify** after the deploy completes:
   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" https://maxess-test.vercel.app/
   curl -s https://maxess-test.vercel.app/access/__data.json | head -c 200
   ```
   A 200 means the schema sync succeeded. Spot-check the JSON payload of at
   least one route that reads from the new/changed tables to confirm the seed
   landed (look for non-empty arrays / non-null IDs where you expect data).

If you skip step 3, prod will either 500 on every page that runs the affected
query (missing schema) or render empty/"unable to load" states (missing
data). The build will succeed — Prisma client generation doesn't validate
against the live DB, and SvelteKit's build doesn't know what the seed
contains. Only runtime fails.

### Why not just put `prisma db push` in the build command?

We considered it. It's risky:

- A bad migration kills prod silently during a deploy.
- The build runs in Vercel's serverless env, which has no direct access to
  the unpooled Neon URL needed for some migration ops.
- Vercel's Hobby tier doesn't let the build write to the DB during cold
  starts cleanly.

Doing it manually from the developer's machine keeps the deploy reversible
and the migration auditable. This file is the reminder.

## Other repo rules

- Never commit unrelated WIP from the working tree — stage feature files by
  name. See past commits like `Add Apple Wallet attendance verification` and
  `Redesign /access dark + per-fandom tier + rewards catalog` for the
  pattern.
- Always reach for `vercel logs --since 5m --expand` when a deploy reports
  green but the user reports 500 — the build can pass while runtime fails.
- Use `maxess-test.vercel.app` (the alias) for verification, not per-deploy
  URLs (`*-client109s-projects.vercel.app`) — those are frozen to a single
  deploy ID.
