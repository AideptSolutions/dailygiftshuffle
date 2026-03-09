import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'About TheGiftShuffle — Our Editorial Policy & Mission',
  description:
    'Learn how TheGiftShuffle curates gift recommendations. Every product is hand-picked based on Amazon ratings, review count, and real recipient fit. No pay-to-play.',
  openGraph: {
    title: 'About TheGiftShuffle — Our Editorial Policy & Mission',
    description:
      'TheGiftShuffle curates gift recommendations based on Amazon ratings 4.3+, 1,000+ reviews, and genuine value-for-money. Learn about our editorial standards.',
    type: 'website',
    url: 'https://thegiftshuffle.com/about',
  },
};

const giftGuides = [
  { href: '/gift-ideas-for-mom', label: 'Gift Ideas for Mom' },
  { href: '/gift-ideas-for-dad', label: 'Gift Ideas for Dad' },
  { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
  { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
  { href: '/gifts-under-50', label: 'Gifts Under $50' },
  { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
  { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}>
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12" id="main-content">
        <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">About TheGiftShuffle</h1>
            <p className="text-gray-500">Your daily gift discovery engine</p>
            <p className="text-xs text-gray-400 mt-1">Last Updated: March 2025</p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h2>
              <p>
                <strong>TheGiftShuffle</strong> exists to solve one of life&apos;s most common
                problems: finding the right gift for someone you care about — in under 60 seconds.
                Whether it&apos;s a birthday, anniversary, holiday, or just because, we help you
                go from &ldquo;no idea&rdquo; to &ldquo;perfect pick&rdquo; instantly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Editorial Policy</h2>
              <p>
                Every product in our catalog is hand-picked by our editorial team. We do not accept
                paid placements — every recommendation earns its spot on merit alone. Our selection
                criteria:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-600">
                <li><strong>Amazon rating of 4.3 or higher</strong> — only genuinely well-loved products</li>
                <li><strong>Minimum 1,000 customer reviews</strong> — enough signal to trust the rating</li>
                <li><strong>Strong value for money</strong> — great products at fair prices</li>
                <li><strong>Genuine recipient fit</strong> — would a real person actually want this?</li>
                <li><strong>No pay-to-play</strong> — brands cannot buy their way into our catalog</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">How the Shuffle Works</h2>
              <p>
                TheGiftShuffle uses a smart matching algorithm to surface the most relevant
                gift from our curated catalog based on three signals: who the gift is for
                (recipient type), your budget, and the occasion. We track which products
                you&apos;ve already seen in your current session so you never get the same
                recommendation twice in a row — every shuffle reveals something new.
              </p>
              <ol className="list-decimal list-inside mt-3 space-y-1 text-gray-600">
                <li>Pick who the gift is for (Mom, Dad, Teens, Pets, and more)</li>
                <li>Choose your budget tier (Under $25 to $250+)</li>
                <li>Optionally filter by occasion (Birthday, Anniversary, Holiday...)</li>
                <li>Hit <strong style={{ color: '#F04E30' }}>SHUFFLE</strong> for an instant recommendation</li>
                <li>Save gifts to your wishlist to revisit later</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Affiliate Disclosure</h2>
              <p className="text-sm text-gray-500">
                TheGiftShuffle participates in the Amazon Associates Program, an affiliate
                advertising program designed to provide a means for sites to earn advertising fees
                by advertising and linking to Amazon.com. When you click a product link and make a
                purchase, we earn a small commission — at no extra cost to you. This affiliate
                income helps us keep the site free, maintain our catalog, and keep the
                recommendations flowing. Our editorial recommendations are never influenced by
                affiliate relationships.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Popular Gift Guides</h2>
              <ul className="space-y-2">
                {giftGuides.map((g) => (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      className="text-[#F04E30] hover:underline font-medium"
                    >
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Contact</h2>
              <p>
                Have a question, product suggestion, or feedback? We&apos;d love to hear from you.
              </p>
              <p className="mt-1">
                Email:{' '}
                <a
                  href="mailto:hello@thegiftshuffle.com"
                  className="text-[#F04E30] hover:underline"
                >
                  hello@thegiftshuffle.com
                </a>
              </p>
            </section>
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
