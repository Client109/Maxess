<script>
  import { page } from '$app/stores';
  import { Home, Compass, Target, Crown, User } from 'lucide-svelte';

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, href: '/', color: '#007AFF' },
    { id: 'events', label: 'Events', icon: Compass, href: '/events', color: '#AF52DE' },
    { id: 'score', label: 'Score', icon: Target, href: '/score', color: '#FF3B30' },
    { id: 'access', label: 'Access', icon: Crown, href: '/access', color: '#FFB800' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile', color: '#34C759' }
  ];

  $: activeTab = (() => {
    const path = $page.url.pathname;
    if (path === '/') return 'home';
    const segment = path.split('/')[1];
    return segment || 'home';
  })();
</script>

<nav class="bottom-nav">
  <div class="nav-content">
    {#each tabs as tab}
      <a
        href={tab.href}
        class="nav-tab"
        class:active={activeTab === tab.id}
        style="--tab-color: {tab.color};"
        data-sveltekit-preload-data="hover"
      >
        <div class="nav-icon">
          <svelte:component this={tab.icon} size={22} strokeWidth={activeTab === tab.id ? 2.4 : 2} />
        </div>
        <span class="nav-label">{tab.label}</span>
      </a>
    {/each}
  </div>
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
    border-top: 1px solid #E5E5EA;
    z-index: 100;
    padding-bottom: env(safe-area-inset-bottom, 20px);
  }

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 60px;
    padding: 0 4px;
    position: relative;
  }

  .nav-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    text-decoration: none;
    color: var(--tab-color);
    min-height: 44px;
    min-width: 44px;
    justify-content: center;
    transition: color 0.2s ease;
    flex: 1;
  }

  /* Labels stay subtle by default so the per-tab brand color reads on the icon
     without overpowering the bottom-nav strip. Active tab still bumps to the
     full brand color + bold weight (see .nav-tab.active .nav-label below). */
  .nav-label {
    color: #8E8E93;
  }

  .nav-tab.active {
    color: var(--tab-color);
  }

  .nav-tab.active .nav-label {
    color: var(--tab-color);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 28px;
    border-radius: 14px;
    margin-bottom: 1px;
    background: transparent;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .nav-tab.active .nav-icon {
    background: color-mix(in srgb, var(--tab-color) 14%, transparent);
    transform: translateY(-1px) scale(1.08);
  }

  .nav-label {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    transition: font-weight 0.2s ease;
  }

  .nav-tab.active .nav-label {
    font-weight: 700;
  }

  .nav-tab:hover {
    color: var(--tab-color);
  }

  @media (max-width: 375px) {
    .nav-content {
      height: 56px;
      padding: 0 2px;
    }

    .nav-tab {
      min-width: 36px;
    }

    .nav-label {
      font-size: 9px;
    }
  }
</style>
