'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Recipient, type BudgetTier, type NicheTag } from '@/data/products';

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
  { value: '',          label: 'Any Category' },
  { value: 'tech',      label: 'Tech & Gadgets' },
  { value: 'kitchen',   label: 'Kitchen' },
  { value: 'fitness',   label: 'Fitness' },
  { value: 'luxury',    label: 'Luxury' },
  { value: 'diy-tools',  label: 'DIY & Tools' },
  { value: 'home',      label: 'Home' },
  { value: 'gaming',    label: 'Gaming' },
  { value: 'sports',     label: 'Sports' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'hobby',     label: 'Hobbies' },
  { value: 'office',    label: 'Office' },
  { value: 'parenting', label: 'Parenting' },
  { value: 'pets',      label: 'Pets' },
  { value: 'finance',   label: 'Finance' },
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
  label,
  value,
  options,
  onChange,
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
            <option key={o.value} value={o.value}>{o.label}</option>
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

export default function HomeShuffleWidget() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Custom Shuffle state
  const [recipient, setRecipient] = useState<Recipient | ''>('');
  const [category,  setCategory]  = useState<NicheTag | ''>('');
  const [budget,    setBudget]    = useState<BudgetTier | ''>('');
  const [error,     setError]     = useState('');

  useEffect(() => { setMounted(true); }, []);

  const handleCustomShuffle = useCallback(() => {
    if (!recipient && !budget) {
      // No filters — go straight to shuffle
      router.push('/shuffle');
      return;
    }
    if (recipient && !budget) { setError('Please select a budget.'); return; }
    if (!recipient && budget) { setError('Please select who you are buying for.'); return; }
    setError('');
    const params = new URLSearchParams();
    if (recipient) params.set('recipient', recipient);
    if (budget)    params.set('budget', budget);
    if (category)  params.set('tag', category);
    router.push(`/shuffle?${params.toString()}`);
  }, [recipient, budget, category, router]);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-8 pb-6">

      {/* ── Quick Shuffle button ────────────────────────────────────────────── */}
      <div className="text-center">
        <button
          onClick={() => router.push('/shuffle')}
          className="btn-shuffle text-white font-bold px-10 py-4 rounded-full text-base"
        >
          Shuffle a Random Gift
        </button>
        <p className="text-xs text-[#4A5568] mt-2">Browse the full catalog one gift at a time</p>
      </div>

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-[#4A5568] text-sm font-medium">or narrow it down</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* ── Custom Shuffle ──────────────────────────────────────────────────── */}
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

        {error && (
          <p className="text-red-500 text-xs mb-3 text-center">{error}</p>
        )}

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

    </div>
  );
}
