// Apple Wallet .pkpass generator.
//
// Builds a valid .pkpass zip bundle (pass.json + manifest.json [+ signature.bin])
// for a given Pass row. The signer is pluggable:
//   - Unsigned mode (default): no signature.bin. iOS Wallet will refuse to add the
//     pass on a real device, but the download flow, scan endpoint, attendance
//     ledger, and XP wiring are fully exercised.
//   - Signed mode: activates when APPLE_PASS_TYPE_ID, APPLE_TEAM_ID,
//     APPLE_PASS_CERT_P12_BASE64, and APPLE_PASS_CERT_PASSWORD are all set.
//     PKCS#7 signing under Apple's WWDR cert chain is a follow-up — current
//     ship leaves a stub that warns and falls back to unsigned.

import { createHash } from 'node:crypto';
import JSZip from 'jszip';
import { serverConfig } from '$lib/config/env.js';
import { publicConfig } from '$lib/config/env.js';

export interface PkpassInput {
  serialNumber: string;
  description: string;
  eventTitle: string;
  eventVenue: string;
  eventDate: Date;
  eventId: string;
  tier: string;
  organizationName?: string;
}

export interface PkpassResult {
  bytes: Uint8Array;
  signed: boolean;
}

export async function generatePkpass(input: PkpassInput): Promise<PkpassResult> {
  const { passTypeId, teamId, certP12Base64, certPassword, organizationName } =
    serverConfig.applePass;

  const canSign = !!(passTypeId && teamId && certP12Base64 && certPassword);

  const passJson = buildPassJson(input, {
    passTypeId: passTypeId || 'pass.com.maxxes.demo',
    teamId: teamId || 'DEMO000000',
    organizationName: organizationName || input.organizationName || 'Maxxes',
    webServiceURL: `${publicConfig.app.url}/api/passes/wallet`,
    barcodeMessage: `${publicConfig.app.url}/api/passes/scan/${input.serialNumber}`,
  });

  const passBuf = Buffer.from(JSON.stringify(passJson, null, 2), 'utf8');
  const manifest = { 'pass.json': sha1(passBuf) };
  const manifestBuf = Buffer.from(JSON.stringify(manifest), 'utf8');

  const zip = new JSZip();
  zip.file('pass.json', passBuf);
  zip.file('manifest.json', manifestBuf);

  let signed = false;
  if (canSign) {
    const signature = await trySignManifest(manifestBuf);
    if (signature) {
      zip.file('signature', signature);
      signed = true;
    }
  }

  const bytes = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
  return { bytes, signed };
}

function buildPassJson(
  input: PkpassInput,
  meta: { passTypeId: string; teamId: string; organizationName: string; webServiceURL: string; barcodeMessage: string }
) {
  return {
    formatVersion: 1,
    passTypeIdentifier: meta.passTypeId,
    serialNumber: input.serialNumber,
    teamIdentifier: meta.teamId,
    organizationName: meta.organizationName,
    description: input.description,
    logoText: meta.organizationName,
    foregroundColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)',
    labelColor: 'rgb(255, 92, 0)',
    webServiceURL: meta.webServiceURL,
    authenticationToken: input.serialNumber,
    eventTicket: {
      primaryFields: [
        { key: 'event', label: 'EVENT', value: input.eventTitle },
      ],
      secondaryFields: [
        { key: 'venue', label: 'VENUE', value: input.eventVenue },
        { key: 'tier', label: 'TIER', value: input.tier },
      ],
      auxiliaryFields: [
        {
          key: 'date',
          label: 'DATE',
          value: input.eventDate.toISOString(),
          dateStyle: 'PKDateStyleMedium',
          timeStyle: 'PKDateStyleShort',
        },
      ],
      backFields: [
        { key: 'event_id', label: 'Event ID', value: input.eventId },
        { key: 'serial', label: 'Serial', value: input.serialNumber },
      ],
    },
    barcodes: [
      {
        format: 'PKBarcodeFormatQR',
        message: meta.barcodeMessage,
        messageEncoding: 'iso-8859-1',
        altText: input.serialNumber,
      },
    ],
  };
}

function sha1(buf: Buffer): string {
  return createHash('sha1').update(buf).digest('hex');
}

// Stub for real PKCS#7 detached signature under Apple's WWDR cert chain.
// Returns null today (no node-forge dep wired); when implemented, returns the
// raw bytes of the detached signature for inclusion as `signature` in the zip.
async function trySignManifest(_manifestBuf: Buffer): Promise<Uint8Array | null> {
  console.warn(
    '[pkpass] APPLE_PASS_* env vars set but PKCS#7 signing not yet implemented — emitting unsigned pass'
  );
  return null;
}
