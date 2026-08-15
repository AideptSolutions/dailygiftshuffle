// Get the real Amazon product title for an ASIN without hitting Amazon.
// Amazon blocks scripted /dp/ fetches after a handful of requests, but Google
// indexes those pages, so a Serper search for the ASIN returns the authoritative
// title. Used to confirm a resolved ASIN is actually the product we list.
//
// Usage: node scripts/title-for-asin.mjs [in.json] (reads .asin, writes titles)
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

const clean = (t) => String(t || '')
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(d))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/^Amazon\.com\s*[:\-]\s*/i, '')
  .replace(/\s*[:\-]\s*Amazon\.com.*$/i, '')
  .replace(/\s+/g, ' ').trim();

const file = process.argv[2] || 'scripts/_relink-resolved.json';
const resolved = JSON.parse(readFileSync(file, 'utf8')).filter((r) => r.asin);
let prior = [];
try { prior = JSON.parse(readFileSync('scripts/_relink-verified.json', 'utf8')); } catch {}
const have = new Map(prior.filter((r) => r.liveTitle).map((r) => [r.id, r]));

const out = [];
let i = 0;
for (const r of resolved) {
  i++;
  if (have.has(r.id)) { out.push(have.get(r.id)); continue; }
  let title = null;
  try {
    // The ASIN appears in the /dp/ URL, so searching it surfaces that exact page.
    const s = await serper('search', { q: `${r.asin} site:amazon.com` });
    const hit = (s.organic || []).find((o) => new RegExp(r.asin).test(o.link || ''));
    title = clean(hit?.title);
    if (!title) {
      const s2 = await serper('search', { q: `amazon.com/dp/${r.asin}` });
      const h2 = (s2.organic || []).find((o) => new RegExp(r.asin).test(o.link || ''));
      title = clean(h2?.title);
    }
  } catch (e) { /* leave null */ }
  out.push({ id: r.id, name: r.name, asin: r.asin, liveTitle: title || null, source: 'serper' });
  console.log(`[${String(i).padStart(3)}/${resolved.length}] ${r.id.padEnd(22)} ${r.asin}  ${title ? title.slice(0, 60) : '(no title)'}`);
  await new Promise((res) => setTimeout(res, 150));
}

writeFileSync('scripts/_relink-verified.json', JSON.stringify(out, null, 2));
console.log(`\ntitles: ${out.filter((r) => r.liveTitle).length}/${out.length}`);
