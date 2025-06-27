// Diese Datei repräsentiert die Seite /bewerten.tsx mit erweitertem UX-Hinweis bei Pflichtfeldfehlern

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

const fields = [
  { name: "rasse", label: "Rasse", required: true },
  { name: "alter", label: "Alter (Jahre)", type: "number", required: true },
  {
    name: "geschlecht",
    label: "Geschlecht",
    type: "select",
    required: true,
    options: ["Stute", "Wallach", "Hengst"],
  },
  {
    name: "abstammung",
    label: "Abstammung (Vater x Muttervater)",
    required: true,
    placeholder: "z. B. Cornet Obolensky x Contender",
  },
  {
    name: "stockmass",
    label: "Stockmaß (cm)",
    type: "number",
    required: true,
  },
  {
    name: "ausbildung",
    label: "Ausbildungsstand",
    required: true,
    placeholder: "z. B. A-Dressur, Springpferde L, angeritten",
  },
  {
    name: "aku",
    label: "Gesundheitsstatus / AKU-Bericht",
    placeholder: "z. B. AKU ohne Befund",
  },
  {
    name: "erfolge",
    label: "Erfolge",
    placeholder: "z. B. L-Platzierungen Springen, A-Dressur gewonnen",
  },
  {
    name: "farbe",
    label: "Farbe",
    placeholder: "z. B. Fuchs, Rappe, Brauner",
  },
  {
    name: "zuechter",
    label: "Züchter",
    placeholder: "z. B. Privat oder Zuchtbetrieb XYZ",
  },
  {
    name: "standort",
    label: "Standort",
    placeholder: "z. B. München oder PLZ",
  },
  {
    name: "verwendungszweck",
    label: "Verwendungszweck",
    placeholder: "z. B. Freizeit, Turnier, Zucht",
  },
];


export default function Bewerten() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    setSubmitted(true);
    setErrors({});

    if (!consent) {
      setErrors({ form: "Bitte bestätige den Verzicht auf dein Widerrufsrecht." });
      return;
    }

    const newErrors: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (field.required && !form[field.name as keyof FormState]) {
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
        body: JSON.stringify({ text: JSON.stringify(form) }),
      });

      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url;
      } else {
        const { error } = await res.json();
        setErrors({ form: error || "Fehler beim Starten der Bewertung." });
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? "Die Verbindung zum Server ist fehlgeschlagen. Bitte versuche es in einer Minute erneut oder wende dich an info@pferdewert.de."
          : "Ein unerwarteter Fehler ist aufgetreten.";
      error("Fehler beim Starten der Bewertung", err);
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
  <title>Pferd bewerten & Marktwert ermitteln – fundierte Einschätzung | PferdeWert</title>
  <meta name="description" content="Jetzt Pferd bewerten & Marktwert ermitteln – schnell, anonym & sicher. Ideal bei Pferdekauf und Pferdeverkauf." />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Pferd bewerten & Marktwert ermitteln – fundierte Einschätzung | PferdeWert" />
  <meta property="og:description" content="Jetzt Pferd bewerten & Marktwert ermitteln – schnell, anonym & sicher. Ideal bei Pferdekauf und Pferdeverkauf." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pferdewert.de/bewerten" />
  <meta property="og:image" content="https://pferdewert.de/images/hero.webp" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Pferd bewerten & Marktwert ermitteln – fundierte Einschätzung | PferdeWert" />
  <meta name="twitter:description" content="Jetzt Pferd bewerten & Marktwert ermitteln – schnell, anonym & sicher. Ideal bei Pferdekauf und Pferdeverkauf." />
  <meta name="twitter:image" content="https://pferdewert.de/images/hero.webp" />

  {/* Strukturierte Daten */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Pferd bewerten & Marktwert ermitteln – fundierte Einschätzung",
      "description": "Jetzt Pferd bewerten & Marktwert ermitteln – schnell, anonym & sicher. Ideal bei Pferdekauf und Pferdeverkauf.",
      "url": "https://pferdewert.de/bewerten"
    }
    `}
  </script>
</Head>



      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Pferd analysieren lassen</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          🔒 Keine Anmeldung nötig – deine Eingaben bleiben anonym und werden nicht gespeichert.
        </p>

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
                  value={form[field.name as keyof FormState]}
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
                  value={form[field.name as keyof FormState]}
                  onChange={handleChange}
                  autoComplete="off"
                  inputMode={field.type === "number" ? "numeric" : undefined}
                  placeholder={field.placeholder}
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

          {Object.keys(errors).some((key) => key !== "form") && submitted && (
            <p className="text-red-600 text-center font-medium mt-2">
              Bitte fülle alle markierten Pflichtfelder aus.
            </p>
          )}

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
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                Einen Moment – deine Analyse wird vorbereitet…
              </>
            ) : (
              "Jetzt kostenpflichtig analysieren"
            )}
          </button>

          {loading && (
            <p className="text-sm text-gray-500 text-center mt-4">
              Bitte einen Moment Geduld – du wirst zur sicheren Zahlung bei Stripe weitergeleitet…
            </p>
          )}

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
