/**
 * MongoDB Failed Webhooks Collection Setup
 *
 * This script initializes the `failed_webhooks` collection with:
 * - TTL Index for automatic 30-day deletion (DSGVO compliance)
 * - Required indexes for efficient querying
 */

import { connectToDatabase } from '@/lib/mongo/client';
import { error as logError } from '@/lib/log';

/**
 * MongoDB Collection Schema for Failed Webhooks
 *
 * Schema: {
 *   _id: string,                          // Unique identifier (outrank_timestamp_ms)
 *   id: string,                           // Duplicate of _id for querying
 *   timestamp: string (ISO 8601),         // When the failure occurred
 *   eventType: string,                    // 'publish_articles'
 *   payload: object,                      // Original webhook payload (full article data)
 *   errorMessage: string,                 // Error message from exception
 *   errorStack?: string,                  // Stack trace if available
 *   retryCount: number,                   // Number of retry attempts
 *   lastRetryAt?: string (ISO 8601),      // Timestamp of last retry
 *   requiresManualReview: boolean,        // Flag for manual intervention
 *   expiresAt: Date,                      // TTL deletion timestamp (30 days from creation)
 *   createdAt: Date,                      // MongoDB insertion timestamp
 * }
 */

/**
 * Initializes the failed_webhooks collection with proper indexes and TTL
 *
 * Call this once after deployment to ensure the collection exists with proper configuration
 *
 * @example
 * ```typescript
 * import { setupFailedWebhooksCollection } from '@/lib/mongo/failed-webhooks-setup';
 *
 * // In your deployment script or admin endpoint
 * await setupFailedWebhooksCollection();
 * ```
 */
export async function setupFailedWebhooksCollection(): Promise<void> {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('failed_webhooks');

    // Create TTL Index - documents will be automatically deleted 30 days after expiresAt
    // This ensures DSGVO compliance by not storing data indefinitely
    await collection.createIndex(
      { expiresAt: 1 },
      {
        expireAfterSeconds: 0, // Delete immediately after expiresAt timestamp
        name: 'expiresAt_ttl',
      }
    );

    // Create index on timestamp for efficient time-based queries (recent failures first)
    await collection.createIndex(
      { timestamp: -1 },
      {
        name: 'timestamp_desc',
      }
    );

    // Create index on eventType for filtering by webhook type
    await collection.createIndex(
      { eventType: 1 },
      {
        name: 'eventType',
      }
    );

    // Create index on requiresManualReview for finding items needing attention
    await collection.createIndex(
      { requiresManualReview: 1 },
      {
        name: 'requiresManualReview',
      }
    );

    // Create compound index for efficient audit queries
    // Allows finding recent failures by type that need manual review
    await collection.createIndex(
      { eventType: 1, timestamp: -1, requiresManualReview: 1 },
      {
        name: 'audit_query',
      }
    );

    console.log('✅ Failed webhooks collection initialized with TTL and indexes');
  } catch (err) {
    logError('Failed to setup failed_webhooks collection:', err);
    throw err;
  }
}

/**
 * Verifies that the failed_webhooks collection exists and has proper indexes
 *
 * Useful for health checks and monitoring
 *
 * @returns Object with collection and index information
 */
export async function verifyFailedWebhooksCollection(): Promise<{
  collectionExists: boolean;
  indexes: Array<{ name: string; spec: Record<string, number> }>;
}> {
  try {
    const { db } = await connectToDatabase();
    const collections = await db.listCollections({ name: 'failed_webhooks' }).toArray();
    const collectionExists = collections.length > 0;

    if (!collectionExists) {
      return {
        collectionExists: false,
        indexes: [],
      };
    }

    const collection = db.collection('failed_webhooks');
    const indexes = await collection.listIndexes().toArray();

    return {
      collectionExists: true,
      indexes: indexes.map((idx) => ({
        name: idx.name || 'unknown',
        spec: idx.key,
      })),
    };
  } catch (err) {
    logError('Failed to verify failed_webhooks collection:', err);
    throw err;
  }
}

/**
 * Counts failed webhooks that require manual review
 *
 * Useful for monitoring and alerts
 */
export async function countPendingWebhookReviews(): Promise<number> {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('failed_webhooks');
    return await collection.countDocuments({ requiresManualReview: true });
  } catch (err) {
    logError('Failed to count pending webhook reviews:', err);
    return -1; // Error indicator
  }
}

/**
 * Retrieves recent failed webhooks for review
 *
 * @param limit - Maximum number of results (default: 10)
 */
export async function getRecentFailedWebhooks(
  limit = 10
): Promise<Array<Record<string, unknown>>> {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('failed_webhooks');

    return await collection
      .find({ requiresManualReview: true })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();
  } catch (err) {
    logError('Failed to retrieve recent failed webhooks:', err);
    return [];
  }
}
