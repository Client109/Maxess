import { describe, it, expect } from 'vitest';
import JSZip from 'jszip';
import { generatePkpass } from './pkpass.js';

const SAMPLE = {
  serialNumber: 'test-serial-001',
  description: 'Test ticket',
  eventTitle: 'Ariana Grande — The Eternal Sunshine Tour',
  eventVenue: 'Crypto.com Arena',
  eventDate: new Date('2026-06-13T19:30:00Z'),
  eventId: 'evt_ariana_grande_2026_06_13',
  tier: 'ELITE',
};

describe('generatePkpass', () => {
  it('produces a valid zip with pass.json and manifest.json', async () => {
    const { bytes, signed } = await generatePkpass(SAMPLE);

    expect(bytes.byteLength).toBeGreaterThan(0);
    expect(signed).toBe(false); // no certs in test env

    const zip = await JSZip.loadAsync(bytes);
    expect(zip.file('pass.json')).not.toBeNull();
    expect(zip.file('manifest.json')).not.toBeNull();
    expect(zip.file('signature')).toBeNull(); // unsigned in test env
  });

  it('embeds the correct event fields in pass.json', async () => {
    const { bytes } = await generatePkpass(SAMPLE);
    const zip = await JSZip.loadAsync(bytes);
    const json = JSON.parse(await zip.file('pass.json')!.async('string'));

    expect(json.formatVersion).toBe(1);
    expect(json.serialNumber).toBe('test-serial-001');
    expect(json.description).toBe('Test ticket');
    expect(json.eventTicket.primaryFields[0].value).toBe(SAMPLE.eventTitle);
    expect(json.eventTicket.secondaryFields.find((f: any) => f.key === 'venue').value)
      .toBe(SAMPLE.eventVenue);
    expect(json.eventTicket.secondaryFields.find((f: any) => f.key === 'tier').value)
      .toBe('ELITE');
    expect(json.eventTicket.backFields.find((f: any) => f.key === 'event_id').value)
      .toBe(SAMPLE.eventId);
  });

  it('embeds a barcode pointing at the scan endpoint with the serial', async () => {
    const { bytes } = await generatePkpass(SAMPLE);
    const zip = await JSZip.loadAsync(bytes);
    const json = JSON.parse(await zip.file('pass.json')!.async('string'));

    expect(json.barcodes).toHaveLength(1);
    expect(json.barcodes[0].format).toBe('PKBarcodeFormatQR');
    expect(json.barcodes[0].message).toContain('/api/passes/scan/test-serial-001');
  });

  it('manifest.json contains the SHA1 of pass.json', async () => {
    const { bytes } = await generatePkpass(SAMPLE);
    const zip = await JSZip.loadAsync(bytes);
    const manifest = JSON.parse(await zip.file('manifest.json')!.async('string'));
    const passBytes = await zip.file('pass.json')!.async('uint8array');

    const { createHash } = await import('node:crypto');
    const expected = createHash('sha1').update(passBytes).digest('hex');

    expect(manifest['pass.json']).toBe(expected);
  });

  it('bundles required wallet image assets and lists their hashes in the manifest', async () => {
    const { bytes } = await generatePkpass(SAMPLE);
    const zip = await JSZip.loadAsync(bytes);
    const manifest = JSON.parse(await zip.file('manifest.json')!.async('string'));
    const { createHash } = await import('node:crypto');

    for (const name of ['icon.png', 'icon@2x.png', 'logo.png', 'logo@2x.png']) {
      const entry = zip.file(name);
      expect(entry, `${name} should be present in zip`).not.toBeNull();
      const buf = await entry!.async('uint8array');
      expect(buf.byteLength, `${name} should not be empty`).toBeGreaterThan(0);

      const expected = createHash('sha1').update(buf).digest('hex');
      expect(manifest[name], `${name} hash should be in manifest`).toBe(expected);
    }
  });
});
