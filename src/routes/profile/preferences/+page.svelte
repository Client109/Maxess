<script>
  import { ArrowLeft, Sun, Moon } from 'lucide-svelte';
  import { showPointsGraph, activeCategory, theme } from '$lib/stores/settings.js';
  import { locationMode, requestLocation, isGeolocationAvailable, acceptLocationPrompt, locationPromptStatus } from '$lib/stores/location.js';

  /** @type {{ value: 'off' | 'once' | 'while_using'; label: string }[]} */
  const LOC_OPTIONS = [
    { value: 'off',          label: 'Off' },
    { value: 'once',         label: 'Once' },
    { value: 'while_using',  label: 'While Using' },
  ];

  /** @param {'off' | 'once' | 'while_using'} next */
  async function selectLocationMode(next) {
    const prev = $locationMode;
    locationMode.set(next);
    if (prev === 'off' && next !== 'off') {
      acceptLocationPrompt();
      await requestLocation();
    }
  }
</script>

<svelte:head><title>Preferences - Maxess</title></svelte:head>

<div class="page">
  <header class="page-header">
    <a href="/profile" class="back-btn" aria-label="Back to profile">
      <ArrowLeft size={20} />
    </a>
    <h1 class="page-title">Preferences</h1>
    <div class="header-spacer"></div>
  </header>

  <!-- Music / Sports preference -->
  <section class="section">
    <h2 class="section-heading">Default category</h2>
    <div class="card toggle-card">
      <div class="seg-pill" role="tablist" aria-label="Default category">
        <button
          type="button" role="tab" class="seg-btn"
          class:seg-btn--active={$activeCategory === 'music'}
          aria-selected={$activeCategory === 'music'}
          on:click={() => activeCategory.set('music')}
        >Music</button>
        <button
          type="button" role="tab" class="seg-btn"
          class:seg-btn--active={$activeCategory === 'sports'}
          aria-selected={$activeCategory === 'sports'}
          on:click={() => activeCategory.set('sports')}
        >Sports</button>
      </div>
    </div>
  </section>

  <!-- Location sharing -->
  <section class="section">
    <h2 class="section-heading">Location sharing</h2>
    <p class="section-desc">Off — never asks. Once — uses your location now, then forgets. While Using — refreshes when you open Near You.</p>
    <div class="card toggle-card">
      {#if isGeolocationAvailable()}
        <div class="seg-pill" role="group" aria-label="Location sharing mode">
          {#each LOC_OPTIONS as opt}
            <button
              type="button" class="seg-btn"
              class:seg-btn--active={$locationMode === opt.value}
              aria-pressed={$locationMode === opt.value}
              on:click={() => selectLocationMode(opt.value)}
            >{opt.label}</button>
          {/each}
        </div>
      {:else}
        <p class="unsupported">Not supported on this device</p>
      {/if}
    </div>
  </section>

  <!-- Display -->
  <section class="section">
    <h2 class="section-heading">Display</h2>
    <div class="card setting-card">
      <div class="setting-row">
        <div class="setting-text">
          <span class="setting-label">Theme</span>
          <span class="setting-desc">Light or dark surfaces across the app.</span>
        </div>
        <div class="theme-toggle" role="group" aria-label="Theme">
          <button
            type="button"
            class="theme-btn"
            class:theme-btn--active={$theme === 'light'}
            aria-pressed={$theme === 'light'}
            aria-label="Light theme"
            on:click={() => theme.set('light')}
          ><Sun size={16} /></button>
          <button
            type="button"
            class="theme-btn"
            class:theme-btn--active={$theme === 'dark'}
            aria-pressed={$theme === 'dark'}
            aria-label="Dark theme"
            on:click={() => theme.set('dark')}
          ><Moon size={16} /></button>
        </div>
      </div>
      <div class="setting-divider"></div>
      <div class="setting-row">
        <div class="setting-text">
          <span class="setting-label">Show points graph</span>
          <span class="setting-desc">Display a 14-day points trend on the Score page.</span>
        </div>
        <button
          class="switch" class:switch--on={$showPointsGraph}
          role="switch" aria-checked={$showPointsGraph}
          aria-label="Show points graph"
          on:click={() => showPointsGraph.update(v => !v)}
        ><span class="switch-thumb"></span></button>
      </div>
    </div>
  </section>
</div>

<style>
  .page {
    background: var(--bg-primary);
    min-height: 100vh;
    color: var(--text-primary);
    padding: 0 16px 120px;
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 0 16px;
  }

  .back-btn {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--bg-pill);
    color: var(--text-primary);
    display: inline-flex; align-items: center; justify-content: center;
  }

  .page-title {
    font-size: 22px; font-weight: 700; margin: 0;
    flex: 1; text-align: center;
  }

  .header-spacer { width: 36px; }

  .section { margin-bottom: 22px; }

  .section-heading {
    font-size: 15px; font-weight: 600; color: var(--text-primary);
    margin: 0 0 8px;
  }

  .section-desc {
    font-size: 12px; color: var(--text-tertiary);
    margin: 0 0 10px;
    line-height: 1.4;
  }

  .card {
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: 16px;
    padding: 14px;
  }

  .seg-pill {
    display: flex; gap: 0;
    background: var(--bg-pill);
    border-radius: 10px;
    padding: 3px;
  }

  .seg-btn {
    flex: 1; min-height: 44px;
    border: none; background: transparent;
    color: var(--text-primary);
    font-family: inherit; font-size: 13px; font-weight: 600;
    border-radius: 8px; cursor: pointer;
  }

  .seg-btn--active {
    background: #FF5C00;
    color: var(--text-primary);
  }

  .unsupported {
    margin: 0; padding: 12px; text-align: center;
    color: var(--text-tertiary); font-size: 13px;
  }

  .setting-row {
    display: flex; align-items: center; gap: 12px;
  }

  .setting-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
  .setting-label { font-size: 15px; font-weight: 600; color: var(--text-primary); }
  .setting-desc { font-size: 12px; color: var(--text-tertiary); }

  .switch {
    width: 44px; height: 26px; border-radius: 99px;
    border: none; background: var(--bg-pill);
    position: relative; cursor: pointer; padding: 0;
    transition: background 0.2s; flex-shrink: 0;
  }
  .switch--on { background: #FF5C00; }
  .switch-thumb {
    position: absolute; top: 2px; left: 2px;
    width: 22px; height: 22px;
    border-radius: 50%; background: #FFFFFF;
    /* Switch thumb stays white in both themes — high contrast on the orange/gray track. */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s;
  }
  .switch--on .switch-thumb { transform: translateX(18px); }

  /* Theme toggle (sun / moon) */
  .theme-toggle {
    display: inline-flex;
    background: var(--bg-pill);
    border-radius: 99px;
    padding: 3px;
    gap: 0;
    flex-shrink: 0;
  }
  .theme-btn {
    width: 36px;
    height: 32px;
    border: none;
    background: transparent;
    color: var(--text-tertiary);
    border-radius: 99px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .theme-btn--active {
    background: #FF5C00;
    color: var(--text-primary);
  }

  .setting-divider {
    height: 1px;
    background: var(--border-subtle);
    margin: 12px 0;
  }
</style>
