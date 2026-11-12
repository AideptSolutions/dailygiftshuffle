// The daily price refresh. Run by .github/workflows/refresh-prices.yml, or by
// hand: `npm run prices:refresh` (add `-- --dry` to fetch and report without
// writing anything).
//
// What it does:
//   1. reads every Amazon product ID in the three catalog files
//   2. asks the Creators API for today's price, 10 products a call, through
//      the guarded client in scripts/lib/creators-api.mjs (paced, capped,
//      stops dead on a throttle)
//   3. stores the prices in Redis under `prices:live` with a 24-hour expiry
//   4. writes data/prices-stamp.json (counts and times only, no Amazon data);
//      committing that file is what triggers the daily deploy, and the build
//      then pulls the prices out of Redis (scripts/pull-prices.mjs)
//
// Why Redis and not a file in the repo: Amazon's license allows its price data
// to be kept for 24 hours at most. Redis forgets it on its own; git never does.
//
// A price is NOT stored when the API returns none (no current offer), when the
// product is not served by the API, or when the number looks wrong (under 50
// cents, or more than 4 times / less than a quarter of the catalog's last
// known price). Those products show "See price on Amazon".

import { readFileSync, writeFileSync } from 'fs';
import { getAllItems, loadEnv, apiUsage, callsNeeded } from './lib/creators-api.mjs';

const DRY = process.argv.includes('--dry');
const KEY = 'prices:live';
const TTL_SECONDS = 24 * 60 * 60;
const MAX_AGE_MS = TTL_SECONDS * 1000;
const STAMP = 'data/prices-stamp.json';
// The three catalog files, plus the one page that keeps its own product list.
const FILES = ['data/products.ts', 'data/products-catalog.ts', 'data/seasonal-products.ts', 'app/tech-gadgets/page.tsx'];

loadEnv();
// GitHub Actions has no .env.all; locally the Redis keys live in .env.local.
function env(name) {
  if (process.env[name]) return process.env[name];
  try {
    for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
      const m = line.trim().match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && m[1] === name) return m[2].replace(/^["']|["']$/g, '').trim();
    }
  } catch { /* no local file */ }
  return '';
}
const REDIS_URL = env('UPSTASH_REDIS_REST_URL');
const REDIS_TOKEN = env('UPSTASH_REDIS_REST_TOKEN');

async function redis(path, init = {}) {
  const res = await fetch(`${REDIS_URL}/${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, ...(init.headers || {}) },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Redis answered ${res.status}`);
  return (await res.json()).result;
}

// ---- 1. the catalog -------------------------------------------------------
const catalog = new Map(); // asin -> { ids: [], lastKnown }
for (const f of FILES) {
  const t = readFileSync(f, 'utf8');
  const ids = [...t.matchAll(/\bid:\s*(['"])((?:\\.|(?!\1).)*)\1/g)];
  for (let i = 0; i < ids.length; i++) {
    const block = t.slice(ids[i].index, i + 1 < ids.length ? ids[i + 1].index : t.length);
    const asin = (block.match(/\/dp\/([A-Z0-9]{10})/) || block.match(/amz\(\s*['"]([A-Z0-9]{10})['"]/) || [])[1];
    if (!asin) continue;
    const lastKnown = Number((block.match(/\bprice:\s*([\d.]+)/) || [])[1]) || 0;
    const entry = catalog.get(asin) || { ids: [], lastKnown };
    entry.ids.push(ids[i][2]);
    catalog.set(asin, entry);
  }
}
const asins = [...catalog.keys()];
const usage = apiUsage();
console.log(`catalog: ${asins.length} product IDs, ${callsNeeded(asins.length)} calls needed; ${usage.usedLast24h} used in the last 24 hours (cap ${usage.cap})`);

if (!DRY && (!REDIS_URL || !REDIS_TOKEN)) {
  console.error('No Redis credentials (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN). Nothing fetched.');
  process.exit(1);
}

// ---- 2. Amazon ------------------------------------------------------------
let result;
let apiError = '';
try {
  result = await getAllItems(asins, {
    resources: ['offersV2.listings.price'],
    onBatch: (done, total) => { if (done % 200 === 0 || done === total) console.log(`  fetched ${done} of ${total}`); },
  });
} catch (e) {
  apiError = `${e.name}: ${e.message}`.slice(0, 300);
  result = { data: new Map(), failures: [], stopped: apiError, remaining: asins };
}
const now = new Date();
const nowIso = now.toISOString();
const notFetched = new Set(result.remaining || []);

const prices = {};
const counts = { priced: 0, noOffer: 0, notReturned: 0, suspect: 0, notFetched: notFetched.size };
const suspectIds = [];
for (const asin of asins) {
  if (notFetched.has(asin)) continue;
  const item = result.data.get(asin);
  if (!item) { counts.notReturned++; continue; }
  const price = Number(item.price);
  if (!Number.isFinite(price) || item.price == null) { counts.noOffer++; continue; }
  const last = catalog.get(asin).lastKnown;
  const ratio = last > 0 ? price / last : 1;
  if (price < 0.5 || ratio > 4 || ratio < 0.25) {
    counts.suspect++;
    suspectIds.push(catalog.get(asin).ids[0]);
    continue;
  }
  prices[asin] = [Math.round(price * 100) / 100, nowIso];
  counts.priced++;
}

// A run that was cut short keeps the still-fresh prices it could not re-check.
let carried = 0;
if (notFetched.size && REDIS_URL && REDIS_TOKEN) {
  try {
    const prev = JSON.parse((await redis(`get/${KEY}`)) || 'null');
    for (const asin of notFetched) {
      const old = prev?.prices?.[asin];
      if (old && now.getTime() - Date.parse(old[1]) < MAX_AGE_MS) { prices[asin] = old; carried++; }
    }
  } catch (e) { console.log(`  could not read the previous prices: ${e.message}`); }
}

console.log(`priced ${counts.priced} | no current offer ${counts.noOffer} | not served by the API ${counts.notReturned} | looked wrong and skipped ${counts.suspect} | not fetched ${counts.notFetched} (kept from the last run: ${carried})`);
if (suspectIds.length) console.log(`  skipped as suspect: ${suspectIds.join(' ')}`);
if (result.stopped) console.log(`  stopped early: ${String(result.stopped).slice(0, 200)}`);

// ---- 3 and 4. store, stamp ------------------------------------------------
const ok = counts.priced > 0;
if (DRY) {
  console.log('dry run: nothing written');
  process.exit(ok ? 0 : 1);
}
if (ok) {
  // Earliest expiry of anything carried over still fits inside 24 hours of
  // its own fetch time, because pull-prices and <Price> both check each
  // price's own time stamp.
  await redis(`set/${KEY}?EX=${TTL_SECONDS}`, {
    method: 'POST',
    body: JSON.stringify({ v: 1, updatedAt: nowIso, prices }),
  });
  console.log(`stored ${Object.keys(prices).length} prices in Redis for 24 hours`);
} else {
  console.log('no prices fetched; Redis left as it was (it expires on its own)');
}
writeFileSync(STAMP, JSON.stringify({
  refreshedAt: nowIso,
  ok,
  catalogProducts: asins.length,
  ...counts,
  carriedFromLastRun: carried,
  suspectIds,
  stopped: result.stopped ? String(result.stopped).slice(0, 200) : null,
}, null, 2) + '\n');
console.log(`stamp written to ${STAMP}`);
process.exit(ok ? 0 : 1);
