'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const DISMISS_KEY = 'md-banner-dismissed-2026';
const HIDE_AFTER = new Date('2026-05-12');

export default function MothersDayBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() >= HIDE_AFTER) return;
    if (localStorage.getItem(DISMISS_KEY)) return;
    setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  }

  return (
    <div className="bg-gradient-to-r from-pink-100 to-rose-100 border border-rose-200 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <Link
          href="/mothers-day-gifts"
          className="text-sm sm:text-base font-medium text-rose-700 hover:text-rose-900 transition-colors flex-1"
        >
          💐 Mother&apos;s Day is May 11 — Shop the Best Gifts for Mom →
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss Mother's Day banner"
          className="text-rose-400 hover:text-rose-700 transition-colors text-lg leading-none flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
