import os
import re
import json
import logging
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI, OpenAIError

# ------------------------------------------------------------------
#  OpenAI-Client initialisieren
# ------------------------------------------------------------------
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
MODEL_ID   = os.getenv("PW_MODEL", "gpt-3.5-turbo")
client = OpenAI(api_key=OPENAI_KEY)

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logging.info(f"Key loaded? {'yes' if OPENAI_KEY else 'no'} | Model: {MODEL_ID}")

# ------------------------------------------------------------------
#  FastAPI-Grundgerüst
# ------------------------------------------------------------------
app = FastAPI(title="PferdeWert API", version="0.4.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------
#  Datenmodell der Anfrage
# ------------------------------------------------------------------
class BewertungRequest(BaseModel):
    name: str
    rasse: str
    alter: int
    geschlecht: str
    stockmass: int
    ausbildung: str
    einsatz: str
    gesundheit: Optional[str] = None
    vater: Optional[str] = None
    mutter: Optional[str] = None
    muttervater: Optional[str] = None
    erfolge: Optional[str] = None

# ------------------------------------------------------------------
#  Heuristik als Fallback
# ------------------------------------------------------------------
def simple_valuation(d: BewertungRequest) -> tuple[int, int, str]:
    basis = 1_000
    age   = max(0.5, 1 - abs(d.alter - 8) * 0.06)
    aus   = {"roh":1, "angeritten":1.2, "A":1.4,
             "L":1.6, "M":2, "S":2.5}.get(d.ausbildung, 1)
    health= 0.8 if d.gesundheit and d.gesundheit != "gesund" else 1
    stock = d.stockmass / 160
    mittel = int(max(basis * age * aus * health * stock, 500))
    span  = int(mittel * 0.1)
    min_, max_ = mittel - span, mittel + span
    text = f"Schätzung (Heuristik) für \"{d.name}\": {min_:,}–{max_:,} €."
    return min_, max_, text

# ------------------------------------------------------------------
#  GPT-Bewertung
# ------------------------------------------------------------------
SYSTEM_PROMPT = """
Du bist ein erfahrener, neutraler Pferdegutachter.
Gib eine realistische Preis-Spanne in Euro **und** eine kurze Analyse.

⚠️ Ausgabeformat (strict JSON, nichts davor oder danach):
{
  "min": 12345,
  "max": 23456,
  "text": "Die aktuelle Bewertung von <Name> liegt bei <min> € – <max> €. \
<max 120 Wörter Analyse, sachlich, ohne Wiederholung der Basisdaten.>"
}

Regeln:
• Erste Satzformulierung MUSS exakt wie oben starten.
• Spanne 15–25 % breit.
• Deutsch, Tausendertrennzeichen = Leerzeichen.
• Keine Emojis, keine Bulletlisten.
"""

def ai_valuation(d: BewertungRequest) -> tuple[int, int, str]:
    user_prompt = (
        f"Name: {d.name}\n"
        f"Rasse: {d.rasse}\n"
        f"Alter: {d.alter}\n"
        f"Geschlecht: {d.geschlecht}\n"
        f"Stockmaß: {d.stockmass} cm\n"
        f"Ausbildungsstand: {d.ausbildung}\n"
        f"Haupt-Einsatzbereich: {d.einsatz}\n"
        f"Gesundheitsstatus: {d.gesundheit or 'k. A.'}\n"
        f"Vater: {d.vater or 'k. A.'}\n"
        f"Mutter: {d.mutter or 'k. A.'}\n"
        f"Muttervater: {d.muttervater or 'k. A.'}\n"
        f"Erfolge: {d.erfolge or 'k. A.'}"
    )

    chat = client.chat.completions.create(
        model=MODEL_ID,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": user_prompt},
        ],
        temperature=0.4,
        max_tokens=180,
    )
    logging.info("GPT-Call OK")

    content = chat.choices[0].message.content
    match = re.search(r"\{.*\}", content, re.S)
    if not match:
        raise ValueError("GPT lieferte kein gültiges JSON")
    data = json.loads(match.group())
    return data["min"], data["max"], data["text"]

# ------------------------------------------------------------------
#  API-Endpunkt
# ------------------------------------------------------------------
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    if OPENAI_KEY:
        try:
            return_min, return_max, return_text = ai_valuation(req)
        except (OpenAIError, Exception) as e:
            logging.error(f"GPT-Error: {e} – fallback auf Heuristik")
            return_min, return_max, return_text = simple_valuation(req)
    else:
        return_min, return_max, return_text = simple_valuation(req)

    return {
        "wert_min": return_min,
        "wert_max": return_max,
        "text":     return_text
    }
