const fs = require('fs');
const path = require('path');

const pages = [
  'gift-ideas-for-dad','gift-ideas-for-her','gift-ideas-for-him',
  'gift-ideas-for-teens','gift-ideas-for-friends','gift-ideas-for-grandparents',
  'mothers-day-gifts','fathers-day-gifts',
];

const base = path.join(__dirname, '..', 'app');

for (const slug of pages) {
  const filePath = path.join(base, slug, 'page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  // Fix indentation: 6-space images block -> 4-space
  let newContent = content
    .replace(/^      images: \[$/m, '    images: [')
    .replace(/^        \{$/m, '      {')
    .replace(/^          url: '(https:\/\/www\.thegiftshuffle\.com\/api\/og\?title=[^']+)',$/m, "        url: '$1',")
    .replace(/^          width: 1200,$/m, '        width: 1200,')
    .replace(/^          height: 630,$/m, '        height: 630,')
    .replace(/^        \},$/m, '      },')
    .replace(/^      \],$/m, '    ],');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('FIXED:', slug);
  } else {
    console.log('NO CHANGE:', slug);
  }
}
