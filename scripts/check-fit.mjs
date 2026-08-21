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
  // ---- pages added 2026-08-20, previously unaudited ----
  ['/best-anniversary-gifts-2026', /jump start|drill|tool kit|diaper|stroller|gaming headset|webcam|dog|cat toy|retirement/i],
  ['/romantic-gifts-for-her',     /jump start|drill|tool kit|diaper|gaming headset|webcam|dog|cat toy|beard|razor/i],
  ['/gifts-for-girlfriend',       /jump start|drill|tool kit|diaper|beard|razor|denture|retirement/i],
  ['/gifts-for-a-crush',          /jump start|drill|diaper|beard|razor|retirement|fine jewelry|diamond|engagement/i],
  ['/self-care-gifts-for-her',    /controller|gaming|drill|jump start|knife|webcam|jerky|hot sauce|beard/i],
  ['/luxury-gifts-for-her',       /jump start|drill|tool kit|diaper|jerky|hot sauce|novelty|funny socks/i],
  ['/christmas-gifts-for-him',    /lip mask|blush|mascara|eau de p[ae]rfum|scrunchie|nail polish|tampon|bra\b/i],
  ['/gift-ideas-for-brother',     /lip mask|blush|mascara|eau de p[ae]rfum|scrunchie|nail polish|diaper|retirement/i],
  ['/gift-ideas-for-sister',      /beard|razor|jump start|drill|tool kit|denture|retirement/i],
  ['/30th-birthday-gifts',        /diaper|stroller|pacifier|denture|retirement|toddler|nursery/i],
  ['/40th-birthday-gifts',        /diaper|stroller|pacifier|toddler|nursery|school backpack/i],
  ['/50th-birthday-gifts',        /diaper|stroller|pacifier|toddler|nursery|school backpack/i],
  ['/best-fitness-gifts-2026',    /lip mask|blush|eau de p[ae]rfum|candle|whiskey|diaper|stroller/i],
  ['/best-luxury-gifts-2026',     /diaper|pacifier|jerky|hot sauce|novelty socks|funny mug|plastic/i],
  ['/luxury-gifts-under-50',      /diaper|pacifier|jerky|novelty socks|funny mug/i],
  ['/luxury-gifts-under-200',     /diaper|pacifier|jerky|novelty socks|funny mug/i],
  ['/camping-gifts-for-men',      /lip mask|blush|eau de p[ae]rfum|jewelry|necklace|stand mixer|diaper/i],
  ['/camping-gifts-for-women',    /beard|razor|stand mixer|diaper|retirement/i],
  ['/gifts-for-college-students', /diaper|stroller|pacifier|denture|retirement|mattress topper for crib/i],
  ['/gifts-for-people-who-have-everything', /diaper|pacifier|stroller|denture/i],
  ['/retro-gaming-gifts',         /lip mask|blush|eau de p[ae]rfum|skincare|diaper|beard/i],
  ['/secret-santa-gifts',         /fine jewelry|diamond|dyson|mattress|luggage|espresso machine/i],
  ['/self-care-gifts',            /controller|gaming|drill|jump start|knife|webcam|jerky|hot sauce/i],
  ['/patriotic-gifts',            /diaper|pacifier|denture|lip mask|blush/i],
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

// Pages whose title promises a price ceiling. Listing something above it is a
// factual error rather than a judgement call, so it is checked on its own.
const PRICE_CAPS = [
  ['/luxury-gifts-under-50', 50],
  ['/luxury-gifts-under-200', 200],
  ['/gifts-under-25', 25],
  ['/gifts-under-50', 50],
  ['/fathers-day-gifts-under-25', 25],
  ['/fathers-day-gifts-under-50', 50],
  ['/fathers-day-gifts-under-100', 100],
];

async function pricesOf(path) {
  const html = await (await fetch(`${ORIGIN}${path}?cb=${Date.now()}`)).text();
  const out = [];
  for (const m of html.matchAll(/"@type":"Product","name":"((?:[^"\\]|\\.)*)"[\s\S]{0,400}?"price":"?([\d.]+)"?/g)) {
    out.push({ name: m[1].replace(/\\u0026/g, '&'), price: Number(m[2]) });
  }
  return out;
}

let overCap = 0;
for (const [path, cap] of PRICE_CAPS) {
  try {
    const items = await pricesOf(path);
    if (!items.length) { console.log(`SKIP ${path.padEnd(34)} no priced items found`); continue; }
    const over = items.filter((i) => i.price > cap);
    overCap += over.length;
    const tag = over.length ? 'OVER' : 'OK  ';
    console.log(`${tag} ${path.padEnd(34)} cap $${String(cap).padEnd(4)} ${items.length} items  over: ${over.length}`);
    over.slice(0, 5).forEach((o) => console.log(`       - $${o.price}  ${o.name.slice(0, 46)}`));
  } catch (e) {
    console.log(`ERR  ${path.padEnd(34)} ${String(e.message || e).slice(0, 40)}`);
  }
}
console.log(`\nitems priced above their page's cap: ${overCap}`);
