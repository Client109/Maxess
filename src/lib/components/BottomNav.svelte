<script>
  import { page } from '$app/stores';
  import { Home, Search, Trophy, User } from 'lucide-svelte';

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'events', label: 'Events', icon: Search, href: '/events' },
    { id: 'rank-rewards', label: 'Rewards', icon: Trophy, href: '/rank-rewards' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' }
  ];

  $: activeTab = (() => {
    const path = $page.url.pathname;
    if (path === '/') return 'home';
    return path.slice(1);
  })();
</script>

<nav class="bottom-nav">
  <div class="nav-content">
    <!-- Left two tabs -->
    <a
      href={tabs[0].href}
      class="nav-tab"
      class:active={activeTab === tabs[0].id}
      data-sveltekit-preload-data="hover"
    >
      <div class="nav-icon">
        <svelte:component this={tabs[0].icon} size={24} />
      </div>
      <span class="nav-label">{tabs[0].label}</span>
    </a>

    <a
      href={tabs[1].href}
      class="nav-tab"
      class:active={activeTab === tabs[1].id}
      data-sveltekit-preload-data="hover"
    >
      <div class="nav-icon">
        <svelte:component this={tabs[1].icon} size={24} />
      </div>
      <span class="nav-label">{tabs[1].label}</span>
    </a>

    <!-- Right two tabs -->
    <a
      href={tabs[2].href}
      class="nav-tab"
      class:active={activeTab === tabs[2].id}
      data-sveltekit-preload-data="hover"
    >
      <div class="nav-icon">
        <svelte:component this={tabs[2].icon} size={24} />
      </div>
      <span class="nav-label">{tabs[2].label}</span>
    </a>

    <a
      href={tabs[3].href}
      class="nav-tab"
      class:active={activeTab === tabs[3].id}
      data-sveltekit-preload-data="hover"
    >
      <div class="nav-icon">
        <svelte:component this={tabs[3].icon} size={24} />
      </div>
      <span class="nav-label">{tabs[3].label}</span>
    </a>
  </div>

  <!-- Home Indicator (iOS style) -->
  <div class="home-indicator"></div>
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
    height: 70px;
    padding: 0 12px;
    position: relative;
  }

  .nav-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    text-decoration: none;
    color: #8E8E93;
    min-height: 49px;
    min-width: 44px;
    justify-content: center;
    transition: color 0.2s ease;
    flex: 1;
  }

  .nav-tab.active {
    color: #FF5C00;
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1px;
  }

  .nav-label {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
  }

  .nav-tab:hover {
    color: #FF5C00;
  }

  /* iOS Home Indicator */
  .home-indicator {
    width: 134px;
    height: 5px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 2.5px;
    margin: 6px auto 0;
  }

  /* Responsive adjustments */
  @media (max-width: 375px) {
    .nav-content {
      height: 65px;
      padding: 0 8px;
    }

    .nav-tab {
      min-width: 40px;
    }

    .nav-label {
      font-size: 9px;
    }

  }
</style>
