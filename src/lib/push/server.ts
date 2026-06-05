import webpush from 'web-push';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

const VAPID_PUBLIC_KEY = publicEnv.PUBLIC_VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = env.VAPID_PRIVATE_KEY || '';
const VAPID_SUBJECT = env.VAPID_SUBJECT || 'mailto:dev@maxess.app';

let configured = false;
function ensureConfigured() {
  if (configured) return;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    throw new Error(
      'VAPID keys missing. Set PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY in .env. Generate with: npx web-push generate-vapid-keys'
    );
  }
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  configured = true;
}

export interface StoredSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  eventIds: Set<string>;
}

// In-memory store. Resets on server restart. Fine for prototype; swap for DB later.
const subscriptionsByEndpoint = new Map<string, StoredSubscription>();

export function getPublicVapidKey(): string {
  return VAPID_PUBLIC_KEY;
}

export function saveSubscription(sub: PushSubscriptionJSON, eventId?: string): StoredSubscription {
  if (!sub.endpoint || !sub.keys?.p256dh || !sub.keys?.auth) {
    throw new Error('Invalid push subscription payload');
  }
  const existing = subscriptionsByEndpoint.get(sub.endpoint);
  if (existing) {
    if (eventId) existing.eventIds.add(eventId);
    return existing;
  }
  const stored: StoredSubscription = {
    endpoint: sub.endpoint,
    keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth },
    eventIds: new Set(eventId ? [eventId] : [])
  };
  subscriptionsByEndpoint.set(sub.endpoint, stored);
  return stored;
}

export function removeSubscription(endpoint: string, eventId?: string) {
  const sub = subscriptionsByEndpoint.get(endpoint);
  if (!sub) return;
  if (eventId) {
    sub.eventIds.delete(eventId);
    if (sub.eventIds.size === 0) subscriptionsByEndpoint.delete(endpoint);
  } else {
    subscriptionsByEndpoint.delete(endpoint);
  }
}

export interface PushOutcome {
  endpoint: string;
  ok: boolean;
  statusCode?: number;
  error?: string;
}

export async function sendPushToEvent(
  eventId: string,
  payload: { title: string; body: string; url?: string; tag?: string }
): Promise<PushOutcome[]> {
  ensureConfigured();
  const outcomes: PushOutcome[] = [];
  const body = JSON.stringify({ ...payload, icon: '/favicon.png', badge: '/favicon.png' });

  for (const sub of subscriptionsByEndpoint.values()) {
    if (!sub.eventIds.has(eventId)) continue;
    try {
      const res = await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: sub.keys },
        body
      );
      outcomes.push({ endpoint: sub.endpoint, ok: true, statusCode: res.statusCode });
    } catch (e) {
      const err = e as { statusCode?: number; message?: string };
      // 404/410 means the subscription is dead — drop it.
      if (err.statusCode === 404 || err.statusCode === 410) {
        subscriptionsByEndpoint.delete(sub.endpoint);
      }
      outcomes.push({
        endpoint: sub.endpoint,
        ok: false,
        statusCode: err.statusCode,
        error: err.message
      });
    }
  }
  return outcomes;
}
