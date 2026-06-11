<script>
  import { Ticket, Zap, CheckCircle2, ScanLine } from 'lucide-svelte';

  export let data;

  /** @type {{ serial: string; ok: boolean; status?: string; xp_awarded?: number; error?: string } | null} */
  let lastResult = null;
  /** @type {string | null} */
  let inFlight = null;

  /** @param {string} serial */
  async function simulateScan(serial) {
    inFlight = serial;
    lastResult = null;
    try {
      const res = await fetch(`/api/passes/scan/${serial}`, { method: 'POST' });
      const body = await res.json();
      lastResult = { serial, ok: res.ok, ...body };
    } catch (e) {
      lastResult = { serial, ok: false, error: String(e) };
    } finally {
      inFlight = null;
      // Refresh server data so already_scanned reflects the new state.
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  }

  /** @param {string | null | undefined} iso */
  function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
</script>

<svelte:head>
  <title>Admin · Scan Passes — Maxess</title>
</svelte:head>

<div class="page">
  <header class="header">
    <h1 class="title">
      <ScanLine size={22} />
      Venue Scan Simulator
    </h1>
    <p class="subtitle">
      Demo tool. Simulate scanning Alex's Apple Wallet ticket at the venue gate.
      Each scan records an <code>AttendanceVerification</code> and awards XP via the existing ledger.
      Repeat scans are idempotent.
    </p>
  </header>

  {#if lastResult}
    <div class="banner" class:ok={lastResult.ok} class:dup={lastResult.status === 'duplicate'}>
      {#if lastResult.status === 'ok'}
        <CheckCircle2 size={18} />
        Scan recorded. +{lastResult.xp_awarded} XP awarded for serial <code>{lastResult.serial}</code>.
      {:else if lastResult.status === 'duplicate'}
        <CheckCircle2 size={18} />
        Already scanned. No additional XP. (serial <code>{lastResult.serial}</code>)
      {:else}
        Scan failed for <code>{lastResult.serial}</code>: {lastResult.error ?? lastResult.status}
      {/if}
    </div>
  {/if}

  {#if data.passes.length === 0}
    <div class="empty">
      <p>No wallet-enabled TICKET passes for Alex. Run <code>npm run db:seed</code> after pushing the schema.</p>
    </div>
  {:else}
    <ul class="pass-list">
      {#each data.passes as item}
        <li class="pass-card">
          <div class="card-head">
            <span class="tier-chip">{item.tier}</span>
            {#if item.already_scanned}
              <span class="scanned-chip">
                <CheckCircle2 size={14} /> Scanned
              </span>
            {/if}
          </div>
          <div class="card-title">
            <Ticket size={18} />
            <span>{item.title}</span>
          </div>
          <div class="card-event">
            <strong>{item.event_title}</strong>
            <span class="meta">{item.event_venue} · {formatDate(item.event_date)}</span>
          </div>
          <div class="card-serial">
            <span class="label">Serial</span>
            <code>{item.serial}</code>
          </div>
          <div class="card-actions">
            <button
              class="scan-btn"
              type="button"
              on:click={() => simulateScan(item.serial)}
              disabled={inFlight === item.serial}
            >
              <Zap size={16} />
              {inFlight === item.serial ? 'Scanning…' : 'Simulate scan'}
            </button>
            <a class="wallet-link" href="/api/passes/{item.pass_id}/wallet" download>
              Download .pkpass
            </a>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .page {
    background: var(--bg-primary);
    min-height: 100vh;
    padding: 20px 16px 120px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    color: var(--text-primary);
  }

  .header { margin-bottom: 16px; }
  .title {
    display: flex; align-items: center; gap: 8px;
    font-size: 22px; font-weight: 700; margin: 0 0 8px;
  }
  .subtitle {
    font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin: 0;
  }
  .subtitle code, .banner code, .empty code, .card-serial code {
    font-family: 'SF Mono', ui-monospace, monospace;
    font-size: 12px;
    background: var(--bg-input);
    padding: 1px 6px; border-radius: 4px;
  }

  .banner {
    display: flex; align-items: center; gap: 8px;
    padding: 12px 14px; border-radius: 12px;
    background: #FEF3E8; color: #8A4A12;
    border: 1px solid #FCD9B5;
    font-size: 13px;
    margin-bottom: 16px;
  }
  .banner.ok { background: #E8F8EF; color: #1A6A36; border-color: #B7E8C6; }
  .banner.dup { background: var(--bg-card-elevated); color: var(--text-secondary); border-color: var(--border-gray); }

  .empty {
    background: var(--bg-card); border: 1px solid var(--border-gray);
    border-radius: 14px; padding: 18px; font-size: 14px; color: var(--text-secondary);
  }

  .pass-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .pass-card {
    background: var(--bg-card);
    border: 1px solid var(--border-gray);
    border-radius: 16px;
    padding: 16px;
  }
  .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .tier-chip {
    font-size: 10px; font-weight: 700; letter-spacing: 0.8px;
    background: #FF5C00; color: #fff;
    padding: 4px 10px; border-radius: 6px;
  }
  .scanned-chip {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600; color: #1A6A36;
    background: #E8F8EF; padding: 4px 8px; border-radius: 8px;
  }
  .card-title {
    display: flex; align-items: center; gap: 8px;
    font-size: 15px; font-weight: 600; margin-bottom: 8px;
  }
  .card-event { display: flex; flex-direction: column; gap: 2px; margin-bottom: 10px; }
  .card-event strong { font-size: 14px; }
  .card-event .meta { font-size: 12px; color: var(--text-secondary); }
  .card-serial { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
  .card-serial .label { font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.6px; }

  .card-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .scan-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px;
    min-height: 44px;
    padding: 10px 16px;
    background: #FF5C00; color: #fff;
    border: none; border-radius: 10px;
    font-size: 14px; font-weight: 600;
    cursor: pointer;
  }
  .scan-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .scan-btn:active { transform: scale(0.98); }

  .wallet-link {
    display: inline-flex; align-items: center; justify-content: center;
    min-height: 44px;
    padding: 10px 14px;
    background: var(--bg-input); color: var(--text-primary);
    border-radius: 10px;
    font-size: 13px; font-weight: 500;
    text-decoration: none;
  }
</style>
