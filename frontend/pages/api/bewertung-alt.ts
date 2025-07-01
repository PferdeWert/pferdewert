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
  const parse = querySchema.safeParse(req.query);
  if (!parse.success) {
    return res.status(400).json({ error: "Missing or invalid id", details: parse.error.flatten() });
  }

  const { id } = parse.data;

  try {
    const collection = await getCollection("bewertungen");
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (!result || !result.bewertung) {
      return res.status(404).json({ error: "Bewertung nicht gefunden" });
    }

    res.status(200).json({ bewertung: result.bewertung });
  } catch (err) {
    console.error("[BEWERTUNG] ❌ Fehler beim Laden der Bewertung:", err);
    res.status(500).json({ error: "Fehler beim Laden der Bewertung" });
  }
}
