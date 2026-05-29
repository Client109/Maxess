<script>
  import '$lib/styles/tokens.css';
  import '$lib/styles/app.css';
  import BottomNav from '$lib/components/BottomNav.svelte';
</script>

<div class="app-container">
  <main class="main-content">
    <slot />
  </main>
  <BottomNav />
</div>

<style>
  .app-container {
    min-height: 100vh;
    background: #F2F2F7;
    position: relative;
  }

  .main-content {
    min-height: 100vh;
    padding-bottom: 120px; /* Space for bottom nav + home indicator + safe area */
  }

  /* Global iOS-style overrides */
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    background: #F2F2F7;
    color: #000000;
    line-height: 1.47;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  :global(*) {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  :global(button) {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  :global(input) {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    outline: none;
    font-family: inherit;
  }

  :global(a) {
    color: #FF5C00;
    text-decoration: none;
  }

  :global(a:hover) {
    text-decoration: none;
    opacity: 0.7;
  }
</style>