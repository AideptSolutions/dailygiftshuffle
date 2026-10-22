// One-off: tuned-query candidate listing + hand-picked download for the
// 2026-10-22 kids stocking stuffer batch (licensed-character items where the
// name-based fetch picked wrong variants). Usage:
//   node scripts/one-off-kids-stuffer-images.mjs list
//   node scripts/one-off-kids-stuffer-images.mjs get <id> <imageUrl>
import path from 'path';
import { mkdirSync } from 'fs';
import sharp from 'sharp';
import { loadEnv, searchImages } from './lib/image-search.mjs';

loadEnv();
const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';

const QUERIES = {
  'stuffer-playdoh': 'Play-Doh 10-Pack of Colors',
};

const mode = process.argv[2];
if (mode === 'list') {
  for (const [id, q] of Object.entries(QUERIES)) {
    const cands = await searchImages(q, { provider: 'serpapi' });
    console.log('\n=== ' + id + '  q=' + q);
    for (const c of cands.slice(0, 8)) {
      console.log(`  [${c.domain}] ${c.width}x${c.height}\n    ${c.imageUrl}`);
    }
  }
} else if (mode === 'get') {
  const id = process.argv[3];
  const url = process.argv[4];
  const abs = path.join(ROOT, 'public', 'images', 'products', id + '.jpg');
  const r = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
    },
  });
  if (!r.ok) { console.error('http ' + r.status); process.exit(1); }
  const buf = Buffer.from(await r.arrayBuffer());
  mkdirSync(path.dirname(abs), { recursive: true });
  await sharp(buf)
    .resize(800, 800, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(abs);
  console.log('wrote ' + abs);
} else {
  console.error('mode: list | get <id> <url>');
  process.exit(1);
}
