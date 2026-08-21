// Hand-drawn inline SVG icons for the Gift Genie surfaces. House rule: no
// stock emoji in UI; these adapt to the brand palette via currentColor.

interface IconProps {
  className?: string;
}

// A genie lamp: squat bowl, left spout, curled handle, lid knob.
export function LampIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 6.1v-1" />
      <path d="M9.6 8.2c.6-1.1 1.4-1.7 2.4-1.7s1.8.6 2.4 1.7" />
      <path d="M7 9.4h9.9c1.2.8 1.9 1.9 1.9 3.1 0 2.6-2.9 4.3-6.5 4.3s-6.5-1.7-6.5-4.3c0-.5.1-1 .4-1.5" />
      <path d="M5.9 10.9L2.8 9.5l4.2-.4" />
      <path d="M18.6 10.7c1.5.2 2.4.9 2.4 1.8 0 .8-.7 1.5-1.9 1.8" />
      <path d="M9.2 17.6h5.6" />
    </svg>
  );
}

// Four-point sparkle with a trailing star, for magic accents.
export function SparkleIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 3.5l1.6 4.4 4.4 1.6-4.4 1.6L10 15.5 8.4 11.1 4 9.5l4.4-1.6z" />
      <path d="M17.5 14l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" opacity="0.7" />
    </svg>
  );
}

// Envelope, for the magic-link sign-in step (Phase 2).
export function EnvelopeIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7l7.5 6 7.5-6" />
    </svg>
  );
}

// Coin/token, for run credits (Phase 2/3).
export function TokenIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.2" />
      <path
        d="M12 8.2l1.1 2.7 2.7 1.1-2.7 1.1-1.1 2.7-1.1-2.7-2.7-1.1 2.7-1.1z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
