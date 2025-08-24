// pages/api/bewertung.ts
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
  console.log("[BEWERTUNG] Request received for ID:", req.query.id);
  
  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    console.warn("[BEWERTUNG] ❌ Validation failed:", parse.error.flatten());
    return res.status(400).json({ error: "Missing or invalid id", details: parse.error.flatten() });
  }

  const { id } = parse.data;

  // Zusätzliche Sanitization für MongoDB Security
  const sanitizedId = id.toString().replace(/[^a-fA-F0-9]/g, ''); // Nur hex chars
  if (sanitizedId.length !== 24) {
    console.warn("[BEWERTUNG] ❌ Invalid ID format:", sanitizedId);
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    console.log("[BEWERTUNG] Searching MongoDB for ID:", sanitizedId);
    const collection = await getCollection("bewertungen");
    const result = await collection.findOne({ _id: new ObjectId(sanitizedId) });

    console.log("[BEWERTUNG] MongoDB result:", {
      found: !!result,
      hasFields: result ? Object.keys(result) : [],
      hasBewertung: !!(result?.bewertung),
      bewertungLength: result?.bewertung ? result.bewertung.length : 0,
      status: result?.status
    });

    if (!result) {
      console.warn("[BEWERTUNG] ❌ Document not found for ID:", sanitizedId);
      return res.status(404).json({ error: "Bewertung nicht gefunden" });
    }

    if (!result.bewertung) {
      console.info("[BEWERTUNG] ⏳ Document found but bewertung field is empty/null");
      return res.status(404).json({ 
        error: "Bewertung wird noch erstellt", 
        status: result.status || "unknown",
        found: true,
        processing: true
      });
    }

    console.log("[BEWERTUNG] ✅ Successfully returning bewertung");
    res.status(200).json({ bewertung: result.bewertung });
  } catch (err) {
    console.error("[BEWERTUNG] ❌ Fehler beim Laden der Bewertung:", err);
    res.status(500).json({ error: "Fehler beim Laden der Bewertung" });
  }
}
