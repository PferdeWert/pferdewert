// lib/pdfLayout.ts
import { jsPDF } from "jspdf";

export function generateBewertungsPDF(text: string): jsPDF {
  const pdf = new jsPDF();
  const heute = new Date().toLocaleDateString("de-DE");

  const headerText = `Erstellt am ${heute}\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse\nwww.pferdewert.de`;

  const lines: string[] = [];
  const blocks = text.replace(/\*\*(.*?)\*\*/g, "__$1__").split(/\n{2,}/);

  pdf.setFont("times", "normal");
  pdf.setFontSize(12);
  pdf.setLineHeightFactor(1.5);

  // Titel
  pdf.setFontSize(14);
  pdf.text("Pferdebewertung", 105, 20, { align: "center" });
  pdf.setFontSize(12);
  pdf.text(headerText, 10, 30);

  let y = 50;
  for (const block of blocks) {
    if (block.startsWith("### ")) {
      const headline = block.replace("### ", "").trim();
      pdf.setFont("times", "bold");
      pdf.setFontSize(13);
      pdf.text(headline, 10, y);
      y += 8;
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);
    } else if (/^__(.+?)__:\s*(.+)/.test(block)) {
      const match = block.match(/^__(.+?)__:\s*(.+)/);
      if (match) {
        pdf.setFont("times", "bold");
        pdf.text(`${match[1]}:`, 10, y);
        pdf.setFont("times", "normal");
        pdf.text(match[2], 50, y);
        y += 8;
      }
    } else if (block.startsWith("- ")) {
      const items = block.split("- ").filter(Boolean);
      for (const item of items) {
        const parsed = item.replace(/__([^_]+?)__/g, "$1:").trim();
        const wrapped = pdf.splitTextToSize("• " + parsed, 180);
        pdf.text(wrapped, 10, y);
        y += wrapped.length * 7;
      }
    } else {
      const lineBlocks = block.split(/(__[^_]+__)/);
      let x = 10;
      for (const part of lineBlocks) {
        if (!part) continue;
        const clean = part.replace(/__/g, "");
        const width = pdf.getTextWidth(clean);
        if (part.startsWith("__") && part.endsWith("__")) {
          pdf.setFont("times", "bold");
        } else {
          pdf.setFont("times", "normal");
        }
        pdf.text(clean, x, y);
        x += width;
      }
      y += 7;
    }

    if (y > 270) {
      pdf.addPage();
      y = 20;
    } else {
      y += 5;
    }
  }

  return pdf;
}
