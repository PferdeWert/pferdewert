// frontend/pages/datenschutz.tsx
import Head from "next/head";
import { useState, useEffect } from "react";
import { Shield, Lock, Eye, Users, FileText, Phone, Mail, ExternalLink, CheckCircle, AlertCircle, Clock, UserCheck } from "lucide-react";
import Layout from "@/components/Layout";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export default function Datenschutz() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  // Table of Contents automatisch generieren
  const tocItems: TOCItem[] = [
    { id: "einleitung", title: "Einleitung und Verantwortlicher", level: 1 },
    { id: "grundlagen", title: "Rechtliche Grundlagen", level: 1 },
    { id: "datenarten", title: "Welche Daten wir erheben", level: 1 },
    { id: "pferdebewertung", title: "Datenverarbeitung bei Pferdebewertungen", level: 1 },
    { id: "zwecke", title: "Zwecke der Datenverarbeitung", level: 1 },
    { id: "rechtsgrundlagen", title: "Rechtsgrundlagen der Verarbeitung", level: 1 },
    { id: "empfaenger", title: "Datenempfänger und Übermittlung", level: 1 },
    { id: "drittlaender", title: "Übermittlung in Drittländer", level: 1 },
    { id: "speicherdauer", title: "Speicherdauer", level: 1 },
    { id: "cookies", title: "Cookies und Tracking", level: 1 },
    { id: "stripe", title: "Zahlungsabwicklung über Stripe", level: 1 },
    { id: "sicherheit", title: "Datensicherheit", level: 1 },
    { id: "rechte", title: "Ihre Rechte", level: 1 },
    { id: "kontakt", title: "Kontakt und Beschwerden", level: 1 }
  ];

  // Scroll-to-Section Handling
  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentDate = new Date().toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalDocument",
    "name": "Datenschutzerklärung PferdeWert",
    "description": "DSGVO-konforme Datenschutzerklärung für die AI-gestützte Pferdebewertungsplattform PferdeWert.de",
    "url": "https://pferdewert.de/datenschutz",
    "publisher": {
      "@type": "Organization",
      "name": "PferdeWert",
      "url": "https://pferdewert.de",
      "logo": "https://pferdewert.de/favicon.svg"
    },
    "dateModified": "2025-01-20",
    "inLanguage": "de-DE",
    "isPartOf": {
      "@type": "WebSite",
      "name": "PferdeWert",
      "url": "https://pferdewert.de"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Datenschutz",
        "sameAs": "https://de.wikipedia.org/wiki/Datenschutz"
      },
      {
        "@type": "Thing",
        "name": "DSGVO",
        "sameAs": "https://de.wikipedia.org/wiki/Datenschutz-Grundverordnung"
      },
      {
        "@type": "Thing",
        "name": "Pferdebewertung",
        "description": "AI-gestützte Bewertung von Pferden"
      }
    ]
  };

  return (
    <Layout>
      <Head>
        <title>Datenschutz | DSGVO-konforme Pferdebewertung | PferdeWert</title>
        <meta
          name="description"
          content="🔒 DSGVO-konforme Datenschutzerklärung für PferdeWert ➤ Transparente Datenverarbeitung bei AI-gestützter Pferdebewertung ✓ Ihre Rechte ✓ Sichere Zahlungsabwicklung ✓ Kontakt zum Datenschutzbeauftragten"
        />
        <meta name="keywords" content="datenschutz pferdebewertung, dsgvo pferde, pferdewert datenschutz, online pferdebewertung datenschutz, pferde bewertung dsgvo, datenschutz tierbewertung, pferdemarkt datenschutz" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pferdewert.de/datenschutz" />

        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Datenschutz | DSGVO-konforme Pferdebewertung | PferdeWert" />
        <meta property="og:description" content="DSGVO-konforme Datenschutzerklärung für AI-gestützte Pferdebewertung. Transparente Datenverarbeitung, Ihre Rechte und sichere Zahlungsabwicklung." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/datenschutz" />
        <meta property="og:image" content="https://pferdewert.de/og-datenschutz.jpg" />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar mit Inhaltsverzeichnis */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-brand-brown mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Inhaltsverzeichnis</h2>
              </div>
              <nav aria-label="Datenschutzerklärung Navigation">
                <ul className="space-y-2">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left w-full text-sm hover:text-brand-brown transition-colors ${
                          activeSection === item.id
                            ? 'text-brand-brown font-medium border-l-2 border-brand-brown pl-3'
                            : 'text-gray-600 pl-3'
                        }`}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Quick Contact Box */}
              <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center mb-2">
                  <UserCheck className="w-4 h-4 text-brand-brown mr-2" />
                  <h3 className="font-medium text-sm text-gray-900">Datenschutzbeauftragter</h3>
                </div>
                <p className="text-xs text-gray-600 mb-2">Haben Sie Fragen zum Datenschutz?</p>
                <a
                  href="mailto:datenschutz@pferdewert.de"
                  className="text-xs text-brand-brown hover:underline flex items-center"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  datenschutz@pferdewert.de
                </a>
              </div>
            </div>
          </aside>

          {/* Hauptinhalt */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-brand-brown mr-3" />
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Datenschutzerklärung
                </h1>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Clock className="w-4 h-4 mr-2" />
                <span>Letzte Aktualisierung: {currentDate}</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="font-medium text-green-900 mb-1">DSGVO-konforme Pferdebewertung</h2>
                    <p className="text-sm text-green-800">
                      Bei PferdeWert steht der Schutz Ihrer persönlichen Daten an oberster Stelle.
                      Unsere AI-gestützte Pferdebewertung erfolgt unter strengster Beachtung aller
                      datenschutzrechtlichen Bestimmungen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Einleitung */}
            <section id="einleitung" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-brand-brown mr-3" />
                Einleitung und Verantwortlicher
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Diese Datenschutzerklärung
                  informiert Sie umfassend über die Verarbeitung Ihrer personenbezogenen Daten bei der Nutzung
                  unserer AI-gestützten Pferdebewertungsplattform PferdeWert.de.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Verantwortlicher im Sinne der DSGVO:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>PferdeWert</strong></p>
                    <p>Benjamin Reder</p>
                    <p>E-Mail: <a href="mailto:kontakt@pferdewert.de" className="text-brand-brown hover:underline">kontakt@pferdewert.de</a></p>
                    <p>Website: <a href="https://pferdewert.de" className="text-brand-brown hover:underline">pferdewert.de</a></p>
                  </div>
                </div>
              </div>
            </section>

            {/* Rechtliche Grundlagen */}
            <section id="grundlagen" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rechtliche Grundlagen</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>EU-Datenschutz-Grundverordnung (DSGVO)</strong> - Artikel 6, 7, 12-22</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Bundesdatenschutzgesetz (BDSG)</strong> - in der aktuellen Fassung</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Telemediengesetz (TMG)</strong> - §§ 12-15</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Welche Daten wir erheben */}
            <section id="datenarten" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 text-brand-brown mr-3" />
                Welche Daten wir erheben
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-3">Bei der Pferdebewertung</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Pferdedetails (Rasse, Alter, Geschlecht, Ausbildung)</li>
                    <li>• Physische Eigenschaften (Größe, Farbe, Besonderheiten)</li>
                    <li>• Leistungsdaten und Turniererfolge</li>
                    <li>• Gesundheitsinformationen (AKU-Befunde)</li>
                    <li>• Fotos und Videos des Pferdes</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-3">Persönliche Daten</h3>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li>• E-Mail-Adresse (für Bewertungsversand)</li>
                    <li>• Name (optional, für personalisierte Ansprache)</li>
                    <li>• IP-Adresse (technisch erforderlich)</li>
                    <li>• Browser-Informationen</li>
                    <li>• Zahlungsdaten (über Stripe verarbeitet)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pferdebewertung spezifisch */}
            <section id="pferdebewertung" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Datenverarbeitung bei Pferdebewertungen</h2>
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <div className="flex items-start mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">Besonderheiten unserer AI-Pferdebewertung</h3>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Unsere AI-Algorithmen analysieren die von Ihnen eingegebenen Pferdedaten, um eine
                      marktbasierte Bewertung zu erstellen. Dabei werden ausschließlich die für die
                      Bewertung relevanten Informationen verarbeitet.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-amber-900 mb-2">Datenverarbeitung im Detail:</h4>
                    <ul className="space-y-2 text-sm text-amber-800">
                      <li>• <strong>Automatisierte Bewertung:</strong> AI-Algorithmen bewerten anhand von Marktdaten</li>
                      <li>• <strong>Keine Speicherung von Bildern:</strong> Fotos werden nur zur Analyse verwendet, nicht gespeichert</li>
                      <li>• <strong>Anonymisierte Marktdaten:</strong> Bewertungsergebnisse fließen anonym in Marktanalysen ein</li>
                      <li>• <strong>Sichere Übertragung:</strong> Alle Daten werden SSL-verschlüsselt übertragen</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Zwecke der Datenverarbeitung */}
            <section id="zwecke" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Zwecke der Datenverarbeitung</h2>
              <div className="grid gap-4">
                {[
                  {
                    title: "Pferdewertermittlung",
                    description: "Erstellung einer AI-gestützten Marktbewertung Ihres Pferdes",
                    icon: "💰"
                  },
                  {
                    title: "Vertragserfüllung",
                    description: "Bereitstellung der bestellten Bewertungsdienstleistung",
                    icon: "📋"
                  },
                  {
                    title: "Kundenservice",
                    description: "Beantwortung von Fragen und technischer Support",
                    icon: "🤝"
                  },
                  {
                    title: "Marktanalyse",
                    description: "Verbesserung unserer Algorithmen durch anonymisierte Datenanalyse",
                    icon: "📊"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg">
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Rechtsgrundlagen */}
            <section id="rechtsgrundlagen" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rechtsgrundlagen der Verarbeitung</h2>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-medium text-green-900 mb-2">Art. 6 Abs. 1 lit. b DSGVO - Vertragserfüllung</h3>
                  <p className="text-sm text-green-800">
                    Verarbeitung zur Erfüllung des Bewertungsvertrags und Bereitstellung der Dienstleistung
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-medium text-blue-900 mb-2">Art. 6 Abs. 1 lit. f DSGVO - Berechtigte Interessen</h3>
                  <p className="text-sm text-blue-800">
                    Website-Sicherheit, Betrugsschutz und Verbesserung unserer Dienstleistungen
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-medium text-purple-900 mb-2">Art. 6 Abs. 1 lit. a DSGVO - Einwilligung</h3>
                  <p className="text-sm text-purple-800">
                    Marketing-E-Mails und optionale Funktionen (nur mit Ihrer ausdrücklichen Zustimmung)
                  </p>
                </div>
              </div>
            </section>

            {/* Datenempfänger */}
            <section id="empfaenger" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Datenempfänger und Übermittlung</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ihre Daten werden nur an folgende Kategorien von Empfängern übermittelt:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Technische Dienstleister</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Hosting-Provider (Vercel, Render)</li>
                      <li>• E-Mail-Versand (für Bewertungsberichte)</li>
                      <li>• AI-Processing (GPT/Claude APIs)</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Zahlungsdienstleister</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Stripe (Kreditkartenzahlungen)</li>
                      <li>• Nur zur Zahlungsabwicklung</li>
                      <li>• EU-ansässige Niederlassung</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Drittländer */}
            <section id="drittlaender" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Übermittlung in Drittländer</h2>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">USA - AI-Processing</h3>
                    <p className="text-sm text-yellow-800 mb-3">
                      Für die AI-gestützte Pferdebewertung nutzen wir Dienste von OpenAI (GPT) und Anthropic (Claude)
                      mit Servern in den USA. Die Übermittlung erfolgt auf Basis von:
                    </p>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• EU-Standardvertragsklauseln (SCCs)</li>
                      <li>• Zusätzliche technische und organisatorische Maßnahmen</li>
                      <li>• Minimierung der übertragenen Daten</li>
                      <li>• Verschlüsselung bei der Übertragung</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Speicherdauer */}
            <section id="speicherdauer" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Speicherdauer</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Datenart</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Speicherdauer</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Grund</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Pferdebewertungsdaten</td>
                      <td className="px-4 py-3 text-sm text-gray-600">30 Tage</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Nachbearbeitung, Support</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">E-Mail-Adressen</td>
                      <td className="px-4 py-3 text-sm text-gray-600">2 Jahre</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Kundenservice, Garantieansprüche</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Zahlungsdaten</td>
                      <td className="px-4 py-3 text-sm text-gray-600">10 Jahre</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Steuerrechtliche Aufbewahrungspflicht</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">Website-Logs</td>
                      <td className="px-4 py-3 text-sm text-gray-600">7 Tage</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Sicherheit, Fehleranalyse</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookies und Tracking */}
            <section id="cookies" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies und Tracking</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Verwendete Cookies</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Technisch erforderlich</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Session-Management</li>
                        <li>• Zahlungsabwicklung</li>
                        <li>• Sicherheitsfeatures</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Analytik (optional)</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Website-Optimierung</li>
                        <li>• Anonyme Nutzungsstatistiken</li>
                        <li>• Performance-Monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCookieSettings(!showCookieSettings)}
                  className="bg-brand-brown hover:bg-brand-brownDark text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Cookie-Einstellungen verwalten
                </button>

                {showCookieSettings && (
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-4">Cookie-Einstellungen</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Technisch erforderlich</h4>
                          <p className="text-sm text-blue-700">Für Grundfunktionen der Website</p>
                        </div>
                        <span className="text-sm text-blue-700 font-medium">Immer aktiv</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Analytik</h4>
                          <p className="text-sm text-blue-700">Anonyme Nutzungsstatistiken</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">
                        Einstellungen speichern
                      </button>
                      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm font-medium">
                        Alle akzeptieren
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Stripe Zahlungsabwicklung */}
            <section id="stripe" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 text-brand-brown mr-3" />
                Zahlungsabwicklung über Stripe
              </h2>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Sichere Zahlungsabwicklung</h3>
                    <p className="text-sm text-green-800 mb-4">
                      Für die Abwicklung von Zahlungen nutzen wir Stripe Payments Europe, Ltd.
                      (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland) - einen der
                      weltweit führenden und sichersten Zahlungsdienstleister.
                    </p>
                    <div className="space-y-2 text-sm text-green-800">
                      <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</p>
                      <p><strong>Übermittlung:</strong> Ihre Zahlungsdaten werden direkt an Stripe übertragen</p>
                      <p><strong>Sicherheit:</strong> PCI DSS Level 1 zertifiziert, höchste Sicherheitsstandards</p>
                      <p><strong>Speicherung:</strong> Wir speichern keine Kreditkartendaten auf unseren Servern</p>
                    </div>
                    <p className="text-sm text-green-800 mt-4">
                      Weitere Informationen:
                      <a
                        href="https://stripe.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 hover:underline ml-1 inline-flex items-center"
                      >
                        Stripe Datenschutzerklärung
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Datensicherheit */}
            <section id="sicherheit" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-brand-brown mr-3" />
                Datensicherheit
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Wir haben umfangreiche technische und organisatorische Maßnahmen implementiert,
                  um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Technische Maßnahmen</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>SSL/TLS-Verschlüsselung für alle Datenübertragungen</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Verschlüsselte Datenspeicherung</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Regelmäßige Sicherheitsupdates</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Firewall und Intrusion Detection</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Regelmäßige Datensicherungen</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Organisatorische Maßnahmen</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Strenge Zugangskontrollen</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Mitarbeiterschulungen zum Datenschutz</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Vertraulichkeitsverpflichtungen</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Regelmäßige Sicherheitsaudits</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Incident Response Verfahren</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Ihre Rechte */}
            <section id="rechte" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ihre Rechte</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Sie haben umfassende Rechte bezüglich Ihrer personenbezogenen Daten:
                </p>

                <div className="grid gap-4">
                  {[
                    {
                      title: "Auskunftsrecht (Art. 15 DSGVO)",
                      description: "Sie haben das Recht zu erfahren, welche Daten wir über Sie verarbeiten.",
                      action: "Auskunft anfordern"
                    },
                    {
                      title: "Berichtigungsrecht (Art. 16 DSGVO)",
                      description: "Sie können die Korrektur falscher oder unvollständiger Daten verlangen.",
                      action: "Korrektur beantragen"
                    },
                    {
                      title: "Löschungsrecht (Art. 17 DSGVO)",
                      description: "Sie können die Löschung Ihrer Daten verlangen, wenn die Voraussetzungen erfüllt sind.",
                      action: "Löschung beantragen"
                    },
                    {
                      title: "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
                      description: "Sie können eine Einschränkung der Datenverarbeitung verlangen.",
                      action: "Einschränkung beantragen"
                    },
                    {
                      title: "Datenübertragbarkeit (Art. 20 DSGVO)",
                      description: "Sie können Ihre Daten in einem strukturierten Format erhalten.",
                      action: "Datenexport anfordern"
                    },
                    {
                      title: "Widerspruchsrecht (Art. 21 DSGVO)",
                      description: "Sie können der Verarbeitung Ihrer Daten aus besonderen Gründen widersprechen.",
                      action: "Widerspruch einlegen"
                    }
                  ].map((right, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{right.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{right.description}</p>
                        </div>
                        <a
                          href="mailto:datenschutz@pferdewert.de"
                          className="ml-4 inline-flex items-center text-sm text-brand-brown hover:text-brand-brownDark font-medium"
                        >
                          {right.action}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mt-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Widerruf von Einwilligungen</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    Sie können erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft widerrufen.
                    Dies betrifft beispielsweise Marketing-E-Mails oder optionale Cookies.
                  </p>
                  <a
                    href="mailto:datenschutz@pferdewert.de"
                    className="inline-flex items-center text-sm text-blue-700 hover:text-blue-800 font-medium"
                  >
                    Einwilligung widerrufen
                    <Mail className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </section>

            {/* Kontakt und Beschwerden */}
            <section id="kontakt" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="w-6 h-6 text-brand-brown mr-3" />
                Kontakt und Beschwerden
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Datenschutzbeauftragter</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-brand-brown mr-3" />
                      <a
                        href="mailto:datenschutz@pferdewert.de"
                        className="text-brand-brown hover:underline"
                      >
                        datenschutz@pferdewert.de
                      </a>
                    </div>
                    <p className="text-sm text-gray-600">
                      Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte kontaktieren Sie
                      uns direkt. Wir bearbeiten Ihre Anfrage umgehend.
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-4">Beschwerderecht</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-orange-800">
                      Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren:
                    </p>
                    <div className="text-sm text-orange-800">
                      <p><strong>Bayerisches Landesamt für Datenschutzaufsicht</strong></p>
                      <p>Promenade 18, 91522 Ansbach</p>
                      <p>E-Mail: poststelle@lda.bayern.de</p>
                      <p>Website:
                        <a
                          href="https://www.lda.bayern.de"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-700 hover:underline ml-1"
                        >
                          lda.bayern.de
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Info */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Änderungen dieser Datenschutzerklärung</h3>
                  <p className="text-sm text-gray-600">
                    Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren,
                    um rechtlichen Änderungen oder Anpassungen unserer Dienstleistungen Rechnung zu tragen.
                    Die aktuelle Version finden Sie stets unter dieser URL. Bei wesentlichen Änderungen
                    informieren wir Sie per E-Mail.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Stand: {currentDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}