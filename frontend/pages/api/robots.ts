import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain');
  
  const robotsTxt = `User-agent: *
Allow: /

# Disallow specific pages that should not be indexed
Disallow: /ergebnis
Disallow: /api/
Disallow: /_next/

# Sitemap
Sitemap: https://pferdewert.de/sitemap.xml`;

  res.status(200).send(robotsTxt);
}