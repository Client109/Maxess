import { json, error } from '@sveltejs/kit';
import { followArtist, getFollowedArtists } from '$lib/server/listens.js';

const DEMO_FAN_ID = 'fan_001';

export async function GET() {
  const rows = await getFollowedArtists(DEMO_FAN_ID);
  return json({ followed: rows });
}

export async function POST({ request }) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON body');
  }
  const display_name = typeof body?.display_name === 'string' ? body.display_name.trim() : '';
  if (!display_name) throw error(400, 'display_name is required');
  try {
    const row = await followArtist(DEMO_FAN_ID, {
      display_name,
      spotify_id: body?.spotify_id ?? null,
      image_url: body?.image_url ?? null,
    });
    return json({ followed: row }, { status: 201 });
  } catch (e: any) {
    if (e?.code === 'P2002') return json({ error: 'already_following' }, { status: 409 });
    throw e;
  }
}
