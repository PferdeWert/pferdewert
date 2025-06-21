// lib/mongo.ts
import { MongoClient, Db, Collection, Document } from 'mongodb';

const uri: string = process.env.MONGODB_URI || '';

if (!uri) {
  throw new Error('Bitte setze MONGODB_URI in deiner .env.local Datei');
}

let client: MongoClient | null = null;
let db: Db;

export async function getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
  }
  return db.collection<T>(collectionName);
}
