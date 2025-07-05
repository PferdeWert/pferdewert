// frontend/pages/ergebnis.tsx
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";
import PferdeWertPDF from "@/components/PferdeWertPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { log, warn, error as logError } from "@/lib/log";

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
  const router = useRouter();
  const [bewertungText, setBewertungText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentStatusRef = useRef<'checking' | 'validating' | 'polling' | 'processing' | 'completed'>('checking');

  const MAX_POLLING_ATTEMPTS = 10;
  const POLLING_INTERVAL = 3000;

  const getErrorMessage = (status: number): string => {
    const messages: Record<number, string> = {
      401: "Zugriff verweigert. Bitte führe erneut eine Bewertung durch.",
      404: "Bewertung nicht gefunden.",
      429: "Zu viele Anfragen. Bitte später erneut versuchen.",
      500: "Serverfehler. Bitte versuche es später erneut.",
      503: "Service nicht verfügbar. Versuche es später erneut."
    };
    return messages[status] || `Fehler (${status}) - Support kontaktieren.`;
  };

  const cleanupPolling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
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
          const attempts = prev + 1;
          if (attempts >= MAX_POLLING_ATTEMPTS) {
            cleanupPolling();
            setErrorMessage("Bewertung dauert zu lange. Bitte später erneut versuchen.");
            setIsLoading(false);
          }
          return attempts;
        });
        return 'waiting';
      }

      throw new Error(`Unerwarteter Status: ${data.status}`);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return 'error';
      logError("[POLLING-ERROR]", err);
      cleanupPolling();
      setErrorMessage(err instanceof Error ? err.message : "Verbindung fehlgeschlagen.");
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

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/session?session_id=${session_id}`, {
          signal: abortController.signal
        });

        if (!res.ok) throw new Error(getErrorMessage(res.status));
        const sessionData: SessionResponse = await res.json();

        if (sessionData.session.payment_status !== "paid") {
          router.replace("/bewerten");
          return;
        }

        const bewertungId = sessionData.session.metadata?.bewertungId;
        if (!bewertungId) throw new Error("Keine bewertungId vorhanden.");

        setIsPaid(true);
        const result = await pollBewertungStatus(bewertungId, abortController.signal);

        if (result !== 'completed' && !abortController.signal.aborted) {
          intervalRef.current = setInterval(() => {
            if (abortController.signal.aborted || currentStatusRef.current === 'completed') {
              cleanupPolling();
              return;
            }
            pollBewertungStatus(bewertungId, abortController.signal);
          }, POLLING_INTERVAL);
        }

      } catch (err) {
        if (!(err instanceof Error && err.name === 'AbortError')) {
          setErrorMessage(err instanceof Error ? err.message : "Unbekannter Fehler.");
          setIsLoading(false);
        }
      }
    };

    fetchSession();
    return () => {
      abortController.abort();
      cleanupPolling();
    };
  }, [router.isReady, router.query.session_id, pollBewertungStatus]);

  if (!isLoading && !isPaid && !errorMessage) {
    return <div className="p-10 text-red-500 text-center">Zugriff verweigert.</div>;
  }

  if (errorMessage) {
    return <div className="p-10 text-red-500 text-center">{errorMessage}</div>;
  }

  if (isLoading) {
    return <div className="p-10 text-gray-500 text-center">Lädt Bewertung...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
        <p className="text-green-800 font-medium">✅ Deine Bewertung ist fertig!</p>
      </div>
      <div className="prose mb-8">
        <ReactMarkdown>{bewertungText}</ReactMarkdown>
      </div>
      <div className="text-center">
        <PDFDownloadLink
          document={<PferdeWertPDF markdownData={bewertungText} />}
          fileName="PferdeWert-Analyse.pdf"
        >
          {({ loading }) => (
            <button className="bg-brand-green text-white font-bold py-3 px-6 rounded">
              {loading ? "PDF wird erstellt..." : "📄 PDF herunterladen"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}