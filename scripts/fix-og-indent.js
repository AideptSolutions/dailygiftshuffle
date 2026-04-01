const fs = require('fs');
const path = require('path');

const pages = [
  'gift-ideas-for-mom','gift-ideas-for-dad','gift-ideas-for-her','gift-ideas-for-him',
  'gift-ideas-for-kids','gift-ideas-for-teens','gift-ideas-for-friends','gift-ideas-for-grandparents',
  'birthday-gift-ideas','christmas-gift-ideas','gifts-under-50','gifts-under-25',
  'gifts-under-100','mothers-day-gifts','fathers-day-gifts','gifts-for-camping-and-outdoors',
];

const base = path.join(__dirname, '..', 'app');

for (const slug of pages) {
  const filePath = path.join(base, slug, 'page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  // Fix: replace 6-space "      images:" with 4-space "    images:"
  const newContent = content.replace(/      images: \[\n        \{\n          url: '(https:\/\/www\.thegiftshuffle\.com\/api\/og\?title=[^']+)',\n          width: 1200,\n          height: 630,\n        \},\n      \],/,
    "    images: [\n      {\n        url: '$1',\n        width: 1200,\n        height: 630,\n      },\n    ],");
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('FIXED:', slug);
  } else {
    console.log('NO CHANGE:', slug);
  }
}
