/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // NEU: Redirects hinzufügen
  async redirects() {
    return [
      {
        source: '/bewerten',
        destination: '/pferde-preis-rechner',
        permanent: true,
      },
          // Weitere Redirects kann man dann hier hinzufügen...

    ]
  },
};

module.exports = nextConfig;