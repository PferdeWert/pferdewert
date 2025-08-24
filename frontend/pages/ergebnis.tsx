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
          const maxTries = 12; // Reduced from 20 for faster UX
          let consecutiveErrors = 0; // Track consecutive failures for circuit breaker
          
          const getOptimalDelay = (tries: number, consecutiveErrors: number): number => {
            // Critical first 20 seconds - aggressive attempts for better UX
            if (tries <= 3) return tries * 1000;        // 1s, 2s, 3s
            if (tries <= 6) return 3000;                // 3s each (total: ~18s)
            
            // After 20s - more conservative backoff
            const baseDelay = consecutiveErrors > 0 ? 8000 : 5000;
            return Math.min(30000, baseDelay * Math.pow(1.4, tries - 6));
          };

          const checkBewertung = async () => {
            tries++;
            log(`[ERGEBNIS] Versuch ${tries}/${maxTries} für Bewertung ID: ${bewertungId}`);
            
            try {
              const retryRes = await fetch(`/api/bewertung?id=${bewertungId}`);
              log(`[ERGEBNIS] API Response Status: ${retryRes.status}`);
              
              if (retryRes.status === 429) {
                // Smart 429 handling with server hint respect
                const retryAfter = retryRes.headers.get('Retry-After');
                const delay = retryAfter ? 
                  Math.max(1000, parseInt(retryAfter) * 1000) : 
                  Math.min(10000, 2000 + (tries * 1000));
                
                log(`[ERGEBNIS] Rate limit - waiting ${delay}ms (Retry-After: ${retryAfter})`);
                setTimeout(checkBewertung, delay);
                return;
              }
              
              if (retryRes.status === 404) {
                const errorData = await retryRes.json();
                log("[ERGEBNIS] 404 Response data:", errorData);
                
                if (errorData.processing) {
                  log("[ERGEBNIS] ✅ Bewertung wird noch erstellt, weiter versuchen... (processing=true)");
                  consecutiveErrors = 0; // Reset error counter on processing response
                } else {
                  error("[ERGEBNIS] ❌ Bewertung nicht gefunden - falsche ID oder Dokument existiert nicht");
                  setErrorLoading("Die Bewertung konnte nicht gefunden werden. Bitte kontaktiere uns unter info@pferdewert.de");
                  setLoading(false);
                  return;
                }
              } else {
                const retryData = await retryRes.json();
                log("[ERGEBNIS] Response data:", { hasBewertung: !!retryData.bewertung, error: retryData.error });
                
                if (retryData.bewertung && retryData.bewertung.trim()) {
                  info("[ERGEBNIS] ✅ Bewertung erfolgreich geladen");
                  setText(retryData.bewertung);
                  setLoading(false);
                  return;
                }
                consecutiveErrors = 0; // Reset on successful response
              }
            } catch (err) {
              error("[ERGEBNIS] Network error:", err);
              consecutiveErrors++;
            }

            // Smart circuit breaker - more lenient early, stricter later
            if (consecutiveErrors >= 3 && tries >= 6) {
              warn(`[ERGEBNIS] Circuit breaker: ${consecutiveErrors} errors after ${tries} attempts`);
              setErrorLoading(
                "Es gab mehrere Verbindungsprobleme. Bitte aktualisiere die Seite oder kontaktiere uns unter info@pferdewert.de"
              );
              setLoading(false);
              return;
            }

            if (tries >= maxTries) {
              warn(`[ERGEBNIS] Bewertung nach ${maxTries} Versuchen nicht verfügbar.`);
              setErrorLoading(
                "Die Bewertung wird noch erstellt. Du erhältst eine E-Mail, sobald sie fertig ist, oder aktualisiere diese Seite in wenigen Minuten."
              );
              setLoading(false);
              return;
            }
            
            // Optimized delay schedule for better UX
            const delay = getOptimalDelay(tries, consecutiveErrors);
            log(`[ERGEBNIS] 🔄 Next attempt ${tries + 1}/${maxTries} in ${delay}ms`);
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

    // No cleanup needed for setTimeout-based retry logic
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
