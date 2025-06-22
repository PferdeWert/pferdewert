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
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const val = form[f.name];
      const err = validateField(f.name, val);
      if (err) newErrors[f.name] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: JSON.stringify(form) }),
      });

      const json = await res.json();

      if (json.url) {
        window.location.href = json.url;
      } else {
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

  return (
    <>
      <Head>
        <title>Pferd bewerten – PferdeWert</title>
        <meta name="description" content="Jetzt Pferd bewerten lassen – KI-gestützt, anonym und in 30 Sekunden. PferdeWert ist Marktführer für digitale Pferdebewertung." />
      </Head>

      <main className="bg-brand-light min-h-screen py-20 px-4">
        <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-soft p-8 border border-brand/10">
          <h1 className="text-h1 font-serif font-bold text-brand mb-6">
            Jetzt Pferd bewerten
          </h1>
          <p className="text-brand mb-8 text-base">
            Gib die Eckdaten deines Pferdes ein.<br />
            Unsere KI analysiert sofort den aktuellen Marktwert – <strong>individuell, anonym & in unter 1 Minute.</strong>
          </p>
console.log("🚧 Formular wird gerendert");

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block font-medium text-brand mb-1">
                  {field.label}
                  {field.required && <span className="text-red-600"> *</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    autoComplete="off"
                    className={`w-full p-3 border rounded-xl transition ${
                      errors[field.name] ? "border-red-500" : "border-gray-300"
                    } focus:border-brand-accent focus:outline-none`}
                  >
                    <option value="">Bitte wählen</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    inputMode={field.type === "number" ? "numeric" : undefined}
                    autoComplete="off"
                    value={form[field.name]}
                    onChange={handleChange}
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

            {errors.form && (
              <p className="text-red-600 font-medium text-base">{errors.form}</p>
            )}

            <button
  type="submit"
  onClick={() => console.log("✅ Button-Klick")}
>
  Klick-Test
</button>
          </form>
        </div>
      </main>
    </>
  );
}
