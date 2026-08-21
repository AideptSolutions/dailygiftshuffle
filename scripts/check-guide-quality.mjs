// Quality profile of every guide page's product list.
//
// check-fit.mjs asks "is anything obviously off-theme". This asks the questions
// that surfaced on /best-anniversary-gifts-2026 and /category/finance:
//   - is the page LED by something that fits the promise, or by whatever has the
//     biggest review count (a $370 dutch oven on a romance page)
//   - how much of the list rests on unverified or thin social proof
//   - is the price range sane for the audience
//
// Ranking is rating x log10(reviewCount), so the top few slots carry most of the
// page's impression. Those are reported explicitly.
//
//   node scripts/check-guide-quality.mjs                 (production)
//   ORIGIN=http://localhost:3334 node scripts/check-guide-quality.mjs
//   node scripts/check-guide-quality.mjs gifts-for-wife  (one page, with leaders)
import { readFileSync, readdirSync, existsSync } from 'fs';

const ORIGIN = process.env.ORIGIN || 'https://www.thegiftshuffle.com';
const only = process.argv.slice(2).map((a) => a.replace(/^\/+/, ''));

const verified = new Set(
  readFileSync('scripts/amazon-live.csv', 'utf8').trim().split('\n').slice(1).map((l) => l.split(',')[0]),
);

const byName = new Map();
for (const f of ['data/products.ts', 'data/products-catalog.ts']) {
  const t = readFileSync(f, 'utf8');
  const ids = [...t.matchAll(/id:\s*'((?:[^'\\]|\\.)*)'/g)];
  for (let i = 0; i < ids.length; i++) {
    const b = t.slice(ids[i].index, i + 1 < ids.length ? ids[i + 1].index : t.length);
    const nm = (b.match(/name:\s*'((?:[^'\\]|\\.)*)'/) || [, ''])[1].replace(/\\'/g, "'");
    byName.set(nm, {
      id: ids[i][1],
      asin: (b.match(/\/dp\/([A-Z0-9]{10})/) || b.match(/amz\(\s*'([A-Z0-9]{10})'/) || [, ''])[1],
      price: Number((b.match(/\bprice:\s*([\d.]+)/) || [, 0])[1]),
      rating: Number((b.match(/rating:\s*([\d.]+)/) || [, 0])[1]),
      reviews: Number((b.match(/reviewCount:\s*(\d+)/) || [, 0])[1]),
    });
  }
}

let pages = readdirSync('app', { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(`app/${d.name}/page.tsx`))
  .map((d) => d.name)
  .filter((n) => readFileSync(`app/${n}/page.tsx`, 'utf8').includes('GiftGuideTemplate'));
if (only.length) pages = pages.filter((p) => only.includes(p));

async function profile(name) {
  const res = await fetch(`${ORIGIN}/${name}`);
  if (!res.ok) return { name, err: `HTTP ${res.status}` };
  const html = await res.text();
  // Grid order is the ItemList order, so the first entries are the leaders.
  const seen = new Set();
  const ordered = [];
  for (const m of html.matchAll(/"item":\{"@type":"Product","name":"((?:[^"\\]|\\.)*)"/g)) {
    const n = m[1].replace(/\\"/g, '"').replace(/&amp;/g, '&');
    if (!seen.has(n)) { seen.add(n); ordered.push(n); }
  }
  const rows = ordered.map((n) => ({ name: n, ...(byName.get(n) || {}) })).filter((r) => r.id);
  if (!rows.length) return { name, err: 'no products matched to catalog' };

  const prices = rows.map((r) => r.price).filter(Boolean).sort((a, b) => a - b);
  return {
    name,
    n: rows.length,
    thin: rows.filter((r) => r.reviews > 0 && r.reviews < 500).length,
    unver: rows.filter((r) => r.asin && !verified.has(r.asin)).length,
    lowRated: rows.filter((r) => r.rating > 0 && r.rating < 4.5).length,
    noAsin: rows.filter((r) => !r.asin).length,
    pMin: prices[0], pMax: prices[prices.length - 1], pMed: prices[Math.floor(prices.length / 2)],
    leaders: rows.slice(0, 5),
  };
}

const out = [];
for (let i = 0; i < pages.length; i += 6) {
  const batch = pages.slice(i, i + 6);
  out.push(...(await Promise.all(batch.map(profile))));
  process.stdout.write(`\rprofiled ${Math.min(i + 6, pages.length)}/${pages.length}`);
}
process.stdout.write('\n\n');

const ok = out.filter((r) => !r.err);
const pct = (a, b) => Math.round((a / b) * 100);

console.log('page                                  n   thin%  unver%  <4.5  noASIN  price range');
console.log('-'.repeat(94));
ok.sort((a, b) => pct(b.thin, b.n) - pct(a.thin, a.n)).forEach((r) => {
  console.log(
    `${r.name.padEnd(36)} ${String(r.n).padStart(3)}  ${String(pct(r.thin, r.n)).padStart(4)}%  ${String(pct(r.unver, r.n)).padStart(5)}%  ${String(r.lowRated).padStart(4)}  ${String(r.noAsin).padStart(6)}  $${r.pMin} - $${r.pMax} (med $${r.pMed})`,
  );
});

const errs = out.filter((r) => r.err);
if (errs.length) {
  console.log('\nfailed:');
  errs.forEach((r) => console.log(`  ${r.name.padEnd(36)} ${r.err}`));
}

if (only.length) {
  console.log('\n=== what leads each page ===');
  ok.forEach((r) => {
    console.log(`\n${r.name}`);
    r.leaders.forEach((l, i) =>
      console.log(`  ${i + 1}. ${(l.rating + '/' + l.reviews).padEnd(14)} $${String(l.price).padEnd(8)} ${l.name.slice(0, 44)}`));
  });
}
