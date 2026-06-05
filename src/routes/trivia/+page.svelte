<script>
  import { ArrowLeft, MessageCircleQuestion } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Live Trivia - Maxess</title>
</svelte:head>

<div class="page">
  <header class="header">
    <a href="/events" class="back" aria-label="Back to Events">
      <ArrowLeft size={20} />
    </a>
    <h1 class="title">Live Trivia</h1>
    <div class="spacer"></div>
  </header>

  <div class="hero">
    <span class="icon"><MessageCircleQuestion size={36} color="#FF5C00" /></span>
    <h2 class="hero-title">Live Trivia Night</h2>
    <p class="hero-body">
      Earn <span class="orange">+50 points</span> per correct answer. Trivia rounds
      run live during select Maxxes events and feed into the same universal point
      engine as listens, check-ins, and streaks.
    </p>
    <p class="hero-note">Coming soon.</p>
  </div>
</div>

<style>
  .page {
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: 8px 20px 96px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0 12px;
  }
  .back {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border-strong);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
    text-decoration: none;
  }
  .title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
  .spacer { width: 36px; }
  .hero {
    margin-top: 48px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .icon {
    width: 80px;
    height: 80px;
    border: 1px solid rgba(255, 92, 0, 0.5);
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .hero-title {
    margin: 0;
    font-size: 26px;
    font-weight: 700;
  }
  .hero-body {
    margin: 0;
    max-width: 320px;
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.5;
  }
  .hero-note {
    margin: 12px 0 0;
    color: var(--text-tertiary);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
  }
  .orange { color: #FF5C00; font-weight: 700; }
</style>
