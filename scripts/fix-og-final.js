const fs = require('fs');
const path = require('path');

function walk(dir) {
  const results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && !['node_modules','.next'].includes(f)) walk(full).forEach(r => results.push(r));
    else if (f === 'page.tsx') results.push(full);
  }
  return results;
}

const titleMap = {
  'gift-ideas-for-teens': 'Gift Ideas for Teens | TheGiftShuffle',
  'gift-ideas-for-dad': 'Gift Ideas for Dad | TheGiftShuffle',
  'gift-ideas-for-mom': 'Gift Ideas for Mom | TheGiftShuffle',
  'gift-ideas-for-him': 'Gift Ideas for Him | TheGiftShuffle',
  'gift-ideas-for-her': 'Gift Ideas for Her | TheGiftShuffle',
  'gift-ideas-for-kids': 'Gift Ideas for Kids | TheGiftShuffle',
  'gift-ideas-for-friends': 'Gift Ideas for Friends | TheGiftShuffle',
  'gift-ideas-for-grandparents': 'Gift Ideas for Grandparents | TheGiftShuffle',
  'birthday-gift-ideas': 'Birthday Gift Ideas | TheGiftShuffle',
  'christmas-gift-ideas': 'Christmas Gift Ideas | TheGiftShuffle',
  'fathers-day-gifts': "Father's Day Gifts | TheGiftShuffle",
  'mothers-day-gifts': "Mother's Day Gifts | TheGiftShuffle",
  'gifts-under-25': 'Gifts Under $25 | TheGiftShuffle',
  'gifts-under-50': 'Gifts Under $50 | TheGiftShuffle',
  'gifts-under-100': 'Gifts Under $100 | TheGiftShuffle',
  'gifts-for-camping-and-outdoors': 'Gifts for Camping and Outdoors | TheGiftShuffle',
};

const appDir = path.join(__dirname, '..', 'app');
const files = walk(appDir);
let fixed = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Only touch files with broken OG URLs
  if (!/'ll|'s%20|``/.test(content.match(/og\?title[^\n]*/)?.[0] || '')) continue;
  
  const slug = path.basename(path.dirname(filePath));
  const title = titleMap[slug] || (slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) + ' | TheGiftShuffle');
  const cleanUrl = 'https://www.thegiftshuffle.com/api/og?title=' + encodeURIComponent(title);
  
  // Replace the broken images block entirely  
  const updated = content.replace(
    /images:\s*\[\s*\{[\s\S]*?\},?\s*\]/,
    `images: [\n      { url: '${cleanUrl}', width: 1200, height: 630 },\n    ]`
  );
  
  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log('Fixed:', slug);
    fixed++;
  }
}
console.log(`Fixed ${fixed} files.`);
