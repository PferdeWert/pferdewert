import type { NextApiRequest, NextApiResponse } from 'next';
import { getDataForSEOClient } from '../../../lib/dataforseo';

/**
 * Competitor Analysis API
 * POST /api/seo/competitors
 * Body: { keyword?: string, domain?: string }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keyword, domain } = req.body;

  if (!keyword && !domain) {
    return res.status(400).json({ error: 'Either keyword or domain required' });
  }

  try {
    const client = getDataForSEOClient();

    const results: Record<string, unknown> = {};

    if (keyword) {
      results.keywordCompetitors = await client.getCompetitors(keyword);
    }

    if (domain) {
      const [backlinks, metrics] = await Promise.all([
        client.getBacklinks(domain),
        client.getDomainMetrics(domain)
      ]);
      results.backlinks = backlinks.tasks?.[0]?.result;
      results.domainMetrics = metrics.tasks?.[0]?.result;
    }

    res.status(200).json({
      keyword,
      domain,
      ...results
    });
  } catch (error) {
    console.error('Competitor analysis error:', error);
    res.status(500).json({
      error: 'Competitor analysis failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}