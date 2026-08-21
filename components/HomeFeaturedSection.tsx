'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Product, type Recipient, type BudgetTier, type NicheTag } from '@/data/products';
import { useFavorites } from '@/lib/useFavorites';
import { usePins } from '@/lib/usePins';
import ProductModal from '@/components/ProductModal';
import GeniePanel from '@/components/genie/GeniePanel';

// --- Random 4-picker from catalog ---
const SHUFFLE_KEY = 'dgs_home_shuffle_seen';

function getSeen(): string[] {
  try { return JSON.parse(sessionStorage.getItem(SHUFFLE_KEY) || '[]'); } catch { return []; }
}
function addSeen(ids: string[]) {
  sessionStorage.setItem(SHUFFLE_KEY, JSON.stringify([...getSeen(), ...ids]));
}

function pickN(catalog: Product[], n: number, excludeIds: string[] = []): Product[] {
  if (!catalog.length) return [];
  const excludeSet = new Set(excludeIds);
  const seen = getSeen();
  let pool = catalog.filter((p) => !seen.includes(p.id) && !excludeSet.has(p.id));
  if (pool.length < n) {
    sessionStorage.removeItem(SHUFFLE_KEY);
    pool = catalog.filter((p) => !excludeSet.has(p.id));
    if (pool.length < n) pool = catalog;
  }
  const picked: Product[] = [];
  const available = [...pool];
  while (picked.length < n && available.length > 0) {
    const idx = Math.floor(Math.random() * available.length);
    picked.push(available.splice(idx, 1)[0]);
  }
  addSeen(picked.map((p) => p.id));
  return picked;
}

function PinIcon({ pinned }: { pinned: boolean }) {
  return pinned ? (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#F04E30" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#9CA3AF" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm0 1.042L5.975 5.607a.5.5 0 0 1-.326.279 4.93 4.93 0 0 0-1.232.315l4.383 4.382a4.93 4.93 0 0 0 .315-1.232.5.5 0 0 1 .279-.325l3.843-3.844-.642-.643-3.767 3.767-.47-.47 3.767-3.767-.643-.642zm-6.74 9.92.548-.548 1.445 1.445-.548.549-1.445-1.446z"/>
    </svg>
  );
}

// Duration of the shuffle "gather" beat; must match riffleGather in globals.css.
const RIFFLE_MS = 260;

// Cards gather toward the middle of the row, like a deck being squared up.
function riffleVars(i: number, total: number): React.CSSProperties {
  const mid = (total - 1) / 2;
  const offset = mid === 0 ? 0 : (mid - i) / mid;
  return {
    '--riffle-x': `${offset * 90}px`,
    '--riffle-r': `${-offset * 16}deg`,
  } as React.CSSProperties;
}

// Lead the "examples" grid with genuinely gift-worthy items (skip sub-$25 checkout
// consumables like lip balm), ranked by social proof. Falls back to the full pool
// if the gifty set is too small.
function getTrending(catalog: Product[], n: number = 4): Product[] {
  const gifty = catalog.filter((p) => (p.price ?? 0) >= 25 && (p.rating ?? 0) >= 4.5);
  const pool = gifty.length >= n ? gifty : catalog;
  return [...pool].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)).slice(0, n);
}

// --- Star rating ---
function AmazonMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="shrink-0">
      <rect width="16" height="16" rx="3.5" fill="#FF9900" />
      <path d="M3.5 9.9c2.5 2.1 6.6 2.1 9.1.1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M11.3 8.8l2.1.7-.8 1.9z" fill="#fff" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-gold text-sm">
      {Array(full).fill('★').join('')}
      {half ? '½' : ''}
      {Array(5 - full - (half ? 1 : 0)).fill('☆').join('')}
    </span>
  );
}

// --- Option lists ---
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

// Visual recipient tiles for the highest-intent recipients (the long tail stays in
// the "someone else" dropdown). Images are generated, on-brand gift flat-lays.
const RECIPIENT_TILES: { value: Recipient; label: string; img: string }[] = [
  { value: 'her',     label: 'For Her',   img: '/images/recipients/her.jpg' },
  { value: 'him',     label: 'For Him',   img: '/images/recipients/him.jpg' },
  { value: 'mom',     label: 'For Mom',   img: '/images/recipients/mom.jpg' },
  { value: 'dad',     label: 'For Dad',   img: '/images/recipients/dad.jpg' },
  { value: 'kids',    label: 'For Kids',  img: '/images/recipients/kids.jpg' },
  { value: 'teens',   label: 'For Teens', img: '/images/recipients/teens.jpg' },
  { value: 'couples', label: 'Couples',   img: '/images/recipients/couples.jpg' },
  { value: 'friends', label: 'Friends',   img: '/images/recipients/friends.jpg' },
];

// --- Dropdown ---
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
          className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-9 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#F04E30] focus:ring-1 focus:ring-[#F04E30] transition-colors cursor-pointer"
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

// --- Main component ---
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
  const [cards, setCards]           = useState<Product[]>(() => getTrending(initialProducts));
  const [isTrending, setIsTrending] = useState(true);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [count, setCount]           = useState(4);
  // Pins live in the shared persistent store (localStorage) so they survive
  // reloads and follow the visitor to every shuffle surface + the Genie panel.
  const { pins, togglePin } = usePins();
  const pinnedIds = useMemo(() => new Set(pins.map((p) => p.id)), [pins]);
  const [riffling, setRiffling]     = useState(false);
  const prefersReduced = useRef(false);
  const riffleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => { if (riffleTimer.current) clearTimeout(riffleTimer.current); };
  }, []);

  // Returning visitors see their pinned picks lead the opening deal. Pins are
  // resolved against the catalog so the grid keeps honest Product objects.
  const seededPins = useRef(false);
  useEffect(() => {
    if (seededPins.current || pins.length === 0 || catalog.length === 0) return;
    seededPins.current = true;
    setCards(prev => {
      const size = prev.length || count;
      const pinnedInCatalog = pins
        .map(p => catalog.find(c => c.id === p.id))
        .filter((p): p is Product => !!p)
        .slice(0, size);
      if (!pinnedInCatalog.length) return prev;
      const rest = prev.filter(c => !pinnedInCatalog.some(p => p.id === c.id));
      return [...pinnedInCatalog, ...rest].slice(0, size);
    });
  }, [pins, catalog, count]);

  // Custom shuffle dropdowns
  const [recipient, setRecipient] = useState<Recipient | ''>('');
  const [category,  setCategory]  = useState<NicheTag | ''>('');
  const [budget,    setBudget]    = useState<BudgetTier | ''>('');
  const [error,     setError]     = useState('');

  // Shuffle the N product cards, with the same "deck gathers, then deals" beat
  // used on the guide pages (see InlineShuffle / riffleGather in globals.css).
  const handleShuffle = useCallback(() => {
    if (riffling) return; // ignore repeat clicks mid-animation
    const commit = () => {
      const pinnedArr = Array.from(pinnedIds);
      const numNew = cards.filter(c => !pinnedIds.has(c.id)).length;
      const newPicks = numNew > 0 ? pickN(catalog, numNew, pinnedArr) : [];
      let newPickIdx = 0;
      const newCards = cards.map(c => pinnedIds.has(c.id) ? c : (newPicks[newPickIdx++] ?? c));
      // Swap directly. Cards are keyed by product id, so replaced cards remount
      // and replay tumbleIn on their own; no requestAnimationFrame needed.
      setCards(newCards);
      setIsTrending(false);
    };
    if (prefersReduced.current) { commit(); return; }
    setRiffling(true);
    riffleTimer.current = setTimeout(() => { setRiffling(false); commit(); }, RIFFLE_MS);
  }, [catalog, cards, pinnedIds, riffling]);

  // Pins persist across count changes: pinned cards stay, only the rest redeal.
  const handleCountChange = useCallback((newCount: number) => {
    setCount(newCount);
    const kept = cards.filter(c => pinnedIds.has(c.id)).slice(0, newCount);
    const fresh = pickN(catalog, Math.max(0, newCount - kept.length), kept.map(c => c.id));
    setCards([...kept, ...fresh]);
    setIsTrending(false);
  }, [catalog, cards, pinnedIds]);

  // Custom Shuffle -> navigate
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

      {/* Primary discovery path: the recipient + budget selector leads the section */}
      <div className="rounded-3xl shadow-sm border border-[#E2E8F0] p-6 sm:p-8 text-left" style={{ background: '#F0F4F8' }}>
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-800">Who are you shopping for?</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Tell us the person and your budget, and we will match a top-rated gift they will actually love, in seconds.
          </p>
        </div>

        {/* Recipient tiles */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Who is it for?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {RECIPIENT_TILES.map((t) => {
              const active = recipient === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => { setRecipient(t.value); setError(''); }}
                  aria-pressed={active}
                  className={`relative rounded-xl overflow-hidden border-2 bg-white transition-all ${
                    active ? 'border-[#F04E30] ring-2 ring-[#F04E30]/25' : 'border-transparent hover:border-[#F04E30]/40'
                  }`}
                >
                  <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
                    <Image src={t.img} alt={t.label} fill sizes="(max-width: 640px) 45vw, 180px" className="object-cover" unoptimized loading="eager" />
                    {active && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#F04E30] text-white flex items-center justify-center text-[11px] font-bold shadow">
                        &#10003;
                      </span>
                    )}
                  </div>
                  <span className={`block text-center text-xs font-bold py-1.5 ${active ? 'text-[#F04E30]' : 'text-gray-700'}`}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Long-tail recipients + Anyone */}
          <div className="mt-3 sm:max-w-xs">
            <Dropdown
              label="Or someone else"
              value={recipient}
              options={[{ value: '', label: 'Anyone / Surprise me' }, ...RECIPIENTS]}
              onChange={(v) => { setRecipient(v as Recipient | ''); setError(''); }}
            />
          </div>
        </div>

        {/* Category + budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
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
          Find Their Gift <span aria-hidden="true">&rarr;</span>
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Free, no sign-up. We surface the best match for your criteria instantly.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-[#4A5568] text-sm font-medium">or see popular gift ideas</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* Example product grid — shows the kind of thing a shuffle serves up */}
      <div className="shuffle-panel text-left">
        <span className="shuffle-eyebrow mb-2">Interactive gift finder</span>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-extrabold text-gray-800 tracking-tight">
            {isTrending ? 'Popular Gift Ideas' : 'Gift Ideas'}
          </h2>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">Show:</span>
            <select
              value={count}
              onChange={e => handleCountChange(Number(e.target.value))}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 cursor-pointer focus:outline-none focus:border-[#F04E30]"
            >
              {[4, 8, 16, 20].map(n => (
                <option key={n} value={n}>{n} gifts</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          A few top-rated crowd-pleasers. Hit shuffle for a fresh set, or narrow it down above.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cards.map((product, i) => {
            // Pinned cards hold their place while the rest gather, so the pin
            // mechanic is visible during the shuffle.
            const isRiffling = riffling && !pinnedIds.has(product.id);
            return (
            <div
              key={product.id}
              data-gift-name={product.name}
              onClick={() => setActiveProduct(product)}
              className={`${isRiffling ? 'tile-riffle' : 'tile-tumble'} rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#F04E30]/30 transition-shadow flex flex-col cursor-pointer`}
              style={isRiffling
                ? { background: '#F0F4F8', ...riffleVars(i, cards.length) }
                : { background: '#F0F4F8', animationDelay: `${i * 85}ms` }}
            >
              {/* Image + save/pin buttons */}
              <div className="relative w-full h-28">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
                <button
                  onClick={(e) => { e.stopPropagation(); togglePin(product); }}
                  title="Pin this gift"
                  className="absolute top-1.5 left-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors z-10"
                >
                  <PinIcon pinned={pinnedIds.has(product.id)} />
                </button>
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
                {product.description && (
                  <p className="text-[10px] italic text-gray-500 mt-1.5 pl-2 border-l-2 border-[#F04E30]/30 leading-snug line-clamp-2">
                    {product.description}
                  </p>
                )}
                {/* Merchant + price. Unlike the guide cards, this card opens the
                    product modal on click, so the Amazon link stays its own
                    target and stops propagation rather than covering the card. */}
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${product.name} on Amazon`}
                  className="mt-1.5 flex items-center gap-1.5 w-fit rounded-md -mx-1 px-1 py-0.5 hover:bg-white/70 transition-colors"
                >
                  <AmazonMark />
                  <span className="text-sm font-extrabold" style={{ color: '#1A202C' }}>
                    {product.priceDisplay}
                  </span>
                </a>
              </div>
            </div>
            );
          })}
        </div>

        {/* Shuffle button, inside the panel so the widget reads as one tool */}
        <div className="text-center mt-5">
          <button
            onClick={handleShuffle}
            className="btn-shuffle text-white font-bold px-10 py-4 rounded-full text-base"
          >
            Shuffle Gift Ideas
          </button>
          <p className="text-xs text-[#4A5568] mt-2">Browse the full catalog one shuffle at a time</p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Affiliate links. We may earn a small commission at no extra cost to you.
        </p>
      </div>

      {/* Gift Genie: reads the visitor's persistent pins */}
      <GeniePanel />

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
