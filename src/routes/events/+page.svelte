<script>
  import { Search, Bell, ChevronRight, MessageCircleQuestion, Shield, Diamond, Heart } from 'lucide-svelte';
  import { unreadCount, notifPanelOpen } from '$lib/stores/notifications.js';
  import { activeCategory } from '$lib/stores/settings.js';
  import { subscribedSet } from '$lib/stores/subscriptions.js';
  import { followedArtists } from '$lib/stores/followedArtists.js';
  import { progressByArtist } from '$lib/stores/progressByArtist.js';
  import { XP_PER_CHECKIN } from '$lib/domain/xp-rules.js';

  export let data;

  let searchQuery = '';
  // Primary chips mirror the mockup. Music/Sports also flip the shared
  // $activeCategory store so other pages (home, profile) stay in sync.
  // "All" and "Experiences" don't touch the shared store; the existing
  // music/sports hard gate (introduced in 0.8.x) still applies so when the
  // shared toggle is sports, even "All" hides music.
  let primaryFilter = $activeCategory === 'sports' ? 'Sports' : 'Music';
  function setPrimary(chip) {
    primaryFilter = chip;
    if (chip === 'Music') activeCategory.set('music');
    else if (chip === 'Sports') activeCategory.set('sports');
  }

  // Secondary chips toggle independently.
  let followingOn = false;
  let thisWeekOn = false;

  // Followed-artist name match (lower-cased). Sourced from progressByArtist
  // so it stays in sync with the per-artist Follow buttons across the app.
  $: followedNames = $followedArtists
    .map(id => $progressByArtist[id]?.name)
    .filter(n => typeof n === 'string' && n.length > 0)
    .map(n => n.toLowerCase());
  function matchesFollowed(e) {
    if ($subscribedSet.has(e.event_id)) return true;
    if (followedNames.length === 0) return false;
    const hay = `${e.title} ${e.subtitle ?? ''}`.toLowerCase();
    return followedNames.some(n => hay.includes(n));
  }

  // Derive the event's required-tier badge. Explicit `required_tier` wins;
  // otherwise infer from heat/featured so the demo data still produces a
  // sensible mix of Elite/Loyal/Fan badges without hand-tagging every row.
  function tierFor(e) {
    if (e.required_tier) return e.required_tier;
    if (e.featured && (e.trending || (e.heat_score ?? 0) >= 90)) return 'Elite';
    if (e.featured || e.trending || (e.heat_score ?? 0) >= 80) return 'Loyal';
    return 'Fan';
  }
  function tierTone(tier) {
    switch (tier) {
      case 'Elite': return { fg: '#FF5C00', icon: Diamond };
      case 'Superfan': return { fg: '#3B28CC', icon: Diamond };
      case 'Loyal': return { fg: '#2667FF', icon: Shield };
      case 'Fan': return { fg: '#1A9E56', icon: Heart };
      default: return { fg: '#8E8E93', icon: Heart };
    }
  }

  $: featuredEvents = (data.events || []).filter(e => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = e.title.toLowerCase().includes(q)
        || (e.subtitle ?? '').toLowerCase().includes(q)
        || e.venue.toLowerCase().includes(q)
        || e.city.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Picking "All" explicitly opts into every category — the shared
    // music/sports toggle is bypassed so the opposite category isn't hidden.
    // "Music" / "Sports" / "Experiences" each narrow to their own set.
    if (primaryFilter === 'Music' && e.category !== 'music') return false;
    if (primaryFilter === 'Sports' && e.category !== 'sports') return false;
    if (primaryFilter === 'Experiences' && e.category !== 'comedy' && e.category !== 'festival') return false;

    if (followingOn && !matchesFollowed(e)) return false;
    if (thisWeekOn) {
      const eventDate = new Date(e.date);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() + 7);
      if (Number.isNaN(eventDate.getTime()) || eventDate > weekEnd) return false;
    }
    return true;
  });

  function formatDateTime(e) {
    const date = e.date_display ?? e.date;
    return e.time ? `${date} • ${e.time}` : date;
  }
</script>

<svelte:head>
  <title>Events - Maxess</title>
</svelte:head>

<div class="page">
  <!-- Header -->
  <header class="page-header">
    <div>
      <h1 class="page-title">Events, Artists, Teams</h1>
      <p class="page-subtitle">Discover what's next.</p>
    </div>
    <button type="button" class="bell-btn" aria-label="Notifications" on:click={() => $notifPanelOpen = true}>
      <Bell size={22} />
      {#if $unreadCount > 0}<span class="bell-dot" aria-hidden="true"></span>{/if}
    </button>
  </header>

  <!-- Search -->
  <div class="search">
    <Search size={18} color="#8E8E93" />
    <input
      type="text"
      class="search-input"
      placeholder="Search events, artists, or venues"
      bind:value={searchQuery}
      aria-label="Search events, artists, or venues"
    />
  </div>

  <!-- Primary chips -->
  <div class="chips-row" role="tablist" aria-label="Category filter">
    {#each ['All', 'Music', 'Sports', 'Experiences'] as chip}
      <button
        type="button"
        role="tab"
        class="chip"
        class:chip--active={primaryFilter === chip}
        aria-selected={primaryFilter === chip}
        on:click={() => setPrimary(chip)}
      >{chip}</button>
    {/each}
  </div>

  <!-- Secondary chips (Following / This week) -->
  <div class="chips-row chips-row--secondary" aria-label="Additional filters">
    <button
      type="button"
      class="chip chip--small"
      class:chip--active={followingOn}
      aria-pressed={followingOn}
      on:click={() => followingOn = !followingOn}
    >Following</button>
    <button
      type="button"
      class="chip chip--small"
      class:chip--active={thisWeekOn}
      aria-pressed={thisWeekOn}
      on:click={() => thisWeekOn = !thisWeekOn}
    >This week</button>
  </div>

  <!-- Featured events -->
  <section class="section">
    <h2 class="section-title">Featured events</h2>
    {#if featuredEvents.length === 0}
      <p class="empty">No events match your filters.</p>
    {:else}
      <div class="events-list">
        {#each featuredEvents.slice(0, 8) as event (event.event_id)}
          {@const tier = tierFor(event)}
          {@const tone = tierTone(tier)}
          {@const Icon = tone.icon}
          <a class="event-card" href="/events/{event.event_id}">
            <div class="event-thumb" style:background-color={event.image_color || '#1a1a2e'}>
              {#if event.image_url}
                <img src={event.image_url} alt="" />
              {/if}
            </div>
            <div class="event-body">
              <h3 class="event-title">{event.title}</h3>
              {#if event.subtitle}
                <p class="event-line">{event.subtitle}</p>
              {/if}
              <p class="event-line">{event.venue}</p>
              <p class="event-meta">{formatDateTime(event)}</p>
              <p class="event-cta">Check in to earn +{XP_PER_CHECKIN}</p>
            </div>
            <div class="event-right">
              <span class="tier-badge" style:color={tone.fg} style:border-color={tone.fg}>
                <Icon size={12} />
                {tier}
              </span>
              <ChevronRight size={18} color="#5A5A60" />
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Recommended next -->
  <section class="section">
    <h2 class="section-title">Recommended next</h2>
    <a class="recommend-card" href="/trivia">
      <span class="recommend-icon"><MessageCircleQuestion size={28} color="#FF5C00" /></span>
      <div class="recommend-body">
        <h3 class="recommend-title">Live Trivia Night</h3>
        <p class="recommend-line">Maxxes App</p>
        <p class="recommend-cta">Earn <span class="recommend-pts">+50</span> per correct answer</p>
      </div>
      <ChevronRight size={18} color="#5A5A60" />
    </a>
  </section>

  <p class="footer-note">
    Event check-ins, Spotify listening, trivia, and streaks<br />
    all feed the same universal point engine.
  </p>
</div>

<style>
  /* Page-scoped dark theme override — Events is the only screen that runs
     against a black surface per the mockup. The bottom nav (rendered by
     +layout.svelte) keeps its light styling. */
  .page {
    min-height: 100vh;
    background: var(--bg-primary);
    color: #FFFFFF;
    padding: 8px 20px 96px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  /* Header */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 24px 0 16px;
    gap: 16px;
  }
  .page-title {
    margin: 0;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 1.1;
    color: #FFFFFF;
  }
  .page-subtitle {
    margin: 6px 0 0;
    color: #8E8E93;
    font-size: 15px;
  }
  .bell-btn {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid var(--border-strong);
    color: #FFFFFF;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .bell-dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FF5C00;
    box-shadow: 0 0 0 2px #000000;
  }

  /* Search */
  .search {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--bg-input);
    border: 1px solid var(--border-card);
    border-radius: 14px;
    padding: 14px 16px;
    margin: 8px 0 16px;
  }
  .search:focus-within {
    border-color: #FF5C00;
  }
  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #FFFFFF;
    font-size: 16px;
    font-family: inherit;
    min-width: 0;
  }
  .search-input::placeholder { color: #8E8E93; }

  /* Chips */
  .chips-row {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 4px 0 12px;
    scrollbar-width: none;
  }
  .chips-row::-webkit-scrollbar { display: none; }
  .chips-row--secondary { padding-top: 0; }

  .chip {
    flex-shrink: 0;
    background: transparent;
    color: #C7C7CC;
    border: 1px solid var(--border-strong);
    border-radius: 14px;
    padding: 12px 22px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
  }
  .chip--small {
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 12px;
  }
  .chip--active {
    border-color: #FF5C00;
    color: #FF5C00;
  }

  /* Section */
  .section { margin-top: 22px; }
  .section-title {
    margin: 0 0 14px;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
  }

  /* Event cards */
  .events-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .event-card {
    display: grid;
    grid-template-columns: 132px 1fr auto;
    gap: 14px;
    align-items: center;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 16px;
    padding: 12px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s ease, transform 0.1s ease;
  }
  .event-card:active { transform: scale(0.998); }
  .event-card:hover { border-color: #25252A; }

  .event-thumb {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }
  .event-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .event-body {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .event-title {
    margin: 0 0 4px;
    font-size: 17px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .event-line {
    margin: 0;
    font-size: 14px;
    color: #C7C7CC;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .event-meta {
    margin: 0;
    font-size: 14px;
    color: #C7C7CC;
  }
  .event-cta {
    margin: 6px 0 0;
    font-size: 14px;
    font-weight: 600;
    color: #FF5C00;
  }

  .event-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 14px;
    height: 100%;
    padding: 8px 4px 8px 0;
  }
  .tier-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid currentColor;
    border-radius: 10px;
    padding: 6px 10px;
    font-size: 13px;
    font-weight: 600;
    background: transparent;
  }

  /* Recommended */
  .recommend-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 14px;
    align-items: center;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 16px;
    padding: 14px;
    text-decoration: none;
    color: inherit;
  }
  .recommend-icon {
    width: 56px;
    height: 56px;
    border: 1px solid rgba(255, 92, 0, 0.5);
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .recommend-body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }
  .recommend-title {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: #FFFFFF;
  }
  .recommend-line {
    margin: 0;
    font-size: 14px;
    color: #C7C7CC;
  }
  .recommend-cta {
    margin: 2px 0 0;
    font-size: 14px;
    color: #C7C7CC;
  }
  .recommend-pts {
    color: #FF5C00;
    font-weight: 700;
  }

  .footer-note {
    margin: 32px 0 0;
    color: #6E6E73;
    font-size: 13px;
    text-align: center;
    line-height: 1.5;
  }

  .empty {
    margin: 8px 0 0;
    color: #8E8E93;
    font-size: 14px;
  }
</style>
