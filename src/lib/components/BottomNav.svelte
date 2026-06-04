<script>
  import { page } from '$app/stores';
  import { Home, Compass, Target, Crown, User } from 'lucide-svelte';

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'events', label: 'Events', icon: Compass, href: '/events' },
    { id: 'score', label: 'Score', icon: Target, href: '/score' },
    { id: 'access', label: 'Access', icon: Crown, href: '/access' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' }
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
        data-sveltekit-preload-data="hover"
      >
        <div class="nav-icon">
          <svelte:component this={tab.icon} size={22} />
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
    color: #8E8E93;
    min-height: 44px;
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
