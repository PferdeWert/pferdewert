/**
 * Webhook Security Utilities
 *
 * Provides cryptographically secure token generation and validation
 * for webhook authentication.
 *
 * SECURITY CRITICAL:
 * - Uses constant-time comparison to prevent timing attacks
 * - Generates cryptographically random tokens
 * - Rate limiting configuration
 */

import crypto from 'crypto';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Rate limiting configuration for webhook endpoints
 */
export const WEBHOOK_RATE_LIMIT = {
  /** Maximum requests per time window */
  MAX_REQUESTS: 100,
  /** Time window in milliseconds (1 minute) */
  WINDOW_MS: 60 * 1000,
  /** Burst allowance (requests allowed immediately) */
  BURST_SIZE: 10,
} as const;

/**
 * Token generation configuration
 */
export const TOKEN_CONFIG = {
  /** Token length in bytes (64 bytes = 512 bits) */
  TOKEN_LENGTH: 64,
  /** Token encoding format */
  ENCODING: 'base64url' as const,
} as const;

// ============================================================================
// TOKEN GENERATION
// ============================================================================

/**
 * Generates a cryptographically secure random webhook secret token
 *
 * @returns Base64URL-encoded random token (512 bits)
 *
 * @example
 * ```typescript
 * const secret = generateWebhookSecret();
 * console.log(secret); // "xY9kL2mP4vR8wQ1zN6jH3bT5dC7fE0gA..."
 * ```
 */
export function generateWebhookSecret(): string {
  const buffer = crypto.randomBytes(TOKEN_CONFIG.TOKEN_LENGTH);
  return buffer.toString(TOKEN_CONFIG.ENCODING);
}

// ============================================================================
// CONSTANT-TIME COMPARISON
// ============================================================================

/**
 * Performs timing-safe string comparison to prevent timing attacks
 *
 * This function MUST be used for all authentication token comparisons
 * to prevent attackers from determining valid tokens through timing analysis.
 *
 * @param actual - The actual token/secret to compare
 * @param expected - The expected token/secret to compare against
 * @returns `true` if strings match, `false` otherwise
 *
 * @example
 * ```typescript
 * const isValid = secureCompare(
 *   req.headers.authorization,
 *   process.env.WEBHOOK_SECRET
 * );
 * ```
 *
 * @see https://en.wikipedia.org/wiki/Timing_attack
 */
export function secureCompare(actual: string, expected: string): boolean {
  if (typeof actual !== 'string' || typeof expected !== 'string') {
    return false;
  }

  // Convert strings to Buffers for constant-time comparison
  const actualBuffer = Buffer.from(actual, 'utf8');
  const expectedBuffer = Buffer.from(expected, 'utf8');

  // If lengths differ, create dummy buffers of equal length
  // to maintain constant execution time
  if (actualBuffer.length !== expectedBuffer.length) {
    // Still perform comparison to prevent timing leaks
    crypto.timingSafeEqual(
      crypto.createHash('sha256').update(actual).digest(),
      crypto.createHash('sha256').update(expected).digest()
    );
    return false;
  }

  // Use Node.js built-in constant-time comparison
  try {
    return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

// ============================================================================
// TOKEN VALIDATION
// ============================================================================

/**
 * Validates Bearer token format and extracts token value
 *
 * @param authHeader - Authorization header value (e.g., "Bearer <token>")
 * @returns Extracted token string or null if invalid format
 *
 * @example
 * ```typescript
 * const token = extractBearerToken('Bearer abc123xyz');
 * // Returns: 'abc123xyz'
 *
 * const invalid = extractBearerToken('Basic abc123');
 * // Returns: null
 * ```
 */
export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return null;
  }

  const [scheme, token] = parts;

  if (scheme !== 'Bearer' || !token) {
    return null;
  }

  return token;
}

/**
 * Validates webhook authentication token using constant-time comparison
 *
 * @param authHeader - Authorization header value
 * @param expectedSecret - Expected webhook secret from environment
 * @returns `true` if authentication is valid, `false` otherwise
 *
 * @example
 * ```typescript
 * const isAuthenticated = validateWebhookToken(
 *   req.headers.authorization,
 *   process.env.OUTRANK_WEBHOOK_SECRET
 * );
 * ```
 */
export function validateWebhookToken(
  authHeader: string | undefined,
  expectedSecret: string | undefined
): boolean {
  if (!expectedSecret) {
    return false;
  }

  const token = extractBearerToken(authHeader);

  if (!token) {
    return false;
  }

  return secureCompare(token, expectedSecret);
}

// ============================================================================
// SIGNATURE VERIFICATION (HMAC)
// ============================================================================

/**
 * Generates HMAC signature for webhook payload
 *
 * Use this to create signatures for outgoing webhooks or verify
 * incoming webhooks that use HMAC-based authentication.
 *
 * @param payload - JSON payload to sign
 * @param secret - Secret key for HMAC
 * @param algorithm - Hash algorithm (default: sha256)
 * @returns Hex-encoded HMAC signature
 *
 * @example
 * ```typescript
 * const signature = generateHmacSignature(
 *   JSON.stringify(payload),
 *   process.env.WEBHOOK_SECRET
 * );
 * ```
 */
export function generateHmacSignature(
  payload: string,
  secret: string,
  algorithm: 'sha256' | 'sha512' = 'sha256'
): string {
  return crypto.createHmac(algorithm, secret).update(payload).digest('hex');
}

/**
 * Verifies HMAC signature for webhook payload
 *
 * @param payload - JSON payload to verify
 * @param signature - Signature to verify against
 * @param secret - Secret key for HMAC
 * @param algorithm - Hash algorithm (default: sha256)
 * @returns `true` if signature is valid, `false` otherwise
 *
 * @example
 * ```typescript
 * const isValid = verifyHmacSignature(
 *   rawBody,
 *   req.headers['x-webhook-signature'],
 *   process.env.WEBHOOK_SECRET
 * );
 * ```
 */
export function verifyHmacSignature(
  payload: string,
  signature: string,
  secret: string,
  algorithm: 'sha256' | 'sha512' = 'sha256'
): boolean {
  const expectedSignature = generateHmacSignature(payload, secret, algorithm);
  return secureCompare(signature, expectedSignature);
}

// ============================================================================
// RATE LIMITING HELPERS
// ============================================================================

/**
 * Simple in-memory rate limiter for webhook endpoints
 *
 * NOTE: In production, use Redis-based rate limiting for multi-instance deployments
 */
export class WebhookRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private cleanup: NodeJS.Timeout | null = null;

  constructor() {
    // Periodically cleanup old entries to prevent memory leak
    this.cleanup = setInterval(() => {
      this.cleanupOldRequests();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  /**
   * Cleans up old request timestamps outside any time window
   */
  private cleanupOldRequests(): void {
    const now = Date.now();
    const maxWindowMs = WEBHOOK_RATE_LIMIT.WINDOW_MS;

    for (const [key, timestamps] of this.requests.entries()) {
      const recentRequests = timestamps.filter((ts) => ts > now - maxWindowMs);

      if (recentRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, recentRequests);
      }
    }
  }

  /**
   * Checks if request should be rate limited
   *
   * @param identifier - Unique identifier (e.g., IP address, API key)
   * @param maxRequests - Maximum requests allowed (default: WEBHOOK_RATE_LIMIT.MAX_REQUESTS)
   * @param windowMs - Time window in milliseconds (default: WEBHOOK_RATE_LIMIT.WINDOW_MS)
   * @returns `true` if request should be allowed, `false` if rate limited
   */
  check(
    identifier: string,
    maxRequests = WEBHOOK_RATE_LIMIT.MAX_REQUESTS,
    windowMs = WEBHOOK_RATE_LIMIT.WINDOW_MS
  ): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get existing requests for this identifier
    const timestamps = this.requests.get(identifier) || [];

    // Filter out requests outside the time window
    const recentRequests = timestamps.filter((ts) => ts > windowStart);

    // Check if rate limit exceeded
    if (recentRequests.length >= maxRequests) {
      return false;
    }

    // Add current request timestamp
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return true;
  }

  /**
   * Clears all rate limiting data for testing or manual reset
   */
  reset(): void {
    this.requests.clear();
  }

  /**
   * Cleanup resources (call on server shutdown)
   */
  destroy(): void {
    if (this.cleanup) {
      clearInterval(this.cleanup);
      this.cleanup = null;
    }
    this.requests.clear();
  }
}

/**
 * Extracts client IP address from request headers
 *
 * Handles X-Forwarded-For header (for proxied requests) and falls back to direct connection IP
 *
 * @param req - NextApiRequest object
 * @returns Client IP address
 */
export function getClientIp(req: { headers: Record<string, unknown>; socket?: { remoteAddress?: string } }): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp = typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : null;
  return clientIp || (req.headers['x-real-ip'] as string) || req.socket?.remoteAddress || 'unknown';
}
