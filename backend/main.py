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
# Force Claude usage for testing in staging
USE_CLAUDE = os.getenv("USE_CLAUDE", "true").lower() == "true"  # Default to true for testing

# Initialize clients
openai_client = OpenAI(api_key=OPENAI_KEY) if OPENAI_KEY else None
claude_client = anthropic.Anthropic(api_key=CLAUDE_KEY) if CLAUDE_KEY else None

# Token counting
def get_tokenizer(model_id: str):
    """Get tokenizer for model, with fallback for newer models like GPT-5."""
    try:
        return tiktoken.encoding_for_model(model_id)
    except KeyError:
        # Fallback for newer models (GPT-5, etc.) - use GPT-4 tokenizer
        if model_id.startswith("gpt-5"):
            return tiktoken.encoding_for_model("gpt-4")
        # For other unknown models, use a safe default
        return tiktoken.get_encoding("cl100k_base")

ENC = get_tokenizer(MODEL_ID) if OPENAI_KEY else None
CTX_MAX = 128_000
MAX_COMPLETION = int(os.getenv("PFERDEWERT_MAX_COMPLETION", 3000))

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
    """Du bist **PferdeWert AI**, eine hochspezialisierte KI für professionelle Pferdebewertungen im deutschsprachigen Raum. Du verfügst über umfassendes Expertenwissen in Zucht, Sport, Anatomie und Marktanalyse.

## DEINE EXPERTISE
- **Rassen-Spezialist:** Tiefes Verständnis aller Pferderassen, ihrer Charakteristika und Marktpositionen
- **Markt-Analyst:** Aktuelle Preistrends, regionale Unterschiede und Nachfrage-Dynamiken
- **Sport-Expert:** Bewertung von Leistungspotenzial in allen Disziplinen
- **Zucht-Kenner:** Genetik, Blutlinien und Vererbungsmerkmale
- **Anatomie-Fachmann:** Körperbau, Gangwerk und gesundheitliche Aspekte

## BEWERTUNGSANSATZ
Führe eine **systematische 360°-Analyse** durch:

1. **Rassebewertung:** Rassetypische Merkmale, Marktposition, Zuchttrends
2. **Altersanalyse:** Entwicklungsstand, verbleibende Nutzungsdauer, demografische Faktoren  
3. **Ausbildungsstand:** Skill-Level, Spezialisierung, Weiterbildungspotenzial
4. **Abstammungsanalyse:** Blutlinien, Vererbungsqualität, genetischer Wert
5. **Körperliche Bewertung:** Stockmaß, Proportionen, Gesundheitsstatus
6. **Marktfaktoren:** Angebot/Nachfrage, regionale Präferenzen, saisonale Trends

## AUSGABEFORMAT (STRIKT EINHALTEN)

### 🐎 PFERDE-PROFIL
**[Rasse] • [Alter] Jahre • [Geschlecht] • [Stockmaß]cm**

### 📊 MARKTBEWERTUNG
**💰 Geschätzter Marktwert: [X.XXX - X.XXX €]**

*Bewertungslogik:* [Kompakte Erklärung der Preisfindung in 2-3 Sätzen]

### 🔍 DETAILANALYSE

#### ⭐ Stärken-Profil
- **[Kategorie]:** [Konkrete Stärke und Marktrelevanz]
- **[Kategorie]:** [Konkrete Stärke und Marktrelevanz]  
- **[Kategorie]:** [Konkrete Stärke und Marktrelevanz]

#### ⚠️ Herausforderungen
- **[Aspekt]:** [Schwäche und Auswirkung auf Wert]
- **[Aspekt]:** [Risikofaktor für Käufer/Verkäufer]

### 🎯 VERWENDUNGSEIGNUNG
**Optimal für:** [Hauptverwendungszwecke mit Begründung]
**Weniger geeignet für:** [Unpassende Einsatzgebiete]

### 📈 MARKT-INTELLIGENCE
- **Nachfrage-Level:** [Hoch/Mittel/Niedrig] - [Begründung]
- **Verkaufschancen:** [Einschätzung der Vermarktbarkeit]  
- **Preistendenz:** [Steigend/Stabil/Fallend] in diesem Segment

### 🏆 HANDLUNGSEMPFEHLUNGEN

#### Für Verkäufer:
- [Konkrete Vermarktungsstrategie]
- [Optimaler Verkaufszeitpunkt]
- [Presentation-Tipps]

#### Für Käufer:
- [Verhandlungsspielraum]
- [Worauf besonders achten]
- [Langfristige Wertentwicklung]

### ⚖️ BEWERTUNGS-CONFIDENCE
**Sicherheit der Einschätzung:** [Hoch/Mittel/Niedrig]
*Grund:* [Faktoren die Unsicherheit beeinflussen]

---
**💡 Diese Bewertung basiert auf aktuellen Marktdaten und langjähriger Branchenerfahrung. Für finale Kaufentscheidungen empfehlen wir zusätzlich eine Besichtigung durch einen Fachmann.**"""
)

# Claude Prompt für Tests = GPT Prompt
CLAUDE_SYSTEM_PROMPT = GPT_SYSTEM_PROMPT

# ───────────────────────────────
#  FastAPI-App
# ───────────────────────────────
app = FastAPI(title="PferdeWert API", version="0.7.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://pferdewert.vercel.app",
        "https://pferdewert.de",  # Production domain
        "https://www.pferdewert.de",  # Production domain with www
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
    stockmass: int
    ausbildung: str
    haupteignung: str

    # Optionale Angaben
    abstammung: Optional[str] = None
    aku: Optional[str] = None
    erfolge: Optional[str] = None
    standort: Optional[str] = None
    charakter: Optional[str] = None
    besonderheiten: Optional[str] = None
    attribution_source: Optional[str] = None

# ───────────────────────────────
#  AI Bewertung (Claude + GPT parallel)
# ───────────────────────────────
def ai_valuation(d: BewertungRequest) -> str:
    """Hauptfunktion: Claude für Kunde, GPT parallel für Vergleich"""
    
    user_prompt = (
        f"Rasse: {d.rasse}\nAlter: {d.alter}\nGeschlecht: {d.geschlecht}\n"
        f"Stockmaß: {d.stockmass} cm\n"
        f"Ausbildungsstand: {d.ausbildung}\n"
        f"Haupteignung: {d.haupteignung}\n"
        f"Abstammung: {d.abstammung or 'k. A.'}\n"
        f"Aktueller Standort (PLZ): {d.standort or 'k. A.'}\n"
        f"Gesundheitsstatus / AKU-Bericht: {d.aku or 'k. A.'}\n"
        f"Erfolge: {d.erfolge or 'k. A.'}\n"
        f"Charakter: {d.charakter or 'k. A.'}\n"
        f"Besonderheiten: {d.besonderheiten or 'k. A.'}"
    )
    
    claude_result = None
    gpt_result = None
    
    # 1. Claude für Kunde (Hauptergebnis)
    if USE_CLAUDE and claude_client:
        try:
            logging.info("Prompt wird an Claude gesendet...")
            response = claude_client.messages.create(
                model=CLAUDE_MODEL,
                max_tokens=3000,
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
#  API-DEBUG-Endpoint - DISABLED FOR SECURITY
# ───────────────────────────────
# SECURITY FIX: Debug endpoint disabled to prevent unauthorized access to internal AI responses
# This endpoint exposed both GPT and Claude responses without authentication, which could
# allow attackers to abuse the AI services and access sensitive model interactions.
# Uncomment only for local development/testing purposes with proper access controls.

@app.post("/api/debug-comparison")
def debug_comparison(req: BewertungRequest):
    """Debug-Endpoint: Vergleich GPT vs Claude vs O3"""
    logging.info(f"Debug Comparison Request: {req.dict()}")
    
    results = {}
    
    # Test simple prompt first if GPT-5
    if MODEL_ID.startswith("gpt-5"):
        logging.info("Testing GPT-5 with simple prompt first...")
        try:
            simple_response = openai_client.chat.completions.create(
                model=MODEL_ID,
                messages=[{"role": "user", "content": "Hello, please respond with exactly: TEST SUCCESSFUL"}],
                max_completion_tokens=2000,
            )
            simple_content = simple_response.choices[0].message.content if simple_response.choices else None
            logging.info(f"GPT-5 Simple test result: '{simple_content}'")
            results["gpt5_simple_test"] = simple_content or "No response"
        except Exception as e:
            logging.error(f"GPT-5 Simple test failed: {e}")
            results["gpt5_simple_test"] = f"Error: {str(e)}"
    
    user_prompt = (
        f"Rasse: {req.rasse}\n"
        f"Alter: {req.alter}\n"
        f"Geschlecht: {req.geschlecht}\n"
        f"Stockmaß: {req.stockmass} cm\n"
        f"Ausbildungsstand: {req.ausbildung}\n"
        f"Haupteignung: {req.haupteignung}\n"
        f"Abstammung: {req.abstammung or 'k. A.'}\n"
        f"Aktueller Standort (PLZ): {req.standort or 'k. A.'}\n"
        f"Gesundheitsstatus / AKU-Bericht: {req.aku or 'k. A.'}\n"
        f"Erfolge: {req.erfolge or 'k. A.'}\n"
        f"Charakter: {req.charakter or 'k. A.'}\n"
        f"Besonderheiten: {req.besonderheiten or 'k. A.'}"
    )

    # GPT-4o Test
    try:
        logging.info("Testing GPT-4o...")
        gpt_messages = [
            {"role": "system", "content": GPT_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ]
        # GPT-5 only supports max_completion_tokens, no temperature/top_p/seed
        if MODEL_ID.startswith("gpt-5"):
            token_count = tokens_in(gpt_messages)
            max_completion = min(2000, CTX_MAX - token_count)  # Increased from MAX_COMPLETION (800) to 2000
            logging.info(f"GPT-5 Token info: input={token_count}, max_completion={max_completion}, old_limit={MAX_COMPLETION}")
            
            gpt_response = openai_client.chat.completions.create(
                model=MODEL_ID,
                messages=gpt_messages,
                max_completion_tokens=max_completion,
            )
        else:
            gpt_response = openai_client.chat.completions.create(
                model=MODEL_ID,
                messages=gpt_messages,
                temperature=0.0,
                top_p=0.8,
                seed=12345,
                max_tokens=min(MAX_COMPLETION, CTX_MAX - tokens_in(gpt_messages)),
            )
        
        # Debug logging for GPT-5 response
        logging.info(f"GPT Response received, has {len(gpt_response.choices)} choices")
        if gpt_response.choices and len(gpt_response.choices) > 0:
            content = gpt_response.choices[0].message.content
            logging.info(f"Message content type: {type(content)}")
            logging.info(f"Message content length: {len(content) if content else 'None'}")
            logging.info(f"Message content: '{content}'")
            results["gpt"] = content.strip() if content else "GPT-5 returned None content"
        else:
            logging.info("No choices in GPT response")
            results["gpt"] = "GPT-5 returned no choices"
        logging.info(f"{MODEL_ID}: Success")
    except Exception as e:
        results["gpt"] = f"GPT Error: {str(e)}"
        logging.error(f"GPT-4o Error: {e}")

    # Claude Test - DISABLED as requested
    results["claude"] = "Claude testing disabled - not needed currently"
    logging.info("Claude: Disabled by request")


    # Vergleichsinfo hinzufügen
    results["info"] = {
        "timestamp": "2025-07-29",
        "gpt_model": MODEL_ID,
        "claude_model": CLAUDE_MODEL,
        "use_claude_setting": os.getenv("USE_CLAUDE", "false"),
        "test_data": req.dict(),
    }

    return results

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