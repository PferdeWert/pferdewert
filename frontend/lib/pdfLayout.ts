// lib/pdfLayout.ts
import { jsPDF } from "jspdf";

export function generateBewertungsPDF(text: string): jsPDF {
  const pdf = new jsPDF();
  const heute = new Date().toLocaleDateString("de-DE");

  const headerText = `Erstellt am ${heute}\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse\nwww.pferdewert.de`;

  const lines: string[] = [];
  const blocks = text.split(/\n{2,}/);

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
    } else if (/^\*\*(.+?)\*\*:/.test(block)) {
      const match = block.match(/^\*\*(.+?)\*\*: (.+)/);
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
        const parsed = item.replace(/^\*\*(.+?)\*\*/, "$1:").trim();
        const wrapped = pdf.splitTextToSize("• " + parsed, 180);
        pdf.text(wrapped, 10, y);
        y += wrapped.length * 7;
      }
    } else {
      const wrapped = pdf.splitTextToSize(block, 180);
      pdf.text(wrapped, 10, y);
      y += wrapped.length * 7;
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
