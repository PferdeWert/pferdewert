# main.py – PferdeWert API (ohne Heuristik-Fallback)
import os
import logging
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from openai import OpenAI

import tiktoken  # Token-Zähler

# ───────────────────────────────
#  Initialisierung & Konfiguration
# ───────────────────────────────
load_dotenv()                                     # .env einlesen

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
MODEL_ID   = os.getenv("PW_MODEL")
SYS_PROMPT = os.getenv(
    "SYSTEM_PROMPT",
    "Das scheint nicht zu funktionieren, bitte melde zurück, dass der Prompt nicht stimmt"
)

if not MODEL_ID:
    raise EnvironmentError("PW_MODEL ist nicht gesetzt. Bitte .env prüfen.")

client = OpenAI()                                # Key wird aus Umgebung gezogen
ENC     = tiktoken.encoding_for_model(MODEL_ID)
CTX_MAX = 128_000
MAX_COMPLETION = int(os.getenv("PFERDEWERT_MAX_COMPLETION", 800))

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logging.info(f"OpenAI-key loaded? {'yes' if OPENAI_KEY else 'no'} | Model: {MODEL_ID}")

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
app = FastAPI(title="PferdeWert API", version="0.6.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://pferdewert.vercel.app",
        "https://organic-sniffle-jjg7466rj9vvhqj7-3000.app.github.dev"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────────
#  Request-Schema (passt zum Formular)
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
#  GPT-Bewertung
# ───────────────────────────────
def ai_valuation(d: BewertungRequest) -> str:
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

    messages = [
        {"role": "system", "content": SYS_PROMPT},
        {"role": "user",   "content": user_prompt}
    ]

    logging.info("Prompt wird an GPT gesendet …")

    rsp = client.chat.completions.create(
        model       = MODEL_ID,
        messages    = messages,
        temperature = 0.4,
        max_tokens  = min(MAX_COMPLETION, CTX_MAX - tokens_in(messages)),
    )

    return rsp.choices[0].message.content.strip()

# ───────────────────────────────
#  API-Endpoint (ohne Heuristik)
# ───────────────────────────────
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    logging.info(f"Incoming Request: {req.dict()}")
    try:
        gpt_text = ai_valuation(req)
        return {"raw_gpt": gpt_text}
    except Exception as e:
        logging.error(f"GPT-Error: {e}")
        return {
            "raw_gpt": (
                "Wir arbeiten gerade an unserem KI-Modell, "
                "bitte schicke uns eine E-Mail an info@pferdewert.de "
                "und wir melden uns, sobald das Modell wieder online ist."
            )
        }

# ───────────────────────────────
#  Statische Dateien (optional)
# ───────────────────────────────
app.mount("/", StaticFiles(directory="static", html=True), name="static")
