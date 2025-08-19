// frontend/pages/pferde-preis-berechnen.tsx - Modernes Design basierend auf index.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { error, warn } from "@/lib/log";
import Layout from "@/components/Layout";
import { Star, ArrowRight, ArrowLeft, Clock, Shield, CheckCircle } from "lucide-react";
import { PRICING_FORMATTED } from "../lib/pricing";

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

// Preise aus zentraler Konfiguration werden über Import geladen

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

export default function PferdePreisBerechnenPage(): React.ReactElement {
  // Alle Hooks MÜSSEN vor jeglichen return-Statements stehen
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [consent, setConsent] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // LocalStorage-Key mit Namespace für bessere Kollisionsvermeidung
  const STORAGE_KEY = "PW_bewertungForm";

  // Formular bei Start wiederherstellen
  useEffect(() => {
    if (!isMounted) return;
    
    const savedForm = localStorage.getItem(STORAGE_KEY);
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm) as FormState;
        setForm(parsedForm);
        // Form restored from localStorage
      } catch (e) {
        warn("Fehler beim Wiederherstellen des Formulars:", e);
      }
    }
  }, [isMounted]);

  // Throttled localStorage save to reduce performance impact
  useEffect(() => {
    if (!isMounted) return;
    
    const saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    }, 500); // Throttle saves to every 500ms

    return () => clearTimeout(saveTimer);
  }, [form, isMounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
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

  // Mobile viewport constants
  const MOBILE_BREAKPOINT = 768;
  const MOBILE_TOP_OFFSET = 20;

  // Optimierte Scroll-Funktion für bessere Mobile-Erfahrung
  const scrollToFormCard = (): void => {
    try {
      requestAnimationFrame(() => {
        if (!isMounted) return;

        const wizardCard = document.querySelector('#wizard-card') as HTMLElement;
        if (!wizardCard) {
          warn("Wizard card element not found for scrolling");
          return;
        }

        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

        if (isMobile) {
          // Auf Mobile: Scroll so dass die gesamte Karte sichtbar ist
          const cardRect = wizardCard.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const cardHeight = cardRect.height;

          // Berechne ideale Scroll-Position
          const idealScrollTop = window.scrollY + cardRect.top - MOBILE_TOP_OFFSET;

          // Überprüfe ob die ganze Karte in den Viewport passt
          if (cardHeight + MOBILE_TOP_OFFSET * 2 <= viewportHeight) {
            // Karte passt komplett: Zentriere sie im Viewport
            const centeredScrollTop = window.scrollY + cardRect.top - (viewportHeight - cardHeight) / 2;
            window.scrollTo({
              top: Math.max(0, centeredScrollTop),
              behavior: 'smooth'
            });
          } else {
            // Karte ist zu groß: Positioniere sie so, dass sie oben beginnt
            window.scrollTo({
              top: Math.max(0, idealScrollTop),
              behavior: 'smooth'
            });
          }
        } else {
          // Desktop: Scroll zum ersten Eingabefeld (bisheriges Verhalten)
          const firstField = document.querySelector('#wizard-card input, #wizard-card select, #wizard-card textarea') as HTMLElement;
          if (firstField) {
            firstField.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest"
            });
          } else {
            warn("First form field not found for desktop scrolling");
          }
        }
      });
    } catch (error) {
      warn("Error in scrollToFormCard function:", error);
    }
  };
  // Nächster Schritt Definition mit verbessertem Mobile Scroll-Verhalten
  const nextStep = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => {
        const next = Math.min(prev + 1, stepData.length);
        scrollToFormCard();
        return next;
      });
    }
  };

  const prevStep = (): void => {
    setCurrentStep(prev => {
      const newStep = Math.max(prev - 1, 1);
      scrollToFormCard();
      return newStep;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
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
        const data = await res.json() as { url: string };
        const { url } = data;
        // Formular aus localStorage löschen bei erfolgreicher Einreichung
        if (isMounted) {
          localStorage.removeItem(STORAGE_KEY);
          // Form successfully submitted - localStorage cleared
        }
        window.location.href = url;
      } else {
        const errorData = await res.json() as { error?: string };
        setErrors({ form: errorData.error || "Fehler beim Starten der Bewertung." });
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

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConsent(e.target.checked);
  };

  const currentStepData = stepData.find(s => s.id === currentStep);

  // isMounted useEffect für client-only features
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Pferd bewerten & Pferdepreis ermitteln – in 2 Minuten zur fundierten Einschätzung | PferdeWert</title>
        <meta name="description" content="Jetzt dein Pferd bewerten & den realistischen Marktwert online ermitteln – anonym, sicher & direkt als PDF. Ideal bei Pferdekauf & Pferdeverkauf." />
        <meta property="og:image" content="https://pferdewert.de/images/result.webp" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content="PferdeWert - Professionelle Pferdebewertung" />
        <link rel="canonical" href="https://pferdewert.de/pferde-preis-berechnen"/>
        
        {/* Performance optimizations */}
        <link rel="preload" href="/images/result.webp" as="image" />
        <link rel="dns-prefetch" href="//js.stripe.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
      </Head>

      {/* Note: Animations moved to globals.css for better performance */}

      {/* Hero-Bereich mit fullWidth Layout wie index.tsx */}
      <section id="preise" className="relative overflow-hidden">
        <div className="px-4 lg:px-8 xl:px-12 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text-Bereich - Links mit fade-in */}
            <div className="space-y-8 hero-fade-in-left">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-brand-brown/10 text-brand-brown rounded-full text-sm font-semibold">
                  🐎 Professionelle Pferdebewertung
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Pferd analysieren
                </h1>
                
                {/* Preisbanner mit neuem Design */}
                <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 border-2 border-amber-300 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔥</span>
                    <p className="text-xl font-bold text-gray-800">
                      Nur <span className="text-3xl text-red-600 font-black">{PRICING_FORMATTED.current}</span>
                      <span className="line-through text-gray-500 text-lg ml-3">statt {PRICING_FORMATTED.decoy}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Exklusiv in der Sommer-Aktion!</p>
                </div>

                {/* Features mit Icons */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Shield className="w-5 h-5 text-brand-brown flex-shrink-0" />
                    <span className="font-medium">Komplett anonym – keine Anmeldung nötig</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-brand-brown flex-shrink-0" />
                    <span className="font-medium">Ergebnis in unter 2 Minuten</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-brand-brown flex-shrink-0" />
                    <span className="font-medium">Detaillierte PDF-Analyse</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bild-Bereich - Rechts mit fade-in */}
            <div className="relative hero-fade-in-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/result.webp"
                  width={600}
                  height={400}
                  alt="Deutsches Sportpferd für KI-Pferdebewertung"
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 480px) 400px, (max-width: 768px) 500px, (max-width: 1200px) 600px, 600px"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard-Bereich mit fullWidth Layout und fade-in */}
      <section id="wizard-start" className="py-8 lg:py-16">
        <div className="px-4 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto wizard-fade-in">
            {/* Step-Indikatoren */}
            <div id="wizard-progress" className="mb-8 sticky top-0 bg-white/90 backdrop-blur-sm z-30 py-4 rounded-2xl">
              <div className="flex items-center justify-center space-x-2 sm:space-x-8">
                {stepData.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`
                      w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                      ${currentStep >= step.id 
                        ? 'bg-brand-brown text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'}
                    `}>
                      {step.id}
                    </div>
                    <span className={`ml-2 text-xs sm:text-sm font-medium hidden sm:block transition-colors ${
                      currentStep >= step.id ? 'text-brand-brown' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < stepData.length - 1 && (
                      <div className={`ml-2 w-4 sm:ml-4 sm:w-8 h-0.5 transition-colors ${
                        currentStep > step.id ? 'bg-brand-brown' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Hauptkarte */}
            <div id="wizard-card" className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {currentStepData && currentStep <= 3 && (
                <>
                  {/* Step Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${currentStepData.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl">{currentStepData.icon}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      {currentStepData.subtitle}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {currentStepData.description}
                    </p>
                  </div>

                  {/* Formular-Felder */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentStepData.fields.map((field) => (
                        <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                          <label htmlFor={field.name} className="block font-semibold mb-3 text-gray-700 text-lg">
                            {field.label}
                            {field.required && <span className="text-red-600 ml-1">*</span>}
                          </label>
                          {field.type === "select" ? (
                            <select
                              id={field.name}
                              name={field.name}
                              value={form[field.name as keyof FormState]}
                              onChange={handleChange}
                              className={`w-full p-4 border rounded-2xl transition-all text-lg ${
                                errors[field.name] 
                                  ? "border-red-500 bg-red-50" 
                                  : "border-gray-300 hover:border-brand-brown focus:border-brand-brown"
                              } focus:outline-none focus:ring-4 focus:ring-amber-100`}
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
                              inputMode={field.type === "number" ? "decimal" : undefined}
                              pattern={field.type === "number" ? "[0-9]*" : undefined}
                              min={field.type === "number" ? "0" : undefined}
                              placeholder={field.placeholder}
                              className={`w-full p-4 border rounded-2xl transition-all text-lg ${
                                errors[field.name] 
                                  ? "border-red-500 bg-red-50" 
                                  : "border-gray-300 hover:border-brand-brown focus:border-brand-brown"
                              } focus:outline-none focus:ring-4 focus:ring-amber-100`}
                            />
                          )}
                          {errors[field.name] && (
                            <p className="mt-2 text-red-600 text-sm flex items-center gap-2">
                              <span className="text-red-500">⚠️</span>
                              {errors[field.name]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 gap-4">
                    {/* Zurück */}
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`btn-secondary relative px-4 py-3 text-sm md:px-6 md:py-4 md:text-base rounded-2xl transition-transform ${
                        currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                      }`}
                      aria-label="Zum vorherigen Schritt zurückgehen"
                    >
                      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                      <span className="hidden sm:inline ml-2">Zurück</span>
                    </button>

                    {/* Weiter */}
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary relative px-4 py-3 text-sm md:px-6 md:py-4 md:text-base rounded-2xl hover:scale-105 transition-transform"
                      aria-label="Zum nächsten Schritt weitergehen"
                    >
                      <span className="hidden sm:inline mr-2">Weiter</span>
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </>
              )}

              {/* Bezahlung-Step */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit}>
                  {/* Sticky Submit Button auf Mobile */}
                  <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl px-4 py-4 z-40 md:hidden border-t">
                    <button
                      type="submit"
                      disabled={loading || !consent}
                      className="w-full bg-brand-brown hover:bg-brand-brownDark text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Wird vorbereitet…
                        </div>
                      ) : (
                        "Jetzt kostenpflichtig analysieren"
                      )}
                    </button>
                  </div>

                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💳</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      Analyse starten
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Nur noch ein Klick zur professionellen Pferdebewertung
                    </p>
                  </div>

                  {/* Einverständnis */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={handleConsentChange}
                        className="mt-1 w-5 h-5 text-brand-brown border-gray-300 rounded focus:ring-brand-brown focus:ring-2"
                        required
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Ich stimme ausdrücklich zu, dass die Analyse sofort beginnt, und bestätige mein Erlöschen des Widerrufsrechts gemäß § 356 Abs. 5 BGB.
                      </span>
                    </label>
                  </div>

                  {/* Fehleranzeige */}
                  {errors.form && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
                      <p className="text-red-700 font-medium text-center">
                        {errors.form}
                      </p>
                    </div>
                  )}

                  {/* Preis */}
                  <div className="text-center mb-8">
                    <p className="text-xl text-gray-700 mb-2">
                      Die Analyse kostet einmalig
                    </p>
                    <div className="text-4xl font-black text-brand-brown mb-2">
                      {PRICING_FORMATTED.current}
                    </div>
                    <p className="text-sm text-gray-500">(umsatzsteuerfrei nach § 19 UStG)</p>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !consent}
                    className="w-full bg-brand-brown hover:bg-brand-brownDark text-white py-4 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hidden md:block hover:scale-105"
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
                      Mit Klick auf &quot;Jetzt kostenpflichtig analysieren&quot; akzeptierst du unsere{" "}
                      <Link href="/agb" className="underline hover:text-gray-700 transition-colors">
                        AGB
                      </Link>.
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-start mt-8 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-2xl font-medium transition-all"
                      aria-label="Zum vorherigen Schritt zurückgehen"
                    >
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      Zurück
                    </button>
                  </div>
                  
                  {/* Abstand für Sticky-Button auf Mobile */} 
                  <div className="h-32 md:hidden" />
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Trust-Sektion direkt unter dem Wizard - kleiner natürlicher Abstand */}
        <div className="px-4 lg:px-8 xl:px-12 pt-6 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <Shield className="w-4 h-4" />
                  <span>SSL-verschlüsselt</span>
                </div>
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Geld-zurück-Garantie</span>
                </div>
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.7/5 Sterne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof mit fullWidth Layout */}
      <section id="vorteile" className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 lg:py-24">
        <div className="px-4 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-12">
              Das sagen unsere Kunden
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  Ich wollte mein Pferd verkaufen und war unsicher beim Preis. Die Bewertung hat mir sehr geholfen eine Einschätzung zu bekommen und ich konnte mein Pferd auch zu dem empfohlenen Preis verkaufen!
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold not-italic">
                  - Sarah M., Freizeitreiterin
                </cite>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  Vor dem Pferdekauf wollte ich wissen, ob der angegebene Preis fair ist. Die PferdeWert-Analyse war sehr detailliert und hat mir bei der Preisverhandlung sehr geholfen.
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold not-italic">
                  - Michael K., Hobbyreiter
                </cite>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  Ich besitze ein Pferd und wollte einfach nur aus Neugier den aktuellen Marktwert wissen. Super interessant was PferdeWert als Ergebnis bereitstellt, vor allem auch die Analyse der Abstammung fand ich sehr spannend!
                </blockquote>
                <cite className="text-sm text-gray-600 font-semibold not-italic">
                  - Anna L., Pferdebesitzerin
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}