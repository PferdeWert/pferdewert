# TODO: Whisper Voice Bot - Quick Win Setup

**Status:** 🚀 Ready to Code  
**Ziel:** Simple Telegram Bot mit Whisper für PferdeWert Commands  
**Zeit:** 1-2 Tage Setup, dann iterativ ausbauen

-----

## 🎯 Minimal Viable Bot (MVP)

### Quick Setup (2-3 Stunden)

- [ ] **Telegram Bot erstellen** (@BotFather → Token)
- [ ] **Ein Python File** (`voice_bot.py`)
- [ ] **Whisper lokal installieren** (`pip install openai-whisper`)
- [ ] **Voice Message → Text** (Basis-Funktionalität)

### Code-Struktur (Keep it Simple!)

```
voice_bot.py    # Alles in einer Datei!
requirements.txt # Nur 3-4 Dependencies
.env            # Token + Keys
README.md       # Quick Start Guide
```

-----

## 🔥 Quick Wins (Reihenfolge)

### 1. Hello World (30 Min)

```python
# voice_bot.py - Minimalversion
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

### 2. Command Detection (1 Stunde)

- [ ] Simple Keywords erkennen ("claude", "notion", "status")
- [ ] Basic Response je nach Keyword

### 3. Eine Integration (2 Stunden)

- [ ] Entweder Notion ODER Claude Code - nicht beide gleichzeitig!
- [ ] Eine API, eine Funktion, fertig

### 4. Deploy auf Hetzner (1 Stunde)

- [ ] `screen -S voicebot python voice_bot.py`
- [ ] Läuft. Punkt.

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

## 🚀 Iterative Erweiterung

**Woche 1:** Bot reagiert auf Voice  
**Woche 2:** Eine sinnvolle Integration  
**Woche 3:** Zweite Integration  
**Woche 4:** Refactoring falls nötig

Jede Woche ein Feature. Nicht mehr.

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