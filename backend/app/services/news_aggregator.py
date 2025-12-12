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
    # Czech AI Content (CZ)
    # Note: Channel IDs need to be verified - using handles as placeholder
    # "UC_davidstrejc": "David Strejc",                 # @davidstrejc - Czech AI educator
    # "UC_marekbartos": "Marek Bartoš",                 # Czech AI content
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
    "https://www.kapler.cz/feed/": "Kapler o AI",      # Czech AI blog
    "https://ainovinky.cz/feed/": "AI Novinky",        # Czech AI news
    "https://aicrunch.cz/feed/": "AI Crunch CZ",       # Czech AI startup news
}

# Czech YouTube channels (to be added when channel IDs are verified)
# Handles: @tomas-ai-cz, @bartosmarek, @davidstrejc
YOUTUBE_CHANNELS_CZ = {
    # Channel IDs will be added once verified via YouTube API
    # For now, using handles which need to be converted to UC... IDs
}


class YouTubeFetcher:
    """Fetches latest videos from AI-focused YouTube channels."""

    BASE_URL = "https://www.googleapis.com/youtube/v3"

    def __init__(self, api_key: str):
        self.api_key = api_key

    async def fetch(self) -> List[Dict]:
        """Fetch latest videos from all tracked channels."""
        if not self.api_key:
            logger.warning("YouTube API key not configured, skipping YouTube fetch")
            return []

        items = []
        async with httpx.AsyncClient(timeout=30.0) as client:
            for channel_id, channel_name in YOUTUBE_CHANNELS.items():
                try:
                    videos = await self._fetch_channel_videos(client, channel_id, channel_name)
                    items.extend(videos)
                except Exception as e:
                    logger.error(f"Failed to fetch YouTube channel {channel_name}: {e}")

        return items

    async def _fetch_channel_videos(
        self, client: httpx.AsyncClient, channel_id: str, channel_name: str
    ) -> List[Dict]:
        """Fetch latest videos from a single channel."""
        # Get latest videos
        params = {
            "key": self.api_key,
            "channelId": channel_id,
            "part": "snippet",
            "order": "date",
            "maxResults": 5,
            "type": "video",
        }

        response = await client.get(f"{self.BASE_URL}/search", params=params)
        response.raise_for_status()
        data = response.json()

        items = []
        for item in data.get("items", []):
            video_id = item["id"].get("videoId")
            if not video_id:
                continue

            snippet = item["snippet"]
            items.append({
                "external_id": f"yt_{video_id}",
                "title": snippet["title"],
                "description": snippet.get("description", "")[:500],
                "source": models.NewsSource.YOUTUBE,
                "source_url": f"https://www.youtube.com/watch?v={video_id}",
                "thumbnail_url": snippet.get("thumbnails", {}).get("high", {}).get("url"),
                "channel_name": channel_name,
                "published_at": datetime.fromisoformat(snippet["publishedAt"].replace("Z", "+00:00")),
                "video_id": video_id,
                "language": "en",  # Currently English channels only
            })

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
                "description": entry.get("summary", "")[:500],
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
                "description": hit.get("story_text", "")[:500] if hit.get("story_text") else None,
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
                summary = summary_elem.text.strip()[:500] if summary_elem is not None else None

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
