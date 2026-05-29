<script>
  import { ChevronRight } from 'lucide-svelte';
  import { mockFriendActivity } from '$lib/data/mockData.js';

  export let fan = null;     // optional: used for contextual description
  export let mode = 'sports'; // 'music' | 'sports'

  // Use first 3 friends for the avatar stack
  const avatarFriends = mockFriendActivity.slice(0, 3);

  $: description = mode === 'sports'
    ? `See how you rank among ${fan?.top_team ?? 'fans'}`
    : 'See how you rank among friends';

  const avatarColors = ['#8B4513', '#D2691E', '#CD853F'];
</script>

<div class="climb-card">
  <div class="card-content">
    <div class="avatars-container">
      {#each avatarFriends as friend, i}
        <div
          class="avatar-circle"
          style="z-index: {avatarFriends.length - i}; left: {i * 20}px; background: {avatarColors[i]}"
          title={friend.name}
        >
          {friend.avatar_initials}
        </div>
      {/each}
    </div>

    <div class="card-text">
      <h3 class="card-title">Climb the ranks</h3>
      <p class="card-description">{description}</p>
    </div>

    <a href="/access" class="see-leaderboard-btn">
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

  .avatars-container {
    position: relative;
    width: 80px;
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
    font-size: 12px;
    font-weight: 700;
    color: #FFFFFF;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .card-text {
    flex: 1;
    min-width: 0;
  }

  .card-title {
    font-size: 17px;
    font-weight: 700;
    color: #000000;
    margin: 0 0 4px 0;
    line-height: 1.3;
  }

  .card-description {
    font-size: 15px;
    color: #8E8E93;
    margin: 0;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .see-leaderboard-btn {
    display: flex;
    align-items: center;
    gap: 2px;
    border: 1.5px solid #FF5C00;
    border-radius: 20px;
    padding: 8px 14px;
    color: #FF5C00;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: opacity 0.2s ease;
  }

  .see-leaderboard-btn:hover { opacity: 0.7; }
</style>
