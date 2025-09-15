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

  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell. Bitte sende eine E-Mail an info@pferdewert.de, wir melden uns, sobald das Modell wieder verfügbar ist.";

  useEffect(() => {
    if (!router.isReady) return;

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
        log("[ERGEBNIS] Lade Session für ID:", session_id);

        const res = await fetch(`/api/session?session_id=${session_id}`);
        log("[ERGEBNIS] HTTP Status Code:", res.status);

        if (!res.ok) {
          warn("[ERGEBNIS] Session API nicht erreichbar oder Fehler. Versuche DB-Fallback über session_id...");
          // Fallback: direkt aus DB per session_id laden
          const fb = await fetch(`/api/bewertung-by-session?session_id=${session_id}`);
          if (fb.ok) {
            const fbData = await fb.json();
            setPaid(true);
            if (fbData?.id) setBewertungId(fbData.id);
            if (fbData?.bewertung && typeof fbData.bewertung === "string") {
              log("[ERGEBNIS] ✅ Bewertung via Fallback geladen");
              setText(fbData.bewertung);
              setLoading(false);
              return;
            } else {
              // Polling über ID, wenn vorhanden
              if (fbData?.id) {
                let tries = 0;
                const poll = async () => {
                  tries++;
                  const delay = Math.min(5000 + (tries - 1) * 2000, 15000);
                  intervalRef.current = setTimeout(async () => {
                    try {
                      const r = await fetch(`/api/bewertung?id=${fbData.id}`);
                      if (r.ok) {
                        const d = await r.json();
                        if (d?.bewertung) {
                          setText(d.bewertung);
                          setLoading(false);
                          return;
                        }
                      }
                    } catch {}
                    if (tries < 10) poll(); else setLoading(false);
                  }, delay);
                };
                poll();
                return;
              }
            }
          }

          setErrorLoading("Es gab ein Problem beim Laden deiner Bewertung. Bitte öffne den Link später erneut oder schreibe uns an info@pferdewert.de – wir helfen sofort.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        log("[ERGEBNIS] API-Response:", data);

        if (!data?.session?.payment_status) {
          warn("[ERGEBNIS] Session geladen, aber payment_status fehlt – versuche DB-Fallback.");
          const fb = await fetch(`/api/bewertung-by-session?session_id=${session_id}`);
          if (fb.ok) {
            const fbData = await fb.json();
            setPaid(true);
            if (fbData?.id) setBewertungId(fbData.id);
            if (fbData?.bewertung) {
              setText(fbData.bewertung);
              setLoading(false);
              return;
            }
          }
        }

        if (data.session.payment_status !== "paid") {
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
            let tries = 0;
            const pollForResult = () => {
              tries++;
              const delay = Math.min(5000 + (tries - 1) * 2000, 15000); // Progressive delay: 5s, 7s, 9s, ... max 15s

              log(`[ERGEBNIS] Wiederholungsversuch ${tries} für Bewertung ID: ${bewertungIdFromSession} (Delay: ${delay}ms)`);

              intervalRef.current = setTimeout(async () => {
                try {
                  const retryRes = await fetch(`/api/bewertung?id=${bewertungIdFromSession}`);
                  const retryData = await retryRes.json();

                  if (retryData.bewertung) {
                    setText(retryData.bewertung);
                    setLoading(false);
                  } else if (tries < 10) {
                    pollForResult();
                  } else {
                    warn("[ERGEBNIS] Bewertung auch nach 10 Versuchen nicht verfügbar.");
                    setLoading(false);
                  }
                } catch (pollError) {
                  error("[ERGEBNIS] Fehler beim Polling:", pollError);
                  if (tries < 10) {
                    pollForResult();
                  } else {
                    setLoading(false);
                  }
                }
              }, delay);
            };

            pollForResult();
          }
        } else {
          warn("[ERGEBNIS] Keine bewertungId in Session-Metadaten gefunden. Versuche Fallback über session_id...");
          const fb = await fetch(`/api/bewertung-by-session?session_id=${session_id}`);
          if (fb.ok) {
            const fbData = await fb.json();
            if (fbData?.id) setBewertungId(fbData.id);
            if (fbData?.bewertung) {
              setText(fbData.bewertung);
              setLoading(false);
            }
          }
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
                  className="rounded-2xl bg-brand-green px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-green/80 transition"
                  onClick={() => {
                    if (!loading) {
                      trackPDFDownload(bewertungId || "unknown");
                    }
                  }}
                >
                  {loading ? "Lade PDF..." : "🧞 PDF herunterladen"}
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
