import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Gift Categories - DailyGiftShuffle',
  description: 'Browse all gift categories. Find gifts by interest, hobby, or lifestyle.',
};

// All photos via Unsplash — free commercial license, no attribution required
const CATEGORIES = [
  {
    slug: 'tech',
    title: 'Tech & Gadgets',
    desc: 'Smart devices, accessories, and the latest gadgets for every budget.',
    photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&q=80',
    alt: 'Circuit board close-up',
  },
  {
    slug: 'kitchen',
    title: 'Kitchen & Cooking',
    desc: 'Cookware, baking tools, specialty foods, and kitchen gadgets for foodies.',
    photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80',
    alt: 'Kitchen cooking scene',
  },
  {
    slug: 'fitness',
    title: 'Fitness & Wellness',
    desc: 'Fitness gear, recovery tools, and wellness products for health-conscious people.',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80',
    alt: 'Gym fitness equipment',
  },
  {
    slug: 'luxury',
    title: 'Luxury & Premium',
    desc: 'Premium gifts worth the splurge — cashmere, leather, spa experiences, and more.',
    photo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop&q=80',
    alt: 'Luxury shopping bags and gifts',
  },
  {
    slug: 'diy-tools',
    title: 'DIY & Tools',
    desc: 'Tools, smart home upgrades, and DIY kits for homeowners and makers.',
    photo: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=400&fit=crop&q=80',
    alt: 'Home improvement tools and workshop',
  },
  {
    slug: 'hobby',
    title: 'Hobbies & Crafts',
    desc: 'Gifts for crafters, artists, gamers, and every kind of creative mind.',
    photo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop&q=80',
    alt: 'Art and craft supplies',
  },
  {
    slug: 'office',
    title: 'Office & Desk',
    desc: 'Ergonomic tools, desk upgrades, and stylish accessories for professionals.',
    photo: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop&q=80',
    alt: 'Clean professional office desk setup',
  },
  {
    slug: 'parenting',
    title: 'Parenting & Baby',
    desc: 'Thoughtful gifts for new parents, growing families, and little ones.',
    photo: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop&q=80',
    alt: 'Parent and baby',
  },
  {
    slug: 'pets',
    title: 'Pets',
    desc: 'Toys, beds, tech, and accessories for beloved dogs, cats, and more.',
    photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop&q=80',
    alt: 'Dogs playing outdoors',
  },
  {
    slug: 'finance',
    title: 'Finance & Productivity',
    desc: 'Planners, productivity tools, and desk upgrades for goal-driven people.',
    photo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&q=80',
    alt: 'Finance and productivity workspace',
  },
  {
    slug: 'kids',
    title: 'Kids',
    desc: 'Creative art sets, STEM kits, outdoor toys, and educational games for kids of all ages.',
    photo: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop&q=80',
    alt: 'Kids playing with colorful toys',
  },
  {
    slug: 'car-accessories',
    title: 'Car Accessories',
    desc: 'Dash cams, phone mounts, jump starters, and clever organizers for every driver.',
    photo: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop&q=80',
    alt: 'Car dashboard and accessories',
  },
  {
    slug: 'home',
    title: 'Home',
    desc: 'Cozy decor, candles, bedding, and thoughtful pieces to make any home feel special.',
    photo: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&h=400&fit=crop&q=80',
    alt: 'Cozy home living room decor',
  },
  {
    slug: 'gaming',
    title: 'Gaming',
    desc: 'Controllers, headsets, gaming chairs, and accessories for every type of gamer.',
    photo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop&q=80',
    alt: 'Gaming setup with RGB lighting',
  },
  {
    slug: 'sports',
    title: 'Sports',
    desc: 'Gear, apparel, training equipment, and fan gifts for every sport and athlete.',
    photo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop&q=80',
    alt: 'Sports equipment and athletic gear',
  },
  {
    slug: 'gardening',
    title: 'Gardening',
    desc: 'Tools, planters, seed kits, and outdoor living gifts for every green thumb.',
    photo: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&q=80',
    alt: 'Garden tools and plants',
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Gift Categories
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Browse by interest, hobby, or lifestyle — find the right gift in the right category.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden hover:shadow-md hover:border-[#F04E30]/40 transition-all flex flex-col"
            >
              {/* Photo */}
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56%' }}>
                <Image
                  src={cat.photo}
                  alt={cat.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Text */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-base font-extrabold text-gray-900 mb-1 group-hover:text-[#F04E30] transition-colors">
                  {cat.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {cat.desc}
                </p>
                <div
                  className="mt-4 text-xs font-bold self-start px-3 py-1.5 rounded-full"
                  style={{ background: '#FFFAF5', color: '#F04E30' }}
                >
                  Browse gifts
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-4">Not sure where to start?</p>
          <Link
            href="/shuffle"
            className="btn-shuffle text-white font-bold px-10 py-4 rounded-full inline-block text-base"
          >
            Let us pick for you
          </Link>
        </div>

      </main>
    </div>
  );
}
