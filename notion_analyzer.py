#!/usr/bin/env python3
# notion_analyzer.py - Claude kann das ausführen!

import os
import json
from notion_client import Client
from datetime import datetime, timedelta
from typing import List, Dict, Any
import sys

class NotionAnalyzer:
    def __init__(self):
        token = os.getenv("NOTION_TOKEN")
        if not token:
            raise ValueError("NOTION_TOKEN environment variable is required")
        self.notion = Client(auth=token)
    
    def search_all_pages(self, query: str = None):
        """Durchsucht alle Notion Pages"""
        try:
            response = self.notion.search(
                query=query,
                filter={"property": "object", "value": "page"},
                page_size=100
            )
            return response['results']
        except Exception as e:
            print(f"Error searching pages: {str(e)}")
            return []
    
    def get_page_content(self, page_id: str):
        """Holt kompletten Inhalt einer Page"""
        try:
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
        except Exception as e:
            print(f"Error getting page content: {str(e)}")
            return None
    
    def update_page(self, page_id: str, updates: Dict):
        """Updated Properties einer Page"""
        try:
            return self.notion.pages.update(
                page_id=page_id,
                properties=updates
            )
        except Exception as e:
            print(f"Error updating page: {str(e)}")
            return None
    
    def append_to_page(self, page_id: str, content: str):
        """Fügt Content zu einer Page hinzu"""
        try:
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
        except Exception as e:
            print(f"Error appending to page: {str(e)}")
            return None
    
    def analyze_workspace(self):
        """Analysiert das gesamte Notion Workspace"""
        stats = {
            'total_pages': 0,
            'databases': [],
            'recent_updates': [],
            'page_types': {}
        }
        
        try:
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
                try:
                    pages = self.notion.databases.query(database_id=db['id'])
                    stats['total_pages'] += len(pages['results'])
                except Exception as e:
                    print(f"Warning: Could not query database {db['id']}: {str(e)}")
                    continue
            
            return stats
        except Exception as e:
            print(f"Error analyzing workspace: {str(e)}")
            return stats

    def analyze_weekly_summary(self):
        """Analysiert was diese Woche geplant/gemacht wurde"""
        try:
            # Suche alle Pages der letzten 7 Tage
            week_ago = datetime.now() - timedelta(days=7)
            
            # Search recent pages
            recent_pages = self.search_all_pages()
            
            summary = {
                'total_pages': len(recent_pages),
                'projects': [],
                'todos': [],
                'completed': []
            }
            
            for page in recent_pages[:20]:  # Limit für Performance
                title = self._get_title(page)
                
                # Einfache Kategorisierung
                if 'projekt' in title.lower() or 'project' in title.lower():
                    summary['projects'].append(title)
                elif 'todo' in title.lower() or 'task' in title.lower():
                    summary['todos'].append(title) 
                elif '✅' in title or 'done' in title.lower():
                    summary['completed'].append(title)
            
            return summary
            
        except Exception as e:
            print(f"❌ Fehler bei Weekly Summary: {str(e)}")
            return None
    
    def _get_title(self, page_or_db):
        """Extrahiert Titel aus Notion Object"""
        try:
            if 'title' in page_or_db:
                if isinstance(page_or_db['title'], list) and page_or_db['title']:
                    return page_or_db['title'][0].get('plain_text', 'Untitled')
            
            # Fallback für Pages mit properties
            if 'properties' in page_or_db:
                for prop_name, prop_value in page_or_db['properties'].items():
                    if prop_value.get('type') == 'title':
                        title_list = prop_value.get('title', [])
                        if title_list:
                            return title_list[0].get('plain_text', 'Untitled')
            
            return 'Untitled'
        except Exception as e:
            print(f"Error getting title: {str(e)}")
            return 'Untitled'

# CLI Interface für Claude
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python notion_analyzer.py [command] [args]")
        print("Commands:")
        print("  search <query> - Search all pages")
        print("  analyze - Analyze entire workspace")
        print("  weekly - Weekly summary")
        print("  get <page_id> - Get page content")
        print("  update <page_id> <property> <value> - Update page")
        print("  append <page_id> <content> - Append to page")
        sys.exit(1)
    
    try:
        analyzer = NotionAnalyzer()
        command = sys.argv[1]
        
        if command == "analyze":
            result = analyzer.analyze_workspace()
            print(json.dumps(result, indent=2))
            
        elif command == "weekly":
            summary = analyzer.analyze_weekly_summary()
            if summary:
                print("📊 **Weekly Summary:**")
                print(f"📄 Total Pages: {summary['total_pages']}")
                print(f"🚀 Projects: {', '.join(summary['projects'][:5])}")
                print(f"📝 TODOs: {', '.join(summary['todos'][:5])}")  
                print(f"✅ Completed: {', '.join(summary['completed'][:5])}")
            
        elif command == "search" and len(sys.argv) > 2:
            query = " ".join(sys.argv[2:])
            results = analyzer.search_all_pages(query)
            for page in results:
                print(f"📄 {analyzer._get_title(page)} (ID: {page['id']})")
                
        elif command == "get" and len(sys.argv) > 2:
            page_id = sys.argv[2]
            content = analyzer.get_page_content(page_id)
            if content:
                print(json.dumps(content, indent=2))
            
        elif command == "append" and len(sys.argv) > 3:
            page_id = sys.argv[2]
            content = " ".join(sys.argv[3:])
            result = analyzer.append_to_page(page_id, content)
            if result:
                print(f"✅ Added content to page {page_id}")
            
        elif command == "update" and len(sys.argv) > 4:
            page_id = sys.argv[2]
            prop = sys.argv[3]
            value = sys.argv[4]
            updates = {prop: {"title": [{"text": {"content": value}}]}}
            result = analyzer.update_page(page_id, updates)
            if result:
                print(f"✅ Updated {prop} on page {page_id}")
            else:
                print(f"❌ Failed to update {prop} on page {page_id}")
        else:
            print("❌ Invalid command or missing arguments")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)