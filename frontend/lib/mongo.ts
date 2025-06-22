import { MongoClient, Db, Collection, Document } from "mongodb";

// Hole URI aus der Umgebungsvariable
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Bitte setze MONGODB_URI in deiner .env.local Datei");
}

// Diese Variablen außerhalb der Funktion ermöglichen eine Singleton-Verbindung
let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Gibt eine MongoDB-Collection zurück.
 * Verbindet sich bei Bedarf zuerst mit der Datenbank.
 */
export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  if (!client || !db) {
client = new MongoClient(uri as string);
    await client.connect();
    db = client.db(); // Standard-Datenbank aus der URI
  }

  return db.collection<T>(collectionName);
}
