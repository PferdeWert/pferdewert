#!/usr/bin/env python3
"""
PferdeWert Daily Article Automation
Automated SEO article creation pipeline for Mini-Pages

Run: python3 scripts/daily_article.py
Cron: 0 6 * * * cd /home/dev && python3 scripts/daily_article.py >> logs/daily_article.log 2>&1
"""

import os
import json
import subprocess
import logging
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, Any

# Configure logging
LOG_DIR = Path("/home/dev/logs")
LOG_DIR.mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_DIR / f"daily_article_{datetime.now().strftime('%Y%m%d')}.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuration
CLAUDE_CLI = "/home/dev/node_modules/.bin/claude"
WORKING_DIR = "/home/dev"
QUEUE_FILE = Path("/home/dev/SEO/article_queue.json")
TIMEOUT_MINUTES = 10  # Per phase timeout

# Optional: Telegram notifications
TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

# Dry run mode (set to False for production)
DRY_RUN = os.getenv('DRY_RUN', 'true').lower() == 'true'


def send_telegram(message: str) -> None:
    """Send notification to Telegram (optional)"""
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        logger.info(f"[Telegram disabled] {message}")
        return

    try:
        import requests
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        requests.post(url, json={
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "HTML"
        }, timeout=10)
    except Exception as e:
        logger.warning(f"Telegram notification failed: {e}")


def run_claude(prompt: str, timeout_minutes: int = TIMEOUT_MINUTES) -> tuple[bool, str]:
    """
    Execute Claude Code CLI command
    Returns: (success: bool, output: str)
    """
    try:
        logger.info(f"Running Claude: {prompt[:80]}...")

        if DRY_RUN:
            logger.info("[DRY RUN] Would execute Claude command")
            return True, "[DRY RUN] Simulated success"

        result = subprocess.run(
            [CLAUDE_CLI, "--print", "--dangerously-skip-permissions", prompt],
            cwd=WORKING_DIR,
            capture_output=True,
            text=True,
            timeout=timeout_minutes * 60
        )

        if result.returncode == 0:
            output = result.stdout.strip()
            logger.info(f"Claude success: {len(output)} chars")
            return True, output
        else:
            error = result.stderr.strip() if result.stderr else "Unknown error"
            logger.error(f"Claude failed: {error}")
            return False, error

    except subprocess.TimeoutExpired:
        logger.error(f"Claude timed out after {timeout_minutes} minutes")
        return False, f"Timeout after {timeout_minutes} minutes"
    except Exception as e:
        logger.error(f"Claude error: {e}")
        return False, str(e)


def load_queue() -> Dict[str, Any]:
    """Load article queue from JSON file"""
    if not QUEUE_FILE.exists():
        logger.error(f"Queue file not found: {QUEUE_FILE}")
        return {"pending": [], "completed": [], "failed": []}

    with open(QUEUE_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_queue(queue: Dict[str, Any]) -> None:
    """Save article queue to JSON file"""
    with open(QUEUE_FILE, 'w', encoding='utf-8') as f:
        json.dump(queue, f, indent=2, ensure_ascii=False)
    logger.info("Queue saved")


def get_next_article(queue: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Get next pending article from queue"""
    pending = queue.get("pending", [])
    if not pending:
        return None

    # Sort by priority (lower = higher priority)
    pending.sort(key=lambda x: x.get("priority", 999))
    return pending[0]


def mark_completed(queue: Dict[str, Any], article: Dict[str, Any]) -> None:
    """Move article from pending to completed"""
    queue["pending"] = [a for a in queue["pending"] if a["keyword"] != article["keyword"]]
    article["completed_at"] = datetime.now().isoformat()
    queue.setdefault("completed", []).append(article)


def mark_failed(queue: Dict[str, Any], article: Dict[str, Any], error: str) -> None:
    """Move article from pending to failed"""
    queue["pending"] = [a for a in queue["pending"] if a["keyword"] != article["keyword"]]
    article["failed_at"] = datetime.now().isoformat()
    article["error"] = error
    queue.setdefault("failed", []).append(article)


def git_commit_and_push(keyword: str, slug: str) -> tuple[bool, str]:
    """Commit and push new article to GitHub"""
    if DRY_RUN:
        logger.info("[DRY RUN] Would git commit and push")
        return True, "DRY RUN"

    try:
        # Stage the new page file
        page_path = f"frontend/pages/pferde-ratgeber/{slug}.tsx"

        subprocess.run(
            ["git", "add", page_path],
            cwd=WORKING_DIR,
            check=True
        )

        # Also stage any SEO content files
        seo_path = f"SEO/SEO-CONTENT/{slug}"
        subprocess.run(
            ["git", "add", seo_path],
            cwd=WORKING_DIR,
            check=False  # May not exist
        )

        # Stage registry update
        subprocess.run(
            ["git", "add", "frontend/lib/ratgeber-registry.ts"],
            cwd=WORKING_DIR,
            check=False
        )

        # Stage hero image and attributions
        subprocess.run(
            ["git", "add", "frontend/public/images/ratgeber/"],
            cwd=WORKING_DIR,
            check=False
        )

        # Commit
        commit_msg = f"feat(ratgeber): Add {keyword} article\n\n🤖 Generated with Claude Code Automation"
        subprocess.run(
            ["git", "commit", "-m", commit_msg],
            cwd=WORKING_DIR,
            check=True
        )

        # Push
        subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=WORKING_DIR,
            check=True
        )

        logger.info(f"Git push successful for {slug}")
        return True, "Pushed to GitHub"

    except subprocess.CalledProcessError as e:
        logger.error(f"Git operation failed: {e}")
        return False, str(e)


def fetch_hero_image(keyword: str, slug: str) -> Optional[str]:
    """
    Fetch hero image from Wikimedia Commons.
    Returns the image filename or None if failed.
    """
    if DRY_RUN:
        logger.info("[DRY RUN] Would fetch hero image")
        return "dry-run-image.webp"

    try:
        # Import image_fetcher module
        import sys
        sys.path.insert(0, str(Path(WORKING_DIR) / "scripts"))
        from image_fetcher import fetch_image

        logger.info(f"Fetching hero image for: {keyword}")
        image_name = fetch_image(keyword)

        if image_name:
            logger.info(f"Hero image fetched: {image_name}")
            # Save image reference for /page command
            image_ref_file = Path(WORKING_DIR) / f"SEO/SEO-CONTENT/{slug}/hero-image.txt"
            image_ref_file.parent.mkdir(parents=True, exist_ok=True)
            image_ref_file.write_text(image_name)
            return image_name
        else:
            logger.warning("Failed to fetch hero image, using fallback")
            return None

    except Exception as e:
        logger.error(f"Hero image fetch failed: {e}")
        return None


def create_article(article: Dict[str, Any]) -> tuple[bool, str]:
    """
    Execute full article creation pipeline:
    1. /seo-mini - Create content
    2. german-quality-checker - Review language
    3. Fetch hero image from Wikimedia
    4. /page - Generate Next.js page
    5. Git push
    """
    keyword = article["keyword"]
    pillar = article.get("pillar", "")
    slug = keyword.lower().replace(" ", "-").replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")

    logger.info(f"="*60)
    logger.info(f"Starting article creation: {keyword}")
    logger.info(f"Pillar: {pillar}")
    logger.info(f"Slug: {slug}")
    logger.info(f"="*60)

    # Phase 1: /seo-mini
    logger.info("PHASE 1: Running /seo-mini...")
    success, output = run_claude(f"/seo-mini {keyword} --pillar={pillar}")
    if not success:
        return False, f"Phase 1 (seo-mini) failed: {output}"
    logger.info(f"Phase 1 complete: {output[:200]}...")

    # Phase 2: German Quality Check
    logger.info("PHASE 2: Running german-quality-checker...")
    success, output = run_claude(
        f"Use the german-quality-checker agent to review the content for '{keyword}'. "
        f"Input: SEO/SEO-CONTENT/{slug}/content/final-article.md"
    )
    if not success:
        return False, f"Phase 2 (quality-check) failed: {output}"
    logger.info(f"Phase 2 complete: {output[:200]}...")

    # Phase 3: Fetch hero image
    logger.info("PHASE 3: Fetching hero image...")
    hero_image = fetch_hero_image(keyword, slug)
    if hero_image:
        logger.info(f"Phase 3 complete: {hero_image}")
    else:
        logger.warning("Phase 3: No hero image, /page will use fallback")

    # Phase 4: /page
    logger.info("PHASE 4: Running /page...")
    success, output = run_claude(f"/page {keyword}")
    if not success:
        return False, f"Phase 4 (page) failed: {output}"
    logger.info(f"Phase 4 complete: {output[:200]}...")

    # Phase 5: Git commit & push
    logger.info("PHASE 5: Git commit & push...")
    success, output = git_commit_and_push(keyword, slug)
    if not success:
        return False, f"Phase 5 (git) failed: {output}"

    return True, f"Article '{keyword}' created successfully!"


def main():
    """Main execution"""
    start_time = datetime.now()
    logger.info("="*60)
    logger.info("PferdeWert Daily Article Automation")
    logger.info(f"Started: {start_time.isoformat()}")
    logger.info(f"Dry Run: {DRY_RUN}")
    logger.info("="*60)

    # Load queue
    queue = load_queue()
    pending_count = len(queue.get("pending", []))
    logger.info(f"Pending articles: {pending_count}")

    if pending_count == 0:
        logger.info("No pending articles. Exiting.")
        send_telegram("ℹ️ <b>Daily Article:</b> Keine Artikel in der Queue")
        return

    # Get next article
    article = get_next_article(queue)
    if not article:
        logger.info("No article to process. Exiting.")
        return

    keyword = article["keyword"]
    logger.info(f"Processing: {keyword}")
    send_telegram(f"🚀 <b>Starting:</b> {keyword}")

    # Create article
    success, message = create_article(article)

    # Update queue
    if success:
        mark_completed(queue, article)
        save_queue(queue)

        duration = (datetime.now() - start_time).total_seconds() / 60
        final_msg = (
            f"✅ <b>Article Created!</b>\n"
            f"📝 {keyword}\n"
            f"⏱️ {duration:.1f} minutes\n"
            f"📊 Remaining: {len(queue.get('pending', []))}"
        )
        logger.info(final_msg)
        send_telegram(final_msg)
    else:
        mark_failed(queue, article, message)
        save_queue(queue)

        error_msg = (
            f"❌ <b>Article Failed!</b>\n"
            f"📝 {keyword}\n"
            f"💥 {message}"
        )
        logger.error(error_msg)
        send_telegram(error_msg)

    logger.info(f"Finished: {datetime.now().isoformat()}")


if __name__ == "__main__":
    main()
