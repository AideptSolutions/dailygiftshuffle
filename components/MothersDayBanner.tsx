'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const DISMISS_KEY = 'md-banner-dismissed-2026';
const HIDE_AFTER = new Date('2026-05-12');
const LAST_MINUTE_CUTOFF = new Date('2026-05-09');

export default function MothersDayBanner() {
  const [visible, setVisible] = useState(false);
  const [isLastMinute, setIsLastMinute] = useState(false);

  useEffect(() => {
    if (new Date() >= HIDE_AFTER) return;
    if (localStorage.getItem(DISMISS_KEY)) return;
    setIsLastMinute(new Date() >= LAST_MINUTE_CUTOFF);
    setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  }

  return (
    <div
      className="w-full py-2.5 px-4 text-center relative"
      style={{ background: isLastMinute ? 'linear-gradient(90deg, #d32f2f 0%, #c62828 100%)' : 'linear-gradient(90deg, #f06292 0%, #e91e8c 100%)' }}
    >
      {isLastMinute ? (
        <Link
          href="/last-minute-mothers-day-gifts"
          className="text-white text-sm font-semibold tracking-wide hover:underline underline-offset-2"
        >
          Last chance. Mother&apos;s Day is May 10! Order today for guaranteed delivery →
        </Link>
      ) : (
        <span className="text-white text-sm font-semibold tracking-wide">
          Mother&apos;s Day is May 10:{' '}
          <Link href="/mothers-day-gifts" className="underline underline-offset-2 hover:opacity-90">
            Shop the Best Gifts for Mom
          </Link>
          {' '}or{' '}
          <Link href="/last-minute-mothers-day-gifts" className="underline underline-offset-2 hover:opacity-90">
            Last-Minute Picks That Ship Fast
          </Link>
        </span>
      )}
      <button
        onClick={dismiss}
        aria-label="Dismiss Mother's Day banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-base leading-none"
      >
        ✕
      </button>
    </div>
  );
}
