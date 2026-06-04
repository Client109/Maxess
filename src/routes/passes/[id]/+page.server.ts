import { error } from '@sveltejs/kit';
import { getPassByPassId } from '$lib/server/database.js';
import { transformPass } from '$lib/server/transforms.js';

export async function load({ params }) {
  const dbPass = await getPassByPassId(params.id);

  if (!dbPass) {
    throw error(404, 'Pass not found');
  }

  const pass = transformPass(dbPass);

  return {
    pass,
    description: dbPass.description,
    tier: dbPass.tier,
    valid_until: dbPass.valid_until?.toISOString() ?? null,
    claimed_at: dbPass.claimed_at?.toISOString() ?? null,
  };
}
