<script>
  import { TIERS } from '$lib/domain/xp.js';

  export let stats;

  // Show all 4 tiers in the rail
  const tierRail = TIERS.slice(0, 4);

  $: currentTierIndex = stats
    ? tierRail.findIndex(t => t.name === stats.tier.name)
    : -1;

  $: progressPct = (() => {
    if (!stats || currentTierIndex < 0) return 0;
    // Map current tier position to a % of the track
    // Each segment is 1/(tierRail.length - 1) of the total width
    const segments = tierRail.length - 1;
    const segWidth = 100 / segments;
    // How far along the current tier segment?
    const intraSegment = currentTierIndex < segments
      ? stats.tierProgress * segWidth
      : segWidth;
    return currentTierIndex * segWidth + intraSegment;
  })();

  $: xpToNext = stats?.xpToNextTier ?? 0;
  $: nextTierName = (stats && currentTierIndex >= 0 && currentTierIndex < tierRail.length - 1)
    ? tierRail[currentTierIndex + 1].name
    : null;
</script>

<div class="progress-card">
  <div class="progress-header">
    <div class="header-left">
      <span class="progress-title">PROGRESS TO {nextTierName ? nextTierName.toUpperCase() + '+' : 'MAX'}</span>
      <div class="info-icon">ⓘ</div>
    </div>
    {#if xpToNext > 0}
      <div class="header-right">
        <span class="points-value">{xpToNext.toLocaleString()} pts</span>
        <span class="points-label">to next tier</span>
      </div>
    {:else}
      <div class="header-right">
        <span class="points-value">Max tier!</span>
      </div>
    {/if}
  </div>

  <div class="progress-track">
    <div class="progress-bar">
      <div class="progress-fill" style="width: {progressPct}%"></div>
    </div>

    <div class="tier-dots">
      {#each tierRail as tier, i}
        <div
          class="tier-dot"
          class:completed={i < currentTierIndex}
          class:active={i === currentTierIndex}
          style="left: {(i / (tierRail.length - 1)) * 100}%"
        >
          {#if i < currentTierIndex}
            <div class="checkmark">✓</div>
          {:else if i === currentTierIndex}
            <div class="active-ring"></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="tier-labels">
    {#each tierRail as tier, i}
      <div class="tier-label" style="left: {(i / (tierRail.length - 1)) * 100}%">
        <div class="tier-name" class:current-name={i === currentTierIndex}>{tier.name}</div>
        <div class="tier-points">{tier.xp_threshold.toLocaleString()}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .progress-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 20px;
    margin: 0 16px 20px;
    padding: 20px;
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .progress-title {
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    letter-spacing: 0.5px;
  }

  .info-icon { font-size: 16px; color: #8E8E93; }

  .header-right { text-align: right; }

  .points-value {
    font-size: 17px;
    font-weight: 600;
    color: #FF5C00;
    display: block;
    line-height: 1.2;
  }

  .points-label {
    font-size: 13px;
    color: #8E8E93;
  }

  .progress-track {
    position: relative;
    margin-bottom: 20px;
  }

  .progress-bar {
    height: 4px;
    background: #E5E5EA;
    border-radius: 2px;
    overflow: visible;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    background: #FF5C00;
    border-radius: 2px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tier-dots {
    position: absolute;
    top: -8px;
    left: 0;
    right: 0;
    height: 20px;
  }

  .tier-dot {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 92, 0, 0.25);
    border: 2px solid #FFFFFF;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tier-dot.completed { background: #8E8E93; }
  .tier-dot.active    { background: #FF5C00; }

  .checkmark {
    font-size: 10px;
    color: #FFFFFF;
    font-weight: bold;
  }

  .active-ring {
    position: absolute;
    top: -4px; left: -4px; right: -4px; bottom: -4px;
    border: 2px solid #FF5C00;
    border-radius: 50%;
    opacity: 0.3;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%   { transform: scale(1);   opacity: 0.3; }
    50%  { transform: scale(1.1); opacity: 0.1; }
    100% { transform: scale(1);   opacity: 0.3; }
  }

  .tier-labels {
    position: relative;
    height: 40px;
  }

  .tier-label {
    position: absolute;
    transform: translateX(-50%);
    text-align: center;
    min-width: 60px;
  }

  .tier-label:first-child {
    transform: translateX(0);
    text-align: left;
  }

  .tier-label:last-child {
    transform: translateX(-100%);
    text-align: right;
  }

  .tier-name {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 2px;
  }

  .tier-name.current-name { color: #FF5C00; }

  .tier-points {
    font-size: 11px;
    color: #8E8E93;
  }
</style>
