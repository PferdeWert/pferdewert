#!/usr/bin/env python3
"""
PferdeWert Article Quality Gate
Automated quality checks for SEO articles before/after publication

Checks:
1. Author is "Benjamin Reder" (not "PferdeWert Redaktion") - EEAT
2. Hero image exists and path is valid
3. Publication date is present
4. Internal links are valid (min 5-7 links, all return 200)
5. No duplicate FAQ schema
6. SEO metadata is complete
7. Live page returns 200 and has correct meta tags

Usage:
  python3 scripts/article_quality_gate.py --slug pferd-kaufen-nrw [--live]
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum

# Configuration
WORKING_DIR = Path(__file__).parent.parent
FRONTEND_DIR = WORKING_DIR / "frontend"
PAGES_DIR = FRONTEND_DIR / "pages" / "pferde-ratgeber"
IMAGES_DIR = FRONTEND_DIR / "public" / "images" / "ratgeber"
LIVE_BASE_URL = "https://pferdewert.de/pferde-ratgeber"


class CheckStatus(Enum):
    PASS = "PASS"
    WARN = "WARN"
    FAIL = "FAIL"


@dataclass
class CheckResult:
    name: str
    status: CheckStatus
    message: str
    details: List[str] = field(default_factory=list)


def check_file_exists(slug: str) -> CheckResult:
    """Check if the page TSX file exists"""
    page_file = PAGES_DIR / f"{slug}.tsx"
    if page_file.exists():
        return CheckResult("Page File", CheckStatus.PASS, f"Found {page_file.name}")
    return CheckResult("Page File", CheckStatus.FAIL, f"Missing {page_file.name}")


def check_author(slug: str) -> CheckResult:
    """Check author is Benjamin Reder (not PferdeWert Redaktion)"""
    page_file = PAGES_DIR / f"{slug}.tsx"
    if not page_file.exists():
        return CheckResult("Author", CheckStatus.FAIL, "Page file not found")

    content = page_file.read_text()

    # Check for correct author
    if "name: 'Benjamin Reder'" in content or 'name: "Benjamin Reder"' in content:
        return CheckResult("Author", CheckStatus.PASS, "Author is Benjamin Reder")

    # Check for incorrect author
    if "PferdeWert Redaktion" in content:
        return CheckResult("Author", CheckStatus.FAIL,
                          "Author is 'PferdeWert Redaktion' - must be 'Benjamin Reder' for EEAT!")

    return CheckResult("Author", CheckStatus.WARN, "Could not detect author field")


def check_hero_image(slug: str) -> CheckResult:
    """Check hero image exists and is referenced correctly"""
    page_file = PAGES_DIR / f"{slug}.tsx"
    if not page_file.exists():
        return CheckResult("Hero Image", CheckStatus.FAIL, "Page file not found")

    content = page_file.read_text()

    # Find image reference in RatgeberHeroImage component
    image_pattern = r'src=["\']([^"\']+)["\']'
    images = re.findall(image_pattern, content)

    hero_images = [img for img in images if '/images/ratgeber/' in img]

    if not hero_images:
        return CheckResult("Hero Image", CheckStatus.FAIL, "No hero image reference found")

    hero_image = hero_images[0]

    # Check if image file exists
    image_filename = hero_image.split('/')[-1]
    image_path = IMAGES_DIR / image_filename

    if image_path.exists():
        file_size = image_path.stat().st_size / 1024  # KB
        return CheckResult("Hero Image", CheckStatus.PASS,
                          f"Hero image exists: {image_filename} ({file_size:.1f} KB)")

    return CheckResult("Hero Image", CheckStatus.FAIL,
                      f"Hero image missing: {image_filename}",
                      [f"Expected at: {image_path}"])


def check_publication_date(slug: str) -> CheckResult:
    """Check publication date is present"""
    page_file = PAGES_DIR / f"{slug}.tsx"
    if not page_file.exists():
        return CheckResult("Publication Date", CheckStatus.FAIL, "Page file not found")

    content = page_file.read_text()

    # Look for datePublished in various formats
    date_patterns = [
        r'datePublished=["\'](\d{4}-\d{2}-\d{2})["\']',
        r'"datePublished":\s*["\']([^"\']+)["\']',
        r'publishedAt.*?(\d{4}-\d{2}-\d{2})',
    ]

    for pattern in date_patterns:
        match = re.search(pattern, content)
        if match:
            return CheckResult("Publication Date", CheckStatus.PASS,
                              f"Publication date: {match.group(1)}")

    return CheckResult("Publication Date", CheckStatus.WARN,
                      "Could not find explicit publication date")


def check_internal_links(slug: str) -> CheckResult:
    """Check internal links - minimum count and validity"""
    page_file = PAGES_DIR / f"{slug}.tsx"
    if not page_file.exists():
        return CheckResult("Internal Links", CheckStatus.FAIL, "Page file not found")

    content = page_file.read_text()

    # Find LocalizedLink hrefs (internal links)
    link_pattern = r'LocalizedLink\s+href=["\']([^"\']+)["\']'
    links = re.findall(link_pattern, content)

    # Filter to ratgeber links only
    ratgeber_links = [l for l in links if '/pferde-ratgeber/' in l]

    details = []
    for link in ratgeber_links[:10]:  # Show first 10
        details.append(f"  - {link}")

    if len(ratgeber_links) >= 5:
        return CheckResult("Internal Links", CheckStatus.PASS,
                          f"Found {len(ratgeber_links)} internal ratgeber links",
                          details)
    elif len(ratgeber_links) >= 3:
        return CheckResult("Internal Links", CheckStatus.WARN,
                          f"Only {len(ratgeber_links)} internal links (recommend 5-7)",
                          details)
    else:
        return CheckResult("Internal Links", CheckStatus.FAIL,
                          f"Only {len(ratgeber_links)} internal links (minimum 5 required)",
                          details)


def check_duplicate_faq_schema(slug: str) -> CheckResult:
    """Check for duplicate FAQ schema"""
    page_file = PAGES_DIR / f"{slug}.tsx"
    if not page_file.exists():
        return CheckResult("FAQ Schema", CheckStatus.FAIL, "Page file not found")

    content = page_file.read_text()

    # Count FAQ schema occurrences
    faq_schema_count = content.count('@type.*FAQPage') + content.count('"@type": "FAQPage"') + content.count("'@type': 'FAQPage'")

    # Also check for faqItems being passed to RatgeberHead (which generates schema automatically)
    ratgeber_head_faq = 'faqItems={faqItems}' in content or 'faqItems={' in content
    manual_faq_schema = 'application/ld+json' in content and 'FAQPage' in content

    if ratgeber_head_faq and manual_faq_schema:
        return CheckResult("FAQ Schema", CheckStatus.FAIL,
                          "DUPLICATE FAQ Schema! RatgeberHead generates FAQ schema automatically.",
                          ["Remove manual FAQ schema <script> tag"])

    if ratgeber_head_faq or (faq_schema_count == 1):
        return CheckResult("FAQ Schema", CheckStatus.PASS, "Single FAQ schema (via RatgeberHead)")

    if faq_schema_count > 1:
        return CheckResult("FAQ Schema", CheckStatus.FAIL,
                          f"Found {faq_schema_count} FAQ schema instances - duplicates!")

    return CheckResult("FAQ Schema", CheckStatus.PASS, "No FAQ schema present (OK if no FAQs)")


def check_seo_metadata(slug: str) -> CheckResult:
    """Check SEO metadata is present"""
    page_file = PAGES_DIR / f"{slug}.tsx"
    if not page_file.exists():
        return CheckResult("SEO Metadata", CheckStatus.FAIL, "Page file not found")

    content = page_file.read_text()

    checks = {
        'seoLocales': 'seoLocales' in content or 'SEO_LOCALES' in content,
        'RatgeberHead': '<RatgeberHead' in content,
        'title': 'title:' in content or 'title =' in content,
        'description': 'description:' in content or 'description =' in content,
    }

    missing = [k for k, v in checks.items() if not v]

    if not missing:
        return CheckResult("SEO Metadata", CheckStatus.PASS, "All SEO metadata present")

    if 'RatgeberHead' in missing:
        return CheckResult("SEO Metadata", CheckStatus.FAIL,
                          "Missing RatgeberHead component!",
                          [f"Missing: {', '.join(missing)}"])

    return CheckResult("SEO Metadata", CheckStatus.WARN,
                      f"Potentially missing: {', '.join(missing)}")


def check_live_page(slug: str) -> CheckResult:
    """Check live page returns 200 and has basic SEO elements"""
    url = f"{LIVE_BASE_URL}/{slug}"

    try:
        result = subprocess.run(
            ['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', url],
            capture_output=True, text=True, timeout=10
        )

        status_code = result.stdout.strip()

        if status_code == '200':
            # Fetch page content for deeper checks
            content_result = subprocess.run(
                ['curl', '-s', url],
                capture_output=True, text=True, timeout=15
            )

            html = content_result.stdout
            details = []

            # Check for key SEO elements
            if '<title>' in html:
                title_match = re.search(r'<title>([^<]+)</title>', html)
                if title_match:
                    details.append(f"Title: {title_match.group(1)[:60]}...")

            if 'og:title' in html:
                details.append("OG tags present")

            if 'application/ld+json' in html:
                details.append("Schema markup present")

            return CheckResult("Live Page", CheckStatus.PASS,
                              f"Live page OK (HTTP {status_code})", details)

        return CheckResult("Live Page", CheckStatus.FAIL,
                          f"Live page returned HTTP {status_code}")

    except subprocess.TimeoutExpired:
        return CheckResult("Live Page", CheckStatus.WARN, "Request timed out")
    except Exception as e:
        return CheckResult("Live Page", CheckStatus.WARN, f"Could not check: {e}")


def check_live_links(slug: str) -> CheckResult:
    """Check that internal links on the live page return 200"""
    page_file = PAGES_DIR / f"{slug}.tsx"
    if not page_file.exists():
        return CheckResult("Link Validation", CheckStatus.FAIL, "Page file not found")

    content = page_file.read_text()

    # Find LocalizedLink hrefs
    link_pattern = r'LocalizedLink\s+href=["\']([^"\']+)["\']'
    links = re.findall(link_pattern, content)

    # Filter to internal links and check them
    broken_links = []
    valid_links = []

    for link in links:
        if link.startswith('/'):
            url = f"https://pferdewert.de{link}"
            try:
                result = subprocess.run(
                    ['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', '-L', url],
                    capture_output=True, text=True, timeout=5
                )
                if result.stdout.strip() != '200':
                    broken_links.append(f"{link} (HTTP {result.stdout.strip()})")
                else:
                    valid_links.append(link)
            except:
                broken_links.append(f"{link} (timeout)")

    if broken_links:
        return CheckResult("Link Validation", CheckStatus.FAIL,
                          f"{len(broken_links)} broken links found",
                          broken_links[:5])

    return CheckResult("Link Validation", CheckStatus.PASS,
                      f"All {len(valid_links)} internal links valid")


def run_quality_gate(slug: str, check_live: bool = False) -> Tuple[bool, List[CheckResult]]:
    """Run all quality checks and return results"""
    results = []

    # Core checks (always run)
    results.append(check_file_exists(slug))
    results.append(check_author(slug))
    results.append(check_hero_image(slug))
    results.append(check_publication_date(slug))
    results.append(check_internal_links(slug))
    results.append(check_duplicate_faq_schema(slug))
    results.append(check_seo_metadata(slug))

    # Live checks (optional)
    if check_live:
        results.append(check_live_page(slug))
        results.append(check_live_links(slug))

    # Determine overall pass/fail
    has_failures = any(r.status == CheckStatus.FAIL for r in results)

    return (not has_failures, results)


def print_results(results: List[CheckResult], slug: str):
    """Print formatted results"""
    print(f"\n{'='*60}")
    print(f"Quality Gate Results: {slug}")
    print(f"{'='*60}\n")

    status_icons = {
        CheckStatus.PASS: "\033[92m[PASS]\033[0m",  # Green
        CheckStatus.WARN: "\033[93m[WARN]\033[0m",  # Yellow
        CheckStatus.FAIL: "\033[91m[FAIL]\033[0m",  # Red
    }

    for result in results:
        icon = status_icons[result.status]
        print(f"{icon} {result.name}: {result.message}")
        for detail in result.details:
            print(f"       {detail}")

    # Summary
    passes = sum(1 for r in results if r.status == CheckStatus.PASS)
    warns = sum(1 for r in results if r.status == CheckStatus.WARN)
    fails = sum(1 for r in results if r.status == CheckStatus.FAIL)

    print(f"\n{'='*60}")
    print(f"Summary: {passes} passed, {warns} warnings, {fails} failed")
    print(f"{'='*60}\n")

    if fails > 0:
        print("\033[91mQuality Gate FAILED - Please fix issues before publishing\033[0m")
    elif warns > 0:
        print("\033[93mQuality Gate PASSED with warnings - Review recommended\033[0m")
    else:
        print("\033[92mQuality Gate PASSED - Article ready for publication\033[0m")


def main():
    parser = argparse.ArgumentParser(description='PferdeWert Article Quality Gate')
    parser.add_argument('--slug', required=True, help='Article slug (e.g., pferd-kaufen-nrw)')
    parser.add_argument('--live', action='store_true', help='Also check live page (slower)')
    parser.add_argument('--json', action='store_true', help='Output as JSON')

    args = parser.parse_args()

    passed, results = run_quality_gate(args.slug, args.live)

    if args.json:
        output = {
            'slug': args.slug,
            'passed': passed,
            'checks': [
                {
                    'name': r.name,
                    'status': r.status.value,
                    'message': r.message,
                    'details': r.details
                }
                for r in results
            ]
        }
        print(json.dumps(output, indent=2))
    else:
        print_results(results, args.slug)

    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
