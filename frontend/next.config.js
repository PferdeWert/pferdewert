/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  async redirects() {
    return [
      {
        source: '/bewerten',
        destination: '/pferde-preis-berechnen',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;