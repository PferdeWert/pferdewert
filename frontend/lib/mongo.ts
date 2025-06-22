import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Bitte setze MONGODB_URI in deiner .env.local Datei");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  if (cachedClient && cachedDb) {
    return cachedDb.collection<T>(collectionName);
  }

  try {
    const client = new MongoClient(uri as string); // TypeScript-sicher
    await client.connect();
    const db = client.db(); // Optional: db("pferdewert") falls festgelegt

    cachedClient = client;
    cachedDb = db;

    return db.collection<T>(collectionName);
  } catch (err) {
    console.error("❌ Fehler bei MongoDB Verbindung:", err);
    throw err;
  }
}
