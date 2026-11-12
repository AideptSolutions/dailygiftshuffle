'use client';

import { useEffect, useState } from 'react';
import { PRICE_DISCLAIMER, formatAsOf, isPriceFresh } from '@/lib/livePrices';

/**
 * The one way to show a product's price.
 *
 * Shows the live Amazon price with the time it was fetched, or "See price on
 * Amazon" when there is no live price or it is more than 24 hours old (see
 * lib/livePrices.ts for why). Put it inside the element that styles the price:
 * the price text inherits that styling, the time stamp and the fallback are
 * set small and quiet.
 *
 * The first render trusts `priceAsOf` so it matches the server HTML; the age
 * check runs after mount, so a page built yesterday stops showing its prices
 * once they pass 24 hours.
 */
export default function Price({
  product,
  stamp = true,
}: {
  product: { priceDisplay: string; priceAsOf?: string };
  /** Set false only where another element right beside the price shows the time. */
  stamp?: boolean;
}) {
  const asOf = product.priceAsOf;
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    setExpired(Boolean(asOf) && !isPriceFresh(asOf));
  }, [asOf]);

  if (!asOf || expired) {
    return (
      <span className="text-xs font-semibold normal-case tracking-normal text-gray-500 whitespace-nowrap">
        See price on Amazon
      </span>
    );
  }
  return (
    <span className="inline-flex min-w-0 max-w-full flex-col items-start leading-tight" data-price-asof={asOf}>
      <span>{product.priceDisplay}</span>
      {stamp && (
        // Allowed to wrap: on a narrow two-column phone card the full stamp
        // is wider than the card.
        <span
          className="text-[10px] font-normal normal-case tracking-normal text-gray-500"
          title={PRICE_DISCLAIMER}
        >
          as of {formatAsOf(asOf)}
        </span>
      )}
    </span>
  );
}
