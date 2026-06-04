<script>
  import { Star, Clock, Crown, ChevronRight, Zap, Shield } from 'lucide-svelte';
  import NotificationBell from '$lib/components/NotificationBell.svelte';
  import { classifyTier } from '$lib/domain/xp.js';

  export let data;

  $: fan = data.fan;
  $: currentTier = fan ? classifyTier(fan.xp_total) : { name: 'Fan' };
</script>

<svelte:head>
  <title>Access - Maxess</title>
</svelte:head>

<div class="page-container">
  <!-- Header -->
  <header class="page-header">
    <div>
      <h1 class="page-title">Access</h1>
      <p class="subtitle">Presales, perks, and your progress</p>
    </div>
    <NotificationBell />
  </header>

  {#if fan}
    <!-- Elite Access KPI Strip -->
    <div class="kpi-strip">
      <div class="kpi-item">
        <div class="kpi-icon orange">
          <Zap size={16} />
        </div>
        <div class="kpi-text">
          <span class="kpi-value">{fan.xp_total.toLocaleString()}</span>
          <span class="kpi-unit">pts</span>
        </div>
        <span class="kpi-label">Total points</span>
      </div>
      <div class="kpi-item">
        <div class="kpi-icon purple">
          <Shield size={16} />
        </div>
        <span class="kpi-value tier-value">{currentTier.name}</span>
        <span class="kpi-label">Your tier</span>
      </div>
      <div class="kpi-item">
        <div class="kpi-icon green">
          <Crown size={16} />
        </div>
        <span class="kpi-value">{data.activePasses}</span>
        <span class="kpi-label">Active</span>
      </div>
      <div class="kpi-item">
        <div class="kpi-icon red">
          <Clock size={16} />
        </div>
        <span class="kpi-value">{data.expiringSoon}</span>
        <span class="kpi-label">Expiring soon</span>
      </div>
    </div>

    <!-- Top Artists & Teams -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Top artists & teams</h2>
        <p class="section-sub">Each one progresses separately.</p>
      </div>
      <div class="artists-list">
        {#each data.topArtists as artist}
          <a href="/artist/{artist.id}" class="artist-row">
            <div class="artist-avatar" style="background: linear-gradient(135deg, #1a1a2e, #16213e);">
              <span class="artist-initial">{artist.name[0]}</span>
            </div>
            <div class="artist-info">
              <div class="artist-name-row">
                <span class="artist-name">{artist.name}</span>
                <span class="tier-chip" style="background: {artist.tier_color}">{artist.tier}</span>
              </div>
              <div class="artist-progress-row">
                <span class="artist-points">{artist.points.toLocaleString()} pts</span>
                <div class="progress-bar-wrap">
                  <span class="pts-to-next">{artist.pts_to_next.toLocaleString()} pts to {artist.next_tier}</span>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: {artist.progress * 100}%; background: {artist.tier_color}"></div>
                  </div>
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="#8E8E93" />
          </a>
        {/each}
      </div>
    </section>

    <!-- Featured Access -->
    {#if data.featuredOffers.length > 0}
      <section class="section">
        <h2 class="section-title padded">Featured access</h2>
        <div class="featured-card">
          <div class="featured-image">
            <span class="top-pick-badge"><Star size={10} /> TOP PICK</span>
          </div>
          <div class="featured-content">
            <h3 class="featured-name">{data.featuredOffers[0].name}</h3>
            <p class="featured-desc">Priority entry + lounge access</p>
            <div class="featured-footer">
              <span class="featured-time"><Clock size={12} /> Opens in 18h</span>
              <a href="/passes/{data.featuredOffers[0].pass_id}" class="view-pass-btn">View pass</a>
            </div>
          </div>
        </div>
      </section>
    {/if}

    <!-- Your Passes -->
    <section class="section">
      <h2 class="section-title padded">Your passes</h2>
      <div class="passes-list">
        {#each data.passes as pass}
          <a href="/passes/{pass.pass_id}" class="pass-row">
            <div class="pass-icon {pass.status}">
              {#if pass.status === 'active'}
                <Shield size={18} color="white" />
              {:else if pass.status === 'starts_soon'}
                <Zap size={18} color="white" />
              {:else}
                <Star size={18} color="white" />
              {/if}
            </div>
            <div class="pass-info">
              <h3 class="pass-name">{pass.name}</h3>
            </div>
            <span class="pass-status-badge {pass.status}">
              {#if pass.status === 'active'}Active
              {:else if pass.status === 'starts_soon'}Starts soon
              {:else}Waiting list
              {/if}
            </span>
            <ChevronRight size={16} color="#8E8E93" />
          </a>
        {/each}
      </div>
    </section>

    <!-- Unlock Next -->
    <section class="section unlock-next">
      <h2 class="section-title padded">Unlock next</h2>
      <div class="unlock-card">
        <div class="unlock-icon">
          <Star size={20} color="#FF5C00" />
        </div>
        <div class="unlock-content">
          <h3 class="unlock-title">Complete 1 more event</h3>
          <p class="unlock-desc">to unlock lounge access</p>
        </div>
        <div class="unlock-progress">
          <span class="unlock-fraction">1 / 2</span>
          <div class="unlock-bar">
            <div class="unlock-fill" style="width: 50%"></div>
          </div>
        </div>
        <ChevronRight size={18} color="#8E8E93" />
      </div>
    </section>
  {:else}
    <div class="empty-state">
      <p>Unable to load your access data. Please try again later.</p>
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
    color: var(--text-primary, #1C1C1E);
  }

  .subtitle {
    color: #8E8E93;
    font-size: 14px;
    margin: 4px 0 0;
  }

  /* KPI Strip */
  .kpi-strip {
    display: flex;
    justify-content: space-between;
    margin: 0 16px 24px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    padding: 16px 12px;
  }

  .kpi-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1;
  }

  .kpi-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
  }

  .kpi-icon.orange { background: rgba(255, 92, 0, 0.12); color: #FF5C00; }
  .kpi-icon.purple { background: rgba(59, 40, 204, 0.12); color: #3B28CC; }
  .kpi-icon.green { background: rgba(26, 158, 86, 0.12); color: #1A9E56; }
  .kpi-icon.red { background: rgba(255, 59, 48, 0.12); color: #FF3B30; }

  .kpi-text {
    display: flex;
    align-items: baseline;
    gap: 2px;
  }

  .kpi-value {
    font-size: 16px;
    font-weight: 700;
    color: #1C1C1E;
  }

  .kpi-unit {
    font-size: 11px;
    color: #8E8E93;
    font-weight: 500;
  }

  .tier-value {
    font-size: 14px;
  }

  .kpi-label {
    font-size: 10px;
    color: #8E8E93;
    text-align: center;
  }

  /* Sections */
  .section {
    margin-bottom: 24px;
  }

  .section-header {
    padding: 0 16px 8px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #1C1C1E;
    margin: 0;
  }

  .section-title.padded {
    padding: 0 16px;
    margin-bottom: 12px;
  }

  .section-sub {
    font-size: 13px;
    color: #8E8E93;
    margin: 2px 0 0;
  }

  /* Artists List */
  .artists-list {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    margin: 0 16px;
    overflow: hidden;
  }

  .artist-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border-bottom: 1px solid #E5E5EA;
    text-decoration: none;
    color: inherit;
  }

  .artist-row:last-child {
    border-bottom: none;
  }

  .artist-avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  .artist-initial {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 700;
  }

  .artist-info {
    flex: 1;
    min-width: 0;
  }

  .artist-name-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .artist-name {
    font-size: 15px;
    font-weight: 600;
    color: #1C1C1E;
  }

  .tier-chip {
    font-size: 10px;
    font-weight: 700;
    color: #FFFFFF;
    padding: 2px 8px;
    border-radius: 6px;
  }

  .artist-progress-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .artist-points {
    font-size: 13px;
    font-weight: 600;
    color: #1C1C1E;
    flex-shrink: 0;
  }

  .progress-bar-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pts-to-next {
    font-size: 10px;
    color: #8E8E93;
  }

  .progress-bar {
    height: 4px;
    background: #E5E5EA;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.6s ease;
  }

  /* Featured Access */
  .featured-card {
    margin: 0 16px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0;
  }

  .featured-image {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #2d1b4e, #1a1a3e);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    flex-shrink: 0;
    position: relative;
  }

  .top-pick-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #FF5C00;
    color: #FFFFFF;
    font-size: 9px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 6px;
    letter-spacing: 0.3px;
  }

  .featured-content {
    flex: 1;
    padding: 16px;
    color: #FFFFFF;
  }

  .featured-name {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 4px;
  }

  .featured-desc {
    font-size: 13px;
    opacity: 0.8;
    margin: 0 0 12px;
  }

  .featured-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .featured-time {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    opacity: 0.7;
  }

  .view-pass-btn {
    font-size: 13px;
    font-weight: 600;
    color: #FF5C00;
    text-decoration: none;
    border: 1px solid rgba(255, 92, 0, 0.4);
    padding: 6px 14px;
    border-radius: 99px;
    transition: background 0.2s;
  }

  .view-pass-btn:hover {
    background: rgba(255, 92, 0, 0.1);
  }

  /* Passes List */
  .passes-list {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    margin: 0 16px;
    overflow: hidden;
  }

  .pass-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border-bottom: 1px solid #E5E5EA;
    text-decoration: none;
    color: inherit;
  }

  .pass-row:last-child {
    border-bottom: none;
  }

  .pass-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pass-icon.active { background: #1A9E56; }
  .pass-icon.starts_soon { background: #FF5C00; }
  .pass-icon.waiting { background: #8E8E93; }

  .pass-info {
    flex: 1;
  }

  .pass-name {
    font-size: 15px;
    font-weight: 600;
    color: #1C1C1E;
    margin: 0;
  }

  .pass-status-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 99px;
    flex-shrink: 0;
  }

  .pass-status-badge.active {
    background: rgba(26, 158, 86, 0.12);
    color: #1A9E56;
  }

  .pass-status-badge.starts_soon {
    background: rgba(255, 92, 0, 0.12);
    color: #FF5C00;
  }

  .pass-status-badge.waiting {
    background: rgba(142, 142, 147, 0.12);
    color: #8E8E93;
  }

  /* Unlock Next */
  .unlock-next {
    padding-bottom: 20px;
  }

  .unlock-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    padding: 16px;
    margin: 0 16px;
  }

  .unlock-icon {
    width: 44px;
    height: 44px;
    background: rgba(255, 92, 0, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .unlock-content {
    flex-shrink: 0;
  }

  .unlock-title {
    font-size: 14px;
    font-weight: 700;
    color: #1C1C1E;
    margin: 0;
  }

  .unlock-desc {
    font-size: 12px;
    color: #8E8E93;
    margin: 2px 0 0;
  }

  .unlock-progress {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .unlock-fraction {
    font-size: 12px;
    font-weight: 600;
    color: #FF5C00;
  }

  .unlock-bar {
    width: 100%;
    height: 4px;
    background: #E5E5EA;
    border-radius: 2px;
    overflow: hidden;
  }

  .unlock-fill {
    height: 100%;
    background: #FF5C00;
    border-radius: 2px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 16px;
    color: #8E8E93;
  }
</style>
