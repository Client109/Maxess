<script>
  import { onMount } from 'svelte';
  import { Bell, ChevronRight, Zap } from 'lucide-svelte';
  import { classifyTier } from '$lib/domain/xp.js';
  import NotificationPanel from '$lib/components/NotificationPanel.svelte';

  export let data;

  let notifOpen = false;
  let notifications = data.notifications || [];
  $: unreadCount = notifications.filter(n => !n.read).length;

  $: currentTier = data.fan ? classifyTier(data.fan.xp_total) : null;
  $: tierName = currentTier?.name ?? 'Elite';
  $: xpToNext = data.fan ? 12000 - data.fan.xp_total : 0;

  // Tier progress steps
  const tierSteps = ['General', 'Loyal', 'Superfan', 'Elite'];
  $: currentTierIndex = (() => {
    if (!currentTier) return 0;
    const name = currentTier.name.toLowerCase();
    if (name === 'general' || name === 'fan') return 0;
    if (name === 'loyal') return 1;
    if (name === 'superfan') return 2;
    return 3;
  })();

  let activeToggle = 'music';
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
    <button class="notification-btn" aria-label="Notifications" on:click={() => notifOpen = true}>
      <Bell size={22} />
      {#if unreadCount > 0}
        <span class="notif-badge">{unreadCount}</span>
      {/if}
    </button>
  </header>

  <NotificationPanel bind:notifications open={notifOpen} on:close={() => notifOpen = false} />

  <!-- Music / Sports Toggle -->
  <div class="toggle-row">
    <button
      class="toggle-pill music"
      class:active={activeToggle === 'music'}
      on:click={() => activeToggle = 'music'}
    >Music</button>
    <button
      class="toggle-pill sports"
      class:active={activeToggle === 'sports'}
      on:click={() => activeToggle = 'sports'}
    >Sports Events</button>
  </div>

  {#if data.fan}
    <!-- Superfan Score Hero Card -->
    <div class="hero-score-card">
      <div class="hero-content">
        <div class="hero-left">
          <div class="elite-badge">
            <span>★</span> {tierName}
          </div>
          <div class="hero-score">{data.fan.xp_total.toLocaleString()}</div>
          <div class="hero-details">
            <span class="hero-detail">🔥 {data.fan.streak_days} day streak</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-avatar">
            {data.fan.avatar_initials}
          </div>
        </div>
      </div>
    </div>

    <!-- Progress to Next Tier -->
    <div class="progress-card">
      <h3 class="progress-title">Progress to Elite+</h3>
      <div class="tier-progress">
        {#each tierSteps as step, i}
          <div class="tier-step">
            <div class="tier-dot" class:filled={i <= currentTierIndex} class:current={i === currentTierIndex}></div>
            <span class="tier-step-label" class:active-label={i <= currentTierIndex}>{step}</span>
          </div>
          {#if i < tierSteps.length - 1}
            <div class="tier-line" class:filled={i < currentTierIndex}></div>
          {/if}
        {/each}
      </div>
      <p class="progress-remaining">
        <span class="remaining-xp">{xpToNext.toLocaleString()} pts</span> to next tier
      </p>
    </div>

    <!-- For You / Upcoming -->
    <section class="section">
      <div class="section-header">
        <span class="section-label">FOR YOU</span>
        <a href="/events" class="see-all">See All</a>
      </div>
      <div class="cards-scroll">
        {#each data.upcomingEvents.slice(0, 4) as event}
          <div class="for-you-card">
            <div class="for-you-image" style="background-color: {event.image_color || '#2667FF'}">
              <div class="for-you-overlay">
                <span class="for-you-tag">{event.category === 'sports' ? 'SPORTS ACCESS' : 'MUSIC ACCESS'}</span>
                <div class="for-you-bottom">
                  <h3 class="for-you-name">{event.title}</h3>
                  <p class="for-you-date">{event.date_display || event.date}</p>
                </div>
                <a href="/events" class="for-you-arrow" aria-label="View event">
                  <ChevronRight size={20} />
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

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
            <a href="/rank-rewards" class="climb-link">See leaderboard <ChevronRight size={14} /></a>
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

  .notification-btn {
    position: relative;
    color: var(--text-primary);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
  }

  .notif-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 18px;
    height: 18px;
    background: #EF4444;
    color: white;
    font-size: 10px;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--bg-primary);
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
    margin: 0 16px 16px;
    background: linear-gradient(135deg, var(--dark-card-start) 0%, var(--dark-card-end) 100%);
    border-radius: 20px;
    padding: 24px 20px;
    color: #FFFFFF;
    overflow: hidden;
    position: relative;
  }

  .hero-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .elite-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.2);
    color: #FFFFFF;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    align-self: flex-start;
    backdrop-filter: blur(4px);
  }

  .elite-badge span {
    color: #FFD700;
  }

  .hero-score {
    font-size: 56px;
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
  }

  .hero-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 3px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
  }

  /* ── Progress Card ──────────────────────────── */
  .progress-card {
    margin: 0 16px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    border-radius: 18px;
    padding: 20px;
  }

  .progress-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 16px;
  }

  .tier-progress {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .tier-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .tier-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid var(--border-gray);
    background: var(--bg-card);
    transition: all 0.3s ease;
  }

  .tier-dot.filled {
    background: var(--deep-navy);
    border-color: var(--deep-navy);
  }

  .tier-dot.current {
    box-shadow: 0 0 0 4px rgba(38, 103, 255, 0.2);
  }

  .tier-line {
    flex: 1;
    height: 3px;
    background: var(--border-gray);
    margin: 0 -2px;
    margin-bottom: 24px;
  }

  .tier-line.filled {
    background: var(--deep-navy);
  }

  .tier-step-label {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-tertiary);
    white-space: nowrap;
  }

  .tier-step-label.active-label {
    color: var(--text-primary);
    font-weight: 600;
  }

  .progress-remaining {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0;
  }

  .remaining-xp {
    color: var(--action-orange);
    font-weight: 700;
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

  .for-you-arrow {
    position: absolute;
    bottom: 14px;
    right: 14px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--action-orange);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
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
