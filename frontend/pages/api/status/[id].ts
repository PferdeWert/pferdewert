// pages/api/status/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";

// Union Types für bessere Type-Safety
const VALID_STATUSES = ['in_bewertung', 'bewertet', 'freigegeben'] as const;
type BewertungStatus = typeof VALID_STATUSES[number];

// Hilfsfunktion: Type Guard für Status-Validierung
function isValidStatus(status: string): status is BewertungStatus {
  return VALID_STATUSES.includes(status as BewertungStatus);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Nur GET-Requests erlauben
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Methode nicht erlaubt" });
  }

  const { id } = req.query;

  // ID-Validierung
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Bewertungs-ID ist erforderlich" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Ungültige Bewertungs-ID" });
  }

  try {
    const collection = await getCollection("bewertungen");
    
    // Nur relevante Felder laden für bessere Performance
    const bewertung = await collection.findOne(
      { _id: new ObjectId(id) },
      { 
        projection: { 
          status: 1, 
          bewertung: 1, 
          raw_gpt: 1,
          erstellt_am: 1, 
          erstellt: 1,
          stripe_session_id: 1,
          stripeSessionId: 1
        } 
      }
    );

    if (!bewertung) {
      return res.status(404).json({ error: "Bewertung nicht gefunden" });
    }

    const rawStatus: string = bewertung.status || "in_bewertung";
    
    // Status-Validierung mit Type Guard
    if (!isValidStatus(rawStatus)) {
      console.error(`[STATUS-API] Ungültiger Status: ${rawStatus} für ID ${id}`);
      return res.status(500).json({
        error: "Ungültiger Bewertungsstatus",
        message: "Der Bewertungsstatus ist beschädigt. Bitte kontaktieren Sie den Support."
      });
    }

    const status: BewertungStatus = rawStatus;
    console.log(`[STATUS-API] Status abgerufen für ID ${id}: ${status}`);

    // Audit-Logging (optional, non-blocking)
    try {
      const auditCollection = await getCollection("status_audit");
      await auditCollection.insertOne({
        bewertung_id: new ObjectId(id),
        status,
        accessed_at: new Date(),
        user_agent: req.headers['user-agent'] || 'unknown',
        action: 'status_check'
      });
    } catch (auditError) {
      console.error("[STATUS-API] Audit-Log Fehler:", auditError);
    }

    // Legacy-Felder handhaben
    const erstelltAm = bewertung.erstellt_am || bewertung.erstellt;
    const stripeSessionId = bewertung.stripe_session_id || bewertung.stripeSessionId;
    const bewertungsText = bewertung.bewertung || bewertung.raw_gpt;

    // Response je nach Status mit Type-Safety
    switch (status) {
      case "freigegeben":
        return res.status(200).json({
          status: "freigegeben",
          bewertung: bewertungsText,
          erstellt_am: erstelltAm,
          stripe_session_id: stripeSessionId
        });

      case "bewertet":
        const response = {
          status: "bewertet" as const,
          message: "Bewertung wird nach Zahlungsbestätigung freigeschaltet...",
          ...(stripeSessionId && { stripe_session_id: stripeSessionId })
        };
        return res.status(200).json(response);

      case "in_bewertung":
        return res.status(200).json({
          status: "in_bewertung", 
          message: "Bewertung wird erstellt..."
        });

      default:
        return res.status(500).json({
          status: "unknown",
          message: "Status konnte nicht verarbeitet werden"
        });
    }

  } catch (err) {
    console.error("[STATUS-API] Fehler beim Abrufen der Bewertung:", err);
    return res.status(500).json({ 
      error: "Interner Serverfehler",
      message: "Bewertungsstatus konnte nicht abgerufen werden"
    });
  }
}