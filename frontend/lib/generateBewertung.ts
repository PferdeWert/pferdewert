// lib/generateBewertung.ts

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBewertung(daten: Record<string, unknown>): Promise<string> {
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

  const text = completion.choices[0]?.message?.content;
  if (!text) {
    throw new Error("Antwort von OpenAI war leer");
  }

  return text;
}
