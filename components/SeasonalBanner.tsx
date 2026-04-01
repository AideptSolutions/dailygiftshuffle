'use client';

import Link from 'next/link';

interface BannerConfig {
  text: string;
  gradient: string;
  href?: string;
}

function getBannerConfig(month: number): BannerConfig | null {
  switch (month) {
    case 1:
    case 2:
      return {
        text: "Valentine's Day is coming — find the perfect gift ❤️",
        gradient: 'linear-gradient(90deg, #e91e8c 0%, #f44336 100%)',
      };
    case 3:
    case 4:
      return {
        text: 'Spring gifting season is here 🌸',
        gradient: 'linear-gradient(90deg, #66bb6a 0%, #a5d6a7 100%)',
      };
    case 5:
      return {
        text: "Mother's Day is almost here 💐",
        gradient: 'linear-gradient(90deg, #f06292 0%, #f48fb1 100%)',
        href: '/gift-ideas-for-mom',
      };
    case 6:
      return {
        text: "Father's Day is coming up 🔧",
        gradient: 'linear-gradient(90deg, #1565c0 0%, #42a5f5 100%)',
        href: '/gift-ideas-for-dad',
      };
    case 11:
      return {
        text: 'Holiday shopping season starts now 🎄',
        gradient: 'linear-gradient(90deg, #c62828 0%, #388e3c 100%)',
      };
    case 12:
      return {
        text: 'Last-minute Christmas gifts that ship fast 🎁',
        gradient: 'linear-gradient(90deg, #c62828 0%, #e53935 100%)',
        href: '/christmas-gift-ideas',
      };
    default:
      return null;
  }
}

export default function SeasonalBanner() {
  const month = new Date().getMonth() + 1; // 1-12
  const config = getBannerConfig(month);

  if (!config) return null;

  const inner = (
    <span className="text-white text-sm font-semibold tracking-wide">
      {config.text}
    </span>
  );

  return (
    <div
      style={{ background: config.gradient }}
      className="w-full py-2.5 px-4 text-center"
    >
      {config.href ? (
        <Link href={config.href} className="hover:underline underline-offset-2">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}
