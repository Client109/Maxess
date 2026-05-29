# Maxess Fan Loyalty & Access Platform — App Spec

## 1. Product Direction

Maxess is a mobile fan loyalty and access platform. It tracks verified fan engagement signals — streaming hours, watch time, merchandise purchases, live event attendance — and translates them into a Superfan Score. Higher scores unlock better access: presales, VIP ballots, early entry, and exclusive perks.

Primary user: A music fan or sports fan who attends live events and wants better access than the general public.

The MVP is a five-screen mobile app. All screens are built. The current focus is replacing hardcoded mock data with runtime-fetched data from a PostgreSQL database, deploying to Vercel, and locking the demo flow for the Week 10 presentation.

---

## 2. Five Screens

| Route | Screen | Purpose |
| --- | --- | --- |
| `/` | Home | Fan profile hero, score, upcoming events, leaderboard preview |
| `/events` | Events | Discover music and sports events, filtered and personalized |
| `/score` | Score | Community leaderboard, friend activity, reward challenges |
| `/access` | Access | Presales, passes, perks by tier, unlock next actions |
| `/profile` | Profile | User stats, connected accounts, XP breakdown, settings |

Bottom navigation persists across all screens. Active tab icon uses `var(--action-orange)`.

---

## 3. Home Screen

### Layout (top to bottom)

1. **Status bar** — 44px, time left, signal/battery right
2. **Page header** — "Maxess" title (34px, weight 700), "Your fan profile" subtitle (14px gray), notification bell (top right, orange dot when unread)
3. **Music / Sports toggle** — Segmented pill control (200px wide, 40px tall), orange pill slides between modes with 200ms ease
4. **Superfan Score hero card** — Dark gradient background (#111111 → #3D1800 for Sports, blue gradient for Music), contains:
   - "SUPERFAN SCORE" eyebrow label
   - Score number (large, e.g. 91/100), animated count-up on load (800ms ease-out cubic)
   - Tier badge (star icon + tier name, e.g. "Elite")
   - Streak badge (flame icon + count + "GAME STREAK" or "DAY STREAK")
   - "Top 3%" percentile label
   - "Top team / Top artist" and "Home venue" footer stats
5. **Progress card** — "PROGRESS TO ELITE+" with info icon, `X pts to next tier` right-aligned, step rail showing tier thresholds (General 0 / Loyal 1,000 / Superfan 2,500 / Elite 5,000), current position highlighted with orange circle
6. **Upcoming / For you section** — Section header + "View all ›" (orange), 2-column event card grid
   - Each card: background image or color, category chip (MUSIC ACCESS / GAME ACCESS / VENUE ACCESS — orange pill), bookmark icon (top right), event title, subtitle, date/time + chevron button
7. **Leaderboard preview** — Friend avatars, "Climb the ranks" + subtitle, "See leaderboard ›" button (outline pill)

### Behavior
- Music/Sports toggle updates the score hero background color (blue ↔ dark orange), hero stats (top artist ↔ top team, top venue ↔ home venue), and the upcoming events section content
- Score animates from 0 to actual value on page load
- Progress bar fills with 600ms ease-out transition

---

## 4. Events Screen

### Purpose
Discover upcoming music and sports events personalized to the fan's engagement history.

### Layout (top to bottom)

#### 4.1 Page Header
- Title: "Events" (bold, ~28px)
- Subtitle: "Discover music + sports for you" (gray, 14px)
- Notification bell icon, top right, with red dot badge when there are unread notifications
- Background: off-white (`#F2F2F7`)

#### 4.2 Search Bar
- Full-width, below header, 16px horizontal padding
- Left: search icon (gray)
- Placeholder: "Search artists, teams, venues"
- Right: filter icon button (separate, outside the search field or at trailing edge)
- Background: white, 1px border (`#E5E5EA`), 12px border radius
- Padding: 12px inside

#### 4.3 Filter Chips
- Horizontal scrollable row, 16px padding, 8px gap between chips
- Chips: **For you** · Music · Sports · This week
- Default active: "For you"
- Active state: border and text color `var(--action-orange)` (#FF5C00)
- Inactive state: gray border, gray text
- Border radius: 99px (fully rounded pill)
- Font: 14px, weight 500

#### 4.4 Featured Hero Card
- Full-width card, 16px horizontal margin, 20px bottom margin
- Dark background with artist/event photo (right-aligned portrait silhouette)
- Gradient overlay for legibility (left side darker)
- **FEATURED badge**: orange background, white text, star icon to the left, "FEATURED" in caps, 10px font
- **Event title**: large white text, ~24px, weight 700 (e.g. "The Weeknd at SoFi Stadium")
- **Presale status**: "Presale opens in 18h" (white, 16px, slightly transparent)
- **Metadata row**: calendar icon + date + bullet + pin icon + location (e.g. "Sat, Jun 8 • Inglewood, CA"), 12px, white/transparent
- **Notify me button**: bottom right, orange background, white text, bell icon to the left, "Notify me" label, rounded pill, 14px weight 600
  - Toggle state: "Notified ✓" when active, green background

#### 4.5 Trending Now
- Section header: "Trending now" (15px, weight 700, uppercase, 0.5px letter-spacing) + "View all ›" link (orange, right-aligned)
- 2-column grid, 10px gap, 16px horizontal padding
- Each trending card:
  - Top: background image/color (fixed height ~80–120px), **category chip** (white/light background, black text, 8px font, uppercase — e.g. "MUSIC" or "SPORTS"), **bookmark icon** (white background, rounded square, top right)
  - Bottom: event title (13px, weight 600), date + venue (11px, gray)
  - Card background: white, 1px border `#E5E5EA`, 14px border radius, overflow hidden
  - Apple Music match: "Based on your listening" badge appears below meta if connected and matched

#### 4.6 Upcoming for You
- Section header: "Upcoming for you" + "View all ›" (orange)
- White card container, 1px border, 14px border radius, 16px horizontal margin, overflow hidden
- Each row separated by 1px border (no bottom border on last row)
- Each upcoming row:
  - **Thumbnail**: 40×40px, 8px border radius, colored background
  - **Info block** (flex 1): title (14px, weight 600), date + venue below (12px, gray, calendar icon)
  - **Status badge** (right side): pill with label and color
    - Orange background + white text: "Starts in Xh" (countdown to presale/event)
    - Green background + white text: "You're in" (already registered/eligible)
  - **Chevron**: gray, 16px, far right

#### 4.7 Near You This Week
- Section header: "Near you this week" + "View all ›" (orange)
- **Date strip**: horizontal scrollable row of day chips
  - Each chip: day-of-week abbreviation (MON, TUE, etc.) stacked above date (Jun 6, Jun 7, etc.)
  - "TODAY" chip: orange outline border, orange text, slightly larger
  - Other chips: plain gray text, no border
  - Currently selected date: highlighted
- **Event grid** below date strip: 2-column grid, same card style as Trending Now
  - Cards show: event name (white, bottom left of image), date + venue (small, white, bottom left)
  - Bookmark icon (top right of image, white rounded square)
  - Grid updates when a different date is selected

### Events Data Model

```ts
type Event = {
  event_id: string;
  title: string;          // e.g. "The Weeknd at SoFi Stadium"
  subtitle: string;       // e.g. "Presale opens in 18h"
  category: 'music' | 'sports';
  genre?: string;         // e.g. "Hip-Hop/R&B", "Hockey"
  venue: string;
  city: string;
  date: string;           // ISO date or formatted string for display
  time?: string;          // e.g. "7:00PM PT"
  image_color: string;    // hex fallback background color
  featured: boolean;
  status: 'upcoming' | 'active' | 'presale';
  has_presale: boolean;
  presale_opens_in?: string;  // e.g. "18h" for countdown display
  ticket_status: 'onsale' | 'offsale' | 'presale';
  spotify_artist_url?: string;
};
```

### Events Page State

```ts
let searchQuery = '';           // drives real-time search filtering
let activeFilter = 'For you';   // 'For you' | 'Music' | 'Sports' | 'This week'
let notifiedEvents: Set<string>;
let bookmarkedEvents: Set<string>;
let selectedDate: string;       // for "Near you this week" date strip
```

### Filter Logic
- **For you**: all events, sorted with Apple Music matched events first (if connected)
- **Music**: events where `category === 'music'`
- **Sports**: events where `category === 'sports'`
- **This week**: events with date within 7 days of today

### Search Logic
- Searches across `title`, `subtitle` (which includes venue/artist), and `venue` fields
- Case-insensitive substring match
- Applied on top of the active filter

### Component Map

```
src/routes/events/+page.svelte          Main events page
src/lib/components/events/
  EventHeroCard.svelte                  Featured hero card
  EventTrendingGrid.svelte              2-column trending grid
  EventCard.svelte                      Individual card in grid
  EventUpcomingList.svelte              Upcoming for you list rows
  EventUpcomingRow.svelte               Single upcoming row
  EventNearYouSection.svelte            Near you this week section
  EventDateStrip.svelte                 Horizontal date selector
```

### Events Seed Data (from Ticketmaster LA)

Minimum 10–12 events, mix of music and sports:

**Music events (8+)**:
- The Weeknd at SoFi Stadium — Jun 8, featured, has presale
- Ariana Grande — Eternal Sunshine Tour, Crypto.com Arena, Jun 13–14, presale
- Don Toliver: Octane Tour, Crypto.com Arena, Jun 28, featured
- Kaytranada at Kia Forum — Fri, Jun 7 (trending)
- Odesza — The Shrine, Jun 6
- Daniel Caesar — Greek Theatre, Jun 7
- WEEZER: The Gathering — Crypto.com Arena, Oct 24
- Kacey Musgraves — Crypto.com Arena, Oct 18–19

**Sports events (4)**:
- Ducks vs Kings — Honda Center, Jun 8 (trending)
- Honda Center Member Night — Jun 14
- Lakers game — Crypto.com Arena
- Dodgers game — Dodger Stadium

---

## 5. Score Screen

### Layout (top to bottom)

1. **Page header** — "Score", "Community ranking + reward challenges", notification bell
2. **Score summary card** — white card, 1px border
   - Left: "SUPERFAN SCORE", large score number (e.g. 91/100), tier badge (orange star + "Elite")
   - Middle: "THIS WEEK" / "+12 pts / vs last week" (orange)
   - Right of middle: "YOUR RANK" / "#18 in LA"
   - Far right: "PERCENTILE" / "Top 3% of fans"
3. **Community leaderboard card** — white card, header "Community leaderboard" + dropdown filter "LA / This week"
   - Ranked list rows: rank number, avatar circle, name, score, delta (green ▲ or red ▼ with number)
   - Current user row highlighted (orange rank number, "You" in orange, orange score)
   - "View full leaderboard ›" link at bottom
4. **Friends activity** — "Friends activity" header + "See friends ›" link
   - Horizontal scroll of friend activity cards
   - Each card: avatar, name, activity description (e.g. "just passed you"), score (orange)
5. **Challenges unlocking rewards** — section header
   - Challenge cards (stacked list):
     - Background image (event/artist photo), "Unlock reward" badge (orange star), title, description, progress text ("2/3 tasks complete")
     - Task checklist (right side): tasks with checkboxes, checked tasks filled orange
     - "Limited" badge (top right) when limited availability
     - Progress bar below title (orange)
   - "View all challenges ›" link

### Leaderboard Data Model

```ts
type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  delta: number;          // weekly change, positive or negative
  city: string;
  is_me: boolean;
  time_period: 'weekly' | 'monthly' | 'all_time';
};
```

Seed: 25+ entries, Alex Chen at rank #18, score 8,750, is_me: true, delta: +12.

### Challenge Data Model

```ts
type Challenge = {
  id: string;
  title: string;           // e.g. "SoFi VIP Access"
  description: string;     // e.g. "Unlock VIP access at SoFi Stadium."
  reward_name: string;
  is_limited: boolean;
  image_color: string;
  progress_fraction: number;  // 0–1
  tasks: Array<{
    label: string;
    is_complete: boolean;
  }>;
};
```

---

## 6. Access Screen

### Layout (top to bottom)

1. **Page header** — "Access", "Presales, perks, and member passes", notification bell
2. **Access summary bar** — white card, 1px border, horizontal 3-column layout:
   - "ELITE ACCESS" eyebrow label spanning the card
   - Ticket icon + "3 Active"
   - Clock icon + "2 Expiring soon"
   - Diamond icon + "Top tier Perks"
3. **Featured access** — section header, stacked dark cards:
   - Each card: background image, badge (star icon + "TOP PICK" or lock icon + "LIMITED"), title, description, countdown/status label, "View pass" or "Claim access" CTA button
4. **Your passes** — section header + "View all ›" (orange)
   - List rows (white card container, 1px border):
     - Icon (colored circle), pass name (bold), venue + date below (gray), status badge (pill), chevron
     - Status variants: green "Active", orange "Starts May 24", purple "Waiting list"
5. **Perks by tier** — section header, horizontal tier cards:
   - Gray card: General star icon, "General", perks list
   - Orange card: Superfan star icon, "Superfan", perks list
   - Orange outline card (active): Diamond icon, "Elite", perks list, orange border
6. **Unlock next** — section header, action card:
   - Orange outline icon, action text (e.g. "Complete 1 more event"), reward description, progress fraction, chevron

### Pass Data Model

```ts
type Pass = {
  id: string;
  name: string;            // e.g. "Early entry"
  venue: string;
  date: string;
  icon_color: string;
  status: 'active' | 'starts_soon' | 'waiting_list' | 'expired';
  status_label: string;    // exactly what the badge shows — "Active", "Starts May 24", "Waiting list"
  xp_tier_required: string;
};
```

Status labels must exactly match the badge text rendered in the UI.

---

## 7. Profile Screen

### Layout (top to bottom)

1. **Page header** — "Profile" or "Maxess", subtitle, notification bell
2. **Fan profile card** — avatar or placeholder, name (e.g. "Alex Chen"), tier badge, XP total
3. **XP breakdown** — horizontal or grid stat blocks:
   - Attendance XP: 3,600
   - Streaming XP: 2,840
   - Watch XP: 960
   - Spend XP: 440
   - Challenge XP: 910
4. **Connected accounts** — list of toggle rows (Spotify, Apple Music, Ticketmaster/AXS, etc.)
5. **Recent activity** — feed of XP-earning events

---

## 8. XP Scoring Model

### Tier Thresholds (single source of truth — `tiers.json`)

| Tier | XP threshold |
| --- | --- |
| General | 0 |
| Loyal | 1,000 |
| Superfan | 2,500 |
| Elite | 5,000 |

> Note: The older spec used Bronze/Silver/Gold/Platinum/Diamond naming. The current mockups use General/Loyal/Superfan/Elite. Use the mockup naming as canonical.

### XP Earning Rules

| Signal | XP |
| --- | --- |
| 1 hour of verified streaming (Spotify/Apple Music) | +3 XP |
| Watch a game or concert stream | +25 XP |
| Attend a live event (ticket scan / venue QR) | +200 XP |
| Every $1 of official merchandise purchase | +1 XP |
| Concert check-in (in-venue scan) | +50 XP per check-in |
| Playlist save | +5 XP per save |
| Setlist song listened along | +3 XP per song |
| Active streak multiplier | 1.0× (0–7 days) / 1.3× (8–14) / 1.5× (15–28) / 2.0× (28+) |

### Demo Fan Profile — Alex Chen

```json
{
  "fan_id": "fan_001",
  "name": "Alex Chen",
  "city": "Los Angeles",
  "xp_total": 8750,
  "current_tier": "Elite",
  "streak_days": 12,
  "rank": 18,
  "percentile": "Top 3%",
  "top_artist": "The Weeknd",
  "top_venue": "SoFi Stadium",
  "events_attended": 9,
  "xp_breakdown": {
    "attendance_xp": 3600,
    "streaming_xp": 2840,
    "watch_xp": 960,
    "spend_xp": 440,
    "challenge_xp": 910
  }
}
```

---

## 9. Design Tokens

```css
--action-orange: #FF5C00;
--success-green: #34C759;
--off-white: #F2F2F7;
--pure-white: #FFFFFF;
--true-black: #000000;
--system-gray: #8E8E93;
--border-gray: #E5E5EA;
--pill-bg: #E5E5EA;
```

### Typography

| Element | Size | Weight |
| --- | --- | --- |
| Page title | 28–34px | 700 |
| Score number | 48–56px | 700 |
| Section header | 15–20px | 700 |
| Card title | 13–17px | 600–700 |
| Body / meta | 12–14px | 400–500 |
| Labels / chips | 8–11px | 600–700 |

### Layout Rules
- Page padding: 16px horizontal
- Card gap: 8–10px vertical
- Section gap: 20–24px
- Touch targets: 44×44px minimum
- Status bar: 44px height
- Bottom nav: ~80px height
- Border radius: 12–20px for cards, 99px for pills/chips

---

## 10. Bottom Navigation

5 tabs, always visible. Active tab: icon and label in `--action-orange`.

| Tab | Icon | Route |
| --- | --- | --- |
| Home | house | `/` |
| Events | ticket/lightning | `/events` |
| Score | target/dartboard | `/score` |
| Access | star with corners | `/access` |
| Profile | person circle | `/profile` |

---

## 11. Frontend Stack

| Layer | Technology |
| --- | --- |
| Framework | SvelteKit 2 + TypeScript |
| Styling | CSS custom properties (no Tailwind) |
| Icons | lucide-svelte |
| Data | Prisma ORM → PostgreSQL |
| Deployment | Vercel (`adapter-auto` or `adapter-vercel`) |
| Tests | vitest (unit), Playwright (E2E) |

---

## 12. Data Files (static/data/)

| File | Purpose | Min records |
| --- | --- | --- |
| `events.json` | All events | 10–12 (6 music, 4 sports) |
| `fan-profile.json` | Alex Chen demo user | 1 |
| `leaderboard.json` | Ranked fan entries | 25+ |
| `challenges.json` | Reward challenges | 5 |
| `passes.json` | Access passes | 5 |
| `tiers.json` | Tier thresholds + perks | 4 tiers |

---

## 13. MVP Acceptance Criteria

- [ ] App live at a public Vercel URL
- [ ] All 5 screens load and navigate correctly
- [ ] Bottom navigation active state works
- [ ] Superfan Score displays with correct tier and XP (Alex Chen: 8,750, Elite, rank #18)
- [ ] Events page: search filters in real time
- [ ] Events page: filter chips (For you / Music / Sports / This week) filter correctly
- [ ] Events page: featured hero card shows presale countdown
- [ ] Events page: trending, upcoming, and near-you sections all populated
- [ ] Score page: leaderboard shows 25+ entries, current user highlighted
- [ ] Score page: challenges show task progress
- [ ] Access page: passes show with correct status labels
- [ ] Access page: perks by tier grid renders correctly
- [ ] Profile page: XP breakdown visible
- [ ] Data loaded from JSON or database, not hardcoded in components
- [ ] Mobile layout at 390px width
- [ ] Desktop: max-width constrained and centered

---

## 14. Role Ownership (Week 9)

| Role | Owner | Primary deliverables |
| --- | --- | --- |
| Technical Lead / Arch | Kayah | Vercel deploy, PostgreSQL setup, Prisma migrations |
| Design / Creative | Kyle | Desktop responsive, demo storyboard, screenshots |
| Frontend Developer | Luke | Swap mock imports → server load functions, all 5 routes |
| Backend / Data Logic | Ethan | Seed data, database functions, XP transaction wiring |
| QA / Documentation | Justin | Unit tests (15+), QA checklist, acceptance criteria audit |

---

## 15. Source Context

Mockups: `assets/mockups/` — events.jpg, home-music.jpg, home-sports.jpg, score.jpg, access.jpg

Previous spec: replaced the original event operations intelligence widget spec (Week 1–2) with this fan loyalty platform spec reflecting the actual current build.

Lab reference: `doc/WEEK-9-LAB.md`, `doc/Maxxes_PreLab_Cumulative.docx`
