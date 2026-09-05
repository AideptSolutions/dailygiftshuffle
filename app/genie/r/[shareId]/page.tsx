import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getSharedRun } from '@/lib/genie/share';
import { LampIcon, SparkleIcon } from '@/components/genie/GenieIcons';

export const dynamic = 'force-dynamic';

interface Props {
  params: { shareId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const run = await getSharedRun(params.shareId);
  const title = 'The Gift Genie read my pins | TheGiftShuffle';
  const description = run
    ? run.recipientProfile.slice(0, 150)
    : 'AI-matched gift picks from TheGiftShuffle.';
  return {
    title,
    description,
    // Shared results are personal pages; keep them out of the index for now.
    robots: { index: false, follow: false },
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function SharedGenieRunPage({ params }: Props) {
  const run = await getSharedRun(params.shareId);
  if (!run) notFound();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFFFF' }}>
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#6D28D9] mb-3">
          <LampIcon className="w-4 h-4 text-[#D4A017]" />
          Gift Genie reading
        </span>
        <h1 className="text-3xl font-extrabold mb-4" style={{ color: '#1A202C' }}>
          The Genie read their pins...
        </h1>

        <div
          className="rounded-3xl border border-[#DDD6FE] p-6 mb-8 text-gray-700 leading-relaxed"
          style={{ background: '#F5F3FF' }}
        >
          <span className="inline-flex items-center gap-1 text-[#6D28D9] font-bold text-sm mb-1">
            <SparkleIcon className="w-3.5 h-3.5 text-[#D4A017]" /> The read
          </span>
          <p>{run.recipientProfile}</p>
        </div>

        <div className="space-y-3 mb-10">
          {run.picks.map((pick, i) => (
            <a
              key={pick.product.id}
              href={pick.product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-4 rounded-2xl border border-[#DDD6FE] p-4 hover:border-[#6D28D9]/40 hover:shadow-md transition-all"
              style={{ background: '#F5F3FF' }}
            >
              <span className="text-lg font-extrabold text-gray-300 w-6 shrink-0">{i + 1}</span>
              <div className="relative w-16 h-16 shrink-0 rounded-xl bg-white overflow-hidden">
                <Image
                  src={pick.product.image}
                  alt={pick.product.name}
                  fill
                  className="object-contain p-1.5"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-gray-800 truncate">{pick.product.name}</p>
                  {pick.pinned && (
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide text-[#A16207] border border-[#D4A017]/60 rounded-full px-1.5 py-0.5">
                      Their pin
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{pick.reason}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="h-1.5 rounded-full bg-white overflow-hidden flex-1 max-w-[140px]">
                    <div
                      className="h-full rounded-full bg-[#D4A017]"
                      style={{ width: `${pick.confidence}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500">
                    {pick.confidence}% match
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-sm font-extrabold" style={{ color: '#1A202C' }}>
                {pick.product.priceDisplay}
              </span>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="btn-genie inline-block text-white font-bold px-10 py-4 rounded-full text-base"
          >
            Rub the lamp yourself
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            Pin a few gifts on TheGiftShuffle and the Genie will read them for you.
          </p>
          <p className="text-xs text-gray-300 mt-4">
            Affiliate links. We may earn a small commission at no extra cost to you.
          </p>
        </div>
      </main>
    </div>
  );
}
