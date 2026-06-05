<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ChevronRight, ChevronDown, TrendingUp, Users, Sparkles, MapPin, Navigation } from 'lucide-svelte';
  import NotificationBell from '$lib/components/NotificationBell.svelte';
  import { recMusic, recSports, activeCategory } from '$lib/stores/settings.js';
  import { followedArtists, toggleFollowArtist } from '$lib/stores/followedArtists.js';
  import { progressByArtist, hydrateProgress } from '$lib/stores/progressByArtist.js';
  import { locationMode, lastLocation, locationPromptStatus, requestLocation, isFreshEnough, isGeolocationAvailable } from '$lib/stores/location.js';
  import { classifyArtistTier, pointsToNextArtistTier } from '$lib/domain/xp.js';

  export let data;

  $: filteredEvents = (data.upcomingEvents ?? []).filter(e => e.category === $activeCategory).slice(0, 4);
  $: heroGradient = $activeCategory === 'sports'
    ? 'linear-gradient(135deg, #FF5C00 0%, #C13800 100%)'
    : 'linear-gradient(135deg, var(--color-music) 0%, var(--deeper-indigo) 100%)';
  $: nearYouThisWeek = data.nearYouThisWeek ?? [];

  // Rank comparison + improve-rank suggestions come from the server load.
  // Tiers (Elite, Superfan, etc.) are per-artist/team — see progressThreads.
  $: rankComparison = data.rankComparison;
  $: rawSuggestions = data.improveRankSuggestions ?? [];
  $: improveRankSuggestions = rawSuggestions.filter(s =>
    (s.category === 'music' && $recMusic) ||
    (s.category === 'sports' && $recSports)
  );

  // Server seed acts as a catalog of "fandoms you could follow". Followed status
  // drives visibility; persisted progress (points) survives unfollow/refollow.
  $: catalog = data.progressThreads ?? [];

  // On first visit, auto-follow the catalog seeds so the section isn't empty.
  // The version suffix (`.v2`) lets us force a one-time re-seed when the
  // reward system's tier math changes (current: 10K / 100K / 250K / 1M bands).
  // overwrite:true on hydrateProgress refreshes stale point values stored
  // under the old reward system so all four tier colors render correctly.
  onMount(() => {
    const SEEDED_KEY = 'maxess.followsSeeded.v2';
    if (localStorage.getItem(SEEDED_KEY) === '1') return;
    if (catalog.length === 0) return;
    hydrateProgress(catalog.map(c => ({
      id: c.id, name: c.name, category: c.category, points: c.points,
    })), true);
    const ids = catalog.map(c => c.id);
    followedArtists.update(list => Array.from(new Set([...list, ...ids])));
    localStorage.setItem(SEEDED_KEY, '1');
  });

  $: progressThreads = $followedArtists
    .map(id => {
      const stored = $progressByArtist[id];
      const seed = catalog.find(c => c.id === id);
      if (!stored && !seed) return null;
      const name = stored?.name ?? seed?.name ?? id;
      const category = (stored?.category ?? seed?.category ?? 'music');
      const points = stored?.points ?? seed?.points ?? 0;
      const tier = classifyArtistTier(points);
      const next = pointsToNextArtistTier(points);
      return {
        id, name, category, points,
        tier_name: tier.name,
        tier_color: tier.color_hex,
        next_tier_name: next.nextTier?.name ?? null,
        points_to_next: next.pointsNeeded,
        progress: next.progress,
      };
    })
    .filter(t => t !== null);

  let heroDropdownOpen = false;
  function toggleHeroDropdown() {
    heroDropdownOpen = !heroDropdownOpen;
  }

  // Near You: do we have a usable, recent coordinate? Drives the header label
  // and the inline "Use my location" chip. When the global mode is while_using
  // and the cache has gone stale, opening the page refreshes it transparently.
  $: locationActive = data.usingLocation === true
    || ($locationMode !== 'off' && isFreshEnough($lastLocation));

  // Push the captured coords into the URL so the server load re-runs with
  // latlong-biased Ticketmaster queries. Uses replaceState so the back button
  // doesn't fill up with location toggles.
  async function applyLocationToUrl(loc) {
    if (!loc) return;
    const next = new URL($page.url);
    next.searchParams.set('lat', loc.lat.toFixed(4));
    next.searchParams.set('lon', loc.lon.toFixed(4));
    const current = `${$page.url.searchParams.get('lat')},${$page.url.searchParams.get('lon')}`;
    const proposed = `${loc.lat.toFixed(4)},${loc.lon.toFixed(4)}`;
    if (current === proposed) return;
    await goto(`${next.pathname}${next.search}`, {
      replaceState: true,
      keepFocus: true,
      noScroll: true,
      invalidateAll: true,
    });
  }

  let nearYouRequesting = false;
  async function useMyLocationInline() {
    if (nearYouRequesting) return;
    nearYouRequesting = true;
    try {
      // The reactive $: below pushes coords into the URL when lastLocation updates.
      await requestLocation({ forceOnce: true });
    } finally {
      nearYouRequesting = false;
    }
  }

  // Whenever a fresh fix lands (initial mount with cached coords, while_using
  // refresh, or a one-shot capture), sync coords into the URL so the server
  // load re-runs with latlong-biased queries. The guard in applyLocationToUrl
  // prevents the resulting navigation from looping.
  $: if ($lastLocation && isFreshEnough($lastLocation)) applyLocationToUrl($lastLocation);

  onMount(() => {
    if ($locationMode === 'while_using' && !isFreshEnough($lastLocation)) {
      requestLocation();
    }
  });
</script>

<svelte:head>
  <title>Maxess - Your Fan Profile</title>
</svelte:head>

<div class="page-container">
  <!-- Header -->
  <header class="page-header">
    <div class="brand-section">
      <h1 class="brand-wordmark">Maxess</h1>
      <p class="brand-subtitle">Your fan profile</p>
    </div>
    <NotificationBell />
  </header>

  <!-- Music / Sports Toggle -->
  <div class="toggle-row">
    <button
      class="toggle-pill music"
      class:active={$activeCategory === 'music'}
      on:click={() => activeCategory.set('music')}
    >Music</button>
    <button
      class="toggle-pill sports"
      class:active={$activeCategory === 'sports'}
      on:click={() => activeCategory.set('sports')}
    >Sports Events</button>
  </div>

  {#if data.fan}
    <!-- Score Hero — click to expand improve-rank suggestions -->
    <button
      type="button"
      class="hero-score-card"
      class:open={heroDropdownOpen}
      aria-expanded={heroDropdownOpen}
      style:background={heroGradient}
      on:click={toggleHeroDropdown}
    >
      <div class="hero-content">
        <div class="hero-left">
          <span class="hero-label">YOUR SCORE</span>
          <div class="hero-score">{data.fan.xp_total.toLocaleString()}</div>
          <div class="hero-details">
            <span class="hero-detail">🔥 {data.fan.streak_days} day streak</span>
          </div>
        </div>
        <div class="hero-right">
          {#if rankComparison}
            <div class="comparison" aria-label="Score comparison">
              <span class="comparison-row">
                <Users size={11} />
                <span class="comparison-label">Peers</span>
                <span class="comparison-delta" class:up={rankComparison.delta_vs_peers >= 0} class:down={rankComparison.delta_vs_peers < 0}>
                  {rankComparison.delta_vs_peers >= 0 ? '+' : ''}{rankComparison.delta_vs_peers.toLocaleString()}
                </span>
              </span>
              <span class="comparison-row">
                <TrendingUp size={11} />
                <span class="comparison-label">Friends ahead</span>
                <span class="comparison-value">{rankComparison.friends_ahead}</span>
              </span>
            </div>
          {/if}
          <span class="hero-chevron" aria-hidden="true">
            <ChevronDown size={20} />
          </span>
        </div>
      </div>
    </button>

    {#if heroDropdownOpen}
      <div class="hero-dropdown" role="region" aria-label="Ways to climb the ranks">
        <div class="dropdown-head">
          <span class="dropdown-head-label">
            <Sparkles size={14} />
            <span>Climb your ranks</span>
          </span>
          <div class="rec-toggles" role="group" aria-label="Categories to recommend">
            <button
              type="button"
              class="rec-toggle music"
              class:on={$recMusic}
              aria-pressed={$recMusic}
              on:click={() => recMusic.update(v => !v)}
            >Music</button>
            <button
              type="button"
              class="rec-toggle sports"
              class:on={$recSports}
              aria-pressed={$recSports}
              on:click={() => recSports.update(v => !v)}
            >Sports</button>
          </div>
        </div>
        {#if !$recMusic && !$recSports}
          <p class="dropdown-empty">Turn on at least one category to see recommendations.</p>
        {:else if improveRankSuggestions.length > 0}
          <ul class="suggestion-list">
            {#each improveRankSuggestions as s}
              <li>
                <a href="/events/{s.event_id}" class="suggestion-row">
                  <span class="suggestion-cat" class:music={s.category === 'music'} class:sports={s.category === 'sports'}>
                    {s.category === 'music' ? 'Music' : 'Sports'}
                  </span>
                  <span class="suggestion-body">
                    <span class="suggestion-title">{s.title}</span>
                    <span class="suggestion-meta">{s.reason} · +{s.points_reward.toLocaleString()} pts</span>
                  </span>
                  <ChevronRight size={16} />
                </a>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="dropdown-empty">No {$recMusic && !$recSports ? 'music' : !$recMusic && $recSports ? 'sports' : ''} suggestions right now — check back after the next event drop.</p>
        {/if}
      </div>
    {/if}

    <!-- Progress threads — per-artist / per-team tiers -->
    <section class="section threads-section">
      <div class="section-header">
        <span class="section-label">YOUR PROGRESS</span>
        <a href="/profile" class="see-all">See all</a>
      </div>
      {#if progressThreads.length > 0}
        <div class="threads-list">
          {#each progressThreads as t (t.id)}
            <a href="/artist/{t.id}" class="thread-row">
              <span class="thread-tier" style="background: {t.tier_color}">{t.tier_name}</span>
              <span class="thread-info">
                <span class="thread-name">{t.name}</span>
                <span class="thread-bar-wrap">
                  <span class="thread-bar">
                    <span class="thread-bar-fill" style="width: {Math.round(t.progress * 100)}%; background: {t.tier_color}"></span>
                    <span class="thread-bar-text">{t.points.toLocaleString()} pts</span>
                  </span>
                  <span class="thread-bar-goal">
                    {#if t.next_tier_name}
                      {t.points_to_next.toLocaleString()} to {t.next_tier_name}
                    {:else}
                      Max tier
                    {/if}
                  </span>
                </span>
              </span>
              <ChevronRight size={16} color="#8E8E93" />
            </a>
          {/each}
        </div>
      {:else}
        <p class="empty-state">Follow an artist or team to start tracking progress. Your points are saved even if you unfollow.</p>
      {/if}
    </section>

    <!-- For You / Upcoming -->
    <section class="section">
      <div class="section-header">
        <span class="section-label">FOR YOU</span>
        <a href="/events" class="see-all">See All</a>
      </div>
      <div class="cards-scroll">
        {#each filteredEvents as event (event.event_id)}
          <a href="/events/{event.event_id}" class="for-you-card">
            <div class="for-you-image" style="background-color: {event.image_color || '#2667FF'}">
              <div class="for-you-overlay">
                <span class="for-you-tag {event.category === 'sports' ? 'sports' : 'music'}">{event.category === 'sports' ? 'SPORTS ACCESS' : 'MUSIC ACCESS'}</span>
                <div class="for-you-bottom">
                  <h3 class="for-you-name">{event.title}</h3>
                  <p class="for-you-date">{event.date_display || event.date}</p>
                </div>
              </div>
            </div>
          </a>
        {:else}
          <p class="empty-state">No upcoming {$activeCategory} events.</p>
        {/each}
      </div>
    </section>

    <!-- Near You This Week — music only. Hidden entirely when the user has
         declined location sharing. When pending or accepted-but-no-fix, the
         section stays hidden until a coordinate is captured (modal handles
         first-run; Profile settings handles subsequent opt-in). -->
    {#if $activeCategory === 'music' && locationActive && $locationPromptStatus !== 'declined'}
      <section class="section">
        <div class="section-header">
          <span class="section-label">
            NEAR YOU THIS WEEK
            <span class="near-you-loc-tag">· using your location</span>
          </span>
          <div class="near-you-header-right">
            <a href="/events" class="see-all">See All</a>
          </div>
        </div>
        {#if nearYouThisWeek.length > 0}
          <ul class="near-you-list">
            {#each nearYouThisWeek as event (event.event_id)}
              <li>
                <a href="/events/{event.event_id}" class="near-you-row">
                  <span class="near-you-date">
                    <span class="near-you-date-month">{(event.date_display || event.date).split(' ')[0] || ''}</span>
                    <span class="near-you-date-day">{(event.date_display || event.date).split(' ')[1]?.replace(',', '') || event.date.slice(-2)}</span>
                  </span>
                  <span class="near-you-info">
                    <span class="near-you-title">{event.title}</span>
                    <span class="near-you-meta">
                      <MapPin size={11} />
                      <span>{event.venue ?? event.location_display ?? 'Los Angeles'}{event.time ? ` · ${event.time}` : ''}</span>
                    </span>
                  </span>
                  <ChevronRight size={16} color="#8E8E93" />
                </a>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="empty-state">No music events near you this week — check back soon.</p>
        {/if}
      </section>
    {/if}

    <!-- Climb the Ranks -->
    <section class="section">
      <div class="climb-card">
        <div class="climb-content">
          <div class="climb-avatars">
            <div class="climb-avatar" style="background: #FF5C00">SM</div>
            <div class="climb-avatar" style="background: #2667FF">JK</div>
            <div class="climb-avatar" style="background: #3B28CC">AL</div>
          </div>
          <div class="climb-text">
            <span class="climb-title">Climb the ranks</span>
            <a href="/score" class="climb-link">See leaderboard <ChevronRight size={14} /></a>
          </div>
        </div>
      </div>
    </section>

  {:else}
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading your fan profile...</p>
    </div>
  {/if}
</div>

<style>
  .page-container {
    min-height: 100vh;
    background: var(--bg-primary);
  }

  /* ── Status Bar ─────────────────────────────── */
  /* ── Header ─────────────────────────────────── */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px 16px 16px;
  }

  .brand-section {
    display: flex;
    flex-direction: column;
  }

  .brand-wordmark {
    font-size: 32px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  .brand-subtitle {
    font-size: 15px;
    color: var(--text-secondary);
    margin: 2px 0 0;
  }

  /* ── Toggle ─────────────────────────────────── */
  .toggle-row {
    display: flex;
    gap: 8px;
    padding: 0 16px 20px;
  }

  .toggle-pill {
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    border: 1.5px solid var(--border-gray);
    background: var(--bg-card);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .toggle-pill.music.active {
    background: var(--deep-navy);
    color: #FFFFFF;
    border-color: var(--deep-navy);
  }

  .toggle-pill.sports.active {
    background: var(--action-orange);
    color: #FFFFFF;
    border-color: var(--action-orange);
  }

  /* ── Hero Score Card ────────────────────────── */
  .hero-score-card {
    display: block;
    width: calc(100% - 32px);
    margin: 0 16px 12px;
    border-radius: 20px;
    padding: 24px 20px;
    color: #FFFFFF;
    overflow: hidden;
    position: relative;
    border: none;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    transition: transform 0.15s ease, background 0.25s ease;
  }

  .hero-score-card:active { transform: scale(0.99); }

  .hero-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  .hero-label {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1.5px;
  }

  .hero-score {
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1px;
    color: #FFFFFF;
  }

  .hero-details {
    display: flex;
    gap: 12px;
  }

  .hero-detail {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }

  .hero-right {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  .comparison {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
  }

  .comparison-row {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.75);
  }

  .comparison-label { letter-spacing: 0.3px; }

  .comparison-value {
    font-weight: 700;
    color: #FFFFFF;
    font-size: 12px;
  }

  .comparison-delta {
    font-weight: 700;
    font-size: 12px;
  }

  .comparison-delta.up { color: #34D399; }
  .comparison-delta.down { color: #FCA5A5; }

  .hero-chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    transition: transform 0.2s ease;
  }

  .hero-score-card.open .hero-chevron { transform: rotate(180deg); }

  /* Hero dropdown — improve-rank suggestions */
  .hero-dropdown {
    margin: 0 16px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    overflow: hidden;
    animation: dropdownIn 0.2s ease-out;
  }

  @keyframes dropdownIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .dropdown-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    font-size: 12px;
    font-weight: 700;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border-bottom: 1px solid var(--border-subtle);
  }

  .dropdown-head-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .rec-toggles {
    display: inline-flex;
    gap: 6px;
    text-transform: none;
    letter-spacing: 0;
  }

  .rec-toggle {
    border: 1.5px solid var(--border-gray);
    background: transparent;
    color: var(--text-secondary);
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 99px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;
  }

  .rec-toggle.music.on {
    background: var(--color-music);
    border-color: var(--color-music);
    color: #FFFFFF;
  }

  .rec-toggle.sports.on {
    background: var(--color-sports);
    border-color: var(--color-sports);
    color: #FFFFFF;
  }

  .suggestion-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .suggestion-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid var(--border-subtle);
  }

  .suggestion-list li:last-child .suggestion-row { border-bottom: none; }

  .suggestion-cat {
    flex-shrink: 0;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    padding: 4px 8px;
    border-radius: 6px;
    color: #FFFFFF;
  }

  .suggestion-cat.music { background: var(--color-music); }
  .suggestion-cat.sports { background: var(--color-sports); }

  .suggestion-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .suggestion-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .suggestion-meta {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .dropdown-empty {
    padding: 16px 14px;
    color: var(--text-secondary);
    font-size: 13px;
    margin: 0;
  }

  /* Progress threads */
  .threads-section { margin-bottom: 24px; }

  .threads-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .thread-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    border-radius: 14px;
    text-decoration: none;
    color: inherit;
  }

  .thread-tier {
    flex-shrink: 0;
    font-size: 10px;
    font-weight: 700;
    color: #FFFFFF;
    padding: 4px 8px;
    border-radius: 6px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .thread-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .thread-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .thread-bar-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
  }

  .thread-bar {
    flex: 1;
    display: block;
    position: relative;
    height: 22px;
    background: var(--border-gray);
    border-radius: 11px;
    overflow: hidden;
  }

  .thread-bar-goal {
    flex-shrink: 0;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    white-space: nowrap;
  }

  .thread-bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 11px;
    transition: width 0.4s ease-out;
  }

  .thread-bar-text {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    font-size: 11px;
    font-weight: 600;
    color: #FFFFFF;
    mix-blend-mode: difference;
    white-space: nowrap;
  }

  /* ── Sections ───────────────────────────────── */
  .section {
    margin-bottom: 24px;
    padding: 0 16px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }

  .section-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-secondary);
    letter-spacing: 1.5px;
  }

  .see-all {
    font-size: 14px;
    font-weight: 600;
    color: var(--action-orange);
  }

  /* Near You — location chip + active tag */
  .near-you-header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .near-you-loc-tag {
    margin-left: 6px;
    font-size: 10px;
    font-weight: 600;
    color: var(--action-orange);
    letter-spacing: 0.5px;
    text-transform: none;
  }

  .near-you-loc-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    min-height: 28px;
    border-radius: 99px;
    border: 1px solid var(--border-gray);
    background: var(--bg-card);
    color: #1C1C1E;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .near-you-loc-chip:hover:not(:disabled) {
    background: var(--bg-input);
    color: var(--action-orange);
    border-color: var(--action-orange);
  }

  .near-you-loc-chip:disabled {
    opacity: 0.6;
    cursor: progress;
  }

  /* ── For You Cards ──────────────────────────── */
  .cards-scroll {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .cards-scroll::-webkit-scrollbar {
    display: none;
  }

  .for-you-card {
    min-width: 240px;
    flex-shrink: 0;
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
  }

  .for-you-image {
    height: 180px;
    position: relative;
  }

  .for-you-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
    padding: 14px;
    display: flex;
    flex-direction: column;
  }

  .for-you-tag {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.5px;
  }

  .for-you-tag.music { background: var(--color-music); }
  .for-you-tag.sports { background: var(--color-sports); }

  .for-you-bottom {
    margin-top: auto;
  }

  .for-you-name {
    font-size: 18px;
    font-weight: 700;
    color: white;
    margin: 0 0 4px;
    line-height: 1.2;
  }

  .for-you-date {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  .empty-state {
    color: var(--text-secondary);
    font-size: 14px;
    padding: 24px 4px;
    margin: 0;
  }

  /* ── Near You This Week ─────────────────────── */
  .near-you-list {
    list-style: none;
    margin: 0;
    padding: 0;
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    overflow: hidden;
  }

  .near-you-list li + li {
    border-top: 1px solid var(--border-gray);
  }

  .near-you-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    text-decoration: none;
    color: inherit;
    transition: background 0.15s ease;
  }

  .near-you-row:active {
    background: rgba(0, 0, 0, 0.04);
  }

  .near-you-date {
    flex-shrink: 0;
    width: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6px 0;
    border-radius: 10px;
    background: var(--deep-navy);
    color: #FFFFFF;
    line-height: 1;
  }

  .near-you-date-month {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    opacity: 0.85;
  }

  .near-you-date-day {
    font-size: 18px;
    font-weight: 700;
    margin-top: 2px;
  }

  .near-you-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .near-you-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .near-you-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--text-secondary);
  }

  .near-you-meta span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Climb the Ranks ────────────────────────── */
  .climb-card {
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    padding: 16px;
  }

  .climb-content {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .climb-avatars {
    display: flex;
    flex-shrink: 0;
  }

  .climb-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: white;
    border: 2px solid #FFFFFF;
    margin-left: -8px;
  }

  .climb-avatar:first-child {
    margin-left: 0;
  }

  .climb-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .climb-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .climb-link {
    font-size: 14px;
    font-weight: 600;
    color: var(--action-orange);
    display: flex;
    align-items: center;
    gap: 2px;
  }

  /* ── Loading State ──────────────────────────── */
  .loading-state {
    padding: 60px 16px;
    text-align: center;
    color: var(--text-secondary);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-gray);
    border-top-color: var(--action-orange);
    border-radius: 50%;
    margin: 0 auto 16px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-state p {
    font-size: 17px;
    margin: 0;
  }
</style>
