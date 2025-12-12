"""
News Aggregator Service - Fetches AI news from multiple sources.

Sources:
- YouTube: AI-focused channels (Anthropic, OpenAI, Fireship, 3B1B, Yannic Kilcher)
- RSS: Tech blogs (OpenAI Blog, Anthropic, HuggingFace, Google AI)
- Hacker News: AI/ML tagged stories via Algolia API
- Papers: arXiv cs.AI and cs.LG categories

Usage:
    aggregator = NewsAggregator(db_session)
    await aggregator.refresh_all()
"""

import os
import logging
import asyncio
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from xml.etree import ElementTree

import httpx
import feedparser
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert

from app import models

logger = logging.getLogger(__name__)

# Configuration
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "")
NEWS_REFRESH_INTERVAL_MINUTES = int(os.getenv("NEWS_REFRESH_INTERVAL_MINUTES", "30"))

# YouTube channels to track (channel ID -> display name)
# These channels are also referenced in CONTENT_GUIDELINES.md for lesson content
YOUTUBE_CHANNELS = {
    # AI Education & News (EN)
    "UC8S5nEDXDD7Njb7tSGFio6A": "David Ondrej AI",      # AI tutorials, tools
    "UC9x0AN7BWHpCDHSm9NiJFJQ": "NetworkChuck",         # Tech & AI tutorials
    "UC5l7RouTQ60oUjLjt1Nh-UQ": "AI Revolution",        # AI news & trends
    "UCajiMK_CY9icRhLepS8_3ug": "Alex Ziskind",         # AI coding tutorials
    "UC_RovKmk0OCbuZjA8f08opw": "Futurepedia",          # AI tools & tutorials
    # Core Tech Educators
    "UCWN3xxRkmTPmbKwht9FuE5A": "Fireship",             # Fast tech explainers
    "UCYO_jab_esuFRV4b17AJtAw": "3Blue1Brown",          # Math & ML visualized
    "UCZHmQk67mSJgfCCTn7xBfew": "Yannic Kilcher",       # ML paper reviews
    "UC0RhatS1pyxInC00YKjjBqQ": "AI Explained",         # AI deep dives
    "UCbfYPyITQ-7l4upoX8nvctg": "Two Minute Papers",    # Research highlights
    # New additions (2024-2025 rising stars)
    "UCtYLUTtgS3k1Fg4y5tAhLbw": "StatQuest",            # ML/stats explained with humor
    "UCfzlCWGWYyIQ0aLC5w48gBQ": "Sentdex",              # Python ML deep-dives (Harrison Kinsley)
}

# RSS feeds to track (updated URLs as of Dec 2025)
RSS_FEEDS = {
    # English sources
    "https://openai.com/news/rss.xml": "OpenAI Blog",  # Redirected from /blog/
    "https://huggingface.co/blog/feed.xml": "HuggingFace",
    "https://blog.google/technology/ai/rss/": "Google AI Blog",
    "https://techcrunch.com/category/artificial-intelligence/feed/": "TechCrunch AI",
    "https://www.technologyreview.com/topic/artificial-intelligence/feed": "MIT Tech Review",
}

# Czech RSS feeds (CZ locale)
RSS_FEEDS_CZ = {
    "https://www.kapler.cz/feed/": "Kapler o AI",      # Czech AI blog - praktické návody
    "https://ainovinky.cz/feed/": "AI Novinky",        # Czech AI news - denní novinky
    "https://aicrunch.cz/feed/": "AI Crunch CZ",       # Czech AI startup news
    "https://www.lupa.cz/n/rss/": "Lupa.cz",           # Czech tech portal - AI sekce
}

# Czech YouTube channels (verified Channel IDs from Perplexity research Dec 2025)
YOUTUBE_CHANNELS_CZ = {
    # Verified CZ AI YouTubers
    "UCxlVFbcqsyd8UsjfW0syEPA": "Tomáš AI",            # @tomas-ai-cz - AI nástroje, automatizace, agenti
    "UC6NZksFEiFLcs1hW9lmt6LQ": "David Strejc",        # @davidstrejc - LLM internals, expert talks
    # Note: @bartosmarek Channel ID needs API verification - handle doesn't directly convert
}


class YouTubeFetcher:
    """Fetches latest videos from AI-focused YouTube channels via RSS (no API quota!)."""

    RSS_URL = "https://www.youtube.com/feeds/videos.xml"

    def __init__(self, api_key: str = ""):
        # API key no longer needed - using RSS feeds
        pass

    async def fetch(self) -> List[Dict]:
        """Fetch latest videos from all tracked channels (EN + CZ) via RSS."""
        items = []
        async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
            # Fetch English channels
            for channel_id, channel_name in YOUTUBE_CHANNELS.items():
                try:
                    videos = await self._fetch_channel_rss(client, channel_id, channel_name, language="en")
                    items.extend(videos)
                except Exception as e:
                    logger.error(f"Failed to fetch YouTube RSS for {channel_name}: {e}")

            # Fetch Czech channels
            for channel_id, channel_name in YOUTUBE_CHANNELS_CZ.items():
                try:
                    videos = await self._fetch_channel_rss(client, channel_id, channel_name, language="cs")
                    items.extend(videos)
                except Exception as e:
                    logger.error(f"Failed to fetch CZ YouTube RSS for {channel_name}: {e}")

        return items

    async def _fetch_channel_rss(
        self, client: httpx.AsyncClient, channel_id: str, channel_name: str, language: str = "en"
    ) -> List[Dict]:
        """Fetch latest videos from a single channel via RSS feed."""
        url = f"{self.RSS_URL}?channel_id={channel_id}"

        try:
            response = await client.get(url)
            response.raise_for_status()
        except httpx.HTTPError as e:
            logger.warning(f"YouTube RSS for {channel_name} returned error: {e}")
            return []

        return self._parse_youtube_rss(response.text, channel_name, language)

    def _parse_youtube_rss(self, xml_text: str, channel_name: str, language: str) -> List[Dict]:
        """Parse YouTube RSS/Atom feed."""
        items = []

        try:
            root = ElementTree.fromstring(xml_text)
            ns = {
                "atom": "http://www.w3.org/2005/Atom",
                "yt": "http://www.youtube.com/xml/schemas/2015",
                "media": "http://search.yahoo.com/mrss/"
            }

            for entry in root.findall("atom:entry", ns)[:5]:  # Last 5 videos
                # Get video ID
                video_id_elem = entry.find("yt:videoId", ns)
                if video_id_elem is None:
                    continue
                video_id = video_id_elem.text

                # Get title
                title_elem = entry.find("atom:title", ns)
                title = title_elem.text if title_elem is not None else "Untitled"

                # Get description from media:group/media:description
                description = ""
                media_group = entry.find("media:group", ns)
                if media_group is not None:
                    desc_elem = media_group.find("media:description", ns)
                    if desc_elem is not None and desc_elem.text:
                        description = desc_elem.text[:800]

                # Get thumbnail
                thumbnail_url = None
                if media_group is not None:
                    thumb_elem = media_group.find("media:thumbnail", ns)
                    if thumb_elem is not None:
                        thumbnail_url = thumb_elem.get("url")

                # Get published date
                published_elem = entry.find("atom:published", ns)
                published = None
                if published_elem is not None:
                    try:
                        published = datetime.fromisoformat(published_elem.text.replace("Z", "+00:00"))
                    except:
                        pass

                items.append({
                    "external_id": f"yt_{video_id}",
                    "title": title,
                    "description": description,
                    "source": models.NewsSource.YOUTUBE,
                    "source_url": f"https://www.youtube.com/watch?v={video_id}",
                    "thumbnail_url": thumbnail_url,
                    "channel_name": channel_name,
                    "published_at": published,
                    "video_id": video_id,
                    "language": language,
                })

        except Exception as e:
            logger.error(f"Failed to parse YouTube RSS for {channel_name}: {e}")

        return items


class RSSFetcher:
    """Fetches articles from AI/ML RSS feeds."""

    async def fetch(self, include_czech: bool = True) -> List[Dict]:
        """Fetch latest articles from all tracked RSS feeds."""
        items = []

        # Fetch English feeds
        for feed_url, feed_name in RSS_FEEDS.items():
            try:
                articles = await self._fetch_feed(feed_url, feed_name, language="en")
                items.extend(articles)
            except Exception as e:
                logger.error(f"Failed to fetch RSS feed {feed_name}: {e}")

        # Fetch Czech feeds
        if include_czech:
            for feed_url, feed_name in RSS_FEEDS_CZ.items():
                try:
                    articles = await self._fetch_feed(feed_url, feed_name, language="cs")
                    items.extend(articles)
                except Exception as e:
                    logger.error(f"Failed to fetch CZ RSS feed {feed_name}: {e}")

        return items

    async def _fetch_feed(self, feed_url: str, feed_name: str, language: str = "en") -> List[Dict]:
        """Fetch and parse a single RSS feed."""
        async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
            try:
                response = await client.get(feed_url)
                response.raise_for_status()
            except httpx.HTTPError as e:
                logger.warning(f"RSS feed {feed_name} returned error: {e}")
                return []

        # Parse feed
        feed = feedparser.parse(response.text)
        items = []

        for entry in feed.entries[:10]:  # Limit to 10 items per feed
            # Generate unique ID from URL
            link = entry.get("link", "")
            external_id = f"rss_{hash(link) % (10**10)}"

            # Parse published date
            published = None
            if hasattr(entry, "published_parsed") and entry.published_parsed:
                try:
                    published = datetime(*entry.published_parsed[:6])
                except:
                    pass

            # Get thumbnail if available
            thumbnail = None
            if hasattr(entry, "media_thumbnail") and entry.media_thumbnail:
                thumbnail = entry.media_thumbnail[0].get("url")
            elif hasattr(entry, "media_content") and entry.media_content:
                thumbnail = entry.media_content[0].get("url")

            items.append({
                "external_id": external_id,
                "title": entry.get("title", "Untitled"),
                "description": entry.get("summary", "")[:800],
                "source": models.NewsSource.RSS,
                "source_url": link,
                "thumbnail_url": thumbnail,
                "channel_name": feed_name,
                "published_at": published,
                "language": language,
            })

        return items


class HackerNewsFetcher:
    """Fetches AI-related stories from Hacker News via Algolia API."""

    # Use search_by_date for recent stories sorted by date
    API_URL = "https://hn.algolia.com/api/v1/search_by_date"

    async def fetch(self) -> List[Dict]:
        """Fetch latest AI/ML stories from Hacker News."""
        items = []

        # Search for AI-related stories from last 7 days
        params = {
            "query": "AI OR GPT OR LLM OR Claude OR Anthropic OR OpenAI",
            "tags": "story",
            "hitsPerPage": 25,
        }

        async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
            try:
                response = await client.get(self.API_URL, params=params)
                response.raise_for_status()
                data = response.json()
            except Exception as e:
                logger.error(f"Failed to fetch Hacker News: {e}")
                return []

        for hit in data.get("hits", []):
            story_id = hit.get("objectID")
            if not story_id:
                continue

            # Parse created_at timestamp
            created_at = None
            if hit.get("created_at"):
                try:
                    created_at = datetime.fromisoformat(hit["created_at"].replace("Z", "+00:00"))
                except:
                    pass

            items.append({
                "external_id": f"hn_{story_id}",
                "title": hit.get("title", "Untitled"),
                "description": hit.get("story_text", "")[:800] if hit.get("story_text") else None,
                "source": models.NewsSource.HACKERNEWS,
                "source_url": hit.get("url") or f"https://news.ycombinator.com/item?id={story_id}",
                "channel_name": "Hacker News",
                "published_at": created_at,
                "score": hit.get("points", 0),
                "language": "en",
            })

        return items


class PapersFetcher:
    """Fetches latest AI/ML papers from arXiv."""

    API_URL = "https://export.arxiv.org/api/query"  # Use HTTPS

    async def fetch(self) -> List[Dict]:
        """Fetch latest AI/ML papers from arXiv."""
        params = {
            "search_query": "cat:cs.AI OR cat:cs.LG OR cat:cs.CL",
            "sortBy": "lastUpdatedDate",
            "sortOrder": "descending",
            "max_results": 15,
        }

        async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
            try:
                response = await client.get(self.API_URL, params=params)
                response.raise_for_status()
            except Exception as e:
                logger.error(f"Failed to fetch arXiv papers: {e}")
                return []

        return self._parse_arxiv_response(response.text)

    def _parse_arxiv_response(self, xml_text: str) -> List[Dict]:
        """Parse arXiv Atom feed response."""
        items = []

        try:
            root = ElementTree.fromstring(xml_text)
            ns = {"atom": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}

            for entry in root.findall("atom:entry", ns):
                # Get paper ID from URL
                id_elem = entry.find("atom:id", ns)
                if id_elem is None:
                    continue

                arxiv_id = id_elem.text.split("/abs/")[-1]

                # Get title
                title_elem = entry.find("atom:title", ns)
                title = title_elem.text.strip().replace("\n", " ") if title_elem is not None else "Untitled"

                # Get summary
                summary_elem = entry.find("atom:summary", ns)
                summary = summary_elem.text.strip()[:800] if summary_elem is not None else None

                # Get published date
                published_elem = entry.find("atom:published", ns)
                published = None
                if published_elem is not None:
                    try:
                        published = datetime.fromisoformat(published_elem.text.replace("Z", "+00:00"))
                    except:
                        pass

                # Get authors
                authors = []
                for author in entry.findall("atom:author", ns):
                    name = author.find("atom:name", ns)
                    if name is not None:
                        authors.append(name.text)
                author_str = ", ".join(authors[:3])
                if len(authors) > 3:
                    author_str += f" +{len(authors) - 3} more"

                items.append({
                    "external_id": f"arxiv_{arxiv_id}",
                    "title": title,
                    "description": summary,
                    "source": models.NewsSource.PAPERS,
                    "source_url": f"https://arxiv.org/abs/{arxiv_id}",
                    "channel_name": author_str or "arXiv",
                    "published_at": published,
                    "language": "en",
                })

        except Exception as e:
            logger.error(f"Failed to parse arXiv response: {e}")

        return items


class NewsAggregator:
    """Main aggregator that coordinates all fetchers and stores results."""

    def __init__(self, db: Session):
        self.db = db
        self.youtube = YouTubeFetcher(YOUTUBE_API_KEY)
        self.rss = RSSFetcher()
        self.hackernews = HackerNewsFetcher()
        self.papers = PapersFetcher()

    async def refresh_all(self) -> Dict:
        """Fetch from all sources and update database."""
        logger.info("Starting news refresh...")
        results = {"sources": {}, "total": 0}

        # Fetch from all sources concurrently
        tasks = [
            ("youtube", self.youtube.fetch()),
            ("rss", self.rss.fetch()),
            ("hackernews", self.hackernews.fetch()),
            ("papers", self.papers.fetch()),
        ]

        all_items = []
        for source_name, task in tasks:
            try:
                items = await task
                all_items.extend(items)
                results["sources"][source_name] = {"status": "ok", "count": len(items)}
                logger.info(f"Fetched {len(items)} items from {source_name}")
            except Exception as e:
                results["sources"][source_name] = {"status": "error", "error": str(e)}
                logger.error(f"Failed to fetch from {source_name}: {e}")

        # Store items in database (upsert)
        stored_count = self._store_items(all_items)
        results["total"] = stored_count

        # Clean up old items (older than 30 days)
        self._cleanup_old_items()

        logger.info(f"News refresh complete. Stored {stored_count} items.")
        return results

    def _store_items(self, items: List[Dict]) -> int:
        """Store items in database using upsert with title-based dedup."""
        if not items:
            return 0

        stored = 0
        for item in items:
            try:
                # Check if exists by external_id OR by title+source (dedup)
                existing = self.db.query(models.NewsItem).filter(
                    models.NewsItem.external_id == item["external_id"]
                ).first()

                # Also check for duplicate titles from same source
                if not existing:
                    existing = self.db.query(models.NewsItem).filter(
                        models.NewsItem.title == item["title"],
                        models.NewsItem.source == item["source"]
                    ).first()

                if existing:
                    # Update existing (keep newer published_at if available)
                    if item.get("published_at") and existing.published_at:
                        # Normalize both datetimes to naive UTC for comparison
                        new_dt = item["published_at"]
                        old_dt = existing.published_at
                        # Remove timezone info if present for safe comparison
                        if hasattr(new_dt, 'replace') and new_dt.tzinfo is not None:
                            new_dt = new_dt.replace(tzinfo=None)
                        if hasattr(old_dt, 'replace') and old_dt.tzinfo is not None:
                            old_dt = old_dt.replace(tzinfo=None)
                        if new_dt > old_dt:
                            for key, value in item.items():
                                if key != "external_id" and value is not None:
                                    setattr(existing, key, value)
                else:
                    # Create new
                    news_item = models.NewsItem(**item)
                    self.db.add(news_item)
                    stored += 1

            except Exception as e:
                logger.error(f"Failed to store item {item.get('external_id')}: {e}")
                continue

        try:
            self.db.commit()
        except Exception as e:
            logger.error(f"Failed to commit news items: {e}")
            self.db.rollback()

        return stored

    def _cleanup_old_items(self, days: int = 30):
        """Remove items older than specified days."""
        cutoff = datetime.utcnow() - timedelta(days=days)
        try:
            deleted = self.db.query(models.NewsItem).filter(
                models.NewsItem.published_at < cutoff
            ).delete()
            self.db.commit()
            if deleted:
                logger.info(f"Cleaned up {deleted} old news items")
        except Exception as e:
            logger.error(f"Failed to cleanup old items: {e}")
            self.db.rollback()
