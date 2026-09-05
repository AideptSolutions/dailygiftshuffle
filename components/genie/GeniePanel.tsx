'use client';

// The Gift Genie panel, mounted under every shuffle surface.
//
// Phase 1 (NEXT_PUBLIC_GENIE_PHASE=1): pins mirror + teaser only.
// Phase 2 (>=2): the full flow. States: noPins -> idle -> quiz -> loading ->
// results, plus daily/weekly limit stops and error. No accounts: everyone
// (anonymous included) gets 3 readings/day capped at 15/week, enforced
// server-side against a signed anon-id cookie; the panel just reacts to the
// API's 429 daily-limit / weekly-limit answers. The magic-link auth code
// stays dormant server-side for a future accounts upgrade.

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePins } from '@/lib/usePins';
import { LampIcon, SparkleIcon, TokenIcon } from '@/components/genie/GenieIcons';
import { TRAITS, MAX_TRAITS } from '@/lib/genie/traits';

// Genie sub-brand palette (distinct from the site's coral): mystic purple
// #6D28D9 / deep #4C1D95, lavender wash #F5F3FF, border #DDD6FE, lamp gold
// #D4A017 (dark gold text #A16207 for small type on white).
// Phase 2 (the full free flow) is the launched, final state, so it is the
// default. NEXT_PUBLIC_GENIE_PHASE stays as an emergency off-switch (set 1
// for teaser-only, 0 to hide the panel). Discovered 2026-09-04: prod was
// silently stuck on the teaser because the env var never reached the
// production build; launch state should not depend on dashboard config.
const PHASE = Number(process.env.NEXT_PUBLIC_GENIE_PHASE ?? '2');

// ---- Quiz options (labels mirror the site's existing selector vocabulary) ----
const RELATIONSHIPS: { value: string; label: string }[] = [
  { value: 'her', label: 'Wife / girlfriend' },
  { value: 'him', label: 'Husband / boyfriend' },
  { value: 'mom', label: 'Mom' },
  { value: 'dad', label: 'Dad' },
  { value: 'sister', label: 'Sister' },
  { value: 'brother', label: 'Brother' },
  { value: 'friends', label: 'Friend' },
  { value: 'couples', label: 'A couple' },
  { value: 'teens', label: 'Teenager' },
  { value: 'kids', label: 'Kid' },
  { value: 'grandparents', label: 'Grandparent' },
  { value: 'coworker', label: 'Coworker' },
];
const OCCASIONS: { value: string; label: string }[] = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'holiday', label: 'Holiday / Christmas' },
  { value: 'valentines', label: "Valentine's Day" },
  { value: 'mothersFathers', label: "Mother's / Father's Day" },
  { value: 'weddingHousewarming', label: 'Wedding / Housewarming' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'justBecause', label: 'Just because' },
];
const BUDGETS: { value: string; label: string }[] = [
  { value: 'any', label: 'Any budget' },
  { value: 'under25', label: 'Under $25' },
  { value: '25to50', label: '$25 - $50' },
  { value: '50to100', label: '$50 - $100' },
  { value: '100to150', label: '$100 - $150' },
  { value: '150to250', label: '$150 - $250' },
  { value: '250plus', label: '$250+' },
];

const LOADING_LINES = [
  'Rubbing the lamp...',
  'Reading your pins like tea leaves...',
  'Judging their taste, kindly...',
  'Cross-referencing 900 gifts...',
  'Consulting three thousand years of wishes...',
  'Polishing the final picks...',
];

interface Me {
  signedIn: boolean;
  email?: string;
  runsLeftToday?: number;
  runsLeftThisWeek?: number;
  runsPerDay?: number;
}

interface Pick {
  product: {
    id: string;
    name: string;
    price: number;
    priceDisplay: string;
    image: string;
    affiliateUrl: string;
  };
  confidence: number;
  reason: string;
  pinned: boolean;
}

interface RunResult {
  runId: string;
  shareId: string;
  recipientProfile: string;
  picks: Pick[];
  runsLeftToday: number | null;
  runsLeftThisWeek: number | null;
  fallback?: boolean;
}

type View = 'idle' | 'quiz' | 'loading' | 'results' | 'dailyLimit' | 'weeklyLimit' | 'error';

export default function GeniePanel() {
  const { pins, removePin, clear } = usePins();
  const [view, setView] = useState<View>('idle');
  const [me, setMe] = useState<Me | null>(null);
  const [relationship, setRelationship] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('any');
  const [traits, setTraits] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [result, setResult] = useState<RunResult | null>(null);
  const [loadingLine, setLoadingLine] = useState(0);
  const [copied, setCopied] = useState(false);
  const lineTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (PHASE < 2) return;
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Me | null) => { if (data) setMe(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (view === 'loading') {
      lineTimer.current = setInterval(
        () => setLoadingLine((i) => (i + 1) % LOADING_LINES.length),
        1800,
      );
    }
    return () => { if (lineTimer.current) { clearInterval(lineTimer.current); lineTimer.current = null; } };
  }, [view]);

  const runGenie = useCallback(async () => {
    if (!relationship || !occasion) return;
    setView('loading');
    try {
      const res = await fetch('/api/genie/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pinnedIds: pins.map((p) => p.id),
          quiz: { relationship, occasion, budget, traits, note: note || undefined },
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as { error?: string }));
        if (err?.error === 'daily-limit') { setView('dailyLimit'); return; }
        if (err?.error === 'weekly-limit') { setView('weeklyLimit'); return; }
        setView('error');
        return;
      }
      const data = (await res.json()) as RunResult;
      setResult(data);
      if (typeof data.runsLeftToday === 'number') {
        setMe((m) => (m ? { ...m, runsLeftToday: data.runsLeftToday ?? m.runsLeftToday, runsLeftThisWeek: data.runsLeftThisWeek ?? m.runsLeftThisWeek } : m));
      }
      setView('results');
    } catch {
      setView('error');
    }
  }, [relationship, occasion, budget, traits, note, pins]);

  const shareUrl = result ? `${typeof window !== 'undefined' ? window.location.origin : ''}/genie/r/${result.shareId}` : '';
  const copyShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard unavailable */ }
  }, [shareUrl]);
  const nativeShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: 'The Gift Genie read my pins', url: shareUrl }).catch(() => {});
    }
  }, [shareUrl]);

  if (PHASE < 1) return null;

  const pinStrip = pins.length > 0 && (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {pins.map((p) => (
        <div
          key={p.id}
          className="relative group w-11 h-11 rounded-xl bg-white border border-[#DDD6FE] overflow-hidden"
          title={p.name}
        >
          <Image src={p.image} alt={p.name} fill className="object-contain p-1" unoptimized />
          <button
            onClick={() => removePin(p.id)}
            aria-label={`Unpin ${p.name}`}
            className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-white/80 text-[#6D28D9] text-[10px] font-bold"
          >
            Unpin
          </button>
        </div>
      ))}
      <button
        onClick={clear}
        className="text-xs font-semibold text-gray-400 hover:text-[#6D28D9] transition-colors ml-1"
      >
        Clear all
      </button>
    </div>
  );

  const header = (
    <div className="flex items-center justify-between mb-3">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#6D28D9]">
        <LampIcon className="w-4 h-4 text-[#D4A017]" />
        Gift Genie
      </span>
      {PHASE >= 2 && typeof me?.runsLeftToday === 'number' ? (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 border border-gray-300 rounded-full px-2 py-0.5">
          <TokenIcon className="w-3 h-3 text-[#D4A017]" />
          {me.runsLeftToday} of {me.runsPerDay ?? 3} left today
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 border border-gray-300 rounded-full px-2 py-0.5">
          <SparkleIcon className="w-3 h-3 text-[#D4A017]" />
          {PHASE >= 2 ? 'Try it free' : 'Coming soon'}
        </span>
      )}
    </div>
  );

  // ---------- Phase 1: teaser only ----------
  if (PHASE < 2) {
    return (
      <div className="rounded-3xl shadow-sm border border-[#DDD6FE] p-5 sm:p-6 mt-6 text-left" style={{ background: '#F5F3FF' }}>
        {header}
        {pins.length === 0 ? (
          <p className="text-sm text-gray-500">
            Pin a few gifts that feel close (the pin on any card) and the Genie will
            read your picks, ask three quick questions, and conjure five gifts matched
            to your person.
          </p>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-semibold text-gray-800">
                {pins.length} {pins.length === 1 ? 'gift' : 'gifts'} pinned.
              </span>{' '}
              The Genie is warming up: soon it will read these picks, ask three quick
              questions, and conjure five gifts matched to your person.
            </p>
            {pinStrip}
          </>
        )}
      </div>
    );
  }

  // ---------- Phase 2+ ----------
  return (
    <div className="rounded-3xl shadow-sm border border-[#DDD6FE] p-5 sm:p-6 mt-6 text-left" style={{ background: '#F5F3FF' }}>
      {header}

      {view === 'idle' && (
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            {pins.length === 0 ? (
              <p className="text-sm text-gray-500">
                Pin a few gifts that feel close (the pin on any card), then the Genie will
                read your picks, ask three quick questions, and conjure five matches from
                the whole catalog.
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold text-gray-800">
                    {pins.length} {pins.length === 1 ? 'gift' : 'gifts'} pinned.
                  </span>{' '}
                  Ready when you are: three quick questions, then five matched gifts.
                </p>
                {pinStrip}
                <button
                  onClick={() => setView('quiz')}
                  className="btn-genie text-white font-bold px-8 py-3 rounded-full text-sm"
                >
                  Summon the Genie
                </button>
                <p className="text-xs text-gray-400 mt-2">3 free readings a day. No sign-up, no card.</p>
              </>
            )}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/genie/genie-mascot.webp"
            alt=""
            aria-hidden="true"
            width={640}
            height={764}
            className="w-24 sm:w-28 h-auto shrink-0 -my-2"
          />
        </div>
      )}

      {view === 'quiz' && (
        <div className="space-y-3">
          {pinStrip}
          <div className="grid sm:grid-cols-3 gap-3">
            <label className="block">
              <span className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Who is it for?</span>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full rounded-xl border border-[#DDD6FE] bg-white px-3 py-2.5 text-sm text-gray-800"
              >
                <option value="">Choose...</option>
                {RELATIONSHIPS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Occasion</span>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full rounded-xl border border-[#DDD6FE] bg-white px-3 py-2.5 text-sm text-gray-800"
              >
                <option value="">Choose...</option>
                {OCCASIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Budget</span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-[#DDD6FE] bg-white px-3 py-2.5 text-sm text-gray-800"
              >
                {BUDGETS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          </div>
          <div>
            <span className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              How would you describe them? <span className="text-gray-400 normal-case font-normal">(check all that apply)</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TRAITS.map((t) => {
                const on = traits.includes(t.value);
                return (
                  <button
                    key={t.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setTraits((prev) =>
                        on
                          ? prev.filter((v) => v !== t.value)
                          : prev.length >= MAX_TRAITS
                            ? prev
                            : [...prev, t.value],
                      )
                    }
                    className={`text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors ${
                      on
                        ? 'bg-[#6D28D9] border-[#6D28D9] text-white'
                        : 'bg-white border-[#DDD6FE] text-gray-600 hover:border-[#6D28D9]/50'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="block">
            <span className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Anything else about them? <span className="text-gray-400 normal-case font-normal">(optional)</span>
            </span>
            <input
              type="text"
              maxLength={200}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Loves cooking, hates clutter..."
              className="w-full rounded-xl border border-[#DDD6FE] bg-white px-3 py-2.5 text-sm text-gray-800"
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={runGenie}
              disabled={!relationship || !occasion}
              className="btn-genie text-white font-bold px-8 py-3 rounded-full text-sm disabled:opacity-50"
            >
              Read my pins
            </button>
            <button onClick={() => setView('idle')} className="text-xs font-semibold text-gray-400 hover:text-gray-600">
              Back
            </button>
          </div>
        </div>
      )}

      {view === 'loading' && (
        <div className="py-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#DDD6FE] mb-3 animate-pulse text-[#D4A017]">
            <LampIcon className="w-7 h-7" />
          </div>
          <p className="text-sm font-semibold text-gray-600" aria-live="polite">
            {LOADING_LINES[loadingLine]}
          </p>
        </div>
      )}

      {view === 'results' && result && (
        <div>
          <div className="rounded-2xl bg-white border border-[#DDD6FE] p-4 mb-4">
            <span className="inline-flex items-center gap-1 text-[#6D28D9] font-bold text-xs uppercase tracking-wide mb-1">
              <SparkleIcon className="w-3.5 h-3.5 text-[#D4A017]" /> The read
            </span>
            <p className="text-sm text-gray-700 leading-relaxed">{result.recipientProfile}</p>
          </div>

          <div className="space-y-2.5 mb-4">
            {result.picks.map((pick, i) => (
              <a
                key={pick.product.id}
                href={pick.product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center gap-3 rounded-2xl bg-white border border-[#DDD6FE] p-3 hover:border-[#6D28D9]/40 hover:shadow-md transition-all"
              >
                <span className="text-base font-extrabold text-gray-300 w-5 shrink-0">{i + 1}</span>
                <div className="relative w-12 h-12 shrink-0 rounded-xl bg-[#EDE9FE] overflow-hidden">
                  <Image src={pick.product.image} alt={pick.product.name} fill className="object-contain p-1" unoptimized />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-xs text-gray-800 truncate">{pick.product.name}</p>
                    {pick.pinned && (
                      <span className="shrink-0 text-[8px] font-bold uppercase tracking-wide text-[#A16207] border border-[#D4A017]/60 rounded-full px-1.5 py-0.5">
                        Your pin
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{pick.reason}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1 rounded-full bg-[#EDE9FE] overflow-hidden flex-1 max-w-[120px]">
                      <div className="h-full rounded-full bg-[#D4A017]" style={{ width: `${pick.confidence}%` }} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400">{pick.confidence}%</span>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-extrabold" style={{ color: '#1A202C' }}>
                  {pick.product.priceDisplay}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={copyShare}
              className="text-xs font-bold border border-[#6D28D9] text-[#6D28D9] rounded-full px-4 py-2 hover:bg-[#6D28D9] hover:text-white transition-colors"
            >
              {copied ? 'Link copied' : 'Copy share link'}
            </button>
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={nativeShare}
                className="text-xs font-bold border border-[#6D28D9] text-[#6D28D9] rounded-full px-4 py-2 hover:bg-[#6D28D9] hover:text-white transition-colors"
              >
                Share
              </button>
            )}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('The Gift Genie read my pins')}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold text-gray-400 hover:text-[#6D28D9]"
            >
              Post on X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold text-gray-400 hover:text-[#6D28D9]"
            >
              Facebook
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold text-gray-400 hover:text-[#6D28D9]"
            >
              Pinterest
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('quiz')}
              className="text-xs font-bold text-gray-400 hover:text-[#6D28D9]"
            >
              Run it again
            </button>
            {typeof result.runsLeftToday === 'number' && (
              <span className="text-[10px] text-gray-400">
                {result.runsLeftToday} of 3 readings left today
              </span>
            )}
          </div>
        </div>
      )}



      {view === 'dailyLimit' && (
        <div>
          <p className="text-sm font-bold text-gray-800 mb-1">The Genie has done your 3 readings for today.</p>
          <p className="text-xs text-gray-500">
            Come back tomorrow for 3 more. Your pins and past readings are safe in the meantime.
          </p>
        </div>
      )}

      {view === 'weeklyLimit' && (
        <div>
          <p className="text-sm font-bold text-gray-800 mb-1">You have hit this week&apos;s limit of 15 readings.</p>
          <p className="text-xs text-gray-500">
            The lamp needs a rest. Your quota resets at the start of next week.
          </p>
        </div>
      )}

      {view === 'error' && (
        <div>
          <p className="text-sm font-bold text-gray-800 mb-1">The lamp sputtered.</p>
          <p className="text-xs text-gray-500 mb-3">Something went wrong on our side. Your run was not charged.</p>
          <button
            onClick={() => setView('quiz')}
            className="btn-genie text-white font-bold px-6 py-2.5 rounded-full text-sm"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

