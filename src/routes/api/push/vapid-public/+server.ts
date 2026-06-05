import { json } from '@sveltejs/kit';
import { getPublicVapidKey } from '$lib/push/server.js';

export async function GET() {
  return json({ key: getPublicVapidKey() });
}
