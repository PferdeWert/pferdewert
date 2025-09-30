import type { NextApiRequest, NextApiResponse } from 'next';
import { getDataForSEOClient } from '../../../lib/dataforseo';

/**
 * SERP Results API
 * POST /api/seo/serp
 * Body: { keyword: string }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword required' });
  }

  try {
    const client = getDataForSEOClient();
    const result = await client.getSERPResults(keyword) as { tasks?: Array<{ result?: unknown }> };

    res.status(200).json({
      keyword,
      results: result.tasks?.[0]?.result
    });
  } catch (error) {
    console.error('SERP fetch error:', error);
    res.status(500).json({
      error: 'SERP fetch failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}