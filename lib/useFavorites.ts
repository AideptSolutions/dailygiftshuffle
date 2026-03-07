'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/data/products';

const STORAGE_KEY = 'dgs-favorites';
const EVENT_KEY   = 'dgs-favorites-change';

function loadFromStorage(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT_KEY));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    setFavorites(loadFromStorage());
    const sync = () => setFavorites(loadFromStorage());
    window.addEventListener(EVENT_KEY, sync);
    return () => window.removeEventListener(EVENT_KEY, sync);
  }, []);

  const toggle = useCallback((product: Product) => {
    const current = loadFromStorage();
    const exists  = current.some((p) => p.id === product.id);
    const next    = exists
      ? current.filter((p) => p.id !== product.id)
      : [...current, product];
    saveToStorage(next);
  }, []);

  const remove = useCallback((productId: string) => {
    const next = loadFromStorage().filter((p) => p.id !== productId);
    saveToStorage(next);
  }, []);

  const isFavorited = useCallback(
    (productId: string) => favorites.some((p) => p.id === productId),
    [favorites],
  );

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT_KEY));
  }, []);

  return { favorites, toggle, remove, isFavorited, clear };
}
