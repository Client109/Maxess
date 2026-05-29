<script>
  import { Bell, Settings, ChevronRight } from 'lucide-svelte';
  import { classifyTier } from '$lib/domain/xp.js';

  export let data;

  $: fan = data.fan;
  $: currentTier = fan ? classifyTier(fan.xp_total) : null;
  $: xpBreakdown = data.xpBreakdown || {};
  $: effectiveXPTotal = fan?.xp_total || 0;
  $: recentActivity = data.recentActivity || [];

  let tappedSetting = null;
  let showXPGraph = false;

  // Mock XP progression data (monthly totals)
  const xpHistory = [
    { month: 'Jan', xp: 1200 },
    { month: 'Feb', xp: 2100 },
    { month: 'Mar', xp: 3400 },
    { month: 'Apr', xp: 4800 },
    { month: 'May', xp: 6500 },
    { month: 'Jun', xp: 8750 }
  ];

  const graphWidth = 300;
  const graphHeight = 120;
  const graphPadding = { top: 10, right: 10, bottom: 24, left: 10 };
  const plotW = graphWidth - graphPadding.left - graphPadding.right;
  const plotH = graphHeight - graphPadding.top - graphPadding.bottom;

  $: maxXP = Math.max(...xpHistory.map(d => d.xp));
  $: graphPoints = xpHistory.map((d, i) => {
    const x = graphPadding.left + (i / (xpHistory.length - 1)) * plotW;
    const y = graphPadding.top + plotH - (d.xp / maxXP) * plotH;
    return { x, y, ...d };
  });
  $: linePath = graphPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  $: areaPath = linePath + ` L${graphPoints[graphPoints.length - 1].x},${graphPadding.top + plotH} L${graphPoints[0].x},${graphPadding.top + plotH} Z`;

  function handleSettingTap(label) {
    tappedSetting = label;
    setTimeout(() => { tappedSetting = null; }, 1500);
  }

  const settingsItems = [
    { label: 'Edit Profile', icon: '👤' },
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
      {fan.avatar_initials}
    </div>
    <h2 class="profile-name">{fan.name}</h2>
    <p class="profile-location">{fan.city}</p>
    
    <div class="tier-badge-large">
      <span>★</span>
      {currentTier.name} Member
    </div>

    <div class="profile-stats">
      <div class="stat-item">
        <span class="stat-value">{fan.events_attended}</span>
        <span class="stat-label">Events</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">#{fan.rank}</span>
        <span class="stat-label">Rank</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">{fan.streak_days}</span>
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

      {#if showXPGraph}
        <div class="xp-graph">
          <div class="graph-label">XP Over Time</div>
          <svg viewBox="0 0 {graphWidth} {graphHeight}" class="graph-svg">
            <!-- Grid lines -->
            {#each [0.25, 0.5, 0.75] as frac}
              <line
                x1={graphPadding.left}
                y1={graphPadding.top + plotH * (1 - frac)}
                x2={graphPadding.left + plotW}
                y2={graphPadding.top + plotH * (1 - frac)}
                stroke="var(--border-gray)"
                stroke-width="0.5"
                stroke-dasharray="4 4"
              />
            {/each}

            <!-- Area fill -->
            <path d={areaPath} fill="rgba(255, 92, 0, 0.12)" />

            <!-- Line -->
            <path d={linePath} fill="none" stroke="var(--action-orange)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

            <!-- Dots + month labels -->
            {#each graphPoints as point}
              <circle cx={point.x} cy={point.y} r="3" fill="var(--action-orange)" />
              <text
                x={point.x}
                y={graphPadding.top + plotH + 16}
                text-anchor="middle"
                fill="var(--system-gray)"
                font-size="9"
                font-weight="500"
              >{point.month}</text>
            {/each}
          </svg>
        </div>
      {/if}
    </div>
  </section>

  <!-- Recent Activity -->
  <section class="activity-section">
    <h2 class="section-header">Recent Activity</h2>
    <div class="card activity-list">
      {#each recentActivity as activity}
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
      <div class="settings-row toggle-row">
        <span class="settings-icon">📊</span>
        <span class="settings-label">Show XP Graph</span>
        <button
          class="toggle-switch"
          class:on={showXPGraph}
          on:click={() => { showXPGraph = !showXPGraph; }}
          aria-label="Toggle XP Graph"
          role="switch"
          aria-checked={showXPGraph}
        >
          <span class="toggle-thumb"></span>
        </button>
      </div>
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
    <p>Member since {new Date(fan.member_since).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
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

  /* XP Graph */
  .xp-graph {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--border-gray);
  }

  .graph-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--system-gray);
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 8px;
  }

  .graph-svg {
    width: 100%;
    height: auto;
  }

  /* Toggle Switch */
  .toggle-row {
    cursor: default;
  }

  .toggle-switch {
    width: 48px;
    height: 28px;
    border-radius: 14px;
    background: var(--border-gray);
    border: none;
    cursor: pointer;
    position: relative;
    transition: background 0.2s ease;
    flex-shrink: 0;
    padding: 0;
  }

  .toggle-switch.on {
    background: var(--action-orange);
  }

  .toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--pure-white);
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    transition: transform 0.2s ease;
  }

  .toggle-switch.on .toggle-thumb {
    transform: translateX(20px);
  }
</style>
