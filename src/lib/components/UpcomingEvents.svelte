<script>
  import { Bookmark, ArrowRight, Calendar, Music2, Trophy } from 'lucide-svelte';
  import { mockEvents } from '$lib/data/mockData.js';

  export let eventType = 'sports'; // 'music' | 'sports'

  let bookmarkedEvents = new Set();

  // Home page shows the top 2 upcoming events for the selected category.
  // Priority: featured first, then trending, then anything else.
  $: filteredEvents = mockEvents
    .filter(e => e.category === eventType)
    .sort((a, b) => {
      /** @param {import('$lib/domain/types').Event} e */
      const score = e => (e.featured ? 2 : 0) + (e.trending ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 2);

  /** @param {string} id */
  function toggleBookmark(id) {
    if (bookmarkedEvents.has(id)) bookmarkedEvents.delete(id);
    else bookmarkedEvents.add(id);
    bookmarkedEvents = bookmarkedEvents;
  }

  /** @param {import('$lib/domain/types').Event} event */
  function formatDatetime(event) {
    const date = event.date_display ?? event.date;
    return event.time ? `${date} • ${event.time}` : date;
  }
</script>

<div class="upcoming-events">
  <div class="events-grid">
    {#each filteredEvents as event}
      {@const accent = event.category === 'music' ? '#2667FF' : '#FF5C00'}
      <a href="/events/{event.event_id}" class="event-card">
        <div class="event-image" style="background-color: {event.image_color}">
          <div class="access-chip" style="background: {accent}">
            {#if event.category === 'music'}
              <Music2 size={10} color="white" />
            {:else}
              <Trophy size={10} color="white" />
            {/if}
            <span>{event.access_type}</span>
          </div>

          <button
            class="bookmark-btn"
            class:bookmarked={bookmarkedEvents.has(event.event_id)}
            style:color={bookmarkedEvents.has(event.event_id) ? accent : undefined}
            on:click|stopPropagation={() => toggleBookmark(event.event_id)}
            aria-label="Bookmark event"
          >
            <Bookmark size={16} />
          </button>

          <div class="event-overlay">
            <div class="event-text">
              <h3 class="event-title">{event.title}</h3>
              {#if event.subtitle || event.presale_info}
                <p class="event-subtitle">{event.presale_info ?? event.subtitle}</p>
              {/if}
            </div>
          </div>
        </div>

        <div class="event-footer">
          <div class="event-datetime">
            <Calendar size={14} color={accent} />
            <span>{formatDatetime(event)}</span>
          </div>
          <span class="arrow-button" style="background: {accent}" aria-label="View event details">
            <ArrowRight size={16} color="#FFFFFF" />
          </span>
        </div>
      </a>
    {/each}

    {#if filteredEvents.length === 0}
      <p class="empty-state">No upcoming {eventType} events.</p>
    {/if}
  </div>
</div>

<style>
  .upcoming-events { width: 100%; }

  .events-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .event-card {
    background: #FFFFFF;
    border: 1px solid #E5E5EA;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .event-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 92, 0, 0.3);
  }

  .event-image {
    position: relative;
    height: 140px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    /* subtle dark overlay for text legibility */
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%);
    background-blend-mode: multiply;
  }

  .access-chip {
    color: #FFFFFF;
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

  .bookmark-btn.bookmarked { color: var(--action-orange); }

  .event-overlay {
    flex: 1;
    display: flex;
    align-items: flex-end;
    margin-top: auto;
  }

  .event-text { flex: 1; }

  .event-title {
    font-size: 17px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 4px 0;
    line-height: 1.3;
  }

  .event-subtitle {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    line-height: 1.3;
  }

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
    font-size: 13px;
    font-weight: 500;
    color: #8E8E93;
  }

  .arrow-button {
    border: none;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
  }

  .arrow-button:hover { opacity: 0.85; }

  .empty-state {
    grid-column: span 2;
    text-align: center;
    color: #8E8E93;
    font-size: 14px;
    padding: 24px 0;
  }
</style>
