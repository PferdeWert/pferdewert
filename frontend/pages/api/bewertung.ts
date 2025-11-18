// pages/api/bewertung.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { warn } from "@/lib/log";

const querySchema = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Ungültige ObjectId",
  }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // This endpoint handles GET requests for retrieving evaluations
  if (req.method !== 'GET') {
    warn("[BEWERTUNG] ❌ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    warn("[BEWERTUNG] ❌ Validation failed:", parse.error.flatten());
    return res.status(400).json({ error: "Ungültige oder fehlende ID", details: parse.error.flatten() });
  }

  const { id } = parse.data;

  // Simplified ID validation - let MongoDB validate the ObjectId
  if (!ObjectId.isValid(id)) {
    warn("[BEWERTUNG] ❌ Invalid ObjectId format:", id);
    return res.status(400).json({ error: "Ungültiges ID-Format" });
  }

  try {
    const collection = await getCollection("bewertungen");
    const result = await collection.findOne({ _id: new ObjectId(id) });

    info("[BEWERTUNG] 🔍 Document retrieved:", {
      id,
      found: !!result,
      hasBewertung: !!(result?.bewertung),
      status: result?.status,
      bewertungLength: result?.bewertung?.length || 0,
      keys: result ? Object.keys(result) : []
    });

    if (!result) {
      return res.status(404).json({ error: "Bewertung nicht gefunden - Dokument existiert nicht" });
    }

    if (!result.bewertung) {
      return res.status(404).json({
        error: "Bewertung nicht gefunden - bewertung Feld fehlt",
        status: result.status,
        debug: {
          hasStatus: !!result.status,
          hasStripeSessionId: !!result.stripeSessionId,
          fields: Object.keys(result)
        }
      });
    }

    res.status(200).json({ bewertung: result.bewertung });
  } catch (err) {
    warn("[BEWERTUNG] ❌ Fehler beim Laden der Bewertung:", err);
    res.status(500).json({ error: "Fehler beim Laden der Bewertung" });
  }
}
