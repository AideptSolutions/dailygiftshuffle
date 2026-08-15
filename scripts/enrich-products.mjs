// Enrich a list of new products for the catalog: find the real Amazon ASIN,
// price, rating, review count (Serper shopping + search) and a clean non-Amazon
// image (Serper images, self-hosted). Outputs enriched JSON for review before
// the Product objects are assembled into data/products.ts.
//
// !! WARNING: rating / reviewCount / price from this script are NOT Amazon data.
//
// Amazon does not feed Google Shopping, so the `shopping` endpoint below never
// returns an Amazon listing. The `amazonRes` lookup nearly always misses and the
// code falls through to `rated || list[0]`, i.e. Walmart, Target or whoever else
// sells the item. That silently put merchant numbers on 205 catalog entries: the
// Mario Badescu mist set was stored as 5 reviews when Amazon shows 19,626, and
// because guides rank by rating x log10(reviewCount), those picks were buried.
//
// The ASIN and image from this script are fine. For rating/reviewCount/price,
// use scripts/amazon-live-data.mjs (reads the real product page) and apply with
// scripts/apply-review-fix.mjs. The durable fix is the Amazon Product
// Advertising API once the Associates account qualifies.
//
// Input:  scripts/_new-products.json  = [{ id, name }, ...]
// Output: scripts/_enriched.json + downloaded images at public/images/products/{id}.jpg
// Usage:  node scripts/enrich-products.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { pickBestImage } from './lib/image-search.mjs';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
for (const ef of ['.env.all', '.env.local']) {
  try { for (const line of readFileSync(path.join(ROOT, ef), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
  } } catch {}
}
const KEY = process.env.SERPER_API_KEY;
async function serper(endpoint, q, extra = {}) {
  const r = await fetch('https://google.serper.dev/' + endpoint, {
    method: 'POST', headers: { 'X-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, gl: 'us', ...extra }),
  });
  if (!r.ok) throw new Error(`${endpoint} ${r.status}`);
  return r.json();
}

function extractAsin(...urls) {
  for (const u of urls) {
    const m = String(u || '').match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/);
    if (m) return m[1];
    const m2 = String(u || '').match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
    if (m2 && /^B0/.test(m2[1])) return m2[1];
  }
  return null;
}

const inFile = process.argv[2] || path.join(ROOT, 'scripts', '_new-products.json');
const outFile = process.argv[3] || path.join(ROOT, 'scripts', '_enriched.json');
const items = JSON.parse(readFileSync(inFile, 'utf8'));
const out = [];
let i = 0;
for (const it of items) {
  i++;
  const rec = { id: it.id, name: it.name, asin: null, price: null, priceDisplay: null, rating: null, reviewCount: null, image: null, imageDomain: null, notes: [] };
  try {
    // 1) shopping: pull price/asin from an Amazon listing, but take rating from
    //    whichever listing actually has one (Serper omits it on many results).
    const shop = await serper('shopping', it.name);
    const list = shop.shopping || [];
    const amazonRes = list.find((x) => /amazon/i.test(x.source || '') || /amazon/i.test(x.link || ''));
    const rated = list.find((x) => x.rating && Number(x.ratingCount || 0) >= 5);
    const priceRes = amazonRes || rated || list[0];
    if (priceRes && priceRes.price) { rec.priceDisplay = priceRes.price; rec.price = parseFloat(String(priceRes.price).replace(/[^0-9.]/g, '')) || null; }
    const rr = rated || amazonRes;
    if (rr && rr.rating) rec.rating = Number(rr.rating);
    if (rr && rr.ratingCount) rec.reviewCount = Number(String(rr.ratingCount).replace(/[^0-9]/g, ''));
    rec.asin = extractAsin(amazonRes && amazonRes.link, amazonRes && amazonRes.productLink, priceRes && priceRes.link);
    // 2) search for the Amazon ASIN explicitly
    if (!rec.asin) {
      const sr = await serper('search', it.name + ' amazon');
      const links = (sr.organic || []).map((o) => o.link);
      rec.asin = extractAsin(...links);
    }
    // 3) image (non-Amazon, self-hosted)
    const img = await serper('images', it.name, { num: 20 });
    const cands = (img.images || []).map((x) => ({ imageUrl: x.imageUrl, link: x.link, domain: (x.domain || '').replace(/^www\./, ''), width: x.imageWidth || 0, height: x.imageHeight || 0 }));
    const { best, ranked } = pickBestImage(cands, { name: it.name });
    for (const c of (best ? ranked.slice(0, 5) : [])) {
      try {
        const r = await fetch(c.imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36', Referer: c.link || `https://${c.domain}/` } });
        if (!r.ok || !(r.headers.get('content-type') || '').startsWith('image/')) continue;
        const buf = Buffer.from(await r.arrayBuffer());
        const abs = path.join(ROOT, 'public', 'images', 'products', `${it.id}.jpg`);
        mkdirSync(path.dirname(abs), { recursive: true });
        await sharp(buf).resize(800, 800, { fit: 'contain', background: { r: 255, g: 255, b: 255 } }).flatten({ background: { r: 255, g: 255, b: 255 } }).jpeg({ quality: 82, mozjpeg: true }).toFile(abs);
        rec.image = `/images/products/${it.id}.jpg`; rec.imageDomain = c.domain; break;
      } catch {}
    }
  } catch (e) { rec.notes.push(String(e.message || e).slice(0, 60)); }
  out.push(rec);
  console.log(`[${i}/${items.length}] ${it.id}  asin=${rec.asin || '??'}  ${rec.priceDisplay || '?'}  rating=${rec.rating || '?'}(${rec.reviewCount || '?'})  img=${rec.imageDomain || 'NONE'}`);
  await new Promise((r) => setTimeout(r, 200));
}
writeFileSync(outFile, JSON.stringify(out, null, 2));
console.log('\nwrote ' + outFile);
