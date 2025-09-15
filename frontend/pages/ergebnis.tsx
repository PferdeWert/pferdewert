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

  const fallbackMessage =
    "Wir arbeiten gerade an unserem KI-Modell. Bitte sende eine E-Mail an info@pferdewert.de, wir melden uns, sobald das Modell wieder verfügbar ist.";

  useEffect(() => {
    if (!router.isReady) return;

    const session_id = router.query.session_id;
    if (!session_id || typeof session_id !== "string") {
      router.replace("/pferde-preis-berechnen");
      return;
    }

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

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            event_category: "Bewertung",
            event_label: "PDF freigeschaltet",
            value: 1,
          });
        }

        const bewertungId = data.session.metadata?.bewertungId;
        if (bewertungId) {
          const resultRes = await fetch(`/api/bewertung?id=${bewertungId}`);
          const resultData = await resultRes.json();

          if (resultData.bewertung) {
            setText(resultData.bewertung);
            setLoading(false);
          } else {
            let tries = 0;
            const pollForResult = () => {
              tries++;
              const delay = Math.min(5000 + (tries - 1) * 2000, 15000); // Progressive delay: 5s, 7s, 9s, ... max 15s

              log(`[ERGEBNIS] Wiederholungsversuch ${tries} für Bewertung ID: ${bewertungId} (Delay: ${delay}ms)`);

              intervalRef.current = setTimeout(async () => {
                try {
                  const retryRes = await fetch(`/api/bewertung?id=${bewertungId}`);
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
          warn("[ERGEBNIS] Keine bewertungId in Session-Metadaten gefunden.");
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
                      const bewertungId = router.query.session_id as string;
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
