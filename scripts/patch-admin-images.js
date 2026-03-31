/**
 * patch-admin-images.js
 * Updates admin-products.json image fields to point to local AI-generated images.
 * Only patches products that have a corresponding file in public/images/products/.
 *
 * Usage:
 *   node scripts/patch-admin-images.js           # patch all
 *   node scripts/patch-admin-images.js --dry-run  # preview changes
 */

const fs = require('fs');
const path = require('path');

const ADMIN_JSON = path.join(__dirname, '../data/admin-products.json');
const IMAGES_DIR = path.join(__dirname, '../public/images/products');

function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');

  const products = JSON.parse(fs.readFileSync(ADMIN_JSON, 'utf8'));
  let patched = 0;
  let missing = 0;

  for (const product of products) {
    const filename = `${product.id}.jpg`;
    const imgPath = path.join(IMAGES_DIR, filename);
    const localUrl = `/images/products/${filename}`;

    if (product.image === localUrl) continue; // already patched

    if (fs.existsSync(imgPath)) {
      if (isDryRun) {
        console.log(`WOULD PATCH: ${product.id}`);
        console.log(`  old: ${(product.image || '(none)').slice(0, 80)}`);
        console.log(`  new: ${localUrl}`);
      } else {
        product.image = localUrl;
      }
      patched++;
    } else {
      missing++;
      if (isDryRun) {
        console.log(`MISSING IMAGE: ${product.id} (no file at ${filename})`);
      }
    }
  }

  if (!isDryRun && patched > 0) {
    fs.writeFileSync(ADMIN_JSON, JSON.stringify(products, null, 2) + '\n');
  }

  console.log(`\nResults: ${patched} patched | ${missing} missing images | ${products.length} total`);
  if (isDryRun) console.log('(dry run - no files changed)');
  if (!isDryRun && patched > 0) {
    console.log(`\nNext: Deploy to Vercel, then flush Redis via POST /api/admin/seed`);
  }
}

main();
