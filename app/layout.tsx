import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Footer from '@/components/Footer';
import FavoritesSidebar from '@/components/FavoritesSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TheGiftShuffle — Find the Perfect Gift in Seconds',
  description:
    'Find the perfect gift for anyone in seconds. Pick a recipient, set a budget, and hit Shuffle for instant curated gift recommendations. Free to use, no sign-up required.',
  keywords: [
    'gift ideas',
    'gift finder',
    'gifts for mom',
    'gifts for dad',
    'gifts under 50',
    'birthday gift ideas',
    'christmas gift ideas',
    'unique gifts',
  ],
  openGraph: {
    title: 'TheGiftShuffle — Find the Perfect Gift in Seconds',
    description:
      'Pick a recipient, set a budget, hit SHUFFLE. Get a curated gift recommendation with a direct buy link.',
    type: 'website',
    url: 'https://thegiftshuffle.com',
    siteName: 'TheGiftShuffle',
    images: [
      {
        url: 'https://thegiftshuffle.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TheGiftShuffle — Find the Perfect Gift in Seconds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheGiftShuffle — Find the Perfect Gift',
    description: 'Pick a recipient, set a budget, hit SHUFFLE!',
    site: '@thegiftshuffle',
  },
  metadataBase: new URL('https://thegiftshuffle.com'),
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TheGiftShuffle',
  url: 'https://www.thegiftshuffle.com',
  description:
    'AI-curated gift discovery platform. Find unique, personalized gift ideas for anyone — filtered by recipient, occasion, and budget.',
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://thegiftshuffle.com/#website',
  url: 'https://thegiftshuffle.com',
  name: 'TheGiftShuffle',
  description:
    'Find the perfect gift in seconds. Pick a recipient, set a budget, hit Shuffle.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://thegiftshuffle.com/shuffle?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore - Impact uses non-standard 'value' attribute */}
        <meta name="impact-site-verification" value="0b37ca6c-ee3b-41cf-949f-69582e768b5e" />
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        {/* Skip-to-content link for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-[#F04E30] focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-2 focus:outline-[#F04E30]"
        >
          Skip to main content
        </a>
        {children}
        <Footer />
        <FavoritesSidebar />
        <Analytics />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
