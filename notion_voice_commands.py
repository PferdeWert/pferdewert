#!/usr/bin/env python3
"""
Notion Voice Command Detection
Erkennt Notion-spezifische Befehle aus Whisper-Transkriptionen
"""

import re
from typing import Optional, Dict, Any

def detect_notion_command(text: str) -> Optional[Dict[str, Any]]:
    """Erkennt Notion-spezifische Befehle aus dem transkribierten Text"""
    text_lower = text.lower()
    
    # Tagebuch Commands
    tagebuch_patterns = [
        r"tagebuch\s+eintrag:?\s*(.+)",
        r"tagebuch:?\s*(.+)",
        r"diary\s+entry:?\s*(.+)", 
        r"notiere:?\s*(.+)",
        r"schreibe\s+(?:ins\s+)?tagebuch:?\s*(.+)",
        r"füge\s+(?:zum\s+)?tagebuch\s+hinzu:?\s*(.+)"
    ]
    
    for pattern in tagebuch_patterns:
        match = re.search(pattern, text_lower)
        if match:
            return {
                'type': 'tagebuch',
                'content': match.group(1).strip(),
                'raw_text': text
            }
    
    # Analyse Commands  
    analyse_patterns = [
        r"durchsuche?\s+(?:mein\s+)?notion\s*(?:board|workspace)?",
        r"analysiere?\s+(?:mein\s+)?notion\s*(?:board|workspace)?",
        r"fasse?\s+(?:mir\s+)?(?:mein\s+)?notion\s+zusammen",
        r"zeige?\s+(?:mir\s+)?(?:meine\s+)?notion\s+(?:übersicht|summary)",
        r"was\s+(?:ist\s+)?(?:in\s+)?(?:meinem\s+)?notion\s+(?:los|passiert|geplant)",
        r"notion\s+(?:status|übersicht|summary)",
        r"wöchentliche?\s+notion\s+(?:übersicht|zusammenfassung)"
    ]
    
    if any(re.search(pattern, text_lower) for pattern in analyse_patterns):
        return {
            'type': 'analyse',
            'query': text,
            'subtype': 'weekly' if any(word in text_lower for word in ['wöchentlich', 'weekly', 'woche']) else 'general'
        }
    
    # Search Commands
    search_patterns = [
        r"suche?\s+(?:in\s+)?notion\s+(?:nach\s+)?(.+)",
        r"finde?\s+(?:in\s+)?notion\s+(.+)",
        r"durchsuche?\s+notion\s+(?:nach\s+)?(.+)"
    ]
    
    for pattern in search_patterns:
        match = re.search(pattern, text_lower)
        if match:
            return {
                'type': 'search',
                'query': match.group(1).strip(),
                'raw_text': text
            }
    
    # Update Commands
    update_patterns = [
        r"füge?\s+(?:zu|zum)\s+(.+?)\s+hinzu:?\s*(.+)",
        r"update\s+(.+?)(?:\s+mit|\s*:)\s*(.+)",
        r"ergänze?\s+(.+?)\s+(?:um|mit):?\s*(.+)",
        r"schreibe?\s+(?:zu|in)\s+(.+?)(?:\s*:)?\s*(.+)",
        r"notiere?\s+(?:bei|zu)\s+(.+?)(?:\s*:)?\s*(.+)"
    ]
    
    for pattern in update_patterns:
        match = re.search(pattern, text_lower)
        if match:
            return {
                'type': 'update',
                'target': match.group(1).strip(),
                'content': match.group(2).strip(),
                'raw_text': text
            }
    
    # Page Creation Commands
    create_patterns = [
        r"erstelle?\s+(?:eine\s+)?(?:neue\s+)?notion\s+(?:seite|page)\s+(?:für\s+|namens\s+)?(.+)",
        r"neue\s+notion\s+(?:seite|page)\s*(?::\s*)?(.+)",
        r"mache?\s+(?:eine\s+)?neue\s+(?:seite|page)\s+(?:für\s+)?(.+)\s+(?:in\s+)?notion"
    ]
    
    for pattern in create_patterns:
        match = re.search(pattern, text_lower)
        if match:
            return {
                'type': 'create_page',
                'title': match.group(1).strip(),
                'raw_text': text
            }
    
    return None

def format_notion_response(command: Dict[str, Any], result: str) -> str:
    """Formatiert die Notion-Response für Telegram"""
    
    if command['type'] == 'tagebuch':
        return f"📝 **Tagebuch-Eintrag erstellt**\n\n💭 _{command['content'][:200]}{'...' if len(command['content']) > 200 else ''}_\n\n{result}"
    
    elif command['type'] == 'analyse':
        return f"📊 **Notion Workspace Analyse**\n\n{result}"
    
    elif command['type'] == 'search':
        return f"🔍 **Notion Suche: '{command['query']}'**\n\n{result}"
    
    elif command['type'] == 'update':
        return f"✏️ **'{command['target']}' aktualisiert**\n\n📝 Hinzugefügt: _{command['content']}_\n\n{result}"
    
    elif command['type'] == 'create_page':
        return f"📄 **Neue Notion-Seite erstellt**\n\n📋 Titel: _{command['title']}_\n\n{result}"
    
    else:
        return f"📝 **Notion Befehl ausgeführt**\n\n{result}"

def test_detection():
    """Test die Command Detection mit Beispielen"""
    test_cases = [
        "Tagebuch Eintrag: Heute war ein produktiver Tag mit dem Whisper Bot",
        "Schreibe ins Tagebuch: Meeting mit dem Team war erfolgreich",
        "Durchsuche mein Notion Board",
        "Analysiere mein Notion Workspace",
        "Fasse mir mein Notion zusammen",
        "Suche in Notion nach PferdeWert",
        "Finde in Notion das Projekt Voice Bot",
        "Füge zum PferdeWert Projekt hinzu: Voice Integration ist fertig",
        "Update das Meeting Protokoll mit: Alle Tasks sind erledigt",
        "Erstelle eine neue Notion Seite für Voice Bot Dokumentation",
        "Normale Nachricht ohne Notion Bezug"
    ]
    
    print("🧪 Testing Notion Command Detection:\n")
    
    for i, test in enumerate(test_cases, 1):
        result = detect_notion_command(test)
        print(f"{i:2d}. Text: '{test}'")
        if result:
            print(f"    ✅ Command: {result['type']}")
            if 'content' in result:
                print(f"    📝 Content: '{result['content']}'")
            if 'query' in result:
                print(f"    🔍 Query: '{result['query']}'")
            if 'target' in result and 'content' in result:
                print(f"    🎯 Target: '{result['target']}' | Content: '{result['content']}'")
        else:
            print("    ❌ No Notion command detected")
        print()

if __name__ == "__main__":
    test_detection()