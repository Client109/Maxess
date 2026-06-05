// Email dispatch — Resend when configured, no-op fallback otherwise.
// The fallback lets the UI gracefully degrade to "Copy link / mailto" without
// blocking the invite flow.

import { env } from '$env/dynamic/private';

export type SendInviteEmailInput = {
  to: string;
  referrerName: string;
  acceptUrl: string;
};

export type SendInviteEmailResult =
  | { sent: true; provider: 'resend'; id: string }
  | { sent: false; reason: 'no_provider' | 'request_failed'; error?: string };

function buildHtml({ referrerName, acceptUrl }: SendInviteEmailInput): string {
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif; background: #F8F8FA; padding: 32px; color: #1C1C1E;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; padding: 32px; border: 1px solid #E5E5EA;">
    <tr><td>
      <h1 style="margin: 0 0 8px; font-size: 22px;">You're invited to Maxess</h1>
      <p style="margin: 0 0 24px; color: #6E6E73; font-size: 15px; line-height: 1.5;">
        <strong>${escapeHtml(referrerName)}</strong> wants you on Maxess — a fan ranking, rewards, and community platform for live events.
      </p>
      <a href="${acceptUrl}" style="display: inline-block; background: #FF5C00; color: #FFFFFF; text-decoration: none; font-weight: 600; padding: 12px 20px; border-radius: 12px;">
        Create your account
      </a>
      <p style="margin: 24px 0 0; color: #8E8E93; font-size: 12px;">
        Or paste this link in your browser:<br>
        <span style="color: #6E6E73; word-break: break-all;">${acceptUrl}</span>
      </p>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export async function sendInviteEmail(input: SendInviteEmailInput): Promise<SendInviteEmailResult> {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: 'no_provider' };

  const from = env.RESEND_FROM_EMAIL || 'Maxess <onboarding@resend.dev>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: input.to,
        subject: `${input.referrerName} invited you to Maxess`,
        html: buildHtml(input),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { sent: false, reason: 'request_failed', error: text.slice(0, 200) };
    }
    const data = await res.json() as { id?: string };
    return { sent: true, provider: 'resend', id: data.id ?? '' };
  } catch (err) {
    return { sent: false, reason: 'request_failed', error: err instanceof Error ? err.message : String(err) };
  }
}
