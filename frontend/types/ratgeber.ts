/**
 * TypeScript interfaces for Ratgeber (Guide) articles
 * Supports Outrank.so integration with MongoDB storage
 */

// ============================================================================
// OUTRANK PAYLOAD INTERFACES
// ============================================================================

/**
 * Article payload received from Outrank.so webhook
 */
export interface OutrankArticlePayload {
  id: string;
  title: string;
  content_markdown: string;
  content_html: string;
  meta_description: string;
  created_at: string; // ISO 8601 timestamp
  image_url: string;
  slug: string;
  tags: string[];
}

/**
 * Complete webhook event structure from Outrank.so
 */
export interface OutrankWebhookEvent {
  event: 'article.published' | 'article.updated' | 'article.deleted';
  timestamp: string; // ISO 8601
  data: {
    articles: OutrankArticlePayload[];
  };
}

// ============================================================================
// PFERDEWERT CUSTOMIZATION INTERFACES
// ============================================================================

/**
 * Internal link to other PferdeWert pages/articles
 */
export interface InternalLink {
  anchor_text: string;
  target_url: string;
  position: number; // Character position in content
  context?: string; // Surrounding text for verification
}

/**
 * PferdeWert-specific customizations and enhancements
 */
export interface PferdewertCustomizations {
  edited_title?: string; // Custom title overriding Outrank
  edited_content_html?: string; // Custom content with internal links
  custom_intro?: string; // Custom introduction paragraph
  custom_outro?: string; // Custom conclusion with CTA
  seo_keywords: string[]; // Target keywords for SEO
  internal_links: InternalLink[]; // Links to other articles/pages
  featured_image?: string; // Custom hero image URL
}

// ============================================================================
// PUBLISHING & WORKFLOW INTERFACES
// ============================================================================

/**
 * Article publishing status and workflow state
 */
export interface PublishingStatus {
  status: 'draft' | 'review' | 'published' | 'archived';
  published_at?: Date;
  scheduled_for?: Date;
  last_modified: Date;
  modified_by?: string; // User ID or system identifier
}

// ============================================================================
// SEO & META INTERFACES
// ============================================================================

/**
 * Schema.org Article structured data for rich snippets
 */
export interface ArticleStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  image: string;
  datePublished: string; // ISO 8601
  dateModified: string; // ISO 8601
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

/**
 * Complete SEO metadata for article
 */
export interface ArticleSEO {
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_image: string;
  og_title: string;
  og_description: string;
  structured_data: ArticleStructuredData;
}

// ============================================================================
// TAXONOMY & CATEGORIZATION INTERFACES
// ============================================================================

/**
 * Primary category for ratgeber articles
 */
export enum RatgeberCategory {
  Pferdekauf = 'pferdekauf',
  Pferdeverkauf = 'pferdeverkauf',
  Pferdehaltung = 'pferdehaltung',
  Pferdegesundheit = 'pferdegesundheit',
  Pferdetraining = 'pferdetraining',
  Pferdewissen = 'pferdewissen',
  Marktanalyse = 'marktanalyse',
}

/**
 * Taxonomy and categorization metadata
 */
export interface ArticleTaxonomy {
  primary_category: RatgeberCategory;
  subcategories: string[];
  related_topics: string[];
  target_keywords: string[];
}

// ============================================================================
// ANALYTICS INTERFACES
// ============================================================================

/**
 * Article performance analytics
 */
export interface ArticleAnalytics {
  views: number;
  unique_visitors: number;
  avg_time_on_page: number; // seconds
  bounce_rate: number; // 0-1
  conversion_rate: number; // 0-1 (valuation form submissions)
  last_analytics_update: Date;
}

// ============================================================================
// VERSION HISTORY INTERFACES
// ============================================================================

/**
 * Article version for audit trail
 */
export interface ArticleVersion {
  version: number;
  modified_at: Date;
  modified_by: string;
  changes: {
    field: string;
    old_value: unknown;
    new_value: unknown;
  }[];
  snapshot?: {
    title: string;
    content_html: string;
    status: PublishingStatus['status'];
  };
}

// ============================================================================
// MAIN ARTICLE INTERFACE
// ============================================================================

/**
 * Complete ratgeber article document structure
 * Stored in MongoDB 'ratgeber_articles' collection
 */
export interface RatgeberArticle {
  _id: string; // MongoDB ObjectId as string

  /**
   * Original content from Outrank.so (immutable)
   */
  outrank: {
    id: string;
    title: string;
    content_markdown: string;
    content_html: string;
    meta_description: string;
    created_at: Date;
    image_url: string;
    slug: string;
    tags: string[];
    received_at: Date; // When webhook was received
  };

  /**
   * PferdeWert customizations (mutable)
   */
  pferdewert: PferdewertCustomizations;

  /**
   * Publishing workflow state
   */
  publishing: PublishingStatus;

  /**
   * SEO metadata
   */
  seo: ArticleSEO;

  /**
   * Taxonomy and categorization
   */
  taxonomy: ArticleTaxonomy;

  /**
   * Performance analytics
   */
  analytics: ArticleAnalytics;

  /**
   * Version history and audit trail
   */
  history: ArticleVersion[];

  /**
   * Document timestamps
   */
  created_at: Date;
  updated_at: Date;
}

// ============================================================================
// QUERY & RESPONSE INTERFACES
// ============================================================================

/**
 * Paginated list of articles for index pages
 */
export interface RatgeberListResponse {
  articles: RatgeberArticle[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Related articles response
 */
export interface RelatedArticlesResponse {
  articles: Pick<RatgeberArticle, '_id' | 'outrank' | 'pferdewert' | 'seo'>[];
}

/**
 * Article preview for cards/lists
 */
export type RatgeberArticlePreview = Pick<
  RatgeberArticle,
  '_id' | 'outrank' | 'pferdewert' | 'publishing' | 'seo' | 'taxonomy'
>;
