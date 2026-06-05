// Demo-only page for simulating venue ticket scans.
// Lists Alex Chen's wallet-enabled TICKET passes with simulate-scan affordances.
import { db } from '$lib/server/database.js';
import { publicConfig } from '$lib/config/env.js';

export async function load() {
  const user = await db.user.findUnique({ where: { fan_id: 'fan_001' } });
  if (!user) {
    return { passes: [], baseUrl: publicConfig.app.url };
  }

  const passes = await db.pass.findMany({
    where: {
      user_id: user.id,
      pass_kind: 'TICKET',
      apple_wallet_serial: { not: null },
      event_id: { not: null },
    },
    orderBy: { created_at: 'desc' },
  });

  const eventIds = passes
    .map(p => p.event_id)
    .filter((id): id is string => !!id);
  const events = await db.event.findMany({
    where: { event_id: { in: eventIds } },
  });
  const eventByEventId = new Map(events.map(e => [e.event_id, e]));

  const verifications = await db.attendanceVerification.findMany({
    where: {
      user_id: user.id,
      event_id: { in: eventIds },
      method: 'WALLET_SCAN',
    },
  });
  const scannedKey = new Set(
    verifications.map(v => `${v.event_id}|${v.pass_id ?? ''}`)
  );

  const items = passes.map(p => {
    const ev = p.event_id ? eventByEventId.get(p.event_id) : null;
    return {
      pass_id: p.pass_id,
      title: p.title,
      tier: p.tier,
      serial: p.apple_wallet_serial!,
      event_id: p.event_id!,
      event_title: ev?.title ?? p.event_id,
      event_venue: ev?.venue ?? '—',
      event_date: ev?.date.toISOString() ?? null,
      already_scanned: scannedKey.has(`${p.event_id}|${p.id}`),
    };
  });

  return { passes: items, baseUrl: publicConfig.app.url };
}
