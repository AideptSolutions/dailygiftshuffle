import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'About - TheGiftShuffle',
  description: 'Learn about TheGiftShuffle - your daily gift discovery engine.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}>
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">About TheGiftShuffle</h1>
            <p className="text-gray-500">Your daily gift discovery engine</p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong>TheGiftShuffle</strong> was built to solve one of life&apos;s most common
              problems: finding the right gift for someone you care about. Whether it&apos;s a birthday,
              anniversary, holiday, or just because — we&apos;ve got you covered.
            </p>

            <p>
              Our curated catalog features 100+ handpicked products across all budgets and recipient
              types. Every recommendation comes with a direct Amazon link so you can go from idea to
              checkout in seconds.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Pick who the gift is for (Mom, Dad, Teens, Pets, and more)</li>
              <li>Choose your budget tier (Under $25 to $250+)</li>
              <li>Optionally filter by occasion (Birthday, Anniversary, Holiday...)</li>
              <li>Hit <strong style={{ color: '#F04E30' }}>SHUFFLE</strong> and get an instant recommendation</li>
              <li>Save gifts to your wishlist to revisit later</li>
            </ol>

            <h2 className="text-xl font-bold text-gray-900 mt-8">Affiliate Disclosure</h2>
            <p className="text-sm text-gray-500">
              TheGiftShuffle participates in the Amazon Associates Program. We earn a small
              commission when you purchase through our links — at no extra cost to you. This helps
              keep the site free and the recommendations flowing.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link href="/shuffle" className="btn-shuffle text-white font-bold px-10 py-4 rounded-full inline-block text-lg">
              Start Shuffling
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
