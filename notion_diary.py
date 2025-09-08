#!/usr/bin/env python3
"""Notion Tagebuch Integration - SIMPLE & SAFE Version"""

import os
import sys
from datetime import datetime
from notion_client import Client

def add_diary_entry(content: str):
    """Fügt Tagebuch-Eintrag mit perfekter Formatierung hinzu - SICHER!"""
    try:
        token = os.getenv("NOTION_TOKEN")
        page_id = os.getenv("NOTION_TAGEBUCH_PAGE_ID")
        
        if not token or not page_id:
            print("❌ NOTION_TOKEN and NOTION_TAGEBUCH_PAGE_ID required")
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
        
        # Simple aber schöne Formatierung
        new_blocks = [
            {
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [{"text": {"content": f"📅 **{today}** ({weekday_german}) - {time_now}"}}]
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
        print(f"📝 Erstelle Eintrag für {today} {time_now}...")
        response = notion.blocks.children.append(
            block_id=page_id,
            children=new_blocks
        )
        
        print(f"✅ Tagebuch-Eintrag erstellt: {today} ({weekday_german}) - {time_now}")
        print(f"📝 Inhalt: {content[:100]}{'...' if len(content) > 100 else ''}")
        
        return True
        
    except Exception as e:
        print(f"❌ Fehler: {str(e)}")
        return False

def list_recent_diary_entries(days: int = 7):
    """Listet die letzten Tagebuch-Einträge auf"""
    try:
        token = os.getenv("NOTION_TOKEN")
        page_id = os.getenv("NOTION_TAGEBUCH_PAGE_ID")
        
        if not token or not page_id:
            print("❌ NOTION_TOKEN und NOTION_TAGEBUCH_PAGE_ID required")
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
        
        # Letzte Einträge extrahieren (vereinfacht)
        recent_entries = []
        for block in blocks[-20:]:  # Letzte 20 Blocks
            if block['type'] == 'heading_3':
                heading_text = ""
                for text_obj in block['heading_3']['rich_text']:
                    heading_text += text_obj['text']['content']
                if '📅' in heading_text:
                    recent_entries.append(heading_text)
        
        print(f"📋 Letzte {min(len(recent_entries), days)} Tagebuch-Einträge:")
        for entry in recent_entries[-days:]:
            print(f"  {entry}")
            
        return True
        
    except Exception as e:
        print(f"❌ Fehler beim Abrufen der Einträge: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python notion_diary.py add 'Tagebuch Inhalt'")
        print("  python notion_diary.py list [days]")
        print("")
        print("Environment variables required:")
        print("  NOTION_TOKEN=your_notion_token")
        print("  NOTION_TAGEBUCH_PAGE_ID=your_diary_page_id")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "add":
        if len(sys.argv) < 3:
            print("❌ Content required for diary entry")
            sys.exit(1)
        content = " ".join(sys.argv[2:])
        add_diary_entry(content)
        
    elif command == "list":
        days = 7
        if len(sys.argv) > 2:
            try:
                days = int(sys.argv[2])
            except ValueError:
                print("❌ Days must be a number")
                sys.exit(1)
        list_recent_diary_entries(days)
        
    else:
        print(f"❌ Unknown command: {command}")
        print("Available commands: add, list")
        sys.exit(1)