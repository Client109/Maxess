import { error } from '@sveltejs/kit';
import { getPassByPassId, markPassWalletAdded } from '$lib/server/database.js';
import { generatePkpass } from '$lib/server/wallet/pkpass.js';

export async function GET({ params }) {
  const dbPass = await getPassByPassId(params.passId);
  if (!dbPass) throw error(404, 'Pass not found');
  if (!dbPass.apple_wallet_serial) throw error(400, 'Pass is not wallet-enabled');
  if (!dbPass.event_id) throw error(400, 'Pass has no linked event');

  const event = await import('$lib/server/database.js').then(({ db }) =>
    db.event.findUnique({ where: { event_id: dbPass.event_id! } })
  );
  if (!event) throw error(404, 'Linked event not found');

  const { bytes, signed } = await generatePkpass({
    serialNumber: dbPass.apple_wallet_serial,
    description: dbPass.description ?? dbPass.title,
    eventTitle: event.title,
    eventVenue: event.venue,
    eventDate: event.date,
    eventId: event.event_id,
    tier: dbPass.tier,
  });

  if (!dbPass.wallet_added_at) {
    await markPassWalletAdded(dbPass.pass_id);
  }

  return new Response(bytes, {
    status: 200,
    headers: {
      'content-type': 'application/vnd.apple.pkpass',
      'content-disposition': `attachment; filename="${dbPass.apple_wallet_serial}.pkpass"`,
      'cache-control': 'no-store',
      'x-pkpass-signed': signed ? '1' : '0',
    },
  });
}
