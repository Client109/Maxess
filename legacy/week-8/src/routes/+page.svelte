<script>
  import { onMount } from 'svelte';
  import { fanProfile, fanStats, loadFanProfile } from '$lib/stores/fan.js';
  import ScoreHeroCard from '$lib/components/ScoreHeroCard.svelte';
  import ProgressCard from '$lib/components/ProgressCard.svelte';
  import UpcomingEvents from '$lib/components/UpcomingEvents.svelte';
  import LeaderboardCard from '$lib/components/LeaderboardCard.svelte';
  import { Bell, ChevronRight } from 'lucide-svelte';

  let sportsEventsActive = true; // Note: mockup shows "Sports Events" as active
  let scoreAnimated = false;

  onMount(async () => {
    try {
      await loadFanProfile();
      // Trigger score animation after data loads
      setTimeout(() => {
        scoreAnimated = true;
      }, 100);
    } catch (error) {
      console.error('Failed to load fan profile:', error);
    }
  });

  function toggleEventType() {
    sportsEventsActive = !sportsEventsActive;
  }
</script>

<svelte:head>
  <title>Maxxes - Your Fan Profile</title>
</svelte:head>

<div class="page-container">
  <!-- Status Bar -->
  <div class="status-bar">
    <span class="time">9:41</span>
    <div class="status-icons">
      <div class="signal-bars">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <div class="wifi-icon">📶</div>
      <div class="battery-icon">🔋</div>
    </div>
  </div>

  <!-- Page Header -->
  <header class="page-header">
    <div class="header-content">
      <h1 class="page-title">Maxess</h1>
      <p class="subtitle">Your fan profile</p>
    </div>
    <button class="notification-bell" aria-label="Notifications">
      <Bell size={24} />
      <span class="notification-dot"></span>
    </button>
  </header>

  <!-- Music/Sports Events Toggle -->
  <div class="toggle-container">
    <button 
      class="toggle-pill"
      on:click={toggleEventType}
      aria-label="Switch between music and sports events"
    >
      <span class="toggle-option" class:active={!sportsEventsActive}>Music</span>
      <span class="toggle-option" class:active={sportsEventsActive}>Sports Events</span>
      <div class="toggle-slider" class:right={sportsEventsActive}></div>
    </button>
  </div>

  <!-- Main Content -->
  {#if $fanProfile && $fanStats}
    <div class="main-content">
      <!-- Superfan Score Hero Card -->
      <ScoreHeroCard fan={$fanProfile} stats={$fanStats} animated={scoreAnimated} />

      <!-- Progress to Elite+ Card -->
      <ProgressCard stats={$fanStats} />

      <!-- Upcoming Events Section -->
      <section class="content-section">
        <div class="section-header-row">
          <span class="section-title">UPCOMING</span>
          <a href="/events" class="view-all-link">View all <ChevronRight size={16} /></a>
        </div>
        <UpcomingEvents eventType={sportsEventsActive ? 'sports' : 'music'} />
      </section>

      <!-- Climb the Ranks Card -->
      <section class="content-section climb-section">
        <LeaderboardCard />
      </section>
    </div>
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
    background: #F2F2F7;
    position: relative;
    padding-bottom: 69px; /* Space for bottom navigation */
  }

  /* Status Bar - exact iPhone style */
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 16px;
    font-size: 17px;
    font-weight: 600;
    background: #F2F2F7;
    color: #000000;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .time {
    font-weight: 600;
    font-size: 17px;
  }

  .status-icons {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .signal-bars {
    display: flex;
    align-items: end;
    gap: 2px;
    height: 14px;
  }

  .signal-bars .bar {
    width: 3px;
    background: #000000;
    border-radius: 1px;
  }

  .signal-bars .bar:nth-child(1) { height: 4px; }
  .signal-bars .bar:nth-child(2) { height: 7px; }
  .signal-bars .bar:nth-child(3) { height: 10px; }
  .signal-bars .bar:nth-child(4) { height: 13px; }

  .wifi-icon, .battery-icon {
    font-size: 16px;
  }

  /* Page Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    background: #F2F2F7;
  }

  .header-content {
    flex: 1;
  }

  .page-title {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 34px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
    color: #000000;
  }

  .subtitle {
    color: #8E8E93;
    font-size: 17px;
    font-weight: 400;
    margin: 4px 0 0;
  }

  .notification-bell {
    position: relative;
    background: none;
    border: none;
    color: #000000;
    cursor: pointer;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.15s ease;
    border-radius: 22px;
  }

  .notification-bell:hover {
    opacity: 0.7;
    background: rgba(0, 0, 0, 0.05);
  }

  .notification-dot {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background: #FF5C00;
    border-radius: 50%;
    border: 2px solid #F2F2F7;
  }

  /* Music/Sports Toggle */
  .toggle-container {
    padding: 0 16px 20px;
    background: #F2F2F7;
  }

  .toggle-pill {
    position: relative;
    display: flex;
    background: #E5E5EA;
    border-radius: 25px;
    padding: 4px;
    border: none;
    cursor: pointer;
    width: 100%;
    max-width: 400px;
    height: 50px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  .toggle-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 600;
    color: #8E8E93;
    transition: color 0.2s ease;
    z-index: 2;
    position: relative;
  }

  .toggle-option.active {
    color: #FFFFFF;
  }

  .toggle-slider {
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(50% - 4px);
    height: 42px;
    background: #FF5C00;
    border-radius: 21px;
    transition: transform 0.2s ease;
    z-index: 1;
  }

  .toggle-slider.right {
    transform: translateX(100%);
  }

  /* Main Content */
  .main-content {
    padding-bottom: 20px;
  }

  /* Content Sections */
  .content-section {
    margin-top: 24px;
    padding: 0 16px;
  }

  .section-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .section-title {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .view-all-link {
    font-size: 17px;
    font-weight: 400;
    color: #FF5C00;
    text-decoration: none;
    transition: opacity 0.15s ease;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .view-all-link:hover {
    opacity: 0.7;
    text-decoration: none;
  }

  /* Climb the Ranks section spacing */
  .climb-section {
    margin-top: 20px;
  }

  /* Loading State */
  .loading-state {
    padding: 60px 16px;
    text-align: center;
    color: #8E8E93;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #E5E5EA;
    border-top-color: #FF5C00;
    border-radius: 50%;
    margin: 0 auto 16px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading-state p {
    font-size: 17px;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }
</style>