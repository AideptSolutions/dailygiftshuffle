'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import ProductCard, { type CompactProduct } from '@/components/ProductCard';
import CategoryIcon from '@/components/CategoryIcon';

interface Props {
  products: CompactProduct[];
  heading?: string;
}

// How long the cards gather before the new set is revealed. Kept short so the
// interaction still feels instant; must match riffleGather's duration in CSS.
const RIFFLE_MS = 260;

// Cards gather toward the middle of the row. Index 0 drifts right, the last
// drifts left, so a 4-up row collapses like a deck being squared up.
function riffleVars(i: number, total: number): React.CSSProperties {
  const mid = (total - 1) / 2;
  const offset = mid === 0 ? 0 : (mid - i) / mid; // +1 (left card) .. -1 (right card)
  return {
    '--riffle-x': `${offset * 90}px`,
    '--riffle-r': `${-offset * 16}deg`,
  } as React.CSSProperties;
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

  // 'riffle' = cards are gathering; 'idle' = settled. Drives the shuffle beat.
  const [phase, setPhase] = useState<'idle' | 'riffle'>('idle');
  const prefersReduced = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Randomize once, client-only, after hydration completes — avoids a server/client mismatch.
  useEffect(() => {
    setPicks(pickRandom(products, 4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Respect the OS reduced-motion setting; skip the animation entirely if set.
  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  const togglePin = useCallback((id: string) => {
    setPinnedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Swap in the next set. Pinned cards are kept exactly where they are.
  const commitShuffle = useCallback(() => {
    const pinnedArr = Array.from(pinnedIds);
    const numNew = picks.filter(p => !pinnedIds.has(p.id)).length;
    const newPicks = numNew > 0 ? pickRandom(products, numNew, pinnedArr) : [];
    let newPickIdx = 0;
    setHistory(prev => [...prev, picks].slice(-25));
    setPicks(picks.map(p => pinnedIds.has(p.id) ? p : (newPicks[newPickIdx++] ?? p)));
  }, [products, picks, pinnedIds]);

  const shuffle = useCallback(() => {
    if (phase === 'riffle') return; // ignore repeat clicks mid-animation
    if (prefersReduced.current) { commitShuffle(); return; }
    // Gather the cards, then reveal the new set.
    setPhase('riffle');
    timer.current = setTimeout(() => {
      commitShuffle();
      setPhase('idle');
    }, RIFFLE_MS);
  }, [phase, commitShuffle]);

  const reverse = useCallback(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      setPicks(prev[prev.length - 1]);
      return prev.slice(0, -1);
    });
  }, []);

  return (
    <div className="shuffle-panel">
      <span className="shuffle-eyebrow mb-2">
        <CategoryIcon slug="shuffle" className="w-3.5 h-3.5" aria-hidden="true" />
        Interactive gift finder
      </span>
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
            <CategoryIcon
              slug="shuffle"
              className={`w-4 h-4${phase === 'riffle' ? ' shuffle-spin' : ''}`}
              aria-hidden="true"
            />{' '}
            Shuffle Again
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 -mt-2 mb-4">
        No endless scrolling. One click serves up a fresh, top-rated pick, and Back revisits any you shuffled past.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {picks.map((p, i) => {
          const isPinned = pinnedIds.has(p.id);
          // Pinned cards stay put while the rest gather, which makes the pin
          // mechanic legible: locked picks visibly survive the shuffle.
          const riffling = phase === 'riffle' && !isPinned;
          return (
            <div
              key={p.id}
              className={riffling ? 'tile-riffle' : 'tile-tumble'}
              style={riffling ? riffleVars(i, picks.length) : { animationDelay: `${i * 85}ms` }}
            >
              <ProductCard
                product={p}
                pinned={isPinned}
                onTogglePin={() => togglePin(p.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
