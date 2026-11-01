'use client';

import Link from 'next/link';
import HolidayIcon, { type HolidayIconName } from '@/components/HolidayIcon';

interface BannerLink {
  label: string;
  href: string;
}

interface BannerConfig {
  text: string;
  gradient: string;
  href?: string;
  links?: BannerLink[];
  icon?: HolidayIconName;
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
      // Father's Day is the third Sunday of June (June 20 in 2027). June 2026
      // ran a one-time World Cup banner here instead.
      return {
        text: "Father's Day is coming up:",
        gradient: 'linear-gradient(90deg, #1565c0 0%, #0d47a1 100%)',
        links: [
          { label: "Father's Day Gifts", href: '/fathers-day-gifts' },
          { label: 'Top 10 for Dad', href: '/top-10-fathers-day-gifts' },
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
    case 9:
    case 10:
      // Halloween party season: search ramps mid-Sep and peaks the first
      // three weeks of October.
      return {
        text: 'Throwing a Halloween party?',
        gradient: 'linear-gradient(90deg, #EA580C 0%, #6D28D9 100%)',
        links: [
          { label: 'Halloween Party Essentials', href: '/halloween-party-gifts' },
          { label: 'Gifts Under $25', href: '/gifts-under-25' },
        ],
      };
    case 11:
      return {
        text: 'Holiday shopping season starts now:',
        gradient: 'linear-gradient(90deg, #c62828 0%, #388e3c 100%)',
        icon: 'snowflake',
        links: [
          { label: 'Christmas Gift Ideas', href: '/christmas-gift-ideas' },
          { label: 'Stocking Stuffers', href: '/stocking-stuffers' },
        ],
      };
    case 12:
      return {
        text: 'Out of time? Last-minute Christmas gift ideas, including digital gift cards',
        gradient: 'linear-gradient(90deg, #c62828 0%, #e53935 100%)',
        icon: 'snowflake',
        href: '/last-minute-christmas-gifts',
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
        {config.icon && (
          <HolidayIcon name={config.icon} className="inline-block w-4 h-4 -mt-0.5 mr-1.5 align-middle" />
        )}
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
