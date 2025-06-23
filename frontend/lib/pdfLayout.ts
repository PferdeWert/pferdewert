// lib/pdfLayout.ts
import { jsPDF } from "jspdf";

export function generateBewertungsPDF(text: string): jsPDF {
  const pdf = new jsPDF();
  const heute = new Date().toLocaleDateString("de-DE");

  const headerText = `Erstellt am ${heute}\nBereitgestellt durch PferdeWert.de – KI-gestützte Pferdeanalyse`;

  const cleanedText = text
    .replace(/\u202f/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "__$1__");

  const blocks = cleanedText.split(/\n{2,}/);

  pdf.setFont("times", "normal");
  pdf.setFontSize(12);
  pdf.setLineHeightFactor(1.5);

  // Titel & Header
  pdf.setFont("times", "bold");
  pdf.setFontSize(14);
  pdf.text("Pferdebewertung", 105, 20, { align: "center" });
  pdf.setFont("times", "normal");
  pdf.setFontSize(12);
  pdf.text(headerText, 10, 30);

  let y = 50;
  let isFirstSection = true;
  const usedPages = new Set<number>();
  usedPages.add(1);

  function drawWrapped(text: string, opts?: { bold?: boolean; bullet?: boolean }) {
    const indent = opts?.bullet ? 15 : 10;
    const prefix = opts?.bullet ? "• " : "";
    const wrapWidth = 180 - (indent - 10);

    for (const line of pdf.splitTextToSize(prefix + text, wrapWidth)) {
      pdf.setFont("times", opts?.bold ? "bold" : "normal");
      pdf.text(line, indent, y);
      y += 7;
      usedPages.add(pdf.getCurrentPageInfo().pageNumber);
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    }
  }

  for (const block of blocks) {
    if (block.startsWith("### ")) {
      y += isFirstSection ? 3 : 5;
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
      const head = block.replace("### ", "").trim();
      pdf.setFont("times", "bold");
      pdf.setFontSize(13);
      pdf.text(head, 10, y);
      y += 10;
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);
      isFirstSection = false;
      usedPages.add(pdf.getCurrentPageInfo().pageNumber);
      continue;
    }

    if (block.startsWith("- ")) {
      for (const item of block.split("- ").filter(Boolean)) {
        drawWrapped(item.replace(/__([^_]+?)__/g, "$1").trim(), { bullet: true });
      }
      y += 3;
      continue;
    }

    const labelMatch = block.match(/^__(.+?)__:\s*(.+)/);
    if (labelMatch) {
      pdf.setFont("times", "bold");
      pdf.text(`${labelMatch[1]}:`, 10, y);
      pdf.setFont("times", "normal");
      for (const line of pdf.splitTextToSize(labelMatch[2], 140)) {
        pdf.text(line, 50, y);
        y += 7;
        usedPages.add(pdf.getCurrentPageInfo().pageNumber);
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
      }
      y += 3;
      continue;
    }

    drawWrapped(block.replace(/__/g, ""));
    y += 3;
  }

  const totalPages = pdf.getNumberOfPages();

  // Leere letzte Seite entfernen
  if (!usedPages.has(totalPages) && totalPages > 1) {
    pdf.deletePage(totalPages);
  }

  const finalPageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= finalPageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.text(`${i} / ${finalPageCount}`, 200, 290, { align: "right" });
  }

  return pdf;
}
