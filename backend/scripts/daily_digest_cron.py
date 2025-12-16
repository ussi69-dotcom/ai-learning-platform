#!/usr/bin/env python3
"""
Daily AI Digest Cron Script

Fetches AI news from Perplexity Search API and posts to our webhook.
Run daily at 08:00 CET via cron:
    0 8 * * * /usr/bin/python3 /path/to/daily_digest_cron.py >> /var/log/digest.log 2>&1

Required environment variables:
    PERPLEXITY_API_KEY      - API key from https://www.perplexity.ai/settings/api
    DIGEST_WEBHOOK_URL      - Full URL to webhook (e.g., https://ai-teaching.eu/api/digest/webhook)
    PERPLEXITY_WEBHOOK_SECRET - Secret for webhook authentication (optional but recommended)
"""

import os
import sys
import json
import re
import logging
from datetime import datetime, timezone
from typing import Optional
import httpx

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Environment variables
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")
DIGEST_WEBHOOK_URL = os.getenv("DIGEST_WEBHOOK_URL", "http://backend:8000/digest/webhook")
WEBHOOK_SECRET = os.getenv("PERPLEXITY_WEBHOOK_SECRET", "")

# Perplexity API configuration
PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"
# Use sonar model for web search capabilities
PERPLEXITY_MODEL = "sonar"  # or "sonar-pro" for better quality

# Comprehensive 4-section prompt for rich digest content
# IMPORTANT: Emphasize REAL news only to prevent hallucinations
DIGEST_PROMPT = """Search the web for REAL AI news published today ({date}).

CRITICAL RULES:
- ONLY include news you actually found via web search with verifiable URLs
- DO NOT invent or predict future releases (no "GPT-5", "Claude 4", "Llama 4" unless actually announced)
- Every item MUST have a real, working source URL from today's search results
- If you cannot find 5+ real news items from today, include recent news from this week
- Prefer official announcements, press releases, and major tech news sites

**SECTION 1: SHORT ENGLISH SUMMARY**
5-8 bullet points of REAL news, each exactly 1 sentence. Start each with "- ".

**SECTION 2: SHORT CZECH SUMMARY**
Same news as Section 1, translated to Czech. Start each with "- ".

**SECTION 3: DETAILED ENGLISH FEED**
For each REAL news item found, use this EXACT format:
### [Actual headline from source]
[1-2 sentence summary of what actually happened]
**Source:** [Real URL from your search]

**SECTION 4: DETAILED CZECH FEED**
Same items as Section 3, translated to Czech:
### [Český překlad titulku]
[1-2 věty - překlad obsahu]
**Source:** [Stejná URL]

Topics: AI model updates, research papers, tooling, product launches, AI regulation, quantum computing.
Trusted sources: TechCrunch, The Verge, Reuters, VentureBeat, Wired, Ars Technica, official company blogs.

REMEMBER: Only report what you actually found. No speculation or fabrication.
"""


def call_perplexity_api(prompt: str) -> tuple[Optional[str], list[str]]:
    """Call Perplexity Search API with the given prompt.

    Returns:
        Tuple of (content, citations) where citations are real URLs from search.
    """
    if not PERPLEXITY_API_KEY:
        logger.error("PERPLEXITY_API_KEY not set!")
        return None, []

    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": PERPLEXITY_MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are an AI news researcher. Search the web and report only real, verified news."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.2,
        "max_tokens": 4000,
        "return_citations": True,
        "search_recency_filter": "day"
    }

    try:
        logger.info(f"Calling Perplexity API with model: {PERPLEXITY_MODEL}")
        with httpx.Client(timeout=120.0) as client:
            response = client.post(PERPLEXITY_API_URL, headers=headers, json=payload)
            response.raise_for_status()

            data = response.json()
            content = data["choices"][0]["message"]["content"]
            citations = data.get("citations", [])

            logger.info(f"Received response: {len(content)} chars, {len(citations)} citations")
            return content, citations

    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error from Perplexity API: {e.response.status_code} - {e.response.text}")
        return None, []
    except Exception as e:
        logger.error(f"Error calling Perplexity API: {e}")
        return None, []


def parse_perplexity_response(content: str, citations: list[str]) -> Optional[dict]:
    """Parse Perplexity 4-section response into webhook format.

    Expected sections:
    - SECTION 1: SHORT ENGLISH SUMMARY (bullet points)
    - SECTION 2: SHORT CZECH SUMMARY (bullet points)
    - SECTION 3: DETAILED ENGLISH FEED (### Title, description, **Source:** URL)
    - SECTION 4: DETAILED CZECH FEED (### Title, description, **Source:** URL)

    Args:
        content: The markdown content from Perplexity
        citations: List of real URLs from Perplexity's search
    """
    # Clean citation markers [1], [2], etc.
    clean_content = re.sub(r'\[\d+\]', '', content)

    # Split into sections
    sections = re.split(r'\*\*SECTION\s+\d+[:\s]', clean_content, flags=re.IGNORECASE)
    if len(sections) < 5:
        # Try alternative section markers
        sections = re.split(r'(?:^|\n)#+\s*(?:SECTION\s+)?\d+[:\.\s]|(?:^|\n)\d+\.\s+\*\*', clean_content, flags=re.IGNORECASE)

    logger.info(f"Found {len(sections)} sections in response")

    # Parse bullet points from summary sections
    def extract_bullets(text: str) -> list[str]:
        bullets = []
        for line in text.strip().split('\n'):
            line = line.strip()
            # Match lines starting with -, *, •, or numbered
            match = re.match(r'^[-*•]\s*(.+)$', line)
            if match:
                bullet = match.group(1).strip()
                if bullet and len(bullet) > 10:  # Skip too short items
                    bullets.append(bullet)
        return bullets[:8]  # Max 8 bullets

    # Parse detailed feed items
    def extract_feed_items(text: str) -> list[dict]:
        items = []
        # Split by ### headers
        blocks = re.split(r'\n###\s+', text)

        for block in blocks:
            block = block.strip()
            if not block or len(block) < 20:
                continue

            lines = block.split('\n')
            title = lines[0].strip()

            # Clean title from markdown artifacts
            title = re.sub(r'^\*\*|\*\*$', '', title)
            title = re.sub(r'^\d+\.\s*', '', title)

            # Extract description (lines between title and Source:)
            description_lines = []
            url = ""

            for line in lines[1:]:
                line = line.strip()
                # Check for source URL
                source_match = re.search(r'\*\*Source:?\*\*:?\s*(https?://[^\s\)]+)', line)
                if not source_match:
                    source_match = re.search(r'Source:?\s*(https?://[^\s\)]+)', line)
                if source_match:
                    url = source_match.group(1).strip()
                    break
                elif line and not line.startswith('**'):
                    description_lines.append(line)

            description = ' '.join(description_lines).strip()

            # Use citation URL as fallback
            if not url and citations:
                idx = len(items)
                if idx < len(citations):
                    url = citations[idx]

            # Skip section headers captured as titles
            if title and len(title) > 5 and not re.match(r'^(DETAILED|SHORT)\s+(ENGLISH|CZECH|ČESKÝ)', title, re.IGNORECASE):
                items.append({
                    'title': title[:200],
                    'description': description[:500],
                    'source_url': url
                })

        return items[:15]  # Max 15 items

    # Initialize results
    summary_en = []
    summary_cs = []
    feed_en = []
    feed_cs = []

    # Try to identify sections by content
    for i, section in enumerate(sections):
        section_lower = section.lower()[:200]

        if 'english summary' in section_lower or (i == 1 and not summary_en):
            summary_en = extract_bullets(section)
            logger.info(f"Extracted {len(summary_en)} EN summary bullets")

        elif 'czech summary' in section_lower or 'český' in section_lower or (i == 2 and not summary_cs):
            summary_cs = extract_bullets(section)
            logger.info(f"Extracted {len(summary_cs)} CS summary bullets")

        elif 'english feed' in section_lower or 'detailed english' in section_lower or (i == 3 and not feed_en):
            feed_en = extract_feed_items(section)
            logger.info(f"Extracted {len(feed_en)} EN feed items")

        elif 'czech feed' in section_lower or 'český feed' in section_lower or 'detailed czech' in section_lower or (i == 4 and not feed_cs):
            feed_cs = extract_feed_items(section)
            logger.info(f"Extracted {len(feed_cs)} CS feed items")

    # Fallback: if we didn't get structured sections, try parsing whole content
    if len(summary_en) < 3:
        logger.warning("Fallback: extracting bullets from whole content")
        summary_en = extract_bullets(clean_content)[:8]

    if len(feed_en) < 3:
        logger.warning("Fallback: extracting feed items from whole content")
        feed_en = extract_feed_items(clean_content)[:15]

    # If no Czech content, use English as fallback (better than nothing)
    if len(summary_cs) < 3:
        logger.warning("No Czech summary found, using English")
        summary_cs = summary_en

    if len(feed_cs) < 3:
        logger.warning("No Czech feed found, using English")
        feed_cs = feed_en

    # Validate minimum content
    if len(summary_en) < 3 or len(feed_en) < 3:
        logger.error(f"Insufficient content: {len(summary_en)} bullets, {len(feed_en)} feed items")
        logger.error(f"Raw content preview:\n{clean_content[:1000]}")
        return None

    return {
        'summary_en': summary_en,
        'summary_cs': summary_cs,
        'feed_en': [{'title': f['title'], 'description': f['description'], 'source_url': f['source_url']} for f in feed_en],
        'feed_cs': [{'title': f['title'], 'description': f['description'], 'source_url': f['source_url']} for f in feed_cs],
        'digest_date': datetime.now(timezone.utc).isoformat(),
        'raw_response': content
    }


def post_to_webhook(payload: dict) -> bool:
    """Post the parsed digest to our webhook endpoint."""
    headers = {
        "Content-Type": "application/json"
    }

    if WEBHOOK_SECRET:
        headers["X-Webhook-Secret"] = WEBHOOK_SECRET

    try:
        logger.info(f"Posting to webhook: {DIGEST_WEBHOOK_URL}")
        with httpx.Client(timeout=30.0) as client:
            response = client.post(DIGEST_WEBHOOK_URL, headers=headers, json=payload)
            response.raise_for_status()

            logger.info(f"Webhook response: {response.status_code}")
            return True

    except httpx.HTTPStatusError as e:
        logger.error(f"Webhook HTTP error: {e.response.status_code} - {e.response.text}")
        return False
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        return False


def main():
    """Main entry point for the cron job."""
    logger.info("=" * 50)
    logger.info("Starting Daily AI Digest generation")
    logger.info(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    logger.info("=" * 50)

    # Validate environment
    if not PERPLEXITY_API_KEY:
        logger.error("PERPLEXITY_API_KEY environment variable not set!")
        sys.exit(1)

    # Generate the prompt with today's date
    today = datetime.now().strftime("%Y-%m-%d")
    prompt = DIGEST_PROMPT.format(date=today)

    # Call Perplexity API
    logger.info("Step 1: Calling Perplexity Search API...")
    content, citations = call_perplexity_api(prompt)

    if not content:
        logger.error("Failed to get response from Perplexity API")
        sys.exit(1)

    # Parse the response
    logger.info("Step 2: Parsing response...")
    payload = parse_perplexity_response(content, citations)

    if not payload:
        logger.error("Failed to parse Perplexity response")
        # Log the raw response for debugging
        logger.error(f"Raw content:\n{content}")
        sys.exit(1)

    # Post to webhook
    logger.info("Step 3: Posting to webhook...")
    success = post_to_webhook(payload)

    if success:
        logger.info("Daily digest successfully generated and posted!")
        logger.info(f"  - EN bullets: {len(payload['summary_en'])}")
        logger.info(f"  - CS bullets: {len(payload['summary_cs'])}")
        logger.info(f"  - EN feed items: {len(payload['feed_en'])}")
        logger.info(f"  - CS feed items: {len(payload['feed_cs'])}")
        sys.exit(0)
    else:
        logger.error("Failed to post digest to webhook")
        sys.exit(1)


if __name__ == "__main__":
    main()
