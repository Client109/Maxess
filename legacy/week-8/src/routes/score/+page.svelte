<script>
  import { Bell, TrendingUp, TrendingDown } from 'lucide-svelte';
  import { mockLeaderboard, mockChallenges, mockFriendActivity, mockFanProfile } from '$lib/data/mockData.js';
  import { classifyTier } from '$lib/domain/xp.js';

  let filterPeriod = 'This week';
  let filterLocation = 'LA';

  $: currentTier = classifyTier(mockFanProfile.xp_total);
  $: filteredLeaderboard = mockLeaderboard.filter(e =>
    e.city === filterLocation && e.time_period === filterPeriod
  );
</script>

<svelte:head>
  <title>Score - Maxxes</title>
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
      <h1 class="page-title">Score</h1>
      <p class="subtitle">Community ranking + reward challenges</p>
    </div>
    <button class="notification-bell">
      <Bell size={24} />
    </button>
  </header>

  <!-- Score Summary Card -->
  <div class="card score-summary">
    <div class="summary-grid">
      <div class="summary-item main-score">
        <div class="score-display">
          <span class="large-score">{mockFanProfile.xp_total}</span>
          <span class="score-max">/100</span>
        </div>
        <div class="tier-badge">
          <span>★</span> {currentTier.name}
        </div>
      </div>
      
      <div class="summary-item">
        <span class="summary-label">This week</span>
        <div class="delta-display positive">
          <TrendingUp size={16} />
          <span class="delta-value">+12</span>
        </div>
      </div>

      <div class="summary-item">
        <span class="summary-label">Your rank</span>
        <div class="rank-display">
          <span class="rank-value">#{mockFanProfile.rank}</span>
          <span class="rank-context">in {filterLocation}</span>
        </div>
      </div>

      <div class="summary-item">
        <span class="summary-label">Percentile</span>
        <div class="percentile-display">
          <span class="percentile-value">Top {mockFanProfile.percentile}%</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Community Leaderboard -->
  <section class="leaderboard-section">
    <div class="card">
      <div class="card-header-row">
        <h2 class="section-title">Community leaderboard</h2>
        <div class="filter-row">
          <select class="filter-dropdown" bind:value={filterLocation}>
            <option value="LA">LA</option>
            <option value="SF">SF</option>
            <option value="NYC">NYC</option>
          </select>
          <select class="filter-dropdown" bind:value={filterPeriod}>
            <option value="This week">This week</option>
            <option value="This month">This month</option>
            <option value="All time">All time</option>
          </select>
        </div>
      </div>

      <div class="leaderboard-list">
        {#each filteredLeaderboard as entry}
          <div class="leaderboard-row" class:me={entry.is_me}>
            <span class="rank-number" class:highlighted={entry.is_me}>#{entry.rank}</span>
            <div class="avatar-circle">{entry.name.split(' ').map(n => n[0]).join('')}</div>
            <div class="leader-info">
              <span class="leader-name" class:highlighted={entry.is_me}>{entry.name}</span>
            </div>
            <span class="leader-score">{entry.score.toLocaleString()}</span>
            <div class="trend-indicator" class:positive={entry.delta > 0} class:negative={entry.delta < 0}>
              {#if entry.delta > 0}
                <TrendingUp size={14} />
              {:else if entry.delta < 0}
                <TrendingDown size={14} />
              {/if}
              <span>{Math.abs(entry.delta)}</span>
            </div>
          </div>
        {:else}
          <p class="empty-state">No results for this filter combination</p>
        {/each}
      </div>
    </div>
  </section>

  <!-- Friends Activity -->
  <section class="friends-section">
    <h2 class="section-header">Friends activity</h2>
    <div class="friends-scroll">
      {#each mockFriendActivity as friend}
        <div class="friend-card">
          <div class="friend-avatar">{friend.avatar_initials}</div>
          <div class="friend-content">
            <span class="friend-name">{friend.name}</span>
            <p class="friend-activity">{friend.activity_label}</p>
            {#if friend.delta > 0}
              <span class="friend-delta">+{friend.delta} ranks</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Challenges -->
  <section class="challenges-section">
    <h2 class="section-header">Challenges unlocking rewards</h2>
    <div class="challenges-grid">
      {#each mockChallenges as challenge}
        <div class="card challenge-card">
          <div class="challenge-header">
            <div class="challenge-thumbnail">{challenge.thumbnail_image}</div>
            <div class="challenge-info">
              <div class="unlock-chip">Unlock reward</div>
              <h3 class="challenge-title">{challenge.title}</h3>
              <p class="challenge-subtitle">{challenge.subtitle}</p>
            </div>
            {#if challenge.is_limited}
              <div class="limited-badge">LIMITED</div>
            {/if}
          </div>
          
          <div class="challenge-progress">
            <span class="progress-label">{Math.round(challenge.progress_fraction * challenge.tasks.length)}/{challenge.tasks.length} tasks complete</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: {challenge.progress_fraction * 100}%"></div>
            </div>
          </div>

          <div class="task-list">
            {#each challenge.tasks as task}
              <div class="task-item">
                <input type="checkbox" checked={task.is_complete} disabled />
                <span class="task-text" class:complete={task.is_complete}>{task.description}</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
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

  .notification-bell {
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

  .score-summary {
    margin: 0 16px 20px;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .summary-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .main-score {
    grid-column: 1 / -1;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-gray);
  }

  .score-display {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .large-score {
    font-size: 52px;
    font-weight: 700;
    line-height: 1;
  }

  .score-max {
    font-size: 20px;
    color: var(--system-gray);
  }

  .tier-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--true-black);
    color: var(--pure-white);
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
  }

  .tier-badge span {
    color: var(--action-orange);
  }

  .summary-label {
    font-size: 12px;
    color: var(--system-gray);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .delta-display {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--success-green);
  }

  .delta-value {
    font-size: 18px;
    font-weight: 700;
  }

  .rank-display {
    display: flex;
    flex-direction: column;
  }

  .rank-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--action-orange);
  }

  .rank-context {
    font-size: 12px;
    color: var(--system-gray);
  }

  .percentile-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--true-black);
  }

  .leaderboard-section {
    margin: 0 16px 24px;
  }

  .card-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 17px;
    font-weight: 700;
  }

  .filter-row {
    display: flex;
    gap: 8px;
  }

  .filter-dropdown {
    background: var(--off-white);
    border: 1px solid var(--border-gray);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 600;
    color: var(--true-black);
  }

  .leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }

  .leaderboard-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }

  .leaderboard-row.me {
    background: rgba(255, 92, 0, 0.1);
  }

  .rank-number {
    font-size: 14px;
    font-weight: 600;
    color: var(--system-gray);
    min-width: 30px;
  }

  .rank-number.highlighted {
    color: var(--action-orange);
  }

  .avatar-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--light-blue);
    color: var(--deep-navy);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
  }

  .leader-info {
    flex: 1;
  }

  .leader-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--true-black);
  }

  .leader-name.highlighted {
    font-weight: 700;
    color: var(--action-orange);
  }

  .leader-score {
    font-size: 14px;
    font-weight: 600;
    color: var(--true-black);
  }

  .trend-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    min-width: 40px;
  }

  .trend-indicator.positive {
    color: var(--success-green);
  }

  .trend-indicator.negative {
    color: #FF3B30;
  }

  .empty-state {
    text-align: center;
    color: var(--system-gray);
    font-size: 14px;
    padding: 24px 0;
  }

  .section-header {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 16px 12px;
    color: var(--true-black);
  }

  .friends-section {
    margin-bottom: 24px;
  }

  .friends-scroll {
    display: flex;
    gap: 12px;
    padding: 0 16px;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .friend-card {
    background: var(--pure-white);
    border: 1px solid var(--border-gray);
    border-radius: 14px;
    padding: 16px;
    min-width: 200px;
    display: flex;
    gap: 12px;
  }

  .friend-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--action-orange);
    color: var(--pure-white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
  }

  .friend-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .friend-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--true-black);
  }

  .friend-activity {
    font-size: 12px;
    color: var(--system-gray);
    margin: 0;
    line-height: 1.3;
  }

  .friend-delta {
    font-size: 12px;
    font-weight: 600;
    color: var(--action-orange);
  }

  .challenges-section {
    margin: 0 16px 24px;
  }

  .challenges-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
  }

  .challenge-card {
    position: relative;
  }

  .challenge-header {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    position: relative;
  }

  .challenge-thumbnail {
    width: 60px;
    height: 60px;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--off-white);
    border-radius: 12px;
    flex-shrink: 0;
  }

  .challenge-info {
    flex: 1;
  }

  .unlock-chip {
    display: inline-block;
    background: var(--warning-orange-light);
    color: var(--action-orange);
    font-size: 9px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .challenge-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .challenge-subtitle {
    font-size: 13px;
    color: var(--system-gray);
    margin: 0;
  }

  .limited-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--action-orange);
    color: var(--pure-white);
    font-size: 9px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 8px;
    letter-spacing: 0.5px;
  }

  .challenge-progress {
    margin-bottom: 12px;
  }

  .progress-label {
    font-size: 12px;
    color: var(--system-gray);
    display: block;
    margin-bottom: 8px;
  }

  .progress-bar {
    height: 4px;
    background: var(--border-gray);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--action-orange);
    border-radius: 2px;
    transition: width 0.6s ease;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .task-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .task-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 2px solid var(--border-gray);
    appearance: none;
    cursor: pointer;
  }

  .task-item input[type="checkbox"]:checked {
    background: var(--success-green);
    border-color: var(--success-green);
    position: relative;
  }

  .task-item input[type="checkbox"]:checked::after {
    content: '✓';
    position: absolute;
    top: -2px;
    left: 2px;
    color: white;
    font-size: 14px;
  }

  .task-text {
    font-size: 14px;
    color: var(--true-black);
  }

  .task-text.complete {
    text-decoration: line-through;
    color: var(--system-gray);
  }
</style>
