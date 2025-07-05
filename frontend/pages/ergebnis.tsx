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

  const [bewertungText, setBewertungText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const currentStatusRef = useRef<'checking' | 'validating' | 'polling' | 'processing' | 'completed'>('checking');

  const MAX_POLLING_ATTEMPTS = 10;
  const POLLING_INTERVAL = 3000;

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

  const pollBewertungStatus = async (bewertungId: string, abortSignal: AbortSignal): Promise<'completed' | 'waiting' | 'error'> => {
    try {
      if (currentStatusRef.current === 'completed') {
        log("[ERGEBNIS] Poll übersprungen – bereits abgeschlossen");
        return 'completed';
      }

      const res = await fetch(`/api/status/${bewertungId}`, { signal: abortSignal });
      if (!res.ok) throw new Error(getErrorMessage(res.status));
      const data: StatusResponse = await res.json();
      log(`[ERGEBNIS] Status-Poll #${pollingAttempts + 1}:`, data);

      if (data.status === 'freigegeben' && data.bewertung) {
        setBewertungText(data.bewertung);
        currentStatusRef.current = 'completed';
        cleanupPolling();
        setIsLoading(false);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "bewertung_loaded", {
            event_category: "Success",
            event_label: "Bewertung erfolgreich geladen",
            value: 1,
          });
        }
        return 'completed';
      }

      if (data.status === 'bewertet') {
        currentStatusRef.current = 'processing';
        setPollingAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= MAX_POLLING_ATTEMPTS) {
            cleanupPolling();
            setErrorMessage("Die Bewertung dauert ungewöhnlich lange. Bitte versuche es in wenigen Minuten erneut oder kontaktiere uns unter info@pferdewert.de");
            setIsLoading(false);
          }
          return newAttempts;
        });
        return 'waiting';
      }

      throw new Error(`Unerwarteter Status: ${data.status}`);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        log("[ERGEBNIS] Request abgebrochen (Component unmount)");
        return 'error';
      }
      logError("[ERGEBNIS] Polling-Fehler:", err);
      cleanupPolling();
      const fallbackMsg = err instanceof Error ? err.message : "Verbindung fehlgeschlagen. Bitte überprüfe deine Internetverbindung.";
      setErrorMessage(fallbackMsg);
      setIsLoading(false);
      return 'error';
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
        currentStatusRef.current = 'validating';
        log("[ERGEBNIS] Validiere Session für ID:", session_id);

        const sessionRes = await fetch(`/api/session?session_id=${session_id}`, {
          signal: abortController.signal
        });

        if (!sessionRes.ok) throw new Error(getErrorMessage(sessionRes.status));
        const sessionData: SessionResponse = await sessionRes.json();
        log("[ERGEBNIS] Session-Daten:", sessionData);

        const isPaymentOk = sessionData?.session?.payment_status === "paid";
        const bewertungId = sessionData?.session?.metadata?.bewertungId;

        if (!isPaymentOk) {
          warn("[ERGEBNIS] Zahlung nicht erfolgt – Redirect zu /bewerten");
          router.replace("/bewerten");
          return;
        }

        if (!bewertungId) {
          throw new Error("Keine bewertungId in Session-Metadaten gefunden. Bitte kontaktiere den Support.");
        }

        setIsPaid(true);
        log("[ERGEBNIS] Starte Status-Polling für Bewertung:", bewertungId);
        const firstResult = await pollBewertungStatus(bewertungId, abortController.signal);

        if (firstResult !== 'completed' && intervalRef.current === null && !abortController.signal.aborted) {
          intervalRef.current = setInterval(() => {
            if (abortController.signal.aborted || currentStatusRef.current === 'completed') {
              cleanupPolling();
              return;
            }
            pollBewertungStatus(bewertungId, abortController.signal);
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
  }, [router.isReady, router.query.session_id]);

  // ... (Der restliche Code bleibt unverändert)
}
