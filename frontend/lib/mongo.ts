// lib/mongo.ts
import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Bitte setze MONGODB_URI in deiner .env.local Datei");
}

// Caching bei Hot Reloads (Next.js dev mode)
let client: MongoClient | null = null;
let db: Db;

export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  if (!client) {
    client = new MongoClient(uri as string);
    await client.connect();
    db = client.db(); // optional: db("name") falls nicht im URI
  }
  return db.collection<T>(collectionName);
}
