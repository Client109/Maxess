<script>
  import { ArrowLeft, Bell, BellRing, MapPin, Calendar, Clock, ExternalLink, ChevronDown, ChevronUp, Flame, Users } from 'lucide-svelte';
  import { subscribedSet, toggleSubscription } from '$lib/stores/subscriptions.js';

  export let data;

  $: event = data.event;
  $: recommended = data.recommended;
  $: fansAttending = data.fansAttending;
  $: fansAttendingCount = data.fansAttendingCount;

  let presaleOpen = false;
  let accessOpen = false;
  let ticketOpen = false;
  let fansOpen = false;

  // Presale countdown (mock: 18h from now)
  let presaleHours = 18;
  let presaleMinutes = 0;

  const tierBenefits = [
    { tier: 'Elite', color: '#FF5C00', perks: ['First access to presale', 'Skip the line', 'Meet & greet entry', 'Exclusive merch'] },
    { tier: 'Superfan', color: '#3B28CC', perks: ['Priority presale', 'Early venue entry', 'VIP seating options'] },
    { tier: 'Loyal', color: '#CD7F32', perks: ['Presale access', 'Member pricing', 'Points on purchase'] },
    { tier: 'General', color: '#8E8E93', perks: ['Standard ticketing', 'Basic event access'] },
  ];

  function statusBadge(s) {
    if (s === 'limited') return { text: 'Limited', bg: '#FF3B30' };
    if (s === 'upcoming') return { text: 'Upcoming', bg: '#FF5C00' };
    if (s === 'active') return { text: "You're in", bg: '#34D399' };
    return { text: s, bg: '#8E8E93' };
  }

  $: badge = statusBadge(event.status);
  $: categoryAccent = event.category === 'music' ? '#2667FF' : '#FF5C00';
  $: subscribed = $subscribedSet.has(event.event_id);
</script>

<svelte:head>
  <title>{event.title} - Maxess</title>
</svelte:head>

<div class="page">
  <!-- Hero -->
  <div
    class="hero"
    class:hero--has-image={event.image_url}
    style={event.image_url
      ? `background-image: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 55%, #000 100%), url(${event.image_url}); background-color: ${event.image_color};`
      : `background: linear-gradient(180deg, ${event.image_color} 0%, ${event.image_color}cc 60%, #000 100%);`}
  >
    <div class="hero-nav">
      <a href="/events" class="back-btn">
        <ArrowLeft size={20} />
      </a>
    </div>

    {#if event.genre_tag}
      <span class="genre-chip" style="background: {categoryAccent}">{event.genre_tag}</span>
    {/if}

    <h1 class="hero-title">{event.title}</h1>
    {#if event.subtitle}
      <p class="hero-subtitle">{event.subtitle}</p>
    {/if}

    <div class="hero-meta">
      <span class="meta-item"><Calendar size={14} /> {event.date_display || event.date}</span>
      <span class="meta-item"><Clock size={14} /> {event.time}</span>
    </div>
    <div class="hero-meta">
      <span class="meta-item"><MapPin size={14} /> {event.venue}</span>
    </div>

    {#if event.heat_score}
      <div class="heat-row">
        <Flame size={14} color={categoryAccent} />
        <span class="heat-value">{event.heat_score}% demand</span>
        {#if event.match_percentage}
          <span class="match-chip">{event.match_percentage}% match</span>
        {/if}
      </div>
    {/if}

    <!-- Presale countdown -->
    <div class="presale-countdown">
      <Bell size={14} />
      <span>Presale opens in {presaleHours}h {presaleMinutes}m</span>
    </div>
  </div>

  <!-- Action buttons -->
  <div class="actions-bar">
    <button
      class="btn-primary"
      class:btn-primary--on={subscribed}
      aria-pressed={subscribed}
      on:click={() => toggleSubscription(event.event_id, event.title)}
    >
      {#if subscribed}
        <BellRing size={16} />
        Notifying
      {:else}
        <Bell size={16} />
        Notify me
      {/if}
    </button>
    {#if event.external_url}
      <a href={event.external_url} target="_blank" rel="noopener" class="btn-outline">
        <ExternalLink size={16} />
        Tickets
      </a>
    {/if}
  </div>

  <!-- Fans attending -->
  <button
    type="button"
    class="fans-section"
    aria-expanded={fansOpen}
    on:click={() => fansOpen = !fansOpen}
  >
    <div class="fans-avatars">
      {#each fansAttending.slice(0, 3) as fan}
        <span class="fan-avatar" style="background: {fan.avatar_color}">{fan.avatar_initials}</span>
      {/each}
    </div>
    <span class="fans-label">{fansAttendingCount} fans going</span>
  </button>
  {#if fansOpen}
    <ul class="fans-list">
      {#each fansAttending as fan}
        <li class="fans-list-item">
          <span class="fan-avatar fan-avatar--lg" style="background: {fan.avatar_color}">{fan.avatar_initials}</span>
          <span class="fans-list-name">{fan.name}</span>
        </li>
      {/each}
    </ul>
  {/if}

  <!-- Status badge -->
  <div class="status-row">
    <span class="status-badge" style="background: {badge.bg}">{badge.text}</span>
    {#if event.sale_status}
      <span class="sale-chip">{event.sale_status}</span>
    {/if}
  </div>

  <!-- Expandable sections -->
  <div class="expand-sections">
    <button class="expand-header" on:click={() => presaleOpen = !presaleOpen}>
      <span class="expand-title">Presale info</span>
      {#if presaleOpen}<ChevronUp size={18} />{:else}<ChevronDown size={18} />{/if}
    </button>
    {#if presaleOpen}
      <div class="expand-body">
        <p>Elite and Superfan members get early access to presale tickets before the general public. Presale window opens 48 hours before general sale.</p>
        <p>Your tier: <strong>Elite</strong> — you'll have first access.</p>
      </div>
    {/if}

    <button class="expand-header" on:click={() => accessOpen = !accessOpen}>
      <span class="expand-title">Member access window</span>
      {#if accessOpen}<ChevronUp size={18} />{:else}<ChevronDown size={18} />{/if}
    </button>
    {#if accessOpen}
      <div class="expand-body">
        <div class="access-timeline">
          <div class="timeline-item active">
            <span class="timeline-dot"></span>
            <div>
              <strong>Elite</strong>
              <span class="timeline-time">48h early access</span>
            </div>
          </div>
          <div class="timeline-item">
            <span class="timeline-dot"></span>
            <div>
              <strong>Superfan</strong>
              <span class="timeline-time">24h early access</span>
            </div>
          </div>
          <div class="timeline-item">
            <span class="timeline-dot"></span>
            <div>
              <strong>Loyal</strong>
              <span class="timeline-time">12h early access</span>
            </div>
          </div>
          <div class="timeline-item">
            <span class="timeline-dot"></span>
            <div>
              <strong>General</strong>
              <span class="timeline-time">Public sale</span>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <button class="expand-header" on:click={() => ticketOpen = !ticketOpen}>
      <span class="expand-title">Ticket info</span>
      {#if ticketOpen}<ChevronUp size={18} />{:else}<ChevronDown size={18} />{/if}
    </button>
    {#if ticketOpen}
      <div class="expand-body">
        <p>Tickets available through Ticketmaster. Prices vary by section and availability. VIP packages may include meet & greet, early entry, and exclusive merchandise.</p>
      </div>
    {/if}
  </div>

  <!-- Benefits by tier -->
  <section class="section">
    <h3 class="section-title">Available benefits by tier</h3>
    <div class="tier-cards">
      {#each tierBenefits as tb}
        <div class="tier-card">
          <div class="tier-header" style="background: {tb.color}">
            <span class="tier-name">{tb.tier}</span>
          </div>
          <ul class="tier-perks">
            {#each tb.perks as perk}
              <li>{perk}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <!-- Recommended -->
  {#if recommended.length > 0}
    <section class="section">
      <h3 class="section-title">Recommended for you</h3>
      <div class="rec-list">
        {#each recommended as rec}
          <a href="/events/{rec.event_id}" class="rec-card">
            <div
              class="rec-color"
              class:rec-color--has-image={rec.image_url}
              style={rec.image_url
                ? `background-color: ${rec.image_color}; background-image: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%), url('${rec.image_url}');`
                : `background: ${rec.image_color};`}
            >
              {#if rec.genre_tag}
                <span class="rec-genre">{rec.genre_tag}</span>
              {/if}
            </div>
            <div class="rec-info">
              <span class="rec-title">{rec.title}</span>
              <span class="rec-meta">{rec.venue} · {rec.date_display || rec.date}</span>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  .page {
    background: #F2F2F7;
    min-height: 100vh;
    padding-bottom: 120px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: #1C1C1E;
  }

  /* Hero */
  .hero {
    padding: 16px 16px 24px;
    color: #FFFFFF;
    position: relative;
  }

  .hero--has-image {
    background-size: cover, cover;
    background-position: center, center;
    background-repeat: no-repeat;
    min-height: 280px;
  }

  .hero-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
    text-decoration: none;
    border: none;
  }

  .genre-chip {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 12px;
  }

  .hero-title {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 4px;
    line-height: 1.15;
  }

  .hero-subtitle {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 16px;
  }

  .hero-meta {
    display: flex;
    gap: 16px;
    margin-bottom: 6px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
  }

  .heat-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
  }

  .heat-value {
    font-size: 13px;
    font-weight: 600;
    color: #FF5C00;
  }

  .match-chip {
    font-size: 11px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.2);
    padding: 3px 8px;
    border-radius: 6px;
  }

  .presale-countdown {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    font-size: 13px;
    font-weight: 600;
    color: #FFD700;
  }

  /* Actions bar */
  .actions-bar {
    display: flex;
    gap: 10px;
    padding: 16px;
  }

  .btn-primary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    background: #FF5C00;
    color: #FFFFFF;
    border: 1.5px solid #FF5C00;
    border-radius: 99px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, color 0.15s;
  }

  .btn-primary--on {
    background: #FFFFFF;
    color: #FF5C00;
  }

  .btn-outline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 14px 20px;
    background: #FFFFFF;
    color: #1C1C1E;
    border: 1px solid #E5E5EA;
    border-radius: 99px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    font-family: inherit;
  }

  /* Fans attending */
  .fans-section {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 16px;
    margin-bottom: 8px;
    background: none;
    border: none;
    border-radius: 10px;
    font-family: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s;
  }

  .fans-section:hover,
  .fans-section[aria-expanded="true"] {
    background: rgba(0, 0, 0, 0.04);
  }

  .fans-avatars {
    display: flex;
  }

  .fan-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    color: #FFFFFF;
    border: 2px solid #F2F2F7;
    margin-left: -8px;
  }

  .fan-avatar:first-child { margin-left: 0; }

  .fan-avatar--lg {
    width: 36px;
    height: 36px;
    font-size: 12px;
    margin-left: 0;
  }

  .fans-label {
    font-size: 13px;
    color: #8E8E93;
  }

  .fans-list {
    list-style: none;
    margin: 0 16px 16px;
    padding: 8px 0;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 12px;
  }

  .fans-list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px;
  }

  .fans-list-name {
    font-size: 14px;
    font-weight: 500;
    color: #1C1C1E;
  }

  /* Status row */
  .status-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px 16px;
  }

  .status-badge {
    font-size: 12px;
    font-weight: 600;
    color: #FFFFFF;
    padding: 4px 12px;
    border-radius: 8px;
  }

  .sale-chip {
    font-size: 12px;
    font-weight: 500;
    color: #8E8E93;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    padding: 4px 10px;
    border-radius: 8px;
  }

  /* Expandable sections */
  .expand-sections {
    margin: 0 16px 24px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    overflow: hidden;
  }

  .expand-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    background: none;
    border: none;
    border-bottom: 1px solid #F2F2F7;
    cursor: pointer;
    font-family: inherit;
    color: #1C1C1E;
  }

  .expand-header:last-of-type { border-bottom: none; }

  .expand-title {
    font-size: 15px;
    font-weight: 600;
  }

  .expand-body {
    padding: 0 16px 16px;
    font-size: 14px;
    line-height: 1.5;
    color: #6E6E73;
  }

  .expand-body p { margin: 0 0 8px; }
  .expand-body p:last-child { margin: 0; }

  /* Access timeline */
  .access-timeline {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 4px;
  }

  .timeline-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .timeline-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #E5E5EA;
    flex-shrink: 0;
  }

  .timeline-item.active .timeline-dot {
    background: #FF5C00;
  }

  .timeline-item strong {
    font-size: 14px;
    color: #1C1C1E;
  }

  .timeline-time {
    display: block;
    font-size: 12px;
    color: #8E8E93;
  }

  /* Section */
  .section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 17px;
    font-weight: 600;
    padding: 0 16px 12px;
    margin: 0;
  }

  /* Tier cards */
  .tier-cards {
    display: flex;
    gap: 10px;
    padding: 0 16px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .tier-cards::-webkit-scrollbar { display: none; }

  .tier-card {
    min-width: 140px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 14px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .tier-header {
    padding: 10px 12px;
    color: #FFFFFF;
  }

  .tier-name {
    font-size: 13px;
    font-weight: 700;
  }

  .tier-perks {
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .tier-perks li {
    font-size: 12px;
    color: #6E6E73;
    line-height: 1.3;
  }

  /* Recommended */
  .rec-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 16px;
  }

  .rec-card {
    display: flex;
    gap: 12px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 14px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
  }

  .rec-color {
    width: 80px;
    min-height: 72px;
    display: flex;
    align-items: flex-end;
    padding: 6px;
    flex-shrink: 0;
  }

  .rec-color--has-image {
    background-size: cover, cover;
    background-position: center, center;
    background-repeat: no-repeat;
  }

  .rec-genre {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.3);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .rec-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    padding: 12px 12px 12px 0;
    min-width: 0;
  }

  .rec-title {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rec-meta {
    font-size: 12px;
    color: #8E8E93;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
