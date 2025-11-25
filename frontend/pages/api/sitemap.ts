import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

/**
 * Dynamic sitemap.xml endpoint
 * Serves different sitemap based on domain (pferdewert.de vs pferdewert.at vs pferdewert.ch)
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host || '';
  const isChDomain = host.includes('pferdewert.ch');
  const isAtDomain = host.includes('pferdewert.at');

  // Choose the correct sitemap file based on domain
  const sitemapFile = isChDomain ? 'sitemap-ch.xml' : (isAtDomain ? 'sitemap-at.xml' : 'sitemap-de.xml');
  const sitemapPath = path.join(process.cwd(), 'public', sitemapFile);

  try {
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    res.status(200).send(content);
  } catch {
    // Fallback empty sitemap
    res.setHeader('Content-Type', 'application/xml');
    res.status(404).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
}
