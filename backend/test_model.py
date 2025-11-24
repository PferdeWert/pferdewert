#!/usr/bin/env python3
"""
Test script for evaluating different AI models via OpenRouter
Usage: python test_model.py [model_id]

Examples:
  python test_model.py anthropic/claude-sonnet-4.5-20250805
  python test_model.py google/gemini-2.5-pro
  python test_model.py openai/gpt-4o
"""

import os
import sys
import json
from pathlib import Path

# Load .env file from root directory
try:
    from dotenv import load_dotenv
    # Load from root directory (one level up from backend/)
    env_path = Path(__file__).parent.parent / '.env'
    load_dotenv(env_path)
except ImportError:
    pass

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent))

from ai_clients.openrouter_client import OpenRouterClient
from config.models import ModelManager

# Sample horse data for testing
SAMPLE_HORSES = {
    "warmblut_dressur": {
        "name": "Warmblut Dressurpferd (7 Jahre)",
        "data": {
            "rasse": "Hannoveraner",
            "alter": 7,
            "geschlecht": "Wallach",
            "abstammung": "Fürstenball x Donnerhall",
            "stockmass": 170,
            "ausbildung": "Dressur L-Niveau",
            "haupteignung": "Dressursport",
            "standort": "30629",
            "aku": "Ohne Befund",
            "erfolge": "Platzierungen bis L-Niveau"
        }
    },
    "jungpferd": {
        "name": "Jungpferd (3 Jahre)",
        "data": {
            "rasse": "Oldenburger",
            "alter": 3,
            "geschlecht": "Stute",
            "abstammung": "For Romance x De Niro",
            "stockmass": 168,
            "ausbildung": "Grundausbildung",
            "haupteignung": "Dressur/Zucht",
            "standort": "49074",
            "aku": "Noch nicht vorhanden",
            "erfolge": "Keine"
        }
    },
    "springpferd": {
        "name": "Springpferd (9 Jahre)",
        "data": {
            "rasse": "Holsteiner",
            "alter": 9,
            "geschlecht": "Wallach",
            "abstammung": "Cornet Obolensky x Cassini I",
            "stockmass": 172,
            "ausbildung": "Springen M-Niveau",
            "haupteignung": "Springsport",
            "standort": "21614",
            "aku": "Leichte Arthrose",
            "erfolge": "Mehrere Platzierungen M-Springen"
        }
    },
    "sportpferd_e": {
        "name": "Deutsches Sportpferd (6 Jahre, E-Niveau)",
        "data": {
            "rasse": "Deutsches Sportpferd",
            "alter": 6,
            "geschlecht": "Stute",
            "abstammung": "Floriscount x Don Diamond",
            "stockmass": 170,
            "ausbildung": "E",
            "haupteignung": "Dressur",
            "standort": "84034",
            "aku": "AKU ohne Befund",
            "erfolge": "",
            "charakter": "normal",
            "besonderheiten": ""
        }
    },
    "jungstute_bernay": {
        "name": "Deutsches Sportpferd (4 Jahre, angeritten)",
        "data": {
            "rasse": "Deutsches Sportpferd",
            "alter": 4,
            "geschlecht": "Stute",
            "abstammung": "Bernay x London Swing",
            "stockmass": 170,
            "ausbildung": "angeritten",
            "haupteignung": "Dressur",
            "standort": "70610",
            "aku": "Aku ohne Befund",
            "erfolge": "Stutenleistungsprüfung 7.4",
            "charakter": "Brav und Rittig",
            "besonderheiten": "unerschrocken"
        }
    },
    "blossi_kauf": {
        "name": "Blossi beim Kauf (4 Jahre, angeritten)",
        "data": {
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
    }
}

def get_system_prompt():
    """Get the system prompt from .env or use default"""
    # Use SYSTEM_PROMPT from .env (loaded from root directory)
    return os.getenv("SYSTEM_PROMPT", """Du bist **PferdeWert AI**, eine hochspezialisierte Expert:innen-KI für Markt- und Preisbewertungen von Sport- und Zuchtpferden.

**DEINE AUFGABE:** Erstelle eine professionelle, strukturierte Bewertung basierend auf den bereitgestellten Pferdedaten.

**AUSGABEFORMAT:**

### Zusammenfassung
[Kurze Einschätzung des Pferdes in 2-3 Sätzen]

### Marktbewertung
**Geschätzter Marktwert:** [X.XXX - X.XXX €]

[Begründung der Preisschätzung basierend auf Rasse, Alter, Ausbildung, etc.]

### Bewertungsfaktoren
- **Rasse & Abstammung:** [Bewertung]
- **Alter & Ausbildungsstand:** [Bewertung]
- **Potenzial & Verwendung:** [Bewertung]

### Empfehlungen
- [Konkrete Handlungsempfehlungen]
- [Vermarktungshinweise]

**WICHTIG:**
- Preise in Euro, realistisch für deutschen Markt
- Berücksichtige aktuelle Markttrends
- Begründe alle Einschätzungen sachlich""")

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

def test_model(model_id: str, horse_key: str = "warmblut_dressur"):
    """Test a specific model with sample horse data"""

    # Check for API key
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print("❌ Error: OPENROUTER_API_KEY not set")
        print("Set it with: export OPENROUTER_API_KEY='your-key'")
        return

    # Get horse data
    if horse_key not in SAMPLE_HORSES:
        print(f"❌ Unknown horse key: {horse_key}")
        print(f"Available horses: {', '.join(SAMPLE_HORSES.keys())}")
        return

    horse = SAMPLE_HORSES[horse_key]
    print(f"\n{'='*80}")
    print(f"Testing Model: {model_id}")
    print(f"Horse: {horse['name']}")
    print(f"{'='*80}\n")

    # Initialize client
    try:
        client = OpenRouterClient()
    except Exception as e:
        print(f"❌ Failed to initialize OpenRouter client: {e}")
        return

    # Build messages
    system_prompt = get_system_prompt()
    user_prompt = build_user_prompt(horse['data'])

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    print("📋 Horse Data:")
    print(user_prompt)
    print(f"\n{'='*80}\n")

    # Make API call
    try:
        print(f"🔄 Calling {model_id}...")
        response = client.create_completion(
            model=model_id,
            messages=messages,
            max_tokens=10000,
            temperature=0.3,
            top_p=0.8
        )

        print(f"✅ Success!\n")
        print(f"{'='*80}")
        print("RESPONSE:")
        print(f"{'='*80}\n")
        print(response.content)
        print(f"\n{'='*80}")

        # Print usage stats if available
        if response.usage:
            print(f"\n📊 Usage Stats:")
            print(f"   Model: {response.model}")
            print(f"   Tokens: {json.dumps(response.usage, indent=2)}")

    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    """Main function"""

    # Available models
    models = {
        "sonnet-4.5": "anthropic/claude-sonnet-4.5",
        "sonnet-4": "anthropic/claude-sonnet-4",
        "sonnet-3.7": "anthropic/claude-3.7-sonnet",
        "sonnet-3.5": "anthropic/claude-3.5-sonnet",
        "haiku-4.5": "anthropic/claude-haiku-4.5",
        "opus-4.1": "anthropic/claude-opus-4.1",
        "opus-4": "anthropic/claude-opus-4",
        "gemini-2.5": "google/gemini-2.5-pro",
        "gemini-flash": "google/gemini-flash-1.5",
        "gpt-4o": "openai/gpt-4o",
        "gpt-4o-mini": "openai/gpt-4o-mini"
    }

    # Parse arguments
    if len(sys.argv) < 2:
        print("🔍 Available Models:")
        print("="*80)
        for short_name, full_id in models.items():
            print(f"  {short_name:15} → {full_id}")
        print("="*80)
        print("\nUsage:")
        print(f"  python {sys.argv[0]} <model>")
        print(f"\nExamples:")
        print(f"  python {sys.argv[0]} sonnet-4.5")
        print(f"  python {sys.argv[0]} {models['sonnet-4.5']}")
        print("\nAvailable horses:")
        for key, horse in SAMPLE_HORSES.items():
            print(f"  {key:20} → {horse['name']}")
        print(f"\nTo use different horse:")
        print(f"  HORSE=jungpferd python {sys.argv[0]} sonnet-4.5")
        return

    # Get model
    model_arg = sys.argv[1]
    model_id = models.get(model_arg, model_arg)

    # Get horse (from env or default)
    horse_key = os.getenv("HORSE", "jungstute_bernay")

    # Run test
    test_model(model_id, horse_key)

if __name__ == "__main__":
    main()
