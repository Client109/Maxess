// Invite API — create new invitations, list current user's invitations.
// Demo posture: the "current user" is hardcoded fan_001 (per app spec).
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import {
  getUserByFanId,
  createInvitation,
  listInvitationsByReferrer,
} from '$lib/server/database.js';
import {
  validateInviteRequest,
  buildAcceptUrl,
} from '$lib/server/invites.js';
import { sendInviteEmail } from '$lib/server/email.js';
import { publicConfig } from '$lib/config/env.js';

const CURRENT_FAN_ID = 'fan_001';

const PostBody = z.object({
  email: z.string().email().max(254),
});

export const GET: RequestHandler = async () => {
  const invitations = await listInvitationsByReferrer(CURRENT_FAN_ID);
  return json({
    invitations: invitations.map(i => ({
      code: i.code,
      invitee_email: i.invitee_email,
      status: i.status,
      sent_at: i.sent_at,
      accepted_at: i.accepted_at,
      xp_awarded: i.xp_awarded,
    })),
  });
};

export const POST: RequestHandler = async ({ request, url }: { request: Request; url: URL }) => {
  let body: unknown;
  try { body = await request.json(); } catch { throw error(400, 'invalid_json'); }
  const parsed = PostBody.safeParse(body);
  if (!parsed.success) throw error(400, 'invalid_email');

  const referrer = await getUserByFanId(CURRENT_FAN_ID);
  if (!referrer) throw error(500, 'referrer_not_found');

  const pending = await listInvitationsByReferrer(CURRENT_FAN_ID);
  const pendingEmails = pending.filter(i => i.status === 'SENT').map(i => i.invitee_email);
  const check = validateInviteRequest({
    inviteeEmail: parsed.data.email,
    referrerEmail: referrer.email,
    existingPendingEmails: pendingEmails,
  });
  if (!check.ok) throw error(check.reason === 'duplicate_invite' ? 409 : 400, check.reason);

  const invitation = await createInvitation({
    referrerFanId: CURRENT_FAN_ID,
    inviteeEmail: parsed.data.email,
  });

  // Build share URL using the request origin when PUBLIC_APP_URL is unset (dev).
  const appUrl = publicConfig.app.url && publicConfig.app.url !== 'http://localhost:5173'
    ? publicConfig.app.url
    : url.origin;
  const acceptUrl = buildAcceptUrl(appUrl, invitation.code);

  const emailResult = await sendInviteEmail({
    to: invitation.invitee_email,
    referrerName: referrer.name,
    acceptUrl,
  });

  return json({
    code: invitation.code,
    invitee_email: invitation.invitee_email,
    share_url: acceptUrl,
    email_sent: emailResult.sent,
    email_provider: emailResult.sent ? emailResult.provider : null,
  });
};
