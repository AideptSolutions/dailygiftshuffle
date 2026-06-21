'use client';

// Site-wide affiliate click tracker. Mounted once in the root layout, it listens
// (in the capture phase) for clicks on ANY Amazon link anywhere on the site —
// so every product surface is covered automatically, including pages added later,
// with no per-link wiring. Middle-clicks (auxclick) are covered too.

import { useEffect } from 'react';
import { isAmazonUrl, trackAffiliateClick } from '@/lib/clickTracking';

export default function ClickTracker() {
  useEffect(() => {
    function handle(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.('a') as HTMLAnchorElement | null;
      if (!a?.href || !isAmazonUrl(a.href)) return;
      // Prefer a human-readable label if a card exposes one; fall back to the
      // link's accessible name or its text.
      const name =
        a.closest('[data-gift-name]')?.getAttribute('data-gift-name') ||
        a.getAttribute('aria-label') ||
        a.textContent?.trim() ||
        undefined;
      trackAffiliateClick({ url: a.href, name: name || undefined });
    }
    document.addEventListener('click', handle, { capture: true });
    document.addEventListener('auxclick', handle, { capture: true });
    return () => {
      document.removeEventListener('click', handle, { capture: true });
      document.removeEventListener('auxclick', handle, { capture: true });
    };
  }, []);
  return null;
}
