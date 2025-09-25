// pages/api/webhook.ts
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { Resend } from 'resend';
import { info, error, warn } from "@/lib/log";

export const config = {
  api: { bodyParser: false },
};

// Backend data structure matches deployed backend schema (haupteignung required)
interface BackendRequestData {
  rasse: string;
  alter: number;
  geschlecht: string;
  abstammung?: string;
  stockmass: number;
  ausbildung: string;
  haupteignung: string; // Required field in deployed backend
  aku?: string;
  erfolge?: string;
  farbe?: string;
  zuechter?: string;
  standort?: string;
  verwendungszweck?: string;
}

interface BackendResponse {
  raw_gpt?: string;
  ai_model?: string;
  ai_model_version?: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Resend sicher initialisieren
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const BACKEND_URL = process.env.BACKEND_URL || 'https://pferdewert-api.onrender.com';

// Database-based atomic idempotency to prevent duplicate webhook processing
const checkAndMarkWebhookProcessed = async (sessionId: string): Promise<boolean> => {
  try {
    const webhooksCollection = await getCollection("webhook_processing");

    // Atomic operation: insert only if doesn't exist
    const result = await webhooksCollection.findOneAndUpdate(
      { sessionId: sessionId },
      {
        $setOnInsert: {
          sessionId: sessionId,
          processedAt: new Date(),
          status: "processing"
        }
      },
      {
        upsert: true,
        returnDocument: "before" // Returns null if inserted (new), document if already existed
      }
    );

    // If result is null, this is the first time processing this session
    // If result exists, it was already processed
    return result === null;
  } catch (err) {
    error('[WEBHOOK] Database idempotency check failed:', err instanceof Error ? err.message : String(err));
    // Fallback to allow processing on database errors
    return true;
  }
};

// Utility function to safely convert stockmass to centimeters with robust heuristics
const convertStockmassToNumber = (stockmass: unknown): number => {
  if (stockmass === null || stockmass === undefined || stockmass === '') {
    warn('[WEBHOOK] Stockmass is empty or null, defaulting to 0');
    return 0;
  }

  const raw = String(stockmass).trim().toLowerCase();
  const numValue = parseFloat(raw.replace(/cm|m/g, '').trim());
  if (isNaN(numValue)) {
    warn('[WEBHOOK] Invalid stockmass value, defaulting to 0:', raw);
    return 0;
  }

  // If explicit unit "m" (and not "cm") is present, treat as meters
  const hasMetersUnit = /(^|\s|\b)m(\b|\s|$)/.test(raw) && !/cm/.test(raw);

  // Heuristics:
  // - 1.0–2.5 => meters (e.g., 1.65) → cm
  // - 50–250 => centimeters already (e.g., 165)
  // - 1000–3000 => likely millimeters (e.g., 1650) → divide by 10
  // - 3000–30000 => likely mistaken scaling (e.g., 16500) → divide by 100
  // Fallback → 0 with warning
  if (hasMetersUnit || (numValue >= 1.0 && numValue <= 2.5)) {
    return Math.round(numValue * 100);
  }
  if (numValue >= 50 && numValue <= 250) {
    return Math.round(numValue);
  }
  if (numValue >= 1000 && numValue <= 3000) {
    const cm = Math.round(numValue / 10);
    if (cm >= 50 && cm <= 250) return cm;
  }
  if (numValue >= 3000 && numValue <= 30000) {
    const cm = Math.round(numValue / 100);
    if (cm >= 50 && cm <= 250) return cm;
  }

  warn('[WEBHOOK] Stockmass value out of expected range, using 0:', numValue);
  return 0;
};



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  info('[WEBHOOK] Webhook request received');
  info('[WEBHOOK] Method:', req.method);
  info('[WEBHOOK] URL:', req.url);
  
  // Log headers without sensitive data
  const safeHeaders = {
    'content-type': req.headers['content-type'],
    'user-agent': req.headers['user-agent'],
    'stripe-signature': req.headers['stripe-signature'] ? 'present' : 'missing'
  };
  info('[WEBHOOK] Safe headers:', safeHeaders);

  if (req.method !== "POST") {
    warn('[WEBHOOK] Invalid method:', req.method);
    return res.status(405).end("Method Not Allowed");
  }

  info('[WEBHOOK] Webhook secret status:', endpointSecret ? 'configured' : 'missing');

  const buf = await buffer(req);
  info('[WEBHOOK] Buffer size:', buf.length, 'bytes');
  
  const sig = req.headers["stripe-signature"] as string;
  info('[WEBHOOK] Stripe signature status:', sig ? 'present' : 'missing');

  let event: Stripe.Event;

  try {
    info('[WEBHOOK] Constructing event from webhook payload');
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    info('[WEBHOOK] Event constructed successfully, type:', event.type);
  } catch (err) {
    error('[WEBHOOK] Signature verification failed');
    error('[WEBHOOK] Error details:', {
      message: err instanceof Error ? err.message : String(err),
      hasSignature: !!sig,
      bufferLength: buf.length,
      hasEndpointSecret: !!endpointSecret
    });
    return res.status(400).send("Webhook Error");
  }

  info('[WEBHOOK] Processing event type:', event.type);
  info('[WEBHOOK] Event ID:', event.id);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;

    info('[WEBHOOK] Payment completed successfully');
    info('[WEBHOOK] Session ID:', sessionId);

    // Atomic check and mark as processing to prevent duplicates
    const isFirstTime = await checkAndMarkWebhookProcessed(sessionId);
    if (!isFirstTime) {
      warn('[WEBHOOK] Session already processed, skipping duplicate webhook:', sessionId);
      return res.status(200).json({ message: "Session already processed" });
    }

    info('[WEBHOOK] Processing session for first time:', sessionId);
    
    // Log session metadata without sensitive customer data
    const safeMetadata = session.metadata ? {
      hasMetadata: true,
      metadataKeys: Object.keys(session.metadata)
    } : { hasMetadata: false };
    info('[WEBHOOK] Session metadata info:', safeMetadata);

    try {
      info('[WEBHOOK] Searching for MongoDB document');
      const collection = await getCollection("bewertungen");
      const doc = await collection.findOne({ stripeSessionId: sessionId });

      if (!doc) {
        error('[WEBHOOK] No evaluation found for session ID:', sessionId);
        return res.status(404).end();
      }

      info('[WEBHOOK] MongoDB document found');
      info('[WEBHOOK] Document ID:', doc._id.toString());

      // Extract data with type safety
      const {
        rasse,
        alter,
        geschlecht,
        abstammung,
        stockmass,
        ausbildung,
        aku,
        erfolge,
        farbe,
        zuechter,
        standort,
        verwendungszweck,
        attribution_source,
      } = doc;

      // Prepare data with proper validation matching deployed backend schema
      const bewertbareDaten: BackendRequestData = {
        rasse: String(rasse || ''),
        alter: parseInt(String(alter)) || 0,
        geschlecht: String(geschlecht || ''),
        abstammung: abstammung ? String(abstammung) : undefined,
        stockmass: convertStockmassToNumber(stockmass),
        ausbildung: String(ausbildung || ''),
        haupteignung: String(verwendungszweck || ausbildung || 'Sport'), // Map verwendungszweck to required haupteignung
        aku: aku ? String(aku) : undefined,
        erfolge: erfolge ? String(erfolge) : undefined,
        farbe: farbe ? String(farbe) : undefined,
        zuechter: zuechter ? String(zuechter) : undefined,
        standort: standort ? String(standort) : undefined,
        verwendungszweck: verwendungszweck ? String(verwendungszweck) : undefined,
      };

      info('[WEBHOOK] Data prepared for backend API');

      // Health check first
      info('[WEBHOOK] Checking backend availability');
      try {
        const healthResponse = await fetch(`${BACKEND_URL}/health`, { 
          method: "GET"
        });
        if (!healthResponse.ok) {
          warn('[WEBHOOK] Backend health check failed, continuing anyway');
        } else {
          const healthData = await healthResponse.json();
          info('[WEBHOOK] Backend health check passed:', { status: healthData?.status });
        }
      } catch (healthErr) {
        warn('[WEBHOOK] Backend health check error:', healthErr instanceof Error ? healthErr.message : String(healthErr));
        // Continue anyway, might be a network issue
      }

      info('[WEBHOOK] Calling backend API for evaluation');
      const response = await fetch(`${BACKEND_URL}/api/bewertung`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bewertbareDaten),
      });

      info('[WEBHOOK] Backend API response status:', response.status);

      if (!response.ok) {
        error('[WEBHOOK] Backend API error:', {
          status: response.status,
          statusText: response.statusText
        });
        
        const errorText = await response.text();
        error('[WEBHOOK] Backend error details:', errorText);
        
        // Log specific error types
        if (response.status === 0 || response.status === 403 || response.status === 405) {
          error('[WEBHOOK] Possible CORS issue - check backend allowed origins');
        }
        
        // Return 200 to prevent Stripe retries
        return res.status(200).json({ 
          error: "Backend temporarily unavailable", 
          status: response.status
        });
      }

      let gptResponse: BackendResponse;
      try {
        gptResponse = await response.json();
        info('[WEBHOOK] AI evaluation received:', gptResponse?.raw_gpt ? 'Success' : 'Missing response');
      } catch (jsonError) {
        error('[WEBHOOK] JSON parse error:', jsonError instanceof Error ? jsonError.message : String(jsonError));
        return res.status(200).json({ error: "Invalid JSON response from backend" });
      }

      const rawGpt = gptResponse?.raw_gpt;
      const aiModel = gptResponse?.ai_model;
      const aiModelVersion = gptResponse?.ai_model_version;

      if (!rawGpt) {
        error('[WEBHOOK] No AI response in backend response');
        error('[WEBHOOK] Expected raw_gpt field, got keys:', Object.keys(gptResponse));
        return res.status(200).json({
          error: "No AI response received",
          received: Object.keys(gptResponse)
        });
      }

      info('[WEBHOOK] Saving evaluation to MongoDB');
      info(`[WEBHOOK] AI Model used: ${aiModel} (${aiModelVersion})`);

      const updateResult = await collection.updateOne(
        { _id: doc._id },
        {
          $set: {
            bewertung: rawGpt,
            status: "fertig",
            aktualisiert: new Date(),
            // AI model tracking fields
            ...(aiModel && { ai_model: aiModel }),
            ...(aiModelVersion && { ai_model_version: aiModelVersion }),
            // Store attribution_source for analytics (not sent to AI)
            ...(attribution_source && { attribution_source: String(attribution_source) })
          }
        }
      );

      info('[WEBHOOK] MongoDB update completed:', { 
        acknowledged: updateResult.acknowledged,
        modifiedCount: updateResult.modifiedCount 
      });
      // Email notification section
      info('[WEBHOOK] Starting email notification process');
      
      const recipientEmails = (process.env.RESEND_TO_EMAIL ?? "")
        .split(",")
        .map(email => email.trim())
        .filter(email => !!email);
      
      info('[WEBHOOK] Email recipients configured:', recipientEmails.length > 0);

      try {
        if (recipientEmails.length === 0) {
          warn('[WEBHOOK] No email recipients configured');
          // Continue processing, don't fail webhook
        } else if (!resend) {
          error('[WEBHOOK] Resend not initialized - missing API key');
          // Continue processing, don't fail webhook
        } else {
          const amount = session.amount_total
            ? `${(session.amount_total / 100).toFixed(2)} €`
            : "unbekannt";

          // Create formatted HTML for form fields (without sensitive data in logs)
          const formularFelderHtml = `
            <h3>📋 Eingabedaten des Kunden:</h3>

            <p><strong>Rasse (Pflicht):</strong> ${rasse || 'nicht angegeben'}</p>
            <p><strong>Alter (Pflicht):</strong> ${alter ? `${alter} Jahre` : 'nicht angegeben'}</p>
            <p><strong>Geschlecht (Pflicht):</strong> ${geschlecht || 'nicht angegeben'}</p>
            <p><strong>Stockmaß (Pflicht):</strong> ${stockmass ? `${stockmass} cm` : 'nicht angegeben'}</p>
            <p><strong>Abstammung (Pflicht):</strong> ${abstammung || 'nicht angegeben'}</p>
            <p><strong>Ausbildungsstand (Pflicht):</strong> ${ausbildung || 'nicht angegeben'}</p>
            <p><strong>Haupteignung (Pflicht):</strong> ${doc.haupteignung || 'nicht angegeben'}</p>

            <hr style="margin: 20px 0; border: 1px solid #eee;">

            <p><strong>Gesundheitsstatus/AKU (Optional):</strong> ${aku || 'nicht angegeben'}</p>
            <p><strong>Erfolge (Optional):</strong> ${erfolge || 'nicht angegeben'}</p>
            <p><strong>Standort (Optional):</strong> ${standort || 'nicht angegeben'}</p>
            <p><strong>Charakter (Optional):</strong> ${doc.charakter || 'nicht angegeben'}</p>
            <p><strong>Besonderheiten (Optional):</strong> ${doc.besonderheiten || 'nicht angegeben'}</p>

            <hr style="margin: 20px 0; border: 1px solid #eee;">

            <p><strong>📊 Marketing Quelle (Optional):</strong> ${attribution_source || 'nicht angegeben'}</p>
          `;

          // Send admin notification email
          await resend.emails.send({
            from: "PferdeWert <kauf@pferdewert.de>",
            to: recipientEmails,
            subject: `💰 Neuer Kauf auf PferdeWert.de`,
            html: `
              <h2>🐴 Neue Zahlung bei PferdeWert.de!</h2>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3>💳 Zahlungsdetails:</h3>
                <p><strong>Session ID:</strong> ${sessionId}</p>
                <p><strong>Betrag:</strong> ${amount}</p>
                <p><strong>Kunde:</strong> ${session.customer_details?.email || "unbekannt"}</p>
              </div>
              
              <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
                ${formularFelderHtml}
              </div>
              
              <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3>🤖 KI-Bewertung:</h3>
                <div style="white-space: pre-wrap; font-family: monospace; background: white; padding: 10px; border-radius: 4px;">
                  ${rawGpt}
                </div>
              </div>
              
              <hr style="margin: 30px 0;">
              <p style="color: #666; font-size: 12px;">
                Diese E-Mail wurde automatisch von PferdeWert.de generiert.
              </p>
            `,
          });

          info('[WEBHOOK] Admin notification email sent successfully');
        }
      } catch (err) {
        error('[WEBHOOK] Error sending admin notification email:', err instanceof Error ? err.message : String(err));
      }

      // Send customer email
      const customerEmail = session.customer_details?.email;

      if (customerEmail && resend) {
        try {
          const directLink = `https://pferdewert.de/ergebnis?id=${doc._id.toString()}`;
          await resend.emails.send({
            from: "PferdeWert <info@pferdewert.de>",
            to: customerEmail,
            subject: "🐴 Deine Pferdebewertung ist fertig!",
            html: `
              <h2>Hallo!</h2>
              <p>Deine Pferdebewertung ist jetzt verfügbar:</p>
                  <br> 
              <p><strong><a href="${directLink}" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                 🐴 Zur Bewertung & PDF-Download
              </a></strong></p>
                  <br>
              <p><small>Falls der Button nicht funktioniert:<br>
              ${directLink}</small></p>
              
              <p>Viele Grüße,<br>Dein PferdeWert-Team</p>
            `
          });
          info('[WEBHOOK] Customer email sent successfully');
        } catch (err) {
          error('[WEBHOOK] Error sending customer email:', err instanceof Error ? err.message : String(err));
        }
      } else {
        if (!customerEmail) {
          warn('[WEBHOOK] No customer email available');
        }
        if (!resend) {
          warn('[WEBHOOK] Resend not available for customer email');
        }
      }

      // Mark webhook as completed successfully
      try {
        const webhooksCollection = await getCollection("webhook_processing");
        await webhooksCollection.updateOne(
          { sessionId: sessionId },
          {
            $set: {
              status: "completed",
              completedAt: new Date()
            }
          }
        );
        info('[WEBHOOK] Marked session as completed:', sessionId);
      } catch (updateErr) {
        warn('[WEBHOOK] Failed to mark as completed:', updateErr instanceof Error ? updateErr.message : String(updateErr));
      }

      return res.status(200).end("Done");
    } catch (err) {
      error('[WEBHOOK] Error processing evaluation:', {
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
        sessionId: sessionId
      });

      // Mark webhook as failed for debugging
      try {
        const webhooksCollection = await getCollection("webhook_processing");
        await webhooksCollection.updateOne(
          { sessionId: sessionId },
          {
            $set: {
              status: "failed",
              failedAt: new Date(),
              error: err instanceof Error ? err.message : String(err)
            }
          }
        );
      } catch (updateErr) {
        warn('[WEBHOOK] Failed to mark as failed:', updateErr instanceof Error ? updateErr.message : String(updateErr));
      }

      // IMPORTANT: Always return 200 to prevent Stripe retries
      // Error is logged but we prevent webhook retry loops
      return res.status(200).json({
        success: false,
        error: "Webhook processing failed but acknowledged",
        details: err instanceof Error ? err.message : "Unknown error"
      });
    }
  } else {
    info('[WEBHOOK] Event ignored:', event.type);
  }

  res.status(200).end("Event ignored");
}
