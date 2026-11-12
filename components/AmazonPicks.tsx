// Small product links for data-led pages: a thumbnail link for table rows and a
// compact strip of picks under a section. Plain affiliate anchors, so the
// site-wide ClickTracker counts them (data-gift-name gives the dashboard a label).

import Image from 'next/image';
import type { AnyProduct } from '@/lib/giftSelect';
import Price from '@/components/Price';

const linkProps = { target: '_blank', rel: 'noopener sponsored' } as const;

export function PickThumbLink({ product }: { product: AnyProduct }) {
  return (
    <a
      href={product.affiliateUrl}
      {...linkProps}
      data-gift-name={product.name}
      className="inline-flex items-center gap-2 rounded-lg bg-[#F04E30] px-2.5 py-1 text-xs font-bold text-white hover:bg-[#d63f23] whitespace-nowrap"
      aria-label={`View ${product.name} on Amazon`}
    >
      Amazon
    </a>
  );
}

export function PickThumb({ product }: { product: AnyProduct }) {
  return (
    <a href={product.affiliateUrl} {...linkProps} data-gift-name={product.name} className="shrink-0" tabIndex={-1} aria-hidden="true">
      <Image
        src={product.image}
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 rounded-md object-cover bg-white border border-gray-100"
      />
    </a>
  );
}

export function PickStrip({ heading, products }: { heading: string; products: AnyProduct[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-bold text-gray-500 mb-2">{heading}</p>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {products.map((p) => (
          <li key={p.id} data-gift-name={p.name} className="bg-white rounded-xl border border-[#E2E8F0] p-2 flex flex-col">
            <a href={p.affiliateUrl} {...linkProps} className="block">
              <Image
                src={p.image}
                alt={p.name}
                width={240}
                height={240}
                className="w-full aspect-square rounded-lg object-cover bg-white"
              />
              <span className="mt-2 block text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{p.name}</span>
            </a>
            <span className="mt-auto pt-1 flex items-center justify-between gap-2 text-sm">
              <span className="font-bold text-gray-900 tabular-nums"><Price product={p} /></span>
              <a href={p.affiliateUrl} {...linkProps} className="text-xs font-bold text-[#F04E30] underline underline-offset-2">
                Amazon
              </a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
