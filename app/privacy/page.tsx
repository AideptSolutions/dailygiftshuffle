import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Privacy Policy | DailyGiftShuffle',
  description: 'Learn how DailyGiftShuffle collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="max-w-3xl mx-auto px-4 py-12 focus:outline-none">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 6, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Overview</h2>
            <p>
              DailyGiftShuffle (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates
              dailygiftshuffle.com (the &ldquo;Site&rdquo;). This Privacy Policy explains what information
              we collect, how we use it, and your rights regarding that information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Information We Collect</h2>
            <h3 className="font-semibold text-gray-800 mb-1">Information you provide</h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>
                <strong>Email address</strong> — collected only if you choose to save a product to your
                Wishlist. Used solely to identify your wishlist across sessions. We do not send marketing
                emails or share your email with third parties.
              </li>
            </ul>
            <h3 className="font-semibold text-gray-800 mb-1">Information stored in your browser</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>localStorage</strong> — stores your wishlist items and saved gift picks
                (&ldquo;My Picks&rdquo;) locally on your device. This data never leaves your browser
                unless you explicitly save a wishlist item with your email.
              </li>
              <li>
                <strong>sessionStorage</strong> — stores a temporary list of recently shown product IDs
                to prevent showing you the same gifts repeatedly in a single session. Cleared when you
                close your browser tab.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To associate your saved wishlist with your email address for retrieval.</li>
              <li>To improve the shuffle algorithm by understanding which product categories are popular (aggregated, non-personal).</li>
              <li>We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Affiliate Links &amp; Third-Party Services</h2>
            <p>
              DailyGiftShuffle participates in the Amazon Services LLC Associates Program, an affiliate
              advertising program. When you click an affiliate link and make a purchase on Amazon or
              another retailer&rsquo;s site, that retailer may place cookies on your device per their own
              privacy policy. We earn a small commission on qualifying purchases at no additional cost to you.
            </p>
            <p className="mt-2">
              Product images may be served from <strong>Unsplash</strong> (images.unsplash.com), which
              may collect standard web analytics per their own privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Cookies</h2>
            <p>
              We do not set tracking or advertising cookies. Browser-based storage (localStorage,
              sessionStorage) is used only for the functional purposes described in Section 2. Affiliate
              retailers (e.g., Amazon) may set their own cookies when you navigate to their sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">6. Children&rsquo;s Privacy</h2>
            <p>
              This Site is not directed to children under 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with their email, please
              contact us and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">7. Your Rights (CCPA / GDPR)</h2>
            <p>
              Depending on your location, you may have the right to request access to, correction of, or
              deletion of any personal data we hold about you (limited to your email address if you
              submitted one). To exercise these rights, contact us at{' '}
              <a href="mailto:privacy@dailygiftshuffle.com" className="text-[#F04E30] underline">
                privacy@dailygiftshuffle.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">8. Data Security</h2>
            <p>
              We implement reasonable technical safeguards to protect your information. Email addresses
              submitted via the wishlist feature are stored in a secured server-side file accessible only
              to site administrators. No payment or financial data is collected or stored by us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The &ldquo;Last updated&rdquo; date at the
              top of this page reflects the most recent revision. Continued use of the Site after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">10. Contact</h2>
            <p>
              Questions about this Privacy Policy? Email us at{' '}
              <a href="mailto:privacy@dailygiftshuffle.com" className="text-[#F04E30] underline">
                privacy@dailygiftshuffle.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-400 flex gap-4">
          <Link href="/terms" className="hover:text-[#F04E30] transition-colors">Terms of Service</Link>
          <Link href="/" className="hover:text-[#F04E30] transition-colors">Home</Link>
        </div>
      </main>
    </div>
  );
}
