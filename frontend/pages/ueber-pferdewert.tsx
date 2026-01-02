import Head from "next/head"
import { useMemo } from "react"
import Image from "next/image"
import Layout from "@/components/Layout"
import LocalizedLink from "@/components/LocalizedLink"
import { PRICING_FORMATTED } from "@/lib/pricing"
import { Shield, Zap, Target } from "lucide-react"
import useSEOHreflang, { useCanonicalUrl } from "@/hooks/useSEOHreflang"
import { useCountryConfig } from "@/hooks/useCountryConfig"

export default function UeberUns() {
  const canonicalUrl = useCanonicalUrl('/ueber-pferdewert')
  const hreflangTags = useSEOHreflang('/ueber-pferdewert')
  const { isAustria, isSwitzerland } = useCountryConfig();

  // Localized content
  const countryName = isAustria ? 'Österreich' : isSwitzerland ? 'Schweiz' : 'Deutschland';
  const countryCode = isAustria ? 'AT' : isSwitzerland ? 'CH' : 'DE';
  const leadingPlatformText = isAustria
    ? 'Österreichs führende KI-basierte Online-Pferdebewertung'
    : isSwitzerland
      ? 'Die Schweizer KI-basierte Online-Pferdebewertung'
      : 'Deutschlands führende KI-basierte Online-Pferdebewertung';
  const numberOneText = isAustria
    ? 'Österreichs #1 Online-Pferdebewertung'
    : isSwitzerland
      ? 'Die Schweizer Online-Pferdebewertung'
      : 'Deutschlands #1 Online-Pferdebewertung';

  const domain = useMemo(() => {
    const url = new URL(canonicalUrl)
    return `${url.protocol}//${url.host}`
  }, [canonicalUrl])

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Über PferdeWert.de | KI-Experten für Pferdebewertung & Marktwertanalyse</title>
        <meta
          name="description"
          content={`🐎 PferdeWert.de Team: Pferdefamilie mit KI-Expertise für präzise Pferdebewertungen ab ${PRICING_FORMATTED.current} ➤ Transparent & fair ✓ Von Reitern für Reiter ✓ ${numberOneText} ✓`}
        />
        <meta name="keywords" content="pferdebewertung experte, pferde sachverständiger, pferdewert team, ki pferdebewertung, online pferdegutachter" />
        <meta property="og:title" content="Über PferdeWert.de | KI-Experten für Pferdebewertung" />
        <meta
          property="og:description"
          content={`Pferdefamilie mit KI-Expertise: ${leadingPlatformText}. Transparent, fair und von Experten entwickelt.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${domain}/images/shared/familie-blossi.webp`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Über PferdeWert.de | KI-Experten für Pferdebewertung" />
        <meta property="twitter:description" content={`Pferdefamilie mit KI-Expertise: ${leadingPlatformText}.`} />
        <meta property="twitter:image" content={`${domain}/images/shared/familie-blossi.webp`} />
        <link rel="canonical" href={canonicalUrl} />
        {hreflangTags}

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PferdeWert.de",
              "alternateName": "PferdeWert",
              "description": `${leadingPlatformText}. Transparent, fair und präzise Marktwertanalysen für Pferde.`,
              "url": domain,
              "logo": `${domain}/web-app-manifest-512x512.png`,
              "foundingDate": "2025",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Benjamin Reder",
                  "jobTitle": "Gründer & KI-Entwickler",
                  "description": "Über 10 Jahre Erfahrung in der Digitalbranche, Pferdebesitzer seit 2017"
                }
              ],
              "areaServed": {
                "@type": "Country",
                "name": countryName
              },
              "serviceType": "Pferdebewertung und Marktwertanalyse",
              "expertise": [
                "KI-basierte Pferdebewertung",
                "Marktwertanalyse für Pferde",
                "Datenbasierte Preisermittlung",
                "Online-Pferdegutachten"
              ],
              "sameAs": [
                "https://instagram.com/pferdewert.de/",
                "https://facebook.com/profile.php?id=61578324567676"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": domain
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": countryCode
              }
            })
          }}
        />

        {/* AboutPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "mainEntity": {
                "@type": "Organization",
                "name": "PferdeWert.de"
              },
              "description": "Erfahren Sie mehr über das PferdeWert.de Team - eine Pferdefamilie mit KI-Expertise, die den Pferdemarkt transparenter und fairer gestaltet.",
              "url": canonicalUrl
            })
          }}
        />
      </Head>

      <div className="flex-1">

        {/* Hero Section - Full Width Family Image */}
        <section id="hero" className="relative">
          {/* Full-width Hero Image */}
          <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <Image
              src="/images/shared/familie-blossi.webp"
              alt="Die PferdeWert Familie: Benjamin Reder mit Familie und Stute Blossi"
              fill
              className="object-cover object-[center_20%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
              <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  Über uns
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                  Eine kleine Pferdefamilie mit großer Mission: Den Pferdemarkt transparenter, fairer und einfach besser zu machen – mit KI-Power und viel Herzblut.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wer wir sind */}
        <section className="py-12 lg:py-20 section-fade-in" id="wer-wir-sind">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-bold text-gray-900 mb-8">Wer wir sind</h2>

              <div className="mb-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    <strong className="text-gray-900">Ich bin Benjamin Reder</strong> und habe PferdeWert 2025 zusammen mit meiner Frau gegründet. Mit über 10 Jahren Erfahrung in der Digitalbranche und als Pferdebesitzer seit 2017 verbinde ich KI-Expertise mit dem Alltag unserer Pferdefamilie. Blossi ist bereits unser zweites Pferd.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    👨‍👩‍👧‍👦 Wir sind eine Familie mit zwei kleinen Kindern – und mit ganzem Herzen Pferdemenschen.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    🐴 Unsere Stute Blossi (6 Jahre jung, Deutsches Sportpferd) begleitet uns täglich – clever, sensibel und
                    manchmal ganz schön dickköpfig.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PferdeWert Social Media - direkt nach Wer wir sind */}
        <section className="py-12 lg:py-16 bg-amber-50/50" id="social">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
                Folge PferdeWert
              </h2>
              <p className="text-gray-600 mb-6">
                📸 Begleite unsere Reise mit Blossi und PferdeWert
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="https://instagram.com/pferdewert.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 px-6 py-3 rounded-full bg-white border border-gray-200 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span className="text-sm font-medium">Instagram</span>
                </a>

                <a
                  href="https://facebook.com/profile.php?id=61578324567676"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 px-6 py-3 rounded-full bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span className="text-sm font-medium">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Wie PferdeWert entstand */}
        <section className="py-12 lg:py-20 section-fade-in" id="entstehung">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-bold text-gray-900 mb-8">Wie PferdeWert entstand</h2>

              {/* Die Entstehungsgeschichte */}
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Das Problem, das wir selbst kannten</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Die Idee zu PferdeWert entstand beim Joggen – aus einem Gefühl, das viele kennen: Beim Pferdekauf haben
                    wir lange gesucht, viel verglichen – aber nie gewusst,
                    <span className="font-semibold text-brand-brown"> was ein fairer Preis ist</span>. Und auch beim Verkauf
                    eines Pferdes Jahre zuvor taten wir uns schwer:
                    <em> Was ist ein fairer und realistischer Verkaufspreis?</em>
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Die KI-Revolution im Pferdemarkt</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Da wir uns beruflich und privat viel mit{" "}
                    <span className="font-semibold text-brand-brown">Künstlicher Intelligenz</span> beschäftigen, stellten wir
                    uns die Frage: &ldquo;Können KI-Modelle den Marktwert von Pferden einschätzen?&rdquo; Und die Antwort hat uns
                    verblüfft: <span className="font-semibold text-brand-brown">Ja, und zwar ziemlich genau.</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Von der Idee zur Realität</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Aus dieser Neugier wurde ein kleines Projekt – und aus diesem Projekt entstand:{" "}
                    <span className="font-bold text-brand-brown text-xl">PferdeWert.de</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-12 lg:py-20 section-fade-in" id="mission">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-bold text-gray-900 mb-8">Unsere Mission</h2>

              {/* Hauptmission */}
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Transparenz für den deutschsprachigen Pferdemarkt</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Wir wollen, dass jeder Pferdemensch – ob Käufer, Verkäufer oder Besitzer – den Marktwert eines Pferdes
                    <span className="font-semibold text-brand-brown"> realistisch und fair einschätzen</span> kann. Ohne
                    teure Experten. Ohne Rätselraten. Ohne Bauchgefühl. Sondern mit einer datenbasierten, neutralen Analyse.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Objektive Entscheidungshilfe</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Natürlich bleibt der Pferdekauf eine emotionale Entscheidung. Wer sich verliebt, zahlt oft mehr –
                    und das ist auch völlig okay. Aber gerade{" "}
                    <span className="font-semibold text-brand-brown">weil so viele Emotionen im Spiel sind</span>, ist ein
                    rationaler Ausgangspunkt wertvoll: Eine objektive Analyse hilft dir, bewusst und mit klarem Kopf zu
                    entscheiden – egal, in welche Richtung.
                  </p>
                </div>
              </div>

              {/* Unsere Lösung */}
              <div className="bg-[#fdf7f1] p-8 rounded-xl border border-[#e0c9aa] mb-8">
                <h3 className="text-2xl font-semibold text-brand-brown mb-6">
                  <span className="font-bold">PferdeWert.de</span> - Die professionelle Lösung:
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-6 h-6 text-brand-brown mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-brand-brown mb-1">Schnell & Effizient</h4>
                      <p className="text-sm text-gray-700">In nur 2 Minuten hast du dein Ergebnis - keine langen Wartezeiten</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-brand-brown mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-brand-brown mb-1">Neutral & Objektiv</h4>
                      <p className="text-sm text-gray-700">KI-Modell basiert auf realen Verkaufsdaten - keine subjektiven Einschätzungen</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="w-6 h-6 text-brand-brown mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-brand-brown mb-1">Kostengünstig</h4>
                    <p className="text-sm text-gray-700">Ab {PRICING_FORMATTED.current} statt mehrere hundert Euro für klassische Gutachten</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unser Versprechen */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Unser Versprechen an die Pferdegemeinschaft</h3>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong className="text-brand-brown">🎯 Präzise Bewertungen:</strong> Kontinuierliche Optimierung unserer KI-Modelle für höchste Genauigkeit
                </li>
                <li>
                  <strong className="text-brand-brown">🔒 Datenschutz:</strong> Ihre Pferdedaten werden sicher und vertraulich behandelt
                </li>
                <li>
                  <strong className="text-brand-brown">📈 Marktaktualität:</strong> Regelmäßige Updates basierend auf aktuellen Marktentwicklungen
                </li>
                <li>
                  <strong className="text-brand-brown">🤝 Fairness:</strong> Gleiche Bewertungsstandards für alle - unabhängig von Budget oder Herkunft
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-12 lg:py-20 bg-[#fdf7f1] section-fade-in" id="cta">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-h2 font-bold text-gray-900 mb-6">
                Bereit für deine professionelle Pferdebewertung?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Erhalte jetzt den Marktwert deines Pferdes – KI-gestützt, wissenschaftlich fundiert, in 2 Minuten
              </p>
              <LocalizedLink
                href="/pferde-preis-berechnen"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-brand-brown hover:bg-brand-brownDark text-white transition-colors rounded-2xl shadow-lg mb-4"
              >
                Jetzt Pferdewert berechnen
              </LocalizedLink>

              <p className="text-sm text-gray-500">
                Nur {PRICING_FORMATTED.current} • Sofortiges Ergebnis • Kein Abo • 95% Kundenzufriedenheit
              </p>
            </div>
          </div>
        </section>

        {/* Benjamin Reder - Persönliche Profile */}
        <section className="py-12 lg:py-16 border-t border-gray-100" id="gruender">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 mb-6">
                Mehr über Benjamin Reder
              </p>

              <div className="flex flex-wrap justify-center items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/benjamin-reder-930517a9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 text-gray-600"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>

                <a
                  href="https://www.instagram.com/ben.rdr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span className="text-sm font-medium">Instagram</span>
                </a>

                <a
                  href="https://x.com/benjo1910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center px-3 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-800 hover:bg-gray-50 hover:text-gray-800 transition-all duration-300 text-gray-600"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                <a
                  href="https://benjaminreder.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-brand-brown hover:bg-amber-50 hover:text-brand-brown transition-all duration-300 text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span className="text-sm font-medium">Website</span>
                </a>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Benjamin Reder – Gründer von PferdeWert
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
