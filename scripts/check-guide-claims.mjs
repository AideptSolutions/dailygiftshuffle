// Audit every guide page for the two defects found on /best-anniversary-gifts-2026.
//
// 1. COUNT CLAIM. Titles and headings promise a number ("72 Top-Rated Picks",
//    "30 Romantic Picks"). That number is baked into the <title>, the meta
//    description and the OG tags, so it is what a searcher sees in the result
//    snippet before they click. The anniversary page promised 30 and rendered
//    19. A shopper who counts feels misled, and the snippet is simply wrong.
//
// 2. POOL STARVATION. curate() defaults to the RECIPIENT pool (data/products.ts
//    only). A page that leaves the default takes whatever that catalog happens
//    to hold and silently renders short. Anniversary could reach 19 products
//    when 53 were eligible in the combined pool.
//
//   node scripts/check-guide-claims.mjs                    (production)
//   ORIGIN=http://localhost:3334 node scripts/check-guide-claims.mjs
import { readFileSync, readdirSync, existsSync } from 'fs';

const ORIGIN = process.env.ORIGIN || 'https://www.thegiftshuffle.com';
const CONCURRENCY = 6;

// Numbers that are part of the subject, not a promise about list length.
const NOT_A_COUNT = /\b(2026|2025|30th|40th|50th|60th|18th|21st|16th|100|200|500)\b/;

function claimFrom(text) {
  // "72 Top-Rated Picks", "30 Romantic Picks", "45 Gift Ideas"
  const m = text.match(/\b(\d{1,3})\s+(?:top-rated\s+|romantic\s+|great\s+|best\s+|thoughtful\s+|unique\s+)?(?:picks|gifts|gift ideas|ideas|finds)\b/i);
  if (!m) return null;
  if (NOT_A_COUNT.test(m[0])) return null;
  return { n: Number(m[1]), phrase: m[0].trim() };
}

const pages = readdirSync('app', { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(`app/${d.name}/page.tsx`))
  .map((d) => d.name)
  .filter((n) => readFileSync(`app/${n}/page.tsx`, 'utf8').includes('GiftGuideTemplate'));

const jobs = pages.map((name) => {
  const src = readFileSync(`app/${name}/page.tsx`, 'utf8');
  const title = (src.match(/title:\s*'((?:[^'\\]|\\.)*)'/) || [, ''])[1];
  const grid = (src.match(/gridHeading="([^"]*)"/) || [, ''])[1];
  const h1 = (src.match(/h1="([^"]*)"/) || [, ''])[1];
  // A page whose count is interpolated from grid.length cannot go stale, so it
  // is reported as derived rather than counted as "no claim".
  const derived = /\$\{grid\.length\}/.test(src);
  return {
    name,
    derived,
    claim: derived ? null : (claimFrom(title) || claimFrom(grid) || claimFrom(h1)),
    // curate() with no explicit pool falls back to RECIPIENT
    recipientOnly: /curate\(\{/.test(src) && !/pool:\s*ALL/.test(src),
    hasSteering: /preferTags/.test(src),
  };
});

async function rendered(name) {
  try {
    const res = await fetch(`${ORIGIN}/${name}`);
    if (!res.ok) return { err: `HTTP ${res.status}` };
    const html = await res.text();
    const names = [...html.matchAll(/"item":\{"@type":"Product","name":"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
    return { count: new Set(names).size };
  } catch (e) {
    return { err: String(e.message || e).slice(0, 40) };
  }
}

const results = [];
for (let i = 0; i < jobs.length; i += CONCURRENCY) {
  const batch = jobs.slice(i, i + CONCURRENCY);
  const got = await Promise.all(batch.map((j) => rendered(j.name)));
  batch.forEach((j, k) => results.push({ ...j, ...got[k] }));
  process.stdout.write(`\rchecked ${Math.min(i + CONCURRENCY, jobs.length)}/${jobs.length}`);
}
process.stdout.write('\n\n');

const mismatched = results.filter((r) => r.claim && r.count != null && r.count !== r.claim.n);
const matched = results.filter((r) => r.claim && r.count === r.claim.n);
const derivedPages = results.filter((r) => r.derived);
const noClaim = results.filter((r) => !r.claim && !r.derived);
const errored = results.filter((r) => r.err);

console.log(`guide pages: ${results.length}   with a static count claim: ${matched.length + mismatched.length}`);
console.log(`claim matches what renders: ${matched.length}`);
console.log(`count derived from grid.length (cannot go stale): ${derivedPages.length}`);
console.log(`CLAIM DOES NOT MATCH:       ${mismatched.length}`);
if (errored.length) console.log(`could not fetch:            ${errored.length}`);

if (mismatched.length) {
  console.log('\n=== count claim vs reality ===');
  mismatched
    .sort((a, b) => (b.claim.n - b.count) - (a.claim.n - a.count))
    .forEach((r) => {
      const gap = r.count - r.claim.n;
      console.log(`  ${r.name.padEnd(34)} promises ${String(r.claim.n).padStart(3)}  renders ${String(r.count).padStart(3)}  ${gap > 0 ? '+' : ''}${gap}   "${r.claim.phrase}"`);
    });
}

const starved = results.filter((r) => r.recipientOnly);
if (starved.length) {
  console.log('\n=== drawing from the recipient pool only (may render short) ===');
  starved.forEach((r) => console.log(`  ${r.name.padEnd(34)} renders ${String(r.count ?? '?').padStart(3)}${r.claim ? `  promises ${r.claim.n}` : ''}`));
}

if (errored.length) {
  console.log('\n=== fetch failed ===');
  errored.forEach((r) => console.log(`  ${r.name.padEnd(34)} ${r.err}`));
}
