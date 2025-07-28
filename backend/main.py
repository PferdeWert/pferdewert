# main.py – PferdeWert API mit Claude + GPT Parallel-Bewertung
import os
import logging
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import anthropic

import tiktoken  # Token-Zähler

# ───────────────────────────────
#  Initialisierung & Konfiguration
# ───────────────────────────────
load_dotenv()

# API Keys
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
CLAUDE_KEY = os.getenv("ANTHROPIC_API_KEY")

# Model Settings
MODEL_ID = os.getenv("PW_MODEL", "gpt-4o")
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")
USE_CLAUDE = os.getenv("USE_CLAUDE", "false").lower() == "true"

# Initialize clients
openai_client = OpenAI(api_key=OPENAI_KEY) if OPENAI_KEY else None
claude_client = anthropic.Anthropic(api_key=CLAUDE_KEY) if CLAUDE_KEY else None

# Token counting
ENC = tiktoken.encoding_for_model(MODEL_ID) if OPENAI_KEY else None
CTX_MAX = 128_000
MAX_COMPLETION = int(os.getenv("PFERDEWERT_MAX_COMPLETION", 800))

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logging.info(f"OpenAI-key: {'✅' if OPENAI_KEY else '❌'} | Claude-key: {'✅' if CLAUDE_KEY else '❌'} | Model: {MODEL_ID} | Use Claude: {USE_CLAUDE}")

def tokens_in(msgs: list[dict]) -> int:
    """Hilfsfunktion: zählt Tokens in OpenAI-Messages."""
    if not ENC:
        return 0
    total = 0
    for m in msgs:
        total += 4  # fixer Overhead pro Message
        total += len(ENC.encode(m["content"]))
    return total + 2  # Abschluss-Tokens

# ───────────────────────────────
#  System Prompts
# ───────────────────────────────

# Original GPT Prompt (für Vergleich)
GPT_SYSTEM_PROMPT = os.getenv(
    "SYSTEM_PROMPT",
    """Du bist **PferdeWert AI**, eine hochspezialisierte Expert:innen-KI für Markt- und Preisbewertungen von Sport- und Zuchtpferden.

**DEINE AUFGABE:** Erstelle eine professionelle, strukturierte Bewertung basierend auf den bereitgestellten Pferdedaten.

**AUSGABEFORMAT:**

### Zusammenfassung
[Kurze Einschätzung des Pferdes in 2-3 Sätzen]

### Marktbewertung
**Geschätzter Marktwert:** [X.XXX - X.XXX €]

[Begründung der Preisschätzung basierend auf Rasse, Alter, Ausbildung, etc.]

### Bewertungsfaktoren
- **Rasse & Abstammung:** [Bewertung]
- **Alter & Ausbildungsstand:** [Bewertung] 
- **Potenzial & Verwendung:** [Bewertung]

### Empfehlungen
- [Konkrete Handlungsempfehlungen]
- [Vermarktungshinweise]

**WICHTIG:** 
- Preise in Euro, realistisch für deutschen Markt
- Berücksichtige aktuelle Markttrends
- Begründe alle Einschätzungen sachlich"""
)

# Optimierter Claude Prompt (für Kunden)
CLAUDE_SYSTEM_PROMPT = """Du bist **PferdeWert AI**, eine hochspezialisierte Expert:innen-KI für Markt- und Preisbewertungen von Sport- und Zuchtpferden.

WICHTIG - SCHREIBSTIL:
Schreibe im Stil von ChatGPT/GPT-4o - das bedeutet:
- Emotional und verkaufsorientiert
- Verwende Begriffe wie "erheblich steigert", "hohes Wertpotenzial", "außergewöhnlich"
- Betone positive Aspekte mit starken Adjektiven
- Verwende Marketing-Sprache: "Bieterinteresse", "optimale Präsentation", "starke Turnierpräsenz"
- Beschreibe Vermarktungswege lebendig: "Auktion mit starkem Bieterinteresse"
- Nutze emotionale Verstärker: "beeindruckend", "vielversprechend", "exzellent"

**AUSGABEFORMAT:**

### Zusammenfassung
[Kurze, emotionale Einschätzung des Pferdes in 2-3 Sätzen mit positiven Verstärkern]

### Marktbewertung
**Geschätzter Marktwert:** [X.XXX - X.XXX €]

[Begründung der Preisschätzung mit emotionaler Sprache und Marktpotenzial]

### Bewertungsfaktoren
- **Rasse & Abstammung:** [Bewertung mit emotionalen Adjektiven]
- **Alter & Ausbildungsstand:** [Bewertung mit Potenzial-Betonung]
- **Potenzial & Verwendung:** [Bewertung mit Zukunftschancen]

### Empfehlungen
- [Konkrete Handlungsempfehlungen mit verkaufsorientierten Formulierungen]
- [Vermarktungshinweise mit "optimaler Präsentation" und "Bieterinteresse"]

**WICHTIG:** 
- Preise in Euro, realistisch für deutschen Markt
- Berücksichtige aktuelle Markttrends
- Verwende emotionale, verkaufsorientierte Sprache
- Betone immer das Potenzial und positive Aspekte"""

# ───────────────────────────────
#  FastAPI-App
# ───────────────────────────────
app = FastAPI(title="PferdeWert API", version="0.7.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://pferdewert.vercel.app",
        "https://organic-sniffle-jjg7466rj9vvhqj7-3000.app.github.dev",
        "https://organic-sniffle-jjg7466rj9vvhqj7.github.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────────
#  Request-Schema
# ───────────────────────────────
class BewertungRequest(BaseModel):
    # Pflichtfelder
    rasse: str
    alter: int
    geschlecht: str
    abstammung: str
    stockmass: int
    ausbildung: str

    # Optionale Angaben
    aku: Optional[str] = None
    erfolge: Optional[str] = None
    farbe: Optional[str] = None
    zuechter: Optional[str] = None
    standort: Optional[str] = None
    verwendungszweck: Optional[str] = None

# ───────────────────────────────
#  AI Bewertung (Claude + GPT parallel)
# ───────────────────────────────
def ai_valuation(d: BewertungRequest) -> str:
    """Hauptfunktion: Claude für Kunde, GPT parallel für Vergleich"""
    
    user_prompt = (
        f"Rasse: {d.rasse}\nAlter: {d.alter}\nGeschlecht: {d.geschlecht}\n"
        f"Abstammung: {d.abstammung}\nStockmaß: {d.stockmass} cm\n"
        f"Ausbildungsstand: {d.ausbildung}\n"
        f"Farbe: {d.farbe or 'k. A.'}\n"
        f"Züchter / Ausbildungsstall: {d.zuechter or 'k. A.'}\n"
        f"Aktueller Standort (PLZ): {d.standort or 'k. A.'}\n"
        f"Verwendungszweck / Zielsetzung: {d.verwendungszweck or 'k. A.'}\n"
        f"Gesundheitsstatus / AKU-Bericht: {d.aku or 'k. A.'}\n"
        f"Erfolge: {d.erfolge or 'k. A.'}"
    )
    
    claude_result = None
    gpt_result = None
    
    # 1. Claude für Kunde (Hauptergebnis)
    if USE_CLAUDE and claude_client:
        try:
            logging.info("Prompt wird an Claude gesendet...")
            response = claude_client.messages.create(
                model=CLAUDE_MODEL,
                max_tokens=1000,
                temperature=0.0,  # Für maximale Konsistenz
                system=CLAUDE_SYSTEM_PROMPT,
                messages=[{"role": "user", "content": user_prompt}]
            )
            
            # Robustes Parsing der Claude-Antwort
            if response.content and response.content[0].text:
                claude_result = response.content[0].text.strip()
                logging.info("✅ Claude-Bewertung erfolgreich erstellt")
            else:
                raise ValueError("Claude-Antwort hat kein lesbares Textfeld")
                
        except Exception as e:
            logging.error(f"❌ Claude Error: {e} - Fallback zu OpenAI")
    
    # 2. GPT parallel für Vergleich (läuft immer wenn verfügbar)
    if openai_client:
        try:
            logging.info("Prompt wird parallel an GPT gesendet...")
            messages = [
                {"role": "system", "content": GPT_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ]
            
            rsp = openai_client.chat.completions.create(
                model=MODEL_ID,
                messages=messages,
                temperature=0.0,  # Auch GPT konsistent machen
                top_p=0.8,
                seed=12345,  # Reproduzierbarkeit
                max_tokens=min(MAX_COMPLETION, CTX_MAX - tokens_in(messages)),
            )
            gpt_result = rsp.choices[0].message.content.strip()
            logging.info("✅ GPT-Bewertung für Vergleich erstellt")
        except Exception as e:
            logging.error(f"❌ GPT Error: {e}")
    
    # 3. GPT-Vergleich per E-Mail senden (wenn beide verfügbar)
    if gpt_result:
        # send_gpt_comparison_mail(d, gpt_result)  # Temporär deaktiviert
        logging.info("📧 GPT-Vergleichsmail temporär deaktiviert")
    
    # 4. Ergebnis zurückgeben: Claude bevorzugt, GPT als Fallback
    if claude_result:
        logging.info("✅ Claude-Ergebnis wird an Kunde gesendet")
        return claude_result
    elif gpt_result:
        logging.info("⚠️ Claude nicht verfügbar - GPT-Fallback wird an Kunde gesendet")
        return gpt_result
    else:
        logging.error("❌ Beide AI-Services nicht verfügbar")
        return (
            "Wir arbeiten gerade an unserem KI-Modell, "
            "bitte schicke uns eine E-Mail an info@pferdewert.de "
            "und wir melden uns, sobald das Modell wieder online ist."
        )

# ───────────────────────────────
#  API-Endpoint
# ───────────────────────────────
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    logging.info(f"Incoming Request: {req.dict()}")
    try:
        ai_text = ai_valuation(req)
        return {"raw_gpt": ai_text}  # Key-Name bleibt für Frontend-Kompatibilität
    except Exception as e:
        logging.error(f"AI-Error: {e}")
        return {
            "raw_gpt": (
                "Wir arbeiten gerade an unserem KI-Modell, "
                "bitte schicke uns eine E-Mail an info@pferdewert.de "
                "und wir melden uns, sobald das Modell wieder online ist."
            )
        }

# ───────────────────────────────
#  Health Check
# ───────────────────────────────
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "openai_available": bool(openai_client),
        "claude_available": bool(claude_client),
        "claude_model": CLAUDE_MODEL,
        "openai_model": MODEL_ID,
        "use_claude": USE_CLAUDE,
    }