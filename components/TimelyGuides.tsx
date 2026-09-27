'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Month-aware homepage "Timely Gift Guides" cards, mirroring SeasonalBanner:
// the season flips itself with no rebuild needed (client-side date, like the
// banner). Keep each season to exactly two cards.
interface Card {
  href: string;
  img: string;
  kicker: string;
  title: string;
  alt: string;
}

const SELF_CARE: Card = {
  href: '/self-care-gifts',
  img: '/images/heroes/self-care-gifts.jpg',
  kicker: 'Trending Now',
  title: 'Self-Care & Wellness Gifts',
  alt: 'Self-care and wellness gift ideas',
};

function cardsForMonth(month: number): Card[] {
  if (month === 9 || month === 10) {
    return [
      {
        href: '/halloween-party-gifts',
        img: '/images/heroes/halloween-party-gifts.jpg',
        kicker: 'Halloween Is Coming',
        title: 'Halloween Party Essentials',
        alt: 'Halloween party table with cauldron, skull glasses and treats',
      },
      SELF_CARE,
    ];
  }
  if (month === 11 || month === 12) {
    return [
      {
        href: '/christmas-gift-ideas',
        img: '/images/heroes/christmas-gift-ideas.jpg',
        kicker: 'Christmas Is Coming',
        title: 'Christmas Gift Ideas',
        alt: 'Christmas gift ideas for everyone on your list',
      },
      {
        href: '/stocking-stuffers',
        img: '/images/heroes/stocking-stuffers.jpg',
        kicker: 'Small Gifts, Big Wins',
        title: 'Stocking Stuffers',
        alt: 'Stocking stuffer gift ideas',
      },
    ];
  }
  return [
    {
      href: '/gifts-for-college-students',
      img: '/images/heroes/gifts-for-college-students.jpg',
      kicker: 'Back to School',
      title: 'Dorm & College Gifts',
      alt: 'Back-to-school dorm and college gift ideas',
    },
    SELF_CARE,
  ];
}

export default function TimelyGuides() {
  // Deterministic first render (evergreen cards) then swap in the seasonal
  // set after mount: same lesson as the InlineShuffle hydration fix, since a
  // statically prerendered Date can disagree with the visitor's month.
  const [month, setMonth] = useState<number | null>(null);
  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
  }, []);
  const cards = month === null ? cardsForMonth(0) : cardsForMonth(month);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((c) => (
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
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
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
  );
}
