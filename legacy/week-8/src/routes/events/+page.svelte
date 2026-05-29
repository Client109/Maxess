<script>
  import { Search, Filter, Bell, Bookmark } from 'lucide-svelte';
  import { mockEvents } from '$lib/data/mockData.js';
  import { appleMusicConnected, eventMatches } from '$lib/stores/appleMusic.js';

  let searchQuery = '';
  let activeFilter = 'For you';
  let notified = false;
  let bookmarkedEvents = new Set();

  const filters = ['For you', 'Music', 'Sports', 'This week'];

  $: filtered = mockEvents
    .filter(e => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.subtitle.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
    })
    .filter(e => {
      if (activeFilter === 'Music') return e.category === 'music';
      if (activeFilter === 'Sports') return e.category === 'sports';
      return true;
    })
    .sort((a, b) => {
      if (activeFilter === 'For you' && $appleMusicConnected) {
        const aMatch = $eventMatches.get(a.event_id)?.matched ? 1 : 0;
        const bMatch = $eventMatches.get(b.event_id)?.matched ? 1 : 0;
        return bMatch - aMatch;
      }
      return 0;
    });

  $: featuredEvent = filtered.find(event => event.featured);
  $: trendingEvents = filtered.filter(event => !event.featured).slice(0, 4);
  $: upcomingEvents = filtered.slice(0, 3);

  function setFilter(filter) {
    activeFilter = filter;
  }

  function toggleNotify() {
    notified = !notified;
  }

  function toggleBookmark(id) {
    if (bookmarkedEvents.has(id)) {
      bookmarkedEvents.delete(id);
    } else {
      bookmarkedEvents.add(id);
    }
    bookmarkedEvents = bookmarkedEvents;
  }
</script>

<svelte:head>
  <title>Events - Maxxes</title>
</svelte:head>

<div class="page-container">
  <!-- Status Bar -->
  <div class="status-bar">
    <span class="time">9:41</span>
    <div class="status-icons">
      <span class="signal">📶</span>
      <span class="battery">🔋</span>
    </div>
  </div>

  <!-- Page Header -->
  <header class="page-header">
    <div>
      <h1 class="page-title">Events</h1>
      <p class="subtitle">Discover music + sports for you</p>
    </div>
    <button class="notification-bell">
      <Bell size={24} />
    </button>
  </header>

  <!-- Search Bar -->
  <div class="search-container">
    <div class="search-bar">
      <Search size={16} color="#8E8E93" />
      <input 
        type="text" 
        placeholder="Search events, artists, venues..."
        bind:value={searchQuery}
        class="search-input"
      />
      <button class="filter-button">
        <Filter size={16} />
      </button>
    </div>
  </div>

  <!-- Filter Chips -->
  <div class="filter-chips">
    {#each filters as filter}
      <button 
        class="filter-chip"
        class:active={activeFilter === filter}
        on:click={() => setFilter(filter)}
      >
        {filter}
      </button>
    {/each}
  </div>

  <!-- Featured Event -->
  {#if featuredEvent}
    <section class="featured-section">
      <div class="featured-card" style="background-color: {featuredEvent.image_color}">
        <div class="featured-content">
          <div class="featured-chip">FEATURED</div>
          <h2 class="featured-title">{featuredEvent.title}</h2>
          <p class="featured-subtitle">{featuredEvent.subtitle}</p>
          <div class="featured-metadata">
            <span>{featuredEvent.date} • {featuredEvent.venue}</span>
          </div>
        </div>
        <button class="notify-btn" class:notified on:click={toggleNotify}>{notified ? 'Notified' : 'Notify me'}</button>
      </div>
    </section>
  {/if}

  <!-- Trending Now -->
  <section class="trending-section">
    <h2 class="section-header">Trending now</h2>
    <div class="trending-grid">
      {#each trendingEvents as event}
        <div class="trending-card">
          <div class="trending-image" style="background-color: {event.image_color}">
            <div class="category-chip">{event.category.toUpperCase()}</div>
            <button class="bookmark-btn" class:bookmarked={bookmarkedEvents.has(event.event_id)} on:click={() => toggleBookmark(event.event_id)}>
              <Bookmark size={14} />
            </button>
          </div>
          <div class="trending-content">
            <h3 class="trending-title">{event.title}</h3>
            <p class="trending-meta">{event.date} • {event.venue}</p>
            {#if $appleMusicConnected && $eventMatches.get(event.event_id)?.matched}
              <div class="listening-match-badge">Based on your listening</div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Upcoming For You -->
  <section class="upcoming-section">
    <h2 class="section-header">Upcoming for you</h2>
    <div class="upcoming-list">
      {#each upcomingEvents as event}
        <div class="upcoming-item">
          <div class="upcoming-thumbnail" style="background-color: {event.image_color}"></div>
          <div class="upcoming-info">
            <h3 class="upcoming-title">{event.title}</h3>
            <p class="upcoming-meta">{event.date} • {event.venue}</p>
          </div>
          {#if $appleMusicConnected && $eventMatches.get(event.event_id)?.matched}
            <span class="listening-icon-badge">🎧</span>
          {/if}
          <div class="status-badge {event.status}">{event.status === 'upcoming' ? 'Starts in 2h' : 'You\'re in'}</div>
          <div class="chevron">›</div>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 600;
    background: var(--off-white);
  }

  .status-icons {
    display: flex;
    gap: 4px;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 16px 20px;
    background: var(--off-white);
  }

  .subtitle {
    color: var(--system-gray);
    font-size: 14px;
    margin-top: 4px;
  }

  .notification-bell {
    background: none;
    border: none;
    color: var(--true-black);
    cursor: pointer;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-container {
    padding: 0 16px 16px;
    background: var(--off-white);
  }

  .search-bar {
    display: flex;
    align-items: center;
    background: var(--pure-white);
    border: 1px solid var(--border-gray);
    border-radius: 12px;
    padding: 12px;
    gap: 8px;
  }

  .search-input {
    flex: 1;
    font-size: 14px;
    color: var(--true-black);
  }

  .search-input::placeholder {
    color: var(--system-gray);
  }

  .filter-button {
    color: var(--system-gray);
  }

  .filter-chips {
    display: flex;
    gap: 8px;
    padding: 0 16px 20px;
    background: var(--off-white);
    overflow-x: auto;
  }

  .filter-chip {
    flex-shrink: 0;
    border: 1.5px solid var(--border-gray);
    border-radius: 99px;
    padding: 8px 16px;
    background: transparent;
    color: var(--system-gray);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .filter-chip.active {
    border-color: var(--action-orange);
    color: var(--action-orange);
  }

  .featured-section {
    padding: 0 16px 20px;
  }

  .featured-card {
    position: relative;
    border-radius: 20px;
    padding: 24px;
    color: var(--pure-white);
    overflow: hidden;
  }

  .featured-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%);
  }

  .featured-content {
    position: relative;
    z-index: 2;
    margin-bottom: 16px;
  }

  .featured-chip {
    display: inline-block;
    background: rgba(255, 92, 0, 0.9);
    color: var(--pure-white);
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .featured-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .featured-subtitle {
    font-size: 16px;
    margin-bottom: 8px;
    opacity: 0.9;
  }

  .featured-metadata {
    font-size: 12px;
    opacity: 0.8;
  }

  .notify-btn {
    position: relative;
    z-index: 2;
    background: var(--action-orange);
    color: var(--pure-white);
    padding: 12px 20px;
    border-radius: 99px;
    font-size: 14px;
    font-weight: 600;
    transition: background 0.2s ease;
  }

  .notify-btn.notified {
    background: var(--success-green);
  }

  .section-header {
    font-size: 15px;
    font-weight: 700;
    color: var(--true-black);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 16px 12px;
  }

  .trending-section {
    margin-bottom: 24px;
  }

  .trending-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0 16px;
  }

  .trending-card {
    background: var(--pure-white);
    border: 1px solid var(--border-gray);
    border-radius: 14px;
    overflow: hidden;
  }

  .trending-image {
    height: 80px;
    position: relative;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .category-chip {
    background: rgba(255, 255, 255, 0.9);
    color: var(--true-black);
    font-size: 8px;
    font-weight: 600;
    padding: 3px 6px;
    border-radius: 6px;
    text-transform: uppercase;
  }

  .bookmark-btn {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--system-gray);
    transition: color 0.2s ease;
  }

  .bookmark-btn.bookmarked {
    color: var(--action-orange);
  }

  .trending-content {
    padding: 10px;
  }

  .trending-title {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .trending-meta {
    font-size: 11px;
    color: var(--system-gray);
    margin: 0;
  }

  .upcoming-section {
    margin-bottom: 20px;
  }

  .upcoming-list {
    background: var(--pure-white);
    border: 1px solid var(--border-gray);
    border-radius: 14px;
    margin: 0 16px;
    overflow: hidden;
  }

  .upcoming-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid var(--border-gray);
    gap: 12px;
  }

  .upcoming-item:last-child {
    border-bottom: none;
  }

  .upcoming-thumbnail {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .upcoming-info {
    flex: 1;
  }

  .upcoming-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .upcoming-meta {
    font-size: 12px;
    color: var(--system-gray);
    margin: 0;
  }

  .status-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 10px;
    text-transform: uppercase;
  }

  .status-badge.upcoming {
    background: var(--action-orange);
    color: var(--pure-white);
  }

  .status-badge.active {
    background: var(--success-green);
    color: var(--pure-white);
  }

  .chevron {
    color: var(--system-gray);
    font-size: 16px;
    margin-left: 8px;
  }

  .listening-match-badge {
    font-size: 10px;
    font-weight: 600;
    color: var(--action-orange);
    background: rgba(255, 92, 0, 0.1);
    padding: 3px 6px;
    border-radius: 6px;
    margin-top: 4px;
    display: inline-block;
  }

  .listening-icon-badge {
    font-size: 14px;
    margin-right: 4px;
  }
</style>