<script>
  import { Bell, Settings, ChevronRight } from 'lucide-svelte';
  import { mockFanProfile, mockRecentActivity } from '$lib/data/mockData.js';
  import { classifyTier } from '$lib/domain/xp.js';
  import { appleMusicConnected, listeningXP, connectAppleMusic } from '$lib/stores/appleMusic.js';

  $: currentTier = classifyTier(mockFanProfile.xp_total);

  $: xpBreakdown = $appleMusicConnected
    ? { ...mockFanProfile.xp_breakdown, 'Listening': $listeningXP }
    : mockFanProfile.xp_breakdown;

  $: effectiveXPTotal = mockFanProfile.xp_total + ($appleMusicConnected ? $listeningXP : 0);

  let tappedSetting = null;

  function handleSettingTap(label) {
    if (label === 'Apple Music') {
      if (!$appleMusicConnected) {
        connectAppleMusic();
      }
      return;
    }
    tappedSetting = label;
    setTimeout(() => { tappedSetting = null; }, 1500);
  }

  $: settingsItems = [
    { label: 'Edit Profile', icon: '👤' },
    { label: 'Apple Music', icon: '🎵', connected: $appleMusicConnected },
    { label: 'Connected Accounts', icon: '🔗' },
    { label: 'Notifications', icon: '🔔' },
    { label: 'Privacy & Security', icon: '🔒' },
    { label: 'Help & Support', icon: '❓' }
  ];
</script>

<svelte:head>
  <title>Profile - Maxxes</title>
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
      <h1 class="page-title">Profile</h1>
      <p class="subtitle">Your fan journey</p>
    </div>
    <button class="settings-btn">
      <Settings size={24} />
    </button>
  </header>

  <!-- Profile Hero -->
  <section class="profile-hero">
    <div class="profile-avatar">
      {mockFanProfile.avatar_initials}
    </div>
    <h2 class="profile-name">{mockFanProfile.name}</h2>
    <p class="profile-location">{mockFanProfile.city}</p>
    
    <div class="tier-badge-large">
      <span>★</span>
      {currentTier.name} Member
    </div>

    <div class="profile-stats">
      <div class="stat-item">
        <span class="stat-value">{mockFanProfile.events_attended}</span>
        <span class="stat-label">Events</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">#{mockFanProfile.rank}</span>
        <span class="stat-label">Rank</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">{mockFanProfile.streak_days}</span>
        <span class="stat-label">Day Streak</span>
      </div>
    </div>
  </section>

  <!-- XP Breakdown -->
  <section class="xp-section">
    <h2 class="section-header">XP Breakdown</h2>
    <div class="card xp-breakdown">
      {#each Object.entries(xpBreakdown).filter(([, v]) => v > 0) as [source, xp]}
        <div class="xp-row">
          <span class="xp-source">{source}</span>
          <div class="xp-bar-container">
            <div class="xp-bar" style="width: {(xp / effectiveXPTotal) * 100}%"></div>
          </div>
          <span class="xp-value">{xp.toLocaleString()} XP</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Recent Activity -->
  <section class="activity-section">
    <h2 class="section-header">Recent Activity</h2>
    <div class="card activity-list">
      {#each mockRecentActivity as activity}
        <div class="activity-row">
          <div class="activity-icon">{activity.source_icon}</div>
          <div class="activity-info">
            <span class="activity-description">{activity.description}</span>
            <span class="activity-time">{activity.timestamp}</span>
          </div>
          <span class="activity-xp">+{activity.xp_amount} XP</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Settings Menu -->
  <section class="settings-section">
    <h2 class="section-header">Settings</h2>
    <div class="card settings-menu">
      {#each settingsItems as item}
        <button class="settings-row" on:click={() => handleSettingTap(item.label)}>
          <span class="settings-icon">{item.icon}</span>
          <span class="settings-label">{item.label}</span>
          {#if item.connected}
            <span class="connected-badge">Connected</span>
          {:else if tappedSetting === item.label}
            <span class="coming-soon-badge">Coming soon</span>
          {:else}
            <ChevronRight size={18} color="#8E8E93" />
          {/if}
        </button>
      {/each}
    </div>
  </section>

  <!-- Member Since -->
  <section class="member-info">
    <p>Member since {new Date(mockFanProfile.member_since).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
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

  .settings-btn {
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

  .profile-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 16px 32px;
    background: var(--off-white);
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--action-orange) 0%, #FF7B3D 100%);
    color: var(--pure-white);
    font-size: 32px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .profile-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .profile-location {
    font-size: 14px;
    color: var(--system-gray);
    margin-bottom: 16px;
  }

  .tier-badge-large {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--true-black);
    color: var(--pure-white);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .tier-badge-large span {
    color: var(--action-orange);
    font-size: 16px;
  }

  .profile-stats {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .stat-value {
    font-size: 22px;
    font-weight: 700;
    color: var(--true-black);
  }

  .stat-label {
    font-size: 12px;
    color: var(--system-gray);
  }

  .stat-divider {
    width: 1px;
    height: 30px;
    background: var(--border-gray);
  }

  .section-header {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 16px 12px;
    color: var(--true-black);
  }

  .xp-section {
    margin-bottom: 24px;
  }

  .xp-breakdown {
    margin: 0 16px;
    padding: 16px;
  }

  .xp-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .xp-row:last-child {
    margin-bottom: 0;
  }

  .xp-source {
    font-size: 13px;
    font-weight: 600;
    color: var(--true-black);
    min-width: 100px;
  }

  .xp-bar-container {
    flex: 1;
    height: 8px;
    background: var(--border-gray);
    border-radius: 4px;
    overflow: hidden;
  }

  .xp-bar {
    height: 100%;
    background: var(--action-orange);
    border-radius: 4px;
    transition: width 0.6s ease;
  }

  .xp-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--action-orange);
    min-width: 70px;
    text-align: right;
  }

  .activity-section {
    margin-bottom: 24px;
  }

  .activity-list {
    margin: 0 16px;
    padding: 0;
    overflow: hidden;
  }

  .activity-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-gray);
  }

  .activity-row:last-child {
    border-bottom: none;
  }

  .activity-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--off-white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .activity-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .activity-description {
    font-size: 14px;
    font-weight: 500;
    color: var(--true-black);
  }

  .activity-time {
    font-size: 12px;
    color: var(--system-gray);
  }

  .activity-xp {
    font-size: 14px;
    font-weight: 600;
    color: var(--success-green);
  }

  .settings-section {
    margin-bottom: 24px;
  }

  .settings-menu {
    margin: 0 16px;
    padding: 0;
    overflow: hidden;
  }

  .settings-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-gray);
    width: 100%;
    text-align: left;
    background: transparent;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .settings-row:last-child {
    border-bottom: none;
  }

  .settings-row:hover {
    background: var(--off-white);
  }

  .settings-icon {
    font-size: 20px;
  }

  .settings-label {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: var(--true-black);
  }

  .coming-soon-badge {
    font-size: 11px;
    font-weight: 600;
    color: var(--action-orange);
    background: var(--warning-orange-light);
    padding: 4px 8px;
    border-radius: 8px;
  }

  .connected-badge {
    font-size: 11px;
    font-weight: 600;
    color: var(--success-green);
    background: rgba(52, 199, 89, 0.1);
    padding: 4px 8px;
    border-radius: 8px;
  }

  .member-info {
    text-align: center;
    padding: 20px 16px 40px;
    color: var(--system-gray);
    font-size: 13px;
  }
</style>
