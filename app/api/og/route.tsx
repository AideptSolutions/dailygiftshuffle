import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Find the Perfect Gift in Seconds';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#1A202C',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 72px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo top-left */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <rect x="4.5" y="10" width="15" height="9" rx="1" />
            <path d="M3.5 7h17v3h-17zM12 7v12" />
            <path d="M12 7C10.5 4 7 4.5 8 6.6 8.7 8 12 7 12 7ZM12 7c1.5-3 5-2.5 4-.4C15.3 8 12 7 12 7Z" />
          </svg>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF' }}>
            TheGiftShuffle
          </span>
        </div>

        {/* Centered title + subtitle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: '24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 40 ? '56px' : '68px',
              fontWeight: 800,
              color: '#F04E30',
              lineHeight: 1.15,
              maxWidth: '960px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#A0AEC0',
              fontWeight: 400,
            }}
          >
            Find the perfect gift in seconds
          </div>
        </div>

        {/* Gift icon bottom-right */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '48px',
            right: '72px',
            opacity: 0.18,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#F04E30" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="4.5" y="10" width="15" height="9" rx="1" />
            <path d="M3.5 7h17v3h-17zM12 7v12" />
            <path d="M12 7C10.5 4 7 4.5 8 6.6 8.7 8 12 7 12 7ZM12 7c1.5-3 5-2.5 4-.4C15.3 8 12 7 12 7Z" />
          </svg>
        </div>

        {/* Subtle top-right accent */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #F04E3022 0%, transparent 70%)',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
