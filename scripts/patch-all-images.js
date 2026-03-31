/**
 * patch-all-images.js
 * Patches ALL image references in products.ts and products-catalog.ts:
 * - Direct placehold.co URLs
 * - img('...') helper function calls  
 * - amz('...') based images
 * Replaces with /images/products/{id}.jpg for any product that has a generated image.
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images/products');
const FILES = [
  path.join(__dirname, '../data/products.ts'),
  path.join(__dirname, '../data/products-catalog.ts'),
];

const imageFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.match(/\.(jpg|png)$/));
const imageIds = new Set(imageFiles.map(f => f.replace(/\.(jpg|png)$/, '')));
console.log('Generated images available:', imageFiles.length);

for (const filePath of FILES) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  let patched = 0;

  for (const file of imageFiles) {
    const id = file.replace(/\.(jpg|png)$/, '');
    const newUrl = '/images/products/' + file;
    const escapedId = id.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');

    // Pattern 1: id:'xxx' ... image:'https://...' (direct URL, any form)
    const re1 = new RegExp(
      `(id:\\s*'${escapedId}'[\\s\\S]{1,800}?image:\\s*')(https?://[^']+)(')`,
      'g'
    );

    // Pattern 2: id:'xxx' ... image:img('...') or image:img("...")
    const re2 = new RegExp(
      `(id:\\s*'${escapedId}'[\\s\\S]{1,800}?image:)(img\\([^)]+\\))`,
      'g'
    );

    const before = content;
    content = content.replace(re1, (m, pre, oldUrl, post) => { return pre + newUrl + post; });
    content = content.replace(re2, (m, pre, imgCall) => { return pre + "'" + newUrl + "'"; });
    if (content !== before) patched++;
  }

  fs.writeFileSync(filePath, content);
  const filename = path.basename(filePath);
  const remainingPlaceholders = (content.match(/placehold\.co/g) || []).length;
  const remainingImgHelper = (content.match(/image:img\(/g) || []).length;
  console.log(`${filename}: patched ${patched} | remaining placeholders: ${remainingPlaceholders} | remaining img(): ${remainingImgHelper}`);
}
