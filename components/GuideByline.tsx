// Visible byline plus Article markup for a gift guide: who wrote it, when it
// was published and when it last changed. Dates come from lib/pageDates.ts, so
// this line, the sitemap lastmod and the markup always agree. A page can pass
// `updated` to show a hand-set review date instead.

import Link from 'next/link';
import { formatPageDate, pageDates } from '@/lib/pageDates';

const BASE = 'https://www.thegiftshuffle.com';
const ORG_ID = `${BASE}/#organization`;

export const GUIDE_AUTHOR = {
  '@type': 'Person',
  name: 'AJ Crane',
  url: `${BASE}/about`,
  jobTitle: 'Founder',
  worksFor: { '@id': ORG_ID },
} as const;

export interface GuideBylineProps {
  /** Route path, e.g. "/stocking-stuffers". */
  path: string;
  /** Page title; a trailing " | TheGiftShuffle" is dropped. */
  headline: string;
  description?: string | null;
  /** Hero image, site-relative or absolute. */
  image?: string;
  /** ISO date of a hand-set content review; overrides the recorded date. */
  updated?: string;
  className?: string;
}

export default function GuideByline({ path, headline, description, image, updated, className }: GuideBylineProps) {
  const dates = pageDates(path);
  const modified = updated ?? dates.modified;
  const url = `${BASE}${path}`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: headline.replace(/\s*\|\s*TheGiftShuffle\s*$/, '').slice(0, 110),
    ...(description ? { description } : {}),
    ...(image ? { image: image.startsWith('http') ? image : `${BASE}${image}` } : {}),
    url,
    mainEntityOfPage: url,
    author: GUIDE_AUTHOR,
    publisher: { '@id': ORG_ID },
    ...(dates.published ? { datePublished: dates.published } : {}),
    ...(modified ? { dateModified: modified } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <p className={className ?? 'text-sm text-gray-500 -mt-2 mb-5'}>
        By{' '}
        <Link href="/about" rel="author" className="font-medium text-gray-700 underline underline-offset-2 hover:text-[#C2391F]">
          AJ Crane
        </Link>
        {modified && (
          <>
            <span aria-hidden="true"> · </span>
            Updated <time dateTime={modified}>{formatPageDate(modified)}</time>
          </>
        )}
      </p>
    </>
  );
}
