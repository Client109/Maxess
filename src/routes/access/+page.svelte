<script>
  import { Bell, TrendingUp, TrendingDown, Star, Clock, Key, ChevronRight } from 'lucide-svelte';
  import { mockLeaderboard, mockChallenges, mockFriendActivity, mockFanProfile, mockPasses } from '$lib/data/mockData.js';
  import { classifyTier } from '$lib/domain/xp.js';

  let activeTab = 'rank';
  let filterPeriod = 'This week';
  let filterLocation = 'LA';
  let friendsOnly = false;
  let claimedAccess = false;
  let viewingPass = false;
  let activeTier = 'elite';

  $: currentTier = classifyTier(mockFanProfile.xp_total);
  $: filteredLeaderboard = mockLeaderboard.filter(e =>
    e.city === filterLocation && e.time_period === filterPeriod
  );

  $: activePasses = mockPasses.filter(p => p.status === 'active');
  $: upcomingPasses = mockPasses.filter(p => p.status === 'starts_soon');

  // Challenge-to-reward linkage: completed challenges unlock rewards
  $: completedChallenges = mockChallenges.filter(c => c.progress_fraction >= 1.0);
  $: hasUnlockedRewards = completedChallenges.length > 0;

  const tierPerks = {
    fan: {
      name: 'Fan',
      color: '#8E8E93',
      perks: ['Basic event access', 'Standard ticketing', 'Community membership']
    },
    loyal: {
      name: 'Loyal',
      color: '#CD7F32',
      perks: ['Early notifications', 'Points on purchases', 'Member pricing']
    },
    superfan: {
      name: 'Superfan',
      color: '#3B28CC',
      perks: ['Priority notifications', 'Early bird pricing', 'VIP seating options']
    },
    elite: {
      name: 'Elite',
      color: '#FF5C00',
      perks: ['Presale access', 'Backstage passes', 'Meet & greets', 'Personal concierge']
    }
  };

  /** @param {string} tab */
  function switchTab(tab) {
    activeTab = tab;
  }
</script>

<svelte:head>
  <title>Access & Rewards - Maxxes</title>
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
      <h1 class="page-title">Access & Rewards</h1>
      <p class="subtitle">Your rank, challenges, and rewards</p>
    </div>
    <button class="notification-bell">
      <Bell size={24} />
    </button>
  </header>

  <!-- Internal Tab Toggle -->
  <div class="toggle-container">
    <button class="toggle-pill" aria-label="Switch between My Rank and My Rewards">
      <span
        class="toggle-option"
        class:active={activeTab === 'rank'}
        on:click={() => switchTab('rank')}
      >My Rank</span>
      <span
        class="toggle-option"
        class:active={activeTab === 'rewards'}
        on:click={() => switchTab('rewards')}
      >
        My Rewards
        {#if hasUnlockedRewards}
          <span class="reward-dot"></span>
        {/if}
      </span>
      <div class="toggle-slider" class:right={activeTab === 'rewards'}></div>
    </button>
  </div>

  <!-- ═══════════════════════════════════════════ -->
  <!-- MY RANK TAB                                 -->
  <!-- ═══════════════════════════════════════════ -->
  {#if activeTab === 'rank'}
    <!-- Score Summary Card -->
    <div class="card score-summary">
      <div class="summary-grid">
        <div class="summary-item main-score">
          <div class="score-display">
            <span class="large-score">{mockFanProfile.xp_total.toLocaleString()}</span>
            <span class="score-unit">XP</span>
          </div>
          <div class="tier-badge">
            <span class="tier-star">★</span> {currentTier.name}
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

        <div class="friend-filter-row">
          <button
            class="friend-filter-btn"
            class:active={friendsOnly}
            on:click={() => friendsOnly = !friendsOnly}
          >
            {friendsOnly ? '👥 Friends only' : '🌐 Everyone'}
          </button>
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
      <h2 class="section-header-padded">Challenges unlocking rewards</h2>
      <div class="challenges-grid">
        {#each mockChallenges as challenge}
          <div class="card challenge-card" class:completed={challenge.progress_fraction >= 1.0}>
            <div class="challenge-header">
              <div class="challenge-thumbnail">{challenge.thumbnail_image}</div>
              <div class="challenge-info">
                <div class="unlock-chip" class:unlocked={challenge.progress_fraction >= 1.0}>
                  {challenge.progress_fraction >= 1.0 ? '✓ Reward unlocked' : 'Unlock reward'}
                </div>
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
                <div class="progress-fill" class:complete={challenge.progress_fraction >= 1.0} style="width: {challenge.progress_fraction * 100}%"></div>
              </div>
            </div>

            <div class="task-list">
              {#each challenge.tasks as task}
                <div class="task-item">
                  <div class="custom-checkbox" class:checked={task.is_complete}>
                    {#if task.is_complete}
                      <span class="check-mark">✓</span>
                    {/if}
                  </div>
                  <span class="task-text" class:complete={task.is_complete}>{task.description}</span>
                </div>
              {/each}
            </div>

            {#if challenge.progress_fraction >= 1.0}
              <button class="claim-reward-btn" on:click={() => switchTab('rewards')}>
                View reward in My Rewards <ChevronRight size={14} />
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </section>

  <!-- ═══════════════════════════════════════════ -->
  <!-- MY REWARDS TAB                              -->
  <!-- ═══════════════════════════════════════════ -->
  {:else}
    <!-- Elite/Diamond Access Strip -->
    <div class="access-strip">
      <div class="access-kpi">
        <div class="kpi-icon active">
          <Key size={16} />
        </div>
        <div class="kpi-content">
          <span class="kpi-value">{activePasses.length}</span>
          <span class="kpi-label">Active</span>
        </div>
      </div>

      <div class="access-kpi">
        <div class="kpi-icon expiring">
          <Clock size={16} />
        </div>
        <div class="kpi-content">
          <span class="kpi-value">{upcomingPasses.length}</span>
          <span class="kpi-label">Expiring soon</span>
        </div>
      </div>

      <div class="access-kpi">
        <div class="kpi-icon tier">
          <Star size={16} />
        </div>
        <div class="kpi-content">
          <span class="kpi-value">{currentTier.name}</span>
          <span class="kpi-label">Top tier</span>
        </div>
      </div>
    </div>

    <!-- Unlocked Rewards from Challenges -->
    {#if completedChallenges.length > 0}
      <section class="unlocked-section">
        <h2 class="section-header-padded">🎉 Newly unlocked</h2>
        <div class="unlocked-grid">
          {#each completedChallenges as challenge}
            <div class="card unlocked-card">
              <div class="unlocked-header">
                <span class="unlocked-thumbnail">{challenge.thumbnail_image}</span>
                <div class="unlocked-info">
                  <div class="claim-chip">CLAIM</div>
                  <h3 class="unlocked-title">{challenge.reward_name}</h3>
                  <p class="unlocked-source">From: {challenge.title}</p>
                </div>
              </div>
              <button class="claim-reward-action-btn">Claim reward</button>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Featured Access -->
    <section class="featured-section">
      <h2 class="section-header-padded">Featured access</h2>
      <div class="featured-grid">
        <div class="featured-card top-pick">
          <div class="featured-chip">TOP PICK</div>
          <div class="featured-content">
            <h3 class="featured-title">VIP Music Pass</h3>
            <p class="featured-subtitle">Skip lines at 12+ partner venues</p>
            <div class="featured-footer">
              <span class="featured-time">✓ Active now</span>
              <button class="view-pass-btn" class:active-btn={viewingPass} on:click={() => viewingPass = !viewingPass}>{viewingPass ? 'Viewing' : 'View pass'}</button>
            </div>
          </div>
        </div>

        <div class="featured-card limited">
          <div class="featured-chip limited">LIMITED</div>
          <div class="featured-content">
            <h3 class="featured-title">Lakers Playoff Access</h3>
            <p class="featured-subtitle">Premium seats + meet & greet</p>
            <div class="featured-footer">
              <span class="featured-time">⏱ 48h left</span>
              <button class="claim-btn" class:claimed={claimedAccess} on:click={() => claimedAccess = !claimedAccess}>{claimedAccess ? 'Claimed' : 'Claim access'}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Your Passes -->
    <section class="passes-section">
      <h2 class="section-header-padded">Your passes</h2>
      <div class="passes-list">
        {#each mockPasses as pass}
          <div class="pass-row">
            <div class="pass-icon" style="background-color: {pass.icon_color}">
              <Key size={20} color="white" />
            </div>
            <div class="pass-info">
              <h3 class="pass-name">{pass.name}</h3>
              <p class="pass-meta">{pass.venue} • {pass.date}</p>
            </div>
            <div class="pass-status {pass.status}">
              {#if pass.status === 'active'}
                Active
              {:else if pass.status === 'starts_soon'}
                Starts soon
              {:else}
                Waiting list
              {/if}
            </div>
            <div class="chevron">›</div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Perks by Tier -->
    <section class="perks-section">
      <h2 class="section-header-padded">Perks by tier</h2>
      <div class="tier-scroll">
        {#each Object.entries(tierPerks) as [key, tier]}
          <button
            class="tier-column"
            class:active={activeTier === key}
            on:click={() => activeTier = key}
          >
            <div class="tier-icon" style="background-color: {tier.color}">
              <Star size={20} color="white" />
            </div>
            <h3 class="tier-name">{tier.name}</h3>
            <div class="tier-underline" style="background-color: {tier.color}"></div>
            <ul class="perks-list">
              {#each tier.perks as perk}
                <li>{perk}</li>
              {/each}
            </ul>
          </button>
        {/each}
      </div>
    </section>

    <!-- Unlock Next -->
    <section class="unlock-next-section">
      <div class="card unlock-next-card">
        <div class="unlock-next-content">
          <span class="unlock-next-label">Next unlock</span>
          <h3 class="unlock-next-title">Platinum Tier</h3>
          <p class="unlock-next-desc">1,250 XP to go</p>
        </div>
        <div class="unlock-next-progress">
          <div class="unlock-next-bar">
            <div class="unlock-next-fill" style="width: {((mockFanProfile.xp_total - 5000) / (10000 - 5000)) * 100}%"></div>
          </div>
          <span class="unlock-next-fraction">{mockFanProfile.xp_total.toLocaleString()} / 10,000 XP</span>
        </div>
      </div>
    </section>
  {/if}
</div>

<style>
  /* ───────────────────────────────────────────── */
  /* Layout & Page Chrome                          */
  /* ───────────────────────────────────────────── */
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
    padding: 16px 16px 12px;
    background: var(--off-white);
  }

  .page-title {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 34px;
    font-weight: 700;
    margin: 0;
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

  /* ───────────────────────────────────────────── */
  /* Internal Tab Toggle                           */
  /* ───────────────────────────────────────────── */
  .toggle-container {
    padding: 0 16px 20px;
    background: var(--off-white);
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
    cursor: pointer;
    gap: 6px;
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

  .reward-dot {
    width: 8px;
    height: 8px;
    background: #FF5C00;
    border-radius: 50%;
    display: inline-block;
    animation: pulse-dot 1.5s ease infinite;
  }

  .toggle-option.active .reward-dot {
    background: #FFFFFF;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.3); }
  }

  /* ───────────────────────────────────────────── */
  /* Shared                                        */
  /* ───────────────────────────────────────────── */
  .card {
    background: var(--pure-white);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    padding: 16px;
  }

  .section-header-padded {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 16px 12px;
    color: var(--true-black);
  }

  .section-header {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 16px 12px;
    color: var(--true-black);
  }

  /* ───────────────────────────────────────────── */
  /* MY RANK: Score Summary                        */
  /* ───────────────────────────────────────────── */
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
    gap: 6px;
  }

  .large-score {
    font-size: 52px;
    font-weight: 700;
    line-height: 1;
  }

  .score-unit {
    font-size: 20px;
    color: var(--system-gray);
    font-weight: 600;
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

  .tier-star {
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

  /* ───────────────────────────────────────────── */
  /* MY RANK: Leaderboard                          */
  /* ───────────────────────────────────────────── */
  .leaderboard-section {
    margin: 0 16px 24px;
  }

  .card-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
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
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    cursor: pointer;
  }

  .friend-filter-row {
    margin-bottom: 12px;
  }

  .friend-filter-btn {
    background: var(--off-white);
    border: 1px solid var(--border-gray);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    color: var(--system-gray);
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  .friend-filter-btn.active {
    background: var(--action-orange);
    border-color: var(--action-orange);
    color: var(--pure-white);
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

  /* ───────────────────────────────────────────── */
  /* MY RANK: Friends Activity                     */
  /* ───────────────────────────────────────────── */
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

  .friends-scroll::-webkit-scrollbar {
    display: none;
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

  /* ───────────────────────────────────────────── */
  /* MY RANK: Challenges                           */
  /* ───────────────────────────────────────────── */
  .challenges-section {
    margin: 0 0 24px;
  }

  .challenges-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .challenge-card {
    position: relative;
  }

  .challenge-card.completed {
    border-color: var(--success-green);
    border-width: 1.5px;
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
    background: rgba(255, 92, 0, 0.1);
    color: var(--action-orange);
    font-size: 9px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .unlock-chip.unlocked {
    background: rgba(26, 158, 86, 0.15);
    color: var(--success-green);
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

  .progress-fill.complete {
    background: var(--success-green);
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

  .custom-checkbox {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 2px solid var(--border-gray);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .custom-checkbox.checked {
    background: var(--success-green);
    border-color: var(--success-green);
  }

  .check-mark {
    color: white;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
  }

  .task-text {
    font-size: 14px;
    color: var(--true-black);
  }

  .task-text.complete {
    text-decoration: line-through;
    color: var(--system-gray);
  }

  .claim-reward-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    margin-top: 12px;
    padding: 10px 16px;
    background: var(--action-orange);
    color: var(--pure-white);
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  .claim-reward-btn:hover {
    opacity: 0.85;
  }

  /* ───────────────────────────────────────────── */
  /* MY REWARDS: Access Strip                      */
  /* ───────────────────────────────────────────── */
  .access-strip {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin: 0 16px 24px;
    background: var(--pure-white);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    padding: 16px;
  }

  .access-kpi {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .kpi-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .kpi-icon.active {
    background: rgba(26, 158, 86, 0.15);
    color: var(--success-green);
  }

  .kpi-icon.expiring {
    background: rgba(255, 92, 0, 0.15);
    color: var(--action-orange);
  }

  .kpi-icon.tier {
    background: rgba(255, 215, 0, 0.15);
    color: #FFD700;
  }

  .kpi-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .kpi-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--true-black);
  }

  .kpi-label {
    font-size: 11px;
    color: var(--system-gray);
    text-align: center;
  }

  /* ───────────────────────────────────────────── */
  /* MY REWARDS: Unlocked Rewards                  */
  /* ───────────────────────────────────────────── */
  .unlocked-section {
    margin-bottom: 24px;
  }

  .unlocked-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
  }

  .unlocked-card {
    border-color: var(--success-green);
    border-width: 1.5px;
  }

  .unlocked-header {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }

  .unlocked-thumbnail {
    font-size: 32px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--off-white);
    border-radius: 12px;
  }

  .unlocked-info {
    flex: 1;
  }

  .claim-chip {
    display: inline-block;
    background: var(--action-orange);
    color: var(--pure-white);
    font-size: 9px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .unlocked-title {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .unlocked-source {
    font-size: 12px;
    color: var(--system-gray);
    margin: 0;
  }

  .claim-reward-action-btn {
    width: 100%;
    padding: 10px;
    background: var(--action-orange);
    color: var(--pure-white);
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  .claim-reward-action-btn:hover {
    opacity: 0.85;
  }

  /* ───────────────────────────────────────────── */
  /* MY REWARDS: Featured Access                   */
  /* ───────────────────────────────────────────── */
  .featured-section {
    margin-bottom: 24px;
  }

  .featured-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0 16px;
  }

  .featured-card {
    background: linear-gradient(135deg, #111 0%, #3D1800 100%);
    color: var(--pure-white);
    border-radius: 16px;
    padding: 16px;
    min-height: 180px;
    display: flex;
    flex-direction: column;
  }

  .featured-card.top-pick {
    background: linear-gradient(135deg, var(--deep-navy) 0%, var(--deeper-indigo) 100%);
  }

  .featured-card.limited {
    background: linear-gradient(135deg, #FF5C00 0%, #CC4700 100%);
  }

  .featured-chip {
    display: inline-block;
    background: rgba(255, 255, 255, 0.25);
    color: var(--pure-white);
    font-size: 9px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    align-self: flex-start;
  }

  .featured-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .featured-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .featured-subtitle {
    font-size: 13px;
    margin-bottom: auto;
    opacity: 0.9;
  }

  .featured-footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }

  .featured-time {
    font-size: 11px;
    opacity: 0.8;
  }

  .view-pass-btn, .claim-btn {
    background: rgba(255, 255, 255, 0.2);
    color: var(--pure-white);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 99px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  .view-pass-btn:hover, .claim-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .claim-btn.claimed {
    background: var(--success-green);
    border-color: var(--success-green);
  }

  .view-pass-btn.active-btn {
    background: rgba(255, 255, 255, 0.4);
    border-color: var(--pure-white);
  }

  /* ───────────────────────────────────────────── */
  /* MY REWARDS: Passes                            */
  /* ───────────────────────────────────────────── */
  .passes-section {
    margin-bottom: 24px;
  }

  .passes-list {
    background: var(--pure-white);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    margin: 0 16px;
    overflow: hidden;
  }

  .pass-row {
    display: flex;
    align-items: center;
    padding: 14px;
    gap: 12px;
    border-bottom: 1px solid var(--border-gray);
  }

  .pass-row:last-child {
    border-bottom: none;
  }

  .pass-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pass-info {
    flex: 1;
  }

  .pass-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .pass-meta {
    font-size: 12px;
    color: var(--system-gray);
    margin: 0;
  }

  .pass-status {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 10px;
    text-transform: uppercase;
  }

  .pass-status.active {
    background: var(--success-green);
    color: var(--pure-white);
  }

  .pass-status.starts_soon {
    background: var(--action-orange);
    color: var(--pure-white);
  }

  .pass-status.waiting {
    background: var(--border-gray);
    color: var(--system-gray);
  }

  .chevron {
    color: var(--system-gray);
    font-size: 18px;
  }

  /* ───────────────────────────────────────────── */
  /* MY REWARDS: Perks by Tier                     */
  /* ───────────────────────────────────────────── */
  .perks-section {
    margin: 0 0 24px;
  }

  .tier-scroll {
    display: flex;
    gap: 12px;
    padding: 0 16px;
    overflow-x: auto;
  }

  .tier-scroll::-webkit-scrollbar {
    display: none;
  }

  .tier-column {
    background: var(--pure-white);
    border: 1.5px solid var(--border-gray);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 140px;
    flex-shrink: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  .tier-column.active {
    border-color: var(--action-orange);
  }

  .tier-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  .tier-name {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 8px;
    text-align: center;
  }

  .tier-underline {
    width: 30px;
    height: 3px;
    border-radius: 2px;
    margin-bottom: 12px;
  }

  .perks-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 11px;
    color: var(--system-gray);
    text-align: center;
  }

  .perks-list li {
    margin-bottom: 6px;
    line-height: 1.3;
  }

  /* ───────────────────────────────────────────── */
  /* MY REWARDS: Unlock Next                       */
  /* ───────────────────────────────────────────── */
  .unlock-next-section {
    margin: 0 16px 24px;
  }

  .unlock-next-card {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .unlock-next-content {
    flex-shrink: 0;
  }

  .unlock-next-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--system-gray);
    letter-spacing: 0.5px;
  }

  .unlock-next-title {
    font-size: 17px;
    font-weight: 700;
    margin: 4px 0 2px;
  }

  .unlock-next-desc {
    font-size: 13px;
    color: var(--action-orange);
    font-weight: 600;
    margin: 0;
  }

  .unlock-next-progress {
    flex: 1;
  }

  .unlock-next-bar {
    height: 6px;
    background: var(--border-gray);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .unlock-next-fill {
    height: 100%;
    background: var(--action-orange);
    border-radius: 3px;
    transition: width 0.6s ease;
  }

  .unlock-next-fraction {
    font-size: 11px;
    color: var(--system-gray);
  }
</style>
