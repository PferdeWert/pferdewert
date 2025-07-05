// frontend/pages/ergebnis.tsx
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import PferdeWertPDF from "@/components/PferdeWertPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Head from "next/head";
import Layout from "@/components/Layout";

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

  const [bewertungText, setBewertungText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const currentStatusRef = useRef<'checking' | 'validating' | 'polling' | 'processing' | 'completed'>('checking');

  const MAX_POLLING_ATTEMPTS = 10;
  const POLLING_INTERVAL = 3000;

  const cleanupPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

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

  const pollBewertungStatus = useCallback(async (
    bewertungId: string,
    abortSignal: AbortSignal
  ): Promise<'completed' | 'waiting' | 'error'> => {
    try {
      if (currentStatusRef.current === 'completed') return 'completed';

      const res = await fetch(`/api/status/${bewertungId}`, { signal: abortSignal });
      if (!res.ok) throw new Error(getErrorMessage(res.status));
      const data: StatusResponse = await res.json();

      if (data.status === 'freigegeben' && data.bewertung) {
        setBewertungText(data.bewertung);
        currentStatusRef.current = 'completed';
        cleanupPolling();
        setIsLoading(false);
        return 'completed';
      }

      if (data.status === 'bewertet') {
        currentStatusRef.current = 'processing';
        setPollingAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= MAX_POLLING_ATTEMPTS) {
            cleanupPolling();
            setErrorMessage("Die Bewertung dauert ungewöhnlich lange. Bitte versuche es später erneut oder kontaktiere uns unter info@pferdewert.de");
            setIsLoading(false);
          }
          return newAttempts;
        });
        return 'waiting';
      }

      throw new Error(`Unerwarteter Status: ${data.status}`);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return 'error';
      cleanupPolling();
      setErrorMessage(err instanceof Error ? err.message : "Verbindung fehlgeschlagen. Bitte überprüfe deine Internetverbindung.");
      setIsLoading(false);
      return 'error';
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const session_id = router.query.session_id;
    if (!session_id || typeof session_id !== "string") {
      router.replace("/bewerten");
      return;
    }

    const abortController = new AbortController();

    const initializeErgebnis = async () => {
      try {
        currentStatusRef.current = 'validating';
        const sessionRes = await fetch(`/api/session?session_id=${session_id}`, {
          signal: abortController.signal
        });

        if (!sessionRes.ok) throw new Error(getErrorMessage(sessionRes.status));
        const sessionData: SessionResponse = await sessionRes.json();

        const isPaymentOk = sessionData?.session?.payment_status === "paid";
        const bewertungId = sessionData?.session?.metadata?.bewertungId;

        if (!isPaymentOk || !bewertungId) {
          router.replace("/bewerten");
          return;
        }

        setIsPaid(true);

        const firstResult = await pollBewertungStatus(bewertungId, abortController.signal);

        if (
          firstResult !== 'completed' &&
          intervalRef.current === null &&
          !abortController.signal.aborted
        ) {
          intervalRef.current = setInterval(() => {
            if (abortController.signal.aborted || currentStatusRef.current === 'completed') {
              cleanupPolling();
              return;
            }
            pollBewertungStatus(bewertungId, abortController.signal);
          }, POLLING_INTERVAL);
        }

      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setErrorMessage(err instanceof Error ? err.message : "Fehler beim Laden der Bewertung. Bitte erneut versuchen.");
        setIsLoading(false);
      }
    };

    initializeErgebnis();
    return () => {
      abortController.abort();
      cleanupPolling();
    };
  }, [router.isReady, router.query.session_id, pollBewertungStatus]);

  if (!isLoading && !isPaid && !errorMessage) {
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
        <div className="text-center py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">
              Oops, da ist etwas schiefgelaufen
            </h2>
            <p className="text-red-700 mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Wir analysieren deine Eingaben mit KI. Dies dauert normalerweise nur wenige Sekunden.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Deine Pferdebewertung - PferdeWert</title>
      </Head>
      <div className="text-center py-8">
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            ✅ Deine Bewertung ist fertig!
          </p>
        </div>
        <div className="prose prose-lg max-w-full mb-8 text-left mx-auto">
          <ReactMarkdown>{bewertungText}</ReactMarkdown>
        </div>
        <PDFDownloadLink
          document={<PferdeWertPDF markdownData={bewertungText} />}
          fileName="PferdeWert-Analyse.pdf"
        >
          {({ loading }) => (
            <button className="bg-brand-green hover:bg-brand-green/80 text-white font-bold py-4 px-8 rounded-2xl shadow-soft transition-colors">
              {loading ? "Erstelle PDF..." : "📄 PDF herunterladen"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </Layout>
  );
}