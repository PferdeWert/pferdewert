#!/usr/bin/env python3
"""
PferdeWert.de Test Script mit Notion Integration
Führt automatisierte Tests für Preiskonsistenz durch und speichert in Notion
"""

import json
import requests
import re
import statistics
import csv
from datetime import datetime
from typing import Dict, List, Tuple, Optional
import os

# Test-Konfiguration
API_URL = "https://pferdewert-api.onrender.com/api/debug-comparison"
HEADERS = {"Content-Type": "application/json"}

# Notion-Konfiguration (optional)
NOTION_TOKEN = os.getenv("NOTION_TOKEN")  # Set in environment: export NOTION_TOKEN="secret_xxx"
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")  # Database ID from Notion URL

# Test-Pferd (dein Hannoveraner)
TEST_PFERD = {
    "rasse": "Hannoveraner",
    "alter": 8,
    "geschlecht": "Wallach", 
    "abstammung": "v. Stolzenberg - v. Weltmeyer",
    "stockmass": 168,
    "ausbildung": "Dressur L-Niveau",
    "aku": "AKU ohne besonderen Befund",
    "erfolge": "Platzierungen bis L-Dressur, Siegprämie Fohlenschau",
    "farbe": "Brauner",
    "zuechter": "Privatzucht", 
    "standort": "80331 München",
    "verwendungszweck": "Turniersport Dressur"
}

def create_notion_database():
    """Erstellt die Notion Database automatisch"""
    if not NOTION_TOKEN:
        print("❌ NOTION_TOKEN nicht gesetzt. Notion-Integration übersprungen.")
        return None
    
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    }
    
    # Database-Schema
    database_data = {
        "parent": {"type": "page_id", "page_id": "workspace"},
        "title": [{"type": "text", "text": {"content": "PferdeWert Test Database"}}],
        "properties": {
            "Pferd ID": {"title": {}},
            "Test Datum": {"date": {}},
            "AI Service": {
                "select": {
                    "options": [
                        {"name": "Claude", "color": "blue"},
                        {"name": "GPT", "color": "green"}
                    ]
                }
            },
            "Test Nr": {"number": {"format": "number"}},
            "Preis Min": {"number": {"format": "euro"}},
            "Preis Max": {"number": {"format": "euro"}},
            "Preis Mitte": {
                "formula": {
                    "expression": "(prop(\"Preis Min\") + prop(\"Preis Max\")) / 2"
                }
            },
            "Besitzer Schätzung": {"number": {"format": "euro"}},
            "Referenzwert": {"number": {"format": "euro"}},
            "Realer Verkaufspreis": {"number": {"format": "euro"}},
            "Abweichung von Referenz": {
                "formula": {
                    "expression": "round(((prop(\"Preis Mitte\") - prop(\"Referenzwert\")) / prop(\"Referenzwert\")) * 100)"
                }
            },
            "Vollständige Antwort": {"rich_text": {}},
            "Notizen": {"rich_text": {}}
        }
    }
    
    try:
        response = requests.post(
            "https://api.notion.com/v1/databases",
            headers=headers,
            json=database_data
        )
        
        if response.status_code == 200:
            database_id = response.json()["id"]
            print(f"✅ Notion Database erstellt: {database_id}")
            return database_id
        else:
            print(f"❌ Notion Database-Erstellung fehlgeschlagen: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Notion-Fehler: {e}")
        return None

def add_to_notion(database_id: str, pferd_id: str, service: str, test_nr: int, 
                  min_price: int, max_price: int, full_response: str, 
                  besitzer_schaetzung: Optional[int] = None, 
                  referenzwert: Optional[int] = None):
    """Fügt Test-Ergebnis zu Notion Database hinzu"""
    if not NOTION_TOKEN or not database_id:
        return False
    
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    }
    
    properties = {
        "Pferd ID": {"title": [{"text": {"content": pferd_id}}]},
        "Test Datum": {"date": {"start": datetime.now().strftime("%Y-%m-%d")}},
        "AI Service": {"select": {"name": service.capitalize()}},
        "Test Nr": {"number": test_nr},
        "Preis Min": {"number": min_price},
        "Preis Max": {"number": max_price},
        "Vollständige Antwort": {"rich_text": [{"text": {"content": full_response[:2000]}}]}  # Notion limit
    }
    
    # Optionale Felder
    if besitzer_schaetzung:
        properties["Besitzer Schätzung"] = {"number": besitzer_schaetzung}
    if referenzwert:
        properties["Referenzwert"] = {"number": referenzwert}
    
    page_data = {
        "parent": {"database_id": database_id},
        "properties": properties
    }
    
    try:
        response = requests.post(
            "https://api.notion.com/v1/pages",
            headers=headers,
            json=page_data
        )
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Notion-Upload Fehler: {e}")
        return False
    """Extrahiert Preisbereich aus AI-Antwort"""
    # Suche nach Mustern wie "45.000 - 65.000 €" oder "45000-65000€"
    patterns = [
        r'(\d{1,3}(?:\.\d{3})*)\s*-\s*(\d{1,3}(?:\.\d{3})*)\s*€',
        r'(\d{1,3}(?:\.\d{3})*)\s*bis\s*(\d{1,3}(?:\.\d{3})*)\s*€',
        r'€\s*(\d{1,3}(?:\.\d{3})*)\s*-\s*(\d{1,3}(?:\.\d{3})*)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            min_price = int(match.group(1).replace('.', ''))
            max_price = int(match.group(2).replace('.', ''))
            return (min_price, max_price)
    
    return None

def test_single_request() -> Dict:
    """Führt einen einzelnen API-Test durch"""
    try:
        response = requests.post(API_URL, json=TEST_PFERD, headers=HEADERS, timeout=30)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"❌ API-Fehler: {e}")
        return {}

def run_consistency_test(num_tests: int = 10) -> Dict:
    """Führt Konsistenz-Test durch"""
    print(f"🚀 Starte {num_tests} Tests für Konsistenz-Analyse...")
    print(f"📋 Test-Pferd: {TEST_PFERD['rasse']}, {TEST_PFERD['alter']} Jahre")
    print("-" * 60)
    
    results = {
        'claude': {'prices': [], 'responses': []},
        'gpt': {'prices': [], 'responses': []}
    }
    
    for i in range(1, num_tests + 1):
        print(f"Test {i}/{num_tests}...", end=" ")
        
        response = test_single_request()
        
        if not response:
            print("❌ Fehler")
            continue
            
        # Claude-Ergebnis verarbeiten
        if 'claude_result' in response:
            claude_text = response['claude_result']
            claude_prices = extract_price_range(claude_text)
            if claude_prices:
                results['claude']['prices'].append(claude_prices)
                results['claude']['responses'].append(claude_text)
                print(f"Claude: {claude_prices[0]:,}-{claude_prices[1]:,}€", end=" ")
        
        # GPT-Ergebnis verarbeiten  
        if 'gpt_result' in response:
            gpt_text = response['gpt_result']
            gpt_prices = extract_price_range(gpt_text)
            if gpt_prices:
                results['gpt']['prices'].append(gpt_prices)
                results['gpt']['responses'].append(gpt_text)
                print(f"GPT: {gpt_prices[0]:,}-{gpt_prices[1]:,}€")
            else:
                print("GPT: Preis nicht erkannt")
        else:
            print("✅")
    
    return results

def analyze_results(results: Dict) -> Dict:
    """Analysiert die Test-Ergebnisse"""
    analysis = {}
    
    for service in ['claude', 'gpt']:
        prices = results[service]['prices']
        
        if not prices:
            analysis[service] = {'error': 'Keine gültigen Preise gefunden'}
            continue
            
        # Berechne Statistiken für Min/Max/Mitte
        min_prices = [p[0] for p in prices]
        max_prices = [p[1] for p in prices] 
        mid_prices = [(p[0] + p[1]) / 2 for p in prices]
        
        analysis[service] = {
            'anzahl_tests': len(prices),
            'min_preis': {
                'durchschnitt': int(statistics.mean(min_prices)),
                'min': min(min_prices),
                'max': max(min_prices),
                'stddev': int(statistics.stdev(min_prices)) if len(min_prices) > 1 else 0
            },
            'max_preis': {
                'durchschnitt': int(statistics.mean(max_prices)),
                'min': min(max_prices), 
                'max': max(max_prices),
                'stddev': int(statistics.stdev(max_prices)) if len(max_prices) > 1 else 0
            },
            'mitte_preis': {
                'durchschnitt': int(statistics.mean(mid_prices)),
                'min': int(min(mid_prices)),
                'max': int(max(mid_prices)),
                'stddev': int(statistics.stdev(mid_prices)) if len(mid_prices) > 1 else 0
            }
        }
    
    return analysis

def print_analysis(analysis: Dict):
    """Gibt die Analyse formatiert aus"""
    print("\n" + "="*60)
    print("📊 KONSISTENZ-ANALYSE")
    print("="*60)
    
    for service, data in analysis.items():
        if 'error' in data:
            print(f"\n❌ {service.upper()}: {data['error']}")
            continue
            
        print(f"\n🤖 {service.upper()}:")
        print(f"   Tests durchgeführt: {data['anzahl_tests']}")
        print(f"   Durchschnittlicher Bereich: {data['min_preis']['durchschnitt']:,}€ - {data['max_preis']['durchschnitt']:,}€")
        print(f"   Preismitte: {data['mitte_preis']['durchschnitt']:,}€")
        print(f"   Standardabweichung Mitte: ±{data['mitte_preis']['stddev']:,}€")
        print(f"   Schwankungsbereich: {data['mitte_preis']['min']:,}€ - {data['mitte_preis']['max']:,}€")
        
        # Konsistenz-Score berechnen
        konsistenz_score = max(0, 100 - (data['mitte_preis']['stddev'] / data['mitte_preis']['durchschnitt'] * 100))
        print(f"   Konsistenz-Score: {konsistenz_score:.1f}%")

def export_to_csv(results: Dict, analysis: Dict, filename: str = None):
    """Exportiert Ergebnisse als CSV für Notion-Import"""
    if not filename:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"pferdewert_test_{timestamp}.csv"
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = [
            'Pferd ID', 'Test Datum', 'AI Service', 'Test Nr', 
            'Preis Min', 'Preis Max', 'Preis Mitte', 
            'Besitzer Schätzung', 'Referenzwert', 'Vollständige Antwort'
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        timestamp = datetime.now().strftime("%Y-%m-%d")
        pferd_id = f"Hannoveraner_Test_{timestamp}"
        
        for service in ['claude', 'gpt']:
            if service not in results or not results[service]['prices']:
                continue
                
            prices = results[service]['prices']
            responses = results[service]['responses']
            
            for i, ((min_p, max_p), response) in enumerate(zip(prices, responses), 1):
                writer.writerow({
                    'Pferd ID': pferd_id,
                    'Test Datum': timestamp,
                    'AI Service': service.capitalize(),
                    'Test Nr': i,
                    'Preis Min': min_p,
                    'Preis Max': max_p,
                    'Preis Mitte': int((min_p + max_p) / 2),
                    'Besitzer Schätzung': '',  # Manuell ausfüllen
                    'Referenzwert': '',  # Manuell ausfüllen
                    'Vollständige Antwort': response[:500] + '...' if len(response) > 500 else response
                })
    
    print(f"📊 CSV-Export erstellt: {filename}")
    return filename
    """Generiert Notion-Eingabe-Template"""
    print("\n" + "="*60)
    print("📋 NOTION DATABASE TEMPLATE")
    print("="*60)
    
    timestamp = datetime.now().strftime("%Y-%m-%d")
    pferd_id = f"Hannoveraner_Test_{timestamp}"
    
    print(f"\n📌 Für Notion Database - Copy & Paste bereit:")
    print(f"Pferd ID: {pferd_id}")
    print(f"Test Datum: {timestamp}")
    
    for service in ['claude', 'gpt']:
        if service not in analysis or 'error' in analysis[service]:
            continue
            
        data = analysis[service]
        prices = results[service]['prices']
        
        for i, (min_p, max_p) in enumerate(prices, 1):
            print(f"\n--- {service.upper()} Test {i} ---")
            print(f"AI Service: {service.capitalize()}")
            print(f"Test Nr: {i}")
            print(f"Preis Min: {min_p}")
            print(f"Preis Max: {max_p}")
            print(f"Preis Mitte: {int((min_p + max_p) / 2)}")
            # Hier könntest du manuell Besitzer-Schätzung, Referenzwert etc. eintragen

def main():
    """Hauptfunktion mit Notion-Integration"""
    print("🐎 PferdeWert.de Konsistenz-Test mit Notion-Integration")
    print("=" * 60)
    
    # Benutzereingabe
    try:
        num_tests = int(input("Anzahl Tests pro AI (Standard: 10): ") or "10")
    except ValueError:
        num_tests = 10
    
    # Referenzwerte abfragen
    print("\n💰 Referenzwerte (optional, Enter für überspringen):")
    try:
        besitzer_schaetzung = input("Was schätzt der Besitzer (€): ")
        besitzer_schaetzung = int(besitzer_schaetzung) if besitzer_schaetzung else None
        
        referenzwert = input("Bekannter Referenzwert (€): ")
        referenzwert = int(referenzwert) if referenzwert else None
    except ValueError:
        besitzer_schaetzung = referenzwert = None
    
    # Notion-Setup
    database_id = NOTION_DATABASE_ID
    if NOTION_TOKEN and not database_id:
        print("\n🗃️ Notion Database wird erstellt...")
        database_id = create_notion_database()
    
    # Tests durchführen
    results = run_consistency_test(num_tests)
    
    # Analyse
    analysis = analyze_results(results)
    print_analysis(analysis)
    
    # Export-Optionen
    print("\n📁 Export-Optionen:")
    
    # CSV-Export
    if input("CSV-Export erstellen? (j/N): ").lower() == 'j':
        csv_file = export_to_csv(results, analysis)
        print(f"✅ Importiere die CSV-Datei '{csv_file}' in deine Notion Database!")
    
    # Notion-Upload (falls API verfügbar)
    if database_id and input("Direkt in Notion hochladen? (j/N): ").lower() == 'j':
        print("⬆️ Lade Daten in Notion hoch...")
        timestamp = datetime.now().strftime("%Y-%m-%d")
        pferd_id = f"Hannoveraner_Test_{timestamp}"
        
        success_count = 0
        for service in ['claude', 'gpt']:
            if service not in results or not results[service]['prices']:
                continue
                
            prices = results[service]['prices']
            responses = results[service]['responses']
            
            for i, ((min_p, max_p), response) in enumerate(zip(prices, responses), 1):
                success = add_to_notion(
                    database_id, pferd_id, service, i, min_p, max_p, response,
                    besitzer_schaetzung, referenzwert
                )
                if success:
                    success_count += 1
        
        print(f"✅ {success_count} Einträge erfolgreich in Notion hochgeladen!")
    
    # Notion Template (fallback)
    if not database_id and input("Notion Copy&Paste Template? (j/N): ").lower() == 'j':
        generate_notion_template(results, analysis)
    
    print(f"\n✅ Test abgeschlossen! {num_tests} Tests pro AI-Service analysiert.")
    
    if NOTION_TOKEN:
        print("🗃️ Notion-Integration aktiv!")
    else:
        print("💡 Tipp: Setze NOTION_TOKEN für automatische Notion-Integration:")
        print("   export NOTION_TOKEN='secret_xxx'")

if __name__ == "__main__":
    main()