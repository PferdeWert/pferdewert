// pages/api/bewertung-by-session.ts
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
    warn("[BEWERTUNG_BY_SESSION] ❌ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    warn("[BEWERTUNG_BY_SESSION] ❌ Validation failed:", parse.error.flatten());
    return res.status(400).json({ error: "Ungültige oder fehlende Session-ID", details: parse.error.flatten() });
  }

  const { session_id } = parse.data;

  try {
    const collection = await getCollection("bewertungen");
    const doc = await collection.findOne({ stripeSessionId: session_id });

    if (!doc) {
      warn("[BEWERTUNG_BY_SESSION] ❌ Kein Dokument zu Session gefunden", { session_id });
      return res.status(404).json({ error: "Bewertung nicht gefunden" });
    }

    const id = (doc._id as ObjectId).toHexString();

    info("[BEWERTUNG_BY_SESSION] ✅ Dokument gefunden", {
      id,
      hasBewertung: !!doc.bewertung,
      status: doc.status,
    });

    if (!doc.bewertung || typeof doc.bewertung !== "string" || !doc.bewertung.trim()) {
      return res.status(404).json({
        error: "Bewertung noch nicht verfügbar",
        status: doc.status ?? null,
        id,
      });
    }

    return res.status(200).json({ id, bewertung: doc.bewertung });
  } catch (err) {
    error("[BEWERTUNG_BY_SESSION] ❌ DB-Fehler:", err);
    return res.status(500).json({ error: "Fehler beim Laden der Bewertung" });
  }
}

