import type { Metadata } from 'next';
import ShuffleClient from './ShuffleClient';

export const metadata: Metadata = {
  title: 'Find a Gift — TheGiftShuffle',
  description: 'Pick a recipient, set a budget, and discover the perfect gift instantly.',
};

export default function ShufflePage() {
  return <ShuffleClient />;
}
