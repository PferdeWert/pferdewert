import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BewertungLayout from "@/components/BewertungLayout";
import dynamic from "next/dynamic";
import { log, warn, error, info } from "@/lib/log";
import Head from "next/head";
import Layout from "@/components/Layout";
import StripeLoadingScreen from "@/components/StripeLoadingScreen";
import { trackValuationCompleted, trackPDFDownload } from "@/lib/analytics";
import { normalizeTierParam } from "@/lib/pricing-session";
import PremiumUploadScreen from "@/components/PremiumUploadScreen";
import { splitAnalysis, type Tier } from "@/lib/analysisSplitter";
import { TIER_PRICES } from "@/lib/pricing";

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
  const [tier, setTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const [minLoadingTime, setMinLoadingTime] = useState(false); // Start with false, set to true only for Stripe flow
  const [bewertungId, setBewertungId] = useState<string | null>(null);
  const [readToken, setReadToken] = useState<string | null>(null);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell. Bitte sende eine E-Mail an info@pferdewert.de, wir melden uns, sobald das Modell wieder verfügbar ist.";

  useEffect(() => {
    if (!router.isReady) return;

    const session_id = router.query.session_id;
    const bewertung_id = router.query.id;
    const token = router.query.token;
    
    // Direct ObjectId access (for customer support and email links) or test mode
    if (bewertung_id && typeof bewertung_id === "string") {
      log("[ERGEBNIS] Direct ObjectId access for ID:", bewertung_id);
      
      // Skip payment check and minimum loading time for direct access
      setPaid(true);
      // minLoadingTime already false, no need to set
      setBewertungId(bewertung_id);
      if (token && typeof token === 'string') setReadToken(token);
      
      const loadDirectBewertung = async () => {
        try {
          log("[ERGEBNIS] Fetching direct bewertung from API...");
          const tokenParam = token && typeof token === 'string' ? `&token=${encodeURIComponent(token)}` : '';
          
          // Use test API in development for test IDs
          const isTestId = bewertung_id === 'test' || bewertung_id.startsWith('test-');
          const apiEndpoint = isTestId && process.env.NODE_ENV === 'development' 
            ? `/api/test-bewertung?tier=${router.query.tier || 'pro'}`
            : `/api/bewertung?id=${bewertung_id}${tokenParam}`;
          
          const res = await fetch(apiEndpoint);
          
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
            // Store tier if available for gating
            if (data.tier) {
              const validTier = data.tier as Tier;
              setTier(validTier);
            }
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
          setBewertungId(bewertungId);
          // Capture tier from session metadata for gating (Stripe flow)
          const selectedTierRaw = data.session.metadata?.selectedTier as string | undefined;
          if (selectedTierRaw) {
            const norm = normalizeTierParam(selectedTierRaw);
            setTier(norm || null);
          }
          
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
                  // Keep tier if present from retry response
                  if (retryData.tier) {
                    const validTier = retryData.tier as Tier;
                    setTier(validTier);
                  }
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

  // Premium MVP: Show upload screen instead of AI analysis
  if (tier === 'premium') {
    const handlePremiumUpload = () => {
      // Track Premium upload engagement
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'premium_upload_initiated', {
          'event_category': 'Premium',
          'event_label': 'Dropbox Upload',
          'session_id': router.query.session_id || 'unknown'
        });
        info('[PREMIUM] Tracked upload initiation event');
      }
    };

    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href="https://pferdewert.de/ergebnis" />
        </Head>
        <BewertungLayout title="PferdeWert – Premium Expertenanalyse">
          <PremiumUploadScreen onUploadClick={handlePremiumUpload} />
        </BewertungLayout>
      </Layout>
    );
  }

  // Simple tier-based content gating
  const { visible: renderText, hidden: hiddenText, hasMore } = splitAnalysis(text || '', tier || 'pro');
  const pdfContent = renderText;

  // Upsell helpers
  const nextTier = (current: Tier | null): Tier | null => {
    if (current === 'basic') return 'pro';
    if (current === 'pro') return 'premium';
    return null;
  };

  const formatPrice = (n: number) => `${n.toFixed(2).replace('.', ',')}€`;
  const diffPrice = (from: Tier, to: Tier): string => {
    // MVP business rules for upgrade pricing display
    if (from === 'basic' && to === 'pro') return '4,90€';
    if (from === 'pro' && to === 'premium') return '17,90€';
    // Fallback (should rarely be used)
    const fromPrice = TIER_PRICES[from];
    const toPrice = TIER_PRICES[to];
    const diff = Math.max(0, toPrice - fromPrice);
    return formatPrice(diff);
  };

  const startUpgrade = async (to: Tier) => {
    if (!bewertungId || !tier) return;
    try {
      // Analytics: begin checkout upgrade
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'begin_checkout_upgrade', {
          from_tier: tier,
          to_tier: to
        });
      }
      const res = await fetch('/api/upgrade-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bewertungId, fromTier: tier, targetTier: to, readToken })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        warn('[ERGEBNIS] Upgrade checkout failed', err);
        setUpgradeError('Upgrade nicht möglich. Prüfe bitte Test-Variablen in .env.local (Upgrade-Preis-IDs) oder versuche es später erneut.');
        return;
      }
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url as string;
      }
    } catch (err) {
      error('[ERGEBNIS] Error starting upgrade checkout', err);
      setUpgradeError('Netzwerkfehler beim Starten des Upgrades. Bitte versuche es erneut.');
    }
  };

  const previewFromHidden = (hidden: string): string => {
    if (!hidden) return '';
    const limit = 500;
    if (hidden.length <= limit) return hidden;
    // Try to cut at next paragraph boundary after ~400 chars
    const soft = 380;
    const idx = hidden.indexOf('\n\n', soft);
    const cut = idx > -1 && idx < 650 ? idx : limit;
    return hidden.substring(0, cut).trim() + '\n\n…';
  };

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
            <ReactMarkdown>{renderText}</ReactMarkdown>
          </div>
          {/* PDF first to clarify it matches the purchased analysis */}
          <div className="mt-6 flex justify-center sm:mt-8">
            <PDFDownloadLink
              document={<PferdeWertPDF markdownData={pdfContent} />}
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

          {/* Simple Upsell CTAs for Basic and Pro */}
          {(() => {
            const to = nextTier(tier);
            if (!to) return null;
            // Basic → Pro: prominent card between analysis and PDF
            if (tier === 'basic') {
              return (
                <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="font-semibold text-amber-900">Vollständige Analyse freischalten</div>
                      <div className="text-amber-800 text-sm">Sieh alle Detailabschnitte und erhalte den vollständigen Bericht.</div>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => startUpgrade(to)}
                    >
                      Jetzt auf Pro upgraden – nur {diffPrice('basic','pro')}
                    </button>
                  </div>
                  {upgradeError && (
                    <div className="mt-3 text-sm text-red-700">
                      {upgradeError}
                    </div>
                  )}
                  {hasMore && hiddenText && (
                    <div className="mt-5 rounded-xl bg-white/70 border border-amber-200 p-4">
                      <div className="text-xs font-semibold text-amber-900 mb-2">Vorschau der weiteren Analyse</div>
                      <div className="prose prose-sm max-w-none text-amber-900">
                        <ReactMarkdown>{previewFromHidden(hiddenText)}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            // Pro → Premium: compact banner
            if (tier === 'pro') {
              return (
                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-blue-900">
                    Premium Foto-Analyse mit Exterieur-Bewertung freischalten.
                  </div>
                  <button
                    className="btn-secondary"
                    onClick={() => startUpgrade(to)}
                  >
                    Premium aktivieren – {diffPrice('pro','premium')}
                  </button>
                  {upgradeError && (
                    <div className="mt-2 text-xs text-red-700">
                      {upgradeError}
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })()}
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
