// lib/generateBewertung.ts
export async function generateBewertung(daten: any): Promise<string> {
  // Hier später echten OpenAI-Aufruf einbauen – aktuell nur Dummy
  // Du kannst die daten z. B. ausgeben zur Prüfung
  console.log("Eingabedaten für KI:", daten);

  // Beispiel-Antwort
  return `🏇 Bewertung für "${daten.name || "Unbekanntes Pferd"}":
- Alter: ${daten.alter || "nicht angegeben"}
- Rasse: ${daten.rasse || "unbekannt"}
- Geschlecht: ${daten.geschlecht || "nicht definiert"}

🧠 Einschätzung:
Dieses Pferd zeigt solide Merkmale und könnte auf dem Markt gut positioniert sein.`;
}
