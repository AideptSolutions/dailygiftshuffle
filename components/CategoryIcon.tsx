// Cohesive custom line icons for gift categories — replaces stock emoji.
// One system: 24x24 grid, 1.75 stroke, round caps/joins, fill none, currentColor
// (so it themes to the brand coral wherever it's placed). Add a slug here when a
// new category appears; never fall back to emoji.

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { slug: string };

const PATHS: Record<string, JSX.Element> = {
  // laptop
  tech: <><rect x="4" y="6" width="16" height="11" rx="1.5" /><path d="M3 20h18" /></>,
  // gamepad
  gaming: <><rect x="3.5" y="8" width="17" height="9" rx="4.5" /><path d="M8 11v3M6.5 12.5h3" /><circle cx="15.5" cy="12" r="0.9" fill="currentColor" stroke="none" /><circle cx="17.5" cy="13.6" r="0.9" fill="currentColor" stroke="none" /></>,
  // dumbbell
  fitness: <><path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" /></>,
  // house
  home: <><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /></>,
  // pot / pan
  kitchen: <><path d="M5 11h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-3Z" /><path d="M19 12h2M3 12h2" /><path d="M9 7l1-2M14 7l1-2" /></>,
  // ball
  sports: <><circle cx="12" cy="12" r="8" /><path d="M4.5 9.5C8 11 16 11 19.5 9.5M4.5 14.5C8 13 16 13 19.5 14.5M12 4c-3 4-3 12 0 16M12 4c3 4 3 12 0 16" /></>,
  // paw
  pets: <><circle cx="8" cy="9" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="7.5" r="1.4" fill="currentColor" stroke="none" /><circle cx="16" cy="9" r="1.4" fill="currentColor" stroke="none" /><path d="M12 11c2.8 0 5 1.9 5 4.2 0 1.6-1.4 2.3-3 2-1.3-.2-2.6-.2-4 0-1.6.3-3-.4-3-2C7 12.9 9.2 11 12 11Z" /></>,
  // blocks
  kids: <><rect x="4.5" y="11.5" width="7" height="7" rx="1" /><rect x="13" y="11.5" width="7" height="7" rx="1" /><path d="M9 7.5l3-3 3 3-3 3-3-3Z" /></>,
  // paint brush
  hobby: <><path d="M14 4.5l5.5 5.5-7 7-5.5-1.5-1.5-5.5 8.5-5.5Z" /><path d="M7 16l-2.5 3.5L8 17" /></>,
  // diamond
  luxury: <><path d="M5 9.5h14l-7 9.5-7-9.5Z" /><path d="M5 9.5l2.5-4h9L19 9.5M9 9.5l3 9.5 3-9.5M9 9.5l1-4M15 9.5l-1-4" /></>,
  // briefcase
  office: <><rect x="3.5" y="8" width="17" height="11" rx="1.5" /><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8M3.5 13h17" /></>,
  // sprout in soil
  gardening: <><path d="M12 20v-7" /><path d="M12 13c0-2.5-2-4.5-4.5-4.5C7.5 11 9.5 13 12 13Z" /><path d="M12 13c0-3 2.2-5 5-5-.2 3-2.4 5-5 5Z" /><path d="M6 20h12" /></>,
  // baby (parenting)
  parenting: <><circle cx="12" cy="7" r="2.5" /><path d="M6.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" /></>,
  // wrench
  'diy-tools': <><path d="M15.5 4.5a4 4 0 0 0-4.2 6.3L4.5 17.6l1.9 1.9 6.8-6.6a4 4 0 0 0 5.1-5.3l-2.4 2.4-2.1-.6-.6-2.1 2.3-2.7Z" /></>,
  // coin $
  finance: <><circle cx="12" cy="12" r="8" /><path d="M12 7.5v9M14 9.5c-.7-.8-4-1-4 .8 0 1.7 4 .8 4 2.6 0 1.9-3.3 1.6-4 .8" /></>,
  // car
  'car-accessories': <><path d="M4 14l1.5-4.5A2 2 0 0 1 7.4 8h9.2a2 2 0 0 1 1.9 1.5L20 14v3.5h-3V16H7v1.5H4V14Z" /><path d="M4 14h16" /><circle cx="7.5" cy="16" r="1.2" fill="currentColor" stroke="none" /><circle cx="16.5" cy="16" r="1.2" fill="currentColor" stroke="none" /></>,
  // tent
  outdoors: <><path d="M12 5L4 19h16L12 5Z" /><path d="M12 5v14M12 11l-4 8M12 11l4 8" /></>,
  // lipstick / beauty
  beauty: <><rect x="9" y="10" width="6" height="9" rx="1" /><path d="M10 10l1.5-5h1L14 10" /><path d="M9 14h6" /></>,
  // paper plane / travel
  travel: <><path d="M20 4L3.5 11l6 2.2L20 4Z" /><path d="M20 4l-3 14-3.5-4.8M9.5 13.2V18l3.5-1.6" /></>,
  // chip / smart home AI
  'ai-smart-home': <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M10 10.5h4v4h-4zM9 4v2M12 4v2M15 4v2M9 18v2M12 18v2M15 18v2M4 9h2M4 12h2M4 15h2M18 9h2M18 12h2M18 15h2" /></>,
  // rattle (baby shower)
  'baby-shower': <><circle cx="9" cy="9" r="4.5" /><path d="M12 12l5 5" /><path d="M16 15l2.5-.5.5 2.5" /><path d="M7.5 8.5h.01M10.5 8.5h.01" /></>,
  // wedding rings
  wedding: <><circle cx="9.5" cy="14" r="4" /><circle cx="14.5" cy="14" r="4" /><path d="M9.5 10l-1.2-3h2.4L9.5 10ZM14.5 10l-1.2-3h2.4L14.5 10Z" /></>,
  // gift (fallback / general)
  gift: <><rect x="4.5" y="10" width="15" height="9" rx="1" /><path d="M3.5 7h17v3h-17zM12 7v12" /><path d="M12 7C10.5 4 7 4.5 8 6.6 8.7 8 12 7 12 7ZM12 7c1.5-3 5-2.5 4-.4C15.3 8 12 7 12 7Z" /></>,
  // shuffle (crossing arrows)
  shuffle: <><path d="M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4" /><path d="M18 4l3 3-3 3M18 14l3 3-3 3" /></>,
  // graduation cap
  graduation: <><path d="M12 5L2.5 9.5 12 14l9.5-4.5L12 5Z" /><path d="M6.5 11.5V16c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.5M21.5 9.5v5" /></>,
  // coffee cup + steam
  coffee: <><path d="M5 9h11v4.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" /><path d="M16 10.5h2.2a1.8 1.8 0 0 1 0 3.6H16" /><path d="M8 4c-.5 1 .5 1.6 0 2.6M11.5 4c-.5 1 .5 1.6 0 2.6" /></>,
  // leaf
  leaf: <><path d="M5.5 18.5c-.5-7 4.5-12 13-12 .5 8.5-4.5 13-11 13-1.3 0-2-.4-2-1Z" /><path d="M5.5 18.5c3-4 6.5-6.5 10.5-7.5" /></>,
  // notebook / book
  book: <><path d="M6 4.5h11a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 18V6a1.5 1.5 0 0 1 1.5-1.5Z" /><path d="M5 16.5A1.5 1.5 0 0 1 6.5 15H18M9 4.5v11" /></>,
  // droplet (spa / bath / shower)
  droplet: <><path d="M12 4c3.2 4.2 5 6.8 5 9.3a5 5 0 0 1-10 0C7 10.8 8.8 8.2 12 4Z" /><path d="M10 14.5a2.2 2.2 0 0 0 2 1.5" /></>,
  // sparkle
  sparkle: <><path d="M12 4l1.7 4.6L18 10l-4.3 1.4L12 16l-1.7-4.6L6 10l4.3-1.4L12 4Z" /><path d="M18.5 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" /></>,
  // moon (sleep / rest)
  moon: <><path d="M19.5 14A7.5 7.5 0 1 1 10 4.5 6 6 0 0 0 19.5 14Z" /></>,
  // heart
  heart: <><path d="M12 19.5C8 16.5 5.5 13.8 5.5 10.7A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 6.5 2.2c0 3.1-2.5 5.8-6.5 8.8Z" /></>,
};

export default function CategoryIcon({ slug, ...props }: IconProps) {
  const content = PATHS[slug] ?? PATHS.gift;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {content}
    </svg>
  );
}
