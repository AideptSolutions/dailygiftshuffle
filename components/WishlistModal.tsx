'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from '@/data/products';
import { addToWishlist } from '@/lib/wishlist';

interface Props {
  product: Product;
  onClose: () => void;
  onSaved: () => void;
  onSkip: () => void;
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export default function WishlistModal({ product, onClose, onSaved, onSkip }: Props) {
  const [email, setEmail]   = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSave = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.');
      inputRef.current?.focus();
      return;
    }
    setSaving(true);
    setError('');

    // Persist email for future saves
    localStorage.setItem('gs_email', trimmed);
    addToWishlist(trimmed, product);

    try {
      await fetch('/api/wishlist/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, picks: [product.id] }),
      });
    } catch {
      // Non-blocking — localStorage save already succeeded
    }

    setSaving(false);
    onSaved();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-modal-title"
        aria-describedby="wishlist-modal-desc"
        className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-8 animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div aria-hidden="true" className="text-5xl mb-3">✉️</div>
          <h2 id="wishlist-modal-title" className="text-xl font-extrabold text-gray-900 mb-1">
            Want your picks emailed to you?
          </h2>
          <p id="wishlist-modal-desc" className="text-gray-500 text-sm">
            Enter your email to save your wishlist and get your picks sent straight to your inbox.
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="wishlist-email" className="sr-only">
            Email address
          </label>
          <input
            ref={inputRef}
            id="wishlist-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? 'wishlist-email-error' : undefined}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#F04E30] transition-colors"
          />
          {error && (
            <p id="wishlist-email-error" role="alert" className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          aria-busy={saving}
          className="w-full btn-shuffle text-white font-bold py-3 rounded-xl disabled:opacity-60 mb-3"
        >
          {saving ? 'Saving…' : 'Send my picks ✉️'}
        </button>

        <div className="text-center">
          <button
            onClick={onSkip}
            className="text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Skip — just save to my device
          </button>
        </div>

        <p className="text-xs text-center text-gray-300 mt-4">
          Your email is only used to send your wishlist. We don&apos;t spam.
        </p>
      </div>
    </div>
  );
}
