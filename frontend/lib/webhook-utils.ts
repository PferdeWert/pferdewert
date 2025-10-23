/**
 * Webhook Utility Functions
 *
 * Provides retry logic with exponential backoff and dead letter queue
 * functionality for failed webhook processing.
 */

import { info, warn, error as logError } from '@/lib/log';

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
 * Failed webhook entry for Dead Letter Queue
 */
export interface FailedWebhookEntry {
  /** Unique identifier for tracking */
  id: string;
  /** Timestamp when failure occurred */
  timestamp: string;
  /** Webhook event type */
  eventType: string;
  /** Original webhook payload */
  payload: unknown;
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
 * Stores failed webhook in Dead Letter Queue for later processing
 *
 * In production, this should write to:
 * - MongoDB `failed_webhooks` collection
 * - AWS SQS/SNS Dead Letter Queue
 * - Monitoring service (Sentry, DataDog, etc.)
 *
 * @param entry - Failed webhook entry
 * @returns Promise that resolves when stored
 *
 * @example
 * ```typescript
 * await storeFailedWebhook({
 *   id: `webhook_${Date.now()}`,
 *   timestamp: new Date().toISOString(),
 *   eventType: 'article.published',
 *   payload: webhookPayload,
 *   errorMessage: 'Database connection failed',
 *   retryCount: 3,
 *   requiresManualReview: true,
 * });
 * ```
 */
export async function storeFailedWebhook(
  entry: FailedWebhookEntry
): Promise<void> {
  try {
    // Log to console (development)
    logError('📮 DEAD LETTER QUEUE - Failed Webhook:', {
      id: entry.id,
      eventType: entry.eventType,
      timestamp: entry.timestamp,
      retryCount: entry.retryCount,
      errorMessage: entry.errorMessage,
      requiresManualReview: entry.requiresManualReview,
    });

    // TODO: Production implementation
    // Option 1: Store in MongoDB
    // const db = await connectToDatabase();
    // await db.collection('failed_webhooks').insertOne(entry);

    // Option 2: Send to AWS SQS Dead Letter Queue
    // await sqs.sendMessage({
    //   QueueUrl: process.env.DLQ_URL,
    //   MessageBody: JSON.stringify(entry),
    // });

    // Option 3: Send to monitoring service
    // await sentry.captureException(new Error(entry.errorMessage), {
    //   extra: entry,
    //   tags: { webhook_id: entry.id, event_type: entry.eventType },
    // });

    info(`✅ Failed webhook stored in DLQ: ${entry.id}`);
  } catch (dlqError) {
    // Critical: DLQ storage failed
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

    await storeFailedWebhook({
      id: `failed_${webhookData.id}_${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventType: webhookData.eventType,
      payload: webhookData.payload,
      errorMessage,
      errorStack,
      retryCount: config?.maxAttempts || DEFAULT_RETRY_CONFIG.maxAttempts,
      requiresManualReview: true,
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
