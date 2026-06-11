import { json, error } from '@sveltejs/kit';
import { unfollowArtist } from '$lib/server/listens.js';

const DEMO_FAN_ID = 'fan_001';

export async function DELETE({ params }) {
  try {
    const result = await unfollowArtist(DEMO_FAN_ID, params.id);
    return json({ removed: result.count }, { status: 200 });
  } catch (err) {
    if (err instanceof Error && err.message === 'User not found') {
      throw error(404, 'User not found');
    }
    throw err;
  }
}
