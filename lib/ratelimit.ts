// Redis-backed rate limiters (@upstash/ratelimit) for the Genie/auth routes.
// analytics off to keep Upstash command usage lean.

import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@/lib/redis';

const make = (prefix: string, tokens: number, window: Parameters<typeof Ratelimit.slidingWindow>[1]) =>
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window),
    prefix: `rl:${prefix}`,
    analytics: false,
  });

export const rlLinkPerEmail = make('link:email', 3, '15 m');
export const rlLinkPerIp    = make('link:ip', 10, '1 h');
export const rlVerifyPerIp  = make('verify:ip', 20, '1 h');
export const rlMePerIp      = make('me:ip', 60, '1 m');
export const rlRunPerIp     = make('run:ip', 5, '1 m');
