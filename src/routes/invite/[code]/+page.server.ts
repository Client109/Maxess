import { error } from '@sveltejs/kit';
import { getInvitationByCode } from '$lib/server/database.js';

export async function load({ params }) {
  const invitation = await getInvitationByCode(params.code);
  if (!invitation) throw error(404, 'Invitation not found');

  return {
    code: invitation.code,
    status: invitation.status,
    invitee_email: invitation.invitee_email,
    referrer_name: invitation.referrer.name,
  };
}
