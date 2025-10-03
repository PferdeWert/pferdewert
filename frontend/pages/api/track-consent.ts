// Simple consent tracking endpoint - 100% gratis
import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@/lib/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action } = req.body; // 'accept' oder 'reject'

    const collection = await getCollection("consent_tracking");
    await collection.insertOne({
      action,
      timestamp: new Date(),
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Consent tracking error:", error);
    res.status(200).json({ success: false }); // Silent fail
  }
}
