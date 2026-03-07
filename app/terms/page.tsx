import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Terms of Service | DailyGiftShuffle',
  description: 'Read the Terms of Service for DailyGiftShuffle, including affiliate disclosures and usage terms.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="max-w-3xl mx-auto px-4 py-12 focus:outline-none">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 6, 2026</p>

        {/* FTC-required affiliate disclosure — prominent placement */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <p className="text-sm font-semibold text-amber-800">
            📢 Affiliate Disclosure
          </p>
          <p className="text-sm text-amber-700 mt-1">
            DailyGiftShuffle participates in the Amazon Services LLC Associates Program and other
            affiliate advertising programs. We earn commissions on qualifying purchases made through
            links on this site, at <strong>no additional cost to you</strong>. This helps us keep
            the site free for everyone.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using DailyGiftShuffle (&ldquo;the Site&rdquo;), you agree to be bound by
              these Terms of Service. If you do not agree, please do not use the Site. You must be at
              least 13 years of age to use this Site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Affiliate Relationships &amp; Compensation</h2>
            <p>
              DailyGiftShuffle is a participant in the <strong>Amazon Services LLC Associates Program</strong>,
              an affiliate advertising program designed to provide a means for sites to earn advertising
              fees by advertising and linking to Amazon.com. We may also participate in affiliate programs
              with other retailers.
            </p>
            <p className="mt-2">
              When you click on a product link and make a purchase, we may receive a commission. This
              commission does not affect the price you pay. Our product recommendations are based on
              quality and relevance, not commission rate.
            </p>
            <p className="mt-2">
              <strong>Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. No Warranty on Recommendations</h2>
            <p>
              Product recommendations on DailyGiftShuffle are provided &ldquo;as is&rdquo; for
              informational and entertainment purposes only. We make no warranties, express or implied,
              regarding the accuracy, completeness, or fitness for a particular purpose of any
              recommendation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Prices &amp; Availability</h2>
            <p>
              Prices, availability, and product details displayed on this Site are approximate and subject
              to change without notice. Always verify current prices and availability on the retailer&rsquo;s
              site before purchasing. DailyGiftShuffle is not responsible for discrepancies between
              displayed and actual prices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, DailyGiftShuffle and its operators shall
              not be liable for any indirect, incidental, special, consequential, or punitive damages
              arising from your use of the Site or purchase of any products through affiliate links.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">6. Intellectual Property</h2>
            <p>
              All original content on this Site, including text, graphics, and code, is the property of
              DailyGiftShuffle. Product names, images, and trademarks belong to their respective owners.
              Reproduction or redistribution of Site content without permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">7. Third-Party Links</h2>
            <p>
              This Site contains links to third-party websites (e.g., Amazon). We are not responsible for
              the content, privacy practices, or terms of those sites. Visiting third-party sites is at
              your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">8. Privacy</h2>
            <p>
              Your use of the Site is also governed by our{' '}
              <Link href="/privacy" className="text-[#F04E30] underline">Privacy Policy</Link>,
              which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">9. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the Site after
              changes constitutes acceptance of the revised Terms. The &ldquo;Last updated&rdquo; date
              above reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">10. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the United States, without regard to conflict
              of law principles. Any disputes shall be resolved through good-faith negotiation or, failing
              that, binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">11. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:legal@dailygiftshuffle.com" className="text-[#F04E30] underline">
                legal@dailygiftshuffle.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-400 flex gap-4">
          <Link href="/privacy" className="hover:text-[#F04E30] transition-colors">Privacy Policy</Link>
          <Link href="/" className="hover:text-[#F04E30] transition-colors">Home</Link>
        </div>
      </main>
    </div>
  );
}
