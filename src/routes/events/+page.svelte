<script>
  import { Search, MapPin, Calendar, Flame, Bell, ChevronRight, ExternalLink } from 'lucide-svelte';
  import NotificationBell from '$lib/components/NotificationBell.svelte';

  export let data;

  let searchQuery = '';
  let activeFilter = 'For you';

  const filters = ['For you', 'Music', 'Sports', 'This week'];

  // Filter events based on search and category
  $: allEvents = (data.events || []).filter(e => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = e.title.toLowerCase().includes(q) ||
        (e.subtitle ?? '').toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeFilter === 'Music' && e.category !== 'music') return false;
    if (activeFilter === 'Sports' && e.category !== 'sports') return false;
    if (activeFilter === 'This week') {
      const eventDate = new Date(e.date);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() + 7);
      if (eventDate > weekEnd) return false;
    }
    return true;
  });

  // Featured event (trending + featured)
  $: featuredEvent = allEvents.find(e => e.trending && e.featured) || data.featuredEvent;

  // Trending events (high heat score, not the featured one)
  $: trendingEvents = allEvents
    .filter(e => e.heat_score && e.heat_score >= 85 && e !== featuredEvent)
    .sort((a, b) => (b.heat_score || 0) - (a.heat_score || 0))
    .slice(0, 4);

  // Upcoming for you (not featured, not trending, sorted by date)
  $: upcomingEvents = allEvents
    .filter(e => e !== featuredEvent && !trendingEvents.includes(e))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  // Day strip for "near you" section — current week starting today
  $: dayStrip = (() => {
    const days = [];
    const now = new Date();
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      days.push({
        label: dayNames[d.getDay()],
        date: `${monthNames[d.getMonth()]} ${d.getDate()}`,
        dateNum: d.getDate(),
        iso,
        isToday: i === 0
      });
    }
    return days;
  })();

  let selectedDay = 0;

  // Any events in LA this week — gates whether the section appears at all
  $: weekEventsNearYou = allEvents.filter(e =>
    e.city === 'Los Angeles' && dayStrip.some(d => d.iso === e.date)
  );

  // Near you events for the currently selected day
  $: selectedDayIso = dayStrip[selectedDay]?.iso;
  $: nearYouEvents = weekEventsNearYou
    .filter(e => e.date === selectedDayIso)
    .slice(0, 4);
</script>

<svelte:head>
  <title>Events - Maxess</title>
</svelte:head>

<div class="page-container">
  <!-- Header -->
  <header class="page-header">
    <div>
      <h1 class="page-title">Events</h1>
      <p class="subtitle">Discover music + sports for you</p>
    </div>
    <NotificationBell />
  </header>

  <!-- Search Bar -->
  <div class="search-wrap">
    <div class="search-bar">
      <Search size={16} color="#8E8E93" />
      <input
        type="text"
        placeholder="Search artists, teams, venues..."
        bind:value={searchQuery}
        class="search-input"
      />
    </div>
  </div>

  <!-- Filter Chips -->
  <div class="filter-chips">
    {#each filters as f}
      <button
        class="chip {f === 'Music' ? 'music' : f === 'Sports' ? 'sports' : ''}"
        class:active={activeFilter === f}
        on:click={() => activeFilter = f}
      >
        {f}
      </button>
    {/each}
  </div>

  <!-- Featured Event -->
  {#if featuredEvent}
    <section class="section">
      <a
        href={featuredEvent.external_url || `/events/${featuredEvent.event_id}`}
        target={featuredEvent.external_url ? '_blank' : undefined}
        rel={featuredEvent.external_url ? 'noopener noreferrer' : undefined}
        class="featured-card"
        style="background-color: {featuredEvent.image_color}; {featuredEvent.image_url ? `background-image: url(${featuredEvent.image_url}); background-size: cover; background-position: center;` : ''}"
      >
        <div class="featured-overlay">
          <span class="featured-badge">★ FEATURED</span>
          <h2 class="featured-title">{featuredEvent.title}</h2>
          {#if featuredEvent.subtitle}
            <p class="featured-subtitle">{featuredEvent.subtitle}</p>
          {/if}
          <div class="featured-meta">
            <span class="featured-meta-item">
              <Calendar size={12} />
              {featuredEvent.date_display ?? featuredEvent.date}
            </span>
            <span class="featured-meta-item">
              <MapPin size={12} />
              {featuredEvent.location_display ?? featuredEvent.city}
            </span>
          </div>
          <button class="notify-btn" on:click|preventDefault|stopPropagation>
            <Bell size={14} />
            Notify me
          </button>
        </div>
      </a>
    </section>
  {/if}

  <!-- Trending Now -->
  {#if trendingEvents.length > 0}
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Trending now</h2>
        <a href="/events" class="view-all">View all</a>
      </div>
      <div class="trending-scroll">
        {#each trendingEvents as event}
          <a
            href={event.external_url || `/events/${event.event_id}`}
            target={event.external_url ? '_blank' : undefined}
            rel={event.external_url ? 'noopener noreferrer' : undefined}
            class="trending-card"
            style="background-color: {event.image_color}; {event.image_url ? `background-image: url(${event.image_url}); background-size: cover; background-position: center;` : ''}"
          >
            <div class="trending-overlay">
              {#if event.access_type}
                <span class="access-chip {event.category === 'sports' ? 'sports' : 'music'}">{event.access_type}</span>
              {/if}
              <h3 class="trending-name">{event.title}</h3>
              <div class="trending-meta">
                <span><Calendar size={10} /> {event.date_display ?? event.date}</span>
                <span><MapPin size={10} /> {event.location_display ?? event.city}</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Upcoming for You -->
  {#if upcomingEvents.length > 0}
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Upcoming for you</h2>
        <a href="/events" class="view-all">View all</a>
      </div>
      <div class="upcoming-list">
        {#each upcomingEvents as event}
          <a
            href={event.external_url || `/events/${event.event_id}`}
            target={event.external_url ? '_blank' : undefined}
            rel={event.external_url ? 'noopener noreferrer' : undefined}
            class="upcoming-row"
          >
            <div class="upcoming-thumb" style="background-color: {event.image_color}; {event.image_url ? `background-image: url(${event.image_url}); background-size: cover; background-position: center;` : ''}"></div>
            <div class="upcoming-info">
              <h3 class="upcoming-name">{event.title}</h3>
              <div class="upcoming-meta">
                <span><Calendar size={10} color="#8E8E93" /> {event.date_display ?? event.date}</span>
                <span>•</span>
                <span>{event.venue}</span>
              </div>
            </div>
            {#if event.sale_status}
              <span class="status-chip {event.sale_status === 'Selling Fast' ? 'hot' : event.sale_status === 'Limited' ? 'limited' : ''}">{event.sale_status}</span>
            {/if}
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Near You This Week -->
  {#if weekEventsNearYou.length > 0}
    <section class="section near-you">
      <div class="section-head">
        <h2 class="section-title">Near you this week</h2>
      </div>

      <!-- Day Strip -->
      <div class="day-strip">
        {#each dayStrip as day, i}
          <button
            class="day-item"
            class:active={selectedDay === i}
            on:click={() => selectedDay = i}
          >
            <span class="day-label">{day.label}</span>
            <span class="day-date">{day.date}</span>
          </button>
        {/each}
      </div>

      <!-- Near You Grid -->
      {#if nearYouEvents.length > 0}
        <div class="near-grid">
          {#each nearYouEvents.slice(0, 2) as event}
            <a
              href={event.external_url || `/events/${event.event_id}`}
              target={event.external_url ? '_blank' : undefined}
              rel={event.external_url ? 'noopener noreferrer' : undefined}
              class="near-card"
              style="background-color: {event.image_color}; {event.image_url ? `background-image: url(${event.image_url}); background-size: cover; background-position: center;` : ''}"
            >
              <div class="near-overlay">
                <h3 class="near-name">{event.title}</h3>
                <span class="near-meta">
                  <Calendar size={10} />
                  {event.date_display ?? event.date} • {event.venue}
                </span>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <p class="near-empty">No events on {dayStrip[selectedDay]?.date}.</p>
      {/if}
    </section>
  {/if}
</div>

<style>
  .page-container {
    background: var(--bg-primary, #FAFAFA);
    min-height: 100vh;
    padding-bottom: 100px;
    color: #1C1C1E;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 16px 12px;
  }

  .page-title {
    font-size: 34px;
    font-weight: 700;
    margin: 0;
  }

  .subtitle {
    color: #8E8E93;
    font-size: 14px;
    margin: 4px 0 0;
  }

  /* Search */
  .search-wrap {
    padding: 0 16px 14px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #F2F2F7;
    border: 1px solid #E5E5EA;
    border-radius: 12px;
    padding: 12px 14px;
  }

  .search-input {
    flex: 1;
    font-size: 14px;
    color: #1C1C1E;
    background: transparent;
    border: none;
    outline: none;
    font-family: inherit;
  }

  .search-input::placeholder { color: #8E8E93; }

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
    border: 1.5px solid #E5E5EA;
    border-radius: 99px;
    padding: 8px 18px;
    background: transparent;
    color: #8E8E93;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    font-family: inherit;
  }

  .chip.active {
    border-color: var(--action-orange);
    color: #FFFFFF;
    background: var(--action-orange);
  }

  .chip.music.active {
    border-color: var(--color-music);
    background: var(--color-music);
  }

  .chip.sports.active {
    border-color: var(--color-sports);
    background: var(--color-sports);
  }

  /* Sections */
  .section {
    margin-bottom: 24px;
  }

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 10px;
  }

  .section-title {
    font-size: 17px;
    font-weight: 700;
    color: #1C1C1E;
  }

  .view-all {
    font-size: 13px;
    font-weight: 600;
    color: #FF5C00;
    text-decoration: none;
  }

  /* Featured Card */
  .featured-card {
    display: block;
    margin: 0 16px;
    border-radius: 16px;
    overflow: hidden;
    min-height: 200px;
    position: relative;
    text-decoration: none;
    color: #FFFFFF;
  }

  .featured-overlay {
    position: relative;
    z-index: 1;
    padding: 20px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
  }

  .featured-badge {
    display: inline-block;
    background: #FF5C00;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.3px;
    margin-bottom: 8px;
    align-self: flex-start;
  }

  .featured-title {
    font-size: 24px;
    font-weight: 800;
    line-height: 1.15;
    margin: 0 0 4px;
  }

  .featured-subtitle {
    font-size: 14px;
    opacity: 0.8;
    margin: 0 0 10px;
  }

  .featured-meta {
    display: flex;
    gap: 14px;
    margin-bottom: 12px;
  }

  .featured-meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    opacity: 0.8;
  }

  .notify-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #FF5C00;
    color: #FFFFFF;
    border: none;
    border-radius: 99px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    align-self: flex-start;
    font-family: inherit;
  }

  /* Trending Scroll */
  .trending-scroll {
    display: flex;
    gap: 12px;
    padding: 0 16px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .trending-scroll::-webkit-scrollbar { display: none; }

  .trending-card {
    flex-shrink: 0;
    width: 200px;
    height: 140px;
    border-radius: 14px;
    overflow: hidden;
    text-decoration: none;
    color: #FFFFFF;
    position: relative;
  }

  .trending-overlay {
    position: relative;
    z-index: 1;
    padding: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 100%);
  }

  .access-chip {
    display: inline-block;
    font-size: 8px;
    font-weight: 700;
    padding: 3px 6px;
    border-radius: 4px;
    letter-spacing: 0.3px;
    margin-bottom: 6px;
    align-self: flex-start;
  }

  .access-chip.music { background: var(--color-music); }
  .access-chip.sports { background: var(--color-sports); }

  .trending-name {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 4px;
    line-height: 1.2;
  }

  .trending-meta {
    display: flex;
    gap: 8px;
    font-size: 10px;
    opacity: 0.8;
  }

  .trending-meta span {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  /* Upcoming List */
  .upcoming-list {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    margin: 0 16px;
    overflow: hidden;
  }

  .upcoming-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-bottom: 1px solid #F2F2F7;
    text-decoration: none;
    color: inherit;
  }

  .upcoming-row:last-child { border-bottom: none; }

  .upcoming-thumb {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  .upcoming-info {
    flex: 1;
    min-width: 0;
  }

  .upcoming-name {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 3px;
    color: #1C1C1E;
  }

  .upcoming-meta {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    color: #8E8E93;
  }

  .upcoming-meta span {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .status-chip {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 6px;
    flex-shrink: 0;
    background: rgba(0, 0, 0, 0.05);
    color: #8E8E93;
  }

  .status-chip.hot {
    background: rgba(255, 92, 0, 0.12);
    color: #FF5C00;
  }

  .status-chip.limited {
    background: rgba(255, 59, 48, 0.12);
    color: #FF3B30;
  }

  /* Near You */
  .day-strip {
    display: flex;
    gap: 4px;
    padding: 0 16px 14px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .day-strip::-webkit-scrollbar { display: none; }

  .day-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 12px;
    border: 1.5px solid #E5E5EA;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    font-family: inherit;
    transition: all 0.15s;
  }

  .day-item.active {
    background: #FF5C00;
    border-color: #FF5C00;
    color: #FFFFFF;
  }

  .day-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #8E8E93;
  }

  .day-item.active .day-label { color: rgba(255,255,255,0.8); }

  .day-date {
    font-size: 11px;
    font-weight: 600;
    color: #1C1C1E;
  }

  .day-item.active .day-date { color: #FFFFFF; }

  .near-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0 16px;
  }

  .near-card {
    border-radius: 14px;
    overflow: hidden;
    height: 120px;
    text-decoration: none;
    color: #FFFFFF;
    position: relative;
  }

  .near-overlay {
    position: relative;
    z-index: 1;
    padding: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 100%);
  }

  .near-name {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 4px;
    line-height: 1.2;
  }

  .near-meta {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    opacity: 0.8;
  }

  .near-empty {
    margin: 0 16px;
    padding: 24px 16px;
    text-align: center;
    color: #8E8E93;
    font-size: 13px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 14px;
  }
</style>
