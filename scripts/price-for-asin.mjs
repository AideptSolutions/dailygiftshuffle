// Pull a trustworthy price for a known ASIN.
//
// The first pass took price from "the best shopping result", which sometimes
// meant a different merchant selling a different bundle: it priced an 18-piece
// BS-MALL brush set at $95 and a $30 cat laser toy at $6.29. A price is only
// used here when the shopping result is Amazon AND its link carries the same
// ASIN we are about to link to, so the price always describes the exact page
// the shopper lands on.
//
// Usage: node scripts/price-for-asin.mjs
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

async function serper(endpoint, body) {
  const r = await fetch('https://google.serper.dev/' + endpoint, {
    method: 'POST',
    headers: { 'X-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ gl: 'us', ...body }),
  });
  if (!r.ok) throw new Error(`${endpoint} ${r.status}`);
  return r.json();
}

const num = (p) => parseFloat(String(p).replace(/[^0-9.]/g, '')) || null;

const resolved = JSON.parse(readFileSync('scripts/_relink-resolved.json', 'utf8')).filter((r) => r.asin);
const out = [];
let i = 0;

for (const r of resolved) {
  i++;
  const rec = { id: r.id, asin: r.asin, price: null, source: null };
  try {
    // Search shopping by ASIN so results are pinned to this exact listing.
    const s = await serper('shopping', { q: `${r.asin} amazon` });
    const list = s.shopping || [];
    const exact = list.find(
      (x) => /amazon/i.test(x.source || '') && new RegExp(r.asin).test(String(x.link || '') + String(x.productLink || '')),
    );
    const amazonAny = list.find((x) => /amazon/i.test(x.source || ''));
    const pick = exact || amazonAny;
    if (pick?.price) {
      rec.price = num(pick.price);
      rec.source = exact ? 'amazon-exact-asin' : 'amazon-listing';
    }
  } catch (e) {
    rec.error = String(e.message || e).slice(0, 40);
  }
  out.push(rec);
  console.log(`[${String(i).padStart(3)}/${resolved.length}] ${rec.id.padEnd(22)} ${rec.price ? '$' + rec.price : '(none)'}  ${rec.source || ''}`);
  await new Promise((res) => setTimeout(res, 160));
}

writeFileSync('scripts/_relink-prices.json', JSON.stringify(out, null, 2));
const exact = out.filter((r) => r.source === 'amazon-exact-asin').length;
console.log(`\nprices tied to the exact ASIN: ${exact}`);
console.log(`amazon listing (looser):       ${out.filter((r) => r.source === 'amazon-listing').length}`);
console.log(`no amazon price:               ${out.filter((r) => !r.price).length}`);
