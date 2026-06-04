import { writable, derived } from 'svelte/store';
import type { Notification } from '../domain/types.js';
import { mockNotifications } from '../data/mockData.js';

export const notifications = writable<Notification[]>([...mockNotifications]);
export const notifPanelOpen = writable(false);

export const unreadCount = derived(notifications, ($notifications) =>
  $notifications.filter(n => !n.read).length
);

export function markRead(id: string) {
  notifications.update(list =>
    list.map(n => (n.id === id ? { ...n, read: true } : n))
  );
}

export function markAllRead() {
  notifications.update(list => list.map(n => ({ ...n, read: true })));
}
