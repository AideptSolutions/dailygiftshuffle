import { readFileSync, writeFileSync } from 'fs';

// Load .env.local manually
const envText = readFileSync('.env.local', 'utf8');
for (const line of envText.split('\n')) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].replace(/^"|"$/g, '').trim();
}

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisCmd(...args) {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + REDIS_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(args)
  });
  return (await res.json()).result;
}

const parsed = JSON.parse(await redisCmd('GET', 'admin:products'));
const noPrice = parsed.filter(p => p.name && p.name !== 'New Product' && (!p.price || p.price === 0));
writeFileSync('C:/Users/allan/.openclaw/workspace/drafts/noprice-products.json', JSON.stringify(noPrice, null, 2));
console.log('Wrote', noPrice.length, 'products');
noPrice.forEach((p, i) => console.log(i + 1, p.id, '|', p.name.slice(0, 70), '| asin:', p.asin || 'NONE'));
