// pages/api/webhook.ts - CONNECTIVITY TEST VERSION
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🚨 IMMER LOGGEN - egal was passiert
  console.log("=".repeat(80));
  console.log("🚨 WEBHOOK HANDLER CALLED!");
  console.log("⏰ Timestamp:", new Date().toISOString());
  console.log("🌐 Method:", req.method);
  console.log("📍 URL:", req.url);
  console.log("🎯 User-Agent:", req.headers['user-agent']);
  console.log("🔗 Origin:", req.headers.origin || 'no origin');
  console.log("=".repeat(80));

  // Simple response für alle Requests
  if (req.method === "GET") {
    console.log("✅ GET Request - sending OK");
    return res.status(200).json({ 
      status: "webhook alive", 
      timestamp: new Date().toISOString(),
      method: req.method 
    });
  }

  if (req.method === "POST") {
    console.log("📬 POST Request detected");
    
    try {
      const buf = await buffer(req);
      console.log(`📊 Body size: ${buf.length} bytes`);
      console.log(`🔐 Stripe signature: ${req.headers['stripe-signature'] ? 'EXISTS' : 'MISSING'}`);
      
      // Für jetzt: Immer success zurückgeben
      console.log("✅ POST Request - sending OK (without processing)");
      return res.status(200).json({ 
        status: "post received", 
        bodySize: buf.length,
        hasSignature: !!req.headers['stripe-signature'],
        timestamp: new Date().toISOString()
      });
      
    } catch (err) {
      console.log("❌ Error in POST processing:", err);
      return res.status(500).json({ error: "processing failed" });
    }
  }

  console.log(`❓ Unexpected method: ${req.method}`);
  return res.status(405).json({ error: "Method not allowed" });
}