<script>
  import { Search, SlidersHorizontal, MapPin, Calendar, ChevronRight, Flame, Shield } from 'lucide-svelte';

  export let data;

  let searchQuery = '';
  let activeFilter = 'All';

  const filters = ['All', 'Music', 'Sports', 'Comedy', 'Festival'];

  $: filtered = (data.events || []).filter(e => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        e.title.toLowerCase().includes(q) ||
        (e.subtitle ?? '').toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }
    if (activeFilter === 'Music') return e.category === 'music';
    if (activeFilter === 'Sports') return e.category === 'sports';
    if (activeFilter === 'Comedy') return e.category === 'comedy';
    if (activeFilter === 'Festival') return e.category === 'festival';
    return true;
  });

  $: trendingEvent = filtered.find(e => e.trending && e.featured) || data.featuredEvent;
  $: allEvents = filtered.filter(e => !e.featured);

  function saleStatusClass(status) {
    if (!status) return '';
    const s = status.toLowerCase();
    if (s === 'selling fast') return 'selling-fast';
    if (s === 'limited') return 'limited';
    return 'available';
  }
</script>

<svelte:head>
  <title>Events - Maxess</title>
</svelte:head>

<div class="page-container">

  <!-- Status Bar -->
  <div class="status-bar">
    <span class="time">9:41</span>
    <div class="status-icons">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
        <rect x="0" y="1" width="3" height="10" rx="1" fill="currentColor"/>
        <rect x="4.5" y="3" width="3" height="8" rx="1" fill="currentColor"/>
        <rect x="9" y="5" width="3" height="6" rx="1" fill="currentColor"/>
        <rect x="13.5" y="7" width="3" height="4" rx="1" fill="currentColor"/>
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path d="M8 3.6C9.8 3.6 11.4 4.3 12.6 5.4L14 4C12.4 2.5 10.3 1.6 8 1.6C5.7 1.6 3.6 2.5 2 4L3.4 5.4C4.6 4.3 6.2 3.6 8 3.6Z" fill="currentColor"/>
        <path d="M8 7.2C9 7.2 9.9 7.6 10.6 8.2L12 6.8C10.9 5.8 9.5 5.2 8 5.2C6.5 5.2 5.1 5.8 4 6.8L5.4 8.2C6.1 7.6 7 7.2 8 7.2Z" fill="currentColor"/>
        <circle cx="8" cy="10.5" r="1.5" fill="currentColor"/>
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0" y="0" width="22" height="12" rx="3" stroke="currentColor" stroke-width="1" fill="none"/>
        <rect x="1.5" y="1.5" width="16" height="9" rx="2" fill="currentColor"/>
        <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor"/>
      </svg>
    </div>
  </div>

  <!-- Brand Header -->
  <header class="brand-header">
    <div class="brand-mark">
      <Shield size={20} fill="#FF5C00" color="#FF5C00" />
      <span class="brand-name">MAXESS</span>
    </div>
  </header>

  <!-- Page Title -->
  <h1 class="page-title">DISCOVER EVENTS</h1>

  <!-- Search Bar -->
  <div class="search-wrap">
    <div class="search-bar">
      <Search size={16} color="#8E8E93" />
      <input
        type="text"
        placeholder="Artists, venues, cities..."
        bind:value={searchQuery}
        class="search-input"
      />
    </div>
    <button class="filter-btn" aria-label="Filter">
      <SlidersHorizontal size={18} color="#FF5C00" />
    </button>
  </div>

  <!-- Filter Chips -->
  <div class="filter-chips">
    {#each filters as f}
      <button
        class="chip"
        class:active={activeFilter === f}
        on:click={() => { activeFilter = f; }}
      >
        {f}
      </button>
    {/each}
  </div>

  <!-- Trending Section -->
  {#if trendingEvent}
    <section class="section">
      <div class="section-head">
        <div class="section-title-row">
          <Flame size={16} color="#FF5C00" fill="#FF5C00" />
          <h2 class="section-title">TRENDING</h2>
        </div>
        {#if trendingEvent.sale_status}
          <span class="on-sale-badge">{trendingEvent.sale_status}</span>
        {/if}
      </div>

      <div class="trending-card" style="background-color: {trendingEvent.image_color}">
        <div class="trending-content">
          {#if trendingEvent.genre_tag}
            <span class="genre-tag">{trendingEvent.genre_tag}</span>
          {/if}
          <h2 class="trending-title">{trendingEvent.title}</h2>
          {#if trendingEvent.subtitle}
            <p class="trending-subtitle">{trendingEvent.subtitle}</p>
          {/if}
          <div class="trending-meta">
            <div class="meta-item">
              <MapPin size={12} />
              <span>{trendingEvent.location_display ?? trendingEvent.city}</span>
            </div>
            <div class="meta-item">
              <Calendar size={12} />
              <span>{trendingEvent.date_display ?? trendingEvent.date}</span>
            </div>
            {#if trendingEvent.heat_score}
              <div class="meta-item heat">
                <Flame size={12} fill="#FF5C00" color="#FF5C00" />
                <span class="heat-value">{trendingEvent.heat_score}</span>
              </div>
            {/if}
            {#if trendingEvent.match_percentage}
              <span class="match-badge">{trendingEvent.match_percentage}% match</span>
            {/if}
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Fans Like You Are Going -->
  <section class="fans-section">
    <button class="fans-header">
      <div class="fans-title-row">
        <Flame size={16} color="#FF5C00" fill="#FF5C00" />
        <span class="fans-title">Fans Like You Are Going</span>
      </div>
      <ChevronRight size={18} color="#8E8E93" />
    </button>
    <div class="fans-row">
      <div class="avatar-stack">
        {#each data.fansAttending as fan}
          <div class="avatar" style="background-color: {fan.avatar_color}">
            <span>{fan.avatar_initials}</span>
          </div>
        {/each}
      </div>
      <p class="fans-text">
        <strong>{data.fansAttending[0]?.name}, {data.fansAttending[1]?.name},</strong> +{data.fansAttendingCount} others
        <span class="fans-subtext">with your taste are attending.</span>
      </p>
    </div>
  </section>

  <!-- All Events -->
  {#if allEvents.length > 0}
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">ALL EVENTS</h2>
      </div>

      <div class="events-list">
        {#each allEvents as event}
          <div class="event-row">
            <div class="event-thumb" style="background-color: {event.image_color}"></div>
            <div class="event-info">
              <div class="event-name-row">
                <h3 class="event-name">{event.title}</h3>
                {#if event.sale_status}
                  <span class="sale-badge {saleStatusClass(event.sale_status)}">{event.sale_status}</span>
                {/if}
              </div>
              {#if event.subtitle}
                <p class="event-subtitle">{event.subtitle}</p>
              {/if}
              <div class="event-details">
                <div class="event-detail">
                  <MapPin size={11} color="#8E8E93" />
                  <span>{event.venue}</span>
                </div>
                <div class="event-detail">
                  <Calendar size={11} color="#8E8E93" />
                  <span>{event.date_display ?? event.date}</span>
                </div>
              </div>
              <div class="event-scores">
                {#if event.heat_score}
                  <div class="score-item">
                    <Flame size={11} fill="#FF5C00" color="#FF5C00" />
                    <span class="score-value">{event.heat_score}</span>
                  </div>
                {/if}
                {#if event.match_percentage}
                  <span class="match-pct">{event.match_percentage}% match</span>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/if}

</div>

<style>
  .page-container {
    background: var(--bg-primary);
    min-height: 100vh;
    padding-bottom: 20px;
    color: var(--text-primary);
  }

  /* Status Bar */
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
  }
  .status-icons {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  /* Brand Header */
  .brand-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 16px 12px;
  }
  .brand-mark {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .brand-name {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 2px;
    color: var(--text-primary);
  }

  /* Page Title */
  .page-title {
    font-size: 26px;
    font-weight: 800;
    color: var(--text-primary);
    padding: 0 16px 16px;
    letter-spacing: 0.5px;
    line-height: 1.1;
  }

  /* Search */
  .search-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 16px 14px;
  }
  .search-bar {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-input);
    border: 1px solid var(--border-gray);
    border-radius: 12px;
    padding: 12px 14px;
  }
  .search-input {
    flex: 1;
    font-size: 14px;
    color: var(--text-primary);
    background: transparent;
    border: none;
    outline: none;
    font-family: inherit;
  }
  .search-input::placeholder {
    color: var(--text-secondary);
  }
  .filter-btn {
    width: 44px;
    height: 44px;
    background: var(--bg-input);
    border: 1px solid var(--border-gray);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* Filter Chips */
  .filter-chips {
    display: flex;
    gap: 8px;
    padding: 0 16px 20px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .filter-chips::-webkit-scrollbar { display: none; }
  .chip {
    flex-shrink: 0;
    border: 1.5px solid var(--border-gray);
    border-radius: 99px;
    padding: 8px 18px;
    background: transparent;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;
    font-family: inherit;
  }
  .chip.active {
    border-color: #FF5C00;
    color: #FFFFFF;
    background: #FF5C00;
  }

  /* Sections */
  .section {
    margin-bottom: 20px;
  }
  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 12px;
  }
  .section-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .section-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .on-sale-badge {
    background: #FF5C00;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 99px;
  }

  /* Trending Card */
  .trending-card {
    position: relative;
    margin: 0 16px;
    border-radius: 16px;
    overflow: hidden;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .trending-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%);
    pointer-events: none;
  }
  .trending-content {
    position: relative;
    z-index: 1;
    padding: 20px;
  }
  .genre-tag {
    display: inline-block;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(4px);
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }
  .trending-title {
    font-size: 24px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.15;
    margin-bottom: 4px;
  }
  .trending-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    margin-bottom: 12px;
  }
  .trending-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: rgba(255,255,255,0.7);
  }
  .meta-item.heat {
    color: #FF5C00;
  }
  .heat-value {
    font-weight: 700;
    color: #FF5C00;
  }
  .match-badge {
    background: #FF5C00;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 99px;
  }

  /* Fans Section */
  .fans-section {
    padding: 0 16px 20px;
  }
  .fans-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0 0 10px;
  }
  .fans-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .fans-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
  }
  .fans-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .avatar-stack {
    display: flex;
    flex-shrink: 0;
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    margin-left: -8px;
  }
  .avatar:first-child {
    margin-left: 0;
  }
  .fans-text {
    font-size: 13px;
    color: var(--text-primary);
    line-height: 1.4;
  }
  .fans-text strong {
    font-weight: 600;
  }
  .fans-subtext {
    color: var(--text-secondary);
  }

  /* Events List */
  .events-list {
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .event-row {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border-gray);
  }
  .event-row:last-child {
    border-bottom: none;
  }
  .event-thumb {
    width: 72px;
    height: 72px;
    border-radius: 10px;
    flex-shrink: 0;
  }
  .event-info {
    flex: 1;
    min-width: 0;
  }
  .event-name-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 2px;
  }
  .event-name {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
  }
  .event-subtitle {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 4px;
    line-height: 1.3;
  }
  .event-details {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }
  .event-detail {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    color: var(--text-secondary);
  }
  .event-scores {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .score-item {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .score-value {
    font-size: 12px;
    font-weight: 700;
    color: #FF5C00;
  }
  .match-pct {
    font-size: 11px;
    font-weight: 600;
    color: #FF5C00;
  }

  /* Sale Status Badges */
  .sale-badge {
    flex-shrink: 0;
    font-size: 10px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    white-space: nowrap;
  }
  .sale-badge.selling-fast {
    background: rgba(255, 92, 0, 0.15);
    color: #FF5C00;
  }
  .sale-badge.available {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-secondary);
  }
  .sale-badge.limited {
    background: rgba(255, 59, 48, 0.15);
    color: #FF3B30;
  }
</style>
