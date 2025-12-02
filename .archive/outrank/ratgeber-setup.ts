/**
 * MongoDB Collection Setup for Ratgeber Articles
 * Creates collection and indexes for optimal query performance
 */

import { Db } from 'mongodb';
import { info, error } from '@/lib/log';

const COLLECTION_NAME = 'ratgeber_articles';

/**
 * Setup ratgeber collection with all required indexes
 * Run this during deployment or database initialization
 */
export async function setupRatgeberCollection(db: Db): Promise<void> {
  try {
    info('Setting up ratgeber collection and indexes...');

    const collection = db.collection(COLLECTION_NAME);

    // 1. Unique index on slug for URL lookups
    await collection.createIndex(
      { 'outrank.slug': 1 },
      {
        unique: true,
        name: 'slug_unique',
        background: true,
      }
    );
    info('✓ Created slug_unique index');

    // 2. Compound index for listing published articles
    await collection.createIndex(
      {
        'publishing.status': 1,
        'publishing.published_at': -1,
      },
      {
        name: 'status_published',
        background: true,
      }
    );
    info('✓ Created status_published index');

    // 3. Compound index for category pages
    await collection.createIndex(
      {
        'taxonomy.primary_category': 1,
        'publishing.status': 1,
        'publishing.published_at': -1,
      },
      {
        name: 'category_status',
        background: true,
      }
    );
    info('✓ Created category_status index');

    // 4. Multi-key index for tag queries
    await collection.createIndex(
      { 'outrank.tags': 1 },
      {
        name: 'tags_index',
        background: true,
      }
    );
    info('✓ Created tags_index');

    // 5. Index for related article queries
    await collection.createIndex(
      { 'taxonomy.related_topics': 1 },
      {
        name: 'related_topics',
        background: true,
      }
    );
    info('✓ Created related_topics index');

    // 6. Full-text search index with weighted fields
    await collection.createIndex(
      {
        'outrank.title': 'text',
        'outrank.content_markdown': 'text',
        'outrank.meta_description': 'text',
        'outrank.tags': 'text',
      },
      {
        name: 'fulltext_search',
        weights: {
          'outrank.title': 10,
          'outrank.meta_description': 5,
          'outrank.tags': 3,
          'outrank.content_markdown': 1,
        },
        background: true,
      }
    );
    info('✓ Created fulltext_search index');

    // 7. Unique index on Outrank ID for webhook idempotency
    await collection.createIndex(
      { 'outrank.id': 1 },
      {
        unique: true,
        name: 'outrank_id_unique',
        background: true,
      }
    );
    info('✓ Created outrank_id_unique index');

    // 8. Index for chronological sorting
    await collection.createIndex(
      { created_at: -1 },
      {
        name: 'created_at_desc',
        background: true,
      }
    );
    info('✓ Created created_at_desc index');

    info('✅ Ratgeber collection setup completed successfully');
  } catch (err) {
    error('Failed to setup ratgeber collection:', err);
    throw err;
  }
}

/**
 * Verify all indexes exist and are healthy
 * Use this for health checks and debugging
 */
export async function verifyRatgeberIndexes(db: Db): Promise<boolean> {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const indexes = await collection.indexes();

    const expectedIndexes = [
      '_id_', // Default MongoDB index
      'slug_unique',
      'status_published',
      'category_status',
      'tags_index',
      'related_topics',
      'fulltext_search',
      'outrank_id_unique',
      'created_at_desc',
    ];

    const existingIndexNames = indexes.map((idx) => idx.name);
    const missingIndexes = expectedIndexes.filter(
      (name) => !existingIndexNames.includes(name)
    );

    if (missingIndexes.length > 0) {
      error('Missing indexes:', missingIndexes);
      return false;
    }

    info('✅ All ratgeber indexes verified');
    return true;
  } catch (err) {
    error('Failed to verify indexes:', err);
    return false;
  }
}

/**
 * Drop and recreate all indexes (use with caution in production)
 * Useful for index schema updates during development
 */
export async function recreateRatgeberIndexes(db: Db): Promise<void> {
  try {
    info('Dropping existing indexes...');
    const collection = db.collection(COLLECTION_NAME);

    // Get all indexes except _id_
    const indexes = await collection.indexes();
    const customIndexes = indexes.filter((idx) => idx.name !== '_id_');

    // Drop all custom indexes
    for (const idx of customIndexes) {
      await collection.dropIndex(idx.name!);
      info(`Dropped index: ${idx.name!}`);
    }

    // Recreate all indexes
    await setupRatgeberCollection(db);
  } catch (err) {
    error('Failed to recreate indexes:', err);
    throw err;
  }
}

/**
 * Get collection statistics for monitoring
 */
export async function getRatgeberCollectionStats(db: Db): Promise<{
  count: number;
  indexSizes: Record<string, number>;
  avgDocumentSize: number;
}> {
  try {
    const stats = await db.command({
      collStats: COLLECTION_NAME,
    });

    return {
      count: stats.count,
      indexSizes: stats.indexSizes,
      avgDocumentSize: stats.avgObjSize,
    };
  } catch (err) {
    error('Failed to get collection stats:', err);
    throw err;
  }
}
