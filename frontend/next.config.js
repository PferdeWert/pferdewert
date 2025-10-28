/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance optimizations (swcMinify is now default in Next.js 15)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Bundle optimization
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-markdown'],
    // Optimize Fast Refresh for stability
    turbo: false,
  },
  
  // Webpack optimization for better chunk splitting
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Better chunk splitting for long-term caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Fast Refresh optimization for development
    if (dev) {
      // Reduce aggressive Fast Refresh behavior
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay rebuild after first change
        ignored: ['**/node_modules', '**/.next', '**/.git'],
      };
    }

    return config;
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Security headers and CSP configuration
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://js.stripe.com https://checkout.stripe.com https://datafa.st https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.stripe.com https://*.google-analytics.com https://www.googletagmanager.com https://datafa.st; frame-src https://js.stripe.com https://hooks.stripe.com;"
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      },
      // HTML pages caching - prevent caching in development
      {
        source: '/pferde-ratgeber/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: isDev
              ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
              : 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: isDev
              ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
              : 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/pferde-preis-berechnen',
        headers: [
          {
            key: 'Cache-Control',
            value: isDev
              ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
              : 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  async redirects() {
    return [
      {
        source: '/bewerten',
        destination: '/pferde-preis-berechnen',
        statusCode: 301,
      },
      {
        source: '/preise',
        destination: '/pferde-preis-berechnen',
        statusCode: 301,
      },
      {
        source: '/was-ist-mein-pferd-wert',
        destination: '/pferde-preis-berechnen',
        statusCode: 301,
      },
      {
        source: '/was-kostet-ein-pferd',
        destination: '/pferde-ratgeber/was-kostet-ein-pferd',
        statusCode: 301,
      },
      {
        source: '/aku-pferd',
        destination: '/pferde-ratgeber/aku-pferd',
        statusCode: 301,
      },
      {
        source: '/pferd-verkaufen',
        destination: '/pferde-ratgeber/pferd-verkaufen',
        statusCode: 301,
      },
      {
        source: '/pferde-ratgeber/pferd-verkaufen/tipps',
        destination: '/pferde-ratgeber/pferd-verkaufen',
        statusCode: 301,
      },
      {
        source: '/pferde-ratgeber/pferd-kaufen/was-kostet-ein-pferd',
        destination: '/pferde-ratgeber/was-kostet-ein-pferd',
        statusCode: 301,
      },
      {
        source: '/pferd-kaufen',
        destination: '/pferde-ratgeber/pferd-kaufen',
        permanent: true,
      },
      {
        source: '/pferde-ratgeber/aku-pferd/klassen',
        destination: '/pferde-ratgeber/aku-pferd',
        permanent: true,
      },
      {
        source: '/pferde-ratgeber/aku-pferd/ablauf',
        destination: '/pferde-ratgeber/aku-pferd',
        statusCode: 301,
      },
    ]
  },
};

module.exports = nextConfig;