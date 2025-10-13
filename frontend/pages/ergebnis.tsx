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
import { PRICING } from "@/lib/pricing";



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

    // Optimized polling schedule with jitter, covering up to ~2 minutes
    // Reduces wait time from ~31s to ~15s with only 3 requests in first 30s
    const POLLING_SCHEDULE_MS = [
      8000, 15000, 25000, 40000, 60000, 80000, 100000, 120000,
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

        // DataFa.st revenue tracking
        if (typeof window !== "undefined" && window.datafast) {
          window.datafast("payment", {
            amount: PRICING.current,
            currency: "EUR",
            transaction_id: session_id,
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

  if (loading) return <StripeLoadingScreen estimatedTime="Geschätzte Wartezeit: 1-2 Minuten" />;
  if (errorLoading) return <p className="p-10 text-red-600 text-center">{errorLoading}</p>;
  if (!paid) return <p className="p-10 text-red-500 text-center">{fallbackMessage}</p>;

  return (
    <Layout>
    <Head>
      <title>Professionelle Pferdebewertung - Ihr Ergebnis | PferdeWert.de</title>
      <meta name="description" content="Ihre detaillierte KI-basierte Pferdebewertung ist fertig. Professioneller Bewertungsbericht mit Marktwertanalyse zum sofortigen Download als PDF." />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://www.pferdewert.de/ergebnis" />

      {/* Structured Data for Analysis Report */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Report",
            "name": "Professionelle Pferdebewertung",
            "description": "KI-basierte Marktwertanalyse für Pferde mit detailliertem Bewertungsbericht",
            "author": {
              "@type": "Organization",
              "name": "PferdeWert.de",
              "url": "https://pferdewert.de"
            },
            "publisher": {
              "@type": "Organization",
              "name": "PferdeWert.de",
              "logo": {
                "@type": "ImageObject",
                "url": "https://pferdewert.de/images/logo.webp"
              }
            },
            "dateCreated": new Date().toISOString(),
            "about": {
              "@type": "Service",
              "name": "Pferdebewertung",
              "serviceType": "Marktwertanalyse"
            }
          })
        }}
      />
    </Head>

    <BewertungLayout title="PferdeWert – Ergebnis der Pferdebewertung">
      {text ? (
        <>
          {/* Trust Indicators Section */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <h3 className="text-sm font-semibold text-green-800">Analyse abgeschlossen</h3>
            </div>
            <p className="text-sm text-green-700">
              Ihre professionelle Pferdebewertung wurde erfolgreich erstellt.
              Der Bericht basiert auf KI-Analyse von über 10.000 Pferdedaten und aktuellen Markttrends.
            </p>
          </div>

          {/* Main Content */}
          <article className="prose prose-lg max-w-full">
            <ReactMarkdown>{text}</ReactMarkdown>
          </article>

          {/* Methodology & Trust Section */}
          <div className="mt-8 mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Über diese Bewertung</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p><strong>Methodik:</strong> KI-basierte Analyse mit Dual-AI-System (GPT & Claude)</p>
              <p><strong>Datengrundlage:</strong> Über 10.000 Pferdedaten und aktuelle Marktpreise</p>
              <p><strong>Aktualisierung:</strong> Bewertungsmodell wird monatlich aktualisiert</p>
              <p><strong>Verwendung:</strong> Orientierungswert für Kauf, Verkauf und Versicherung</p>
            </div>
          </div>

          {/* Download Section */}
          <div className="mt-8 text-center">
            <PDFDownloadLink
              document={<PferdeWertPDF markdownData={text} />}
              fileName="PferdeWert-Analyse.pdf"
            >
              {({ loading }) => (
                <button
                  className="rounded-2xl bg-brand-brown px-8 py-4 font-bold text-white shadow-soft hover:bg-brand-brown/80 transition"
                  onClick={() => {
                    if (!loading) {
                      trackPDFDownload(bewertungId || "unknown");
                    }
                  }}
                >
                  {loading ? "Lade PDF..." : "📄 Vollständige Analyse als PDF herunterladen"}
                </button>
              )}
            </PDFDownloadLink>
            <p className="mt-3 text-sm text-gray-600">
              Professioneller Bewertungsbericht zum Archivieren und Weiterleiten
            </p>
          </div>

          {/* Next Steps Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nächste Schritte</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Für Verkäufer:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Bewertung bei Inseraten angeben</li>
                  <li>PDF an interessierte Käufer senden</li>
                  <li>Preisverhandlungen professionell führen</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Für Käufer:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Faire Preisverhandlung ermöglichen</li>
                  <li>Marktwert als Orientierung nutzen</li>
                  <li>Versicherungswert bestimmen</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-brand-brown rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ihre Pferdebewertung wird erstellt</h3>
          <p className="text-gray-600 mb-4">
            Unsere KI analysiert gerade die Daten Ihres Pferdes und erstellt einen detaillierten Bewertungsbericht.
          </p>
          <div className="text-sm text-gray-500">
            <p>✓ Zahlung erfolgreich verarbeitet</p>
            <p>⏳ Analyse läuft (geschätzte Dauer: 1-2 Minuten)</p>
            <p>📧 Bei Fragen: info@pferdewert.de</p>
          </div>
        </div>
      )}
    </BewertungLayout>
  </Layout>
);}
