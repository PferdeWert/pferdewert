//frontend/pages/bewerten.tsx
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { error } from "@/lib/log";
import Layout from "@/components/Layout";
import { BewertungSchema } from '@/lib/bewertung-schema';
import { loadStripe } from '@stripe/stripe-js';

// Optimiertes FormState Interface mit null für leere Number-Felder
interface FormState {
  rasse: string;
  alter: number | null;        // null = leer, number = Wert
  geschlecht: string;
  abstammung: string;
  stockmass: number | null;    // null = leer, number = Wert
  ausbildung: string;
  aku: string;
  erfolge: string;
  farbe: string;
  zuechter: string;
  standort: string;
  verwendungszweck: string;
}

// Optimiertes initialForm - Numbers starten als null (= leer)
const initialForm: FormState = {
  rasse: "",
  alter: null,             // Startet visuell leer
  geschlecht: "",
  abstammung: "",
  stockmass: null,         // Startet visuell leer
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
    placeholder: "z. B. Cornet Obolensky x Contender",
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
    placeholder: "z. B. A-Dressur, Springpferde L, angeritten",
  },
  {
    name: "aku",
    label: "Gesundheitsstatus / AKU-Bericht",
    placeholder: "z. B. AKU ohne Befund",
  },
  {
    name: "erfolge",
    label: "Erfolge",
    placeholder: "z. B. L-Platzierungen Springen, A-Dressur gewonnen",
  },
  {
    name: "farbe",
    label: "Farbe",
    placeholder: "z. B. Fuchs, Rappe, Brauner",
  },
  {
    name: "zuechter",
    label: "Züchter",
    placeholder: "z. B. Privat oder Zuchtbetrieb XYZ",
  },
  {
    name: "standort",
    label: "Standort",
    placeholder: "z. B. München oder PLZ",
  },
  {
    name: "verwendungszweck",
    label: "Verwendungszweck",
    placeholder: "z. B. Freizeit, Turnier, Zucht",
  },
];

export default function Bewerten() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Optimiertes handleChange mit besserer Number-Behandlung
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setForm(prev => ({
      ...prev,
      [name]: ['alter', 'stockmass'].includes(name) 
        ? (value === "" ? null : Number(value)) // Leerer String → null, sonst Number
        : value
    }));
  };

  // Fokus-Management: Bei Fehlern zum ersten Fehlerfeld springen
  useEffect(() => {
    if (Object.keys(errors).length > 0 && submitted) {
      const firstErrorField = Object.keys(errors).find(key => key !== "form");
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.focus();
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [errors, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // SOFORT verhindern (vor Analytics)
    setSubmitted(true);
    setErrors({});

    // Analytics nach preventDefault (sicherer)
    if (window.gtag) {
      window.gtag("event", "start_bewertung", {
        event_category: "Funnel",
        event_label: "Formular abgeschickt",
        value: 1,
      });
    }

    if (!consent) {
      setErrors({ form: "Bitte bestätige den Verzicht auf dein Widerrufsrecht." });
      return;
    }

    // Daten für Backend vorbereiten (null → number transformation)
    const dataForValidation = {
      ...form,
      alter: form.alter ?? 0,     // null → 0 für Zod (wird dann als fehlerhafte Eingabe erkannt)
      stockmass: form.stockmass ?? 0,
    };

    // Zod-Validierung mit transformierten Daten
    try {
      BewertungSchema.parse(dataForValidation);
    } catch (zodError: any) {
      console.error("Zod-Validierungsfehler:", zodError);
      const fieldErrors: { [key: string]: string } = {};
      
      // Zod-Fehler in benutzerfreundliche deutsche Nachrichten umwandeln
      if (zodError.errors) {
        zodError.errors.forEach((error: any) => {
          const fieldName = error.path[0];
          if (fieldName === 'alter') {
            fieldErrors[fieldName] = "Alter muss zwischen 1 und 50 Jahren liegen";
          } else if (fieldName === 'stockmass') {
            fieldErrors[fieldName] = "Stockmaß muss zwischen 100 und 220 cm liegen";
          } else {
            fieldErrors[fieldName] = error.message;
          }
        });
      }
      
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        return;
      } else {
        setErrors({ form: "Bitte überprüfe deine Eingaben." });
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForValidation), // Transformierte Daten senden
      });

      if (res.ok) {
        const { sessionId } = await res.json();
        
        // Moderner Stripe SDK Redirect
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        
        if (stripe) {
          const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
          
          if (stripeError) {
            console.error("Stripe redirect error:", stripeError);
            setErrors({ form: "Fehler beim Weiterleiten zur Zahlung. Bitte versuche es erneut." });
          }
        } else {
          setErrors({ form: "Stripe konnte nicht geladen werden. Bitte versuche es erneut." });
        }
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
    <Layout>
      <Head>
        <title>Pferd bewerten & Pferdepreis ermitteln – in 2 Minuten zur fundierten Einschätzung | PferdeWert</title>
        <meta name="description" content="Jetzt dein Pferd bewerten & den realistischen Marktwert online ermitteln – anonym, sicher & direkt als PDF. Ideal bei Pferdekauf & Pferdeverkauf." />

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
        <link rel="canonical" href="https://pferdewert.de/bewerten" />
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
                  value={String(form[field.name as keyof FormState] || "")}
                  onChange={handleChange}
                  required={field.required} // HTML5 Validierung
                  aria-required={field.required} // Accessibility
                  aria-invalid={!!errors[field.name]} // Screenreader-Info
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
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
                  value={
                    ['alter', 'stockmass'].includes(field.name)
                      ? (form[field.name as keyof FormState] === null ? "" : String(form[field.name as keyof FormState]))
                      : String(form[field.name as keyof FormState] || "")
                  }
                  onChange={handleChange}
                  required={field.required} // HTML5 Validierung
                  aria-required={field.required} // Accessibility
                  aria-invalid={!!errors[field.name]} // Screenreader-Info
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  autoComplete="off"
                  inputMode={field.type === "number" ? "numeric" : undefined}
                  placeholder={field.placeholder}
                  className={`w-full p-3 border rounded-xl transition ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } focus:border-brand-accent focus:outline-none`}
                />
              )}
              {errors[field.name] && (
                <p 
                  id={`${field.name}-error`}
                  role="alert" // Sofortige Screenreader-Ansage
                  className="mt-1 text-red-600 text-sm"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="text-sm text-gray-700">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required // HTML5 Validierung
                className="mt-1"
              />
              <span>
                Ich stimme ausdrücklich zu, dass die Analyse sofort beginnt, und bestätige mein Erlöschen des Widerrufsrechts gemäß § 356 Abs. 5 BGB.
              </span>
            </label>
          </div>

          {Object.keys(errors).some((key) => key !== "form") && submitted && (
            <div 
              role="alert" // Accessibility für Fehlerzusammenfassung
              className="text-red-600 text-center font-medium mt-2 p-3 bg-red-50 rounded-lg border border-red-200"
            >
              Es gibt Probleme mit {Object.keys(errors).filter(key => key !== "form").length} Eingabefeld(ern). Bitte überprüfe die markierten Felder.
            </div>
          )}

          {errors.form && (
            <div 
              role="alert" // Accessibility
              className="text-red-600 font-medium text-base text-center p-3 bg-red-50 rounded-lg border border-red-200"
            >
              {errors.form}
            </div>
          )}

          <p className="text-sm text-gray-600 text-center mb-4">
            Die Analyse kostet einmalig <strong>4,90 €</strong> (umsatzsteuerfrei nach § 19 UStG)
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-accent text-white py-4 rounded-2xl font-bold text-button shadow-soft hover:bg-brand transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span 
                  className="inline-block animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  aria-hidden="true" // Versteckt vor Screenreadern
                ></span>
                <span className="sr-only">Lädt...</span> {/* Nur für Screenreader */}
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
            Mit Klick auf „Jetzt kostenpflichtig analysieren" akzeptierst du unsere <Link href="/agb" className="underline" rel="noopener noreferrer">AGB</Link>.
          </p>
        </form>
      </main>
    </Layout>
  );
}