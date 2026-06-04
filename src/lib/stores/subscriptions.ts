import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { notifications } from './notifications.js';
import { showToast } from './toasts.js';
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

function pushNotification(n: Notification) {
  notifications.update((list) => [n, ...list]);
}

function scheduleFakeTrigger(eventId: string, eventTitle: string) {
  if (!browser) return;
  if (pendingTriggers.has(eventId)) return;
  const timer = setTimeout(() => {
    pendingTriggers.delete(eventId);
    if (!get(subscribedSet).has(eventId)) return;
    pushNotification({
      id: `sub-fire-${eventId}-${Date.now()}`,
      type: 'event',
      title: 'Presale just opened',
      body: `${eventTitle} — tap to grab tickets before they go.`,
      icon: '🎟️',
      time: 'now',
      read: false,
      action_url: `/events/${eventId}`,
    });
  }, FAKE_TRIGGER_DELAY_MS);
  pendingTriggers.set(eventId, timer);
}

function cancelFakeTrigger(eventId: string) {
  const timer = pendingTriggers.get(eventId);
  if (timer) {
    clearTimeout(timer);
    pendingTriggers.delete(eventId);
  }
}

export function isSubscribed(eventId: string): boolean {
  return get(subscribedSet).has(eventId);
}

export function toggleSubscription(eventId: string, eventTitle: string): boolean {
  const currentlyOn = isSubscribed(eventId);
  if (currentlyOn) {
    subscriptions.update((list) => list.filter((id) => id !== eventId));
    cancelFakeTrigger(eventId);
    showToast(`You won't be notified about ${eventTitle}.`);
    return false;
  }
  subscriptions.update((list) => (list.includes(eventId) ? list : [...list, eventId]));
  pushNotification({
    id: `sub-confirm-${eventId}-${Date.now()}`,
    type: 'event',
    title: "You're subscribed",
    body: `We'll alert you when ${eventTitle} presale opens.`,
    icon: '🔔',
    time: 'now',
    read: false,
    action_url: `/events/${eventId}`,
  });
  scheduleFakeTrigger(eventId, eventTitle);
  showToast(`We'll let you know when ${eventTitle} presale opens.`);
  return true;
}
