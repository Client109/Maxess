import { describe, it, expect } from 'vitest';
import {
  generateInviteCode,
  validateInviteRequest,
  buildAcceptUrl,
  REFERRAL_XP_REWARD,
  REFERRAL_XP_SOURCE,
} from './invites.js';

describe('generateInviteCode', () => {
  it('returns a 12-char base64url string', () => {
    const code = generateInviteCode();
    expect(code).toHaveLength(12);
    expect(code).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('returns a unique value on repeated calls (no fixed seed)', () => {
    const codes = new Set(Array.from({ length: 50 }, () => generateInviteCode()));
    expect(codes.size).toBe(50);
  });
});

describe('validateInviteRequest', () => {
  it('accepts a well-formed email', () => {
    expect(validateInviteRequest({ inviteeEmail: 'alice@example.com' })).toEqual({ ok: true });
  });

  it('rejects malformed emails', () => {
    for (const bad of ['', 'plain', 'a@b', 'a b@c.d', '@host.com', 'a@', 'a@b.']) {
      const result = validateInviteRequest({ inviteeEmail: bad });
      expect(result).toEqual({ ok: false, reason: 'invalid_email' });
    }
  });

  it('blocks self-invite (case + whitespace insensitive)', () => {
    expect(validateInviteRequest({
      inviteeEmail: '  Alex@Maxess.app ',
      referrerEmail: 'alex@maxess.app',
    })).toEqual({ ok: false, reason: 'self_invite' });
  });

  it('rejects a duplicate pending invite to the same address', () => {
    expect(validateInviteRequest({
      inviteeEmail: 'bob@example.com',
      existingPendingEmails: ['BOB@example.com'],
    })).toEqual({ ok: false, reason: 'duplicate_invite' });
  });

  it('allows a new invite even if a different pending one exists', () => {
    expect(validateInviteRequest({
      inviteeEmail: 'carol@example.com',
      existingPendingEmails: ['bob@example.com'],
    })).toEqual({ ok: true });
  });
});

describe('buildAcceptUrl', () => {
  it('joins app URL and code with a single slash', () => {
    expect(buildAcceptUrl('https://maxess.app', 'abc123')).toBe('https://maxess.app/invite/abc123');
  });

  it('strips a trailing slash from the app URL', () => {
    expect(buildAcceptUrl('https://maxess.app/', 'abc123')).toBe('https://maxess.app/invite/abc123');
  });
});

describe('constants', () => {
  it('exports the referral XP reward and source string', () => {
    expect(REFERRAL_XP_REWARD).toBe(250);
    expect(REFERRAL_XP_SOURCE).toBe('Referral');
  });
});
