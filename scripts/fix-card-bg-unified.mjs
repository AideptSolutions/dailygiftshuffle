import { readFileSync, writeFileSync } from 'fs';

const CARD_BG = '#F0F4F8'; // uniform card background — matches the image area tone AJ pointed to

const files = [
  'components/ProductCard.tsx',
  'components/HomeFeaturedSection.tsx',
  'app/shuffle/ShuffleClient.tsx',
];

for (const file of files) {
  let c = readFileSync(file, 'utf8');

  // 1. Swap the warm cream card bg to the unified card bg
  c = c.replace(/background: '#FFF8EE'/g, `background: '${CARD_BG}'`);

  // 2. Remove the separate bg-gray-50 from the image div — it'll inherit the card bg
  //    Pattern: <div className="relative w-full h-28 bg-gray-50">
  c = c.replace(
    /className="relative w-full h-28 bg-gray-50"/g,
    'className="relative w-full h-28"'
  );

  writeFileSync(file, c, 'utf8');
  console.log(`Updated: ${file}`);
}

console.log('\nAll cards now have a single unified background: ' + CARD_BG);
