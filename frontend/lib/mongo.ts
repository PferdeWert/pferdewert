import { MongoClient, Db, Collection, Document } from "mongodb";
import { info, warn, error } from "@/lib/log";

const uri = process.env.MONGODB_URI;

if (!uri) {
  warn("⚠️  MONGODB_URI not set - database connection will fail at runtime");
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
    info("🔄 Creating new MongoDB connection...");
    
    const client = new MongoClient(uri as string, {
      maxPoolSize: 5, // Limit connection pool size for serverless
      serverSelectionTimeoutMS: 5000, // 5s timeout for connection
      socketTimeoutMS: 45000, // 45s socket timeout (under Vercel 10min limit)
      maxIdleTimeMS: 30000, // Close idle connections after 30s
      connectTimeoutMS: 10000, // 10s connection timeout
    });
    
    await client.connect();
    const db = client.db(); // Optional: db("pferdewert") falls festgelegt

    cachedClient = client;
    cachedDb = db;
    
    info("✅ MongoDB connection established successfully");
    return db.collection<T>(collectionName);
  } catch (err) {
    error("❌ MongoDB connection error:", err);
    
    // Clean up any partial connections
    cachedClient = null;
    cachedDb = null;
    
    throw new Error(`MongoDB connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}
