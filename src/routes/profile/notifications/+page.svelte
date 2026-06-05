<script>
  import { ArrowLeft, Bell, Check, Star, Calendar, Diamond } from 'lucide-svelte';
  import { notifications, markRead, markAllRead, unreadCount } from '$lib/stores/notifications.js';

  // Lucide component per notification type. Falls back to Bell for unknown types.
  const iconFor = { tier: Diamond, event: Calendar, system: Star, default: Bell };

  /** @param {string} id */
  function open(id) {
    markRead(id);
  }
</script>

<svelte:head><title>Notifications - Maxess</title></svelte:head>

<div class="page">
  <header class="page-header">
    <a href="/profile" class="back-btn" aria-label="Back to profile"><ArrowLeft size={20} /></a>
    <h1 class="page-title">Notifications</h1>
    {#if $unreadCount > 0}
      <button type="button" class="mark-all" on:click={markAllRead}>Mark all read</button>
    {:else}
      <div class="header-spacer"></div>
    {/if}
  </header>

  {#if $notifications.length === 0}
    <section class="empty-card">
      <div class="icon-wrap"><Bell size={28} color="#FF5C00" /></div>
      <h2>No notifications yet</h2>
      <p>Tier changes, event reminders, and presale drops will show up here.</p>
    </section>
  {:else}
    <section class="card list-card">
      {#each $notifications as n, i (n.id)}
        {@const Icon = iconFor[n.type] ?? iconFor.default}
        <a
          href={n.action_url ?? '/profile'}
          class="row"
          class:row--unread={!n.read}
          class:row--last={i === $notifications.length - 1}
          on:click={() => open(n.id)}
        >
          <div class="row-icon">
            <Icon size={18} color="#FF5C00" />
          </div>
          <div class="row-body">
            <div class="row-title-line">
              <span class="row-title">{n.title}</span>
              {#if !n.read}<span class="unread-dot" aria-label="Unread"></span>{/if}
            </div>
            <p class="row-text">{n.body}</p>
            <span class="row-meta">{n.time}</span>
          </div>
        </a>
      {/each}
    </section>
  {/if}
</div>

<style>
  .page {
    background: var(--bg-primary);
    min-height: 100vh;
    color: var(--text-primary);
    padding: 0 16px 120px;
  }

  .page-header {
    display: flex; align-items: center; gap: 12px;
    padding: 20px 0 16px;
  }
  .back-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--bg-pill, #1F1F21); color: var(--text-primary);
    display: inline-flex; align-items: center; justify-content: center;
    text-decoration: none;
  }
  .page-title {
    font-size: 22px; font-weight: 700; margin: 0;
    flex: 1; text-align: center;
  }
  .header-spacer { width: 36px; }
  .mark-all {
    background: transparent; border: none;
    color: var(--action-orange, #FF5C00);
    font-size: 13px; font-weight: 600;
    font-family: inherit; cursor: pointer;
    min-width: 84px; text-align: right;
  }

  .card {
    background: var(--bg-card, #0E0E10);
    border: 1px solid var(--border-card, #1F1F21);
    border-radius: 16px;
    overflow: hidden;
  }

  .row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-subtle, #1F1F21);
    color: inherit; text-decoration: none;
  }
  .row--last { border-bottom: none; }
  .row--unread { background: rgba(255, 92, 0, 0.04); }

  .row-icon {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255, 92, 0, 0.12);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .row-body { flex: 1; min-width: 0; }
  .row-title-line {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 2px;
  }
  .row-title {
    font-size: 15px; font-weight: 600;
    color: var(--text-primary);
  }
  .unread-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--action-orange, #FF5C00);
    flex-shrink: 0;
  }
  .row-text {
    font-size: 13px;
    color: var(--text-secondary, #8E8E93);
    line-height: 1.4;
    margin: 0 0 4px;
  }
  .row-meta {
    font-size: 11px;
    color: var(--text-tertiary, #6E6E73);
  }

  .empty-card {
    background: var(--bg-card, #0E0E10);
    border: 1px solid var(--border-card, #1F1F21);
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
  }
  .icon-wrap {
    width: 56px; height: 56px; border-radius: 50%;
    background: rgba(255, 92, 0, 0.12);
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  h2 { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
  p { color: var(--text-tertiary, #8E8E93); font-size: 14px; margin: 0; line-height: 1.45; }
</style>
