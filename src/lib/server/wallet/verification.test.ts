import { describe, it, expect } from 'vitest';
import { VERIFICATION_XP } from '../database.js';

describe('VERIFICATION_XP', () => {
  it('WALLET_SCAN awards the full concert attendance reward (10,000)', () => {
    expect(VERIFICATION_XP.WALLET_SCAN.xp).toBe(10_000);
    expect(VERIFICATION_XP.WALLET_SCAN.confidence).toBe(90);
  });

  it('SELF_CHECKIN awards a low-confidence share (2,500)', () => {
    expect(VERIFICATION_XP.SELF_CHECKIN.xp).toBe(2_500);
    expect(VERIFICATION_XP.SELF_CHECKIN.confidence).toBe(30);
  });

  it('WALLET_SCAN and TICKETMASTER_WEBHOOK both award the full reward; MANUAL is half', () => {
    expect(VERIFICATION_XP.TICKETMASTER_WEBHOOK.xp).toBe(10_000);
    expect(VERIFICATION_XP.MANUAL.xp).toBe(5_000);
  });

  it('orders confidence: WALLET_SCAN < TICKETMASTER_WEBHOOK; MANUAL > SELF_CHECKIN', () => {
    expect(VERIFICATION_XP.TICKETMASTER_WEBHOOK.confidence).toBeGreaterThan(
      VERIFICATION_XP.WALLET_SCAN.confidence
    );
    expect(VERIFICATION_XP.MANUAL.confidence).toBeGreaterThan(
      VERIFICATION_XP.SELF_CHECKIN.confidence
    );
  });

  it('all confidence values are within [0, 100]', () => {
    for (const v of Object.values(VERIFICATION_XP)) {
      expect(v.confidence).toBeGreaterThanOrEqual(0);
      expect(v.confidence).toBeLessThanOrEqual(100);
    }
  });
});
