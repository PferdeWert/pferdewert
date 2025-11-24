#!/usr/bin/env python3
"""
Model Comparison Script for PferdeWert
Vergleicht verschiedene KI-Modelle mit denselben Pferdedaten

Usage:
  python compare_models.py                    # Alle Modelle
  python compare_models.py sonnet gemini      # Nur bestimmte Modelle
  HORSE=springpferd python compare_models.py  # Anderes Pferd
"""

import os
import sys
import json
import re
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
from test_model import SAMPLE_HORSES, get_system_prompt, build_user_prompt

# Modelle zum Vergleichen (Stand: Nov 2025)
MODELS_TO_COMPARE = {
    # Google Gemini
    "gemini-3-pro": "google/gemini-3-pro-preview",
    "gemini-2.5-pro": "google/gemini-2.5-pro",
    # "gemini-2.5-flash": "google/gemini-2.5-flash",
    # Anthropic Claude
    "sonnet-4.5": "anthropic/claude-sonnet-4.5",
    # "sonnet-4": "anthropic/claude-sonnet-4-20250514",
    # OpenAI (optional)
    # "gpt-4o": "openai/gpt-4o",
}

def extract_price_range(text: str) -> dict:
    """Extrahiert die Preisspanne aus dem Response"""
    # Verschiedene Patterns für Preisangaben
    patterns = [
        r'(\d{1,3}(?:\.\d{3})*)\s*[-–bis]\s*(\d{1,3}(?:\.\d{3})*)\s*€',  # 15.000 - 25.000 €
        r'€\s*(\d{1,3}(?:\.\d{3})*)\s*[-–bis]\s*(\d{1,3}(?:\.\d{3})*)',  # € 15.000 - 25.000
        r'(\d{1,3}(?:[\.,]\d{3})*)\s*(?:bis|to|-|–)\s*(\d{1,3}(?:[\.,]\d{3})*)',  # flexibler
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            low = int(match.group(1).replace('.', '').replace(',', ''))
            high = int(match.group(2).replace('.', '').replace(',', ''))
            return {"min": low, "max": high, "mid": (low + high) // 2}

    return {"min": None, "max": None, "mid": None}

def compare_models(model_keys: list = None, horse_key: str = "warmblut_dressur"):
    """Vergleicht mehrere Modelle mit denselben Pferdedaten"""

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print("❌ OPENROUTER_API_KEY nicht gesetzt!")
        return

    if horse_key not in SAMPLE_HORSES:
        print(f"❌ Unbekanntes Pferd: {horse_key}")
        print(f"Verfügbar: {', '.join(SAMPLE_HORSES.keys())}")
        return

    horse = SAMPLE_HORSES[horse_key]
    models = {k: v for k, v in MODELS_TO_COMPARE.items() if model_keys is None or k in model_keys}

    if not models:
        print("❌ Keine Modelle ausgewählt")
        return

    print(f"\n{'='*80}")
    print(f"🐴 MODELL-VERGLEICH: {horse['name']}")
    print(f"{'='*80}")
    print(f"\n📋 Pferdedaten:")
    print(build_user_prompt(horse['data']))
    print(f"\n{'='*80}\n")

    client = OpenRouterClient()
    system_prompt = get_system_prompt()
    user_prompt = build_user_prompt(horse['data'])
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    results = []

    for name, model_id in models.items():
        print(f"\n🔄 Teste {name} ({model_id})...")

        try:
            response = client.create_completion(
                model=model_id,
                messages=messages,
                max_tokens=10000,
                temperature=0.3,
                top_p=0.8
            )

            price_range = extract_price_range(response.content)

            results.append({
                "model": name,
                "model_id": model_id,
                "content": response.content,
                "price_range": price_range,
                "usage": response.usage,
                "success": True
            })

            print(f"✅ {name}: {price_range['min']:,} - {price_range['max']:,} €" if price_range['min'] else f"✅ {name}: Preis nicht extrahiert")

        except Exception as e:
            results.append({
                "model": name,
                "model_id": model_id,
                "error": str(e),
                "success": False
            })
            print(f"❌ {name}: {e}")

    # Zusammenfassung
    print(f"\n{'='*80}")
    print("📊 PREIS-VERGLEICH")
    print(f"{'='*80}\n")

    successful = [r for r in results if r['success'] and r['price_range']['min']]

    print(f"{'Modell':<20} {'Min':>12} {'Max':>12} {'Mittel':>12}")
    print("-" * 60)

    for r in successful:
        p = r['price_range']
        print(f"{r['model']:<20} {p['min']:>10,} € {p['max']:>10,} € {p['mid']:>10,} €")

    if len(successful) > 1:
        avg_min = sum(r['price_range']['min'] for r in successful) // len(successful)
        avg_max = sum(r['price_range']['max'] for r in successful) // len(successful)
        avg_mid = sum(r['price_range']['mid'] for r in successful) // len(successful)
        print("-" * 60)
        print(f"{'Durchschnitt':<20} {avg_min:>10,} € {avg_max:>10,} € {avg_mid:>10,} €")

        # Abweichung
        print(f"\n📈 Preisstreuung:")
        mids = [r['price_range']['mid'] for r in successful]
        spread = max(mids) - min(mids)
        print(f"   Differenz (min-max Mittelwert): {spread:,} €")

    # Speichere Ergebnisse
    output_dir = Path(__file__).parent / "model_comparisons"
    output_dir.mkdir(exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = output_dir / f"comparison_{horse_key}_{timestamp}.json"

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump({
            "timestamp": timestamp,
            "horse": horse_key,
            "horse_data": horse['data'],
            "results": results
        }, f, indent=2, ensure_ascii=False)

    print(f"\n💾 Ergebnisse gespeichert: {output_file}")

    # Vollständige Ausgaben anzeigen
    print(f"\n{'='*80}")
    print("📝 VOLLSTÄNDIGE BEWERTUNGEN")
    print(f"{'='*80}")

    for r in results:
        if r['success']:
            print(f"\n{'─'*80}")
            print(f"🤖 {r['model']} ({r['model_id']})")
            print(f"{'─'*80}\n")
            print(r['content'])
            if r.get('usage'):
                print(f"\n📊 Tokens: {r['usage']}")

def main():
    models = None
    if len(sys.argv) > 1:
        models = sys.argv[1:]

    horse = os.getenv("HORSE", "jungstute_bernay")
    compare_models(models, horse)

if __name__ == "__main__":
    main()
