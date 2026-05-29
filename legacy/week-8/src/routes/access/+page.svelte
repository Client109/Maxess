<script>
  import { Bell, Star, Clock, Key } from 'lucide-svelte';
  import { mockPasses } from '$lib/data/mockData.js';

  let activeTier = 'elite';
  let claimedAccess = false;
  let viewingPass = false;
  
  const tierPerks = {
    general: {
      name: 'General',
      color: '#8E8E93',
      perks: ['Basic event access', 'Standard ticketing', 'Community membership']
    },
    superfan: {
      name: 'Superfan',
      color: '#3B28CC',
      perks: ['Priority notifications', 'Early bird pricing', 'VIP seating options']
    },
    elite: {
      name: 'Elite/Diamond',
      color: '#FF5C00',
      perks: ['Presale access', 'Backstage passes', 'Meet & greets', 'Personal concierge']
    }
  };

  $: activePasses = mockPasses.filter(p => p.status === 'active');
  $: upcomingPasses = mockPasses.filter(p => p.status === 'starts_soon');
</script>

<svelte:head>
  <title>Access - Maxxes</title>
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
      <h1 class="page-title">Access</h1>
      <p class="subtitle">Presales, perks, and member passes</p>
    </div>
    <button class="notification-bell">
      <Bell size={24} />
    </button>
  </header>

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
        <span class="kpi-value">Gold</span>
        <span class="kpi-label">Top tier</span>
      </div>
    </div>
  </div>

  <!-- Featured Access -->
  <section class="featured-section">
    <h2 class="section-header">Featured access</h2>
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
    <h2 class="section-header">Your passes</h2>

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
    <h2 class="section-header">Perks by tier</h2>
    <div class="tier-grid">
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

  .section-header {
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 16px 12px;
    color: var(--true-black);
  }

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

  .perks-section {
    margin: 0 16px 24px;
  }

  .tier-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
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
</style>
