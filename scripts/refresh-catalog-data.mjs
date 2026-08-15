// Refresh price, rating and review count for the whole catalog from the Amazon
// Creators API - the only trustworthy source for these fields.
//
// Replaces the browser-scrape stopgap in scripts/amazon-live-data.mjs and makes
// prices fixable for the first time (search and page-scrape data both proved
// wrong: Google Shopping returned other retailers' listings, and the product
// page's a-offscreen span returns per-unit and promotional figures).
//
// Usage:
//   node scripts/refresh-catalog-data.mjs            # dry run, prints a diff
//   node scripts/refresh-catalog-data.mjs --write    # apply to both catalogs
//   node scripts/refresh-catalog-data.mjs --check    # verify credentials only
//
// Flags:
//   --max-price-drift=0.5  refuse a price change larger than this fraction
//                          unless --force (guards against a variant swap)
import { readFileSync, writeFileSync } from 'fs';
import { loadEnv, getAllItems, getAccessToken } from './lib/creators-api.mjs';

loadEnv();

const WRITE = process.argv.includes('--write');
const CHECK = process.argv.includes('--check');
const FORCE = process.argv.includes('--force');
const MAX_DRIFT = Number((process.argv.find((a) => a.startsWith('--max-price-drift=')) || '=0.5').split('=')[1]);

const tier = (p) =>
  p < 25 ? 'under25' : p < 50 ? '25to50' : p < 100 ? '50to100' : p < 150 ? '100to150' : p < 250 ? '150to250' : '250plus';

// --- read the catalogs ------------------------------------------------------
const FILES = ['data/products.ts', 'data/products-catalog.ts'];
const entries = [];
for (const f of FILES) {
  const t = readFileSync(f, 'utf8');
  const ids = [...t.matchAll(/id:\s*'((?:[^'\\]|\\.)*)'/g)];
  for (let i = 0; i < ids.length; i++) {
    const b = t.slice(ids[i].index, i + 1 < ids.length ? ids[i + 1].index : t.length);
    const asin = (b.match(/\/dp\/([A-Z0-9]{10})/) || b.match(/amz\(\s*'([A-Z0-9]{10})'/) || [, null])[1];
    if (!asin) continue;
    entries.push({
      file: f,
      id: ids[i][1],
      asin,
      name: (b.match(/name:\s*'((?:[^'\\]|\\.)*)'/) || [, ''])[1],
      price: Number((b.match(/\bprice:\s*([\d.]+)/) || [, 0])[1]),
      rating: Number((b.match(/rating:\s*([\d.]+)/) || [, 0])[1]),
      reviews: Number((b.match(/reviewCount:\s*(\d+)/) || [, 0])[1]),
    });
  }
}
console.log(`catalog entries with an ASIN: ${entries.length}`);

if (CHECK) {
  try {
    await getAccessToken();
    console.log('credentials OK - access token obtained');
  } catch (e) {
    console.error(`credential check FAILED: ${e.message}`);
    process.exit(1);
  }
  process.exit(0);
}

// --- fetch ------------------------------------------------------------------
const asins = entries.map((e) => e.asin);
const { data, failures } = await getAllItems(asins, {
  onBatch: (done, total) => process.stdout.write(`\rfetched ${done}/${total}`),
});
process.stdout.write('\n');
console.log(`resolved ${data.size}/${new Set(asins).size} ASINs`);
if (failures.length) {
  console.log(`\n${failures.length} batch/item failures:`);
  failures.slice(0, 10).forEach((f) => console.log(`  ${f.batch.join(',')} -> ${f.error}`));
}

// ASINs the API knows nothing about are almost always delisted products.
const missing = entries.filter((e) => !data.has(e.asin));
if (missing.length) {
  console.log(`\n${missing.length} entries whose ASIN the API did not return (likely delisted):`);
  missing.forEach((m) => console.log(`  ${m.id.padEnd(28)} ${m.asin}  ${m.name.slice(0, 44)}`));
}

// --- diff -------------------------------------------------------------------
const changes = [];
const risky = [];
for (const e of entries) {
  const d = data.get(e.asin);
  if (!d) continue;
  const next = {};
  if (d.rating != null && Number(d.rating) !== e.rating) next.rating = Number(d.rating);
  if (d.reviewCount != null && Number(d.reviewCount) !== e.reviews) next.reviews = Number(d.reviewCount);
  if (d.price != null && e.price) {
    const p = Number(d.price);
    const drift = Math.abs(p - e.price) / e.price;
    if (p !== e.price) {
      if (drift > MAX_DRIFT && !FORCE) risky.push({ ...e, newPrice: p, drift });
      else next.price = p;
    }
  }
  if (Object.keys(next).length) changes.push({ ...e, next });
}

console.log(`\nentries needing an update: ${changes.length}`);
changes.slice(0, 30).forEach((c) => {
  const bits = [];
  if (c.next.rating != null) bits.push(`rating ${c.rating}->${c.next.rating}`);
  if (c.next.reviews != null) bits.push(`reviews ${c.reviews}->${c.next.reviews}`);
  if (c.next.price != null) bits.push(`price $${c.price}->$${c.next.price}`);
  console.log(`  ${c.id.padEnd(28)} ${bits.join('  ')}`);
});
if (changes.length > 30) console.log(`  ... and ${changes.length - 30} more`);

if (risky.length) {
  console.log(`\n${risky.length} price changes over ${Math.round(MAX_DRIFT * 100)}% held back (pass --force to apply):`);
  risky.forEach((r) => console.log(`  ${r.id.padEnd(28)} $${r.price} -> $${r.newPrice}  (${Math.round(r.drift * 100)}%)  ${r.name.slice(0, 34)}`));
}

// --- write ------------------------------------------------------------------
if (!WRITE) {
  console.log('\n(dry run - pass --write to apply)');
  process.exit(0);
}

const byFile = {};
for (const c of changes) (byFile[c.file] = byFile[c.file] || []).push(c);
let written = 0;
for (const f of FILES) {
  const list = byFile[f];
  if (!list) continue;
  let t = readFileSync(f, 'utf8');
  const ids = [...t.matchAll(/id:\s*'((?:[^'\\]|\\.)*)'/g)].map((m) => ({ id: m[1], index: m.index }));
  const wanted = new Map(list.map((c) => [c.id, c]));
  for (let i = ids.length - 1; i >= 0; i--) {
    const c = wanted.get(ids[i].id);
    if (!c) continue;
    const start = ids[i].index;
    const end = i + 1 < ids.length ? ids[i + 1].index : t.length;
    let b = t.slice(start, end);
    if (c.next.rating != null) b = b.replace(/rating:\s*[\d.]+/, `rating: ${c.next.rating}`);
    if (c.next.reviews != null) b = b.replace(/reviewCount:\s*\d+/, `reviewCount: ${c.next.reviews}`);
    if (c.next.price != null) {
      const p = c.next.price;
      const disp = `$${p % 1 === 0 ? p : p.toFixed(2)}`;
      b = b.replace(/\bprice:\s*[\d.]+/, `price: ${p}`)
           .replace(/priceDisplay:\s*'[^']*'/, `priceDisplay: '${disp}'`)
           .replace(/budgetTier:\s*'[^']*'/, `budgetTier: '${tier(p)}'`);
    }
    t = t.slice(0, start) + b + t.slice(end);
    written++;
  }
  writeFileSync(f, t);
}
console.log(`\nWROTE ${written} entries across both catalogs`);
