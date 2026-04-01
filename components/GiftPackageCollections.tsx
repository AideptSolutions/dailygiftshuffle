'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

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
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gift Package Collections',
  description:
    'Curated gift baskets by category — gaming, tech, fitness, kitchen, outdoors, home, pets, and beauty.',
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
      className="group flex-none w-40 rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
      style={{ height: '200px' }}
    >
      {/* Image area — top 60% */}
      <div className="relative w-full" style={{ height: '120px' }}>
        {imgError ? (
          <div className={`w-full h-full bg-gradient-to-br ${cat.fallbackColor}`} />
        ) : (
          <Image
            src={cat.image}
            alt={cat.alt}
            fill
            unoptimized
            className="object-cover"
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
  return (
    <section className="py-14 px-4 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ color: '#1A202C' }}>
          Shop by Gift Package
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Curated collections for every type of person
        </p>

        {/* Scrollable row */}
        <div
          className="flex gap-4 overflow-x-auto pb-3
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
      </div>
    </section>
  );
}
