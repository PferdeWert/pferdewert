import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";
import PferdeWertPDF from "@/components/PferdeWertPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { log, warn, error } from "@/lib/log";

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
      router.replace("/bewerten");
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
          warn("[ERGEBNIS] Zahlung nicht erfolgt. Redirect nach /bewerten");
          router.replace("/bewerten");
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
    <BewertungLayout title="PferdeWert – Ergebnis">
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
                <button className="rounded-2xl bg-brand-green px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-green/80 transition">
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
  );
}
