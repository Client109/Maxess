<script>
  import { goto } from '$app/navigation';
  import { Sparkles, Check, AlertTriangle } from 'lucide-svelte';

  export let data;

  let name = '';
  let email = data.invitee_email;
  let city = '';
  let submitting = false;
  let errorMsg = '';
  let success = null;

  async function submit() {
    if (submitting) return;
    submitting = true;
    errorMsg = '';
    try {
      const res = await fetch(`/api/invites/${data.code}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), city: city.trim() || undefined }),
      });
      if (!res.ok) {
        const text = await res.text();
        if (res.status === 409 && /email_in_use/.test(text)) {
          errorMsg = 'That email is already on Maxess. Try logging in instead.';
        } else if (res.status === 410) {
          errorMsg = 'This invite was revoked.';
        } else if (res.status === 409) {
          errorMsg = 'This invite has already been accepted.';
        } else {
          errorMsg = 'Could not complete signup. Please try again.';
        }
        return;
      }
      success = await res.json();
    } catch {
      errorMsg = 'Network error — please try again.';
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head>
  <title>You're invited - Maxess</title>
</svelte:head>

<div class="invite-page">
  <div class="invite-card">
    <span class="invite-badge"><Sparkles size={14} />You're invited</span>
    <h1 class="invite-title">{data.referrer_name} wants you on Maxess</h1>
    <p class="invite-subtitle">A fan ranking, rewards, and community platform for live events.</p>

    {#if data.status === 'ACCEPTED'}
      <div class="invite-state success">
        <Check size={18} />
        <span>This invite has already been accepted.</span>
      </div>
      <button type="button" class="invite-btn" on:click={() => goto('/')}>Go to Maxess</button>
    {:else if data.status === 'REVOKED'}
      <div class="invite-state warn">
        <AlertTriangle size={18} />
        <span>This invite was revoked by the sender.</span>
      </div>
    {:else if success}
      <div class="invite-state success">
        <Check size={18} />
        <span>Welcome to Maxess, {success.new_user.name}!</span>
      </div>
      <p class="invite-fineprint">{data.referrer_name} just earned {success.xp_awarded} XP for the referral.</p>
      <button type="button" class="invite-btn" on:click={() => goto('/')}>Open Maxess</button>
    {:else}
      <form class="invite-form" on:submit|preventDefault={submit}>
        <label class="field">
          <span class="field-label">Your name</span>
          <input
            class="field-input"
            type="text"
            bind:value={name}
            placeholder="e.g. Jordan Smith"
            required
            maxlength="80"
            autocomplete="name"
          />
        </label>
        <label class="field">
          <span class="field-label">Email</span>
          <input
            class="field-input"
            type="email"
            bind:value={email}
            placeholder="you@example.com"
            required
            maxlength="254"
            autocomplete="email"
          />
        </label>
        <label class="field">
          <span class="field-label">City <span class="field-optional">(optional)</span></span>
          <input
            class="field-input"
            type="text"
            bind:value={city}
            placeholder="Los Angeles"
            maxlength="80"
            autocomplete="address-level2"
          />
        </label>

        {#if errorMsg}
          <p class="invite-error">{errorMsg}</p>
        {/if}

        <button type="submit" class="invite-btn" disabled={submitting || !name.trim() || !email.trim()}>
          {submitting ? 'Creating account…' : 'Create my account'}
        </button>
        <p class="invite-fineprint">By continuing you join Alex's network and unlock your fan profile.</p>
      </form>
    {/if}
  </div>
</div>

<style>
  .invite-page {
    min-height: 100vh;
    background: var(--bg-primary);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 32px 16px;
  }

  .invite-card {
    width: 100%;
    max-width: 440px;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 20px;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  }

  .invite-badge {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 92, 0, 0.1);
    color: #FF5C00;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .invite-title {
    margin: 0;
    font-size: 22px;
    line-height: 1.2;
    color: var(--text-primary);
    font-weight: 700;
  }

  .invite-subtitle {
    margin: 0 0 8px;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.5;
  }

  .invite-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .field { display: flex; flex-direction: column; gap: 6px; }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
  .field-optional {
    text-transform: none;
    letter-spacing: 0;
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .field-input {
    background: var(--bg-input);
    border: 1px solid var(--border-card);
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 15px;
    color: var(--text-primary);
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s ease, background 0.15s ease;
  }
  .field-input:focus {
    border-color: #FF5C00;
    background: var(--bg-card);
  }

  .invite-btn {
    background: #FF5C00;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    padding: 14px 18px;
    font-size: 15px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.15s ease, transform 0.1s ease;
  }
  .invite-btn:hover:not(:disabled) { opacity: 0.92; }
  .invite-btn:active:not(:disabled) { transform: scale(0.99); }
  .invite-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .invite-error {
    margin: 0;
    color: #B91C1C;
    background: #FEE2E2;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 13px;
  }

  .invite-state {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 14px;
  }
  .invite-state.success { background: #ECFDF5; color: #047857; }
  .invite-state.warn { background: #FEF3C7; color: #B45309; }

  .invite-fineprint {
    margin: 0;
    font-size: 12px;
    color: var(--text-tertiary);
    text-align: center;
  }
</style>
