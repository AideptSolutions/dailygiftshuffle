// Fetch real, self-hosted product images via the provider-agnostic search lib.
//
// Strategy: query a SERP provider per product, pick the best NON-Amazon
// retailer/brand shot, normalize to a clean square JPG, and write it over the
// product's local image path. Every change is git-tracked, so reversible.
//
// Usage:
//   node scripts/fetch-real-images.mjs --dry-run --limit 5
//   node scripts/fetch-real-images.mjs --ids her-u25-1,tech-001
//   node scripts/fetch-real-images.mjs --placeholders        # only placehold.co products
//   node scripts/fetch-real-images.mjs --from-flags          # ids in data/image-flags.json
//   node scripts/fetch-real-images.mjs --all --limit 50
// Flags: --catalog (use products-catalog.ts too), --provider serper|serpapi,
//        --concurrency N, --force (refetch even if already real-local)

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { loadEnv, searchImages, pickBestImage } from './lib/image-search.mjs';

loadEnv();

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
const SOURCES_LOG = path.join(ROOT, 'data', 'image-sources.json');
const FLAGS_FILE = path.join(ROOT, 'data', 'image-flags.json');

// ---- args ----
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const val = (f, d) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : d; };
const DRY = has('--dry-run');
const FORCE = has('--force');
const USE_CATALOG = has('--catalog');
const LIMIT = parseInt(val('--limit', '0'), 10) || 0;
const CONCURRENCY = parseInt(val('--concurrency', '4'), 10) || 4;
const PROVIDER = val('--provider', process.env.IMAGE_PROVIDER || 'serper');
const ONLY_IDS = val('--ids', '') ? val('--ids', '').split(',').map((s) => s.trim()).filter(Boolean) : null;

// ---- parse products from a TS data file (handles 1-line and multi-line) ----
function parseProducts(file) {
  const text = readFileSync(file, 'utf8');
  const re = /\b(id|name|image):\s*['"]([^'"]+)['"]/g;
  const records = [];
  let cur = null, m;
  while ((m = re.exec(text))) {
    const [, key, value] = m;
    if (key === 'id') { cur = { id: value, name: '', image: '', file }; records.push(cur); }
    else if (cur && key === 'name' && !cur.name) cur.name = value;
    else if (cur && key === 'image' && !cur.image) cur.image = value;
  }
  return records.filter((r) => r.id && r.name);
}

let products = parseProducts(path.join(ROOT, 'data', 'products.ts'));
if (USE_CATALOG) products = products.concat(parseProducts(path.join(ROOT, 'data', 'products-catalog.ts')));
// de-dupe by id (products.ts wins)
const seen = new Set();
products = products.filter((p) => (seen.has(p.id) ? false : seen.add(p.id)));

// ---- select target set ----
let targets;
if (ONLY_IDS) {
  targets = products.filter((p) => ONLY_IDS.includes(p.id));
} else if (has('--placeholders')) {
  targets = products.filter((p) => !p.image.startsWith('/images/'));
} else if (has('--from-flags')) {
  const flagged = existsSync(FLAGS_FILE) ? JSON.parse(readFileSync(FLAGS_FILE, 'utf8')) : [];
  const set = new Set(Array.isArray(flagged) ? flagged : flagged.ids || []);
  targets = products.filter((p) => set.has(p.id));
} else if (has('--all')) {
  targets = products;
} else {
  console.error('Specify a target: --ids, --placeholders, --from-flags, or --all');
  process.exit(1);
}
if (LIMIT) targets = targets.slice(0, LIMIT);

console.log(`provider=${PROVIDER}  targets=${targets.length}  dry-run=${DRY}  force=${FORCE}`);
if (!targets.length) { console.log('nothing to do'); process.exit(0); }

// ---- provenance log ----
const sources = existsSync(SOURCES_LOG) ? JSON.parse(readFileSync(SOURCES_LOG, 'utf8')) : {};

function localPathFor(p) {
  // Write to the product's existing local path if it has one, else a default.
  const rel = p.image.startsWith('/images/') ? p.image : `/images/products/${p.id}.jpg`;
  return { rel, abs: path.join(ROOT, 'public', rel) };
}

async function processOne(p) {
  const { rel, abs } = localPathFor(p);
  try {
    const cands = await searchImages(p.name, { provider: PROVIDER });
    const { best, ranked } = pickBestImage(cands, { name: p.name });
    if (!best) { return { id: p.id, status: 'no-candidate', note: `${cands.length} cands, all blocked/empty` }; }

    if (DRY) {
      return { id: p.id, status: 'dry', note: `${best.domain} ${best.width}x${best.height} score${best.score}`, rel };
    }

    // Try candidates in ranked order: some retailers (Sephora, Estée Lauder)
    // 403 bot downloads, so fall through to the next clean source.
    let chosen = null, lastErr = '';
    for (const c of ranked.slice(0, 5)) {
      try {
        const r = await fetch(c.imageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
            'Referer': c.link || `https://${c.domain}/`,
          },
        });
        if (!r.ok) { lastErr = `http ${r.status} ${c.domain}`; continue; }
        const ct = r.headers.get('content-type') || '';
        if (!ct.startsWith('image/')) { lastErr = `non-image ${ct} ${c.domain}`; continue; }
        const buf = Buffer.from(await r.arrayBuffer());
        mkdirSync(path.dirname(abs), { recursive: true });
        await sharp(buf)
          .resize(800, 800, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
          .flatten({ background: { r: 255, g: 255, b: 255 } })
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(abs);
        chosen = c;
        break;
      } catch (e) { lastErr = `${String(e.message || e).slice(0, 40)} ${c.domain}`; }
    }
    if (!chosen) return { id: p.id, status: 'dl-fail', note: lastErr || 'all candidates failed' };

    sources[p.id] = {
      name: p.name, chosen: chosen.imageUrl, domain: chosen.domain,
      width: chosen.width, height: chosen.height, score: chosen.score,
      candidates: ranked.slice(0, 5).map((c) => ({ d: c.domain, s: c.score })),
      writtenTo: rel, provider: PROVIDER,
    };
    return { id: p.id, status: 'ok', note: `${chosen.domain} -> ${rel}`, needsTsPatch: !p.image.startsWith('/images/'), p, rel };
  } catch (e) {
    return { id: p.id, status: 'error', note: String(e.message || e).slice(0, 120) };
  }
}

// ---- run with bounded concurrency ----
const results = [];
const tsPatches = [];
let idx = 0;
async function worker() {
  while (idx < targets.length) {
    const p = targets[idx++];
    const res = await processOne(p);
    results.push(res);
    if (res.needsTsPatch) tsPatches.push(res);
    const tag = { ok: 'OK ', dry: 'DRY', 'no-candidate': '!! ', 'dl-fail': 'xx ', error: 'ERR' }[res.status] || '?? ';
    console.log(`[${results.length}/${targets.length}] ${tag} ${res.id}  ${res.note}`);
    await new Promise((r) => setTimeout(r, 150));
  }
}
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));

// ---- patch TS image fields for products that had no local path (placeholders) ----
if (!DRY && tsPatches.length) {
  const byFile = {};
  for (const r of tsPatches) (byFile[r.p.file] ||= []).push(r);
  for (const [file, list] of Object.entries(byFile)) {
    let text = readFileSync(file, 'utf8');
    for (const r of list) {
      // replace image:'<old>' on the line that also contains id:'<id>'
      const idRe = new RegExp(`(id:\\s*['"]${r.p.id}['"][^\\n]*?image:\\s*['"])[^'"]*(['"])`);
      if (idRe.test(text)) text = text.replace(idRe, `$1${r.rel}$2`);
    }
    writeFileSync(file, text);
    console.log(`patched ${list.length} image paths in ${path.basename(file)}`);
  }
}

if (!DRY) writeFileSync(SOURCES_LOG, JSON.stringify(sources, null, 2));

// ---- summary ----
const by = results.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), {});
console.log('\n=== summary ===', JSON.stringify(by));
const probs = results.filter((r) => ['no-candidate', 'dl-fail', 'error'].includes(r.status));
if (probs.length) {
  console.log('needs attention:');
  probs.forEach((r) => console.log(`  ${r.status}  ${r.id}  ${r.note}`));
}
