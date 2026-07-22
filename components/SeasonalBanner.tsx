'use client';

import Link from 'next/link';

interface BannerLink {
  label: string;
  href: string;
}

interface BannerConfig {
  text: string;
  gradient: string;
  href?: string;
  links?: BannerLink[];
}

function getBannerConfig(month: number): BannerConfig | null {
  switch (month) {
    case 1:
    case 2:
      return {
        text: "Valentine's Day is coming, find the perfect gift",
        gradient: 'linear-gradient(90deg, #e91e8c 0%, #f44336 100%)',
      };
    case 3:
      return {
        text: 'Spring gifting season is here',
        gradient: 'linear-gradient(90deg, #66bb6a 0%, #a5d6a7 100%)',
      };
    case 4:
    case 5:
      // Mother's Day banner handles April + May — no duplicate
      return null;
    case 6:
      // Summer 2026: World Cup co-hosted in the US (one-time event; revisit in 2027)
      return {
        text: 'The 2026 World Cup is here:',
        gradient: 'linear-gradient(90deg, #1565c0 0%, #d32f2f 100%)',
        links: [
          { label: 'Soccer Fan Gifts', href: '/world-cup-gifts' },
          { label: 'Patriotic Gifts', href: '/patriotic-gifts' },
        ],
      };
    case 7:
    case 8:
      // Late-summer back-to-school / dorm shopping season
      return {
        text: 'Back-to-school season is here:',
        gradient: 'linear-gradient(90deg, #f04e30 0%, #f9a825 100%)',
        links: [
          { label: 'Dorm & College Gifts', href: '/gifts-for-college-students' },
          { label: 'Gifts Under $50', href: '/gifts-under-50' },
        ],
      };
    case 11:
      return {
        text: 'Holiday shopping season starts now',
        gradient: 'linear-gradient(90deg, #c62828 0%, #388e3c 100%)',
      };
    case 12:
      return {
        text: 'Last-minute Christmas gifts that ship fast',
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

  return (
    <div style={{ background: config.gradient }} className="w-full py-2.5 px-4 text-center">
      <span className="text-white text-sm font-semibold tracking-wide">
        {config.href ? (
          <Link href={config.href} className="hover:underline underline-offset-2">
            {config.text}
          </Link>
        ) : (
          config.text
        )}
        {config.links?.map((l, i) => (
          <span key={l.href}>
            {' '}
            <Link href={l.href} className="underline underline-offset-2 hover:opacity-90">
              {l.label}
            </Link>
            {i < (config.links?.length ?? 0) - 1 ? ' ·' : ''}
          </span>
        ))}
      </span>
    </div>
  );
}
