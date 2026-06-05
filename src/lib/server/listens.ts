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
  const sinceUnix = latest ? Math.floor(latest.played_at.getTime() / 1000) + 1 : undefined;

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
  const todayPlays = await db.listeningEvent.findMany({
    where: { user_id: user.id, is_followed: true, played_at: { gte: todayStart } },
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
