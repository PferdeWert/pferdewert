import os, re, json, logging
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI, OpenAIError

from dotenv import load_dotenv          # ① NEU
load_dotenv()                           # ② liest .env ein
import tiktoken                    # Token-Zähler
import os                               # ③ fürs getenv
import logging


# ──────────────────────────────────────────────────────────
#  OpenAI-Initialisierung
# ──────────────────────────────────────────────────────────
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
MODEL_ID   = os.getenv("PW_MODEL", "gpt-3.5-turbo")
client = OpenAI()                          # <- KEIN api_key-Argument mehr nötig (siehe .env)

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logging.info(f"Key loaded? {'yes' if OPENAI_KEY else 'no'} | Model: {MODEL_ID}")

ENC            = tiktoken.encoding_for_model(MODEL_ID)   # z. B. "gpt-4o-mini"
CONTEXT_LIMIT  = 128_000                                 # Fenstergröße des Modells
MAX_COMPLETION_LIMIT = int(os.getenv("PFERDEWERT_MAX_COMPLETION", 800))

def tokens_in(msgs: list[dict]) -> int:
    #"""Zählt Tokens in einer OpenAI-messages-Liste."""
    total = 0
    for m in msgs:
        total += 4                     # fixer Overhead pro Message
        total += len(ENC.encode(m["content"]))
    return total + 2                   # Abschluss-Tokens

# ──────────────────────────────────────────────────────────
#  FastAPI-Grundgerüst
# ──────────────────────────────────────────────────────────
app = FastAPI(title="PferdeWert API", version="0.5.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # später gern auf Vercel-Domain einschränken
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────────────────
#  Request-Schema – passt exakt zum Formular
# ──────────────────────────────────────────────────────────
class BewertungRequest(BaseModel):
    # Pflicht
    rasse: str
    alter: int
    geschlecht: str
    abstammung: str
    stockmass: int
    ausbildung: str
    
     # Optional
    aku: Optional[str] = None   # AKU-Bericht
    erfolge: Optional[str] = None

# ──────────────────────────────────────────────────────────
#  Heuristik-Fallback (kostet 0 $)
# ──────────────────────────────────────────────────────────
def simple_valuation(d: BewertungRequest) -> tuple[int, int, str]:
    basis = 1_000
    age_fac = max(0.5, 1 - abs(d.alter - 8) * 0.06)
    aus_fac = {"roh":1,"angeritten":1.2,"A":1.4,"L":1.6,"M":2,"S":2.5}.get(d.ausbildung,1)
    stock_fac = d.stockmass / 160
    mittel = int(max(basis * age_fac * aus_fac * stock_fac, 500))
    span   = int(mittel * 0.10)          # ±10 %
    min_, max_ = mittel - span, mittel + span
    text = f"Schätzung (Heuristik): {min_:,} € – {max_:,} €."
    return min_, max_, text

# ──────────────────────────────────────────────────────────
#  GPT-Bewertung
# ──────────────────────────────────────────────────────────
SYS_PROMPT = os.getenv(                 # ④ Prompt kommt jetzt aus der .env
  "PFERDEWERT_SYSTEM_PROMPT",
   # ↓ wird nur genutzt, wenn die ENV-Variable NICHT existiert
    "Du bist „PferdeWert AI“. Gib eine realistische Preisspanne in Euro "
    "für jedes vorgegebene Pferd an und erkläre kurz die Hauptfaktoren. "
    "Format: ### Preisspanne … ## Was den Endpreis bewegt … ### Fazit."     # ⑤ Sicherheitsnetz
)


def ai_valuation(d: BewertungRequest) -> str:
    user_prompt = (
        f"Rasse: {d.rasse}\nAlter: {d.alter}\nGeschlecht: {d.geschlecht}\n"
        f"Abstammung: {d.abstammung}\nStockmaß: {d.stockmass} cm\n"
        f"Ausbildungsstand: {d.ausbildung}\n"
        f"AKU-Bericht: {d.aku or 'k. A.'}\n"
        f"Erfolge: {d.erfolge or 'k. A.'}"
    )

    messages = [
        {"role": "system", "content": SYS_PROMPT},
        {"role": "user",   "content": user_prompt},
    ]
    rsp = client.chat.completions.create(
        model       = MODEL_ID,
        messages    = messages,
        temperature = 0.4,
        max_tokens  = min(MAX_COMPLETION_LIMIT, CONTEXT_LIMIT - tokens_in(messages)),
    )
    return rsp.choices[0].message.content.strip()


    logging.info("GPT-Call OK")
    content = chat.choices[0].message.content
    match = re.search(r"\{.*\}", content, re.S)
    if not match:
        raise ValueError("GPT lieferte kein gültiges JSON")
    data = json.loads(match.group())
    return data["min"], data["max"], data["text"]

# ──────────────────────────────────────────────────────────
#  API-Endpunkt
# ──────────────────────────────────────────────────────────
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    logging.info(f"Incoming Request Data: {req.dict()}")
    try:
        gpt_text = ai_valuation(req)
        return {"raw_gpt": gpt_text}
    except Exception as e:
        logging.error(f"GPT-Error: {e} – Heuristik genutzt")
        _, _, fallback = simple_valuation(req)
        return {"raw_gpt": fallback}

