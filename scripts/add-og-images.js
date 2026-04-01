const fs = require('fs');
const path = require('path');

const pages = [
  ['gift-ideas-for-mom', 'Gift Ideas for Mom — 25 Thoughtful Picks | TheGiftShuffle'],
  ['gift-ideas-for-dad', "Gift Ideas for Dad — 25 Unique Picks He'll Actually Use | TheGiftShuffle"],
  ['gift-ideas-for-her', "Gift Ideas for Her — Gifts She'll Actually Love | TheGiftShuffle"],
  ['gift-ideas-for-him', "Gift Ideas for Him — Gifts He'll Actually Use | TheGiftShuffle"],
  ['gift-ideas-for-kids', 'Gift Ideas for Kids and Grandkids — Top Picks by Age | TheGiftShuffle'],
  ['gift-ideas-for-teens', "Gift Ideas for Teens — Trending Gifts They'll Actually Want | TheGiftShuffle"],
  ['gift-ideas-for-friends', "Gift Ideas for Friends — Fun & Thoughtful Picks They'll Love | TheGiftShuffle"],
  ['gift-ideas-for-grandparents', "Gift Ideas for Grandparents — Thoughtful Gifts They'll Love | TheGiftShuffle"],
  ['birthday-gift-ideas', 'Birthday Gift Ideas — Unique Picks for Every Person | TheGiftShuffle'],
  ['christmas-gift-ideas', 'Christmas Gift Ideas 2025 — Top Picks for Everyone on Your List | TheGiftShuffle'],
  ['gifts-under-50', 'Gifts Under $50 — 30 Great Ideas for Any Occasion | TheGiftShuffle'],
  ['gifts-under-25', 'Gifts Under $25 — Thoughtful Budget Picks | TheGiftShuffle'],
  ['gifts-under-100', 'Gifts Under $100 — Premium Picks Without the Premium Price | TheGiftShuffle'],
  ['mothers-day-gifts', "Mother's Day Gifts — The Best Picks for 2025 | TheGiftShuffle"],
  ['fathers-day-gifts', "Father's Day Gifts — Best Picks for Dad in 2025 | TheGiftShuffle"],
  ['gifts-for-camping-and-outdoors', 'Gifts for Camping and the Outdoors — Top Picks for Every Adventurer | TheGiftShuffle'],
];

const base = path.join(__dirname, '..', 'app');

for (const [slug, title] of pages) {
  const filePath = path.join(base, slug, 'page.tsx');
  if (!fs.existsSync(filePath)) { console.log('MISSING:', filePath); continue; }
  let content = fs.readFileSync(filePath, 'utf8');
  const encoded = encodeURIComponent(title);

  if (content.includes('api/og?title=')) { console.log('SKIP (already has OG):', slug); continue; }

  const ogImagesBlock = `    images: [\n      {\n        url: 'https://www.thegiftshuffle.com/api/og?title=${encoded}',\n        width: 1200,\n        height: 630,\n      },\n    ],`;

  // Insert images before the closing }, of openGraph block
  const newContent = content.replace(/(openGraph:\s*\{[\s\S]*?url:\s*'[^']*',?\s*)(\n\s*\},)/, (m, p1, p2) => {
    return p1 + '\n' + ogImagesBlock + p2;
  });

  if (newContent === content) {
    console.log('NO MATCH:', slug);
  } else {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('UPDATED:', slug);
  }
}
