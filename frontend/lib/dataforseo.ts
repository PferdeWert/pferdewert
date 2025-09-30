/**
 * DataForSEO Direct API Client
 * No MCP needed - direct REST API calls
 * Docs: https://docs.dataforseo.com/v3/
 */

const DATAFORSEO_API = 'https://api.dataforseo.com/v3';

interface DataForSEOConfig {
  login: string;
  password: string;
}

class DataForSEOClient {
  private auth: string;

  constructor(config: DataForSEOConfig) {
    this.auth = Buffer.from(`${config.login}:${config.password}`).toString('base64');
  }

  private async request(endpoint: string, data: unknown[]) {
    const response = await fetch(`${DATAFORSEO_API}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`DataForSEO API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get keyword data (search volume, CPC, competition)
   */
  async getKeywordData(keyword: string, location = 2276) {
    return this.request('/keywords_data/google_ads/search_volume/live', [{
      keywords: [keyword],
      location_code: location, // 2276 = Germany
      language_code: 'de',
      search_partners: false
    }]);
  }

  /**
   * Get keyword suggestions
   */
  async getKeywordSuggestions(keyword: string, location = 2276) {
    return this.request('/dataforseo_labs/google/keyword_suggestions/live', [{
      keyword,
      location_code: location,
      language_code: 'de',
      include_seed_keyword: true,
      include_serp_info: true,
      limit: 100
    }]);
  }

  /**
   * Get SERP results (top 100 organic results)
   */
  async getSERPResults(keyword: string, location = 2276) {
    return this.request('/serp/google/organic/live/advanced', [{
      keyword,
      location_code: location,
      language_code: 'de',
      device: 'desktop',
      os: 'windows',
      depth: 100
    }]);
  }

  /**
   * Get related keywords
   */
  async getRelatedKeywords(keyword: string, location = 2276) {
    return this.request('/dataforseo_labs/google/related_keywords/live', [{
      keyword,
      location_code: location,
      language_code: 'de',
      include_serp_info: true,
      limit: 100
    }]);
  }

  /**
   * Get keyword difficulty and competition metrics
   */
  async getKeywordDifficulty(keywords: string[], location = 2276) {
    return this.request('/dataforseo_labs/google/keywords_for_keywords/live', [{
      keywords,
      location_code: location,
      language_code: 'de',
      include_serp_info: true
    }]);
  }

  /**
   * Get backlinks for a domain
   */
  async getBacklinks(domain: string) {
    return this.request('/backlinks/summary/live', [{
      target: domain,
      internal_list_limit: 10,
      backlinks_status_type: 'live'
    }]);
  }

  /**
   * Get domain metrics (authority, backlinks, etc.)
   */
  async getDomainMetrics(domain: string) {
    return this.request('/backlinks/domain_pages/live', [{
      target: domain,
      limit: 1
    }]);
  }

  /**
   * Get competitors for a keyword
   */
  async getCompetitors(keyword: string, location = 2276) {
    return this.request('/dataforseo_labs/google/competitors_domain/live', [{
      keyword,
      location_code: location,
      language_code: 'de'
    }]);
  }

  /**
   * Get historical search volume trends
   */
  async getSearchVolumeTrends(keyword: string, location = 2276) {
    return this.request('/dataforseo_labs/google/historical_search_volume/live', [{
      keywords: [keyword],
      location_code: location,
      language_code: 'de'
    }]);
  }

  /**
   * Get bulk keyword data (multiple keywords at once)
   */
  async getBulkKeywordData(keywords: string[], location = 2276) {
    return this.request('/keywords_data/google_ads/search_volume/live', [{
      keywords,
      location_code: location,
      language_code: 'de',
      search_partners: false
    }]);
  }

  /**
   * Get page content analysis
   */
  async analyzePageContent(url: string) {
    return this.request('/on_page/instant_pages', [{
      url,
      enable_javascript: true,
      load_resources: true
    }]);
  }
}

// Singleton instance
let client: DataForSEOClient | null = null;

export function getDataForSEOClient(): DataForSEOClient {
  if (!client) {
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;

    if (!login || !password) {
      throw new Error('DataForSEO credentials not configured');
    }

    client = new DataForSEOClient({ login, password });
  }

  return client;
}

export default DataForSEOClient;