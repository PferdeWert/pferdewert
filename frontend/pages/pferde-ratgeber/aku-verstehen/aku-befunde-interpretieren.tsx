import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../../../components/Breadcrumbs';

interface BefundClass {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  purchaseRecommendation: string;
  legalNote: string;
  examples: string[];
}

const befundClasses: BefundClass[] = [
  {
    id: 'klasse-1',
    name: 'Klasse I - Ohne besonderen Befund',
    description: 'Röntgenologisch ohne besonderen Befund. Das Pferd zeigt keine auffälligen Veränderungen in den untersuchten Bereichen.',
    riskLevel: 'low',
    purchaseRecommendation: 'Kaufempfehlung: Uneingeschränkt empfehlenswert für alle Nutzungsarten.',
    legalNote: 'Rechtlich: Keine Gewährleistungsansprüche bei späteren Erkrankungen.',
    examples: [
      'Normale Gelenkstrukturen ohne Auffälligkeiten',
      'Physiologische Knochenkontur',
      'Altersentsprechende Befunde ohne pathologische Veränderungen'
    ]
  },
  {
    id: 'klasse-2',
    name: 'Klasse II - Geringfügige Veränderungen',
    description: 'Geringfügige röntgenologische Veränderungen, die in der Regel keine klinische Bedeutung haben und die Nutzung nicht einschränken.',
    riskLevel: 'low',
    purchaseRecommendation: 'Kaufempfehlung: Für die meisten Nutzungsarten geeignet. Bei Hochleistungssport individuelle Abwägung.',
    legalNote: 'Rechtlich: Befunde müssen dem Käufer mitgeteilt werden.',
    examples: [
      'Kleine, runde Verschattungen (Chips) ohne Gelenkbeteiligung',
      'Geringfügige Umbauvorgänge an Gelenkrändern',
      'Kleine Exostosen ohne funktionelle Bedeutung'
    ]
  },
  {
    id: 'klasse-3',
    name: 'Klasse III - Deutliche Veränderungen',
    description: 'Deutliche röntgenologische Veränderungen, die möglicherweise die Nutzung beeinträchtigen können oder einer besonderen Aufmerksamkeit bedürfen.',
    riskLevel: 'medium',
    purchaseRecommendation: 'Kaufempfehlung: Eingeschränkt empfehlenswert. Nutzung sollte an die Befunde angepasst werden.',
    legalNote: 'Rechtlich: Ausführliche Aufklärung erforderlich. Mögliche Gewährleistungsansprüche.',
    examples: [
      'Arthrotische Veränderungen mittleren Grades',
      'Beginnende Spat-Veränderungen',
      'Deutliche Chip-Bildungen mit Gelenkbeteiligung'
    ]
  },
  {
    id: 'klasse-4',
    name: 'Klasse IV - Erhebliche Veränderungen',
    description: 'Erhebliche röntgenologische Veränderungen, die wahrscheinlich die Nutzung beeinträchtigen und regelmäßige tierärztliche Kontrollen erfordern.',
    riskLevel: 'high',
    purchaseRecommendation: 'Kaufempfehlung: Nur für spezielle Nutzungen oder bei entsprechendem Preisnachlass.',
    legalNote: 'Rechtlich: Umfassende Aufklärung zwingend erforderlich. Hohe Gewährleistungsrisiken.',
    examples: [
      'Ausgeprägte arthrotische Veränderungen',
      'Deutliche Spat-Befunde mit Funktionseinschränkung',
      'Größere Chip-Frakturen oder Gelenkveränderungen'
    ]
  },
  {
    id: 'klasse-5',
    name: 'Klasse V - Massive Veränderungen',
    description: 'Massive röntgenologische Veränderungen, die erhebliche Beeinträchtigungen erwarten lassen und meist eine eingeschränkte oder spezielle Nutzung zur Folge haben.',
    riskLevel: 'critical',
    purchaseRecommendation: 'Kaufempfehlung: Nur für sehr spezielle Zwecke oder als Therapiepferd.',
    legalNote: 'Rechtlich: Vollständige Offenlegung erforderlich. Sehr hohe Gewährleistungsrisiken.',
    examples: [
      'Schwere arthrotische Veränderungen mit Gelenkversteifung',
      'Massive Spat-Befunde',
      'Ausgedehnte Knochenveränderungen mit Funktionsverlust'
    ]
  }
];

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low': return 'text-green-600 bg-green-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'critical': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

const getRiskText = (level: string) => {
  switch (level) {
    case 'low': return 'Geringes Risiko';
    case 'medium': return 'Mittleres Risiko';
    case 'high': return 'Hohes Risiko';
    case 'critical': return 'Sehr hohes Risiko';
    default: return 'Unbekannt';
  }
};

export default function AKUBefundeInterpretieren() {
  const [selectedClass, setSelectedClass] = useState<string>('klasse-1');
  const [showComparison, setShowComparison] = useState(false);

  const selectedBefund = befundClasses.find(b => b.id === selectedClass);

  const breadcrumbItems = [
    { label: 'Pferde Ratgeber', href: '/pferde-ratgeber' },
    { label: 'AKU verstehen', href: '/pferde-ratgeber/aku-verstehen' },
    { label: 'AKU Befunde interpretieren', href: '/pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Guide",
    "name": "AKU Befunde richtig interpretieren - Kompletter Leitfaden",
    "description": "Lernen Sie, wie Sie AKU-Befunde der Klassen I-V richtig interpretieren und bewerten. Expertenrat für den Pferdekauf mit Risikoeinschätzung.",
    "author": {
      "@type": "Organization",
      "name": "PferdeWert.de",
      "url": "https://pferdewert.de"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PferdeWert.de"
    },
    "datePublished": "2024-01-15",
    "dateModified": "2024-01-15",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Was bedeuten die AKU-Befundklassen I bis V?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Die AKU-Befundklassen reichen von I (ohne besonderen Befund) bis V (massive Veränderungen). Jede Klasse gibt den Schweregrad der röntgenologischen Veränderungen an und hilft bei der Kaufentscheidung."
          }
        },
        {
          "@type": "Question",
          "name": "Kann ich ein Pferd mit Klasse III Befunden kaufen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pferde mit Klasse III Befunden sind eingeschränkt empfehlenswert. Die Nutzung sollte an die Befunde angepasst werden und regelmäßige tierärztliche Kontrollen sind ratsam."
          }
        }
      ]
    },
    "step": befundClasses.map((befund, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": befund.name,
      "text": befund.description
    }))
  };

  return (
    <>
      <Head>
        <title>AKU Befunde interpretieren: Klassen I-V richtig bewerten | PferdeWert.de</title>
        <meta
          name="description"
          content="Lernen Sie AKU-Befunde richtig zu interpretieren ✓ Klassen I-V erklärt ✓ Risikoeinschätzung ✓ Kaufempfehlungen ✓ Rechtliche Hinweise für den Pferdekauf"
        />
        <meta
          name="keywords"
          content="AKU Befunde interpretieren, Röntgenbilder Pferd deuten, Befundklassen AKU, AKU Ergebnisse verstehen, Pferdekauf Röntgen"
        />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AKU Befunde richtig interpretieren
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Verstehen Sie die Bedeutung der AKU-Befundklassen I bis V und treffen Sie
              fundierte Entscheidungen beim Pferdekauf. Unser Expertenguide erklärt alle
              Risikostufen und gibt konkrete Handlungsempfehlungen.
            </p>
          </header>

          {/* Interactive Class Selector */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Wählen Sie eine Befundklasse für detaillierte Informationen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {befundClasses.map((befund) => (
                <button
                  key={befund.id}
                  onClick={() => setSelectedClass(befund.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedClass === befund.id
                      ? 'border-brand-brown bg-brand-brown text-white'
                      : 'border-gray-200 hover:border-brand-brown bg-white text-gray-700'
                  }`}
                >
                  <div className="font-semibold text-sm">
                    Klasse {befund.id.split('-')[1].toUpperCase()}
                  </div>
                  <div className={`text-xs mt-2 px-2 py-1 rounded ${
                    selectedClass === befund.id
                      ? 'bg-white/20 text-white'
                      : getRiskColor(befund.riskLevel)
                  }`}>
                    {getRiskText(befund.riskLevel)}
                  </div>
                </button>
              ))}
            </div>

            {/* Detailed Class Information */}
            {selectedBefund && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedBefund.name}
                  </h3>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getRiskColor(selectedBefund.riskLevel)}`}>
                    {getRiskText(selectedBefund.riskLevel)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Beschreibung</h4>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {selectedBefund.description}
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Typische Beispiele</h4>
                    <ul className="space-y-2">
                      {selectedBefund.examples.map((example, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-brand-brown mr-2">•</span>
                          <span className="text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        💡 Kaufempfehlung
                      </h4>
                      <p className="text-blue-800 leading-relaxed">
                        {selectedBefund.purchaseRecommendation}
                      </p>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-amber-900 mb-3">
                        ⚖️ Rechtliche Hinweise
                      </h4>
                      <p className="text-amber-800 leading-relaxed">
                        {selectedBefund.legalNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Comparison Table */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Schnellvergleich aller Befundklassen
              </h2>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="bg-brand-brown text-white px-4 py-2 rounded-lg hover:bg-brand-brownDark transition-colors"
              >
                {showComparison ? 'Verbergen' : 'Vergleich anzeigen'}
              </button>
            </div>

            {showComparison && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Befundklasse
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Risiko
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Kaufempfehlung
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {befundClasses.map((befund) => (
                        <tr key={befund.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {befund.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(befund.riskLevel)}`}>
                              {getRiskText(befund.riskLevel)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {befund.purchaseRecommendation}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Expert Tips Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Experten-Tipps zur Befund-Interpretation
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🔍 Was Sie beachten sollten
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">•</span>
                    <span>Alter des Pferdes bei der Bewertung berücksichtigen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">•</span>
                    <span>Geplante Nutzung mit den Befunden abgleichen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">•</span>
                    <span>Zweitmeinung bei kritischen Befunden einholen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-brown mr-2">•</span>
                    <span>Kaufpreis entsprechend der Befunde anpassen</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  ⚠️ Häufige Fehler vermeiden
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Befunde ohne Fachkenntnisse selbst interpretieren</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Verkäufer die AKU-Ergebnisse verschweigen lassen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Bei Klasse III+ Befunden ohne Beratung kaufen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Rechtliche Konsequenzen unterschätzen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-brand-brown to-brand-brownDark rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Benötigen Sie Hilfe bei der Pferdebewertung?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nutzen Sie unsere KI-gestützte Pferdebewertung für eine objektive Einschätzung
              des Marktwertes unter Berücksichtigung der AKU-Befunde.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-brand-brown px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Jetzt Pferd bewerten lassen
            </Link>
          </div>

          {/* Related Links */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Weitere hilfreiche Artikel
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/pferde-ratgeber/aku-verstehen"
                className="text-brand-brown hover:text-brand-brownDark hover:underline"
              >
                ← Zurück zur AKU-Übersicht
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/pferde-ratgeber"
                className="text-brand-brown hover:text-brand-brownDark hover:underline"
              >
                Alle Ratgeber-Artikel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}