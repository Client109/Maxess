import { json, error } from '@sveltejs/kit';
import { sendPushToEvent } from '$lib/push/server.js';

export async function POST({ request }) {
  let body: {
    eventId?: string;
    title?: string;
    body?: string;
    url?: string;
    tag?: string;
  };
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON body');
  }
  if (!body.eventId) throw error(400, 'Missing eventId');

  const outcomes = await sendPushToEvent(body.eventId, {
    title: body.title || 'Maxess',
    body: body.body || '',
    url: body.url,
    tag: body.tag
  });
  return json({ ok: true, delivered: outcomes.filter((o) => o.ok).length, outcomes });
}
