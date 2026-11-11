'use client';

// Route-level error boundary. Without it, a script error anywhere in a page
// replaces the whole document with the framework's generic error screen and the
// page loses its title, canonical tag and content. With it, the root layout and
// the page's head tags stay in place and only this panel is shown.

import { useEffect } from 'react';
import { reportClientError } from '@/lib/clientErrors';

const POPULAR = [
  { href: '/shuffle', label: 'Shuffle a gift' },
  { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
  { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
  { href: '/gift-ideas-for-mom', label: 'Gifts for Mom' },
  { href: '/gift-ideas-for-dad', label: 'Gifts for Dad' },
  { href: '/gifts-under-50', label: 'Gifts Under $50' },
];

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    reportClientError({ message: error.message || 'render error', source: error.digest || 'error-boundary', fatal: true });
  }, [error]);

  return (
    <main id="main-content" className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16" style={{ background: '#FFF8F3' }}>
      <p className="text-sm font-bold uppercase tracking-widest text-[#C2391F] mb-2">Something went wrong</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: '#1A202C' }}>
        This page hit a snag
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        TheGiftShuffle could not finish loading this page. Try it again, or jump straight to a gift guide.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg mb-8"
      >
        Try again
      </button>
      <div className="flex flex-wrap justify-center gap-2 max-w-xl">
        {POPULAR.map((g) => (
          // Plain anchors on purpose: a full page load clears whatever state broke.
          <a
            key={g.href}
            href={g.href}
            className="text-sm font-medium px-4 py-2 rounded-full border border-[#F04E30]/40 text-[#C2391F] bg-white hover:border-[#F04E30] transition-colors"
          >
            {g.label}
          </a>
        ))}
      </div>
    </main>
  );
}
