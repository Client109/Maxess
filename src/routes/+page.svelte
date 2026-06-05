<script>
  import { Bell, ChevronRight, Diamond, Shield, Heart, Check, Flame, MessageCircleQuestion } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { unreadCount, notifPanelOpen } from '$lib/stores/notifications.js';
  import { followedArtists } from '$lib/stores/followedArtists.js';
  import { progressByArtist, hydrateProgress } from '$lib/stores/progressByArtist.js';
  import { classifyArtistTier, pointsToNextArtistTier } from '$lib/domain/xp.js';
  import {
    XP_PER_CHECKIN,
    XP_PER_LISTENING_HOUR,
    XP_PER_TRIVIA_CORRECT,
    XP_PER_STREAK_BONUS,
  } from '$lib/domain/xp-rules.js';

  export let data;

  $: fan = data.fan;
  $: catalog = data.progressThreads ?? [];

  // First-visit auto-follow seed — unchanged behavior from prior home, kept so
  // the "Your fandoms" list isn't empty on a fresh demo.
  onMount(() => {
    const SEEDED_KEY = 'maxess.followsSeeded';
    if (localStorage.getItem(SEEDED_KEY) === '1') return;
    if (catalog.length === 0) return;
    hydrateProgress(catalog.map(c => ({
      id: c.id, name: c.name, category: c.category, points: c.points,
    })));
    const ids = catalog.map(c => c.id);
    followedArtists.update(list => Array.from(new Set([...list, ...ids])));
    localStorage.setItem(SEEDED_KEY, '1');
  });

  $: progressThreads = $followedArtists
    .map(id => {
      const stored = $progressByArtist[id];
      const seed = catalog.find(c => c.id === id);
      if (!stored && !seed) return null;
      const name = stored?.name ?? seed?.name ?? id;
      const category = (stored?.category ?? seed?.category ?? 'music');
      const points = stored?.points ?? seed?.points ?? 0;
      const tier = classifyArtistTier(points);
      const next = pointsToNextArtistTier(points);
      return {
        id, name, category, points,
        tier_name: tier.name,
        tier_color: tier.color_hex,
        next_tier_name: next.nextTier?.name ?? null,
        points_to_next: next.pointsNeeded,
        progress: next.progress,
      };
    })
    .filter(t => t !== null);

  // Top 3 fandoms for the "Your fandoms" list. Prefer the server-side
  // FanTier.points_balance ordering — that's what the Home mockup is
  // wired to (Weeknd 5,480 / Ducks 2,340 / Ariana 930). Falls back to
  // the client-side followed/progress store when server data is missing.
  $: serverFandoms = (data.topFandomsByBalance ?? []).map(f => ({
    id: f.fandom_id,
    name: f.name,
    image: f.image,
    points: f.points_balance,
    tier_name: f.tier,
    tier_color: f.tier_color,
    category: 'music',
  }));
  $: topFandoms = serverFandoms.length > 0
    ? serverFandoms
    : [...progressThreads].sort((a, b) => b.points - a.points).slice(0, 3);

  // Hero pill: tier for the user's *selected* fandom (User.selected_fandom_id).
  // Falls back to the top fandom by balance.
  $: heroFandom = data.selectedFandomTier
    ? {
        name: data.selectedFandomTier.fandom_name,
        tier_name: data.selectedFandomTier.name,
        tier_color: data.selectedFandomTier.color_hex,
        points: topFandoms.find(f => f.name === data.selectedFandomTier?.fandom_name)?.points
          ?? topFandoms[0]?.points
          ?? 0,
      }
    : topFandoms[0] ?? data.topFandom ?? null;

  // Top upcoming event (1 card).
  $: nextEvent = (data.upcomingEvents ?? [])
    .filter(e => e.date)
    .slice()
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))[0] ?? null;

  // Greeting based on local hour.
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  function firstName(fullName) {
    return (fullName || '').split(/\s+/)[0] || 'there';
  }

  function tierTone(tier) {
    switch (tier) {
      case 'Elite': return { fg: '#FF5C00', Icon: Diamond };
      case 'Superfan': return { fg: '#3B28CC', Icon: Diamond };
      case 'Loyal': return { fg: '#2667FF', Icon: Shield };
      case 'Fan': return { fg: '#1A9E56', Icon: Heart };
      default: return { fg: '#8E8E93', Icon: Heart };
    }
  }

  // Build SVG path data for the sparkline. Empty/flat series fall back to a
  // baseline so the card never renders broken geometry.
  function buildSparkline(series) {
    const W = 320, H = 88, PAD = 4;
    const pts = (series && series.length > 0 ? series : [0, 0]).map(n => Math.max(0, Number(n) || 0));
    const max = Math.max(...pts, 1);
    const dx = (W - 2 * PAD) / Math.max(1, pts.length - 1);
    const coords = pts.map((v, i) => {
      const x = PAD + i * dx;
      const y = H - PAD - (v / max) * (H - 2 * PAD);
      return [x, y];
    });
    const linePath = coords.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(' ');
    const areaPath = `${linePath} L ${coords[coords.length - 1][0]} ${H} L ${coords[0][0]} ${H} Z`;
    const last = coords[coords.length - 1];
    return { linePath, areaPath, lastX: last[0], lastY: last[1], W, H };
  }

  $: spark = buildSparkline(data.xpHistory ?? []);
</script>

<svelte:head>
  <title>Maxess</title>
</svelte:head>

<div class="page">
  <!-- Header -->
  <header class="page-header">
    <div>
      <p class="greeting">{greeting}, {firstName(fan?.name)}</p>
      <h1 class="hero-title">Your fan world,<br />all in one place.</h1>
    </div>
    <button type="button" class="bell-btn" aria-label="Notifications" on:click={() => $notifPanelOpen = true}>
      <Bell size={22} />
      {#if $unreadCount > 0}<span class="bell-dot" aria-hidden="true"></span>{/if}
    </button>
  </header>

  {#if fan}
    <!-- Universal Balance hero -->
    {@const heroTone = heroFandom ? tierTone(heroFandom.tier_name) : null}
    <div class="balance-card">
      <div class="balance-left">
        <span class="balance-label">Universal Balance</span>
        <div class="balance-value">{(data.universalBalance ?? 0).toLocaleString()}</div>
        <span class="balance-sub">Points never expire</span>
        {#if heroFandom && heroTone}
          <span class="balance-pill" style:background={heroTone.fg}>
            <svelte:component this={heroTone.Icon} size={13} color="#FFFFFF" />
            {heroFandom.tier_name} for {heroFandom.name}
          </span>
          <p class="balance-fandom">
            Current fandom balance: <strong>{heroFandom.points.toLocaleString()} pts</strong>
          </p>
        {/if}
      </div>
      <svg class="balance-spark" viewBox="0 0 {spark.W} {spark.H}" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF5C00" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#FF5C00" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path d={spark.areaPath} fill="url(#sparkGradient)" />
        <path d={spark.linePath} fill="none" stroke="#FF5C00" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
        <circle cx={spark.lastX} cy={spark.lastY} r="4" fill="#FF5C00" />
      </svg>
    </div>

    <!-- Your fandoms -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Your fandoms</h2>
        <a href="/profile" class="see-all">View all</a>
      </div>
      {#if topFandoms.length === 0}
        <p class="empty">No fandoms yet — follow an artist or team to see your progress here.</p>
      {:else}
        <ul class="fandom-list">
          {#each topFandoms as t (t.id)}
            {@const tone = tierTone(t.tier_name)}
            <li>
              <a class="fandom-row" href={t.category === 'sports' ? `/score` : `/artist/${t.id}`}>
                <span class="fandom-avatar" style:background={t.image ? '#1F1F21' : t.tier_color}>
                  {#if t.image}
                    <img src={t.image} alt={t.name} />
                  {:else}
                    {t.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}
                  {/if}
                </span>
                <span class="fandom-name">{t.name}</span>
                <span class="fandom-points">
                  <span class="fandom-points-value">{t.points.toLocaleString()}</span>
                  <span class="fandom-points-unit">pts</span>
                </span>
                <span class="tier-badge" style:color={tone.fg} style:border-color={tone.fg}>
                  <svelte:component this={tone.Icon} size={12} />
                  {t.tier_name}
                </span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </section>

    <!-- Upcoming -->
    {#if nextEvent}
      {@const eventTier = nextEvent.required_tier || 'Elite'}
      {@const eventTone = tierTone(eventTier)}
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">Upcoming</h2>
          <a href="/events" class="see-all">View all</a>
        </div>
        <a class="upcoming-card" href="/events/{nextEvent.event_id}">
          <div class="upcoming-thumb" style:background-color={nextEvent.image_color || '#1a1a2e'}>
            {#if nextEvent.image_url}
              <img src={nextEvent.image_url} alt="" />
            {/if}
          </div>
          <div class="upcoming-body">
            <h3 class="upcoming-title">{nextEvent.title}</h3>
            {#if nextEvent.subtitle}
              <p class="upcoming-line">{nextEvent.subtitle}</p>
            {/if}
            <p class="upcoming-line">{nextEvent.venue}</p>
            <p class="upcoming-line">
              {nextEvent.date_display || nextEvent.date}{nextEvent.time ? ` • ${nextEvent.time}` : ''}
            </p>
          </div>
          <div class="upcoming-right">
            <span class="tier-badge" style:color={eventTone.fg} style:border-color={eventTone.fg}>
              <svelte:component this={eventTone.Icon} size={12} />
              {eventTier}
            </span>
            <span class="chevron-dim"><ChevronRight size={18} /></span>
          </div>
        </a>
      </section>
    {/if}

    <!-- Earn more points -->
    <section class="section">
      <h2 class="section-title">Earn more points</h2>
      <div class="earn-grid">
        <a class="earn-tile" href="/admin/scan">
          <span class="earn-icon earn-icon--ring"><Check size={20} color="#FF5C00" /></span>
          <span class="earn-label">Verified check-in</span>
          <span class="earn-value">+{XP_PER_CHECKIN}</span>
        </a>
        <a class="earn-tile" href="/profile">
          <span class="earn-icon earn-icon--spotify">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="#000" d="M16.7 16.3c-.2.3-.6.4-.9.2-2.4-1.5-5.5-1.8-9.1-1-.3.1-.7-.1-.8-.5-.1-.3.1-.7.5-.8 4-.9 7.4-.5 10.1 1.1.3.2.4.6.2.9zm1.3-2.7c-.3.4-.8.5-1.2.3-2.8-1.7-7.1-2.2-10.4-1.2-.5.1-1-.1-1.1-.6-.1-.5.1-1 .6-1.1 3.8-1.2 8.5-.6 11.7 1.4.4.2.5.8.4 1.2zm.1-2.9C14.8 8.7 9 8.5 5.7 9.5c-.5.2-1.1-.2-1.3-.7-.2-.5.2-1.1.7-1.3 3.8-1.1 10.2-.9 14.2 1.5.5.3.7 1 .4 1.5-.3.4-1 .6-1.5.2z" />
            </svg>
          </span>
          <span class="earn-label">Spotify</span>
          <span class="earn-value">+{XP_PER_LISTENING_HOUR}/hr</span>
        </a>
        <a class="earn-tile" href="/trivia">
          <span class="earn-icon earn-icon--ring"><MessageCircleQuestion size={20} color="#FF5C00" /></span>
          <span class="earn-label">Trivia</span>
          <span class="earn-value">+{XP_PER_TRIVIA_CORRECT}</span>
        </a>
        <div class="earn-tile">
          <span class="earn-icon"><Flame size={20} color="#FF5C00" /></span>
          <span class="earn-label">Streak</span>
          <span class="earn-value">+{XP_PER_STREAK_BONUS}</span>
        </div>
      </div>
    </section>
  {:else}
    <div class="loading">Loading your fan profile…</div>
  {/if}
</div>

<style>
  /* Page-scoped dark surface matching the mockup. */
  .page {
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: 8px 20px 96px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }

  /* Header */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 24px 0 8px;
    gap: 16px;
  }
  .greeting {
    margin: 0 0 8px;
    font-size: 15px;
    color: var(--text-secondary);
  }
  .hero-title {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.5px;
    color: var(--text-primary);
  }
  .bell-btn {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid var(--border-strong);
    color: var(--text-primary);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .bell-dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FF5C00;
    box-shadow: 0 0 0 2px var(--bg-primary);
  }

  /* Universal Balance card */
  .balance-card {
    position: relative;
    margin-top: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 18px;
    padding: 20px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    min-height: 220px;
  }
  .balance-left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    z-index: 1;
  }
  .balance-label {
    font-size: 14px;
    color: var(--text-tertiary);
  }
  .balance-value {
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1px;
    color: var(--text-primary);
  }
  .balance-sub {
    font-size: 13px;
    color: var(--text-tertiary);
  }
  .balance-pill {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 999px;
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 600;
    margin-top: 4px;
  }
  .balance-fandom {
    margin: 6px 0 0;
    font-size: 13px;
    color: var(--text-tertiary);
  }
  .balance-fandom strong { color: var(--text-primary); font-weight: 600; }

  .balance-spark {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-30%);
    width: 56%;
    height: 60%;
    pointer-events: none;
  }

  /* Sections */
  .section { margin-top: 26px; }
  .section-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .section-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
  }
  .see-all {
    color: #FF5C00;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
  }

  /* Fandom list */
  .fandom-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .fandom-row {
    display: grid;
    grid-template-columns: 56px 1fr auto auto;
    gap: 14px;
    align-items: center;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 16px;
    padding: 12px 14px;
    text-decoration: none;
    color: inherit;
  }
  .fandom-avatar {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    flex-shrink: 0;
    overflow: hidden;
  }
  .fandom-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .fandom-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fandom-points {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    color: var(--text-primary);
  }
  .fandom-points-value {
    font-size: 18px;
    font-weight: 700;
  }
  .fandom-points-unit {
    font-size: 13px;
    color: var(--text-tertiary);
  }

  /* Tier badge — reused on multiple rows */
  .tier-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid currentColor;
    border-radius: 10px;
    padding: 6px 10px;
    font-size: 13px;
    font-weight: 600;
    background: transparent;
  }

  /* Upcoming */
  .upcoming-card {
    display: grid;
    grid-template-columns: 132px 1fr auto;
    gap: 14px;
    align-items: center;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 16px;
    padding: 12px;
    text-decoration: none;
    color: inherit;
  }
  .upcoming-thumb {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
  }
  .upcoming-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .upcoming-body {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .upcoming-title {
    margin: 0 0 4px;
    font-size: 17px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
  }
  .upcoming-line {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .upcoming-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 14px;
    height: 100%;
    padding: 8px 4px 8px 0;
  }

  /* Earn-more grid */
  .earn-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .earn-tile {
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 14px;
    padding: 14px 8px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: inherit;
    text-align: center;
    min-height: 116px;
  }
  .earn-icon {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .earn-icon--ring {
    border: 1.5px solid #FF5C00;
    border-radius: 50%;
  }
  .earn-icon--spotify {
    background: #1ED760;
    border-radius: 50%;
  }
  .earn-label {
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.2;
  }
  .earn-value {
    font-size: 15px;
    font-weight: 700;
    color: #FF5C00;
  }

  /* Chevron-icon wrapper — lucide-svelte inherits `currentColor` when no
     color attribute is set, so wrapping a span lets us drive the icon hue
     from a CSS variable that flips with the theme. */
  .chevron-dim {
    display: inline-flex;
    color: var(--icon-dim);
  }

  /* Misc */
  .empty {
    margin: 8px 0 0;
    color: var(--text-tertiary);
    font-size: 14px;
  }
  .loading {
    padding: 80px 16px;
    text-align: center;
    color: var(--text-tertiary);
    font-size: 15px;
  }
</style>
