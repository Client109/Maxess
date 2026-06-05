import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

const DEMO_FAN_ID = 'fan_001';

export async function POST({ request }) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON body');
  }
  const fandom_id = typeof body?.fandom_id === 'string' ? body.fandom_id.trim() : '';
  if (!fandom_id) throw error(400, 'fandom_id is required');

  const user = await db.user.findUnique({ where: { fan_id: DEMO_FAN_ID } });
  if (!user) throw error(404, 'User not found');

  // Verify the user actually has a FanTier for this fandom — prevents
  // selecting a fandom the user doesn't follow.
  const tier = await db.fanTier.findUnique({
    where: { user_id_fandom_id: { user_id: user.id, fandom_id } },
  });
  if (!tier) throw error(404, 'Fandom not in your tier list');

  await db.user.update({
    where: { id: user.id },
    data: { selected_fandom_id: fandom_id },
  });

  return json({ selected_fandom_id: fandom_id }, { status: 200 });
}
