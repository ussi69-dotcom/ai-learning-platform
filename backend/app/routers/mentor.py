from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app import auth, models, schemas
from app.config import settings
from app.dependencies import get_lesson
from app.services import mentor_client, mentor_prompts, mentor_rag

router = APIRouter()

VALID_MODES = {"fast"}
VALID_VIBES = {"jedi", "sith"}
VALID_LANGS = {"en", "cs"}


def normalize_mode(mode: str | None) -> str:
    if not mode:
        return settings.MENTOR_DEFAULT_MODE
    return mode if mode in VALID_MODES else settings.MENTOR_DEFAULT_MODE


def normalize_vibe(vibe: str | None) -> str:
    if not vibe:
        return "jedi"
    return vibe if vibe in VALID_VIBES else "jedi"


def normalize_lang(lang: str | None) -> str:
    if not lang:
        return "en"
    return lang if lang in VALID_LANGS else "en"


def select_context_limits(mode: str) -> tuple[int, int]:
    return settings.MENTOR_MAX_CONTEXT_CHUNKS_FAST, settings.MENTOR_CONTEXT_CHARS_FAST


def select_history_limits(mode: str) -> tuple[int, int]:
    return settings.MENTOR_MAX_HISTORY_FAST, settings.MENTOR_HISTORY_CHARS_FAST


def trim_history(
    history: List[schemas.MentorMessage], max_items: int, max_chars: int
) -> List[dict[str, str]]:
    trimmed: List[dict[str, str]] = []
    for item in history[-max_items:]:
        content = item.content.strip()
        if len(content) > max_chars:
            content = f"{content[: max_chars - 1]}…"
        trimmed.append({"role": item.role, "content": content})
    return trimmed


@router.get(
    "/mentor/lessons/{lesson_id}/suggestions",
    response_model=schemas.MentorSuggestionsResponse,
)
def get_mentor_suggestions(
    lesson: models.Lesson = Depends(get_lesson),
    lang: str = "en",
    current_user: models.User = Depends(auth.get_current_user),
):
    lang = normalize_lang(lang)
    lesson_content = mentor_rag.get_lesson_content(lesson, lang)
    index_entry = mentor_rag.get_or_build_index(lesson.id, lang, lesson_content)
    questions = mentor_rag.build_suggested_questions(
        lesson, lang=lang, headings=index_entry.headings
    )
    return schemas.MentorSuggestionsResponse(questions=questions)


@router.post(
    "/mentor/lessons/{lesson_id}/chat",
    response_model=schemas.MentorChatResponse,
)
def mentor_chat(
    payload: schemas.MentorChatRequest,
    lesson: models.Lesson = Depends(get_lesson),
    lang: str = "en",
    current_user: models.User = Depends(auth.get_current_user),
):
    lang = normalize_lang(lang)
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    mode = normalize_mode(payload.mode)
    vibe = normalize_vibe(payload.vibe)

    lesson_content = mentor_rag.get_lesson_content(lesson, lang)
    if not lesson_content:
        raise HTTPException(status_code=404, detail="Lesson content not found.")

    index_entry = mentor_rag.get_or_build_index(lesson.id, lang, lesson_content)
    max_chunks, context_char_limit = select_context_limits(mode)
    scored_chunks = mentor_rag.score_chunks(index_entry.index, payload.message, max_chunks)
    context_chunks = mentor_rag.build_context_chunks(scored_chunks, max_chars=context_char_limit)
    sources = mentor_rag.build_sources(scored_chunks)

    lesson_description = ""
    history: List[dict[str, str]] = []
    if payload.history:
        max_history, history_chars = select_history_limits(mode)
        history = trim_history(payload.history, max_history, history_chars)

    messages = mentor_prompts.build_messages(
        lesson_title=lesson.title if lang != "cs" else (lesson.title_cs or lesson.title),
        lesson_description=lesson_description,
        context_chunks=context_chunks,
        question=payload.message,
        vibe=vibe,
        lang=lang,
        mode=mode,
        history=history,
    )

    try:
        answer = mentor_client.call_chat(messages, mode=mode)
    except mentor_client.MentorClientError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Mentor model unavailable: {exc}",
        ) from exc

    suggestion_query = payload.message
    if history:
        history_text = " ".join(item["content"] for item in history[-2:])
        suggestion_query = f"{history_text} {payload.message}".strip()

    answer_hint = answer[:300]
    if answer_hint:
        suggestion_query = f"{suggestion_query} {answer_hint}".strip()

    suggestion_chunks = mentor_rag.score_chunks(
        index_entry.index,
        suggestion_query,
        max(3, max_chunks),
    )
    suggestions = mentor_rag.build_suggested_questions(
        lesson,
        lang=lang,
        headings=index_entry.headings,
        scored_chunks=suggestion_chunks,
        query=suggestion_query,
    )

    return schemas.MentorChatResponse(
        answer=answer,
        mode=mode,
        vibe=vibe,
        sources=sources,
        suggested_questions=suggestions,
    )


@router.get(
    "/mentor/health",
    response_model=schemas.MentorHealthResponse,
)
def mentor_health():
    modes = ["fast"]
    services = [mentor_client.check_health(mode) for mode in modes]
    status_label = "healthy" if all(s["status"] == "healthy" for s in services) else "degraded"
    return schemas.MentorHealthResponse(status=status_label, services=services)
