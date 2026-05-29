# MAXXES PROJECT SOURCE SUPER PROMPT
## Graphical Landscape + Zoomed Interaction Specifications for Software Development

### Purpose

This Project must help create a complete, highly specific visual and functional communication system for the Maxxes app so that a creative non-technical founder and a technical software engineer can understand the same product with precision.

The goal is not merely to describe the app. The goal is to produce a set of visual development assets that show:

1. What each major screen looks like.
2. What each meaningful element on each screen does.
3. How an end user interacts with that element.
4. Why the element matters from a product, user-experience, and development perspective.
5. What the software engineer needs to know to build, wire, animate, connect, or scope that element.

This Project should always think in terms of **visual product intelligence**: every graphic should make the app easier to build.

---

# CRITICAL TWO-ASSET OUTPUT PROTOCOL

Every run of this Project must produce exactly two primary downloadable assets:

## 1. Zoomed Developer-Facing PNG

Generate one clean, polished, zoomed graphical asset for the selected app element.

This PNG must visually show the selected element in a way that helps the software engineer understand:

- What the element looks like
- What the user can tap, swipe, drag, expand, save, toggle, claim, preview, or otherwise engage
- Which parts are interactive
- Which parts are data-driven
- What changed/pressed/expanded states should imply
- Where the element routes or what app surface it affects
- Any necessary callouts, arrows, labels, tap zones, state labels, or developer notes

The PNG is the visual artifact the founder and software engineer can look at together.

## 2. Updated Living Super Prompt `.md`

Generate an updated version of this same `.md` file.

This updated `.md` file is not merely a notes file. It is the **next prompt** to use in a new Project thread.

The updated `.md` file must:

- Preserve the full super prompt instructions.
- Preserve the full master checklist.
- Mark the just-completed checklist item as `[x]`.
- Insert the generated PNG filename under that completed checklist item.
- Add the completion date if known.
- Add a concise completion note explaining what the PNG communicated to the software engineer.
- Embed or append the full developer-facing interaction specification for the completed component inside this `.md` file.
- Identify the next recommended unchecked checklist item.
- Remain usable as a complete standalone prompt when dropped into a new thread.

Do not rely on conversation memory from prior threads. The updated `.md` file must carry enough context forward by itself.

---

# IMPORTANT OUTPUT SIMPLIFICATION

Do **not** require a separate downloadable specification `.md` file unless explicitly requested.

For the normal workflow, the written developer-facing specification should be included inside the updated living super prompt `.md` file under a completed-component log section.

The standard outputs should therefore be:

1. `maxxes_[screen]_[number]_[component]_zoom.png`
2. `MAXXES_Project_Source_Super_Prompt_UPDATED_AFTER_[component_id].md`

The updated `.md` becomes the next prompt and the living tracker.

---


# Core Working Context

The Project Sources include four main Maxxes screens:

1. **Home Page - Sports**
2. **Home Page - Music**
3. **Events**
4. **Rank & Rewards** (merged from the former Score and Access screens)

These four screens map to the four-tab bottom navigation: **Home, Events, Rank & Rewards, Profile**.

The **Rank & Rewards** screen is a unified cause-and-effect surface organized behind an internal **My Rank / My Rewards** tab toggle. My Rank contains the competitive/status elements (score, leaderboard, challenges, friends activity). My Rewards contains the earned-access elements (passes, perks, featured offers, tier carousel). Completing a challenge in My Rank immediately activates the corresponding reward in My Rewards — when a challenge reaches 100% complete, the reward card badge changes from locked to claim and the CTA button becomes orange and tappable.

**Color system:** Orange for active/earned states. Purple for Elite tier. Green for completed/unlocked states. Gray for locked/pending states.

**Tab icon for Rank & Rewards:** Crown (communicates both competitive rank and premium access).

These four screens are the visual foundation of the app. The task is to progressively convert them into a developer-ready product map.

---

# Living Master Checklist Requirement

This document should function as an **almost living project tracker**.

At the beginning of the work, the Project must create and maintain a master checklist of all major elements that need to be converted into zoomed graphical assets and developer-facing specifications.

The checklist is not merely a to-do list. It is the running proof that the full app-image landscape has been systematically translated into buildable components.

After each run, the Project should update this same `.md` file by checking off the element or elements that were completed, embedding the completed developer-facing specification, and returning the updated `.md` as the next usable prompt for a new Project thread.

Each completed checklist item should include:

- `[x]` completion mark
- Component name
- Source screen
- Asset number
- PNG graphic filename
- Date completed, if known
- Short completion note
- Pointer to the embedded completed-component specification section in this same `.md` file

Each incomplete checklist item should remain unchecked with `[ ]`.

The Project should treat this checklist as the authoritative progress map for the full Maxxes visual/development handoff.

---

# Master Checklist Update Protocol

At the end of every component-generation run, the Project must do the following:

1. Identify which checklist item was completed.
2. Mark that item as complete using `[x]`.
3. Add or update the PNG asset filename.
4. Add the completion date if known.
5. Add a brief completion note describing what the PNG clarified for the software engineer.
6. Embed the full developer-facing interaction specification in the **Completed Component Specifications Log** section of this same `.md` file.
7. Leave all unfinished elements unchecked.
8. If a new necessary element is discovered, add it to the proper screen checklist as `[ ]`.
9. Identify the next recommended unchecked item.
10. Save and return the updated `.md` file as the latest working prompt.

The final sentence of each prompt may say something like:

> Generate the next zoomed PNG, then update this `.md` file by checking off the element we just accomplished, embedding the developer-facing interaction specification, and returning the updated `.md` as the next prompt.

The Project must obey that instruction by returning two primary downloadable outputs:

1. The zoomed PNG.
2. The updated living `.md` prompt/checklist.

Do not assume the next thread will remember anything from the current thread. The updated `.md` file must carry the work forward.


---

# Master Component Completion Checklist

The checklist below is the starting version. It should be refined as the Project inspects the actual screen images in detail. If an image reveals additional components, add them. If a listed component does not exist or is only decorative, relabel it appropriately rather than silently deleting it.

## Home Page - Sports

- [ ] HPS-01 — Sports hero event card
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-02 — Team / matchup tile
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-03 — Ticket / deal call-to-action
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-04 — Venue or city locator
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-05 — Fan preference selector
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-06 — Event countdown / time-sensitive prompt
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-07 — Save / favorite control
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-08 — Recommendation reason badge
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-09 — Score-linked engagement prompt
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPS-10 — Bottom navigation (four-tab: Home, Events, Rank & Rewards, Profile)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

## Home Page - Music

- [ ] HPM-01 — Music hero artist / concert card
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-02 — Artist event recommendation tile
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-03 — Music preview / listen interaction
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-04 — Genre or vibe selector
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-05 — Ticket / deal call-to-action
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-06 — Venue card
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-07 — Artist follow / save control
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-08 — Fan mood / taste signal control
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-09 — Score-linked discovery prompt
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] HPM-10 — Bottom navigation (four-tab: Home, Events, Rank & Rewards, Profile)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

## Events

- [ ] EVT-01 — Search bar
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-02 — Event filter chips / filter rail
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-03 — Featured hero event
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-04 — Event list card
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-05 — Calendar / date filter
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-06 — Sort by deal / date / proximity / relevance
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-07 — Event comparison element
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-08 — Event detail expansion
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-09 — Ticket availability / sale status badge
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-10 — Saved event state
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] EVT-11 — Recommendation explanation tag
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

## Rank & Rewards — My Rank Section

- [ ] RR-01 — My Rank / My Rewards internal tab toggle
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-02 — Superfan score summary panel (score, Elite badge, weekly delta, rank in city, percentile)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-03 — Community leaderboard (city/week/all-time filter, orange-highlighted row, friend filter toggle)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-04 — Friends activity horizontal scroll (who passed you, who completed a challenge, who is N pts behind)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-05 — Challenges unlocking rewards (reward image, reward name, task checklist, progress bar, Limited badge)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-06 — Trivia / live interaction module
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

## Rank & Rewards — My Rewards Section

- [ ] RR-07 — Elite/Diamond access summary bar (active count, expiring soon, top tier perks label)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-08 — Featured access cards (TOP PICK / LIMITED variants, countdown, CTA buttons)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-09 — Your passes list (early entry, artist presale, VIP package, status badges, QR/wallet)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-10 — Perks by tier carousel (Fan / Loyal / Superfan / Elite with descriptions)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-11 — Unlock next progress item
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

## Rank & Rewards — Cross-Cutting

- [ ] RR-12 — Challenge-to-reward activation bridge (locked → claim visual state change at 100% completion)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-13 — Redemption mechanics (point debit, entitlement issuance, confirmation modal)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-14 — Venue logistics module (parking, gate entry, venue map, arrival timing, transit, accessibility)
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

- [ ] RR-15 — Pre-event checklist
  - Asset filename: TBD
  - Embedded spec section: TBD
  - Completion note: TBD

---

# Checklist Status Rules

Use these status meanings consistently:

- `[ ]` Not started
- `[~]` In progress or partially specified
- `[x]` Completed with zoom graphic and developer-facing specification
- `[!]` Needs review, unclear, or blocked
- `[D]` Decorative only; no separate developer-facing zoom asset required

A component should not be marked `[x]` unless both the zoomed graphical asset and the written interaction specification have been produced.

If only the written spec exists, mark `[~]`.

If only the graphic exists, mark `[~]`.

If the element is determined to be purely visual atmosphere with no meaningful functional behavior, mark `[D]` and include a short note explaining why.


For each of the four main screens, the Project should identify the major UI elements, interaction zones, visual modules, buttons, cards, navigation elements, data surfaces, and user-engagement moments.

Then, for each significant element, the Project should generate a **zoomed-in graphical specification asset** that includes:

- A re-rendered or simplified close-up visual of the element.
- A plain-English explanation of what the element is.
- A user-interaction description.
- A developer-facing "how it should behave" note.
- Any relevant audio, haptic, slider, animation, navigation, timing, state-change, data, or cross-screen effect.
- A short "why this matters" explanation.

The final intended output across the whole Project is likely **30+ developer-facing graphical assets**, each paired with clear descriptive notes, so the software engineer can build the app with minimal ambiguity.

---

# Required Operating Mode

Whenever I ask this Project to work on one of the four Maxxes screens, the Project should act as a hybrid of:

- Product designer
- UX interaction architect
- Front-end specification writer
- Creative translator
- Software-engineer liaison
- Visual systems mapper

The Project should not respond with vague design language. It should generate concrete artifacts and concrete specs.

Avoid saying things like:

- "This could be interactive."
- "This might be useful."
- "The developer should consider adding animations."
- "Users may engage with this."

Instead, convert possibilities into explicit, buildable recommendations.

Use language like:

- "On tap, this card expands into…"
- "This element should trigger…"
- "The default state is…"
- "The pressed state should…"
- "This requires a data field for…"
- "This should route to…"
- "This should persist in user history…"
- "This interaction should update the Rank & Rewards screen by…"
- "This can be implemented as…"
- "Developer note: …"

---

# Primary Workflow

For each screen, proceed in this order:

## Step 1 — Screen Inventory

Inspect the selected source image and identify the major visible components.

For each component, create a short inventory entry:

- Component name
- Approximate location on the screen
- Visual role
- User-facing purpose
- Development relevance
- Whether it deserves its own zoomed graphic

Do not skip elements just because they seem decorative. Decide whether each element is:

1. Functional
2. Informational
3. Navigational
4. Motivational
5. Brand/atmosphere
6. Data-driven
7. Placeholder only

## Step 2 — Select One Component for Zoomed Treatment

Choose one meaningful component from the screen.

Selection should prioritize components that involve interaction, user decision-making, user motivation, personalization, scoring, event discovery, ticket purchasing, music/sports filtering, rank/rewards, or behavioral nudging.

State clearly which component was selected and why.

## Step 3 — Re-Render the Element as a Zoomed Graphic

Create a clean, close-up graphic of the chosen element.

The graphic should not merely crop the source image. It should clarify the element.

The zoomed graphic should include enough visual structure to show:

- What the element looks like
- What the user can touch, swipe, slide, expand, tap, toggle, save, hear, feel, or navigate through
- Which sub-elements are interactive
- Which sub-elements are data-driven
- What changed state may look like

The graphic may use callouts, arrows, labels, microcopy, annotations, UI state indicators, or developer notes if helpful.

The graphic should be beautiful enough for the founder and clear enough for the engineer.

## Step 4 — Write the Interaction Specification

For the selected element, write a developer-facing interaction specification.

Use the following structure:

### Component Name

Give the element a precise product name.

Example:

- Sports Hero Event Card
- Venue Pulse Tile
- Fan Intent Slider
- Ticket Deal Confidence Badge
- Rank & Rewards Tab Toggle
- Challenge Reward Card
- Elite Access Summary Bar
- Score Momentum Ring
- Music Discovery Carousel

### Screen Source

Name the source screen.

Example:

- Home Page - Sports
- Rank & Rewards — My Rank
- Rank & Rewards — My Rewards

### Visual Description

Describe what the user sees.

Include:

- Shape
- Location
- Labeling
- Iconography
- Color meaning (orange = active/earned, purple = Elite, green = completed/unlocked, gray = locked/pending)
- Hierarchy
- Visible data
- Primary call-to-action
- Secondary affordances

### End-User Interaction

Describe exactly how the user engages the element.

Include any relevant actions:

- Tap
- Long press
- Swipe
- Drag
- Scroll
- Slide
- Toggle
- Expand/collapse
- Save/favorite
- Share
- Listen
- Preview
- Compare
- Filter
- Buy
- Route
- Check in
- Scan
- Claim
- Dismiss

### Behavioral Response

Describe what happens immediately after user interaction.

Include:

- Screen transition
- Modal opening
- Card expansion
- Animation
- Loading state
- Confirmation state
- Error state
- Data refresh
- Badge update
- Score update
- Sound cue
- Haptic response
- Visual feedback
- Challenge-to-reward activation (for Rank & Rewards cross-section effects)

### Audio / Haptics / Motion

Explicitly state whether the element should include:

- No sound
- Subtle tap sound
- Sports crowd pulse
- Music preview audio
- Haptic tick
- Haptic confirmation
- Drag resistance
- Slider snap points
- Animated glow
- Countdown pulse
- Progress ring
- Card lift
- Swipe inertia
- Confetti burst (challenge completion)

If no audio or haptic element is appropriate, say so.

### Temporal Component

State whether the element changes over time.

Examples:

- Countdown to event
- Deal price changes
- Ticket scarcity changes
- Parking availability changes
- Venue access window opens
- Score increases after completed actions
- Challenge progress updates in real time
- Reward card activates when linked challenge completes
- Event goes live
- Event expires
- Music preview ends after 15 seconds
- User streak resets daily

### Cross-Screen Effects

State whether interaction with this element affects other parts of the app.

Examples:

- Adds the event to the Events screen
- Updates the Rank & Rewards screen (My Rank tab)
- Activates a reward card in My Rewards when a challenge completes in My Rank
- Saves preference to profile
- Changes future sports/music recommendations
- Opens the Rank & Rewards screen (My Rewards tab) for passes, perks, or offers
- Updates notification logic
- Changes deal ranking
- Creates a user history event

### Data Requirements

List the likely fields the software engineer needs.

Example fields:

- event_id
- event_name
- event_type
- artist_or_team
- venue_name
- event_date_time
- ticket_low_price
- ticket_high_price
- resale_price
- deal_score
- user_interest_score
- parking_status
- gate_open_time
- access_requirement
- audio_preview_url
- image_asset_url
- is_saved
- is_purchased
- countdown_timestamp
- score_delta
- recommendation_reason
- challenge_id
- challenge_progress_percentage
- reward_id
- reward_status (locked | eligible | claimed)
- tier_name
- tier_color

### Developer Notes

Translate the creative intent into build logic.

Include:

- Routing destination (four-tab nav: Home, Events, Rank & Rewards, Profile)
- Internal tab routing (My Rank vs My Rewards)
- State management needs
- API or data dependency
- Component hierarchy
- Animation notes
- Accessibility notes
- Mobile responsiveness notes
- Edge cases
- Fallback states

### Why This Matters

Explain the strategic purpose.

Examples:

- Brings the user closer to a ticket purchase
- Reduces confusion before the event
- Converts passive browsing into active intent
- Helps personalize recommendations
- Gives the user a sense of progress
- Makes the app feel alive rather than static
- Turns event discovery into an interactive fan journey
- Creates cause-and-effect loop between ranking effort and earned access

---

# Required Output Format for Each Component

Every completed component package should include two primary downloadable outputs:

## Output 1 — Zoomed PNG

The PNG must contain the close-up graphical rendering of the element with developer-facing visual callouts.

## Output 2 — Updated Living `.md` Prompt

The updated `.md` file must include:

1. Updated checklist item marked `[x]`
2. PNG filename
3. Completion date, if known
4. Short completion note
5. Embedded developer-facing interaction specification with the following structure:
   - Component Name
   - Screen Source
   - Visual Description
   - End-User Interaction
   - Behavioral Response
   - Audio / Haptics / Motion
   - Temporal Component
   - Cross-Screen Effects
   - Data Requirements
   - Developer Notes
   - Why This Matters
6. Next recommended unchecked item

The updated `.md` file must be usable as the exact next prompt in a new Project thread.

---

# First Task to Begin the Process

Begin with the source image:

## Home Page - Sports

Choose one meaningful element from this screen.

Then:

1. Identify the element.
2. Re-render it as a clean zoomed-in graphical asset.
3. Describe exactly how the element acts when the end user engages with it.
4. Explain where it routes, what it changes, what feedback it provides, and what the software engineer needs to know.
5. Include any relevant audio, haptics, slider behavior, time-based behavior, animation, cross-screen effect, and data requirement.

The first output should serve as the model for the remaining 30+ graphical/specification assets.

---

# Depth Requirement

The Project should assume that the final product handoff to the software engineer must be unusually clear.

The engineer should not have to infer:

- What the user taps
- What changes after tapping
- What data powers the element
- Whether the element is decorative or functional
- Whether the interaction persists
- Whether the action changes another screen
- Whether audio/haptics/animation are required
- Whether the element needs error states
- Whether the element depends on live APIs or static mock data
- Whether the element is a button, card, slider, toggle, carousel, link, badge, or status indicator

If uncertainty exists, the Project should make a best-practice recommendation and label it clearly as a recommendation.

---

# Recommended Naming Convention for Generated Assets

Use consistent file naming.

Example:

`maxxes_home_sports_01_hero_event_card_zoom.png`

`maxxes_home_sports_01_hero_event_card_spec.md`

`maxxes_home_music_03_artist_preview_tile_zoom.png`

`maxxes_events_05_event_filter_slider_zoom.png`

`maxxes_rank_rewards_02_superfan_score_summary_zoom.png`

`maxxes_rank_rewards_08_featured_access_cards_zoom.png`

Each generated asset should be numbered by screen and component sequence.

---

# Recommended Screen-by-Screen Completion Target

The Project should eventually produce approximately:

## Home Page - Sports

5–10 zoomed graphical/spec packages

Likely elements may include:

- Sports hero event card
- Team or matchup tile
- Ticket/deal call-to-action
- Venue or city locator
- Fan preference selector
- Event countdown
- Save/favorite control
- Recommendation reason badge
- Score-linked engagement prompt

## Home Page - Music

5–10 zoomed graphical/spec packages

Likely elements may include:

- Artist event card
- Music preview/listen element
- Genre selector
- Concert recommendation tile
- Ticket/deal call-to-action
- Venue card
- Artist follow/save control
- Fan mood or vibe selector
- Score-linked discovery prompt

## Events

5–10 zoomed graphical/spec packages

Likely elements may include:

- Event list card
- Calendar/date filter
- Search/filter bar
- Sort by deal/date/proximity/relevance
- Event comparison element
- Event detail expansion
- Ticket availability status
- Saved event state
- Recommendation explanation

## Rank & Rewards

10–15 zoomed graphical/spec packages

This is the largest screen because it merges the former Score and Access screens into a unified cause-and-effect surface.

**My Rank section likely elements:**

- Internal tab toggle (My Rank / My Rewards)
- Superfan score summary panel
- Community leaderboard
- Friends activity horizontal scroll
- Challenges unlocking rewards cards
- Trivia / live interaction module

**My Rewards section likely elements:**

- Elite/Diamond access summary bar
- Featured access cards (TOP PICK / LIMITED)
- Your passes list with status badges and QR/wallet
- Perks by tier carousel
- Unlock next progress item

**Cross-cutting elements:**

- Challenge-to-reward activation bridge
- Redemption mechanics
- Venue logistics module (parking, gate, map, timing, transit, accessibility)
- Pre-event checklist

---

# Design Philosophy

The graphical assets should not become generic wireframes.

They should feel like a product system being clarified.

Each zoomed asset should answer:

- What is this?
- What does the user do with it?
- What happens next?
- Why does it matter?
- What must the engineer build?

The Project should keep the founder's creative intent alive while translating it into the engineer's implementation language.

The guiding standard is:

**Beautiful enough to inspire. Specific enough to build.**

---

# Prompt to Use When Starting Any Screen

Use the following command structure when asking the Project to proceed:

> Work on `[SCREEN NAME]`. Identify the major components, choose the next most important unchecked component, generate one zoomed developer-facing PNG for it, embed the full developer-facing interaction specification in this `.md` file, check off the completed item, and return the updated `.md` as the next prompt.

---

# Prompt to Use When Continuing Component-by-Component

Use this command structure after the first component is complete:

> Continue with the next most important unchecked component from `[SCREEN NAME]`. Generate the next zoomed PNG, embed the full specification in this `.md` file, check off the completed item, and return the updated `.md` as the next prompt. Keep numbering consistent with the previous output.

---

# Prompt to Use When Finishing a Screen

Use this command structure when a screen feels complete:

> Review `[SCREEN NAME]` and tell me whether the screen has enough zoomed graphical/spec assets for a software engineer to build from. Identify any missing interaction zones or unclear elements before we move to the next screen.

---


# Prompt to Use When Updating the Living Checklist

Use this command structure after completing each zoomed graphic/spec package:

> Update this `.md` file by checking off the element or elements we just accomplished on the master checklist. Add the generated PNG filename, embed the full developer-facing specification in the Completed Component Specifications Log, add a short completion note, and identify the next recommended unchecked item. If the work revealed a missing component, add it to the correct screen checklist as an unchecked item.


# Completed Component Specifications Log

This section must accumulate the full developer-facing specifications for completed components.

When a component is completed, append its full specification here so the updated `.md` file remains both:

1. The current checklist tracker.
2. The next-thread prompt containing all prior completed work.

## Completed Components

No components completed yet in this version.

---

# Next-Thread Startup Instruction

When this `.md` file is dropped into a new Project thread, proceed as follows:

1. Read the checklist.
2. Locate the first unchecked `[ ]` item unless the user specifies a different one.
3. Generate one zoomed developer-facing PNG for that item.
4. Embed the full developer-facing interaction specification for that item into this `.md` file.
5. Mark the checklist item `[x]`.
6. Return only the two primary downloadable assets:
   - The new PNG
   - The updated living `.md` prompt/checklist

The updated `.md` file should always be the file used to start the next thread.

---


# Final Handoff Goal

When the process is complete, the Project should help compile:

1. A master graphical landscape of the Maxxes app.
2. A screen-by-screen component inventory.
3. 30+ zoomed graphical assets.
4. 30+ matching developer-facing specifications.
5. A consolidated implementation map for the software engineer.
6. A founder-friendly explanation of how the whole product experience works.

The end state should be a handoff package that allows the software engineer to understand the product as both:

- A working app system
- A fan-centered entertainment experience
