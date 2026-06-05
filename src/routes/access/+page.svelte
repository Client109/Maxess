<script>
  import { Bell, Diamond, Check, Ticket, Users, UtensilsCrossed, X, Info } from 'lucide-svelte';

  export let data;

  $: user = data.user;
  $: fandoms = data.fandoms ?? [];
  $: selected = data.selected;
  $: rewards = data.rewards ?? { unlocked: [], included: [], locked: [] };
  $: tierLine = data.tierLine ?? [];

  let tab = 'rewards';                       // 'rewards' | 'passes'
  let pickerOpen = false;
  let switching = false;

  // Map icon_name -> lucide component for included perks.
  const iconMap = { Ticket, Users, UtensilsCrossed };
  function iconFor(name) {
    return iconMap[name] ?? Ticket;
  }

  async function selectFandom(fandom_id) {
    if (switching) return;
    switching = true;
    try {
      const res = await fetch('/api/fandoms/select', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ fandom_id }),
      });
      if (res.ok && typeof window !== 'undefined') window.location.reload();
    } finally {
      switching = false;
      pickerOpen = false;
    }
  }
</script>

<svelte:head>
  <title>Access - Maxess</title>
</svelte:head>

<div class="page">
  <header class="page-header">
    <div class="title-block">
      <h1 class="page-title">Access</h1>
      <p class="page-subtitle">Your rewards. Your way in.</p>
    </div>
    <a href="/profile/notifications" class="bell-btn" aria-label="Notifications">
      <Bell size={22} color="#FFFFFF" />
      <span class="bell-dot"></span>
    </a>
  </header>

  {#if !user || !selected}
    <div class="empty"><p>Unable to load access data. Please try again later.</p></div>
  {:else}
    <!-- Selected fandom card -->
    <button class="fandom-card" type="button" on:click={() => pickerOpen = true} aria-label="Change selected fandom">
      <div class="fandom-portrait">
        {#if selected.image}
          <img src={selected.image} alt={selected.name} />
        {:else}
          <span>{selected.name.slice(0, 1)}</span>
        {/if}
      </div>
      <div class="fandom-info">
        <p class="fandom-label">
          Selected fandom: <strong>{selected.name}</strong>
        </p>
        <div class="fandom-row">
          <span class="tier-chip" style:--chip-color={selected.tier_color}>
            <Diamond size={12} />
            {selected.tier}
          </span>
          <span class="fandom-divider" aria-hidden="true"></span>
          <span class="points-block">
            <span class="points-line">
              <span class="points-value">{selected.points_balance.toLocaleString()}</span>
              <span class="points-unit">pts</span>
            </span>
            <span class="points-state">available</span>
          </span>
        </div>
      </div>
    </button>

    <p class="explainer">
      Points unlock the tier first, then the same points are spent<br/>
      to redeem experiences.
    </p>

    <!-- Rewards / Passes segmented toggle -->
    <div class="segmented" role="tablist" aria-label="Access view">
      <button
        type="button"
        role="tab"
        class="seg-btn"
        class:seg-btn--active={tab === 'rewards'}
        aria-selected={tab === 'rewards'}
        on:click={() => tab = 'rewards'}
      >Rewards</button>
      <button
        type="button"
        role="tab"
        class="seg-btn"
        class:seg-btn--active={tab === 'passes'}
        aria-selected={tab === 'passes'}
        on:click={() => tab = 'passes'}
      >Passes</button>
    </div>

    {#if tab === 'rewards'}
      <h3 class="section-title">Unlocked for {selected.tier}</h3>
      {#if rewards.unlocked.length === 0}
        <p class="section-empty">No rewards at your current tier yet. Earn more points to unlock the next tier.</p>
      {:else}
        <div class="reward-grid">
          {#each rewards.unlocked as r (r.id)}
            <article class="reward-card">
              <div class="reward-image">
                {#if r.image_url}
                  <img src={r.image_url} alt="" />
                {/if}
                <div class="reward-overlay">
                  <span class="reward-check"><Check size={20} strokeWidth={2.4} /></span>
                </div>
              </div>
              <div class="reward-body">
                <p class="reward-status">Unlocked</p>
                <h4 class="reward-name">{r.name}</h4>
                <p class="reward-cost">{r.point_cost.toLocaleString()} pts</p>
              </div>
            </article>
          {/each}
        </div>
      {/if}

      {#if rewards.included.length > 0}
        <h3 class="section-title">Included from lower tiers</h3>
        <ul class="included-list">
          {#each rewards.included as r (r.id)}
            <li class="included-row">
              <span class="included-icon">
                <svelte:component this={iconFor(r.icon_name)} size={18} color="#FF5C00" />
              </span>
              <span class="included-name">{r.name}</span>
            </li>
          {/each}
        </ul>
        <p class="included-footnote">Unlocked through Superfan and below</p>
      {/if}

      {#if tierLine.length > 0}
        <div class="tier-footnote">
          <Info size={14} color="#8E8E93" />
          <p>
            Tier is specific to each artist or team. You are
            {#each tierLine as line, i}{i === tierLine.length - 1 && tierLine.length > 1 ? ', and ' : i > 0 ? ', ' : ''}{line}{/each}.
          </p>
        </div>
      {/if}
    {:else}
      <!-- Passes tab — legacy passes list -->
      <h3 class="section-title">Your passes</h3>
      {#if (data.passes ?? []).length === 0}
        <p class="section-empty">No passes yet.</p>
      {:else}
        <ul class="pass-list">
          {#each data.passes as p (p.pass_id)}
            <li class="pass-row">
              <a class="pass-link" href={`/passes/${p.pass_id}`}>
                <Ticket size={18} color="#FF5C00" />
                <div class="pass-info">
                  <span class="pass-name">{p.name}</span>
                  <span class="pass-venue">{p.venue}</span>
                </div>
                <span class="pass-status">{p.status}</span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
  {/if}
</div>

<!-- Fandom switcher sheet -->
{#if pickerOpen}
  <div class="sheet-backdrop" on:click={() => pickerOpen = false} on:keydown={(e) => e.key === 'Escape' && (pickerOpen = false)} role="presentation"></div>
  <div class="sheet" role="dialog" aria-modal="true" aria-label="Choose fandom">
    <header class="sheet-header">
      <h2>Choose a fandom</h2>
      <button class="sheet-close" type="button" on:click={() => pickerOpen = false} aria-label="Close">
        <X size={18} color="#FFFFFF" />
      </button>
    </header>
    <ul class="sheet-list">
      {#each fandoms as f (f.fandom_id)}
        <li>
          <button
            class="sheet-row"
            type="button"
            class:sheet-row--active={f.fandom_id === selected.fandom_id}
            on:click={() => selectFandom(f.fandom_id)}
            disabled={switching}
          >
            <span class="sheet-portrait">
              {#if f.image}<img src={f.image} alt={f.name} />{:else}<span>{f.name.slice(0, 1)}</span>{/if}
            </span>
            <span class="sheet-name">{f.name}</span>
            <span class="sheet-tier" style:--chip-color={f.tier_color}>
              <Diamond size={11} />
              {f.tier}
            </span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .page {
    background: var(--bg-primary);
    min-height: 100vh;
    padding: 12px 16px 120px;
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  /* Header */
  .page-header {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 8px 0 12px;
  }
  .title-block { display: flex; flex-direction: column; gap: 4px; }
  .page-title {
    font-size: 36px; font-weight: 700;
    letter-spacing: -0.5px;
    margin: 0;
  }
  .page-subtitle {
    font-size: 15px; color: var(--text-tertiary);
    margin: 0;
  }
  .bell-btn {
    position: relative;
    display: inline-flex; align-items: center; justify-content: center;
    width: 44px; height: 44px; border-radius: 50%;
    background: transparent; border: 1px solid var(--border-strong);
    color: var(--text-primary);
    margin-top: 4px;
  }
  .bell-dot {
    position: absolute;
    top: 9px; right: 11px;
    width: 8px; height: 8px; border-radius: 50%;
    background: #FF5C00;
    border: 2px solid var(--bg-primary);
  }

  /* Selected fandom card */
  .fandom-card {
    display: flex;
    gap: 14px;
    align-items: center;
    width: 100%;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 18px;
    padding: 14px;
    margin: 8px 0 16px;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }
  .fandom-card:active { transform: scale(0.995); }
  .fandom-portrait {
    width: 88px; height: 88px;
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-pill);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .fandom-portrait img { width: 100%; height: 100%; object-fit: cover; }
  .fandom-portrait span { font-size: 28px; font-weight: 600; color: var(--text-primary); }
  .fandom-info { flex: 1; min-width: 0; }
  .fandom-label {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0 0 10px;
  }
  .fandom-label strong { color: var(--text-primary); font-weight: 600; }
  .fandom-row {
    display: flex; align-items: center; gap: 12px;
  }
  .tier-chip {
    display: inline-flex; align-items: center; gap: 4px;
    background: transparent;
    border: 1px solid var(--chip-color, #FF5C00);
    color: var(--chip-color, #FF5C00);
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
  }
  .fandom-divider {
    width: 1px;
    height: 28px;
    background: var(--border-strong);
  }
  .points-block {
    display: flex; flex-direction: column; align-items: flex-start; line-height: 1.1;
  }
  .points-line { display: flex; align-items: baseline; gap: 3px; }
  .points-value { font-size: 22px; font-weight: 700; color: var(--text-primary); }
  .points-unit { font-size: 13px; color: var(--text-tertiary); }
  .points-state { font-size: 11px; color: var(--text-tertiary); margin-top: 2px; }

  .explainer {
    text-align: center;
    font-size: 13px;
    color: var(--text-tertiary);
    line-height: 1.4;
    margin: 8px 16px 18px;
  }

  /* Segmented toggle */
  .segmented {
    display: flex;
    background: transparent;
    border: 1px solid var(--border-strong);
    border-radius: 10px;
    padding: 4px;
    gap: 4px;
    margin-bottom: 22px;
  }
  .seg-btn {
    flex: 1;
    min-height: 44px;
    background: transparent;
    color: var(--text-tertiary);
    border: 1px solid transparent;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
  .seg-btn--active {
    background: var(--bg-card-elevated);
    color: var(--text-primary);
    border-color: #FF5C00;
  }

  /* Section */
  .section-title {
    font-size: 18px;
    font-weight: 700;
    margin: 22px 0 12px;
  }
  .section-empty {
    font-size: 13px;
    color: var(--text-tertiary);
    margin: 0 0 18px;
  }

  /* Reward grid (horizontal scroll on mobile) */
  .reward-grid {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin: 0 -16px;
    padding: 0 16px 4px;
  }
  .reward-grid::-webkit-scrollbar { display: none; }
  .reward-card {
    flex: 0 0 158px;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 14px;
    overflow: hidden;
    display: flex; flex-direction: column;
  }
  .reward-image {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    background: var(--bg-pill);
    display: flex; align-items: center; justify-content: center;
  }
  .reward-image img { width: 100%; height: 100%; object-fit: cover; }
  .reward-overlay {
    position: absolute; inset: 0;
    background: rgba(0, 0, 0, 0.15);
    display: flex; align-items: center; justify-content: center;
  }
  .reward-check {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 2px solid #FF5C00;
    color: #FF5C00;
    background: rgba(0, 0, 0, 0.35);
  }
  .reward-body {
    padding: 12px;
    text-align: center;
    display: flex; flex-direction: column; gap: 4px;
    min-height: 92px;
  }
  .reward-status {
    font-size: 12px;
    color: #FF5C00;
    font-weight: 600;
    margin: 0;
  }
  .reward-name {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    line-height: 1.25;
  }
  .reward-cost {
    font-size: 12px;
    color: var(--text-tertiary);
    margin: auto 0 0;
  }

  /* Included from lower tiers */
  .included-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
  .included-row {
    display: flex; align-items: center; gap: 12px;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 12px;
    padding: 14px 16px;
    min-height: 56px;
  }
  .included-icon { width: 24px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .included-name { font-size: 15px; font-weight: 500; }
  .included-footnote {
    text-align: center;
    font-size: 12px;
    color: var(--text-tertiary);
    margin: 14px 0 18px;
  }

  /* Per-fandom tier footnote */
  .tier-footnote {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    border-top: 1px solid var(--border-subtle);
    padding: 16px 4px 4px;
    margin-top: 10px;
  }
  .tier-footnote p { font-size: 12px; color: var(--text-tertiary); line-height: 1.5; margin: 0; }

  /* Passes tab fallback list */
  .pass-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
  .pass-row { background: var(--bg-card); border: 1px solid var(--border-card); border-radius: 12px; }
  .pass-link {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    min-height: 56px;
    color: inherit; text-decoration: none;
  }
  .pass-info { flex: 1; display: flex; flex-direction: column; }
  .pass-name { font-size: 14px; font-weight: 500; }
  .pass-venue { font-size: 12px; color: var(--text-tertiary); }
  .pass-status { font-size: 11px; color: #FF5C00; text-transform: uppercase; letter-spacing: 0.5px; }

  /* Fandom picker sheet */
  .sheet-backdrop {
    position: fixed; inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
  }
  .sheet {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    z-index: 201;
    background: var(--bg-card);
    border-top: 1px solid var(--border-subtle);
    border-radius: 18px 18px 0 0;
    padding: 16px 16px calc(16px + env(safe-area-inset-bottom, 0));
    max-height: 70vh;
    overflow-y: auto;
  }
  .sheet-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .sheet-header h2 { margin: 0; font-size: 18px; font-weight: 700; }
  .sheet-close {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: var(--bg-pill); border: none;
    display: inline-flex; align-items: center; justify-content: center;
    color: var(--text-primary);
    cursor: pointer;
  }
  .sheet-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .sheet-row {
    width: 100%;
    display: flex; align-items: center; gap: 12px;
    background: transparent;
    border: 1px solid var(--border-card);
    border-radius: 12px;
    padding: 10px 12px;
    min-height: 56px;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }
  .sheet-row:disabled { opacity: 0.5; cursor: not-allowed; }
  .sheet-row--active { border-color: #FF5C00; }
  .sheet-portrait {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--bg-pill);
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .sheet-portrait img { width: 100%; height: 100%; object-fit: cover; }
  .sheet-portrait span { font-size: 14px; font-weight: 600; }
  .sheet-name { flex: 1; font-size: 14px; font-weight: 500; }
  .sheet-tier {
    display: inline-flex; align-items: center; gap: 4px;
    border: 1px solid var(--chip-color, #FF5C00);
    color: var(--chip-color, #FF5C00);
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 11px; font-weight: 600;
  }

  .empty { padding: 24px 0; color: var(--text-tertiary); text-align: center; font-size: 14px; }
</style>
