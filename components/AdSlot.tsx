type AdSize = 'leaderboard' | 'rectangle' | 'sidebar';

const AD_DIMENSIONS: Record<AdSize, { width: number; height: number; label: string }> = {
  leaderboard: { width: 728, height: 90, label: '728×90' },
  rectangle:   { width: 300, height: 250, label: '300×250' },
  sidebar:     { width: 160, height: 600, label: '160×600' },
};

export default function AdSlot({ size }: { size: AdSize }) {
  const { width, height, label } = AD_DIMENSIONS[size];
  // Ad slot - replace with AdSense code
  return (
    <div
      className="mx-auto flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg text-gray-400 text-xs select-none"
      style={{ width: Math.min(width, 728), height, maxWidth: '100%' }}
      aria-hidden="true"
    >
      Advertisement {label}
    </div>
  );
}
