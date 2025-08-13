# Whisper Telegram Bot - Kompletter Setup Guide

**Status:** 🚀 Production Ready  
**Ziel:** Voice → Claude Code Integration für PferdeWert Server  
**Ansatz:** Von MVP bis Full Feature in Stufen

---

## 🎯 **Quick Start (MVP - 2 Stunden)**

### Telegram Bot erstellen (5 Min)
```bash
# 1. @BotFather in Telegram öffnen
# 2. /newbot senden
# 3. Name: "Whisper Claude Bot"
# 4. Username: whisper_claude_bot (muss unique sein)
# 5. Token kopieren!
```

### Setup & Installation (10 Min)
```bash
mkdir whisper-telegram-bot
cd whisper-telegram-bot
python3 -m venv venv
source venv/bin/activate
pip install python-telegram-bot openai-whisper python-dotenv

# .env Datei erstellen
echo "TELEGRAM_TOKEN=dein_bot_token_hier" > .env
echo "MY_TELEGRAM_ID=123456789" >> .env  # Deine Telegram ID
```

### Minimaler Bot (voice_bot.py)
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
    # Security Check - NUR DU hast Zugriff!
    if update.message.from_user.id != MY_TELEGRAM_ID:
        await update.message.reply_text("❌ Unauthorized")
        return
    
    # Download & Transcribe
    file = await context.bot.get_file(update.message.voice.file_id)
    await file.download_to_drive("/tmp/voice.ogg")
    
    result = model.transcribe("/tmp/voice.ogg", language="de")
    command = result["text"]
    
    await update.message.reply_text(f"📝 {command}")
    
    # Execute Claude Code
    try:
        result = subprocess.run(
            ["claude", "--all-permissions", command],
            cwd="/home/dev",  # Dein Arbeitsverzeichnis
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

### Bot starten
```bash
python voice_bot.py

# Oder dauerhaft mit screen:
screen -S whisperbot
python voice_bot.py
# Ctrl+A, D zum detachen
```

---

## 🔑 **Technische Konzepte**

### Was ist Subprocess?
**Subprocess** = Python startet externe Programme (wie Claude CLI)

```python
import subprocess

# Statt Terminal: "claude erstelle README"
# Python macht:
result = subprocess.run(["claude", "erstelle README"], capture_output=True, text=True)
print(result.stdout)  # Claude's Antwort
```

**Pipeline:**
```
[Telegram Bot] → subprocess.run() → [Claude CLI] → Antwort → [Telegram Bot]
```

### Single-User Setup (dein Server)
Da du der einzige User bist, braucht der Bot KEINE komplexe Isolation:

```
/home/dev/                    # Arbeitsverzeichnis
    ├── pferdewert/          # Dein Projekt (Claude kann zugreifen)
    ├── .claude/             # Claude Config
    └── whisper-bot/         # Bot arbeitet hier
```

Bot führt Claude genau so aus, als würdest du es selbst in der CLI tippen!

---

## 🚀 **Architektur-Übersicht**

```
[Telegram User] 
    ↓ (Sprachnachricht)
[Telegram Bot]
    ↓ (Audio Download)
[Whisper AI] 
    ↓ (Transkription)
[Claude Code CLI]
    ↓ (Befehlsausführung via subprocess)
[Text Response]
    ↓ (Optional: TTS)
[Telegram User]
```

---

## 💡 **Anti-Over-Engineering (MVP Prinzipien)**

### Was du NICHT brauchst:
- ❌ Docker für MVP
- ❌ Tests für Quick Win
- ❌ Logging Framework → `print()` reicht
- ❌ Error Handling → Basic try/catch
- ❌ Monitoring → Bot läuft oder nicht
- ❌ Systemd → screen/tmux Session
- ❌ User-Isolation → Nur du nutzt den Bot

### Was du brauchst:
- ✅ Ein Python File (`voice_bot.py`)
- ✅ 3-4 Dependencies (`requirements.txt`)
- ✅ Telegram Token (`.env`)
- ✅ Deine Telegram User ID (Security!)

---

## 🛠️ **Erweiterte Features (Optional)**

### 1. PferdeWert Shortcuts
```python
# Häufige Befehle als Keywords
shortcuts = {
    "frontend starten": "cd pferdewert/frontend && npm run dev",
    "backend starten": "cd pferdewert/backend && uvicorn main:app --reload",
    "status": "cd pferdewert && git status",
    "lint": "cd pferdewert/frontend && npm run lint"
}

# In handle_voice() vor Claude Aufruf:
for keyword, actual_command in shortcuts.items():
    if keyword in command.lower():
        command = actual_command
        break
```

### 2. Text-to-Speech (TTS)
```python
# Optional: Sprachantworten
from gtts import gTTS
import io

def text_to_speech(text):
    tts = gTTS(text=text[:200], lang='de')  # Limit für Telegram
    audio_buffer = io.BytesIO()
    tts.write_to_fp(audio_buffer)
    audio_buffer.seek(0)
    return audio_buffer

# In handle_voice() nach Claude Antwort:
if len(output) < 200:  # Nur kurze Texte
    audio = text_to_speech(output)
    await update.message.reply_voice(audio)
```

### 3. Notion Integration
```python
# Erkennung von Notion-Befehlen
if "notion" in command.lower() and "eintrag" in command.lower():
    # Direkt Notion API statt Claude
    notion_client.pages.create(...)
    await update.message.reply_text("✅ Notion Eintrag erstellt")
```

---

## 🔐 **Sicherheit (KRITISCH!)**

### User ID Check
```python
# Deine Telegram User ID finden:
# 1. @userinfobot anschreiben
# 2. /start senden → ID kopieren

MY_TELEGRAM_ID = 123456789  # ERSETZE mit deiner echten ID!

# Check in JEDEM Handler:
if update.message.from_user.id != MY_TELEGRAM_ID:
    return  # Sofort beenden!
```

### Claude Code Permissions
```bash
# Was Claude KANN (ohne sudo):
✅ Dateien in /home/dev bearbeiten
✅ Python/Node.js Scripts ausführen
✅ Git Operationen
✅ npm install, pip install (user/venv)
✅ Development Ports (3000, 8000)

# Was Claude NICHT KANN (braucht sudo + Passwort):
❌ System packages installieren (apt install)
❌ System services verwalten (systemctl)
❌ Firewall ändern (ufw)
❌ /etc Dateien bearbeiten
```

---

## 📱 **Praktische Sprachbefehle**

### PferdeWert Entwicklung:
```
"Claude, zeig mir die Frontend Routes vom pferdewert Projekt"
"Claude, starte npm run dev im pferdewert frontend"
"Claude, fix die TypeScript Fehler"
"Claude, erstelle eine neue Komponente für Pferdebilder"
"Claude, führe git status aus"
"Claude, update die package.json Dependencies"
```

### System Management:
```
"Claude, check den Server Status"
"Claude, zeig mir die laufenden Prozesse"  
"Claude, wie viel Speicher ist frei"
"Claude, analysiere die Log Dateien"
```

### Notion Integration:
```
"Notion Eintrag: Bug - Login funktioniert nicht"
"Füge Task hinzu: Whisper Model upgraden"
"Erstelle Notiz: Idee für Voice Commands"
```

---

## 🔄 **Iterative Entwicklung**

### Woche 1: MVP
- ✅ Voice → Text → Claude → Text
- ✅ Security (User ID Check)
- ✅ Basic Error Handling

### Woche 2: Features
- ✅ PferdeWert Shortcuts
- ✅ Notion Integration
- ✅ Bessere Formatierung

### Woche 3: Polish
- ✅ TTS (optional)
- ✅ Logging für Debugging
- ✅ Performance Optimierung

### Woche 4: Production
- ✅ Systemd Service (falls gewünscht)
- ✅ Monitoring Setup
- ✅ Backup Strategy

**Regel: Jede Woche ein Feature. Nicht mehr.**

---

## 📦 **Dependencies (Minimal)**

```txt
# requirements.txt
python-telegram-bot==20.7
openai-whisper==20231117
python-dotenv==1.0.0

# Optional Erweiterungen:
gtts==2.5.0              # Text-to-Speech
notion-client==2.2.1     # Notion Integration
```

---

## 🆘 **Troubleshooting**

### Bot startet nicht
```bash
# Python Environment prüfen
source venv/bin/activate
python -c "import telegram; print('OK')"

# Token prüfen
grep TELEGRAM_TOKEN .env
```

### Claude Code funktioniert nicht
```bash
# Installation prüfen
which claude
claude --version

# Permissions
chmod +x ~/node_modules/.bin/claude
```

### Sudo Permission Denied
```bash
# Problem: Claude versucht sudo ohne Passwort
# Lösung: Befehle umformulieren

# Schlecht: "installiere nginx systemweit"
# Gut: "erstelle nginx config für user"
```

---

## ⚙️ **Deployment (Production)**

### Mit Screen (Einfach)
```bash
screen -S whisperbot
cd ~/whisper-telegram-bot
source venv/bin/activate
python voice_bot.py
# Ctrl+A, D zum detachen

# Status prüfen:
screen -r whisperbot
```

### Mit Systemd (Advanced)
```ini
# /etc/systemd/system/whisperbot.service
[Unit]
Description=Whisper Telegram Bot
After=network.target

[Service]
Type=simple
User=dev
WorkingDirectory=/home/dev/whisper-telegram-bot
ExecStart=/home/dev/whisper-telegram-bot/venv/bin/python voice_bot.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable whisperbot
sudo systemctl start whisperbot
sudo systemctl status whisperbot
```

---

## 📊 **Monitoring & Wartung**

### Daily Checks
```bash
# Bot Status
ps aux | grep voice_bot.py

# System Resources  
free -h && df -h

# Quick Health Check
curl -s "https://api.telegram.org/bot$TOKEN/getMe"
```

### Weekly Maintenance
```bash
# Updates
git pull origin main
pip install --upgrade -r requirements.txt

# Logs Cleanup
sudo journalctl --vacuum-time=7d
```

---

## 🎯 **Next Steps - Sofort loslegen**

1. **Telegram Bot erstellen** (5 Min)
2. **User ID holen** (@userinfobot)
3. **Code kopieren** (voice_bot.py oben)
4. **Dependencies installieren** (pip install)
5. **Bot starten** (python voice_bot.py)
6. **Erste Sprachnachricht senden** 🎤

**In 30 Minuten hast du einen funktionierenden Voice → Claude Bot!**

---

*Erstellt: 2025-08-13*  
*Status: Production Ready*  
*Server: pferdewert-dev (167.235.233.90)*