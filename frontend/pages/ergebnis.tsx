// pages/ergebnis.tsx

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
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
        error("[ERGEBNIS] Fehler beim Laden der Session oder Bewertung:", err);
        setText("");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      error("Fehler beim Kopieren", err);
    }
  };

 const handleDownloadPDF = () => {
  const pdf = new jsPDF();
  const heute = new Date().toLocaleDateString("de-DE");

  const headerText = `Erstellt am ${heute}\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse\nwww.pferdewert.de`;
  const rawBody = text || fallbackMessage;

  const body = rawBody
    .replace(/^### (.*$)/gim, "\n\n$1\n" + "=".repeat(30) + "\n")
    .replace(/^## (.*$)/gim, "\n\n$1\n" + "-".repeat(30) + "\n")
    .replace(/\*\*(.*?)\*\*/gim, "$1:")
    .replace(/\n{2,}/g, "\n\n");

  const lines = pdf.splitTextToSize(body, 180);
  pdf.setFont("times", "normal");
  pdf.setFontSize(12);
  pdf.setLineHeightFactor(1.6);
  pdf.text("Pferdebewertung", 105, 20, { align: "center" });
  pdf.text(headerText, 10, 30);
  pdf.text(lines, 10, 50);
  pdf.save("test.pdf");
};




  return (
    <>
      <Head>
        <title>PferdeWert – Ergebnis</title>
      </Head>

      <BewertungLayout title="Deine Pferdebewertung">
        {loading ? (
          <div className="py-20 text-center text-gray-500">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium">Lade deine Bewertung…</p>
          </div>
        ) : (
          <>
            {paid && (
              <p className="text-green-600 text-center text-lg font-semibold mb-6">
                ✅ Bezahlung erfolgreich – deine Analyse ist jetzt bereit.
              </p>
            )}

            {text ? (
              <>
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleCopy}
                    className="flex-1 rounded-2xl bg-brand-accent px-6 py-3 font-bold text-white shadow-soft hover:bg-brand transition"
                  >📋 Ergebnis kopieren</button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex-1 rounded-2xl bg-brand-green px-6 py-3 font-bold text-white shadow-soft hover:bg-brand-green/80 transition"
                  >🧞 PDF herunterladen</button>
                </div>

                {copied && (
                  <p className="mt-3 text-center text-brand-green font-semibold">
                    ✔️ In Zwischenablage kopiert!
                  </p>
                )}
              </>
            ) : (
              <p className="text-brand-accent text-center mt-10">{fallbackMessage}</p>
            )}
          </>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/bewerten"
            className="inline-block text-brand-accent underline underline-offset-4 hover:text-brand font-medium"
          >➕ Noch ein Pferd bewerten</Link>
        </div>
      </BewertungLayout>
    </>
  );
}
