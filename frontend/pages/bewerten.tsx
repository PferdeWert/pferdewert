// Diese Datei repräsentiert die Seite /bewerten.tsx
// (bereits mehrfach bearbeitet, jetzt mit Widerrufs-Checkbox-Erweiterung)

import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { error } from "@/lib/log";

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
  { name: "standort", label: "Standort" },
  { name: "verwendungszweck", label: "Verwendungszweck" },
];

export default function Bewerten() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!consent) {
      setErrors({ form: "Bitte bestätige den Verzicht auf dein Widerrufsrecht." });
      return;
    }

    const newErrors: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (field.required && !form[field.name]) {
        newErrors[field.name] = "Pflichtfeld";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrors({ form: "Fehler beim Starten der Bewertung." });
      }
    } catch (err) {
      error("Fehler beim Starten der Bewertung", err);
      setErrors({ form: "Ein unerwarteter Fehler ist aufgetreten." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>PferdeWert – Bewertung</title>
      </Head>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Pferd analysieren lassen</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
  <label htmlFor={field.name} className="block font-medium mb-1">
    {field.label}
    {field.required && <span className="text-red-600 ml-1">*</span>}
  </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl transition ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } focus:border-brand-accent focus:outline-none`}
                >
                  <option value="">Bitte wählen</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  value={form[field.name]}
                  onChange={handleChange}
                  autoComplete="off"
                  inputMode={field.type === "number" ? "numeric" : undefined}
                  className={`w-full p-3 border rounded-xl transition ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } focus:border-brand-accent focus:outline-none`}
                />
              )}
              {errors[field.name] && (
                <p className="mt-1 text-red-600 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="text-sm text-gray-700">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
                required
              />
              <span>
                Ich stimme ausdrücklich zu, dass die Analyse sofort beginnt, und bestätige mein Erlöschen des Widerrufsrechts gemäß § 356 Abs. 5 BGB.
              </span>
            </label>
          </div>

          {errors.form && (
            <p className="text-red-600 font-medium text-base text-center">
              {errors.form}
            </p>
          )}

          <p className="text-sm text-gray-600 text-center mb-4">
            Die Analyse kostet einmalig <strong>4,90 €</strong> (umsatzsteuerfrei nach § 19 UStG)
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-accent text-white py-4 rounded-2xl font-bold text-button shadow-soft hover:bg-brand transition"
          >
            {loading ? "🔄 Bewertung läuft..." : "Jetzt kostenpflichtig analysieren"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            Du wirst zur sicheren Bezahlung weitergeleitet.
          </p>
          <p className="text-xs text-gray-500 text-center">
            Mit Klick auf „Jetzt kostenpflichtig analysieren“ akzeptierst du unsere <Link href="/agb" className="underline">AGB</Link>.
          </p>
        </form>
      </main>
    </>
  );
}
