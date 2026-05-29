<script>
  import { ChevronRight } from 'lucide-svelte';

  // Mock data matching the mockup exactly
  const friends = [
    { id: 1, avatar: '👤', name: 'User1' },
    { id: 2, avatar: '👤', name: 'User2' },  
    { id: 3, avatar: '👤', name: 'User3' }
  ];
</script>

<div class="climb-card">
  <div class="card-content">
    <!-- Overlapping Avatar Stack -->
    <div class="avatars-container">
      {#each friends as friend, index}
        <div 
          class="avatar-circle"
          style="z-index: {friends.length - index}; left: {index * 20}px"
        >
          {friend.avatar}
        </div>
      {/each}
    </div>
    
    <!-- Card Text Content -->
    <div class="card-text">
      <h3 class="card-title">Climb the ranks</h3>
      <p class="card-description">See how you rank among Ducks fans</p>
    </div>
    
    <!-- CTA Button -->
    <a href="/score" class="see-leaderboard-btn">
      See leaderboard <ChevronRight size={16} />
    </a>
  </div>
</div>

<style>
  .climb-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 18px;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .climb-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    border-color: rgba(255, 92, 0, 0.2);
  }

  .card-content {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  /* Avatar Stack */
  .avatars-container {
    position: relative;
    width: 80px; /* Enough space for 3 overlapping avatars */
    height: 40px;
    flex-shrink: 0;
  }

  .avatar-circle {
    position: absolute;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  /* Different colors for each avatar */
  .avatar-circle:nth-child(1) {
    background: #8B4513; /* Brown */
  }

  .avatar-circle:nth-child(2) {
    background: #D2691E; /* Orange brown */
  }

  .avatar-circle:nth-child(3) {
    background: #CD853F; /* Light brown */
  }

  /* Card Text */
  .card-text {
    flex: 1;
    min-width: 0;
  }

  .card-title {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #000000;
    margin: 0 0 4px 0;
    line-height: 1.3;
  }

  .card-description {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: #8E8E93;
    margin: 0;
    line-height: 1.4;
  }

  /* CTA Button */
  .see-leaderboard-btn {
    display: flex;
    align-items: center;
    gap: 2px;
    border: 1.5px solid #FF5C00;
    border-radius: 20px;
    padding: 8px 14px;
    color: #FF5C00;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .see-leaderboard-btn:hover {
    opacity: 0.7;
    text-decoration: none;
  }

  .see-leaderboard-btn:active {
    opacity: 0.5;
  }

  /* Responsive adjustments */
  @media (max-width: 375px) {
    .card-content {
      padding: 16px;
      gap: 12px;
    }
    
    .avatars-container {
      width: 70px;
      height: 36px;
    }
    
    .avatar-circle {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }
    
    .card-title {
      font-size: 16px;
    }
    
    .card-description {
      font-size: 14px;
    }
    
    .see-leaderboard-btn {
      font-size: 16px;
    }
  }
</style>