import { REDIS_URL, REDIS_TOKEN } from './lib/redis-env.mjs';
const res = await fetch(REDIS_URL + '/get/admin:products', { headers: { Authorization: 'Bearer ' + REDIS_TOKEN }});
const data = await res.json();
const arr = JSON.parse(data.result);
console.log('Type:', Array.isArray(arr) ? 'array OK' : 'WRONG - type is ' + typeof arr);
console.log('Total count:', arr.length);
const cranes = arr.filter(p => p.cranes && p.status === 'published');
console.log('Cranes items:', cranes.length);
console.log('Last 3:', cranes.slice(-3).map(p => p.name));
