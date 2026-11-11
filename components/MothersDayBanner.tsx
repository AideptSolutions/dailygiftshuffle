'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mother's Day 2027 is Sunday, May 9. The banner runs April 1 through the day
// after (SeasonalBanner stays quiet in April and May and leaves them to this one),
// so it does not appear during the Christmas season.
const DISMISS_KEY = 'md-banner-dismissed-2027';
const SHOW_FROM = new Date('2027-04-01');
const HIDE_AFTER = new Date('2027-05-10');
const LAST_MINUTE_CUTOFF = new Date('2027-05-07');

export default function MothersDayBanner() {
  const [visible, setVisible] = useState(false);
  const [isLastMinute, setIsLastMinute] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (now < SHOW_FROM || now >= HIDE_AFTER) return;
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      // storage blocked: show the banner
    }
    setIsLastMinute(new Date() >= LAST_MINUTE_CUTOFF);
    setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch { /* storage blocked */ }
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
          Mother&apos;s Day is May 9! Last-minute picks, plus digital gifts sent by email →
        </Link>
      ) : (
        <span className="text-white text-sm font-semibold tracking-wide">
          Mother&apos;s Day is May 9:{' '}
          <Link href="/mothers-day-gifts" className="underline underline-offset-2 hover:opacity-90">
            Shop the Best Gifts for Mom
          </Link>
          {' '}or{' '}
          <Link href="/last-minute-mothers-day-gifts" className="underline underline-offset-2 hover:opacity-90">
            Last-Minute Picks
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
