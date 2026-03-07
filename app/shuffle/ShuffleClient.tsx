'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import WishlistModal from '@/components/WishlistModal';
import AdSlot from '@/components/AdSlot';
import { shuffleMultiple, clearShownIds } from '@/lib/shuffle';

import { products as staticProducts, Product, Recipient, BudgetTier, Occasion, NicheTag } from '@/data/products';
import { useFavorites } from '@/lib/useFavorites';

const RECIPIENTS: { id: Recipient; label: string; image: string }[] = [
  { id: 'her',         label: 'For Her',            image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'him',         label: 'For Him',            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'mom',         label: 'For Mom',            image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'dad',         label: 'For Dad',            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'brother',     label: 'For Brother',        image: 'https://images.unsplash.com/photo-1543099415-9919b8b271bc?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'sister',      label: 'For Sister',         image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'teens',       label: 'For Teens',          image: 'https://images.unsplash.com/photo-1568337339839-459b20412498?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'kids',        label: 'For Kids',           image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'baby',        label: 'For Baby',           image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'couples',     label: 'For Couples',        image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'friends',     label: 'For Friends',        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'pets',        label: 'For Pets',           image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&crop=entropy&auto=format' },
  { id: 'coworker',    label: 'For Coworker',       image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'employees',   label: 'For Employees',      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'grandparents',label: 'For Grandparents',   image: 'https://images.unsplash.com/photo-1554331292-735256644d5f?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'streamers',   label: 'Streamers',          image: 'https://images.unsplash.com/photo-1725429454419-5a078cb21552?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'myself-her',  label: 'Me',                 image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&auto=format' },
  { id: 'myself-him',  label: 'Me',                 image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces&auto=format' },
];

const BUDGETS: { id: BudgetTier | 'any'; label: string; sublabel: string }[] = [
  { id: 'any',       label: 'No Budget',        sublabel: 'Show everything' },
  { id: 'under25',   label: 'Under $25',        sublabel: 'Small & sweet' },
  { id: '25to50',    label: '$25 – $50',        sublabel: 'Great value' },
  { id: 'under50',   label: 'All under $50',    sublabel: 'Under $25 & $25–$50' },
  { id: '50to100',   label: '$50 – $100',       sublabel: 'Thoughtful' },
  { id: '100to150',  label: '$100 – $150',      sublabel: 'Premium' },
  { id: 'under150',  label: 'All under $150',   sublabel: 'Everything up to $150' },
  { id: '150to250',  label: '$150 – $250',      sublabel: 'Elevated' },
  { id: '250plus',   label: '$250+',            sublabel: 'Luxury' },
];

const OCCASIONS: { id: Occasion; label: string }[] = [
  { id: 'birthday',           label: 'Birthday' },
  { id: 'anniversary',        label: 'Anniversary' },
  { id: 'holiday',            label: 'Holiday / Christmas' },
  { id: 'valentines',         label: "Valentine's Day" },
  { id: 'mothersFathers',     label: "Mother's / Father's Day" },
  { id: 'weddingHousewarming',label: 'Wedding / Housewarming' },
  { id: 'graduation',         label: 'Graduation' },
  { id: 'justBecause',        label: 'Just Because' },
];

type Step = 'recipient' | 'budget' | 'occasion' | 'result';

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-gold text-sm">
      {'★'.repeat(full)}
      {half && '½'}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

function ProductCard({ product, onSave, isSaved }: { product: Product; onSave: () => void; isSaved: boolean }) {
  const { toggle: toggleFavorite, isFavorited } = useFavorites();
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
      <div className="relative w-full h-40 bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
          unoptimized
        />
        <button
          onClick={() => toggleFavorite(product)}
          aria-label={isFavorited(product.id) ? 'Remove from picks' : 'Save to My Picks'}
          title={isFavorited(product.id) ? 'Remove from picks' : 'Save to My Picks'}
          className="absolute top-2 right-2 h-7 px-2.5 flex items-center justify-center rounded-full shadow text-xs font-bold transition-all"
          style={{
            background: isFavorited(product.id) ? '#F04E30' : 'rgba(255,255,255,0.92)',
            color: isFavorited(product.id) ? '#fff' : '#F04E30',
            border: '1.5px solid #F04E30',
          }}
        >
          {isFavorited(product.id) ? 'Saved' : 'Save'}
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold leading-tight line-clamp-2" style={{ color: '#1A202C' }}>{product.name}</h3>
          <span className="text-sm font-extrabold flex-shrink-0" style={{ color: '#1A202C' }}>
            {product.priceDisplay}
          </span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1">{product.description}</p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-amazon font-bold text-center py-2.5 px-4 rounded-xl text-sm block"
        >
          Buy on Amazon
        </a>
      </div>
    </div>
  );
}

export default function ShuffleClient() {
  const [catalog, setCatalog]         = useState<Product[]>([]);
  const [step, setStep]               = useState<Step>('recipient');
  const [recipient, setRecipient]     = useState<Recipient | null>(null);
  const [budget, setBudget]           = useState<BudgetTier | 'any' | null>(null);
  const [occasion, setOccasion]       = useState<Occasion | null>(null);
  const [products, setProducts]       = useState<Product[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistProduct, setWishlistProduct] = useState<Product | null>(null);
  const [gridKey, setGridKey]         = useState(0);

  const pendingRef = useRef<{ rec: Recipient; bud: BudgetTier | 'any'; tags?: NicheTag[] } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get('recipient') as Recipient | null;
    const b = (params.get('budget') ?? 'any') as BudgetTier | 'any';
    const t = params.get('tag') as NicheTag | null;
    if (r) {
      setRecipient(r);
      setBudget(b);
      setStep('result');
      pendingRef.current = { rec: r, bud: b, tags: t ? [t] : undefined };
    }
  }, []);

  useEffect(() => {
    fetch('/api/products/all')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setCatalog(data as Product[]); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (catalog.length > 0 && pendingRef.current) {
      const { rec, bud, tags } = pendingRef.current;
      pendingRef.current = null;
      doShuffle(rec, bud, null, tags);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog]);

  const doShuffle = useCallback(
    (rec: Recipient, bud: BudgetTier | 'any', occ: Occasion | null, tags?: NicheTag[]) => {
      setIsShuffling(true);
      setTimeout(() => {
        const picks = shuffleMultiple(4, rec, bud, occ, tags, catalog.length > 0 ? catalog : undefined);
        setProducts(picks);
        setGridKey((k) => k + 1);
        setIsShuffling(false);
      }, 600);
    },
    [catalog]
  );

  const handleRecipient = (r: Recipient) => { setRecipient(r); setStep('budget'); };
  const handleBudget    = (b: BudgetTier | 'any') => {
    setBudget(b);
    if (b === 'any' && recipient) {
      doShuffle(recipient, 'any', null);
      setStep('result');
    } else {
      setStep('occasion');
    }
  };

  const handleOccasion  = (occ: Occasion | null) => {
    setOccasion(occ);
    setStep('result');
    doShuffle(recipient!, budget!, occ);
  };

  const handleShuffleAgain = () => doShuffle(recipient!, budget!, occasion);

  const handleReset = () => {
    setStep('recipient');
    setRecipient(null);
    setBudget(null);
    setOccasion(null);
    setProducts([]);
    clearShownIds();
  };

  const progressSteps = ['Recipient', 'Budget', 'Occasion', 'Result'];
  const stepIndex     = ['recipient', 'budget', 'occasion', 'result'].indexOf(step);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FFFAF5 0%, #FFF9E6 100%)' }}>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {progressSteps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i <= stepIndex ? 'text-white' : 'bg-gray-200 text-gray-400'
                }`}
                style={i <= stepIndex ? { background: '#F04E30' } : {}}
              >
                {i < stepIndex ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i <= stepIndex ? 'font-semibold' : 'text-gray-400'}`}
                style={i <= stepIndex ? { color: '#F04E30' } : {}}>
                {s}
              </span>
              {i < progressSteps.length - 1 && (
                <div className={`w-8 h-0.5 ${i < stepIndex ? 'bg-[#F04E30]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Recipient */}
        {step === 'recipient' && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2" style={{ color: '#1A202C' }}>
              Who is it for?
            </h2>
            <p className="text-center text-gray-500 mb-8">Choose a recipient to get started</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RECIPIENTS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRecipient(r.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-transparent hover:border-[#F04E30] hover:shadow-md transition-all text-center"
                >
                  <div className="relative w-full h-44">
                    <Image
                      src={r.image}
                      alt={r.label}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  </div>
                  <div className="py-2.5 px-2 font-semibold text-gray-800 text-sm">
                    {r.label}
                    {r.id === 'myself-her' && <span className="block text-[10px] text-gray-400 font-normal leading-none mt-0.5">♀ Her</span>}
                    {r.id === 'myself-him' && <span className="block text-[10px] text-gray-400 font-normal leading-none mt-0.5">♂ Him</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 'budget' && (
          <div>
            <button onClick={() => setStep('recipient')} className="text-sm text-gray-400 hover:text-[#F04E30] mb-6 flex items-center gap-1">
              ← Back
            </button>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2" style={{ color: '#1A202C' }}>
              What&apos;s your budget?
            </h2>
            <p className="text-center text-gray-500 mb-8">
              For <strong>{RECIPIENTS.find((r) => r.id === recipient)?.label}</strong>
            </p>
            <div className="grid grid-cols-2 gap-4">
              {BUDGETS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleBudget(b.id)}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border-2 border-transparent hover:border-[#F04E30] hover:shadow-md transition-all group"
                >
                  <div className="text-2xl font-extrabold mb-1 group-hover:text-[#F04E30] transition-colors" style={{ color: '#1A202C' }}>
                    {b.label}
                  </div>
                  <div className="text-sm text-gray-400">{b.sublabel}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Occasion */}
        {step === 'occasion' && (
          <div>
            <button onClick={() => setStep('budget')} className="text-sm text-gray-400 hover:text-[#F04E30] mb-6 flex items-center gap-1">
              ← Back
            </button>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2" style={{ color: '#1A202C' }}>
              What&apos;s the occasion?
            </h2>
            <p className="text-center text-gray-500 mb-6">Optional — or skip to shuffle immediately</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {OCCASIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => handleOccasion(o.id)}
                  className="bg-white rounded-2xl p-4 text-center shadow-sm border-2 border-transparent hover:border-[#F04E30] hover:shadow-md transition-all"
                >
                  <div className="font-medium text-gray-800 text-sm">{o.label}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => handleOccasion(null)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-4 rounded-2xl transition-colors"
            >
              Skip — Just Shuffle
            </button>
          </div>
        )}

        {/* Step 4: Result — 4 cards */}
        {step === 'result' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setStep('occasion')} className="text-sm text-gray-400 hover:text-[#F04E30] flex items-center gap-1">
                ← Back
              </button>
              <button onClick={handleReset} className="text-sm text-gray-400 hover:text-[#F04E30]">
                Start Over
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-center mb-6" style={{ color: '#1A202C' }}>
              Here are 4 gift ideas for you
            </h2>

            <div aria-live="polite" aria-atomic="true">
            {isShuffling ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <p className="text-gray-500 font-medium">Finding 4 perfect gifts...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div key={gridKey} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSaved={false}
                      onSave={() => {
                        setWishlistProduct(product);
                        setWishlistOpen(true);
                      }}
                    />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-2 mb-6">
                  <button
                    onClick={handleShuffleAgain}
                    className="btn-shuffle font-bold py-3 rounded-2xl text-sm w-full"
                  >
                    Shuffle
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-gray-400 hover:text-[#E64126] text-xs font-medium py-2 px-4 min-h-[44px] transition-colors"
                  >
                    Start Over
                  </button>
                </div>
                <div className="flex justify-center">
                  <AdSlot size="rectangle" />
                </div>
                <p className="text-xs text-center text-gray-300 mt-4">
                  Affiliate links — we may earn a commission at no cost to you.
                </p>
              </>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <p className="text-gray-600 font-medium mb-4">No products found for this combination.</p>
                <button onClick={handleReset} className="btn-shuffle font-bold px-8 py-3 rounded-full">
                  Try Again
                </button>
              </div>
            )}
            </div>
          </div>
        )}
      </main>

      {wishlistOpen && wishlistProduct && (
        <WishlistModal
          product={wishlistProduct}
          onClose={() => setWishlistOpen(false)}
          onSaved={() => {
            setWishlistOpen(false);
            window.dispatchEvent(new Event('wishlist-updated'));
          }}
        />
      )}
    </div>
  );
}
