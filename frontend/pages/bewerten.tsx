// frontend/pages/bewerten.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { error } from "@/lib/log";
import Layout from "@/components/Layout";
import { Star, CheckCircle, Lock, Zap, ArrowRight, ArrowLeft } from "lucide-react";

interface FormState {
  rasse: string;
  abstammung: string;
  einsatzgebiet: string;
  geburtsjahr: string;
  stockmaß: string;
  farbe: string;
  ausbildung: string;
  preise: string;
  besonderheiten: string;
  zuechter: string;
  standort: string;
}

const initialForm: FormState = {
  rasse: "",
  abstammung: "",
  einsatzgebiet: "",
  geburtsjahr: "",
  stockmaß: "",
  farbe: "",
  ausbildung: "",
  preise: "",
  besonderheiten: "",
  zuechter: "",
  standort: "",
};

export default function Bewerten() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const savedForm = localStorage.getItem("bewertungForm");
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm);
        setForm(parsedForm);
      } catch (e) {
        console.warn("Fehler beim Wiederherstellen des Formulars:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bewertungForm", JSON.stringify(form));
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (window.gtag) {
      window.gtag("event", "start_bewertung", {
        event_category: "Funnel",
        event_label: "Formular abgeschickt",
        value: 1,
      });
    }
    e.preventDefault();
    setErrors({});

    if (!consent) {
      setErrors({ form: "Bitte bestätige den Verzicht auf dein Widerrufsrecht." });
      return;
    }

    const requiredFields: (keyof FormState)[] = [
      "rasse", "abstammung", "einsatzgebiet", "geburtsjahr", "stockmaß", "ausbildung"
    ];

    const newErrors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = "Pflichtfeld";
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
        body: JSON.stringify({ text: JSON.stringify(form) }),
      });

      if (res.ok) {
        const { url } = await res.json();
        localStorage.removeItem("bewertungForm");
        window.location.href = url;
      } else {
        const { error } = await res.json();
        setErrors({ form: error || "Fehler beim Starten der Bewertung." });
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? "Die Verbindung zum Server ist fehlgeschlagen. Bitte versuche es in einer Minute erneut."
          : "Ein unerwarteter Fehler ist aufgetreten.";
      error("Fehler beim Starten der Bewertung", err);
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Pferd bewerten – PferdeWert</title>
        <meta name="description" content="Jetzt dein Pferd bewerten & den realistischen Marktwert ermitteln – anonym, sicher & direkt als PDF." />
      </Head>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Pferd bewerten</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(initialForm).map(([key, _]) => (
            <div key={key}>
              <label htmlFor={key} className="block font-medium mb-1 capitalize">
                {key} {(key === "rasse" || key === "abstammung" || key === "einsatzgebiet" || key === "geburtsjahr" || key === "stockmaß" || key === "ausbildung") && <span className="text-red-600">*</span>}
              </label>
              <input
                id={key}
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl transition ${errors[key] ? "border-red-500" : "border-gray-300"} focus:border-amber-500 focus:outline-none`}
              />
              {errors[key] && <p className="text-sm text-red-600 mt-1">{errors[key]}</p>}
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

          {errors.form && <p className="text-red-600 font-medium text-center">{errors.form}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
          >
            {loading ? "Lade…" : "Jetzt kostenpflichtig analysieren"}
          </button>
        </form>
      </main>
    </Layout>
  );
}
