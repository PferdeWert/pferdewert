#!/usr/bin/env node

/**
 * SEO Article Notification Script
 * Sendet eine E-Mail-Benachrichtigung wenn ein neuer SEO-Artikel online gestellt wurde.
 *
 * Usage:
 *   node scripts/seo-article-notification.mjs "artikel-slug"
 *   node scripts/seo-article-notification.mjs "pferd-kaufen-bayern"
 *
 * Environment variables required:
 *   RESEND_API_KEY - Resend API Key
 *
 * Recipient: benni_reder@gmx.de (hardcoded for SEO automation)
 */

import { Resend } from 'resend';

// Configuration
const RECIPIENT_EMAILS = ['benni_reder@gmx.de', 'sabine-reder@gmx.net'];
const BASE_URL = 'https://pferdewert.de';
const RATGEBER_PATH = '/pferde-ratgeber';

// Resend initialization (same pattern as webhook.ts)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

async function sendArticleNotification(articleSlug, additionalInfo = {}) {
  if (!resend) {
    console.error('[SEO-NOTIFICATION] RESEND_API_KEY nicht konfiguriert!');
    process.exit(1);
  }

  if (!articleSlug) {
    console.error('[SEO-NOTIFICATION] Artikel-Slug fehlt!');
    console.log('Usage: node scripts/seo-article-notification.mjs "artikel-slug"');
    process.exit(1);
  }

  const articleUrl = `${BASE_URL}${RATGEBER_PATH}/${articleSlug}`;
  const timestamp = new Date().toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'full',
    timeStyle: 'short'
  });

  console.log('[SEO-NOTIFICATION] Sende Benachrichtigung...');
  console.log(`[SEO-NOTIFICATION] Artikel: ${articleSlug}`);
  console.log(`[SEO-NOTIFICATION] URL: ${articleUrl}`);

  try {
    const result = await resend.emails.send({
      from: 'PferdeWert SEO <seo@pferdewert.de>',
      to: RECIPIENT_EMAILS,
      subject: `Neuer SEO-Artikel live: ${articleSlug}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #92400e;">Neuer Ratgeber-Artikel online!</h2>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Artikel-Slug:</strong> ${articleSlug}</p>
            <p style="margin: 0 0 15px 0;"><strong>Veröffentlicht:</strong> ${timestamp}</p>

            <a href="${articleUrl}"
               style="display: inline-block; background: #92400e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Artikel ansehen
            </a>
          </div>

          <p style="margin: 20px 0;">
            <strong>Direkt-Link:</strong><br>
            <a href="${articleUrl}" style="color: #92400e;">${articleUrl}</a>
          </p>

          ${additionalInfo.keyword ? `
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #666;">SEO-Details:</h3>
            <p style="margin: 5px 0;"><strong>Target-Keyword:</strong> ${additionalInfo.keyword}</p>
            ${additionalInfo.wordCount ? `<p style="margin: 5px 0;"><strong>Wortanzahl:</strong> ${additionalInfo.wordCount}</p>` : ''}
            ${additionalInfo.source ? `<p style="margin: 5px 0;"><strong>Quelle:</strong> ${additionalInfo.source}</p>` : ''}
          </div>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="color: #9ca3af; font-size: 12px;">
            Diese E-Mail wurde automatisch vom PferdeWert SEO-Automation-System gesendet.<br>
            Server: Hetzner
          </p>
        </div>
      `
    });

    console.log('[SEO-NOTIFICATION] E-Mail erfolgreich gesendet!');
    console.log(`[SEO-NOTIFICATION] Message ID: ${result.data?.id || 'unknown'}`);
    return { success: true, messageId: result.data?.id };

  } catch (error) {
    console.error('[SEO-NOTIFICATION] Fehler beim Senden:', error.message);
    return { success: false, error: error.message };
  }
}

// CLI execution
const articleSlug = process.argv[2];
const keyword = process.argv[3]; // Optional: Target keyword
const wordCount = process.argv[4]; // Optional: Word count

if (articleSlug) {
  sendArticleNotification(articleSlug, {
    keyword,
    wordCount,
    source: 'Hetzner SEO Automation'
  }).then(result => {
    if (!result.success) {
      process.exit(1);
    }
  }).catch(err => {
    console.error('[SEO-NOTIFICATION] Unerwarteter Fehler:', err);
    process.exit(1);
  });
} else {
  console.log('SEO Article Notification Script');
  console.log('================================');
  console.log('');
  console.log('Usage:');
  console.log('  node scripts/seo-article-notification.mjs <artikel-slug> [keyword] [word-count]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/seo-article-notification.mjs "pferd-kaufen-bayern"');
  console.log('  node scripts/seo-article-notification.mjs "warmblut-kaufen" "warmblut kaufen" "1850"');
  console.log('');
  console.log('Environment:');
  console.log(`  RESEND_API_KEY: ${process.env.RESEND_API_KEY ? 'configured' : 'NOT SET'}`);
}

// Export for use as module
export { sendArticleNotification };
