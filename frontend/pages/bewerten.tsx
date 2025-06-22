// pages/bewerten.tsx
import Head from "next/head";
import React, { useState } from "react";

interface FormState {
  rasse: string;
  alter: string;
  geschlecht: string;
  abstammung: string;
  stockmass: string;
  ausbildung: string;
  aku: string;
  erfolge: string;
  farbe: string;
  zuechter: string;
  standort: string;
  verwendungszweck: string;
}

const initialForm: FormState = {
  rasse: "",
  alter: "",
  geschlecht: "",
  abstammung: "",
  stockmass: "",
  ausbildung: "",
  aku: "",
  erfolge: "",
  farbe: "",
  zuechter: "",
  standort: "",
  verwendungszweck: "",
};

const fields: {
  name: keyof FormState;
  label: string;
  type?: "text" | "number" | "select";
  required?: boolean;
  options?: string[];
}[] = [
  { name: "rasse", label: "Rasse", required: true },
  { name: "alter", label: "Alter (Jahre)", type: "number", required: true },
  {
    name: "geschlecht",
    label: "Geschlecht",
    type: "select",
    required: true,
    options: ["Stute", "Wallach", "Hengst"],
  },
  { name: "abstammung", label: "Abstammung (Vater x Muttervater)", required: true },
  { name: "stockmass", label: "Stockmaß (cm)", type: "number", required: true },
  { name: "ausbildung", label: "Ausbildungsstand", required: true },
  { name: "aku", label: "Gesundheitsstatus / AKU-Bericht" },
  { name: "erfolge", label: "Erfolge" },
  { name: "farbe", label: "Farbe" },
  { name: "zuechter", label: "Züchter / Ausbildungsstall" },
  { name: "standort", label: "Standort (PLZ)" },
  { name: "verwendungszweck", label: "Verwendungszweck / Zielsetzung" },
];

export default function Bewerten() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validateField(name: string, value: string): string {
    const f = fields.find((f) => f.name === name);
    if (f?.required && !value) return "Erforderlich";
    return "";
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: validateField(name, value) }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log("🚦 Submit gestartet", form);

  const newErrors: Record<string, string> = {};
  fields.forEach((f) => {
    const val = form[f.name];
    const err = validateField(f.name, val);
    if (err) newErrors[f.name] = err;
  });

  if (Object.keys(newErrors).length > 0) {
    console.warn("🚨 Validierungsfehler gefunden:", newErrors);
    setErrors(newErrors);
    return;
  }

  console.log("🟢 Keine Validierungsfehler!");

  setLoading(true);
  setErrors({});

  try {
    console.log("📨 API-Request gestartet");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: JSON.stringify(form) }),
    });

    console.log("📩 Antwort erhalten, Status:", res.status);

    const json = await res.json();
    console.log("📄 API-JSON:", json);

    if (json.url) {
      console.log("🔗 Weiterleitung zu:", json.url);
      window.location.href = json.url;
    } else {
      console.error("❌ Keine URL erhalten");
      setErrors({ form: "Fehler bei der Stripe-Weiterleitung." });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("[CHECKOUT] Fehler:", err.message, err.stack);
    } else {
      console.error("[CHECKOUT] Unbekannter Fehler:", err);
    }
    setErrors({ form: "Ein Fehler ist aufgetreten." });
  }

  setLoading(false);
}
}