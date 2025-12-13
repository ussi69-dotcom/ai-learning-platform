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

# Simple prompt for Perplexity - it returns real URLs in citations
DIGEST_PROMPT = """Search for AI news from today ({date}) and list 7 important stories.

For each story provide:
1. **Title** - the headline
2. **Summary** - 2 sentences about what happened
3. **URL** - link to the source

Focus on: AI product launches, funding, research breakthroughs, major announcements.
Sources: TechCrunch, The Verge, Reuters, company blogs, tech news sites.
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


def translate_to_czech(texts: list[str]) -> list[str]:
    """Translate a list of texts to Czech using Perplexity.

    Args:
        texts: List of English texts to translate

    Returns:
        List of Czech translations (same length as input)
    """
    if not texts or not PERPLEXITY_API_KEY:
        return texts  # Return original if no API key or empty

    # Build prompt with all texts to translate
    numbered_texts = "\n".join(f"{i+1}. {text}" for i, text in enumerate(texts))

    prompt = f"""Translate these AI news headlines to Czech. Keep them concise and natural.
Return ONLY the translations in the same numbered format, nothing else.

{numbered_texts}"""

    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": PERPLEXITY_MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are a professional translator. Translate to Czech accurately and naturally."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.1,
        "max_tokens": 2000
    }

    try:
        logger.info(f"Translating {len(texts)} items to Czech...")
        with httpx.Client(timeout=60.0) as client:
            response = client.post(PERPLEXITY_API_URL, headers=headers, json=payload)
            response.raise_for_status()

            data = response.json()
            content = data["choices"][0]["message"]["content"]

            # Parse numbered translations
            translations = []
            for line in content.strip().split('\n'):
                # Remove number prefix (1., 2., etc.)
                match = re.match(r'^\d+\.\s*(.+)$', line.strip())
                if match:
                    translations.append(match.group(1).strip())

            # Verify we got all translations
            if len(translations) == len(texts):
                logger.info(f"Successfully translated {len(translations)} items to Czech")
                return translations
            else:
                logger.warning(f"Translation count mismatch: expected {len(texts)}, got {len(translations)}")
                return texts  # Return original on mismatch

    except Exception as e:
        logger.error(f"Translation error: {e}")
        return texts  # Return original on error


def parse_perplexity_response(content: str, citations: list[str]) -> Optional[dict]:
    """Parse Perplexity response into webhook format.

    Expected format from Perplexity:
    1. **Title**: Headline here
       **Summary**: Summary text here.[1]
       **URL**: https://example.com/article

    Args:
        content: The markdown content from Perplexity
        citations: List of real URLs from Perplexity's search
    """
    items = []

    # Clean citation markers [1], [2], etc.
    clean_content = re.sub(r'\[\d+\]', '', content)

    # Split by numbered items (1., 2., etc.)
    item_blocks = re.split(r'\n(?=\d+\.\s)', clean_content)

    for block in item_blocks:
        if not block.strip():
            continue

        # Extract title
        title_match = re.search(r'\*\*Title\*\*:\s*(.+?)(?:\n|$)', block)
        if not title_match:
            # Try alternative: bold text at start
            title_match = re.search(r'^\d+\.\s*\*\*(.+?)\*\*', block)

        # Extract summary
        summary_match = re.search(r'\*\*Summary\*\*:\s*(.+?)(?:\n\s*\*\*|$)', block, re.DOTALL)

        # Extract URL from content
        url_match = re.search(r'\*\*URL\*\*:\s*(https?://[^\s]+)', block)

        if title_match:
            title = title_match.group(1).strip()[:200]
            summary = summary_match.group(1).strip()[:500] if summary_match else ""
            url = url_match.group(1).strip() if url_match else ""

            items.append({
                'title': title,
                'summary': summary,
                'url': url
            })

    logger.info(f"Parsed {len(items)} news items from Perplexity response")

    if len(items) < 3:
        logger.error(f"Insufficient content: only {len(items)} items parsed")
        return None

    # Build English summaries
    summaries_en = [item['title'][:150] for item in items]

    # Translate to Czech
    summaries_cs = translate_to_czech(summaries_en)

    # Build feed items (English)
    feed_en = [
        {
            'title': item['title'],
            'description': item['summary'],
            'source_url': item['url']
        }
        for item in items
    ]

    # Translate titles and descriptions for Czech feed
    titles_cs = translate_to_czech([item['title'] for item in items])
    descriptions_cs = translate_to_czech([item['summary'] for item in items if item['summary']])

    # Build Czech feed with translated content
    feed_cs = []
    desc_idx = 0
    for i, item in enumerate(items):
        cs_title = titles_cs[i] if i < len(titles_cs) else item['title']
        cs_desc = ""
        if item['summary']:
            cs_desc = descriptions_cs[desc_idx] if desc_idx < len(descriptions_cs) else item['summary']
            desc_idx += 1
        feed_cs.append({
            'title': cs_title,
            'description': cs_desc,
            'source_url': item['url']
        })

    return {
        'summary_en': summaries_en,
        'summary_cs': summaries_cs,
        'feed_en': feed_en,
        'feed_cs': feed_cs,
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
