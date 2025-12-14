#!/usr/bin/env python3
"""
PferdeWert Image Fetcher
Fetches horse images from Wikimedia Commons, converts to WebP, and names descriptively.

IMPORTANT: Image names describe the MOTIF, NOT the page slug!
- ❌ islandpferd-kaufen.webp (page slug - FORBIDDEN)
- ✅ islandpferd-toelt-gruene-wiese.webp (describes image content)

Usage:
    python3 scripts/image_fetcher.py "islandpferd"
    python3 scripts/image_fetcher.py "quarter horse"
    python3 scripts/image_fetcher.py "pferde bayern" --fallback="pferde-weide"
"""

import os
import sys
import json
import re
import requests
import subprocess
import logging
from pathlib import Path
from datetime import datetime
from typing import Optional, Dict, Any, List
from urllib.parse import unquote

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration
OUTPUT_DIR = Path("/Users/benjaminreder/Developer/pferdewert/frontend/public/images/ratgeber")
ATTRIBUTION_FILE = Path("/Users/benjaminreder/Developer/pferdewert/frontend/public/images/ratgeber/image-attributions.json")
MIN_WIDTH = 800  # Minimum source width
MAX_WIDTH = 1200  # Output width
WEBP_QUALITY = 80

# Wikimedia Commons API
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
USER_AGENT = "PferdeWertBot/1.0 (https://pferdewert.de; info@pferdewert.de)"


def search_commons(query: str, limit: int = 10) -> List[Dict[str, Any]]:
    """Search Wikimedia Commons for images"""
    params = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrnamespace": 6,  # File namespace
        "gsrsearch": f"filetype:image {query}",
        "gsrlimit": limit,
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata|mime",
        "iiurlwidth": MAX_WIDTH
    }

    try:
        headers = {"User-Agent": USER_AGENT}
        response = requests.get(COMMONS_API, params=params, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()

        pages = data.get("query", {}).get("pages", {})
        results = []

        logger.info(f"Found {len(pages)} raw results")

        for page_id, page_data in pages.items():
            if "imageinfo" not in page_data:
                continue

            info = page_data["imageinfo"][0]
            title = page_data.get("title", "Unknown")
            width = info.get("width", 0)
            mime = info.get("mime", "")

            # Skip if too small
            if width < MIN_WIDTH:
                logger.debug(f"Skipped (too small {width}px): {title}")
                continue

            # Skip non-image formats
            if not mime.startswith("image/"):
                logger.debug(f"Skipped (not image): {title}")
                continue
            if "svg" in mime.lower():
                logger.debug(f"Skipped (SVG): {title}")
                continue

            logger.info(f"Valid: {title} ({width}px, {mime})")

            metadata = info.get("extmetadata", {})

            results.append({
                "title": page_data.get("title", ""),
                "url": info.get("thumburl") or info.get("url"),
                "original_url": info.get("url"),
                "width": info.get("width"),
                "height": info.get("height"),
                "mime": mime,
                "license": metadata.get("LicenseShortName", {}).get("value", "Unknown"),
                "artist": metadata.get("Artist", {}).get("value", "Unknown"),
                "description": metadata.get("ImageDescription", {}).get("value", ""),
                "categories": metadata.get("Categories", {}).get("value", "")
            })

        # Sort by width (prefer larger images)
        results.sort(key=lambda x: x["width"], reverse=True)
        return results

    except Exception as e:
        logger.error(f"Commons search failed: {e}")
        return []


def extract_descriptive_name(image_data: Dict[str, Any], search_query: str) -> str:
    """
    Generate a descriptive filename based on image content, NOT page slug.

    Examples:
    - "islandpferd" + image of horse tölting → "islandpferd-toelt-gruene-wiese.webp"
    - "friese" + image of black horse → "friese-schwarz-portrait.webp"
    - "pferde bayern" + image of warmblood → "warmblut-braun-weide.webp"
    """
    # Clean the title (remove "File:" prefix and extension)
    title = image_data.get("title", "")
    title = re.sub(r"^File:", "", title, flags=re.IGNORECASE)
    title = re.sub(r"\.[^.]+$", "", title)  # Remove extension

    # Get description
    description = image_data.get("description", "")
    # Strip HTML tags
    description = re.sub(r"<[^>]+>", "", description)

    # Combine title and description for analysis
    full_text = f"{title} {description}".lower()

    # Map search queries to German breed names
    breed_mapping = {
        "icelandic": "islandpferd",
        "icelandic horse": "islandpferd",
        "islandpferd": "islandpferd",
        "islandpferd kaufen": "islandpferd",
        "quarter horse": "quarter-horse",
        "quarter horse kaufen": "quarter-horse",
        "friesian": "friese",
        "friese": "friese",
        "friese kaufen": "friese",
        "trakehner": "trakehner",
        "trakehner kaufen": "trakehner",
        "haflinger": "haflinger",
        "haflinger kaufen": "haflinger",
        "arabian": "araber",
        "araber": "araber",
        "hannoveraner": "hannoveraner",
        "holsteiner": "holsteiner",
        "oldenburger": "oldenburger",
        "westfale": "westfale",
    }

    # German regions (for regional searches like "pferd kaufen bayern")
    german_regions = [
        "bayern", "nrw", "nordrhein-westfalen", "sachsen", "schleswig-holstein",
        "brandenburg", "hessen", "baden-wuerttemberg", "baden-württemberg",
        "niedersachsen", "thueringen", "thüringen", "rheinland-pfalz",
        "mecklenburg-vorpommern", "saarland", "berlin", "hamburg", "bremen"
    ]

    # Breeds that might appear in image titles/descriptions
    breed_keywords = {
        "warmblut": "warmblut", "warmblood": "warmblut",
        "vollblut": "vollblut", "thoroughbred": "vollblut",
        "kaltblut": "kaltblut", "coldblood": "kaltblut", "draft": "kaltblut",
        "pony": "pony", "shetland": "shetlandpony",
        "welsh": "welsh-pony", "connemara": "connemara",
        "andalusier": "andalusier", "andalusian": "andalusier", "pre": "andalusier",
        "lusitano": "lusitano", "lipizzaner": "lipizzaner",
        "fjord": "fjordpferd", "norweger": "fjordpferd",
        "appaloosa": "appaloosa", "paint": "paint-horse",
        "araber": "araber", "arab": "araber", "arabian": "araber",
        "hannoveraner": "hannoveraner", "hanoverian": "hannoveraner",
        "holsteiner": "holsteiner", "holstein": "holsteiner",
        "trakehner": "trakehner", "oldenburg": "oldenburger",
        "westfale": "westfale", "westphalian": "westfale",
        "friese": "friese", "friesian": "friese", "frisian": "friese",
        "haflinger": "haflinger",
        "islandpferd": "islandpferd", "icelandic": "islandpferd", "islander": "islandpferd",
        "quarter": "quarter-horse", "quarterhorse": "quarter-horse",
    }

    # Detect if this is a regional search
    query_lower = search_query.lower()
    is_regional_search = any(region in query_lower for region in german_regions)
    is_generic_search = query_lower.startswith("pferd") and not any(breed in query_lower for breed in breed_mapping)

    # Build descriptive name from title and description
    name_parts = []

    # Step 1: Determine base name
    if is_regional_search or is_generic_search:
        # For regional/generic searches, try to extract breed from image content
        detected_breed = None
        for keyword, breed_name in breed_keywords.items():
            if keyword in full_text:
                detected_breed = breed_name
                break

        if detected_breed:
            name_parts.append(detected_breed)
        else:
            # Use generic "pferd" but try to add color or type
            name_parts.append("pferd")
    else:
        # Specific breed search - use mapping
        base = breed_mapping.get(query_lower, query_lower.split()[0])
        base = base.replace(" ", "-")
        name_parts.append(base)

    # Step 2: Extract descriptive words from title
    title_words = re.findall(r"[a-zA-ZäöüÄÖÜß]+", full_text)

    # Keywords that describe the image content
    descriptive_keywords = {
        # Colors (German + English)
        "schwarz": "schwarz", "black": "schwarz",
        "braun": "braun", "brown": "braun", "bay": "braun",
        "weiss": "weiss", "weiß": "weiss", "white": "weiss",
        "grau": "grau", "grey": "grau", "gray": "grau",
        "fuchs": "fuchs", "chestnut": "fuchs", "sorrel": "fuchs",
        "rappe": "rappe",
        "schimmel": "schimmel", "dapple": "schimmel",
        "palomino": "palomino", "cremello": "cremello",
        "schecke": "schecke", "pinto": "schecke", "paint": "schecke",
        # Actions
        "toelt": "toelt", "tölt": "toelt", "tolt": "toelt", "toelting": "toelt",
        "galopp": "galopp", "gallop": "galopp", "galloping": "galopp", "canter": "galopp",
        "trab": "trab", "trot": "trab", "trotting": "trab",
        "spring": "spring", "jump": "spring", "jumping": "spring",
        "dressur": "dressur", "dressage": "dressur",
        "lauf": "lauf", "running": "lauf", "run": "lauf",
        "grasen": "grasen", "grazing": "grasen", "graze": "grasen",
        "fressen": "grasen",
        # Settings
        "wiese": "wiese", "meadow": "wiese", "grass": "wiese",
        "weide": "weide", "pasture": "weide", "paddock": "weide",
        "koppel": "koppel", "paddock": "koppel",
        "stall": "stall", "stable": "stall", "barn": "stall",
        "feld": "feld", "field": "feld",
        "berg": "berg", "mountain": "berg", "hill": "berg",
        "strand": "strand", "beach": "strand", "coast": "strand",
        "schnee": "schnee", "snow": "schnee", "winter": "winter",
        "sommer": "sommer", "summer": "sommer",
        "herbst": "herbst", "autumn": "herbst", "fall": "herbst",
        "wald": "wald", "forest": "wald", "wood": "wald",
        # Types/Poses
        "portrait": "portrait", "kopf": "kopf", "head": "kopf",
        "herde": "herde", "herd": "herde", "group": "herde",
        "fohlen": "fohlen", "foal": "fohlen", "colt": "fohlen", "filly": "fohlen",
        "stute": "stute", "mare": "stute",
        "hengst": "hengst", "stallion": "hengst",
        "wallach": "wallach", "gelding": "wallach",
        "reiter": "reiter", "rider": "reiter", "riding": "reiter",
    }

    # Find matching descriptive words (use normalized German terms)
    found_descriptors = []
    used_categories = set()  # Avoid duplicates from same category

    for word in title_words:
        word_lower = word.lower()
        if word_lower in descriptive_keywords:
            normalized = descriptive_keywords[word_lower]
            # Avoid adding the same concept twice (e.g., both "black" and "schwarz")
            if normalized not in found_descriptors:
                found_descriptors.append(normalized)
                if len(found_descriptors) >= 3:
                    break

    # Add found descriptors
    name_parts.extend(found_descriptors)

    # If still not descriptive enough, add generic based on categories or content
    if len(name_parts) < 2:
        categories = image_data.get("categories", "").lower()
        if "portrait" in categories or "head" in categories:
            name_parts.append("portrait")
        elif "gallop" in categories or "running" in categories:
            name_parts.append("galopp")
        elif "foal" in categories:
            name_parts.append("fohlen")
        elif "mare" in categories:
            name_parts.append("stute")
        elif "meadow" in categories or "pasture" in categories:
            name_parts.append("weide")
        else:
            # Last resort: use a generic but descriptive term
            # Don't use random words from filename which are often meaningless
            name_parts.append("weide")

    # Normalize German umlauts
    name = "-".join(name_parts)
    name = name.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    name = re.sub(r"[^a-z0-9-]", "", name)
    name = re.sub(r"-+", "-", name)  # Remove multiple hyphens
    name = name.strip("-")

    # Ensure unique by checking if file exists
    final_name = f"{name}.webp"
    counter = 1
    while (OUTPUT_DIR / final_name).exists():
        final_name = f"{name}-{counter}.webp"
        counter += 1

    return final_name


def download_and_convert(url: str, output_name: str) -> Optional[Path]:
    """Download image and convert to WebP"""
    try:
        # Download to temp file
        logger.info(f"Downloading: {url[:80]}...")
        headers = {"User-Agent": USER_AGENT}
        response = requests.get(url, headers=headers, timeout=60)
        response.raise_for_status()

        # Save temp file
        temp_path = OUTPUT_DIR / "temp_download"
        with open(temp_path, "wb") as f:
            f.write(response.content)

        # Convert to WebP using sips (macOS) or convert (ImageMagick)
        output_path = OUTPUT_DIR / output_name

        # Try sips first (macOS native)
        try:
            # Resize if needed
            subprocess.run([
                "sips",
                "--resampleWidth", str(MAX_WIDTH),
                "--setProperty", "format", "webp",
                "--setProperty", "formatOptions", str(WEBP_QUALITY),
                temp_path,
                "--out", str(output_path)
            ], check=True, capture_output=True)
            logger.info(f"Converted with sips: {output_name}")
        except (subprocess.CalledProcessError, FileNotFoundError):
            # Fallback to ImageMagick convert
            try:
                subprocess.run([
                    "convert",
                    str(temp_path),
                    "-resize", f"{MAX_WIDTH}x>",
                    "-quality", str(WEBP_QUALITY),
                    str(output_path)
                ], check=True, capture_output=True)
                logger.info(f"Converted with ImageMagick: {output_name}")
            except (subprocess.CalledProcessError, FileNotFoundError) as e:
                logger.error(f"Conversion failed: {e}")
                # Try Python Pillow as last resort
                try:
                    from PIL import Image
                    img = Image.open(temp_path)
                    if img.width > MAX_WIDTH:
                        ratio = MAX_WIDTH / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
                    img.save(output_path, "WEBP", quality=WEBP_QUALITY)
                    logger.info(f"Converted with Pillow: {output_name}")
                except ImportError:
                    logger.error("No image conversion tool available (sips/convert/Pillow)")
                    return None

        # Clean up temp file
        temp_path.unlink(missing_ok=True)

        if output_path.exists():
            size_kb = output_path.stat().st_size / 1024
            logger.info(f"Saved: {output_path} ({size_kb:.1f} KB)")
            return output_path

        return None

    except Exception as e:
        logger.error(f"Download/convert failed: {e}")
        return None


def save_attribution(image_data: Dict[str, Any], output_name: str):
    """Save image attribution to JSON file"""
    # Load existing attributions
    attributions = {}
    if ATTRIBUTION_FILE.exists():
        with open(ATTRIBUTION_FILE, "r", encoding="utf-8") as f:
            attributions = json.load(f)

    # Add new attribution
    attributions[output_name] = {
        "source": "Wikimedia Commons",
        "original_title": image_data.get("title", ""),
        "original_url": image_data.get("original_url", ""),
        "license": image_data.get("license", "Unknown"),
        "artist": re.sub(r"<[^>]+>", "", image_data.get("artist", "Unknown")),  # Strip HTML
        "fetched_date": datetime.now().isoformat(),
        "attribution_text": f"© {re.sub(r'<[^>]+>', '', image_data.get('artist', 'Unknown'))} / Wikimedia Commons / {image_data.get('license', 'CC')}"
    }

    # Save
    with open(ATTRIBUTION_FILE, "w", encoding="utf-8") as f:
        json.dump(attributions, f, indent=2, ensure_ascii=False)

    logger.info(f"Attribution saved for {output_name}")


def fetch_image(search_query: str, fallback_query: Optional[str] = None) -> Optional[str]:
    """
    Main function: Search, download, convert, and save image.
    Returns the output filename or None if failed.
    """
    logger.info(f"Searching for: {search_query}")

    # German regions map to their warmblood breeds for better image results
    regional_breed_mapping = {
        "bayern": "bayerisches warmblut",
        "nrw": "westfale rheinländer",
        "nordrhein-westfalen": "westfale",
        "sachsen": "sächsisches warmblut",
        "schleswig-holstein": "holsteiner",
        "brandenburg": "brandenburger warmblut",
        "hessen": "hessisches warmblut",
        "baden-wuerttemberg": "württemberger",
        "baden-württemberg": "württemberger",
        "niedersachsen": "hannoveraner",
        "thueringen": "thüringer warmblut",
        "thüringen": "thüringer warmblut",
    }

    # Check if this is a regional search
    query_lower = search_query.lower()

    # Strip "kaufen" and clean up query for better image search
    clean_query = query_lower.replace(" kaufen", "").replace("kaufen ", "").strip()

    regional_breed = None
    for region, breed in regional_breed_mapping.items():
        if region in query_lower:
            regional_breed = breed
            logger.info(f"Detected regional search: {region} → {breed}")
            break

    # Map German breed names to English equivalents for Wikimedia search
    breed_english_mapping = {
        "islandpferd": ["icelandic horse", "icelandic pony", "islander"],
        "friese": ["friesian horse", "friesian"],
        "trakehner": ["trakehner horse", "trakehner"],
        "haflinger": ["haflinger horse", "haflinger"],
        "araber": ["arabian horse", "arabian"],
        "quarter horse": ["quarter horse", "american quarter horse"],
        "hannoveraner": ["hanoverian horse", "hanoverian"],
        "holsteiner": ["holsteiner horse", "holstein horse"],
        "oldenburger": ["oldenburg horse", "oldenburg"],
        "warmblut": ["warmblood horse", "warmblood"],
    }

    # Build search queries - try multiple variations
    search_variations = []

    if regional_breed:
        # For regional searches, prioritize breed-specific searches
        search_variations = [
            regional_breed,  # Regional warmblood breed
            f"{regional_breed} horse",
            "warmblut pferd weide",  # Generic warmblood
            "horse pasture meadow",  # Generic horse photo
        ]
    else:
        # Check if we have English equivalents for this breed
        english_terms = breed_english_mapping.get(clean_query, [])

        # Standard breed/topic search
        search_variations = []

        # First try English breed names (better Wikimedia coverage)
        for eng in english_terms:
            search_variations.append(eng)

        # Then try German terms
        search_variations.extend([
            clean_query,  # Cleaned query without "kaufen"
            f"{clean_query} horse",  # With English
            f"{clean_query} pferd",  # With German
        ])

    # Search Commons with variations
    results = []
    for variation in search_variations:
        logger.info(f"Trying search: {variation}")
        results = search_commons(variation)
        if results:
            # Filter out paintings/historical images by checking for photo indicators
            photo_results = []
            for r in results:
                title_lower = r.get("title", "").lower()
                # Skip if likely a painting/historical
                if any(skip in title_lower for skip in ["painting", "portrait", "album", "caroussel", "gustav", "ludwig", "piloty", "kraus"]):
                    logger.debug(f"Skipped painting/historical: {r.get('title')}")
                    continue
                photo_results.append(r)

            if photo_results:
                results = photo_results
                break

    if not results and fallback_query:
        logger.info(f"No results, trying fallback: {fallback_query}")
        results = search_commons(f"{fallback_query} horse pferd")

    if not results:
        # Last resort: generic horse search
        logger.info("Trying generic horse search as last resort")
        results = search_commons("horse pasture meadow")

    if not results:
        logger.error("No suitable images found")
        return None

    # Try first few results
    for image_data in results[:3]:
        # Generate descriptive name
        output_name = extract_descriptive_name(image_data, search_query)
        logger.info(f"Generated name: {output_name}")

        # Download and convert
        url = image_data.get("url")
        if not url:
            continue

        output_path = download_and_convert(url, output_name)

        if output_path:
            # Save attribution
            save_attribution(image_data, output_name)
            return output_name

    logger.error("All download attempts failed")
    return None


def main():
    """CLI entry point"""
    if len(sys.argv) < 2:
        print("Usage: python3 image_fetcher.py <search_query> [--fallback=<fallback_query>]")
        print("Example: python3 image_fetcher.py 'islandpferd'")
        print("Example: python3 image_fetcher.py 'pferde bayern' --fallback='pferde weide'")
        sys.exit(1)

    search_query = sys.argv[1]
    fallback_query = None

    # Parse --fallback argument
    for arg in sys.argv[2:]:
        if arg.startswith("--fallback="):
            fallback_query = arg.split("=", 1)[1]

    result = fetch_image(search_query, fallback_query)

    if result:
        print(f"✅ Image saved: {result}")
        print(f"📁 Path: {OUTPUT_DIR / result}")
    else:
        print("❌ Failed to fetch image")
        sys.exit(1)


if __name__ == "__main__":
    main()
