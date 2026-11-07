// Server-only: resolves a click key (ASIN) to its catalog product name. Kept out
// of lib/clickTracking.ts, which ships to the browser, so the catalogs stay
// out of the client bundle.

import { products } from '@/data/products';
import productCatalog from '@/data/products-catalog';
import { parseAsin } from '@/lib/clickTracking';

export function catalogNamesByAsin(): Map<string, string> {
  const names = new Map<string, string>();
  for (const p of [...products, ...productCatalog]) {
    const a = parseAsin(p.affiliateUrl);
    if (a && !names.has(a)) names.set(a, p.name);
  }
  return names;
}
