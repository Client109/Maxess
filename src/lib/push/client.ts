import { browser } from '$app/environment';

export type PushSupport =
  | { supported: true }
  | { supported: false; reason: string };

export function getPushSupport(): PushSupport {
  if (!browser) return { supported: false, reason: 'Not in browser' };
  if (!('serviceWorker' in navigator)) return { supported: false, reason: 'No service worker' };
  if (!('PushManager' in window)) return { supported: false, reason: 'No PushManager' };
  if (!('Notification' in window)) return { supported: false, reason: 'No Notification API' };
  // iOS requires the site to be installed to home screen (display-mode: standalone) before push works.
  const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent);
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (isIOS && !isStandalone) {
    return { supported: false, reason: 'On iOS, add Maxess to your Home Screen first to enable push.' };
  }
  return { supported: true };
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

async function getVapidPublicKey(): Promise<string> {
  const res = await fetch('/api/push/vapid-public');
  if (!res.ok) throw new Error('Failed to fetch VAPID key');
  const data = (await res.json()) as { key: string };
  if (!data.key) throw new Error('VAPID public key not configured on server');
  return data.key;
}

let cachedRegistration: ServiceWorkerRegistration | null = null;

async function getRegistration(): Promise<ServiceWorkerRegistration> {
  if (cachedRegistration) return cachedRegistration;
  // SvelteKit auto-registers the service worker in production; in dev we register manually.
  const existing = await navigator.serviceWorker.getRegistration();
  if (existing) {
    cachedRegistration = existing;
    return existing;
  }
  cachedRegistration = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
  return cachedRegistration;
}

export interface EnsurePushResult {
  ok: boolean;
  subscription?: PushSubscription;
  reason?: string;
}

export async function ensurePushSubscription(eventId: string): Promise<EnsurePushResult> {
  const support = getPushSupport();
  if (!support.supported) return { ok: false, reason: support.reason };

  if (Notification.permission === 'denied') {
    return { ok: false, reason: 'Notifications were blocked. Re-enable them in Settings.' };
  }
  if (Notification.permission === 'default') {
    const result = await Notification.requestPermission();
    if (result !== 'granted') return { ok: false, reason: 'Permission not granted.' };
  }

  const reg = await getRegistration();
  let subscription = await reg.pushManager.getSubscription();
  if (!subscription) {
    const key = await getVapidPublicKey();
    subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array(urlBase64ToUint8Array(key)) as BufferSource
    });
  }

  await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ subscription: subscription.toJSON(), eventId })
  });

  return { ok: true, subscription };
}

export async function removePushSubscription(eventId: string): Promise<void> {
  if (!browser || !('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;
  await fetch('/api/push/unsubscribe', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ endpoint: sub.endpoint, eventId })
  });
}

export async function triggerServerPush(payload: {
  eventId: string;
  title: string;
  body: string;
  url?: string;
  tag?: string;
}): Promise<void> {
  await fetch('/api/push/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
}
