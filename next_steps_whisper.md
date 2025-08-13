# Whisper Telegram Bot - Claude Code Integration Plan (UNRESTRICTED)

## Architektur-Übersicht
```
[Telegram User] 
    ↓ (Sprachnachricht)
[Telegram Bot]
    ↓ (Audio Download)
[Whisper API] 
    ↓ (Transkription)
[Claude Code CLI]
    ↓ (Befehlsausführung via subprocess)
[Text-to-Speech]
    ↓ (Audio Generation)
[Telegram User]
    (Text + Sprachantwort)
```

## 🔑 Wichtige Konzepte erklärt

### Was ist Subprocess?
**Subprocess** = Ein Python-Programm startet ein anderes Programm (wie wenn du im Terminal einen Befehl eingibst).

```python
import subprocess

# Statt im Terminal zu tippen: "claude erstelle eine README"
# Machst du in Python:
result = subprocess.run(["claude", "erstelle eine README"], capture_output=True, text=True)
print(result.stdout)  # Claude's Antwort
```

**Visualisierung:**
```
[Telegram Bot Python]
       ↓
   subprocess.run()
       ↓
[Claude Code CLI]  ← Läuft als separater Prozess
       ↓
   Antwort zurück
       ↓
[Telegram Bot Python]
```

### Single-User Setup (für deinen Server)
Da du der einzige User bist und bereits mit Claude Code arbeitest, brauchst du KEINE Ordner-Isolation. Der Bot arbeitet direkt in deinem Home-Verzeichnis:

```
/home/dev/                      # Dein Haupt-Arbeitsverzeichnis
    ├── pferdewert/            # Dein Projekt
    │   ├── frontend/
    │   ├── backend/
    │   └── CLAUDE.md          # Context-Datei verfügbar!
    ├── .claude/               # Claude Code Config
    └── whisper-bot/           # Der Bot
```

Der Bot führt Claude Code genau so aus, als würdest du es selbst in der CLI tippen!

## Phase 1: Grundsetup (Tag 1)

### 1.1 Telegram Bot erstellen
- [ ] Bot bei @BotFather registrieren
- [ ] Bot Token sichern in `.env`
- [ ] Webhook oder Polling entscheiden (Empfehlung: Polling für lokale Entwicklung)

### 1.2 Projektstruktur
```
/whisper-telegram-bot/
├── .env                    # Secrets
├── config.py              # Konfiguration
├── main.py                # Haupteinstiegspunkt
├── requirements.txt       # Dependencies
├── modules/
│   ├── telegram_handler.py   # Telegram Bot Logic
│   ├── whisper_client.py     # Whisper Integration
│   ├── claude_executor.py    # Claude Code Ausführung
│   └── tts_generator.py      # Text-to-Speech
├── utils/
│   ├── audio_processor.py    # Audio Konvertierung
│   └── security.py          # Sicherheitsfilter
└── logs/
    └── bot.log           # Logging
```

## Phase 2: Core Komponenten (Tag 2-3)

### 2.1 Telegram Handler (`telegram_handler.py`)
```python
# Kernfunktionen:
- Voice Message empfangen
- Audio als temporäre Datei speichern
- Antworten senden (Text + Voice)
- User-Authentifizierung (nur erlaubte User IDs)
- Rate Limiting implementieren
```

### 2.2 Whisper Integration (`whisper_client.py`)
**Option A: OpenAI API**
- Pros: Einfach, zuverlässig
- Cons: Kosten, Latenz
- Implementation: `openai.Audio.transcribe()`

**Option B: Lokales Whisper**
- Pros: Kostenlos, privat
- Cons: GPU/CPU intensive
- Implementation: `whisper` Python Package

**Empfehlung**: Start mit lokalem Whisper (small model)

### 2.3 Claude Code Executor (`claude_executor.py`)

#### Minimale Single-User Version:
```python
import subprocess
import os

class ClaudeExecutor:
    def __init__(self):
        # Arbeitet direkt in deinem Home-Verzeichnis
        self.working_dir = "/home/dev"
        
    async def execute(self, command: str):
        """Führt Claude Code aus - genau wie in deiner CLI"""
        try:
            result = subprocess.run(
                ["claude", "--all-permissions", command],
                cwd=self.working_dir,  # Gleicher Ort wie deine IDE
                capture_output=True,
                text=True,
                timeout=60
            )
            return result.stdout
        except subprocess.TimeoutExpired:
            return "⏱️ Command timed out after 60 seconds"
```

#### Erweiterte Version mit Streaming:
```python
import asyncio

class ClaudeExecutor:
    def __init__(self):
        self.working_dir = "/home/dev"
        
    async def execute_with_streaming(self, command: str):
        """Führt Claude aus und streamt Output"""
        process = await asyncio.create_subprocess_exec(
            "claude", "--all-permissions", command,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=self.working_dir
        )
        
        # Output lesen
        stdout, stderr = await process.communicate()
        
        return {
            "output": stdout.decode(),
            "error": stderr.decode(),
            "return_code": process.returncode
        }
```

**Betriebsmodus:**
- **Full Access**: Alle Claude Code Befehle erlaubt
- **Gleiche Permissions**: Wie wenn du selbst tippst
- **Kein User-Management**: Nur du hast Zugriff (Telegram ID Check)

## Phase 3: User Management & Logging (Tag 4)

### 3.1 User-Authentifizierung (KRITISCH!)

#### So findest du deine Telegram User ID:
1. **Option A:** Schreibe `/start` an @userinfobot
2. **Option B:** Sende Nachricht an @RawDataBot (zeigt JSON mit ID)
3. **Option C:** Lass Bot erste Nachricht loggen: `print(update.message.from_user.id)`

### 3.2 User ID Check Implementation
```python
# KRITISCH - Ohne diesen Check hat JEDER Zugriff!
ALLOWED_USERS = [123456789]  # ERSETZE mit deiner echten Telegram ID!

async def handle_voice(update, context):
    user_id = update.message.from_user.id
    
    # ⚠️ WICHTIGSTER SICHERHEITSCHECK ⚠️
    if user_id not in ALLOWED_USERS:
        await update.message.reply_text("❌ Unauthorized")
        # Optional: Log unauthorized access attempt
        logging.warning(f"Unauthorized access from {user_id}")
        return
    
    # Ab hier: Volle Claude Code Permissions!
    audio_file = await download_voice(update.message.voice)
    text = whisper_transcribe(audio_file)
    result = await claude_execute(text)  # --all-permissions
    # ...
```

### 3.3 Audit Logging
- Alle Befehle mit Timestamp + User ID
- Fehler und Exceptions
- Sicherheitsverletzungen

## Phase 4: TTS Integration (Tag 5)

### 4.1 Text-to-Speech Optionen
**Option A: gTTS (Google)**
- Einfach, kostenlos
- `pip install gtts`

**Option B: Azure TTS**
- Bessere Qualität, mehr Stimmen
- Kosten

**Option C: Coqui TTS (lokal)**
- Open Source, privacy-friendly
- GPU intensive

**Empfehlung**: Start mit gTTS

### 4.2 Audio Pipeline
1. Claude Output → Text aufbereiten
2. Lange Texte splitten (Telegram Limit: 1MB Audio)
3. TTS Generation
4. Audio Format: OGG Opus (Telegram optimiert)

## Phase 5: Advanced Features (Tag 6-7)

### 5.1 Konversationskontext
- Session Management
- Kontextspeicherung zwischen Nachrichten
- "Fortsetzung" von Befehlen

### 5.2 Feedback Loop
```python
# Nach Ausführung:
- "War das hilfreich?" Buttons
- Fehlerkorrektur bei Whisper
- Befehl wiederholen/modifizieren
```

### 5.3 Batch Processing
- Mehrere Befehle in einer Nachricht
- Sequenzielle Ausführung
- Fehlerbehandlung pro Befehl

## Phase 6: Deployment (Tag 8)

### 6.1 Systemd Service
```ini
[Unit]
Description=Whisper Telegram Bot
After=network.target

[Service]
Type=simple
User=botuser
WorkingDirectory=/opt/whisper-telegram-bot
ExecStart=/usr/bin/python3 main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### 6.2 Monitoring
- Health Checks
- Prometheus Metrics
- Alerting bei Fehlern

## Technische Anforderungen

### Dependencies
```txt
python-telegram-bot==20.7
openai-whisper==20231117
gtts==2.5.0
python-dotenv==1.0.0
subprocess32==3.5.4
asyncio==3.4.3
pydantic==2.5.0
```

### System Requirements
- Python 3.9+
- 4GB RAM minimum (8GB für lokales Whisper)
- FFmpeg für Audio Processing
- Claude Code CLI installiert und konfiguriert

## Sicherheitshinweise (UNRESTRICTED VERSION)

### Da du ALLE Permissions willst:
1. **NUR DU** solltest Zugriff haben (Telegram User ID Check!)
2. Bot läuft mit deinen User-Rechten (nicht root)
3. Sudo geht nicht (Passwort erforderlich)
4. Claude Code hat `--all-permissions` Flag

### Minimale Sicherheit:
1. **User-Authentifizierung ist PFLICHT** (nur deine Telegram ID)
2. Logging aller Aktionen für Nachvollziehbarkeit
3. Backup wichtiger Daten vor Bot-Nutzung
4. Bot NIEMALS öffentlich machen
5. Token/Secrets sicher verwahren

## Beispiel-Workflows

### Allgemeiner Workflow:
```python
# User sendet Sprachnachricht:
"Claude, erstelle eine FastAPI App mit User Authentication"

# Bot Verarbeitung:
1. Audio Download → /tmp/voice_123.ogg
2. Whisper: "Claude, erstelle eine FastAPI App mit User Authentication"
3. User Check: ✓ (deine Telegram ID)
4. Execute: claude --all-permissions "erstelle eine FastAPI App mit User Authentication"
5. Claude Code: 
   - Erstellt Projektstruktur
   - Schreibt Code-Dateien
   - Installiert Dependencies
   - Gibt detaillierte Antwort
6. TTS Generation → /tmp/response_123.ogg (gekürzte Version)
7. Send to Telegram: 
   - Vollständige Textantwort (ggf. aufgeteilt)
   - Sprachnachricht mit Zusammenfassung
```

### PferdeWert-spezifische Beispiele:

#### Sprachbefehle für dein Projekt:
```python
# Frontend-Befehle:
"Claude, zeig mir die Frontend Routes vom pferdewert Projekt"
"Claude, starte npm run dev im pferdewert frontend"
"Claude, fix die TypeScript Fehler im frontend"
"Claude, erstelle eine neue Komponente für Pferdebilder-Upload"

# Backend-Befehle:
"Claude, zeig mir den MongoDB Connection Code"
"Claude, erstelle einen neuen API Endpoint für Rasse-Filter"
"Claude, teste die FastAPI Routes"
"Claude, check die Backend Logs"

# Wartung:
"Claude, mach ein git status im pferdewert Projekt"
"Claude, führe npm run lint aus und fix die Fehler"
"Claude, zeig mir die CLAUDE.md vom pferdewert"

# Integration:
"Claude, wie ist die Stripe Integration implementiert?"
"Claude, update die Dependencies im package.json"
```

#### Praktischer Code für pferdewert Integration:
```python
# voice_bot.py - Angepasst für pferdewert
import os
import subprocess
import whisper
from telegram.ext import Application, MessageHandler, filters

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
MY_TELEGRAM_ID = 123456789  # Deine ID
WORKING_DIR = "/home/dev"    # Wo pferdewert liegt

model = whisper.load_model("base")

async def handle_voice(update, context):
    if update.message.from_user.id != MY_TELEGRAM_ID:
        return
    
    # Audio → Text
    file = await context.bot.get_file(update.message.voice.file_id)
    await file.download_to_drive("/tmp/voice.ogg")
    result = model.transcribe("/tmp/voice.ogg", language="de")
    command = result["text"]
    
    # Spezial-Keywords für häufige Aktionen
    shortcuts = {
        "frontend starten": "cd pferdewert/frontend && npm run dev",
        "backend starten": "cd pferdewert/backend && uvicorn main:app --reload",
        "status": "cd pferdewert && git status",
        "lint": "cd pferdewert/frontend && npm run lint"
    }
    
    # Check für Shortcuts
    for keyword, actual_command in shortcuts.items():
        if keyword in command.lower():
            command = actual_command
            break
    
    # Claude ausführen
    await update.message.reply_text(f"🤖 Führe aus: {command[:100]}...")
    
    result = subprocess.run(
        ["claude", "--all-permissions", command],
        cwd=WORKING_DIR,
        capture_output=True,
        text=True,
        timeout=120  # 2 Min für längere Operationen
    )
    
    # Antwort senden
    if result.stdout:
        # Bei langen Outputs aufteilen
        output = result.stdout
        if len(output) > 4000:
            chunks = [output[i:i+4000] for i in range(0, len(output), 4000)]
            for i, chunk in enumerate(chunks[:3]):  # Max 3 Nachrichten
                await update.message.reply_text(f"```\n{chunk}\n```", parse_mode='Markdown')
        else:
            await update.message.reply_text(f"```\n{output}\n```", parse_mode='Markdown')

app = Application.builder().token(TELEGRAM_TOKEN).build()
app.add_handler(MessageHandler(filters.VOICE, handle_voice))
app.run_polling()
```

## Testing Checklist

### Funktional:
- [ ] Spracherkennung verschiedene Sprachen
- [ ] Lange Befehle (>1 Min Audio)
- [ ] Fehlerhafte Audio-Qualität
- [ ] Mehrere gleichzeitige User
- [ ] Netzwerkunterbrechungen

### Sicherheit:
- [ ] Injection Attempts
- [ ] Unauthorized User Access
- [ ] Resource Exhaustion
- [ ] Path Traversal
- [ ] Command Chaining

### Performance:
- [ ] Response Time <5s für normale Befehle
- [ ] Memory Usage <500MB idle
- [ ] CPU Usage <20% idle
- [ ] Concurrent Users: 10+

## Nächste Schritte - Quick Start

### 1. Bot erstellen (5 Minuten)
```bash
# Telegram:
1. Öffne @BotFather
2. Sende: /newbot
3. Name: "Whisper Claude Bot" (oder was du willst)
4. Username: whisper_claude_bot (muss unique sein)
5. Kopiere den Token!
```

### 2. Deine User ID holen (2 Minuten)
```bash
# Telegram:
1. Schreibe /start an @userinfobot
2. Kopiere deine numerische ID (z.B. 123456789)
```

### 3. Projekt Setup (10 Minuten)
```bash
mkdir whisper-telegram-bot
cd whisper-telegram-bot
python3 -m venv venv
source venv/bin/activate
pip install python-telegram-bot openai-whisper python-dotenv

# .env Datei:
echo "TELEGRAM_TOKEN=dein_bot_token_hier" > .env
echo "MY_TELEGRAM_ID=123456789" >> .env  # Deine echte ID!
```

### 4. Minimaler Bot (voice_bot.py):
```python
#!/usr/bin/env python3
import os
import subprocess
import whisper
from dotenv import load_dotenv
from telegram.ext import Application, MessageHandler, filters

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
MY_TELEGRAM_ID = int(os.getenv("MY_TELEGRAM_ID"))
model = whisper.load_model("base")

async def handle_voice(update, context):
    # Security Check
    if update.message.from_user.id != MY_TELEGRAM_ID:
        await update.message.reply_text("❌ Unauthorized")
        return
    
    # Download & Transcribe
    file = await context.bot.get_file(update.message.voice.file_id)
    await file.download_to_drive("/tmp/voice.ogg")
    
    result = model.transcribe("/tmp/voice.ogg", language="de")
    command = result["text"]
    
    await update.message.reply_text(f"📝 {command}")
    
    # Execute Claude
    try:
        result = subprocess.run(
            ["claude", "--all-permissions", command],
            cwd="/home/dev",
            capture_output=True,
            text=True,
            timeout=60
        )
        
        output = result.stdout or "Keine Ausgabe"
        await update.message.reply_text(output[:4000])
        
    except Exception as e:
        await update.message.reply_text(f"❌ Fehler: {str(e)}")

# Start Bot
app = Application.builder().token(TELEGRAM_TOKEN).build()
app.add_handler(MessageHandler(filters.VOICE, handle_voice))
print(f"🤖 Bot läuft! Nur User {MY_TELEGRAM_ID} hat Zugriff.")
app.run_polling()
```

### 5. Bot starten:
```bash
python voice_bot.py
# Oder mit screen für dauerhaften Betrieb:
screen -S whisperbot
python voice_bot.py
# Ctrl+A, D zum Detachen
```

### 6. MVP Timeline:
- **Jetzt**: Bot läuft mit Voice → Claude → Text
- **Optional später**: TTS für Sprachantworten
- **Bei Bedarf**: Shortcuts für häufige Befehle

## 🔗 Notion Integration (WICHTIG!)

### Problem: MCP funktioniert NICHT auf Server
- MCP Server laufen nur mit Claude Desktop App (lokal)
- Claude CLI auf Server hat keine MCP Unterstützung
- Lösung: Direct Notion API Integration in Python

### Lösung 1: Python Notion Client (EMPFOHLEN)
```python
# pip install notion-client
from notion_client import Client
import os

class NotionIntegration:
    def __init__(self):
        self.notion = Client(auth=os.getenv("NOTION_TOKEN"))
        self.database_id = os.getenv("NOTION_DATABASE_ID")
    
    def add_entry(self, title: str, content: str, tags: list = None):
        """Fügt Eintrag zu Notion Database hinzu"""
        response = self.notion.pages.create(
            parent={"database_id": self.database_id},
            properties={
                "Name": {"title": [{"text": {"content": title}}]},
                "Tags": {"multi_select": [{"name": tag} for tag in (tags or [])]},
                "Status": {"select": {"name": "New"}}
            },
            children=[
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [{"type": "text", "text": {"content": content}}]
                    }
                }
            ]
        )
        return response
```

### Integration in Whisper Bot:
```python
# voice_bot.py - Mit Notion Integration
import re
from notion_client import Client

class WhisperClaudeBot:
    def __init__(self):
        self.notion = Client(auth=os.getenv("NOTION_TOKEN"))
        self.notion_db = os.getenv("NOTION_DATABASE_ID")
    
    async def handle_voice(self, update, context):
        # ... Whisper Transcription ...
        command = result["text"]
        
        # Notion-Befehle erkennen
        notion_pattern = r"(?:notion|notiz|eintrag).*(?:hinzufügen|erstellen|speichern)"
        
        if re.search(notion_pattern, command.lower()):
            # Spezial-Behandlung für Notion
            await self.handle_notion_command(command, update)
        else:
            # Normal an Claude weiterleiten
            await self.execute_claude(command, update)
    
    async def handle_notion_command(self, command, update):
        """Verarbeitet Notion-spezifische Befehle"""
        
        # Beispiel: "Notion Eintrag: Meeting Notes - Diskutiert Feature X"
        if ":" in command:
            _, content = command.split(":", 1)
            
            # Titel extrahieren (erste Zeile oder bis -)
            parts = content.strip().split("-", 1)
            title = parts[0].strip()
            body = parts[1].strip() if len(parts) > 1 else ""
            
            # Zu Notion hinzufügen
            try:
                self.notion.pages.create(
                    parent={"database_id": self.notion_db},
                    properties={
                        "Name": {"title": [{"text": {"content": title}}]},
                        "Source": {"select": {"name": "Voice Bot"}},
                        "Date": {"date": {"start": datetime.now().isoformat()}}
                    },
                    children=[
                        {
                            "object": "block",
                            "type": "paragraph", 
                            "paragraph": {
                                "rich_text": [{"text": {"content": body}}]
                            }
                        }
                    ]
                )
                await update.message.reply_text(f"✅ Notion Eintrag erstellt: {title}")
                
            except Exception as e:
                await update.message.reply_text(f"❌ Notion Fehler: {str(e)}")
```

### Lösung 2: Claude + Python Script Kombination
```python
# notion_helper.py - Separates Script
#!/usr/bin/env python3
import sys
from notion_client import Client

def add_to_notion(title, content):
    notion = Client(auth="YOUR_NOTION_TOKEN")
    # ... Notion API calls ...
    print(f"Added: {title}")

if __name__ == "__main__":
    add_to_notion(sys.argv[1], sys.argv[2])
```

Dann kannst du Claude sagen:
```python
"Claude, führe aus: python notion_helper.py 'Titel' 'Inhalt'"
```

### Lösung 3: Hybrid-Ansatz (BESTE FLEXIBILITÄT)
```python
class SmartCommandRouter:
    def __init__(self):
        self.notion = NotionIntegration()
        self.claude_executor = ClaudeExecutor()
        
    async def route_command(self, command: str):
        """Entscheidet ob Notion API oder Claude CLI"""
        
        # Direkte Notion Actions
        notion_keywords = ["notion", "notiz", "todo", "task"]
        
        if any(kw in command.lower() for kw in notion_keywords):
            # Beispiele:
            # "Füge zu Notion hinzu: Meeting um 15 Uhr"
            # "Erstelle Task: Frontend Bugs fixen"
            
            if "hinzu" in command or "erstelle" in command:
                return await self.create_notion_entry(command)
            elif "zeige" in command or "liste" in command:
                return await self.list_notion_entries()
        
        # Alles andere → Claude
        return await self.claude_executor.execute(command)
```

### Setup für Notion:

1. **Notion API Token holen:**
   - Gehe zu https://www.notion.so/my-integrations
   - Create new integration
   - Kopiere den "Internal Integration Token"

2. **Database ID finden:**
   - Öffne deine Notion Database
   - URL: `https://notion.so/abc123def456...`
   - Die ID ist: `abc123def456`

3. **Integration aktivieren:**
   - In Notion: Database → ⋯ Menu → Add connections
   - Wähle deine Integration

4. **In .env hinzufügen:**
```bash
NOTION_TOKEN=secret_abc123...
NOTION_DATABASE_ID=abc123def456...
```

### Beispiel-Sprachbefehle:
```
"Notion Eintrag: Bug - Login funktioniert nicht mit Umlauten"
"Füge Task hinzu: Whisper Model auf large upgraden"
"Erstelle Notiz: Idee für neues Feature - Voice Commands"
"Claude, zeige mir meine letzten Notion Einträge"
```

## Notizen

- Claude Code muss mit `--all-permissions` Flag laufen
- Bot sollte auf separatem User laufen (nicht root!)
- Backup-Strategie für Konversationslogs
- Rate Limiting ist essentiell gegen Abuse
- Notion Integration via Direct API (MCP geht nicht auf Server!)
- Überlegen: Web-UI für Administration?

---
*Erstellt: 2025-08-12*
*Status: Planungsphase*
*Priorität: Hoch*