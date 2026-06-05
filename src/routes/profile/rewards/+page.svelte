<script>
  import { ArrowLeft, Gift, Ticket, Users, UtensilsCrossed, Check } from 'lucide-svelte';

  export let data;

  $: redemptions = data.redemptions ?? [];
  $: totalSpent = data.totalSpent ?? 0;
  $: count = redemptions.length;

  // Map icon_name (from Reward.icon_name) → lucide component. Same set the
  // /access page uses for included-perk rows, so icon-only rewards render
  // consistently across the marketplace and the redeemed log.
  const iconMap = { Ticket, Users, UtensilsCrossed, Gift };
  function iconFor(name) {
    return iconMap[name] ?? Gift;
  }
</script>

<svelte:head><title>My Rewards - Maxess</title></svelte:head>

<div class="page">
  <header class="page-header">
    <a href="/profile" class="back-btn" aria-label="Back to profile"><ArrowLeft size={20} /></a>
    <h1 class="page-title">My Rewards</h1>
    <div class="header-spacer"></div>
  </header>

  <!-- Summary card — total redeemed + lifetime points spent -->
  <section class="summary-card">
    <div class="summary-icon"><Gift size={22} color="#FF5C00" /></div>
    <div class="summary-stats">
      <div class="summary-cell">
        <span class="summary-value">{count}</span>
        <span class="summary-label">Rewards redeemed</span>
      </div>
      <div class="summary-divider" aria-hidden="true"></div>
      <div class="summary-cell">
        <span class="summary-value">{totalSpent.toLocaleString()}</span>
        <span class="summary-label">Points spent</span>
      </div>
    </div>
  </section>

  {#if count === 0}
    <section class="empty-card">
      <div class="empty-icon-wrap"><Gift size={28} color="#FF5C00" /></div>
      <h2>Nothing redeemed yet</h2>
      <p>Head to Access to spend points on backstage passes, presales, courtside upgrades and more.</p>
      <a class="cta" href="/access">Browse rewards →</a>
    </section>
  {:else}
    <h3 class="section-title">History</h3>
    <ul class="redemption-list">
      {#each redemptions as r (r.id)}
        <li class="redemption-row">
          <div class="row-thumb">
            {#if r.reward_image}
              <img src={r.reward_image} alt="" />
              <span class="thumb-badge"><Check size={12} strokeWidth={3} /></span>
            {:else}
              <span class="thumb-icon">
                <svelte:component this={iconFor(r.reward_icon)} size={20} color="#FF5C00" />
              </span>
            {/if}
          </div>
          <div class="row-body">
            <p class="row-fandom">{r.fandom_name}</p>
            <h4 class="row-name">{r.reward_name}</h4>
            <p class="row-meta">{r.time_ago}</p>
          </div>
          <div class="row-cost">
            <span class="cost-value">−{r.points_spent.toLocaleString()}</span>
            <span class="cost-unit">pts</span>
          </div>
        </li>
      {/each}
    </ul>

    <a class="footer-cta" href="/access">Browse more rewards →</a>
  {/if}
</div>

<style>
  .page {
    background: #000000;
    min-height: 100vh;
    color: #FFFFFF;
    padding: 0 16px 120px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  /* Header — back chevron + centered title, matches /profile/notifications. */
  .page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 0 16px;
  }
  .back-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: #1F1F21; color: #FFFFFF;
    display: inline-flex; align-items: center; justify-content: center;
    text-decoration: none;
  }
  .page-title {
    font-size: 22px; font-weight: 700;
    margin: 0; flex: 1; text-align: center;
  }
  .header-spacer { width: 36px; }

  /* Summary — count + lifetime spend, two-cell card. */
  .summary-card {
    display: flex; align-items: center; gap: 14px;
    background: #0E0E10;
    border: 1px solid #1F1F21;
    border-radius: 18px;
    padding: 16px;
    margin: 0 0 20px;
  }
  .summary-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: rgba(255, 92, 0, 0.12);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .summary-stats {
    display: flex; align-items: center; gap: 16px;
    flex: 1;
  }
  .summary-cell { display: flex; flex-direction: column; gap: 2px; }
  .summary-value { font-size: 22px; font-weight: 700; color: #FFFFFF; line-height: 1; }
  .summary-label { font-size: 12px; color: #8E8E93; }
  .summary-divider {
    width: 1px; height: 28px;
    background: #1F1F21;
  }

  .section-title {
    font-size: 13px;
    font-weight: 700;
    color: #8E8E93;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin: 0 0 10px;
    padding: 0 2px;
  }

  /* Redemption list — single card with internal dividers (iOS settings feel). */
  .redemption-list {
    list-style: none;
    margin: 0 0 18px;
    padding: 0;
    background: #0E0E10;
    border: 1px solid #1F1F21;
    border-radius: 16px;
    overflow: hidden;
  }
  .redemption-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 14px;
    border-bottom: 1px solid #1F1F21;
  }
  .redemption-row:last-child { border-bottom: none; }

  .row-thumb {
    position: relative;
    width: 52px; height: 52px;
    border-radius: 12px;
    overflow: hidden;
    background: #1F1F21;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .row-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .thumb-badge {
    position: absolute;
    right: 4px; bottom: 4px;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #FF5C00;
    color: #FFFFFF;
    display: inline-flex; align-items: center; justify-content: center;
    border: 1.5px solid #0E0E10;
  }
  .thumb-icon {
    display: inline-flex; align-items: center; justify-content: center;
  }

  .row-body {
    flex: 1; min-width: 0;
    display: flex; flex-direction: column; gap: 2px;
  }
  .row-fandom {
    font-size: 11px;
    font-weight: 600;
    color: #8E8E93;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    margin: 0;
  }
  .row-name {
    font-size: 15px;
    font-weight: 600;
    color: #FFFFFF;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row-meta {
    font-size: 12px;
    color: #8E8E93;
    margin: 0;
  }

  .row-cost {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1px;
    flex-shrink: 0;
  }
  .cost-value {
    font-size: 14px;
    font-weight: 700;
    color: #FF5C00;
  }
  .cost-unit {
    font-size: 11px;
    color: #8E8E93;
  }

  .footer-cta {
    display: block;
    text-align: center;
    color: #FF5C00;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    padding: 8px 0 4px;
  }

  /* Empty-state — used when redemptions is empty (carried over from the
     placeholder version, restyled to match the new summary card). */
  .empty-card {
    background: #0E0E10; border: 1px solid #1F1F21; border-radius: 16px;
    padding: 32px 24px; text-align: center;
  }
  .empty-icon-wrap {
    width: 56px; height: 56px; border-radius: 50%;
    background: rgba(255, 92, 0, 0.12);
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  .empty-card h2 { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
  .empty-card p { color: #8E8E93; font-size: 14px; margin: 0 0 16px; line-height: 1.45; }
  .cta { color: #FF5C00; font-weight: 600; text-decoration: none; }
</style>
