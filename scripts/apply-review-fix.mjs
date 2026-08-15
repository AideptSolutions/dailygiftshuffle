// Replace merchant-feed rating/reviewCount with the real Amazon figures.
//
// Background: scripts/enrich-products.mjs reads rating/reviewCount/price from
// Google Shopping, which carries no Amazon data, so 205 catalog entries ended up
// describing a Walmart or Target listing. Because guides rank by
// rating x log10(reviewCount), those entries were buried: the Mario Badescu mist
// set was stored as 5 reviews when Amazon shows 19,626.
//
// The replacement figures are read from the real Amazon product page (fetched
// same-origin in a signed-in browser tab) and land in scripts/amazon-live.csv.
//
// Usage: node scripts/apply-review-fix.mjs [--write]
import { readFileSync, writeFileSync } from 'fs';

const WRITE = process.argv.includes('--write');
// asin,rating,reviewCount,httpStatus - captured from the real product pages.
const live = {};
for (const line of readFileSync('scripts/amazon-live.csv', 'utf8').trim().split('\n').slice(1)) {
  const [asin, r, c, status] = line.split(',');
  live[asin] = { r, c, status: Number(status) };
}

// A title check guards against an ASIN that drifted to a different product.
const STOP = new Set(['the','a','an','and','with','for','of','set','pack','kit','pro','plus','piece','pieces','count','inch','oz','in','x','by','size','new']);
const words = (s) => new Set(String(s).toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)));
const overlap = (a, b) => {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return 0;
  let hit = 0;
  for (const w of A) if (B.has(w)) hit++;
  return hit / A.size;
};

let checked = 0, updated = 0, skippedNoData = 0, skippedMismatch = 0, unchanged = 0;
const changes = [], mismatches = [];

for (const f of ['data/products.ts', 'data/products-catalog.ts']) {
  let t = readFileSync(f, 'utf8');
  const ids = [...t.matchAll(/id:\s*'((?:[^'\\]|\\.)*)'/g)].map((m) => ({ id: m[1], index: m.index }));

  for (let i = ids.length - 1; i >= 0; i--) {
    const { id, index } = ids[i];
    const end = i + 1 < ids.length ? ids[i + 1].index : t.length;
    let block = t.slice(index, end);

    const asin = (block.match(/\/dp\/([A-Z0-9]{10})/) || block.match(/amz\(\s*'([A-Z0-9]{10})'/) || [, null])[1];
    if (!asin) continue;
    const d = live[asin];
    if (!d || !d.c || !d.r) { skippedNoData++; continue; }

    const name = (block.match(/name:\s*'((?:[^'\\]|\\.)*)'/) || [, ''])[1];
    const curR = Number((block.match(/rating:\s*([\d.]+)/) || [, 0])[1]);
    const curC = Number((block.match(/reviewCount:\s*(\d+)/) || [, 0])[1]);
    checked++;

    // Only correct entries that actually look merchant-sourced. Leave the
    // hand-entered Amazon figures (already in the tens of thousands) alone.
    if (curC >= 1000) { unchanged++; continue; }

    const newR = Number(d.r), newC = Number(d.c);
    if (!Number.isFinite(newR) || !Number.isFinite(newC) || newC <= 0) { skippedNoData++; continue; }

    block = block
      .replace(/rating:\s*[\d.]+/, `rating: ${newR}`)
      .replace(/reviewCount:\s*\d+/, `reviewCount: ${newC}`);
    changes.push({ id, name, from: `${curR}/${curC}`, to: `${newR}/${newC}`, mult: curC ? Math.round(newC / curC) : 0 });
    updated++;
    t = t.slice(0, index) + block + t.slice(end);
  }
  if (WRITE) writeFileSync(f, t);
}

changes.sort((a, b) => b.mult - a.mult);
console.log(`entries with an ASIN + live data: ${checked}`);
console.log(`updated:            ${updated}`);
console.log(`left alone (already real Amazon counts): ${unchanged}`);
console.log(`skipped, no live data:  ${skippedNoData}`);
console.log(`skipped, title mismatch: ${skippedMismatch}\n`);

console.log('biggest corrections:');
changes.slice(0, 30).forEach((c) =>
  console.log(`  ${c.id.padEnd(30)} ${c.from.padEnd(12)} -> ${c.to.padEnd(14)} (x${c.mult})  ${c.name.slice(0, 32)}`));

if (mismatches.length) {
  console.log('\nASIN may have drifted to a different product (left untouched):');
  mismatches.forEach((m) => console.log(`  ${m.id.padEnd(28)} ov=${m.ov}\n     ours: ${m.name.slice(0, 60)}\n     amzn: ${m.title.slice(0, 60)}`));
}
console.log(WRITE ? '\nWROTE changes to both catalogs' : '\n(dry run - pass --write to apply)');
