<script>
  import { Bookmark, ArrowRight, Calendar, Music2, Trophy } from 'lucide-svelte';
  
  export let eventType = 'sports'; // 'music' or 'sports'

  let bookmarkedEvents = new Set(['event1', 'event2']);

  // Mock data matching the mockup exactly
  const mockEvents = [
    {
      id: 'event1',
      title: 'Ducks vs Kings',
      subtitle: 'Exclusive presale access',
      date: 'Fri, May 24',
      time: '7:00PM PT',
      accessType: 'GAME ACCESS',
      iconType: 'music',
      backgroundImage: 'hockey-game',
      category: 'sports'
    },
    {
      id: 'event2',
      title: 'Honda Center Member Access',
      subtitle: 'Early entry + merch offer',
      date: 'Sat, Jun 8',
      time: '5:30PM PT',
      accessType: 'VENUE ACCESS',
      iconType: 'trophy',
      backgroundImage: 'honda-center',
      category: 'sports'
    }
  ];

  $: filteredEvents = mockEvents.filter(event => event.category === eventType);

  function toggleBookmark(id) {
    if (bookmarkedEvents.has(id)) {
      bookmarkedEvents.delete(id);
    } else {
      bookmarkedEvents.add(id);
    }
    bookmarkedEvents = bookmarkedEvents;
  }
</script>

<div class="upcoming-events">
  <div class="events-grid">
    {#each filteredEvents as event}
      <article class="event-card" on:click={() => console.log('Navigate to event', event.id)}>
        <!-- Event Image with Overlay -->
        <div class="event-image" data-bg={event.backgroundImage}>
          <!-- Access Type Chip -->
          <div class="access-chip">
            {#if event.iconType === 'music'}
              <Music2 size={10} color="white" />
            {:else if event.iconType === 'trophy'}
              <Trophy size={10} color="white" />
            {/if}
            <span>{event.accessType}</span>
          </div>
          
          <!-- Bookmark Button -->
          <button 
            class="bookmark-btn" 
            class:bookmarked={bookmarkedEvents.has(event.id)} 
            on:click|stopPropagation={() => toggleBookmark(event.id)}
            aria-label="Bookmark event"
          >
            <Bookmark size={16} />
          </button>
          
          <!-- Event Content Overlay -->
          <div class="event-overlay">
            <div class="event-text">
              <h3 class="event-title">{event.title}</h3>
              <p class="event-subtitle">{event.subtitle}</p>
            </div>
          </div>
        </div>
        
        <!-- Event Footer -->
        <div class="event-footer">
          <div class="event-datetime">
            <Calendar size={14} color="#FF5C00" />
            <span>{event.date} • {event.time}</span>
          </div>
          <button
            class="arrow-button"
            on:click|stopPropagation={() => console.log('Navigate to event', event.id)}
            aria-label="View event details"
          >
            <ArrowRight size={16} color="#FFFFFF" />
          </button>
        </div>
      </article>
    {/each}
  </div>
</div>

<style>
  .upcoming-events {
    width: 100%;
  }

  .events-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* Event Card */
  .event-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .event-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 92, 0, 0.3);
  }

  /* Event Image */
  .event-image {
    position: relative;
    height: 140px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%);
    display: flex;
    flex-direction: column;
    padding: 12px;
  }

  /* Add specific backgrounds for different event types */
  .event-image[data-bg="hockey-game"] {
    background: 
      linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(45, 24, 16, 0.8)),
      radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.1) 0%, transparent 50%),
      #1a1a1a;
  }

  .event-image[data-bg="honda-center"] {
    background: 
      linear-gradient(135deg, rgba(139, 69, 19, 0.8), rgba(160, 82, 45, 0.8)),
      radial-gradient(circle at 70% 30%, rgba(255, 165, 0, 0.1) 0%, transparent 50%),
      #8B4513;
  }

  /* Access Chip */
  .access-chip {
    background: #FF5C00;
    color: #FFFFFF;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 10px;
    font-weight: 700;
    padding: 6px 10px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    align-self: flex-start;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Bookmark Button */
  .bookmark-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #8E8E93;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
  }

  .bookmark-btn:hover {
    background: rgba(255, 255, 255, 1);
    color: #FF5C00;
    transform: scale(1.05);
  }

  .bookmark-btn.bookmarked {
    color: #FF5C00;
    background: rgba(255, 92, 0, 0.1);
  }

  /* Event Overlay Content */
  .event-overlay {
    flex: 1;
    display: flex;
    align-items: flex-end;
    margin-top: auto;
  }

  .event-text {
    flex: 1;
  }

  .event-title {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 4px 0;
    line-height: 1.3;
  }

  .event-subtitle {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    line-height: 1.3;
  }

  /* Event Footer */
  .event-footer {
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .event-datetime {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .event-datetime span {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #8E8E93;
  }

  .arrow-button {
    background: #FF5C00;
    border: none;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .arrow-button:hover {
    background: #e55200;
    transform: scale(1.05);
  }

  .arrow-button:active {
    transform: scale(0.95);
  }
</style>