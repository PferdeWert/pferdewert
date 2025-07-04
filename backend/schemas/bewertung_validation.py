# /backend/schemas/bewertung_validation.py
# ⚠️ SYNC: Bei Änderungen auch /lib/bewertung-schema.ts anpassen!

from typing import Optional
from pydantic import BaseModel
from enum import Enum
from datetime import datetime

class BewertungRequest(BaseModel):
    """Schema für eingehende Bewertungsanfragen vom Frontend"""
    
    # Pflichtfelder
    rasse: str
    alter: int
    geschlecht: str
    abstammung: str
    stockmass: int
    ausbildung: str
    
    # Optionale Felder
    aku: Optional[str] = None
    erfolge: Optional[str] = None
    farbe: Optional[str] = None
    zuechter: Optional[str] = None
    standort: Optional[str] = None
    verwendungszweck: Optional[str] = None

class BewertungStatus(str, Enum):
    """Status-Enum für Bewertungsdokumente"""
    IN_BEWERTUNG = "in_bewertung"
    BEWERTET = "bewertet"
    FREIGEGEBEN = "freigegeben"

class BewertungDokument(BaseModel):
    """Schema für vollständige Bewertungsdokumente in MongoDB"""
    
    # Eingabedaten
    rasse: str
    alter: int
    geschlecht: str
    abstammung: str
    stockmass: int
    ausbildung: str
    aku: Optional[str] = None
    erfolge: Optional[str] = None
    farbe: Optional[str] = None
    zuechter: Optional[str] = None
    standort: Optional[str] = None
    verwendungszweck: Optional[str] = None
    
    # Metadaten
    status: BewertungStatus = BewertungStatus.IN_BEWERTUNG
    bewertung: Optional[str] = None  # KI-generierte Bewertung
    erstellt_am: Optional[datetime] = None
    stripe_session_id: Optional[str] = None

# Hilfsfunktion für OpenAI-Prompt
def format_prompt_from_request(request: BewertungRequest) -> str:
    """Formatiert die Eingabedaten für den OpenAI-Prompt"""
    return (
        f"Rasse: {request.rasse}\n"
        f"Alter: {request.alter}\n"
        f"Geschlecht: {request.geschlecht}\n"
        f"Abstammung: {request.abstammung}\n"
        f"Stockmaß: {request.stockmass} cm\n"
        f"Ausbildungsstand: {request.ausbildung}\n"
        f"AKU: {request.aku or 'k. A.'}\n"
        f"Erfolge: {request.erfolge or 'k. A.'}\n"
        f"Farbe: {request.farbe or 'k. A.'}\n"
        f"Züchter/Ausbildungsstall: {request.zuechter or 'k. A.'}\n"
        f"Standort (PLZ): {request.standort or 'k. A.'}\n"
        f"Verwendungszweck: {request.verwendungszweck or 'k. A.'}"
    )