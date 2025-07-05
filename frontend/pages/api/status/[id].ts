// pages/api/status/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongo";
import { info, error } from "@/lib/log";

// Type-Safety: Bewertungsdokument Interface
interface BewertungDocument {
  _id: ObjectId;
  status?: BewertungStatus;
  bewertung?: string;
  raw_gpt?: string; // Legacy-Feld
  erstellt_am?: Date;
  erstellt?: Date; // Legacy-Feld
  stripe_session_id?: string;
  stripeSessionId?: string; // Legacy-Feld
  aktualisiert?: Date;
  // Weitere Felder können hier ergänzt werden
}

// Status-Validierung: Gültige Stati definieren
const VALID_STATUSES = ['in_bewertung', 'bewertet', 'freigegeben'] as const;
type BewertungStatus = typeof VALID_STATUSES[number];

// Hilfsfunktion: Status validieren
function isValidStatus(status: string): status is BewertungStatus {
  return VALID_STATUSES.includes(status as BewertungStatus);
}

// Audit-Logging: Status-Zugriff protokollieren
async function logStatusAccess(bewertungId: string, status: string, userAgent?: string) {
  try {
    const auditCollection = await getCollection("status_audit");
    await auditCollection.insertOne({
      bewertung_id: new ObjectId(bewertungId),
      status,
      accessed_at: new Date(),
      user_agent: userAgent || 'unknown',
      action: 'status_check'
    });
  } catch (err) {
    // Audit-Fehler sollen nicht den Hauptprozess blockieren
    error("[STATUS-API] Audit-Log Fehler:", err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;

  // Validierung der ID
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Bewertungs-ID ist erforderlich" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Ungültige Bewertungs-ID" });
  }

  try {
    const collection = await getCollection("bewertungen");
    const bewertung = await collection.findOne<BewertungDocument>({ 
      _id: new ObjectId(id) 
    });

    if (!bewertung) {
      return res.status(404).json({ error: "Bewertung nicht gefunden" });
    }

    const rawStatus = bewertung.status || "in_bewertung";
    
    // Status-Validierung mit expliziter Prüfung
    if (!isValidStatus(rawStatus)) {
      error(`[STATUS-API] Ungültiger Status in DB: ${rawStatus} für ID ${id}`);
      return res.status(500).json({
        error: "Ungültiger Bewertungsstatus",
        message: "Der Bewertungsstatus ist beschädigt. Bitte kontaktieren Sie den Support."
      });
    }

    const status: BewertungStatus = rawStatus;
    
    info(`[STATUS-API] Status abgerufen für ID ${id}: ${status}`);

    // Audit-Logging: Zugriff protokollieren
    await logStatusAccess(id, status, req.headers['user-agent']);

    // Response je nach Status mit Type-Safety
    switch (status) {
      case "freigegeben":
        // Bewertung ist bezahlt und kann angezeigt werden
        return res.status(200).json({
          status: "freigegeben",
          bewertung: bewertung.bewertung || bewertung.raw_gpt, // Fallback für Legacy
          erstellt_am: bewertung.erstellt_am || bewertung.erstellt,
          stripe_session_id: bewertung.stripe_session_id || bewertung.stripeSessionId
        });

      case "bewertet":
        // Bewertung liegt vor, aber noch nicht bezahlt
        return res.status(200).json({
          status: "bewertet",
          message: "Bewertung wird nach Zahlungsbestätigung freigeschaltet..."
        });

      case "in_bewertung":
        // Bewertung läuft noch
        return res.status(200).json({
          status: "in_bewertung", 
          message: "Bewertung wird erstellt..."
        });

      default:
        // TypeScript exhaustive check - sollte nie erreicht werden
        const _exhaustiveCheck: never = status;
        error(`[STATUS-API] Unbehandelter Status: ${_exhaustiveCheck} für ID ${id}`);
        return res.status(500).json({
          status: "unknown",
          message: "Status konnte nicht verarbeitet werden"
        });
    }

  } catch (err) {
    error("[STATUS-API] Fehler beim Abrufen der Bewertung:", err);
    return res.status(500).json({ 
      error: "Interner Serverfehler",
      message: "Bewertungsstatus konnte nicht abgerufen werden"
    });
  }
}