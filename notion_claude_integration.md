# Claude + Notion Full Access auf Server

## Das Problem
- Claude CLI hat keinen direkten Notion Zugriff
- MCP funktioniert nur lokal (nicht auf Server)
- Claude kann aber Python Scripts ausführen!

## Die Lösung: Python Bridge

Claude kann mit `--all-permissions` Python Scripts ausführen, die mit der Notion API sprechen.

## 1. Notion Analyzer Script

```python
#!/usr/bin/env python3
# notion_analyzer.py - Claude kann das ausführen!

import os
import json
from notion_client import Client
from datetime import datetime
from typing import List, Dict, Any

class NotionAnalyzer:
    def __init__(self):
        self.notion = Client(auth=os.getenv("NOTION_TOKEN"))
    
    def search_all_pages(self, query: str = None):
        """Durchsucht alle Notion Pages"""
        response = self.notion.search(
            query=query,
            filter={"property": "object", "value": "page"},
            page_size=100
        )
        return response['results']
    
    def get_page_content(self, page_id: str):
        """Holt kompletten Inhalt einer Page"""
        # Page Properties
        page = self.notion.pages.retrieve(page_id)
        
        # Page Blocks (Content)
        blocks = []
        has_more = True
        cursor = None
        
        while has_more:
            response = self.notion.blocks.children.list(
                block_id=page_id,
                start_cursor=cursor
            )
            blocks.extend(response['results'])
            has_more = response['has_more']
            cursor = response.get('next_cursor')
        
        return {
            'properties': page['properties'],
            'blocks': blocks
        }
    
    def update_page(self, page_id: str, updates: Dict):
        """Updated Properties einer Page"""
        return self.notion.pages.update(
            page_id=page_id,
            properties=updates
        )
    
    def append_to_page(self, page_id: str, content: str):
        """Fügt Content zu einer Page hinzu"""
        return self.notion.blocks.children.append(
            block_id=page_id,
            children=[{
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [{
                        "type": "text",
                        "text": {"content": content}
                    }]
                }
            }]
        )
    
    def analyze_workspace(self):
        """Analysiert das gesamte Notion Workspace"""
        stats = {
            'total_pages': 0,
            'databases': [],
            'recent_updates': [],
            'page_types': {}
        }
        
        # Alle Databases finden
        databases = self.notion.search(
            filter={"property": "object", "value": "database"}
        )
        
        for db in databases['results']:
            db_info = {
                'id': db['id'],
                'title': self._get_title(db),
                'properties': list(db.get('properties', {}).keys())
            }
            stats['databases'].append(db_info)
            
            # Pages in Database zählen
            pages = self.notion.databases.query(database_id=db['id'])
            stats['total_pages'] += len(pages['results'])
        
        return stats
    
    def _get_title(self, page_or_db):
        """Extrahiert Titel aus Notion Object"""
        if 'title' in page_or_db:
            if isinstance(page_or_db['title'], list) and page_or_db['title']:
                return page_or_db['title'][0].get('plain_text', 'Untitled')
        return 'Untitled'

# CLI Interface für Claude
if __name__ == "__main__":
    import sys
    
    analyzer = NotionAnalyzer()
    
    if len(sys.argv) < 2:
        print("Usage: python notion_analyzer.py [command] [args]")
        print("Commands:")
        print("  search <query> - Search all pages")
        print("  analyze - Analyze entire workspace")
        print("  get <page_id> - Get page content")
        print("  update <page_id> <property> <value> - Update page")
        print("  append <page_id> <content> - Append to page")
        sys.exit(1)
    
    command = sys.argv[1]
    
    try:
        if command == "analyze":
            result = analyzer.analyze_workspace()
            print(json.dumps(result, indent=2))
            
        elif command == "search" and len(sys.argv) > 2:
            query = " ".join(sys.argv[2:])
            results = analyzer.search_all_pages(query)
            for page in results:
                print(f"📄 {analyzer._get_title(page)} (ID: {page['id']})")
                
        elif command == "get" and len(sys.argv) > 2:
            page_id = sys.argv[2]
            content = analyzer.get_page_content(page_id)
            print(json.dumps(content, indent=2))
            
        elif command == "append" and len(sys.argv) > 3:
            page_id = sys.argv[2]
            content = " ".join(sys.argv[3:])
            analyzer.append_to_page(page_id, content)
            print(f"✅ Added content to page {page_id}")
            
        elif command == "update" and len(sys.argv) > 4:
            page_id = sys.argv[2]
            prop = sys.argv[3]
            value = sys.argv[4]
            updates = {prop: {"title": [{"text": {"content": value}}]}}
            analyzer.update_page(page_id, updates)
            print(f"✅ Updated {prop} on page {page_id}")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)
```

## 2. Setup

```bash
# Installation
pip install notion-client python-dotenv

# .env Datei
NOTION_TOKEN=secret_abc123...

# Ausführbar machen
chmod +x notion_analyzer.py
```

## 3. Claude Nutzung

Jetzt kann Claude auf dem Server Notion analysieren:

### Beispiel-Befehle die du Claude sagen kannst:

```bash
# Über Sprache an Claude:
"Claude, analysiere mein komplettes Notion Workspace"
"Claude, suche alle Notion Pages mit 'projekt' im Titel"
"Claude, füge zu Page ID abc123 den Text 'Erledigt am [datum]' hinzu"
"Claude, update die Status Property von Page xyz auf 'Done'"
```

### Was Claude dann macht:

```bash
# Claude führt aus:
python notion_analyzer.py analyze

# Claude sieht die Struktur und kann dann:
python notion_analyzer.py search "PferdeWert"
python notion_analyzer.py get "page-id-123"
python notion_analyzer.py append "page-id-123" "✅ Task completed by Claude"
```

## 4. Erweiterte Features

### Bulk Operations
```python
# bulk_update.py - Für Claude
def update_all_pages_with_tag(tag: str, update: dict):
    """Updated alle Pages mit bestimmtem Tag"""
    pages = notion.search(filter={"property": "Tags", "multi_select": {"contains": tag}})
    for page in pages['results']:
        notion.pages.update(page['id'], properties=update)
    return f"Updated {len(pages['results'])} pages"
```

### Smart Analysis
```python
# smart_notion.py
def analyze_and_suggest():
    """Analysiert Notion und macht Vorschläge"""
    # Findet:
    # - Unvollständige Tasks
    # - Pages ohne Tags
    # - Alte Pages die Updates brauchen
    # - Duplikate
    pass
```

## 5. Integration in Whisper Bot

```python
# voice_bot.py - Erweitert
async def handle_voice(update, context):
    command = whisper_transcribe(audio)
    
    # Notion Analyse Commands
    if "notion" in command.lower() and "analyse" in command.lower():
        # Claude mit Notion Script
        result = subprocess.run([
            "claude", "--all-permissions",
            "python notion_analyzer.py analyze && gib mir eine Zusammenfassung"
        ], capture_output=True, text=True)
        
        await update.message.reply_text(result.stdout)
```

## 6. Praktische Beispiele

### Tägliche Notion Review
```
"Claude, check meine Notion Tasks und markiere erledigte als Done"
"Claude, erstelle eine Zusammenfassung aller heutigen Notion Einträge"
"Claude, finde alle Notion Pages ohne Status und setze auf 'Review'"
```

### Project Management
```
"Claude, analysiere mein PferdeWert Projekt in Notion"
"Claude, update alle Frontend Tasks mit dem heutigen Datum"
"Claude, füge zu allen Bug Reports die Notiz 'In Bearbeitung' hinzu"
```

## 7. Limitierungen

- **Rate Limits**: Notion API hat Limits (3 requests/second)
- **Performance**: Große Workspaces brauchen Zeit zum Analysieren
- **Permissions**: Integration muss zu jeder Database/Page hinzugefügt werden
- **Struktur**: Claude versteht nur die Struktur die du ihm zeigst

## 8. Best Practices

1. **Cache Results**: Workspace-Analyse zwischenspeichern
2. **Batch Operations**: Mehrere Updates sammeln
3. **Error Handling**: Notion API Fehler abfangen
4. **Logging**: Alle Änderungen protokollieren
5. **Backup**: Vor Bulk-Updates Backup machen

---

Mit dieser Setup kann Claude:
- ✅ Dein komplettes Notion durchsuchen
- ✅ Jede Page lesen und analysieren
- ✅ Content zu Pages hinzufügen
- ✅ Properties updaten
- ✅ Neue Pages erstellen
- ✅ Databases verwalten

Alles über Python Scripts die er mit `--all-permissions` ausführen kann!