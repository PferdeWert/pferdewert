from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="PferdeWert API", version="0.1.0")


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


def simple_valuation(d: BewertungRequest) -> int:
    base = 1_000
    age_factor = max(0.5, 1 - abs(d.alter - 8) * 0.06)
    aus_map = {"roh": 1.0, "angeritten": 1.2, "A": 1.4, "L": 1.6, "M": 2.0, "S": 2.5}
    aus_factor = aus_map.get(d.ausbildung, 1.0)
    health_penalty = 0.8 if d.gesundheit and d.gesundheit != "gesund" else 1.0
    stock_factor = d.stockmass / 160
    wert = int(base * age_factor * aus_factor * health_penalty * stock_factor)
    return max(wert, 500)


@app.post("/api/bewertung")
def bewertung(req: BewertungRequest):
    return {"wert": simple_valuation(req)}
