# main.py – PferdeWert API (Schema aktualisiert)
import os
import logging
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from openai import OpenAI

import tiktoken  # Token-Zähler

# Import des neuen Schema
from schemas.bewertung_validation import BewertungRequest, format_prompt_from_request

# ───────────────────────────────
#  Initialisierung & Konfiguration
# ───────────────────────────────
load_dotenv()                                     # .env einlesen

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
MODEL_ID   = os.getenv("PW_MODEL")
DEBUG_MODE = os.getenv("DEBUG", "false").lower() == "true"
SYS_PROMPT = os.getenv(
    "SYSTEM_PROMPT",
    "Das scheint nicht zu funktionieren, bitte melde zurück, dass der Prompt nicht stimmt"
)

if not MODEL_ID:
    raise EnvironmentError("PW_MODEL ist nicht gesetzt. Bitte .env prüfen.")

if not OPENAI_KEY:
    raise EnvironmentError("OPENAI_API_KEY ist nicht gesetzt. Bitte .env prüfen.")

# Explizite OpenAI-Client Initialisierung mit API-Key
client = OpenAI(api_key=OPENAI_KEY)
ENC     = tiktoken.encoding_for_model(MODEL_ID)
CTX_MAX = 128_000
MAX_COMPLETION = int(os.getenv("PFERDEWERT_MAX_COMPLETION", 800))

# Logging-Konfiguration je nach Debug-Modus
log_level = logging.DEBUG if DEBUG_MODE else logging.INFO
logging.basicConfig(level=log_level, format="%(levelname)s: %(message)s")
logging.info(f"OpenAI-key loaded? {'yes' if OPENAI_KEY else 'no'} | Model: {MODEL_ID} | Debug: {DEBUG_MODE}")

def tokens_in(msgs: list[dict]) -> int:
    """Hilfsfunktion: zählt Tokens in OpenAI-Messages."""
    total = 0
    for m in msgs:
        total += 4                      # fixer Overhead pro Message
        total += len(ENC.encode(m["content"]))
    return total + 2                    # Abschluss-Tokens

# ───────────────────────────────
#  FastAPI-App
# ───────────────────────────────
app = FastAPI(title="PferdeWert API", version="0.7.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins = [
        "https://pferdewert.vercel.app",
        "https://pferdewert.de",
        "https://organic-sniffle-jjg7466rj9vvhqj7-3000.app.github.dev",
        "https://organic-sniffle-jjg7466rj9vvhqj7.github.dev",
        "http://localhost:3000",  # Für lokale Entwicklung
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────────
#  GPT-Bewertung (verwendet neues Schema)
# ───────────────────────────────
def ai_valuation(d: BewertungRequest) -> str:
    """
    KI-Bewertung mit dem neuen strukturierten Schema.
    Verwendet die format_prompt_from_request Funktion.
    """
    # Nutze die zentralisierte Prompt-Formatierung
    user_prompt = format_prompt_from_request(d)

    messages = [
        {"role": "system", "content": SYS_PROMPT},
        {"role": "user",   "content": user_prompt}
    ]

    # Logging je nach Debug-Modus
    if DEBUG_MODE:
        logging.debug(f"System Prompt: {SYS_PROMPT}")
        logging.debug(f"User Prompt: {user_prompt}")
        logging.debug(f"Token count: {tokens_in(messages)}")
    else:
        logging.info("Prompt wird an GPT gesendet (neues Schema)...")

    try:
        rsp = client.chat.completions.create(
            model       = MODEL_ID,
            messages    = messages,
            temperature = 0.4,
            max_tokens  = min(MAX_COMPLETION, CTX_MAX - tokens_in(messages)),
        )

        result = rsp.choices[0].message.content.strip()
        
        # Logging der Response je nach Modus
        if DEBUG_MODE:
            logging.debug(f"GPT-Full-Response: {result}")
        else:
            logging.info(f"GPT-Response erhalten: {len(result)} Zeichen")
            
        return result

    except Exception as e:
        logging.error(f"OpenAI API Fehler: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"KI-Bewertung fehlgeschlagen: {str(e)}"
        )

# ───────────────────────────────
#  Health Check Endpoint
# ───────────────────────────────
@app.get("/health")
def health_check():
    """Health Check für Monitoring."""
    return {
        "status": "healthy",
        "model": MODEL_ID,
        "version": "0.7.0",
        "openai_configured": bool(OPENAI_KEY)
    }

# ───────────────────────────────
#  API-Endpoint (aktualisiert)
# ───────────────────────────────
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    """
    Hauptendpoint für Pferdebewertungen.
    Verwendet das neue zentralisierte Schema.
    """
    logging.info(f"Incoming Request (neues Schema): {req.dict()}")
    
    # Validierung der Eingabedaten (bereits durch Pydantic erfolgt)
    if req.alter <= 0 or req.alter > 50:
        raise HTTPException(
            status_code=400,
            detail="Alter muss zwischen 1 und 50 Jahren liegen"
        )
    
    if req.stockmass < 100 or req.stockmass > 220:
        raise HTTPException(
            status_code=400,
            detail="Stockmaß muss zwischen 100 und 220 cm liegen"
        )

    try:
        gpt_text = ai_valuation(req)
        
        # Erweiterte Antwort mit Metadaten
        return {
            "raw_gpt": gpt_text,
            "status": "success",
            "model_used": MODEL_ID,
            "request_data": {
                "rasse": req.rasse,
                "alter": req.alter,
                "geschlecht": req.geschlecht,
                "stockmass": req.stockmass
            }
        }
        
    except HTTPException:
        # HTTPExceptions weiterleiten (bereits formatiert)
        raise
    except Exception as e:
        logging.error(f"Unerwarteter Fehler: {e}")
        raise HTTPException(
            status_code=500,
            detail="Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
        )

# ───────────────────────────────
#  Fallback Error Handler
# ───────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Globaler Exception Handler für unbehandelte Fehler."""
    logging.error(f"Unbehandelter Fehler bei {request.url}: {exc}")
    
    return JSONResponse(
        status_code=500,
        content={
            "raw_gpt": (
                "Wir arbeiten gerade an unserem KI-Modell. "
                "Bitte schicken Sie uns eine E-Mail an info@pferdewert.de "
                "und wir melden uns, sobald das System wieder verfügbar ist."
            ),
            "status": "error",
            "error_type": "system_error"
        }
    )

# ───────────────────────────────
#  Entwicklung: Schema-Übersicht
# ───────────────────────────────
@app.get("/api/schema")
def get_schema():
    """Development-Endpoint: Schema-Übersicht."""
    return {
        "schema_version": "2.0",
        "required_fields": [
            "rasse", "alter", "geschlecht", 
            "abstammung", "stockmass", "ausbildung"
        ],
        "optional_fields": [
            "aku", "erfolge", "farbe", 
            "zuechter", "standort", "verwendungszweck"
        ],
        "field_types": {
            "alter": "integer",
            "stockmass": "integer", 
            "other_fields": "string"
        }
    }