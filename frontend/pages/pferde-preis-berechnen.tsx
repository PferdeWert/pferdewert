// frontend/pages/pferde-preis-berechnen.tsx - Redesigned
import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Star, Clock, Shield, Award } from 'lucide-react';

// Preise als globale Konstanten - außerhalb des Components
const PRICING = {
  launch: 9.90,
  regular: 39
};

export default function PferdePreisBerechnen() {
  const [currentStep, setCurrentStep] = useState(1);
  // Form data wird später implementiert
  // const [formData, setFormData] = useState({});

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Head>
        <title>Pferdewert berechnen - Professionelle KI-Bewertung | PferdeWert</title>
        <meta name="description" content={`Berechnen Sie den Marktwert Ihres Pferdes in nur 2 Minuten. KI-basierte Analyse für nur ${PRICING.launch.toFixed(2).replace('.', ',')}€. Sofortige PDF-Auswertung.`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-light to-white py-12 border-b border-gray-200">
          <div className="w-full px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Jetzt Pferdewert berechnen
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Professionelle KI-Bewertung in nur 2 Minuten
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-brand-brown" />
                  <span className="font-medium">2 Minuten</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-brand-brown" />
                  <span className="font-medium">Nur {PRICING.launch.toFixed(2).replace('.', ',')} €</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-brand-brown" />
                  <span className="font-medium">Sofort PDF</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="bg-white border-b border-gray-200">
          <div className="w-full px-4 lg:px-6 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Schritt {currentStep} von 4
                </span>
                <span className="text-sm font-medium text-brand-brown">
                  {Math.round((currentStep / 4) * 100)}% abgeschlossen
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-8 lg:py-12">
          <div className="w-full px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                
                {/* Step 1: Grunddaten */}
                {currentStep === 1 && (
                  <div className="p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Grunddaten Ihres Pferdes
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rasse *
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown">
                          <option>Bitte wählen...</option>
                          <option>Hannoveraner</option>
                          <option>Oldenburger</option>
                          <option>Holsteiner</option>
                          {/* Weitere Optionen */}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alter *
                        </label>
                        <input 
                          type="number" 
                          placeholder="Jahre"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-brand-brown"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Geschlecht *
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                          <option>Bitte wählen...</option>
                          <option>Hengst</option>
                          <option>Stute</option>
                          <option>Wallach</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stockmaß (cm)
                        </label>
                        <input 
                          type="number" 
                          placeholder="z.B. 165"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
                      <button
                        onClick={nextStep}
                        className="btn-primary px-8 py-3"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Ausbildung & Verwendung */}
                {currentStep === 2 && (
                  <div className="p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Ausbildung & Verwendung
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hauptverwendung *
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                          <option>Bitte wählen...</option>
                          <option>Dressur</option>
                          <option>Springen</option>
                          <option>Vielseitigkeit</option>
                          <option>Freizeit</option>
                          <option>Zucht</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ausbildungsstand *
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                          <option>Bitte wählen...</option>
                          <option>Nicht eingeritten</option>
                          <option>Eingeritten</option>
                          <option>E-Niveau</option>
                          <option>A-Niveau</option>
                          <option>L-Niveau</option>
                          <option>M-Niveau</option>
                          <option>S-Niveau</option>
                        </select>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                      <button
                        onClick={prevStep}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                      </button>
                      <button
                        onClick={nextStep}
                        className="btn-primary px-8 py-3"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Gesundheit & Erfolge */}
                {currentStep === 3 && (
                  <div className="p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Gesundheit & Erfolge
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gesundheitszustand *
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                          <option>Bitte wählen...</option>
                          <option>Gesund</option>
                          <option>Kleinere Probleme</option>
                          <option>Chronische Probleme</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Turniererfolge
                        </label>
                        <textarea 
                          placeholder="Optional: Wichtige Erfolge oder Platzierungen"
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                      <button
                        onClick={prevStep}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                      </button>
                      <button
                        onClick={nextStep}
                        className="btn-primary px-8 py-3"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 4 && (
                  <div className="p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Bewertung abschließen
                    </h2>
                    
                    {/* Price Display */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border border-amber-200">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          <span className="line-through text-gray-500 text-xl mr-2">{PRICING.regular.toFixed(2).replace('.', ',')} €</span>
                          {PRICING.launch.toFixed(2).replace('.', ',')} €
                        </div>
                        <p className="text-amber-700 font-medium">
                          ⚡ Aktionspreis für die ersten 100 Bewertungen
                        </p>
                      </div>
                    </div>

                    {/* Payment Button */}
                    <div className="text-center mb-6">
                      <button className="btn-primary px-12 py-4 text-lg">
                        Jetzt kostenpflichtig analysieren
                      </button>
                      <p className="text-xs text-gray-500 mt-3">
                        Mit Klick auf &quot;Jetzt kostenpflichtig analysieren&quot; akzeptierst du unsere{" "}
                        <Link href="/agb" className="underline hover:text-gray-700">
                          AGB
                        </Link>.
                      </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-start pt-6 border-t border-gray-100">
                      <button
                        onClick={prevStep}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-white py-16">
          <div className="w-full px-4 lg:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                Das sagen unsere Kunden
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 shadow-md border border-amber-100">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">
                    &quot;Ich wollte mein Pferd verkaufen und war unsicher beim Preis. Die Bewertung hat mir sehr geholfen eine Einschätzung zu bekommen!&quot;
                  </blockquote>
                  <cite className="text-sm text-gray-600 font-semibold not-italic">
                    - Sarah M., Freizeitreiterin
                  </cite>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 shadow-md border border-amber-100">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">
                    &quot;Die PferdeWert-Analyse war sehr detailliert und hat mir bei der Preisverhandlung sehr geholfen.&quot;
                  </blockquote>
                  <cite className="text-sm text-gray-600 font-semibold not-italic">
                    - Michael K., Hobbyreiter
                  </cite>
                </div>

                {/* Testimonial 3 */}
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 shadow-md border border-amber-100">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">
                    &quot;Super interessant was PferdeWert als Ergebnis bereitstellt, vor allem die Analyse der Abstammung!&quot;
                  </blockquote>
                  <cite className="text-sm text-gray-600 font-semibold not-italic">
                    - Anna L., Pferdebesitzerin
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Sticky Mobile Payment Button */}
      {currentStep === 4 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <button className="btn-primary w-full py-4 text-lg">
            Jetzt für {PRICING.launch.toFixed(2).replace('.', ',')}€ analysieren
          </button>
        </div>
      )}
    </>
  );
}