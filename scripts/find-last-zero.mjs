import { readFileSync } from 'fs';
const envText = readFileSync('C:/Users/allan/projects/dailygiftshuffle/.env.local', 'utf8');
for (const line of envText.split('\n')) { const m = line.match(/^([^#=]+)=(.*)$/); if (m) process.env[m[1].trim()] = m[2].replace(/^"|"$/g,'').trim(); }
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
async function redisCmd(...args) {
  const res = await fetch(REDIS_URL, { method:'POST', headers:{ Authorization:'Bearer '+REDIS_TOKEN,'Content-Type':'application/json'}, body:JSON.stringify(args)});
  return (await res.json()).result;
}
const parsed = JSON.parse(await redisCmd('GET', 'admin:products'));
const bad = parsed.filter(p => p.name && p.name !== 'New Product' && (!p.price || p.price === 0));
console.log('Still at $0:', bad.length);
bad.forEach(p => console.log(JSON.stringify({id:p.id, name:p.name.slice(0,60), asin:p.asin, price:p.price})));
