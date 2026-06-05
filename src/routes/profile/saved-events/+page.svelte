<script>
  import { ArrowLeft, Calendar } from 'lucide-svelte';
</script>

<svelte:head><title>Saved Events - Maxess</title></svelte:head>

<div class="page">
  <header class="page-header">
    <a href="/profile" class="back-btn" aria-label="Back to profile"><ArrowLeft size={20} /></a>
    <h1 class="page-title">Saved Events</h1>
    <div class="header-spacer"></div>
  </header>

  <section class="empty-card">
    <div class="icon-wrap"><Calendar size={28} color="#FF5C00" /></div>
    <h2>You haven't saved any events yet</h2>
    <p>Tap the bookmark icon on an event to save it here for later.</p>
    <a class="cta" href="/events">Find events →</a>
  </section>
</div>

<style>
  .page { background: var(--bg-primary); min-height: 100vh; color: var(--text-primary); padding: 0 16px 120px; }
  .page-header { display: flex; align-items: center; gap: 12px; padding: 20px 0 16px; }
  .back-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--bg-pill); color: var(--text-primary);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .page-title { font-size: 22px; font-weight: 700; margin: 0; flex: 1; text-align: center; }
  .header-spacer { width: 36px; }

  .empty-card {
    background: var(--bg-card); border: 1px solid var(--border-card); border-radius: 16px;
    padding: 32px 24px; text-align: center;
  }
  .icon-wrap {
    width: 56px; height: 56px; border-radius: 50%;
    background: rgba(255, 92, 0, 0.12);
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  h2 { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
  p { color: var(--text-tertiary); font-size: 14px; margin: 0 0 16px; line-height: 1.45; }
  .cta { color: #FF5C00; font-weight: 600; text-decoration: none; }
</style>
