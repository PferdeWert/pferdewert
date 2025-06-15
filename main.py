import os
import re
import json
import logging
from typing import Optional

import openai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ------------------------------------------------------------------
#  OpenAI-Key laden und einfache Log-Zeile ausgeben
# ------------------------------------------------------------------
openai.api_key = os.getenv("OPENAI_API_KEY")
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logging.info(f"Key loaded? {'yes' if openai.api_key else 'no'}")

MODEL_ID = os.getenv("PW_MODEL", "gpt-3.5-turbo")   # einfach per Env-Var wechseln

app = FastAPI(title="PferdeWert API", version="0.3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    # später gern nur https://pferdewert.vercel.app
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------
#  Datenmodell
# ------------------------------------------------------------------
class BewertungRequest(BaseModel):
    # Basisdaten
    name: str
    rasse: str
    alter: int
    geschlecht: str
    stockmass: int
    ausbildung: str
    einsatz: str
    # Zusatzdaten
    gesundheit: Optional[str] = None
    vater: Optional[str] = None
    mutter: Optional[str] = None
    muttervater: Optional[str] = None
    erfolge: Optional[str] = None


# ------------------------------------------------------------------
#  Heuristik-Fallback (gratis)
# ------------------------------------------------------------------
def simple_valuation(d: BewertungRequest) -> tuple[int, int, str]:
    basis = 1_000
    age_fac   = max(0.5, 1 - abs(d.alter - 8) * 0.06)
    aus_fac   = {"roh":1, "angeritten":1.2, "A":1.4,
                 "L":1.6, "M":2.0, "S":2.5}.get(d.ausbildung, 1)
    health_fac = 0.8 if d.gesundheit and d.gesundheit != "gesund" else 1
    stock_fac  = d.stockmass / 160
    mittel = int(max(basis * age_fac * aus_fac * health_fac * stock_fac, 500))
    span   = int(mittel * 0.1)          # ±10 %
    min_, max_ = mittel - span, mittel + span
    text = (
        f"Schätzung (Heuristik) für \"{d.name}\": "
        f"{min_:,} € – {max_:,} €."
    )
    return min_, max_, text


# ------------------------------------------------------------------
#  GPT-Version
# ------------------------------------------------------------------
SYSTEM_PROMPT = """
Du bist ein erfahrener, neutraler Pferdegutachter.
Gib eine realistische Preis-Spanne in Euro und eine kurze Analyse aus.

Antwortformat zwingend JSON:
{"min":12345,"max":23456,"text":"<max 200 Wörter Analyse>"}

Die Spanne soll 15–25 % betragen. Schreibe sachlich, ohne Emojis,
deutsches Zahlenformat (Leerzeichen als Tausendertrennzeichen).
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

    chat = openai.ChatCompletion.create(
        model=MODEL_ID,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": user_prompt},
        ],
        temperature=0.4,
        max_tokens=250,
    )
    logging.info("GPT-Call OK")

    # JSON aus der Antwort herausparsen
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
    if openai.api_key:
        try:
            return_data = ai_valuation(req)
        except Exception as e:
            logging.error(f"GPT-Error: {e} – wechsle auf Heuristik")
            return_data = simple_valuation(req)
    else:
        return_data = simple_valuation(req)

    wert_min, wert_max, text = return_data
    return {"wert_min": wert_min, "wert_max": wert_max, "text": text}
