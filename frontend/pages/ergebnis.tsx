import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";
import PferdeWertPDF from "@/components/PferdeWertPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { log, warn, error } from "@/lib/log";
import Head from "next/head";
import Layout from "@/components/Layout";
import { trackPDFDownload } from "@/lib/analytics";
import StripeLoadingScreen from "@/components/StripeLoadingScreen";



export default function Ergebnis() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const [bewertungId, setBewertungId] = useState<string | null>(null);

  type BewertungBySessionResponse = {
    id?: string;
    bewertung?: string;
    status?: string | null;
    error?: string;
  };

  const addJitter = (ms: number) => ms + Math.floor(Math.random() * 1000); // +0..1000ms

  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell. Bitte sende eine E-Mail an info@pferdewert.de, wir melden uns, sobald das Modell wieder verfügbar ist.";

  useEffect(() => {
    if (!router.isReady) return;

    // Gentle polling schedule with jitter, covering up to ~2 minutes
    const POLLING_SCHEDULE_MS = [
      10000, 20000, 30000, 45000, 60000, 80000, 100000, 120000,
    ];

    const session_id = router.query.session_id;
    const bewertung_id = router.query.id;

    // Check if we have either a session_id (Stripe flow) or bewertung_id (direct link)
    if ((!session_id || typeof session_id !== "string") && (!bewertung_id || typeof bewertung_id !== "string")) {
      router.replace("/pferde-preis-berechnen");
      return;
    }

    // Handle direct ObjectId access (email links)
    if (bewertung_id && typeof bewertung_id === "string") {
      log("[ERGEBNIS] Direct ObjectId access for ID:", bewertung_id);
      setPaid(true); // Skip payment check for direct access
      setBewertungId(bewertung_id);

      const loadDirectBewertung = async () => {
        try {
          log("[ERGEBNIS] Fetching direct bewertung from API...");
          const res = await fetch(`/api/bewertung?id=${bewertung_id}`);
          log("[ERGEBNIS] API Response status:", res.status);

          if (!res.ok) {
            if (res.status === 404) {
              setErrorLoading("Diese Bewertung wurde nicht gefunden. Bitte überprüfe den Link oder kontaktiere uns unter info@pferdewert.de");
            } else if (res.status === 429) {
              setErrorLoading("Zu viele Anfragen. Bitte warte einen Moment und lade die Seite neu.");
            } else if (res.status >= 500) {
              setErrorLoading("Server-Fehler beim Laden der Bewertung. Bitte versuche es in wenigen Minuten erneut oder kontaktiere uns.");
            } else {
              setErrorLoading(`Fehler beim Laden der Bewertung (${res.status}). Bitte kontaktiere uns unter info@pferdewert.de`);
            }
            setLoading(false);
            return;
          }

          const data = await res.json();
          log("[ERGEBNIS] API Response data:", { hasBewertung: !!data.bewertung });

          if (data.bewertung && data.bewertung.trim()) {
            log("[ERGEBNIS] ✅ Direct bewertung loaded successfully");
            setText(data.bewertung);
            setLoading(false);
          } else {
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

    const fetchSession = async () => {
      try {
        log("[ERGEBNIS] Starte DB-Load über session_id (bevor Stripe):", session_id);

        // 1) Versuche zuerst DB über session_id (vermeidet Stripe 429 bei Refresh)
        let fbData: BewertungBySessionResponse | null = null;
        try {
          const fb = await fetch(`/api/bewertung-by-session?session_id=${session_id}`);
          try { fbData = await fb.json(); } catch {}
        } catch {}

        const startPollingById = (id: string) => {
          let index = 0;
          const poll = () => {
            if (index >= POLLING_SCHEDULE_MS.length) {
              warn("[ERGEBNIS] Polling beendet – keine Bewertung gefunden");
              setLoading(false);
              return;
            }
            const delay = addJitter(POLLING_SCHEDULE_MS[index++]);
            log(`[ERGEBNIS] Polling (T${index}/${POLLING_SCHEDULE_MS.length}) für ID: ${id} in ${delay}ms`);
            intervalRef.current = setTimeout(async () => {
              try {
                const r = await fetch(`/api/bewertung?id=${id}`);
                if (r.ok) {
                  const d = await r.json();
                  if (d?.bewertung) {
                    setText(d.bewertung);
                    setLoading(false);
                    return;
                  }
                } else if (r.status === 429) {
                  // Rate limited - wait longer before next attempt
                  warn("[ERGEBNIS] Rate limited, extending delay");
                  index = Math.max(index - 1, 0); // Don't advance index
                  const extendedDelay = Math.min(delay * 2, 300000); // Max 5 minutes
                  setTimeout(poll, extendedDelay);
                  return;
                }
              } catch {}
              poll();
            }, delay);
          };
          poll();
        };

        if (fbData && fbData.id) {
          setPaid(true);
          setBewertungId(fbData.id);
          if (typeof fbData.bewertung === "string" && fbData.bewertung.trim()) {
            log("[ERGEBNIS] ✅ Bewertung via DB (session_id) geladen");
            setText(fbData.bewertung);
            setLoading(false);
            return;
          }
          // Bewertung existiert noch nicht -> Polling starten
          startPollingById(fbData.id);
          return;
        }

        // 2) Stripe-Session prüfen (Fallback)
        log("[ERGEBNIS] DB-Load fehlgeschlagen oder kein Dokument – rufe Stripe-Session auf");
        const res = await fetch(`/api/session?session_id=${session_id}`);
        log("[ERGEBNIS] Stripe HTTP Status Code:", res.status);

        if (!res.ok) {
          warn("[ERGEBNIS] Stripe-Session nicht erreichbar. Kein DB-Dokument gefunden. Zeige Fehler an.");
          setErrorLoading("Es gab ein Problem beim Laden deiner Bewertung. Bitte öffne den Link später erneut oder schreibe uns an info@pferdewert.de – wir helfen sofort.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        log("[ERGEBNIS] Stripe API-Response:", { hasSession: !!data?.session, payment_status: data?.session?.payment_status, hasMetadata: !!data?.session?.metadata });

        if (data?.session?.payment_status !== "paid") {
          warn("[ERGEBNIS] Zahlung nicht erfolgt. Redirect nach /pferde-preis-berechnen");
          router.replace("/pferde-preis-berechnen");
          return;
        }

        setPaid(true);

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            event_category: "Bewertung",
            event_label: "PDF freigeschaltet",
            value: 1,
          });
        }

        const bewertungIdFromSession = data.session.metadata?.bewertungId;
        if (bewertungIdFromSession) {
          setBewertungId(bewertungIdFromSession);
          const resultRes = await fetch(`/api/bewertung?id=${bewertungIdFromSession}`);
          const resultData = await resultRes.json();

          if (resultData.bewertung) {
            setText(resultData.bewertung);
            setLoading(false);
          } else {
            // Polling mit identischem Schedule
            let index = 0;
            const pollForResult = () => {
              if (index >= POLLING_SCHEDULE_MS.length) {
                warn("[ERGEBNIS] Polling beendet – Bewertung nicht verfügbar");
                setLoading(false);
                return;
              }
              const delay = addJitter(POLLING_SCHEDULE_MS[index++]);
              log(`[ERGEBNIS] Wiederholungsversuch T${index}/${POLLING_SCHEDULE_MS.length} für ID: ${bewertungIdFromSession} (Delay: ${delay}ms)`);
              intervalRef.current = setTimeout(async () => {
                try {
                  const retryRes = await fetch(`/api/bewertung?id=${bewertungIdFromSession}`);
                  if (retryRes.ok) {
                    const retryData = await retryRes.json();
                    if (retryData.bewertung) {
                      setText(retryData.bewertung);
                      setLoading(false);
                      return;
                    }
                  }
                } catch (pollError) {
                  error("[ERGEBNIS] Fehler beim Polling:", pollError);
                }
                pollForResult();
              }, delay);
            };
            pollForResult();
          }
        } else {
          warn("[ERGEBNIS] Keine bewertungId in Session-Metadaten. Versuche erneut DB über session_id...");
          try {
            const fb2 = await fetch(`/api/bewertung-by-session?session_id=${session_id}`);
            let fbData2: BewertungBySessionResponse | null = null;
            try { fbData2 = await fb2.json(); } catch {}
            if (fbData2 && fbData2.id) {
              setBewertungId(fbData2.id);
              if (fbData2.bewertung) {
                setText(fbData2.bewertung);
                setLoading(false);
                return;
              }
              startPollingById(fbData2.id);
              return;
            }
          } catch {}
        }
      } catch (err) {
        error("[ERGEBNIS] Fehler beim Laden der Session:", err);
        setErrorLoading("Beim Laden der Bewertung ist ein Fehler aufgetreten. Bitte versuche es später erneut oder kontaktiere uns.");
        setLoading(false);
      }
    };

    fetchSession();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [router]);

  if (loading) return <StripeLoadingScreen estimatedTime="Geschätzte Wartezeit: 1-3 Minuten" />;
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
          <div className="mt-8">
            <PDFDownloadLink
              document={<PferdeWertPDF markdownData={text} />}
              fileName="PferdeWert-Analyse.pdf"
            >
              {({ loading }) => (
                <button
                  className="rounded-2xl bg-brand-brown px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-brown/80 transition"
                  onClick={() => {
                    if (!loading) {
                      trackPDFDownload(bewertungId || "unknown");
                    }
                  }}
                >
                  {loading ? "Lade PDF..." : "PDF herunterladen"}
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
