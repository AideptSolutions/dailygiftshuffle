// Writes lib/guideImageManifest.json: the hero images that guide link cards may
// use. Runs as `prebuild` so the list always matches public/. Server code
// imports the JSON instead of probing the filesystem: an fs lookup into
// public/ makes Vercel's file tracer bundle the whole image folder into every
// function (528MB, over the 250MB limit).

import { readdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['images/heroes', 'img/category-heroes'];
const EXTRA = ['/img/mothers-day-hero-2026.jpg', '/images/products/fathers-day-hero.jpg', '/img/guide-cta-shuffle.jpg'];

const files = new Set();
for (const dir of DIRS) {
  for (const f of readdirSync(path.join(ROOT, 'public', dir))) {
    if (/\.(jpe?g|png|webp)$/i.test(f)) files.add(`/${dir}/${f}`);
  }
}
for (const f of EXTRA) {
  readdirSync(path.join(ROOT, 'public', path.dirname(f))).includes(path.basename(f)) && files.add(f);
}

const out = path.join(ROOT, 'lib', 'guideImageManifest.json');
writeFileSync(out, JSON.stringify([...files].sort(), null, 1) + '\n');
console.log(`guide image manifest: ${files.size} images`);
