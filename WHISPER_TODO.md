# TODO: Whisper Voice Bot - Quick Win Setup

**Status:** ✅ Funktioniert  
**Ziel:** Simple Telegram Bot mit Whisper für PferdeWert Commands  
**Zeit:** ✅ Setup abgeschlossen, läuft produktiv

-----

## ✅ Minimal Viable Bot (MVP) - ERLEDIGT

### Quick Setup (2-3 Stunden) ✅

- [x] **Telegram Bot erstellen** (@BotFather → Token)
- [x] **Ein Python File** (`voice_bot.py`)
- [x] **Whisper lokal installieren** (`pip install openai-whisper`)
- [x] **Voice Message → Text** (Basis-Funktionalität)

### Code-Struktur (Keep it Simple!)

```
voice_bot.py    # Alles in einer Datei!
requirements.txt # Nur 3-4 Dependencies
.env            # Token + Keys
README.md       # Quick Start Guide
```

-----

## ✅ Quick Wins (ALLE ERLEDIGT)

### 1. Hello World (30 Min) ✅

```python
# voice_bot.py - Funktioniert!
import telebot
import whisper

bot = telebot.TeleBot("DEIN_TOKEN")
model = whisper.load_model("base")

@bot.message_handler(content_types=['voice'])
def voice_to_text(message):
    # Audio → Text → Reply
    bot.reply_to(message, "Ich höre: [transkribierter Text]")

bot.infinity_polling()
```

### 2. Command Detection (1 Stunde) ✅

- [x] Simple Keywords erkennen ("claude", "notion", "status")
- [x] Basic Response je nach Keyword

### 3. Notion Integration (2 Stunden) ✅

- [x] Notion API integriert
- [x] Tagebuch- und Ideen-Einträge funktionieren
- [x] Voice Commands → Notion Pages

### 4. Deploy auf Hetzner (1 Stunde) ✅

- [x] `screen -S voicebot python voice_bot.py`
- [x] Läuft produktiv auf Hetzner Server

-----

## 💡 Anti-Over-Engineering Rules

- **Ein File** bis es wirklich zu groß wird
- **Keine Docker** für MVP
- **Keine Tests** für Quick Win
- **Keine Logging-Framework** → print() reicht
- **Keine Error-Handling** für MVP
- **Keine Monitoring** → Bot läuft oder nicht
- **Keine Systemd** → screen/tmux Session

-----

## ✅ Iterative Erweiterung - ABGESCHLOSSEN

**Woche 1:** ✅ Bot reagiert auf Voice  
**Woche 2:** ✅ Notion Integration implementiert  
**Woche 3:** ✅ Erweiterte Voice Commands  
**Woche 4:** ✅ Produktiver Einsatz

**Status:** Bot läuft stabil und wird täglich genutzt!

-----

## 📦 Minimal Dependencies

```txt
pyTelegramBotAPI==4.14.0
openai-whisper==20231117
requests==2.31.0
# Das wars!
```

-----

## 🎪 Quick Start Commands

```bash
# Setup (5 Minuten)
pip install -r requirements.txt
echo "TELEGRAM_TOKEN=dein_token" > .env
python voice_bot.py

# Deploy (2 Minuten)
scp voice_bot.py user@hetzner:/home/user/
ssh user@hetzner "screen -S bot python voice_bot.py"
```

**Done. Bot läuft. Iterate from there.**