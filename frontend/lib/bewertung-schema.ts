// /lib/bewertung-schema.ts
// ⚠️ SYNC: Bei Änderungen auch /backend/schemas/bewertung_validation.py anpassen!

import { z } from "zod";

export const BewertungSchema = z.object({
  rasse: z.string(),
  alter: z.coerce.number().int(),
  geschlecht: z.string(),
  abstammung: z.string(),
  stockmass: z.coerce.number().int(),
  ausbildung: z.string(),
  // optionale Felder
  aku: z.string().optional(),
  erfolge: z.string().optional(),
  farbe: z.string().optional(),
  zuechter: z.string().optional(),
  standort: z.string().optional(),
  verwendungszweck: z.string().optional(),
});

// Für Typsicherheit im Frontend
export type Bewertung = z.infer<typeof BewertungSchema>;

// Status für MongoDB-Dokumente
export const BewertungStatus = z.enum([
  "in_bewertung",
  "bewertet", 
  "freigegeben"
]);

export type BewertungStatusType = z.infer<typeof BewertungStatus>;

// Optional: JSON Schema exportieren, falls Backend es einlesen soll
// import { zodToJsonSchema } from "zod-to-json-schema";
// export const BewertungJsonSchema = zodToJsonSchema(BewertungSchema, "Bewertung");