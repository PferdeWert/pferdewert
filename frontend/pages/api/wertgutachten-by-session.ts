// pages/api/wertgutachten-by-session.ts
// API-Endpunkt für Wertgutachten via Stripe Session-ID (Redirect nach Checkout)
import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { info, warn, error } from "@/lib/log";

const querySchema = z.object({
  session_id: z.string().min(10, "Ungültige Session-ID"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    warn("[WERTGUTACHTEN_BY_SESSION] ❌ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    warn("[WERTGUTACHTEN_BY_SESSION] ❌ Validation failed:", parse.error.flatten());
    return res.status(400).json({ error: "Ungültige oder fehlende Session-ID" });
  }

  const { session_id } = parse.data;

  try {
    const collection = await getCollection("wertgutachten");
    const doc = await collection.findOne({ stripeSessionId: session_id });

    if (!doc) {
      warn("[WERTGUTACHTEN_BY_SESSION] ❌ Kein Dokument zu Session gefunden", { session_id });
      return res.status(404).json({ error: "Wertgutachten nicht gefunden" });
    }

    const id = (doc._id as ObjectId).toHexString();

    info("[WERTGUTACHTEN_BY_SESSION] ✅ Dokument gefunden", {
      id,
      hasZertifikatData: !!doc.zertifikat_data,
      status: doc.status,
    });

    // Wenn noch nicht fertig - nur ID zurückgeben für Polling
    if (!doc.zertifikat_data || doc.status !== "fertig") {
      return res.status(200).json({
        id,
        status: doc.status ?? "offen",
        ready: false,
      });
    }

    // Fertig - alle Daten zurückgeben
    return res.status(200).json({
      id,
      ready: true,
      zertifikatNummer: doc.zertifikatNummer,
      pferdeName: doc.pferdeName,
      rasse: doc.rasse,
      alter: doc.alter,
      geschlecht: doc.geschlecht,
      stockmass: doc.stockmass,
      ausbildung: doc.ausbildung,
      aku: doc.aku,
      haupteignung: doc.haupteignung,
      abstammung: doc.abstammung,
      zertifikat_data: doc.zertifikat_data,
      erstellt: doc.erstellt,
      aktualisiert: doc.aktualisiert,
    });
  } catch (err) {
    error("[WERTGUTACHTEN_BY_SESSION] ❌ DB-Fehler:", err);
    return res.status(500).json({ error: "Fehler beim Laden des Wertgutachtens" });
  }
}
