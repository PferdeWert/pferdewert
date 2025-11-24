#!/usr/bin/env python3
"""
Model Comparison with LIVE System Prompt
Vergleicht verschiedene KI-Modelle mit dem aktuellen Production-Prompt
"""

import os
import sys
import json
from pathlib import Path
from datetime import datetime

# Load .env
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent.parent / '.env'
    load_dotenv(env_path)
except ImportError:
    pass

sys.path.insert(0, str(Path(__file__).parent))

from ai_clients.openrouter_client import OpenRouterClient

# LIVE System Prompt (aus Production)
LIVE_SYSTEM_PROMPT = """Du bist **PferdeWert AI**, eine hochspezialisierte Expert:innen-KI für Markt- und Preisbewertungen von Freizeit-, Sport- und Zuchtpferden.

**DEINE AUFGABE:** Erstelle eine umfassende, professionelle Marktwertanalyse basierend auf den bereitgestellten Pferdedaten.

**AUSGABEFORMAT:**

### Zusammenfassung

**Geschätzter Marktwert: [X.XXX - X.XXX] €**

[Objektive Einschätzung des Pferdes in 2-3 Sätzen - neutral und sachlich]

### Marktwertanalyse

**Detaillierte Preisspannen-Erklärung:**

**Untere Preisgrenze ([niedrigerer Wert] €):** [Begründung der konservativen Schätzung - welche Faktoren rechtfertigen den Mindestpreis]

**Obere Preisgrenze ([höherer Wert] €):** [Begründung der optimistischen Schätzung - welche Faktoren rechtfertigen den Maximalpreis]

**Zielpreis ([mittlerer Bereich] €):** [Realistischer Verkaufspreis bei optimaler Vermarktung und entsprechender Zielgruppe]

### Preisfaktoren im Detail

**Aufschlüsselung der wertbestimmenden Eigenschaften:**

- Rasse: [Bewertung mit konkreten Auswirkungen auf den Preis]
- Abstammung: [Detaillierte Bewertung mit konkreten Auswirkungen auf den Preis. Wenn Hintergrundinformationen zu den Eltern / Großeltern bekannt dann ausführliches Porträt inkl. Erfolge und was über die Nachkommen bekannt ist.]
- Alter & Entwicklungsstand: [Einschätzung mit Hinweis auf optimales Verkaufsalter für die jeweilige Disziplin]
- Ausbildungsstand: [Bewertung mit konkreter Preisauswirkung. Hinweis auf weiteres Ausbildungspotenzial]
- Gesundheit: [Bewertung basierend auf AKU-Angaben oder deren Fehlen]
- Erfolge & Leistungsnachweis: [Quantifizierung der Wertsteigerung durch Turniererfolge]
- Besondere Eigenschaften: [Charakter, Rittigkeit, besondere Talente oder Einschränkungen]
- Regionale Faktoren: [Falls Standort angegeben: Hinweise zu regionalen Preisunterschieden]

### Verkaufsempfehlungen

**Wertsteigerungspotenzial:**

- [Konkrete Maßnahmen zur Wertsteigerung: weiteres Training, Erfolge sammeln, Gesundheitsnachweise]
- [Vermarktungsempfehlungen: beste Verkaufskanäle für diesen Pferdetyp]
- [Vorbereitung für Verkauf: wichtige Unterlagen, Präsentation, Probereiten]

### Kaufberatung

**Wichtige Kaufaspekte:**

- [Worauf beim Probereiten und der Besichtigung zu achten ist]
- [Interpretation der Preisspanne: Wann ist das obere/untere Ende der Spanne gerechtfertig]
- [Einschätzung des Preis-Leistungs-Verhältnisses]

### Fazit

Kurze Zusammenfassung des Wertpotenzials. Hinweis, dass der Wert ein Orientierungswert ist.

**Am Ende** diesen Satz:

„Ergebnis erstellt durch die PferdeWert-KI – keine rechtsverbindliche Bewertung."

**WICHTIGE PRINZIPIEN:**

- Preise in Euro, realistisch für lokalen Markt
- Länderkontext: Berücksichtige das Land des Pferdes.
- Preise marktgerecht für den lokalen Markt: Orientiere dich primär an aktuellen Verkaufsdaten, Auktionsergebnissen und realen Handelswerten (FN-Erfolgsdaten, DSP- und Hannoveraner-Auktionen, Gestüt Marbach, KWPN, USEF etc.)
- Begründe alle Einschätzungen sachlich und nachvollziehbar
- Informativ und hilfreich formulieren
- Bei unvollständigen Angaben: Realistische Schätzung basierend auf verfügbaren Daten
- Konkrete, umsetzbare Empfehlungen statt allgemeine Phrasen
- KEINE HALLUZINATIONEN: Verwende AUSSCHLIESSLICH die bereitgestellten Daten
- NIEMALS Datenprobleme erwähnen: Arbeite nur mit den vorhandenen Daten
- Professionelle Darstellung: Die Bewertung muss vollständig und selbstsicher wirken
- Deine Response wird direkt als Gutachten an den Kunden gesendet, beginne also auf keinen Fall mit sowas wie "Absolut. Hier die...". Beginne deine Response direkt mit dem Abschnitt "Zusammenfassung"."""

# Blossi beim Kauf
BLOSSI_DATA = {
    "rasse": "Deutsches Sportpferd",
    "alter": 4,
    "geschlecht": "Stute",
    "abstammung": "Bernay x London Swing",
    "stockmass": 170,
    "ausbildung": "angeritten",
    "haupteignung": "Dressur",
    "standort": "70619",
    "aku": "AKU ohne Befund",
    "erfolge": "Stutenleistungsprüfung 7,4",
    "charakter": "Brav und rittig",
    "besonderheiten": "verladefromm, schmiedefromm, unerschrocken"
}

# Modelle zum Vergleichen
MODELS = {
    "gemini-2.5-pro": "google/gemini-2.5-pro",
    "gemini-3-pro": "google/gemini-3-pro-preview",
    "sonnet-4": "anthropic/claude-sonnet-4",
    "sonnet-4.5": "anthropic/claude-sonnet-4.5",
}

def build_user_prompt(horse_data):
    """Build user prompt from horse data"""
    prompt_parts = [
        f"Rasse: {horse_data.get('rasse', 'k. A.')}",
        f"Alter: {horse_data.get('alter', 'k. A.')}",
        f"Geschlecht: {horse_data.get('geschlecht', 'k. A.')}",
        f"Abstammung: {horse_data.get('abstammung') or 'k. A.'}",
        f"Stockmaß: {horse_data.get('stockmass', 'k. A.')} cm",
        f"Ausbildungsstand: {horse_data.get('ausbildung', 'k. A.')}",
        f"Haupteignung / Disziplin: {horse_data.get('haupteignung') or 'k. A.'}",
        f"Aktueller Standort (PLZ): {horse_data.get('standort') or 'k. A.'}",
        f"Gesundheitsstatus / AKU-Bericht: {horse_data.get('aku') or 'k. A.'}",
        f"Erfolge: {horse_data.get('erfolge') or 'k. A.'}"
    ]

    if horse_data.get('charakter'):
        prompt_parts.append(f"Charakter & Rittigkeit: {horse_data['charakter']}")
    if horse_data.get('besonderheiten'):
        prompt_parts.append(f"Besonderheiten: {horse_data['besonderheiten']}")

    return "\n".join(prompt_parts)

def test_models():
    """Test all models with Blossi data"""

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print("❌ OPENROUTER_API_KEY nicht gesetzt!")
        return

    print(f"\n{'='*80}")
    print("🐴 MODELL-VERGLEICH: Blossi beim Kauf (LIVE Prompt)")
    print(f"{'='*80}")

    user_prompt = build_user_prompt(BLOSSI_DATA)
    print(f"\n📋 Pferdedaten:\n{user_prompt}")
    print(f"\n{'='*80}\n")

    client = OpenRouterClient()
    messages = [
        {"role": "system", "content": LIVE_SYSTEM_PROMPT},
        {"role": "user", "content": user_prompt}
    ]

    results = {}

    # Welche Modelle testen?
    models_to_test = sys.argv[1:] if len(sys.argv) > 1 else list(MODELS.keys())

    for name in models_to_test:
        if name not in MODELS:
            print(f"⚠️  Unbekanntes Modell: {name}")
            continue

        model_id = MODELS[name]
        print(f"\n🔄 Teste {name} ({model_id})...")

        try:
            response = client.create_completion(
                model=model_id,
                messages=messages,
                max_tokens=10000,
                temperature=0.3,
                top_p=0.8
            )

            results[name] = {
                "content": response.content,
                "usage": response.usage,
                "success": True
            }
            print(f"✅ {name} fertig ({response.usage.get('completion_tokens', '?')} tokens)")

        except Exception as e:
            results[name] = {"error": str(e), "success": False}
            print(f"❌ {name}: {e}")

    # Ergebnisse ausgeben
    print(f"\n{'='*80}")
    print("📝 VOLLSTÄNDIGE BEWERTUNGEN")
    print(f"{'='*80}")

    for name, result in results.items():
        print(f"\n{'─'*80}")
        print(f"🤖 {name.upper()}")
        print(f"{'─'*80}\n")

        if result['success']:
            print(result['content'])
            if result.get('usage'):
                u = result['usage']
                print(f"\n📊 Tokens: Input={u.get('prompt_tokens', '?')}, Output={u.get('completion_tokens', '?')}")
        else:
            print(f"❌ Fehler: {result['error']}")

    # Speichern
    output_dir = Path(__file__).parent / "model_comparisons"
    output_dir.mkdir(exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = output_dir / f"live_prompt_comparison_{timestamp}.json"

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump({
            "timestamp": timestamp,
            "prompt": "LIVE_SYSTEM_PROMPT",
            "horse_data": BLOSSI_DATA,
            "results": results
        }, f, indent=2, ensure_ascii=False)

    print(f"\n💾 Gespeichert: {output_file}")

if __name__ == "__main__":
    test_models()
