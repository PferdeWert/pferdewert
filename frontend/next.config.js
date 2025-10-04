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
    return config;
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  async redirects() {
    return [
      {
        source: '/bewerten',
        destination: '/pferde-preis-berechnen',
        permanent: true,
      },
      {
        source: '/was-kostet-ein-pferd',
        destination: '/pferde-ratgeber/was-kostet-ein-pferd',
        permanent: true,
      },
      {
        source: '/aku-pferd',
        destination: '/pferde-ratgeber/aku-pferd',
        permanent: true,
      },
      {
        source: '/pferd-verkaufen',
        destination: '/pferde-ratgeber/pferd-verkaufen',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;