// Re-price catalog entries from Amazon shopping results, recording WHERE each
// price came from so untrustworthy ones can be discarded.
//
// The first pass silently fell back to non-Amazon merchants when Amazon had no
// shopping result, which produced nonsense (a $12 brush set priced at $95, a
// $30 cat toy at $6.29). Here a price is only reported when the shopping
// result's source/link is Amazon.
//
// Usage: node scripts/price-check.mjs [in.json] [out.json]
//   in.json entries need { id, name }.
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
for (const ef of ['.env.all', '.env.local']) {
  try {
    for (const line of readFileSync(path.join(ROOT, ef), 'utf8').split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
    }
  } catch {}
}
const KEY = process.env.SERPER_API_KEY;

async function serper(body) {
  const r = await fetch('https://google.serper.dev/shopping', {
    method: 'POST',
    headers: { 'X-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ gl: 'us', ...body }),
  });
  if (!r.ok) throw new Error(`shopping ${r.status}`);
  return r.json();
}

const num = (p) => parseFloat(String(p).replace(/[^0-9.]/g, '')) || null;
const isAmazon = (x) => /amazon/i.test(x.source || '') || /amazon\.com/i.test(x.link || '');

const inFile = process.argv[2] || 'scripts/_relink-verified.json';
const outFile = process.argv[3] || 'scripts/_price-check.json';
// Query by the REAL Amazon title where we have one: it is what Amazon's own
// listing is called, so shopping matches it far more reliably than our copy.
const items = JSON.parse(readFileSync(inFile, 'utf8')).map((r) => ({
  id: r.id, query: r.liveTitle || r.name, name: r.name,
}));

const out = [];
let i = 0;
for (const it of items) {
  i++;
  const rec = { id: it.id, name: it.name, query: it.query, price: null, source: null, amazonPrices: [] };
  try {
    const s = await serper({ q: it.query });
    const amz = (s.shopping || []).filter(isAmazon).map((x) => num(x.price)).filter(Boolean);
    rec.amazonPrices = amz;
    if (amz.length) {
      // Median of the Amazon quotes: resistant to one bundle/renewed outlier.
      const sorted = [...amz].sort((a, b) => a - b);
      rec.price = sorted[Math.floor(sorted.length / 2)];
      rec.source = `amazon x${amz.length}`;
    }
  } catch (e) {
    rec.error = String(e.message || e).slice(0, 40);
  }
  out.push(rec);
  console.log(`[${String(i).padStart(3)}/${items.length}] ${rec.id.padEnd(22)} ${rec.price ? '$' + rec.price : '(no amazon price)'}  ${rec.amazonPrices.length ? '[' + rec.amazonPrices.join(', ') + ']' : ''}`);
  await new Promise((r) => setTimeout(r, 160));
}

writeFileSync(outFile, JSON.stringify(out, null, 2));
console.log(`\nwith an Amazon price: ${out.filter((r) => r.price).length}/${out.length}`);
console.log(`wrote ${outFile}`);
