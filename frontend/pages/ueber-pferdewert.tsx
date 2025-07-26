import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"
import { Award, Heart, Shield, Users, Zap, Target, Star } from "lucide-react"

export default function UeberUns() {
  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Über uns - PferdeWert.de | Deutschlands führende Pferdebewertung</title>
        <meta
          name="description"
          content="Lernen Sie das Team hinter PferdeWert.de kennen - eine Pferdefamilie mit KI-Know-how, die faire und transparente Pferdebewertungen für alle Pferdemenschen möglich macht."
        />
        <meta property="og:title" content="Über uns - PferdeWert.de" />
        <meta
          property="og:description"
          content="Eine kleine Pferdefamilie mit großer Mission: Faire Pferdebewertungen für alle."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pferdewert.de/favicon.svg" />
        <meta property="twitter:image" content="https://pferdewert.de/favicon.svg" />
        <link rel="canonical" href="https://pferdewert.de/ueber-uns" />
      </Head>

      <div className="flex-1">
        {/* CSS Styles */}
        <style jsx>{`
          section[id] {
            scroll-margin-top: 4rem;
          }
          .hero-fade-in-left {
            animation: fadeInLeft 1s ease 0.2s both;
          }
          .hero-fade-in-right {
            animation: fadeInRight 1s ease 0.5s both;
          }
          .section-fade-in {
            animation: fadeInUp 0.8s ease 0.3s both;
          }
          @keyframes fadeInLeft {
            from { 
              opacity: 0; 
              transform: translateX(-10px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          @keyframes fadeInRight {
            from { 
              opacity: 0; 
              transform: translateX(10px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          @keyframes fadeInUp {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-fade-in-left,
            .hero-fade-in-right,
            .section-fade-in {
              animation: none;
            }
          }
        `}</style>

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
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
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
        <section className="py-12 lg:py-20 bg-white section-fade-in" id="wer-wir-sind">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">Wer wir sind</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  👨‍👩‍👧‍👦 Wir sind eine Familie mit zwei kleinen Kindern – und mit ganzem Herzen Pferdemenschen.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  🐴 Unsere Stute Blossi (6 Jahre jung, Deutsches Sportpferd) begleitet uns täglich – clever, sensibel und
                  manchmal ganz schön dickköpfig.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wie PferdeWert entstand */}
        <section className="py-12 lg:py-20 bg-gray-50 section-fade-in" id="entstehung">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">Wie PferdeWert entstand</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Die Idee zu PferdeWert entstand beim Joggen – aus einem Gefühl, das viele kennen: Beim Pferdekauf haben
                  wir lange gesucht, viel verglichen – aber nie gewusst,
                  <span className="font-semibold text-brand-brown"> was ein fairer Preis ist</span>. Und auch beim Verkauf
                  eines Pferdes Jahre zuvor taten wir uns schwer:
                  <em>Was ist ein fairer und realistischer Verkaufspreis?</em>
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Da wir uns beruflich und privat viel mit{" "}
                  <span className="font-semibold text-brand-brown">Künstlicher Intelligenz</span> beschäftigen, stellten wir
                  uns die Frage: &ldquo;Können KI-Modelle den Marktwert von Pferden einschätzen?&rdquo; Und die Antwort hat uns
                  verblüfft: <span className="font-semibold text-brand-brown">Ja, und zwar ziemlich genau.</span>
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Aus dieser Neugier wurde ein kleines Projekt – und aus diesem Projekt entstand:{" "}
                  <span className="font-bold text-brand-brown text-xl">PferdeWert.de</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-12 lg:py-20 bg-white section-fade-in" id="mission">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">Unsere Mission</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Wir wollen, dass jeder Pferdemensch – ob Käufer, Verkäufer oder Besitzer – den Marktwert eines Pferdes
                  <span className="font-semibold text-brand-brown"> realistisch und fair einschätzen</span> kann. Ohne
                  teure Experten. Ohne Rätselraten. Ohne Bauchgefühl. Sondern mit einer datenbasierten, neutralen Analyse.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Natürlich bleibt der Pferdekauf eine emotionale Entscheidung. Wer sich verliebt, zahlt oft mehr –
                  und das ist auch völlig okay. Aber gerade{" "}
                  <span className="font-semibold text-brand-brown">weil so viele Emotionen im Spiel sind</span>, ist ein
                  rationaler Ausgangspunkt wertvoll: Eine objektive Analyse hilft dir, bewusst und mit klarem Kopf zu
                  entscheiden – egal, in welche Richtung.
                </p>
                <div className="bg-brand-gold/10 p-6 rounded-xl border border-brand-gold/20">
                  <p className="text-lg font-semibold text-brand-brown mb-4">
                    <span className="font-bold">PferdeWert</span> bietet dir genau das:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-brand-brown">
                      <Zap className="w-5 h-5 mr-3" />
                      <span className="font-medium">Schnell: In nur 2 Minuten hast du dein Ergebnis</span>
                    </li>
                    <li className="flex items-center text-brand-brown">
                      <Shield className="w-5 h-5 mr-3" />
                      <span className="font-medium">Neutral: KI-Modell auf Basis realer Verkaufsdaten</span>
                    </li>
                    <li className="flex items-center text-brand-brown">
                      <Target className="w-5 h-5 mr-3" />
                      <span className="font-medium">Günstig: Klassische Gutachten kosten mehrere hundert Euro</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* Was uns wichtig ist */}
<section className="py-12 lg:py-20 bg-gray-50 section-fade-in" id="werte">
  <div className="px-4 lg:px-8 xl:px-12">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 text-center mb-6">Was uns wichtig ist</h2>
      <p className="text-center max-w-2xl mx-auto text-gray-700 mb-12">
        Unsere Werte leiten uns bei jedem Schritt – von der Entwicklung unseres KI-Modells bis zur fairen Preisgestaltung bei PferdeWert.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[ 
          {
            icon: Shield,
            title: "Transparenz",
            description: "Wir machen den Pferdepreis transparent – mit einer klaren Analyse statt Bauchgefühl."
          },
          {
            icon: Users,
            title: "Fairness",
            description: "Unsere Pferdebewertung sorgt für Klarheit – für Käufer und Verkäufer gleichermaßen."
          },
          {
            icon: Zap,
            title: "Zugänglichkeit",
            description: "Unser Pferdepreis-Rechner ist einfach, anonym & ohne Fachwissen nutzbar."
          },
          {
            icon: Heart,
            title: "Verantwortung",
            description: "Das Wohl der Pferde steht für uns immer an erster Stelle."
          },
          {
            icon: Star,
            title: "Ehrlichkeit",
            description: "Wir versprechen nur, was wir halten können – realistische Werte statt Fantasiepreise."
          },
          {
            icon: Award,
            title: "Kompetenz",
            description: "Unser KI-Modell analysiert Preisfaktoren – für eine fundierte Einschätzung deines Pferdes."
          }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-2xl border border-brand-gold/20 hover:shadow-2xl hover:translate-y-1 transition-transform shadow-sm p-6">
            <item.icon className="w-8 h-8 text-brand-brownDark mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


        {/* CTA Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 section-fade-in" id="cta">
          <div className="px-4 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">Neugierig geworden?</h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">Berechne jetzt den Wert deines Pferdes – in 2 Minuten</p>
              <Link
                href="/pferde-preis-berechnen"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-brand-brown hover:bg-brand-brownDark text-white transition-colors rounded-2xl shadow-lg"
              >
                Jetzt Pferdewert berechnen
              </Link>
              <p className="text-sm text-gray-500 mt-6">Sichere Bezahlung • Sofortiges Ergebnis • Kein Abo</p>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-brand-light to-white" id="social">
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