<script>
  import { Bell, Check, Heart, Shield, Star, Diamond, HelpCircle, Flame } from 'lucide-svelte';

  export let data;

  $: fan = data.fan;
  $: universalBreakdown = data.universalBreakdown ?? [];
  $: tierProgression = data.tierProgression ?? [];
  $: pointSources = data.pointSources ?? [];

  // Lucide component for each tier band (matches the chip + the timeline icon).
  const tierIcons = { Newcomer: Heart, Fan: Heart, Loyal: Shield, Superfan: Star, Elite: Diamond };

  // Compact number formatter for the tier range labels (1K/100K/1M).
  function fmtCompact(n) {
    if (n == null) return '∞';
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
    return n.toLocaleString();
  }
  function tierRangeLabel(t) {
    return t.range_high == null
      ? `${fmtCompact(t.range_low)}+ pts`
      : `${fmtCompact(t.range_low)}–${fmtCompact(t.range_high)} pts`;
  }
</script>

<svelte:head><title>Score - Maxess</title></svelte:head>

<div class="page-container">
  <header class="page-header">
    <h1 class="page-title">Score</h1>
    <a href="/profile/notifications" class="bell-btn" aria-label="Notifications">
      <Bell size={22} color="#FFFFFF" />
      <span class="bell-dot"></span>
    </a>
  </header>

  {#if fan}
    <!-- Universal Balance hero card -->
    <section class="card balance-card">
      <span class="balance-label">Universal Balance</span>
      <div class="balance-row">
        <span class="balance-value">{fan.xp_total.toLocaleString()}</span>
        <span class="balance-unit">pts</span>
      </div>
      <span class="balance-sub">Points never expire</span>

      <!-- Top-3 fandom mini-rows separated by hairlines -->
      <ul class="balance-fandoms">
        {#each universalBreakdown as f, i (f.id)}
          <li class="fandom" class:fandom--first={i === 0}>
            <div class="fandom-thumb">
              {#if f.image}
                <img src={f.image} alt={f.name} />
              {:else}
                <span>{f.name.slice(0, 1)}</span>
              {/if}
            </div>
            <div class="fandom-body">
              <div class="fandom-name">{f.name}</div>
              <div class="fandom-pts">
                <span class="fandom-pts-val">{f.points.toLocaleString()}</span>
                <span class="fandom-pts-unit">pts</span>
              </div>
              <span
                class="chip"
                class:chip--filled={f.tier_name === 'Elite'}
                style:--chip-color={f.tier_color}
              >
                <svelte:component this={tierIcons[f.tier_name] ?? Heart} size={11} />
                {f.tier_name}
              </span>
            </div>
          </li>
        {/each}
      </ul>
    </section>

    <!-- Universal Point System diagram -->
    <h2 class="section-heading">The Universal Point System</h2>
    <section class="card engine-card">
      <div class="engine-grid">
        {#each pointSources as s (s.id)}
          <div class="source-tile">
            <div class="source-icon" class:source-icon--spotify={s.icon === 'spotify'}>
              {#if s.icon === 'check'}
                <Check size={20} color="#FF5C00" />
              {:else if s.icon === 'spotify'}
                <svg viewBox="0 0 168 168" width="22" height="22" aria-hidden="true">
                  <circle cx="84" cy="84" r="84" fill="#1DB954" />
                  <path fill="#000" d="M122.7 119.6c-1.7 2.8-5.3 3.6-8.1 1.9-22.2-13.6-50.2-16.6-83.2-9.1-3.2.7-6.4-1.3-7.1-4.5-.7-3.2 1.3-6.4 4.5-7.1 35.9-8.2 66.7-4.7 91.4 10.6 2.7 1.7 3.6 5.4 1.9 8.1zm10.2-22.7c-2.2 3.5-6.7 4.5-10.2 2.4-25.4-15.6-64.1-20.1-94.1-10.9-3.9 1.2-8.1-1-9.3-4.9-1.2-3.9 1-8.1 4.9-9.3 34.4-10.4 76.9-5.4 105.9 12.5 3.4 2.2 4.5 6.7 2.3 10.2zm.9-23.7C103.2 55.3 53.7 53 25.1 61.7c-4.7 1.4-9.6-1.2-11.1-5.9-1.4-4.7 1.2-9.6 5.9-11.1 32.7-9.9 87.5-7.5 122.1 13 4.2 2.5 5.6 8 3.1 12.2-2.5 4.2-8 5.6-12.2 3.1z"/>
                </svg>
              {:else if s.icon === 'trivia'}
                <HelpCircle size={20} color="#FF5C00" />
              {:else}
                <Flame size={20} color="#FF5C00" />
              {/if}
            </div>
            <div class="source-text">
              <div class="source-label">{s.label}</div>
              <div class="source-rate">{s.rate_label}</div>
            </div>
          </div>
        {/each}

        <!-- Center orb: rendered as a separate absolutely-positioned element so
             the orange glow stays crisp regardless of grid sizing. -->
        <div class="engine-orb" aria-hidden="true">
          <span>POINT</span>
          <span>ENGINE</span>
        </div>
      </div>

      <p class="engine-caption">
        One universal balance. Points accumulate per artist or team separately and never expire.
      </p>
    </section>

    <!-- Tier progression timeline -->
    <h2 class="section-heading">Tier progression</h2>
    <section class="card tier-card">
      {#each tierProgression as t, i (t.name)}
        <div class="tier-row" class:tier-row--active={t.is_active}>
          <!-- Left rail: diamond marker + connecting line -->
          <div class="tier-rail">
            <span class="tier-marker" style:background={t.is_active ? '#FF5C00' : '#FF5C00'} aria-hidden="true"></span>
            {#if i < tierProgression.length - 1}
              <span class="tier-line" aria-hidden="true"></span>
            {/if}
          </div>

          <!-- Tier glyph card -->
          <div class="tier-glyph" class:tier-glyph--active={t.is_active}>
            {#if t.is_active}
              <Diamond size={20} color="#FF5C00" fill="#FF5C00" />
            {:else}
              <svelte:component this={tierIcons[t.name] ?? Heart} size={20} color="#8E8E93" />
            {/if}
          </div>

          <!-- Name + range -->
          <div class="tier-info">
            <div class="tier-name">{t.name}</div>
            <div class="tier-range">{tierRangeLabel(t)}</div>
          </div>

          <!-- Perks (right column, multiline allowed) -->
          <div class="tier-perks">
            {t.perks.join(', ')}
          </div>
        </div>
      {/each}

      <p class="tier-caption">
        Points unlock the tier. The tier gates what can be redeemed.<br/>
        Points are the redemption currency. Tier is specific to each artist or team independently.
      </p>
    </section>
  {:else}
    <div class="empty"><p>Unable to load score. Please try again later.</p></div>
  {/if}
</div>

<style>
  .page-container {
    background: #000000;
    min-height: 100vh;
    padding: 0 16px 120px;
    color: #FFFFFF;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 16px;
  }

  .page-title {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #FFFFFF;
    margin: 0;
  }

  .bell-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid #2C2C2E;
  }

  .bell-dot {
    position: absolute;
    top: 8px;
    right: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FF5C00;
    border: 2px solid #000000;
  }

  /* Generic card surface. */
  .card {
    background: #0E0E10;
    border: 1px solid #1F1F21;
    border-radius: 18px;
    padding: 18px 16px;
  }

  .section-heading {
    font-size: 18px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 22px 0 12px;
    padding: 0 2px;
  }

  /* ── Universal Balance ──────────────────────────────────────────── */
  .balance-card {
    margin-bottom: 4px;
  }
  .balance-label {
    font-size: 14px;
    color: #8E8E93;
    display: block;
    margin-bottom: 4px;
  }
  .balance-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 4px;
  }
  .balance-value {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -1px;
    color: #FFFFFF;
    line-height: 1;
  }
  .balance-unit {
    font-size: 20px;
    color: #FFFFFF;
    font-weight: 500;
  }
  .balance-sub {
    font-size: 13px;
    color: #8E8E93;
    display: block;
    margin-bottom: 18px;
  }

  /* Top-3 fandom rows displayed as a 3-column grid divided by hairline rules. */
  .balance-fandoms {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
  .fandom {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 0 12px;
    border-left: 1px solid #1F1F21;
  }
  .fandom.fandom--first { border-left: none; padding-left: 0; }

  .fandom-thumb {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    overflow: hidden;
    background: #1F1F21;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-weight: 700;
    flex-shrink: 0;
  }
  .fandom-thumb img { width: 100%; height: 100%; object-fit: cover; }

  .fandom-body { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
  .fandom-name {
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .fandom-pts { display: inline-flex; align-items: baseline; gap: 3px; }
  .fandom-pts-val { font-size: 14px; font-weight: 700; color: #FFFFFF; }
  .fandom-pts-unit { font-size: 11px; color: #8E8E93; }

  /* Tier chip — outlined by default; "filled" reserved for Elite per mockup. */
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 99px;
    border: 1.5px solid var(--chip-color, #8E8E93);
    color: var(--chip-color, #8E8E93);
    background: transparent;
    font-size: 11px;
    font-weight: 600;
    flex-shrink: 0;
    align-self: flex-start;
  }
  .chip--filled {
    background: rgba(255, 92, 0, 0.12);
    color: var(--chip-color);
  }

  /* ── Universal Point System diagram ─────────────────────────────── */
  .engine-card {
    position: relative;
    padding: 22px 18px 18px;
  }

  .engine-grid {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 90px;
    row-gap: 14px;
    z-index: 1;
  }

  .source-tile {
    background: #1A1A1C;
    border: 1px solid #2C2C2E;
    border-radius: 12px;
    padding: 12px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 76px;
  }

  .source-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 92, 0, 0.12);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .source-icon--spotify { background: transparent; }

  .source-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .source-label {
    font-size: 13px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 1.2;
  }
  .source-rate {
    font-size: 14px;
    font-weight: 700;
    color: #FF5C00;
  }

  /* Center orb — positioned over the SVG wires' meeting point. */
  .engine-orb {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #000000;
    border: 2px solid #FF5C00;
    box-shadow:
      0 0 12px rgba(255, 92, 0, 0.5),
      0 0 36px rgba(255, 92, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 1.1;
    pointer-events: none;
  }

  .engine-caption {
    margin: 18px 0 0;
    text-align: center;
    color: #8E8E93;
    font-size: 12px;
    line-height: 1.4;
  }

  /* ── Tier progression timeline ──────────────────────────────────── */
  .tier-card {
    padding: 18px 16px 8px;
  }

  .tier-row {
    display: grid;
    grid-template-columns: 24px 50px 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #1F1F21;
    position: relative;
  }
  .tier-row:last-of-type { border-bottom: none; }

  /* Active row gets the orange-outlined container from the mockup. We use a
     pseudo-element so the outline doesn't disrupt the grid layout. */
  .tier-row--active::after {
    content: '';
    position: absolute;
    inset: 6px -6px;
    border: 1.5px solid #FF5C00;
    border-radius: 12px;
    pointer-events: none;
  }

  .tier-rail {
    position: relative;
    width: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 18px;
  }
  .tier-marker {
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    background: #FF5C00;
    border-radius: 2px;
    box-shadow: 0 0 0 1.5px #000000;
    z-index: 1;
  }
  .tier-line {
    position: absolute;
    top: 24px;
    bottom: -28px;
    left: 50%;
    width: 1.5px;
    background: #FF5C00;
    transform: translateX(-50%);
    z-index: 0;
  }

  .tier-glyph {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #1A1A1C;
    border: 1px solid #2C2C2E;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .tier-glyph--active {
    background: rgba(255, 92, 0, 0.15);
    border-color: #FF5C00;
  }

  .tier-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .tier-name {
    font-size: 17px;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.2px;
  }
  .tier-range {
    font-size: 13px;
    color: #8E8E93;
  }

  .tier-perks {
    font-size: 12px;
    color: #C7C7CC;
    line-height: 1.35;
    max-width: 220px;
    text-align: right;
  }

  .tier-caption {
    text-align: center;
    color: #8E8E93;
    font-size: 12px;
    line-height: 1.4;
    margin: 14px 0 6px;
  }

  .empty {
    text-align: center;
    padding: 60px 16px;
    color: #8E8E93;
  }
</style>
