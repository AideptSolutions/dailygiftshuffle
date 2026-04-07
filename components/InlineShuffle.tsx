'use client';
import { useState, useCallback } from 'react';
import ProductCard, { type CompactProduct } from '@/components/ProductCard';

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
  const [picks, setPicks] = useState<CompactProduct[]>(() => pickRandom(products, 4));
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

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
    setPicks(picks.map(p => pinnedIds.has(p.id) ? p : (newPicks[newPickIdx++] ?? p)));
  }, [products, picks, pinnedIds]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#1A202C' }}>{heading}</h2>
        <button
          onClick={shuffle}
          className="bg-[#F04E30] text-white font-bold px-5 py-2 rounded-full hover:opacity-90 transition-opacity text-sm"
        >
          🔀 Shuffle Again
        </button>
      </div>
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
