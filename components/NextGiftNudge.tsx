'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface NextGiftNudgeProps {
  /** Page to send the visitor to next, e.g. /christmas-gifts-for-her */
  href: string;
  /** Short headline, e.g. "Stocking sorted?" */
  title: string;
  /** Call to action text, e.g. "Now find her main gift" */
  cta: string;
}

const SESSION_KEY = 'gs-next-gift-nudge';

function track(action: 'shown' | 'click' | 'dismiss', href: string) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.('event', 'next_gift_nudge', { nudge_action: action, from_page: location.pathname, to_page: href });
}

/**
 * After a visitor clicks a product link (Amazon opens in a new tab) and comes
 * back to this tab, offer the next holiday gift page. Once per session, never
 * on page load.
 */
export default function NextGiftNudge({ href, title, cta }: NextGiftNudgeProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let clicked = false;
    let alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1'; } catch { /* storage blocked */ }
    if (alreadyShown) return;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (a && /amazon\.com/i.test(a.getAttribute('href') ?? '')) clicked = true;
    };
    const onVisible = () => {
      if (document.visibilityState !== 'visible' || !clicked) return;
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* storage blocked */ }
      setShow(true);
      track('shown', href);
      cleanup();
    };
    const cleanup = () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('visibilitychange', onVisible);
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('visibilitychange', onVisible);
    return cleanup;
  }, [href]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label={title}
      className="fixed z-40 bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm rounded-2xl bg-white shadow-xl border border-[#F04E30]/25 p-4 pr-10 animate-[nudgeIn_260ms_ease-out]"
    >
      <button
        type="button"
        onClick={() => { setShow(false); track('dismiss', href); }}
        aria-label="Dismiss"
        className="absolute top-2 right-2 w-8 h-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <p className="text-sm font-bold text-[#1A202C]">{title}</p>
      <Link
        href={href}
        onClick={() => track('click', href)}
        className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#F04E30] underline underline-offset-2 hover:text-[#C2391F]"
      >
        {cta} <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
