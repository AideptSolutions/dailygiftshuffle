import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(__dirname, '../data/admin-products.json'), 'utf8').replace(/^\uFEFF/, '');
const products = JSON.parse(raw);

const url = 'https://social-slug-73085.upstash.io';
const token = 'gQAAAAAAAR19AAIncDFjYmM1MjBkYTJhODA0N2E2YTBkZTc4MDJiNzlkYmU1YnAxNzMwODU';

const res = await fetch(`${url}/set/admin:products`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(products),
});

const data = await res.json();
console.log('Response:', JSON.stringify(data));
console.log(`Pushed ${products.length} products to Redis.`);
