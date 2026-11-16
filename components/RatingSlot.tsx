'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { usesGiftRating } from '@/lib/ratingMode';

/**
 * The one place a product's rating is shown.
 *
 * Wrap the existing stars-and-review-count markup in it. On a page that still
 * uses the old stars (lib/ratingMode.ts) it renders exactly that markup inside
 * the same container as before. On a page that uses the GiftShuffle rating it
 * renders our own stars instead: solid coral, rounded, labelled "GiftShuffle
 * rating", and never a review count, so it cannot be taken for Amazon's.
 */
export default function RatingSlot({
  product,
  className,
  as: Tag = 'div',
  show = true,
  children,
}: {
  product: { id?: string; gsRating?: number | null };
  /** Classes for the container, the same ones the old markup used. */
  className?: string;
  as?: 'div' | 'span';
  /** Old-stars mode only: whether there is anything to show (e.g. rating > 0). */
  show?: boolean;
  /** The old stars and review count. */
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (!usesGiftRating(pathname)) {
    return show ? <Tag className={className}>{children}</Tag> : null;
  }
  const rating = product.gsRating;
  if (rating == null) return null;
  return (
    <Tag className={className}>
      <GiftStars rating={rating} />
    </Tag>
  );
}

const STAR = 'M12 3.2l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z';

function StarRow({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 126 24" width="74" height="14" aria-hidden="true" className="block">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={STAR}
          transform={`translate(${i * 25.5} 0)`}
          fill={color}
          stroke={color}
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/** Our own five stars: coral and rounded, with the number and a plain label. */
export function GiftStars({ rating }: { rating: number }) {
  const value = rating.toFixed(1);
  return (
    <span
      className="inline-flex flex-col items-start leading-tight"
      role="img"
      aria-label={`GiftShuffle rating ${value} out of 5`}
      title="Our own editorial rating of how good a gift this is. Not a customer rating."
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="relative inline-block">
          <StarRow color="#E7DCD7" />
          <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
            <StarRow color="#F04E30" />
          </span>
        </span>
        <span className="text-xs font-extrabold text-gray-900 tabular-nums">{value}</span>
      </span>
      <span className="text-[10px] font-normal text-gray-500">GiftShuffle rating</span>
    </span>
  );
}
