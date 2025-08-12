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
    ↓ (Befehlsausführung)
[Text-to-Speech]
    ↓ (Audio Generation)
[Telegram User]
    (Text + Sprachantwort)
```

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
```python
# UNRESTRICTED MODE - Alle Permissions!
- Direkte Weiterleitung an Claude Code CLI
- claude --all-permissions Flag verwenden
- Keine Command-Filterung (außer sudo mit PW)
- Timeout für lange Operationen (optional)
- Output Streaming für lange Antworten
```

**Betriebsmodus:**
- **Full Access**: Alle Claude Code Befehle erlaubt
- **Keine Whitelist**: Direkte Befehlsausführung
- **Sudo-Limitierung**: Nur durch fehlendes Passwort

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

## Beispiel-Workflow (UNRESTRICTED)

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

# User erhält:
- Detaillierte Textnachricht was gemacht wurde
- Sprachnachricht mit Kurzzusammenfassung
- Dateien wurden tatsächlich erstellt/geändert
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
pip install python-telegram-bot openai-whisper gtts python-dotenv

# .env Datei:
echo "TELEGRAM_TOKEN=dein_bot_token_hier" > .env
echo "USER_ID=deine_telegram_id_hier" >> .env
```

### 4. MVP starten
- **Heute**: Basic Bot mit Voice → Text → Claude → Text
- **Morgen**: TTS hinzufügen für Voice-Antworten
- **Diese Woche**: Vollständige Integration

## Notizen

- Claude Code muss mit `--all-permissions` Flag laufen
- Bot sollte auf separatem User laufen (nicht root!)
- Backup-Strategie für Konversationslogs
- Rate Limiting ist essentiell gegen Abuse
- Überlegen: Web-UI für Administration?

---
*Erstellt: 2025-08-12*
*Status: Planungsphase*
*Priorität: Hoch*