import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { notifications } from './notifications.js';
import { showToast } from './toasts.js';
import { ensurePushSubscription, removePushSubscription, triggerServerPush } from '$lib/push/client.js';
import type { Notification } from '../domain/types.js';

const STORAGE_KEY = 'maxess.subscriptions';
const FAKE_TRIGGER_DELAY_MS = 30_000;

function readInitial(): string[] {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export const subscriptions = writable<string[]>(readInitial());

if (browser) {
  subscriptions.subscribe((list) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* quota */ }
  });
}

export const subscribedSet = derived(subscriptions, ($s) => new Set($s));

const pendingTriggers = new Map<string, ReturnType<typeof setTimeout>>();

function pushInAppNotification(n: Notification) {
  notifications.update((list) => [n, ...list]);
}

function scheduleFakePushTrigger(eventId: string, eventTitle: string) {
  if (!browser) return;
  if (pendingTriggers.has(eventId)) return;
  const timer = setTimeout(async () => {
    pendingTriggers.delete(eventId);
    if (!get(subscribedSet).has(eventId)) return;

    pushInAppNotification({
      id: `sub-fire-${eventId}-${Date.now()}`,
      type: 'event',
      title: 'Presale just opened',
      body: `${eventTitle} — tap to grab tickets before they go.`,
      icon: '🎟️',
      time: 'now',
      read: false,
      action_url: `/events/${eventId}`,
    });

    try {
      await triggerServerPush({
        eventId,
        title: 'Presale just opened',
        body: `${eventTitle} — tap to grab tickets before they go.`,
        url: `/events/${eventId}`,
        tag: `presale-${eventId}`,
      });
    } catch { /* server push best-effort */ }
  }, FAKE_TRIGGER_DELAY_MS);
  pendingTriggers.set(eventId, timer);
}

function cancelFakePushTrigger(eventId: string) {
  const timer = pendingTriggers.get(eventId);
  if (timer) {
    clearTimeout(timer);
    pendingTriggers.delete(eventId);
  }
}

export function isSubscribed(eventId: string): boolean {
  return get(subscribedSet).has(eventId);
}

export async function toggleSubscription(eventId: string, eventTitle: string): Promise<boolean> {
  const currentlyOn = isSubscribed(eventId);

  if (currentlyOn) {
    subscriptions.update((list) => list.filter((id) => id !== eventId));
    cancelFakePushTrigger(eventId);
    showToast(`You won't be notified about ${eventTitle}.`);
    removePushSubscription(eventId).catch(() => { /* best-effort */ });
    return false;
  }

  // Optimistically flip the in-app state first.
  subscriptions.update((list) => (list.includes(eventId) ? list : [...list, eventId]));
  pushInAppNotification({
    id: `sub-confirm-${eventId}-${Date.now()}`,
    type: 'event',
    title: "You're subscribed",
    body: `We'll alert you when ${eventTitle} presale opens.`,
    icon: '🔔',
    time: 'now',
    read: false,
    action_url: `/events/${eventId}`,
  });
  scheduleFakePushTrigger(eventId, eventTitle);

  // Then attempt to wire up real OS push. Failures don't undo the in-app state.
  const result = await ensurePushSubscription(eventId);
  if (result.ok) {
    showToast(`We'll let you know when ${eventTitle} presale opens.`);
    triggerServerPush({
      eventId,
      title: "You're subscribed",
      body: `We'll alert you when ${eventTitle} presale opens.`,
      url: `/events/${eventId}`,
      tag: `confirm-${eventId}`,
    }).catch(() => { /* best-effort */ });
  } else {
    showToast(result.reason || 'Subscribed in-app. Enable notifications to get push alerts.');
  }
  return true;
}
