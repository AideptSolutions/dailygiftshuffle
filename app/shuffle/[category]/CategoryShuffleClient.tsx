'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import { shuffleMultiple, clearShownIds } from '@/lib/shuffle';
import type { Product, BudgetTier, NicheTag } from '@/data/products';
import { useFavorites } from '@/lib/useFavorites';

const BUDGETS: { id: BudgetTier | 'any'; label: string; sublabel: string }[] = [
  { id: 'any',       label: 'Any Budget',       sublabel: 'Show everything' },
  { id: 'under25',   label: 'Under $25',        sublabel: 'Small & sweet' },
  { id: '25to50',    label: '$25 – $50',        sublabel: 'Great value' },
  { id: 'under50',   label: 'All under $50',    sublabel: 'Under $25 & $25–$50' },
  { id: '50to100',   label: '$50 – $100',       sublabel: 'Thoughtful' },
  { id: '100to150',  label: '$100 – $150',      sublabel: 'Premium' },
  { id: 'under150',  label: 'All under $150',   sublabel: 'Everything up to $150' },
  { id: '150to250',  label: '$150 – $250',      sublabel: 'Elevated' },
  { id: '250plus',   label: '$250+',            sublabel: 'Luxury' },
];

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

function ProductCard({ product }: { product: Product }) {
  const { toggle, isFavorited } = useFavorites();
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
      <div className="relative w-full h-28 bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-3"
          unoptimized
        />
        <button
          onClick={() => toggle(product)}
          aria-label={isFavorited(product.id) ? 'Remove from picks' : 'Save to My Picks'}
          title={isFavorited(product.id) ? 'Remove from picks' : 'Save to My Picks'}
          className="absolute top-1.5 right-1.5 h-6 px-2 flex items-center justify-center rounded-full shadow text-xs font-bold transition-all"
          style={{
            background: isFavorited(product.id) ? '#F04E30' : 'rgba(255,255,255,0.92)',
            color: isFavorited(product.id) ? '#fff' : '#F04E30',
            border: '1.5px solid #F04E30',
          }}
        >
          {isFavorited(product.id) ? 'Saved' : 'Save'}
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-1 mb-0.5">
          <h3 className="text-xs font-bold leading-tight line-clamp-2" style={{ color: '#1A202C' }}>{product.name}</h3>
          <span className="text-xs font-extrabold flex-shrink-0 ml-1" style={{ color: '#1A202C' }}>
            {product.priceDisplay}
          </span>
        </div>
        <div className="flex items-center gap-1 mb-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-2 line-clamp-2 flex-1">{product.description}</p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-amazon font-bold text-center py-2 px-3 rounded-lg text-xs block"
        >
          Buy on Amazon
        </a>
      </div>
    </div>
  );
}

interface Props {
  niche: string;
  label: string;
  emoji: string;
}

type Step = 'budget' | 'result';

export default function CategoryShuffleClient({ niche, label, emoji }: Props) {
  const [step, setStep]               = useState<Step>('budget');
  const [budget, setBudget]           = useState<BudgetTier | 'any' | null>(null);
  const [catalog, setCatalog]         = useState<Product[]>([]);
  const [picks, setPicks]             = useState<Product[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [gridKey, setGridKey]         = useState(0);

  useEffect(() => {
    fetch('/api/products/all')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setCatalog(data as Product[]); })
      .catch(() => {});
  }, []);

  const doShuffle = useCallback(
    (bud: BudgetTier | 'any') => {
      setIsShuffling(true);
      setTimeout(() => {
        const results = shuffleMultiple(
          4,
          null,
          bud,
          null,
          [niche as NicheTag],
          catalog.length > 0 ? catalog : undefined
        );
        setPicks(results);
        setGridKey((k) => k + 1);
        setIsShuffling(false);
        setStep('result');
      }, 600);
    },
    [catalog, niche]
  );

  const handleBudget = (b: BudgetTier | 'any') => {
    setBudget(b);
    doShuffle(b);
  };

  const handleShuffleAgain = () => {
    if (budget !== null) doShuffle(budget);
  };

  const handleReset = () => {
    setStep('budget');
    setBudget(null);
    setPicks([]);
    clearShownIds();
  };

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">{emoji}</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: '#1A202C' }}>
          {label} Gift Shuffle
        </h1>
        <p className="text-gray-500 text-sm">Get 4 curated gift ideas — shuffle as many times as you like</p>
      </div>

      {/* Step 1: Budget */}
      {step === 'budget' && (
        <div>
          <h2 className="text-xl font-bold text-center mb-6" style={{ color: '#1A202C' }}>What&apos;s your budget?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBudget(b.id)}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border-2 border-transparent hover:border-[#F04E30] hover:shadow-md transition-all group"
              >
                <div className="text-lg font-extrabold mb-0.5 group-hover:text-[#F04E30] transition-colors" style={{ color: '#1A202C' }}>
                  {b.label}
                </div>
                <div className="text-xs text-gray-400">{b.sublabel}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Results */}
      {step === 'result' && (
        <div>
          <h2 className="text-xl font-extrabold text-center mb-6" style={{ color: '#1A202C' }}>
            Here are 4 {label} gifts
          </h2>

          <div aria-live="polite" aria-atomic="true">
          {isShuffling ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <p className="text-gray-500 font-medium">Finding 4 {label.toLowerCase()} gifts...</p>
            </div>
          ) : picks.length > 0 ? (
            <>
              <div key={gridKey} className="grid grid-cols-2 gap-3 mb-4">
                {picks.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="flex flex-col items-center gap-2 mb-6">
                <button
                  onClick={handleShuffleAgain}
                  className="btn-shuffle font-bold py-3 px-10 rounded-2xl text-sm w-full"
                >
                  Shuffle Again
                </button>
                <button
                  onClick={handleReset}
                  className="text-gray-400 hover:text-[#F04E30] text-xs font-medium transition-colors py-1"
                >
                  ← Change Budget
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
              <p className="text-gray-600 font-medium mb-4">No products found for this budget.</p>
              <button onClick={handleReset} className="btn-shuffle font-bold px-8 py-3 rounded-full">
                Try Again
              </button>
            </div>
          )}
          </div>
        </div>
      )}

    </main>
  );
}
