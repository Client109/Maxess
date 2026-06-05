import { json, error } from '@sveltejs/kit';
import { removeSubscription } from '$lib/push/server.js';

export async function POST({ request }) {
  let body: { endpoint?: string; eventId?: string };
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON body');
  }
  if (!body.endpoint) throw error(400, 'Missing endpoint');
  removeSubscription(body.endpoint, body.eventId);
  return json({ ok: true });
}
