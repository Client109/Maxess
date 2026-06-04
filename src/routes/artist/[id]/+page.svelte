<script>
  import { ArrowLeft, Music, Ticket, Headphones, Trophy, Calendar, ChevronDown, ChevronUp, Star, Users, BarChart3 } from 'lucide-svelte';

  export let data;

  $: artist = data.artist;
  $: upcomingEvents = data.upcomingEvents;
  $: leaderboard = data.leaderboard;

  let perksOpen = true;
  let recapOpen = false;

  const tierThresholds = [
    { name: 'General', min: 0, color: '#8E8E93' },
    { name: 'Loyal', min: 30, color: '#CD7F32' },
    { name: 'Superfan', min: 60, color: '#3B28CC' },
    { name: 'Elite', min: 85, color: '#FF5C00' },
  ];

  // Perks & experiences mock
  const perks = [
    { icon: '🎟️', title: 'Presale access', desc: 'Get tickets before the public' },
    { icon: '🎤', title: 'Meet & greet', desc: 'Available at Elite tier' },
    { icon: '🎵', title: 'Exclusive tracks', desc: 'Early access to new releases' },
    { icon: '🛍️', title: 'Merch drops', desc: 'Limited edition items' },
  ];
</script>

<svelte:head>
  <title>{artist.name} - Maxess</title>
</svelte:head>

<div class="page">
  <!-- Header -->
  <header class="header">
    <a href="/profile" class="back-btn">
      <ArrowLeft size={20} />
    </a>
    <h1 class="header-title">{artist.name}</h1>
    <div class="header-spacer"></div>
  </header>

  <!-- Superfan Score Card -->
  <div class="score-card" style="background: linear-gradient(160deg, #0f1923 0%, {artist.image_color} 100%)">
    <div class="score-top">
      <div class="score-circle">
        <svg viewBox="0 0 120 120" class="score-ring">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="{artist.tier_color}" stroke-width="8"
            stroke-dasharray="{artist.superfan_score * 3.27} 327"
            stroke-linecap="round" transform="rotate(-90 60 60)" />
        </svg>
        <div class="score-inner">
          <span class="score-number">{artist.superfan_score}</span>
          <span class="score-label">/ 100</span>
        </div>
      </div>
      <div class="score-meta">
        <span class="score-genre">{artist.genre}</span>
        <span class="tier-badge" style="background: {artist.tier_color}">{artist.tier}</span>
      </div>
    </div>

    <!-- Tier progress bar -->
    <div class="tier-progress">
      <div class="tier-bar">
        <div class="tier-fill" style="width: {artist.tier_progress * 100}%; background: {artist.tier_color}"></div>
      </div>
      <div class="tier-markers">
        {#each tierThresholds as t}
          <span class="tier-mark" class:active={artist.superfan_score >= t.min} style="left: {t.min}%">
            <span class="mark-dot" style="background: {artist.superfan_score >= t.min ? t.color : '#555'}"></span>
          </span>
        {/each}
      </div>
      <div class="tier-labels">
        {#each tierThresholds as t}
          <span class="tier-label-sm">{t.name}</span>
        {/each}
      </div>
    </div>
  </div>

  <!-- KPIs -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <Ticket size={18} color="#FF5C00" />
      <span class="kpi-value">{artist.shows_attended}</span>
      <span class="kpi-label">Shows attended</span>
    </div>
    <div class="kpi-card">
      <Headphones size={18} color="#3B28CC" />
      <span class="kpi-value">{artist.hours_listened}h</span>
      <span class="kpi-label">Hours listened</span>
    </div>
    <div class="kpi-card">
      <Trophy size={18} color="#FFD700" />
      <span class="kpi-value">#{artist.listener_rank.toLocaleString()}</span>
      <span class="kpi-label">of {(artist.listener_rank_total / 1000).toFixed(0)}k listeners</span>
    </div>
  </div>

  <!-- Perks & Experiences -->
  <section class="section">
    <button class="section-header" on:click={() => perksOpen = !perksOpen}>
      <h3 class="section-title">Perks & experiences</h3>
      {#if perksOpen}<ChevronUp size={18} color="#8E8E93" />{:else}<ChevronDown size={18} color="#8E8E93" />{/if}
    </button>
    {#if perksOpen}
      <div class="perks-list">
        {#each perks as perk}
          <div class="perk-row">
            <span class="perk-icon">{perk.icon}</span>
            <div class="perk-info">
              <span class="perk-title">{perk.title}</span>
              <span class="perk-desc">{perk.desc}</span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Upcoming events -->
  {#if upcomingEvents.length > 0}
    <section class="section">
      <h3 class="section-title pad">Upcoming events</h3>
      <div class="events-list">
        {#each upcomingEvents as evt}
          <a href="/events/{evt.event_id}" class="event-row">
            <div class="event-color" style="background: {evt.image_color}">
              <Calendar size={16} color="#fff" />
            </div>
            <div class="event-info">
              <span class="event-title">{evt.title}</span>
              <span class="event-meta">{evt.venue} · {evt.date_display || evt.date}</span>
            </div>
            <div class="event-badge">
              <span class="presale-chip">Presale</span>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Community Leaderboard -->
  <section class="section">
    <h3 class="section-title pad">Community leaderboard</h3>
    <div class="leaderboard-card">
      {#each leaderboard as entry}
        <div class="lb-row" class:is-me={entry.is_me}>
          <span class="lb-rank">#{entry.rank}</span>
          <span class="lb-name">{entry.name}</span>
          <span class="lb-city">{entry.city}</span>
          <span class="lb-score">{entry.score}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Monthly Recap -->
  <section class="section">
    <button class="section-header" on:click={() => recapOpen = !recapOpen}>
      <h3 class="section-title">Monthly recap</h3>
      {#if recapOpen}<ChevronUp size={18} color="#8E8E93" />{:else}<ChevronDown size={18} color="#8E8E93" />{/if}
    </button>
    {#if recapOpen}
      <div class="recap-card">
        <div class="recap-row">
          <Music size={16} color="#FF5C00" />
          <span class="recap-label">Top track</span>
          <span class="recap-value">{artist.top_track}</span>
        </div>
        <div class="recap-row">
          <BarChart3 size={16} color="#3B28CC" />
          <span class="recap-label">Plays this month</span>
          <span class="recap-value">{artist.monthly_plays}</span>
        </div>
        <div class="recap-row">
          <Headphones size={16} color="#34D399" />
          <span class="recap-label">Hours this month</span>
          <span class="recap-value">{artist.monthly_hours}h</span>
        </div>
      </div>
    {/if}
  </section>
</div>

<style>
  .page {
    background: #F2F2F7;
    min-height: 100vh;
    padding-bottom: 120px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: #1C1C1E;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
    background: #FFFFFF;
    border-bottom: 1px solid #E5E5EA;
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #F2F2F7;
    color: #1C1C1E;
    text-decoration: none;
    border: none;
    flex-shrink: 0;
  }

  .header-title {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
    flex: 1;
    text-align: center;
  }

  .header-spacer {
    width: 36px;
    flex-shrink: 0;
  }

  /* Score Card */
  .score-card {
    margin: 16px;
    border-radius: 20px;
    padding: 24px 20px 20px;
    color: #FFFFFF;
  }

  .score-top {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .score-circle {
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }

  .score-ring {
    width: 100%;
    height: 100%;
  }

  .score-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .score-number {
    display: block;
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }

  .score-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .score-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .score-genre {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }

  .tier-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 4px 12px;
    border-radius: 6px;
    color: #FFFFFF;
    align-self: flex-start;
  }

  /* Tier progress */
  .tier-progress {
    position: relative;
  }

  .tier-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    overflow: hidden;
  }

  .tier-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.6s;
  }

  .tier-markers {
    position: relative;
    height: 16px;
  }

  .tier-mark {
    position: absolute;
    top: 4px;
    transform: translateX(-50%);
  }

  .mark-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: block;
  }

  .tier-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
  }

  .tier-label-sm {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* KPIs */
  .kpi-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 0 16px;
    margin-bottom: 24px;
  }

  .kpi-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 14px;
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
  }

  .kpi-value {
    font-size: 18px;
    font-weight: 700;
    color: #1C1C1E;
  }

  .kpi-label {
    font-size: 11px;
    color: #8E8E93;
  }

  /* Section */
  .section {
    margin-bottom: 24px;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px 12px;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .section-title {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
    color: #1C1C1E;
  }

  .section-title.pad {
    padding: 0 16px 12px;
  }

  /* Perks */
  .perks-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin: 0 16px;
    background: #E5E5EA;
    border-radius: 14px;
    overflow: hidden;
  }

  .perk-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: #FFFFFF;
  }

  .perk-icon {
    font-size: 20px;
    flex-shrink: 0;
  }

  .perk-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .perk-title {
    font-size: 14px;
    font-weight: 600;
  }

  .perk-desc {
    font-size: 12px;
    color: #8E8E93;
  }

  /* Events list */
  .events-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin: 0 16px;
    background: #E5E5EA;
    border-radius: 14px;
    overflow: hidden;
  }

  .event-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: #FFFFFF;
    text-decoration: none;
    color: inherit;
  }

  .event-color {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .event-info {
    flex: 1;
    min-width: 0;
  }

  .event-title {
    display: block;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .event-meta {
    display: block;
    font-size: 12px;
    color: #8E8E93;
  }

  .event-badge {
    flex-shrink: 0;
  }

  .presale-chip {
    font-size: 10px;
    font-weight: 600;
    color: #FF5C00;
    background: #FF5C0015;
    padding: 4px 8px;
    border-radius: 6px;
  }

  /* Leaderboard */
  .leaderboard-card {
    margin: 0 16px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 14px;
    overflow: hidden;
  }

  .lb-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-bottom: 1px solid #F2F2F7;
  }

  .lb-row:last-child { border-bottom: none; }

  .lb-row.is-me {
    background: #FF5C0008;
  }

  .lb-rank {
    font-size: 13px;
    font-weight: 600;
    color: #8E8E93;
    min-width: 28px;
  }

  .lb-name {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
  }

  .lb-city {
    font-size: 12px;
    color: #8E8E93;
  }

  .lb-score {
    font-size: 14px;
    font-weight: 700;
    color: #FF5C00;
    min-width: 28px;
    text-align: right;
  }

  /* Recap */
  .recap-card {
    margin: 0 16px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 14px;
    overflow: hidden;
  }

  .recap-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    border-bottom: 1px solid #F2F2F7;
  }

  .recap-row:last-child { border-bottom: none; }

  .recap-label {
    flex: 1;
    font-size: 14px;
    color: #6E6E73;
  }

  .recap-value {
    font-size: 14px;
    font-weight: 600;
    color: #1C1C1E;
  }
</style>
