<script>
  import { fly, fade } from 'svelte/transition';
  import { toasts } from '$lib/stores/toasts.js';
</script>

<div class="toast-host" aria-live="polite" aria-atomic="true">
  {#each $toasts as t (t.id)}
    <div class="toast" in:fly={{ y: 24, duration: 220 }} out:fade={{ duration: 180 }}>
      {t.message}
    </div>
  {/each}
</div>

<style>
  .toast-host {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 300;
    pointer-events: none;
    padding: 0 16px;
  }

  .toast {
    pointer-events: auto;
    background: rgba(28, 28, 30, 0.95);
    color: #FFFFFF;
    padding: 12px 16px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 500;
    max-width: 360px;
    width: 100%;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  }
</style>
