// frontend/pages/pferde-preis-berechnen.tsx - Modernes Design basierend auf index.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { error, warn, info } from "@/lib/log";
import Layout from "@/components/Layout";
import { ServiceReviewSchema } from "@/components/PferdeWertReviewSchema";
import { ServicePageSchema } from "@/components/PferdeWertServiceSchema";
import { Star, ArrowRight, ArrowLeft, Clock, Shield, CheckCircle, Instagram } from "lucide-react";
import { PRICING_FORMATTED } from "../lib/pricing";
import { 
  trackValuationStart, 
  trackFormProgress, 
  trackPaymentStart, 
  calculateFormCompletionTime 
} from "@/lib/analytics";

interface FormState {
  rasse: string;
  alter: string;
  geschlecht: string;
  abstammung: string;
  stockmass: string;
  ausbildung: string;
  aku: string;
  erfolge: string;
  standort: string;
  haupteignung: string;  // NEU: ersetzt verwendungszweck
  charakter?: string;    // NEU: optional
  besonderheiten?: string; // NEU: optional
  attribution_source?: string; // Attribution tracking
}

interface RealTestimonial {
  name: string;
  location: string;
  role: string;
  photo: string;
  instagramHandle?: string;
  quote: string;
  verifiedDate: string;
  rating: number;
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
  standort: "",
  haupteignung: "",
  charakter: "",
  besonderheiten: "",
  attribution_source: "",
};

// Real testimonials data
const realTestimonials: RealTestimonial[] = [
  {
    name: "Miriam F.",
    location: "Deutschland",
    role: "Ambitionierte Freizeitreiterin (Dressur)",
    photo: "/images/testimonials/miriam-customer-64.webp",
    instagramHandle: "herzenspferd_felino",
    quote: "Nach einem Jahr gemeinsamer Zeit war ich neugierig, wie mein Pferd aktuell bewertet wird. Die Bewertung über PferdeWert war für mich eine tolle Möglichkeit, eine realistische Einschätzung zu bekommen – unkompliziert, nachvollziehbar und professionell. Wer wissen möchte, was das eigene Pferd wirklich wert ist, findet bei PferdeWert eine durchdachte und fachlich fundierte Einschätzung. Besonders gut: Es wird nicht nur pauschal bewertet, sondern auch individuell auf Abstammung und Gesundheitsstatus eingegangen.",
    verifiedDate: "2024-01-15",
    rating: 5
  },
  {
    name: "Eva T.",
    location: "Deutschland",
    role: "Besitzerin von Fürstiano",
    photo: "/images/testimonials/eva-customer-64.webp",
    instagramHandle: "die_rappenschmiede",
    quote: "Nach einer Verletzung von Fürstiano war ich unsicher über seinen aktuellen Marktwert. Die PferdeWert-Analyse war super einfach auszufüllen und das Ergebnis kam sofort. Besonders hilfreich fand ich die detaillierte Aufschlüsselung der Bewertungsfaktoren - das hat mir wirklich geholfen, die Situation realistisch einzuschätzen. Auch wenn für mich mein Pferd unbezahlbar bleibt, war es interessant zu wissen, wo er marktmäßig steht.",
    verifiedDate: "2024-12-20",
    rating: 5
  },
  {
    name: "Denise B.",
    location: "Deutschland",
    role: "von energy_emotion",
    photo: "/images/testimonials/denise-customer-64.webp",
    instagramHandle: "energy_emotion",
    quote: "Auch wenn ein Verkauf meiner beiden Stuten nicht in Frage kommt, war ich neugierig, wo ihr aktueller Marktwert liegt. Die Bewertung bei PferdeWert war überraschend einfach – ein paar Fragen zur Abstammung, zu eventuellen Krankheitsbildern, Ausbildung und Turniererfolgen, das war's. Keine 10 Minuten später hatte ich eine detaillierte Analyse zu beiden Pferden. Perfekt für alle, die vor einem Pferdekauf oder Pferdeverkauf stehen oder einfach so wissen möchten, was ihre Pferde wert sind.",
    verifiedDate: "2025-01-12",
    rating: 5
  }
];

// Field Interface
interface FormField {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
  halfWidth?: boolean;
  options?: string[] | Array<{value: string; label: string}>;
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

// Step-Konfiguration (Wizard-Fortschritt) - OPTIMIERT: 4-Schritt Wizard gemäß UX-Plan
const stepData: StepData[] = [
  {
    id: 1,
    title: "Grunddaten",
    subtitle: "Grunddaten deines Pferdes",
    description: "Die wichtigsten Informationen zu deinem Pferd",
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
        placeholder: "8",
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
        placeholder: "165",
        halfWidth: true
      }
    ]
  },
  {
    id: 2,
    title: "Fähigkeiten",
    subtitle: "Ausbildung & Verwendung",
    description: "Wofür ist dein Pferd ausgebildet?",
    icon: "🏆",
    iconBg: "bg-blue-100",
    fields: [
      {
        name: "haupteignung",
        label: "Haupteignung / Disziplin",
        required: true,
        placeholder: "z.B. Freizeit, Dressur, Springen, Vielseitigkeit",
        halfWidth: true
      },
      {
        name: "ausbildung",
        label: "Ausbildungsstand",
        type: "select",
        required: true,
        options: ["roh", "angeritten", "E", "A", "L", "M", "S", "Sonstiges"],
        halfWidth: true
      },
      {
        name: "erfolge",
        label: "Turniererfahrung / Erfolge",
        required: false,
        placeholder: "z.B. A-Dressur platziert, L-Springen teilgenommen",
        fullWidth: true
      },
      {
        name: "abstammung",
        label: "Abstammung (Vater x Muttervater)",
        required: false,
        placeholder: "z.B. Cornet Obolensky x Contender",
        fullWidth: true
      }
    ]
  },
  {
    id: 3,
    title: "Details",
    subtitle: "Charakter & Gesundheit",
    description: "Weitere Details für eine genauere Bewertung",
    icon: "❤️",
    iconBg: "bg-green-100",
    fields: [
      {
        name: "charakter",
        label: "Charakter & Rittigkeit",
        required: false,
        placeholder: "z.B. sehr brav, brav, normal, sensibel, anspruchsvoll",
        fullWidth: true
      },
      {
        name: "aku",
        label: "Gesundheit / AKU",
        required: false,
        placeholder: "z.B. AKU 2023 ohne Befund, leichte Arthrose",
        fullWidth: true
      },
      {
        name: "besonderheiten",
        label: "Besonderheiten",
        required: false,
        placeholder: "z.B. verladefromm, geländesicher, anfängertauglich",
        fullWidth: true
      },
      {
        name: "standort",
        label: "Standort (PLZ)",
        required: false,
        placeholder: "z.B. 72770",
        halfWidth: true
      },
      {
        name: "attribution_source",
        label: "Wie bist du auf PferdeWert aufmerksam geworden?",
        required: false,
        placeholder: "Bitte auswählen (optional)",
        halfWidth: true,
        type: "select",
        options: [
          { value: "", label: "Bitte auswählen (optional)" },
          { value: "google_search", label: "Google Suche" },
          { value: "instagram", label: "Instagram" },
          { value: "facebook", label: "Facebook" },
          { value: "recommendation", label: "Empfehlung von Freunden/Familie" },
          { value: "equestrian_forum", label: "Pferdeforum oder Community" },
          { value: "other", label: "Andere Quelle" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Checkout",
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
  const [formStartTime] = useState<number>(Date.now());

  // LocalStorage-Key mit Namespace für bessere Kollisionsvermeidung
  const STORAGE_KEY = "PW_bewertungForm";

  // Formular bei Start wiederherstellen + Migration für alte Daten
  useEffect(() => {
    if (!isMounted) return;
    
    const savedForm = localStorage.getItem(STORAGE_KEY);
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm) as FormState;
        
        // Migration: verwendungszweck → haupteignung
        const legacyForm = parsedForm as FormState & { verwendungszweck?: string };
        const migratedForm = {
          ...parsedForm,
          haupteignung: parsedForm.haupteignung || legacyForm.verwendungszweck || "",
          charakter: parsedForm.charakter || "",
          besonderheiten: parsedForm.besonderheiten || ""
        };
        
        setForm(migratedForm);
        info("[FORM] Formular aus localStorage wiederhergestellt (mit Migration)");
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
        // Track form progress when moving to next step
        const stepName = stepData.find(s => s.id === next)?.title || `Step ${next}`;
        trackFormProgress(next, stepName);
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

    // Validate all required fields from all steps (now 3 steps before payment)
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
    
    // Track payment initiation with form completion time
    const completionTime = calculateFormCompletionTime(formStartTime);
    const formWithMetrics = { ...form, completionTime };
    trackPaymentStart(formWithMetrics);
    
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
    // Track that user started the valuation process
    trackValuationStart();
  }, []);

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Pferde Preis berechnen: KI-Bewertung in 2 Minuten | PferdeWert</title>
        <meta name="description" content="Pferde Preis berechnen deutschlandweit - KI-Analyse in 2 Minuten - 115 tägliche Bewertungen - Sofort-PDF mit detaillierter Marktanalyse - Jetzt starten" />
        <meta property="og:image" content="https://pferdewert.de/images/result.webp" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content="PferdeWert - Professionelle Pferdebewertung" />
        <link rel="canonical" href="https://pferdewert.de/pferde-preis-berechnen"/>
        
        {/* Performance optimizations */}
        <link rel="preload" href="/images/result.webp" as="image" />
        <link rel="dns-prefetch" href="//js.stripe.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
        
        {/* Review Schema für Service-Seite */}
        <ServiceReviewSchema />

        {/* Service Schema für strukturierte Daten */}
        <ServicePageSchema />
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
            {/* Step-Indikatoren - Nur 3 Wizard-Schritte anzeigen (ohne Checkout) */}
            <div id="wizard-progress" className="mb-8 sticky top-0 bg-white/90 backdrop-blur-sm z-30 py-4 rounded-2xl">
              <div className="flex items-center justify-center space-x-2 sm:space-x-8">
                {stepData.slice(0, 3).map((step, index) => (
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
                    {index < 2 && (
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
                              {field.placeholder && <option value="">{field.placeholder}</option>}
                              {!field.placeholder && <option value="">Bitte wählen</option>}
                              {field.options?.map((option) => {
                                if (typeof option === 'string') {
                                  return (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  );
                                } else {
                                  return (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  );
                                }
                              })}
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
                              pattern={field.type === "number" ? "[0-9]*" : undefined}
                              min={field.type === "number" ? (field.name === "alter" ? "0" : field.name === "stockmass" ? "50" : "0") : undefined}
                              max={field.type === "number" ? (field.name === "alter" ? "50" : field.name === "stockmass" ? "250" : undefined) : undefined}
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

        {/* Testimonials Section */}
        <section className="section bg-brand-light/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Das sagen unsere Kunden</h2>
              <p className="text-xl text-gray-600">
                Erfahrungen von Pferdebesitzern und Reitern
              </p>
            </div>

            {/* Optimized grid layout for 3 testimonials */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {/* Real Testimonials with Photos */}
              {realTestimonials.map((testimonial, index) => (
                <div key={index} className="flex">
                  <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-brand-brown relative flex flex-col w-full h-auto">

                    {/* Quote mark */}
                    <div className="absolute -left-1 top-6 text-4xl text-brand-brown font-serif leading-none">
                      &quot;
                    </div>

                    {/* Customer info with consistent height */}
                    <div className="flex items-start mb-4 ml-6 min-h-[80px]">
                      <div className="relative w-16 mr-4 flex-shrink-0">
                        <Image
                          src={testimonial.photo}
                          alt={`${testimonial.name} Profilbild`}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full border-2 border-yellow-400 shadow-md object-cover"
                        />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 leading-snug">{testimonial.role}</div>
                        <div className="text-xs text-gray-500">{testimonial.location}</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex mb-4 ml-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-brand-gold fill-current" />
                      ))}
                    </div>

                    {/* Quote - grows to fill available space */}
                    <blockquote className="text-gray-700 mb-6 ml-6 leading-relaxed flex-grow text-sm">
                      {testimonial.quote}
                    </blockquote>

                    {/* Instagram link - always at bottom with consistent height */}
                    <div className="ml-6 mt-auto min-h-[48px] flex items-center">
                      {testimonial.instagramHandle && (
                        <a
                          href={`https://instagram.com/${testimonial.instagramHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-brown transition-colors py-2 px-3 rounded-lg hover:bg-brand-light/50"
                          aria-label={`${testimonial.name} auf Instagram folgen`}
                        >
                          <Instagram className="w-4 h-4" />
                          @{testimonial.instagramHandle}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Call-to-Action */}
            <div className="text-center mt-16">
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-medium mb-6">
                  Professionelle Bewertungen für Pferdebesitzer und Pferdekäufer
                </p>
              </div>

              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary text-lg px-8 py-4 inline-block"
              >
                Jetzt Pferdewert berechnen
              </Link>

              <div className="mt-4">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  30 Tage Geld-zurück-Garantie
                </p>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  );
}