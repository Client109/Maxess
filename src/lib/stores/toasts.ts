import { writable } from 'svelte/store';

export interface Toast {
  id: string;
  message: string;
}

export const toasts = writable<Toast[]>([]);

const DEFAULT_DURATION_MS = 3200;

export function showToast(message: string, duration = DEFAULT_DURATION_MS) {
  const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  toasts.update((list) => [...list, { id, message }]);
  setTimeout(() => {
    toasts.update((list) => list.filter((t) => t.id !== id));
  }, duration);
}
