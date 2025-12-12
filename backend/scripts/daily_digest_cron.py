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
DIGEST_WEBHOOK_URL = os.getenv("DIGEST_WEBHOOK_URL", "http://localhost:8000/digest/webhook")
WEBHOOK_SECRET = os.getenv("PERPLEXITY_WEBHOOK_SECRET", "")

# Perplexity API configuration
PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"
# Use sonar model for web search capabilities
PERPLEXITY_MODEL = "sonar"  # or "sonar-pro" for better quality

# The prompt that generates our 4-section digest
DIGEST_PROMPT = """You are an AI news curator. Generate a daily AI news digest with EXACTLY 4 sections.

Today's date: {date}

Search for the latest AI news from the past 24 hours and create:

## SECTION 1: SUMMARY_EN (English bullet points)
Write 5-8 concise bullet points summarizing the most important AI news today.
Each bullet should be ONE sentence, max 150 characters.
Focus on: major announcements, product launches, research breakthroughs, industry moves.

## SECTION 2: SUMMARY_CS (Czech bullet points)
Translate SECTION 1 into Czech. Keep the same format and order.

## SECTION 3: FEED_EN (English detailed items)
For each bullet in SECTION 1, provide a JSON object with:
- "title": News headline (max 100 chars)
- "description": 2-3 sentence summary
- "source_url": Direct URL to the source article

Format as JSON array.

## SECTION 4: FEED_CS (Czech detailed items)
Translate SECTION 3 titles and descriptions into Czech. Keep the same source_urls.
Format as JSON array.

CRITICAL: Output MUST follow this EXACT format with these markers:

===SUMMARY_EN===
• bullet point 1
• bullet point 2
...

===SUMMARY_CS===
• bullet point 1
• bullet point 2
...

===FEED_EN===
[
  {{"title": "...", "description": "...", "source_url": "..."}},
  ...
]

===FEED_CS===
[
  {{"title": "...", "description": "...", "source_url": "..."}},
  ...
]
===END===
"""


def call_perplexity_api(prompt: str) -> Optional[str]:
    """Call Perplexity Search API with the given prompt."""
    if not PERPLEXITY_API_KEY:
        logger.error("PERPLEXITY_API_KEY not set!")
        return None

    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": PERPLEXITY_MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are an AI news curator that searches the web for the latest AI news and formats it precisely as requested."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.2,  # Lower for more consistent formatting
        "max_tokens": 4000,
        "return_citations": True,  # Get source URLs
        "search_recency_filter": "day"  # Focus on last 24 hours
    }

    try:
        logger.info(f"Calling Perplexity API with model: {PERPLEXITY_MODEL}")
        with httpx.Client(timeout=120.0) as client:
            response = client.post(PERPLEXITY_API_URL, headers=headers, json=payload)
            response.raise_for_status()

            data = response.json()
            content = data["choices"][0]["message"]["content"]
            logger.info(f"Received response: {len(content)} characters")
            return content

    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error from Perplexity API: {e.response.status_code} - {e.response.text}")
        return None
    except Exception as e:
        logger.error(f"Error calling Perplexity API: {e}")
        return None


def parse_bullets(text: str) -> list[str]:
    """Parse bullet points from text section."""
    bullets = []
    for line in text.strip().split('\n'):
        line = line.strip()
        # Remove bullet markers
        if line.startswith('•') or line.startswith('-') or line.startswith('*'):
            line = line[1:].strip()
        # Remove citation markers like [1], [2], [3] etc.
        line = re.sub(r'\[\d+\]', '', line).strip()
        if line and len(line) > 10:  # Skip empty or too short lines
            bullets.append(line)
    return bullets


def parse_json_array(text: str) -> list[dict]:
    """Parse JSON array from text, handling potential formatting issues."""
    # Try to find JSON array in the text
    text = text.strip()

    # Find the array bounds
    start = text.find('[')
    end = text.rfind(']') + 1

    if start == -1 or end == 0:
        logger.warning("No JSON array found in text")
        return []

    json_str = text[start:end]

    try:
        items = json.loads(json_str)
        # Validate structure
        valid_items = []
        for item in items:
            if isinstance(item, dict) and 'title' in item and 'source_url' in item:
                # Remove citation markers from title and description
                title = re.sub(r'\[\d+\]', '', str(item.get('title', ''))).strip()[:200]
                description = re.sub(r'\[\d+\]', '', str(item.get('description', ''))).strip()[:500]
                valid_items.append({
                    'title': title,
                    'description': description,
                    'source_url': str(item.get('source_url', ''))
                })
        return valid_items
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}")
        # Try to fix common issues
        try:
            # Replace single quotes with double quotes
            fixed = json_str.replace("'", '"')
            items = json.loads(fixed)
            return [
                {
                    'title': re.sub(r'\[\d+\]', '', str(item.get('title', ''))).strip()[:200],
                    'description': re.sub(r'\[\d+\]', '', str(item.get('description', ''))).strip()[:500],
                    'source_url': str(item.get('source_url', ''))
                }
                for item in items if isinstance(item, dict)
            ]
        except:
            return []


def parse_perplexity_response(response: str) -> Optional[dict]:
    """Parse the structured response from Perplexity into our webhook format."""

    # Extract sections using markers
    sections = {}
    markers = ['===SUMMARY_EN===', '===SUMMARY_CS===', '===FEED_EN===', '===FEED_CS===', '===END===']

    for i, marker in enumerate(markers[:-1]):
        start = response.find(marker)
        if start == -1:
            logger.warning(f"Marker not found: {marker}")
            continue

        start += len(marker)
        next_marker = markers[i + 1]
        end = response.find(next_marker)

        if end == -1:
            end = len(response)

        section_key = marker.replace('===', '').lower()
        sections[section_key] = response[start:end].strip()

    # Parse each section
    result = {
        'summary_en': [],
        'summary_cs': [],
        'feed_en': [],
        'feed_cs': [],
        'digest_date': datetime.now(timezone.utc).isoformat(),
        'raw_response': response
    }

    if 'summary_en' in sections:
        result['summary_en'] = parse_bullets(sections['summary_en'])
        logger.info(f"Parsed {len(result['summary_en'])} EN bullets")

    if 'summary_cs' in sections:
        result['summary_cs'] = parse_bullets(sections['summary_cs'])
        logger.info(f"Parsed {len(result['summary_cs'])} CS bullets")

    if 'feed_en' in sections:
        result['feed_en'] = parse_json_array(sections['feed_en'])
        logger.info(f"Parsed {len(result['feed_en'])} EN feed items")

    if 'feed_cs' in sections:
        result['feed_cs'] = parse_json_array(sections['feed_cs'])
        logger.info(f"Parsed {len(result['feed_cs'])} CS feed items")

    # Validate we got enough content
    if len(result['summary_en']) < 3 or len(result['feed_en']) < 3:
        logger.error("Insufficient content parsed from response")
        return None

    return result


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
    response = call_perplexity_api(prompt)

    if not response:
        logger.error("Failed to get response from Perplexity API")
        sys.exit(1)

    # Parse the response
    logger.info("Step 2: Parsing response...")
    payload = parse_perplexity_response(response)

    if not payload:
        logger.error("Failed to parse Perplexity response")
        # Log the raw response for debugging
        logger.debug(f"Raw response:\n{response}")
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
