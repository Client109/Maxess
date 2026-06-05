<script>
  import { ChevronRight, ChevronUp, UserPlus, Search, Plus, Check } from 'lucide-svelte';
  import NotificationBell from '$lib/components/NotificationBell.svelte';
  import { showPointsGraph, activeCategory } from '$lib/stores/settings.js';
  import { followedSet, toggleFollowArtist } from '$lib/stores/followedArtists.js';
  import { locationMode, requestLocation, isGeolocationAvailable, acceptLocationPrompt, declineLocationPrompt, locationPromptStatus } from '$lib/stores/location.js';
  import InviteCard from '$lib/components/InviteCard.svelte';

  /** @type {{ value: 'off' | 'once' | 'while_using'; label: string; desc: string }[]} */
  const LOCATION_OPTIONS = [
    { value: 'off', label: 'Off', desc: 'Never asks' },
    { value: 'once', label: 'Once', desc: 'Uses now, then forgets' },
    { value: 'while_using', label: 'While Using', desc: 'Refreshes in foreground' },
  ];

  /** @param {'off' | 'once' | 'while_using'} next */
  async function selectLocationMode(next) {
    const prev = $locationMode;
    locationMode.set(next);
    if (prev === 'off' && (next === 'once' || next === 'while_using')) {
      // Opting in from Profile counts as accepting the consent gate, even if
      // the user previously declined the first-run modal. Hides the modal
      // forever and re-enables "near me" content app-wide.
      acceptLocationPrompt();
      await requestLocation();
    } else if (next === 'off' && $locationPromptStatus === 'accepted') {
      // Turning Off from an accepted state is a soft pause — we don't flip
      // status back to 'declined' (that would hide all "near me" sections
      // including the user's setting toggle context). Mode 'off' is enough.
    }
  }

  export let data;

  $: fan = data.fan;
  $: artists = data.artists || [];
  $: teams = data.teams || [];
  $: topConnection = data.topConnection;
  $: topTeamConnection = data.topTeamConnection;

  let howPointsOpen = true;
  let teamsQuery = '';

  $: isMusic = $activeCategory === 'music';
  $: categoryColor = isMusic ? 'var(--color-music)' : 'var(--color-sports)';
  $: filteredTeams = (() => {
    const q = teamsQuery.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter(t =>
      (t.sport ?? '').toLowerCase().includes(q) ||
      t.name.toLowerCase().includes(q)
    );
  })();
  $: rows = isMusic ? artists : filteredTeams;
  $: connection = isMusic ? topConnection : topTeamConnection;
  $: rowsLabel = isMusic ? 'All Artists' : 'All Teams';
  $: rowHref = (id) => isMusic ? `/artist/${id}` : `/score`;

  const tiers = [
    { name: 'Fan', range: '0 – 999', color: '#1A9E56', icon: '✓' },
    { name: 'Loyal', range: '1,000 – 2,999', color: '#1A9E56', icon: '✓' },
    { name: 'Superfan', range: '3,000 – 4,999', color: '#3B28CC', icon: '★' },
    { name: 'Elite', range: '5,000+', color: '#FF5C00', icon: '◆' },
  ];
</script>

<svelte:head>
  <title>Profile - Maxess</title>
</svelte:head>

<div class="page-container">
  <!-- Header -->
  <header class="page-header">
    <div>
      <h1 class="page-title">Profile</h1>
      <p class="subtitle">Your fan identity</p>
    </div>
    <NotificationBell />
  </header>

  {#if fan}
    <!-- User Card -->
    <div class="user-card">
      <div class="user-avatar">
        <span>{fan.avatar_initials || fan.name.split(' ').map(n => n[0]).join('')}</span>
      </div>
      <div class="user-info">
        <h2 class="user-name">{fan.name}</h2>
        <p class="user-points">{fan.xp_total.toLocaleString()} total points</p>
      </div>
      <ChevronRight size={20} color="#8E8E93" />
    </div>

    <!-- Invite friends — referral_program -->
    <InviteCard />

    <!-- Music / Sports Toggle -->
    <div class="toggle-container">
      <div class="toggle-pill" role="tablist" aria-label="Category">
        <button
          type="button"
          role="tab"
          class="toggle-option"
          class:active={isMusic}
          aria-selected={isMusic}
          on:click={() => activeCategory.set('music')}
        >Music</button>
        <button
          type="button"
          role="tab"
          class="toggle-option"
          class:active={!isMusic}
          aria-selected={!isMusic}
          on:click={() => activeCategory.set('sports')}
        >Sports</button>
        <div class="toggle-slider" class:right={!isMusic} style:background={categoryColor} aria-hidden="true"></div>
      </div>
    </div>

    <!-- Your Top Connection -->
    {#if connection}
      <section class="section">
        <div class="top-connection-card">
          <span class="connection-label" style:color={categoryColor}>YOUR TOP CONNECTION</span>
          <div class="connection-content">
            <div
              class="connection-avatar"
              style={connection.image ? `background-image: url('${connection.image}'); background-size: cover; background-position: center` : ''}
            >
              {#if !connection.image}
                <span>{connection.name[0]}</span>
              {/if}
            </div>
            <div class="connection-info">
              <h3 class="connection-name">{connection.name}</h3>
              <div class="connection-stats">
                <div class="conn-stat">
                  <span class="conn-stat-label">{isMusic ? 'Listener Percentile' : 'Fan Percentile'}</span>
                  <span class="conn-stat-value" style:color={categoryColor}>Top {connection.listener_percentile}%</span>
                </div>
                <div class="conn-divider"></div>
                <div class="conn-stat">
                  <span class="conn-stat-label">Total points</span>
                  <span class="conn-stat-value" style:color={categoryColor}>{connection.points.toLocaleString()} pts</span>
                </div>
              </div>
              <span class="connection-tier" style="background: {connection.tier_color}">
                ★ {connection.tier}
              </span>
            </div>
          </div>
        </div>
      </section>
    {/if}

    <!-- All Artists / Teams -->
    <section class="section">
      <h2 class="section-title">{rowsLabel}</h2>

      {#if !isMusic}
        <div class="teams-search-wrap">
          <div class="teams-search-bar">
            <Search size={16} color="#8E8E93" />
            <input
              type="text"
              class="teams-search-input"
              placeholder="Filter by sport (e.g. Basketball, Hockey)"
              bind:value={teamsQuery}
              aria-label="Filter teams by sport"
            />
            {#if teamsQuery}
              <button type="button" class="teams-search-clear" on:click={() => teamsQuery = ''} aria-label="Clear search">×</button>
            {/if}
          </div>
        </div>
      {/if}

      <div class="artists-list">
        {#if rows.length === 0}
          <div class="empty-row">
            {#if !isMusic && teamsQuery}
              No teams match "{teamsQuery}".
            {:else}
              No {isMusic ? 'artists' : 'teams'} yet.
            {/if}
          </div>
        {:else}
          {#each rows as row, i (row.id)}
            <div class="artist-row-wrap">
              <a href={rowHref(row.id)} class="artist-row">
                <span class="artist-rank">{i + 1}</span>
                <div
                  class="artist-avatar-small"
                  style={row.image ? `background-image: url('${row.image}'); background-size: cover; background-position: center` : ''}
                >
                  {#if !row.image}
                    <span>{row.name[0]}</span>
                  {/if}
                </div>
                <div class="artist-info">
                  <span class="artist-name">{row.name}</span>
                  {#if !isMusic && row.sport}
                    <span class="artist-sport">{row.sport}</span>
                  {/if}
                  <div class="artist-progress-bar">
                    <div class="artist-progress-fill" style="width: {row.progress * 100}%; background: {row.tier_color}"></div>
                  </div>
                </div>
                <div class="artist-points-col">
                  <span class="artist-pts" style="color: {row.tier_color}">{row.points.toLocaleString()} pts</span>
                  <span class="artist-to-next">{row.pts_to_next.toLocaleString()} pts to {row.next_tier}</span>
                </div>
                <span class="artist-tier-chip" style="background: {row.tier_color}">
                  {row.tier}
                </span>
              </a>
              <button
                type="button"
                class="row-follow-btn"
                class:row-follow-btn--on={$followedSet.has(row.id)}
                aria-pressed={$followedSet.has(row.id)}
                aria-label={$followedSet.has(row.id) ? `Unfollow ${row.name}` : `Follow ${row.name}`}
                on:click|preventDefault|stopPropagation={() =>
                  toggleFollowArtist(row.id, row.name, { category: isMusic ? 'music' : 'sports', points: row.points })
                }
              >
                {#if $followedSet.has(row.id)}
                  <Check size={12} /> Following
                {:else}
                  <Plus size={12} /> Follow
                {/if}
              </button>
            </div>
          {/each}
        {/if}
      </div>
    </section>

    <!-- How Points Work -->
    <section class="section">
      <button class="how-points-header" on:click={() => howPointsOpen = !howPointsOpen}>
        <h2 class="section-title no-pad">How Points Work</h2>
        <div class="chevron-wrap" class:open={howPointsOpen}>
          <ChevronUp size={18} color="#8E8E93" />
        </div>
      </button>

      {#if howPointsOpen}
        <div class="points-grid">
          <div class="points-item">
            <span class="points-icon">🎟️</span>
            <span class="points-desc">Attend a show</span>
            <span class="points-val orange">+500 pts</span>
          </div>
          <div class="points-item">
            <span class="points-icon">🎧</span>
            <span class="points-desc">Listening time</span>
            <span class="points-val orange">+10 pts/hr</span>
          </div>
          <div class="points-item">
            <span class="points-icon">❓</span>
            <span class="points-desc">Trivia correct answer</span>
            <span class="points-val orange">+50 pts</span>
          </div>
          <div class="points-item">
            <span class="points-icon">🔥</span>
            <span class="points-desc">Streak bonus</span>
            <span class="points-val orange">+200 pts</span>
          </div>
        </div>

        <!-- Tier Legend -->
        <div class="tier-legend">
          {#each tiers as tier}
            <div class="tier-item">
              <div class="tier-dot" style="background: {tier.color}">
                <span>{tier.icon}</span>
              </div>
              <span class="tier-name">{tier.name}</span>
              <span class="tier-range">{tier.range}</span>
            </div>
          {/each}
        </div>
      {/if}
    </section>

    <!-- Settings -->
    <section class="section">
      <h2 class="section-title">Settings</h2>
      <div class="settings-card">
        <div class="setting-row">
          <div class="setting-text">
            <span class="setting-label">Show points graph</span>
            <span class="setting-desc">Display a 14-day points trend on the Score page.</span>
          </div>
          <button
            class="switch"
            class:on={$showPointsGraph}
            role="switch"
            aria-checked={$showPointsGraph}
            aria-label="Show points graph"
            on:click={() => showPointsGraph.update(v => !v)}
          >
            <span class="switch-thumb"></span>
          </button>
        </div>

        <div class="setting-row setting-row--stack">
          <div class="setting-text">
            <span class="setting-label">Location sharing</span>
            <span class="setting-desc">Off — never asks. Once — uses your location now, then forgets. While Using — refreshes when you open Near You.</span>
          </div>
          {#if isGeolocationAvailable()}
            <div class="loc-segmented" role="group" aria-label="Location sharing mode">
              {#each LOCATION_OPTIONS as opt}
                <button
                  type="button"
                  class="loc-segmented-btn"
                  class:loc-segmented-btn--active={$locationMode === opt.value}
                  aria-pressed={$locationMode === opt.value}
                  on:click={() => selectLocationMode(opt.value)}
                >{opt.label}</button>
              {/each}
            </div>
          {:else}
            <div class="loc-segmented" aria-disabled="true">
              <span class="loc-unavailable">Not supported on this device</span>
            </div>
          {/if}
        </div>
      </div>
    </section>

    <!-- Follow a New Artist / Team -->
    <div class="follow-cta">
      <button class="follow-btn" style:background={categoryColor}>
        <UserPlus size={18} />
        Follow a new {isMusic ? 'artist' : 'team'}
      </button>
    </div>
  {:else}
    <div class="empty">
      <p>Unable to load profile. Please try again later.</p>
    </div>
  {/if}
</div>

<style>
  .page-container {
    background: var(--bg-primary, #FAFAFA);
    min-height: 100vh;
    padding-bottom: 100px;
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
    color: #1C1C1E;
  }

  .subtitle {
    color: #8E8E93;
    font-size: 14px;
    margin: 4px 0 0;
  }

  /* User Card */
  .user-card {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0 16px 16px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    padding: 16px;
  }

  .user-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #3B28CC;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .user-info { flex: 1; }

  .user-name {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #1C1C1E;
  }

  .user-points {
    font-size: 13px;
    color: #8E8E93;
    margin: 2px 0 0;
  }

  /* Toggle */
  .toggle-container { padding: 0 16px 20px; }

  .toggle-pill {
    position: relative;
    display: flex;
    background: #E5E5EA;
    border-radius: 99px;
    padding: 4px;
    width: 100%;
    height: 44px;
    font-family: inherit;
  }

  .toggle-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 600;
    color: #8E8E93;
    z-index: 2;
    position: relative;
    cursor: pointer;
    transition: color 0.2s;
    background: transparent;
    border: none;
    font-family: inherit;
    padding: 0;
  }

  .toggle-option.active { color: #FFFFFF; }

  .toggle-slider {
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(50% - 4px);
    height: 36px;
    border-radius: 99px;
    transition: transform 0.2s, background 0.2s;
    z-index: 1;
  }

  .toggle-slider.right { transform: translateX(100%); }

  /* Sections */
  .section { margin-bottom: 24px; }

  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #1C1C1E;
    margin: 0;
    padding: 0 16px;
  }

  .section-title.no-pad { padding: 0; }

  /* Top Connection */
  .top-connection-card {
    margin: 0 16px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    padding: 16px;
  }

  .connection-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #3B28CC;
    display: block;
    margin-bottom: 12px;
  }

  .connection-content {
    display: flex;
    gap: 14px;
  }

  .connection-avatar {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 28px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .connection-info { flex: 1; }

  .connection-name {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px;
    color: #1C1C1E;
  }

  .connection-stats {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .conn-stat {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .conn-stat-label {
    font-size: 10px;
    color: #8E8E93;
  }

  .conn-stat-value {
    font-size: 14px;
    font-weight: 700;
  }

  .conn-divider {
    width: 1px;
    height: 28px;
    background: #E5E5EA;
  }

  .connection-tier {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #FFFFFF;
    padding: 4px 12px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 600;
  }

  /* Teams search */
  .teams-search-wrap {
    padding: 12px 16px 0;
  }

  .teams-search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #F2F2F7;
    border: 1px solid #E5E5EA;
    border-radius: 12px;
    padding: 10px 12px;
  }

  .teams-search-input {
    flex: 1;
    font-size: 14px;
    color: #1C1C1E;
    background: transparent;
    border: none;
    outline: none;
    font-family: inherit;
    min-width: 0;
  }

  .teams-search-input::placeholder { color: #8E8E93; }

  .teams-search-clear {
    background: none;
    border: none;
    color: #8E8E93;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    padding: 0 2px;
    font-family: inherit;
  }

  .artist-sport {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    color: #8E8E93;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  /* All Artists */
  .artists-list {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    margin: 12px 16px 0;
    overflow: hidden;
  }

  .artist-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    border-bottom: 1px solid #F2F2F7;
    text-decoration: none;
    color: inherit;
  }

  .artist-row:last-child { border-bottom: none; }

  .artist-rank {
    font-size: 14px;
    font-weight: 600;
    color: #8E8E93;
    min-width: 20px;
    text-align: center;
  }

  .artist-avatar-small {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .artist-info {
    flex: 1;
    min-width: 0;
  }

  .artist-name {
    font-size: 14px;
    font-weight: 600;
    color: #1C1C1E;
    display: block;
    margin-bottom: 6px;
  }

  .artist-progress-bar {
    height: 4px;
    background: #E5E5EA;
    border-radius: 2px;
    overflow: hidden;
  }

  .artist-progress-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.6s;
  }

  .artist-points-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1px;
    flex-shrink: 0;
  }

  .artist-pts {
    font-size: 13px;
    font-weight: 700;
  }

  .artist-to-next {
    font-size: 10px;
    color: #8E8E93;
  }

  .empty-row {
    padding: 24px 16px;
    text-align: center;
    color: #8E8E93;
    font-size: 13px;
  }

  .artist-tier-chip {
    font-size: 10px;
    font-weight: 700;
    color: #FFFFFF;
    padding: 3px 8px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  /* Row wrapper: lets the per-row follow chip sit alongside the link. */
  .artist-row-wrap {
    position: relative;
    border-bottom: 1px solid #F2F2F7;
  }
  .artist-row-wrap:last-child { border-bottom: none; }
  .artist-row-wrap .artist-row {
    padding-right: 100px;
    border-bottom: none;
  }

  .row-follow-btn {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    border-radius: 99px;
    border: 1px solid #E5E5EA;
    background: #FFFFFF;
    color: #1C1C1E;
    font-size: 11px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .row-follow-btn:hover { background: #F2F2F7; }

  .row-follow-btn--on {
    background: #1C1C1E;
    color: #FFFFFF;
    border-color: #1C1C1E;
  }
  .row-follow-btn--on:hover { background: #2C2C2E; }

  /* How Points Work */
  .how-points-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    margin-bottom: 12px;
  }

  .chevron-wrap { transition: transform 0.2s; }
  .chevron-wrap:not(.open) { transform: rotate(180deg); }

  .points-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .points-item {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .points-icon { font-size: 18px; margin-bottom: 2px; }

  .points-desc {
    font-size: 12px;
    color: #1C1C1E;
    font-weight: 500;
  }

  .points-val {
    font-size: 13px;
    font-weight: 700;
  }

  .points-val.orange { color: #FF5C00; }

  /* Tier Legend */
  .tier-legend {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    gap: 8px;
  }

  .tier-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1;
  }

  .tier-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 12px;
  }

  .tier-name {
    font-size: 11px;
    font-weight: 600;
    color: #1C1C1E;
  }

  .tier-range {
    font-size: 9px;
    color: #8E8E93;
    text-align: center;
  }

  /* Settings */
  .settings-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    margin: 12px 16px 0;
    overflow: hidden;
  }

  .setting-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
  }

  .setting-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .setting-label {
    font-size: 15px;
    font-weight: 600;
    color: #1C1C1E;
  }

  .setting-desc {
    font-size: 12px;
    color: #8E8E93;
  }

  .switch {
    width: 44px;
    height: 26px;
    border-radius: 99px;
    border: none;
    background: #E5E5EA;
    position: relative;
    cursor: pointer;
    padding: 0;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .switch.on { background: #FF5C00; }

  .switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
  }

  .switch.on .switch-thumb { transform: translateX(18px); }

  /* Location segmented control */
  .setting-row--stack {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    border-top: 1px solid #F0F0F0;
  }

  .loc-segmented {
    display: flex;
    gap: 0;
    background: #F2F2F7;
    border-radius: 10px;
    padding: 3px;
    width: 100%;
  }

  .loc-segmented-btn {
    flex: 1;
    min-height: 44px;
    border: none;
    background: transparent;
    color: #1C1C1E;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  }

  .loc-segmented-btn:hover { color: #FF5C00; }

  .loc-segmented-btn--active {
    background: #FFFFFF;
    color: #FF5C00;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .loc-unavailable {
    font-size: 13px;
    color: #8E8E93;
    padding: 12px;
    text-align: center;
    flex: 1;
  }

  /* Follow CTA */
  .follow-cta { padding: 0 16px; }

  .follow-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px;
    color: #FFFFFF;
    border: none;
    border-radius: 99px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }

  .empty {
    text-align: center;
    padding: 60px 16px;
    color: #8E8E93;
  }
</style>
