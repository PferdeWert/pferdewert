import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Request body:", req.body);
    const { text } = req.body;

    if (!text) {
      console.error("Missing 'text' field in request body");
      return res.status(400).json({ error: "Missing input data" });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(text);
      console.log("Parsed text:", parsedData);
    } catch (e) {
      console.error("Failed to parse JSON from text:", e);
      return res.status(400).json({ error: "Invalid JSON in text field" });
    }

    const origin =
      req.headers.origin || `http${req.headers.host?.includes("localhost") ? "" : "s"}://${req.headers.host}`;
    console.log("Origin detected:", origin);

    // KI-API aufrufen
    const response = await fetch(`${origin}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ daten: parsedData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("KI-API Error:", errorText);
      throw new Error("OpenAI request failed");
    }

    const { result } = await response.json();
    console.log("KI Result:", result);

    if (!result) {
      console.error("No result returned from AI model");
      return res.status(500).json({ error: "No result from AI" });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      console.error("STRIPE_PRICE_ID not set in environment variables");
      return res.status(500).json({ error: "Server misconfiguration: missing Stripe price ID" });
    }

    // Stripe Checkout Session erstellen
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: { bewertung: result },
      success_url: `${origin}/ergebnis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bewerten`,
    });

    console.log("Stripe Session URL:", session.url);

    return res.status(200).json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Stripe Checkout Error:", message);
    return res.status(500).json({ error: message });
  }
}
