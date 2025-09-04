// frontend/pages/pferde-preis-berechnen.tsx - Modernes Design basierend auf index.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { error, warn, info } from "@/lib/log";
import Layout from "@/components/Layout";
import { ServiceReviewSchema } from "@/components/PferdeWertReviewSchema";
import TierSelectionModal from "@/components/TierSelectionModal";
import { Star, ArrowRight, ArrowLeft, Shield, CheckCircle, ChevronDown, Instagram } from "lucide-react";
import { PRICING_FORMATTED, PRICING_TIERS, type PricingTier } from "../lib/pricing";
import { savePricingTier, getPricingTier as getSavedTier, normalizeTierParam } from "@/lib/pricing-session";
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
  // Pricing context
  selectedTier?: PricingTier; // 'basic' | 'pro' | 'premium'
  tierPrice?: number;
  stripeProductId?: string;
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
  tier?: 'basic' | 'pro' | 'premium'; // NEW: Tier indicator
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
  // pricing fields filled on mount based on URL/session
  selectedTier: undefined,
  tierPrice: undefined,
  stripeProductId: undefined,
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

// Step-Konfiguration (Wizard-Fortschritt) – 3 Formular-Schritte, Checkout außerhalb des Steppers
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
    title: "Ausbildung & Disziplin",
    subtitle: "Ausbildung und sportliche Einordnung",
    description: "Pflichtangaben zu Disziplin und Ausbildungsstand",
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
    title: "Gesundheit & Kontext",
    subtitle: "Weitere Informationen",
    description: "Optionale Details für eine genauere Bewertung",
    icon: "🩺",
    iconBg: "bg-purple-100",
    fields: [
      {
        name: "charakter",
        label: "Charakter & Rittigkeit",
        required: false,
        placeholder: "z.B. sehr brav, brav, normal, sensibel, anspruchsvoll",
        halfWidth: true
      },
      {
        name: "aku",
        label: "Gesundheit / AKU",
        required: false,
        placeholder: "z.B. AKU 2023 ohne Befund, leichte Arthrose",
        halfWidth: true
      },
      {
        name: "besonderheiten",
        label: "Besonderheiten",
        required: false,
        placeholder: "z.B. verladefromm, geländesicher, anfängertauglich",
        halfWidth: true
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
  }
];

export default function PferdePreisBerechnenPage(): React.ReactElement {
  // Alle Hooks MÜSSEN vor jeglichen return-Statements stehen
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [consent, setConsent] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [formStartTime] = useState<number>(Date.now());
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [showTierModal, setShowTierModal] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  // Real testimonials data - from index.tsx
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

  // LocalStorage-Key mit Namespace für bessere Kollisionsvermeidung
  const STORAGE_KEY = "PW_bewertungForm";

  // Tier aus URL/Session lesen + Formular bei Start wiederherstellen (inkl. Migration)
  useEffect(() => {
    if (!isMounted) return;

    // 1) Resolve tier from URL first
    try {
      const params = new URLSearchParams(window.location.search);
      const tierParam = params.get('tier');
      const normalized = normalizeTierParam(tierParam);
      
      // For Alternative Flow: Only use session storage if there's a tier param in URL
      // This ensures direct visits to /pferde-preis-berechnen trigger tier selection modal
      const resolved: PricingTier | null = normalized || (tierParam ? getSavedTier() : null);

      // Alternative Flow: Allow form access without tier selection
      // If no tier is available, continue with null tier - selection happens after form completion

      if (resolved) {
        // Existing flow: user has pre-selected a tier
        savePricingTier(resolved);
        setSelectedTier(resolved);

        const cfg = PRICING_TIERS[resolved];
        setForm(prev => ({
          ...prev,
          selectedTier: resolved,
          tierPrice: cfg.price,
          stripeProductId: cfg.stripeId,
        }));

        // Analytics: record that the form loaded with a selected tier
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'pricing_tier_loaded_on_form', {
            tier_name: resolved,
            tier_price: cfg.price,
            currency: 'EUR',
            page_location: '/pferde-preis-berechnen'
          });
        }
      } else {
        // Alternative flow: no tier pre-selected, allow form access
        setSelectedTier(null);
        // Analytics: track alternative flow entry
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'alternative_flow_started', {
            event_category: 'Conversion Funnel',
            event_label: 'Form Accessed Without Tier',
            page_location: '/pferde-preis-berechnen'
          });
        }
      }
    } catch {
      // ignore
    }
    
    const savedForm = localStorage.getItem(STORAGE_KEY);
    if (savedForm) {
      try {
        type SavedForm = Partial<FormState> & { verwendungszweck?: string; tier?: string };
        const parsedForm = JSON.parse(savedForm) as SavedForm;

        // Sanitize ALL legacy pricing/tier fields that could force a default checkout
        const LEGACY_PRICING_FIELDS = [
          'tier', 'selectedTier', 'tierPrice', 'stripeProductId', 
          'pricing', 'priceFormatted', 'current', 'decoy',
          'PRICING', 'PRICING_FORMATTED', 'TIER_PRICES'
        ] as const;
        
        const rest: Record<string, unknown> = { ...parsedForm };
        LEGACY_PRICING_FIELDS.forEach(field => {
          delete rest[field];
        });

        // Migration: verwendungszweck → haupteignung
        const migratedForm: FormState = {
          ...initialForm,
          ...rest,
          haupteignung: rest.haupteignung || parsedForm.verwendungszweck || "",
          charakter: rest.charakter || "",
          besonderheiten: rest.besonderheiten || "",
          // ensure pricing fields are not restored from legacy storage
          selectedTier: undefined,
          tierPrice: undefined,
          stripeProductId: undefined,
        };

        // Keep any pricing context determined during this mount (URL/session)
        setForm(prev => ({
          ...migratedForm,
          selectedTier: prev.selectedTier,
          tierPrice: prev.tierPrice,
          stripeProductId: prev.stripeProductId,
        }));
        info("[FORM] Formular aus localStorage wiederhergestellt (mit Migration & Pricing-Feld-Bereinigung)");
      } catch (e) {
        warn("Fehler beim Wiederherstellen des Formulars:", e);
      }
    }
  }, [isMounted, router]);

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
    
    // Debug logging für stockmass
    if (name === "stockmass") {
      info(`[DEBUG] stockmass input - raw value: "${value}", type: ${typeof value}`);
      
      // FIXED: Proper number parsing that handles decimal formatting
      let cleanValue = value.trim();
      
      // Handle German decimal format (170,0 -> 170) and English (170.0 -> 170)
      if (cleanValue.includes(',') || cleanValue.includes('.')) {
        // Parse as float first to handle decimals correctly
        const parsedFloat = parseFloat(cleanValue.replace(',', '.'));
        if (!isNaN(parsedFloat)) {
          // Convert back to integer string (stockmass should be whole cm)
          cleanValue = Math.round(parsedFloat).toString();
        } else {
          // Fallback: remove all non-digits if parsing fails
          cleanValue = value.replace(/[^0-9]/g, '');
        }
      } else {
        // Simple case: remove non-digits
        cleanValue = value.replace(/[^0-9]/g, '');
      }
      
      if (cleanValue !== value) {
        info(`[DEBUG] stockmass cleaned from "${value}" to "${cleanValue}"`);
      }
      setForm(prev => ({ ...prev, [name]: cleanValue }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    
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
        const next = Math.min(prev + 1, stepData.length + 1); // +1 für Checkout-Phase außerhalb des Steppers
        // Track form progress for form steps only
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

  /**
   * Handles tier selection from the modal (alternative flow)
   * Saves the selected tier and re-submits the form for checkout
   */
  const handleTierSelect = async (tier: PricingTier) => {
    info(`Tier selected from modal: ${tier}`);
    
    // Save selected tier
    setSelectedTier(tier);
    savePricingTier(tier);
    
    // CRITICAL FIX: Update the form object with the selected tier
    // This ensures the tier is included in the API request
    setForm(prev => ({
      ...prev,
      selectedTier: tier,
      tierPrice: PRICING_TIERS[tier].price,
      stripeProductId: PRICING_TIERS[tier].stripeId
    }));
    
    // Close modal and start loading
    setShowTierModal(false);
    setModalLoading(true);
    
    // Track tier selection from modal
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tier_selected_from_modal', {
        event_category: 'Conversion Funnel',
        event_label: `Alternative Flow - ${tier} Selected`,
        tier_name: tier,
        tier_price: PRICING_TIERS[tier].price,
        page_location: '/pferde-preis-berechnen'
      });
    }
    
    // Small delay for UI feedback, then proceed to checkout
    setTimeout(() => {
      setModalLoading(false);
      // Re-trigger form submission now that tier is selected - call without event parameter
      handleSubmitInternal();
    }, 500);
  };

  /**
   * Internal submit handler for reuse from tier selection
   */
  const handleSubmitInternal = async (): Promise<void> => {
    setErrors({});

    if (!consent) {
      setErrors({ form: "Bitte bestätige den Verzicht auf dein Widerrufsrecht." });
      return;
    }

    // Validate all required fields from all form steps (Checkout ist separat)
    const newErrors: { [key: string]: string } = {};
    stepData.slice(0, stepData.length).forEach(step => {
      step.fields.forEach((field) => {
        if (field.required && !form[field.name as keyof FormState]) {
          newErrors[field.name] = "Pflichtfeld";
        }
      });
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Go back to first step with errors
      for (let i = 0; i < stepData.length; i++) {
        const stepFields = stepData[i].fields.map(f => f.name);
        if (stepFields.some(field => newErrors[field])) {
          setCurrentStep(i + 1);
          break;
        }
      }
      return;
    }

    // Alternative flow: If no tier is selected, show tier selection modal first
    if (!selectedTier) {
      info('No tier selected, showing tier selection modal');
      setShowTierModal(true);
      
      // Analytics: track tier modal shown
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tier_selection_modal_shown', {
          event_category: 'Conversion Funnel',
          event_label: 'Alternative Flow - Modal Displayed',
          page_location: '/pferde-preis-berechnen'
        });
      }
      
      return;
    }

    setLoading(true);
    
    // Track payment initiation with form completion time
    const completionTime = calculateFormCompletionTime(formStartTime);
    const formWithMetrics = { ...form, completionTime };
    trackPaymentStart(formWithMetrics);
    // Analytics: include selected tier details for checkout start
    if (typeof window !== 'undefined' && window.gtag && selectedTier) {
      const cfg = PRICING_TIERS[selectedTier];
      window.gtag('event', 'begin_checkout_tier', {
        tier_name: selectedTier,
        tier_price: cfg.price,
        currency: 'EUR',
        page_location: '/pferde-preis-berechnen'
      });
    }
    
    try {
      // Debug logging vor dem Senden
      info(`[DEBUG] Form submission - stockmass value: "${form.stockmass}", typeof: ${typeof form.stockmass}`);
      info(`[DEBUG] Full form object:`, form);
      
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
        const errorData = await res.json() as { error?: string; code?: string };
        
        // Special handling for missing tier selection - show tier modal
        if (errorData.code === "NO_TIER_SELECTED") {
          info("[FORM] Checkout rejected - no tier selected, showing tier modal");
          setShowTierModal(true);
          return; // Don't show error, just show the modal
        }
        
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

  /**
   * Main form submit handler - handles both flows
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await handleSubmitInternal();
  };

  /**
   * Handler to close the tier selection modal
   */
  const handleModalClose = () => {
    if (!modalLoading) {
      setShowTierModal(false);
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
        <title>Pferde Preis berechnen: 2 Min Bewertung | PferdeWert</title>
        <meta name="description" content="🐎 Pferde Preis berechnen ✓ KI-Analyse für ${PRICING_FORMATTED.current} ✓ Sofort-PDF ✓ Jetzt starten!" />
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
      </Head>

      {/* Note: Animations moved to globals.css for better performance */}

      {/* Hero: Badge oben, darunter H1, darunter Bild */}
      <section id="preise" className="relative overflow-hidden">
        <div className="px-4 lg:px-8 xl:px-12 py-10 lg:py-16">
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-brand-brown/10 text-brand-brown rounded-full text-sm font-semibold">
              🐎 Professionelle Pferdebewertung
            </div>
            {/* H1 */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Pferd bewerten
            </h1>
          </div>
        </div>
      </section>
      {/* Wizard-Bereich mit fullWidth Layout und fade-in */}
      <section id="wizard-start" className="py-8 lg:py-16">
        <div className="px-4 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto wizard-fade-in">
            {/* Gewählter Tarif Indikator */}
            <div className="mb-6">
              {selectedTier ? (
                <div className="bg-brand-brown text-white px-5 py-3 rounded-2xl inline-flex items-center gap-3">
                  <strong className="text-base lg:text-lg font-semibold">
                    {PRICING_TIERS[selectedTier].displayName}
                  </strong>
                  <span className="text-sm opacity-90">
                    ({PRICING_TIERS[selectedTier].price.toFixed(2).replace('.', ',')}€)
                  </span>
                </div>
              ) : (
                <div className="bg-amber-100 text-amber-800 border border-amber-200 px-5 py-3 rounded-2xl inline-flex items-center gap-3">
                  <strong className="text-base lg:text-lg font-semibold">
                    Paket-Auswahl folgt
                  </strong>
                  <span className="text-sm opacity-90">
                    (nach Formular-Eingabe)
                  </span>
                </div>
              )}
            </div>
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
              {currentStepData && currentStep <= stepData.length && (
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
                            <div className="relative">
                              <select
                                id={field.name}
                                name={field.name}
                                value={form[field.name as keyof FormState]}
                                onChange={handleChange}
                                className={`w-full h-14 px-4 pr-14 border rounded-2xl transition-all text-lg appearance-none cursor-pointer bg-white ${
                                  errors[field.name]
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 hover:border-brand-brown focus:border-brand-brown"
                                } focus:outline-none focus:ring-4 focus:ring-amber-100 ${
                                  form[field.name as keyof FormState] ? "text-gray-900" : "text-gray-400"
                                }`}
                              >
                                {field.placeholder && <option value="">{field.placeholder}</option>}
                                {!field.placeholder && <option value="">Bitte wählen</option>}
                                {field.options?.map((option) => {
                                  if (typeof option === "string") {
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
                              {/* Custom dropdown indicator to improve discoverability on desktop */}
                              <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-gray-500">
                                <ChevronDown className="w-5 h-5" aria-hidden="true" />
                              </div>
                            </div>
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
                              className={`w-full h-14 px-4 border rounded-2xl transition-all text-lg placeholder:text-gray-400 ${
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

                    {/* Weiter / Zur Bezahlung */}
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary relative px-4 py-3 text-sm md:px-6 md:py-4 md:text-base rounded-2xl hover:scale-105 transition-transform"
                      aria-label={currentStep === stepData.length ? "Zur Bezahlung" : "Zum nächsten Schritt weitergehen"}
                    >
                      <span className="hidden sm:inline mr-2">{currentStep === stepData.length ? "Zur Bezahlung" : "Weiter"}</span>
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </>
              )}

              {/* Bezahlung-Step */}
              {currentStep === stepData.length + 1 && (
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
                      {selectedTier
                        ? `Die ${PRICING_TIERS[selectedTier].displayName}-Analyse kostet einmalig`
                        : 'Die Analyse kostet einmalig'}
                    </p>
                    <div className="text-4xl font-black mb-2">
                      {selectedTier ? (
                        <span className="text-brand-brown">
                          {`${PRICING_TIERS[selectedTier].price.toFixed(2).replace('.', ',')}€`}
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          ab 14,90€
                        </span>
                      )}
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
                    ) : selectedTier ? (
                      "Jetzt kostenpflichtig analysieren"
                    ) : (
                      "Paket auswählen & analysieren"
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

      {/* Enhanced Testimonials Section with Real Customer Reviews */}
      <section id="vorteile" className="section bg-brand-light/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Das sagen unsere Kunden</h2>
            <p className="text-xl text-gray-600">
              Erfahrungen von Pferdebesitzern mit unseren verschiedenen Bewertungsarten
            </p>
          </div>

          {/* Testimonials with tier badges */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {realTestimonials.map((testimonial, index) => (
              <div key={index} className="flex">
                <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-brand-brown relative flex flex-col w-full h-auto">
                  
                  {/* Quote mark */}
                  <div className="absolute -left-1 top-6 text-4xl text-brand-brown font-serif leading-none">
                    &quot;
                  </div>
                  
                  {/* Customer info with tier badge */}
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
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        {testimonial.tier && (
                          <span className={`tier-badge tier-${testimonial.tier}`}>
                            {testimonial.tier}
                          </span>
                        )}
                      </div>
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
                  
                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-6 ml-6 leading-relaxed flex-grow text-sm">
                    {testimonial.quote}
                  </blockquote>
                  
                  {/* Instagram link */}
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
        </div>
      </section>

      {/* Tier Selection Modal for Alternative Flow */}
      <TierSelectionModal
        open={showTierModal}
        onClose={handleModalClose}
        onTierSelect={handleTierSelect}
        formData={form as unknown as Record<string, unknown>}
        loading={modalLoading}
      />
    </Layout>
  );
}
