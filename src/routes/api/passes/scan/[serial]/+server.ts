import { error, json, redirect } from '@sveltejs/kit';
import {
  getPassByWalletSerial,
  recordAttendanceVerification,
} from '$lib/server/database.js';

async function performScan(serial: string, scannerIp: string | null) {
  const pass = await getPassByWalletSerial(serial);
  if (!pass) return { status: 'not_found' as const };
  if (!pass.user_id) return { status: 'not_found' as const };
  if (!pass.event_id) return { status: 'not_found' as const };

  const result = await recordAttendanceVerification({
    userId: pass.user_id,
    eventId: pass.event_id,
    passId: pass.id,
    method: 'WALLET_SCAN',
    scannerIp,
    metadata: { pass_id: pass.pass_id },
  });

  return {
    status: result.duplicate ? ('duplicate' as const) : ('ok' as const),
    xp_awarded: result.xp_awarded,
    attendance_id: result.attendance.id,
    event_id: pass.event_id,
  };
}

export async function GET({ params, getClientAddress }) {
  const result = await performScan(params.serial, getClientAddress());
  if (result.status === 'not_found') throw error(404, 'Pass serial not recognized');
  throw redirect(303, `/events/${result.event_id}?scanned=1&xp=${result.xp_awarded ?? 0}`);
}

export async function POST({ params, getClientAddress }) {
  const result = await performScan(params.serial, getClientAddress());
  if (result.status === 'not_found') return json(result, { status: 404 });
  return json(result, { status: 200 });
}
