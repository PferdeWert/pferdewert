// pages/api/ping.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const start = Date.now();
    const client = await MongoClient.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000, // Max 5 Sek warten
    });

    const db = client.db();
    const collections = await db.listCollections().toArray();
    await client.close();

    res.status(200).json({
      ok: true,
      tookMs: Date.now() - start,
      collections: collections.map((c) => c.name),
    });
  } catch (err: unknown) {
    // Prüfen, ob err ein Error-Objekt ist
    if (err instanceof Error) {
      res.status(500).json({
        ok: false,
        error: err.message,
      });
    } else {
      res.status(500).json({
        ok: false,
        error: "Unbekannter Fehler",
      });
    }
  }
}
