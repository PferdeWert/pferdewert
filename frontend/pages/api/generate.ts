import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    console.warn(`[GENERATE] ❌ Ungültige Methode: ${req.method}`);
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("[GENERATE] Request erhalten mit Daten:", req.body.daten);

  const { daten } = req.body;

  if (!daten || typeof daten !== "object") {
    console.warn(`[GENERATE] ⚠️ Fehlende oder ungültige Eingabedaten: ${JSON.stringify(daten)}`);
    return res.status(400).json({ error: "Missing or invalid input data" });
  }

  try {
    console.info("[GENERATE] 🔄 Sende Anfrage an OpenAI mit folgenden Daten:", JSON.stringify(daten, null, 2));

    const completion = await openai.chat.completions.create({
      model: process.env.PW_MODEL || "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Du bist ein Experte für die Einschätzung von Pferden und gibst strukturierte Preisschätzungen.",
        },
        {
          role: "user",
          content: `Bewerte bitte dieses Pferd:\n\n${JSON.stringify(daten, null, 2)}`,
        },
      ],
      max_tokens: 1000,
    });

    console.debug("[GENERATE] Vollständige Antwort von OpenAI:", JSON.stringify(completion, null, 2));

    const result = completion.choices?.[0]?.message?.content;

    if (!result) {
      console.error("[GENERATE] ❌ Kein Ergebnis von OpenAI erhalten.");
      throw new Error("Kein Ergebnis von OpenAI erhalten.");
    }

    console.info("[GENERATE] ✅ Ergebnis von OpenAI erhalten (Auszug):", result.slice(0, 200));
    return res.status(200).json({ result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[GENERATE] ❌ OpenAI-Anfrage fehlgeschlagen:", message);

    // Optional: Bei bestimmten Fehlern (z.B. Auth) kann man mehr Details loggen
    if (error && typeof error === "object" && "response" in error) {
      
      console.error("[GENERATE] OpenAI Error Response:", JSON.stringify(error.response, null, 2));
    }

    return res.status(500).json({ error: "OpenAI-Anfrage fehlgeschlagen: " + message });
  }
}
