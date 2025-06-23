// lib/pdfLayout.ts
import { jsPDF } from "jspdf";

export function generateBewertungsPDF(text: string): jsPDF {
  const pdf = new jsPDF();
  const heute = new Date().toLocaleDateString("de-DE");

  const headerText = `Erstellt am ${heute}\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse\nwww.pferdewert.de`;

  const cleanedText = text
    .replace(/\u202f/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "__$1__");

  const blocks = cleanedText.split(/\n{2,}/);

  pdf.setFont("times", "normal");
  pdf.setFontSize(12);
  pdf.setLineHeightFactor(1.5);

  pdf.setFontSize(14);
  pdf.text("Pferdebewertung", 105, 20, { align: "center" });
  pdf.setFontSize(12);
  pdf.text(headerText, 10, 30);

  let y = 50;

  function drawWrappedLine(line: string, isBold: boolean) {
    const wrapped = pdf.splitTextToSize(line, 180);
    for (const l of wrapped) {
      pdf.setFont("times", isBold ? "bold" : "normal");
      pdf.text(l, 10, y);
      y += 7;
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    }
  }

  for (const block of blocks) {
    if (block.startsWith("### ")) {
      const headline = block.replace("### ", "").trim();
      pdf.setFont("times", "bold");
      pdf.setFontSize(13);
      pdf.text(headline, 10, y);
      y += 10;
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);
      continue;
    }

    if (block.startsWith("- ")) {
      const items = block.split("- ").filter(Boolean);
      for (const item of items) {
        const parsed = item.replace(/__([^_]+?)__/g, "$1:").trim();
        drawWrappedLine("• " + parsed, false);
      }
      y += 3;
      continue;
    }

    const match = block.match(/^__(.+?)__:\s*(.+)/);
    if (match) {
      pdf.setFont("times", "bold");
      pdf.text(`${match[1]}:`, 10, y);
      pdf.setFont("times", "normal");
      drawWrappedLine(match[2], false);
      y += 3;
      continue;
    }

    // Absatz mit oder ohne Fettstellen
    const segments = block.split(/(__[^_]+__)/);
    let line = "";
    for (const seg of segments) {
      const isBold = seg.startsWith("__") && seg.endsWith("__");
      const clean = seg.replace(/__/g, "");
      const words = clean.split(" ");
      for (const word of words) {
        const testLine = line + word + " ";
        if (pdf.getTextWidth(testLine) > 180) {
          pdf.setFont("times", isBold ? "bold" : "normal");
          pdf.text(line.trim(), 10, y);
          y += 7;
          line = word + " ";
        } else {
          line = testLine;
        }
      }
      if (line) {
        pdf.setFont("times", isBold ? "bold" : "normal");
        pdf.text(line.trim(), 10, y);
        y += 7;
        line = "";
      }
    }
    y += 3;
  }

  return pdf;
}
