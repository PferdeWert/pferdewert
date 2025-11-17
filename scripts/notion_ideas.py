#!/usr/bin/env python3
"""
Notion Ideen Integration - Mit intelligenter Überschriften-Generierung
Erstellt formatierte Ideen-Einträge mit KI-generierten Überschriften
"""

import os
import sys
import re
from datetime import datetime
from notion_client import Client

def generate_idea_title(content: str) -> str:
    """Generiert eine passende Überschrift für die Idee basierend auf dem Inhalt"""
    content_lower = content.lower()
    
    # Einfache Keyword-basierte Überschriftengenerierung
    keywords_mapping = {
        # Business & Startups
        'startup': '🚀 Startup-Idee',
        'business': '💼 Business-Konzept', 
        'geld verdienen': '💰 Monetarisierung',
        'app': '📱 App-Konzept',
        'website': '🌐 Website-Idee',
        'saas': '⚡ SaaS-Konzept',
        
        # Tech & Development
        'ki': '🤖 KI-Innovation',
        'ai': '🤖 AI-Konzept',
        'automatisierung': '⚙️ Automatisierungs-Idee',
        'integration': '🔗 Integration-Konzept',
        'api': '🔌 API-Idee',
        'bot': '🤖 Bot-Konzept',
        
        # Marketing & Content
        'marketing': '📢 Marketing-Strategie',
        'content': '📝 Content-Idee', 
        'seo': '🔍 SEO-Optimierung',
        'social media': '📱 Social-Media-Konzept',
        'video': '🎥 Video-Idee',
        'blog': '✍️ Blog-Konzept',
        
        # PferdeWert specific
        'pferd': '🐴 PferdeWert-Feature',
        'bewertung': '📊 Bewertungs-Verbesserung',
        'pferdewert': '🐴 PferdeWert-Innovation',
        'algorithmus': '🧮 Algorithmus-Idee',
        
        # Creative & Design
        'design': '🎨 Design-Konzept',
        'ux': '👥 UX-Verbesserung',
        'ui': '🖼️ UI-Innovation',
        'feature': '✨ Feature-Idee',
        'verbesserung': '📈 Verbesserungs-Vorschlag',
        
        # Personal & Life
        'leben': '🌱 Lebens-Idee',
        'produktivität': '⚡ Produktivitäts-Hack',
        'lernen': '📚 Lern-Konzept',
        'reise': '✈️ Reise-Idee',
        'hobby': '🎯 Hobby-Projekt',
        
        # Random & Creative
        'experiment': '🧪 Experiment-Idee',
        'projekt': '🏗️ Projekt-Konzept',
        'tool': '🛠️ Tool-Idee',
        'lösung': '💡 Lösungs-Ansatz'
    }
    
    # Suche nach Keywords im Content (längere zuerst für bessere Matches)
    sorted_keywords = sorted(keywords_mapping.items(), key=lambda x: len(x[0]), reverse=True)
    for keyword, title in sorted_keywords:
        if keyword in content_lower:
            return title
    
    # Fallback: Basierend auf Satztyp
    if '?' in content:
        return '❓ Frage & Überlegung'
    elif any(word in content_lower for word in ['sollte', 'könnte', 'möchte', 'will']):
        return '🎯 Vorhaben & Ziel'
    elif any(word in content_lower for word in ['problem', 'issue', 'fehler']):
        return '🔧 Problem-Analyse'
    elif len(content) > 200:
        return '📋 Ausführliche Überlegung'
    elif len(content) < 50:
        return '💭 Kurze Eingebung'
    else:
        return '💡 Spontane Idee'

def add_idea_entry(content: str):
    """Fügt Ideen-Eintrag mit KI-generierter Überschrift hinzu"""
    try:
        token = os.getenv("NOTION_TOKEN")
        page_id = os.getenv("NOTION_IDEEN_PAGE_ID")
        
        if not token or not page_id:
            print("❌ NOTION_TOKEN and NOTION_IDEEN_PAGE_ID required")
            print("💡 Set NOTION_IDEEN_PAGE_ID=250dc0a2-92bf-81f4-ac57-deb643442baa in .env")
            return False
        
        notion = Client(auth=token)
        
        # Deutsche Datumsformatierung
        now = datetime.now()
        today = now.strftime("%d.%m.%Y")
        time_now = now.strftime("%H:%M")
        weekday = now.strftime("%A")
        
        # Deutsche Wochentage
        german_weekdays = {
            'Monday': 'Montag', 'Tuesday': 'Dienstag', 'Wednesday': 'Mittwoch',
            'Thursday': 'Donnerstag', 'Friday': 'Freitag', 'Saturday': 'Samstag', 'Sunday': 'Sonntag'
        }
        weekday_german = german_weekdays.get(weekday, weekday)
        
        # Intelligente Überschrift generieren
        smart_title = generate_idea_title(content)
        
        # Formatierte Blöcke mit Datum UND intelligenter Überschrift
        new_blocks = [
            {
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [{"text": {"content": f"📅 **{today}** ({weekday_german}) - {time_now}"}}]
                }
            },
            {
                "type": "heading_3", 
                "heading_3": {
                    "rich_text": [{"text": {"content": smart_title}}]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [{"text": {"content": f"💭 {content}"}}]
                }
            },
            {
                "type": "divider",
                "divider": {}
            }
        ]
        
        # Sicher anhängen
        print(f"💡 Erstelle Ideen-Eintrag für {today} {time_now}...")
        print(f"🏷️ Generierte Überschrift: {smart_title}")
        
        response = notion.blocks.children.append(
            block_id=page_id,
            children=new_blocks
        )
        
        print(f"✅ Ideen-Eintrag erstellt: {today} ({weekday_german}) - {time_now}")
        print(f"🏷️ Überschrift: {smart_title}")
        print(f"💡 Inhalt: {content[:100]}{'...' if len(content) > 100 else ''}")
        
        return True
        
    except Exception as e:
        print(f"❌ Fehler: {str(e)}")
        return False

def list_recent_ideas(days: int = 7):
    """Listet die letzten Ideen-Einträge auf"""
    try:
        token = os.getenv("NOTION_TOKEN")
        page_id = os.getenv("NOTION_IDEEN_PAGE_ID")
        
        if not token or not page_id:
            print("❌ NOTION_TOKEN und NOTION_IDEEN_PAGE_ID required")
            return False
            
        notion = Client(auth=token)
        
        # Page Blocks abrufen
        blocks = []
        has_more = True
        cursor = None
        
        while has_more:
            response = notion.blocks.children.list(
                block_id=page_id,
                start_cursor=cursor
            )
            blocks.extend(response['results'])
            has_more = response['has_more']
            cursor = response.get('next_cursor')
        
        # Letzte Einträge extrahieren
        recent_entries = []
        for block in blocks[-30:]:  # Letzte 30 Blöcke
            if block['type'] == 'heading_2':
                heading_text = ""
                for text_obj in block['heading_2']['rich_text']:
                    heading_text += text_obj['text']['content']
                if '📅' in heading_text:
                    recent_entries.append(heading_text)
        
        print(f"💡 Letzte {min(len(recent_entries), days)} Ideen-Einträge:")
        for entry in recent_entries[-days:]:
            print(f"  {entry}")
            
        return True
        
    except Exception as e:
        print(f"❌ Fehler beim Abrufen der Ideen: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python notion_ideas.py add 'Ideen Inhalt'")
        print("  python notion_ideas.py list [days]")
        print("")
        print("Features:")
        print("  🏷️ Intelligente Überschriften-Generierung basierend auf Inhalt")
        print("  📅 Deutsche Datumsformatierung mit Wochentag")
        print("  💡 Emoji-Kategorisierung (Business, Tech, Creative, etc.)")
        print("")
        print("Environment variables required:")
        print("  NOTION_TOKEN=your_notion_token")
        print("  NOTION_IDEEN_PAGE_ID=250dc0a2-92bf-81f4-ac57-deb643442baa")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "add":
        if len(sys.argv) < 3:
            print("❌ Content required for idea entry")
            sys.exit(1)
        content = " ".join(sys.argv[2:])
        add_idea_entry(content)
        
    elif command == "list":
        days = 7
        if len(sys.argv) > 2:
            try:
                days = int(sys.argv[2])
            except ValueError:
                print("❌ Days must be a number")
                sys.exit(1)
        list_recent_ideas(days)
        
    else:
        print(f"❌ Unknown command: {command}")
        print("Available commands: add, list")
        sys.exit(1)