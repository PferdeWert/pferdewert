/**
 * SEO Research Utilities - Complete SEO Data Suite
 * Using Firecrawl MCP + Direct APIs (no DataForSEO MCP needed)
 */

export interface SEOKeywordData {
  keyword: string;
  searchVolume?: number;
  competition?: string;
  cpc?: number;
  trend?: number[];
  difficulty?: number;
}

export interface SERPResult {
  position: number;
  title: string;
  url: string;
  description: string;
  domain: string;
}

export interface CompetitorData {
  domain: string;
  ranking: number;
  title: string;
  backlinks?: number;
  domainAuthority?: number;
}

export interface SEOResearchResult {
  keyword: string;
  serpResults: SERPResult[];
  relatedKeywords: SEOKeywordData[];
  competitors: CompetitorData[];
  contentIdeas: string[];
}

/**
 * Get complete SEO research data for a keyword
 */
export async function getSEOResearch(keyword: string): Promise<SEOResearchResult> {
  const response = await fetch('/api/seo/research', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword })
  });

  if (!response.ok) {
    throw new Error(`SEO research failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get Google SERP results via Firecrawl
 */
export async function getSERPResults(keyword: string, limit = 10): Promise<SERPResult[]> {
  const response = await fetch('/api/seo/serp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword, limit })
  });

  if (!response.ok) {
    throw new Error(`SERP fetch failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Analyze competitor pages
 */
export async function analyzeCompetitors(urls: string[]): Promise<CompetitorData[]> {
  const response = await fetch('/api/seo/competitors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urls })
  });

  if (!response.ok) {
    throw new Error(`Competitor analysis failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get keyword suggestions and related keywords
 */
export async function getKeywordSuggestions(keyword: string): Promise<SEOKeywordData[]> {
  const response = await fetch('/api/seo/keywords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword })
  });

  if (!response.ok) {
    throw new Error(`Keyword suggestions failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Scrape and analyze top ranking pages for content ideas
 */
export async function getContentIdeas(keyword: string, topN = 5): Promise<string[]> {
  const response = await fetch('/api/seo/content-ideas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword, topN })
  });

  if (!response.ok) {
    throw new Error(`Content ideas fetch failed: ${response.statusText}`);
  }

  return response.json();
}