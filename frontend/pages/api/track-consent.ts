// Simple consent tracking endpoint - records user cookie preferences
import type { NextApiRequest, NextApiResponse } from "next";
import { error as logError } from "@/lib/log";
import { getCollection } from "@/lib/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action } = req.body; // 'accept' oder 'reject'

    // Anonymize IP address for DSGVO compliance
    const rawIp = (req.headers["x-forwarded-for"] as string)?.split(',')[0].trim()
      || req.socket.remoteAddress
      || '';

    const anonymizedIp = rawIp.includes(':')
      ? rawIp.split(':').slice(0, 4).join(':') + '::' // IPv6 - keep first 4 segments
      : rawIp.split('.').slice(0, 3).join('.') + '.0'; // IPv4 - remove last octet

    const collection = await getCollection("consent_tracking");
    await collection.insertOne({
      action,
      timestamp: new Date(),
      ip: anonymizedIp,
      userAgent: req.headers["user-agent"],
    });

    res.status(200).json({ success: true });
  } catch (error) {
    logError("Consent tracking error:", error);
    res.status(200).json({ success: false }); // Silent fail
  }
}
