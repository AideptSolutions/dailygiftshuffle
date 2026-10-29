/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async redirects() {
    return [
      {
        // Canonical host: 301 the bare apex (thegiftshuffle.com) to the www host
        // so Google consolidates ranking signals onto one hostname. The www host
        // does not match this `has` condition, so there is no redirect loop.
        source: '/:path*',
        has: [{ type: 'host', value: 'thegiftshuffle.com' }],
        destination: 'https://www.thegiftshuffle.com/:path*',
        permanent: true,
      },
      {
        source: '/category/tech-gadgets',
        destination: '/category/tech',
        permanent: true,
      },
      {
        // Crane's List was retired on 2026-10-29.
        source: '/cranes',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/streamers-gamers',
        destination: '/category/gaming',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'X-XSS-Protection',           value: '1; mode=block' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
