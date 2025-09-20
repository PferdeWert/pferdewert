// pages/navigation-test.tsx
import Head from "next/head";
import HeaderNew from "@/components/HeaderNew";

export default function NavigationTest() {
  return (
    <>
      <Head>
        <title>Navigation Test - PferdeWert</title>
        <meta name="description" content="Test page for new navigation" />
      </Head>

      <HeaderNew />

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
              Navigation Test
            </h1>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Neue Navigation Features
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Desktop Features:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>✅ Dropdown-Menüs für Hauptkategorien</li>
                    <li>✅ Hover-Effekte mit Timing-Control</li>
                    <li>✅ SEO-optimierte URL-Struktur</li>
                    <li>✅ Conversion-fokussierte CTAs</li>
                    <li>✅ User-Journey basierte Kategorien</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Mobile Features:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>✅ Hamburger-Menü mit Overlay</li>
                    <li>✅ Accordion-Pattern für Sub-Menüs</li>
                    <li>✅ Touch-friendly Interactions</li>
                    <li>✅ Prominenter CTA-Button</li>
                    <li>✅ Scroll-Lock bei offenem Menü</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-amber-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Navigation Struktur
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Pferd kaufen</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Pferdewert ermitteln</li>
                      <li>• Kaufberatung</li>
                      <li>• Regionale Preise</li>
                      <li>• Pferde in Bayern</li>
                      <li>• Pferde in NRW</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Pferd verkaufen</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Pferdewert berechnen</li>
                      <li>• Verkaufstipps</li>
                      <li>• Verkaufspreis optimieren</li>
                      <li>• Verkaufsberatung</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Ratgeber</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• AKU verstehen</li>
                      <li>• AKU Befunde interpretieren</li>
                      <li>• Pferdebewertung Grundlagen</li>
                      <li>• Markttrends</li>
                      <li>• Krisensituationen</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="/pferde-preis-berechnen"
                  className="inline-block bg-brand-brown hover:bg-brand-brownDark text-white px-8 py-3 rounded-lg transition-colors font-medium"
                >
                  Navigation testen → Tool aufrufen
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}