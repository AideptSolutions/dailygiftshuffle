// Provider adapter for the Genie brain. Default is Claude Haiku 4.5; a Gemini
// Flash implementation rides along as the swappable fallback. The backend is
// selected by the GENIE_MODEL env var, so changing models is a config flip.

import { anthropicProvider } from '@/lib/genie/anthropic';
import { geminiProvider } from '@/lib/genie/gemini';

export interface GenieInput {
  catalogBlock: string;
  quizBlock: string;
}

export interface GenieRawPick {
  productId: string;
  confidence: number;
  reason: string;
}

export interface GenieRawOutput {
  recipientProfile: string;
  picks: GenieRawPick[];
}

export interface GenieProvider {
  name: string;
  generate(input: GenieInput): Promise<GenieRawOutput>;
}

export const DEFAULT_GENIE_MODEL = 'claude-haiku-4-5';

// Fails closed: a missing API key for the configured provider throws at call
// time (surfaced as a friendly error + credit refund in the run route). It
// never silently falls through to the other provider, so misconfiguration is
// visible instead of quietly changing the product.
export function getProvider(): GenieProvider {
  const model = process.env.GENIE_MODEL || DEFAULT_GENIE_MODEL;
  return model.startsWith('gemini') ? geminiProvider(model) : anthropicProvider(model);
}
