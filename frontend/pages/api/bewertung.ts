// pages/api/bewertung.ts - DEBUG VERSION
import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { z } from "zod";

const querySchema = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Ungültige ObjectId",
  }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("[BEWERTUNG] 🚀 === BEWERTUNG DEBUG START ===");
  
  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    console.log("[BEWERTUNG] ❌ Invalid ID:", req.query.id);
    console.log("[BEWERTUNG] ❌ Validation errors:", parse.error.flatten());
    return res.status(400).json({ error: "Missing or invalid id", details: parse.error.flatten() });
  }

  const { id } = parse.data;
  console.log(`[BEWERTUNG] 🆔 Looking for document with ID: ${id}`);

  try {
    // 1. MONGODB CONNECTION TEST
    console.log("[BEWERTUNG] 🔗 Testing MongoDB connection...");
    const collection = await getCollection("bewertungen");
    console.log("[BEWERTUNG] ✅ MongoDB connection successful");

    // 2. DOCUMENT LOOKUP
    console.log("[BEWERTUNG] 🔍 Searching for document...");
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      console.log("[BEWERTUNG] ❌ Document NOT FOUND");
      console.log("[BEWERTUNG] 🔍 Let's check what documents exist...");
      
      // Check recent documents
      const recentDocs = await collection.find({}).sort({ erstellt: -1 }).limit(5).toArray();
      console.log(`[BEWERTUNG] 📊 Found ${recentDocs.length} recent documents:`);
      
      recentDocs.forEach((doc, index) => {
        console.log(`[BEWERTUNG] ${index + 1}. ID: ${doc._id}, Status: ${doc.status}, Created: ${doc.erstellt}`);
      });
      
      return res.status(404).json({ error: "Bewertung nicht gefunden" });
    }

    console.log("[BEWERTUNG] ✅ Document FOUND!");
    
    // 3. DOCUMENT ANALYSIS
    console.log("[BEWERTUNG] 📊 === DOCUMENT ANALYSIS ===");
    console.log(`[BEWERTUNG] - Document ID: ${result._id}`);
    console.log(`[BEWERTUNG] - Status: ${result.status}`);
    console.log(`[BEWERTUNG] - Created: ${result.erstellt}`);
    console.log(`[BEWERTUNG] - Updated: ${result.aktualisiert || 'Not set'}`);
    console.log(`[BEWERTUNG] - Stripe Session: ${result.stripeSessionId}`);
    
    // Check all available fields
    console.log("[BEWERTUNG] 📋 Available fields in document:");
    Object.keys(result).forEach(key => {
      const value = result[key];
      const type = typeof value;
      const length = type === 'string' ? value.length : 'N/A';
      console.log(`[BEWERTUNG] - ${key}: ${type} (length: ${length})`);
    });

    // 4. BEWERTUNG FIELD CHECK
    const hasBewertung = !!result.bewertung;
    console.log(`[BEWERTUNG] 🎯 Has 'bewertung' field: ${hasBewertung}`);
    
    if (hasBewertung) {
      console.log(`[BEWERTUNG] ✅ Bewertung exists, length: ${result.bewertung.length} characters`);
      console.log(`[BEWERTUNG] 📝 First 100 chars: ${result.bewertung.substring(0, 100)}...`);
    } else {
      console.log("[BEWERTUNG] ❌ NO 'bewertung' field found!");
      console.log("[BEWERTUNG] 🔍 This means the webhook failed or hasn't run yet");
    }

    // 5. FORM DATA CHECK
    console.log("[BEWERTUNG] 📊 === FORM DATA ANALYSIS ===");
    const formFields = ['rasse', 'alter', 'geschlecht', 'abstammung', 'stockmass', 'ausbildung', 'aku', 'erfolge', 'farbe', 'zuechter', 'standort', 'verwendungszweck'];
    
    formFields.forEach(field => {
      const value = result[field];
      console.log(`[BEWERTUNG] - ${field}: "${value}" (${typeof value})`);
    });

    // 6. RESPONSE DECISION
    if (!result.bewertung) {
      console.log("[BEWERTUNG] ❌ Returning 404 - no bewertung field");
      return res.status(404).json({ 
        error: "Bewertung nicht gefunden",
        debug: {
          documentExists: true,
          status: result.status,
          hasBewertung: false,
          message: "Document exists but bewertung field is missing - webhook probably failed"
        }
      });
    }

    console.log("[BEWERTUNG] ✅ Returning bewertung");
    console.log("[BEWERTUNG] 🎯 === BEWERTUNG DEBUG SUCCESS ===");
    
    res.status(200).json({ bewertung: result.bewertung });
    
  } catch (err) {
    console.log("[BEWERTUNG] 💥 === BEWERTUNG DEBUG ERROR ===");
    console.error("[BEWERTUNG] ❌ Database error:", err);
    
    if (err instanceof Error) {
      console.log(`[BEWERTUNG] - Error name: ${err.name}`);
      console.log(`[BEWERTUNG] - Error message: ${err.message}`);
    }
    
    res.status(500).json({ error: "Fehler beim Laden der Bewertung" });
  }
}