import { readFileSync, writeFileSync } from 'fs';

const files = [
  'app/cranes/page.tsx',
  'app/gifts/[slug]/page.tsx',
  'app/picks/page.tsx',
  'app/selections/page.tsx',
  'app/shuffle/[category]/CategoryShuffleClient.tsx',
  'app/shuffle/ShuffleClient.tsx',
  'app/wishlist/[id]/page.tsx',
  'app/wishlist/WishlistClient.tsx',
  'components/FavoritesSidebar.tsx',
  'components/FeaturedGifts.tsx',
  'components/HomeFeaturedSection.tsx',
  'components/ProductCard.tsx',
  'components/ProductModal.tsx',
];

let totalChanges = 0;

for (const rel of files) {
  const path = new URL(`../${rel}`, import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
  let content = readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  const before = content;

  // 1. Normalize button text
  content = content.replace(/Shop on Amazon/g, 'Buy on Amazon');
  content = content.replace(/Click to Buy/g, 'Buy on Amazon');

  // 2. Strip any inline bg color overrides that override btn-amazon (red/coral/orange tones)
  //    Matches patterns like: className="btn-amazon ... bg-[#F04E30] ..." or bg-red-500 etc.
  content = content.replace(/(btn-amazon[^"'`]*?)\s+bg-\[#(?:F04E30|E64126|FF\w{4}|f0\w{4})[^\]]*\]/gi, '$1');
  content = content.replace(/(btn-amazon[^"'`]*?)\s+(?:bg|text)-(?:red|orange|coral)-\d+/gi, '$1');

  if (content !== before) {
    writeFileSync(path, content, 'utf8');
    const textChanges = (before.match(/Shop on Amazon|Click to Buy/g) || []).length;
    console.log(`✅ ${rel} — ${textChanges} text change(s)`);
    totalChanges++;
  } else {
    console.log(`⬜ ${rel} — no changes needed`);
  }
}

console.log(`\nDone. ${totalChanges} file(s) updated.`);
