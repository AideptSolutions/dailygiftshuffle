/**
 * patch-catalog-images.js
 * Updates products-catalog.ts image URLs to point to generated images.
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images/products');
const CATALOG_FILE = path.join(__dirname, '../data/products-catalog.ts');

const imageFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.match(/\.(jpg|png)$/));
console.log('Images available:', imageFiles.length);

let content = fs.readFileSync(CATALOG_FILE, 'utf8');
let patched = 0;

for (const file of imageFiles) {
  const id = file.replace(/\.(jpg|png)$/, '');
  const newUrl = '/images/products/' + file;
  const escapedId = id.replace(/[-]/g, '[-]');
  // Match: id:'xxx' ... image:'old-url'
  const re = new RegExp("(id:\\s*'" + escapedId + "'[\\s\\S]{1,800}?image:\\s*')(https?://[^']+)(')", 'g');
  const before = content;
  content = content.replace(re, function(match, pre, oldUrl, post) {
    return pre + newUrl + post;
  });
  if (content !== before) patched++;
}

fs.writeFileSync(CATALOG_FILE, content);
console.log('Patched:', patched, 'products in products-catalog.ts');

const remaining = (content.match(/placehold\.co/g) || []).length;
console.log('Remaining placeholders:', remaining);
