<script>
  export let stats;

  // Data from the mockup
  const progressData = {
    title: "PROGRESS TO ELITE+",
    pointsToNext: "1,650 pts",
    nextTierLabel: "to next tier",
    tiers: [
      { name: "General", points: "0", completed: true, active: false },
      { name: "Loyal", points: "1,000", completed: true, active: false },
      { name: "Superfan", points: "2,500", completed: false, active: true },
      { name: "Elite", points: "5,000", completed: false, active: false }
    ]
  };

  // Superfan is at position 2/3 (66.6%) of the track
  const progressPercentage = 66.6;
</script>

<div class="progress-card">
  <!-- Header -->
  <div class="progress-header">
    <div class="header-left">
      <span class="progress-title">{progressData.title}</span>
      <div class="info-icon">ⓘ</div>
    </div>
    <div class="header-right">
      <span class="points-value">{progressData.pointsToNext}</span>
      <span class="points-label">{progressData.nextTierLabel}</span>
    </div>
  </div>
  
  <!-- Progress Track -->
  <div class="progress-track">
    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress-fill" style="width: {progressPercentage}%"></div>
    </div>
    
    <!-- Tier Dots -->
    <div class="tier-dots">
      {#each progressData.tiers as tier, index}
        <div 
          class="tier-dot" 
          class:completed={tier.completed}
          class:active={tier.active}
          style="left: {(index / 3) * 100}%"
        >
          {#if tier.completed}
            <div class="checkmark">✓</div>
          {:else if tier.active}
            <div class="active-ring"></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Tier Labels -->
  <div class="tier-labels">
    {#each progressData.tiers as tier, index}
      <div class="tier-label" style="left: {(index / 3) * 100}%">
        <div class="tier-name">{tier.name}</div>
        <div class="tier-points">{tier.points}</div>
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

  /* Header */
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
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    letter-spacing: 0.5px;
  }

  .info-icon {
    font-size: 16px;
    color: #8E8E93;
  }

  .header-right {
    text-align: right;
  }

  .points-value {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: #FF5C00;
    display: block;
    line-height: 1.2;
  }

  .points-label {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #8E8E93;
  }

  /* Progress Track */
  .progress-track {
    position: relative;
    margin-bottom: 20px;
  }

  .progress-bar {
    height: 4px;
    background: #E5E5EA;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #FF5C00;
    border-radius: 2px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Tier Dots */
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

  .tier-dot.completed {
    background: #8E8E93;
  }

  .tier-dot.active {
    background: #FF5C00;
  }

  .checkmark {
    font-size: 10px;
    color: #FFFFFF;
    font-weight: bold;
  }

  .active-ring {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid #FF5C00;
    border-radius: 50%;
    opacity: 0.3;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.1;
    }
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
  }

  /* Tier Labels */
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
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 2px;
  }

  .tier-points {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: #8E8E93;
  }
</style>