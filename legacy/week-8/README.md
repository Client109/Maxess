# Maxxes MVP - Fan Ranking & Rewards Platform

A production-ready MVP web application for fan engagement, rewards, and community ranking in the live events industry.

## 🎯 Project Overview

Maxxes connects ticketing history and music streaming behavior into a verified fan profile (Superfan Score) and uses that score to unlock tier-based rewards, presale access, and community standing.

## ✨ Features

### All 5 Core Screens Implemented

1. **Home** (`/`)
   - Superfan Score hero card with streak and tier badge
   - Progress tracker with 5-tier milestone system
   - Upcoming events grid (2x2)
   - Leaderboard preview card

2. **Events** (`/events`)
   - Search bar with filter functionality
   - Filter chips (For you, Music, Sports, This week)
   - Featured event hero card
   - Trending events grid
   - Upcoming events list with status badges

3. **Score** (`/score`)
   - Score summary card (4-section grid)
   - Community leaderboard with filters
   - Friends activity horizontal scroll
   - Challenges with task checklists and progress bars

4. **Access** (`/access`)
   - Elite/Diamond access KPI strip
   - Featured access cards (TOP PICK, LIMITED)
   - Your passes list with status badges
   - Perks by tier comparison grid

5. **Profile** (`/profile`)
   - Profile hero with avatar and stats
   - XP breakdown with progress bars
   - Recent activity feed
   - Settings menu

### Design System

- **Official Color Palette**: Action Orange (#FF5C00), Deep Navy, Success Green
- **Typography**: SF Pro Display font stack with proper hierarchy
- **Components**: Cards, badges, progress bars, filter chips, status indicators
- **Spacing**: 16px page padding, 44x44px touch targets, 69px bottom nav
- **Animations**: Progress bars, milestone dots, slide-ins

## 🛠 Tech Stack

- **Framework**: SvelteKit 2.0 with Svelte 5
- **Build Tool**: Vite 6.0
- **Icons**: Lucide Svelte
- **Validation**: Zod
- **Styling**: Pure CSS with CSS custom properties
- **Adapter**: adapter-static for deployable builds

## 📦 Installation

### Prerequisites

- Node.js 18+ (install via `brew install node`)

### Setup

```bash
# Navigate to project
cd /Users/sven/maxess

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to hosting
# The build output is in ./build directory
# Deploy to Vercel, Netlify, or any static hosting
```

## 📁 Project Structure

```
src/
├── routes/
│   ├── +layout.svelte          # App layout with bottom nav
│   ├── +page.svelte            # Home screen
│   ├── events/+page.svelte     # Events screen
│   ├── score/+page.svelte      # Score screen
│   ├── access/+page.svelte     # Access screen
│   └── profile/+page.svelte    # Profile screen
│
├── lib/
│   ├── components/
│   │   ├── BottomNav.svelte
│   │   ├── ScoreHeroCard.svelte
│   │   ├── ProgressCard.svelte
│   │   ├── UpcomingEvents.svelte
│   │   └── LeaderboardCard.svelte
│   │
│   ├── domain/
│   │   ├── types.ts            # Zod schemas
│   │   └── xp.ts               # Tier logic
│   │
│   ├── data/
│   │   └── mockData.ts         # Mock data for all screens
│   │
│   ├── stores/
│   │   └── fan.ts              # Fan profile store
│   │
│   └── styles/
│       ├── tokens.css          # Design system variables
│       └── app.css             # Global styles
│
└── app.html                    # HTML shell
```

## 🎨 Design System

### Colors

```css
--action-orange: #FF5C00;    /* Primary CTA, active states */
--deep-navy: #2667FF;        /* Score hero backgrounds */
--deeper-indigo: #3B28CC;    /* Diamond tier highlights */
--success-green: #1A9E56;    /* Active badges, positive trends */
--system-gray: #8E8E93;      /* Secondary text */
--border-gray: #E5E5EA;      /* Borders and dividers */
```

### Typography

- **Page Title**: 34px, Bold
- **Card Title**: 22px, Bold
- **Section Header**: 15px, Bold, Uppercase
- **Body Text**: 14px, Regular
- **Score Number**: 60px, Bold

## 📊 Mock Data

All screens use structured mock data that simulates:
- Fan profiles with XP, tiers, ranks, streaks
- Events with categories, venues, dates
- Leaderboard rankings with deltas
- Challenges with task completion
- Passes with status (active, upcoming, waiting)
- Friend activity with score changes

## 🔄 Next Steps

1. **Connect Real APIs**
   - Replace mock data in `lib/data/mockData.ts`
   - Implement Spotify/Ticketmaster integrations
   - Add authentication system

2. **Backend Integration**
   - Set up database (PostgreSQL schema provided in docs)
   - Create REST or GraphQL API
   - Implement real-time score updates

3. **Additional Features**
   - Push notifications
   - Social sharing
   - In-app messaging
   - Payment processing for rewards

## 📄 Documentation

- `BUILD_SUMMARY.md` - Detailed build documentation
- `SYNC_COMPLETE.md` - File sync verification
- `doc/Maxxes_MVP_Build_Requirements.pdf` - Full requirements spec

## 🎯 MVP Compliance

✅ All 5 screens wireframed and built  
✅ Official design system implemented  
✅ Interactive components functional  
✅ Mock data structure complete  
✅ Bottom navigation with routing  
✅ Responsive design ready  
✅ Production build capable  
✅ Deployable to static hosting  

## 📝 License

Private - ECON 454 Spring 2026 Group Project

---

**Built with** ❤️ **for the Maxxes MVP**
