<script>
  import { ChevronRight, ChevronUp, UserPlus } from 'lucide-svelte';
  import NotificationBell from '$lib/components/NotificationBell.svelte';

  export let data;

  $: fan = data.fan;
  $: artists = data.artists || [];
  $: topConnection = data.topConnection;

  let activeCategory = 'music';
  let howPointsOpen = true;

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

    <!-- Music / Sports Toggle -->
    <div class="toggle-container">
      <button class="toggle-pill">
        <span
          class="toggle-option"
          class:active={activeCategory === 'music'}
          on:click={() => activeCategory = 'music'}
        >Music</span>
        <span
          class="toggle-option"
          class:active={activeCategory === 'sports'}
          on:click={() => activeCategory = 'sports'}
        >Sports</span>
        <div class="toggle-slider" class:right={activeCategory === 'sports'}></div>
      </button>
    </div>

    <!-- Your Top Connection -->
    {#if topConnection}
      <section class="section">
        <div class="top-connection-card">
          <span class="connection-label">YOUR TOP CONNECTION</span>
          <div class="connection-content">
            <div class="connection-avatar">
              <span>{topConnection.name[0]}</span>
            </div>
            <div class="connection-info">
              <h3 class="connection-name">{topConnection.name}</h3>
              <div class="connection-stats">
                <div class="conn-stat">
                  <span class="conn-stat-label">Listener Percentile</span>
                  <span class="conn-stat-value blue">Top {topConnection.listener_percentile}%</span>
                </div>
                <div class="conn-divider"></div>
                <div class="conn-stat">
                  <span class="conn-stat-label">Total points</span>
                  <span class="conn-stat-value blue">{topConnection.points.toLocaleString()} pts</span>
                </div>
              </div>
              <span class="connection-tier" style="background: {topConnection.tier_color}">
                ★ {topConnection.tier}
              </span>
            </div>
          </div>
        </div>
      </section>
    {/if}

    <!-- All Artists -->
    <section class="section">
      <h2 class="section-title">All Artists</h2>
      <div class="artists-list">
        {#each artists as artist, i}
          <a href="/artist/{artist.id}" class="artist-row">
            <span class="artist-rank">{i + 1}</span>
            <div class="artist-avatar-small">
              <span>{artist.name[0]}</span>
            </div>
            <div class="artist-info">
              <span class="artist-name">{artist.name}</span>
              <div class="artist-progress-bar">
                <div class="artist-progress-fill" style="width: {artist.progress * 100}%; background: {artist.tier_color}"></div>
              </div>
            </div>
            <div class="artist-points-col">
              <span class="artist-pts" style="color: {artist.tier_color}">{artist.points.toLocaleString()} pts</span>
              <span class="artist-to-next">{artist.pts_to_next.toLocaleString()} pts to {artist.next_tier}</span>
            </div>
            <span class="artist-tier-chip" style="background: {artist.tier_color}">
              {artist.tier}
            </span>
          </a>
        {/each}
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

    <!-- Follow a New Artist -->
    <div class="follow-cta">
      <button class="follow-btn">
        <UserPlus size={18} />
        Follow a new artist
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
    border: none;
    cursor: pointer;
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
  }

  .toggle-option.active { color: #FFFFFF; }

  .toggle-slider {
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(50% - 4px);
    height: 36px;
    background: #3B28CC;
    border-radius: 99px;
    transition: transform 0.2s;
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

  .conn-stat-value.blue { color: #3B28CC; }

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

  .artist-tier-chip {
    font-size: 10px;
    font-weight: 700;
    color: #FFFFFF;
    padding: 3px 8px;
    border-radius: 6px;
    flex-shrink: 0;
  }

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

  /* Follow CTA */
  .follow-cta { padding: 0 16px; }

  .follow-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px;
    background: #3B28CC;
    color: #FFFFFF;
    border: none;
    border-radius: 99px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
  }

  .empty {
    text-align: center;
    padding: 60px 16px;
    color: #8E8E93;
  }
</style>
