// Accept an invitation — creates a new User row, marks the invite ACCEPTED,
// and awards the referrer 250 XP via a Referral xp_transactions entry.
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { acceptInvitation } from '$lib/server/database.js';

const AcceptBody = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email().max(254),
  city: z.string().min(1).max(80).optional(),
});

export const POST: RequestHandler = async ({ params, request }) => {
  const code = params.code;
  if (!code) throw error(400, 'missing_code');

  let body: unknown;
  try { body = await request.json(); } catch { throw error(400, 'invalid_json'); }
  const parsed = AcceptBody.safeParse(body);
  if (!parsed.success) throw error(400, 'invalid_body');

  const result = await acceptInvitation({
    code,
    newUserName: parsed.data.name,
    newUserEmail: parsed.data.email,
    newUserCity: parsed.data.city,
  });

  if (!result.ok) {
    const statusByReason: Record<string, number> = {
      not_found: 404,
      already_accepted: 409,
      revoked: 410,
      email_in_use: 409,
    };
    throw error(statusByReason[result.reason] ?? 400, result.reason);
  }

  return json({
    ok: true,
    new_user: { fan_id: result.newUser.fan_id, name: result.newUser.name },
    xp_awarded: result.xp_awarded,
  });
};
