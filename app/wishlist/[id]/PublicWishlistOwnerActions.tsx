'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SHARE_KEY = 'dgs_share';

interface Props {
  wishlistId: string;
}

export default function PublicWishlistOwnerActions({ wishlistId }: Props) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SHARE_KEY);
      if (!raw) return;
      const meta = JSON.parse(raw);
      if (meta?.id === wishlistId) setIsOwner(true);
    } catch {
      // ignore
    }
  }, [wishlistId]);

  if (!isOwner) return null;

  return (
    <div className="mb-4 p-3 bg-[#FF6B6B]/10 rounded-xl flex items-center justify-between gap-3">
      <p className="text-xs text-[#FF6B6B] font-semibold">You&apos;re viewing your own wishlist.</p>
      <Link
        href="/wishlist"
        className="text-xs font-bold text-white bg-[#FF6B6B] px-4 py-1.5 rounded-full hover:bg-[#e05555] transition-colors"
      >
        Edit Wishlist
      </Link>
    </div>
  );
}
