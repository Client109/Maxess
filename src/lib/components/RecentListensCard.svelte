<script>
  import { Headphones, Heart } from 'lucide-svelte';

  export let recentListens = [];

  function timeAgo(iso) {
    const then = new Date(iso).getTime();
    const diff = Date.now() - then;
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  }
</script>

<section class="card">
  <header class="header">
    <h3 class="title">
      <Headphones size={16} />
      Recent listens
    </h3>
  </header>
  {#if recentListens.length === 0}
    <p class="empty">No listens captured yet. Connect a Last.fm username and follow some artists to start earning Streaming XP.</p>
  {:else}
    <ul class="list">
      {#each recentListens as ev}
        <li class="row">
          <div class="info">
            <span class="track">{ev.track}</span>
            <span class="artist">{ev.artist}</span>
          </div>
          <div class="meta">
            {#if ev.is_followed}
              <span class="followed-pill" title="Followed artist — earns Streaming XP">
                <Heart size={11} /> Followed
              </span>
            {/if}
            <span class="when">{timeAgo(ev.played_at)}</span>
          </div>
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
  .header { margin-bottom: 12px; }
  .title {
    display: flex; align-items: center; gap: 6px;
    font-size: 14px; font-weight: 600; margin: 0;
  }
  .empty { font-size: 13px; color: var(--text-secondary); margin: 0; line-height: 1.5; }

  .list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
  .row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid var(--border-subtle);
  }
  .row:last-child { border-bottom: none; }
  .info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .track { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
  .artist { font-size: 11px; color: var(--text-secondary); }
  .meta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .followed-pill {
    display: inline-flex; align-items: center; gap: 3px;
    background: #FFE6D5; color: #B33E00;
    padding: 2px 6px; border-radius: 6px;
    font-size: 10px; font-weight: 600;
  }
  .when { font-size: 11px; color: var(--text-tertiary); }
</style>
