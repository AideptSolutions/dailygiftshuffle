// Public view of a shared Genie run. Only presentation fields leave this
// module: the owner's uid and quiz answers (which may contain personal text)
// are never exposed on the share surface.

import { redis } from '@/lib/redis';
import { runKey, shareKey } from '@/lib/genie/keys';
import type { ValidatedPick } from '@/lib/genie/validate';

export interface SharedRun {
  shareId: string;
  recipientProfile: string;
  picks: ValidatedPick[];
  createdAt: string;
}

export async function getSharedRun(shareId: string): Promise<SharedRun | null> {
  if (!/^[\w-]{4,24}$/.test(shareId)) return null;
  const runId = await redis.get<string>(shareKey(shareId));
  if (!runId) return null;
  const run = await redis.get<{
    shareId: string;
    recipientProfile: string;
    picks: ValidatedPick[];
    createdAt: string;
  }>(runKey(runId));
  if (!run?.picks?.length) return null;
  return {
    shareId,
    recipientProfile: run.recipientProfile,
    picks: run.picks,
    createdAt: run.createdAt,
  };
}
