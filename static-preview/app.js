import { createRewardsState } from "../src/lib/data/rewards.js";
import {
  achievementProgress,
  canRedeemReward,
  checkInToEvent,
  completeChallenge,
  getTier,
  partnerById,
  redeemReward
} from "../src/lib/domain/rewards.js";

const root = document.querySelector("#app");
let state = createRewardsState();

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hero(tier) {
  return `<section class="rewards-hero">
    <div>
      <p class="eyebrow">Maxess Rewards</p>
      <h1>Earn rewards by showing up for local venues, artists, and events.</h1>
      <p class="hero-copy">Fans collect XP through attendance, venue check-ins, artist support, challenges, streaks, referrals, and reward redemptions. Partners get a clearer view of what actually drives engagement.</p>
    </div>
    <article class="fan-card">
      <div class="fan-avatar">${escapeHtml(state.fan.avatar)}</div>
      <div>
        <span class="panel-label">Fan Profile</span>
        <h2>${escapeHtml(state.fan.name)}</h2>
        <p>${escapeHtml(state.fan.city)} | Rank #${state.fan.rank}</p>
      </div>
      <div class="tier-meter">
        <div class="tier-row">
          <strong>${escapeHtml(tier.name)}</strong>
          <span>${state.fan.xp.toLocaleString()} XP</span>
        </div>
        <div class="progress-track"><span style="width:${tier.progress}%"></span></div>
        <p>${tier.xpToNext ? `${tier.xpToNext.toLocaleString()} XP to ${nextTier(tier.name)}` : "Top tier unlocked"}</p>
      </div>
    </article>
  </section>`;
}

function nextTier(tier) {
  return {
    Bronze: "Silver",
    Silver: "Gold",
    Gold: "Platinum",
    Platinum: "Diamond",
    Diamond: "Diamond"
  }[tier];
}

function statCards(tier) {
  const cards = [
    ["Current Tier", tier.name, `${tier.progress}% to next tier`],
    ["Streak", `${state.fan.streakDays} days`, "Consistency multiplier active"],
    ["Check-ins", state.fan.checkinsThisMonth, "Partner visits this month"],
    ["Rewards Used", state.fan.redeemedRewards, "Local perks redeemed"]
  ];

  return `<section class="snapshot-grid rewards-stats">
    ${cards
      .map(
        ([label, value, detail]) => `<article class="metric-card">
          <span class="panel-label">${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <p>${escapeHtml(detail)}</p>
        </article>`
      )
      .join("")}
  </section>`;
}

function challengesPanel() {
  return `<section class="panel rewards-panel">
    <div class="panel-heading">
      <div><span class="panel-label">Gamification</span><h2>Active Challenges</h2></div>
      <span class="panel-count">${state.challenges.filter((item) => item.status !== "completed").length}</span>
    </div>
    <div class="challenge-grid">
      ${state.challenges.map(challengeCard).join("")}
    </div>
  </section>`;
}

function challengeCard(challenge) {
  const partner = partnerById(state, challenge.partnerId);
  const progress = Math.round((challenge.progress / challenge.target) * 100);

  return `<article class="reward-card ${challenge.status === "completed" ? "is-complete" : ""}">
    <div class="card-topline">
      <span class="partner-chip" style="--chip:${partner?.color ?? "#1a7c78"}">${escapeHtml(partner?.name ?? "Maxess")}</span>
      <span class="pill">+${challenge.xp} XP</span>
    </div>
    <h3>${escapeHtml(challenge.title)}</h3>
    <p>${escapeHtml(challenge.action)}</p>
    <div class="progress-track"><span style="width:${progress}%"></span></div>
    <div class="card-meta">
      <span>${challenge.progress}/${challenge.target} complete</span>
      <span>${challenge.expires} left</span>
    </div>
    <button type="button" class="primary-action" data-complete-challenge="${challenge.id}" ${challenge.status === "completed" ? "disabled" : ""}>
      ${challenge.status === "completed" ? "Completed" : "Log Progress"}
    </button>
  </article>`;
}

function rewardsPanel() {
  return `<section class="panel rewards-panel">
    <div class="panel-heading">
      <div><span class="panel-label">Marketplace</span><h2>Rewards You Can Earn</h2></div>
    </div>
    <div class="reward-grid">
      ${state.rewards.map(rewardCard).join("")}
    </div>
  </section>`;
}

function rewardCard(reward) {
  const partner = partnerById(state, reward.partnerId);
  const eligible = canRedeemReward(state.fan, reward);

  return `<article class="reward-card ${reward.featured ? "featured" : ""}">
    <div class="card-topline">
      <span class="partner-chip" style="--chip:${partner?.color ?? "#4556a0"}">${escapeHtml(partner?.name ?? "Maxess")}</span>
      <span class="pill">${reward.cost.toLocaleString()} XP</span>
    </div>
    <h3>${escapeHtml(reward.title)}</h3>
    <p>${escapeHtml(reward.description)}</p>
    <div class="card-meta">
      <span>${escapeHtml(reward.category)}</span>
      <span>${escapeHtml(reward.tierRequired)}+</span>
      <span>${reward.remaining} left</span>
    </div>
    <button type="button" class="${eligible ? "primary-action" : "secondary-action"}" data-redeem="${reward.id}" ${eligible ? "" : "disabled"}>
      ${eligible ? "Redeem Reward" : "Not Eligible Yet"}
    </button>
  </article>`;
}

function eventsPanel() {
  return `<section class="panel rewards-panel">
    <div class="panel-heading">
      <div><span class="panel-label">Local Network</span><h2>Events, Venues & Artists</h2></div>
    </div>
    <div class="event-list">
      ${state.events.map(eventRow).join("")}
    </div>
  </section>`;
}

function eventRow(event) {
  const venue = partnerById(state, event.partnerId);
  const artists = event.artistIds.map((id) => partnerById(state, id)?.name).filter(Boolean).join(" + ");

  return `<article class="event-row">
    <div class="event-date">
      <strong>${escapeHtml(event.date.split(" ")[1])}</strong>
      <span>${escapeHtml(event.date.split(" ")[0])}</span>
    </div>
    <div>
      <h3>${escapeHtml(event.title)}</h3>
      <p>${escapeHtml(venue?.name ?? "Partner venue")} | ${escapeHtml(artists)} | ${escapeHtml(event.time)}</p>
      <div class="card-meta">
        <span>${escapeHtml(event.rewardBoost)}</span>
        <span>${event.attendanceXp} base XP</span>
        <span>${escapeHtml(event.capacitySignal)}</span>
      </div>
    </div>
    <button type="button" class="secondary-action" data-checkin="${event.id}">Mock Check-In</button>
  </article>`;
}

function achievementsPanel() {
  return `<section class="panel rewards-panel">
    <div class="panel-heading">
      <div><span class="panel-label">Achievement Score</span><h2>Badges & Milestones</h2></div>
    </div>
    <div class="achievement-grid">
      ${state.achievements
        .map(
          (achievement) => `<article class="achievement-card ${achievement.unlocked ? "unlocked" : ""}">
            <div class="badge-icon">${achievement.unlocked ? "OK" : achievement.progress}</div>
            <div>
              <h3>${escapeHtml(achievement.title)}</h3>
              <p>${escapeHtml(achievement.description)}</p>
              <div class="progress-track"><span style="width:${achievementProgress(achievement)}%"></span></div>
              <div class="card-meta">
                <span>${achievement.progress}/${achievement.target}</span>
                <span>+${achievement.xp} XP</span>
              </div>
            </div>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function scoringPanel() {
  return `<section class="panel rewards-panel">
    <div class="panel-heading">
      <div><span class="panel-label">Multiple Ways To Score</span><h2>XP Logic</h2></div>
    </div>
    <div class="score-methods">
      ${state.scoringRules
        .map(
          (rule) => `<article>
            <strong>${escapeHtml(rule.label)}</strong>
            <span>${escapeHtml(rule.value)}</span>
            <p>${escapeHtml(rule.description)}</p>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function activityPanel() {
  return `<section class="panel rewards-panel">
    <div class="panel-heading">
      <div><span class="panel-label">Fan Journey</span><h2>Recent Activity</h2></div>
    </div>
    <div class="activity-list">
      ${state.activityFeed
        .slice(0, 6)
        .map(
          (item) => `<article>
            <span class="status-dot priority-${item.xp >= 0 ? "medium" : "low"}"></span>
            <div>
              <strong>${escapeHtml(item.label)}</strong>
              <p>${escapeHtml(item.timestamp)} | ${item.xp > 0 ? "+" : ""}${item.xp.toLocaleString()} XP</p>
            </div>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function partnerInsightsPanel() {
  return `<section class="partner-band">
    <div>
      <span class="panel-label">Partner Intelligence</span>
      <h2>What venues, artists, and event partners learn</h2>
      <p>Maxess turns fan engagement into practical signals for local partners without making the MVP feel like event-management software.</p>
    </div>
    <div class="partner-insights">
      ${state.partnerInsights
        .map(
          (item) => `<article>
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <em>${escapeHtml(item.delta)}</em>
            <p>${escapeHtml(item.note)}</p>
          </article>`
        )
        .join("")}
    </div>
  </section>`;
}

function bindEvents() {
  root.querySelectorAll("[data-complete-challenge]").forEach((button) => {
    button.addEventListener("click", () => {
      state = completeChallenge(state, button.dataset.completeChallenge);
      render();
    });
  });

  root.querySelectorAll("[data-redeem]").forEach((button) => {
    button.addEventListener("click", () => {
      state = redeemReward(state, button.dataset.redeem);
      render();
    });
  });

  root.querySelectorAll("[data-checkin]").forEach((button) => {
    button.addEventListener("click", () => {
      state = checkInToEvent(state, button.dataset.checkin);
      render();
    });
  });
}

function render() {
  const tier = getTier(state.fan.xp);

  root.innerHTML = `<main class="app-shell rewards-shell">
    ${hero(tier)}
    ${statCards(tier)}
    <div class="rewards-layout">
      <div class="main-column">
        ${challengesPanel()}
        ${rewardsPanel()}
        ${eventsPanel()}
      </div>
      <aside class="side-column">
        ${achievementsPanel()}
        ${scoringPanel()}
        ${activityPanel()}
      </aside>
    </div>
    ${partnerInsightsPanel()}
  </main>`;

  bindEvents();
}

render();
