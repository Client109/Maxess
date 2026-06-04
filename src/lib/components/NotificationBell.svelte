<script>
  import { Bell } from 'lucide-svelte';
  import { unreadCount, notifPanelOpen } from '$lib/stores/notifications.js';
</script>

<button class="notification-btn" aria-label="Notifications" on:click={() => $notifPanelOpen = true}>
  <Bell size={22} />
  {#if $unreadCount > 0}
    <span class="notif-badge">{$unreadCount}</span>
  {/if}
</button>

<style>
  .notification-btn {
    position: relative;
    color: var(--text-primary);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
  }

  .notif-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 18px;
    height: 18px;
    background: #EF4444;
    color: white;
    font-size: 10px;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--bg-primary);
  }
</style>
