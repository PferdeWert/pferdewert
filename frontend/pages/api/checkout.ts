// frontend/pages/api/checkout.ts - DEBUG VERSION
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { log, info, warn, error } from "@/lib/log";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const BewertungSchema = z.object({
  rasse: z.string(),
  alter: z.number(),
  geschlecht: z.string(),
  abstammung: z.string(),
  stockmass: z.number(),
  ausbildung: z.string(),
  aku: z.string().optional(),
  erfolge: z.string().optional(),
  farbe: z.string().optional(),
  zuechter: z.string().optional(),
  standort: z.string().optional(),
  verwendungszweck: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("[CHECKOUT] 🚀 === CHECKOUT DEBUG START ===");
  
  if (req.method !== "POST") {
    warn("[CHECKOUT] ❌ Ungültige Methode:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. REQUEST BODY LOGGING
    console.log("[CHECKOUT] 📥 Request Body:", JSON.stringify(req.body, null, 2));
    
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      console.log("[CHECKOUT] ❌ Missing/Invalid text:", { text, type: typeof text });
      warn("[CHECKOUT] ⚠️ Kein valider Text übergeben");
      return res.status(400).json({ error: "Missing input data" });
    }

    console.log("[CHECKOUT] 📝 Raw text received:", text);

    // 2. JSON PARSING DEBUG
    let parsedData;
    try {
      parsedData = JSON.parse(text);
      console.log("[CHECKOUT] ✅ JSON parsed successfully");
      console.log("[CHECKOUT] 📊 Parsed data:", JSON.stringify(parsedData, null, 2));
    } catch (parseError) {
      console.log("[CHECKOUT] ❌ JSON Parse Error:", parseError);
      console.log("[CHECKOUT] 💀 Failed to parse:", text);
      warn("[CHECKOUT] ⚠️ JSON-Parse fehlgeschlagen");
      return res.status(400).json({ error: "Invalid JSON" });
    }

    // 3. DATA STRUCTURE ANALYSIS
    console.log("[CHECKOUT] 🔍 Analyzing received data structure:");
    console.log(`[CHECKOUT] - Keys received: [${Object.keys(parsedData).join(', ')}]`);
    console.log(`[CHECKOUT] - Total fields: ${Object.keys(parsedData).length}`);
    
    // Check each field
    Object.entries(parsedData).forEach(([key, value]) => {
      console.log(`[CHECKOUT] - ${key}: "${value}" (type: ${typeof value}, length: ${String(value).length})`);
    });

    // 4. ZOD SCHEMA VALIDATION DEBUG
    console.log("[CHECKOUT] 🔍 Starting Zod validation...");
    
    const validation = BewertungSchema.safeParse(parsedData);
    
    if (!validation.success) {
      console.log("[CHECKOUT] ❌ ZOD VALIDATION FAILED:");
      console.log("[CHECKOUT] 📋 Validation errors:", JSON.stringify(validation.error.flatten(), null, 2));
      
      // Detailed field-by-field analysis
      console.log("[CHECKOUT] 🔍 Field-by-field validation:");
      const schemaFields = ['rasse', 'abstammung', 'einsatzgebiet', 'geburtsjahr', 'stockmaß', 'farbe', 'vater', 'mutter', 'preise', 'besonderheiten'];
      
      schemaFields.forEach(field => {
        const value = parsedData[field];
        console.log(`[CHECKOUT] - ${field}: ${value ? `"${value}" ✅` : 'missing ❌'}`);
      });
      
      // Check for required field 'rasse'
      if (!parsedData.rasse) {
        console.log("[CHECKOUT] ❌ CRITICAL: 'rasse' field is missing!");
      } else if (parsedData.rasse.length < 2) {
        console.log(`[CHECKOUT] ❌ CRITICAL: 'rasse' too short: "${parsedData.rasse}" (${parsedData.rasse.length} chars, min 2 required)`);
      }
      
      warn("[CHECKOUT] ❌ Validierungsfehler:", validation.error.flatten());
      return res.status(400).json({ error: "Ungültige Bewertungsdaten", details: validation.error.flatten() });
    }

    console.log("[CHECKOUT] ✅ Zod validation successful!");
    console.log("[CHECKOUT] 📊 Validated data:", JSON.stringify(validation.data, null, 2));

    info("[CHECKOUT] ✅ Eingabedaten validiert und geparst.");
    log("[CHECKOUT] Eingabe:", parsedData);

    // 5. MONGODB PREPARATION
    const bewertungId = new ObjectId();
    console.log("[CHECKOUT] 🆔 Generated bewertungId:", bewertungId.toHexString());
    
     const origin = process.env.VERCEL_URL 
     ? `https://${process.env.VERCEL_URL}` 
     : process.env.NEXT_PUBLIC_BASE_URL;

    // 6. STRIPE SESSION CREATION
    console.log("[CHECKOUT] 💳 Creating Stripe session...");
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten?abgebrochen=1`,
      metadata: { bewertungId: bewertungId.toHexString() },
    });

    console.log("[CHECKOUT] ✅ Stripe session created:", session.id);
    console.log("[CHECKOUT] 🔗 Success URL:", session.success_url);

    // 7. DATABASE INSERTION DEBUG
    console.log("[CHECKOUT] 💾 Inserting into MongoDB...");
    
    const dbDocument = {
      _id: bewertungId,
      ...parsedData,  // Insert ALL received data, not just validated fields
      status: "offen",
      stripeSessionId: session.id,
      erstellt: new Date(),
    };
    
    console.log("[CHECKOUT] 📄 Document to insert:", JSON.stringify(dbDocument, null, 2));

    const collection = await getCollection("bewertungen");
    await collection.insertOne(dbDocument);

    console.log("[CHECKOUT] ✅ Document inserted successfully!");
    
    info("[CHECKOUT] ✅ Session gespeichert, ID:", session.id);
    
    console.log("[CHECKOUT] 🎯 === CHECKOUT DEBUG SUCCESS ===");
    console.log("[CHECKOUT] 🔗 Redirecting to:", session.url);
    
    res.status(200).json({ url: session.url });
    
  } catch (_err: unknown) {
    console.log("[CHECKOUT] 💥 === CHECKOUT DEBUG ERROR ===");
    console.log("[CHECKOUT] ❌ Error details:", _err);
    
    if (_err instanceof Error) {
      console.log("[CHECKOUT] - Error name:", _err.name);
      console.log("[CHECKOUT] - Error message:", _err.message);
      console.log("[CHECKOUT] - Error stack:", _err.stack);
    }
    
    error("[CHECKOUT] ❌ Fehler im Checkout:", _err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
}