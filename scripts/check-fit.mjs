// Audit product/page fit: pull each live page's ItemList schema and flag items
// that read as off-theme for that page's buyer. Empirical, not model-based.
//   node scripts/check-fit.mjs            (production)
//   ORIGIN=http://localhost:3334 node scripts/check-fit.mjs
const ORIGIN = process.env.ORIGIN || 'https://www.thegiftshuffle.com';

// Per page: things that should NOT appear given who is buying and why.
const PAGES = [
  ['/best-gifts-for-her-2026',   /webcam|microphone|smart plug|water filter|hammock|chef.?s knife|skillet|dutch oven|stand mixer|jump start|drill|tool kit|echo dot|doorbell|air fryer/i],
  ['/gifts-for-wife',            /webcam|microphone|smart plug|water filter|hammock|chef.?s knife|skillet|stand mixer|jump start|drill|echo dot|doorbell/i],
  ['/christmas-gifts-for-her',   /webcam|microphone|smart plug|water filter|hammock|chef.?s knife|skillet|stand mixer|jump start|drill|echo dot|doorbell/i],
  ['/gift-ideas-for-him',        /lip mask|blush|mascara|perfume|eau de parfum|scrunchie|nail|serum|facial|jewelry|necklace|earring|tampon|bra\b/i],
  ['/gift-ideas-for-dad',        /lip mask|blush|mascara|eau de parfum|scrunchie|nail polish|facial roller|necklace|earring|plush|teddy/i],
  ['/gift-ideas-for-mom',        /gaming headset|controller|rgb|jump start|drill|tool kit|jerky|hot sauce|beard/i],
  ['/gifts-for-teenage-girls',   /jump start|drill|tool kit|whiskey|wine|bourbon|decanter|beard|retirement|denture/i],
  ['/gifts-for-teenage-boys',    /lip mask|blush|mascara|eau de parfum|whiskey|wine|bourbon|decanter|retirement|scrunchie/i],
  ['/gift-ideas-for-kids',       /whiskey|wine|bourbon|decanter|beard|razor|perfume|knife|retirement|jump start/i],
  // 'blanket' catches a generic cozy throw wandering onto a gaming page, but a
  // gamer-branded one belongs here, so anything explicitly gaming-themed is
  // exempted first.
  ['/best-gaming-gifts-2026',    /^(?!.*(gamer|gaming|arcade|pixel|retro|controller|console))(?=.*(lip mask|blush|p[ae]rfum|skincare|candle|blanket|teddy|whiskey|garden|cookware))/i],
  ['/best-beauty-gifts-2026',    /controller|headset|drill|knife|jump start|hammock|dog|cat toy|webcam|speaker/i],
  ['/self-care-gifts',           /controller|gaming|drill|jump start|knife|webcam|jerky|hot sauce/i],
  ['/gifts-for-crafters',        /controller|gaming headset|jump start|whiskey|jerky|perfume|blush/i],
  ['/best-camping-gifts',        /lip mask|blush|perfume|jewelry|necklace|stand mixer|gaming headset|office/i],
  ['/gifts-for-coworkers',       /perfume|lingerie|jewelry|necklace|whiskey|bourbon|beard|razor|intimate/i],
  ['/best-baby-shower-gifts-2026', /whiskey|wine|bourbon|knife|drill|gaming|perfume|jump start/i],
  ['/housewarming-gifts',        /lip mask|blush|mascara|gaming headset|teddy|diaper|retirement/i],
  ['/retirement-gifts',          /teddy|diaper|gaming headset|rgb|teen|backpack for school/i],
  ['/stocking-stuffers',         /stand mixer|dutch oven|luggage|mattress|sewing machine|pottery wheel/i],
  ['/white-elephant-gifts',      /fine jewelry|diamond|luggage|mattress|dyson/i],
];

async function itemsOf(path) {
  const html = await (await fetch(`${ORIGIN}${path}?cb=${Date.now()}`)).text();
  const names = [];
  for (const m of html.matchAll(/"@type":"Product","name":"((?:[^"\\]|\\.)*)"/g)) {
    names.push(m[1].replace(/\\u0026/g, '&').replace(/\\"/g, '"'));
  }
  return names;
}

let totalBad = 0;
for (const [path, offRe] of PAGES) {
  try {
    const names = await itemsOf(path);
    const bad = names.filter((n) => offRe.test(n));
    totalBad += bad.length;
    const pct = names.length ? Math.round((bad.length / names.length) * 100) : 0;
    const flag = bad.length === 0 ? 'OK  ' : pct >= 15 ? 'BAD ' : 'WARN';
    console.log(`${flag} ${path.padEnd(34)} ${String(names.length).padStart(3)} items   off-theme: ${bad.length} (${pct}%)`);
    bad.slice(0, 6).forEach((n) => console.log(`       - ${n.slice(0, 60)}`));
  } catch (e) {
    console.log(`ERR  ${path}  ${String(e.message).slice(0, 50)}`);
  }
}
console.log(`\ntotal off-theme across audited pages: ${totalBad}`);
