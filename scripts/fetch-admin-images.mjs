// Re-fetch real images for the admin / Crane's-List products (the set that
// powers the home shuffle via /api/products/all). These currently use OpenClaw's
// Gemini images, many of which are wrong (e.g. an AI ".COM" hallucination).
//
// Reads the LIVE Redis set (admin:products), pulls a clean non-Amazon image per
// product via the shared Serper pipeline, overwrites the image file in place,
// and writes the (possibly updated) array back to Redis + data/admin-products.json.
//
// Usage: node scripts/fetch-admin-images.mjs [--dry-run] [--limit N] [--ids a,b]

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { searchImages, pickBestImage } from './lib/image-search.mjs';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
// load env from both files (SERPER in .env.all, UPSTASH in .env.local)
for (const ef of ['.env.all', '.env.local']) {
  try {
    for (const line of readFileSync(path.join(ROOT, ef), 'utf8').split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
    }
  } catch {}
}

const RURL = process.env.UPSTASH_REDIS_REST_URL, RTOK = process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'admin:products';
const SOURCES_LOG = path.join(ROOT, 'data', 'admin-image-sources.json');
const JSON_FALLBACK = path.join(ROOT, 'data', 'admin-products.json');

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const val = (f, d) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : d; };
const DRY = has('--dry-run');
const LIMIT = parseInt(val('--limit', '0'), 10) || 0;
const ONLY = val('--ids', '') ? val('--ids', '').split(',') : null;

async function redis(cmd) {
  const r = await fetch(RURL, { method: 'POST', headers: { Authorization: 'Bearer ' + RTOK, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  return (await r.json()).result;
}

const raw = await redis(['GET', KEY]);
const products = JSON.parse(raw);
console.log(`Redis admin:products = ${products.length} products`);

// Only products whose image is a LOCAL path can be overwritten in place without
// touching Redis. Non-local (remote/Amazon) ones are reported for a separate fix.
const named = products.filter((p) => p.name && p.name !== 'New Product');
const nonLocal = named.filter((p) => !(p.image && p.image.startsWith('/images/')));
let targets = named.filter((p) => p.image && p.image.startsWith('/images/'));
if (ONLY) targets = targets.filter((p) => ONLY.includes(p.id));
if (LIMIT) targets = targets.slice(0, LIMIT);
console.log(`targets(local, in-place)=${targets.length}  non-local(skipped, need path fix)=${nonLocal.length}  dry-run=${DRY}`);
if (nonLocal.length) console.log('  non-local:', nonLocal.map((p) => `${p.id}(${(p.image||'').slice(0,24)})`).join(', '));

const sources = existsSync(SOURCES_LOG) ? JSON.parse(readFileSync(SOURCES_LOG, 'utf8')) : {};
const results = [];

async function downloadNormalize(ranked, absPath) {
  let chosen = null, lastErr = '';
  for (const c of ranked.slice(0, 5)) {
    try {
      const r = await fetch(c.imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36', Accept: 'image/avif,image/webp,image/*,*/*;q=0.8', Referer: c.link || `https://${c.domain}/` } });
      if (!r.ok) { lastErr = `http ${r.status} ${c.domain}`; continue; }
      if (!(r.headers.get('content-type') || '').startsWith('image/')) { lastErr = `non-image ${c.domain}`; continue; }
      const buf = Buffer.from(await r.arrayBuffer());
      mkdirSync(path.dirname(absPath), { recursive: true });
      await sharp(buf).resize(800, 800, { fit: 'contain', background: { r: 255, g: 255, b: 255 } }).flatten({ background: { r: 255, g: 255, b: 255 } }).jpeg({ quality: 82, mozjpeg: true }).toFile(absPath);
      return { chosen: c };
    } catch (e) { lastErr = String(e.message || e).slice(0, 40); }
  }
  return { error: lastErr };
}

let i = 0;
for (const p of targets) {
  i++;
  const rel = (p.image && p.image.startsWith('/images/')) ? p.image : `/images/products/${p.id}.jpg`;
  const abs = path.join(ROOT, 'public', rel);
  try {
    // sanitize: Serper free tier rejects odd patterns (smart quotes, long queries)
    const q = p.name.replace(/[“”‘’"']/g, '').replace(/[–—]/g, '-')
      .replace(/\([^)]*\)/g, '').replace(/[|]/g, ' ').replace(/\s+/g, ' ').trim().split(' ').slice(0, 9).join(' ');
    const cands = await searchImages(q || p.name);
    const { best, ranked } = pickBestImage(cands, { name: p.name });
    if (!best) { results.push({ id: p.id, status: 'no-candidate' }); console.log(`[${i}/${targets.length}] !!  ${p.name.slice(0,40)}`); continue; }
    if (DRY) { results.push({ id: p.id, status: 'dry' }); console.log(`[${i}/${targets.length}] DRY ${best.domain} <- ${p.name.slice(0,38)}`); continue; }
    const dl = await downloadNormalize(ranked, abs);
    if (dl.error) { results.push({ id: p.id, status: 'dl-fail', note: dl.error }); console.log(`[${i}/${targets.length}] xx  ${dl.error}  ${p.name.slice(0,30)}`); continue; }
    sources[p.id] = { name: p.name, domain: dl.chosen.domain, chosen: dl.chosen.imageUrl, writtenTo: rel };
    results.push({ id: p.id, status: 'ok' });
    console.log(`[${i}/${targets.length}] OK  ${dl.chosen.domain} -> ${rel}  (${p.name.slice(0,30)})`);
  } catch (e) { results.push({ id: p.id, status: 'error', note: String(e.message||e).slice(0,60) }); console.log(`[${i}/${targets.length}] ERR ${e.message}`); }
  await new Promise((r) => setTimeout(r, 150));
}

if (!DRY) {
  // Image files are overwritten IN PLACE at their existing paths, so Redis needs
  // no change. Only record provenance. The new images go live on the next deploy.
  writeFileSync(SOURCES_LOG, JSON.stringify(sources, null, 2));
  console.log('wrote provenance log (Redis untouched; deploy to make images live)');
}

const by = results.reduce((a, r) => ((a[r.status] = (a[r.status]||0)+1), a), {});
console.log('\n=== summary ===', JSON.stringify(by));
results.filter((r) => ['no-candidate','dl-fail','error'].includes(r.status)).forEach((r) => console.log(`  ${r.status} ${r.id} ${r.note||''}`));
