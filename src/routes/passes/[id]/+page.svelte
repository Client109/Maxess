<script>
  import { ArrowLeft, Check, Wallet } from 'lucide-svelte';

  export let data;

  $: pass = data.pass;
  $: tier = data.tier;
  $: description = data.description;
  $: validUntil = data.valid_until ? new Date(data.valid_until) : null;
  $: claimedAt = data.claimed_at ? new Date(data.claimed_at) : null;
  $: walletEnabled = data.wallet_enabled;

  const tierColors = {
    ELITE: '#FF5C00',
    SUPERFAN: '#3B28CC',
    LOYAL: '#CD7F32',
    GENERAL: '#8E8E93',
  };

  const tierPerks = {
    ELITE: ['Presale access', 'Backstage passes', 'Meet & greets', 'Personal concierge'],
    SUPERFAN: ['Priority notifications', 'Early bird pricing', 'VIP seating options'],
    LOYAL: ['Early notifications', 'Points on purchases', 'Member pricing'],
    GENERAL: ['Basic event access', 'Standard ticketing', 'Community membership'],
  };

  $: color = tierColors[tier] || '#8E8E93';
  $: perks = tierPerks[tier] || tierPerks.GENERAL;

  function statusLabel(s) {
    if (s === 'active') return 'Active';
    if (s === 'starts_soon') return 'Starts soon';
    return 'Available';
  }

  function statusColor(s) {
    if (s === 'active') return '#34D399';
    if (s === 'starts_soon') return '#FF5C00';
    return '#8E8E93';
  }

  function formatDate(d) {
    if (!d) return '—';
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>{pass.name} - Maxess</title>
</svelte:head>

<div class="page">
  <!-- Header -->
  <header class="header">
    <a href="/score" class="back-btn">
      <ArrowLeft size={22} />
    </a>
    <h1 class="header-title">{pass.name}</h1>
    <div class="header-spacer"></div>
  </header>

  <!-- Visual Pass Card -->
  <div class="pass-hero" style="background: linear-gradient(160deg, #0f1923 0%, {color}33 60%, {color}22 100%)">
    <div class="hero-top">
      <span class="tier-badge" style="background: {color}">{tier}</span>
      <span class="status-chip" style="background: {statusColor(pass.status)}20; color: {statusColor(pass.status)}">
        {statusLabel(pass.status)}
      </span>
    </div>
    <h2 class="hero-name">{pass.name}</h2>
    <p class="hero-venue">{pass.venue}</p>
    <div class="hero-divider"></div>
    <div class="hero-bottom">
      <span class="hero-validity">
        {#if validUntil}
          Valid through {validUntil.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        {:else}
          No expiry
        {/if}
      </span>
      <span class="hero-id">{pass.pass_id}</span>
    </div>
  </div>

  <!-- Details Card -->
  <div class="details-card">
    <div class="detail-row">
      <span class="detail-label">Status</span>
      <span class="detail-value">
        <span class="status-dot" style="background: {statusColor(pass.status)}"></span>
        {statusLabel(pass.status)}
      </span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Tier</span>
      <span class="detail-value">{tier[0]}{tier.slice(1).toLowerCase()}</span>
    </div>
    {#if claimedAt}
      <div class="detail-row">
        <span class="detail-label">Claimed</span>
        <span class="detail-value">{formatDate(claimedAt)}</span>
      </div>
    {/if}
    <div class="detail-row last">
      <span class="detail-label">XP required</span>
      <span class="detail-value">{pass.xp_tier_required.toLocaleString()} pts</span>
    </div>
  </div>

  <!-- Add to Apple Wallet -->
  {#if walletEnabled}
    <a
      class="wallet-btn"
      href="/api/passes/{pass.pass_id}/wallet"
      download
    >
      <Wallet size={18} />
      Add to Apple Wallet
    </a>
  {/if}

  <!-- About -->
  {#if description}
    <section class="section">
      <h3 class="section-title">About</h3>
      <p class="about-text">{description}</p>
    </section>
  {/if}

  <!-- Perks -->
  <section class="section">
    <h3 class="section-title">Perks</h3>
    <ul class="perks-list">
      {#each perks as perk}
        <li class="perk-item">
          <span class="perk-check" style="color: {color}">
            <Check size={16} />
          </span>
          {perk}
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  .page {
    background: var(--bg-primary);
    min-height: 100vh;
    padding-bottom: 120px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: var(--text-primary);
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    color: var(--text-primary);
    text-decoration: none;
    flex-shrink: 0;
  }

  .header-title {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
    flex: 1;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-spacer {
    width: 36px;
    flex-shrink: 0;
  }

  /* Visual Pass Card */
  .pass-hero {
    margin: 0 16px 16px;
    border-radius: 20px;
    padding: 24px 20px 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .hero-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .tier-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 6px;
    color: #fff;
  }

  .status-chip {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 8px;
  }

  .hero-name {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 4px;
  }

  .hero-venue {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 20px;
  }

  .hero-divider {
    border-top: 2px dashed rgba(255, 255, 255, 0.15);
    margin-bottom: 16px;
  }

  .hero-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hero-validity {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .hero-id {
    font-size: 11px;
    font-family: 'SF Mono', ui-monospace, monospace;
    color: rgba(255, 255, 255, 0.4);
  }

  /* Details Card */
  .details-card {
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    margin: 0 16px 24px;
    overflow: hidden;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-gray);
  }

  .detail-row.last {
    border-bottom: none;
  }

  .detail-label {
    font-size: 14px;
    color: var(--text-secondary);
  }

  .detail-value {
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* Sections */
  .section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 16px;
    font-weight: 600;
    padding: 0 16px 12px;
    margin: 0;
  }

  .about-text {
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-secondary);
    padding: 0 16px;
    margin: 0;
  }

  /* Perks */
  .perks-list {
    list-style: none;
    margin: 0;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .perk-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }

  .perk-check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  /* Add to Apple Wallet */
  .wallet-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 0 16px 24px;
    padding: 14px 16px;
    min-height: 48px;
    background: #000;
    color: #fff;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.2px;
  }

  .wallet-btn:active {
    transform: scale(0.985);
  }
</style>
