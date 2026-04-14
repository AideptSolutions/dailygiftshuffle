import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import InlineShuffle from '@/components/InlineShuffle';

export const metadata: Metadata = {
  title: 'Best Teacher Appreciation Gift Ideas 2026 | TheGiftShuffle',
  description:
    'The best teacher appreciation gift ideas for 2026. Thoughtful picks for Teacher Appreciation Week in May and end-of-year gifts — coffee, spa sets, stationery, and more.',
  keywords: [
    'teacher appreciation gifts',
    'gift ideas for teachers',
    'best teacher gifts 2026',
    'teacher appreciation week gifts',
    'end of school year teacher gifts',
  ],
  openGraph: {
    title: 'Best Teacher Appreciation Gift Ideas 2026 | TheGiftShuffle',
    description:
      'Browse the best teacher appreciation gift ideas for 2026 — coffee, spa sets, stationery, plants, and more.',
    type: 'website',
    url: 'https://thegiftshuffle.com/gift-ideas-for-teachers',
  },
  alternates: {
    canonical: 'https://thegiftshuffle.com/gift-ideas-for-teachers',
  },
};

// Teacher-appropriate products: picks from the catalog that work as teacher gifts
const teacherProductIds = [
  'mom-25-1',      // Luxury Tea Gift Set
  'her-u25-5',     // Inspirational Quote Mug
  'cow-u25-1',     // Desktop Succulent Planter
  'her-u25-4',     // Floral Scented Candle
  'her-25-4',      // Jade Face Roller & Gua Sha Set
  'her-u25-1',     // Rose Gold Journal
  'lux-50-2',      // Monogrammed Leather Journal
  'hob-25-1',      // Calligraphy Pen Starter Set
  'mom-25-2',      // Silk Eye Mask & Earplugs Spa Set
  'mom-50-2',      // Personalized Jewelry Box
  'friends-u25-2', // Mini Succulent Planter Set
  'her-25-1',      // Aromatherapy Diffuser
  'lux-50-3',      // Luxury Candle Gift Set
  'him-25-2',      // Insulated Tumbler 30oz
  'friends-100-2', // Ember Temperature Mug 2
  'her-50-2',      // Kindle Paperwhite E-Reader
  'bty-u25-1',     // Vitamin C Brightening Face Serum
  'emp-50-2',      // Premium Gift Box Spa Set
];

const teacherProducts = teacherProductIds
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean) as typeof products;

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thegiftshuffle.com' },
    { '@type': 'ListItem', position: 2, name: 'Gift Ideas for Teachers', item: 'https://thegiftshuffle.com/gift-ideas-for-teachers' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Teacher Appreciation Gift Ideas 2026',
  description: 'Hand-picked teacher appreciation gift ideas curated by TheGiftShuffle',
  url: 'https://thegiftshuffle.com/gift-ideas-for-teachers',
  numberOfItems: teacherProducts.length,
  itemListElement: teacherProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.affiliateUrl,
  })),
};

export default function GiftIdeasForTeachersPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <Breadcrumbs
        items={[
          { label: 'Gift Ideas for Teachers', href: '/gift-ideas-for-teachers' },
        ]}
      />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Teacher Appreciation Gift Ideas 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Teacher Appreciation Week lands in May, right before the end-of-school sprint. Whether you are
            shopping for the teacher who shaped your kid&apos;s year or the one who somehow kept the class together
            through every field trip and fire drill, these picks are a cut above the generic gift card and the
            obligatory mug. They work for the classroom, the commute, and the long summer off that teachers
            genuinely need.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={teacherProducts} heading="Shuffle Teacher Gift Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Teacher Appreciation Gifts
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {teacherProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Why Teachers Love These */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t border-gray-100">
          <h2 className="text-2xl font-bold mb-5" style={{ color: '#1A202C' }}>
            Why Teachers Love These
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-xl">☕</span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Teachers run on coffee and tea.</strong> A premium tea set or an insulated tumbler that keeps
                drinks hot through three parent emails and a staff meeting is genuinely used every day. The Ember
                Mug 2 is the upgrade they would never buy themselves.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">🌿</span>
              <p className="text-gray-700 leading-relaxed">
                <strong>A plant or candle brightens the classroom.</strong> Desktop succulents are low-maintenance
                enough to survive summer break and pretty enough to make a desk worth coming back to in September.
                A quality candle for home is an after-school decompressor they will reach for every evening.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">📓</span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Teachers love to write things down.</strong> A beautiful journal or a quality leather
                notebook respects the fact that lesson planning, note-taking, and reflection are a real part
                of the job. Skip the dollar store notepad.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">🛁</span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Self-care gifts land especially hard for teachers.</strong> The job is relentless from
                September to June. A spa set, a silk sleep mask, or a jade face roller is giving them permission
                to finally take care of themselves when the school year is over.
              </p>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Not Sure What to Pick?
            </h2>
            <p className="text-gray-600 mb-6">
              Use TheGiftShuffle to narrow it down by personality and budget. Takes about 30 seconds.
            </p>
            <Link
              href="/shuffle"
              className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              Try the Gift Shuffle →
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>Related Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/', label: 'Home' },
              { href: '/graduation-gifts', label: 'Graduation Gifts 2026' },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
              { href: '/gift-ideas-for-friends', label: 'Gift Ideas for Friends' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/gifts-under-25', label: 'Gifts Under $25' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-[#F04E30] text-[#F04E30] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#F04E30] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
