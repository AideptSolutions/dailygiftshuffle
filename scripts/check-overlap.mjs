// Compare the product sets that each live page publishes in its ItemList JSON-LD.
const ORIGIN = process.env.ORIGIN || 'https://www.thegiftshuffle.com';

async function productsOf(path) {
  const html = await (await fetch(`${ORIGIN}${path}?v=${Date.now()}`)).text();
  const names = new Set();
  for (const m of html.matchAll(/"@type":"Product","name":"((?:[^"\\]|\\.)*)"/g)) {
    names.add(m[1].replace(/\\u0026/g, '&').replace(/\\"/g, '"').toLowerCase().trim());
  }
  return names;
}

function jaccard(a, b) {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return { inter, pctOfA: a.size ? Math.round((inter / a.size) * 100) : 0, pctOfB: b.size ? Math.round((inter / b.size) * 100) : 0, jac: union ? Math.round((inter / union) * 100) : 0 };
}

const pairs = [
  ['/white-elephant-gifts', '/secret-santa-gifts'],
  ['/white-elephant-gifts', '/gifts-under-25'],
  ['/housewarming-gifts', '/category/home'],
  ['/housewarming-gifts', '/category/kitchen'],
  ['/best-luxury-gifts-2026', '/luxury-gifts-for-her'],
  ['/best-luxury-gifts-2026', '/category/luxury'],
  ['/secret-santa-gifts', '/gifts-under-50'],
  ['/stocking-stuffers', '/gifts-under-25'],
];

const cache = new Map();
const get = async (p) => { if (!cache.has(p)) cache.set(p, await productsOf(p)); return cache.get(p); };

for (const [a, b] of pairs) {
  const A = await get(a), B = await get(b);
  const r = jaccard(A, B);
  const flag = r.pctOfA >= 70 ? '  <-- HIGH OVERLAP' : r.pctOfA >= 50 ? '  <-- moderate' : '';
  console.log(`${a} (${A.size}) vs ${b} (${B.size}): shared=${r.inter}  ${r.pctOfA}% of first  ${r.pctOfB}% of second${flag}`);
}
