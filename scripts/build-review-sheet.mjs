// Build a static image-review contact sheet so a human can flag wrong images.
//
// AI-generated product images are unreliable for *specific branded* items, and
// "wrongness" needs eyes. This renders every product (image + name + id +
// where the current image came from) in a grid with flag toggles. Flag the bad
// ones, hit "Copy re-fetch command", and paste it into the terminal.
//
// Usage:  node scripts/build-review-sheet.mjs            (products.ts + catalog)
// Output: image-review.html  (open in a browser; gitignored)

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
const OUT = path.join(ROOT, 'image-review.html');
const SOURCES_LOG = path.join(ROOT, 'data', 'image-sources.json');

function parseProducts(file, tag) {
  if (!existsSync(file)) return [];
  const text = readFileSync(file, 'utf8');
  const re = /\b(id|name|image):\s*['"]([^'"]*)['"]/g;
  const records = [];
  let cur = null, m;
  while ((m = re.exec(text))) {
    const [, key, value] = m;
    if (key === 'id') { cur = { id: value, name: '', image: '', src: tag }; records.push(cur); }
    else if (cur && key === 'name' && !cur.name) cur.name = value;
    else if (cur && key === 'image' && cur.image === '') cur.image = value;
  }
  return records.filter((r) => r.id && r.name);
}

let products = parseProducts(path.join(ROOT, 'data', 'products.ts'), 'products');
const catalog = parseProducts(path.join(ROOT, 'data', 'products-catalog.ts'), 'catalog');
const seen = new Set(products.map((p) => p.id));
for (const c of catalog) if (!seen.has(c.id)) { products.push(c); seen.add(c.id); }

const sources = existsSync(SOURCES_LOG) ? JSON.parse(readFileSync(SOURCES_LOG, 'utf8')) : {};

const cards = products.map((p) => {
  const s = sources[p.id];
  const imgSrc = p.image && p.image.startsWith('/images/') ? `public${p.image}` : `public/images/products/${p.id}.jpg`;
  const origin = s ? s.domain : 'AI / original';
  const sourced = s ? '1' : '0';
  return `<label class="card" data-id="${p.id}" data-sourced="${sourced}" data-name="${p.name.replace(/"/g, '&quot;').toLowerCase()}">
    <input type="checkbox" class="flag">
    <img loading="lazy" src="${imgSrc}" onerror="this.classList.add('broken')">
    <div class="meta"><div class="nm">${p.name.replace(/</g, '&lt;')}</div>
    <div class="id">${p.id}</div><div class="org ${s ? 'real' : 'ai'}">${origin}</div></div>
  </label>`;
}).join('\n');

const html = `<!doctype html><html><head><meta charset="utf8">
<title>GiftShuffle image review (${products.length})</title>
<style>
 :root{font-family:system-ui,Segoe UI,Roboto,sans-serif}
 body{margin:0;background:#f3f4f6;color:#111}
 .bar{position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid #e5e7eb;padding:10px 14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;box-shadow:0 1px 4px rgba(0,0,0,.06)}
 .bar input[type=text]{padding:7px 10px;border:1px solid #d1d5db;border-radius:8px;min-width:220px}
 .bar button{padding:7px 12px;border:1px solid #d1d5db;background:#fff;border-radius:8px;cursor:pointer;font-weight:600}
 .bar button.primary{background:#ef4444;color:#fff;border-color:#ef4444}
 .bar .count{font-weight:700}
 label.lbl{display:flex;align-items:center;gap:5px;font-size:13px;color:#374151}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;padding:14px}
 .card{background:#fff;border:2px solid #e5e7eb;border-radius:10px;overflow:hidden;cursor:pointer;position:relative;display:block}
 .card input.flag{position:absolute;top:8px;left:8px;width:20px;height:20px;z-index:2;cursor:pointer}
 .card img{width:100%;aspect-ratio:1;object-fit:contain;background:#fff;display:block}
 .card img.broken{outline:2px dashed #f59e0b}
 .card.flagged{border-color:#ef4444;box-shadow:0 0 0 2px #ef4444 inset}
 .meta{padding:7px 8px;font-size:12px}
 .nm{font-weight:600;line-height:1.2;max-height:2.4em;overflow:hidden}
 .id{color:#6b7280;font-family:ui-monospace,monospace;font-size:11px;margin-top:3px}
 .org{font-size:10px;margin-top:2px;display:inline-block;padding:1px 5px;border-radius:4px}
 .org.real{background:#dcfce7;color:#166534}.org.ai{background:#fef3c7;color:#92400e}
 .cmd{font-family:ui-monospace,monospace;font-size:11px;color:#374151;background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:4px 8px;max-width:420px;overflow:auto;white-space:nowrap}
</style></head><body>
<div class="bar">
 <strong>Image review</strong>
 <span class="count"><span id="flagN">0</span> flagged</span> / ${products.length}
 <input id="q" type="text" placeholder="filter by name or id…">
 <label class="lbl"><input type="checkbox" id="aiOnly"> only AI/original (likely wrong)</label>
 <label class="lbl"><input type="checkbox" id="flaggedOnly"> only flagged</label>
 <button id="copyCmd" class="primary">Copy re-fetch command</button>
 <button id="copyIds">Copy IDs</button>
 <button id="clear">Clear</button>
 <span id="cmd" class="cmd"></span>
</div>
<div class="grid" id="grid">${cards}</div>
<script>
const KEY='giftshuffle-flags';
const grid=document.getElementById('grid');
let flags=new Set(JSON.parse(localStorage.getItem(KEY)||'[]'));
function paint(){
  document.querySelectorAll('.card').forEach(c=>{
    const on=flags.has(c.dataset.id);
    c.classList.toggle('flagged',on);
    c.querySelector('.flag').checked=on;
  });
  document.getElementById('flagN').textContent=flags.size;
  const ids=[...flags].join(',');
  document.getElementById('cmd').textContent=ids?('node scripts/fetch-real-images.mjs --ids '+ids):'(flag some images)';
  localStorage.setItem(KEY,JSON.stringify([...flags]));
}
grid.addEventListener('change',e=>{
  if(!e.target.classList.contains('flag'))return;
  const id=e.target.closest('.card').dataset.id;
  e.target.checked?flags.add(id):flags.delete(id);
  paint();
});
function applyFilter(){
  const q=document.getElementById('q').value.toLowerCase();
  const ai=document.getElementById('aiOnly').checked;
  const fo=document.getElementById('flaggedOnly').checked;
  document.querySelectorAll('.card').forEach(c=>{
    let show=(c.dataset.name.includes(q)||c.dataset.id.includes(q));
    if(ai&&c.dataset.sourced==='1')show=false;
    if(fo&&!flags.has(c.dataset.id))show=false;
    c.style.display=show?'':'none';
  });
}
['q','aiOnly','flaggedOnly'].forEach(id=>document.getElementById(id).addEventListener('input',applyFilter));
document.getElementById('copyCmd').onclick=()=>{const ids=[...flags].join(',');navigator.clipboard.writeText('node scripts/fetch-real-images.mjs --ids '+ids);};
document.getElementById('copyIds').onclick=()=>navigator.clipboard.writeText([...flags].join(','));
document.getElementById('clear').onclick=()=>{if(confirm('Clear all flags?')){flags.clear();paint();}};
paint();
</script></body></html>`;

writeFileSync(OUT, html);
console.log(`wrote ${OUT}`);
console.log(`${products.length} products  (${Object.keys(sources).length} already SERP-sourced, ${products.length - Object.keys(sources).length} AI/original)`);
