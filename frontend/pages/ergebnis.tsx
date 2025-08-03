import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import BewertungLayout from "@/components/BewertungLayout";
import dynamic from "next/dynamic";

// Dynamic import for ReactMarkdown - only loaded when needed
const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded"></div>,
});
import { log, warn, error } from "@/lib/log";
import Head from "next/head";
import Layout from "@/components/Layout"; // Footer via Layout integriert

// Dynamic imports for heavy PDF libraries - only loaded when needed
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
          } else {
            let tries = 0;
            intervalRef.current = setInterval(async () => {
              tries++;
              log(`[ERGEBNIS] Wiederholungsversuch ${tries} für Bewertung ID: ${bewertungId}`);
              const retryRes = await fetch(`/api/bewertung?id=${bewertungId}`);
              const retryData = await retryRes.json();

              if (retryData.bewertung) {
                clearInterval(intervalRef.current!);
                setText(retryData.bewertung);
              }

              if (tries >= 10) {
                clearInterval(intervalRef.current!);
                warn("[ERGEBNIS] Bewertung auch nach 10 Versuchen nicht verfügbar.");
              }
            }, 5000);
          }
        } else {
          warn("[ERGEBNIS] Keine bewertungId in Session-Metadaten gefunden.");
        }
      } catch (err) {
        error("[ERGEBNIS] Fehler beim Laden der Session:", err);
        setErrorLoading("Beim Laden der Bewertung ist ein Fehler aufgetreten. Bitte versuche es später erneut oder kontaktiere uns.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [router]);

  if (loading) return <p className="p-10 text-center">Lade Bewertung…</p>;
  if (errorLoading) return <p className="p-10 text-red-600 text-center">{errorLoading}</p>;
  if (!paid) return <p className="p-10 text-red-500 text-center">{fallbackMessage}</p>;

  return (
    <Layout>
    <Head>
  <meta name="robots" content="noindex, nofollow" />
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
              {({ loading }) => (
                <button className="btn-primary">
                  {loading ? "Lade PDF..." : "Als PDF herunterladen"}
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
