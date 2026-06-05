import { json } from '@sveltejs/kit';
import { syncUserListens } from '$lib/server/listens.js';

const DEMO_FAN_ID = 'fan_001';

export async function POST() {
  const result = await syncUserListens(DEMO_FAN_ID);
  return json(result, { status: 200 });
}
