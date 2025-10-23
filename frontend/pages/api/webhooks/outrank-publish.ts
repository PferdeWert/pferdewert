/**
 * Outrank.so Webhook Handler for Article Publishing
 *
 * Receives article payloads from Outrank.so, stores them in MongoDB,
 * and triggers ISR revalidation for affected pages.
 *
 * Security: Bearer token authentication
 * Validation: Zod schema validation
 * Error Handling: Dead Letter Queue logging
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';
import { connectToDatabase } from '@/lib/mongo/client';
import { getRatgeberRepository } from '@/lib/mongo/ratgeber-repository';
import { info, error as logError, warn } from '@/lib/log';
import { validateWebhookToken } from '@/lib/webhook-security';
import { storeFailedWebhook } from '@/lib/webhook-utils';
import type { FailedWebhookEntry } from '@/lib/webhook-utils';

const execAsync = promisify(exec);

// ============================================================================
// ZOD VALIDATION SCHEMAS
// ============================================================================

const OutrankArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  content_markdown: z.string().min(100),
  content_html: z.string().min(100),
  meta_description: z.string().min(50).max(200),
  created_at: z.string().datetime(),
  image_url: z.string().url(),
  slug: z.string().min(1).max(100),
  tags: z.array(z.string()).min(1),
});

const OutrankWebhookEventSchema = z.object({
  event: z.enum(['article.published', 'article.updated', 'article.deleted']),
  timestamp: z.string(),
  data: z.object({
    articles: z.array(OutrankArticleSchema),
  }),
});

// ============================================================================
// TYPES
// ============================================================================

interface ProcessingResult {
  slug: string;
  status: 'success' | 'failed' | 'skipped';
  message: string;
  article_id?: string;
  revalidation_failed?: boolean;
}

interface WebhookResponse {
  success: boolean;
  processed: number;
  failed: number;
  skipped: number;
  results: ProcessingResult[];
  timestamp: string;
  failed_list_revalidations?: string[];
}

// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================

/**
 * Authenticates webhook request using constant-time comparison
 *
 * SECURITY CRITICAL: Uses timing-safe comparison to prevent timing attacks
 */
function authenticateWebhook(req: NextApiRequest): boolean {
  const authHeader = req.headers.authorization;
  const expectedSecret = process.env.OUTRANK_WEBHOOK_SECRET;

  if (!expectedSecret) {
    logError('OUTRANK_WEBHOOK_SECRET not configured');
    return false;
  }

  const isValid = validateWebhookToken(authHeader, expectedSecret);

  if (!isValid) {
    warn('Webhook authentication failed - invalid or missing token');
  }

  return isValid;
}

// ============================================================================
// DEAD LETTER QUEUE (Error Handling)
// ============================================================================

/**
 * Sends failed webhook to Dead Letter Queue using webhook-utils
 */
async function sendToDeadLetterQueue(
  event: z.infer<typeof OutrankWebhookEventSchema>,
  errorMessage: string,
  errorStack?: string
): Promise<void> {
  const failedEntry: FailedWebhookEntry = {
    id: `outrank_${event.timestamp}_${Date.now()}`,
    timestamp: new Date().toISOString(),
    eventType: event.event,
    payload: event,
    errorMessage,
    errorStack,
    retryCount: 0,
    requiresManualReview: true,
  };

  await storeFailedWebhook(failedEntry);
}

// ============================================================================
// ISR REVALIDATION
// ============================================================================

async function revalidateArticlePage(
  res: NextApiResponse,
  slug: string
): Promise<boolean> {
  try {
    await res.revalidate(`/pferde-ratgeber/${slug}`);
    info(`✅ ISR revalidated: /pferde-ratgeber/${slug}`);
    return true;
  } catch (err) {
    logError(`Failed to revalidate /pferde-ratgeber/${slug}:`, err);
    // Non-critical error - log but don't fail the entire webhook
    return false;
  }
}

async function revalidateListPages(res: NextApiResponse): Promise<string[]> {
  const pagesToRevalidate = [
    '/pferde-ratgeber',
    // Add category pages here as they're implemented
    // '/pferde-ratgeber/category/pferdekauf',
    // '/pferde-ratgeber/category/pferdeverkauf',
  ];

  const failedPaths: string[] = [];

  for (const path of pagesToRevalidate) {
    try {
      await res.revalidate(path);
      info(`✅ ISR revalidated: ${path}`);
    } catch (err) {
      logError(`Failed to revalidate ${path}:`, err);
      failedPaths.push(path);
      // Non-critical error - log but don't fail
    }
  }

  return failedPaths;
}

async function regenerateSitemap(): Promise<void> {
  try {
    info('🔄 Regenerating sitemap.xml and robots.txt...');
    await execAsync('npm run sitemap');
    info('✅ Sitemap and robots.txt regenerated successfully');
  } catch (err) {
    logError('Failed to regenerate sitemap:', err);
    // Non-critical error - log but don't fail the entire webhook
  }
}

// ============================================================================
// ARTICLE PROCESSING
// ============================================================================

async function processArticle(
  repository: ReturnType<typeof getRatgeberRepository>,
  article: z.infer<typeof OutrankArticleSchema>,
  res: NextApiResponse
): Promise<ProcessingResult> {
  try {
    const createdArticle = await repository.createFromOutrank(article);

    // Trigger ISR revalidation for this specific article
    const revalidationSuccess = await revalidateArticlePage(res, article.slug);

    return {
      slug: article.slug,
      status: 'success',
      message: 'Article created successfully',
      article_id: createdArticle._id,
      revalidation_failed: !revalidationSuccess,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    logError(`Failed to process article: ${article.slug}`, err);

    return {
      slug: article.slug,
      status: 'failed',
      message: errorMessage,
    };
  }
}

// ============================================================================
// MAIN WEBHOOK HANDLER
// ============================================================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebhookResponse | { error: string }>
) {
  // Log incoming request details for debugging
  info('📥 Incoming webhook request:', {
    method: req.method,
    headers: {
      authorization: req.headers.authorization ? 'Present' : 'Missing',
      'content-type': req.headers['content-type'],
    },
    timestamp: new Date().toISOString(),
  });

  // Step 1: Authentication (required for both GET and POST)
  if (!authenticateWebhook(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Handle GET requests (webhook validation/test)
  if (req.method === 'GET') {
    info('✅ GET request received - webhook validation successful');
    return res.status(200).json({
      success: true,
      message: 'Webhook endpoint is active and authenticated',
      timestamp: new Date().toISOString(),
    } as any);
  }

  // Handle POST requests (actual article processing)
  if (req.method !== 'POST') {
    warn(`Unsupported HTTP method: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed. Use GET for validation or POST for article publishing.' });
  }

  info('📥 Received Outrank webhook:', {
    timestamp: new Date().toISOString(),
    body_size: JSON.stringify(req.body).length,
  });

  // Hoist webhookEvent to outer scope for reuse in error handler
  let webhookEvent: z.infer<typeof OutrankWebhookEventSchema> | undefined;

  try {
    // Step 2: Validate webhook payload with Zod
    const validationResult = OutrankWebhookEventSchema.safeParse(req.body);

    if (!validationResult.success) {
      warn('Invalid webhook payload structure:', validationResult.error);
      return res.status(400).json({
        error: 'Invalid webhook payload',
      });
    }

    webhookEvent = validationResult.data;
    const articles = webhookEvent.data.articles;

    // Validate empty array - early return to avoid unnecessary processing
    if (articles.length === 0) {
      info('No articles to process, returning success');
      return res.status(200).json({
        success: true,
        processed: 0,
        failed: 0,
        skipped: 0,
        results: [],
        timestamp: new Date().toISOString(),
      });
    }

    info(`Processing ${articles.length} articles from webhook`);

    // Step 3: Connect to MongoDB
    const { db } = await connectToDatabase();
    const repository = getRatgeberRepository(db);

    // Step 4: Process all articles in parallel to avoid timeouts
    const results = await Promise.all(
      articles.map((article) => processArticle(repository, article, res))
    );

    // Step 5: Trigger ISR revalidation for list pages
    const failedListRevalidations = await revalidateListPages(res);

    // Step 6: Regenerate sitemap for SEO discovery (fire-and-forget, non-blocking)
    regenerateSitemap(); // Don't await - runs in background without blocking response

    // Step 7: Calculate statistics
    const successCount = results.filter((r) => r.status === 'success').length;
    const failedCount = results.filter((r) => r.status === 'failed').length;
    const skippedCount = results.filter((r) => r.status === 'skipped').length;

    info('✅ Webhook processing completed:', {
      total: articles.length,
      success: successCount,
      failed: failedCount,
      skipped: skippedCount,
    });

    // Step 7: Return response
    const response: WebhookResponse = {
      success: failedCount === 0,
      processed: successCount,
      failed: failedCount,
      skipped: skippedCount,
      results,
      timestamp: new Date().toISOString(),
      ...(failedListRevalidations.length > 0 && { failed_list_revalidations: failedListRevalidations }),
    };

    return res.status(200).json(response);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    const errorStack = err instanceof Error ? err.stack : undefined;

    logError('❌ Critical webhook processing error:', err);

    // Send to Dead Letter Queue (only if webhook was successfully parsed)
    if (webhookEvent) {
      try {
        await sendToDeadLetterQueue(webhookEvent, errorMessage, errorStack);
      } catch (dlqErr) {
        logError('Failed to send to Dead Letter Queue:', dlqErr);
      }
    }

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

// ============================================================================
// CONFIGURATION
// ============================================================================

// Increase body size limit for large article payloads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
