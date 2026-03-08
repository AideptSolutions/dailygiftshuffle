import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import FavoritesSidebar from '@/components/FavoritesSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TheGiftShuffle — Find the Perfect Gift in Seconds',
  description:
    'Discover the perfect gift for anyone on your list. Pick a recipient, set a budget, and let TheGiftShuffle curate a surprise recommendation just for you.',
  keywords: ['gift ideas', 'gift finder', 'gift recommendations', 'birthday gifts', 'holiday gifts'],
  openGraph: {
    title: 'TheGiftShuffle — Find the Perfect Gift in Seconds',
    description:
      'Pick a recipient, set a budget, hit SHUFFLE. Get a curated gift recommendation with a direct buy link.',
    type: 'website',
    url: 'https://thegiftshuffle.com',
    images: [
      {
        url: 'https://placehold.co/1200x630/FF6B6B/FFFFFF?text=TheGiftShuffle',
        width: 1200,
        height: 630,
        alt: 'TheGiftShuffle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheGiftShuffle — Find the Perfect Gift',
    description: 'Pick a recipient, set a budget, hit SHUFFLE!',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎁</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
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
      </body>
    </html>
  );
}
