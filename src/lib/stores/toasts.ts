import { writable } from 'svelte/store';

export type ToastKind = 'default' | 'success';

export interface Toast {
  id: string;
  message: string;
  kind: ToastKind;
}

export const toasts = writable<Toast[]>([]);

const DEFAULT_DURATION_MS = 3200;

// Back-compat: callers may pass a number (legacy duration) or an options object.
export function showToast(
  message: string,
  durationOrOpts: number | { duration?: number; kind?: ToastKind } = DEFAULT_DURATION_MS,
) {
  const opts = typeof durationOrOpts === 'number'
    ? { duration: durationOrOpts, kind: 'default' as ToastKind }
    : { duration: durationOrOpts.duration ?? DEFAULT_DURATION_MS, kind: durationOrOpts.kind ?? 'default' as ToastKind };
  const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  toasts.update((list) => [...list, { id, message, kind: opts.kind }]);
  setTimeout(() => {
    toasts.update((list) => list.filter((t) => t.id !== id));
  }, opts.duration);
}
