<script>
  import { Music, X, RefreshCw } from 'lucide-svelte';

  /** @type {Array<{ id: string; display_name: string; image_url?: string }>} */
  export let followedArtists = [];

  let syncing = false;
  /** @type {{ error?: string; skipped?: string; new_plays?: number; xp_awarded?: number } | null} */
  let lastResult = null;

  /** @param {string} id */
  async function unfollow(id) {
    if (!confirm('Unfollow this artist?')) return;
    const res = await fetch(`/api/artists/follow/${id}`, { method: 'DELETE' });
    if (res.ok && typeof window !== 'undefined') window.location.reload();
  }

  async function syncNow() {
    syncing = true;
    lastResult = null;
    try {
      const res = await fetch('/api/listens/sync', { method: 'POST' });
      const body = await res.json();
      lastResult = res.ok ? body : { error: body?.message ?? 'Sync failed' };
    } catch (e) {
      lastResult = { error: String(e) };
    } finally {
      syncing = false;
      if (lastResult && !lastResult.error && typeof window !== 'undefined') {
        setTimeout(() => window.location.reload(), 1200);
      }
    }
  }
</script>

<section class="card">
  <header class="header">
    <h3 class="title">
      <Music size={16} />
      Following
    </h3>
    <button class="sync-btn" type="button" on:click={syncNow} disabled={syncing}>
      <RefreshCw size={14} class={syncing ? 'spin' : ''} />
      {syncing ? 'Syncing…' : 'Sync now'}
    </button>
  </header>

  {#if lastResult}
    <div class="banner" class:err={!!lastResult.error}>
      {#if lastResult.error}
        {lastResult.error}
      {:else if lastResult.skipped === 'no-source'}
        No Last.fm username set on profile. Nothing to sync.
      {:else}
        {lastResult.new_plays} new plays, +{lastResult.xp_awarded} XP.
      {/if}
    </div>
  {/if}

  {#if followedArtists.length === 0}
    <p class="empty">You're not following any artists yet. Tap "Follow" on an artist page to start earning Streaming XP from your listens.</p>
  {:else}
    <ul class="chips">
      {#each followedArtists as artist}
        <li class="chip">
          {#if artist.image_url}
            <img src={artist.image_url} alt="" class="chip-img" />
          {:else}
            <span class="chip-initial">{artist.display_name[0]?.toUpperCase() ?? '?'}</span>
          {/if}
          <span class="chip-name">{artist.display_name}</span>
          <button class="chip-x" type="button" on:click={() => unfollow(artist.id)} aria-label="Unfollow {artist.display_name}">
            <X size={14} />
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    margin: 0 16px 16px;
    padding: 16px;
  }
  .header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
  }
  .title {
    display: flex; align-items: center; gap: 6px;
    font-size: 14px; font-weight: 600; margin: 0;
  }
  .sync-btn {
    display: inline-flex; align-items: center; gap: 6px;
    min-height: 32px;
    padding: 6px 12px;
    background: var(--bg-input);
    border: none; border-radius: 16px;
    font-size: 12px; font-weight: 500;
    color: var(--text-primary);
    cursor: pointer;
  }
  .sync-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  :global(.sync-btn .spin) { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .banner {
    margin: 0 0 12px;
    padding: 10px 12px;
    background: #E8F8EF; color: #1A6A36; border: 1px solid #B7E8C6;
    border-radius: 10px;
    font-size: 12px;
  }
  .banner.err { background: #FEE; color: #8A1A1A; border-color: #FCC; }

  .empty { font-size: 13px; color: var(--text-secondary); margin: 0; line-height: 1.5; }

  .chips { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--bg-input);
    border-radius: 20px;
    padding: 4px 6px 4px 4px;
    font-size: 13px;
  }
  .chip-img {
    width: 28px; height: 28px; border-radius: 50%;
    object-fit: cover;
  }
  .chip-initial {
    width: 28px; height: 28px; border-radius: 50%;
    background: #FF5C00; color: #fff;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600;
  }
  .chip-name { padding-right: 4px; font-weight: 500; }
  .chip-x {
    display: inline-flex; align-items: center; justify-content: center;
    width: 24px; height: 24px;
    background: transparent; border: none; border-radius: 50%;
    color: var(--text-secondary);
    cursor: pointer;
  }
  .chip-x:hover { background: rgba(0,0,0,0.05); color: var(--text-primary); }
</style>
