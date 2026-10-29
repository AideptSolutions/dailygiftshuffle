import { redirect } from 'next/navigation';

// Products are managed in data/products-catalog.ts (the Redis admin catalog was
// merged in on 2026-10-29); the admin area is now click analytics only.
export default function AdminPage() {
  redirect('/admin/clicks');
}
