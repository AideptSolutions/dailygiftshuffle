// Find catalog entries whose Amazon product page no longer exists.
//
// A delisted ASIN still renders a normal-looking product card on the site, still
// gets clicked, and earns nothing. Five were found by accident in August 2026;
// this makes it a routine check.
//
// WHY THIS IS NOT A PLAIN FETCH LOOP
// ----------------------------------
// Amazon serves its bot-check page to scripted requests, and that page is a 200
// with no "not found" marker. Measured 2026-08-14 against ASINs whose state was
// already known:
//
//   GET  /dp/{asin}        every ASIN, dead or alive -> 200, 3781 bytes, bot-check
//   HEAD /dp/{asin}        every ASIN, dead or alive -> 200, empty body
//   HEAD /gp/aw/d/{asin}   every ASIN -> 405
//
// So a naive checker reports "all alive" forever and quietly rots. The only
// signals that actually work:
//
//   1. Creators API GetItems - an ASIN it does not return is delisted. Preferred,
//      needs Associates eligibility (10 qualifying sales / 30 days).
//   2. Same-origin fetch from a real signed-in amazon.com tab, which returns the
//      genuine page including "Page Not Found". Ran 203 ASINs with zero blocks.
//
// Every run validates itself against canary ASINs of known state and ABORTS if
// detection is broken, because a false "dead" verdict would replace a good link.
//
// Usage:
//   node scripts/check-dead-links.mjs --via-api          preferred, once eligible
//   node scripts/check-dead-links.mjs --emit             print the browser snippet
//   node scripts/check-dead-links.mjs --ingest <file>    report from browser output
import { readFileSync, writeFileSync } from 'fs';

// Permanently delisted (confirmed 2026-08-14) and permanently live. If a run
// does not classify these correctly, the detection method has broken.
const CANARY_DEAD = ['B07Y8TM6SW', 'B00KA2Y1OY', 'B0BPCYQ316'];
const CANARY_LIVE = ['B00FLYWNYQ', 'B00SNM5US4'];

const FILES = ['data/products.ts', 'data/products-catalog.ts'];

function catalogEntries() {
  const out = [];
  for (const f of FILES) {
    const t = readFileSync(f, 'utf8');
    const ids = [...t.matchAll(/id:\s*'((?:[^'\\]|\\.)*)'/g)];
    for (let i = 0; i < ids.length; i++) {
      const b = t.slice(ids[i].index, i + 1 < ids.length ? ids[i + 1].index : t.length);
      const asin = (b.match(/\/dp\/([A-Z0-9]{10})/) || b.match(/amz\(\s*'([A-Z0-9]{10})'/) || [, null])[1];
      if (!asin) continue;
      out.push({
        id: ids[i][1],
        asin,
        name: (b.match(/name:\s*'((?:[^'\\]|\\.)*)'/) || [, ''])[1],
        file: f.split('/').pop(),
      });
    }
  }
  return out;
}

function report(entries, deadSet, unknownSet) {
  const byAsin = {};
  for (const e of entries) (byAsin[e.asin] = byAsin[e.asin] || []).push(e);

  const dead = [...deadSet].filter((a) => byAsin[a]);
  console.log(`\n=== DEAD: ${dead.length} ASIN(s) covering ${dead.reduce((n, a) => n + byAsin[a].length, 0)} entr(y/ies) ===`);
  for (const a of dead) {
    for (const e of byAsin[a]) {
      console.log(`  ${e.id.padEnd(30)} ${a}  ${e.name.slice(0, 44)}`);
    }
  }
  if (!dead.length) console.log('  (none - every catalog ASIN still resolves)');

  if (unknownSet.size) {
    console.log(`\n=== UNRESOLVED: ${unknownSet.size} (treated as ALIVE; re-run these) ===`);
    [...unknownSet].slice(0, 20).forEach((a) => console.log(`  ${a}  ${byAsin[a]?.[0]?.id ?? ''}`));
  }

  if (dead.length) {
    writeFileSync('scripts/_dead-asins.json', JSON.stringify(
      dead.map((a) => ({ asin: a, entries: byAsin[a].map((e) => ({ id: e.id, name: e.name })) })), null, 2));
    console.log('\nwrote scripts/_dead-asins.json');
    console.log('Next: re-source each with scripts/resolve-asins.mjs, confirm the page title,');
    console.log('      then re-point the affiliateUrl. Never swap in an unverified ASIN.');
  }
  return dead.length;
}

function checkCanaries(deadSet, aliveSet) {
  const problems = [];
  for (const a of CANARY_DEAD) if (!deadSet.has(a)) problems.push(`canary ${a} is delisted but was NOT detected as dead`);
  for (const a of CANARY_LIVE) if (deadSet.has(a)) problems.push(`canary ${a} is live but WAS reported dead`);
  if (problems.length) {
    console.error('\n!! DETECTION BROKEN - refusing to report results:');
    problems.forEach((p) => console.error(`   ${p}`));
    console.error('   Amazon likely changed its markup or is serving bot-checks.');
    console.error('   Do not act on this run.');
    process.exitCode = 1;
    return false;
  }
  console.log(`canaries OK (${CANARY_DEAD.length} known-dead detected, ${CANARY_LIVE.length} known-live intact)`);
  return true;
}

// --- mode: Creators API -----------------------------------------------------
async function viaApi(entries) {
  const { loadEnv, getAllItems, getItems } = await import('./lib/creators-api.mjs');
  loadEnv();
  const asins = [...new Set([...entries.map((e) => e.asin), ...CANARY_DEAD, ...CANARY_LIVE])];

  // Probe once before spending ~90 batched calls discovering we are blocked.
  try {
    await getItems([CANARY_LIVE[0]], ['itemInfo.title']);
  } catch (e) {
    if (/AssociateNotEligible/.test(String(e.message || e))) {
      console.error('\nCreators API is not serving product data yet (AssociateNotEligible).');
      console.error('Amazon requires 10 qualifying sales in the past 30 days.');
      console.error('Use --emit and run the browser method instead.');
      process.exitCode = 1;
      return;
    }
    throw e;
  }
  console.log(`checking ${asins.length} ASINs via Creators API...`);
  const { data, failures } = await getAllItems(asins, {
    resources: ['itemInfo.title'],
    onBatch: (d, t) => process.stdout.write(`\r  ${d}/${t}`),
  });
  process.stdout.write('\n');

  // A batch-level failure tells us nothing about the individual ASINs in it.
  const inFailedBatch = new Set(failures.flatMap((f) => f.batch));
  if (failures.some((f) => /AssociateNotEligible/.test(f.error))) {
    console.error('\nCreators API is not serving product data yet (AssociateNotEligible).');
    console.error('Amazon requires 10 qualifying sales in the past 30 days.');
    console.error('Use --emit and run the browser method instead.');
    process.exitCode = 1;
    return;
  }
  const deadSet = new Set(asins.filter((a) => !data.has(a) && !inFailedBatch.has(a)));
  const aliveSet = new Set([...data.keys()]);
  if (!checkCanaries(deadSet, aliveSet)) return;
  report(entries, deadSet, inFailedBatch);
}

// --- mode: emit browser snippet --------------------------------------------
function emit(entries) {
  const asins = [...new Set([...entries.map((e) => e.asin), ...CANARY_DEAD, ...CANARY_LIVE])];
  writeFileSync('scripts/_deadlink-asins.json', JSON.stringify(asins, null, 0));
  console.log(`${asins.length} ASINs (incl. ${CANARY_DEAD.length + CANARY_LIVE.length} canaries) -> scripts/_deadlink-asins.json\n`);
  console.log('1. Open a tab on https://www.amazon.com (must be a real browsing session).');
  console.log('2. Run this in that tab, pasting the array from the file as ASINS:\n');
  console.log(`(function(){
  var ASINS = /* paste scripts/_deadlink-asins.json here */;
  window.__dl = {};
  var one = async function(a){
    try {
      var r = await fetch('/dp/' + a, { credentials: 'include' });
      var h = await r.text();
      // Classify explicitly. Anything not clearly dead or clearly a product
      // page is 'unknown' and will be re-run, never reported as dead.
      var botCheck = /api-services-support@amazon\\.com|Enter the characters you see/i.test(h);
      var notFound = /Page Not Found|Looking for something\\?/i.test(h);
      var isProduct = /id="productTitle"|"productTitle"/.test(h) || /out of 5 stars/.test(h);
      window.__dl[a] = r.status === 404 || (notFound && !isProduct) ? 'dead'
                     : (isProduct && !botCheck) ? 'alive' : 'unknown';
    } catch(e) { window.__dl[a] = 'unknown'; }
  };
  (async function(){
    for (var i = 0; i < ASINS.length; i += 5) {
      await Promise.all(ASINS.slice(i, i + 5).map(one));
    }
    window.__dlDone = true;
  })();
  return 'started: ' + ASINS.length;
})()`);
  console.log('\n3. Poll until done:  JSON.stringify({done:!!window.__dlDone,n:Object.keys(window.__dl).length})');
  console.log('4. Export:           Object.entries(window.__dl).map(function(e){return e[0]+","+e[1];}).join(";")');
  console.log('5. Save that to a file and run:  node scripts/check-dead-links.mjs --ingest <file>');
}

// --- mode: ingest browser output -------------------------------------------
function ingest(file, entries) {
  const raw = readFileSync(file, 'utf8').trim();
  const deadSet = new Set(), aliveSet = new Set(), unknownSet = new Set();
  for (const pair of raw.split(/[;\n]+/)) {
    const [asin, state] = pair.split(',').map((s) => s && s.trim());
    if (!asin || !state) continue;
    if (state === 'dead') deadSet.add(asin);
    else if (state === 'alive') aliveSet.add(asin);
    else unknownSet.add(asin);
  }
  console.log(`parsed ${deadSet.size + aliveSet.size + unknownSet.size} results  (dead ${deadSet.size}, alive ${aliveSet.size}, unknown ${unknownSet.size})`);
  const coverage = new Set([...deadSet, ...aliveSet, ...unknownSet]);
  const missing = entries.filter((e) => !coverage.has(e.asin));
  if (missing.length) console.log(`note: ${missing.length} catalog ASINs absent from this run`);
  if (!checkCanaries(deadSet, aliveSet)) return;
  report(entries, deadSet, unknownSet);
}

// --- main -------------------------------------------------------------------
const entries = catalogEntries();
console.log(`catalog entries with an ASIN: ${entries.length} (${new Set(entries.map((e) => e.asin)).size} unique)`);

const ingestArg = process.argv.indexOf('--ingest');
if (process.argv.includes('--via-api')) await viaApi(entries);
else if (ingestArg > -1) ingest(process.argv[ingestArg + 1], entries);
else if (process.argv.includes('--emit')) emit(entries);
else {
  console.log('\nPick a mode:');
  console.log('  --via-api          use the Creators API (preferred; needs eligibility)');
  console.log('  --emit             print the browser snippet + write the ASIN list');
  console.log('  --ingest <file>    report from the browser output');
}
