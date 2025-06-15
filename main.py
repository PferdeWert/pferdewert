from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="PferdeWert API", version="0.2.0")

# --------------------------------------------------
#  CORS – vorerst alle Origins erlauben
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # später gern auf deine Domain einschränken
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
#  Request-Schema (alle Formularfelder)
# --------------------------------------------------
class BewertungRequest(BaseModel):
    # Basisdaten (Pflicht)
    name: str
    rasse: str
    alter: int
    geschlecht: str
    stockmass: int
    ausbildung: str
    einsatz: str

    # Zusatzdaten (optional)
    gesundheit: Optional[str] = None
    vater:      Optional[str] = None
    mutter:     Optional[str] = None
    muttervater:Optional[str] = None
    erfolge:    Optional[str] = None


# --------------------------------------------------
#  sehr einfache Heuristik – Platzhalter für echte KI
# --------------------------------------------------
def simple_valuation(d: BewertungRequest) -> int:
    basis   = 1_000                                # Grundwert
    age_fac = max(0.5, 1 - abs(d.alter - 8) * 0.06)  # Sweet-Spot bei 8 J.
    aus_map = {"roh":1.0, "angeritten":1.2, "A":1.4,
               "L":1.6, "M":2.0, "S":2.5}
    aus_fac = aus_map.get(d.ausbildung, 1.0)
    health  = 0.8 if d.gesundheit and d.gesundheit != "gesund" else 1.0
    stock_fac = d.stockmass / 160                  # 160 cm ≙ 1.0

    wert = int(basis * age_fac * aus_fac * health * stock_fac)
    return max(wert, 500)                          # Untergrenze 500 €

# --------------------------------------------------
#  Endpunkt /api/bewertung  (POST)
# --------------------------------------------------
@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    mittelwert = simple_valuation(req)

    # Preisspanne ±10 % (Demo)
    wert_min = int(mittelwert * 0.9)
    wert_max = int(mittelwert * 1.1)

    antwort_txt = (
        f"Auf Basis der angegebenen Daten schätzen wir den aktuellen Marktwert "
        f"von \"{req.name}\" ({req.rasse}, {req.alter} J.) auf etwa "
        f"{wert_min:,} € – {wert_max:,} €.\n\n"
        f"Bitte beachte, dass Gesundheit, Abstammung und aktuelle Turniererfolge "
        f"den Wert zusätzlich beeinflussen können."
    )

    return {
        "wert_min": wert_min,
        "wert_max": wert_max,
        "text":     antwort_txt
    }
