'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Product, type Recipient, type BudgetTier, type NicheTag } from '@/data/products';
import { useFavorites } from '@/lib/useFavorites';
import ProductModal from '@/components/ProductModal';

// ─── Random 4-picker from catalog ────────────────────────────────────────────
const SHUFFLE_KEY = 'dgs_home_shuffle_seen';

function getSeen(): string[] {
  try { return JSON.parse(sessionStorage.getItem(SHUFFLE_KEY) || '[]'); } catch { return []; }
}
function addSeen(ids: string[]) {
  sessionStorage.setItem(SHUFFLE_KEY, JSON.stringify([...getSeen(), ...ids]));
}

function pickFour(catalog: Product[]): Product[] {
  if (!catalog.length) return [];
  const seen = getSeen();
  let pool = catalog.filter((p) => !seen.includes(p.id));
  if (pool.length < 4) { sessionStorage.removeItem(SHUFFLE_KEY); pool = catalog; }
  const picked: Product[] = [];
  const available = [...pool];
  while (picked.length < 4 && available.length > 0) {
    const idx = Math.floor(Math.random() * available.length);
    picked.push(available.splice(idx, 1)[0]);
  }
  addSeen(picked.map((p) => p.id));
  return picked;
}

function getTrending(catalog: Product[]): Product[] {
  return [...catalog].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)).slice(0, 4);
}

// ─── Star rating ─────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-gold text-sm">
      {Array(full).fill('\u2605').join('')}
      {half ? '\u00BD' : ''}
      {Array(5 - full - (half ? 1 : 0)).fill('\u2606').join('')}
    </span>
  );
}

// ─── Option lists ─────────────────────────────────────────────────────────────
const RECIPIENTS: { value: Recipient; label: string }[] = [
  { value: 'her',          label: 'For Her' },
  { value: 'him',          label: 'For Him' },
  { value: 'mom',          label: 'For Mom' },
  { value: 'dad',          label: 'For Dad' },
  { value: 'brother',      label: 'For Brother' },
  { value: 'sister',       label: 'For Sister' },
  { value: 'teens',        label: 'For Teens' },
  { value: 'kids',         label: 'For Kids' },
  { value: 'baby',         label: 'For Baby' },
  { value: 'couples',      label: 'For Couples' },
  { value: 'friends',      label: 'For Friends' },
  { value: 'pets',         label: 'For Pets' },
  { value: 'coworker',     label: 'For Coworker' },
  { value: 'employees',    label: 'For Employees' },
  { value: 'grandparents', label: 'For Grandparents' },
  { value: 'streamers',    label: 'For Streamers' },
  { value: 'myself-her',   label: 'Me (Her)' },
  { value: 'myself-him',   label: 'Me (Him)' },
];

const CATEGORIES: { value: NicheTag | ''; label: string }[] = [
  { value: '',                label: 'Any Category' },
  { value: 'tech',            label: 'Tech & Gadgets' },
  { value: 'kitchen',         label: 'Kitchen' },
  { value: 'fitness',         label: 'Fitness' },
  { value: 'luxury',          label: 'Luxury' },
  { value: 'diy-tools',        label: 'DIY & Tools' },
  { value: 'home',            label: 'Home' },
  { value: 'gaming',          label: 'Gaming' },
  { value: 'sports',          label: 'Sports' },
  { value: 'gardening',       label: 'Gardening' },
  { value: 'hobby',           label: 'Hobbies' },
  { value: 'office',          label: 'Office' },
  { value: 'parenting',       label: 'Parenting' },
  { value: 'pets',            label: 'Pets' },
  { value: 'finance',         label: 'Finance' },
  { value: 'kids',            label: 'Kids Gifts' },
  { value: 'car-accessories', label: 'Car Accessories' },
];

const BUDGETS: { value: BudgetTier | ''; label: string }[] = [
  { value: '',          label: 'Any Budget' },
  { value: 'under25',   label: 'Under $25' },
  { value: '25to50',    label: '$25 - $50' },
  { value: 'under50',   label: 'All under $50' },
  { value: '50to100',   label: '$50 - $100' },
  { value: '100to150',  label: '$100 - $150' },
  { value: 'under150',  label: 'All under $150' },
  { value: '150to250',  label: '$150 - $250' },
  { value: '250plus',   label: '$250+' },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown<T extends string>({
  label, value, options, onChange,
}: {
  label: string;
  value: T | '';
  options: { value: T | ''; label: string }[];
  onChange: (v: T | '') => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T | '')}
          className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-9 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#F04E30] focus:ring-1 focus:ring-[#F04E30] transition-colors cursor-pointer"
        >
          {options.map((o) => (
            <option key={String(o.value)} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs select-none">
          &#9660;
        </span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HomeFeaturedSection({ initialProducts = [] }: { initialProducts?: Product[] }) {
  const router  = useRouter();
  const { toggle: toggleFav, isFavorited } = useFavorites();

  // Catalog seeded from server props — no client fetch needed
  const [catalog, setCatalog] = useState<Product[]>(initialProducts);

  useEffect(() => {
    // Only fetch if server didn't provide products (fallback)
    if (initialProducts.length > 0) return;
    fetch('/api/products/all')
      .then(r => r.ok ? r.json() : [])
      .then((data: Product[]) => {
        setCatalog(data);
        setCards(getTrending(data));
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Product cards — seeded from server props immediately
  const [cards, setCards]         = useState<Product[]>(() => getTrending(initialProducts));
  const [fading, setFading]       = useState(false);
  const [isTrending, setIsTrending] = useState(true);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Custom shuffle dropdowns
  const [recipient, setRecipient] = useState<Recipient | ''>('');
  const [category,  setCategory]  = useState<NicheTag | ''>('');
  const [budget,    setBudget]    = useState<BudgetTier | ''>('');
  const [error,     setError]     = useState('');

  // ── Shuffle the 4 product cards ────────────────────────────────────────────
  const handleShuffle = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCards(pickFour(catalog));
      setIsTrending(false);
      setFading(false);
    }, 200);
  }, [catalog]);

  // ── Custom Shuffle → navigate ──────────────────────────────────────────────
  const handleCustomShuffle = useCallback(() => {
    setError('');
    const params = new URLSearchParams();
    if (recipient) params.set('recipient', recipient);
    if (budget)    params.set('budget', budget);
    if (category)  params.set('tag', category);
    router.push(params.toString() ? `/shuffle?${params.toString()}` : '/shuffle');
  }, [recipient, budget, category, router]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6">

      {/* ── Product grid ──────────────────────────────────────────────────── */}
      <div className="mb-5">
        <h2 className="text-lg font-extrabold text-gray-800 tracking-tight text-center mb-4">
          {isTrending ? 'Trending Right Now' : 'Gift Ideas'}
        </h2>

        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 transition-opacity duration-200 ${
            fading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {cards.map((product) => (
            <div
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-all flex flex-col cursor-pointer"
            >
              {/* Image + save button */}
              <div className="relative w-full bg-gray-50" style={{ paddingBottom: '75%' }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                  unoptimized
                />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFav(product); }}
                  title={isFavorited(product.id) ? 'Remove from picks' : 'Save to My Picks'}
                  className="absolute top-1.5 right-1.5 h-6 px-2 rounded-full text-[10px] font-bold transition-all"
                  style={{
                    background: isFavorited(product.id) ? '#F04E30' : 'rgba(255,255,255,0.92)',
                    color: isFavorited(product.id) ? '#fff' : '#F04E30',
                    border: '1px solid #F04E30',
                  }}
                >
                  {isFavorited(product.id) ? 'Saved' : 'Save'}
                </button>
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1">
                <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 flex-1">
                  {product.name}
                </p>
                <div className="mt-1.5">
                  <StarRating rating={product.rating} />
                  <p className="text-xs text-gray-400">{product.reviewCount.toLocaleString()} reviews</p>
                </div>
                <p className="text-sm font-extrabold mt-1.5" style={{ color: '#1A202C' }}>
                  {product.priceDisplay}
                </p>
              </div>

              {/* Buy button */}
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={(e) => e.stopPropagation()}
                className="btn-amazon block text-center text-xs font-bold py-2 px-3"
              >
                Shop on Amazon
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-3">
          Affiliate links — we may earn a small commission at no extra cost to you.
        </p>
      </div>

      {/* ── Shuffle button ────────────────────────────────────────────────── */}
      <div className="text-center mb-8">
        <button
          onClick={handleShuffle}
          className="btn-shuffle text-white font-bold px-10 py-4 rounded-full text-base"
        >
          Shuffle Gift Ideas
        </button>
        <p className="text-xs text-[#4A5568] mt-2">Browse the full catalog one shuffle at a time</p>
      </div>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-[#4A5568] text-sm font-medium">or narrow it down</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* ── Custom Shuffle ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-extrabold text-gray-800">Custom Shuffle</h2>
          <p className="text-gray-400 text-sm mt-0.5">Tell us what you are looking for</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <Dropdown
            label="Who is it for?"
            value={recipient}
            options={[{ value: '', label: 'Anyone' }, ...RECIPIENTS]}
            onChange={(v) => { setRecipient(v as Recipient | ''); setError(''); }}
          />
          <Dropdown
            label="Category"
            value={category}
            options={CATEGORIES}
            onChange={(v) => setCategory(v as NicheTag | '')}
          />
          <Dropdown
            label="Budget"
            value={budget}
            options={BUDGETS}
            onChange={(v) => { setBudget(v as BudgetTier | ''); setError(''); }}
          />
        </div>

        {error && <p className="text-red-500 text-xs mb-3 text-center">{error}</p>}

        <button
          onClick={handleCustomShuffle}
          className="btn-shuffle w-full text-white font-bold py-4 rounded-2xl text-base"
        >
          Custom Shuffle
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          We will find the best match for your criteria instantly
        </p>
      </div>

      {/* Product detail modal */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}
