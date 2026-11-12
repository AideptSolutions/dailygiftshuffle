// Runs before every build and dev start (see "prebuild" and "predev" in
// package.json). Copies the live Amazon prices out of Redis into
// data/prices.generated.json, which lib/livePrices.ts lays over the catalog.
//
// It never calls Amazon and never fails the build: if Redis is unreachable or
// holds no prices, it writes an empty file and every product simply shows
// "See price on Amazon". The file is gitignored on purpose: Amazon's license
// does not allow its price data to be kept for more than 24 hours, and a git
// repo keeps everything forever.

import { existsSync, readFileSync, writeFileSync } from 'fs';

const OUT = 'data/prices.generated.json';
const KEY = 'prices:live';
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function env(name) {
  if (process.env[name]) return process.env[name];
  for (const file of ['.env.local', '.env.all']) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const m = line.trim().match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && m[1] === name) return m[2].replace(/^["']|["']$/g, '').trim();
    }
  }
  return '';
}

function write(prices, note) {
  writeFileSync(OUT, JSON.stringify({ pulledAt: new Date().toISOString(), prices }) + '\n');
  console.log(`[prices] ${note}`);
}

const url = env('UPSTASH_REDIS_REST_URL');
const token = env('UPSTASH_REDIS_REST_TOKEN');
if (!url || !token) {
  write({}, 'no Redis credentials here; products will show "See price on Amazon"');
} else {
  try {
    const res = await fetch(`${url}/get/${KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`Redis answered ${res.status}`);
    const { result } = await res.json();
    const stored = result ? JSON.parse(result) : null;
    const now = Date.now();
    const fresh = {};
    let total = 0;
    for (const [asin, entry] of Object.entries(stored?.prices ?? {})) {
      total++;
      const [price, asOf] = entry;
      if (typeof price === 'number' && price > 0 && now - Date.parse(asOf) < MAX_AGE_MS) fresh[asin] = [price, asOf];
    }
    write(
      fresh,
      total
        ? `${Object.keys(fresh).length} live prices pulled (${total - Object.keys(fresh).length} too old and dropped), last refresh ${stored.updatedAt}`
        : 'Redis holds no live prices right now; products will show "See price on Amazon"',
    );
  } catch (e) {
    write({}, `could not read prices (${e.message}); products will show "See price on Amazon"`);
  }
}
