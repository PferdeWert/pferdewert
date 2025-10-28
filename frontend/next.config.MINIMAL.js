/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Minimal config - NO custom webpack, NO experimental features
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Keep redirects
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
        destination: '/pferde-ratgeber/pferd-kaufen/was-kostet-ein-pferd',
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
    ]
  },
};

module.exports = nextConfig;
