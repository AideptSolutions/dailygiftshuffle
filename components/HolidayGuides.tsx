import Image from 'next/image';
import Link from 'next/link';
import GuideLinkCards, { type GuideLink } from '@/components/GuideLinkCards';
import HolidayIcon from '@/components/HolidayIcon';

// The homepage "In Season" block during the Christmas window (see
// lib/season.ts): two feature cards plus photo cards for every holiday guide.
// Add new seasonal pages to MORE_GUIDES so the homepage links them.

const FEATURED = [
  {
    href: '/trending-christmas-gifts-2026',
    img: '/images/heroes/trending-christmas-gifts-2026.jpg',
    kicker: 'The 2026 Hot List',
    title: 'Trending Christmas Gifts',
    alt: 'Trending holiday gifts on cream linen with pine and coral ribbon',
  },
  {
    href: '/christmas-gift-ideas',
    img: '/images/heroes/christmas-gift-ideas.jpg',
    kicker: 'For Everyone on Your List',
    title: 'Christmas Gift Ideas',
    alt: 'Christmas gift ideas on cream linen with pine and coral ribbon',
  },
];

const MORE_GUIDES: GuideLink[] = [
  { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
  { href: '/christmas-gifts-for-her', label: 'Christmas Gifts for Her' },
  { href: '/christmas-gifts-for-him', label: 'Christmas Gifts for Him' },
  { href: '/secret-santa-gifts', label: 'Secret Santa Gifts' },
  { href: '/white-elephant-gifts', label: 'White Elephant Gifts' },
  { href: '/gifts-under-25', label: 'Gifts Under $25' },
];

export default function HolidayGuides() {
  return (
    <section className="py-14 px-4" style={{ background: '#FFFFFF' }}>
      <div className="max-w-5xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: '#C62828' }}>
          <HolidayIcon name="ornament" className="w-4 h-4" />
          The Holiday Shop
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-6" style={{ color: '#1A202C' }}>
          Christmas Gift Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {FEATURED.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative block rounded-2xl overflow-hidden"
              style={{ aspectRatio: '16 / 9' }}
            >
              <Image
                src={c.img}
                alt={c.alt}
                fill
                sizes="(max-width: 640px) 100vw, 496px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/85">{c.kicker}</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">{c.title}</h3>
                <span className="inline-block mt-2 text-sm font-semibold text-white underline underline-offset-2">
                  Shop the guide &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
        <GuideLinkCards links={MORE_GUIDES} compact />
      </div>
    </section>
  );
}
