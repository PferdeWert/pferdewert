// pages/ergebnis.tsx

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { generateBewertungsPDF } from "@/lib/pdfLayout";
import ReactMarkdown from "react-markdown";
import BewertungLayout from "@/components/BewertungLayout";
import { log, warn, error } from "@/lib/log";

export default function Ergebnis() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

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

        const bewertungId = data.session.metadata?.bewertungId;
        if (bewertungId) {
          const resultRes = await fetch(`/api/bewertung?id=${bewertungId}`);
          const resultData = await resultRes.json();
          setText(resultData.bewertung || "");
        } else {
          warn("[ERGEBNIS] Keine bewertungId in Session-Metadaten gefunden.");
        }
      } catch (err) {
        error("[ERGEBNIS] Fehler beim Laden der Session:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router.isReady, router.query.session_id]);

  const handleDownloadPDF = () => {
    const pdf = generateBewertungsPDF(text);
    pdf.save("pferdebewertung.pdf");
  };

  if (loading) return <p className="p-10">Lade Bewertung…</p>;
  if (!paid) return <p className="p-10 text-red-500">{fallbackMessage}</p>;

  return (
    <BewertungLayout title="PferdeWert – Ergebnis">
      <div className="prose prose-lg max-w-full">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="mt-8 rounded-2xl bg-brand-green px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-green/80 transition"
      >
        🧞 PDF herunterladen
      </button>
    </BewertungLayout>
  );
}