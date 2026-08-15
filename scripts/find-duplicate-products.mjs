// Report near-duplicate products in the catalogs (same real product listed
// more than once). These are a data-quality issue from separate sourcing
// rounds, better fixed by removing the redundant entry than by loosening the
// dedup key, which would over-merge distinct products across 40+ pages.
import { readFileSync } from 'fs';

function parse(file) {
  const t = readFileSync(file, 'utf8');
  const out = [];
  const re = /id:\s*'((?:[^'\\]|\\.)*)'[\s\S]{0,200}?name:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(t))) out.push({ id: m[1], name: m[2], file: file.split('/').pop() });
  return out;
}
const all = [...parse('data/products.ts'), ...parse('data/products-catalog.ts')];

const STOP = new Set(['the','a','an','with','and','set','pack','kit','pro','plus','premium','deluxe','original','new','edition','oz','qt','inch','ct','gen','series','size','large','small','print','complete','long','multi','hd','wireless','smart','portable','mini','max','ultra','for','of']);
const sig = (n) => n.toLowerCase().replace(/\([^)]*\)/g, ' ').split(/[^a-z0-9]+/)
  .filter((t) => t && !STOP.has(t) && !/^\d/.test(t)).slice(0, 2).join(' ');

const groups = {};
for (const p of all) { const k = sig(p.name); if (k) (groups[k] = groups[k] || []).push(p); }
const dupes = Object.entries(groups).filter(([, v]) => v.length > 1);
dupes.sort((a, b) => b[1].length - a[1].length);

console.log(`potential duplicate groups: ${dupes.length}\n`);
for (const [k, v] of dupes.slice(0, 25)) {
  console.log(`[${k}]  x${v.length}`);
  v.forEach((p) => console.log(`    ${p.id.padEnd(28)} ${p.name.slice(0, 52)}`));
}

// Second, stronger pass: two entries pointing at the SAME Amazon ASIN are the
// same product by definition, whatever their names say. Name matching misses
// these because the copy was written separately for each entry.
const asinOf = (block) =>
  (block.match(/\/dp\/([A-Z0-9]{10})/) || block.match(/amz\(\s*'([A-Z0-9]{10})'/) || [, null])[1];

const byAsin = {};
for (const f of ['data/products.ts', 'data/products-catalog.ts']) {
  const t = readFileSync(f, 'utf8');
  const idMatches = [...t.matchAll(/id:\s*'((?:[^'\\]|\\.)*)'/g)];
  for (let i = 0; i < idMatches.length; i++) {
    const block = t.slice(idMatches[i].index, i + 1 < idMatches.length ? idMatches[i + 1].index : t.length);
    const a = asinOf(block);
    if (!a) continue;
    const nm = (block.match(/name:\s*'((?:[^'\\]|\\.)*)'/) || [, ''])[1];
    (byAsin[a] = byAsin[a] || []).push({ id: idMatches[i][1], name: nm });
  }
}
const asinDupes = Object.entries(byAsin).filter(([, v]) => v.length > 1);
console.log(`\n\nsame-ASIN duplicate groups (definitive): ${asinDupes.length}`);
for (const [a, v] of asinDupes) {
  console.log(`[${a}]  x${v.length}`);
  v.forEach((p) => console.log(`    ${p.id.padEnd(30)} ${p.name.slice(0, 50)}`));
}
