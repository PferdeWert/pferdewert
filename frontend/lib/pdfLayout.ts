// lib/pdfLayout.ts
import { jsPDF } from "jspdf";

export function generateBewertungsPDF(text: string): jsPDF {
  const pdf = new jsPDF();
  const heute = new Date().toLocaleDateString("de-DE");

  // Header
  const headerText = `Erstellt am ${heute}\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse\nwww.pferdewert.de`;

  // Vorverarbeitung: schmale Leerzeichen & Fettschreibung in __ fett __ umwandeln
  const cleanedText = text
    .replace(/\u202f/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "__$1__");

  // Blöcke anhand von Leerzeilen trennen
  const blocks = cleanedText.split(/\n{2,}/);

  // Grund­einstellungen
  pdf.setFont("times", "normal");
  pdf.setFontSize(12);
  pdf.setLineHeightFactor(1.5);

  // Titel & Header
  pdf.setFontSize(14);
  pdf.text("Pferdebewertung", 105, 20, { align: "center" });
  pdf.setFontSize(12);
  pdf.text(headerText, 10, 30);

  let y = 50;

  // Hilfsfunktion: Text umbrechen & zeichnen
  function drawWrapped(text: string, options?: { bold?: boolean; bullet?: boolean }) {
    const indent = options?.bullet ? 15 : 10;
    const prefix = options?.bullet ? "• " : "";

    const wrapped = pdf.splitTextToSize(prefix + text, 180 - (indent - 10));
    for (const line of wrapped) {
      pdf.setFont("times", options?.bold ? "bold" : "normal");
      pdf.text(line, indent, y);
      y += 7;
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    }
  }

  for (const block of blocks) {
    // ### Überschriften
    if (block.startsWith("### ")) {
      const head = block.replace("### ", "").trim();
      pdf.setFont("times", "bold");
      pdf.setFontSize(13);
      pdf.text(head, 10, y);
      y += 10;
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);
      continue;
    }

    // Aufzählungen "- "
    if (block.startsWith("- ")) {
      const items = block.split("- ").filter(Boolean);
      for (const item of items) {
        const plain = item.replace(/__([^_]+?)__/g, "$1").trim();
        drawWrapped(plain, { bullet: true });
      }
      y += 3;
      continue;
    }

    // Label-Wert Zeilen  __Label__: value
    const labelMatch = block.match(/^__(.+?)__:\s*(.+)/);
    if (labelMatch) {
      pdf.setFont("times", "bold");
      pdf.text(`${labelMatch[1]}:`, 10, y);
      pdf.setFont("times", "normal");
      const value = labelMatch[2];
      const wrapped = pdf.splitTextToSize(value, 140);
      pdf.text(wrapped, 50, y);
      y += wrapped.length * 7 + 3;
      continue;
    }

    // Normaler Absatz (evtl. mit Rest-__ fett __)
    const plainPara = block.replace(/__/g, "");
    drawWrapped(plainPara);
    y += 3;
  }

  return pdf;
}
