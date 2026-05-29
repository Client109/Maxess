<script>
  import { X, ChevronRight } from 'lucide-svelte';
  import { fly, fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  /** @type {import('$lib/domain/types.js').Notification[]} */
  export let notifications = [];
  export let open = false;

  const dispatch = createEventDispatcher();

  $: unreadCount = notifications.filter(n => !n.read).length;

  function close() {
    dispatch('close');
  }

  /** @param {import('$lib/domain/types.js').Notification} notif */
  function markRead(notif) {
    notif.read = true;
    notifications = notifications;
  }

  function markAllRead() {
    notifications = notifications.map(n => ({ ...n, read: true }));
  }
</script>

{#if open}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="backdrop" transition:fade={{ duration: 200 }} on:click={close}></div>

  <!-- Panel -->
  <div class="panel" transition:fly={{ y: -20, duration: 250 }}>
    <div class="panel-header">
      <h2 class="panel-title">Notifications</h2>
      <div class="panel-actions">
        {#if unreadCount > 0}
          <button class="mark-all-btn" on:click={markAllRead}>Mark all read</button>
        {/if}
        <button class="close-btn" on:click={close} aria-label="Close notifications">
          <X size={20} />
        </button>
      </div>
    </div>

    {#if notifications.length === 0}
      <div class="empty-state">
        <span class="empty-icon">🔔</span>
        <p>No notifications yet</p>
      </div>
    {:else}
      <div class="notif-list">
        {#each notifications as notif (notif.id)}
          <a
            href={notif.action_url || '#'}
            class="notif-row"
            class:unread={!notif.read}
            on:click={() => markRead(notif)}
          >
            <span class="notif-icon">{notif.icon}</span>
            <div class="notif-content">
              <span class="notif-title">{notif.title}</span>
              <p class="notif-body">{notif.body}</p>
              <span class="notif-time">{notif.time}</span>
            </div>
            {#if notif.action_url}
              <ChevronRight size={16} color="#C7C7CC" />
            {/if}
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 200;
  }

  .panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    max-height: 85vh;
    background: var(--bg-card);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
    z-index: 201;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 56px 16px 12px;
    border-bottom: 1px solid var(--border-gray);
    flex-shrink: 0;
  }

  .panel-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .panel-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .mark-all-btn {
    font-size: 13px;
    font-weight: 600;
    color: var(--action-orange);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 0;
    font-family: inherit;
  }

  .close-btn {
    color: var(--text-secondary);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--bg-card-elevated);
  }

  .notif-list {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .notif-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-subtle);
    text-decoration: none;
    color: inherit;
    transition: background 0.15s ease;
  }

  .notif-row:last-child {
    border-bottom: none;
  }

  .notif-row:hover {
    background: var(--bg-card-elevated);
  }

  .notif-row.unread {
    background: rgba(38, 103, 255, 0.04);
  }

  .notif-icon {
    font-size: 28px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-card-elevated);
    border-radius: 12px;
    flex-shrink: 0;
  }

  .notif-content {
    flex: 1;
    min-width: 0;
  }

  .notif-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    display: block;
    margin-bottom: 2px;
  }

  .notif-row.unread .notif-title {
    font-weight: 700;
  }

  .notif-body {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0 0 4px;
    line-height: 1.4;
  }

  .notif-time {
    font-size: 11px;
    color: var(--text-tertiary);
  }

  .empty-state {
    padding: 48px 16px;
    text-align: center;
  }

  .empty-icon {
    font-size: 40px;
    display: block;
    margin-bottom: 12px;
  }

  .empty-state p {
    font-size: 15px;
    color: var(--text-secondary);
    margin: 0;
  }
</style>
