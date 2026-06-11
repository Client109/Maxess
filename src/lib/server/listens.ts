// Listening capture service. Polls Last.fm scrobbles (and, when Spotify OAuth
// lands, /me/player/recently-played), inserts new ListeningEvent rows, flags
// followed-artist plays, and awards XP via computeDailyListeningXp().

import { db, addXpTransaction } from './database.js';
import { LastFmClient } from '$lib/api/lastfm.js';
import { serverConfig } from '$lib/config/env.js';
import {
  computeDailyListeningXp,
  MIN_LISTEN_SECONDS,
  type ListeningSignal,
} from '$lib/domain/xp-rules.js';

export const STREAMING_XP_SOURCE = 'Streaming';

export function canonicalArtistName(name: string): string {
  return name.trim().toLowerCase();
}

// Raw shape we normalize Last.fm + Spotify into before insert.
export interface RawListen {
  artist_display_name: string;
  track_name: string;
  played_at: Date;
  source: 'LASTFM' | 'SPOTIFY';
  duration_seconds?: number;
}

// Pure: tag each raw listen with is_followed and aggregate today's followed-
// artist plays into a ListeningSignal. Exported for unit tests.
export function attributeListens(
  raws: RawListen[],
  followedCanonical: Set<string>,
  now: Date = new Date()
): {
  tagged: Array<RawListen & { is_followed: boolean; artist_name_canonical: string }>;
  signalToday: ListeningSignal;
} {
  const todayKey = isoDay(now);
  const tagged = raws.map(r => {
    const canonical = canonicalArtistName(r.artist_display_name);
    return { ...r, is_followed: followedCanonical.has(canonical), artist_name_canonical: canonical };
  });

  let trackListens = 0;
  let minutesListened = 0;
  for (const ev of tagged) {
    if (!ev.is_followed) continue;
    if (isoDay(ev.played_at) !== todayKey) continue;
    if ((ev.duration_seconds ?? 0) < MIN_LISTEN_SECONDS) {
      // Last.fm doesn't always return duration; count those as a listen but
      // contribute 0 minutes.
      if (ev.duration_seconds !== undefined && ev.duration_seconds > 0) continue;
    }
    trackListens += 1;
    minutesListened += (ev.duration_seconds ?? 0) / 60;
  }
  return { tagged, signalToday: { trackListens, minutesListened } };
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function fetchLastFmListens(username: string, sinceUnixSec: number | undefined): Promise<RawListen[]> {
  const apiKey = serverConfig.lastfm.apiKey;
  if (!apiKey) return [];
  const client = new LastFmClient(apiKey);
  const result = await client.getUserRecentTracks(username, { from: sinceUnixSec, limit: 50 });
  if (!result.success || !result.data?.recenttracks?.track) return [];
  const raw = Array.isArray(result.data.recenttracks.track)
    ? result.data.recenttracks.track
    : [result.data.recenttracks.track];

  const out: RawListen[] = [];
  for (const t of raw) {
    if (t['@attr']?.nowplaying === 'true') continue; // skip currently-playing
    if (!t.date?.uts) continue;
    const artistName = 'name' in (t.artist as any) ? (t.artist as any).name : (t.artist as any)['#text'];
    if (!artistName || !t.name) continue;
    out.push({
      artist_display_name: artistName,
      track_name: t.name,
      played_at: new Date(Number(t.date.uts) * 1000),
      source: 'LASTFM',
      duration_seconds: t.duration ? Number(t.duration) : undefined,
    });
  }
  return out;
}

// Stub for Spotify OAuth. Activates when User.spotify_access_token is set —
// requires the deferred auth system. Returns [] today.
async function fetchSpotifyListens(_userId: string): Promise<RawListen[]> {
  return [];
}

export async function syncUserListens(fanId: string): Promise<{
  new_plays: number;
  xp_awarded: number;
  skipped: 'no-user' | 'no-source' | null;
}> {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return { new_plays: 0, xp_awarded: 0, skipped: 'no-user' };
  if (!user.lastfm_username) return { new_plays: 0, xp_awarded: 0, skipped: 'no-source' };

  // Cursor: latest played_at we already have for this user from Last.fm.
  const latest = await db.listeningEvent.findFirst({
    where: { user_id: user.id, source: 'LASTFM' },
    orderBy: { played_at: 'desc' },
    select: { played_at: true },
  });
  // No `+ 1` here: the @@unique([user_id, source, played_at, track_name]) constraint
  // dedupes the cursor row on insert, so we can safely include same-second scrobbles
  // that would otherwise be dropped forever.
  const sinceUnix = latest ? Math.floor(latest.played_at.getTime() / 1000) : undefined;

  const raws = await fetchLastFmListens(user.lastfm_username, sinceUnix);
  const spotifyRaws = await fetchSpotifyListens(user.id);
  const combined = [...raws, ...spotifyRaws];
  if (combined.length === 0) return { new_plays: 0, xp_awarded: 0, skipped: null };

  const followed = await db.followedArtist.findMany({
    where: { user_id: user.id },
    select: { lastfm_name: true },
  });
  const followedSet = new Set(followed.map(f => f.lastfm_name));

  const { tagged } = attributeListens(combined, followedSet);

  let new_plays = 0;
  for (const ev of tagged) {
    try {
      await db.listeningEvent.create({
        data: {
          user_id: user.id,
          artist_name_canonical: ev.artist_name_canonical,
          artist_display_name: ev.artist_display_name,
          track_name: ev.track_name,
          played_at: ev.played_at,
          source: ev.source,
          duration_seconds: ev.duration_seconds ?? null,
          is_followed: ev.is_followed,
        },
      });
      new_plays += 1;
    } catch (e: any) {
      // P2002: unique constraint violation — duplicate scrobble, skip silently.
      if (e?.code !== 'P2002') throw e;
    }
  }

  // Recompute today's followed-artist signal from the DB (so prior plays are
  // included) and award the XP delta.
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setUTCDate(todayEnd.getUTCDate() + 1);
  const todayPlays = await db.listeningEvent.findMany({
    where: {
      user_id: user.id,
      is_followed: true,
      played_at: { gte: todayStart, lt: todayEnd },
      // Match attributeListens(): short explicit-duration plays are excluded;
      // null-duration plays (Last.fm omits some) still count as a listen.
      OR: [
        { duration_seconds: null },
        { duration_seconds: { gte: MIN_LISTEN_SECONDS } },
      ],
    },
    select: { duration_seconds: true },
  });
  const signal: ListeningSignal = {
    trackListens: todayPlays.length,
    minutesListened: todayPlays.reduce((acc, p) => acc + (p.duration_seconds ?? 0) / 60, 0),
  };
  const alreadyToday = await db.xpTransaction.aggregate({
    where: { user_id: user.id, source: STREAMING_XP_SOURCE, created_at: { gte: todayStart } },
    _sum: { amount: true },
  });
  const { awarded } = computeDailyListeningXp({
    signal,
    alreadyToday: alreadyToday._sum.amount ?? 0,
  });

  if (awarded > 0) {
    await addXpTransaction(fanId, {
      amount: awarded,
      source: STREAMING_XP_SOURCE,
      description: `Listening capture: +${awarded} XP from followed artists`,
    });
  }

  return { new_plays, xp_awarded: awarded, skipped: null };
}

export async function followArtist(
  fanId: string,
  data: { display_name: string; spotify_id?: string | null; image_url?: string | null }
) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) throw new Error('User not found');
  const canonical = canonicalArtistName(data.display_name);
  return db.followedArtist.create({
    data: {
      user_id: user.id,
      lastfm_name: canonical,
      display_name: data.display_name,
      spotify_id: data.spotify_id ?? null,
      image_url: data.image_url ?? null,
    },
  });
}

export async function unfollowArtist(fanId: string, followedArtistId: string) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) throw new Error('User not found');
  return db.followedArtist.deleteMany({ where: { id: followedArtistId, user_id: user.id } });
}

export async function getFollowedArtists(fanId: string) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return [];
  return db.followedArtist.findMany({
    where: { user_id: user.id },
    orderBy: { followed_at: 'desc' },
  });
}

export async function isArtistFollowed(fanId: string, displayName: string): Promise<{ followed: boolean; id: string | null }> {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return { followed: false, id: null };
  const row = await db.followedArtist.findUnique({
    where: { user_id_lastfm_name: { user_id: user.id, lastfm_name: canonicalArtistName(displayName) } },
    select: { id: true },
  });
  return { followed: !!row, id: row?.id ?? null };
}

export async function getRecentListens(fanId: string, limit = 10) {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return [];
  return db.listeningEvent.findMany({
    where: { user_id: user.id },
    orderBy: { played_at: 'desc' },
    take: limit,
  });
}

// ─── Per-artist listening summary ────────────────────────────────────────────
// Aggregates a user's `ListeningEvent` rows into the same shape the
// artist-detail "Monthly recap" + KPI cards used to hardcode in mock data.
// Window math:
//   • hours_listened — all-time sum of duration_seconds.
//   • monthly_plays / monthly_hours / top_tracks / peak_day / discovery_count
//     are scoped to the last 30 days (relative to `now`).
//   • longest_session_min — longest contiguous listening burst across the
//     entire history, where "contiguous" means consecutive plays whose start
//     times are within 30 minutes of the previous play's projected end.

type AggregatorRow = {
  artist_name_canonical: string;
  track_name: string;
  played_at: Date;
  duration_seconds: number | null;
};

export type ArtistListeningSummary = {
  hours_listened: number;
  monthly_plays: number;
  monthly_hours: number;
  top_tracks: Array<{ title: string; plays: number }>;
  longest_session_min: number;
  peak_day: string;
  peak_day_hours: number;
  discovery_count: number;
  top_track: string;
};

const EMPTY_SUMMARY: ArtistListeningSummary = {
  hours_listened: 0,
  monthly_plays: 0,
  monthly_hours: 0,
  top_tracks: [],
  longest_session_min: 0,
  peak_day: '',
  peak_day_hours: 0,
  discovery_count: 0,
  top_track: '',
};

export function aggregateArtistListens(
  rows: AggregatorRow[],
  artistCanonical: string,
  now: Date,
): ArtistListeningSummary {
  const artistRows = rows
    .filter(r => r.artist_name_canonical === artistCanonical)
    .sort((a, b) => a.played_at.getTime() - b.played_at.getTime());

  if (artistRows.length === 0) return { ...EMPTY_SUMMARY };

  const monthAgoMs = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  const monthRows = artistRows.filter(r => r.played_at.getTime() >= monthAgoMs);

  const allSec = artistRows.reduce((s, r) => s + (r.duration_seconds ?? 0), 0);
  const monthSec = monthRows.reduce((s, r) => s + (r.duration_seconds ?? 0), 0);

  // Top tracks in the 30-day window, count-desc.
  const trackCounts = new Map<string, number>();
  for (const r of monthRows) {
    trackCounts.set(r.track_name, (trackCounts.get(r.track_name) ?? 0) + 1);
  }
  const top_tracks = [...trackCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([title, plays]) => ({ title, plays }));

  // Longest contiguous session across all-time history.
  const SESSION_GAP_MS = 30 * 60 * 1000;
  let longestSec = 0;
  let currentSec = artistRows[0].duration_seconds ?? 0;
  let lastEndMs = artistRows[0].played_at.getTime() + currentSec * 1000;
  for (let i = 1; i < artistRows.length; i++) {
    const r = artistRows[i];
    const startMs = r.played_at.getTime();
    const dur = r.duration_seconds ?? 0;
    if (startMs - lastEndMs > SESSION_GAP_MS) {
      longestSec = Math.max(longestSec, currentSec);
      currentSec = dur;
    } else {
      currentSec += dur;
    }
    lastEndMs = startMs + dur * 1000;
  }
  longestSec = Math.max(longestSec, currentSec);

  // Peak day (within last 30 days) — most listening seconds on a single date.
  const dayTotals = new Map<string, number>();
  for (const r of monthRows) {
    const iso = r.played_at.toISOString().slice(0, 10);
    dayTotals.set(iso, (dayTotals.get(iso) ?? 0) + (r.duration_seconds ?? 0));
  }
  let peakDayIso = '';
  let peakSec = 0;
  for (const [iso, sec] of dayTotals) {
    if (sec > peakSec) { peakSec = sec; peakDayIso = iso; }
  }
  const peak_day = peakDayIso
    ? new Date(`${peakDayIso}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })
    : '';

  // Discovery: tracks whose earliest play in the user's history falls inside
  // the 30-day window — i.e., truly new tracks for them, not repeats.
  const earliestByTrack = new Map<string, number>();
  for (const r of artistRows) {
    const t = earliestByTrack.get(r.track_name);
    const at = r.played_at.getTime();
    if (t === undefined || at < t) earliestByTrack.set(r.track_name, at);
  }
  let discovery_count = 0;
  for (const earliest of earliestByTrack.values()) {
    if (earliest >= monthAgoMs) discovery_count++;
  }

  return {
    hours_listened: Math.round(allSec / 3600),
    monthly_plays: monthRows.length,
    monthly_hours: Math.round(monthSec / 3600),
    top_tracks,
    longest_session_min: Math.round(longestSec / 60),
    peak_day,
    peak_day_hours: peakSec > 0 ? Math.round((peakSec / 3600) * 10) / 10 : 0,
    discovery_count,
    top_track: top_tracks[0]?.title ?? '',
  };
}

export async function getArtistListeningSummary(
  fanId: string,
  artistDisplayName: string,
  now: Date = new Date(),
): Promise<ArtistListeningSummary | null> {
  const user = await db.user.findUnique({ where: { fan_id: fanId } });
  if (!user) return null;
  const canonical = canonicalArtistName(artistDisplayName);
  const rows = await db.listeningEvent.findMany({
    where: { user_id: user.id, artist_name_canonical: canonical },
    select: { artist_name_canonical: true, track_name: true, played_at: true, duration_seconds: true },
    orderBy: { played_at: 'asc' },
  });
  if (rows.length === 0) return null;
  return aggregateArtistListens(rows, canonical, now);
}
