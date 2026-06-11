import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';
import { syncUserListens } from '$lib/server/listens.js';
import { env } from '$env/dynamic/private';

// Vercel Cron entry point. Vercel signs every cron ping with
// `Authorization: Bearer ${CRON_SECRET}` (configured via env). The
// `x-vercel-cron` header alone is not trusted — it can be forged by any
// inbound caller, so we require the bearer secret unconditionally.
export async function GET({ request }) {
  const auth = request.headers.get('authorization') ?? '';
  const expected = env.CRON_SECRET ? `Bearer ${env.CRON_SECRET}` : '';
  if (!expected || auth !== expected) throw error(401, 'Unauthorized');

  const users = await db.user.findMany({
    where: { lastfm_username: { not: null } },
    select: { fan_id: true },
  });

  let users_synced = 0;
  let total_new_plays = 0;
  let total_xp_awarded = 0;
  const errors: Array<{ fan_id: string; message: string }> = [];

  for (const u of users) {
    try {
      const r = await syncUserListens(u.fan_id);
      users_synced += 1;
      total_new_plays += r.new_plays;
      total_xp_awarded += r.xp_awarded;
    } catch (e: any) {
      errors.push({ fan_id: u.fan_id, message: String(e?.message ?? e) });
    }
  }

  return json({ users_synced, total_new_plays, total_xp_awarded, errors }, { status: 200 });
}
