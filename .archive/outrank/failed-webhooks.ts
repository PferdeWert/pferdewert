/**
 * Admin Endpoint: Failed Webhooks Management
 *
 * Provides admin access to failed webhook queue for review and manual retry
 *
 * SECURITY: Requires admin authentication (implement your auth check)
 * Methods:
 * - GET: List failed webhooks with filtering
 * - POST: Retry specific failed webhook
 * - DELETE: Mark as reviewed (remove from manual review flag)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongo/client';
import { info, error as logError, warn } from '@/lib/log';
import type { FailedWebhookEntry } from '@/lib/webhook-utils';

// TODO: Implement your admin authentication
function requireAdmin(req: NextApiRequest): boolean {
  // Example: Check for admin API key
  const adminKey = process.env.ADMIN_API_KEY;
  const authHeader = req.headers.authorization;

  if (!adminKey || !authHeader) {
    return false;
  }

  return authHeader === `Bearer ${adminKey}`;
}

interface FailedWebhookQuery {
  limit?: number;
  offset?: number;
  requiresManualReview?: boolean;
  eventType?: string;
  sortBy?: 'timestamp' | 'retryCount';
  sortOrder?: 'asc' | 'desc';
}

interface WebhookRetryResponse {
  success: boolean;
  message: string;
  retryId?: string;
  timestamp: string;
}

interface FailedWebhooksListResponse {
  success: boolean;
  total: number;
  returned: number;
  webhooks: Array<Record<string, unknown>>;
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | FailedWebhooksListResponse
    | WebhookRetryResponse
    | { error: string }
  >
) {
  // Security: Require admin authentication
  if (!requireAdmin(req)) {
    return res.status(401).json({
      error: 'Unauthorized - Admin API key required',
    });
  }

  // GET: List failed webhooks
  if (req.method === 'GET') {
    return handleGetFailedWebhooks(req, res);
  }

  // POST: Retry failed webhook
  if (req.method === 'POST') {
    return handleRetryWebhook(req, res);
  }

  // DELETE: Mark as reviewed
  if (req.method === 'DELETE') {
    return handleMarkAsReviewed(req, res);
  }

  return res.status(405).json({
    error: 'Method not allowed',
  });
}

/**
 * GET handler: List failed webhooks with optional filtering
 *
 * Query parameters:
 * - limit: Max results (default: 10, max: 100)
 * - offset: Skip N results (default: 0)
 * - requiresManualReview: Filter by manual review flag (default: true)
 * - eventType: Filter by event type (e.g., 'publish_articles')
 * - sortBy: 'timestamp' or 'retryCount' (default: timestamp)
 * - sortOrder: 'asc' or 'desc' (default: desc)
 */
async function handleGetFailedWebhooks(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const query = req.query as FailedWebhookQuery;
    const limit = Math.min(parseInt(String(query.limit || '10')), 100);
    const offset = parseInt(String(query.offset || '0'));
    const sortBy = query.sortBy || 'timestamp';
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

    const { db } = await connectToDatabase();
    const collection = db.collection('failed_webhooks');

    // Build filter
    const filter: Record<string, boolean | string> = {};

    if (query.requiresManualReview !== undefined) {
      const manualReviewValue = String(query.requiresManualReview);
      filter.requiresManualReview = manualReviewValue === 'true';
    } else {
      // Default: show items needing manual review
      filter.requiresManualReview = true;
    }

    if (query.eventType) {
      filter.eventType = query.eventType;
    }

    // Execute query
    const total = await collection.countDocuments(filter);

    const webhooks = await collection
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(offset)
      .limit(limit)
      .toArray();

    info(`Admin: Retrieved ${webhooks.length} failed webhooks`, {
      total,
      offset,
      limit,
      filter,
    });

    return res.status(200).json({
      success: true,
      total,
      returned: webhooks.length,
      webhooks: webhooks.map((w) => ({
        ...w,
        // Truncate large fields for readability
        payload: undefined, // Exclude full payload in list view
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    logError('Failed to retrieve failed webhooks:', err);
    return res.status(500).json({
      error: 'Failed to retrieve failed webhooks',
    });
  }
}

/**
 * POST handler: Retry a failed webhook
 *
 * Body:
 * {
 *   webhookId: string
 * }
 */
async function handleRetryWebhook(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { webhookId } = req.body;

    if (!webhookId || typeof webhookId !== 'string') {
      return res.status(400).json({
        error: 'webhookId is required',
      });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection<FailedWebhookEntry & { _id: string }>(
      'failed_webhooks'
    );

    // Find the webhook
    const webhook = await collection.findOne({ _id: webhookId } as Parameters<
      typeof collection.findOne
    >[0]);

    if (!webhook) {
      return res.status(404).json({
        error: `Webhook not found: ${webhookId}`,
      });
    }

    // TODO: Implement actual retry logic
    // This would involve:
    // 1. Re-validating the payload
    // 2. Attempting to process articles again
    // 3. Updating the webhook record with new retry count
    // 4. Moving to succeeded collection if successful

    // For now, just log the retry intent
    const retryId = `retry_${webhookId}_${Date.now()}`;

    warn(`Admin retry requested for webhook: ${webhookId}`, {
      errorMessage: webhook.errorMessage,
      retryCount: webhook.retryCount,
      retryId,
    });

    // Update retry count
    await collection.updateOne(
      { _id: webhookId } as Parameters<typeof collection.updateOne>[0],
      {
        $inc: { retryCount: 1 },
        $set: { lastRetryAt: new Date().toISOString() },
      }
    );

    info(`Webhook marked for retry: ${retryId}`);

    return res.status(200).json({
      success: true,
      message: `Webhook queued for retry. Retry ID: ${retryId}`,
      retryId,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    logError('Failed to retry webhook:', err);
    return res.status(500).json({
      error: 'Failed to retry webhook',
    });
  }
}

/**
 * DELETE handler: Mark webhook as reviewed
 *
 * Query parameters:
 * - id: Webhook ID to mark as reviewed
 */
async function handleMarkAsReviewed(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        error: 'id query parameter is required',
      });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection<FailedWebhookEntry & { _id: string }>(
      'failed_webhooks'
    );

    // Update webhook
    const result = await collection.updateOne(
      { _id: id } as Parameters<typeof collection.updateOne>[0],
      {
        $set: { requiresManualReview: false },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: `Webhook not found: ${id}`,
      });
    }

    info(`Webhook marked as reviewed: ${id}`);

    return res.status(200).json({
      success: true,
      message: `Webhook ${id} marked as reviewed`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    logError('Failed to mark webhook as reviewed:', err);
    return res.status(500).json({
      error: 'Failed to mark webhook as reviewed',
    });
  }
}
