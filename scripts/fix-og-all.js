const fs = require('fs');
const path = require('path');

// Clean OG URLs without apostrophes/contractions
const fixMap = {
  'gift-ideas-for-dad': 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Dad%20%7C%20TheGiftShuffle',
  'gift-ideas-for-friends': 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Friends%20%7C%20TheGiftShuffle',
  'gift-ideas-for-grandparents': 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Grandparents%20%7C%20TheGiftShuffle',
  'gift-ideas-for-her': 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Her%20%7C%20TheGiftShuffle',
  'gift-ideas-for-him': 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Him%20%7C%20TheGiftShuffle',
  'gift-ideas-for-kids': 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Kids%20%7C%20TheGiftShuffle',
  'gift-ideas-for-mom': 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Mom%20%7C%20TheGiftShuffle',
  'gift-ideas-for-teens': 'https://www.thegiftshuffle.com/api/og?title=Gift%20Ideas%20for%20Teens%20%7C%20TheGiftShuffle',
  'gifts-for-camping-and-outdoors': 'https://www.thegiftshuffle.com/api/og?title=Gifts%20for%20Camping%20and%20Outdoors%20%7C%20TheGiftShuffle',
  'birthday-gift-ideas': 'https://www.thegiftshuffle.com/api/og?title=Birthday%20Gift%20Ideas%20%7C%20TheGiftShuffle',
  'christmas-gift-ideas': 'https://www.thegiftshuffle.com/api/og?title=Christmas%20Gift%20Ideas%20%7C%20TheGiftShuffle',
  'fathers-day-gifts': 'https://www.thegiftshuffle.com/api/og?title=Father%27s%20Day%20Gifts%20%7C%20TheGiftShuffle',
  'mothers-day-gifts': 'https://www.thegiftshuffle.com/api/og?title=Mother%27s%20Day%20Gifts%20%7C%20TheGiftShuffle',
  'gifts-under-25': 'https://www.thegiftshuffle.com/api/og?title=Gifts%20Under%20%2425%20%7C%20TheGiftShuffle',
  'gifts-under-50': 'https://www.thegiftshuffle.com/api/og?title=Gifts%20Under%20%2450%20%7C%20TheGiftShuffle',
  'gifts-under-100': 'https://www.thegiftshuffle.com/api/og?title=Gifts%20Under%20%24100%20%7C%20TheGiftShuffle',
};

const appDir = path.join(__dirname, '..', 'app');

for (const [slug, cleanUrl] of Object.entries(fixMap)) {
  const file = path.join(appDir, slug, 'page.tsx');
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  // Replace any OG image URL (single-quoted, backtick, or mixed) with a clean double-quoted version
  const updated = content.replace(
    /url:\s*[`'"]https:\/\/www\.thegiftshuffle\.com\/api\/og\?title=[^`'"]*[`'"]/g,
    `url: '${cleanUrl}'`
  );
  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log('Fixed:', slug);
  }
}
console.log('Done');
