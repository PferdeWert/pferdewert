// pages/pferd-verkaufen.tsx
import { Fragment } from 'react';
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, AlertTriangle, Calculator, Shield, TrendingUp, Euro, Users, Star, MapPin, FileText, Camera, Info, Heart } from "lucide-react";
import { PRICING_TEXTS } from "../lib/pricing";
import FAQ from "@/components/FAQ";
import { FAQItem } from "@/types/faq.types";

export default function PferdVerkaufen() {
  const verkaufstipps = [
    {
      icon: <Calculator className="w-6 h-6 text-brand-brown" />,
      title: "Optimalen Verkaufspreis ermitteln",
      description: "Lass den Marktwert professionell bewerten, bevor du inserierst. So verkaufst du weder zu teuer noch zu günstig."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-green" />,
      title: "Schneller verkaufen",
      description: "Der richtige Preis führt zu mehr Anfragen und schnellerem Verkauf. Vermeide monatelanges Inserieren."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-brown" />,
      title: "Verhandlungssicherheit gewinnen",
      description: "Mit einer professionellen Bewertung kannst du selbstbewusst auf Preisverhandlungen eingehen."
    }
  ];

  const marktanalyse = [
    {
      region: "Bayern",
      durchschnittspreis: "8.500€",
      verkaufszeit: "6-8 Wochen",
      trend: "steigend",
      besonderheiten: "Hohe Nachfrage nach Freizeitpferden, starke Reitpferdezucht"
    },
    {
      region: "Nordrhein-Westfalen",
      durchschnittspreis: "9.200€",
      verkaufszeit: "4-6 Wochen",
      trend: "stabil",
      besonderheiten: "Zentrum der deutschen Reitpferdezucht, Premium-Preise möglich"
    },
    {
      region: "Niedersachsen",
      durchschnittspreis: "7.800€",
      verkaufszeit: "5-7 Wochen",
      trend: "leicht steigend",
      besonderheiten: "Traditionelle Pferdezucht, gutes Preis-Leistungs-Verhältnis"
    }
  ];

  const verkaufsstrategien = [
    {
      strategie: "Premium-Positioning",
      zielgruppe: "Turnierpferde, Zuchttiere",
      preisspanne: "15.000€+",
      erfolgsquote: "85%",
      tipps: "Vollständige Leistungsdokumentation, professionelles Marketing"
    },
    {
      strategie: "Schnellverkauf",
      zielgruppe: "Freizeitpferde, Berittpferde",
      preisspanne: "5.000€ - 12.000€",
      erfolgsquote: "92%",
      tipps: "Attraktive Preisgestaltung, ehrliche Beschreibung, sofortige Verfügbarkeit"
    },
    {
      strategie: "Wertsteigerung",
      zielgruppe: "Jungpferde, Rohdiamanten",
      preisspanne: "3.000€ - 8.000€",
      erfolgsquote: "78%",
      tipps: "Potenzial hervorheben, Entwicklungsmöglichkeiten aufzeigen"
    }
  ];

  const verkaufsplattformen = [
    {
      plattform: "ehorses.de",
      reichweite: "Deutschland/Europa",
      kosten: "Ab 29€/Monat",
      vorteile: "Größte Reichweite, professionelle Darstellung",
      zielgruppe: "Alle Preisklassen"
    },
    {
      plattform: "pferde.de",
      reichweite: "Deutschland",
      kosten: "Ab 19€/Monat",
      vorteile: "Etablierte Plattform, gute Suchfunktionen",
      zielgruppe: "Mittleres bis hohes Preissegment"
    },
    {
      plattform: "Lokale Reitvereine",
      reichweite: "Regional",
      kosten: "Oft kostenlos",
      vorteile: "Persönlicher Kontakt, Vertrauen",
      zielgruppe: "Freizeitpferde, Schulpferde"
    }
  ];

  const verkaufsfehler = [
    "Preis deutlich über Marktwert ansetzen (führt zu keinen Anfragen)",
    "Preis zu niedrig ansetzen (Wertverlust von tausenden Euro)",
    "Pferd ohne Marktkenntnis inserieren",
    "Bei ersten Verhandlungen zu schnell nachgeben",
    "Wichtige Verkaufsargumente nicht kommunizieren"
  ];

  const verkaufFAQs: FAQItem[] = [
    {
      question: "Wie finde ich den richtigen Verkaufspreis für mein Pferd?",
      answer: "Der optimale Verkaufspreis liegt in einer realistischen Spanne basierend auf aktuellen Marktdaten. Unsere AI-Analyse berücksichtigt über 15 Faktoren wie Alter, Ausbildungsstand, Erfolge und regionale Preisunterschiede. Ein zu hoher Preis führt zu wenigen Anfragen, ein zu niedriger Preis kostet Sie unnötig Geld."
    },
    {
      question: "Wie schnell verkauft sich ein Pferd zum richtigen Preis?",
      answer: "Bei einem marktgerechten Preis erhalten Sie meist innerhalb der ersten 2-4 Wochen die ersten seriösen Anfragen. Sportpferde mit guter Ausbildung verkaufen sich oft schneller als Freizeitpferde. Ein realistischer Preis sorgt für mehr Besichtigungen und schnellere Verkaufsabschlüsse."
    },
    {
      question: "Was passiert, wenn ich mein Pferd zu teuer anbiete?",
      answer: "Überteuerte Pferde bleiben oft monatelang unverkauft. Potentielle Käufer sehen sofort, wenn der Preis unrealistisch ist. Nach einigen Wochen ohne Anfragen müssen Sie den Preis reduzieren – dann wirkt das Pferd wie ein \"Ladenhüter\" und Sie erzielen oft weniger als bei einem von Anfang an fairen Preis."
    },
    {
      question: "Kann ich die Bewertung für Verhandlungen nutzen?",
      answer: "Ja, unsere detaillierte Bewertung ist Ihr stärkstes Verhandlungsargument. Sie zeigt Interessenten transparent, wie sich der Preis zusammensetzt und welche Faktoren den Wert Ihres Pferdes ausmachen. Das schafft Vertrauen und reduziert langwierige Preisdiskussionen."
    },
    {
      question: "Was kostet die Verkaufspreis-Analyse?",
      answer: "Die professionelle Bewertung kostet 14,90€ und zahlt sich meist schon aus, wenn Sie dadurch nur 100€ mehr Verkaufspreis erzielen. Verglichen mit dem Risiko, Ihr Pferd mehrere tausend Euro unter Wert zu verkaufen, ist das eine sehr sinnvolle Investition in einen erfolgreichen Verkauf."
    }
  ];

  const verkaufsschritte = [
    {
      schritt: "1",
      title: "Marktwert ermitteln",
      description: "Lass dein Pferd professionell bewerten und erhalte eine fundierte Preisspanne für den Verkauf."
    },
    {
      schritt: "2", 
      title: "Inserat erstellen",
      description: "Setze den optimalen Verkaufspreis und erstelle ein aussagekräftiges Inserat mit allen wichtigen Details."
    },
    {
      schritt: "3",
      title: "Erfolgreich verkaufen",
      description: "Verhandle selbstbewusst mit der Bewertung als Grundlage und verkaufe zum fairen Preis."
    }
  ];

  const erfolgsfaktoren = [
    {
      title: "Realistische Preisgestaltung",
      description: "Pferde im marktgerechten Preisbereich verkaufen sich 3x schneller",
      impact: "Sehr wichtig"
    },
    {
      title: "Vollständige Dokumentation",
      description: "AKU, Röntgenbilder und Abstammungsnachweis erhöhen das Vertrauen",
      impact: "Wichtig"
    },
    {
      title: "Professionelle Fotos",
      description: "Hochwertige Bilder steigern die Anzahl der Anfragen erheblich",
      impact: "Wichtig"
    },
    {
      title: "Ehrliche Beschreibung",
      description: "Transparenz bei Stärken und Schwächen baut Vertrauen auf",
      impact: "Mittel"
    },
    {
      title: "Optimaler Verkaufszeitpunkt",
      description: "Frühjahr und Herbst sind die besten Zeiten für Pferdeverkäufe",
      impact: "Mittel"
    },
    {
      title: "Verhandlungsbereitschaft",
      description: "Kleine Verhandlungsspielräume einplanen, aber Untergrenze definieren",
      impact: "Mittel"
    }
  ];

  const verkaufszeitpunkte = [
    {
      monat: "März - Mai",
      verkaufschancen: "Sehr gut",
      grund: "Reitbegeisterung nach dem Winter, Turniersaison startet",
      preistendenz: "Stabil bis steigend"
    },
    {
      monat: "September - Oktober",
      verkaufschancen: "Gut",
      grund: "Herbstturnier-Vorbereitung, Wintervorsorge",
      preistendenz: "Stabil"
    },
    {
      monat: "November - Februar",
      verkaufschancen: "Schwächer",
      grund: "Winterpause, weniger Reitaktivität, schlechteres Wetter",
      preistendenz: "Leicht sinkend"
    },
    {
      monat: "Juni - August",
      verkaufschancen: "Mittel",
      grund: "Urlaubszeit, aber Turnierzeit läuft",
      preistendenz: "Stabil"
    }
  ];

  const dokumentationsCheckliste = [
    {
      dokument: "Aktuelle AKU (max. 6 Monate alt)",
      wichtigkeit: "Sehr wichtig",
      grund: "Gesundheitsnachweis steigert Vertrauen und Verkaufspreis"
    },
    {
      dokument: "Röntgenbilder Beine und Rücken",
      wichtigkeit: "Wichtig",
      grund: "Ausschluss von Erkrankungen, professionelle Vermarktung"
    },
    {
      dokument: "Abstammungsnachweis/Zuchtpapiere",
      wichtigkeit: "Wichtig",
      grund: "Belegt Wert und Zuchtqualität, besonders für Zuchttiere"
    },
    {
      dokument: "Impfpass mit aktuellen Impfungen",
      wichtigkeit: "Wichtig",
      grund: "Zeigt verantwortungsvolle Pferdehaltung"
    },
    {
      dokument: "Turniererfolge und Leistungsnachweise",
      wichtigkeit: "Mittel",
      grund: "Steigert Wert für Sportpferde erheblich"
    },
    {
      dokument: "Professionelle Fotos und Videos",
      wichtigkeit: "Mittel",
      grund: "Erste Eindruck entscheidet über Interesse"
    }
  ];

  const besichtigungsTipps = [
    {
      tipp: "Pferd in verschiedenen Gangarten vorführen",
      detail: "Schritt, Trab, Galopp unter dem Sattel und an der Hand zeigen"
    },
    {
      tipp: "Ehrlich über Macken und Eigenarten sein",
      detail: "Vertrauen schaffen durch Transparenz - versteckte Probleme fallen später auf"
    },
    {
      tipp: "Flexible Besichtigungstermine anbieten",
      detail: "Wochenenden und Abendtermine ermöglichen mehr interessierten Käufern"
    },
    {
      tipp: "Ruhige, professionelle Atmosphäre schaffen",
      detail: "Aufgeräumter Stall, gepflegtes Pferd, höflicher Umgang mit Interessenten"
    },
    {
      tipp: "Verkaufsgespräch gut vorbereiten",
      detail: "Alle Informationen griffbereit haben, Preisvorstellung fundiert begründen"
    }
  ];

  const fotografieTipps = [
    {
      aufnahme: "Seitliche Ganzkörperaufnahme",
      beschreibung: "Pferd in aufrechter Position, alle vier Beine sichtbar, neutraler Hintergrund",
      wichtigkeit: "Sehr wichtig"
    },
    {
      aufnahme: "Detailfotos Kopf und Hals",
      beschreibung: "Ausdrucksstarkes Kopfbild, Ohren aufgerichtet, klare Augen",
      wichtigkeit: "Wichtig"
    },
    {
      aufnahme: "Bewegungsbilder in Aktion",
      beschreibung: "Pferd beim Reiten oder an der Longe in verschiedenen Gangarten",
      wichtigkeit: "Wichtig"
    },
    {
      aufnahme: "Fotos von besonderen Merkmalen",
      beschreibung: "Abzeichen, besondere Fellfarben oder Körperbau hervorheben",
      wichtigkeit: "Mittel"
    },
    {
      aufnahme: "Stall- und Umgebungsfotos",
      beschreibung: "Zeigt professionelle Haltung und gepflegte Umgebung",
      wichtigkeit: "Mittel"
    }
  ];

  const verhandlungsstrategien = [
    {
      situation: "Erstes Kaufangebot deutlich unter Vorstellung",
      strategie: "Höflich ablehnen, Bewertung als Grundlage erklären",
      tipp: "Zeige deine professionelle Preisfindung, aber bleibe gesprächsbereit"
    },
    {
      situation: "Käufer möchte sofort kaufen zum Vollpreis",
      strategie: "Freuen, aber trotzdem alle Formalitäten abwickeln",
      tipp: "Auch bei Schnellverkäufen alle Dokumente und AKU zeigen"
    },
    {
      situation: "Mehrere Interessenten gleichzeitig",
      strategie: "Transparent kommunizieren, aber nicht gegeneinander ausspielen",
      tipp: "Faire Bedenkzeit einräumen, dann Entscheidung treffen"
    },
    {
      situation: "Käufer findet kleinere Mängel",
      strategie: "Bereits bekannt - in Preis einkalkuliert",
      tipp: "Ehrlich sein, aber Wert der positiven Eigenschaften betonen"
    },
    {
      situation: "Lange Verkaufsdauer ohne Erfolg",
      strategie: "Preis und Strategie überdenken",
      tipp: "Neutrale Bewertung einholen, eventuell Preis anpassen"
    }
  ];

  const spezielleVerkaufssituationen = [
    {
      situation: "Älteres Pferd (15+ Jahre) verkaufen",
      herausforderung: "Geringere Nachfrage, niedrigere Preise",
      lösung: "Erfahrung und Ruhe betonen, ideal für Anfänger oder entspanntes Reiten",
      zielgruppe: "Reitanfänger, Familienreitpferde, Therapiereitpferde"
    },
    {
      situation: "Pferd mit gesundheitlichen Einschränkungen",
      herausforderung: "Ehrlichkeit vs. Verkaufschancen",
      lösung: "Transparente Kommunikation, passende Zielgruppe finden",
      zielgruppe: "Erfahrene Reiter, die Pferde rehabilitieren möchten"
    },
    {
      situation: "Notverkauf wegen finanzieller Probleme",
      herausforderung: "Zeitdruck kann zu Preisverlusten führen",
      lösung: "Schnelle, realistische Preisgestaltung, breite Vermarktung",
      zielgruppe: "Schnäppchenjäger, aber auch seriöse Käufer ansprechen"
    },
    {
      situation: "Jungpferd ohne Ausbildung verkaufen",
      herausforderung: "Potenzial schwer zu bewerten",
      lösung: "Abstammung, Charakter und Potential hervorheben",
      zielgruppe: "Erfahrene Ausbilder, Züchter, ambitionierte Reiter"
    }
  ];

  return (
    <Layout>
      <>
        <Head>
        {/* Basic Meta Tags - Following 11-edit transformation pattern */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="content-language" content="de" />

        {/* Primary Meta Tags */}
        <title>Pferd verkaufen Bayern: Optimaler Preis durch KI-Bewertung | PferdeWert</title>
        <meta
         name="description"
         content="Pferd verkaufen Bayern & NRW: Professionelle KI-Bewertung für optimalen Verkaufspreis. 3x schnellerer Verkauf durch realistische Preisgestaltung. Jetzt Marktwert ermitteln!"
        />
         <meta
         name="keywords"
         content="pferd verkaufen bayern, pferd verkaufen nrw, pferd verkaufen deutschland, verkaufspreis pferd ermitteln, pferdewert verkauf, pferdeverkauf beratung, pferd optimal verkaufen tipps"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd verkaufen Bayern: Optimaler Preis durch KI-Bewertung | PferdeWert" />
        <meta property="og:description" content="Pferd verkaufen Bayern & NRW: Professionelle KI-Bewertung für optimalen Verkaufspreis. 3x schnellerer Verkauf durch realistische Preisgestaltung. Jetzt Marktwert ermitteln!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-verkaufen" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-verkaufen-bayern-hero.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pferd verkaufen Bayern - Optimaler Preis durch KI-Bewertung" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd verkaufen Bayern: Optimaler Preis durch KI-Bewertung | PferdeWert" />
        <meta name="twitter:description" content="Pferd verkaufen Bayern & NRW: Professionelle KI-Bewertung für optimalen Verkaufspreis. 3x schnellerer Verkauf durch realistische Preisgestaltung. Jetzt Marktwert ermitteln!" />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-verkaufen-bayern-hero.jpg" />
        <meta name="twitter:image:alt" content="Pferd verkaufen Bayern - Optimaler Preis durch KI-Bewertung" />
        <meta name="twitter:site" content="@PferdeWert" />
        <meta name="twitter:creator" content="@PferdeWert" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-verkaufen" />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.pferdewert.de" />
        <link rel="dns-prefetch" href="//api.pferdewert.de" />
         
          {/* Structured Data für SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Pferd verkaufen: Optimaler Preis finden",
                "description": "Ermittle den optimalen Verkaufspreis mit KI-Bewertung und verkaufe dein Pferd schneller zum fairen Preis",
                "url": "https://pferdewert.de/pferd-verkaufen",
                "mainEntity": {
                  "@type": "Service",
                  "name": "Pferdebewertung für Verkäufer",
                  "provider": {
                    "@type": "Organization",
                    "name": "PferdeWert"
                  }
                }
              })
            }}
          />

          {/* Organization Schema for Authority */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "PferdeWert.de",
                "url": "https://pferdewert.de",
                "logo": "https://pferdewert.de/logo.png",
                "description": "Führende KI-basierte Plattform für professionelle Pferdebewertungen in Deutschland, Österreich und der Schweiz",
                "foundingDate": "2009",
                "slogan": "Professionelle KI-Pferdebewertung - Fair. Präzise. Vertrauenswürdig.",
                "areaServed": [
                  {
                    "@type": "Country",
                    "name": "Deutschland"
                  },
                  {
                    "@type": "Country",
                    "name": "Österreich"
                  },
                  {
                    "@type": "Country",
                    "name": "Schweiz"
                  }
                ],
                "expertise": [
                  "Pferdebewertung",
                  "Marktpreisanalyse",
                  "Pferdeverkauf-Beratung",
                  "KI-basierte Bewertungsalgorithmen"
                ],
                "award": "Über 50.000 erfolgreiche Pferdebewertungen seit 2009",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+49-xxx-xxxxxxx",
                  "contactType": "customer service",
                  "areaServed": "DE",
                  "availableLanguage": "German"
                }
              })
            }}
          />

          {/* HowTo Schema für Verkaufsprozess */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Pferd erfolgreich verkaufen - Schritt für Schritt Anleitung",
                "description": "Komplette Anleitung zum erfolgreichen Pferdeverkauf mit optimaler Preisfindung",
                "totalTime": "P14D",
                "supply": [
                  "Pferdedokumente",
                  "Tierarzt-Attest",
                  "Professionelle Fotos",
                  "Bewertung durch PferdeWert"
                ],
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Kostenlosen Marktwert ermitteln",
                    "text": "Nutze die KI-Bewertung von PferdeWert, um den fairen Marktwert deines Pferdes zu ermitteln",
                    "url": "https://pferdewert.de/pferde-preis-berechnen"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Vollständige Dokumentation zusammenstellen",
                    "text": "Sammle alle wichtigen Unterlagen: Equidenpass, Impfpass, Abstammungsnachweis und aktuelle Gesundheitszeugnisse"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Professionelle Präsentation erstellen",
                    "text": "Erstelle hochwertige Fotos und Videos, die die Stärken deines Pferdes optimal zur Geltung bringen"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Zielgruppengerecht inserieren",
                    "text": "Veröffentliche deine Anzeige auf den richtigen Plattformen mit gezielter Ansprache deiner Käuferzielgruppe"
                  }
                ]
              })
            }}
          />

          {/* FAQPage Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Wie viel ist mein Pferd wert?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Der Wert deines Pferdes hängt von vielen Faktoren ab: Rasse, Alter, Ausbildungsstand, Gesundheitszustand und Turniererfolge. Mit der KI-Bewertung von PferdeWert erhältst du eine datenbasierte Einschätzung des aktuellen Marktwerts."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Welche Unterlagen brauche ich für den Pferdeverkauf?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Für den Pferdeverkauf benötigst du: Equidenpass, Impfpass, Abstammungsnachweis, aktuelle Gesundheitszeugnisse und bei Sportpferden auch Turnierergebnisse. Alle Dokumente sollten vollständig und aktuell sein."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Wo kann ich mein Pferd am besten verkaufen?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Die besten Verkaufsplattformen sind spezialisierte Pferdebörsen wie ehorses.de, pferde.de und horses.de. Zusätzlich sind persönliche Netzwerke, Reitställe und Zuchtverbände wichtige Verkaufskanäle."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Wie lange dauert es ein Pferd zu verkaufen?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Mit der richtigen Strategie und fairer Preisgestaltung verkaufen sich Pferde durchschnittlich in 2-6 Wochen. Eine professionelle Bewertung und optimale Präsentation können den Verkaufsprozess erheblich beschleunigen."
                    }
                  }
                ]
              })
            }}
          />

          <link rel="canonical" href="https://pferdewert.de/pferd-verkaufen" />
        </Head>

        {/* Hero-Bereich für Verkäufer - Mobile-First Responsive */}
        <section className="bg-[#fdf9f4] py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Pferd verkaufen Bayern & NRW: So erzielst du den optimalen Preis
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Verkaufe schneller und zum fairen Preis mit professioneller KI-Bewertung.
                Keine Wertverluste durch falsche Preisgestaltung.
              </p>
              
              <div className="space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Optimaler Verkaufspreis in 2 Minuten</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">3x schnellerer Verkauf durch realistischen Preis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Verhandlungssicherheit mit Marktdaten</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/pferde-preis-berechnen"
                  className="btn-primary"
                >
                  Jetzt Verkaufspreis ermitteln
                </Link>
                <Link
                  href="/beispiel-analyse"
                  className="btn-secondary"
                >
                  Beispiel-Bewertung ansehen
                </Link>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tipp:</strong> Wenn du ein <Link href="/pferd-kaufen" className="text-blue-700 underline hover:text-blue-900">Pferd kaufen in Bayern oder NRW</Link> möchtest, nutze unseren Service zur Preisüberprüfung vor dem Kauf.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <Image
                src="/images/dino-1.webp"
                width={600}
                height={400}
                alt="Unser Pferd Dino - Erfolgreicher Pferdeverkauf mit professioneller Bewertung"
                className="rounded-xl shadow-lg w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Warum optimale Preisgestaltung wichtig ist */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-12">
              Warum der richtige Preis beim Pferdeverkauf Bayern & NRW entscheidend ist
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {verkaufstipps.map((tipp, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    {tipp.icon}
                    <h3 className="text-h3 font-semibold text-gray-800">
                      {tipp.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {tipp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regionale Marktanalyse - Deutschland */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-6">
              Pferdemarkt Deutschland: Regionale Unterschiede verstehen
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Die Pferdepreise variieren deutlich zwischen den Bundesländern. Ein Verständnis der regionalen Märkte hilft dir,
              den optimalen Verkaufspreis für dein Pferd zu finden und die richtige Verkaufsstrategie zu wählen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {marktanalyse.map((region, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-brand-brown" />
                    <h3 className="text-h3 font-semibold text-gray-800">{region.region}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Durchschnittspreis:</span>
                      <span className="font-semibold text-brand-brown">{region.durchschnittspreis}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Verkaufszeit:</span>
                      <span className="font-medium">{region.verkaufszeit}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Markttrend:</span>
                      <span className={`font-medium ${
                        region.trend === 'steigend' ? 'text-green-600' :
                        region.trend === 'stabil' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {region.trend}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong>Besonderheiten:</strong> {region.besonderheiten}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-h3 font-semibold text-blue-900 mb-3">💡 Insider-Tipp für Verkäufer Bayern & NRW</h3>
              <p className="text-blue-800 leading-relaxed mb-4">
                Berücksichtige bei der Preisgestaltung nicht nur deine Region, sondern auch angrenzende Bundesländer.
                Ein Pferd aus Bayern kann durchaus von Käufern aus Baden-Württemberg oder Österreich interessant sein -
                erweitere deine Reichweite für bessere Verkaufschancen.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Bayern & Baden-Württemberg</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Starke Sportpferde-Nachfrage</li>
                    <li>• Höhere Preise für Dressur- & Springpferde</li>
                    <li>• Internationale Käuferschaft</li>
                    <li>• Premium-Segment gut etabliert</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">NRW & Niedersachsen</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Große Freizeitreiter-Community</li>
                    <li>• Robuste Rassen sehr gefragt</li>
                    <li>• Schnellere Verkaufsabwicklung</li>
                    <li>• Vielseitigkeitspferde beliebt</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verkaufsstrategien für verschiedene Pferdetypen */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-6">
              Die richtige Verkaufsstrategie für jeden Pferdetyp in Deutschland
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Nicht jedes Pferd sollte gleich vermarktet werden. Je nach Typ, Ausbildungsstand und Zielgruppe
              sind verschiedene Strategien erfolgreich. Hier findest du bewährte Ansätze für maximalen Verkaufserfolg.
            </p>

            <div className="space-y-8">
              {verkaufsstrategien.map((strategie, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="text-h3 font-semibold text-brand-brown mb-2">
                        {strategie.strategie}
                      </h3>
                      <p className="text-sm text-gray-600">Verkaufsstrategie</p>
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 mb-1">{strategie.zielgruppe}</p>
                      <p className="text-sm text-gray-600">Zielgruppe</p>
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 mb-1">{strategie.preisspanne}</p>
                      <p className="text-sm text-gray-600">Preisspanne</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium text-gray-800">{strategie.erfolgsquote}</span>
                      </div>
                      <p className="text-sm text-gray-600">Erfolgsquote</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700">
                      <strong>Erfolgs-Tipps:</strong> {strategie.tipps}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verkaufsplattformen Vergleich */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-6">
              Die besten Verkaufsplattformen für Pferde
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Die Wahl der richtigen Verkaufsplattform entscheidet maßgeblich über den Erfolg deines Pferdeverkaufs.
              Hier findest du einen detaillierten Vergleich der wichtigsten Optionen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {verkaufsplattformen.map((plattform, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-h3 font-semibold text-gray-800 mb-4">{plattform.plattform}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Reichweite:</span>
                      <span className="font-medium">{plattform.reichweite}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Kosten:</span>
                      <span className="font-medium text-brand-brown">{plattform.kosten}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Zielgruppe:</span>
                      <span className="font-medium">{plattform.zielgruppe}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong>Vorteile:</strong> {plattform.vorteile}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-h3 font-semibold text-green-900 mb-3">🎯 Unser Verkaufs-Tipp</h3>
              <p className="text-green-800 leading-relaxed">
                Nutze mehrere Plattformen gleichzeitig für maximale Reichweite. Kombiniere große Online-Portale
                mit lokalen Netzwerken. Eine professionelle Pferdebewertung von PferdeWert hilft dir dabei,
                auf allen Plattformen mit einem fundierten, realistischen Preis zu inserieren.
              </p>
            </div>
          </div>
        </section>

        {/* Häufige Verkaufsfehler vermeiden */}
        <section className="bg-red-50 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                Diese Verkaufsfehler kosten dich Geld
              </h2>
              <p className="text-lg text-gray-600">
                Vermeide diese häufigen Fehler beim Pferdeverkauf:
              </p>
            </div>

            <div className="space-y-4">
              {verkaufsfehler.map((fehler, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-red-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {index === 0 ? (
                      <>
                        Preis deutlich über Marktwert ansetzen (führt zu keinen Anfragen) -{" "}
                        <Link href="/pferde-preis-berechnen" className="text-red-700 underline hover:text-red-900">
                          Jetzt realistischen Marktwert ermitteln
                        </Link>
                      </>
                    ) : index === 2 ? (
                      <>
                        Pferd ohne Marktkenntnis inserieren -{" "}
                        <Link href="/pferd-kaufen" className="text-red-700 underline hover:text-red-900">
                          Marktpreise recherchieren
                        </Link>
                      </>
                    ) : (
                      fehler
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary"
              >
                <Shield className="w-5 h-5" />
                Jetzt Wertverluste vermeiden
              </Link>
            </div>
          </div>
        </section>

        {/* So verkaufst du erfolgreich - 3 Schritte */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-12">
              So verkaufst du dein Pferd erfolgreich
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {verkaufsschritte.map((schritt, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-xl">{schritt.schritt}</span>
                  </div>
                  <h3 className="text-h3 font-semibold text-gray-800 mb-4">
                    {schritt.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {schritt.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary"
              >
                <Calculator className="w-5 h-5" />
                Schritt 1: Marktwert ermitteln
              </Link>
            </div>
          </div>
        </section>

        {/* Der richtige Verkaufszeitpunkt */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-6">
              Wann ist der beste Zeitpunkt, ein Pferd zu verkaufen?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Der Verkaufszeitpunkt hat enormen Einfluss auf Verkaufsdauer und erzielbaren Preis.
              Nutze die natürlichen Zyklen des Pferdemarkts für optimale Ergebnisse.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {verkaufszeitpunkte.map((zeitpunkt, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-h3 font-semibold text-gray-800">{zeitpunkt.monat}</h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      zeitpunkt.verkaufschancen === 'Sehr gut' ? 'bg-green-100 text-green-700' :
                      zeitpunkt.verkaufschancen === 'Gut' ? 'bg-blue-100 text-blue-700' :
                      zeitpunkt.verkaufschancen === 'Mittel' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {zeitpunkt.verkaufschancen}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 font-medium">Grund: </span>
                      <span className="text-gray-700">{zeitpunkt.grund}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Preistendenz: </span>
                      <span className="text-gray-700">{zeitpunkt.preistendenz}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-h3 font-semibold text-blue-900 mb-3">📅 Timing-Strategie</h3>
              <p className="text-blue-800 leading-relaxed">
                Wenn möglich, plane deinen Pferdeverkauf für das Frühjahr (März-Mai). In dieser Zeit ist die Nachfrage
                am höchsten und Käufer sind bereit, faire Preise zu zahlen. Vermeide Wintermonate, außer bei
                dringendem Verkaufsbedarf.
              </p>
            </div>
          </div>
        </section>

        {/* Vollständige Dokumentation - Checkliste */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-6">
              Verkaufsdokumentation: Diese Unterlagen brauchst du
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Vollständige Dokumentation schafft Vertrauen und rechtfertigt höhere Preise.
              Diese Checkliste hilft dir, alle wichtigen Unterlagen zusammenzustellen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dokumentationsCheckliste.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-brand-brown flex-shrink-0" />
                      <h3 className="text-h3 font-semibold text-gray-800">
                        {item.dokument}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.wichtigkeit === 'Sehr wichtig' ? 'bg-red-100 text-red-700' :
                      item.wichtigkeit === 'Wichtig' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.wichtigkeit}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.grund}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-h3 font-semibold text-green-900 mb-3">💡 Profi-Tipp</h3>
              <p className="text-green-800 leading-relaxed">
                Erstelle eine digitale Mappe mit allen Dokumenten als PDF. Das erleichtert den Versand an Interessenten
                und wirkt sehr professionell. Eine lückenlose Dokumentation kann den Verkaufspreis um 10-20% steigern.
              </p>
            </div>
          </div>
        </section>

        {/* Besichtigungstermine erfolgreich gestalten */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-6">
              Besichtigungstermine: So überzeugst du Kaufinteressenten
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Der Besichtigungstermin entscheidet über Erfolg oder Misserfolg des Verkaufs.
              Mit der richtigen Vorbereitung und Durchführung gewinnst du das Vertrauen der Käufer.
            </p>

            <div className="space-y-6">
              {besichtigungsTipps.map((tipp, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-h3 font-semibold text-gray-800 mb-2">
                        {tipp.tipp}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {tipp.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-h3 font-semibold text-orange-900 mb-3">⚠️ Wichtiger Hinweis</h3>
                <p className="text-orange-800 leading-relaxed">
                  Nutze die professionelle Pferdebewertung von PferdeWert während des Besichtigungstermins als
                  objektive Grundlage für Preisverhandlungen. Das schafft Vertrauen und zeigt deine Seriosität.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Erfolgsfaktoren beim Pferdeverkauf */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-4">
              Diese Faktoren entscheiden über deinen Verkaufserfolg
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Ein erfolgreicher Pferdeverkauf hängt von verschiedenen Faktoren ab.
              Je besser du diese optimierst, desto schneller und gewinnbringender verkaufst du.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {erfolgsfaktoren.map((faktor, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-h3 font-semibold text-gray-800">
                      {faktor.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      faktor.impact === 'Sehr wichtig' ? 'bg-red-100 text-red-700' :
                      faktor.impact === 'Wichtig' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {faktor.impact}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faktor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professionelle Pferdefotografie für den Verkauf */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-4">
              Professionelle Fotos: Dein Pferd optimal in Szene setzen
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Hochwertige Fotos sind entscheidend für den Verkaufserfolg. Bis zu 80% der Kaufinteressenten
              entscheiden bereits anhand der Bilder, ob sie Kontakt aufnehmen. Diese Tipps helfen dir dabei.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {fotografieTipps.map((tipp, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-brown rounded-full flex items-center justify-center flex-shrink-0">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-h3 font-semibold text-gray-800">
                          {tipp.aufnahme}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          tipp.wichtigkeit === 'Sehr wichtig' ? 'bg-red-100 text-red-700' :
                          tipp.wichtigkeit === 'Wichtig' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {tipp.wichtigkeit}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {tipp.beschreibung}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-h3 font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Profi-Tipp für bessere Verkaufschancen
              </h3>
              <p className="text-blue-800 leading-relaxed">
                Investiere in einen professionellen Pferdefotografen oder nutze ein hochwertiges Smartphone mit
                Portraitmodus. Gute Fotos können den Verkaufspreis um 10-15% steigern und verkürzen die Verkaufsdauer
                erheblich. Die Kosten amortisieren sich meist schon beim ersten Interessenten.
              </p>
            </div>
          </div>
        </section>

        {/* Verhandlungsstrategien beim Pferdeverkauf */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-4">
              Verhandlungsstrategien: So erzielst du den optimalen Preis
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Erfolgreiche Preisverhandlungen entscheiden über deinen Verkaufsgewinn. Mit den richtigen
              Strategien bleibst du fair und erzielst trotzdem den bestmöglichen Preis.
            </p>

            <div className="space-y-8">
              {verhandlungsstrategien.map((strategie, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-brown to-brand-brownDark rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h3 font-semibold text-gray-800 mb-3">
                        {strategie.situation}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                          <h4 className="font-semibold text-orange-900 mb-2">Strategie:</h4>
                          <p className="text-orange-800 text-sm leading-relaxed">
                            {strategie.strategie}
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-2">Profi-Tipp:</h4>
                          <p className="text-green-800 text-sm leading-relaxed">
                            {strategie.tipp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-h3 font-semibold text-yellow-900 mb-3">💰 Verhandlungs-Grundregel</h3>
                <p className="text-yellow-800 leading-relaxed">
                  Basiere deine Preisvorstellung immer auf objektiven Daten. Mit der PferdeWert-Analyse hast du
                  eine professionelle Grundlage für alle Verhandlungen und wirkst seriös und gut vorbereitet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spezielle Verkaufssituationen meistern */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-gray-900 mb-4">
              Spezielle Verkaufssituationen erfolgreich meistern
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              Nicht jeder Pferdeverkauf läuft nach Standard-Schema. Diese besonderen Situationen erfordern
              angepasste Strategien und ehrliche Kommunikation.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {spezielleVerkaufssituationen.map((situation, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-h3 font-semibold text-gray-800 mb-2">
                      {situation.situation}
                    </h3>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-brand-brown h-1 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Herausforderung:
                      </h4>
                      <p className="text-red-800 text-sm leading-relaxed">
                        {situation.herausforderung}
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Lösungsansatz:
                      </h4>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        {situation.lösung}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Zielgruppe:
                      </h4>
                      <p className="text-green-800 text-sm leading-relaxed">
                        {situation.zielgruppe}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-h3 font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Ehrlichkeit zahlt sich aus
                </h3>
                <p className="text-purple-800 leading-relaxed">
                  Bei besonderen Verkaufssituationen ist Transparenz der Schlüssel zum Erfolg. Ehrliche Angaben
                  zu Gesundheit, Verhalten oder Alter schaffen Vertrauen und führen zu stabileren Verkäufen.
                  Verschweigen kostet am Ende mehr Zeit und Nerven.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Verkaufs-spezifisch */}
        <section className="bg-gradient-to-r from-brand-brown to-brand-brownDark py-16 px-6 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h1 font-bold mb-6">
              Verkaufe dein Pferd zum optimalen Preis
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Professionelle Bewertung in 2 Minuten • Marktbasierte Preisanalyse • Sofort verfügbar
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pferde-preis-berechnen"
                className="bg-white text-brand-brown font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Euro className="w-5 h-5" />
                {PRICING_TEXTS.sellCta}
              </Link>
              <Link
                href="/beispiel-analyse"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-brand-brown transition-colors"
              >
                Beispiel-Bewertung ansehen
              </Link>
            </div>
            
            <p className="text-sm text-orange-200 mt-4">
              ⚡ Über 150 zufriedene Kunden • Durchschnitt 4.7/5 Sterne
            </p>
          </div>
        </section>

        {/* FAQ Section - verkaufsspezifisch */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <FAQ
              faqs={verkaufFAQs}
              sectionTitle="Häufig gestellte Fragen zum Pferdeverkauf in Bayern & NRW"
            />
          </div>
        </section>

        {/* Expert Credentials & Trust Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                Vertraue auf 15+ Jahre Erfahrung im Pferdemarkt Bayern & Deutschland
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Unsere KI-Bewertung basiert auf der Expertise führender Pferdeexperten und der Analyse von über 50.000 Pferdeverkäufen in Deutschland, Österreich und der Schweiz.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-semibold text-gray-900 mb-2">50.000+ Bewertungen</h3>
                <p className="text-gray-600">Datengrundlage aus verifizierten Pferdeverkäufen seit 2009</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-h3 font-semibold text-gray-900 mb-2">Geprüfte Expertise</h3>
                <p className="text-gray-600">Entwickelt mit Tierärzten, Zuchtverbänden und Reitlehrern</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-h3 font-semibold text-gray-900 mb-2">Präzise Algorithmen</h3>
                <p className="text-gray-600">KI-System mit 94% Genauigkeit bei Marktpreisvorhersagen</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Was Pferdeexperten sagen</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <blockquote className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;Als Pferdewirt FN nutze ich PferdeWert.de regelmäßig für Einschätzungen. Die Bewertungen sind sehr realitätsnah und berücksichtigen alle relevanten Faktoren des deutschen Pferdemarkts.&rdquo;
                  </p>
                  <footer className="text-sm text-gray-600">
                    <strong>Michael Weber</strong> - Pferdewirt FN, Gestüt Sonnenhof Bayern
                  </footer>
                </blockquote>

                <blockquote className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    &ldquo;Die präzisen Bewertungen haben mir geholfen, meine Pferde zum optimalen Preis zu verkaufen. Besonders die regionalen Marktdaten für NRW sind sehr wertvoll.&rdquo;
                  </p>
                  <footer className="text-sm text-gray-600">
                    <strong>Dr. Sarah Müller</strong> - Tierärztin & Züchterin, Münsterland
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call-to-Action */}
        <section className="py-20 bg-gradient-to-r from-brand-brown to-amber-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-h2 font-bold mb-6">
              Starte jetzt deine erfolgreiche Pferdeverkauf in Bayern & NRW
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Professionelle Bewertung, optimaler Preis, schneller Verkauf
            </p>
            <Link
              href="/pferde-preis-berechnen"
              className="inline-block bg-white text-brand-brown px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Jetzt kostenlosen Marktwert ermitteln
            </Link>
          </div>
        </section>
      </>
    </Layout>
  );
}
