import Link from 'next/link';
import Image from 'next/image';
import CategoryIcon from '@/components/CategoryIcon';
import { guideImageFor } from '@/lib/guideImages';

export interface GuideLink {
  href: string;
  label: string;
}

/**
 * Photo cards for internal guide links; links without art get the gift icon.
 * `compact` fits long lists (category browsing) into more, smaller columns.
 */
export default function GuideLinkCards({ links, compact = false }: { links: GuideLink[]; compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3'
          : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
      }
    >
      {links.map((link) => {
        const img = guideImageFor(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:border-[#F04E30] hover:shadow-md transition-all flex flex-col text-left"
          >
            <div
              className="relative w-full aspect-[3/2] overflow-hidden flex items-center justify-center"
              style={{ background: '#FFF3EE' }}
            >
              {img ? (
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes={compact ? '(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 160px' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px'}
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <CategoryIcon slug="gift" className="w-10 h-10 text-[#F04E30]" />
              )}
            </div>
            <span
              className={`${compact ? 'px-2 py-2 text-xs' : 'px-3 py-2.5 text-sm'} font-semibold leading-snug text-[#1A202C] group-hover:text-[#F04E30] transition-colors`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
