'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';

const categories = [
  {
    name: 'Gaming',
    tagline: 'Level up their setup',
    href: '/category/gaming',
    image: '/img/gift-baskets/gaming.jpg',
    alt: 'Gaming gift basket with controller, headset, and accessories',
    fallbackColor: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'Tech & Gadgets',
    tagline: "Gadgets they'll actually use",
    href: '/category/tech',
    image: '/img/gift-baskets/tech.jpg',
    alt: 'Tech and gadgets gift basket with smart devices and accessories',
    fallbackColor: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'Fitness & Wellness',
    tagline: 'Gear for the grind',
    href: '/category/fitness',
    image: '/img/gift-baskets/fitness.jpg',
    alt: 'Fitness and wellness gift basket with workout gear and supplements',
    fallbackColor: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Kitchen & Cooking',
    tagline: 'For the home chef',
    href: '/category/kitchen',
    image: '/img/gift-baskets/kitchen.jpg',
    alt: 'Kitchen and cooking gift basket with utensils and gourmet items',
    fallbackColor: 'from-orange-400 to-amber-500',
  },
  {
    name: 'Outdoors & Camping',
    tagline: 'Built for adventure',
    href: '/category/outdoors',
    image: '/img/gift-baskets/outdoors.jpg',
    alt: 'Outdoors and camping gift basket with gear for hiking and adventure',
    fallbackColor: 'from-lime-500 to-green-700',
  },
  {
    name: 'Home & Decor',
    tagline: 'Make their space cozy',
    href: '/category/home',
    image: '/img/gift-baskets/home.jpg',
    alt: 'Home and decor gift basket with candles, throws, and cozy items',
    fallbackColor: 'from-rose-400 to-pink-500',
  },
  {
    name: 'Pets',
    tagline: 'For the fur babies',
    href: '/category/pets',
    image: '/img/gift-baskets/pets.jpg',
    alt: 'Pets gift basket with toys, treats, and accessories for dogs and cats',
    fallbackColor: 'from-yellow-400 to-orange-400',
  },
  {
    name: 'Beauty & Self-Care',
    tagline: 'Treat them right',
    href: '/category/beauty',
    image: '/img/gift-baskets/beauty.jpg',
    alt: 'Beauty and self-care gift basket with skincare, bath, and wellness items',
    fallbackColor: 'from-fuchsia-400 to-pink-600',
  },
  {
    name: 'Baby Shower',
    tagline: 'For the new arrival',
    href: '/category/baby-shower',
    image: '/img/gift-baskets/baby-shower.jpg',
    alt: 'Baby shower gift basket with swaddle, toys, and accessories',
    fallbackColor: 'from-yellow-200 to-pink-300',
  },
  {
    name: 'Wedding Gifts',
    tagline: 'Celebrate their love',
    href: '/category/wedding',
    image: '/img/gift-baskets/wedding.jpg',
    alt: 'Wedding gift basket with champagne flutes and keepsakes',
    fallbackColor: 'from-rose-200 to-pink-400',
  },
  {
    name: 'Travel',
    tagline: 'Pack smarter, gift better',
    href: '/category/travel',
    image: '/img/gift-baskets/travel.jpg',
    alt: 'Travel gift basket with packing cubes and travel accessories',
    fallbackColor: 'from-sky-400 to-blue-600',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Package Collections',
  description:
    'Curated gift baskets by category — gaming, tech, fitness, kitchen, outdoors, home, pets, beauty, baby shower, wedding, and travel.',
  itemListElement: categories.map((cat, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: cat.name,
    url: `https://thegiftshuffle.com${cat.href}`,
  })),
};

function CategoryCard({ cat }: { cat: (typeof categories)[number] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={cat.href}
      className="group flex-none rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200"
      style={{ width: '176px', height: '220px' }}
    >
      {/* Image area — top 60% */}
      <div className="relative w-full overflow-hidden" style={{ height: '132px' }}>
        {imgError ? (
          <div className={`w-full h-full bg-gradient-to-br ${cat.fallbackColor} transition-transform duration-200 group-hover:scale-[1.35]`} />
        ) : (
          <Image
            src={cat.image}
            alt={cat.alt}
            fill
            unoptimized
            className="object-cover transition-transform duration-200 group-hover:scale-[1.35]"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Text area — bottom 40% */}
      <div className="px-3 py-2 flex flex-col gap-0.5">
        <p className="font-bold text-sm text-[#1A202C] leading-tight group-hover:text-[#F04E30] transition-colors">
          {cat.name}
        </p>
        <p className="text-xs text-gray-500 leading-snug">{cat.tagline}</p>
      </div>
    </Link>
  );
}

export default function GiftPackageCollections() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 400 : -400, behavior: 'smooth' });
  };

  return (
    <section className="py-14 px-4 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ color: '#1A202C' }}>
          Curated &amp; Customizable Gift Packages
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Curated collections for every type of person
        </p>

        {/* Scroll container with arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-150"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-3 px-1
              [scrollbar-width:none] sm:[scrollbar-width:auto]
              [-ms-overflow-style:none] sm:[-ms-overflow-style:auto]
              [&::-webkit-scrollbar]:hidden sm:[&::-webkit-scrollbar]:block
              sm:[&::-webkit-scrollbar]:h-1.5
              sm:[&::-webkit-scrollbar-track]:rounded-full
              sm:[&::-webkit-scrollbar-track]:bg-gray-100
              sm:[&::-webkit-scrollbar-thumb]:rounded-full
              sm:[&::-webkit-scrollbar-thumb]:bg-[#F04E30]/40"
          >
            {categories.map((cat) => (
              <CategoryCard key={cat.href} cat={cat} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-150"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
