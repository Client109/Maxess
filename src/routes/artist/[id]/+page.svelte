<script>
  import { ArrowLeft, Music, Ticket, Headphones, Trophy, Calendar, ChevronDown, ChevronUp, Star, Users, BarChart3, Plus, Check, Sparkles, Flame } from 'lucide-svelte';
  import { followedSet, toggleFollowArtist } from '$lib/stores/followedArtists.js';

  export let data;

  $: artist = data.artist;
  $: upcomingEvents = data.upcomingEvents;
  $: leaderboard = data.leaderboard;
  // Server-truth on first paint, then mirrors client-side store after toggles.
  let serverFollowId = data.serverFollow?.id ?? null;
  let serverFollowing = data.serverFollow?.followed ?? false;
  $: isFollowing = serverFollowing || $followedSet.has(artist.id);
  $: hasListeningData = artist.monthly_plays > 0;

  async function persistFollowToggle() {
    // Mirror the existing client-side store, then sync to server so listens
    // capture can attribute plays. Server is authoritative for XP attribution.
    if (serverFollowing && serverFollowId) {
      const res = await fetch(`/api/artists/follow/${serverFollowId}`, { method: 'DELETE' });
      if (res.ok) {
        serverFollowing = false;
        serverFollowId = null;
      }
    } else {
      const res = await fetch('/api/artists/follow', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ display_name: artist.name }),
      });
      if (res.ok) {
        const body = await res.json();
        serverFollowing = true;
        serverFollowId = body?.followed?.id ?? null;
      } else if (res.status === 409) {
        serverFollowing = true;
      }
    }
  }

  // Sports genres (NHL, NBA, MLB, NFL, soccer) ride the same /artist/[id] route.
  // Category controls how progress is grouped in the home "YOUR PROGRESS" section.
  $: followCategory = /hockey|basketball|baseball|football|nfl|nba|mlb|nhl|soccer/i.test(artist.genre)
    ? 'sports'
    : 'music';
  // superfan_score is 0–100. Scale to the points domain used by tier classification
  // (Loyal=1000, Superfan=2500, Elite=5000). 60× lands ~Superfan at 50, Elite at 85.
  $: followPointsSeed = Math.round((artist.superfan_score ?? 0) * 60);

  let perksOpen = true;

  // Canonical 5-tier scale (xp.ts → TIERS). Visual marker positions are
  // equally spaced across the bar so Fan / Loyal / Superfan / Elite each get
  // an equal slice — the underlying points thresholds (10K / 100K / 250K / 1M)
  // are non-linear and would crunch the low tiers if laid out to scale.
  const TIER_LIST = [
    { name: 'Newcomer', position: 0,   color: '#8E8E93' },
    { name: 'Fan',      position: 25,  color: '#1A9E56' },
    { name: 'Loyal',    position: 50,  color: '#2667FF' },
    { name: 'Superfan', position: 75,  color: '#3B28CC' },
    { name: 'Elite',    position: 100, color: '#FF5C00' },
  ];

  // Compute fill width from the user's current tier + progress within it.
  // Each tier band is one 25% slice; tier_progress (0–1) interpolates inside.
  $: tierIndex = Math.max(0, TIER_LIST.findIndex(t => t.name === artist.tier));
  $: fillPercent = Math.min(100, Math.max(
    0,
    tierIndex * 25 + Math.min(1, Math.max(0, artist.tier_progress ?? 0)) * 25,
  ));

  // Compact points formatter for the hero ring. Full notation (e.g.
   // "1,180,000") overflows the 96px circle, so >=1K rolls into K and >=1M
   // into M with a single decimal when needed. The precise number sits on
   // the bar below (its labels are tier ranges).
  function fmtPoints(n) {
    if (n == null || !Number.isFinite(n)) return '0';
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
    return n.toLocaleString();
  }

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
  <div class="score-card" style="background: linear-gradient(160deg, {artist.image_color} 0%, #0E0E10 100%)">
    <div class="score-top">
      <div class="portrait">
        {#if artist.image}
          <img src={artist.image} alt={artist.name} />
        {:else}
          <span>{artist.name.slice(0, 1)}</span>
        {/if}
      </div>
      <div class="score-circle">
        <svg viewBox="0 0 120 120" class="score-ring">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="{artist.tier_color}" stroke-width="8"
            stroke-dasharray="{Math.max(0, Math.min(1, artist.tier_progress ?? 0)) * 327} 327"
            stroke-linecap="round" transform="rotate(-90 60 60)" />
        </svg>
        <div class="score-inner">
          <span class="score-number">{fmtPoints(artist.points)}</span>
          <span class="score-label">pts</span>
        </div>
      </div>
    </div>
    <div class="score-meta">
      <div class="score-meta-info">
        <span class="score-genre">{artist.genre}</span>
        <span class="tier-badge" style="background: {artist.tier_color}">{artist.tier}</span>
      </div>
      <button
        type="button"
        class="follow-btn"
        class:follow-btn--on={isFollowing}
        aria-pressed={isFollowing}
        on:click={() => {
          toggleFollowArtist(artist.id, artist.name, { category: followCategory, points: followPointsSeed });
          persistFollowToggle();
        }}
      >
        {#if isFollowing}
          <Check size={14} />
          Following
        {:else}
          <Plus size={14} />
          Follow
        {/if}
      </button>
    </div>

    <!-- Tier progress bar. Markers sit at evenly-spaced positions (0/25/50/
         75/100); the fill interpolates inside the user's current tier band
         using tier_progress so position + fill always agree visually. -->
    <div class="tier-progress">
      <div class="tier-bar">
        <div class="tier-fill" style="width: {fillPercent}%; background: {artist.tier_color}"></div>
      </div>
      <div class="tier-markers">
        {#each TIER_LIST as t, i}
          <span class="tier-mark" class:active={i <= tierIndex} style="left: {t.position}%">
            <span class="mark-dot" style="background: {i <= tierIndex ? t.color : '#555'}"></span>
          </span>
        {/each}
      </div>
      <div class="tier-labels">
        {#each TIER_LIST as t}
          <span class="tier-label-sm" style="left: {t.position}%">{t.name}</span>
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

  <!-- Monthly Recap — always visible when there's listening data -->
  {#if hasListeningData}
    <section class="section">
      <h3 class="section-title pad">Monthly recap</h3>
      <div class="recap-card">
        <div class="recap-stats">
          <div class="recap-stat">
            <BarChart3 size={14} color="#3B28CC" />
            <span class="recap-stat-value">{artist.monthly_plays}</span>
            <span class="recap-stat-label">plays</span>
          </div>
          <div class="recap-stat">
            <Headphones size={14} color="#34D399" />
            <span class="recap-stat-value">{artist.monthly_hours}h</span>
            <span class="recap-stat-label">listened</span>
          </div>
          <div class="recap-stat">
            <Sparkles size={14} color="#FF5C00" />
            <span class="recap-stat-value">{artist.discovery_count}</span>
            <span class="recap-stat-label">discovered</span>
          </div>
        </div>

        {#if artist.top_tracks.length > 0}
          <div class="recap-block">
            <span class="recap-block-label">
              <Music size={13} color="#2667FF" />
              Top tracks
            </span>
            <ol class="recap-tracks">
              {#each artist.top_tracks as track, i}
                <li class="recap-track">
                  <span class="recap-track-rank">{i + 1}</span>
                  <span class="recap-track-title">{track.title}</span>
                  <span class="recap-track-plays">{track.plays} plays</span>
                </li>
              {/each}
            </ol>
          </div>
        {/if}

        <div class="recap-footer">
          {#if artist.peak_day}
            <div class="recap-footer-item">
              <Flame size={13} color="#FF5C00" />
              <span>Peak day · <strong>{artist.peak_day}</strong> ({artist.peak_day_hours}h)</span>
            </div>
          {/if}
          {#if artist.longest_session_min > 0}
            <div class="recap-footer-item">
              <Headphones size={13} color="#3B28CC" />
              <span>Longest session · <strong>{Math.floor(artist.longest_session_min / 60)}h {artist.longest_session_min % 60}m</strong></span>
            </div>
          {/if}
        </div>
      </div>
    </section>
  {/if}
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
    background: var(--bg-primary);
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-pill);
    color: var(--text-primary);
    text-decoration: none;
    border: 1px solid var(--border-strong);
    flex-shrink: 0;
  }

  .header-title {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
    flex: 1;
    text-align: center;
    color: var(--text-primary);
  }

  .header-spacer {
    width: 36px;
    flex-shrink: 0;
  }

  /* Score Card (hero, artist-color gradient) */
  .score-card {
    margin: 8px 16px 16px;
    border: 1px solid var(--border-card);
    border-radius: 20px;
    padding: 20px;
    color: var(--text-primary);
  }

  .score-top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .portrait {
    width: 96px;
    height: 96px;
    border-radius: 16px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .portrait span {
    font-size: 36px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .score-circle {
    position: relative;
    width: 96px;
    height: 96px;
    flex-shrink: 0;
    margin-left: auto;
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
    color: var(--text-primary);
  }

  .score-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.55);
  }

  .score-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .score-meta-info {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .score-genre {
    font-size: 13px;
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
    color: var(--text-primary);
  }

  .follow-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 99px;
    border: 1.5px solid #FFFFFF;
    background: #FFFFFF;
    color: #000000;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .follow-btn--on {
    background: transparent;
    color: var(--text-primary);
    border-color: rgba(255, 255, 255, 0.4);
  }

  /* Tier progress */
  .tier-progress {
    position: relative;
  }

  .tier-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.12);
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
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  .tier-labels {
    position: relative;
    height: 14px;
    margin-top: 2px;
  }

  .tier-label-sm {
    position: absolute;
    transform: translateX(-50%);
    font-size: 10px;
    color: rgba(255, 255, 255, 0.55);
    white-space: nowrap;
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
    background: var(--bg-card);
    border: 1px solid var(--border-card);
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
    color: var(--text-primary);
  }

  .kpi-label {
    font-size: 11px;
    color: var(--text-tertiary);
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
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
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
    background: var(--bg-pill);
    border: 1px solid var(--border-card);
    border-radius: 14px;
    overflow: hidden;
  }

  .perk-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: var(--bg-card);
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
    color: var(--text-primary);
  }

  .perk-desc {
    font-size: 12px;
    color: var(--text-tertiary);
  }

  /* Events list */
  .events-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin: 0 16px;
    background: var(--bg-pill);
    border: 1px solid var(--border-card);
    border-radius: 14px;
    overflow: hidden;
  }

  .event-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: var(--bg-card);
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
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .event-meta {
    display: block;
    font-size: 12px;
    color: var(--text-tertiary);
  }

  .event-badge {
    flex-shrink: 0;
  }

  .presale-chip {
    font-size: 10px;
    font-weight: 600;
    color: #FF5C00;
    background: rgba(255, 92, 0, 0.15);
    padding: 4px 8px;
    border-radius: 6px;
  }

  /* Leaderboard */
  .leaderboard-card {
    margin: 0 16px;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 14px;
    overflow: hidden;
  }

  .lb-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .lb-row:last-child { border-bottom: none; }

  .lb-row.is-me {
    background: rgba(255, 92, 0, 0.08);
  }

  .lb-rank {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-tertiary);
    min-width: 28px;
  }

  .lb-name {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
  }

  .lb-city {
    font-size: 12px;
    color: var(--text-tertiary);
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
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .recap-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .recap-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: var(--bg-card-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 12px 8px;
  }

  .recap-stat-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.1;
  }

  .recap-stat-label {
    font-size: 11px;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .recap-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .recap-block-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .recap-tracks {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .recap-track {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .recap-track:last-child { border-bottom: none; }

  .recap-track-rank {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--bg-pill);
    color: var(--text-primary);
    font-size: 12px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .recap-track-title {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recap-track-plays {
    font-size: 12px;
    color: var(--text-tertiary);
    flex-shrink: 0;
  }

  .recap-footer {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 12px;
    border-top: 1px solid var(--border-subtle);
  }

  .recap-footer-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--text-tertiary);
  }

  .recap-footer-item strong {
    color: var(--text-primary);
    font-weight: 600;
  }
</style>
