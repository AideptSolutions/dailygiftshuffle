import Link from 'next/link';

const CATEGORIES = [
  { slug: 'tech', label: 'Tech & Gadgets' },
  { slug: 'diy-tools', label: 'DIY & Tools' },
  { slug: 'home', label: 'Home' },
  { slug: 'gaming', label: 'Gaming' },
  { slug: 'sports', label: 'Sports' },
  { slug: 'gardening', label: 'Gardening' },
  { slug: 'fitness', label: 'Fitness' },
  { slug: 'kitchen', label: 'Kitchen' },
  { slug: 'luxury', label: 'Luxury' },
  { slug: 'hobby', label: 'Hobbies' },
  { slug: 'office', label: 'Office' },
  { slug: 'parenting', label: 'Parenting' },
  { slug: 'pets', label: 'Pets' },
  { slug: 'finance', label: 'Finance' },
  { slug: 'kids', label: 'Kids Gifts' },
  { slug: 'car-accessories', label: 'Car Accessories' },
];

const GIFT_GUIDES = [
  { href: '/gift-ideas-for-mom', label: 'Gifts for Mom' },
  { href: '/gift-ideas-for-dad', label: 'Gifts for Dad' },
  { href: '/gift-ideas-for-him', label: 'Gifts for Him' },
  { href: '/gift-ideas-for-her', label: 'Gifts for Her' },
  { href: '/gifts-under-50', label: 'Gifts Under $50' },
  { href: '/christmas-gift-ideas', label: 'Christmas Gifts' },
  { href: '/birthday-gift-ideas', label: 'Birthday Gifts' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="text-white font-extrabold text-lg mb-2">🎁 TheGiftShuffle</p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Your daily gift discovery engine. Find the perfect gift for anyone in seconds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-semibold mb-3">Quick Links</p>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/shuffle" className="hover:text-white transition-colors">Find a Gift</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Gift Guides */}
          <div>
            <p className="text-white font-semibold mb-3">Gift Guides</p>
            <ul className="space-y-2">
              {GIFT_GUIDES.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="hover:text-white transition-colors">
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="text-white font-semibold mb-3">Gift Categories</p>
            <ul className="space-y-2 columns-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>&copy; 2025 TheGiftShuffle. All rights reserved.</p>
          <p className="text-xs text-gray-600">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
