import type { NextApiRequest, NextApiResponse } from 'next';
import { getDataForSEOClient } from '../../../lib/dataforseo';

/**
 * Complete SEO Research API
 * GET /api/seo/research?keyword=pferd+kaufen
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Disable in production - development only
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Keyword parameter required' });
  }

  try {
    const client = getDataForSEOClient();

    // Get all SEO data in parallel
    const [
      keywordData,
      suggestions,
      serpResults,
      relatedKeywords,
      competitors,
      trends
    ] = await Promise.all([
      client.getKeywordData(keyword),
      client.getKeywordSuggestions(keyword),
      client.getSERPResults(keyword),
      client.getRelatedKeywords(keyword),
      client.getCompetitors(keyword),
      client.getSearchVolumeTrends(keyword)
    ]) as Array<{ tasks?: Array<{ result?: unknown }> }>;

    res.status(200).json({
      keyword,
      timestamp: new Date().toISOString(),
      data: {
        keywordData: keywordData?.tasks?.[0]?.result,
        suggestions: suggestions?.tasks?.[0]?.result,
        serpResults: serpResults?.tasks?.[0]?.result,
        relatedKeywords: relatedKeywords?.tasks?.[0]?.result,
        competitors: competitors?.tasks?.[0]?.result,
        trends: trends?.tasks?.[0]?.result
      }
    });
  } catch (error) {
    console.error('SEO research error:', error);
    res.status(500).json({
      error: 'SEO research failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}