// Invite / referral program helpers — pure logic kept here so unit tests can
// exercise validation and code generation without spinning up a database.

import { randomBytes } from 'crypto';

export const REFERRAL_XP_REWARD = 250;
export const REFERRAL_XP_SOURCE = 'Referral';

// Generate a URL-safe invite code. base64url ≈ 6 bits/char, so 12 chars ≈ 72
// bits of entropy — collision risk is negligible for demo scale, but the
// invitations.code column is also @unique so a retry-on-conflict caller is fine.
export function generateInviteCode(): string {
  return randomBytes(9).toString('base64url'); // 9 bytes → 12 base64url chars
}

// Loose RFC-5322 email shape check. Strict validation lives at the API layer
// via zod; this version is only used in tests + as a fast pre-check.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type InviteValidationError =
  | 'invalid_email'
  | 'self_invite'
  | 'duplicate_invite';

export function validateInviteRequest(opts: {
  inviteeEmail: string;
  referrerEmail?: string | null;
  existingPendingEmails?: string[];
}): { ok: true } | { ok: false; reason: InviteValidationError } {
  const email = opts.inviteeEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { ok: false, reason: 'invalid_email' };
  if (opts.referrerEmail && email === opts.referrerEmail.trim().toLowerCase()) {
    return { ok: false, reason: 'self_invite' };
  }
  const pending = (opts.existingPendingEmails ?? []).map(e => e.trim().toLowerCase());
  if (pending.includes(email)) return { ok: false, reason: 'duplicate_invite' };
  return { ok: true };
}

// Build the share URL the recipient lands on. Centralized so the email body
// and the API response stay in sync.
export function buildAcceptUrl(appUrl: string, code: string): string {
  const base = appUrl.replace(/\/$/, '');
  return `${base}/invite/${code}`;
}
