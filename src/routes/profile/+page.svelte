<script>
  import { Bell, Pencil, Diamond, Shield, Heart, Check, HelpCircle, Flame, Gift, Calendar, Settings, ChevronRight } from 'lucide-svelte';

  export let data;

  $: fan = data.fan;
  $: handle = fan?.handle || (fan?.name ? fan.name.toLowerCase().replace(/\s+/g, '') : 'me');
  $: avatarUrl = fan?.avatar_url || null;
  $: avatarInitials = fan?.avatar_initials || fan?.name?.slice(0, 1) || '?';
  $: universalPoints = fan?.xp_total ?? 0;
  $: activeFandoms = data.activeFandomsCount ?? 0;
  $: rewardsRedeemed = fan?.rewards_redeemed ?? 0;
  $: fandomBreakdown = data.fandomBreakdown ?? [];
  $: pointSources = data.pointSources ?? [];

  // Tier name → chip icon (glyph from the mockup).
  const tierIcons = { Elite: Diamond, Superfan: Diamond, Loyal: Shield, Fan: Heart, Newcomer: Heart };

  const menu = [
    { id: 'rewards',     label: 'My Rewards',     icon: Gift,        href: '/profile/rewards' },
    { id: 'saved',       label: 'Saved Events',   icon: Calendar,    href: '/profile/saved-events' },
    { id: 'preferences', label: 'Preferences',    icon: Settings,    href: '/profile/preferences' },
    { id: 'help',        label: 'Help & Support', icon: HelpCircle,  href: '/profile/help' },
  ];
</script>

<svelte:head>
  <title>Profile - Maxess</title>
</svelte:head>

<div class="page-container">
  <header class="page-header">
    <h1 class="page-title">Profile</h1>
    <a href="/profile/notifications" class="bell-btn" aria-label="Notifications">
      <Bell size={22} color="#FFFFFF" />
      <span class="bell-dot"></span>
    </a>
  </header>

  {#if fan}
    <!-- Identity card -->
    <section class="card identity-card">
      <div class="identity-avatar">
        {#if avatarUrl}
          <img src={avatarUrl} alt={fan.name} />
        {:else}
          <span>{avatarInitials}</span>
        {/if}
      </div>
      <div class="identity-info">
        <h2 class="identity-name">{fan.name}</h2>
        <p class="identity-handle">@{handle}</p>
        <a href="/profile/edit" class="edit-profile-btn">
          <Pencil size={13} />
          Edit Profile
        </a>
      </div>
    </section>

    <!-- Stats row -->
    <section class="card stats-card">
      <div class="stat-cell">
        <div class="stat-value">{universalPoints.toLocaleString()}</div>
        <div class="stat-label">Universal Points</div>
      </div>
      <div class="stat-divider" aria-hidden="true"></div>
      <div class="stat-cell">
        <div class="stat-value">{activeFandoms}</div>
        <div class="stat-label">Active Fandoms</div>
      </div>
      <div class="stat-divider" aria-hidden="true"></div>
      <div class="stat-cell">
        <div class="stat-value">{rewardsRedeemed}</div>
        <div class="stat-label">Rewards Redeemed</div>
      </div>
    </section>

    <!-- Fandom breakdown -->
    <h3 class="section-heading">Fandom breakdown</h3>
    <section class="card list-card">
      {#each fandomBreakdown as f, i (f.id)}
        <a
          href={f.kind === 'artist' ? `/artist/${f.id}` : '/score'}
          class="list-row"
          class:no-divider={i === fandomBreakdown.length - 1}
        >
          <div class="row-thumb">
            {#if f.image}
              <img src={f.image} alt={f.name} />
            {:else}
              <span>{f.name.slice(0, 1)}</span>
            {/if}
          </div>
          <div class="row-main">
            <div class="row-name">{f.name}</div>
          </div>
          <div class="row-points">
            <span class="row-points-value">{f.points.toLocaleString()}</span>
            <span class="row-points-unit">pts</span>
          </div>
          <span class="tier-chip" style:--chip-color={f.tier_color}>
            <svelte:component this={tierIcons[f.tier] ?? Heart} size={12} />
            {f.tier}
          </span>
        </a>
      {/each}
    </section>

    <!-- Point sources -->
    <h3 class="section-heading">Point sources</h3>
    <section class="card list-card">
      {#each pointSources as s, i (s.id)}
        <div class="list-row source-row" class:no-divider={i === pointSources.length - 1}>
          <div class="source-icon" class:source-icon--spotify={s.icon === 'spotify'}>
            {#if s.icon === 'check'}
              <Check size={18} color="#FF5C00" />
            {:else if s.icon === 'spotify'}
              <svg viewBox="0 0 168 168" width="22" height="22" aria-hidden="true">
                <circle cx="84" cy="84" r="84" fill="#1DB954" />
                <path fill="#000" d="M122.7 119.6c-1.7 2.8-5.3 3.6-8.1 1.9-22.2-13.6-50.2-16.6-83.2-9.1-3.2.7-6.4-1.3-7.1-4.5-.7-3.2 1.3-6.4 4.5-7.1 35.9-8.2 66.7-4.7 91.4 10.6 2.7 1.7 3.6 5.4 1.9 8.1zm10.2-22.7c-2.2 3.5-6.7 4.5-10.2 2.4-25.4-15.6-64.1-20.1-94.1-10.9-3.9 1.2-8.1-1-9.3-4.9-1.2-3.9 1-8.1 4.9-9.3 34.4-10.4 76.9-5.4 105.9 12.5 3.4 2.2 4.5 6.7 2.3 10.2zm.9-23.7C103.2 55.3 53.7 53 25.1 61.7c-4.7 1.4-9.6-1.2-11.1-5.9-1.4-4.7 1.2-9.6 5.9-11.1 32.7-9.9 87.5-7.5 122.1 13 4.2 2.5 5.6 8 3.1 12.2-2.5 4.2-8 5.6-12.2 3.1z"/>
              </svg>
            {:else if s.icon === 'trivia'}
              <HelpCircle size={18} color="#FF5C00" />
            {:else}
              <Flame size={18} color="#FF5C00" />
            {/if}
          </div>
          <div class="row-main">
            <div class="row-name">{s.label}</div>
          </div>
          <div class="row-points">
            <span class="row-points-value">{s.points.toLocaleString()}</span>
            <span class="row-points-unit">pts</span>
          </div>
        </div>
      {/each}
    </section>

    <p class="legal-copy">
      Points never expire. Tiers are independent by artist or team.<br/>
      Points unlock tiers and are also spent on rewards.
    </p>

    <!-- Menu -->
    <section class="card list-card menu-card">
      {#each menu as m, i (m.id)}
        <a href={m.href} class="list-row menu-row" class:no-divider={i === menu.length - 1}>
          <div class="menu-icon">
            <svelte:component this={m.icon} size={18} color="#FF5C00" />
          </div>
          <div class="row-main">
            <div class="row-name">{m.label}</div>
          </div>
          <ChevronRight size={18} color="#6E6E73" />
        </a>
      {/each}
    </section>
  {:else}
    <div class="empty"><p>Unable to load profile. Please try again later.</p></div>
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
    color: #FFFFFF;
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

  .card {
    background: #0E0E10;
    border: 1px solid #1F1F21;
    border-radius: 16px;
  }

  .identity-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    margin-bottom: 14px;
  }

  .identity-avatar {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    overflow: hidden;
    background: #1F1F21;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 28px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .identity-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .identity-info { flex: 1; min-width: 0; }

  .identity-name {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
    color: #FFFFFF;
    letter-spacing: -0.3px;
  }
  .identity-handle {
    font-size: 14px;
    color: #8E8E93;
    margin: 2px 0 10px;
  }
  .edit-profile-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 99px;
    border: 1.5px solid #FF5C00;
    background: transparent;
    color: #FF5C00;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
  }

  .stats-card {
    display: flex;
    align-items: stretch;
    padding: 16px 8px;
    margin-bottom: 22px;
  }
  .stat-cell {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 0 8px;
  }
  .stat-value {
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.1;
    letter-spacing: -0.3px;
  }
  .stat-label {
    font-size: 12px;
    color: #8E8E93;
    text-align: center;
  }
  .stat-divider {
    width: 1px;
    background: #2C2C2E;
    margin: 4px 0;
  }

  .section-heading {
    font-size: 17px;
    font-weight: 600;
    color: #FFFFFF;
    margin: 0 0 10px;
    padding: 0 2px;
  }

  .list-card {
    margin-bottom: 22px;
    overflow: hidden;
  }

  .list-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-bottom: 1px solid #1F1F21;
    text-decoration: none;
    color: inherit;
  }
  .list-row.no-divider { border-bottom: none; }

  .row-thumb {
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
  .row-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .row-main { flex: 1; min-width: 0; }

  .row-name {
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
  }

  .row-points {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    flex-shrink: 0;
  }
  .row-points-value {
    font-size: 16px;
    font-weight: 700;
    color: #FFFFFF;
  }
  .row-points-unit {
    font-size: 13px;
    color: #8E8E93;
  }

  .tier-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    border-radius: 99px;
    border: 1.5px solid var(--chip-color, #8E8E93);
    color: var(--chip-color, #8E8E93);
    background: transparent;
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }

  .source-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 92, 0, 0.12);
    flex-shrink: 0;
  }
  .source-icon--spotify { background: transparent; padding: 0; }

  .legal-copy {
    text-align: center;
    color: #8E8E93;
    font-size: 12px;
    line-height: 1.45;
    margin: 0 0 22px;
  }

  .menu-card { margin-bottom: 32px; }
  .menu-row { padding: 16px; }

  .menu-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 92, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .empty {
    text-align: center;
    padding: 60px 16px;
    color: #8E8E93;
  }
</style>
