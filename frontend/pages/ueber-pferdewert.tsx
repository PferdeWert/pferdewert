import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"
import FAQ from "@/components/FAQ"
import { PRICING_FORMATTED } from "@/lib/pricing"
import { Award, Heart, Shield, Users, Zap, Target, Star } from "lucide-react"

export default function UeberUns() {
  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Über PferdeWert.de | KI-Experten für Pferdebewertung & Marktwertanalyse</title>
        <meta
          name="description"
          content={`🐎 PferdeWert.de Team: Pferdefamilie mit KI-Expertise für präzise Pferdebewertungen ab ${PRICING_FORMATTED.current} ➤ Transparent & fair ✓ Von Reitern für Reiter ✓ Deutschlands #1 Online-Pferdebewertung ✓`}
        />
        <meta name="keywords" content="pferdebewertung experte, pferde sachverständiger, pferdewert team, ki pferdebewertung, online pferdegutachter" />
        <meta property="og:title" content="Über PferdeWert.de | KI-Experten für Pferdebewertung" />
        <meta
          property="og:description"
          content="Pferdefamilie mit KI-Expertise: Deutschlands führende Online-Pferdebewertung. Transparent, fair und von Experten entwickelt."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pferdewert.de/images/blossi-shooting.webp" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Über PferdeWert.de | KI-Experten für Pferdebewertung" />
        <meta property="twitter:description" content="Pferdefamilie mit KI-Expertise: Deutschlands führende Online-Pferdebewertung." />
        <meta property="twitter:image" content="https://pferdewert.de/images/blossi-shooting.webp" />
        <link rel="canonical" href="https://pferdewert.de/ueber-pferdewert" />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PferdeWert.de",
              "alternateName": "PferdeWert",
              "description": "Deutschlands führende KI-basierte Online-Pferdebewertung. Transparent, fair und präzise Marktwertanalysen für Pferde.",
              "url": "https://pferdewert.de",
              "logo": "https://pferdewert.de/favicon.svg",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "PferdeWert.de Gründerteam",
                  "description": "Pferdefamilie mit Expertise in Künstlicher Intelligenz und Pferdemarkt-Analyse"
                }
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Deutschland"
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
                "url": "https://pferdewert.de"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "DE"
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
              "url": "https://pferdewert.de/ueber-pferdewert"
            })
          }}
        />
      </Head>

      <div className="flex-1">

        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden">
          <div className="px-4 lg:px-8 xl:px-12 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="space-y-8 hero-fade-in-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-brand-brown/10 text-brand-brown rounded-full text-sm font-semibold">
                    <Heart className="w-4 h-4 mr-2" />
                    #1 Online Pferdebewertung
                  </div>
                  <h1 className="text-h1 font-bold text-gray-900 leading-tight">
                    Über uns
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Eine kleine Pferdefamilie mit großer Mission: Den Pferdemarkt transparenter, fairer und einfach besser zu
                    machen – mit KI-Power und viel Herzblut.
                  </p>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative hero-fade-in-right">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/blossi-shooting.webp"
                    alt="Blossi - Unsere 6-jährige Deutsches Sportpferd Stute"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <p className="text-sm font-medium text-gray-900">Das ist Blossi 🐴</p>
                  <p className="text-xs text-gray-600">Unsere 6-jährige Inspiration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wer wir sind */}
        <section className="py-12 lg:py-20 bg-amber-50 section-fade-in" id="wer-wir-sind">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-bold text-gray-900 mb-8">Wer wir sind</h2>

              {/* Unsere Familie */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Unsere Pferdefamilie</h3>
                <div className="prose prose-lg max-w-none">
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

        {/* Wie PferdeWert entstand */}
        <section className="py-12 lg:py-20 bg-amber-50 section-fade-in" id="entstehung">
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
        <section className="py-12 lg:py-20 bg-amber-50 section-fade-in" id="mission">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 font-bold text-gray-900 mb-8">Unsere Mission</h2>

              {/* Hauptmission */}
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Transparenz für den deutschen Pferdemarkt</h3>
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
              <div className="bg-brand-gold/10 p-8 rounded-xl border border-brand-gold/20 mb-8">
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
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Unser Versprechen an die Pferdegemeinschaft</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">🎯 Präzise Bewertungen</h4>
                    <p className="text-gray-700">Kontinuierliche Optimierung unserer KI-Modelle für höchste Genauigkeit</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">🔒 Datenschutz</h4>
                    <p className="text-gray-700">Ihre Pferdedaten werden sicher und vertraulich behandelt</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">📈 Marktaktualität</h4>
                    <p className="text-gray-700">Regelmäßige Updates basierend auf aktuellen Marktentwicklungen</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">🤝 Fairness</h4>
                    <p className="text-gray-700">Gleiche Bewertungsstandards für alle - unabhängig von Budget oder Herkunft</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* Was uns wichtig ist - SEO Optimized Values Section */}
<section className="py-12 lg:py-20 bg-amber-50 section-fade-in" id="werte">
  <div className="px-4 lg:px-8 xl:px-12">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-h2 font-bold text-gray-900 text-center mb-6">Was uns wichtig ist</h2>
      <p className="text-center max-w-2xl mx-auto text-gray-700 mb-8">
        Unsere Werte leiten uns bei jedem Schritt – von der Entwicklung unseres KI-Pferdebewertungsmodells bis zur fairen Preisgestaltung bei PferdeWert.
      </p>

      {/* Core Values for Professional Horse Valuation */}
      <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
        Grundwerte für professionelle Pferdebewertung in Deutschland
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: Shield,
            title: "Transparenz bei Pferdebewertungen",
            description: "Wir machen den Pferdepreis transparent – mit einer klaren KI-gestützten Analyse statt Bauchgefühl. Jede Bewertung ist nachvollziehbar und wissenschaftlich fundiert."
          },
          {
            icon: Users,
            title: "Fairness im Pferdemarkt",
            description: "Unsere objektive Pferdebewertung sorgt für Klarheit – für Käufer und Verkäufer gleichermaßen. Faire Preise stärken das Vertrauen in den deutschen Pferdemarkt."
          },
          {
            icon: Zap,
            title: "Einfache Zugänglichkeit",
            description: "Unser Online-Pferdepreis-Rechner ist einfach, anonym & ohne Fachwissen nutzbar. Professionelle Pferdebewertung für jeden – in nur 2 Minuten."
          },
          {
            icon: Heart,
            title: "Tierwohl & Verantwortung",
            description: "Das Wohl der Pferde steht für uns immer an erster Stelle. Unsere Bewertungen berücksichtigen ethische Aspekte der Pferdehaltung und -vermarktung."
          },
          {
            icon: Star,
            title: "Ehrlichkeit & Realismus",
            description: "Wir versprechen nur, was wir halten können – realistische Marktwerte statt Fantasiepreise. Unsere KI-Bewertungen basieren auf echten Verkaufsdaten."
          },
          {
            icon: Award,
            title: "Fachliche Kompetenz",
            description: "Wir kombinieren Markterfahrung, aktuelle Inserate und externe Datenquellen zu einer belastbaren, praxisnahen Bewertung."
          }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-2xl border border-brand-gold/20 hover:shadow-2xl hover:translate-y-1 transition-transform shadow-sm p-6">
            <item.icon className="w-8 h-8 text-brand-brownDark mb-4" aria-hidden="true" />
            <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Trust Indicators for German Horse Market */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Vertrauen der deutschen Pferdegemeinschaft
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-brown">500+</div>
            <div className="text-sm text-gray-600">Erfolgreich bewertete Pferde</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-brown">95%</div>
            <div className="text-sm text-gray-600">Kundenzufriedenheit</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-brown">2 Min</div>
            <div className="text-sm text-gray-600">Durchschnittliche Bewertungszeit</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-brown">24/7</div>
            <div className="text-sm text-gray-600">Online verfügbar</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Customer Testimonials - Trust Signal Section */}
        <section className="py-12 lg:py-20 bg-amber-50 section-fade-in" id="testimonials">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-h2 font-bold text-gray-900 text-center mb-4">
                Das sagen unsere Kunden über PferdeWert.de
              </h2>
              <p className="text-center max-w-2xl mx-auto text-gray-700 mb-12">
                Echte Erfahrungen von Pferdebesitzern, die unsere KI-Pferdebewertung genutzt haben
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Sarah M.",
                    location: "Bayern",
                    horse: "Hannoveraner Stute",
                    text: "Die Bewertung war unglaublich genau! Als ich meine Stute verkauft habe, lag der Preis nur 200€ vom PferdeWert-Ergebnis entfernt. Spart so viel Zeit bei der Preisfindung.",
                    rating: 5
                  },
                  {
                    name: "Thomas K.",
                    location: "Nordrhein-Westfalen",
                    horse: "Oldenburger Wallach",
                    text: "Endlich eine objektive Einschätzung! Als Käufer hatte ich durch PferdeWert eine solide Verhandlungsgrundlage. Der Verkäufer konnte den Preis nicht mehr künstlich hochhalten.",
                    rating: 5
                  },
                  {
                    name: "Lisa H.",
                    location: "Baden-Württemberg",
                    horse: "Deutsches Reitpony",
                    text: `Super einfach zu bedienen und das Ergebnis kam sofort. Für ${PRICING_FORMATTED.current} bekommt man eine professionelle Bewertung, für die man beim Sachverständigen 300€+ bezahlen würde.`,
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location} • {testimonial.horse}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500">
                  ⭐ 4.8/5 Sterne Durchschnittsbewertung • Über 500 zufriedene Kunden
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 lg:py-16 bg-amber-50">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <FAQ
                faqs={[
                  {
                    question: "Wer steht hinter PferdeWert.de?",
                    answer: "PferdeWert.de wurde von einem Team aus Pferdeexperten und KI-Entwicklern entwickelt. Unser Gründer Benjamin Reder kombiniert jahrelange Erfahrung im Pferdesport mit modernster Technologie, um objektive und präzise Pferdebewertungen zu ermöglichen."
                  },
                  {
                    question: "Wie funktioniert die KI-gestützte Bewertung?",
                    answer: "Unsere KI analysiert über 50 verschiedene Faktoren wie Rasse, Alter, Ausbildungsstand, Gesundheitszustand und regionale Marktdaten. Das System wurde mit tausenden von Pferdetransaktionen trainiert und wird kontinuierlich von Experten validiert."
                  },
                  {
                    question: "Ist PferdeWert.de wirklich unabhängig?",
                    answer: "Ja, absolut. Wir sind ein unabhängiges Unternehmen ohne Verbindungen zu Händlern oder Verkäufern. Unsere Bewertungen basieren ausschließlich auf objektiven Daten und Marktanalysen – nicht auf kommerziellen Interessen."
                  },
                  {
                    question: "Wie aktuell sind die Marktdaten?",
                    answer: "Unsere Marktdaten werden täglich aktualisiert. Wir analysieren kontinuierlich Verkaufspreise, Markttrends und regionale Unterschiede, um sicherzustellen, dass unsere Bewertungen immer den aktuellen Markt widerspiegeln."
                  },
                  {
                    question: "Kann ich mehrere Pferde bewerten lassen?",
                    answer: "Ja, gerne! Jede Bewertung kostet 14,90€. Es gibt keine Mengenbegrenzung und jede Bewertung wird individuell und unabhängig durchgeführt. Für gewerbliche Nutzer bieten wir auf Anfrage auch Paketlösungen an.",
                    highlight: true
                  },
                  {
                    question: "Was unterscheidet PferdeWert von anderen Bewertungstools?",
                    answer: "PferdeWert kombiniert wissenschaftliche Methoden mit praktischer Pferdeerfahrung. Unser duales KI-System (GPT + Claude) sorgt für besonders präzise Ergebnisse, während unsere Experten die Algorithmen kontinuierlich optimieren."
                  }
                ]}
                sectionTitle="Häufige Fragen über PferdeWert"
                className="mb-8"
              />
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 section-fade-in" id="cta">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-h2 font-bold text-gray-900 mb-6">
                Bereit für deine professionelle Pferdebewertung?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Erhalte jetzt den Marktwert deines Pferdes – KI-gestützt, wissenschaftlich fundiert, in 2 Minuten
              </p>
              <Link
                href="/pferde-preis-berechnen"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-brand-brown hover:bg-brand-brownDark text-white transition-colors rounded-2xl shadow-lg mb-4"
              >
                Jetzt Pferdewert berechnen
              </Link>

              <p className="text-sm text-gray-500">
                Nur {PRICING_FORMATTED.current} • Sofortiges Ergebnis • Kein Abo • 95% Kundenzufriedenheit
              </p>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-12 lg:py-16 bg-amber-50" id="social">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
                PferdeWert auf Social Media
              </h2>
                      
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
              
              <p className="text-xs text-gray-400 mt-6">
                📸 Folge unserer Reise mit Blossi und PferdeWert.de
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
