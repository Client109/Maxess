<script>
  import { ArrowLeft, HelpCircle, Mail } from 'lucide-svelte';
</script>

<svelte:head><title>Help & Support - Maxess</title></svelte:head>

<div class="page">
  <header class="page-header">
    <a href="/profile" class="back-btn" aria-label="Back to profile"><ArrowLeft size={20} /></a>
    <h1 class="page-title">Help & Support</h1>
    <div class="header-spacer"></div>
  </header>

  <section class="card">
    <a class="row" href="mailto:support@maxess.app">
      <div class="row-icon"><Mail size={18} color="#FF5C00" /></div>
      <div class="row-main">
        <div class="row-title">Email support</div>
        <div class="row-sub">support@maxess.app</div>
      </div>
    </a>
    <div class="row row--last">
      <div class="row-icon"><HelpCircle size={18} color="#FF5C00" /></div>
      <div class="row-main">
        <div class="row-title">FAQ</div>
        <div class="row-sub">Coming soon</div>
      </div>
    </div>
  </section>
</div>

<style>
  .page { background: #000; min-height: 100vh; color: #FFF; padding: 0 16px 120px; }
  .page-header { display: flex; align-items: center; gap: 12px; padding: 20px 0 16px; }
  .back-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: #1F1F21; color: #FFFFFF;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .page-title { font-size: 22px; font-weight: 700; margin: 0; flex: 1; text-align: center; }
  .header-spacer { width: 36px; }

  .card { background: #0E0E10; border: 1px solid #1F1F21; border-radius: 16px; overflow: hidden; }
  .row {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 16px;
    border-bottom: 1px solid #1F1F21;
    color: inherit; text-decoration: none;
  }
  .row--last { border-bottom: none; }
  .row-icon {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255, 92, 0, 0.12);
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .row-main { flex: 1; }
  .row-title { font-size: 15px; font-weight: 600; color: #FFFFFF; }
  .row-sub { font-size: 12px; color: #8E8E93; margin-top: 2px; }
</style>
