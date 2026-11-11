'use client';

// Last-resort boundary for an error in the root layout itself. It replaces the
// whole document, so it carries its own title and a self-referencing canonical
// and uses inline styles (the site stylesheet may not be available here).

import { useEffect } from 'react';
import { reportClientError } from '@/lib/clientErrors';

const SITE = 'https://www.thegiftshuffle.com';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    reportClientError({ message: error.message || 'layout error', source: error.digest || 'global-error-boundary', fatal: true });
  }, [error]);

  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <html lang="en">
      <head>
        <title>TheGiftShuffle: this page could not load</title>
        <link rel="canonical" href={`${SITE}${path}`} />
      </head>
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, sans-serif', background: '#FFF8F3', color: '#1A202C' }}>
        <main
          id="main-content"
          style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '64px 16px' }}
        >
          <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C2391F', margin: '0 0 8px' }}>
            TheGiftShuffle
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px' }}>This page hit a snag</h1>
          <p style={{ color: '#4B5563', maxWidth: 440, margin: '0 0 32px' }}>
            TheGiftShuffle is a free gift finder. This page could not finish loading. Try it again, or head to the
            home page to shuffle for a gift.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ background: '#F04E30', color: '#fff', fontWeight: 700, fontSize: 18, border: 0, borderRadius: 9999, padding: '16px 40px', cursor: 'pointer', marginBottom: 24 }}
          >
            Try again
          </button>
          <a href="/" style={{ color: '#C2391F', fontWeight: 600 }}>
            Go to the home page
          </a>
        </main>
      </body>
    </html>
  );
}
