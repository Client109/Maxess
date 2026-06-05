<script>
  import { Flame, Star } from 'lucide-svelte';

  export let fan;
  export let stats;
  export let animated = false;
  export let mode = 'sports'; // 'music' | 'sports'

  let displayScore = 0;
  let hasAnimated = false;

  $: if (animated && !hasAnimated && fan?.superfan_score != null) {
    hasAnimated = true;
    animateScore(fan.superfan_score);
  }

  function animateScore(target) {
    const duration = 800;
    const start = Date.now();
    function tick() {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      displayScore = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  $: tierName = stats?.tier?.name ?? 'Elite';
  $: streak = fan?.streak_days ?? 0;
  $: percentile = fan?.percentile ?? 0;

  $: bottomLabel1 = mode === 'sports' ? 'Top team' : 'Top artist';
  $: bottomValue1 = mode === 'sports'
    ? (fan?.top_team ?? fan?.top_artist ?? '')
    : (fan?.top_artist ?? '');
  $: bottomLabel2 = mode === 'sports' ? 'Home venue' : 'Top venue';
  $: bottomValue2 = fan?.top_venue ?? '';
  $: streakLabel = mode === 'sports' ? 'GAME STREAK' : 'DAY STREAK';

  // Category accent — blue for music, orange for sports
  $: accent = mode === 'music' ? '#2667FF' : '#FF5C00';

  // Gradient shifts based on mode
  $: bgGradient = mode === 'sports'
    ? 'linear-gradient(135deg, #FF5C00 0%, #C13800 100%)'
    : 'linear-gradient(135deg, #2667FF 0%, #3B28CC 100%)';
</script>

<div class="hero-card" class:animated style="background: {bgGradient}">
  <div class="card-background" style="background: {bgGradient}"></div>

  <div class="card-content">
    <div class="score-label">SUPERFAN SCORE</div>

    <div class="main-row">
      <div class="score-section">
        <div class="score-display">
          <span class="score-number">{displayScore}</span>
          <span class="score-denominator">/100</span>
        </div>
        <div class="elite-badge">
          <Star size={12} fill="#FF5C00" color="#FF5C00" />
          <span>{tierName}</span>
        </div>
      </div>

      <div class="right-stats">
        <div class="streak-section">
          <div class="streak-badge">
            <Flame size={16} fill={accent} color={accent} />
            <span class="streak-number">{streak}</span>
          </div>
          <div class="streak-label" style:color={accent}>{streakLabel}</div>
          <div class="streak-divider" style:background={accent}></div>
        </div>
        <div class="percentage-section">
          <div class="percentage-main">Top {percentile}%</div>
          <div class="percentage-subtitle">of fans</div>
        </div>
      </div>
    </div>

    <div class="bottom-info">
      <div class="info-item">
        <div class="info-label">{bottomLabel1}</div>
        <div class="info-value">{bottomValue1}</div>
      </div>
      <div class="info-divider"></div>
      <div class="info-item">
        <div class="info-label">{bottomLabel2}</div>
        <div class="info-value">{bottomValue2}</div>
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
    transition: background 0.3s ease;
  }

  .card-background {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 70% 30%, rgba(255, 140, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 30% 70%, rgba(255, 92, 0, 0.05) 0%, transparent 50%);
  }

  .card-content {
    position: relative;
    z-index: 2;
    padding: 20px;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .score-label {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
    margin-bottom: 16px;
  }

  .main-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: auto;
  }

  .score-section { flex: 1; }

  .score-display {
    display: flex;
    align-items: baseline;
    margin-bottom: 12px;
  }

  .score-number {
    font-size: 72px;
    font-weight: 700;
    line-height: 0.9;
    color: #FFFFFF;
    letter-spacing: -2px;
  }

  .score-denominator {
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
    font-size: 14px;
    font-weight: 600;
  }

  .right-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
  }

  .streak-section { text-align: right; }

  .streak-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }

  .streak-number {
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1;
  }

  .streak-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .streak-divider {
    width: 100%;
    height: 2px;
    border-radius: 1px;
  }

  .percentage-section { text-align: right; }

  .percentage-main {
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.2;
    margin-bottom: 2px;
  }

  .percentage-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }

  .bottom-info {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
  }

  .info-item { flex: 1; }

  .info-label {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 2px;
  }

  .info-value {
    font-size: 17px;
    font-weight: 600;
    color: #FFFFFF;
  }

  .info-divider {
    width: 1px;
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
  }

  .hero-card.animated {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
