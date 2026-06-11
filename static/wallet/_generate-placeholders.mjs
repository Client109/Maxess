// One-off generator for placeholder Apple Wallet asset PNGs.
//
// Produces solid-orange (Maxxes labelColor rgb(255,92,0)) placeholders at the
// dimensions Apple Wallet requires. These are placeholders only — a designer
// should replace them with the real Maxxes mark before launch:
//   - icon.png       29x29   (required)
//   - icon@2x.png    58x58   (required for retina)
//   - logo.png       160x50  (recommended)
//   - logo@2x.png    320x100 (recommended for retina)
//
// Re-run with `node static/wallet/_generate-placeholders.mjs` if regeneration
// is ever needed; otherwise the PNGs are checked in and read at runtime by
// src/lib/server/wallet/pkpass.ts.

import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

function crc32(buf) {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function makePng(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // color type RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  const row = Buffer.alloc(1 + width * 4);
  for (let x = 0; x < width; x++) {
    row[1 + x * 4] = rgba[0];
    row[1 + x * 4 + 1] = rgba[1];
    row[1 + x * 4 + 2] = rgba[2];
    row[1 + x * 4 + 3] = rgba[3];
  }
  const raw = Buffer.concat(Array.from({ length: height }, () => row));
  const idatData = deflateSync(raw);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idatData),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const ORANGE = [255, 92, 0, 255];
const here = dirname(fileURLToPath(import.meta.url));

const targets = [
  { name: 'icon.png', w: 29, h: 29 },
  { name: 'icon@2x.png', w: 58, h: 58 },
  { name: 'logo.png', w: 160, h: 50 },
  { name: 'logo@2x.png', w: 320, h: 100 },
];

for (const t of targets) {
  writeFileSync(join(here, t.name), makePng(t.w, t.h, ORANGE));
  console.log(`wrote ${t.name} ${t.w}x${t.h}`);
}
