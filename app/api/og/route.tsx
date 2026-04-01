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
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF' }}>
            🎁 TheGiftShuffle
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

        {/* Gift emoji bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '72px',
            fontSize: '80px',
            opacity: 0.18,
          }}
        >
          🎁
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
