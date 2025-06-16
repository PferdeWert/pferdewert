import os, re, json, logging
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI, OpenAIError

# ──────────────────────────────────────────────────────────
#  OpenAI-Initialisierung
# ──────────────────────────────────────────────────────────
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
MODEL_ID   = os.getenv("PW_MODEL", "gpt-3.5-turbo")
client     = OpenAI(api_key=OPENAI_KEY)

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logging.info(f"Key loaded? {'yes' if OPENAI_KEY else 'no'} | Model: {MODEL_ID}")

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
SYSTEM_PROMPT = """
Du bist ein erfahrener Pferdegutachter.
Liefere eine realistische Euro-Preisspanne und eine kurze Analyse.

Format STRICT JSON:
{"min":12345,"max":23456,"text":"Die aktuelle Bewertung liegt bei …"}

Spanne 15–25 % breit, deutscher Zahlenstil, keine Emojis.
"""

def ai_valuation(d: BewertungRequest) -> tuple[int,int,str]:
    user_prompt = (
        f"Rasse: {d.rasse}\nAlter: {d.alter}\nGeschlecht: {d.geschlecht}\n"
        f"Abstammung: {d.abstammung}\nStockmaß: {d.stockmass} cm\n"
        f"Ausbildungsstand: {d.ausbildung}\n"
        f"AKU-Bericht: {d.aku or 'k. A.'}\n"
        f"Erfolge: {d.erfolge or 'k. A.'}"
    )
    chat = client.chat.completions.create(
        model=MODEL_ID,
        messages=[
            {"role":"system","content":SYSTEM_PROMPT},
            {"role":"user","content":user_prompt},
        ],
        temperature=0.4,
        max_tokens=200,
    )
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
    if OPENAI_KEY:
        try:
            min_, max_, text = ai_valuation(req)
        except (OpenAIError, Exception) as e:
            logging.error(f"GPT-Error: {e} – Heuristik genutzt")
            min_, max_, text = simple_valuation(req)
    else:
        min_, max_, text = simple_valuation(req)

    return {"wert_min": min_, "wert_max": max_, "text": text}
