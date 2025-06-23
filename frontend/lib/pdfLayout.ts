// lib/pdfLayout.ts
import { jsPDF } from "jspdf";

export function generateBewertungsPDF(text: string): jsPDF {
  const pdf = new jsPDF();
  const heute = new Date().toLocaleDateString("de-DE");

  const headerText = `Erstellt am ${heute}\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse\nwww.pferdewert.de`;

  const parsed = text
    .replace(/^### (.*$)/gim, "\n\n$1\n" + "=".repeat(30) + "\n")
    .replace(/^## (.*$)/gim, "\n\n$1\n" + "-".repeat(30) + "\n")
    .replace(/\*\*(.*?)\*\*/gim, "$1:")
    .replace(/\n{2,}/g, "\n\n");

  const lines = pdf.splitTextToSize(parsed, 180);

  pdf.setFont("times", "normal");
  pdf.setFontSize(12);
  pdf.setLineHeightFactor(1.5);
  pdf.text("Pferdebewertung", 105, 20, { align: "center" });
  pdf.text(headerText, 10, 30);
  pdf.text(lines, 10, 50);

  return pdf;
}
