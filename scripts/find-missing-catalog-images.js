const fs = require('fs');
const path = require('path');

// Parse the products-catalog.ts to find products with missing images
const content = fs.readFileSync(path.join(__dirname, '..', 'data', 'products-catalog.ts'), 'utf8');

// Extract products with their ids, names, and image paths
const productMatches = content.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g);

const missing = [];
for (const match of productMatches) {
  const [, id, name, imagePath] = match;
  if (!imagePath || imagePath === '' || imagePath.includes('PLACEHOLDER')) {
    missing.push({ id, name, imagePath });
    continue;
  }
  // Check if the file actually exists
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  if (!fs.existsSync(fullPath)) {
    missing.push({ id, name, imagePath });
  }
}

console.log(`Found ${missing.length} catalog products with missing images:\n`);
missing.forEach((p, i) => {
  console.log(`${i+1}. [${p.id}] ${p.name.slice(0,60)}`);
  console.log(`   Image path: ${p.imagePath}`);
});
