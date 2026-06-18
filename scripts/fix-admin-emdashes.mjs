// Strip em dashes from live Redis admin product text (name/description/why).
// Page text and the static catalog are already clean and deployed; this is the
// last source of em dashes (admin products rendered in the shuffle).
//
// Operates ONLY on the live Redis values (the real product names). The JSON
// fallback is stale/corrupted (placeholder "Amazon.com" names) so it is NOT used.
// Replaces each em dash with a comma, which is grammatically safe for the
// appositive/list usage in these product names and descriptions.
//
// Writes live Redis (SET admin:products) — needs explicit authorization.
// Run:  node scripts/fix-admin-emdashes.mjs   (add --dry-run to preview)

import { readFileSync } from 'fs';
import path from 'path';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
const env = {};
for (const ef of ['.env.all', '.env.local']) {
  try { for (const line of readFileSync(path.join(ROOT, ef), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
  } } catch {}
}
const RURL = env.UPSTASH_REDIS_REST_URL, RTOK = env.UPSTASH_REDIS_REST_TOKEN, KEY = 'admin:products';
const DASH = '—';
const DRY = process.argv.includes('--dry-run');
async function redis(cmd) {
  const r = await fetch(RURL, { method: 'POST', headers: { Authorization: 'Bearer ' + RTOK, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  return (await r.json()).result;
}

const re = new RegExp('\\s*' + DASH + '\\s*', 'g');
const swap = (s) => typeof s === 'string' ? s.replace(re, ', ') : s;

const products = JSON.parse(await redis(['GET', KEY]));
let changed = 0;
for (const p of products) {
  for (const f of ['name', 'description', 'why']) {
    if (typeof p[f] === 'string' && p[f].includes(DASH)) {
      const before = p[f]; p[f] = swap(p[f]);
      if (before !== p[f]) { changed++; if (DRY) console.log(`${p.id}.${f}: "${before.slice(0,45)}" -> "${p[f].slice(0,45)}"`); }
    }
  }
}
console.log(`\n${changed} fields ${DRY ? 'would be' : ''} fixed`);
if (!DRY && changed) { await redis(['SET', KEY, JSON.stringify(products)]); console.log('Redis updated.'); }
