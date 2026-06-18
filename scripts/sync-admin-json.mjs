// Regenerate data/admin-products.json from the LIVE Redis admin set.
// The committed JSON fallback is stale: ~20 products have placeholder
// name:"Amazon.com" while Redis holds the real names. This re-dumps Redis
// (read-only GET) into the JSON, and comma-swaps em dashes in name/description/
// why so the fallback is also em-dash clean. No Redis write.
//
// Run: node scripts/sync-admin-json.mjs   (add --dry-run to preview counts)

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
const env = {};
for (const ef of ['.env.all', '.env.local']) {
  try { for (const line of readFileSync(path.join(ROOT, ef), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
  } } catch {}
}
const RURL = env.UPSTASH_REDIS_REST_URL, RTOK = env.UPSTASH_REDIS_REST_TOKEN;
const DASH = '—';
const DRY = process.argv.includes('--dry-run');
const re = new RegExp('\\s*' + DASH + '\\s*', 'g');
const swap = (s) => typeof s === 'string' ? s.replace(re, ', ') : s;

async function redisGet() {
  const r = await fetch(RURL, { method: 'POST', headers: { Authorization: 'Bearer ' + RTOK, 'Content-Type': 'application/json' }, body: JSON.stringify(['GET', 'admin:products']) });
  return JSON.parse((await r.json()).result);
}

const out = path.join(ROOT, 'data', 'admin-products.json');
const oldJson = JSON.parse(readFileSync(out, 'utf8'));
const live = await redisGet();

const oldAmazon = oldJson.filter((p) => p.name === 'Amazon.com').length;
let emFixed = 0;
for (const p of live) {
  for (const f of ['name', 'description', 'why']) {
    if (typeof p[f] === 'string' && p[f].includes(DASH)) { p[f] = swap(p[f]); emFixed++; }
  }
}
const newAmazon = live.filter((p) => p.name === 'Amazon.com').length;

console.log(`old JSON: ${oldJson.length} products, ${oldAmazon} named "Amazon.com"`);
console.log(`live Redis: ${live.length} products, ${newAmazon} named "Amazon.com", em dashes fixed: ${emFixed}`);
if (!DRY) { writeFileSync(out, JSON.stringify(live, null, 2)); console.log('wrote data/admin-products.json from live Redis'); }
else console.log('(dry-run, nothing written)');
