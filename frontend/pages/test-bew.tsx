// frontend/pages/test-bew.tsx - Modernes Wizard Design

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { error } from "@/lib/log";
import Layout from "@/components/Layout";
import { Star, CheckCircle, Lock, Zap, ArrowRight, ArrowLeft } from "lucide-react";

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

// Field Interface
interface FormField {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
  halfWidth?: boolean;
  options?: string[];
}

// Step Interface
interface StepData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconBg: string;
  fields: FormField[];
}

// Step-Konfiguration (Wizard-Fortschritt)
const stepData: StepData[] = [
  {
    id: 1,
    title: "Grunddaten",
    subtitle: "Grunddaten deines Pferdes",
    description: "Erzähle uns die wichtigsten Daten zu deinem Pferd",
    icon: "🐎",
    iconBg: "bg-amber-100",
    fields: [
      { 
        name: "rasse", 
        label: "Rasse", 
        required: true, 
        placeholder: "z.B. Deutsches Sportpferd, Hannoveraner, Oldenburger",
        fullWidth: true
      },
      { 
        name: "alter", 
        label: "Alter (Jahre)", 
        type: "number", 
        required: true, 
        placeholder: "z.B. 8",
        halfWidth: true
      },
      { 
        name: "geschlecht", 
        label: "Geschlecht", 
        type: "select", 
        required: true, 
        options: ["Stute", "Wallach", "Hengst"],
        halfWidth: true
      },
      { 
        name: "stockmass", 
        label: "Stockmaß (cm)", 
        type: "number", 
        required: true, 
        placeholder: "z.B. 168",
        fullWidth: true
      },
    ]
  },
  {
    id: 2,
    title: "Details",
    subtitle: "Abstammung & Ausbildung",
    description: "Details zur Leistung und Ausbildung deines Pferdes",
    icon: "🏆",
    iconBg: "bg-blue-100",
    fields: [
      { 
        name: "abstammung", 
        label: "Abstammung (Vater x Muttervater)", 
        required: true, 
        placeholder: "z.B. Cornet Obolensky x Contender",
        fullWidth: true
      },
      { 
        name: "ausbildung", 
        label: "Ausbildungsstand", 
        required: true, 
        placeholder: "z.B. A-Dressur, Springpferde L, angeritten",
        fullWidth: true
      },
      { 
        name: "verwendungszweck", 
        label: "Verwendungszweck", 
        required: false,
        placeholder: "z.B. Freizeit, Turnier, Zucht",
        fullWidth: true
      },
    ]
  },
  {
    id: 3,
    title: "Zusatzinfos",
    subtitle: "Zusätzliche Informationen",
    description: "Optionale Details für eine noch genauere Bewertung",
    icon: "📋",
    iconBg: "bg-green-100",
    fields: [
      { 
        name: "aku", 
        label: "Gesundheitsstatus / AKU-Bericht", 
        required: false,
        placeholder: "z.B. AKU ohne Befund, kleine Befunde",
        fullWidth: true
      },
      { 
        name: "erfolge", 
        label: "Erfolge", 
        required: false,
        placeholder: "z.B. L-Platzierungen Springen, A-Dressur gewonnen",
        fullWidth: true
      },
      { 
        name: "farbe", 
        label: "Farbe", 
        required: false,
        placeholder: "z.B. Fuchs, Rappe, Brauner",
        halfWidth: true
      },
      { 
        name: "standort", 
        label: "Standort", 
        required: false,
        placeholder: "z.B. München oder PLZ",
        halfWidth: true
      },
      { 
        name: "zuechter", 
        label: "Züchter", 
        required: false,
        placeholder: "z.B. Privat oder Zuchtbetrieb XYZ",
        fullWidth: true
      },
    ]
  },
  {
    id: 4,
    title: "Bezahlung",
    subtitle: "Analyse starten",
    description: "Nur noch ein Klick zur professionellen Pferdebewertung",
    icon: "💳",
    iconBg: "bg-purple-100",
    fields: []
  }
];

export default function TestBewPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep = (step: number) => {
    const currentStepData = stepData.find(s => s.id === step);
    if (!currentStepData) return true;

    const newErrors: { [key: string]: string } = {};
    currentStepData.fields.forEach((field) => {
      if (field.required && !form[field.name as keyof FormState]) {
        newErrors[field.name] = "Pflichtfeld";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, stepData.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({});

    if (!consent) {
      setErrors({ form: "Bitte bestätige den Verzicht auf dein Widerrufsrecht." });
      return;
    }

    // Validate all required fields from all steps
    const newErrors: { [key: string]: string } = {};
    stepData.slice(0, 3).forEach(step => {
      step.fields.forEach((field) => {
        if (field.required && !form[field.name as keyof FormState]) {
          newErrors[field.name] = "Pflichtfeld";
        }
      });
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Go back to first step with errors
      for (let i = 0; i < stepData.length - 1; i++) {
        const stepFields = stepData[i].fields.map(f => f.name);
        if (stepFields.some(field => newErrors[field])) {
          setCurrentStep(i + 1);
          break;
        }
      }
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

  const currentStepData = stepData.find(s => s.id === currentStep);

  return (
    <Layout>
      <Head>
        <title>Pferd bewerten & Pferdepreis ermitteln – in 2 Minuten zur fundierten Einschätzung | PferdeWert</title>
        <meta name="description" content="Jetzt dein Pferd bewerten & den realistischen Marktwert online ermitteln – anonym, sicher & direkt als PDF. Ideal bei Pferdekauf & Pferdeverkauf." />
        <link rel="canonical" href="https://pferdewert.de/test-bew" />
      </Head>

      {/* Hero-Bereich */}
      <section className="bg-gradient-to-br from-[#fdf9f4] to-[#fef3c7] py-16 px-6 -mx-4 mb-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Text-Bereich */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Pferd analysieren lassen
            </h1>
            
            {/* Preisbanner */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 p-4 rounded-xl shadow-sm mb-6">
              <p className="text-lg font-semibold text-gray-800">
                💥 Nur <span className="text-red-600 font-bold text-xl">4,90 €</span>
                <span className="line-through text-gray-500 text-base ml-2">statt 39 €</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">Für die ersten 100 Bewertungen!</p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Lock className="w-5 h-5 text-green-600" />
                <span>🔒 Komplett anonym – keine Anmeldung nötig</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>⚡ Ergebnis in unter 2 Minuten</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                <span>📊 Detaillierte PDF-Analyse</span>
              </div>
            </div>
          </div>

          {/* Bild-Bereich */}
          <div className="order-1 md:order-none">
            <Image
              src="/images/blossi-shooting.webp"
              width={600}
              height={400}
              alt="Deutsches Sportpferd für KI-Pferdebewertung"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Wizard-Bereich */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        {/* Step-Indikatoren */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {stepData.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${currentStep >= step.id 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-gray-200 text-gray-500'}
                `}>
                  {step.id}
                </div>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${
                  currentStep >= step.id ? 'text-amber-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < stepData.length - 1 && (
                  <div className={`ml-4 w-8 h-0.5 ${
                    currentStep > step.id ? 'bg-amber-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hauptkarte */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {currentStepData && currentStep <= 3 && (
            <>
              {/* Step Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${currentStepData.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{currentStepData.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentStepData.subtitle}
                </h2>
                <p className="text-gray-600">
                  {currentStepData.description}
                </p>
              </div>

              {/* Formular-Felder */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentStepData.fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                      <label htmlFor={field.name} className="block font-medium mb-2 text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-600 ml-1">*</span>}
                      </label>
                      {field.type === "select" ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={form[field.name as keyof FormState]}
                          onChange={handleChange}
                          className={`w-full p-4 border rounded-xl transition-all ${
                            errors[field.name] ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                          } focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200`}
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
                          className={`w-full p-4 border rounded-xl transition-all ${
                            errors[field.name] ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                          } focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200`}
                        />
                      )}
                      {errors[field.name] && (
                        <p className="mt-2 text-red-600 text-sm flex items-center gap-1">
                          <span className="text-red-500">⚠️</span>
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    currentStep === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Weiter
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Bezahlung-Step */}
          {currentStep === 4 && (
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Analyse starten
                </h2>
                <p className="text-gray-600">
                  Nur noch ein Klick zur professionellen Pferdebewertung
                </p>
              </div>

              {/* Zusammenfassung */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Deine Eingaben:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">Rasse:</span> {form.rasse || "Nicht angegeben"}</div>
                  <div><span className="font-medium">Alter:</span> {form.alter || "Nicht angegeben"} Jahre</div>
                  <div><span className="font-medium">Geschlecht:</span> {form.geschlecht || "Nicht angegeben"}</div>
                  <div><span className="font-medium">Stockmaß:</span> {form.stockmass || "Nicht angegeben"} cm</div>
                </div>
              </div>

              {/* Einverständnis */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    required
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Ich stimme ausdrücklich zu, dass die Analyse sofort beginnt, und bestätige mein Erlöschen des Widerrufsrechts gemäß § 356 Abs. 5 BGB.
                  </span>
                </label>
              </div>

              {/* Fehleranzeige */}
              {errors.form && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-700 font-medium text-center">
                    {errors.form}
                  </p>
                </div>
              )}

              {/* Preis */}
              <div className="text-center mb-6">
                <p className="text-lg text-gray-700">
                  Die Analyse kostet einmalig <strong className="text-amber-600 text-xl">4,90 €</strong>
                </p>
                <p className="text-sm text-gray-500">(umsatzsteuerfrei nach § 19 UStG)</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !consent}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Einen Moment – deine Analyse wird vorbereitet…
                  </div>
                ) : (
                  "Jetzt kostenpflichtig analysieren"
                )}
              </button>

              {loading && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  Bitte einen Moment Geduld – du wirst zur sicheren Zahlung bei Stripe weitergeleitet…
                </p>
              )}

              {/* Legal Info */}
              <div className="text-center mt-6 space-y-2">
                <p className="text-xs text-gray-500">
                  Du wirst zur sicheren Bezahlung weitergeleitet.
                </p>
                <p className="text-xs text-gray-500">
                  Mit Klick auf „Jetzt kostenpflichtig analysieren" akzeptierst du unsere{" "}
                  <Link href="/agb" className="underline hover:text-gray-700">
                    AGB
                  </Link>.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-start mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-16 px-4 -mx-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Das sagen unsere Kunden
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 leading-relaxed">
                "Ich wollte mein Pferd verkaufen und war unsicher beim Preis. Die Bewertung hat mir sehr geholfen eine Einschätzung zu bekommen und ich konnte mein Pferd auch zu dem empfohlenen Preis verkaufen!"
              </blockquote>
              <cite className="text-sm text-gray-600 font-semibold not-italic">
                - Sarah M., Freizeitreiterin
              </cite>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 leading-relaxed">
                "Vor dem Pferdekauf wollte ich wissen, ob der angegebene Preis fair ist. Die PferdeWert-Analyse war sehr detailliert und hat mir bei der Preisverhandlung sehr geholfen."
              </blockquote>
              <cite className="text-sm text-gray-600 font-semibold not-italic">
                - Michael K., Hobbyreiter
              </cite>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 leading-relaxed">
                "Ich besitze ein Pferd und wollte einfach nur aus Neugier den aktuellen Marktwert wissen. Super interessant was PferdeWert als Ergebnis bereitstellt, vor allem auch die Analyse der Abstammung fand ich sehr spannend!"
              </blockquote>
              <cite className="text-sm text-gray-600 font-semibold not-italic">
                - Anna L., Pferdebesitzerin
              </cite>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}