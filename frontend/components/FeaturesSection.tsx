// components/FeaturesSection.tsx
// Extracted Features Section für bessere Code-Splitting Performance
import { Clock, Shield, Award, TrendingUp, CheckCircle, Users } from "lucide-react";
import { useCountryConfig } from "@/hooks/useCountryConfig";

// Feature data factory function for localization
const getFeaturesData = (coverageText: string) => [
  {
    iconType: "Clock",
    title: "Blitzschnell",
    description: "Professionelle Pferdepreis-Bewertung in nur 2 Minuten – ohne Wartezeit, ohne Terminvereinbarung.",
  },
  {
    iconType: "Shield",
    title: "100% Transparent",
    description: "Nachvollziehbare Bewertungskriterien und detaillierte Erklärung aller Faktoren.",
  },
  {
    iconType: "Award",
    title: "Expertenwissen",
    description: "Entwickelt von erfahrenen Reitern und Pferdeexperten.",
  },
  {
    iconType: "TrendingUp",
    title: "Marktgerecht",
    description: "Aktuelle Pferdepreise und Markttrends fließen in jede Pferdepreis-Bewertung mit ein.",
  },
  {
    iconType: "CheckCircle",
    title: "Geld-zurück-Garantie",
    description: "Nicht zufrieden? Wir erstatten dir den vollen Betrag zurück.",
  },
  {
    iconType: "Users",
    title: "Vertrauenswürdig",
    description: `Professionelle Pferdepreis-Bewertungen für Pferdebesitzer ${coverageText}.`,
  },
];

export default function FeaturesSection() {
  const { isAustria, isSwitzerland } = useCountryConfig();

  // Localized coverage text
  const coverageText = isAustria
    ? "in Österreich"
    : isSwitzerland
      ? "in der Schweiz"
      : "deutschlandweit";

  const FEATURES_DATA = getFeaturesData(coverageText);

  return (
    <section id="vorteile" className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-gray-900 mb-4">Warum PferdeWert die beste Wahl ist</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professionelle Pferdebewertung basierend auf jahrelanger Expertise und modernster KI-Technologie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature, index) => {
            // Create icon components dynamically inside render
            const IconComponent =
              feature.iconType === "Clock" ? Clock :
              feature.iconType === "Shield" ? Shield :
              feature.iconType === "Award" ? Award :
              feature.iconType === "TrendingUp" ? TrendingUp :
              feature.iconType === "CheckCircle" ? CheckCircle :
              feature.iconType === "Users" ? Users : Clock;

            return (
              <div key={index} className="border-0 shadow-soft hover:shadow-xl transition-shadow duration-300 bg-white rounded-2xl">
                <div className="p-8 text-center">
                  <div className="bg-brand-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-brand-brown" />
                  </div>
                  <h3 className="text-h3 font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
