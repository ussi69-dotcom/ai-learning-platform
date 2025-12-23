from __future__ import annotations

from collections import OrderedDict
from dataclasses import dataclass
from typing import Dict, Iterable, List, Tuple
import hashlib
import math
import re

from app.config import settings
from app.models import Lesson

WORD_RE = re.compile(r"[A-Za-z0-9']+")
HEADING_RE = re.compile(r"^#{1,6}\\s+(.*)$")
ACRONYM_RE = re.compile(r"\b[A-Z]{2,}\b")
GENERIC_SECTIONS = {
    "lesson",
    "summary",
    "holocron",
    "lab",
    "labs",
    "mission",
    "missions",
}
STOPWORDS = {
    "about",
    "ai",
    "and",
    "are",
    "but",
    "from",
    "give",
    "good",
    "have",
    "how",
    "its",
    "jako",
    "jsou",
    "kdyz",
    "ktera",
    "ktere",
    "ktery",
    "kter",
    "lesson",
    "mentor",
    "model",
    "models",
    "more",
    "nebo",
    "nejen",
    "neni",
    "nejsou",
    "proto",
    "protoze",
    "pro",
    "pri",
    "tato",
    "tento",
    "teto",
    "tyto",
    "please",
    "this",
    "that",
    "the",
    "with",
    "you",
    "your",
    "vysvetli",
    "vysvetlete",
    "hlavni",
    "pointy",
    "lekce",
    "otazka",
}


@dataclass
class LessonChunk:
    chunk_id: int
    section: str
    text: str
    token_counts: Dict[str, int]
    length: int


@dataclass
class LessonIndex:
    chunks: List[LessonChunk]
    idf: Dict[str, float]
    avg_len: float


@dataclass
class LessonIndexEntry:
    content_hash: str
    index: LessonIndex
    headings: List[str]


_INDEX_CACHE: "OrderedDict[Tuple[int, str], LessonIndexEntry]" = OrderedDict()


def get_lesson_content(lesson: Lesson, lang: str) -> str:
    if lang == "cs" and getattr(lesson, "content_cs", None):
        return lesson.content_cs or lesson.content or ""
    return lesson.content or ""


def get_lesson_description(lesson: Lesson, lang: str) -> str:
    if lang == "cs" and getattr(lesson, "description_cs", None):
        return lesson.description_cs or lesson.description or ""
    return lesson.description or ""


def extract_headings(content: str) -> List[str]:
    headings: List[str] = []
    in_code = False
    for raw_line in content.splitlines():
        line = raw_line.strip()
        if line.startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        match = HEADING_RE.match(line)
        if match:
            heading = clean_inline_markup(match.group(1)).strip()
            if heading:
                headings.append(heading)
    return headings


def clean_inline_markup(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"!\[([^\]]*)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"_([^_]+)_", r"\1", text)
    text = text.replace(">", " ")
    text = re.sub(r"\\s+", " ", text)
    return text.strip()


def build_sections(content: str) -> List[Tuple[str, str]]:
    sections: List[Tuple[str, str]] = []
    current_heading = "Lesson"
    current_lines: List[str] = []
    in_code = False

    for raw_line in content.splitlines():
        line = raw_line.rstrip()
        stripped = line.strip()

        if stripped.startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue

        heading_match = HEADING_RE.match(stripped)
        if heading_match:
            if current_lines:
                sections.append((current_heading, "\n".join(current_lines)))
            current_heading = clean_inline_markup(heading_match.group(1)) or "Lesson"
            current_lines = []
            continue

        cleaned = clean_inline_markup(stripped)
        if cleaned:
            current_lines.append(cleaned)

    if current_lines:
        sections.append((current_heading, "\n".join(current_lines)))

    if not sections:
        cleaned = clean_inline_markup(content)
        if cleaned:
            sections.append(("Lesson", cleaned))

    return sections


def chunk_section(section: str, text: str) -> List[Tuple[str, str]]:
    chunks: List[Tuple[str, str]] = []
    if not text:
        return chunks

    max_chars = settings.MENTOR_CHUNK_CHARS
    overlap = settings.MENTOR_CHUNK_OVERLAP
    start = 0
    text_len = len(text)

    while start < text_len:
        end = min(text_len, start + max_chars)
        if end < text_len:
            split_at = text.rfind(" ", start, end)
            if split_at != -1 and split_at > start + 200:
                end = split_at
        chunk_text = text[start:end].strip()
        if chunk_text:
            chunks.append((section, chunk_text))
        if end >= text_len:
            break
        start = max(0, end - overlap)
        if start == end:
            break

    return chunks


def tokenize(text: str) -> List[str]:
    return [token.lower() for token in WORD_RE.findall(text) if len(token) > 2]


def pick_keywords(text: str, limit: int = 2, min_len: int = 4) -> List[str]:
    tokens = [
        token
        for token in tokenize(text)
        if token not in STOPWORDS and len(token) >= min_len
    ]
    counts: Dict[str, int] = {}
    for token in tokens:
        counts[token] = counts.get(token, 0) + 1
    ranked = sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))
    return [token for token, _ in ranked[:limit]]


def extract_acronyms(text: str) -> List[str]:
    seen: set[str] = set()
    result: List[str] = []
    for token in ACRONYM_RE.findall(text or ""):
        if token in seen:
            continue
        seen.add(token)
        result.append(token)
    return result


def build_index(content: str) -> LessonIndex:
    sections = build_sections(content)
    chunk_rows: List[Tuple[str, str]] = []
    for section, section_text in sections:
        chunk_rows.extend(chunk_section(section, section_text))

    chunks: List[LessonChunk] = []
    df: Dict[str, int] = {}
    for chunk_id, (section, text) in enumerate(chunk_rows):
        tokens = tokenize(text)
        token_counts: Dict[str, int] = {}
        for token in tokens:
            token_counts[token] = token_counts.get(token, 0) + 1
        for token in token_counts.keys():
            df[token] = df.get(token, 0) + 1
        chunks.append(
            LessonChunk(
                chunk_id=chunk_id,
                section=section,
                text=text,
                token_counts=token_counts,
                length=len(tokens),
            )
        )

    avg_len = sum(chunk.length for chunk in chunks) / max(len(chunks), 1)
    idf = {
        token: math.log(1 + (len(chunks) - freq + 0.5) / (freq + 0.5))
        for token, freq in df.items()
    }

    return LessonIndex(chunks=chunks, idf=idf, avg_len=avg_len)


def content_hash(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def get_or_build_index(lesson_id: int, lang: str, content: str) -> LessonIndexEntry:
    key = (lesson_id, lang)
    current_hash = content_hash(content)
    cached = _INDEX_CACHE.get(key)
    if cached and cached.content_hash == current_hash:
        _INDEX_CACHE.move_to_end(key)
        return cached

    headings = extract_headings(content)
    index = build_index(content)
    entry = LessonIndexEntry(content_hash=current_hash, index=index, headings=headings)
    _INDEX_CACHE[key] = entry
    _INDEX_CACHE.move_to_end(key)
    while len(_INDEX_CACHE) > settings.MENTOR_INDEX_CACHE_SIZE:
        _INDEX_CACHE.popitem(last=False)
    return entry


def score_chunks(index: LessonIndex, query: str, top_k: int) -> List[Tuple[float, LessonChunk]]:
    query_tokens = tokenize(query)
    if not query_tokens or not index.chunks:
        return []

    k1 = 1.4
    b = 0.75
    avg_len = index.avg_len or 1.0
    unique_tokens = set(query_tokens)

    scored: List[Tuple[float, LessonChunk]] = []
    for chunk in index.chunks:
        score = 0.0
        for token in unique_tokens:
            tf = chunk.token_counts.get(token, 0)
            if tf == 0:
                continue
            idf = index.idf.get(token, 0.0)
            denom = tf + k1 * (1 - b + b * (chunk.length / avg_len))
            score += idf * ((tf * (k1 + 1)) / denom)
        if score > 0:
            scored.append((score, chunk))

    scored.sort(key=lambda pair: pair[0], reverse=True)
    return scored[:top_k]


def compact_whitespace(text: str) -> str:
    return re.sub(r"\\s+", " ", text).strip()


def build_sources(scored_chunks: Iterable[Tuple[float, LessonChunk]]) -> List[Dict[str, str | float]]:
    sources: List[Dict[str, str | float]] = []
    for score, chunk in scored_chunks:
        snippet = compact_whitespace(chunk.text)
        if len(snippet) > 220:
            snippet = f"{snippet[:217]}..."
        sources.append(
            {
                "section": chunk.section,
                "snippet": snippet,
                "score": round(score, 3),
            }
        )
    return sources


def build_context_chunks(
    scored_chunks: Iterable[Tuple[float, LessonChunk]],
    max_chars: int | None = None,
) -> List[Dict[str, str]]:
    context: List[Dict[str, str]] = []
    for _, chunk in scored_chunks:
        text = chunk.text
        if max_chars is not None and len(text) > max_chars:
            text = f"{text[: max_chars - 1]}…"
        context.append({"section": chunk.section, "text": text})
    return context


def build_suggested_questions(
    lesson: Lesson,
    lang: str,
    headings: Iterable[str] | None = None,
    scored_chunks: Iterable[Tuple[float, LessonChunk]] | None = None,
    query: str | None = None,
) -> List[str]:
    prompts_en = [
        "Quick demo mode: what is {heading} and what should I notice first?",
        "Why should I care about {heading} today? Give me one punchy example.",
        "Give me a mini challenge using {heading} (1-2 steps).",
    ]
    prompts_cs = [
        "Quick demo: co je {heading} a co mam hned videt?",
        "Proc je {heading} dneska dulezite? Dej mi jeden konkretni priklad z praxe.",
        "Udelej mi mini misi s {heading} (1-2 kroky).",
    ]

    templates = prompts_cs if lang == "cs" else prompts_en
    suggestions: List[str] = []
    used: set[str] = set()
    used_questions: set[str] = set()

    def add_question(text: str) -> bool:
        normalized = re.sub(r"\s+", " ", text.strip().lower())
        if not normalized or normalized in used_questions:
            return False
        suggestions.append(text)
        used_questions.add(normalized)
        return True

    def normalize_heading(value: str) -> str:
        heading = clean_inline_markup(value).strip()
        if len(heading) < 4:
            return ""
        if heading.lower() in GENERIC_SECTIONS:
            return ""
        return heading

    def add_heading(value: str) -> bool:
        heading = normalize_heading(value)
        if not heading:
            return False
        key = heading.lower()
        if key in used:
            return False
        template = templates[len(suggestions) % len(templates)]
        suggestions.append(template.format(heading=heading))
        used.add(key)
        return True

    scored_list = list(scored_chunks or [])

    if scored_list:
        for _, chunk in scored_list:
            if add_heading(chunk.section) and len(suggestions) >= 3:
                break

    heading_list = [normalize_heading(h) for h in (headings or [])]
    heading_list = [heading for heading in heading_list if heading]
    if query:
        tokens = set(tokenize(query))
        if tokens:
            heading_list.sort(
                key=lambda heading: len(tokens.intersection(tokenize(heading))),
                reverse=True,
            )

    for heading in heading_list:
        if add_heading(heading) and len(suggestions) >= 3:
            break

    if len(suggestions) < 3 and query:
        acronyms = extract_acronyms(query)
        if acronyms:
            primary = acronyms[0]
            secondary = acronyms[1] if len(acronyms) > 1 else None
            if lang == "cs":
                question = (
                    f"Duel: {primary} vs {secondary} — v cem se lisi v realu?"
                    if secondary
                    else f"Vysvetli {primary} na konkretnim prikladu z realneho sveta."
                )
            else:
                question = (
                    f"Duel: {primary} vs {secondary} — how do they differ in the real world?"
                    if secondary
                    else f"Explain {primary} with a concrete real-world example."
                )
            add_question(question)

    if len(suggestions) < 3 and query:
        topic_tokens = extract_acronyms(query)
        if not topic_tokens:
            topic_tokens = pick_keywords(query, limit=1, min_len=4)
        if topic_tokens:
            topic = topic_tokens[0]
            if lang == "cs":
                add_question(f"Udelej to zive: ukaz {topic} na kratkem prikladu z praxe.")
            else:
                add_question(f"Make it live: show {topic} with a quick real-world example.")

    if len(suggestions) < 3 and scored_list and not extract_acronyms(query or ""):
        chunk_text = " ".join(chunk.text for _, chunk in scored_list[:2])
        for keyword in pick_keywords(chunk_text, limit=3):
            if add_heading(keyword) and len(suggestions) >= 3:
                break

    if len(suggestions) < 3 and query and not extract_acronyms(query):
        for keyword in pick_keywords(query, limit=3):
            if add_heading(keyword) and len(suggestions) >= 3:
                break

    if len(suggestions) < 3:
        title = lesson.title if lang != "cs" else (lesson.title_cs or lesson.title)
        fallback = (
            f"Give me the key takeaways from {title} in 3 bullets."
            if lang != "cs"
            else f"Shrn mi hlavni pointy z {title} do 3 odrazek."
        )
        add_question(fallback)

    return suggestions[:5]
