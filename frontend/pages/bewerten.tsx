// pages/bewerten.tsx

import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";

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
  { name: "abstammung", label: "Abstammung", required: true },
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
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [fehler, setFehler] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFehler("");

    try {
      const res = await fetch("https://pferdewert-api.onrender.com/api/bewertung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json: { raw_gpt?: string } = await res.json();

      if (json.raw_gpt) {
        router.push(`/ergebnis?text=${encodeURIComponent(json.raw_gpt)}`);
      } else {
        setFehler("Die Bewertung war nicht erfolgreich. Bitte überprüfe deine Eingaben.");
      }
    } catch {
  setFehler("Ein Fehler ist aufgetreten. Bitte versuche es später erneut oder schreibe an info@pferdewert.de.");
}

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Pferd bewerten – PferdeWert</title>
        <meta
          name="description"
          content="Jetzt Pferd kostenlos bewerten lassen – KI-gestützt, anonym und in 30 Sekunden. PferdeWert ist Marktführer für digitale Pferdebewertung."
        />
      </Head>

      <main className="bg-brand-light min-h-screen py-20 px-4">
        <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-soft p-8 border border-brand/10">
          <h1 className="text-h1 font-serif font-bold text-brand mb-6">
            Jetzt Pferd bewerten
          </h1>
          <p className="text-brand mb-8 text-base">
            Trage die wichtigsten Informationen ein – unsere KI analysiert sofort den Marktwert deines Pferdes. <span className="block mt-2 text-brand-accent font-medium">100% anonym & kostenlos.</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <label key={field.name} className="block">
                <span className="font-medium text-brand">
                  {field.label}
                  {field.required && <span className="text-red-600"> *</span>}
                </span>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    required={field.required}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border rounded-xl border-brand-light bg-white"
                  >
                    <option value="">Bitte wählen</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    required={field.required}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border rounded-xl border-brand-light"
                  />
                )}
              </label>
            ))}

            {fehler && (
              <p className="text-red-600 font-medium text-base">{fehler}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-accent text-white py-4 rounded-2xl font-bold text-button shadow-soft hover:bg-brand transition"
            >
              {loading ? "🔄 Bewertung läuft..." : "Jetzt Bewertung starten"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
