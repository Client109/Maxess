// Revoke a pending invitation.
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { revokeInvitation } from '$lib/server/database.js';

const CURRENT_FAN_ID = 'fan_001';

export const DELETE: RequestHandler = async ({ params }) => {
  const code = params.code;
  if (!code) throw error(400, 'missing_code');
  const result = await revokeInvitation(code, CURRENT_FAN_ID);
  if (!result.ok) {
    const status = result.reason === 'not_found' ? 404 : result.reason === 'forbidden' ? 403 : 409;
    throw error(status, result.reason);
  }
  return json({ ok: true });
};
