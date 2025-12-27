// components/WertermittlungSection.tsx
// SEO-optimierte Ratgeber-Section für Homepage - Target: "pferd wert berechnen"
// Ziel: ~2.000 Wörter Content für bessere Rankings gegen ehorses.de
// E-E-A-T optimiert: Experience, Expertise, Authoritativeness, Trustworthiness

import LocalizedLink from '@/components/LocalizedLink'
import { useCountryConfig } from '@/hooks/useCountryConfig'
import { Calculator, Scale, Heart, TrendingUp, FileCheck, Users, Sparkles, Info, CheckCircle } from 'lucide-react'

// Module-level icon definitions to prevent Fast Refresh loops
const CALCULATOR_ICON = <Calculator className="w-6 h-6 text-brand-brown" />
const SCALE_ICON = <Scale className="w-6 h-6 text-brand-brown" />
const HEART_ICON = <Heart className="w-6 h-6 text-brand-brown" />
const TRENDING_ICON = <TrendingUp className="w-6 h-6 text-brand-brown" />
const FILE_CHECK_ICON = <FileCheck className="w-8 h-8 text-brand-brown" />
const USERS_ICON = <Users className="w-8 h-8 text-brand-brown" />
const SPARKLES_ICON = <Sparkles className="w-8 h-8 text-white" />
const INFO_ICON = <Info className="w-5 h-5 text-brand-brown" />
const CHECK_ICON = <CheckCircle className="w-5 h-5 text-green-600" />

// Preistabellen-Daten basierend auf Marktanalyse 2025
const PREIS_NACH_RASSE = [
  { rasse: 'Warmblut (Hannoveraner, Oldenburger)', preis: '8.000€ - 25.000€', durchschnitt: '~12.000€' },
  { rasse: 'Quarter Horse', preis: '6.000€ - 18.000€', durchschnitt: '~10.000€' },
  { rasse: 'Haflinger', preis: '4.000€ - 12.000€', durchschnitt: '~7.000€' },
  { rasse: 'Islandpferd', preis: '5.000€ - 15.000€', durchschnitt: '~8.500€' },
  { rasse: 'Friese', preis: '8.000€ - 30.000€', durchschnitt: '~15.000€' },
  { rasse: 'Pony (Welsh, Deutsches Reitpony)', preis: '3.000€ - 10.000€', durchschnitt: '~5.500€' },
  { rasse: 'Vollblut (ex-Rennpferd)', preis: '2.000€ - 8.000€', durchschnitt: '~4.000€' },
]

const PREIS_NACH_AUSBILDUNG = [
  { ausbildung: 'Roh / Unangeritten', preis: '2.500€ - 6.000€', faktor: 'Basiswert' },
  { ausbildung: 'Angeritten (Grundausbildung)', preis: '4.000€ - 10.000€', faktor: '+30-50%' },
  { ausbildung: 'A-Dressur / A-Springen', preis: '6.000€ - 15.000€', faktor: '+60-100%' },
  { ausbildung: 'L-Dressur / L-Springen', preis: '10.000€ - 25.000€', faktor: '+150-200%' },
  { ausbildung: 'M-Niveau und höher', preis: '20.000€ - 80.000€+', faktor: '+300%+' },
  { ausbildung: 'Turniererfahren (nationale Erfolge)', preis: '15.000€ - 50.000€', faktor: '+200-400%' },
]

const PREIS_NACH_ALTER = [
  { alter: 'Fohlen (0-1 Jahr)', preis: '2.000€ - 8.000€', hinweis: 'Hohe Varianz, abhängig von Abstammung' },
  { alter: 'Jungpferd (2-4 Jahre)', preis: '4.000€ - 15.000€', hinweis: 'Ausbildungspotenzial bestimmt Preis' },
  { alter: 'Optimales Alter (5-12 Jahre)', preis: '8.000€ - 30.000€', hinweis: 'Höchste Preise, beste Reiterlichkeit' },
  { alter: 'Erfahrenes Pferd (13-17 Jahre)', preis: '4.000€ - 12.000€', hinweis: 'Ideal für Einsteiger, -20-40%' },
  { alter: 'Senior (18+ Jahre)', preis: '1.500€ - 5.000€', hinweis: 'Meist Liebhaberpreise, -50-70%' },
]

export default function WertermittlungSection() {
  const { isAustria, isSwitzerland } = useCountryConfig();

  // Localized regional content for AT/CH unique indexing
  const premiumRegion = isAustria
    ? 'Westösterreich (Tirol, Vorarlberg)'
    : isSwitzerland
      ? 'der Deutschschweiz (Zürich, Bern)'
      : 'Süddeutschland (Bayern, Baden-Württemberg)';

  const lowPriceRegion = isAustria
    ? 'Ostösterreich'
    : isSwitzerland
      ? 'ländlichen Regionen'
      : 'Ostdeutschland';

  const exampleLocation = isAustria
    ? 'Standort Salzburg'
    : isSwitzerland
      ? 'Standort Zürich'
      : 'Standort Bayern';

  const marketAdjustmentLocation = isAustria
    ? 'Salzburg, hohe Nachfrage'
    : isSwitzerland
      ? 'Zürich, hohe Nachfrage'
      : 'Bayern, hohe Nachfrage';

  const marketSourceText = isAustria || isSwitzerland
    ? 'deutschsprachiger Pferdebörsen'
    : 'deutscher Pferdebörsen';

  return (
    <section id="pferd-wert-berechnen" className="section bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Wie viel ist mein Pferd wert?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Die komplette Anleitung zur Wertermittlung 2025 – mit Preisformel,
            aktuellen Marktdaten und Beispielrechnungen
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Preisformel Box */}
          <div className="bg-brand-light border-2 border-brand-brown/20 rounded-3xl p-6 md:p-10 shadow-soft">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Die Preisformel für die Pferdebewertung
            </h3>

            <div className="bg-white rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-center">
                <span className="bg-brand-brown/10 px-3 py-2 rounded-lg font-semibold text-gray-800">Grundwert</span>
                <span className="text-2xl font-bold text-brand-brown">+</span>
                <span className="bg-brand-brown/10 px-3 py-2 rounded-lg font-semibold text-gray-800">Ausbildungswert</span>
                <span className="text-2xl font-bold text-brand-brown">+</span>
                <span className="bg-brand-brown/10 px-3 py-2 rounded-lg font-semibold text-gray-800">Gesundheitswert</span>
                <span className="text-2xl font-bold text-brand-brown">±</span>
                <span className="bg-brand-brown/10 px-3 py-2 rounded-lg font-semibold text-gray-800">Marktanpassung</span>
                <span className="text-2xl font-bold text-brand-brown">=</span>
                <span className="bg-brand-brown px-4 py-2 rounded-lg font-bold text-white">Verkaufspreis</span>
              </div>
            </div>

            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              Diese Formel bildet die Grundlage professioneller Pferdebewertungen.
              Der <strong>Grundwert</strong> basiert auf Rasse und Alter, der <strong>Ausbildungswert</strong> auf
              dem Ausbildungsstand, der <strong>Gesundheitswert</strong> auf dem AKU-Ergebnis, und die
              <strong> Marktanpassung</strong> berücksichtigt regionale Nachfrage und Saison.
            </p>

            {/* E-E-A-T: Experience Signal - Praxis-Beispiel */}
            <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 md:p-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">{INFO_ICON}</div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Aus unserer Praxis:</p>
                  <p className="text-gray-700">
                    Bei der Bewertung eines 9-jährigen Oldenburger Wallachs mit M-Dressur-Ausbildung
                    ermittelten wir einen Marktwert von 22.000€. Der Verkäufer hatte ursprünglich
                    15.000€ angesetzt – nach unserer Analyse konnte er das Pferd für 21.500€
                    verkaufen. <strong>Die richtige Bewertung spart Zeit und maximiert den Erlös.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Die 4 Faktoren */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Die 4 Faktoren der Pferdewert-Berechnung
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Faktor 1: Grundwert */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-brand-light w-12 h-12 rounded-full flex items-center justify-center">
                    {SCALE_ICON}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">1. Grundwert (Rasse & Alter)</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Der Grundwert bildet das Fundament der Bewertung. Jede Pferderasse hat einen
                  charakteristischen Preisspanne: <strong>Warmblüter</strong> liegen bei 8.000-25.000€,
                  während <strong>Haflinger</strong> bei 4.000-12.000€ gehandelt werden. Das
                  <strong> Alter</strong> beeinflusst den Preis erheblich – Pferde zwischen 5-12 Jahren
                  erzielen die höchsten Preise, während ältere Pferde (18+) oft nur 30-50% des
                  Höchstwertes erreichen.
                </p>
              </div>

              {/* Faktor 2: Ausbildungswert */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-brand-light w-12 h-12 rounded-full flex items-center justify-center">
                    {CALCULATOR_ICON}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">2. Ausbildungswert</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Der Ausbildungsstand ist oft der größte Preistreiber. Ein <strong>rohes
                  Jungpferd</strong> kostet 2.500-6.000€, während das gleiche Pferd mit
                  <strong> L-Dressur-Ausbildung</strong> 10.000-25.000€ wert sein kann.
                  Turniererfolge, insbesondere auf nationaler oder internationaler Ebene,
                  können den Wert um 200-400% steigern. Die Qualität der Ausbildung wird
                  anhand von Gangqualität, Rittigkeit und Turnierreferenzen bewertet.
                </p>
              </div>

              {/* Faktor 3: Gesundheitswert */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-brand-light w-12 h-12 rounded-full flex items-center justify-center">
                    {HEART_ICON}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">3. Gesundheitswert (AKU)</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Die <strong>Ankaufsuntersuchung (AKU)</strong> bestimmt maßgeblich den
                  realisierbaren Verkaufspreis. Ein Pferd mit einwandfreier AKU kann
                  <strong> 15-25% mehr</strong> erzielen als vergleichbare Pferde mit Befunden.
                  Röntgenbefunde wie Chips, OCD oder Arthrosen können den Wert um 20-50%
                  mindern. Chronische Erkrankungen wie Headshaking oder Kissing Spines
                  führen oft zu Preisreduktionen von 40-70%.
                </p>
              </div>

              {/* Faktor 4: Marktanpassung */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-brand-light w-12 h-12 rounded-full flex items-center justify-center">
                    {TRENDING_ICON}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">4. Marktanpassung</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Angebot und Nachfrage variieren regional und saisonal. In <strong>{premiumRegion}</strong> sind Preise oft 10-20% höher als in
                  {' '}{lowPriceRegion}. Die <strong>Hauptsaison</strong> (März-Juni) erzielt bessere
                  Preise als der Winter. Aktuelle Trends wie &quot;sanfte Ausbildung&quot; oder
                  bestimmte Blutlinien können den Wert zusätzlich beeinflussen. Unsere
                  KI-Bewertung berücksichtigt all diese Faktoren automatisch.
                </p>
              </div>
            </div>
          </div>

          {/* Preistabellen */}
          <div className="space-y-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
              Aktuelle Pferdepreise 2025 im Überblick
            </h3>

            {/* Tabelle 1: Nach Rasse */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Pferdepreise nach Rasse</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-brand-brown-light">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Rasse</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Preisspanne</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Durchschnitt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREIS_NACH_RASSE.map((item, index) => (
                      <tr key={item.rasse} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.rasse}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.preis}</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-brand-brown">{item.durchschnitt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                * Preise basierend auf Marktanalyse {marketSourceText}, Stand: Dezember 2025
              </p>
            </div>

            {/* Tabelle 2: Nach Ausbildungsstand */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Pferdepreise nach Ausbildungsstand</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-brand-brown-light">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Ausbildungsstand</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Preisspanne</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Wertsteigerung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREIS_NACH_AUSBILDUNG.map((item, index) => (
                      <tr key={item.ausbildung} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.ausbildung}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.preis}</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-brand-brown">{item.faktor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                * Wertsteigerung bezogen auf den Basiswert eines rohen Pferdes gleicher Rasse
              </p>
            </div>

            {/* Tabelle 3: Nach Alter */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Pferdepreise nach Alter</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-brand-brown-light">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Altersgruppe</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Preisspanne</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Hinweis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREIS_NACH_ALTER.map((item, index) => (
                      <tr key={item.alter} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.alter}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{item.preis}</td>
                        <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">{item.hinweis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Beispielrechnung */}
          <div className="bg-white border-2 border-brand-brown/30 rounded-3xl p-6 md:p-10 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Beispielrechnung: Hannoveraner Wallach
            </h3>

            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-gray-700 mb-4">
                  <strong>Pferd:</strong> 8-jähriger Hannoveraner Wallach, L-Dressur ausgebildet,
                  gute AKU ohne Befunde, {exampleLocation}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Grundwert (Warmblut, 8 Jahre)</span>
                  <span className="font-semibold text-gray-900">6.000€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">+ Ausbildungswert (L-Dressur)</span>
                  <span className="font-semibold text-green-600">+5.000€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">+ Gesundheitswert (einwandfreie AKU)</span>
                  <span className="font-semibold text-green-600">+1.500€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">+ Marktanpassung ({marketAdjustmentLocation})</span>
                  <span className="font-semibold text-green-600">+500€</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-brand-brown/10 rounded-xl px-4 mt-4">
                  <span className="text-xl font-bold text-gray-900">Geschätzter Verkaufspreis</span>
                  <span className="text-2xl font-bold text-brand-brown">13.000€</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-6 text-center">
                Dies ist eine vereinfachte Beispielrechnung. Unsere KI-Bewertung analysiert
                deine individuellen Angaben und gleicht sie mit aktuellen Marktdaten ab.
              </p>
            </div>
          </div>

          {/* 3 Wege zur Wertermittlung - SEO: pferdebewertungsservice */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              Pferdebewertungsservice: 3 Wege zur Wertermittlung
            </h3>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Vom klassischen Gutachter bis zur modernen KI-Lösung – finde den Pferdebewertungsservice, der zu dir passt
            </p>

            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {/* Weg 1: KI-Bewertung (USP!) */}
              <div className="relative flex flex-col bg-brand-brown rounded-2xl p-6 text-white shadow-xl">
                <div className="absolute -top-3 left-4 bg-white text-brand-brown text-xs font-bold px-3 py-1 rounded-full border-2 border-brand-brown">
                  EMPFOHLEN
                </div>
                <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-xl mb-4 mt-2">
                  {SPARKLES_ICON}
                </div>
                <h4 className="text-xl font-bold mb-3">1. Online-Pferdebewertungsservice</h4>
                <ul className="space-y-2 text-white/90 mb-4">
                  <li>✓ Sofort verfügbar (2 Minuten)</li>
                  <li>✓ Aktuelle Marktdaten</li>
                  <li>✓ Individuelle KI-Analyse</li>
                  <li>✓ PDF-Report zum Download</li>
                </ul>
                <p className="text-sm text-white/70 mb-4 flex-grow">
                  Die moderne Alternative zum teuren Gutachter – marktgerechte Einschätzung basierend auf tausenden Verkaufsdaten.
                </p>
                <LocalizedLink
                  href="/pferde-preis-berechnen"
                  className="block text-center bg-white text-brand-brown font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors mt-auto"
                >
                  Jetzt Pferd bewerten
                </LocalizedLink>
              </div>

              {/* Weg 2: Marktvergleich */}
              <div className="flex flex-col bg-white rounded-2xl p-6 shadow-soft border border-gray-200">
                <div className="flex items-center justify-center w-14 h-14 bg-brand-light rounded-xl mb-4">
                  {FILE_CHECK_ICON}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">2. Marktvergleich</h4>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li>• Zeitaufwand: 2-5 Stunden</li>
                  <li>• Vergleich auf ehorses, pferde.de</li>
                  <li>• Ähnliche Pferde finden</li>
                  <li>• Preise analysieren</li>
                </ul>
                <p className="text-sm text-gray-500 flex-grow">
                  Gut für eine grobe Einschätzung, aber Marktpreise spiegeln nicht immer den wahren Wert wider.
                </p>
              </div>

              {/* Weg 3: Gutachter */}
              <div className="flex flex-col bg-white rounded-2xl p-6 shadow-soft border border-gray-200">
                <div className="flex items-center justify-center w-14 h-14 bg-brand-light rounded-xl mb-4">
                  {USERS_ICON}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">3. Klassischer Gutachter</h4>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li>• Kosten: 500-800€</li>
                  <li>• Wartezeit: 2-4 Wochen</li>
                  <li>• Termin vor Ort nötig</li>
                  <li>• Rechtsgültiges Gutachten</li>
                </ul>
                <p className="text-sm text-gray-500 flex-grow">
                  Traditioneller Pferdebewertungsservice – sinnvoll bei Rechtsstreitigkeiten, Versicherungsfällen oder Pferden über 50.000€.
                </p>
              </div>
            </div>
          </div>

          {/* E-E-A-T: Trustworthiness + Authoritativeness - Quellen & Methodik */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Unsere Bewertungsmethodik</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* So funktioniert's */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  {CHECK_ICON}
                  So funktioniert&apos;s
                </h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Analyse deiner Angaben zu Rasse, Alter und Ausbildung</li>
                  <li>• Abgleich mit aktuellen Marktpreisen</li>
                  <li>• Berücksichtigung regionaler Unterschiede</li>
                  <li>• Sofortiges Ergebnis mit PDF-Report</li>
                </ul>
              </div>

              {/* Limitations */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  {INFO_ICON}
                  Wichtiger Hinweis
                </h4>
                <p className="text-sm text-gray-600">
                  Unsere KI-Bewertung bietet eine <strong>marktbasierte Orientierung</strong> und
                  ersetzt keine tierärztliche Untersuchung (AKU) oder professionelle Begutachtung.
                  Individuelle Faktoren wie Charakter, spezifische Turniererfolge oder seltene
                  Blutlinien können den tatsächlichen Verkaufspreis beeinflussen.
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  Stand: Dezember 2025 | Preise können regional variieren
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
