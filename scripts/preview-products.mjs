// Render newly-added catalog products (data/products-catalog.ts) as a local HTML
// sheet so they can be eyeballed before deploy. Shows every product whose id
// starts with one of the given prefixes.
//
// Usage: node scripts/preview-products.mjs [car- garden- ...]
// Output: new-products-preview.html  (open in a browser; gitignored)

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
const prefixes = process.argv.slice(2).length ? process.argv.slice(2)
  : ['car-', 'garden-', 'baby-', 'finance-', 'sport-', 'smart-', 'game-', 'travel-', 'wed-'];

const text = readFileSync(path.join(ROOT, 'data', 'products-catalog.ts'), 'utf8');
const get = (block, key) => {
  const m = block.match(new RegExp(key + ":\\s*['\"]([^'\"]*)['\"]"));
  return m ? m[1] : '';
};
const getNum = (block, key) => { const m = block.match(new RegExp(key + ':\\s*([0-9.]+)')); return m ? m[1] : ''; };
const getArr = (block, key) => { const m = block.match(new RegExp(key + ':\\s*\\[([^\\]]*)\\]')); return m ? m[1].replace(/['\"]/g, '') : ''; };
const getAff = (block) => {
  let m = block.match(/affiliateUrl:\s*amz\(['"]([^'"]+)['"]\)/);
  if (m) return `https://www.amazon.com/dp/${m[1]}?tag=dailygiftshuf-20`;
  m = block.match(/affiliateUrl:\s*amzSearch\(['"]([^'"]+)['"]\)/);
  if (m) return `https://www.amazon.com/s?k=${encodeURIComponent(m[1])}&tag=dailygiftshuf-20`;
  m = block.match(/affiliateUrl:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : '#';
};

const blocks = text.match(/\{[^{}]*\}/g) || [];
const products = [];
for (const b of blocks) {
  const id = get(b, 'id');
  if (!id || !prefixes.some((p) => id.startsWith(p))) continue;
  products.push({
    id, name: get(b, 'name'), description: get(b, 'description'), why: get(b, 'why'),
    priceDisplay: get(b, 'priceDisplay'), image: get(b, 'image'),
    rating: getNum(b, 'rating'), reviewCount: getNum(b, 'reviewCount'),
    affiliateUrl: getAff(b), recipients: getArr(b, 'recipients'),
    budgetTier: get(b, 'budgetTier'), tags: getArr(b, 'tags'),
  });
}

const stars = (r) => { const f = Math.round(Number(r)); return '★'.repeat(f) + '☆'.repeat(5 - f); };
const cards = products.map((p) => `
  <div class="card">
    <img loading="lazy" src="public${p.image}" onerror="this.style.opacity=.2">
    <div class="b">
      <div class="nm">${p.name}</div>
      <div class="meta"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${Number(p.reviewCount).toLocaleString()}) &middot; <b>${p.priceDisplay}</b></div>
      <div class="desc">${p.description}</div>
      ${p.why ? `<div class="why">&#10022; ${p.why}</div>` : ''}
      <div class="tags">${p.budgetTier} &middot; ${p.tags} &middot; for: ${p.recipients}</div>
      <a href="${p.affiliateUrl}" target="_blank" class="buy">Buy on Amazon &rarr;</a>
    </div>
  </div>`).join('');

const html = `<!doctype html><meta charset=utf8><title>New products preview (${products.length})</title>
<style>
 body{font-family:system-ui,Segoe UI,sans-serif;background:#FFFAF5;margin:0;padding:18px;color:#1A202C}
 h1{font-size:18px}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
 .card{background:#fff;border:1px solid #E2E8F0;border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
 .card img{width:100%;aspect-ratio:1;object-fit:contain;background:#fff;border-bottom:1px solid #f0f0f0}
 .b{padding:12px;display:flex;flex-direction:column;gap:6px}
 .nm{font-weight:700;font-size:14px;line-height:1.25}
 .meta{font-size:12px;color:#444}.stars{color:#F0C20A;letter-spacing:1px}
 .desc{font-size:12px;color:#374151;line-height:1.4}
 .why{font-size:11px;font-style:italic;color:#6b7280;border-left:2px solid #F04E30;padding-left:8px;line-height:1.4}
 .tags{font-size:10px;color:#9ca3af;font-family:ui-monospace,monospace}
 .buy{margin-top:auto;background:#F04E30;color:#fff;text-align:center;padding:8px;border-radius:999px;text-decoration:none;font-weight:700;font-size:13px}
</style>
<h1>New catalog products &mdash; ${products.length} (prefixes: ${prefixes.join(' ')})</h1>
<div class="grid">${cards}</div>`;

writeFileSync(path.join(ROOT, 'new-products-preview.html'), html);
console.log(`wrote new-products-preview.html  (${products.length} products)`);
