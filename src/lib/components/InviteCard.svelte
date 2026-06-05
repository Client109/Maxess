<script>
  // MOCKED. The full email/popover/API flow is hidden behind this stub:
  // clicking "Invite" just copies a placeholder referral link to the clipboard
  // and shows a green confirmation toast. The real wiring (POST /api/invites,
  // pending list, revoke, accepted summary) lives in InviteCard.full.svelte
  // history and the /api/invites endpoints — see TODO.md for the re-enable path.
  import { UserPlus } from 'lucide-svelte';
  import { showToast } from '$lib/stores/toasts.js';

  // Generate a short throwaway code so the copied link looks real even though
  // no Invitation row is created.
  function makeMockCode() {
    return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
  }

  async function handleInvite() {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = `${origin}/invite/${makeMockCode()}`;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(link);
      }
    } catch {
      // Clipboard can fail (permissions, insecure context); the toast still fires
      // so the user gets feedback either way.
    }
    showToast('Invite link copied to clipboard', { kind: 'success' });
  }
</script>

<section class="invite-section">
  <div class="invite-head">
    <div class="invite-head-text">
      <h2 class="invite-title">Invite friends</h2>
      <p class="invite-subtitle">Earn 250 XP for every friend who joins.</p>
    </div>
    <button type="button" class="invite-trigger" on:click={handleInvite}>
      <UserPlus size={16} />
      Invite
    </button>
  </div>
</section>

<style>
  .invite-section {
    margin: 0 16px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 16px;
    padding: 16px;
  }

  .invite-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .invite-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .invite-subtitle {
    margin: 2px 0 0;
    color: var(--text-secondary);
    font-size: 13px;
  }

  .invite-trigger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #FF5C00;
    color: #FFFFFF;
    border: none;
    border-radius: 999px;
    padding: 8px 14px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s ease, transform 0.1s ease;
  }
  .invite-trigger:hover { opacity: 0.92; }
  .invite-trigger:active { transform: scale(0.99); }
</style>
