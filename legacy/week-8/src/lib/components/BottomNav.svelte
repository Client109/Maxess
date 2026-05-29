<script>
  import { page } from '$app/stores';
  import { Home, Calendar, Target, Key, User } from 'lucide-svelte';

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'events', label: 'Events', icon: Calendar, href: '/events' },
    { id: 'score', label: 'Score', icon: Target, href: '/score' },
    { id: 'access', label: 'Access', icon: Key, href: '/access' },
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
    {#each tabs as tab}
      <a
        href={tab.href}
        class="nav-tab"
        class:active={activeTab === tab.id}
        data-sveltekit-preload-data="hover"
      >
        <div class="nav-icon">
          <svelte:component this={tab.icon} size={24} />
        </div>
        <span class="nav-label">{tab.label}</span>
      </a>
    {/each}
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
    border-top: 0.5px solid rgba(0, 0, 0, 0.3);
    z-index: 100;
    padding-bottom: env(safe-area-inset-bottom, 20px);
  }

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 83px;
    padding: 0 16px;
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
    background: #000000;
    border-radius: 2.5px;
    margin: 8px auto 0;
    opacity: 0.3;
  }

  /* Responsive adjustments */
  @media (max-width: 375px) {
    .nav-content {
      height: 78px;
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