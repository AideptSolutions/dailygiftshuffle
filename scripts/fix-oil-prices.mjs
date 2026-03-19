const REDIS_URL = 'https://social-slug-73085.upstash.io';
const REDIS_TOKEN = 'gQAAAAAAAR19AAIncDFjYmM1MjBkYTJhODA0N2E2YTBkZTc4MDJiNzlkYmU1YnAxNzMwODU';

const priceUpdates = {
  'admin-20260319-jojoba-oil':  { price: 7.99,  priceDisplay: '$7.99' },
  'admin-20260319-castor-oil':  { price: 9.99,  priceDisplay: '$9.99' },
  'admin-20260319-batana-oil':  { price: 7.99,  priceDisplay: '$7.99' },
};

const res = await fetch(REDIS_URL + '/get/admin:products', {
  headers: { Authorization: 'Bearer ' + REDIS_TOKEN }
});
const data = await res.json();
const arr = JSON.parse(data.result);

const updated = arr.map(p => {
  if (priceUpdates[p.id]) {
    return { ...p, ...priceUpdates[p.id], updatedAt: new Date().toISOString() };
  }
  return p;
});

const setRes = await fetch(REDIS_URL + '/set/admin:products', {
  method: 'POST',
  headers: { Authorization: 'Bearer ' + REDIS_TOKEN, 'Content-Type': 'application/json' },
  body: JSON.stringify(updated)
});
const setData = await setRes.json();
console.log('Redis write:', setData.result);

// Confirm
const changed = updated.filter(p => priceUpdates[p.id]);
changed.forEach(p => console.log(`${p.name} → ${p.priceDisplay}`));
