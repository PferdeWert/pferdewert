// frontend/pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EingabeSchema = z.object({
  rasse: z.string(),
  abstammung: z.string().optional(),
  einsatzgebiet: z.string().optional(),
  geburtsjahr: z.string().optional(),
  stockmaß: z.string().optional(),
  farbe: z.string().optional(),
  vater: z.string().optional(),
  mutter: z.string().optional(),
  preise: z.string().optional(),
  besonderheiten: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    console.warn(`[GENERATE] ❌ Ungültige Methode: ${req.method}`);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { daten } = req.body;

  const valid = EingabeSchema.safeParse(daten);
  if (!valid.success) {
    console.warn(`[GENERATE] ⚠️ Ungültige Eingabedaten:`, valid.error.flatten());
    return res.status(400).json({ error: "Ungültige Eingabedaten" });
  }

  try {
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

    const result = completion.choices?.[0]?.message?.content;
    if (!result) throw new Error("Kein Ergebnis von OpenAI erhalten.");

    return res.status(200).json({ result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[GENERATE] ❌ Fehler bei OpenAI:", message);

    return res.status(500).json({ error: "OpenAI-Anfrage fehlgeschlagen: " + message });
  }
}
