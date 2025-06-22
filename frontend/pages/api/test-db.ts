import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
      const client = await MongoClient.connect(process.env.MONGODB_URI!);
          const db = client.db(); // kein Name nötig, wenn im URI enthalten
              const collections = await db.listCollections().toArray();

                  res.status(200).json({
                        message: "✅ MongoDB-Verbindung erfolgreich!",
                              collections: collections.map((col) => col.name),
                                  });

                                      await client.close();
                                        } catch (error: any) {
                                            console.error("❌ Fehler bei der MongoDB-Verbindung:", error.message);
                                                res.status(500).json({ error: error.message });
                                                  }
                                                  }
                                                  