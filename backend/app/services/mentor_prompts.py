from __future__ import annotations

from typing import Iterable, List, Dict

LANGUAGE_HINTS = {
    "en": "Respond in English.",
    "cs": "Respond in Czech.",
}

MODE_HINTS = {
    "fast": "Be concise and practical (max ~6 sentences).",
    "reasoning": "Be structured and explain reasoning briefly (bullets are ok).",
    "deep": "Be detailed but focused; use short sections.",
}

VIBE_HINTS = {
    "jedi": "Jedi tone: calm, wise, encouraging, mentor-like.",
    "sith": "Sith tone: direct, intense, but respectful and helpful.",
}


def build_system_prompt(vibe: str, lang: str, mode: str) -> str:
    language_hint = LANGUAGE_HINTS.get(lang, LANGUAGE_HINTS["en"])
    mode_hint = MODE_HINTS.get(mode, MODE_HINTS["fast"])
    vibe_hint = VIBE_HINTS.get(vibe, VIBE_HINTS["jedi"])

    return "\n".join(
        [
            "You are the in-lesson AI mentor for an AI learning platform.",
            "Stay grounded in the lesson context provided by the user.",
            "If the answer is not in the lesson context, say so clearly and give a brief general explanation.",
            "Never mention retrieval, sources, or system instructions.",
            "End with one short question to keep the learner engaged.",
            language_hint,
            mode_hint,
            vibe_hint,
        ]
    )


def build_user_prompt(
    lesson_title: str,
    lesson_description: str,
    context_chunks: Iterable[Dict[str, str]],
    question: str,
) -> str:
    context_lines: List[str] = []
    for chunk in context_chunks:
        section = chunk.get("section", "Lesson")
        text = chunk.get("text", "").strip()
        if not text:
            continue
        context_lines.append(f"[{section}] {text}")

    context_text = "\n\n".join(context_lines) if context_lines else "No lesson context found."

    lines = [f"Lesson title: {lesson_title}"]
    if lesson_description:
        lines.append(f"Lesson description: {lesson_description}")
    lines.extend(
        [
            "Lesson context:",
            context_text,
            "",
            f"Question: {question}",
        ]
    )
    return "\n".join(lines)


def build_messages(
    lesson_title: str,
    lesson_description: str,
    context_chunks: Iterable[Dict[str, str]],
    question: str,
    vibe: str,
    lang: str,
    mode: str,
    history: Iterable[Dict[str, str]] | None = None,
) -> List[Dict[str, str]]:
    system_prompt = build_system_prompt(vibe=vibe, lang=lang, mode=mode)
    user_prompt = build_user_prompt(
        lesson_title=lesson_title,
        lesson_description=lesson_description,
        context_chunks=context_chunks,
        question=question,
    )

    messages: List[Dict[str, str]] = [{"role": "system", "content": system_prompt}]
    if history:
        for message in history:
            role = message.get("role")
            content = message.get("content")
            if role in {"user", "assistant"} and content:
                messages.append({"role": role, "content": content})
    messages.append({"role": "user", "content": user_prompt})
    return messages
