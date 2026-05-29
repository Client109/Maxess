# MAXXES — Rank & Rewards Merged Screen Specification

## Overview

This document specifies the unified screen created by merging the original Score screen and Access screen into a single destination. The merged screen replaces two bottom-navigation tabs with one, reducing the app from five tabs to four.

**Bottom navigation (4 tabs):** Home | Events | Rank & Rewards | Profile

---

## Screen Name

**Rank & Rewards**

Alternate candidates considered: "My Status," "Earned." Rank & Rewards was selected because it directly communicates both halves of the screen — your competitive position (Rank) and what that position unlocks (Rewards). It avoids ambiguity ("My Status" could mean account settings) and passivity ("Earned" implies past tense rather than an active loop).

---

## Tab Icon

The bottom-nav icon for this screen should communicate both ranking and access. Recommended: a **trophy with a small star or key inset** — the trophy signals competitive achievement, the star/key signals unlocked perks.

Fallback options: crown, shield with star, or medal with keyhole.

The icon uses the standard color rules:
- **Gray** when the tab is inactive
- **Orange (#FF6B00)** when the tab is active/selected

---

## Internal Structure

The screen is organized as a **two-section toggle** at the top of the scroll view.

```
┌─────────────────────────────────┐
│  [ My Rank ]  [ My Rewards ]    │  ← toggle bar, sticky below status bar
├─────────────────────────────────┤
│                                 │
│  (scrollable content for the    │
│   active section)               │
│                                 │
└─────────────────────────────────┘
```

### Toggle Behavior

- Two pill-shaped buttons side by side, full width, inside a rounded container.
- Active pill: solid orange background, white text, bold.
- Inactive pill: transparent background, gray text, regular weight.
- Tapping the inactive pill switches sections with a horizontal crossfade (150ms ease-in-out). No full page reload — content swaps within the same scroll container.
- Scroll position resets to top on section switch.
- The toggle bar is **sticky** — it remains pinned below the status bar/header while the section content scrolls beneath it.
- Haptic: light tap on toggle switch.

---

## Section 1 — My Rank

Everything in this section relates to the user's competitive standing: their score, how they compare to others, social proof, and the challenges that drive score and unlock rewards.

### RR-01 — Superfan Score Summary

**What the user sees:**
A prominent score display at the top of the My Rank section.

| Element | Detail |
|---------|--------|
| Score number | Large, bold, centered (e.g., "4,280") |
| Tier badge | "Elite" / "Superfan" / "Loyal" / "Fan" badge to the right of the score, using tier color |
| Weekly delta | Below the score: "+120 this week" in green if positive, red if negative, gray if zero |
| City rank | "Rank #12 in Austin" — plain text below the delta |
| Percentile | "Top 3% of all fans" — smaller text below rank |

**Color mapping:**
- Elite badge: purple background, white text
- Superfan badge: orange background, white text
- Loyal badge: blue background, white text
- Fan badge: gray background, white text

**Data requirements:**
- `user_score` (integer)
- `user_tier` (enum: fan | loyal | superfan | elite)
- `weekly_delta` (signed integer)
- `city_name` (string)
- `city_rank` (integer)
- `percentile` (float, displayed as integer)

**Interaction:** Tapping the score summary opens a detail modal showing score history over time (line chart, last 30 days). No other tap targets within this component.

---

### RR-02 — Community Leaderboard

**What the user sees:**
A vertical list of ranked users, 5–10 visible at a time, scrollable within the section.

| Element | Detail |
|---------|--------|
| Header row | "Leaderboard" title + filter chips |
| Filter chips | City / This Week / All Time — horizontal chip rail, single-select |
| Friend filter toggle | Small toggle icon (people icon) in the top-right corner of the header; when active, leaderboard shows only friends |
| Each row | Rank number, avatar, display name, score, tier badge |
| Your row | Highlighted with orange left border and light orange background; always visible even if it means jumping the list |

**Interaction:**
- Tapping a filter chip reloads the leaderboard with that filter applied. Active chip: orange fill, white text. Inactive chips: outlined, gray text.
- Tapping the friend toggle filters to friends only (toggle fills orange). Tapping again returns to all users.
- Tapping another user's row opens a mini-profile bottom sheet showing their score, tier, shared events, and an "Add Friend" or "Challenge" button.
- The user's own row is not tappable (already on their own screen).
- Pull-to-refresh reloads leaderboard data.

**Data requirements:**
- `leaderboard_entries[]` — each with: `user_id`, `display_name`, `avatar_url`, `score`, `tier`, `rank`
- `filter_type` (enum: city | this_week | all_time)
- `friends_only` (boolean)
- `current_user_rank` (integer, for the active filter)

**Behavioral response:**
- Filter change: 200ms fade transition on list content. Loading spinner if API latency > 300ms.
- Friend toggle: immediate client-side filter if friend list is cached, otherwise API call with spinner.

---

### RR-03 — Friends Activity Scroll

**What the user sees:**
A horizontal scrolling row of circular avatar cards, each with a short activity label beneath. Positioned below the leaderboard.

**Activity types displayed:**
- "Passed you!" — a friend whose score just exceeded yours
- "Completed [Challenge Name]" — a friend who finished a challenge
- "[N] pts behind you" — a friend closing in on your score

Each card:
```
┌──────────┐
│  (avatar) │
│  Alex M.  │
│ Passed you│
│   +45 pts │
└──────────┘
```

**Interaction:**
- Horizontal swipe to browse. Swipe inertia with snap-to-card behavior.
- Tapping a card opens the same mini-profile bottom sheet as the leaderboard row tap.
- If no friend activity exists, show a single card: "Invite friends to compete" with an orange CTA.

**Data requirements:**
- `friend_activities[]` — each with: `friend_id`, `avatar_url`, `display_name`, `activity_type` (enum: passed_you | completed_challenge | pts_behind), `detail_text`, `timestamp`

**Temporal component:** This row refreshes on screen load and on pull-to-refresh. Activity items expire after 7 days.

---

### RR-04 — Challenges Unlocking Rewards

**What the user sees:**
A vertical stack of challenge cards. Each card represents a specific task or set of tasks that, when completed, unlocks a reward in the My Rewards section.

Each challenge card:
```
┌─────────────────────────────────────┐
│ [Reward Image]  Reward Name         │
│                 ─────────────────── │
│                 ☐ Task 1 description│
│                 ☑ Task 2 description│
│                 ☐ Task 3 description│
│                 ▓▓▓▓▓▓▓░░░ 320/500 pts │
│                 [LIMITED]           │
└─────────────────────────────────────┘
```

| Element | Detail |
|---------|--------|
| Reward image | Thumbnail of the reward being unlocked (left side, square, rounded corners) |
| Reward name | Bold text, right of image |
| Task checklist | Each task with checkbox; completed tasks have green checkmark, incomplete have gray empty box |
| Progress bar | Below tasks, fills orange proportional to points earned vs points required (e.g., "320 / 500 pts"). Full bar turns green when points earned reaches the required total. |
| LIMITED badge | Red/orange pill badge, only shown on time-limited challenges |

**Interaction:**
- Tapping a task row that represents an in-app action (e.g., "Share an event," "RSVP to 3 events") navigates the user to the relevant screen to complete it.
- Tapping a task row that represents a passive milestone (e.g., "Attend 5 events") does nothing — these are tracked automatically.
- Tapping the reward image opens a reward detail modal showing the full reward description, terms, and expiry.
- When a task is completed elsewhere in the app, this card updates in real-time (if the screen is visible) or on next screen load.

**State transitions (critical UX):**
1. **In progress (points earned < points required):** Progress bar is orange, label shows "320 / 500 pts." Reward image has a slight gray overlay with a small lock icon.
2. **Just completed (points earned = points required):** Progress bar turns green, label updates to "500 / 500 pts," a confetti/sparkle micro-animation plays (300ms), the lock icon on the reward image fades out, and a toast appears: "Reward unlocked! Check My Rewards." Haptic: success confirmation (medium).
3. **After completion:** Card remains visible with "Completed" green badge replacing the progress bar. Card moves to bottom of the stack on next load.

**Cross-screen effect — the core cause-and-effect link:**
When a challenge reaches 100%, the system must:
1. Update the challenge card in My Rank (green state, as above).
2. Activate the corresponding reward card in My Rewards (see RR-06, RR-07 below).
3. Fire a local notification if the user is not currently on this screen.

**Data requirements:**
- `challenges[]` — each with: `challenge_id`, `reward_id` (foreign key to rewards), `reward_name`, `reward_image_url`, `tasks[]` (each with `task_id`, `description`, `is_completed`, `action_route` or null), `points_earned` (integer), `points_required` (integer), `is_limited`, `expiry_timestamp` (nullable)

---

## Section 2 — My Rewards

Everything in this section relates to what the user has earned or can claim. This is the **effect** side of the cause-and-effect loop — challenges completed in My Rank surface unlocked rewards here.

### RR-05 — Elite / Diamond Access Summary Bar

**What the user sees:**
A compact horizontal bar at the top of the My Rewards section summarizing the user's active reward status at a glance.

```
┌──────────────────────────────────────────┐
│  🎫 3 Active   ⏰ 1 Expiring Soon   👑 Elite │
└──────────────────────────────────────────┘
```

| Element | Detail |
|---------|--------|
| Active count | Number of currently active/claimable rewards |
| Expiring soon | Number of rewards expiring within 48 hours; pulses orange if > 0 |
| Tier label | User's current tier with tier-colored badge |

**Interaction:**
- Tapping "Expiring Soon" scrolls the page down to the first expiring reward card and briefly highlights it with an orange border pulse.
- Tapping the tier badge opens a tier detail bottom sheet explaining tier benefits and progress to next tier.

**Color:**
- Bar background: dark surface (#1A1A2E or similar dark card color)
- Active count: white text
- Expiring soon: orange text, pulsing if count > 0
- Tier badge: uses tier color (purple for Elite, orange for Superfan, etc.)

**Data requirements:**
- `active_rewards_count` (integer)
- `expiring_soon_count` (integer, rewards expiring within 48h)
- `user_tier` (enum)

---

### RR-06 — Featured Access Cards

**What the user sees:**
A vertical stack of large, visually rich cards showcasing the most valuable or time-sensitive rewards. These are the hero items of My Rewards.

Each card variant:

**TOP PICK variant:**
```
┌─────────────────────────────────┐
│  [Large reward image]           │
│  TOP PICK                       │
│  VIP Backstage Pass — Beyoncé   │
│  NRG Stadium · June 14          │
│  [Claim Now]                    │
└─────────────────────────────────┘
```

**LIMITED variant:**
```
┌─────────────────────────────────┐
│  [Large reward image]           │
│  LIMITED · Ends in 2d 14h       │
│  Early Entry — Lakers vs Mavs   │
│  Crypto.com Arena · June 20     │
│  [Claim Before Expiry]          │
└─────────────────────────────────┘
```

| Element | Detail |
|---------|--------|
| Reward image | Full-width card image, event/artist photo with gradient overlay at bottom |
| Badge | "TOP PICK" (orange pill) or "LIMITED" (red pill with countdown) |
| Countdown | For LIMITED cards: live countdown (days, hours). Updates every minute. |
| Reward title | Bold, white text over gradient |
| Venue + date | Smaller gray text |
| CTA button | Primary action button at card bottom |

**CTA button states:**
- **Locked (challenge incomplete):** Gray background, white text "Complete Challenge," non-tappable. Displayed when the linked challenge's points earned has not yet reached points required.
- **Claimable (challenge complete):** Orange background, white text "Claim Now" or "Claim Before Expiry." Tappable. This is the **visual activation** moment.
- **Claimed:** Green background, white text "Claimed ✓." Non-tappable. Card subtly dims.
- **Expired:** Dark gray background, strikethrough text "Expired." Card moves to bottom of stack.

**Interaction:**
- Tapping "Claim Now" opens a claim confirmation bottom sheet with reward details, terms, and a final "Confirm Claim" button.
- After confirming: haptic success (medium), CTA transitions to green "Claimed ✓," a brief check-mark animation plays, and the reward is added to the user's passes list (RR-07).
- Tapping the card image opens a full-screen reward detail view.
- Tapping "Complete Challenge" (locked state) switches to the My Rank tab and scrolls to the relevant challenge card.

**Visual activation behavior (the cause-and-effect moment):**
When a challenge's points earned reaches points required while the user is viewing My Rewards:
1. The corresponding featured card's CTA animates from gray to orange (400ms color transition).
2. The lock icon on the card fades out.
3. The badge shifts from showing a lock state to showing "TOP PICK" or "LIMITED."
4. A subtle golden glow border pulses once around the card.
5. Haptic: light notification tap.

**Data requirements:**
- `featured_rewards[]` — each with: `reward_id`, `challenge_id` (foreign key), `reward_type` (enum: top_pick | limited), `title`, `image_url`, `venue_name`, `event_date`, `expiry_timestamp` (nullable), `status` (enum: locked | claimable | claimed | expired), `claim_timestamp` (nullable)

---

### RR-07 — Your Passes List

**What the user sees:**
A compact vertical list of rewards the user has already claimed. Each row is a pass card.

Pass types and their badges:
- **Early Entry** — green "Active" badge
- **Artist Presale** — orange "Ready" badge (presale window hasn't opened yet) or green "Active" badge
- **VIP Package** — purple "Elite" badge

Each row:
```
┌─────────────────────────────────────┐
│ 🎫  Early Entry — Astros vs Yankees │
│     Minute Maid Park · June 10      │
│     [Active]           [View Pass]  │
└─────────────────────────────────────┘
```

**Status badges:**
- **Active** (green): pass is currently usable
- **Ready** (orange): pass is claimed but the access window hasn't opened
- **Used** (gray): pass was scanned/redeemed at the event
- **Expired** (dark gray, strikethrough): access window passed without use

**Interaction:**
- Tapping "View Pass" opens a full-screen pass detail with QR code, barcode, event details, and Apple Wallet / Google Wallet add button.
- Tapping the row (outside the button) expands an inline detail showing terms, valid time window, and any restrictions.
- Long press on a row opens a share sheet to send the pass to a friend (if the reward is transferable).

**Data requirements:**
- `user_passes[]` — each with: `pass_id`, `reward_id`, `pass_type` (enum: early_entry | artist_presale | vip_package), `event_name`, `venue_name`, `event_date`, `status` (enum: active | ready | used | expired), `qr_code_url`, `barcode_data`, `is_transferable`, `valid_from`, `valid_until`

---

### RR-08 — Perks by Tier Carousel

**What the user sees:**
A horizontal carousel of tier cards showing what each fan tier unlocks. The user's current tier card is highlighted and centered on load.

Tier cards (left to right): Fan → Loyal → Superfan → Elite

Each card:
```
┌──────────────────┐
│   ★ Superfan     │
│                  │
│  • Priority tix  │
│  • Presale codes │
│  • 2x score mult │
│  • Merch drops   │
│                  │
│  [Your Tier]     │  ← only on current tier
└──────────────────┘
```

**Color mapping:**
- Fan: gray card, white text
- Loyal: dark blue card, white text
- Superfan: orange card, white text
- Elite: purple card with subtle shimmer, white text

**Interaction:**
- Horizontal swipe with snap-to-card. Cards have slight parallax depth — active card is larger, adjacent cards are slightly scaled down (0.9x) and dimmed.
- Tapping a tier card that is above the user's current tier opens a bottom sheet: "You need [X] more points to reach [Tier]. Here's how:" followed by a list of quick challenges.
- Tapping the current tier card does nothing (already there).
- Tapping a tier card below the user's current tier shows a brief "You've already unlocked this tier" toast.

**Data requirements:**
- `tiers[]` — each with: `tier_name`, `tier_level` (integer for ordering), `perks[]` (list of strings), `points_required`
- `user_current_tier` (enum)
- `user_score` (integer, for calculating distance to next tier)

---

### RR-09 — Unlock Next Progress Item

**What the user sees:**
A single motivational card at the bottom of My Rewards showing the nearest upcoming reward the user can unlock and how close they are.

```
┌─────────────────────────────────────┐
│  🔓 Next Unlock                     │
│  Artist Meet & Greet — Drake        │
│  ▓▓▓▓▓▓▓▓░░ 400/500 pts            │
│  Complete 1 more challenge          │
│  [Go to Challenges →]              │
└─────────────────────────────────────┘
```

**Interaction:**
- Tapping "Go to Challenges" switches to the My Rank tab and scrolls to the most relevant incomplete challenge.
- If no upcoming rewards exist, this card shows: "You've claimed all available rewards. New rewards drop every week." with no CTA.

**Data requirements:**
- `next_unlock_reward` — nullable object with: `reward_name`, `reward_image_url`, `points_earned` (integer), `points_required` (integer), `remaining_description`, `linked_challenge_id`

---

## Cross-Section Cause-and-Effect Behavior

This is the defining UX principle of the merged screen. The two sections must not feel like two separate pages glued together — they must feel like **cause** (My Rank) and **effect** (My Rewards) on the same surface.

### State Synchronization Rules

| Event | My Rank Effect | My Rewards Effect |
|-------|---------------|-------------------|
| User completes a challenge task | Challenge card progress bar and point count update, task checkbox turns green | No immediate change (reward stays locked until points earned reaches points required) |
| Points earned reaches points required | Card turns green, confetti animation, toast "Reward unlocked!" | Corresponding featured card CTA animates from gray→orange, lock icon fades, golden glow pulse |
| User claims a reward | No change to challenge card | CTA turns green "Claimed ✓," pass appears in Your Passes list |
| Reward expires unclaimed | Challenge card shows "Completed" but adds amber "Reward expired" note | Card moves to bottom, status = expired |
| User's score changes tier | Score summary updates tier badge | Summary bar updates tier label, perks carousel re-centers on new tier |

### Real-Time Update Requirements

- If the user is viewing My Rewards and a background event completes their last challenge task, the reward card must activate **without requiring a manual refresh or tab switch**.
- Implementation: use a reactive state manager (e.g., Zustand, Redux, or a shared observable). Challenge completion events should dispatch a global action that both sections subscribe to.
- If real-time push isn't feasible for MVP, poll on 30-second intervals while this screen is active, and always refresh both sections on tab switch.

---

## Color System Reference

| State | Color | Hex |
|-------|-------|-----|
| Active / earned / CTA | Orange | #FF6B00 |
| Elite tier | Purple | #7B2FBE |
| Completed / unlocked / success | Green | #2ECC71 |
| Locked / pending / inactive | Gray | #6B7280 |
| Limited / urgent | Red-orange | #E74C3C |
| Card backgrounds | Dark surface | #1A1A2E |
| Text primary | White | #FFFFFF |
| Text secondary | Light gray | #9CA3AF |

---

## Bottom Navigation Update

The bottom navigation changes from 5 tabs to 4:

```
┌──────────┬──────────┬────────────────┬──────────┐
│   Home   │  Events  │ Rank & Rewards │ Profile  │
│   🏠     │  🎫      │  🏆            │  👤      │
└──────────┴──────────┴────────────────┴──────────┘
```

- All icons follow the same active (orange) / inactive (gray) color rule.
- The Rank & Rewards icon is the trophy (or trophy+star variant).
- Tab labels use 12px medium weight. Active label is orange, inactive is gray.
- Tab bar has a subtle top border (1px, #2A2A3E) and dark background matching the app chrome.

---

## Component ID Mapping from Original Screens

For traceability back to the Living Super Prompt checklist:

| New ID | Section | Component | Original Source |
|--------|---------|-----------|-----------------|
| RR-01 | My Rank | Superfan Score Summary | SCR-01 (fan score ring), SCR-02 (engagement progress) |
| RR-02 | My Rank | Community Leaderboard | SCR-10 (leaderboard/rank comparison) |
| RR-03 | My Rank | Friends Activity Scroll | NEW (not in original) |
| RR-04 | My Rank | Challenges Unlocking Rewards | SCR-11 (challenge/trivia), SCR-06 (completed actions), SCR-07 (rewards/unlocks) |
| RR-05 | My Rewards | Elite/Diamond Access Summary Bar | NEW (not in original) |
| RR-06 | My Rewards | Featured Access Cards | ACC-01 (ticket access), partially NEW |
| RR-07 | My Rewards | Your Passes List | ACC-06 (QR/pass wallet), partially NEW |
| RR-08 | My Rewards | Perks by Tier Carousel | ACC-10 (perks by tier) |
| RR-09 | My Rewards | Unlock Next Progress Item | ACC-11 (unlock next) |
| — | — | Internal Tab Toggle | NEW (structural component) |

### Components NOT carried into the merged screen

These original Access components are **event-day logistics** and do not belong on the Rank & Rewards screen. They need a new home (likely an event detail view or a day-of contextual flow):

| Original ID | Component | Recommended New Home |
|-------------|-----------|---------------------|
| ACC-02 | Parking card | Event detail → Logistics section |
| ACC-03 | Gate entry information | Event detail → Logistics section |
| ACC-04 | Venue map preview | Event detail → Venue section |
| ACC-05 | Arrival timing recommendation | Event detail → Logistics section |
| ACC-07 | Accessibility / logistics info | Event detail → Logistics section |
| ACC-08 | Ride share / public transit prompt | Event detail → Logistics section |
| ACC-09 | Pre-event checklist | Event detail → Day-of checklist |

### Score components absorbed or deprecated

| Original ID | Component | Disposition |
|-------------|-----------|-------------|
| SCR-03 | Badge / achievement tile | Absorbed into RR-01 (tier badge) and RR-04 (challenge completion) |
| SCR-04 | Deal confidence score | Relocated to Events screen (EVT context) |
| SCR-05 | Recommendation confidence score | Relocated to Home screen (recommendation cards) |
| SCR-08 | Streak / time-based progress | Absorbed into RR-04 (challenges can be streak-based) |
| SCR-09 | Personalized insight card | Relocated to Home screen or Profile |

---

## Developer Implementation Notes

### Routing
- Bottom nav tab index 2 routes to `/rank-rewards`.
- Internal toggle state is managed locally (not in URL) unless deep linking is needed, in which case use `/rank-rewards?tab=rank` and `/rank-rewards?tab=rewards`.
- "Go to Challenges" and locked-CTA taps should switch the toggle to My Rank and scroll to the target challenge. Use a shared scroll-to ref or event bus.

### State Management
- Challenge progress and reward status must share a reactive store. When `challenge.points_earned` reaches `challenge.points_required`, the store should automatically flip `reward.status` from `locked` to `claimable`.
- This can be a derived/computed state: `reward.status = (challenge.points_earned >= challenge.points_required) ? 'claimable' : 'locked'`.

### API Endpoints (suggested)
- `GET /api/user/rank` — score, tier, rank, percentile, weekly delta
- `GET /api/leaderboard?filter={city|week|all}&friends_only={bool}` — paginated leaderboard
- `GET /api/user/friend-activity` — recent friend activity feed
- `GET /api/user/challenges` — all challenges with tasks and progress
- `GET /api/user/rewards` — all rewards with status
- `POST /api/user/rewards/{id}/claim` — claim a reward
- `GET /api/user/passes` — claimed passes with QR data
- `GET /api/tiers` — tier definitions and perks

### Animation Budget
- Toggle switch: 150ms crossfade
- Challenge completion confetti: 300ms, CSS particles or Lottie
- Reward activation glow: 400ms border-color transition + single pulse
- Card claim checkmark: 200ms scale-in
- Carousel snap: 250ms spring easing

### Accessibility
- Toggle bar must be keyboard-navigable with `role="tablist"` and `role="tab"`.
- Challenge progress bars need `aria-valuenow` (points earned), `aria-valuemin` (0), `aria-valuemax` (points required), and `aria-valuetext` (e.g., "320 of 500 points earned").
- Countdown timers need `aria-live="polite"` for screen reader updates.
- All color-coded states must have a secondary indicator (icon, text label, or pattern) for colorblind users — never color alone.
