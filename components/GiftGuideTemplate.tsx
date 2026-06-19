import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import InlineShuffle from '@/components/InlineShuffle';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard, { type CompactProduct } from '@/components/ProductCard';

export interface GiftGuideFaq {
  q: string;
  a: string;
}

export interface GiftGuideLink {
  href: string;
  label: string;
}

export interface GiftGuideTemplateProps {
  canonicalUrl: string;
  schemaName: string;
  schemaDescription: string;
  breadcrumbLabel: string;
  breadcrumbHref: string;
  heroSrc: string;
  heroAlt: string;
  h1: string;
  /** Lead paragraphs under the H1. */
  intro: ReactNode;
  shuffleHeading: string;
  shuffleProducts: CompactProduct[];
  gridHeading: string;
  gridProducts: CompactProduct[];
  ctaHeading: string;
  ctaText: string;
  faqs: GiftGuideFaq[];
  relatedHeading: string;
  relatedLinks: GiftGuideLink[];
}

/**
 * Shared "gold-standard" gift-guide page: hero image, keyword-rich intro, an
 * InlineShuffle above the grid, a curated ProductCard grid, a shuffle CTA, an
 * FAQ, and related-guide internal links. Emits ItemList + FAQPage JSON-LD.
 */
export default function GiftGuideTemplate(props: GiftGuideTemplateProps) {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: props.schemaName,
    description: props.schemaDescription,
    url: props.canonicalUrl,
    numberOfItems: props.gridProducts.length,
    itemListElement: props.gridProducts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      description: p.description,
      url: p.affiliateUrl,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFAF5' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <Breadcrumbs items={[{ label: props.breadcrumbLabel, href: props.breadcrumbHref }]} />

      <main id="main-content" className="flex-1">
        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2', maxHeight: '420px' }}>
            <Image src={props.heroSrc} alt={props.heroAlt} fill className="object-cover" priority unoptimized />
          </div>
        </section>

        {/* Hero copy */}
        <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight" style={{ color: '#1A202C' }}>
            {props.h1}
          </h1>
          <div className="text-base sm:text-lg text-gray-700 leading-relaxed space-y-3">{props.intro}</div>
        </section>

        {/* Inline Shuffle */}
        <section className="max-w-5xl mx-auto px-4 py-6">
          <InlineShuffle products={props.shuffleProducts} heading={props.shuffleHeading} />
        </section>

        {/* Product Grid */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A202C' }}>
            {props.gridHeading}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {props.gridProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A202C' }}>
              {props.ctaHeading}
            </h2>
            <p className="text-gray-600 mb-6">{props.ctaText}</p>
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
            {props.faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
                <h3 className="font-bold text-[#1A202C] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1A202C' }}>
            {props.relatedHeading}
          </h2>
          <div className="flex flex-wrap gap-3">
            {props.relatedLinks.map((link) => (
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
