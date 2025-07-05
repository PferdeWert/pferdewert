// frontend/pages/ergebnis.tsx
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";
import PferdeWertPDF from "@/components/PferdeWertPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { log, warn, error as logError } from "@/lib/log";
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";

// Typing für API-Responses
interface StatusResponse {
  status: 'bewertet' | 'freigegeben' | 'offen';
  bewertung?: string;
  message?: string;
}

interface SessionResponse {
  session: {
    payment_status: string;
    metadata?: {
      bewertungId: string;
    };
  };
}

export default function Ergebnis() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // State Management
  const [bewertungText, setBewertungText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const [currentStatus, setCurrentStatus] = useState<string>('checking');

  const MAX_POLLING_ATTEMPTS = 10;
  const POLLING_INTERVAL = 3000; // 3 Sekunden

  const getErrorMessage = (status: number): string => {
    switch (status) {
      case 401: return "Zugriff verweigert. Bitte führe erneut eine Bewertung durch.";
      case 404: return "Bewertung nicht gefunden. Möglicherweise ist sie abgelaufen oder wurde bereits verarbeitet.";
      case 429: return "Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.";
      case 500: return "Serverfehler. Wir arbeiten an einer Lösung - bitte versuche es in wenigen Minuten erneut.";
      case 503: return "Service vorübergehend nicht verfügbar. Bitte später erneut versuchen.";
      default: return `Unerwarteter Fehler (${status}). Bitte kontaktiere den Support unter info@pferdewert.de.`;
    }
  };

  const cleanupPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const pollBewertungStatus = async (bewertungId: string, abortSignal: AbortSignal) => {
    try {
      setCurrentStatus('polling');
      const res = await fetch(`/api/status?id=${bewertungId}`, { signal: abortSignal });
      if (!res.ok) throw new Error(getErrorMessage(res.status));
      const data: StatusResponse = await res.json();
      log(`[ERGEBNIS] Status-Poll #${pollingAttempts + 1}:`, data);

      if (data.status === 'freigegeben' && data.bewertung) {
        setBewertungText(data.bewertung);
        setCurrentStatus('completed');
        cleanupPolling();
        setIsLoading(false);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "bewertung_loaded", {
            event_category: "Success",
            event_label: "Bewertung erfolgreich geladen",
            value: 1,
          });
        }
        return;
      }

      if (data.status === 'bewertet') {
        setCurrentStatus('processing');
        setPollingAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= MAX_POLLING_ATTEMPTS) {
            cleanupPolling();
            setErrorMessage("Die Bewertung dauert ungewöhnlich lange. Bitte versuche es in wenigen Minuten erneut oder kontaktiere uns unter info@pferdewert.de");
            setIsLoading(false);
          }
          return newAttempts;
        });
        return;
      }

      throw new Error(`Unerwarteter Status: ${data.status}. Bitte kontaktiere den Support.`);

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        log("[ERGEBNIS] Request abgebrochen (Component unmount)");
        return;
      }
      logError("[ERGEBNIS] Polling-Fehler:", err);
      cleanupPolling();
      const fallbackMsg = err instanceof Error ? err.message : "Verbindung fehlgeschlagen. Bitte überprüfe deine Internetverbindung.";
      setErrorMessage(fallbackMsg);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const session_id = router.query.session_id;
    if (!session_id || typeof session_id !== "string") {
      warn("[ERGEBNIS] Keine session_id gefunden - Redirect zu /bewerten");
      router.replace("/bewerten");
      return;
    }

    const abortController = new AbortController();

    const initializeErgebnis = async () => {
      try {
        setCurrentStatus('validating');
        log("[ERGEBNIS] Validiere Session für ID:", session_id);
        const sessionRes = await fetch(`/api/session?session_id=${session_id}`, {
          signal: abortController.signal
        });
        if (!sessionRes.ok) throw new Error(getErrorMessage(sessionRes.status));
        const sessionData: SessionResponse = await sessionRes.json();
        log("[ERGEBNIS] Session-Daten:", sessionData);

        if (!sessionData?.session?.payment_status || sessionData.session.payment_status !== "paid") {
          warn("[ERGEBNIS] Zahlung nicht erfolgt - Redirect zu /bewerten");
          router.replace("/bewerten");
          return;
        }

        setIsPaid(true);
const bewertungId = sessionData.session?.metadata?.bewertungId;
if (!bewertungId) throw new Error("Keine bewertungId in Session-Metadaten gefunden. Bitte kontaktiere den Support.");

        log("[ERGEBNIS] Starte Status-Polling für Bewertung:", bewertungId);
        await pollBewertungStatus(bewertungId, abortController.signal);

        if (intervalRef.current === null && !abortController.signal.aborted) {
          intervalRef.current = setInterval(() => {
            if (!abortController.signal.aborted) {
              pollBewertungStatus(bewertungId, abortController.signal);
            }
          }, POLLING_INTERVAL);
        }

      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          log("[ERGEBNIS] Initialisierung abgebrochen (Component unmount)");
          return;
        }
        logError("[ERGEBNIS] Initialisierungs-Fehler:", err);
        const fallbackMsg = err instanceof Error ? err.message : "Fehler beim Laden der Bewertung. Bitte erneut versuchen.";
        setErrorMessage(fallbackMsg);
        setIsLoading(false);
      }
    };

    initializeErgebnis();
    return () => {
      abortController.abort();
      cleanupPolling();
    };
  }, [router.isReady, router.query.session_id, router, pollBewertungStatus]); // ESLint fix

  const handleRetry = () => {
    setErrorMessage(null);
    setIsLoading(true);
    setPollingAttempts(0);
    window.location.reload(); // FIX: Vereinfacht
  };

  // Progress Indicator Component
  const ProgressIndicator = () => {
    const getStatusText = () => {
      switch (currentStatus) {
        case 'checking': return 'Überprüfe Zahlung...';
        case 'validating': return 'Validiere Session...';
        case 'polling': return 'Prüfe Bewertungs-Status...';
        case 'processing': return 'Deine Bewertung wird erstellt...';
        default: return 'Lädt...';
      }
    };

    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg font-medium text-gray-700">{getStatusText()}</span>
        </div>
        
        {currentStatus === 'processing' && (
          <div className="mb-4">
            <div className="bg-gray-200 rounded-full h-2 max-w-md mx-auto">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((pollingAttempts / MAX_POLLING_ATTEMPTS) * 100, 90)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Versuch {pollingAttempts} von {MAX_POLLING_ATTEMPTS}
            </p>
          </div>
        )}
        
        <p className="text-gray-600 max-w-md mx-auto">
          Wir analysieren deine Eingaben mit KI. Dies dauert normalerweise nur wenige Sekunden.
        </p>
      </div>
    );
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg mb-6 w-3/4"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  // Render Logic
  if (!isPaid && !errorMessage) {
    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="p-10 text-red-500 text-center">
          <p>Zugriff verweigert. Bitte führe zuerst eine Bewertung durch.</p>
        </div>
      </Layout>
    );
  }

  if (errorMessage) {
    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <BewertungLayout title="PferdeWert – Fehler">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
              <li><span className="mx-2">›</span></li>
              <li><Link href="/bewerten" className="hover:text-gray-700">Bewerten</Link></li>
              <li><span className="mx-2">›</span></li>
              <li className="text-red-600 font-medium">Fehler</li>
            </ol>
          </nav>
          
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-red-800 mb-4">
                Oops, da ist etwas schiefgelaufen
              </h2>
              <p className="text-red-700 mb-6">{errorMessage}</p>
              <button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        </BewertungLayout>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <BewertungLayout title="PferdeWert – Erstelle Bewertung">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
              <li><span className="mx-2">›</span></li>
              <li><Link href="/bewerten" className="hover:text-gray-700">Bewerten</Link></li>
              <li><span className="mx-2">›</span></li>
              <li className="text-gray-900 font-medium">Ergebnis (Lädt...)</li>
            </ol>
          </nav>
          
          <ProgressIndicator />
          <div className="mt-8">
            <LoadingSkeleton />
          </div>
        </BewertungLayout>
      </Layout>
    );
  }

  // Bewertung anzeigen
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Deine Pferdebewertung - PferdeWert</title>
      </Head>
      
      <BewertungLayout title="PferdeWert – Deine Bewertung">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/bewerten" className="hover:text-gray-700">Bewerten</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-gray-900 font-medium">Ergebnis</li>
          </ol>
        </nav>

        {bewertungText ? (
          <>
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-center font-medium">
                ✅ Deine Bewertung ist fertig! Hier ist deine detaillierte Analyse:
              </p>
            </div>
            
            <div className="prose prose-lg max-w-full mb-8">
              <ReactMarkdown>{bewertungText}</ReactMarkdown>
            </div>
            
            <div className="text-center">
              <PDFDownloadLink
                document={<PferdeWertPDF markdownData={bewertungText} />}
                fileName="PferdeWert-Analyse.pdf"
              >
                {({ loading }) => (
                  <button className="bg-brand-green hover:bg-brand-green/80 text-white font-bold py-4 px-8 rounded-2xl shadow-soft transition-colors">
                    {loading ? (
                      <>
                        <span className="inline-block animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Erstelle PDF...
                      </>
                    ) : (
                      <>
                        📄 PDF herunterladen
                      </>
                    )}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">
              Keine Bewertung gefunden. Bitte versuche es erneut.
            </p>
          </div>
        )}
      </BewertungLayout>
    </Layout>
  );
}