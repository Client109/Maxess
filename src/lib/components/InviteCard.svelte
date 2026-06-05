<script>
  import { onMount } from 'svelte';
  import { UserPlus, Send, Copy, X, Check, Mail, Clock } from 'lucide-svelte';
  import { showToast } from '$lib/stores/toasts.js';

  let open = false;
  let email = '';
  let submitting = false;
  let errorMsg = '';
  let invitations = [];
  let loading = true;

  async function refresh() {
    try {
      const res = await fetch('/api/invites');
      if (res.ok) {
        const body = await res.json();
        invitations = body.invitations ?? [];
      }
    } catch {
      // ignore — list just stays empty
    } finally {
      loading = false;
    }
  }

  onMount(() => { refresh(); });

  function togglePopover() {
    open = !open;
    if (open) errorMsg = '';
  }

  async function submit() {
    if (submitting) return;
    const value = email.trim();
    if (!value) { errorMsg = 'Enter an email address.'; return; }
    submitting = true;
    errorMsg = '';
    try {
      const res = await fetch('/api/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) {
        const text = await res.text();
        if (res.status === 409 && /duplicate/.test(text)) errorMsg = 'You already invited that address.';
        else if (/self_invite/.test(text)) errorMsg = 'You can’t invite yourself.';
        else if (/invalid_email/.test(text)) errorMsg = 'That doesn’t look like a valid email.';
        else errorMsg = 'Could not send invite. Please try again.';
        return;
      }
      const body = await res.json();
      if (body.email_sent) {
        showToast(`Invite sent to ${body.invitee_email}`);
      } else if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(body.share_url);
          showToast(`Invite link copied — share it with ${body.invitee_email}`);
        } catch {
          showToast(`Invite created — share this link: ${body.share_url}`, 6000);
        }
      } else {
        showToast(`Invite created — share this link: ${body.share_url}`, 6000);
      }
      email = '';
      open = false;
      await refresh();
    } catch {
      errorMsg = 'Network error — please try again.';
    } finally {
      submitting = false;
    }
  }

  async function copyLink(code) {
    const url = `${window.location.origin}/invite/${code}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Invite link copied');
    } catch {
      showToast(url, 6000);
    }
  }

  async function revoke(code) {
    if (!confirm('Revoke this invite?')) return;
    const res = await fetch(`/api/invites/${code}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Invite revoked');
      await refresh();
    } else {
      showToast('Could not revoke invite');
    }
  }

  $: pending = invitations.filter(i => i.status === 'SENT');
  $: accepted = invitations.filter(i => i.status === 'ACCEPTED');
  $: totalEarned = accepted.reduce((sum, i) => sum + (i.xp_awarded ?? 0), 0);
</script>

<section class="invite-section">
  <div class="invite-head">
    <div class="invite-head-text">
      <h2 class="invite-title">Invite friends</h2>
      <p class="invite-subtitle">Earn 250 XP for every friend who joins.</p>
    </div>
    <button
      type="button"
      class="invite-trigger"
      class:open
      aria-expanded={open}
      on:click={togglePopover}
    >
      <UserPlus size={16} />
      Invite
    </button>
  </div>

  {#if open}
    <div class="invite-popover" role="dialog" aria-label="Send an invite">
      <form on:submit|preventDefault={submit}>
        <label class="popover-label" for="invite-email-input">Friend's email</label>
        <div class="popover-row">
          <span class="popover-icon"><Mail size={14} color="#8E8E93" /></span>
          <input
            id="invite-email-input"
            class="popover-input"
            type="email"
            placeholder="friend@example.com"
            bind:value={email}
            required
            maxlength="254"
            autocomplete="email"
          />
        </div>
        {#if errorMsg}<p class="popover-error">{errorMsg}</p>{/if}
        <div class="popover-actions">
          <button type="button" class="popover-cancel" on:click={() => open = false}>Cancel</button>
          <button type="submit" class="popover-send" disabled={submitting || !email.trim()}>
            <Send size={14} />
            {submitting ? 'Sending…' : 'Send invite'}
          </button>
        </div>
      </form>
    </div>
  {/if}

  {#if !loading && (pending.length > 0 || accepted.length > 0)}
    <div class="invite-list">
      {#if accepted.length > 0}
        <div class="invite-summary">
          <Check size={14} color="#047857" />
          <span><strong>{accepted.length}</strong> joined · <strong>{totalEarned.toLocaleString()}</strong> XP earned</span>
        </div>
      {/if}
      {#each pending as inv (inv.code)}
        <div class="invite-row">
          <Clock size={14} color="#8E8E93" />
          <span class="invite-email">{inv.invitee_email}</span>
          <button type="button" class="row-btn" on:click={() => copyLink(inv.code)} aria-label="Copy link">
            <Copy size={14} />
          </button>
          <button type="button" class="row-btn danger" on:click={() => revoke(inv.code)} aria-label="Revoke invite">
            <X size={14} />
          </button>
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  .invite-section {
    margin: 0 16px 16px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    color: #1C1C1E;
  }

  .invite-subtitle {
    margin: 2px 0 0;
    color: #6E6E73;
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
    transition: opacity 0.15s ease;
  }
  .invite-trigger:hover { opacity: 0.92; }
  .invite-trigger.open { background: #1C1C1E; }

  .invite-popover {
    background: #F8F8FA;
    border: 1px solid #E5E5EA;
    border-radius: 12px;
    padding: 12px;
  }

  .popover-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #6E6E73;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-bottom: 8px;
  }

  .popover-row {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 10px;
    padding: 10px 12px;
  }
  .popover-row:focus-within { border-color: #FF5C00; }

  .popover-icon { display: inline-flex; }

  .popover-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 14px;
    color: #1C1C1E;
    min-width: 0;
  }

  .popover-error {
    margin: 8px 0 0;
    color: #B91C1C;
    font-size: 12px;
  }

  .popover-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
  }

  .popover-cancel {
    background: transparent;
    border: 1px solid #E5E5EA;
    color: #6E6E73;
    padding: 8px 14px;
    border-radius: 10px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .popover-send {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #FF5C00;
    color: #FFFFFF;
    border: none;
    padding: 8px 14px;
    border-radius: 10px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }
  .popover-send:hover:not(:disabled) { opacity: 0.92; }
  .popover-send:disabled { opacity: 0.5; cursor: not-allowed; }

  .invite-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .invite-summary {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #ECFDF5;
    color: #047857;
    border-radius: 10px;
    padding: 8px 10px;
    font-size: 13px;
  }

  .invite-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 4px;
  }

  .invite-email {
    flex: 1;
    font-size: 13px;
    color: #1C1C1E;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .row-btn {
    background: transparent;
    border: 1px solid #E5E5EA;
    border-radius: 8px;
    padding: 6px;
    color: #6E6E73;
    cursor: pointer;
    display: inline-flex;
  }
  .row-btn.danger:hover { color: #B91C1C; border-color: #FECACA; }
  .row-btn:hover { background: #F2F2F7; }
</style>
