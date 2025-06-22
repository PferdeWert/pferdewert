import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Bitte setze MONGODB_URI in deiner .env.local Datei");
} else {
  console.log("MongoDB URI vorhanden (masked):", uri.replace(/:\/\/.*@/, "://***:***@"));
}

// Caching bei Hot Reloads (Next.js dev mode)
let client: MongoClient | null = null;
let db: Db;

export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  if (!client) {
    try {
      client = new MongoClient(uri as string);
      await client.connect();
      console.log("✅ MongoDB Verbindung hergestellt");
      db = client.db(); // optional: db("name") falls nicht im URI
    } catch (err) {
      console.error("❌ Fehler bei MongoDB Verbindung:", err);
      throw err;
    }
  }
  return db.collection<T>(collectionName);
}
