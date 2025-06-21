// pages/api/generate.ts

import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { daten } = req.body;

  if (!daten) {
    return res.status(400).json({ error: "Missing input data" });
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

    const text = completion.choices[0].message.content;
    res.status(200).json({ result: text });
  } catch (error) {
    console.error("OpenAI-Error:", error);
    res.status(500).json({ error: "OpenAI request failed" });
  }
}
