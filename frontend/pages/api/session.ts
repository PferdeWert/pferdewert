// pages/api/session.ts - PRODUCTION-READY VERSION
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCollection } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Standardisierte Error-Response-Struktur
interface ErrorResponse {
  error: {
    message: string;
    code: string;
    details?: any;
  };
}

// Stripe-Metadaten-Schema für Validation
const stripeMetadataSchema = z.object({
  bewertungId: z.string().refine(val => ObjectId.isValid(val), {
    message: "Ungültige bewertungId format"
  }),
  tarif: z.enum(['basic', 'premium']).optional(),
  couponId: z.string().optional()
});

const querySchema = z.object({
  session_id: z.string().min(10, "Ungültige Session-ID"),
});

// Utility: Status-Mapping (vorbereitet für Erweiterung)
const mapBewertungStatusToFrontend = (dbStatus: string) => {
  switch (dbStatus) {
    case "freigegeben": return "ready";
    case "bewertet": return "waiting";
    case "in_bearbeitung": return "processing";
    default: return "unknown";
  }
};

// Utility: Sichere Session-Daten extrahieren
const extractSafeSessionData = (session: Stripe.Checkout.Session) => ({
  id: session.id,
  amount_total: session.amount_total,
  currency: session.currency,
  payment_status: session.payment_status,
  created: session.created
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: {
        message: "Method not allowed",
        code: "method_not_allowed"
      }
    } as ErrorResponse);
  }

  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    console.warn("[SESSION] ⚠️ Ungültige session_id:", parse.error.flatten());
    return res.status(400).json({
      error: {
        message: "Missing or invalid session_id",
        code: "invalid_session_id",
        details: parse.error.flatten()
      }
    } as ErrorResponse);
  }

  const { session_id } = parse.data;

  try {
    // 1. Stripe-Session laden
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["payment_intent", "customer"],
      });
    } catch (stripeError) {
      console.error("[SESSION] ❌ Stripe-Fehler:", stripeError);
      return res.status(404).json({
        error: {
          message: "Stripe-Session nicht gefunden",
          code: "stripe_session_not_found"
        }
      } as ErrorResponse);
    }

    console.info("[SESSION] ✅ Stripe-Session erfolgreich geladen:", session.id);

    // 2. Payment-Status prüfen
    if (session.payment_status !== "paid") {
      return res.status(401).json({
        error: {
          message: "Zahlung nicht abgeschlossen",
          code: "payment_not_completed"
        }
      } as ErrorResponse);
    }

    // 3. Metadaten validieren
    const metadataValidation = stripeMetadataSchema.safeParse(session.metadata);
    if (!metadataValidation.success) {
      console.error("[SESSION] ❌ Ungültige Session-Metadaten:", metadataValidation.error);
      return res.status(422).json({
        error: {
          message: "Session ohne gültige bewertungId - Dateninkonsistenz",
          code: "missing_bewertung_metadata",
          details: metadataValidation.error.flatten()
        }
      } as ErrorResponse);
    }

    const { bewertungId, tarif, couponId } = metadataValidation.data;

    // 4. MongoDB: Bewertung und Status laden
    let bewertung;
    try {
      const collection = await getCollection("bewertungen");
      bewertung = await collection.findOne(
        { _id: new ObjectId(bewertungId) },
        { projection: { status: 1, bewertung: 1, tarif: 1 } }
      );
    } catch (dbError) {
      console.error("[SESSION] ❌ MongoDB-Fehler:", dbError);
      return res.status(500).json({
        error: {
          message: "Datenbankfehler beim Laden der Bewertung",
          code: "database_error"
        }
      } as ErrorResponse);
    }

    if (!bewertung) {
      console.error("[SESSION] ❌ Bewertung nicht in DB gefunden:", bewertungId);
      return res.status(404).json({
        error: {
          message: "Bewertung nicht gefunden",
          code: "bewertung_not_found"
        }
      } as ErrorResponse);
    }

    console.log("[SESSION] ✅ Bewertung-Status:", {
      bewertungId,
      status: bewertung.status,
      hasBewertung: !!bewertung.bewertung,
      tarif
    });

    // 5. Success Response mit sicheren Daten
    return res.status(200).json({ 
      session: extractSafeSessionData(session),
      bewertung: {
        id: bewertungId,
        status: bewertung.status,
        text: bewertung.status === "freigegeben" ? bewertung.bewertung : null,
        tarif: bewertung.tarif || tarif || "basic"
      },
      status: mapBewertungStatusToFrontend(bewertung.status),
      metadata: {
        couponId,
        processed_at: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error("[SESSION] ❌ Unerwarteter Fehler:", err);
    return res.status(500).json({
      error: {
        message: "Interner Serverfehler",
        code: "internal_server_error"
      }
    } as ErrorResponse);
  }
}