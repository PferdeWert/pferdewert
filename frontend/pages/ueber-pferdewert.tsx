import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Heart, Shield, Users, Zap, Target, Star, Instagram, Facebook } from "lucide-react"

export default function UeberUns() {
  return (
    <>
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

      <div className="min-h-screen flex flex-col text-gray-900 bg-gray-50">
        <Header />
        
        <div className="flex-1 min-h-screen">
          {/* Scroll offset für sticky header + Fade-in Animationen */}
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

          {/* Hero Section - EXAKT wie in index.tsx */}
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
                      Eine kleine Pferdefamilie mit großer Mission: Den Pferdemarkt transparenter, fairer und einfach besser
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
                    <em>Wie den Marktwert realistisch einschätzen?</em>
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Da wir uns beruflich und privat viel mit{" "}
                    <span className="font-semibold text-brand-brown">Künstlicher Intelligenz</span> beschäftigen, stellten wir
                    uns die Frage: &ldquo;Kann eine KI den Wert eines Pferdes besser einschätzen als wir?&rdquo; Und die Antwort hat uns
                    verblüfft: <span className="font-semibold text-brand-brown">Ja, sie kann.</span>
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Aus dieser Neugier wurde ein Projekt – und daraus:{" "}
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
                    Rätselraten. Ohne Bauchgefühl. Sondern mit einer datenbasierten, neutralen Analyse.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Natürlich bleibt der Pferdekauf eine emotionale Entscheidung. Wer sich verliebt, zahlt oft gern mehr –
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
                        <span className="font-medium">Schnell</span>
                      </li>
                      <li className="flex items-center text-brand-brown">
                        <Shield className="w-5 h-5 mr-3" />
                        <span className="font-medium">Transparent</span>
                      </li>
                      <li className="flex items-center text-brand-brown">
                        <Target className="w-5 h-5 mr-3" />
                        <span className="font-medium">Viel günstiger als ein professionelles Gutachten</span>
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
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 text-center mb-12">Was uns wichtig ist</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Shield,
                      title: "Transparenz",
                      description: "Du weißt, woran du bist – keine Preisrätsel mehr."
                    },
                    {
                      icon: Users,
                      title: "Fairness",
                      description: "Für Käufer und Verkäufer – beide Seiten verdienen Klarheit."
                    },
                    {
                      icon: Zap,
                      title: "Zugänglichkeit",
                      description: "Kein Expertenwissen nötig – einfach & verständlich."
                    },
                    {
                      icon: Heart,
                      title: "Verantwortung",
                      description: "Das Wohl der Pferde steht bei uns an erster Stelle."
                    },
                    {
                      icon: Star,
                      title: "Ehrlichkeit",
                      description: "Wir versprechen nur, was wir auch halten können."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl border border-brand-gold/20 hover:shadow-2xl transition-shadow p-6">
                      <item.icon className="w-8 h-8 text-brand-brown mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Für wen ist PferdeWert */}
          <section className="py-12 lg:py-20 bg-white section-fade-in" id="zielgruppe">
            <div className="px-4 lg:px-8 xl:px-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-12">Für wen ist PferdeWert?</h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Pferdebesitzer:innen",
                      description: "Du möchtest wissen, was dein Pferd wert ist –",
                      highlight: "schnell, anonym und günstig",
                      action: "Nutze unseren Preis-Rechner – ohne Anmeldung."
                    },
                    {
                      title: "Pferdekäufer:innen",
                      description: "Du hast ein Pferd im Blick und willst wissen, ob der Preis passt?",
                      highlight: "",
                      action: "Nutze unser Formular zur Preisanfrage – wir analysieren für dich."
                    },
                    {
                      title: "Neugierige Pferdefreunde",
                      description: "Kein konkreter Anlass – nur ein bisschen Neugier?",
                      highlight: "",
                      action: "Teste unser Tool einfach mal aus. Vielleicht überrascht dich das Ergebnis."
                    }
                  ].map((group, index) => (
                    <div key={index} className="border-l-4 border-brand-brown pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{group.title}</h3>
                      <p className="text-lg text-gray-700 mb-4">
                        {group.description}{" "}
                        {group.highlight && (
                          <span className="font-semibold text-brand-brown">{group.highlight}</span>
                        )}
                        {group.description.includes("?") ? "" : "?"}
                      </p>
                      <p className="text-gray-600">
                        → {group.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section - Wie Preisbanner in index.tsx */}
          <section className="py-12 lg:py-20 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 section-fade-in" id="cta">
            <div className="px-4 lg:px-8 xl:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-3xl">🔥</span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">Neugierig geworden?</h2>
                </div>
                <p className="text-xl text-gray-600 mb-8">Berechne jetzt den Wert deines Pferdes – in 2 Minuten</p>
                <Link
                  href="/pferde-preis-berechnen"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-brand-brown hover:bg-brand-brownDark text-white transition-colors rounded-2xl shadow-lg"
                >
                  👉 Jetzt den Wert deines Pferdes berechnen
                </Link>
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section className="py-12 lg:py-20 bg-gray-50 section-fade-in" id="social">
            <div className="px-4 lg:px-8 xl:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">Folge uns</h2>
                <div className="flex justify-center space-x-8">
                  <a 
                    href="https://instagram.com/pferdewert.de/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Folge uns auf Instagram" 
                    className="text-gray-600 hover:text-brand-brown transition-colors"
                  >
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a 
                    href="https://facebook.com/profile.php?id=61578324567676" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Folge uns auf Facebook" 
                    className="text-gray-600 hover:text-brand-brown transition-colors"
                  >
                    <Facebook className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-12 lg:py-20 bg-white border-t section-fade-in" id="final-cta">
            <div className="px-4 lg:px-8 xl:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Bereit für deine erste Pferdebewertung?</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Starte jetzt und erhalte in wenigen Minuten eine professionelle Bewertung deines Pferdes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/pferde-preis-berechnen" 
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-brown text-white font-bold rounded-2xl shadow-md hover:bg-brand-brownDark transition-all text-lg tracking-wide"
                  >
                    Jetzt Pferdewert berechnen →
                  </Link>
                  <Link 
                    href="/beispiel-analyse" 
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-brown text-brand-brown font-bold rounded-2xl bg-white hover:bg-gray-50 shadow-sm transition-all text-lg tracking-wide"
                  >
                    Beispielanalyse ansehen
                  </Link>
                </div>
                <p className="text-sm text-gray-500 mt-6">Sichere Bezahlung • Sofortige Ergebnisse • Keine Abos</p>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  )
}