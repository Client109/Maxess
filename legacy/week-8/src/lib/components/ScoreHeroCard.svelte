<script>
  import { onMount } from 'svelte';
  import { Flame, Star } from 'lucide-svelte';
  
  export let fan;
  export let stats;
  export let animated = false;

  let displayScore = 91; // Fixed to match mockup
  
  // Mockup data
  const mockData = {
    score: 91,
    maxScore: 100,
    streak: 8,
    tier: "Elite",
    topPercentage: "3%",
    fanBase: "Ducks fans",
    topTeam: "Anaheim Ducks",
    homeVenue: "Honda Center"
  };

  onMount(() => {
    // Use mock data for demonstration
  });
</script>

<div class="hero-card" class:animated>
  <!-- Background stadium image would go here -->
  <div class="card-background"></div>
  
  <div class="card-content">
    <!-- Header Label -->
    <div class="score-label">SUPERFAN SCORE</div>
    
    <!-- Main Content Row -->
    <div class="main-row">
      <!-- Score Section -->
      <div class="score-section">
        <div class="score-display">
          <span class="score-number">91</span>
          <span class="score-denominator">/100</span>
        </div>
        
        <!-- Elite Badge -->
        <div class="elite-badge">
          <Star size={12} fill="#FF5C00" color="#FF5C00" />
          <span>Elite</span>
        </div>
      </div>
      
      <!-- Right Side Stats -->
      <div class="right-stats">
        <!-- Streak -->
        <div class="streak-section">
          <div class="streak-badge">
            <Flame size={16} fill="#FF5C00" color="#FF5C00" />
            <span class="streak-number">8</span>
          </div>
          <div class="streak-label">GAME STREAK</div>
          <div class="streak-divider"></div>
        </div>

        <!-- Top Percentage -->
        <div class="percentage-section">
          <div class="percentage-main">Top 3%</div>
          <div class="percentage-subtitle">of Ducks fans</div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Info -->
    <div class="bottom-info">
      <div class="info-item">
        <div class="info-label">Top team</div>
        <div class="info-value">Anaheim Ducks</div>
      </div>
      <div class="info-divider"></div>
      <div class="info-item">
        <div class="info-label">Home venue</div>
        <div class="info-value">Honda Center</div>
      </div>
    </div>
  </div>
</div>

<style>
  .hero-card {
    position: relative;
    margin: 0 16px 16px;
    border-radius: 20px;
    overflow: hidden;
    min-height: 200px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%);
  }

  .card-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%);
    /* Stadium background image would be overlaid here */
    background-image: 
      radial-gradient(circle at 70% 30%, rgba(255, 140, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 30% 70%, rgba(255, 92, 0, 0.05) 0%, transparent 50%);
  }

  .card-content {
    position: relative;
    z-index: 2;
    padding: 20px;
    color: #FFFFFF;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Header Label */
  .score-label {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
    margin-bottom: 16px;
  }

  /* Main Row */
  .main-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: auto;
  }

  /* Score Section */
  .score-section {
    flex: 1;
  }

  .score-display {
    display: flex;
    align-items: baseline;
    margin-bottom: 12px;
  }

  .score-number {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 72px;
    font-weight: 700;
    line-height: 0.9;
    color: #FFFFFF;
    letter-spacing: -2px;
  }

  .score-denominator {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 4px;
  }

  .elite-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #000000;
    color: #FFFFFF;
    padding: 6px 12px;
    border-radius: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 600;
  }

  /* Right Side Stats */
  .right-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
  }

  /* Streak Section */
  .streak-section {
    text-align: right;
  }

  .streak-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }

  .streak-number {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1;
  }

  .streak-label {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: #FF5C00;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .streak-divider {
    width: 100%;
    height: 2px;
    background: #FF5C00;
    border-radius: 1px;
  }

  /* Percentage Section */
  .percentage-section {
    text-align: right;
  }

  .percentage-main {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.2;
    margin-bottom: 2px;
  }

  .percentage-subtitle {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
  }

  /* Bottom Info */
  .bottom-info {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
  }

  .info-item {
    flex: 1;
  }

  .info-label {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 2px;
  }

  .info-value {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: #FFFFFF;
  }

  .info-divider {
    width: 1px;
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
  }

  /* Animation */
  .hero-card.animated {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>