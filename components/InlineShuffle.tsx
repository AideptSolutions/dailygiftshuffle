'use client';
import { useState, useCallback, useEffect } from 'react';
import ProductCard, { type CompactProduct } from '@/components/ProductCard';
import CategoryIcon from '@/components/CategoryIcon';

interface Props {
  products: CompactProduct[];
  heading?: string;
}

function pickRandom(arr: CompactProduct[], n: number, excludeIds: string[] = []): CompactProduct[] {
  const excludeSet = new Set(excludeIds);
  const available = [...arr].filter(p => !excludeSet.has(p.id));
  const pool = available.length >= n ? available : [...arr];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function InlineShuffle({ products, heading = 'Shuffle Picks' }: Props) {
  // Deterministic first render: SSR and client hydration must agree, so seed with a
  // fixed slice (never Math.random) and only randomize after mount in the effect below.
  const [picks, setPicks] = useState<CompactProduct[]>(() => products.slice(0, 4));
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  // Stack of previous pick-sets so users can step back to a set they shuffled past.
  const [history, setHistory] = useState<CompactProduct[][]>([]);

  // Randomize once, client-only, after hydration completes — avoids a server/client mismatch.
  useEffect(() => {
    setPicks(pickRandom(products, 4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePin = useCallback((id: string) => {
    setPinnedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const shuffle = useCallback(() => {
    const pinnedArr = Array.from(pinnedIds);
    const numNew = picks.filter(p => !pinnedIds.has(p.id)).length;
    const newPicks = numNew > 0 ? pickRandom(products, numNew, pinnedArr) : [];
    let newPickIdx = 0;
    setHistory(prev => [...prev, picks].slice(-25));
    setPicks(picks.map(p => pinnedIds.has(p.id) ? p : (newPicks[newPickIdx++] ?? p)));
  }, [products, picks, pinnedIds]);

  const reverse = useCallback(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      setPicks(prev[prev.length - 1]);
      return prev.slice(0, -1);
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#1A202C' }}>{heading}</h2>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={reverse}
              aria-label="Go back to the previous shuffle"
              className="border border-[#F04E30] text-[#F04E30] font-bold px-4 py-2 rounded-full hover:bg-[#F04E30] hover:text-white transition-colors text-sm inline-flex items-center gap-1.5"
            >
              <span aria-hidden="true">&larr;</span> Back
            </button>
          )}
          <button
            onClick={shuffle}
            className="bg-[#F04E30] text-white font-bold px-5 py-2 rounded-full hover:opacity-90 transition-opacity text-sm inline-flex items-center gap-1.5"
          >
            <CategoryIcon slug="shuffle" className="w-4 h-4" aria-hidden="true" /> Shuffle Again
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 -mt-2 mb-4">
        No endless scrolling. One click serves up a fresh, top-rated pick, and Back revisits any you shuffled past.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {picks.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            pinned={pinnedIds.has(p.id)}
            onTogglePin={() => togglePin(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
