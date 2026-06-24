import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Privacy Policy | TheGiftShuffle',
  description: 'Learn how TheGiftShuffle collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="max-w-3xl mx-auto px-4 py-12 focus:outline-none">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: June 22, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Overview</h2>
            <p>
              TheGiftShuffle (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates
              thegiftshuffle.com (the &ldquo;Site&rdquo;). This Privacy Policy explains what information
              we collect, how we use it, the third parties that help us run the Site, and your rights
              regarding that information. We aim to collect as little personal information as possible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Information We Collect</h2>

            <h3 className="font-semibold text-gray-800 mb-1">Information you provide</h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>
                <strong>Email address</strong>, collected only if you choose to save a wishlist item or
                email yourself your saved gift picks. It is used solely to store or send your list. We do
                not send marketing emails and we do not share your email with third parties for marketing.
              </li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-1">Information collected automatically</h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>
                <strong>Usage and analytics data.</strong> Like most websites, we collect standard
                analytics such as the pages you view, the approximate location derived from your IP
                address, your device and browser type, and the site that referred you. We use this to
                understand how the Site is used and to improve it. See Section 5 for the providers
                involved and Section 6 for the cookies this can set.
              </li>
              <li>
                <strong>Affiliate click data.</strong> When you click a &ldquo;Buy&rdquo; or shop link, we
                record which product was clicked (identified by its Amazon product ID, or ASIN) and the
                time of the click in our own first-party store. This data is product-level and is used to
                see which gifts are popular. It is not linked to your name or email.
              </li>
              <li>
                <strong>Server logs.</strong> Our hosting provider and our request rate-limiter process
                your IP address briefly to keep the Site secure and prevent abuse. IP addresses used for
                rate limiting are held only in temporary memory and are not stored long term.
              </li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-1">Information stored in your browser</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>localStorage</strong> stores your wishlist items and saved gift picks
                (&ldquo;My Picks&rdquo;) locally on your device. This data never leaves your browser
                unless you explicitly save a wishlist item or email your picks with your email address.
              </li>
              <li>
                <strong>sessionStorage</strong> stores a temporary list of recently shown product IDs so
                we do not show you the same gifts repeatedly in one session. It is cleared when you close
                your browser tab.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To store your wishlist against your email address, or to email you your saved picks, when you ask us to.</li>
              <li>To measure how the Site is used and improve the shuffle experience and our gift guides.</li>
              <li>To understand which products are popular, using product-level affiliate click counts.</li>
              <li>To keep the Site secure, prevent abuse, and comply with our legal obligations.</li>
              <li>We do <strong>not</strong> sell or rent your personal information, and we do not use it to build advertising or cross-site tracking profiles.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Affiliate Links</h2>
            <p>
              TheGiftShuffle is an affiliate site. We participate in the Amazon Services LLC Associates
              Program and in affiliate networks such as Impact (impact.com), which connect us with other
              retailers. When you click an affiliate link and make a purchase, the retailer may place
              cookies on your device under its own privacy policy, and we may earn a commission on
              qualifying purchases at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Third-Party Services We Use</h2>
            <p>
              We rely on the following service providers to operate the Site. Each processes data under
              its own privacy policy:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Vercel</strong>, our hosting provider, which also provides cookieless Vercel Web Analytics (aggregate page-view and visitor metrics).</li>
              <li><strong>Google Analytics 4</strong> (provided by Google), which we use to measure Site usage. Google may act as an independent controller of the data it collects.</li>
              <li><strong>Upstash</strong>, which hosts the database where we keep affiliate click counts and saved data.</li>
              <li><strong>Affiliate partners</strong> (Amazon Associates and the Impact network) as described in Section 4.</li>
              <li><strong>Image hosts.</strong> Product and hero images may be served from third-party hosts including retailer and brand sites, Pexels, Unsplash, and placeholder services, which may collect standard web request data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">6. Cookies and Similar Technologies</h2>
            <p>
              We keep cookies to a minimum and do not use advertising or retargeting cookies. The
              technologies in use are:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Functional browser storage</strong> (localStorage and sessionStorage), used only for the features described in Section 2. These are not cookies and are not sent to any server.</li>
              <li><strong>Analytics cookies.</strong> When Google Analytics is enabled, it sets its own cookies (for example, <code>_ga</code>) to measure usage. Vercel Web Analytics is cookieless and does not set cookies.</li>
              <li><strong>Third-party retailer cookies.</strong> Amazon and other affiliate partners may set their own cookies once you click through to their sites.</li>
            </ul>
            <p className="mt-2">
              You can block or delete cookies in your browser settings, and you can signal an opt-out of
              analytics using your browser&rsquo;s Do Not Track or Global Privacy Control (GPC) setting,
              or by using a tracker-blocking extension. Blocking analytics cookies does not affect the
              Site&rsquo;s core features.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">7. Children&rsquo;s Privacy</h2>
            <p>
              This Site is not directed to children under 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with their email, please
              contact us and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">8. Your Rights (CCPA / GDPR)</h2>
            <p>
              Depending on where you live, you may have the right to access, correct, or delete the
              personal data we hold about you, to object to or restrict certain processing, and to opt out
              of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. We do not sell or
              share your personal information. The personal data we hold about an individual is generally
              limited to an email address you chose to submit. To exercise any of these rights, contact us
              at{' '}
              <a href="mailto:aj@aideptsolutions.com" className="text-[#F04E30] underline">
                aj@aideptsolutions.com
              </a>{' '}
              and we will respond within the timeframe required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">9. Data Retention and Security</h2>
            <p>
              We keep email addresses you submit until you ask us to delete them or they are no longer
              needed for the purpose you provided them. Affiliate click event records are retained for a
              short period (currently about seven days) for recent-activity reporting and are then
              automatically removed; aggregate click counts may be retained longer in non-personal form.
              We apply reasonable technical safeguards, including HTTPS, security headers, and
              access-restricted storage, to protect your information. No payment or financial data is
              collected or stored by us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">10. International Users</h2>
            <p>
              The Site is operated from the United States, and our service providers process data in the
              United States and other countries. If you access the Site from outside the United States,
              you understand that your information may be transferred to and processed in countries whose
              data-protection laws may differ from those of your country.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The &ldquo;Last updated&rdquo; date at the
              top of this page reflects the most recent revision. Continued use of the Site after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">12. Contact</h2>
            <p>
              Questions about this Privacy Policy? Email us at{' '}
              <a href="mailto:aj@aideptsolutions.com" className="text-[#F04E30] underline">
                aj@aideptsolutions.com
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
