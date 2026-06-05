<script>
  import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head><title>Edit Profile - Maxess</title></svelte:head>

<div class="page">
  <header class="page-header">
    <a href="/profile" class="back-btn" aria-label="Back to profile"><ArrowLeft size={20} /></a>
    <h1 class="page-title">Edit Profile</h1>
    <div class="header-spacer"></div>
  </header>

  <section class="empty-card">
    <h2>Profile editing coming soon</h2>
    <p>Name, handle, and avatar updates are part of the next release.</p>
    <a class="cta" href="/profile">Back to profile</a>
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
  h2 { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
  p { color: var(--text-tertiary); font-size: 14px; margin: 0 0 16px; line-height: 1.45; }
  .cta { color: #FF5C00; font-weight: 600; text-decoration: none; }
</style>
