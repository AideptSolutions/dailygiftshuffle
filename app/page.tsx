import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HomeFeaturedSection from '@/components/HomeFeaturedSection';

export const metadata: Metadata = {
  title: 'TheGiftShuffle — Find the Perfect Gift in Seconds',
};

const features = [
  { title: 'Personalized', desc: 'Filter by recipient and budget for spot-on recommendations.' },
  { title: 'Instant',      desc: 'Get a curated gift idea in under 5 seconds. No more decision fatigue.' },
  { title: 'Ready to Buy', desc: 'Every result comes with a direct Amazon link so you can shop immediately.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20"
        style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #FFF9E6 100%)' }}
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4 max-w-3xl" style={{ color: '#1A202C' }}>
          Find the{' '}
          <span style={{ color: '#F04E30' }}>Perfect Gift</span>
          <br />in Seconds
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-10">
          Pick a recipient, set a budget, and hit{' '}
          <strong style={{ color: '#F04E30' }}>SHUFFLE</strong> — we will curate a surprise gift
          recommendation just for you.
        </p>

        {/* Featured gifts + shuffle widgets */}
        <div className="w-full mt-2">
          <HomeFeaturedSection />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12" style={{ color: '#1A202C' }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Pick a Recipient', desc: 'Choose your Recipient or Product Category.' },
              { step: '2', title: 'Set Your Budget',  desc: 'Nine budget tiers from under $25 to $250+.' },
              { step: '3', title: 'Hit Shuffle',      desc: 'Get an instant curated gift with a buy link and save it to your wishlist.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-4"
                  style={{ background: '#FFFAF5', border: '2px solid #F04E30', color: '#F04E30' }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1A202C' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4" style={{ background: '#FFFAF5' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] text-center">
                <h3 className="font-bold mb-1" style={{ color: '#1A202C' }}>{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #F04E30 0%, #FF7F50 100%)' }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to find the perfect gift?
        </h2>
        <p className="text-white/80 text-lg mb-8">Free to use. No sign-up required.</p>
        <Link
          href="/shuffle"
          className="bg-white font-bold text-xl px-12 py-5 rounded-full inline-block transition-all hover:opacity-90"
          style={{ color: '#F04E30' }}
        >
          Start Shuffling
        </Link>

        {/* ── TEMP: Crane's wishlist page — remove once creator API access is approved ── */}
        <div className="mt-4">
          <Link
            href="/cranes"
            className="text-white/70 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
          >
            Crane&apos;s List 🎁
          </Link>
        </div>
        {/* ── END TEMP ── */}
      </section>
    </div>
  );
}
