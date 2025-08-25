import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [minLoadingTime, setMinLoadingTime] = useState(false); // Start with false, set to true only for Stripe flow

  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell. Bitte sende eine E-Mail an info@pferdewert.de, wir melden uns, sobald das Modell wieder verfügbar ist.";

  useEffect(() => {
    if (!router.isReady) return;

    const session_id = router.query.session_id;
    const bewertung_id = router.query.id;
    
    // Direct ObjectId access (for customer support and email links)
    if (bewertung_id && typeof bewertung_id === "string") {
      log("[ERGEBNIS] Direct ObjectId access for ID:", bewertung_id);
      
      // Skip payment check and minimum loading time for direct access
      setPaid(true);
      // minLoadingTime already false, no need to set
      
      const loadDirectBewertung = async () => {
        try {
          log("[ERGEBNIS] Fetching direct bewertung from API...");
          const res = await fetch(`/api/bewertung?id=${bewertung_id}`);
          
          log("[ERGEBNIS] API Response status:", res.status);
          
          if (res.status === 429) {
            const retryAfter = res.headers.get('Retry-After');
            const retrySeconds = retryAfter ? parseInt(retryAfter) : 30;
            warn(`[ERGEBNIS] 429 Rate limit hit for direct access - retrying in ${retrySeconds}s`);
            
            // For direct access, try again automatically after rate limit expires
            setTimeout(() => {
              info("[ERGEBNIS] Retrying after rate limit cooldown...");
              loadDirectBewertung();
            }, (retrySeconds + 1) * 1000);
            return;
          }
          
          if (!res.ok) {
            warn("[ERGEBNIS] Non-200 response:", res.status);
            if (res.status === 404) {
              setErrorLoading("Diese Bewertung wurde nicht gefunden. Bitte überprüfe den Link oder kontaktiere uns unter info@pferdewert.de");
            } else if (res.status >= 500) {
              setErrorLoading("Server-Fehler beim Laden der Bewertung. Bitte versuche es in wenigen Minuten erneut oder kontaktiere uns.");
            } else {
              setErrorLoading(`Fehler beim Laden der Bewertung (${res.status}). Bitte kontaktiere uns unter info@pferdewert.de`);
            }
            setLoading(false);
            return;
          }
          
          const data = await res.json();
          log("[ERGEBNIS] API Response data:", { 
            hasBewertung: !!data.bewertung,
            processing: data.processing,
            error: data.error
          });
          
          if (data.bewertung && data.bewertung.trim()) {
            info("[ERGEBNIS] ✅ Direct bewertung loaded successfully");
            setText(data.bewertung);
            setLoading(false);
          } else if (data.processing) {
            setErrorLoading("Die Bewertung wird noch erstellt. Bitte versuche es in wenigen Minuten erneut oder aktualisiere diese Seite.");
            setLoading(false);
          } else {
            warn("[ERGEBNIS] Bewertung data incomplete:", data);
            setErrorLoading("Die Bewertung ist noch nicht verfügbar. Bitte versuche es später erneut oder kontaktiere uns unter info@pferdewert.de");
            setLoading(false);
          }
        } catch (err) {
          error("[ERGEBNIS] Error loading direct bewertung:", err);
          setErrorLoading("Netzwerk-Fehler beim Laden der Bewertung. Bitte überprüfe deine Internetverbindung oder versuche es später erneut.");
          setLoading(false);
        }
      };
      
      loadDirectBewertung();
      return;
    }
    
    // Original Stripe session flow
    if (!session_id || typeof session_id !== "string") {
      router.replace("/pferde-preis-berechnen");
      return;
    }

    // Set minimum loading time only for Stripe flow
    setMinLoadingTime(true);
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
          const maxTries = 15; // Increased for longer AI processing times (up to 3+ minutes)
          let consecutiveErrors = 0; // Track consecutive failures for circuit breaker
          
          const getOptimalDelay = (tries: number, consecutiveErrors: number): number => {
            // OPTIMIZED for 60 req/min rate limit (1s minimum between requests)
            // With 15 max tries over ~3 minutes, we can be more responsive
            
            // First minute: Start quickly, then slow down for backend processing
            if (tries <= 2) return 10000;               // 10s, 20s (quick initial checks)
            if (tries <= 4) return 12000;               // 32s, 44s (backend processing time)
            if (tries <= 6) return 8000;                // 52s, 60s (faster response for quick evaluations)
            
            // Second minute: Balanced frequency within rate limits
            if (tries <= 8) return 7000;                // 67s, 74s (8-9s intervals)
            if (tries <= 10) return 6000;               // 80s, 86s (increase frequency)
            
            // Final attempts: Respect rate limits with exponential backoff for errors
            const baseDelay = consecutiveErrors > 0 ? 12000 : 6000;
            return Math.min(25000, baseDelay * Math.pow(1.2, tries - 10));
          };

          const startTime = Date.now(); // Track total processing time
          
          const checkBewertung = async () => {
            tries++;
            const elapsedTime = Math.round((Date.now() - startTime) / 1000);
            log(`[ERGEBNIS] Versuch ${tries}/${maxTries} für Bewertung ID: ${bewertungId} (${elapsedTime}s elapsed)`);
            
            try {
              const retryRes = await fetch(`/api/bewertung?id=${bewertungId}`);
              log(`[ERGEBNIS] API Response Status: ${retryRes.status}`);
              
              if (retryRes.status === 429) {
                // Enhanced 429 handling - respect server rate limits more aggressively
                const retryAfter = retryRes.headers.get('Retry-After');
                const baseDelay = retryAfter ? 
                  Math.max(5000, parseInt(retryAfter) * 1000) :  // Minimum 5s even with server hint
                  Math.max(15000, 5000 + (tries * 2000));       // Escalating delay 15s, 17s, 19s...
                
                // Add jitter to prevent thundering herd
                const jitter = Math.random() * 2000; // 0-2s random
                const delay = Math.min(45000, baseDelay + jitter); // Cap at 45s
                
                warn(`[ERGEBNIS] Rate limited - backing off ${delay}ms (Retry-After: ${retryAfter})`);
                consecutiveErrors++; // Count 429s as errors for circuit breaker
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
                  const totalTime = Math.round((Date.now() - startTime) / 1000);
                  info(`[ERGEBNIS] ✅ Bewertung erfolgreich geladen nach ${totalTime}s (${tries} Versuche)`);
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
                "Die PferdeWert-KI dauert bis zu 3 Minuten. Du erhältst eine E-Mail, sobald sie fertig ist, oder aktualisiere diese Seite in 2-3 Minuten."
              );
              setLoading(false);
              return;
            }

            // CRITICAL: Add timeout fallback to prevent infinite loading
            const elapsedMinutes = Math.round((Date.now() - startTime) / 60000);
            if (elapsedMinutes >= 5) { // 5 minutes absolute timeout
              warn(`[ERGEBNIS] Absolute timeout reached after ${elapsedMinutes} minutes`);
              setErrorLoading(
                "Die Bewertung dauert länger als erwartet. Bitte aktualisiere die Seite in wenigen Minuten oder kontaktiere uns unter info@pferdewert.de"
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
        <div className="p-10 text-center">
          <p className="text-gray-600 text-lg mb-4">
            Die Zahlung hat funktioniert. Deine PferdeWert-KI wird gerade erstellt…
          </p>
          <p className="text-blue-600 text-base font-medium mb-2">
            ⏱️ Dauert 1-3 Minuten
          </p>
          <p className="text-gray-500 text-sm">
            Du erhältst das Ergebnis zusätzlich per E-Mail.
          </p>
        </div>
      )}
    </BewertungLayout>
  </Layout>
);}
