// Holiday accent icons for the Christmas season layer. Same system as
// FeatureIcon and CategoryIcon: 24x24 grid, 1.75 stroke, round caps/joins,
// fill none, currentColor (so they take the brand coral or holiday red).

import type { SVGProps } from 'react';

export type HolidayIconName = 'ornament' | 'pine' | 'snowflake' | 'countdown';

// One snowflake arm (center to tip, with a V branch); rotated six times.
const ARM = <path d="M12 12V3.75M9.6 6.1L12 8.5l2.4-2.4" />;

const PATHS: Record<HolidayIconName, JSX.Element> = {
  // glass bauble with a cap, hanging loop and a wavy band
  ornament: (
    <>
      <circle cx="12" cy="3.6" r="1" />
      <path d="M10.25 7.6V5.4h3.5v2.2" />
      <circle cx="12" cy="14" r="6.4" />
      <path d="M5.8 13.3c2-1 4.1-1 6.2 0s4.2 1 6.2 0" />
    </>
  ),
  // pine sprig: a diagonal stem with paired needles
  pine: (
    <>
      <path d="M5 19.25L18.75 5.5" />
      <path d="M8 16.25l-1-3.5M8 16.25l3.5 1" />
      <path d="M10.75 13.5l-1-3.5M10.75 13.5l3.5 1" />
      <path d="M13.5 10.75l-1-3.5M13.5 10.75l3.5 1" />
      <path d="M16.25 8l-.75-2.75M16.25 8l2.75.75" />
    </>
  ),
  // six-armed snowflake
  snowflake: (
    <>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 12 12)`}>
          {ARM}
        </g>
      ))}
    </>
  ),
  // calendar page with a star: the days-until-Christmas countdown
  countdown: (
    <>
      <path d="M5 6.5h14a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1Z" />
      <path d="M8.5 4.25v3.5M15.5 4.25v3.5M4 10.5h16" />
      <path d="M12 12.4l.95 1.9 2.1.3-1.5 1.45.35 2.1L12 17.15l-1.9 1 .35-2.1-1.5-1.45 2.1-.3.95-1.9Z" />
    </>
  ),
};

export default function HolidayIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: HolidayIconName }) {
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
