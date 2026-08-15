// Build a prioritized worklist of catalog entries whose rating/reviewCount came
// from a merchant feed rather than Amazon (see the sweep notes: Google Shopping
// has no Amazon data, so enrich-products.mjs returned Walmart/Target numbers).
//
// Ranking is rating x log10(reviewCount), so a fake-low count buries the item.
// Priority therefore goes to entries that (a) sit on the highest-traffic pages
// and (b) have a real /dp/ ASIN we can look up.
import { readFileSync, writeFileSync } from 'fs';

const rows = [];
for (const f of ['data/products.ts', 'data/products-catalog.ts']) {
  const t = readFileSync(f, 'utf8');
  const ids = [...t.matchAll(/id:\s*'((?:[^'\\]|\\.)*)'/g)];
  for (let i = 0; i < ids.length; i++) {
    const block = t.slice(ids[i].index, i + 1 < ids.length ? ids[i + 1].index : t.length);
    const asin = (block.match(/\/dp\/([A-Z0-9]{10})/) || block.match(/amz\(\s*'([A-Z0-9]{10})'/) || [, null])[1];
    rows.push({
      id: ids[i][1],
      name: (block.match(/name:\s*'((?:[^'\\]|\\.)*)'/) || [, ''])[1],
      rating: Number((block.match(/rating:\s*([\d.]+)/) || [, 0])[1]),
      reviews: Number((block.match(/reviewCount:\s*(\d+)/) || [, 0])[1]),
      recipients: (block.match(/recipients:\s*\[([^\]]*)\]/) || [, ''])[1].split(',').map((s) => s.trim().replace(/['"]/g, '')).filter(Boolean),
      tags: (block.match(/tags:\s*\[([^\]]*)\]/) || [, ''])[1].split(',').map((s) => s.trim().replace(/['"]/g, '')).filter(Boolean),
      asin,
      file: f.split('/').pop(),
    });
  }
}

// Under ~1000 reviews is the tell: a curated Amazon gift pick essentially always
// has more, while merchant feeds report double/low-triple digits.
const suspect = rows.filter((r) => r.reviews > 0 && r.reviews < 1000 && r.asin);
const noAsin = rows.filter((r) => r.reviews > 0 && r.reviews < 1000 && !r.asin);

// Traffic weighting: /best-gifts-for-her-2026 is the top page by a wide margin.
const AUDIENCE = { her: 6, mom: 4, him: 3, dad: 3, friends: 2, teens: 2, couples: 2 };
const score = (r) => {
  const aud = Math.max(0, ...r.recipients.map((x) => AUDIENCE[x] ?? 1));
  // The lower the recorded count, the more badly the item is being buried.
  const buried = r.reviews < 100 ? 3 : r.reviews < 500 ? 2 : 1;
  return aud * buried;
};

suspect.sort((a, b) => score(b) - score(a) || a.reviews - b.reviews);
writeFileSync('scripts/_review-worklist.json', JSON.stringify(suspect, null, 2));

console.log(`suspect entries with an ASIN we can look up: ${suspect.length}`);
console.log(`suspect entries with NO ASIN (cannot verify): ${noAsin.length}\n`);
console.log('top 60 by impact:');
suspect.slice(0, 60).forEach((r, i) =>
  console.log(`${String(i + 1).padStart(3)}. ${r.id.padEnd(30)} ${String(r.reviews).padStart(4)} @${r.rating}  ${r.asin}  ${r.name.slice(0, 38)}`));
console.log('\nwrote scripts/_review-worklist.json');
