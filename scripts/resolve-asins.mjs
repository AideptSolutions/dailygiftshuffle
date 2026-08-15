// Resolve real Amazon ASINs for catalog entries that currently link to an
// Amazon *search* page. Search links still carry the associate tag, but they
// drop the shopper on a results page instead of the product (worse conversion)
// and have no ASIN, so the click dashboard cannot name them (see CLAUDE.md).
//
// Unlike enrich-products.mjs this does NOT touch images: these products are
// already in the catalog with reviewed artwork. It only finds the ASIN and
// reports the live price/rating so obviously-wrong entries can be spotted.
//
// Input:  scripts/_relink-input.json  = [{ id, name }, ...]
// Output: scripts/_relink-resolved.json
// Usage:  node scripts/resolve-asins.mjs [in.json] [out.json]

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
if (!KEY) { console.error('SERPER_API_KEY missing'); process.exit(1); }

async function serper(endpoint, q, extra = {}) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch('https://google.serper.dev/' + endpoint, {
        method: 'POST',
        headers: { 'X-API-KEY': KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q, gl: 'us', ...extra }),
      });
      if (r.ok) return r.json();
      if (r.status < 500) throw new Error(`${endpoint} ${r.status}`);
    } catch (e) {
      if (attempt === 2) throw e;
    }
    await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
  }
  throw new Error(`${endpoint} failed`);
}

function extractAsin(...urls) {
  for (const u of urls) {
    const s = String(u || '');
    if (!/amazon\./i.test(s)) continue;
    const m = s.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/);
    if (m) return m[1];
    const m2 = s.match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
    if (m2 && /^B0/.test(m2[1])) return m2[1];
  }
  return null;
}

// Guard against grabbing an ASIN for a different product: require that the
// result title shares the distinctive words of the product name.
const STOP = new Set(['the','a','an','and','with','for','of','set','pack','kit','pro','plus','piece','count','inch','oz','in','x']);
const words = (s) => new Set(String(s).toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)));
function titleOverlap(name, title) {
  const a = words(name), b = words(title);
  if (!a.size || !b.size) return 0;
  let hit = 0;
  for (const w of a) if (b.has(w)) hit++;
  return hit / a.size;
}

const inFile = process.argv[2] || path.join(ROOT, 'scripts', '_relink-input.json');
const outFile = process.argv[3] || path.join(ROOT, 'scripts', '_relink-resolved.json');
const items = JSON.parse(readFileSync(inFile, 'utf8'));
const out = [];
let i = 0;

for (const it of items) {
  i++;
  const rec = { id: it.id, name: it.name, asin: null, matchTitle: null, overlap: 0, price: null, priceDisplay: null, rating: null, reviewCount: null, notes: [] };
  try {
    // 1) shopping results: best source of price + an Amazon product link
    const shop = await serper('shopping', it.name);
    const list = shop.shopping || [];
    const amazonRes = list.find((x) => /amazon/i.test(x.source || '') || /amazon/i.test(x.link || ''));
    const rated = list.find((x) => x.rating && Number(x.ratingCount || 0) >= 5);
    const priceRes = amazonRes || rated || list[0];
    if (priceRes?.price) {
      rec.priceDisplay = String(priceRes.price);
      rec.price = parseFloat(String(priceRes.price).replace(/[^0-9.]/g, '')) || null;
    }
    const rr = rated || amazonRes;
    if (rr?.rating) rec.rating = Number(rr.rating);
    if (rr?.ratingCount) rec.reviewCount = Number(String(rr.ratingCount).replace(/[^0-9]/g, ''));
    if (amazonRes) {
      const a = extractAsin(amazonRes.link, amazonRes.productLink);
      if (a) { rec.asin = a; rec.matchTitle = amazonRes.title || null; }
    }

    // 2) fall back to organic search, keeping only a result whose title
    //    actually looks like this product
    if (!rec.asin) {
      const sr = await serper('search', `${it.name} site:amazon.com`);
      for (const o of sr.organic || []) {
        const a = extractAsin(o.link);
        if (!a) continue;
        const ov = titleOverlap(it.name, o.title || '');
        if (ov >= 0.34) { rec.asin = a; rec.matchTitle = o.title; rec.overlap = Number(ov.toFixed(2)); break; }
        if (!rec.notes.length) rec.notes.push(`rejected ${a} overlap=${ov.toFixed(2)}`);
      }
    }
    if (rec.asin && !rec.overlap && rec.matchTitle) {
      rec.overlap = Number(titleOverlap(it.name, rec.matchTitle).toFixed(2));
    }
  } catch (e) {
    rec.notes.push(String(e.message || e).slice(0, 60));
  }
  out.push(rec);
  const flag = !rec.asin ? 'NO-ASIN' : rec.overlap < 0.34 ? 'LOW-MATCH' : 'ok';
  console.log(`[${String(i).padStart(3)}/${items.length}] ${rec.id.padEnd(24)} ${(rec.asin || '----------')}  ov=${rec.overlap}  ${(rec.priceDisplay || '?').padEnd(9)} ${flag}`);
  await new Promise((r) => setTimeout(r, 180));
}

writeFileSync(outFile, JSON.stringify(out, null, 2));
const okCount = out.filter((r) => r.asin && r.overlap >= 0.34).length;
console.log(`\nresolved ${okCount}/${out.length} with a confident ASIN match`);
console.log(`wrote ${outFile}`);
