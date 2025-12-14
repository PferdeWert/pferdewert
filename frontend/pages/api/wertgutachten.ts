// pages/api/wertgutachten.ts
// API-Endpunkt für Wertgutachten-Daten (analog zu bewertung.ts)
import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { info, warn } from "@/lib/log";

const querySchema = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Ungültige ObjectId",
  }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    warn("[WERTGUTACHTEN-API] ❌ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    warn("[WERTGUTACHTEN-API] ❌ Validation failed:", parse.error.flatten());
    return res.status(400).json({ error: "Ungültige oder fehlende ID" });
  }

  const { id } = parse.data;

  try {
    const collection = await getCollection("wertgutachten");
    const result = await collection.findOne({ _id: new ObjectId(id) });

    info("[WERTGUTACHTEN-API] 🔍 Document retrieved:", {
      id,
      found: !!result,
      hasZertifikatData: !!(result?.zertifikat_data),
      status: result?.status,
    });

    if (!result) {
      return res.status(404).json({ error: "Wertgutachten nicht gefunden" });
    }

    if (!result.zertifikat_data || result.status !== "fertig") {
      return res.status(404).json({
        error: "Wertgutachten noch nicht fertig",
        status: result.status,
      });
    }

    // Alle relevanten Daten für die Ergebnisseite zurückgeben
    return res.status(200).json({
      id: (result._id as ObjectId).toString(),
      zertifikatNummer: result.zertifikatNummer,
      pferdeName: result.pferdeName,
      rasse: result.rasse,
      alter: result.alter,
      geschlecht: result.geschlecht,
      stockmass: result.stockmass,
      ausbildung: result.ausbildung,
      aku: result.aku,
      haupteignung: result.haupteignung,
      abstammung: result.abstammung,
      zertifikat_data: result.zertifikat_data,
      erstellt: result.erstellt,
      aktualisiert: result.aktualisiert,
    });
  } catch (err) {
    warn("[WERTGUTACHTEN-API] ❌ Fehler:", err);
    return res.status(500).json({ error: "Fehler beim Laden des Wertgutachtens" });
  }
}
