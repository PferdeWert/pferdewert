// pages/api/webhook.ts - ENHANCED DEBUG VERSION
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { info, error } from "@/lib/log";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🚨 ALWAYS LOG - First thing that happens
  console.log("\n" + "=".repeat(80));
  console.log("[WEBHOOK] 🚀 === WEBHOOK HANDLER CALLED ===");
  console.log(`[WEBHOOK] ⏰ Timestamp: ${new Date().toISOString()}`);
  console.log(`[WEBHOOK] 🌐 Method: ${req.method}`);
  console.log(`[WEBHOOK] 📍 URL: ${req.url}`);
  console.log(`[WEBHOOK] 🎯 User-Agent: ${req.headers['user-agent']}`);
  console.log(`[WEBHOOK] 🔐 Stripe-Signature: ${req.headers['stripe-signature'] ? 'EXISTS' : 'MISSING'}`);
  console.log("=".repeat(80));

  if (req.method !== "POST") {
    console.log(`[WEBHOOK] ❌ Wrong method: ${req.method}`);
    res.status(405).end("Method Not Allowed");
    return;
  }

  // 1. BUFFER EXTRACTION
  console.log("[WEBHOOK] 📦 Extracting buffer...");
  let buf;
  try {
    buf = await buffer(req);
    console.log(`[WEBHOOK] ✅ Buffer extracted successfully, size: ${buf.length} bytes`);
  } catch (err) {
    console.log("[WEBHOOK] ❌ Buffer extraction failed:", err);
    res.status(400).end("Buffer Error");
    return;
  }

  // 2. SIGNATURE VERIFICATION
  console.log("[WEBHOOK] 🔒 Verifying signature...");
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    console.log("[WEBHOOK] ✅ Signature verification successful!");
    console.log(`[WEBHOOK] 📋 Event type: ${event.type}`);
    console.log(`[WEBHOOK] 📋 Event ID: ${event.id}`);
  } catch (err) {
    console.log("[WEBHOOK] ❌ Signature verification failed:");
    console.log("[WEBHOOK] Error details:", err);
    res.status(400).end("Signature Error");
    return;
  }

  // 3. EVENT TYPE CHECK
  if (event.type === "checkout.session.completed") {
    console.log("[WEBHOOK] 🎯 Processing checkout.session.completed");
    
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;
    
    console.log(`[WEBHOOK] 💳 Session ID: ${sessionId}`);
    console.log(`[WEBHOOK] 💰 Payment status: ${session.payment_status}`);
    console.log(`[WEBHOOK] 📋 Session metadata:`, session.metadata);

    try {
      // 4. DATABASE LOOKUP
      console.log("[WEBHOOK] 🔍 Looking up document in database...");
      const collection = await getCollection("bewertungen");
      const doc = await collection.findOne({ stripeSessionId: sessionId });

      if (!doc) {
        console.log("[WEBHOOK] ❌ No document found for session ID:", sessionId);
        console.log("[WEBHOOK] 🔍 Checking if any documents exist...");
        const allDocs = await collection.find({}).limit(5).toArray();
        console.log(`[WEBHOOK] 📊 Found ${allDocs.length} total documents in collection`);
        if (allDocs.length > 0) {
          console.log("[WEBHOOK] 📄 Sample stripeSessionIds:", allDocs.map(d => d.stripeSessionId));
        }
        res.status(404).end("No matching document");
        return;
      }

      console.log("[WEBHOOK] ✅ Document found!");
      console.log(`[WEBHOOK] 📄 Document ID: ${doc._id}`);
      console.log("[WEBHOOK] 📊 Document fields:", Object.keys(doc));
      console.log("[WEBHOOK] 📋 Document data:", JSON.stringify(doc, null, 2));

      // 5. PREPARE DATA FOR API - FIXED MAPPING
      console.log("[WEBHOOK] 🔄 Preparing data for external API...");
      
      // Map from your NEW field names to the API's expected field names
      const bewertbareDaten = {
        rasse: doc.rasse || "",
        abstammung: doc.abstammung || "",
        einsatzgebiet: doc.verwendungszweck || "",
        geburtsjahr: doc.alter || "",  // NEW: alter -> geburtsjahr
        stockmaß: doc.stockmass || "",  // NEW: stockmass -> stockmaß  
        farbe: doc.farbe || "",
        vater: "", // Not captured in your form
        mutter: "", // Not captured in your form
        preise: doc.erfolge || "",
        besonderheiten: [
          doc.aku || "",
          doc.ausbildung || "",
          doc.zuechter || "",
          doc.standort || ""
        ].filter(Boolean).join(", "), // Combine multiple fields
      };

      console.log("[WEBHOOK] 📤 Data to send to API:", JSON.stringify(bewertbareDaten, null, 2));

      // 6. EXTERNAL API CALL
      console.log("[WEBHOOK] 🌐 Calling external API...");
      console.log("[WEBHOOK] 🎯 API URL: https://pferdewert-api.onrender.com/api/bewertung");
      
      const startTime = Date.now();
      const response = await fetch("https://pferdewert-api.onrender.com/api/bewertung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bewertbareDaten),
      });
      const responseTime = Date.now() - startTime;

      console.log(`[WEBHOOK] ⏱️ API call took: ${responseTime}ms`);
      console.log(`[WEBHOOK] 📊 API response status: ${response.status}`);
      console.log(`[WEBHOOK] 📊 API response headers:`, Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.log("[WEBHOOK] ❌ API returned error:");
        console.log(`[WEBHOOK] Status: ${response.status} ${response.statusText}`);
        console.log(`[WEBHOOK] Error body: ${errorText}`);
        res.status(500).end(`GPT API Error: ${response.status}`);
        return;
      }

      // 7. PARSE API RESPONSE
      const responseText = await response.text();
      console.log(`[WEBHOOK] 📥 Raw API response (${responseText.length} chars):`, responseText.substring(0, 200) + "...");
      
      let gpt_response: any;
      try {
        gpt_response = JSON.parse(responseText);
        console.log("[WEBHOOK] ✅ API response parsed successfully");
        console.log("[WEBHOOK] 📊 Response keys:", Object.keys(gpt_response));
      } catch (jsonErr) {
        console.log("[WEBHOOK] ❌ Failed to parse API response as JSON:");
        console.log("[WEBHOOK] JSON Error:", jsonErr);
        console.log("[WEBHOOK] Raw response:", responseText);
        res.status(500).end("GPT API returned invalid JSON");
        return;
      }

     // 8. EXTRACT BEWERTUNG – robustere Variante
const raw_gpt = gpt_response?.raw_gpt || "[Fehler: Keine Bewertung erhalten]";
console.log(`[WEBHOOK] 📋 GPT-Resultat gesetzt (${raw_gpt.length} Zeichen)`);

// 9. UPDATE DATABASE – kein Abbruch mehr
const updateResult = await collection.updateOne(
  { _id: doc._id },
  { 
    $set: { 
      bewertung: raw_gpt, 
      status: "fertig", 
      aktualisiert: new Date() 
    } 
  }
);




      console.log("[WEBHOOK] 📊 Update result:", updateResult);
      console.log(`[WEBHOOK] ✅ Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`);

      if (updateResult.modifiedCount === 0) {
        console.log("[WEBHOOK] ⚠️ Warning: No documents were modified");
      }

      info("[WEBHOOK] ✅ Bewertung erfolgreich gespeichert.");
      console.log("[WEBHOOK] 🎉 === WEBHOOK SUCCESS ===");
      res.status(200).end("Done");
      return;

    } catch (err) {
      console.log("[WEBHOOK] 💥 === WEBHOOK ERROR ===");
      console.log("[WEBHOOK] ❌ Error details:", err);
      if (err instanceof Error) {
        console.log(`[WEBHOOK] Error name: ${err.name}`);
        console.log(`[WEBHOOK] Error message: ${err.message}`);
        console.log(`[WEBHOOK] Error stack: ${err.stack}`);
      }
      error("[WEBHOOK] ❌ Fehler bei Verarbeitung:", err);
      res.status(500).end("Webhook processing failed");
      return;
    }
  }

  // All other event types
  console.log(`[WEBHOOK] ℹ️ Ignoring event type: ${event.type}`);
  res.status(200).end("Event ignored");
}