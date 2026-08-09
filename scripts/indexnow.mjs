// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver) for near-immediate crawling.
//
// Usage:
//   node scripts/indexnow.mjs                     # submit every URL in sitemap.xml
//   node scripts/indexnow.mjs /stocking-stuffers /white-elephant-gifts
//
// The key file must stay live at https://www.thegiftshuffle.com/<KEY>.txt
// (public/<KEY>.txt in this repo) or IndexNow rejects the submission.

const HOST = 'www.thegiftshuffle.com';
const KEY = '075328b6e1bfb8beae94027dab866fe3';
const ORIGIN = `https://${HOST}`;

const args = process.argv.slice(2);
let urls;

if (args.length) {
  urls = args.map((a) => (a.startsWith('http') ? a : ORIGIN + (a.startsWith('/') ? a : '/' + a)));
} else {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

if (!urls.length) {
  console.error('no URLs to submit');
  process.exit(1);
}

// Verify the key file is actually reachable before submitting.
const keyRes = await fetch(`${ORIGIN}/${KEY}.txt`);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`key file not live/valid at ${ORIGIN}/${KEY}.txt (HTTP ${keyRes.status}) — deploy it first`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: urls }),
});

// 200 = accepted, 202 = accepted pending key validation.
console.log(`submitted ${urls.length} URLs -> HTTP ${res.status} ${res.statusText}`);
if (![200, 202].includes(res.status)) console.log((await res.text()).slice(0, 300));
