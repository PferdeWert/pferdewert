/**
 * Repository pattern for Ratgeber articles
 * Provides data access layer with business logic and MongoDB operations
 */

import { Db, Collection, ObjectId } from 'mongodb';
import { info, error } from '@/lib/log';
import {
  RatgeberArticle,
  RatgeberCategory,
  OutrankArticlePayload,
  RatgeberListResponse,
  RelatedArticlesResponse,
} from '@/types/ratgeber';

const COLLECTION_NAME = 'ratgeber_articles';
const SITE_URL = 'https://pferdewert.de';

/**
 * MongoDB document type - uses ObjectId for _id
 * This is the internal storage format
 */
type RatgeberArticleDocument = Omit<RatgeberArticle, '_id'> & {
  _id?: ObjectId;
};

/**
 * Repository class for Ratgeber article CRUD operations
 */
export class RatgeberRepository {
  private collection: Collection<RatgeberArticleDocument>;

  constructor(private db: Db) {
    this.collection = db.collection(COLLECTION_NAME);
  }

  /**
   * Create article from Outrank webhook payload with idempotency
   */
  async createFromOutrank(
    payload: OutrankArticlePayload
  ): Promise<RatgeberArticle> {
    try {
      // Check if article already exists (idempotency)
      const existing = await this.collection.findOne({
        'outrank.id': payload.id,
      });

      if (existing) {
        info(`Article with Outrank ID ${payload.id} already exists, skipping`);
        return {
          ...existing,
          _id: existing._id.toString(),
        } as RatgeberArticle;
      }

      // Infer category from tags and content
      const category = this.inferCategory(payload.tags, payload.title);

      // Generate structured data
      const structuredData = this.generateStructuredData(
        payload.title,
        payload.meta_description,
        payload.slug,
        payload.image_url,
        new Date(payload.created_at)
      );

      const now = new Date();

      const article: Omit<RatgeberArticle, '_id'> = {
        outrank: {
          id: payload.id,
          title: payload.title,
          content_markdown: payload.content_markdown,
          content_html: payload.content_html,
          meta_description: payload.meta_description,
          created_at: new Date(payload.created_at),
          image_url: payload.image_url,
          slug: payload.slug,
          tags: payload.tags,
          received_at: now,
        },
        pferdewert: {
          seo_keywords: payload.tags,
          internal_links: [],
        },
        publishing: {
          status: 'draft',
          last_modified: now,
        },
        seo: {
          meta_title: payload.title,
          meta_description: payload.meta_description,
          canonical_url: `${SITE_URL}/pferde-ratgeber/${payload.slug}`,
          og_image: payload.image_url,
          og_title: payload.title,
          og_description: payload.meta_description,
          structured_data: structuredData,
        },
        taxonomy: {
          primary_category: category,
          subcategories: [],
          related_topics: payload.tags,
          target_keywords: payload.tags,
        },
        analytics: {
          views: 0,
          unique_visitors: 0,
          avg_time_on_page: 0,
          bounce_rate: 0,
          conversion_rate: 0,
          last_analytics_update: now,
        },
        history: [],
        created_at: now,
        updated_at: now,
      };

      const result = await this.collection.insertOne(
        article as RatgeberArticleDocument
      );

      info(`Created article: ${payload.slug} (ID: ${result.insertedId})`);

      return {
        ...article,
        _id: result.insertedId.toString(),
      } as RatgeberArticle;
    } catch (err) {
      error('Failed to create article from Outrank payload:', err);
      throw err;
    }
  }

  /**
   * Find article by slug for ISR pages
   */
  async findBySlug(slug: string): Promise<RatgeberArticle | null> {
    try {
      const article = await this.collection.findOne({
        'outrank.slug': slug,
      });

      if (!article) {
        return null;
      }

      return {
        ...article,
        _id: article._id.toString(),
      };
    } catch (err) {
      error(`Failed to find article by slug: ${slug}`, err);
      throw err;
    }
  }

  /**
   * Find published articles with pagination
   */
  async findPublished(
    page: number = 1,
    limit: number = 20
  ): Promise<RatgeberListResponse> {
    try {
      const skip = (page - 1) * limit;

      const [articles, total] = await Promise.all([
        this.collection
          .find({
            'publishing.status': 'published',
          })
          .sort({ 'publishing.published_at': -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
        this.collection.countDocuments({
          'publishing.status': 'published',
        }),
      ]);

      const serializedArticles = articles.map((article) => ({
        ...article,
        _id: article._id.toString(),
      }));

      return {
        articles: serializedArticles,
        total,
        page,
        limit,
        hasMore: skip + articles.length < total,
      };
    } catch (err) {
      error('Failed to find published articles:', err);
      throw err;
    }
  }

  /**
   * Find related articles based on taxonomy
   */
  async findRelated(
    articleId: string,
    limit: number = 3
  ): Promise<RelatedArticlesResponse> {
    try {
      const article = await this.collection.findOne({
        _id: new ObjectId(articleId),
      });

      if (!article) {
        return { articles: [] };
      }

      // Find articles with overlapping tags or category
      const relatedArticles = await this.collection
        .find({
          _id: { $ne: article._id },
          'publishing.status': 'published',
          $or: [
            { 'outrank.tags': { $in: article.outrank.tags } },
            { 'taxonomy.primary_category': article.taxonomy.primary_category },
          ],
        })
        .limit(limit)
        .project({
          _id: 1,
          outrank: 1,
          pferdewert: 1,
          seo: 1,
        })
        .toArray();

      return {
        articles: relatedArticles.map((article) => ({
          ...article,
          _id: article._id.toString(),
        })) as RelatedArticlesResponse['articles'],
      };
    } catch (err) {
      error('Failed to find related articles:', err);
      throw err;
    }
  }

  /**
   * Update article with version history tracking
   */
  async update(
    articleId: string,
    updates: Partial<
      Pick<RatgeberArticle, 'pferdewert' | 'seo' | 'taxonomy'>
    >,
    modifiedBy: string
  ): Promise<RatgeberArticle | null> {
    try {
      const article = await this.collection.findOne({
        _id: new ObjectId(articleId),
      });

      if (!article) {
        return null;
      }

      const now = new Date();

      // Track changes in version history
      const changes = Object.entries(updates).map(([field, value]) => ({
        field,
        old_value: article[field as keyof RatgeberArticle],
        new_value: value,
      }));

      const newVersion = {
        version: article.history.length + 1,
        modified_at: now,
        modified_by: modifiedBy,
        changes,
      };

      const result = await this.collection.findOneAndUpdate(
        { _id: new ObjectId(articleId) },
        {
          $set: {
            ...updates,
            updated_at: now,
            'publishing.last_modified': now,
          },
          $push: {
            history: newVersion,
          },
        },
        { returnDocument: 'after' }
      );

      if (!result) {
        return null;
      }

      info(`Updated article: ${articleId} (version ${newVersion.version})`);

      return {
        ...result,
        _id: result._id.toString(),
      };
    } catch (err) {
      error('Failed to update article:', err);
      throw err;
    }
  }

  /**
   * Publish article (change workflow status)
   */
  async publish(
    articleId: string,
    modifiedBy: string
  ): Promise<RatgeberArticle | null> {
    try {
      const now = new Date();

      const result = await this.collection.findOneAndUpdate(
        { _id: new ObjectId(articleId) },
        {
          $set: {
            'publishing.status': 'published',
            'publishing.published_at': now,
            'publishing.last_modified': now,
            'publishing.modified_by': modifiedBy,
            updated_at: now,
          },
        },
        { returnDocument: 'after' }
      );

      if (!result) {
        return null;
      }

      info(`Published article: ${articleId}`);

      return {
        ...result,
        _id: result._id.toString(),
      };
    } catch (err) {
      error('Failed to publish article:', err);
      throw err;
    }
  }

  /**
   * Get all slugs for ISR getStaticPaths
   */
  async getAllSlugs(): Promise<string[]> {
    try {
      const articles = await this.collection
        .find({
          'publishing.status': 'published',
        })
        .project({ 'outrank.slug': 1 })
        .toArray();

      return articles.map((article) => article.outrank.slug);
    } catch (err) {
      error('Failed to get all slugs:', err);
      throw err;
    }
  }

  /**
   * Find articles by category
   */
  async findByCategory(
    category: RatgeberCategory,
    page: number = 1,
    limit: number = 20
  ): Promise<RatgeberListResponse> {
    try {
      const skip = (page - 1) * limit;

      const [articles, total] = await Promise.all([
        this.collection
          .find({
            'taxonomy.primary_category': category,
            'publishing.status': 'published',
          })
          .sort({ 'publishing.published_at': -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
        this.collection.countDocuments({
          'taxonomy.primary_category': category,
          'publishing.status': 'published',
        }),
      ]);

      return {
        articles: articles.map((article) => ({
          ...article,
          _id: article._id.toString(),
        })),
        total,
        page,
        limit,
        hasMore: skip + articles.length < total,
      };
    } catch (err) {
      error('Failed to find articles by category:', err);
      throw err;
    }
  }

  /**
   * Search articles using full-text search
   */
  async search(
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<RatgeberListResponse> {
    try {
      const skip = (page - 1) * limit;

      const [articles, total] = await Promise.all([
        this.collection
          .find(
            {
              $text: { $search: query },
              'publishing.status': 'published',
            },
            {
              projection: { score: { $meta: 'textScore' } },
            }
          )
          .sort({ score: { $meta: 'textScore' } })
          .skip(skip)
          .limit(limit)
          .toArray(),
        this.collection.countDocuments({
          $text: { $search: query },
          'publishing.status': 'published',
        }),
      ]);

      return {
        articles: articles.map((article) => ({
          ...article,
          _id: article._id.toString(),
        })),
        total,
        page,
        limit,
        hasMore: skip + articles.length < total,
      };
    } catch (err) {
      error('Failed to search articles:', err);
      throw err;
    }
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  /**
   * Infer primary category from tags and title
   */
  private inferCategory(tags: string[], title: string): RatgeberCategory {
    const content = [...tags, title].join(' ').toLowerCase();

    // Priority-based category inference
    if (content.includes('kaufen') || content.includes('kauf')) {
      return RatgeberCategory.Pferdekauf;
    }
    if (content.includes('verkaufen') || content.includes('verkauf')) {
      return RatgeberCategory.Pferdeverkauf;
    }
    if (content.includes('haltung') || content.includes('stall')) {
      return RatgeberCategory.Pferdehaltung;
    }
    if (
      content.includes('gesundheit') ||
      content.includes('krankheit') ||
      content.includes('tierarzt')
    ) {
      return RatgeberCategory.Pferdegesundheit;
    }
    if (content.includes('training') || content.includes('ausbildung')) {
      return RatgeberCategory.Pferdetraining;
    }
    if (
      content.includes('markt') ||
      content.includes('preis') ||
      content.includes('wert')
    ) {
      return RatgeberCategory.Marktanalyse;
    }

    // Default fallback
    return RatgeberCategory.Pferdewissen;
  }

  /**
   * Generate Schema.org ArticleStructuredData
   */
  private generateStructuredData(
    title: string,
    description: string,
    slug: string,
    imageUrl: string,
    publishedAt: Date
  ) {
    return {
      '@context': 'https://schema.org' as const,
      '@type': 'Article' as const,
      headline: title,
      description: description,
      image: imageUrl,
      datePublished: publishedAt.toISOString(),
      dateModified: publishedAt.toISOString(),
      author: {
        '@type': 'Organization' as const,
        name: 'PferdeWert.de',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization' as const,
        name: 'PferdeWert.de',
        logo: {
          '@type': 'ImageObject' as const,
          url: `${SITE_URL}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage' as const,
        '@id': `${SITE_URL}/pferde-ratgeber/${slug}`,
      },
    };
  }
}

/**
 * Factory function to get repository instance
 * Use this for dependency injection in API routes and pages
 */
export function getRatgeberRepository(db: Db): RatgeberRepository {
  return new RatgeberRepository(db);
}
