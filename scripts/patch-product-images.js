/**
 * patch-product-images.js
 * Updates products.ts and products-catalog.ts image URLs to point to generated images.
 * Run after generate-product-images.js completes.
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images/products');
const FILES_TO_PATCH = [
  path.join(__dirname, '../data/products.ts'),
  path.join(__dirname, '../data/products-catalog.ts'),
];

const imageFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.match(/\.(jpg|png)$/));
console.log('Found', imageFiles.length, 'generated images');

for (const filePath of FILES_TO_PATCH) {
  if (!fs.existsSync(filePath)) { console.log('Skipping (not found):', filePath); continue; }
  let content = fs.readFileSync(filePath, 'utf8');
  let patched = 0;

  for (const file of imageFiles) {
    const id = file.replace(/\.(jpg|png)$/, '');
    const newUrl = '/images/products/' + file;
    // Replace img('...') helper calls and direct placehold.co URLs for this product
    // Strategy: find the product block by id, then replace its image field
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match: id:'xxx' ... image:'<anything>' (non-greedy, within reasonable distance)
    const re = new RegExp(`(id:\\s*'${escaped}'[^}]{0,500}?image:\\s*')([^']+)(')`, 'gs');
    const updated = content.replace(re, (match, pre, oldUrl, post) => {
      patched++;
      return pre + newUrl + post;
    });
    content = updated;
  }

  fs.writeFileSync(filePath, content);
  const filename = path.basename(filePath);
  console.log(`Patched ${patched} URLs in ${filename}`);
}
