// Generate an image with OpenAI gpt-image-1 and save it (optionally resized).
//
// Usage:
//   node scripts/gen-image.mjs --prompt "..." --out public/images/x.png
//   node scripts/gen-image.mjs --prompt "..." --out x.png --size 1536x1024 --quality high
//   node scripts/gen-image.mjs --prompt "..." --out icon.png --transparent --resize 512x512
//
// Flags:
//   --prompt      (required) text prompt
//   --out         (required) output file path (relative to repo root or absolute)
//   --size        1024x1024 | 1536x1024 | 1024x1536 | auto   (default 1024x1024)
//   --quality     low | medium | high | auto                 (default high)
//   --transparent transparent background (PNG)               (default off)
//   --resize      WxH post-resize with sharp (e.g. 1080x1080) (default none)

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
for (const ef of ['.env.all', '.env.local']) {
  try {
    for (const line of readFileSync(path.join(ROOT, ef), 'utf8').split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
    }
  } catch {}
}
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error('OPENAI_API_KEY not set in .env.all'); process.exit(1); }

const argv = process.argv.slice(2);
const flag = (name, def = undefined) => {
  const i = argv.indexOf('--' + name);
  if (i < 0) return def;
  const next = argv[i + 1];
  return next && !next.startsWith('--') ? next : true;
};

const prompt = flag('prompt');
const out = flag('out');
if (!prompt || !out) { console.error('need --prompt and --out'); process.exit(1); }
const size = flag('size', '1024x1024');
const quality = flag('quality', 'high');
const transparent = !!flag('transparent', false);
const resize = flag('resize', null);

const body = {
  model: 'gpt-image-1',
  prompt,
  n: 1,
  size,
  quality,
  output_format: 'png',
  ...(transparent ? { background: 'transparent' } : {}),
};

console.log(`generating (${size}, ${quality}${transparent ? ', transparent' : ''})...`);
const res = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
if (!res.ok) { console.error('API error', res.status, (await res.text()).slice(0, 400)); process.exit(1); }
const data = await res.json();
const b64 = data?.data?.[0]?.b64_json;
if (!b64) { console.error('no image in response', JSON.stringify(data).slice(0, 300)); process.exit(1); }

let buf = Buffer.from(b64, 'base64');
if (resize && /^\d+x\d+$/.test(resize)) {
  const [w, h] = resize.split('x').map(Number);
  buf = await sharp(buf).resize(w, h, { fit: 'cover' }).png().toBuffer();
}
const abs = path.isAbsolute(out) ? out : path.join(ROOT, out);
mkdirSync(path.dirname(abs), { recursive: true });
writeFileSync(abs, buf);
const usage = data?.usage ? ` | tokens: ${data.usage.total_tokens ?? '?'}` : '';
console.log(`saved ${out} (${Math.round(buf.length / 1024)} KB)${usage}`);
