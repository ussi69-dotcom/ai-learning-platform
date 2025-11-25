# 🎓 AI Learning Platform - Curriculum Strategy

## Vision
**"Don't just learn about the Force. Learn to wield it."**
Students start as **Padawans** (Users) and graduate as **Jedi Knights** (Builders). The final project is rebuilding this very platform.

---

## 🎯 Learning Curve Design

### Phase 1: The Padawan (Foundations & Prompting)
**Goal:** Master the tools (ChatGPT, Claude) and understand the underlying mechanics without coding.

**Topics:**
1.  **What is AI?** (Programming vs Training) - *Completed*
2.  **How Machines Learn** (Neural Networks & Training Data) - *Completed*
3.  **The Brains: LLMs Explained** (Tokens, Probability, Context Window)
    *   *Video:* "Large Language Models in 5 minutes"
    *   *Lab:* Tokenizer visualizer (Text -> Numbers)
4.  **Jedi Mind Tricks: Prompt Engineering** (Context, Persona, Constraints)
    *   *Lab:* "Fix the broken prompt"
5.  **The Dark Side: Hallucinations & Bias** (Why AI lies and discriminates) - *Completed*
    *   *Lab:* "Trick the AI into revealing secrets" (Safety basics)
6.  **AI at Work: The Enterprise Era** (Copilot, Meeting Intel, HR Tools)
    *   *Focus:* Microsoft Ecosystem, Transcription, Summarization, RAG Chatbots.
    *   *Lab:* "The Meeting Minute Master" & "Email Polish".
7.  **The Grand Trial** (Course Summary & Final Exam)
    *   *Challenge:* A comprehensive test of all Padawan skills.

**Success Criteria:**
- Understands Training vs Inference.
- Can write structured, effective prompts (Chain of Thought).
- Can identify hallucinations.

---

### Phase 2: The Jedi Knight (Building with APIs)
**Goal:** Code your first AI-powered Python applications. "Build your own Lightsaber".

**Topics:**
1.  **Connecting to the Force (API Basics)**
    *   *Lab:* Your first `client.chat.completions.create` call.
2.  **Droid Memory (Context & History)**
    *   *Lab:* Build a CLI chatbot that remembers your name.
3.  **The Jedi Archives (RAG - Retrieval Augmented Generation)**
    *   *Lab:* Chat with a PDF (Star Wars script).
4.  **Function Calling (Giving AI Hands)**
    *   *Lab:* AI that can get current weather or roll dice.
5.  **Building a Brain (Fine-tuning vs RAG)**
    *   *Concept:* When to train vs when to give context.
6.  **Project: The Holocron Assistant**
    *   *Multi-stage Lab:* Build a web-based helper using Streamlit/Gradio + OpenAI.

**Success Criteria:**
- Comfortable with Python `openai` / `anthropic` libraries.
- Built a functional RAG system.
- Deployed a simple AI web app.

---

### Phase 3: The Master (Production Systems)
**Goal:** Ship scalable, secure, and expensive-to-run systems.

1.  **Vector Databases** (Pinecone/Chroma deep dive)
2.  **AI Agents & Swarms** (LangChain/CrewAI basics)
3.  **Eval & Monitoring** (How to know if your Jedi is failing)
4.  **Prompt Injection Defense** (Security)
5.  **Local LLMs** (Running Llama 3 on your laptop)

---

### Phase 4: The Grandmaster (Meta-Project)
**Goal:** Rebuild THIS platform.
*   Next.js Frontend + FastAPI Backend + Postgres + Vector DB.

---

## 📚 Content Rules (Cycle 24 Update)
*   **Video First:** Every lesson starts with a curated YouTube video (<20 min).
*   **Star Wars Easter Eggs:** Mandatory. Use quotes, names (Tatooine, Coruscant), and analogies.
*   **Interactive Labs:**
    *   Phase 1: Embedded `<LabSection>` (Quick wins).
    *   Phase 2+: Multi-step project labs.
*   **Visuals:** Use CSS Diagrams and Code Blocks. No generic stock photos.

---

**Last Updated:** Cycle 24 (November 2025)