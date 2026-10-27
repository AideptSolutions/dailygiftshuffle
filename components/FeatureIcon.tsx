// Line icons for the homepage feature boxes. Same system as CategoryIcon:
// 24x24 grid, 1.75 stroke, round caps/joins, fill none, currentColor.

import type { SVGProps } from 'react';

export type FeatureIconName = 'personalized' | 'instant' | 'ready';

const PATHS: Record<FeatureIconName, JSX.Element> = {
  // gift tag with a heart: picked for one specific person
  personalized: (
    <>
      <path d="M11 4H5.5A1.5 1.5 0 0 0 4 5.5V11l8.5 8.5a1.5 1.5 0 0 0 2.1 0l4.9-4.9a1.5 1.5 0 0 0 0-2.1L11 4Z" />
      <circle cx="8" cy="8" r="1.2" />
      <path d="M13.4 16.2l-2.3-2.3a1.4 1.4 0 0 1 2-2l.3.3.3-.3a1.4 1.4 0 0 1 2 2l-2.3 2.3Z" />
    </>
  ),
  // stopwatch: an idea in seconds
  instant: (
    <>
      <path d="M9.5 2.75h5" />
      <path d="M12 2.75V6" />
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 13.5l3.5-3" />
    </>
  ),
  // shopping bag with a check: ready to buy
  ready: (
    <>
      <path d="M5.5 8h13l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4L5.5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      <path d="M9.5 14.2l1.8 1.8 3.4-3.6" />
    </>
  ),
};

export default function FeatureIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: FeatureIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
