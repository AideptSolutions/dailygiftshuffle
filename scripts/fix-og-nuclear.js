// Nuclear fix: replace the entire images block in each affected page with a clean version
const fs = require('fs');
const path = require('path');

const fixes = {
  'gift-ideas-for-dad': "Gift%20Ideas%20for%20Dad%20%7C%20TheGiftShuffle",
  'gift-ideas-for-friends': "Gift%20Ideas%20for%20Friends%20%7C%20TheGiftShuffle",
  'gift-ideas-for-grandparents': "Gift%20Ideas%20for%20Grandparents%20%7C%20TheGiftShuffle",
  'gift-ideas-for-her': "Gift%20Ideas%20for%20Her%20%7C%20TheGiftShuffle",
  'gift-ideas-for-him': "Gift%20Ideas%20for%20Him%20%7C%20TheGiftShuffle",
};

const appDir = path.join(__dirname, '..', 'app');

for (const [slug, titleParam] of Object.entries(fixes)) {
  const file = path.join(appDir, slug, 'page.tsx');
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the entire images array block
  const cleanImages = `    images: [\n      {\n        url: 'https://www.thegiftshuffle.com/api/og?title=${titleParam}',\n        width: 1200,\n        height: 630,\n      },\n    ],`;
  
  // Match any images: [...] block in the openGraph section
  const updated = content.replace(
    /images:\s*\[\s*\{[^}]*url:[^,\]]+[^}]*\},?\s*\]/gs,
    `images: [\n      {\n        url: 'https://www.thegiftshuffle.com/api/og?title=${titleParam}',\n        width: 1200,\n        height: 630,\n      },\n    ]`
  );
  
  fs.writeFileSync(file, updated, 'utf8');
  console.log('Fixed:', slug);
}
console.log('Done');
