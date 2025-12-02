/**
 * Webhook Testing Utilities
 *
 * Provides helper functions for testing webhook implementation,
 * rate limiting, and error handling
 */

import { WebhookRateLimiter, WEBHOOK_RATE_LIMIT, secureCompare } from '@/lib/webhook-security';

/**
 * Test Rate Limiter functionality
 *
 * Verifies that rate limiting works correctly for IPs
 */
export function testRateLimiter(): {
  passed: boolean;
  tests: Array<{ name: string; passed: boolean; message: string }>;
} {
  const limiter = new WebhookRateLimiter();
  const tests: Array<{ name: string; passed: boolean; message: string }> = [];

  // Test 1: Allow requests within limit
  const testIp = '192.168.1.1';
  let passedCount = 0;
  for (let i = 0; i < WEBHOOK_RATE_LIMIT.MAX_REQUESTS; i++) {
    if (limiter.check(testIp)) {
      passedCount++;
    }
  }

  tests.push({
    name: 'Allow requests within limit',
    passed: passedCount === WEBHOOK_RATE_LIMIT.MAX_REQUESTS,
    message: `Allowed ${passedCount}/${WEBHOOK_RATE_LIMIT.MAX_REQUESTS} requests`,
  });

  // Test 2: Reject requests exceeding limit
  const blockedRequest = limiter.check(testIp);
  tests.push({
    name: 'Block requests exceeding limit',
    passed: blockedRequest === false,
    message: blockedRequest ? 'FAILED: Should have blocked request' : 'Correctly blocked excess request',
  });

  // Test 3: Reset allows new requests
  limiter.reset();
  const afterReset = limiter.check(testIp);
  tests.push({
    name: 'Reset clears rate limit state',
    passed: afterReset === true,
    message: afterReset ? 'Reset successful' : 'FAILED: Reset did not clear state',
  });

  limiter.destroy();

  const allPassed = tests.every((t) => t.passed);

  return {
    passed: allPassed,
    tests,
  };
}

/**
 * Generate test webhook payload for manual testing
 *
 * Use this to create realistic webhook payloads for testing
 */
export function generateTestWebhookPayload(articleCount = 1) {
  return {
    event_type: 'publish_articles',
    timestamp: new Date().toISOString(),
    data: {
      articles: Array.from({ length: articleCount }, (_, i) => ({
        id: `test_article_${i + 1}`,
        title: `Test Article ${i + 1}: Pferdekauf Guide`,
        content_markdown: `# Test Article ${i + 1}\n\nThis is a test article content for testing webhook processing.\n\n${'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(5)}`,
        content_html: `<h1>Test Article ${i + 1}</h1><p>This is a test article content for testing webhook processing.</p><p>${'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(5)}</p>`,
        meta_description: `Test article ${i + 1} for webhook testing with proper metadata`,
        created_at: new Date().toISOString(),
        image_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80',
        slug: `test-article-${i + 1}-${Date.now()}`,
        tags: ['test', 'webhook', 'pferdekauf'],
      })),
    },
  };
}

/**
 * Test webhook authentication
 *
 * Verifies that constant-time comparison works correctly
 */
export function testWebhookAuth(): {
  passed: boolean;
  tests: Array<{ name: string; passed: boolean; message: string }>;
} {
  const tests: Array<{ name: string; passed: boolean; message: string }> = [];

  // Test 1: Matching tokens should return true
  const matching = secureCompare('test_token_123', 'test_token_123');
  tests.push({
    name: 'Matching tokens accepted',
    passed: matching === true,
    message: matching ? 'Correctly matched tokens' : 'FAILED: Should have matched',
  });

  // Test 2: Non-matching tokens should return false
  const nonMatching = secureCompare('test_token_123', 'test_token_456');
  tests.push({
    name: 'Non-matching tokens rejected',
    passed: nonMatching === false,
    message: nonMatching ? 'FAILED: Should have rejected' : 'Correctly rejected non-matching tokens',
  });

  // Test 3: Different length tokens should return false
  const differentLength = secureCompare('short', 'much_longer_token');
  tests.push({
    name: 'Different length tokens rejected',
    passed: differentLength === false,
    message: differentLength ? 'FAILED: Should have rejected' : 'Correctly rejected different lengths',
  });

  // Test 4: Empty strings should return false
  const emptyStrings = secureCompare('', '');
  tests.push({
    name: 'Empty strings handled correctly',
    passed: emptyStrings === true,
    message: emptyStrings ? 'Empty strings matched (expected)' : 'Empty strings not matched',
  });

  const allPassed = tests.every((t) => t.passed);

  return {
    passed: allPassed,
    tests,
  };
}

/**
 * Example curl command for manual webhook testing
 */
export function getCurlTestCommand(webhookUrl: string, secret: string, articleCount = 1): string {
  const payload = generateTestWebhookPayload(articleCount);

  return `curl -X POST \\
  "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${secret}" \\
  -d '${JSON.stringify(payload, null, 2)}'`;
}

/**
 * Comprehensive test suite runner
 */
export async function runAllWebhookTests(): Promise<{
  overallPassed: boolean;
  suites: Array<{ name: string; passed: boolean; tests: Array<{ name: string; passed: boolean; message: string }> }>;
}> {
  const suites = [
    {
      name: 'Rate Limiter Tests',
      ...testRateLimiter(),
    },
    {
      name: 'Webhook Auth Tests',
      ...testWebhookAuth(),
    },
  ];

  const overallPassed = suites.every((suite) => suite.passed);

  return {
    overallPassed,
    suites,
  };
}
