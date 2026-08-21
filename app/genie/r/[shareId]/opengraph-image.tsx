// Dynamic OG card for shared Genie runs: this is what unfurls when a result
// link is pasted into X, Facebook, iMessage, or Pinterest.

import { ImageResponse } from 'next/og';
import { Redis } from '@upstash/redis';

// Edge runtime: avoids the @vercel/og font-path bug in the Node runtime and
// keeps this route fast. Redis access is inlined (REST/fetch, edge-safe)
// instead of importing lib/genie/share, whose dependency chain pulls node
// crypto.
export const runtime = 'edge';

interface EdgePick {
  product: { name: string };
  confidence: number;
}

async function loadRun(shareId: string): Promise<{ recipientProfile: string; picks: EdgePick[] } | null> {
  if (!/^[\w-]{4,24}$/.test(shareId)) return null;
  try {
    const redis = Redis.fromEnv();
    const runId = await redis.get<string>(`genie:share:${shareId}`);
    if (!runId) return null;
    const run = await redis.get<{ recipientProfile: string; picks: EdgePick[] }>(`genie:run:${runId}`);
    return run?.picks?.length ? run : null;
  } catch {
    return null;
  }
}
export const alt = 'The Gift Genie read my pins';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: { shareId: string } }) {
  const run = await loadRun(params.shareId);
  const profile = run
    ? run.recipientProfile.slice(0, 180) + (run.recipientProfile.length > 180 ? '...' : '')
    : 'AI-matched gift picks, conjured from hand-pinned favorites.';
  const topPicks = (run?.picks ?? []).slice(0, 3).map((p) => p.product.name.slice(0, 42));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#F0F4F8',
          padding: 64,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              width: 56,
              height: 56,
              borderRadius: 28,
              background: '#F04E30',
              color: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            G
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: '#F04E30', letterSpacing: 2 }}>
              GIFT GENIE
            </span>
            <span style={{ fontSize: 20, color: '#4A5568' }}>thegiftshuffle.com</span>
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 52, fontWeight: 800, color: '#1A202C', marginTop: 44 }}>
          The Genie read their pins...
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#4A5568',
            marginTop: 20,
            lineHeight: 1.4,
          }}
        >
          {profile}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', gap: 10 }}>
          {topPicks.map((name, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  background: '#ffffff',
                  border: '2px solid #F04E30',
                  color: '#F04E30',
                  fontSize: 20,
                  fontWeight: 800,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i + 1}
              </div>
              <span style={{ fontSize: 26, color: '#1A202C', fontWeight: 700 }}>{name}</span>
            </div>
          ))}
          <div style={{ display: 'flex', fontSize: 22, color: '#F04E30', fontWeight: 700, marginTop: 12 }}>
            See all 5 matches and rub the lamp yourself
          </div>
        </div>
      </div>
    ),
    size,
  );
}
