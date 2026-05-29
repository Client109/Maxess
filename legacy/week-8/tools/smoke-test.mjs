import { createRewardsState } from "../src/lib/data/rewards.js";
import {
  canRedeemReward,
  checkInToEvent,
  completeChallenge,
  getTier,
  redeemReward
} from "../src/lib/domain/rewards.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

let state = createRewardsState();
let tier = getTier(state.fan.xp);

assert(tier.name === "Gold", `expected starting tier Gold, got ${tier.name}`);
assert(state.challenges.length === 3, "expected three active challenges");
assert(state.rewards.length === 4, "expected four reward cards");
assert(state.events.length === 3, "expected three local event opportunities");
assert(state.achievements.length === 4, "expected four achievements");

const startingXp = state.fan.xp;
state = completeChallenge(state, "challenge-weekender");
assert(state.fan.xp > startingXp, "logging challenge progress should add XP");

state = checkInToEvent(state, "event-spring-showcase");
assert(state.fan.checkinsThisMonth === 6, "mock check-in should increment monthly check-ins");
assert(state.activityFeed[0].label.includes("Checked in"), "check-in should add activity feed item");

const reward = state.rewards.find((item) => item.id === "reward-merch");
assert(canRedeemReward(state.fan, reward), "fan should be able to redeem merch credit");
const xpBeforeRedeem = state.fan.xp;
state = redeemReward(state, reward.id);
assert(state.fan.xp === xpBeforeRedeem - reward.cost, "redeeming should spend XP");
assert(state.fan.redeemedRewards === 5, "redeeming should increment rewards used");

console.log(`Rewards smoke test passed. tier=${getTier(state.fan.xp).name}, xp=${state.fan.xp}`);
