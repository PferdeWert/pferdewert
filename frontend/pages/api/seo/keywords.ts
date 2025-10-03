import type { NextApiRequest, NextApiResponse } from 'next';
import { getDataForSEOClient } from '../../../lib/dataforseo';

/**
 * Keyword Suggestions & Data API
 * POST /api/seo/keywords
 * Body: { keyword: string, includeRelated?: boolean }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Disable in production - development only
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keyword, includeRelated = true } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword required' });
  }

  try {
    const client = getDataForSEOClient();

    const requests = [
      client.getKeywordData(keyword),
      client.getKeywordSuggestions(keyword)
    ];

    if (includeRelated) {
      requests.push(client.getRelatedKeywords(keyword));
    }

    const results = await Promise.all(requests) as Array<{ tasks?: Array<{ result?: unknown }> }>;

    res.status(200).json({
      keyword,
      keywordData: results[0]?.tasks?.[0]?.result,
      suggestions: results[1]?.tasks?.[0]?.result,
      relatedKeywords: includeRelated ? results[2]?.tasks?.[0]?.result : null
    });
  } catch (error) {
    console.error('Keyword research error:', error);
    res.status(500).json({
      error: 'Keyword research failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}