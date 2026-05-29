# Maxess MVP - Fan Ranking & Rewards Platform

A production-ready MVP web application for fan engagement, rewards, and community ranking in the live events industry.

## Project Overview

Maxess connects ticketing history and music streaming behavior into a verified fan profile (Superfan Score) and uses that score to unlock tier-based rewards, presale access, and community standing.

## Features

### All 4 Core Screens Implemented

1. **Home** (`/`)
   - Maxess brand header with Zap icon
   - Momentum Score card with tier badge and XP progress
   - Community Activity feed showing friend actions
   - Server-side data loading from PostgreSQL

2. **Events** (`/events`)
   - Search bar with filter functionality
   - Filter chips (For you, Music, Sports, This week)
   - Featured event hero card
   - Upcoming events list with status badges

3. **Rank & Rewards** (`/rank-rewards`)
   - Internal tab toggle: My Rank / My Rewards
   - **My Rank**: Score summary, community leaderboard with filters, challenges with progress bars
   - **My Rewards**: Featured access cards, passes list with status badges, perks by tier carousel
   - Challenge-to-reward linkage: completed challenges surface unlocked rewards

4. **Profile** (`/profile`)
   - Profile hero with avatar and stats
   - XP breakdown with progress bars
   - Recent activity feed
   - Settings menu

### Design System

- **Light Theme**: Clean light surfaces (#F8F8FA background, #FFFFFF cards)
- **Official Color Palette**: Action Orange (#FF5C00), Deep Navy, Success Green
- **Tier System**: General, Loyal, Superfan, Elite (thresholds: 0, 1000, 2500, 5000 XP)
- **Typography**: SF Pro Display font stack with proper hierarchy
- **Bottom Nav**: 4 tabs (Home, Events, Rewards, Profile)
- **Spacing**: 16px page padding, 44x44px touch targets

## Tech Stack

- **Framework**: SvelteKit 2.0 with Svelte 5
- **Build Tool**: Vite 6.0
- **Database**: PostgreSQL via Prisma ORM with `@prisma/adapter-pg` (direct TCP)
- **Icons**: Lucide Svelte
- **Validation**: Zod
- **Styling**: Pure CSS with CSS custom properties (tokens.css)
- **Deployment**: Vercel via `adapter-vercel`

## Installation

### Prerequisites

- Node.js 18+

### Setup

```bash
npm install

# Start local Prisma Postgres dev server
npx prisma dev --detach

# Push schema and seed database
npx prisma db push
npm run db:seed

# Start development server (network accessible)
npx vite dev --host 0.0.0.0

# Open in browser: http://localhost:5173
```

## Build & Deploy

```bash
npm run build
npm run preview
```

Deployed to Vercel with `adapter-vercel` (server routes required for API proxying and database access).

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte              # App layout with bottom nav
│   ├── +page.svelte                # Home screen
│   ├── +page.server.ts             # Home data loader
│   ├── events/+page.svelte         # Events screen
│   ├── events/+page.server.ts      # Events data loader
│   ├── rank-rewards/+page.svelte   # Rank & Rewards screen
│   ├── rank-rewards/+page.server.ts
│   ├── profile/+page.svelte        # Profile screen
│   └── api/                        # API endpoints
│
├── lib/
│   ├── api/                        # API clients (Ticketmaster, Spotify, Last.fm)
│   ├── components/                 # UI components (BottomNav, etc.)
│   ├── domain/                     # Types, XP/tier logic
│   ├── server/                     # Database queries, server transforms
│   └── styles/                     # Design tokens, global CSS
│
└── prisma/
    ├── schema.prisma               # Database schema
    └── seed.ts                     # Demo data seeder
```

## Design System Colors (Light Theme)

```css
--bg-primary: #F8F8FA;        /* App background */
--bg-card: #FFFFFF;            /* Card surfaces */
--action-orange: #FF5C00;     /* Primary CTA, active states */
--text-primary: #000000;      /* Primary text */
--text-secondary: #8E8E93;    /* Secondary text */
--border-gray: #E5E5EA;       /* Borders and dividers */
--success-green: #34D399;     /* Active badges, positive trends */
```

## License

Private - ECON 454 Spring 2026 Group Project
