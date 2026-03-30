/**
 * patch-product-images.js
 * Updates products.ts image URLs to point to generated images.
 * Run after generate-product-images.js completes.
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images/products');
const PRODUCTS_FILE = path.join(__dirname, '../data/products.ts');

const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.jpg'));
console.log('Found', files.length, 'generated images');

let content = fs.readFileSync(PRODUCTS_FILE, 'utf8');
let patched = 0;

files.forEach(file => {
  const id = file.replace('.jpg', '');
  const newUrl = '/images/products/' + file;
  // Replace the image field for this product ID
  const regex = new RegExp(
    '(id:\\s*\'' + id.replace(/-/g, '\\-') + '\'[\\s\\S]*?image:\\s*\')([^\']+)(\')',
    'g'
  );
  const newContent = content.replace(regex, '$1' + newUrl + '$3');
  if (newContent !== content) {
    content = newContent;
    patched++;
  }
});

fs.writeFileSync(PRODUCTS_FILE, content);
console.log('Patched', patched, 'product image URLs in products.ts');
