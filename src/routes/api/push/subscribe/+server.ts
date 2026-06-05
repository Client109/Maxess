import { json, error } from '@sveltejs/kit';
import { saveSubscription } from '$lib/push/server.js';

export async function POST({ request }) {
  let body: { subscription?: PushSubscriptionJSON; eventId?: string };
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON body');
  }
  if (!body.subscription) throw error(400, 'Missing subscription');
  try {
    saveSubscription(body.subscription, body.eventId);
  } catch (e) {
    throw error(400, (e as Error).message);
  }
  return json({ ok: true });
}
