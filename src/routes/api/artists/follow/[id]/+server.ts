import { json } from '@sveltejs/kit';
import { unfollowArtist } from '$lib/server/listens.js';

const DEMO_FAN_ID = 'fan_001';

export async function DELETE({ params }) {
  const result = await unfollowArtist(DEMO_FAN_ID, params.id);
  return json({ removed: result.count }, { status: 200 });
}
