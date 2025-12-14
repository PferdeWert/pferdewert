// pages/wertgutachten-ergebnis.tsx
// Premium Ergebnisseite für Wertgutachten (49,90€ Produkt)

import { useRouter } from "next/router";
import { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import QRCode from "qrcode";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import StripeLoadingScreen from "@/components/StripeLoadingScreen";
import { log, warn, error } from "@/lib/log";
import type { ZertifikatData } from "@/components/VerkaufsZertifikatPDF";

// Polling schedule (defined outside component for stable reference)
const POLLING_SCHEDULE_MS = [5000, 10000, 20000, 35000, 55000, 80000, 110000];

// Lazy load PDF components
const VerkaufsZertifikatPDF = dynamic(
  () => import("@/components/VerkaufsZertifikatPDF"),
  { ssr: false }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

interface WertgutachtenResponse {
  id?: string;
  ready?: boolean;
  zertifikatNummer: string;
  pferdeName: string;
  rasse: string;
  alter: number;
  geschlecht: string;
  stockmass?: number;
  ausbildung: string;
  aku?: string;
  haupteignung?: string;
  abstammung?: string;
  zertifikat_data: {
    preisVon: number;
    preisBis: number;
    haupteignung: string;
    bewertungsDetails: {
      rasseText: string;
      abstammungText: string;
      ausbildungText: string;
      gesundheitText: string;
      fazit: string;
    };
  };
  erstellt: string;
  aktualisiert: string;
}

// Mock-Daten für Preview
const MOCK_DATA: WertgutachtenResponse = {
  zertifikatNummer: "CERT-2025-000001",
  pferdeName: "Bella Vista",
  rasse: "Hannoveraner",
  alter: 8,
  geschlecht: "Stute",
  stockmass: 168,
  ausbildung: "M-Dressur",
  aku: "Ohne Befund",
  haupteignung: "Dressur",
  abstammung: "Belissimo M x Donnerhall",
  zertifikat_data: {
    preisVon: 28000,
    preisBis: 35000,
    haupteignung: "Dressur",
    bewertungsDetails: {
      rasseText: "Hannoveraner gehören zu den erfolgreichsten deutschen Warmblutrassen im internationalen Dressursport. Die Zuchtrichtung garantiert hervorragende Rittigkeit, Leistungsbereitschaft und ein ausgeglichenes Temperament. Dies rechtfertigt einen Preisaufschlag von etwa 15-20% gegenüber weniger etablierten Rassen.",
      abstammungText: "Die Abstammung Belissimo M x Donnerhall vereint zwei der einflussreichsten Dressurvererber der modernen Zucht. Belissimo M bringt Elastizität und Ausdruck, während Donnerhall für Kraft und Rittigkeit steht. Diese Kombination ist am Markt sehr gefragt und erzielt regelmäßig Spitzenpreise.",
      ausbildungText: "Der Ausbildungsstand auf M-Niveau ist überdurchschnittlich und zeigt das Entwicklungspotenzial des Pferdes. Die erfolgreiche Ausbildung bis zur Mittleren Klasse bestätigt sowohl die Qualität des Pferdes als auch die investierte Arbeit. Dies erhöht den Marktwert signifikant.",
      gesundheitText: "Der AKU-Befund 'Ohne Befund' ist ein hervorragender Wert und stärkt das Vertrauen potenzieller Käufer erheblich. Bei einem 8-jährigen Pferd mit diesem Ausbildungsstand ist dies ein wichtiges Verkaufsargument und rechtfertigt den oberen Preisbereich.",
      fazit: "Diese Hannoveraner Stute präsentiert sich als herausragendes Dressurpferd mit exzellenter Abstammung und überdurchschnittlichem Ausbildungsstand. Der einwandfreie Gesundheitszustand und das Entwicklungspotenzial bis zur Schweren Klasse machen sie zu einer erstklassigen Wahl für ambitionierte Reiter. Der ermittelte Marktwert spiegelt die Kombination aus Qualität, Ausbildung und Gesundheit wider.",
    },
  },
  erstellt: new Date().toISOString(),
  aktualisiert: new Date().toISOString(),
};

export default function WertgutachtenErgebnis() {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [data, setData] = useState<WertgutachtenResponse | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    const { session_id, id, mock } = router.query;

    // Mock-Modus für Preview
    if (mock === "true") {
      log("[WERTGUTACHTEN-ERGEBNIS] Mock mode activated");
      const mockDataWithId = { ...MOCK_DATA, id: "mock-id-123" };
      setData(mockDataWithId);
      setLoading(false);
      generateQRCode("mock-id-123");
      return;
    }

    // Stripe-Flow: session_id vorhanden
    if (session_id && typeof session_id === "string") {
      log("[WERTGUTACHTEN-ERGEBNIS] Stripe flow with session_id");
      fetchBySessionId(session_id);
      return;
    }

    // Direct-Link-Flow: id (ObjectId) vorhanden
    if (id && typeof id === "string") {
      log("[WERTGUTACHTEN-ERGEBNIS] Direct link with id");
      fetchById(id);
      return;
    }

    // Kein Parameter - Redirect
    router.replace("/");
  }, [router]);

  const generateQRCode = (docId: string) => {
    const ergebnisUrl = `https://pferdewert.de/wertgutachten-ergebnis?id=${docId}`;
    QRCode.toDataURL(ergebnisUrl, {
      width: 200,
      margin: 1,
      color: { dark: "#1a365d", light: "#ffffff" },
    }).then(setQrCodeDataUrl);
  };

  const fetchBySessionId = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/wertgutachten-by-session?session_id=${sessionId}`);

      if (!res.ok) {
        setErrorMsg("Wertgutachten nicht gefunden. Bitte kontaktiere uns unter info@pferdewert.de");
        setLoading(false);
        return;
      }

      const result = await res.json();

      if (result.ready && result.zertifikat_data) {
        setData(result);
        setLoading(false);
        if (result.id) {
          generateQRCode(result.id);
        }
      } else if (result.id) {
        // Noch nicht fertig - Polling starten
        startPolling(result.id);
      } else {
        setErrorMsg("Unerwarteter Fehler. Bitte kontaktiere uns.");
        setLoading(false);
      }
    } catch (err) {
      error("[WERTGUTACHTEN-ERGEBNIS] Session fetch error:", err);
      setErrorMsg("Netzwerkfehler. Bitte überprüfe deine Internetverbindung.");
      setLoading(false);
    }
  };

  const fetchById = async (docId: string) => {
    try {
      const res = await fetch(`/api/wertgutachten?id=${docId}`);

      if (res.status === 404) {
        startPolling(docId);
        return;
      }

      if (!res.ok) {
        setErrorMsg("Fehler beim Laden des Wertgutachtens.");
        setLoading(false);
        return;
      }

      const result = await res.json();
      setData(result);
      setLoading(false);
      if (result.id) {
        generateQRCode(result.id);
      }
    } catch (err) {
      error("[WERTGUTACHTEN-ERGEBNIS] Error:", err);
      setErrorMsg("Netzwerkfehler. Bitte überprüfe deine Internetverbindung.");
      setLoading(false);
    }
  };

  const startPolling = (docId: string) => {
    let index = 0;

    const poll = () => {
      if (index >= POLLING_SCHEDULE_MS.length) {
        warn("[WERTGUTACHTEN-ERGEBNIS] Polling ended");
        setErrorMsg("Das Wertgutachten wird noch erstellt. Du erhältst eine E-Mail sobald es fertig ist.");
        setLoading(false);
        return;
      }

      const delay = POLLING_SCHEDULE_MS[index++];
      log(`[WERTGUTACHTEN-ERGEBNIS] Polling attempt ${index}`);

      intervalRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/wertgutachten?id=${docId}`);
          if (res.ok) {
            const result = await res.json();
            setData(result);
            setLoading(false);
            if (result.id) {
              generateQRCode(result.id);
            }
            return;
          }
        } catch (err) {
          warn("[WERTGUTACHTEN-ERGEBNIS] Polling error:", err);
        }
        poll();
      }, delay);
    };

    poll();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  // PDF data preparation
  const pdfData: ZertifikatData | null = useMemo(() => {
    if (!data) return null;

    const ausstellungsDatum = new Date(data.aktualisiert || data.erstellt).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return {
      zertifikatNummer: data.zertifikatNummer,
      ausstellungsDatum,
      pferdeName: data.pferdeName,
      rasse: data.rasse,
      alter: String(data.alter),
      geschlecht: data.geschlecht,
      stockmass: data.stockmass ? String(data.stockmass) : undefined,
      ausbildung: data.ausbildung,
      aku: data.aku,
      haupteignung: data.haupteignung || data.zertifikat_data.haupteignung,
      abstammung: data.abstammung,
      preisVon: data.zertifikat_data.preisVon,
      preisBis: data.zertifikat_data.preisBis,
      qrCodeDataUrl,
      bewertungsDetails: data.zertifikat_data.bewertungsDetails,
      verifikationsUrl: data.id ? `https://pferdewert.de/wertgutachten-ergebnis?id=${data.id}` : undefined,
    };
  }, [data, qrCodeDataUrl]);

  const pdfDocument = useMemo(() => {
    if (!pdfData) return null;
    return <VerkaufsZertifikatPDF data={pdfData} variante="ausfuehrlich" />;
  }, [pdfData]);

  if (loading) {
    return <StripeLoadingScreen estimatedTime="Dein Wertgutachten wird erstellt..." />;
  }

  if (errorMsg) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">Einen Moment noch...</h1>
            <p className="text-gray-600 mb-6">{errorMsg}</p>
            <LocalizedLink href="/" className="inline-block px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors">
              Zur Startseite
            </LocalizedLink>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data || !pdfData) return null;

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        <title>Verkäufer-Wertgutachten für {data.pferdeName} | PferdeWert</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Title */}
          <h1 className="text-h2 font-bold text-brand mb-4">
            Verkäufer-Wertgutachten für {data.pferdeName}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-12">
            Dein professionelles Wertgutachten ist fertig und steht zum Download bereit.
          </p>

          {/* PDF Download Button */}
          <div className="mb-8">
            {isClient && qrCodeDataUrl && pdfDocument && (
              <PDFDownloadLink
                document={pdfDocument}
                fileName={`PferdeWert-Wertgutachten-${data.zertifikatNummer}.pdf`}
              >
                {({ loading: pdfLoading }) => (
                  <button
                    className="bg-brand-brown hover:bg-brand-brownDark text-white px-8 py-4 md:px-12 md:py-5 rounded-2xl font-bold text-lg transition-all shadow-soft hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
                    disabled={pdfLoading}
                  >
                    {pdfLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        PDF wird erstellt...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Wertgutachten als PDF herunterladen
                      </>
                    )}
                  </button>
                )}
              </PDFDownloadLink>
            )}
          </div>

          {/* Certificate Number Info */}
          {data.zertifikatNummer && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Zertifikat-Nummer: <span className="font-mono text-gray-700">{data.zertifikatNummer}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
