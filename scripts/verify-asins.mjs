// Verify resolved ASINs against Amazon itself: fetch /dp/<ASIN> and read the
// real product title. Serper can return a plausible-looking link for the wrong
// product (an accessory, a different brand), so the title check is what makes
// a relink safe to apply.
//
// Usage: node scripts/verify-asins.mjs scripts/_relink-resolved.json
import { readFileSync, writeFileSync } from 'fs';

const file = process.argv[2] || 'scripts/_relink-resolved.json';
let items = JSON.parse(readFileSync(file, 'utf8')).filter((r) => r.asin);

// Amazon rate-limits hard. Resume mode: keep titles already fetched and retry
// only what was blocked, at a slower pace.
const DELAY = Number(process.env.DELAY_MS || 1200);
let prior = [];
try { prior = JSON.parse(readFileSync('scripts/_relink-verified.json', 'utf8')); } catch {}
const done = new Map(prior.filter((r) => r.liveTitle).map((r) => [r.id, r]));
if (process.env.RESUME === '1') {
  items = items.filter((r) => !done.has(r.id));
  console.log(`resume: ${done.size} already verified, retrying ${items.length}\n`);
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function fetchTitle(asin) {
  const url = `https://www.amazon.com/dp/${asin}`;
  const r = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    redirect: 'follow',
  });
  const html = await r.text();
  if (/api-services-support@amazon\.com|captcha/i.test(html) && html.length < 8000) {
    return { status: r.status, title: null, blocked: true };
  }
  const m = html.match(/<span[^>]*id="productTitle"[^>]*>([\s\S]*?)<\/span>/i)
    || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  let title = m ? m[1].replace(/\s+/g, ' ').trim() : null;
  if (title) title = title.replace(/^Amazon\.com\s*:\s*/i, '').replace(/\s*:\s*(Amazon\.com|Everything Else|Home & Kitchen).*$/i, '');
  return { status: r.status, title, blocked: false };
}

const STOP = new Set(['the','a','an','and','with','for','of','set','pack','kit','pro','plus','piece','pieces','count','inch','oz','in','x','by']);
const words = (s) => new Set(String(s).toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)));
function overlap(name, title) {
  const a = words(name), b = words(title);
  if (!a.size || !b.size) return 0;
  let hit = 0;
  for (const w of a) if (b.has(w)) hit++;
  return hit / a.size;
}

const out = [];
let i = 0, blocked = 0;
for (const it of items) {
  i++;
  let rec = { id: it.id, name: it.name, asin: it.asin, liveTitle: null, liveOverlap: 0, status: 0, blocked: false };
  try {
    const r = await fetchTitle(it.asin);
    rec.status = r.status;
    rec.blocked = r.blocked;
    rec.liveTitle = r.title;
    if (r.blocked) blocked++;
    if (r.title) rec.liveOverlap = Number(overlap(it.name, r.title).toFixed(2));
  } catch (e) {
    rec.error = String(e.message || e).slice(0, 50);
  }
  out.push(rec);
  const verdict = rec.blocked ? 'BLOCKED' : rec.status !== 200 ? `HTTP ${rec.status}` : rec.liveOverlap >= 0.4 ? 'MATCH' : 'MISMATCH';
  console.log(`[${String(i).padStart(3)}/${items.length}] ${rec.id.padEnd(22)} ${rec.asin}  ov=${String(rec.liveOverlap).padEnd(5)} ${verdict}`);
  if (verdict === 'MISMATCH' && rec.liveTitle) console.log(`      ours: ${it.name.slice(0, 62)}\n      amzn: ${rec.liveTitle.slice(0, 62)}`);
  await new Promise((r) => setTimeout(r, DELAY));
}

const merged = [...done.values(), ...out.filter((r) => !done.has(r.id))];
writeFileSync('scripts/_relink-verified.json', JSON.stringify(merged, null, 2));
console.log(`\nblocked by Amazon: ${blocked}/${items.length}`);
console.log(`titles captured:   ${merged.filter((r) => r.liveTitle).length}/${JSON.parse(readFileSync(file,'utf8')).filter((r)=>r.asin).length}`);
console.log('wrote scripts/_relink-verified.json');
