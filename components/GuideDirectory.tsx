// Grouped list of every gift guide (see lib/guideIndex.ts). Plain crawlable links.

import Link from 'next/link';
import { GUIDE_INDEX } from '@/lib/guideIndex';

export default function GuideDirectory() {
  return (
    <section id="all-guides" aria-labelledby="all-guides-heading" className="mt-16">
      <div className="text-center mb-8">
        <h2 id="all-guides-heading" className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          Every Gift Guide
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Shopping for a person or an occasion instead of a category? Every guide on TheGiftShuffle is listed here.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GUIDE_INDEX.map((group) => (
          <div key={group.heading} className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-5">
            <h3 className="text-base font-extrabold text-gray-900 mb-3">{group.heading}</h3>
            <ul className="space-y-2 text-sm">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-700 hover:text-[#C2391F] underline-offset-2 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
