import os, re, json, openai                # openai neu
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

import logging, os, openai
openai.api_key = os.getenv("OPENAI_API_KEY")
logging.info(f"Key loaded? {'yes' if openai.api_key else 'no'}")

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI(title="PferdeWert API", version="0.3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class BewertungRequest(BaseModel):
    name: str; rasse: str; alter: int; geschlecht: str
    stockmass: int; ausbildung: str; einsatz: str
    gesundheit: Optional[str] = None
    vater: Optional[str] = None; mutter: Optional[str] = None
    muttervater: Optional[str] = None; erfolge: Optional[str] = None

# Heuristik-Fallback (gratis)
def simple_valuation(d: BewertungRequest) -> tuple[int,int,str]:
    basis = 1_000
    age = max(0.5, 1 - abs(d.alter - 8) * 0.06)
    aus = {"roh":1,"angeritten":1.2,"A":1.4,"L":1.6,"M":2,"S":2.5}.get(d.ausbildung,1)
    health = 0.8 if d.gesundheit and d.gesundheit != "gesund" else 1
    stock = d.stockmass/160
    mittel = int(max(basis*age*aus*health*stock,500))
    return int(mittel*0.9), int(mittel*1.1), (
        f"Schätzung anhand interner Heuristik: {mittel*0.9:,.0f}–{mittel*1.1:,.0f} €.")

# GPT-Aufruf
def ai_valuation(d: BewertungRequest) -> tuple[int,int,str]:
    prompt = (
      "Du bist Gutachter für Reitpferde. Schätze den aktuellen Marktwert "
      "und gib eine realistische Preisspanne in Euro.\n"
      f"Pferd: Name={d.name}, Rasse={d.rasse}, Alter={d.alter}, "
      f"Geschlecht={d.geschlecht}, Stockmaß={d.stockmass} cm, "
      f"Ausbildungsstand={d.ausbildung}, Einsatz={d.einsatz}. "
      f"Gesundheit={d.gesundheit or 'k.A.'}, "
      f"Erfolge={d.erfolge or 'k.A.'}, Abstammung=V:{d.vater or 'k.A.'} "
      f"M:{d.mutter or 'k.A.'} MV:{d.muttervater or 'k.A.'}.\n\n"
      "Antwortiere **nur** JSON:\n"
      "{'min':<int>, 'max':<int>, 'text':'<max 200 Wörter>'}"
    )

    chat = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user", "content":prompt}],
        temperature=0.4,
        max_tokens=250,
    )
    content = chat.choices[0].message.content
    data = json.loads(re.search(r"\{.*\}", content, re.S).group())
    return data["min"], data["max"], data["text"]

@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    if openai.api_key:
        try:
            wert_min, wert_max, text = ai_valuation(req)
        except Exception as e:                   # Fallback bei API-Fehler
            wert_min, wert_max, text = simple_valuation(req)
    else:
        wert_min, wert_max, text = simple_valuation(req)

    return {"wert_min": wert_min, "wert_max": wert_max, "text": text}
