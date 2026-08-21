'use client';

// Shared, persistent "pin in place" store. Pins survive reloads and follow the
// visitor across every shuffle surface (home, guide pages, /shuffle), and feed
// the Gift Genie panel. Mirrors the useFavorites pattern: localStorage holds
// full product objects so consumers can render pins without a fetch, and a
// custom window event keeps every mounted hook instance in sync.

import { useState, useEffect, useCallback } from 'react';
import type { CompactProduct } from '@/components/ProductCard';

// Anything card-shaped can be pinned. Product (data/products.ts) satisfies
// this structurally; the optional fields ride along when present so the Genie
// can use tags/recipients for its pre-filter without a lookup.
export type PinnedProduct = CompactProduct & {
  recipients?: string[];
  occasions?: string[];
  tags?: string[];
  budgetTier?: string;
};

const STORAGE_KEY = 'dgs-pins';
const EVENT_KEY   = 'dgs-pins-change';

// Matches the largest tile count a shuffle surface can show.
export const MAX_PINS = 20;

function loadFromStorage(): PinnedProduct[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PinnedProduct[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: PinnedProduct[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT_KEY));
}

export function usePins() {
  const [pins, setPins] = useState<PinnedProduct[]>([]);

  useEffect(() => {
    setPins(loadFromStorage());
    const sync = () => setPins(loadFromStorage());
    window.addEventListener(EVENT_KEY, sync);
    // Cross-tab sync comes free via the storage event.
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) sync(); };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT_KEY, sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const togglePin = useCallback((product: PinnedProduct) => {
    const current = loadFromStorage();
    const exists  = current.some((p) => p.id === product.id);
    if (!exists && current.length >= MAX_PINS) return; // silently full
    const next = exists
      ? current.filter((p) => p.id !== product.id)
      : [...current, product];
    saveToStorage(next);
  }, []);

  const removePin = useCallback((productId: string) => {
    saveToStorage(loadFromStorage().filter((p) => p.id !== productId));
  }, []);

  const isPinned = useCallback(
    (productId: string) => pins.some((p) => p.id === productId),
    [pins],
  );

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT_KEY));
  }, []);

  return { pins, togglePin, removePin, isPinned, clear };
}
