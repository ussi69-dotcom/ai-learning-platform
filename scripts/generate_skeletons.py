import os
import json

course_path = "content/courses/practical-prompt-engineering"
lessons_dir = os.path.join(course_path, "lessons")

lessons = [
    {
        "id": "01-prompt-anatomy",
        "title": "Prompt Anatomy",
        "title_cs": "Anatomie Promptu",
        "desc": "Understanding the core components of a prompt.",
        "desc_cs": "Pochopení základních složek promptu."
    },
    {
        "id": "02-patterns-templates",
        "title": "Prompt Patterns & Templates",
        "title_cs": "Vzory a Šablony Promptů",
        "desc": "Zero-shot, Few-shot, and Chain of Thought.",
        "desc_cs": "Zero-shot, Few-shot a Chain of Thought."
    },
    {
        "id": "03-context-management",
        "title": "Context & Memory Management",
        "title_cs": "Správa Kontextu a Paměti",
        "desc": "How to handle context window limits.",
        "desc_cs": "Jak pracovat s limity kontextového okna."
    },
    {
        "id": "04-output-control",
        "title": "Controlling Output Format",
        "title_cs": "Kontrola Výstupního Formátu",
        "desc": "Forcing JSON, Markdown, and other formats.",
        "desc_cs": "Vynucení JSON, Markdown a dalších formátů."
    },
    {
        "id": "05-personas-roles",
        "title": "Personas & System Prompts",
        "title_cs": "Persony a Systémové Prompty",
        "desc": "Using roles to improve response quality.",
        "desc_cs": "Využití rolí pro zlepšení kvality odpovědí."
    },
    {
        "id": "06-debugging-prompts",
        "title": "Debugging & Iteration",
        "title_cs": "Ladění a Iterace Promptů",
        "desc": "Strategies for fixing bad outputs.",
        "desc_cs": "Strategie pro opravu špatných výstupů."
    },
    {
        "id": "07-real-world-cases",
        "title": "Real-World Use Cases",
        "title_cs": "Příklady z Praxe",
        "desc": "Applying skills to real problems.",
        "desc_cs": "Aplikace dovedností na reálné problémy."
    },
    {
        "id": "08-course-project",
        "title": "Project: Prompt Library",
        "title_cs": "Projekt: Knihovna Promptů",
        "desc": "Build your own reusable prompt library.",
        "desc_cs": "Vytvořte si vlastní knihovnu znovupoužitelných promptů."
    }
]

os.makedirs(lessons_dir, exist_ok=True)

for i, lesson in enumerate(lessons):
    lesson_path = os.path.join(lessons_dir, lesson["id"])
    os.makedirs(lesson_path, exist_ok=True)
    
    # meta.json
    meta = {
        "title": lesson["title"],
        "title_cs": lesson["title_cs"],
        "description": lesson["desc"],
        "description_cs": lesson["desc_cs"],
        "order": i + 1,
        "duration_minutes": 15,
        "is_published": True
    }
    with open(os.path.join(lesson_path, "meta.json"), "w") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)
        
    # content.mdx
    content_en = f"""# {lesson['title']}

<Callout type="info">
**Mission Goal:** {lesson['desc']}
⏳ **Reading Time:** 15 min | 🧪 **3 Labs Included**
</Callout>

## Introduction

Content coming soon...
"""
    if not os.path.exists(os.path.join(lesson_path, "content.mdx")):
        with open(os.path.join(lesson_path, "content.mdx"), "w") as f:
            f.write(content_en)

    # content.cs.mdx
    content_cs = f"""# {lesson['title_cs']}

<Callout type="info">
**Cíl mise:** {lesson['desc_cs']}
⏳ **Čas čtení:** 15 min | 🧪 **3 Laboratoře**
</Callout>

## Úvod

Obsah se připravuje...
"""
    if not os.path.exists(os.path.join(lesson_path, "content.cs.mdx")):
        with open(os.path.join(lesson_path, "content.cs.mdx"), "w") as f:
            f.write(content_cs)

    # quiz.json
    quiz_data = {
        "questions": [
            {
                "id": "q1",
                "question": "Placeholder question?",
                "options": ["Option A", "Option B", "Option C"],
                "correct_answer": 0,
                "explanation": "Explanation here."
            }
        ]
    }
    
    if not os.path.exists(os.path.join(lesson_path, "quiz.json")):
        with open(os.path.join(lesson_path, "quiz.json"), "w") as f:
            json.dump(quiz_data, f, indent=2)
            
    # quiz.cs.json
    quiz_data_cs = {
        "questions": [
            {
                "id": "q1",
                "question": "Otázka?",
                "options": ["Možnost A", "Možnost B", "Možnost C"],
                "correct_answer": 0,
                "explanation": "Vysvětlení."
            }
        ]
    }
    
    if not os.path.exists(os.path.join(lesson_path, "quiz.cs.json")):
        with open(os.path.join(lesson_path, "quiz.cs.json"), "w") as f:
            json.dump(quiz_data_cs, f, indent=2, ensure_ascii=False)

print(f"Generated {len(lessons)} lesson skeletons in {lessons_dir}")
