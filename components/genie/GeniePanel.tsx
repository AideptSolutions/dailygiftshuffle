'use client';

// The Gift Genie panel, mounted under every shuffle surface. Phase 1 ships the
// shell only: it mirrors the visitor's persistent pins and teases the feature.
// Later phases turn the teaser into the quiz -> loading -> results flow.

import Image from 'next/image';
import { usePins } from '@/lib/usePins';
import { LampIcon, SparkleIcon } from '@/components/genie/GenieIcons';

const PHASE = Number(process.env.NEXT_PUBLIC_GENIE_PHASE ?? '1');

export default function GeniePanel() {
  const { pins, removePin, clear } = usePins();

  if (PHASE < 1) return null;

  return (
    <div
      className="rounded-3xl shadow-sm border border-[#E2E8F0] p-5 sm:p-6 mt-6 text-left"
      style={{ background: '#F0F4F8' }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#F04E30]">
          <LampIcon className="w-4 h-4" />
          Gift Genie
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 border border-gray-300 rounded-full px-2 py-0.5">
          <SparkleIcon className="w-3 h-3" />
          Coming soon
        </span>
      </div>

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
          <div className="flex flex-wrap items-center gap-2">
            {pins.map((p) => (
              <div
                key={p.id}
                className="relative group w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] overflow-hidden"
                title={p.name}
              >
                <Image src={p.image} alt={p.name} fill className="object-contain p-1" unoptimized />
                <button
                  onClick={() => removePin(p.id)}
                  aria-label={`Unpin ${p.name}`}
                  className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-white/80 text-[#F04E30] text-xs font-bold"
                >
                  Unpin
                </button>
              </div>
            ))}
            <button
              onClick={clear}
              className="text-xs font-semibold text-gray-400 hover:text-[#F04E30] transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        </>
      )}
    </div>
  );
}
