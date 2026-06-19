// Fetch licensed lifestyle HERO images from Pexels (free, commercial use, no
// attribution required) and self-host them cropped to 3:2 for each page.
//
// AEO/SEO notes: each hero carries keyword-rich alt text (recipient + occasion),
// is pre-sized to 1200x800 (~120KB) so it loads fast as the LCP element, and is
// rendered with priority + a fixed-aspect container (no layout shift).
//
// Usage:
//   node scripts/gen-hero-images.mjs --list
//   node scripts/gen-hero-images.mjs --ids gift-ideas-for-him
//   node scripts/gen-hero-images.mjs --all [--force]

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = 'C:/Users/allan/projects/dailygiftshuffle';
for (const line of readFileSync(path.join(ROOT, '.env.all'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '').trim();
}
const KEY = process.env.PEXELS_API_KEY;
const OUT_DIR = path.join(ROOT, 'public', 'images', 'heroes');
const MANIFEST = path.join(ROOT, 'data', 'hero-manifest.json');

// slug -> { q: Pexels search query, alt: SEO/AEO alt text }
// alt = accurate description that naturally includes the page's recipient/occasion keywords.
const HEROES = {
  'ai-personalized-gifts':            { q: 'personalized custom gift wrapped present', alt: 'Personalized custom gifts wrapped and arranged on a table' },
  'birthday-gift-ideas':              { q: 'birthday gifts balloons celebration', alt: 'Wrapped birthday gifts with balloons and confetti' },
  'best-birthday-gifts-2026':         { q: 'birthday present gift box ribbon celebration', alt: 'The best birthday gifts for 2026 wrapped with ribbon and confetti' },
  'unique-birthday-gifts':            { q: 'unique thoughtful gift wrapped craft', alt: 'Unique and creative birthday gifts wrapped on a table' },
  'birthday-gifts-for-gamers':        { q: 'gaming setup headset controller rgb', alt: 'A gamer birthday gift setup with headset, controller and RGB lighting' },
  'best-gifts-for-her-2026':          { q: 'woman opening gift box ribbon happy', alt: 'The best gifts for her in 2026 wrapped with ribbon' },
  'romantic-gifts-for-her':           { q: 'romantic gift roses present candle', alt: 'A romantic gift for her with roses and a wrapped present' },
  'best-camping-gifts':               { q: 'camping gear tent campfire outdoors', alt: 'The best camping gifts including gear laid out at a campsite' },
  'best-gaming-gifts-2026':           { q: 'gaming gear keyboard headset rgb desk', alt: 'The best gaming gifts for 2026 including keyboard, headset and RGB gear' },
  'best-luxury-gifts-2026':           { q: 'luxury gift box gold elegant present', alt: 'The best luxury gifts for 2026 presented in an elegant gift box' },
  'best-fitness-gifts-2026':          { q: 'fitness gear dumbbells gym workout', alt: 'The best fitness gifts for 2026 including workout gear' },
  'gifts-for-girlfriend':             { q: 'gift for girlfriend present flowers', alt: 'A thoughtful gift for a girlfriend with flowers and a present' },
  'best-anniversary-gifts-2026':      { q: 'anniversary gift couple roses present', alt: 'The best anniversary gifts for 2026 with roses and a wrapped present' },
  '30th-birthday-gifts':              { q: 'birthday celebration gold balloons 30', alt: '30th birthday gifts with celebration balloons and confetti' },
  'best-beauty-gifts-2026':           { q: 'beauty skincare gift set cosmetics', alt: 'The best beauty gifts for 2026 including a skincare and cosmetics set' },
  // Shuffle-category hero band images (app/shuffle/[category])
  'shuffle-tech':            { q: 'tech gadgets desk modern flat lay', alt: 'Tech and gadget gift ideas arranged on a desk' },
  'shuffle-gaming':          { q: 'gaming setup rgb keyboard headset desk', alt: 'A gaming gift setup with RGB keyboard and headset' },
  'shuffle-fitness':         { q: 'fitness gym equipment dumbbells gear', alt: 'Fitness gift ideas including gym equipment and gear' },
  'shuffle-home':            { q: 'cozy home decor living room candles', alt: 'Cozy home decor gift ideas in a living room' },
  'shuffle-kitchen':         { q: 'modern kitchen cooking utensils gadgets', alt: 'Kitchen gift ideas with modern cooking tools' },
  'shuffle-sports':          { q: 'sports equipment gear balls flat lay', alt: 'Sports gift ideas including gear and equipment' },
  'shuffle-pets':            { q: 'happy dog cat with pet toys', alt: 'Pet gift ideas with a happy dog and cat' },
  'shuffle-kids':            { q: 'colorful kids toys play flat lay', alt: 'Colorful kids gift ideas and toys' },
  'shuffle-hobby':           { q: 'hobby crafts creative supplies desk', alt: 'Hobby and craft gift ideas on a workspace' },
  'shuffle-luxury':          { q: 'luxury gift elegant gold ribbon', alt: 'Luxury gift ideas presented elegantly' },
  'shuffle-office':          { q: 'modern office desk workspace accessories', alt: 'Office gift ideas on a modern desk' },
  'shuffle-gardening':       { q: 'gardening tools plants pots flat lay', alt: 'Gardening gift ideas with tools and plants' },
  'shuffle-parenting':       { q: 'parent baby family home lifestyle', alt: 'Parenting gift ideas for new parents' },
  'shuffle-diy-tools':       { q: 'power tools workshop diy bench', alt: 'DIY and tool gift ideas in a workshop' },
  'shuffle-finance':         { q: 'finance money planner desk minimal', alt: 'Finance gift ideas with a planner on a desk' },
  'shuffle-car-accessories': { q: 'car interior accessories dashboard clean', alt: 'Car accessory gift ideas for the interior' },
  'shuffle-outdoors':        { q: 'camping outdoors gear tent landscape', alt: 'Outdoor and camping gift ideas with gear' },
  'christmas-gift-ideas':             { q: 'christmas gifts under decorated tree', alt: 'Christmas presents wrapped under a decorated tree' },
  'fathers-day-gifts':                { q: 'father and child fathers day gift', alt: "A father opening a Father's Day gift with his family" },
  'fathers-day-gifts-under-100':      { q: 'fathers day gift box card', alt: "A Father's Day gift box beside a handwritten card" },
  'fathers-day-gifts-under-25':       { q: 'small wrapped gift for dad', alt: "An affordable Father's Day gift wrapped on a table" },
  'fathers-day-gifts-under-50':       { q: 'gift for dad fathers day', alt: "A mid-range Father's Day gift for dad" },
  'gift-ideas-for-dad':               { q: 'dad receiving gift happy', alt: 'A dad happily receiving a thoughtful gift' },
  'gift-ideas-for-friends':           { q: 'friends exchanging gifts together', alt: 'Friends exchanging thoughtful gifts together' },
  'gift-ideas-for-grandparents':      { q: 'grandparents opening gift grandchildren', alt: 'Grandparents opening a gift with their grandchildren' },
  'gift-ideas-for-her':               { q: 'woman opening gift smiling', alt: 'A woman happily opening a gift' },
  'gift-ideas-for-him':               { q: 'man opening gift present', alt: 'A man opening a thoughtful gift' },
  'gift-ideas-for-kids':              { q: 'children opening presents excited', alt: 'Children excitedly opening presents' },
  'gift-ideas-for-teachers':          { q: 'teacher appreciation gift desk apple', alt: 'A teacher appreciation gift on a classroom desk' },
  'gift-ideas-for-teens':             { q: 'teenager opening gift', alt: 'A teenager opening a trendy gift' },
  'gifts-for-boss':                   { q: 'professional office gift desk', alt: 'A professional gift for a boss on an office desk' },
  'gifts-for-camping-and-outdoors':   { q: 'camping outdoor gear flat lay', alt: 'Outdoor and camping gear arranged as a gift' },
  'gifts-for-coworkers':              { q: 'office coworkers gift exchange', alt: 'Coworkers exchanging gifts in the office' },
  'gifts-under-100':                  { q: 'wrapped gifts presents table', alt: 'A selection of thoughtful gifts under $100' },
  'gifts-under-25':                   { q: 'small affordable gift wrapped', alt: 'Affordable gift ideas under $25' },
  'gifts-under-50':                   { q: 'gift boxes presents budget', alt: 'A range of gift ideas under $50' },
  'graduation-gifts':                 { q: 'graduation cap diploma gift', alt: 'A graduation gift with cap and diploma' },
  'graduation-gifts-under-100':       { q: 'graduation gift celebration', alt: 'A graduation gift under $100' },
  'graduation-gifts-under-50':        { q: 'graduation present gift', alt: 'An affordable graduation gift under $50' },
  'last-minute-mothers-day-gifts':    { q: 'mothers day gift flowers wrapped', alt: "A last-minute Mother's Day gift with flowers ready to give" },
  'mothers-day-gifts-for-wife':       { q: 'mothers day gift wife flowers', alt: "A Mother's Day gift for a wife with fresh flowers" },
  'mothers-day-gifts-under-100':      { q: 'mothers day gift flowers present', alt: "A Mother's Day gift under $100 with flowers" },
  'mothers-day-gifts-under-25':       { q: 'small mothers day gift flowers', alt: "An affordable Mother's Day gift with flowers" },
  'mothers-day-gifts-under-50':       { q: 'mothers day present flowers', alt: "A Mother's Day gift under $50 with flowers" },
  'sustainable-eco-gifts':            { q: 'eco friendly sustainable gift kraft', alt: 'Sustainable eco-friendly gifts wrapped in natural kraft paper' },
  'tech-gadgets':                     { q: 'tech gadgets desk modern', alt: 'Modern tech gadget gifts arranged on a desk' },
  'top-10-gifts-for-grandparents-who-have-everything': { q: 'grandparents gift happy together', alt: 'Grandparents opening a gift together' },
  'top-10-gifts-for-new-dads-under-50': { q: 'new dad holding baby', alt: 'A new dad holding his newborn with a gift nearby' },
  'top-10-gifts-that-arrive-in-24-hours': { q: 'delivery package doorstep gift', alt: 'A fast-delivery gift package at the front door' },
};

const argv = process.argv.slice(2);
if (argv.includes('--list')) { console.log(Object.keys(HEROES).join('\n')); process.exit(0); }
const idArg = (() => { const i = argv.indexOf('--ids'); return i >= 0 ? argv[i + 1].split(',') : null; })();
const FORCE = argv.includes('--force');
const targets = idArg || Object.keys(HEROES);

async function pexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=5&size=large`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`pexels ${res.status}`);
  const data = await res.json();
  const ok = (data.photos || []).filter((p) => p.width >= 1000);
  return ok[0] || (data.photos || [])[0] || null;
}

mkdirSync(OUT_DIR, { recursive: true });
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};

for (const slug of targets) {
  const cfg = HEROES[slug];
  if (!cfg) { console.log(`!! no config for ${slug}`); continue; }
  const out = path.join(OUT_DIR, `${slug}.jpg`);
  if (existsSync(out) && !FORCE) { console.log(`skip ${slug}`); continue; }
  try {
    const photo = await pexels(cfg.q);
    if (!photo) { console.log(`!! no photo ${slug}`); continue; }
    const imgUrl = photo.src.large2x || photo.src.original;
    const buf = Buffer.from(await (await fetch(imgUrl)).arrayBuffer());
    await sharp(buf).resize(1200, 800, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    manifest[slug] = { alt: cfg.alt, query: cfg.q, photographer: photo.photographer, photographerUrl: photo.photographer_url, src: photo.url };
    console.log(`OK  ${slug}  <- ${photo.photographer}`);
  } catch (e) { console.log(`ERR ${slug}: ${String(e.message || e).slice(0, 80)}`); }
  await new Promise((r) => setTimeout(r, 250));
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`\nmanifest -> data/hero-manifest.json (${Object.keys(manifest).length} heroes)`);
