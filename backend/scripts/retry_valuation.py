#!/usr/bin/env python3
"""
Retry Script: Retroactively generate missing horse valuation
Finds documents with missing 'bewertung' field and generates AI evaluation using OpenRouter + Gemini 2.5 Pro
"""

import os
import sys
import logging
from typing import Dict, Any, Optional
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId

# Add parent directory to path to import AIService
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from ai_clients.ai_service import AIService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s: %(message)s'
)

def load_environment():
    """Load environment variables from .env file"""
    env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    if not os.path.exists(env_path):
        logging.error(f"❌ .env file not found at {env_path}")
        sys.exit(1)

    load_dotenv(env_path)
    logging.info("✅ Environment variables loaded")

    # Verify critical environment variables
    if not os.getenv("MONGODB_URI"):
        logging.error("❌ MONGODB_URI not found in environment")
        sys.exit(1)

    if not os.getenv("OPENROUTER_API_KEY"):
        logging.error("❌ OPENROUTER_API_KEY not found in environment")
        sys.exit(1)

    logging.info("✅ Required environment variables verified")

def connect_to_mongodb():
    """Connect to MongoDB database"""
    try:
        mongodb_uri = os.getenv("MONGODB_URI")
        client = MongoClient(mongodb_uri)
        db = client.get_default_database()
        collection = db["bewertungen"]

        # Test connection
        client.server_info()
        logging.info("✅ Connected to MongoDB")

        return collection
    except Exception as e:
        logging.error(f"❌ MongoDB connection failed: {e}")
        sys.exit(1)

def find_failed_valuation(collection, doc_id: Optional[str] = None):
    """Find document with missing bewertung field"""
    try:
        if doc_id:
            # Find specific document by ID
            if not ObjectId.is_valid(doc_id):
                logging.error(f"❌ Invalid ObjectId: {doc_id}")
                return None

            query = {"_id": ObjectId(doc_id)}
        else:
            # Find most recent document with missing/empty bewertung
            query = {
                "$or": [
                    {"bewertung": {"$exists": False}},
                    {"bewertung": None},
                    {"bewertung": ""}
                ]
            }

        doc = collection.find_one(query, sort=[("_id", -1)])

        if not doc:
            if doc_id:
                logging.error(f"❌ Document not found with ID: {doc_id}")
            else:
                logging.error("❌ No documents found with missing bewertung")
            return None

        doc_id = str(doc["_id"])
        logging.info(f"✅ Found document: {doc_id}")
        logging.info(f"   Status: {doc.get('status', 'unknown')}")
        logging.info(f"   Stripe Session: {doc.get('stripeSessionId', 'none')}")
        logging.info(f"   Has bewertung: {bool(doc.get('bewertung'))}")

        return doc

    except Exception as e:
        logging.error(f"❌ Error finding document: {e}")
        return None

def extract_horse_data(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Extract horse data from MongoDB document matching BewertungRequest schema"""
    horse_data = {
        # Required fields
        "rasse": doc.get("rasse"),
        "alter": doc.get("alter"),
        "geschlecht": doc.get("geschlecht"),
        "stockmass": doc.get("stockmass"),
        "ausbildung": doc.get("ausbildung"),

        # Optional fields
        "abstammung": doc.get("abstammung"),
        "haupteignung": doc.get("haupteignung"),
        "standort": doc.get("standort"),
        "aku": doc.get("aku"),
        "erfolge": doc.get("erfolge"),
        "charakter": doc.get("charakter"),
        "besonderheiten": doc.get("besonderheiten")
    }

    # Validate required fields
    required_fields = ["rasse", "alter", "geschlecht", "stockmass", "ausbildung"]
    missing_fields = [f for f in required_fields if not horse_data.get(f)]

    if missing_fields:
        logging.error(f"❌ Missing required horse data fields: {missing_fields}")
        return None

    logging.info("✅ Horse data extracted:")
    logging.info(f"   Rasse: {horse_data['rasse']}")
    logging.info(f"   Alter: {horse_data['alter']}")
    logging.info(f"   Geschlecht: {horse_data['geschlecht']}")
    logging.info(f"   Stockmaß: {horse_data['stockmass']} cm")
    logging.info(f"   Ausbildung: {horse_data['ausbildung']}")

    return horse_data

def generate_valuation(horse_data: Dict[str, Any]):
    """Generate AI valuation using AIService (Gemini 2.5 Pro via OpenRouter)"""
    try:
        logging.info("🚀 Initializing AIService...")
        ai_service = AIService()

        logging.info("🚀 Generating valuation with OpenRouter 2-Stage Fallback System...")
        logging.info("   Primary Model: Gemini 2.5 Pro")
        logging.info("   Fallback Model: Claude 3.5 Sonnet")

        response = ai_service.generate_valuation(horse_data)

        logging.info(f"✅ Valuation generated successfully!")
        logging.info(f"   Model used: {response.model}")
        logging.info(f"   Model version: {response.model_version}")
        logging.info(f"   Tier: {response.tier}")
        logging.info(f"   Content length: {len(response.content)} characters")

        if response.usage:
            logging.info(f"   Token usage: {response.usage}")

        return response

    except Exception as e:
        logging.error(f"❌ AI generation failed: {e}")
        return None

def update_document(collection, doc_id: str, ai_response):
    """Update MongoDB document with generated valuation"""
    try:
        result = collection.update_one(
            {"_id": ObjectId(doc_id)},
            {
                "$set": {
                    "bewertung": ai_response.content,
                    "ai_model": ai_response.model.lower(),
                    "model_version": ai_response.model_version,
                    "tier": ai_response.tier,
                    "usage": ai_response.usage
                }
            }
        )

        if result.modified_count == 1:
            logging.info(f"✅ Document updated successfully: {doc_id}")
            return True
        else:
            logging.error(f"❌ Document update failed - no document modified")
            return False

    except Exception as e:
        logging.error(f"❌ Error updating document: {e}")
        return False

def print_shareable_link(doc_id: str):
    """Print shareable link for customer"""
    link = f"https://pferdewert.de/bewertung/ergebnis?id={doc_id}"

    print("\n" + "="*60)
    print("✅ BEWERTUNG ERFOLGREICH GENERIERT!")
    print("="*60)
    print(f"\n📋 Dokument-ID: {doc_id}")
    print(f"\n🔗 Shareable Link für Kundin:")
    print(f"\n   {link}")
    print("\n" + "="*60 + "\n")

def main():
    """Main script execution"""
    print("\n" + "="*60)
    print("🐴 PferdeWert - Retry Valuation Script")
    print("="*60 + "\n")

    # Check for command line argument (optional document ID)
    doc_id = sys.argv[1] if len(sys.argv) > 1 else None

    if doc_id:
        logging.info(f"🎯 Targeting specific document: {doc_id}")
    else:
        logging.info("🔍 Searching for most recent failed valuation...")

    # Step 1: Load environment
    load_environment()

    # Step 2: Connect to MongoDB
    collection = connect_to_mongodb()

    # Step 3: Find failed valuation
    doc = find_failed_valuation(collection, doc_id)
    if not doc:
        sys.exit(1)

    doc_id = str(doc["_id"])

    # Step 4: Extract horse data
    horse_data = extract_horse_data(doc)
    if not horse_data:
        sys.exit(1)

    # Step 5: Generate AI valuation
    ai_response = generate_valuation(horse_data)
    if not ai_response:
        sys.exit(1)

    # Step 6: Update document in database
    if not update_document(collection, doc_id, ai_response):
        sys.exit(1)

    # Step 7: Print shareable link
    print_shareable_link(doc_id)

    logging.info("✅ Script completed successfully!")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️ Script interrupted by user")
        sys.exit(1)
    except Exception as e:
        logging.error(f"❌ Unexpected error: {e}")
        sys.exit(1)
