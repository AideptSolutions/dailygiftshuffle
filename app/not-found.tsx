import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Page Not Found | TheGiftShuffle',
  robots: { index: false },
};

const POPULAR = [
  { href: '/gift-ideas-for-mom', label: 'Gifts for Mom' },
  { href: '/gift-ideas-for-dad', label: 'Gifts for Dad' },
  { href: '/stocking-stuffers', label: 'Stocking Stuffers' },
  { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
  { href: '/gifts-under-50', label: 'Gifts Under $50' },
  { href: '/gift-genie', label: 'Gift Genie' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFF8F3' }}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16" id="main-content">
        <Image src="/img/not-found.webp" alt="" width={200} height={200} priority className="mb-6" />
        <p className="text-sm font-bold uppercase tracking-widest text-[#F04E30] mb-2">404</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: '#1A202C' }}>
          This one came up empty
        </h1>
        <p className="text-gray-600 max-w-md mb-8">
          The page you were looking for has moved or never existed. The gifts are still here,
          though: shuffle for one, or jump into a popular guide.
        </p>
        <Link
          href="/shuffle"
          className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg mb-8"
        >
          Shuffle a Gift
        </Link>
        <div className="flex flex-wrap justify-center gap-2 max-w-xl">
          {POPULAR.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="text-sm font-medium px-4 py-2 rounded-full border border-[#F04E30]/40 text-[#C2391F] bg-white hover:border-[#F04E30] transition-colors"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
