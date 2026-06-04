<script>
  import { Music } from 'lucide-svelte';
  import {
    appleMusicConnected,
    appleMusicLoading,
    hotListArtists,
    hotListProgress,
    listeningXP,
    topMatchedArtists,
    connectAppleMusic
  } from '$lib/stores/appleMusic.js';

  const genreColors = {
    'R&B': '#9B59B6',
    'Hip-Hop': '#E74C3C',
    'Pop/Rap': '#F39C12',
    'Pop': '#3498DB'
  };

  function getGenreColor(genre) {
    return genreColors[genre] || '#8E8E93';
  }

  function getProgress(artistId) {
    const p = $hotListProgress.find(h => h.artist_id === artistId);
    return p || { user_play_count: 0, xp_earned: 0, current_bonus_tier: 0, next_bonus_at: 25 };
  }

  function getProgressPercent(artist) {
    const p = getProgress(artist.artist_id);
    const maxPlays = artist.bonus_tiers[artist.bonus_tiers.length - 1]?.plays_required || 100;
    return Math.min(100, (p.user_play_count / maxPlays) * 100);
  }
</script>

{#if !$appleMusicConnected}
  <!-- Not Connected CTA -->
  <section class="hotlist-cta">
    <div class="cta-card">
      <div class="cta-icon">
        <Music size={24} color="#FF5C00" />
      </div>
      <h3 class="cta-title">Earn points by listening</h3>
      <p class="cta-description">Connect Apple Music to earn points from Hot List artists</p>
      <button class="cta-button" on:click={connectAppleMusic} disabled={$appleMusicLoading}>
        {$appleMusicLoading ? 'Connecting...' : 'Connect Apple Music'}
      </button>
    </div>
  </section>
{:else}
  <!-- Connected: Hot List -->
  <section class="hotlist-section">
    <div class="hotlist-header">
      <h2 class="hotlist-title">HOT LIST</h2>
      <span class="xp-badge">{$listeningXP.toLocaleString()} pts</span>
    </div>

    <!-- Artist Cards Scroll -->
    <div class="artist-scroll">
      {#each $hotListArtists as artist}
        {@const progress = getProgress(artist.artist_id)}
        <div class="artist-card">
          {#if artist.is_featured}
            <div class="featured-chip">FEATURED 2x PTS</div>
          {/if}
          <div class="artist-avatar" style="background-color: {getGenreColor(artist.genre)}">
            {artist.name[0]}
          </div>
          <h4 class="artist-name">{artist.name}</h4>
          <span class="artist-genre">{artist.genre}</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: {getProgressPercent(artist)}%"></div>
          </div>
          <div class="artist-stats">
            <span class="play-count">{progress.user_play_count} plays</span>
            <span class="xp-earned">+{progress.xp_earned} pts</span>
          </div>
        </div>
      {/each}
    </div>

    <!-- Matched Artists -->
    {#if $topMatchedArtists.length > 0}
      <div class="matched-section">
        <span class="matched-label">Your top artists</span>
        <div class="matched-chips">
          {#each $topMatchedArtists as name}
            <span class="matched-chip">{name}</span>
          {/each}
        </div>
      </div>
    {/if}
  </section>
{/if}

<style>
  /* CTA State */
  .hotlist-cta {
    padding: 0 16px;
    margin-top: 16px;
  }

  .cta-card {
    background: linear-gradient(135deg, #111111 0%, #3D1800 100%);
    border-radius: 14px;
    padding: 24px;
    text-align: center;
  }

  .cta-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 92, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
  }

  .cta-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--pure-white);
    margin: 0 0 6px;
  }

  .cta-description {
    font-size: 13px;
    color: #AEAEB2;
    margin: 0 0 16px;
  }

  .cta-button {
    background: var(--action-orange);
    color: var(--pure-white);
    border: none;
    border-radius: 99px;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .cta-button:hover {
    opacity: 0.9;
  }

  .cta-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Connected State */
  .hotlist-section {
    margin-top: 16px;
    padding: 0 16px;
  }

  .hotlist-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .hotlist-title {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: var(--true-black);
    margin: 0;
  }

  .xp-badge {
    font-size: 12px;
    font-weight: 600;
    color: var(--action-orange);
    background: rgba(255, 92, 0, 0.1);
    padding: 4px 8px;
    border-radius: 8px;
  }

  /* Artist Scroll */
  .artist-scroll {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .artist-scroll::-webkit-scrollbar {
    display: none;
  }

  .artist-card {
    flex-shrink: 0;
    width: 140px;
    background: var(--pure-white);
    border: 1px solid var(--border-gray);
    border-radius: 14px;
    padding: 14px;
    position: relative;
  }

  .featured-chip {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 8px;
    font-weight: 700;
    color: var(--action-orange);
    background: rgba(255, 92, 0, 0.1);
    padding: 3px 6px;
    border-radius: 6px;
    text-transform: uppercase;
  }

  .artist-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: var(--pure-white);
    margin-bottom: 10px;
  }

  .artist-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--true-black);
    margin: 0 0 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist-genre {
    font-size: 11px;
    color: var(--system-gray);
    display: block;
    margin-bottom: 10px;
  }

  .progress-bar-container {
    width: 100%;
    height: 4px;
    background: var(--border-gray);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .progress-bar-fill {
    height: 100%;
    background: var(--action-orange);
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  .artist-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .play-count {
    font-size: 10px;
    color: var(--system-gray);
  }

  .xp-earned {
    font-size: 10px;
    font-weight: 600;
    color: var(--action-orange);
  }

  /* Matched Artists */
  .matched-section {
    margin-top: 14px;
  }

  .matched-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--system-gray);
    display: block;
    margin-bottom: 8px;
  }

  .matched-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .matched-chip {
    font-size: 12px;
    font-weight: 500;
    color: var(--true-black);
    background: var(--off-white);
    border: 1px solid var(--border-gray);
    padding: 5px 10px;
    border-radius: 99px;
  }
</style>
