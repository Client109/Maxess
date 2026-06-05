<script>
  import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-svelte';
  import NotificationBell from '$lib/components/NotificationBell.svelte';
  import { classifyTier } from '$lib/domain/xp.js';
  import { showPointsGraph } from '$lib/stores/settings.js';

  export let data;

  $: fan = data.fan;
  $: currentTier = fan ? classifyTier(fan.xp_total) : null;
  $: challenges = data.rank?.challenges || [];
  $: friendActivity = data.rank?.friendActivity || [];
  $: xpHistory = data.xpHistory || [];

  const graphW = 320;
  const graphH = 120;
  const graphPad = { top: 12, right: 12, bottom: 20, left: 12 };

  $: graphMax = Math.max(1, ...xpHistory.map(p => p.amount));
  $: graphPoints = xpHistory.map((p, i) => {
    const innerW = graphW - graphPad.left - graphPad.right;
    const innerH = graphH - graphPad.top - graphPad.bottom;
    const x = graphPad.left + (xpHistory.length === 1 ? innerW / 2 : (i / (xpHistory.length - 1)) * innerW);
    const y = graphPad.top + innerH - (p.amount / graphMax) * innerH;
    return { x, y, ...p };
  });
  $: graphLine = graphPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  $: graphArea = graphPoints.length
    ? `${graphLine} L ${graphPoints[graphPoints.length - 1].x} ${graphH - graphPad.bottom} L ${graphPoints[0].x} ${graphH - graphPad.bottom} Z`
    : '';
  $: graphTotal = xpHistory.reduce((s, p) => s + p.amount, 0);

  let filterLocation = 'LA';
  let filterPeriod = 'This week';
  let friendsOnly = false;

  $: allLeaderboard = data.rank?.leaderboard || [];

  // Match short codes (UI) to long city names (DB) — accept either.
  const cityAliases = {
    LA: ['LA', 'Los Angeles'],
    SF: ['SF', 'San Francisco'],
    NYC: ['NYC', 'New York']
  };

  // Time-period hierarchy: This week ⊂ This month ⊂ All time
  const periodIncludes = {
    'This week': ['This week'],
    'This month': ['This week', 'This month'],
    'All time': ['This week', 'This month', 'All time']
  };

  $: filteredLeaderboard = allLeaderboard
    .filter(e => {
      if (friendsOnly && !e.is_friend && !e.is_me) return false;
      if (!cityAliases[filterLocation].includes(e.city)) return false;
      if (!periodIncludes[filterPeriod].includes(e.time_period)) return false;
      return true;
    })
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 5);
</script>

<svelte:head>
  <title>Score - Maxess</title>
</svelte:head>

<div class="page-container">
  <!-- Header -->
  <header class="page-header">
    <div>
      <h1 class="page-title">Score</h1>
      <p class="subtitle">Community ranking + reward challenges</p>
    </div>
    <NotificationBell />
  </header>

  {#if fan}
    <!-- Score Summary Card -->
    <div class="score-card">
      <div class="score-top">
        <div class="score-main">
          <div class="score-row">
            <span class="superfan-label">SUPERFAN SCORE</span>
          </div>
          <div class="score-display">
            <span class="score-number">{fan.superfan_score || 91}</span>
            <span class="score-max">/100</span>
          </div>
          {#if currentTier}
            <span class="tier-badge" style="background: {currentTier.name === 'Elite' ? '#FF5C00' : '#3B28CC'}">
              <span class="tier-star">★</span> {currentTier.name}
            </span>
          {/if}
        </div>
        <div class="score-stats">
          <div class="stat-item">
            <span class="stat-label">THIS WEEK</span>
            <div class="stat-value positive">
              <TrendingUp size={14} />
              <span>+12</span>
            </div>
            <span class="stat-sub">pts</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">YOUR RANK</span>
            <span class="stat-value rank">#{fan.rank}</span>
            <span class="stat-sub">in {filterLocation}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">PERCENTILE</span>
            <span class="stat-value">Top {fan.percentile}%</span>
            <span class="stat-sub">of fans</span>
          </div>
        </div>
      </div>
    </div>

    {#if $showPointsGraph}
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">Points over time</h2>
          <span class="graph-total">+{graphTotal.toLocaleString()} pts · 14d</span>
        </div>
        <div class="graph-card">
          {#if graphMax > 0 && xpHistory.length > 0}
            <svg viewBox="0 0 {graphW} {graphH}" class="graph-svg" preserveAspectRatio="none">
              <path d={graphArea} fill="rgba(255, 92, 0, 0.12)" />
              <path d={graphLine} fill="none" stroke="#FF5C00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              {#each graphPoints as p}
                <circle cx={p.x} cy={p.y} r="2.5" fill="#FF5C00" />
              {/each}
            </svg>
            <div class="graph-axis">
              <span>{xpHistory[0]?.date.slice(5)}</span>
              <span>{xpHistory[xpHistory.length - 1]?.date.slice(5)}</span>
            </div>
          {:else}
            <p class="graph-empty">No points earned in the last 14 days.</p>
          {/if}
        </div>
      </section>
    {/if}

    <!-- Community Leaderboard -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Community leaderboard</h2>
        <div class="filter-row">
          <select class="filter-select" bind:value={filterLocation}>
            <option value="LA">LA</option>
            <option value="SF">SF</option>
            <option value="NYC">NYC</option>
          </select>
          <select class="filter-select" bind:value={filterPeriod}>
            <option value="This week">This week</option>
            <option value="This month">This month</option>
            <option value="All time">All time</option>
          </select>
        </div>
      </div>

      <div class="leaderboard-card">
        {#each filteredLeaderboard as entry, i}
          <div class="lb-row" class:me={entry.is_me}>
            <span class="lb-rank" class:highlighted={entry.is_me}>{entry.rank}</span>
            <div class="lb-avatar" style="background: {entry.is_me ? '#FF5C00' : '#E5E5EA'}">
              <span style="color: {entry.is_me ? '#fff' : '#1C1C1E'}">{entry.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <span class="lb-name" class:highlighted={entry.is_me}>{entry.is_me ? 'You' : entry.name}</span>
            <span class="lb-score">{entry.score.toLocaleString()}</span>
            <div class="lb-trend" class:positive={entry.delta > 0} class:negative={entry.delta < 0}>
              {#if entry.delta > 0}
                <TrendingUp size={12} />
              {:else if entry.delta < 0}
                <TrendingDown size={12} />
              {/if}
              <span>{Math.abs(entry.delta)}</span>
            </div>
          </div>
        {/each}

        <a href="/score" class="view-all-link">
          View full leaderboard <ChevronRight size={14} />
        </a>
      </div>
    </section>

    <!-- Friends Activity -->
    <section class="section">
      <h2 class="section-title padded">Friends activity</h2>
      <div class="friends-scroll">
        {#each friendActivity as friend}
          <div class="friend-card">
            <div class="friend-avatar" style="background: #FF5C00">
              <span>{friend.avatar_initials}</span>
            </div>
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

    <!-- Challenges Unlocking Rewards -->
    <section class="section">
      <h2 class="section-title padded">Challenges unlocking rewards</h2>
      <div class="challenges-list">
        {#each challenges as challenge}
          <div class="challenge-card" class:completed={challenge.progress_fraction >= 1.0}>
            <div class="challenge-header">
              <div class="challenge-thumb">{challenge.thumbnail_image}</div>
              <div class="challenge-info">
                <div class="unlock-chip" class:unlocked={challenge.progress_fraction >= 1.0}>
                  {challenge.progress_fraction >= 1.0 ? '✓ Reward unlocked' : 'Unlock reward'}
                </div>
                <h3 class="challenge-name">{challenge.title}</h3>
                <p class="challenge-sub">{challenge.subtitle}</p>
              </div>
              {#if challenge.is_limited}
                <span class="limited-badge">LIMITED</span>
              {/if}
            </div>

            <div class="challenge-progress">
              <span class="progress-label">
                {Math.round(challenge.progress_fraction * challenge.tasks.length)}/{challenge.tasks.length} tasks complete
              </span>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  class:complete={challenge.progress_fraction >= 1.0}
                  style="width: {challenge.progress_fraction * 100}%"
                ></div>
              </div>
            </div>

            <div class="task-list">
              {#each challenge.tasks as task}
                <div class="task-item">
                  <div class="checkbox" class:checked={task.is_complete}>
                    {#if task.is_complete}<span class="check">✓</span>{/if}
                  </div>
                  <span class="task-text" class:done={task.is_complete}>{task.description}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>

    </section>
  {:else}
    <div class="empty">
      <p>Unable to load score data. Please try again later.</p>
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

  /* Score Card */
  .score-card {
    margin: 0 16px 24px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    padding: 20px;
  }

  .score-top {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  .score-main {
    flex-shrink: 0;
  }

  .score-row {
    margin-bottom: 4px;
  }

  .superfan-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #FF5C00;
    text-transform: uppercase;
  }

  .score-display {
    display: flex;
    align-items: baseline;
    gap: 2px;
    margin-bottom: 8px;
  }

  .score-number {
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    color: #1C1C1E;
  }

  .score-max {
    font-size: 18px;
    color: #8E8E93;
    font-weight: 500;
  }

  .tier-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #FFFFFF;
    padding: 4px 12px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 600;
  }

  .tier-star {
    font-size: 10px;
  }

  .score-stats {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 4px;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stat-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #8E8E93;
    min-width: 70px;
  }

  .stat-value {
    font-size: 16px;
    font-weight: 700;
    color: #1C1C1E;
  }

  .stat-value.positive {
    color: #1A9E56;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .stat-value.rank {
    color: #FF5C00;
  }

  .stat-sub {
    font-size: 11px;
    color: #8E8E93;
  }

  /* Sections */
  .section {
    margin-bottom: 24px;
  }

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 12px;
  }

  .section-title {
    font-size: 17px;
    font-weight: 700;
    color: #1C1C1E;
    margin: 0;
  }

  .section-title.padded {
    padding: 0 16px;
    margin-bottom: 12px;
  }

  .filter-row {
    display: flex;
    gap: 8px;
  }

  .filter-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #FFFFFF;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231C1C1E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 10px 6px;
    border: 1px solid #E5E5EA;
    border-radius: 99px;
    padding: 7px 30px 7px 14px;
    font-size: 12px;
    font-weight: 600;
    color: #1C1C1E;
    cursor: pointer;
    font-family: inherit;
    line-height: 1;
    transition: border-color 0.15s, background-color 0.15s;
  }

  .filter-select:hover {
    border-color: #C7C7CC;
  }

  .filter-select:focus {
    outline: none;
    border-color: #FF5C00;
    box-shadow: 0 0 0 3px rgba(255, 92, 0, 0.15);
  }

  .filter-select::-ms-expand { display: none; }

  /* Points graph */
  .graph-card {
    margin: 0 16px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    padding: 12px 14px 10px;
  }

  .graph-svg {
    display: block;
    width: 100%;
    height: 120px;
  }

  .graph-axis {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #8E8E93;
    margin-top: 2px;
  }

  .graph-total {
    font-size: 12px;
    font-weight: 600;
    color: #FF5C00;
  }

  .graph-empty {
    margin: 0;
    padding: 24px 0;
    text-align: center;
    color: #8E8E93;
    font-size: 13px;
  }

  /* Leaderboard */
  .leaderboard-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    margin: 0 16px;
    overflow: hidden;
  }

  .lb-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-bottom: 1px solid #F2F2F7;
  }

  .lb-row:last-of-type {
    border-bottom: none;
  }

  .lb-row.me {
    background: rgba(255, 92, 0, 0.06);
  }

  .lb-rank {
    font-size: 14px;
    font-weight: 600;
    color: #8E8E93;
    min-width: 24px;
    text-align: center;
  }

  .lb-rank.highlighted {
    color: #FF5C00;
  }

  .lb-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }

  .lb-name {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: #1C1C1E;
  }

  .lb-name.highlighted {
    font-weight: 700;
    color: #FF5C00;
  }

  .lb-score {
    font-size: 14px;
    font-weight: 600;
    color: #1C1C1E;
  }

  .lb-trend {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 12px;
    font-weight: 600;
    min-width: 36px;
    justify-content: flex-end;
    color: #8E8E93;
  }

  .lb-trend.positive { color: #1A9E56; }
  .lb-trend.negative { color: #FF3B30; }

  .view-all-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px;
    font-size: 13px;
    font-weight: 600;
    color: #FF5C00;
    text-decoration: none;
    border-top: 1px solid #F2F2F7;
  }

  /* Friends Activity */
  .friends-scroll {
    display: flex;
    gap: 12px;
    padding: 0 16px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }

  .friends-scroll::-webkit-scrollbar { display: none; }

  .friend-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 14px;
    padding: 14px;
    min-width: 180px;
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

  .friend-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: #FFFFFF;
    flex-shrink: 0;
  }

  .friend-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .friend-name {
    font-size: 14px;
    font-weight: 600;
    color: #1C1C1E;
  }

  .friend-activity {
    font-size: 12px;
    color: #8E8E93;
    margin: 0;
    line-height: 1.3;
  }

  .friend-delta {
    font-size: 12px;
    font-weight: 600;
    color: #FF5C00;
  }

  /* Challenges */
  .challenges-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
  }

  .challenge-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    padding: 16px;
  }

  .challenge-card.completed {
    border-color: #1A9E56;
  }

  .challenge-header {
    display: flex;
    gap: 12px;
    margin-bottom: 14px;
    position: relative;
  }

  .challenge-thumb {
    width: 52px;
    height: 52px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F2F2F7;
    border-radius: 12px;
    flex-shrink: 0;
  }

  .challenge-info {
    flex: 1;
  }

  .unlock-chip {
    display: inline-block;
    background: rgba(255, 92, 0, 0.1);
    color: #FF5C00;
    font-size: 9px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 4px;
  }

  .unlock-chip.unlocked {
    background: rgba(26, 158, 86, 0.12);
    color: #1A9E56;
  }

  .challenge-name {
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 2px;
    color: #1C1C1E;
  }

  .challenge-sub {
    font-size: 13px;
    color: #8E8E93;
    margin: 0;
  }

  .limited-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #FF5C00;
    color: #FFFFFF;
    font-size: 9px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.3px;
  }

  .challenge-progress {
    margin-bottom: 12px;
  }

  .progress-label {
    font-size: 12px;
    color: #8E8E93;
    display: block;
    margin-bottom: 6px;
  }

  .progress-bar {
    height: 4px;
    background: #E5E5EA;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #FF5C00;
    border-radius: 2px;
    transition: width 0.6s ease;
  }

  .progress-fill.complete {
    background: #1A9E56;
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

  .checkbox {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 2px solid #E5E5EA;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .checkbox.checked {
    background: #1A9E56;
    border-color: #1A9E56;
  }

  .check {
    color: white;
    font-size: 11px;
    font-weight: 700;
  }

  .task-text {
    font-size: 14px;
    color: #1C1C1E;
  }

  .task-text.done {
    text-decoration: line-through;
    color: #8E8E93;
  }

  .empty {
    text-align: center;
    padding: 60px 16px;
    color: #8E8E93;
  }
</style>
