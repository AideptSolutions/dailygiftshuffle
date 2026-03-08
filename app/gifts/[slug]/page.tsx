import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AdSlot from '@/components/AdSlot';
import products from '@/data/products-catalog';
import type { Product, Recipient, Occasion, BudgetTier } from '@/data/products-catalog';
import { giftSlugs } from '@/data/gift-slugs';

// ── Slug parsing helpers ──────────────────────────────────────

const RECIPIENT_MAP: Record<string, Recipient> = {
  him: 'him', her: 'her', mom: 'mom', dad: 'dad',
  kids: 'kids', teens: 'teens', couples: 'couples',
  friends: 'friends', baby: 'baby', coworker: 'friends',
};

const OCCASION_MAP: Record<string, Occasion> = {
  birthday: 'birthday',
  christmas: 'christmas',
  anniversary: 'anniversary',
  graduation: 'graduation',
  'mothers-day': 'mothers-day',
  'fathers-day': 'fathers-day',
  valentines: 'valentines',
  'just-because': 'just-because',
  housewarming: 'housewarming',
  wedding: 'wedding',
  'baby-shower': 'baby-shower',
  easter: 'birthday',
  halloween: 'birthday',
  thanksgiving: 'birthday',
  'new-year': 'birthday',
  retirement: 'graduation',
};

const BUDGET_MAP: Record<string, BudgetTier> = {
  'under-25':   'under25',
  'under-50':   '25to50',
  'under-100':  '50to100',
  '100-to-150': '100to150',
  '150-to-250': '150to250',
  '250-plus':   '250plus',
};

function parseSlug(slug: string): {
  recipient: Recipient | null;
  occasion: Occasion | null;
  budget: BudgetTier | null;
  label: string;
} {
  let recipient: Recipient | null = null;
  let occasion: Occasion | null = null;
  let budget: BudgetTier | null = null;

  for (const [key, val] of Object.entries(RECIPIENT_MAP)) {
    if (slug.includes(`-${key}-`) || slug.endsWith(`-${key}`)) {
      recipient = val;
      break;
    }
  }

  for (const [key, val] of Object.entries(OCCASION_MAP)) {
    if (slug.includes(key)) {
      occasion = val;
      break;
    }
  }

  for (const [key, val] of Object.entries(BUDGET_MAP)) {
    if (slug.includes(key)) {
      budget = val;
      break;
    }
  }

  // Build human label from slug
  const label = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return { recipient, occasion, budget, label };
}

function filterProducts(slug: string): Product[] {
  const { recipient, occasion, budget } = parseSlug(slug);

  let filtered = products.filter((p) => {
    const matchRecipient = !recipient || p.recipients.includes(recipient);
    const matchOccasion = !occasion || (p.occasions && p.occasions.includes(occasion));
    const matchBudget = !budget || p.budgetTier === budget;

    if (budget) return matchRecipient && matchBudget;
    if (occasion) return matchRecipient && matchOccasion;
    return matchRecipient;
  });

  if (filtered.length < 6) {
    // Deterministic fallback based on slug hash
    const seed = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    filtered = [...products].sort((a, b) =>
      (a.id.charCodeAt(0) + seed) % 97 - (b.id.charCodeAt(0) + seed) % 97
    ).slice(0, 6);
  }

  return filtered;
}

// ── Static generation ─────────────────────────────────────────

export async function generateStaticParams() {
  return giftSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { label, budget } = parseSlug(params.slug);
  const count = filterProducts(params.slug).length;

  const title = `${label} | TheGiftShuffle`;
  const description = budget
    ? `Shop ${count} hand-picked ${label.toLowerCase()}. Curated by TheGiftShuffle for every taste and style.`
    : `Discover ${count} thoughtful ${label.toLowerCase()}. Find the perfect present with TheGiftShuffle.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://thegiftshuffle.com/gifts/${params.slug}`,
    },
  };
}

// ── Components ────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-gold text-sm">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

function ProductCard({ product, position }: { product: Product; position: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E2E8F0] hover:shadow-md transition-shadow flex flex-col">
      <div className="relative w-full h-48 bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
          unoptimized
        />
        <span className="absolute top-3 left-3 bg-[#F04E30] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {position}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-extrabold text-lg" style={{ color: '#1A202C' }}>{product.priceDisplay}</span>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-amazon font-bold text-xs px-4 py-2 rounded-full"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function GiftSlugPage({ params }: { params: { slug: string } }) {
  const { label, recipient, occasion, budget } = parseSlug(params.slug);
  const filtered = filterProducts(params.slug);

  const subtitleParts: string[] = [];
  if (recipient) subtitleParts.push(`for ${recipient}`);
  if (occasion) subtitleParts.push(`on ${occasion.replace('-', ' ')}`);
  if (budget) {
    const budgetLabels: Record<BudgetTier, string> = {
      under25: 'under $25', '25to50': '$25–$50', under50: 'under $50', '50to100': '$50–$100', '100to150': '$100–$150', under150: 'under $150', '150to250': '$150–$250', '250plus': '$250+',
    };
    subtitleParts.push(budgetLabels[budget]);
  }

  const faqs = [
    {
      q: `How many ${label.toLowerCase()} are listed here?`,
      a: `We have curated ${filtered.length} hand-picked ${label.toLowerCase()} on this page, updated regularly with top-rated products.`,
    },
    {
      q: `Where can I buy these ${label.toLowerCase()}?`,
      a: `All products link directly to Amazon and other top retailers, so you can shop with confidence and take advantage of fast shipping.`,
    },
    {
      q: `Are these gifts affordable?`,
      a: `Yes! Our gift picks cover a wide range of budgets — from under $25 to premium $100+ options — so you can find something for any budget.`,
    },
    {
      q: `Can I save these gift ideas for later?`,
      a: `Absolutely! Use TheGiftShuffle's wishlist feature to save your favorite picks and come back to them anytime.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: label,
    numberOfItems: filtered.length,
    itemListElement: filtered.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: p.affiliateUrl,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section
        className="py-12 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #fff9e6 100%)' }}
      >
        <p className="text-sm text-gray-400 mb-2">Gift Ideas</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 max-w-3xl mx-auto">
          {label}
        </h1>
        {subtitleParts.length > 0 && (
          <p className="text-gray-500 text-base mb-4 capitalize">{subtitleParts.join(' · ')}</p>
        )}
        <p className="text-gray-600 mb-6">
          {filtered.length} curated gift ideas — click any product to buy instantly.
        </p>
        <Link
          href="/shuffle"
          className="btn-shuffle text-white font-bold px-8 py-3 rounded-full inline-block text-sm"
        >
          Shuffle a Surprise Gift 🎲
        </Link>
      </section>

      <main id="main-content" tabIndex={-1} className="max-w-6xl mx-auto w-full px-4 py-10">
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} position={i + 1} />
          ))}
        </div>

        <p className="text-xs text-center text-gray-400 mb-6">
          Affiliate links — we may earn a commission at no extra cost to you.
        </p>

        {/* Rectangle Ad */}
        <div className="flex justify-center my-8">
          <AdSlot size="rectangle" />
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mt-10">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 text-center py-10 rounded-3xl"
          style={{ background: 'linear-gradient(135deg, #F04E30 0%, #FF7F50 100%)' }}>
          <h2 className="text-2xl font-extrabold text-white mb-2">
            Want a personalized recommendation?
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            Try our shuffle tool — pick a recipient, set a budget, get a surprise gift idea.
          </p>
          <Link
            href="/shuffle"
            className="bg-white font-bold px-10 py-3 rounded-full inline-block transition-all hover:scale-105 text-sm"
            style={{ color: '#F04E30' }}
          >
            Start Shuffling 🎲
          </Link>
        </section>
      </main>
    </div>
  );
}
