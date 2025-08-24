import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import BewertungLayout from "@/components/BewertungLayout";
import dynamic from "next/dynamic";
import { log, warn, error, info } from "@/lib/log";
import Head from "next/head";
import Layout from "@/components/Layout";
import StripeLoadingScreen from "@/components/StripeLoadingScreen";
import { trackValuationCompleted, trackPDFDownload } from "@/lib/analytics";

// Optimized dynamic imports - loaded only when needed
const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded"></div>,
});

const PferdeWertPDF = dynamic(() => import("@/components/PferdeWertPDF"), {
  ssr: false,
});

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => ({ default: mod.PDFDownloadLink })),
  {
    ssr: false,
    loading: () => <button className="btn-primary">PDF wird vorbereitet...</button>,
  }
);



export default function Ergebnis() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const [minLoadingTime, setMinLoadingTime] = useState(true);

  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell. Bitte sende eine E-Mail an info@pferdewert.de, wir melden uns, sobald das Modell wieder verfügbar ist.";

  useEffect(() => {
    if (!router.isReady) return;

    const session_id = router.query.session_id;
    if (!session_id || typeof session_id !== "string") {
      router.replace("/pferde-preis-berechnen");
      return;
    }

    // Mindest-Ladedauer von 6 Sekunden für bessere UX
    setTimeout(() => {
      setMinLoadingTime(false);
    }, 6000);

    const fetchSession = async () => {
      try {
        log("[ERGEBNIS] Lade Session für ID:", session_id);

        const res = await fetch(`/api/session?session_id=${session_id}`);
        log("[ERGEBNIS] HTTP Status Code:", res.status);

        const data = await res.json();
        log("[ERGEBNIS] API-Response:", data);

        if (!data?.session?.payment_status || data.session.payment_status !== "paid") {
          warn("[ERGEBNIS] Zahlung nicht erfolgt. Redirect nach /pferde-preis-berechnen");
          router.replace("/pferde-preis-berechnen");
          return;
        }

        setPaid(true);

        // Enhanced GA4 conversion tracking
        const bewertungId = data.session.metadata?.bewertungId;
        const sessionId = session_id;
        const paymentMethod = data.session.payment_method_types?.[0] || "unknown";
        
        // Track the main conversion event
        trackValuationCompleted(sessionId, bewertungId || "unknown", paymentMethod);
        
        if (bewertungId) {
          info(`[ERGEBNIS] Lade Bewertung für ID: ${bewertungId}`);
          
          let tries = 0;
          const maxTries = 20; // Increased from 8 to 20 for longer AI processing
          
          const checkBewertung = async () => {
            tries++;
            log(`[ERGEBNIS] Versuch ${tries}/${maxTries} für Bewertung ID: ${bewertungId}`);
            
            try {
              const retryRes = await fetch(`/api/bewertung?id=${bewertungId}`);
              log(`[ERGEBNIS] API Response Status: ${retryRes.status}`);
              
              if (retryRes.status === 429) {
                log("[ERGEBNIS] Rate-Limit erreicht, warte länger...");
                const delay = Math.min(30000, 10000 * Math.pow(2, Math.floor(tries / 3)));
                setTimeout(checkBewertung, delay);
                return;
              }
              
              if (retryRes.status === 404) {
                const errorData = await retryRes.json();
                
                // If processing=true, the evaluation is still being created -> continue retrying
                if (errorData.processing) {
                  log("[ERGEBNIS] Bewertung wird noch erstellt, weiter versuchen...");
                  // Continue to retry logic below - don't return here
                } else {
                  // Document truly doesn't exist -> stop immediately
                  error("[ERGEBNIS] Bewertung nicht gefunden - falsche ID oder Dokument existiert nicht");
                  setErrorLoading("Die Bewertung konnte nicht gefunden werden. Bitte kontaktiere uns unter info@pferdewert.de");
                  setLoading(false);
                  return;
                }
              } else {
                // Handle successful responses (200, etc.)
                const retryData = await retryRes.json();
                log("[ERGEBNIS] Response data:", { hasBewertung: !!retryData.bewertung, error: retryData.error });
                
                if (retryData.bewertung && retryData.bewertung.trim()) {
                  info("[ERGEBNIS] ✅ Bewertung erfolgreich geladen");
                  setText(retryData.bewertung);
                  setLoading(false);
                  return;
                }
              }
            } catch (err) {
              error("[ERGEBNIS] Netzwerk-/API-Fehler beim Abrufen der Bewertung:", err);
            }

            if (tries >= maxTries) {
              warn(`[ERGEBNIS] Bewertung nach ${maxTries} Versuchen nicht verfügbar.`);
              setErrorLoading(
                "Die Bewertung wird noch erstellt und kann einige Minuten dauern. " +
                "Du erhältst eine E-Mail, sobald sie fertig ist, oder aktualisiere diese Seite in wenigen Minuten."
              );
              setLoading(false);
              return;
            }
            
            // Progressive backoff: start longer to avoid rate limits
            let delay;
            if (tries <= 3) {
              delay = 15000; // First 3 tries: 15s
            } else if (tries <= 10) {
              delay = 30000; // Next 7 tries: 30s  
            } else {
              delay = 60000; // Remaining tries: 60s
            }
            
            log(`[ERGEBNIS] Warte ${delay}ms bis zum nächsten Versuch...`);
            setTimeout(checkBewertung, delay);
          };
          
          // Start checking immediately
          checkBewertung();
        } else {
          error("[ERGEBNIS] Keine bewertungId in Session-Metadaten gefunden.");
          setErrorLoading("Fehler: Bewertungs-ID nicht gefunden. Bitte kontaktiere uns unter info@pferdewert.de");
          setLoading(false);
        }
      } catch (err) {
        error("[ERGEBNIS] Fehler beim Laden der Session:", err);
        setErrorLoading("Beim Laden der Bewertung ist ein Fehler aufgetreten. Bitte versuche es später erneut oder kontaktiere uns.");
        setLoading(false);
      }
      // Note: loading state is managed individually in each code path above
    };

    fetchSession();

    return () => {
      const interval = intervalRef.current;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [router]);

  if (loading || minLoadingTime) return <StripeLoadingScreen />;
  if (errorLoading) return <p className="p-10 text-red-600 text-center">{errorLoading}</p>;
  if (!paid) return <p className="p-10 text-red-500 text-center">{fallbackMessage}</p>;

  return (
    <Layout>
    <Head>
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://pferdewert.de/ergebnis" />
    </Head>

    <BewertungLayout title="PferdeWert – Ergebnis der Pferdebewertung">
      {text ? (
        <>
          <div className="prose prose-lg max-w-full">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
          <div className="mt-8 flex justify-center sm:mt-10">
            <PDFDownloadLink
              document={<PferdeWertPDF markdownData={text} />}
              fileName="PferdeWert-Analyse.pdf"
            >
              {({ loading }: { loading: boolean }) => (
                <button 
                  className="btn-primary"
                  onClick={() => {
                    if (!loading) {
                      const bewertungId = router.query.session_id as string;
                      trackPDFDownload(bewertungId || "unknown");
                    }
                  }}
                >
                  {loading ? "Lade PDF..." : "Als PDF herunterladen"}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </>
      ) : (
        <p className="p-10 text-gray-600 text-center text-lg">
          Die Zahlung hat funktioniert. Deine Bewertung wird gerade erstellt – bitte einen Moment Geduld…
        </p>
      )}
    </BewertungLayout>
  </Layout>
);}
