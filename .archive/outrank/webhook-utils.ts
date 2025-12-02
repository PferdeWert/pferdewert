/**
 * Webhook Utility Functions
 *
 * Provides retry logic with exponential backoff and dead letter queue
 * functionality for failed webhook processing.
 */

import { info, warn, error as logError } from '@/lib/log';
import { connectToDatabase } from '@/lib/mongo/client';
import { z } from 'zod';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Configuration for retry behavior with exponential backoff
 */
export interface RetryConfig {
  /** Maximum number of retry attempts (default: 3) */
  maxAttempts: number;
  /** Initial delay in milliseconds (default: 1000ms) */
  initialDelayMs: number;
  /** Maximum delay cap in milliseconds (default: 30000ms = 30s) */
  maxDelayMs: number;
  /** Backoff multiplier (default: 2 for exponential backoff) */
  backoffMultiplier: number;
  /** Add random jitter to prevent thundering herd (default: true) */
  enableJitter: boolean;
}

/**
 * Default retry configuration with exponential backoff
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
  enableJitter: true,
};

/**
 * Zod schema for webhook payload validation
 * This is imported from outrank-publish.ts to ensure type consistency
 */
export const OutrankWebhookEventSchema = z.object({
  event_type: z.enum(['publish_articles']),
  timestamp: z.string(),
  data: z.object({
    articles: z.array(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200),
        content_markdown: z.string().min(100),
        content_html: z.string().min(100),
        meta_description: z.string().min(50).max(200),
        created_at: z.string().datetime(),
        image_url: z.string().url(),
        slug: z.string().min(1).max(100),
        tags: z.array(z.string()).min(1),
      })
    ),
  }),
});

/**
 * Failed webhook entry for Dead Letter Queue
 */
export interface FailedWebhookEntry {
  /** Unique identifier for tracking */
  id: string;
  /** Timestamp when failure occurred */
  timestamp: string;
  /** Webhook event type */
  eventType: string;
  /** Original webhook payload (typed) */
  payload: z.infer<typeof OutrankWebhookEventSchema>;
  /** Error message */
  errorMessage: string;
  /** Error stack trace if available */
  errorStack?: string;
  /** Number of retry attempts made */
  retryCount: number;
  /** Last retry timestamp */
  lastRetryAt?: string;
  /** Whether manual intervention is required */
  requiresManualReview: boolean;
  /** TTL for automatic deletion (set to 30 days from creation) */
  expiresAt: Date;
}

// ============================================================================
// RETRY WITH EXPONENTIAL BACKOFF
// ============================================================================

/**
 * Calculates delay for next retry attempt using exponential backoff
 *
 * Formula: min(maxDelay, initialDelay * (multiplier ^ attempt)) + jitter
 *
 * @param attempt - Current attempt number (0-based)
 * @param config - Retry configuration
 * @returns Delay in milliseconds before next retry
 */
function calculateBackoffDelay(attempt: number, config: RetryConfig): number {
  const exponentialDelay =
    config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt);

  // Cap at maximum delay
  let delay = Math.min(exponentialDelay, config.maxDelayMs);

  // Add jitter to prevent thundering herd problem
  if (config.enableJitter) {
    const jitter = Math.random() * delay * 0.1; // ±10% jitter
    delay += jitter;
  }

  return Math.floor(delay);
}

/**
 * Sleeps for specified duration (Promise-based delay)
 *
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after delay
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retries an async operation with exponential backoff
 *
 * @param operation - Async function to retry
 * @param config - Retry configuration (uses defaults if not provided)
 * @param operationName - Name for logging purposes
 * @returns Result of the operation
 * @throws Last error if all retry attempts fail
 *
 * @example
 * ```typescript
 * const result = await retryWithBackoff(
 *   async () => {
 *     const response = await fetch('/api/external');
 *     if (!response.ok) throw new Error('API error');
 *     return response.json();
 *   },
 *   { maxAttempts: 3, initialDelayMs: 1000 },
 *   'External API Call'
 * );
 * ```
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {},
  operationName = 'Operation'
): Promise<T> {
  const finalConfig: RetryConfig = {
    ...DEFAULT_RETRY_CONFIG,
    ...config,
  };

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < finalConfig.maxAttempts; attempt++) {
    try {
      // Attempt the operation
      const result = await operation();

      if (attempt > 0) {
        info(`✅ ${operationName} succeeded after ${attempt + 1} attempts`);
      }

      return result;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      const isLastAttempt = attempt === finalConfig.maxAttempts - 1;

      if (isLastAttempt) {
        logError(
          `❌ ${operationName} failed after ${finalConfig.maxAttempts} attempts:`,
          lastError
        );
        break;
      }

      const delay = calculateBackoffDelay(attempt, finalConfig);

      warn(
        `⚠️ ${operationName} failed (attempt ${attempt + 1}/${finalConfig.maxAttempts}), retrying in ${delay}ms...`,
        lastError.message
      );

      await sleep(delay);
    }
  }

  // All retries exhausted
  throw lastError;
}

// ============================================================================
// DEAD LETTER QUEUE
// ============================================================================

/**
 * Stores failed webhook in MongoDB Dead Letter Queue collection
 *
 * Features:
 * - MongoDB persistence for audit trail and manual review
 * - Automatic TTL deletion after 30 days (DSGVO compliance)
 * - Detailed error tracking for debugging and monitoring
 * - Fallback console logging if MongoDB connection fails
 *
 * @param entry - Failed webhook entry
 * @returns Promise that resolves when stored in MongoDB
 *
 * @example
 * ```typescript
 * await storeFailedWebhook({
 *   id: `webhook_${Date.now()}`,
 *   timestamp: new Date().toISOString(),
 *   eventType: 'publish_articles',
 *   payload: webhookPayload,
 *   errorMessage: 'Database connection failed',
 *   retryCount: 3,
 *   requiresManualReview: true,
 *   expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
 * });
 * ```
 */
export async function storeFailedWebhook(
  entry: FailedWebhookEntry
): Promise<void> {
  try {
    // Always log to console for debugging
    logError('📮 DEAD LETTER QUEUE - Failed Webhook:', {
      id: entry.id,
      eventType: entry.eventType,
      timestamp: entry.timestamp,
      retryCount: entry.retryCount,
      errorMessage: entry.errorMessage,
      requiresManualReview: entry.requiresManualReview,
    });

    // Connect to MongoDB and store in failed_webhooks collection
    try {
      const { db } = await connectToDatabase();
      const collection = db.collection<FailedWebhookEntry>('failed_webhooks');

      // Insert failed webhook entry with TTL for automatic cleanup
      // Note: MongoDB will accept string _id values
      await collection.insertOne({
        ...entry,
        id: entry.id,
        createdAt: new Date(),
      } as FailedWebhookEntry & { createdAt: Date });

      info(`✅ Failed webhook stored in MongoDB DLQ: ${entry.id}`);
    } catch (mongoError) {
      // If MongoDB fails, log but don't crash
      logError('Failed to store webhook in MongoDB, attempting fallback logging:', mongoError);

      // Fallback: Log to console for manual recovery
      console.error(
        `WEBHOOK_DLQ_FALLBACK: ${JSON.stringify({
          id: entry.id,
          eventType: entry.eventType,
          timestamp: entry.timestamp,
          errorMessage: entry.errorMessage,
          payload: JSON.stringify(entry.payload),
        })}`
      );
    }
  } catch (dlqError) {
    // Critical: DLQ storage failed completely
    logError('❌ CRITICAL: Failed to store webhook in Dead Letter Queue:', dlqError);
    // In production, this should trigger an alert
  }
}

// ============================================================================
// WEBHOOK PROCESSING HELPERS
// ============================================================================

/**
 * Wraps webhook processing with retry logic and DLQ fallback
 *
 * @param operation - Webhook processing function
 * @param webhookData - Webhook payload data
 * @param config - Retry configuration
 * @returns Processing result
 *
 * @example
 * ```typescript
 * await processWithRetry(
 *   async () => {
 *     const repo = await getRatgeberRepository();
 *     return await repo.createFromOutrank(article);
 *   },
 *   {
 *     id: article.id,
 *     eventType: 'article.published',
 *     payload: article,
 *   }
 * );
 * ```
 */
export async function processWithRetry<T>(
  operation: () => Promise<T>,
  webhookData: {
    id: string;
    eventType: string;
    payload: unknown;
  },
  config?: Partial<RetryConfig>
): Promise<T> {
  try {
    return await retryWithBackoff(
      operation,
      config,
      `Webhook ${webhookData.eventType} (${webhookData.id})`
    );
  } catch (err) {
    // All retries failed - store in DLQ
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    const errorStack = err instanceof Error ? err.stack : undefined;

    // Validate and cast payload to the expected webhook schema
    let validatedPayload: z.infer<typeof OutrankWebhookEventSchema>;
    try {
      validatedPayload = OutrankWebhookEventSchema.parse(webhookData.payload);
    } catch {
      // If payload doesn't match schema, store the unknown payload anyway
      // The error will be captured in errorMessage
      validatedPayload = webhookData.payload as z.infer<typeof OutrankWebhookEventSchema>;
    }

    await storeFailedWebhook({
      id: `failed_${webhookData.id}_${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventType: webhookData.eventType,
      payload: validatedPayload,
      errorMessage,
      errorStack,
      retryCount: config?.maxAttempts || DEFAULT_RETRY_CONFIG.maxAttempts,
      requiresManualReview: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days TTL
    });

    // Re-throw to let caller handle the failure
    throw err;
  }
}

// ============================================================================
// BATCH PROCESSING
// ============================================================================

/**
 * Processes array of items with concurrent limit and retry logic
 *
 * @param items - Array of items to process
 * @param processor - Async function to process each item
 * @param options - Processing options
 * @returns Results array with successes and failures
 *
 * @example
 * ```typescript
 * const results = await processBatch(
 *   articles,
 *   async (article) => {
 *     const repo = await getRatgeberRepository();
 *     return await repo.createFromOutrank(article);
 *   },
 *   { concurrency: 5, retryConfig: { maxAttempts: 2 } }
 * );
 * ```
 */
export async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  options: {
    concurrency?: number;
    retryConfig?: Partial<RetryConfig>;
    continueOnError?: boolean;
  } = {}
): Promise<Array<{ item: T; result?: R; error?: Error }>> {
  const {
    concurrency = 3,
    retryConfig = DEFAULT_RETRY_CONFIG,
    continueOnError = true,
  } = options;

  const results: Array<{ item: T; result?: R; error?: Error }> = [];
  const processingQueue = [...items];

  // Process items with concurrency limit
  const processNext = async (): Promise<void> => {
    const item = processingQueue.shift();
    if (!item) return;

    try {
      const result = await retryWithBackoff(
        () => processor(item),
        retryConfig,
        'Batch Item Processing'
      );
      results.push({ item, result });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      results.push({ item, error: err });

      if (!continueOnError) {
        throw err;
      }
    }

    // Process next item if queue not empty
    if (processingQueue.length > 0) {
      await processNext();
    }
  };

  // Start concurrent workers
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () =>
    processNext()
  );

  await Promise.all(workers);

  return results;
}
