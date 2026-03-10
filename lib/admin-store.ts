import fs from 'fs';
import path from 'path';
import { BudgetTier, NicheTag, Occasion, Recipient } from '@/data/products';

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay: string;
  image: string;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  asin: string;
  recipients: Recipient[];
  budgetTier: BudgetTier;
  occasions: Occasion[];
  tags: NicheTag[];
  status: 'draft' | 'published';
  cranes?: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORE_PATH = path.join(process.cwd(), 'data', 'admin-products.json');

export function readAdminProducts(): AdminProduct[] {
  try {
    // Try filesystem first (local dev / writable environments)
    const data = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(data) as AdminProduct[];
  } catch {
    // Fallback: static require() — Next.js/Vercel bundles this at build time
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require('../data/admin-products.json') as AdminProduct[];
    } catch {
      return [];
    }
  }
}

export function writeAdminProducts(products: AdminProduct[]): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify(products, null, 2));
}

export function getPublishedAdminProducts(): AdminProduct[] {
  return readAdminProducts().filter(p => p.status === 'published');
}
