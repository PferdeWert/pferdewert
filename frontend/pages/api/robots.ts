import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

/**
 * Dynamic robots.txt endpoint
 * Serves different robots.txt based on domain (pferdewert.de vs pferdewert.at vs pferdewert.ch)
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host || '';
  const isChDomain = host.includes('pferdewert.ch');
  const isAtDomain = host.includes('pferdewert.at');

  // Choose the correct robots.txt file based on domain
  const robotsFile = isChDomain ? 'robots-ch.txt' : (isAtDomain ? 'robots-at.txt' : 'robots-de.txt');
  const robotsPath = path.join(process.cwd(), 'public', robotsFile);

  try {
    const content = fs.readFileSync(robotsPath, 'utf-8');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    res.status(200).send(content);
  } catch {
    // Fallback if file doesn't exist
    const domain = isChDomain ? 'https://pferdewert.ch' : (isAtDomain ? 'https://pferdewert.at' : 'https://pferdewert.de');
    const fallback = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(fallback);
  }
}
