// Generate editorial lifestyle HERO images per page via Gemini, cropped to 3:2.
// Hero scenes are AI-generated (no specific-product accuracy needed, no
// licensing issue) and saved to public/images/heroes/{slug}.jpg.
//
// Usage:
//   node scripts/gen-hero-images.mjs --ids top-10-gifts-for-grandparents-who-have-everything
//   node scripts/gen-hero-images.mjs --all [--force]
//   node scripts/gen-hero-images.mjs --list

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
// load GOOGLE_AI_API_KEY from .env.all
for (const line of readFileSync(path.join(ROOT, '.env.all'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
}
const KEY = process.env.GOOGLE_AI_API_KEY;
const OUT_DIR = path.join(ROOT, 'public', 'images', 'heroes');

const STYLE = 'Warm, editorial lifestyle photograph. Soft natural window light, shallow depth of field, cozy and inviting, premium magazine quality. Candid and authentic, not stocky. No text, no watermark, no logos, no brand names.';

// slug -> scene description (the gifting moment for that page's audience)
const HEROES = {
  'top-10-gifts-for-grandparents-who-have-everything':
    'A joyful grandmother and grandfather opening a wrapped gift together at a sunlit kitchen table, family warmth.',
  'top-10-gifts-for-new-dads-under-50':
    'A happy new father holding his newborn baby in a bright nursery, a small wrapped gift on the dresser beside them.',
  'top-10-gifts-that-arrive-in-24-hours':
    'A delivery box on a doorstep being happily opened, fast-delivery excitement, bright morning light.',
};

const argv = process.argv.slice(2);
const ids = (() => { const i = argv.indexOf('--ids'); return i >= 0 ? argv[i + 1].split(',') : null; })();
const FORCE = argv.includes('--force');
if (argv.includes('--list')) { console.log(Object.keys(HEROES).join('\n')); process.exit(0); }

const targets = ids ? ids : Object.keys(HEROES);

async function genImage(prompt) {
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
  });
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body },
  );
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) throw new Error('no image: ' + JSON.stringify(data).slice(0, 200));
  return Buffer.from(img.inlineData.data, 'base64');
}

mkdirSync(OUT_DIR, { recursive: true });
for (const slug of targets) {
  const scene = HEROES[slug];
  if (!scene) { console.log(`!! no prompt for ${slug}`); continue; }
  const out = path.join(OUT_DIR, `${slug}.jpg`);
  if (existsSync(out) && !FORCE) { console.log(`skip (exists) ${slug}`); continue; }
  try {
    const raw = await genImage(`${scene} ${STYLE}`);
    // crop to 3:2, target 1200x800
    await sharp(raw).resize(1200, 800, { fit: 'cover', position: 'attention' }).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
    console.log(`OK  ${slug} -> images/heroes/${slug}.jpg`);
  } catch (e) { console.log(`ERR ${slug}: ${String(e.message || e).slice(0, 120)}`); }
  await new Promise((r) => setTimeout(r, 800));
}
