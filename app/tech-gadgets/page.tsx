import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import InlineShuffle from '@/components/InlineShuffle';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Best Tech Gifts & Gadgets 2026: Top Picks for Every Budget | TheGiftShuffle',
  description:
    'The best tech gifts of 2026: wireless earbuds with 40+ hour battery, 4K webcams for remote work, and portable power stations. Curated picks with real specs.',
  keywords: [
    'tech gifts 2026',
    'best tech gifts',
    'gadget gifts',
    'tech gifts for him',
    'tech gifts for her',
    'cool tech gifts',
    'best gadgets 2026',
    'wireless earbuds gift',
    'webcam gift',
    'portable charger gift',
  ],
  openGraph: {
    title: 'Best Tech Gifts & Gadgets 2026 | TheGiftShuffle',
    description:
      'Curated tech gift picks with real specs, wireless earbuds, 4K webcams, ultrawide monitors, and portable power.',
    type: 'website',
    url: 'https://www.thegiftshuffle.com/tech-gadgets',
    images: [
      {
        url: 'https://www.thegiftshuffle.com/api/og?title=Best%20Tech%20Gifts%20%26%20Gadgets%202026%20%7C%20TheGiftShuffle',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://www.thegiftshuffle.com/tech-gadgets',
  },
};

const techProducts = [
  {
    id: 'tech-sony-wf1000xm6',
    name: 'Sony WF-1000XM6 Wireless Earbuds',
    description: "Sony's 2026 flagship earbuds with industry-leading noise cancellation, 24 hours total battery life, and studio-quality sound.",
    price: 299.99,
    priceDisplay: '$299.99',
    image: '/images/products/tech-sony-wf1000xm6.jpg',
    rating: 4.8,
    reviewCount: 1240,
    affiliateUrl: 'https://www.amazon.com/Sony-WF-1000XM6-Cancelling-Headphones-Studio-Quality/dp/B0G6HLWS6Q?linkCode=ll2&tag=dailygiftshuf-20&linkId=483d5612f86a8351de3b2cc2b8030698&language=en_US&ref_=as_li_ss_tl',
    recipients: ['him', 'her', 'teens'],
    budgetTier: '250plus',
    tags: ['tech', 'luxury'],
  },
  {
    id: 'tech-bose-qc-ultra-earbuds',
    name: 'Bose QuietComfort Ultra Earbuds',
    description: "Bose's premium wireless earbuds with Immersive Audio spatial processing, 30 total hours battery, and legendary comfort.",
    price: 299.00,
    priceDisplay: '$299.00',
    image: '/images/products/tech-bose-qc-ultra-earbuds.jpg',
    rating: 4.7,
    reviewCount: 2180,
    affiliateUrl: 'https://www.amazon.com/Bose-New-QuietComfort-Ultra-Earbuds/dp/B0FDKQYGS3?linkCode=ll2&tag=dailygiftshuf-20&linkId=daf1bd3294052b5c5f697db976d017ea&language=en_US&ref_=as_li_ss_tl',
    recipients: ['him', 'her', 'teens'],
    budgetTier: '250plus',
    tags: ['tech', 'luxury'],
  },
  {
    id: 'tech-logitech-mx-brio',
    name: 'Logitech MX Brio 4K Webcam',
    description: '4K/30fps webcam with Sony STARVIS sensor, AI auto-framing, dual noise-canceling mics, and USB-C 3.2 for hybrid workers.',
    price: 199.99,
    priceDisplay: '$199.99',
    image: '/images/products/tech-logitech-mx-brio.jpg',
    rating: 4.6,
    reviewCount: 3420,
    affiliateUrl: 'https://www.amazon.com/Logitech-BRIO-Pro-701-Webcam/dp/B0BFJ4CRKD?linkCode=ll2&tag=dailygiftshuf-20&linkId=07c79990ddfa9a630783962e24576951&language=en_US&ref_=as_li_ss_tl',
    recipients: ['him', 'her', 'coworker'],
    budgetTier: '150to250',
    tags: ['tech', 'office'],
  },
  {
    id: 'tech-lg-ultrawide-34',
    name: 'LG 34U650A-B UltraWide Monitor',
    description: '34-inch WQHD curved IPS monitor with 100Hz, HDR10, and 96W USB-C Power Delivery. Single-cable docking for any laptop.',
    price: 499.99,
    priceDisplay: '$499.99',
    image: '/images/products/tech-lg-ultrawide-34.jpg',
    rating: 4.7,
    reviewCount: 890,
    affiliateUrl: 'https://www.amazon.com/LG-34U650A-B-UltraWide-DisplayPort-Adjustable/dp/B0FNQDB6JY?linkCode=ll2&tag=dailygiftshuf-20&linkId=57031a8252361c1b0be08f84f46a2131&language=en_US&ref_=as_li_ss_tl',
    recipients: ['him', 'her', 'coworker'],
    budgetTier: '250plus',
    tags: ['tech', 'office', 'luxury'],
  },
  {
    id: 'tech-anker-powercore',
    name: 'Anker PowerCore 26K Power Bank',
    description: '26,800mAh portable charger with 65W USB-C output. Charges a MacBook Air to 80% in under 2 hours. Carry-on legal.',
    price: 79.99,
    priceDisplay: '$79.99',
    image: '/images/products/tech-anker-powercore.jpg',
    rating: 4.6,
    reviewCount: 8730,
    affiliateUrl: 'https://www.amazon.com/Anker-PowerCore-Portable-Charger-Compatible/dp/B09VPHVT2Z?linkCode=ll2&tag=dailygiftshuf-20&linkId=b4da390c9a9bbd5eb89f6016b3016efb&language=en_US&ref_=as_li_ss_tl',
    recipients: ['him', 'her', 'teens', 'coworker'],
    budgetTier: '50to100',
    tags: ['tech', 'travel'],
  },
  {
    id: 'tech-jackery-explorer-500',
    name: 'Jackery Explorer 500 v2 Power Station',
    description: '512Wh LiFePO4 portable power station, 500W AC outlet (1000W peak), 0-80% in 60 min. Rated 4,000 charge cycles.',
    price: 449.99,
    priceDisplay: '$449.99',
    image: '/images/products/tech-jackery-explorer-500.jpg',
    rating: 4.8,
    reviewCount: 1560,
    affiliateUrl: 'https://www.amazon.com/Jackery-Explorer-Portable-Generator-Outdoors/dp/B0FR555DVH?linkCode=ll2&tag=dailygiftshuf-20&language=en_US&ref_=as_li_ss_tl',
    recipients: ['him', 'dad', 'friends'],
    budgetTier: '250plus',
    tags: ['tech', 'outdoors'],
  },
];

const techShufflePool = products.filter((p) => p.tags?.includes('tech'));

const faqs = [
  {
    q: 'What are the best tech gifts for 2026?',
    a: 'The top tech gifts in 2026 are Sony WF-1000XM6 wireless earbuds for audio, Logitech MX Brio for remote workers, and the Anker PowerCore 26K for travelers. Every top pick has shifted to USB-C as the universal standard. The theme this year: fewer cables, longer battery, smarter specs.',
  },
  {
    q: 'What is a good tech gift under $100?',
    a: 'The Anker PowerCore 26K at $79.99 is the strongest tech gift under $100. It outputs 65W via USB-C, charges laptops, and fits in a carry-on bag under airline limits. For earbuds under $100, the Sony WF-C700N offers solid ANC at a fraction of the flagship price.',
  },
  {
    q: 'What tech gifts work with both iPhone and Android?',
    a: 'All six picks above are platform-agnostic. USB-C earbuds, chargers, webcams, and monitors work across iPhone, Android, Mac, and Windows. The Logitech MX Brio even works with Nintendo Switch 2. No ecosystem lock-in required.',
  },
  {
    q: 'What is the best tech gift for a remote worker?',
    a: 'The Logitech MX Brio 4K Webcam ($199.99) is the best single upgrade for remote workers. It shoots 4K with AI auto-framing, has dual noise-canceling mics, and shows mode for overhead demos. Paired with the LG UltraWide monitor and a single USB-C cable, it replaces an entire desk setup.',
  },
  {
    q: 'What is the best portable power station for camping?',
    a: 'The Jackery Explorer 500 v2 is the top portable power station for camping. Its 512Wh LiFePO4 battery is rated for 4,000 charge cycles, the 500W AC outlet handles most appliances, and it recharges from 0-80% in 60 minutes via wall or solar panel. The LiFePO4 chemistry is safer and longer-lasting than standard lithium.',
  },
  {
    q: 'Are wireless earbuds a good gift?',
    a: 'Yes, wireless earbuds are consistently the most-wanted tech gift across all age groups. The best ones in 2026, Sony WF-1000XM6 and Bose QuietComfort Ultra, offer 24-30 hours of battery, class-leading noise cancellation, and USB-C charging. They work for commuters, gym-goers, remote workers, and travelers equally well.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Tech Gifts & Gadgets 2026',
  description: 'Curated tech gift picks for 2026 by TheGiftShuffle',
  url: 'https://www.thegiftshuffle.com/tech-gadgets',
  numberOfItems: techProducts.length,
  itemListElement: techProducts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: p.name,
      image: p.image.startsWith('http') ? p.image : `https://www.thegiftshuffle.com${p.image}`,
      ...(p.description ? { description: p.description } : {}),
      offers: { '@type': 'Offer', price: p.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: p.affiliateUrl },
      ...(p.rating > 0 && p.reviewCount > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewCount } } : {}),
    },
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function TechGadgetsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Tech Gifts & Gadgets', href: '/tech-gadgets' }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image
              src="/images/heroes/tech-gadgets.jpg"
              alt="Modern tech gadget gifts arranged on a desk"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </section>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 pt-8 pb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
            Best Tech Gifts & Gadgets 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The best tech gifts in 2026 run on USB-C, solve a real problem, and have specs worth noticing on day one.
            These six picks cover wireless audio, remote work, portable power, and everything in between, curated for
            people who already have a phone charger and need something better.
          </p>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={techShufflePool} heading="Shuffle Tech Picks" />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            Top Tech Gift Picks for 2026
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techProducts.map((p) => (
              <a
                key={p.id}
                href={p.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-square w-full mb-3 rounded-xl overflow-hidden bg-gray-50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#1A202C] mb-1 leading-tight">{p.name}</p>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed line-clamp-2">{p.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-[#F04E30]">{p.priceDisplay}</span>
                  <span className="text-xs text-gray-400">★ {p.rating}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Article Content */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
            Best Wireless Audio: Sony vs. Bose
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The Sony WF-1000XM6 sets the benchmark for noise cancellation in 2026. Its dedicated V2 ANC processor
            handles airplane cabin noise, open offices, and city streets equally well. LDAC codec support means
            Bluetooth audio that sounds close to wired. Battery runs 24 hours total with the case.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The Bose QuietComfort Ultra Earbuds win on comfort. The fit wing design keeps them secure through
            workouts and long flights alike. Immersive Audio spatial processing adds depth to music and podcasts
            without the gimmicky feel of early spatial audio implementations. If the recipient wears earbuds for
            6+ hours a day, Bose is the pick.
          </p>

          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
            Best for Hybrid Workers: Webcam & Monitor
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The Logitech MX Brio shoots 4K at 30fps with a Sony STARVIS low-light sensor. AI auto-framing
            keeps you centered when you move. Show Mode flips to an overhead view for demo shots.
            It connects via USB-C 3.2 and works with Teams, Zoom, Google Meet, and Nintendo Switch 2.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The LG 34U650A-B pairs with any laptop via a single USB-C cable. 96W Power Delivery means your
            MacBook charges while you work. The 3440x1440 curved IPS panel runs at 100Hz with HDR10 support.
            It replaces a hub, monitor, and power adapter in one connection.
          </p>

          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
            Best Portable Power: Anker & Jackery
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The Anker PowerCore 26K outputs 65W via USB-C, enough to charge a MacBook Air at full speed
            alongside a phone. At 26,800mAh it stays under the 100Wh airline carry-on limit.
            The practical pick for anyone who travels with a laptop.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The Jackery Explorer 500 v2 steps up to home and camping use. The 512Wh LiFePO4 battery handles
            a mini fridge, CPAP machine, or small power tools. LiFePO4 chemistry is rated for 4,000 cycles
            versus 500 in standard lithium, built to last a decade of use.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              Not Sure Which Tech Gift to Pick?
            </h2>
            <p className="text-gray-600 mb-6">
              Answer a few quick questions and get a personalized recommendation in seconds.
            </p>
            <Link
              href="/shuffle"
              className="inline-block bg-[#F04E30] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              Try the Gift Shuffle →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#1A202C' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
                <h3 className="font-bold text-[#1A202C] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>Related Gift Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/gift-ideas-for-him', label: 'Gift Ideas for Him' },
              { href: '/gift-ideas-for-her', label: 'Gift Ideas for Her' },
              { href: '/gifts-under-50', label: 'Gifts Under $50' },
              { href: '/birthday-gift-ideas', label: 'Birthday Gift Ideas' },
              { href: '/graduation-gifts', label: 'Graduation Gifts' },
              { href: '/christmas-gift-ideas', label: 'Christmas Gift Ideas' },
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
