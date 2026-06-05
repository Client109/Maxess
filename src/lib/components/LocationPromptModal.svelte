<script>
  import { onMount } from 'svelte';
  import { MapPin, X } from 'lucide-svelte';
  import {
    locationPromptStatus,
    locationMode,
    requestLocation,
    isGeolocationAvailable,
    acceptLocationPrompt,
    declineLocationPrompt,
  } from '$lib/stores/location.js';

  let mounted = false;
  // SSR returns the modal closed; we only let it open after mount so the SSR
  // markup doesn't briefly flash a modal that the client then hides.
  onMount(() => { mounted = true; });

  // Skip on devices without geolocation entirely — no point asking.
  $: open = mounted && $locationPromptStatus === 'pending' && isGeolocationAvailable();

  let requesting = false;

  async function share() {
    if (requesting) return;
    requesting = true;
    try {
      // Default to one-shot capture so we don't keep prompting; user can
      // upgrade to "While Using" later in Profile → Settings.
      locationMode.set('once');
      const loc = await requestLocation();
      if (loc) {
        acceptLocationPrompt();
      } else {
        // Permission denied or timed out — treat as decline so we stop asking.
        declineLocationPrompt();
      }
    } finally {
      requesting = false;
    }
  }

  function notNow() {
    declineLocationPrompt();
  }

  function onBackdropClick(event) {
    if (event.target === event.currentTarget) notNow();
  }

  function onKeydown(event) {
    if (event.key === 'Escape' && open) notNow();
  }
</script>

<svelte:window on:keydown={onKeydown} />

{#if open}
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="loc-modal-title"
    aria-describedby="loc-modal-body"
    on:click={onBackdropClick}
  >
    <div class="modal-card">
      <button type="button" class="modal-close" aria-label="Close" on:click={notNow}>
        <X size={18} />
      </button>

      <div class="modal-icon">
        <MapPin size={28} color="#FFFFFF" />
      </div>

      <h2 id="loc-modal-title" class="modal-title">See events near you</h2>

      <p id="loc-modal-body" class="modal-body">
        Maxess can use your location to surface concerts, games, and meetups happening close by.
        Your coordinates stay on your device — we never store them on our servers.
      </p>

      <ul class="modal-bullets">
        <li><strong>It's your call.</strong> Decline and "near me" sections stay hidden — the rest of the app works normally.</li>
        <li><strong>Change your mind anytime.</strong> Profile → Settings → Location sharing lets you turn it on or off later.</li>
      </ul>

      <div class="modal-actions">
        <button
          type="button"
          class="modal-btn modal-btn--secondary"
          on:click={notNow}
          disabled={requesting}
        >Not now</button>
        <button
          type="button"
          class="modal-btn modal-btn--primary"
          on:click={share}
          disabled={requesting}
        >
          {requesting ? 'Asking…' : 'Share location'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    animation: backdrop-fade 0.18s ease-out;
  }

  @keyframes backdrop-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .modal-card {
    position: relative;
    width: 100%;
    max-width: 360px;
    background: var(--bg-card, #FFFFFF);
    border-radius: 20px;
    padding: 28px 24px 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    animation: card-rise 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes card-rise {
    from { opacity: 0; transform: translateY(12px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--bg-input, #F2F2F7);
    color: #8E8E93;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .modal-close:hover { background: #E5E5EA; color: #1C1C1E; }

  .modal-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--action-orange, #FF5C00) 0%, #C13800 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .modal-title {
    font-size: 22px;
    font-weight: 700;
    color: #1C1C1E;
    margin: 0 0 8px;
    letter-spacing: -0.3px;
  }

  .modal-body {
    font-size: 14px;
    line-height: 1.45;
    color: #3C3C43;
    margin: 0 0 16px;
  }

  .modal-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .modal-bullets li {
    font-size: 13px;
    line-height: 1.4;
    color: #3C3C43;
    padding-left: 18px;
    position: relative;
  }

  .modal-bullets li::before {
    content: '•';
    position: absolute;
    left: 4px;
    color: var(--action-orange, #FF5C00);
    font-weight: 700;
  }

  .modal-bullets strong { color: #1C1C1E; font-weight: 600; }

  .modal-actions {
    display: flex;
    gap: 8px;
  }

  .modal-btn {
    flex: 1;
    min-height: 44px;
    padding: 12px 16px;
    border-radius: 12px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, opacity 0.15s;
  }

  .modal-btn:disabled { opacity: 0.6; cursor: progress; }

  .modal-btn--secondary {
    background: var(--bg-input, #F2F2F7);
    color: #1C1C1E;
  }
  .modal-btn--secondary:hover:not(:disabled) { background: #E5E5EA; }

  .modal-btn--primary {
    background: var(--action-orange, #FF5C00);
    color: #FFFFFF;
  }
  .modal-btn--primary:hover:not(:disabled) { background: #E54F00; }
</style>
