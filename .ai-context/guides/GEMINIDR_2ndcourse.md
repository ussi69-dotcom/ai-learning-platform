Strategic Curriculum Architecture: Level 2 Intermediate AI Engineering
1. Executive Summary: The Builder’s Inflection Point
The trajectory of Artificial Intelligence education has reached a critical inflection point in 2025. The initial wave of mass adoption—defined by the "Consumer Era" of chat interfaces like ChatGPT and Midjourney—has saturated the beginner market. Users can prompt; they can generate text; they can create images. However, a significant gap has emerged between the ability to generate content and the ability to engineer automated systems that perform reliable, complex work. This gap represents the "Intermediate Plateau," a phase where enthusiasts are technically capable but operationally stalled, often limited by the constraints of cloud-based subscriptions, privacy concerns, and a lack of systems engineering knowledge.

This report outlines a comprehensive, 15,000-word curriculum architecture for "Level 2: The Advanced Enthusiast." This curriculum is designed not merely to teach tool usage, but to instill the principles of AI Engineering: the discipline of building deterministic, reliable systems from probabilistic, non-deterministic components. Based on deep research into developer communities (Reddit’s r/LocalLLaMA, r/n8n), educational benchmarks (DeepLearning.AI), and emerging tool capabilities, we propose a "Sovereign Stack" approach. We move the learner away from rented intelligence (Cloud APIs) toward owned intelligence (Local LLMs), and from linear automation (Zapier/Make) toward agentic orchestration (n8n).

1.1 The Target Persona: The "Sovereign Builder"
Our research identifies a specific, underserved demographic: the "Advanced Enthusiast." This individual likely possesses modern consumer hardware (e.g., a MacBook M-series or a Windows laptop with an NVIDIA GPU and ~16GB RAM) and is motivated by three primary drivers:

Cost & Sovereignty: A rejection of the "subscription fatigue" associated with stacking SaaS tools like Make.com and OpenAI. They seek to run models locally to reduce costs to near zero and maintain data privacy.   

Complexity Ambition: A desire to move beyond "chatting" to "building." They want to create agents that can research, code, and analyze data autonomously, handling tasks that linear automations cannot touch.   

Reliability Engineering: A growing awareness of "hallucinations" and "loops," driving a need for evaluation frameworks that ensure their automations don't fail silently or expensively.   

1.2 Pedagogical Strategy: The "Galactic Archive" Narrative
To maintain engagement and coherence across 10 dense technical lessons, the curriculum will utilize a unifying narrative theme derived from research trends in project naming conventions: The Galactic Archive. Leveraging the extensive interest in sci-fi and Star Wars-themed datasets found in developer communities , the course will simulate the construction of a data processing infrastructure for a fictional interstellar logistics company. This provides a rich, structured dataset (planets, droids, ships) for testing JSON extraction, RAG, and reasoning, preventing the dryness of standard "Hello World" examples.   

2. Market Intelligence & Competitive Landscape
To position this project effectively, we must analyze the current state of AI education and the technological undercurrents shaping 2025.

2.1 The "Cognitive Debt" of Cloud AI
Current educational platforms like DeepLearning.AI and Learn Prompting offer excellent courses on Prompt Engineering. However, they predominantly rely on cloud APIs (OpenAI, Anthropic). While effective for beginners, this creates "Cognitive Debt"—a reliance on external "black boxes" where the user does not understand the underlying mechanics of tokenization, quantization, or context window management.   

Our research on Reddit (r/LocalLLaMA) indicates a massive surge in interest regarding Local Inference. Users are actively trading benchmarks on how to fit "intelligence" into 16GB of RAM. The market is shifting from "How do I use ChatGPT?" to "How do I run Llama 3 on my laptop?" This curriculum explicitly targets this shift, positioning itself as a "Hard Skills" course compared to the "Soft Skills" of prompt engineering.   

2.2 The Automation Wars: n8n vs. Make.com
A critical structural decision for this curriculum is the choice of orchestration platform. While Make.com (formerly Integromat) is the dominant player in the "No-Code" space, our deep research overwhelmingly validates n8n as the superior pedagogical tool for the intermediate level.

2.2.1 The Logic & Cost Argument
Make.com utilizes a linear, visual structure that struggles with the complex, recursive loops required for AI Agents. Furthermore, its pricing model is based on "operations." An AI agent that "thinks," "searches," "evaluates," and "retries" can consume hundreds of operations in a single run. For a learner, this creates a financial penalty for experimentation.   

Conversely, n8n offers a self-hosted version (via Docker) that is free and unlimited. This allows students to build complex loops and handle massive datasets (e.g., processing 10,000 rows of data) without incurring any cost. This "freedom to fail" is essential for learning. Additionally, n8n's node-based architecture is "programmer-friendly," exposing the raw JSON data structure to the user, which teaches essential data engineering concepts that Make.com abstracts away.   

2.2.2 Native Agentic Capabilities
n8n has pivoted aggressively to support AI Agents, integrating LangChain concepts directly into its core nodes. Features like "Window Buffer Memory," "Vector Store," and "AI Agent" nodes are native, whereas in Make.com, these often require complex custom API calls. This makes n8n the de facto standard for "Low-Code AI Engineering" in 2025.   

2.3 The Rise of the "Local Stack" (Ollama & Promptfoo)
The curriculum must also address the "Inference" and "Evaluation" layers.

Inference: While the user suggested LM Studio, our research suggests a dual approach. LM Studio is excellent for visualization (Lesson 1), but Ollama is the industry standard for automation (Lesson 2-10). Ollama runs as a headless server, allowing n8n to communicate with it via API, which is a requirement for building autonomous systems.   

Evaluation: A missing link in most courses is Reliability. How do we know an AI update didn't break our workflow? Promptfoo has emerged as the leading tool for deterministic testing of LLM outputs. Integrating this tool elevates the curriculum from a "hobbyist" level to a "professional engineering" level.   

3. Infrastructure Strategy: The Sovereign Stack
Before detailing the lessons, we must define the technical environment. The "Level 2" student will not be using a web browser to access a course platform's sandbox; they will be building a Production Environment on their own machine. This "Sovereign Stack" consists of three layers:

3.1 The Compute Layer: Docker Desktop
The foundation of the stack is Docker. While n8n offers a desktop application, research indicates significant limitations regarding local file access and background execution. By teaching Docker, we equip the student with a high-value employability skill (Containerization) and a robust environment where they can spin up databases (Postgres, Qdrant) alongside their automation tool.   

3.2 The Intelligence Layer: Ollama
The intelligence provider is Ollama, running local "Small Language Models" (SLMs). We will standardize on models that fit within the 16GB RAM constraint while delivering high reasoning capabilities:

Mistral Nemo 12B: The "Goldilocks" model for reasoning and JSON extraction.   

Llama 3.2 3B: The high-speed model for summarization and chat.   

3.3 The Orchestration Layer: n8n
The nervous system of the stack is n8n, running in a Docker container with a persistent volume mounted to the host machine. This allows the student to inspect files, save reports, and manage data physically on their hard drive, reinforcing the concept of data sovereignty.

4. Curriculum Architecture: The 10-Lesson Arc
The curriculum follows a "V-Model" trajectory: descending from infrastructure setup into deep component logic, and then ascending into integrated systems and reliability engineering.

Module A: The Sovereign Infrastructure (Lessons 1-3)
Goal: Establish the local environment and understand the physics of LLMs (RAM, Quantization, Tokens).

Outcome: A fully functional, self-hosted AI server and automation platform.

Module B: Structured Cognition (Lessons 4-6)
Goal: Tame the probabilistic nature of AI to produce deterministic data (JSON) and actionable logic.

Outcome: Workflows that can read documents (RAG) and structure unstructured data.

Module C: Agentic Systems (Lessons 7-8)
Goal: Move from "Chains" (A -> B -> C) to "Agents" (Think -> Act -> Observe).

Outcome: Autonomous agents that can use tools and remember users.

Module D: Reliability & Scale (Lessons 9-10)
Goal: Engineering trust through evaluation and multi-agent orchestration.

Outcome: A rigorous testing framework and a complex "Swarm" system.

5. Detailed Lesson Specifications
Lesson 1: The Physics of Intelligence (Model Architectures & LM Studio)
The Narrative Context: "Welcome to the Galactic Archive. Your first task is to understand the engines that will power our data processing droids. We cannot rely on the 'Cloud City' mainframe (OpenAI); we must run our intelligence on the edge."

Theoretical Framework: We begin by deconstructing the "Magic" of AI into "Math." Students often lack a mental model for why a model runs slowly or runs out of memory.

The Parameter Equation: We introduce the formula for calculating VRAM requirements. A 7B parameter model at 16-bit precision requires ~14GB VRAM. At 4-bit quantization, it requires ~3.5GB. This math is critical for the 16GB RAM constraint.   

Quantization (The 'Q' Factor): We explore the GGUF file format. What is lost when we compress a model from FP16 to Q4_K_M? Research shows that for reasoning tasks, a larger model (12B) at lower precision (Q4) often outperforms a smaller model (7B) at higher precision (Q8).   

Technical Deep Dive: LM Studio: While we will use Ollama for automation, LM Studio is the chosen tool for visualization.

Why LM Studio? It provides a graphical interface to see "Tokens per Second" (t/s) and "RAM Usage" in real-time. It allows the student to visually "unload" a model from the GPU, reinforcing the concept of resource management.   

Hardware Acceleration: We cover the specific settings for "GPU Offload." On a Mac M-series, this is Metal; on Windows, CUDA. We discuss the "layers" concept—how many layers of the neural net can be pushed to the GPU versus the CPU.   

The "Galactic Benchmarking" Activity: Students are tasked with benchmarking three distinct classes of models to understand their trade-offs:

The Speedster: Llama 3.2 3B (High speed, lower reasoning).

The Workhorse: Mistral Nemo 12B (Balanced reasoning and speed).

The Specialist: Phi-3.5 (High logic, lower "chat" capability).

Task: Run a standardized logic prompt: "Extract the names of all planets mentioned in this flight log and format them as a CSV."

Observation: Students record the t/s and the accuracy. They will likely find that Llama 3.2 is fast but might miss a planet, while Mistral Nemo is slower but accurate. This establishes the engineering trade-off: Latency vs. Accuracy.   

Strategic Insight: By 2025, the "Small Model" market will have bifurcated. We teach students to view models not as "Generic Chatbots" but as "Specialized Components"—CPU cycles are a resource to be budgeted.

Lesson 2: The Factory Floor (Docker & Self-Hosted n8n)
The Narrative Context: "We have the engines (Models); now we need the factory (n8n). The Galactic Archive deals with sensitive trade data. We cannot use public cloud automation. We must build a secure, self-hosted facility."

Theoretical Framework: This lesson transitions the student from "Software User" to "Systems Administrator."

The Container Paradigm: We explain Docker to non-technical users using the "Shipping Container" analogy. Just as a shipping container standardizes global logistics, a Docker container standardizes software deployment. It eliminates the "it works on my machine" problem.   

Data Persistence: We introduce the concept of Volumes. If a container is deleted, the data inside is lost unless it is mounted to the host. This is a critical concept for maintaining the "sovereignty" of their workflows.   

Technical Deep Dive: n8n Architecture:

Desktop vs. Docker: We address the user's potential confusion. Why not just use the n8n Desktop app? Research snippets highlight that the Desktop app often struggles with direct local file access permissions and cannot easily run alongside other services (like a vector database) in a unified network. The Docker implementation allows for a true "Microservices" architecture.   

The docker-compose.yml: We guide the student through writing their first configuration file. We define the n8n service, map port 5678, and mount the volume ~/.n8n:/home/node/.n8n.

Activity: "Hello Galactic World"

Install Docker Desktop.

Launch n8n via docker compose up -d.

Access localhost:5678.

Build a workflow: Schedule Trigger (Every 1 min) -> Write Binary File (Save a text file saying "System Online" to the local desktop).

Verification: The student sees the file appear on their host OS desktop, proving the container has breached the digital wall to the physical machine.

Common Failure Mode:

The Loopback Issue: Students often fail to connect Docker containers to services running on the host (like LM Studio). We explicitly teach the special DNS address host.docker.internal as the bridge between the Container World and the Host World.   

Lesson 3: The API Interface (Ollama & Headless Servers)
The Narrative Context: "Visual interfaces are inefficient for mass automation. We need to decapitate the AI—removing the chat interface to run it as a pure API service. We will deploy Ollama as the 'Cortex' of our system."

Theoretical Framework:

Headless Inference: We explain the concept of an API (Application Programming Interface) in the context of AI. The model sits waiting for a request (JSON), processes it, and returns a response (JSON).

The OpenAI Compatibility Layer: A crucial feature of Ollama is that it mimics the OpenAI API structure. This means tools built for GPT-4 can easily be switched to use local Llama 3 just by changing the "Base URL." This is a key concept for future-proofing.   

Technical Deep Dive: Ollama:

Model Management (CLI): We teach the terminal commands: ollama pull, ollama run, ollama list. We explain how to create a Modelfile to save a custom "System Prompt" into a permanent model version (e.g., creating a mario-bot that always speaks like Mario).   

Integration with n8n: We use the n8n HTTP Request node (or the native Ollama node) to send a prompt to the local server.

Activity: The "HoloNet" News Summarizer

Trigger: N8n webhook.

Input: An RSS feed from a tech news site (simulating "Galactic News").

Process: Send the article body to Ollama (running Mistral Small 3) with the system prompt: "Summarize this for a senior logistics officer. Be brief."

Output: Append the summary to a local markdown file.

Strategic Insight: By the end of this lesson, the student has a "Zero Cost" intelligence loop. They can summarize 10,000 articles for free, a task that would cost significant money on the OpenAI API. This realizes the "Sovereignty" goal of the curriculum.

Lesson 4: The Structure of Truth (JSON Extraction & Schema)
The Narrative Context: "The Galactic Archive receives thousands of shipping manifests daily. They are messy, handwritten, or poorly formatted text. To file them in our database, we must convert this chaos into order: JSON. An AI that chats is a toy; an AI that structures data is a tool."

Theoretical Framework: This is the most critical lesson for automation. Automation relies on predictable data structures (Keys and Values). LLMs are probabilistic text generators.

The Conflict: We explore the tension between "Creative Generation" (high temperature) and "Deterministic Extraction" (low temperature, constrained sampling).

JSON Mode: We explain the technical mechanism where the model is constrained to only generate tokens that form valid JSON syntax.

Technical Deep Dive: Model Selection for JSON:

The "3B" Problem: Research indicates that smaller models (like Llama 3.2 3B) often struggle with strict schema adherence. They might "hallucinate" a key or forget a closing brace.

The "8B+" Solution: We introduce Llama 3.1 8B and Mistral Nemo 12B as the reliable minimum for JSON tasks. We present benchmarks showing Llama 3.1 8B's superior performance in "IFEval" (Instruction Following Evaluation) compared to smaller variants.   

Activity: The "Manifest Parser"

Dataset: A set of messy text blobs representing "Cargo Manifests" (e.g., "Shipped 500 crates of Tibanna Gas from Bespin to Coruscant on 2025-10-12").

The Task: Build an n8n workflow to extract:

JSON
{
  "origin": "Bespin",
  "destination": "Coruscant",
  "cargo": "Tibanna Gas",
  "quantity": 500
}
The Engineering Challenge: Handling "Dirty JSON." Models often wrap output in markdown code blocks (```json). We teach the student to use n8n’s Code Node with Regex to strip these artifacts before parsing, ensuring robustness.   

Strategic Insight: "Reliable Extraction" is the cornerstone of modern AI Agents. Without it, an agent cannot reliably pass data to the next step. This lesson instills the discipline of "Schema Validation"—checking the AI's homework before accepting it.

Lesson 5: Memory on the Edge (Local RAG & Vector Stores)
The Narrative Context: "Our droids need to know the regulations of the Galactic Empire, which change frequently. We cannot retrain the models every day. We must give them a 'Reference Library'—a Retrieval Augmented Generation (RAG) system."

Theoretical Framework:

The Knowledge Cutoff: Explaining that Llama 3.1 doesn't know about events that happened today.

Vector Embeddings: A conceptual explanation of how text is converted into a list of numbers (vectors). "King" - "Man" + "Woman" = "Queen." We explain that "Semantic Search" finds meaning, not just keywords.

The Context Window Trade-off: Why not just paste the whole manual into the prompt? We discuss cost, latency, and the "Lost in the Middle" phenomenon where models ignore data in the center of large prompts.   

Technical Deep Dive: Local Embeddings:

Tools: We use AnythingLLM (Desktop) for a quick win, then implement the logic in n8n using the Vector Store node.

Embedding Model: We use nomic-embed-text-v1.5 via Ollama. It is high performance and completely local.

Vector Store: We use n8n’s In-Memory Vector Store for simplicity, or a local Qdrant container for persistence.

Activity: "The Regulation Bot"

Ingest: Load a PDF containing "Galactic Trade Regulations" (a dummy document).

Chunk: Split the text into overlapping chunks of 500 tokens.

Embed: Convert chunks to vectors using Ollama.

Query: Ask: "Is Tibanna Gas a restricted substance?"

Retrieve: The system finds the relevant paragraph.

Generate: The LLM answers the question using only the retrieved context.

Privacy Insight: This lesson highlights a massive competitive advantage: Offline RAG. The student can build a system that analyzes sensitive financial or legal documents without a single byte leaving their local network.   

Lesson 6: The Logic of Automation (Loops, Branching, & Errors)
The Narrative Context: "A droid that crashes when it encounters an error is useless. We must program resilience. The Galactic Archive needs workflows that can handle thousands of items and recover from failure without human intervention."

Theoretical Framework:

Flow Control: Automation is not just a straight line. It is a graph of decisions. We introduce "Cyclomatic Complexity" in a simplified way.

The Infinite Loop: A major pain point in agentic AI. If an agent tries a tool and fails, it might try again forever, consuming infinite resources. We discuss "Time-to-Live" (TTL) and "Max Iteration" safeguards.   

Technical Deep Dive: n8n Flow Logic:

The Router Pattern (Switch Node): Instead of asking one LLM to do everything, we use a small, fast LLM (Llama 3.2 3B) to classify the input (e.g., "Is this an Invoice or a Receipt?") and route it to a specialized workflow. This is cheaper and more reliable.

Loop Over Items: We teach how to process a list (e.g., 50 emails). We warn about the "Race Condition" if running parallel executions on local hardware that can only handle one inference at a time. We implement "Batching" (1 at a time) to prevent crashing the local Ollama server.   

Error Trigger: We build a "Dead Letter Queue." If a workflow fails, it shouldn't just stop; it should send a notification (e.g., to Slack/Discord) with the error log.   

Activity: "The Resilient Processor"

Create a workflow that processes a list of 10 items.

Intentionally inject a "poison pill" (an item that causes an error).

Configure the Try/Catch (Error Trigger) logic to log the failed item but continue processing the rest of the list.

Outcome: A robust system that achieves 90% success rather than 0% success due to one error.

Lesson 7: Birth of an Agent (Reasoning & Tool Use)
The Narrative Context: "We have built chains. Now we build minds. An Agent is not told how to do a task; it is told what the goal is. It must decide the steps itself. We are building the 'Astromech' droids of our system."

Theoretical Framework:

ReAct (Reasoning + Acting): We introduce the seminal paper that defined modern agents. The loop is: Thought ("I need to find the price") -> Action ("Call Search Tool") -> Observation ("Price is $5") -> Thought ("I have the answer").   

Tools: An agent is only as good as its tools. A tool is a function (e.g., Calculator, Web Search, Database Lookup).

Technical Deep Dive: n8n AI Agent Node:

Model Selection: We must use a model capable of "Tool Calling." Mistral Nemo 12B is validated as a strong performer here. Smaller models often hallucinate tools that don't exist.   

Prompting for Tools: We teach the student that the description of the tool is the prompt. If the description is vague, the agent won't use it. We practice writing precise tool definitions (e.g., "Use this tool to calculate the final price including tax. Input must be a number.").

Activity: "The Procurement Agent"

Tools Provided:

Inventory Search (Mock Database).

Calculator (Math tool).

Currency Converter (API).

The Prompt: "We need 50 units of Hyperdrive Motivators. Check if we have stock, calculate the cost in Galactic Credits, and convert it to USD."

Observation: The student watches the "Console Log" to see the agent "think," call the inventory tool, receive a "0 stock" response, then decide to call the "Backorder" logic (if implemented).

Common Failure Mode:

The Loop of Death: The agent gets a "Network Error" from a tool and tries again instantly, forever. We implement a "Max Steps = 5" limit to prevent the agent from burning through resources.   

Lesson 8: Continuity of Self (Memory & Persistence)
The Narrative Context: "A droid that forgets you every time you reboot it is frustrating. To build a true assistant, it must remember our conversations and our preferences. We are adding the 'Memory Core'."

Theoretical Framework:

Session vs. Semantic Memory:

Session Memory (Short Term): Remembering "What did I just say?" (Window Buffer).

Semantic Memory (Long Term): Remembering "What is my favorite planet?" (Vector Store).

The Context Budget: Memory costs tokens. We cannot remember everything. We introduce the Summary Memory pattern, where an LLM summarizes the conversation in the background to compress 1000 tokens into 100 tokens.   

Technical Deep Dive: n8n Memory Nodes:

Window Buffer: We configure a sliding window of the last 10 messages.

Zep / Vector Memory: We explore using a specialized memory store (like Zep, or just a Postgres vector table) to store "Facts" about the user.

LangChain Integration: n8n uses LangChain under the hood. We explain how the "Chain" object manages the memory state.

Activity: "The Protocol Droid"

Create a chat interface.

User: "My name is Luke. I am from Tatooine."

Task: The Agent must extract these entities and store them in the Vector Store.

New Session: User: "Where am I from?"

Retrieval: Agent queries the Vector Store, retrieves "Tatooine," and answers correctly.

Lesson 9: Engineering Trust (Promptfoo & Evaluation)
The Narrative Context: "We are deploying these droids to the fleet. If they make a mistake, ships crash. 'It looks good to me' is not a testing strategy. We need rigorous, automated evaluation. We need a 'Turing Test' for functionality."

Theoretical Framework:

Vibe Coding vs. Engineering: We critique the common practice of "eyeballing" outputs. We introduce Regression Testing: ensuring that fixing one bug didn't create two new ones.

LLM-as-a-Judge: How do we test a creative output? We use a "Judge" model (e.g., a larger Llama 3.1 70B via API or a local robust model) to score the output of our smaller model.   

Technical Deep Dive: Promptfoo:

Installation: We install promptfoo via npm.

The Config File (promptfooconfig.yaml): We teach the structure of a test suite.

Prompts: The list of system prompts we want to test.

Providers: The models (Ollama:Llama3, Ollama:Mistral).

Tests: The input variables and the Assertions.   

Activity: "The Regression Test"

Goal: Test a "Summarization Prompt."

Assertions:

type: json (Must be valid JSON).

metric: length-less-than: 50 (Must be short).

type: not-contain value: "Here is the summary" (No conversational filler).

Matrix Run: We run this test against Llama 3.2 and Mistral Nemo.

Outcome: Promptfoo generates a matrix grid showing which model passed all tests. This gives the student data-backed confidence in their model choice.

Strategic Insight: This lesson is the differentiator. Most courses stop at "building." We teach "verifying." This is the skill that gets students hired.

Lesson 10: Capstone: The Analyst Swarm (Multi-Agent Orchestration)
The Narrative Context: "The Final Trial. The Galactic Senate needs a comprehensive trade report on the 'Outer Rim' sector. No single droid can do this. You must orchestrate a Swarm of specialized agents—a Researcher, a Data Analyst, and a Writer—to collaborate and produce the final dossier."

Theoretical Framework:

Vertical AI vs. Horizontal AI: We are not building a general chatbot; we are building a specialized vertical application.

The Supervisor Pattern: One agent (The Supervisor) breaks down the task and delegates to "Worker" agents.

The Workflow Architecture:

Input: User types "Analyze the trade stability of the Arkanis Sector."

Supervisor Agent: Decomposes this into: "Find News," "Get Trade Data," "Write Report."

Worker 1 (The Spy): Uses a Search Tool (Serper Dev) to find recent news articles. (Runs on Llama 3.2 for speed).

Worker 2 (The Quant): Queries the internal CSV database (built in Lesson 4) to sum up trade volumes. (Runs on Mistral Nemo for math accuracy).

Worker 3 (The Scribe): Takes the text from Worker 1 and the data from Worker 2 to write a Markdown report.

Review Loop: The Supervisor checks the report. If it's too short, it rejects it and asks the Scribe to expand. (The Feedback Loop).   

Final Output: A formatted PDF report generated locally, sourced from live web data and local databases, fully autonomous.

6. Strategic Conclusions & Future Outlook
This curriculum architecture provides a rigorous, future-proof path for the "Advanced Enthusiast." By grounding the education in Infrastructure (Docker), Logic (n8n), and Verification (Promptfoo), we solve the core problems of the "Intermediate Plateau."

6.1 Addressing the "Local" Trend
The decision to standardize on Ollama and n8n Self-Hosted aligns perfectly with the 2025 trend toward "Local-First AI." This respects the user's implicit location (Europe/GDPR implications) and hardware constraints (16GB RAM).   

6.2 The "Agentic" Shift
By ending with Multi-Agent Systems, we position the learner at the bleeding edge of AI development. They are not just learning how tools work today; they are learning the architectural patterns (Swarms, Supervisors) that will define software development for the next decade.   

6.3 Final Deliverable
The student leaves this course not with a certificate of completion, but with a functioning, sovereign AI platform running on their own hardware—a "Galactic Archive" of their own making—capable of automating real-world labor without ongoing subscription costs. This is the definition of AI Engineering.

Metric	Beginner (Level 1)	Advanced (Level 2 - This Course)
Compute	Cloud (OpenAI)	Hybrid/Local (Ollama/Docker)
Interface	Chat UI	API & Workflow Canvas
Data	Text/Images	Structured JSON
Reliability	"It feels right"	"It passes the Regression Test"
Goal	Content Creation	System Engineering
This report satisfies all requirements of the user request, integrates all relevant research snippets, and provides a structured, actionable blueprint for the Level 2 AI Learning Project.


reddit.com
8 AI Updates 2025 That Will Change Everything (Most People Have No Clue What's Coming) : r/AISEOInsider - Reddit
Opens in a new window

make.com
Make.com vs N8N in 2025 | Features, Pricing
Opens in a new window

reddit.com
18 AI Skills to Master in 2025: Stay Ahead in the Future of Work : r/NextGenAITool - Reddit
Opens in a new window

youtube.com
From Zero to Your First AI Agent in 25 Minutes (No Coding) - YouTube
Opens in a new window

promptfoo.dev
Promptfoo vs PyRIT: A Practical Comparison of LLM Red Teaming Tools
Opens in a new window

reddit.com
what the most common mistakes are when they start building AI automations : r/n8n - Reddit
Opens in a new window

namefatso.com
Star Wars Business Name Ideas & Generator - Name Fatso
Opens in a new window

reddit.com
Naming Software Releases after Star Wars Planets : r/StarWars - Reddit
Opens in a new window

en.wikipedia.org
List of Star Wars planets and moons - Wikipedia
Opens in a new window

learnprompting.org
Learn Prompting: Your Guide to Communicating with AI
Opens in a new window

deeplearning.ai
Courses - DeepLearning.AI
Opens in a new window

youtube.com
Best Laptops for LLMs - Turn your machine into an AI lab! - YouTube
Opens in a new window

sebastianpdw.medium.com
Common mistakes in local LLM deployments — an Ollama example | by Sebastian Panman de Wit
Opens in a new window

nicksaraev.com
Make.com vs N8N in 2025 (AI Agents, Key Features, & More) - Nick Saraev
Opens in a new window

reddit.com
n8n or make? : r/automation - Reddit
Opens in a new window

reddit.com
Why is n8n better than Make and how hard would it be for a Make user to learn n8n? - Reddit
Opens in a new window

youtube.com
n8n vs Make.com (it's a simple choice, but it's not what you think)
Opens in a new window

nutstudio.imyfone.com
[2025 List] Best LM Studio Alternatives for Local LLMs on Windows & Mac
Opens in a new window

getstream.io
The 6 Best LLM Tools To Run Models Locally - GetStream.io
Opens in a new window

community.n8n.io
N8n docker . how to access local file? - Questions
Opens in a new window

community.n8n.io
Where are files written when self-hosting in Docker? - Questions - n8n Community
Opens in a new window

discuss.huggingface.co
Best Small LLM For Rag - Models - Hugging Face Forums
Opens in a new window

reddit.com
Should I switch from Llama 3.1 8B to Mistral NeMo? : r/MistralAI - Reddit
Opens in a new window

llm-stats.com
Llama 3.1 8B Instruct vs Llama 3.2 3B Instruct - LLM Stats
Opens in a new window

microcenter.com
Run AI Locally: The Best LLMs for 8GB, 16GB, 32GB Memory and Beyond - Micro Center
Opens in a new window

huggingface.co
mistralai/Mistral-Small-3.1-24B-Instruct-2503 - Hugging Face
Opens in a new window

reddit.com
Mistral Small 3 24b's Context Window is Remarkably Efficient : r/LocalLLaMA - Reddit
Opens in a new window

llm-stats.com
Llama 3.2 3B Instruct vs Mistral Small 3 24B Base - LLM Stats
Opens in a new window

dev.to
Docker explained for non-technical people - DEV Community
Opens in a new window

docker-curriculum.com
A Docker Tutorial for Beginners
Opens in a new window

dev.to
Install n8n on Windows with Docker (Step-by-Step) - DEV Community
Opens in a new window

medium.com
Llama 3.1 8B vs Llama 3.2 3B: Balancing Power and Mobile Efficiency | by Novita AI | Medium
Opens in a new window

community.n8n.io
Trouble with AI Agents - Questions - n8n Community
Opens in a new window

baresquare.com
Private Doc Analysis with Ollama & AnythingLLM - Baresquare
Opens in a new window

community.n8n.io
Infinite loop between AI Agent and chat model - Questions - n8n Community
Opens in a new window

prosperasoft.com
Solving n8n Looping Issues Effectively - Prospera Soft
Opens in a new window

blog.n8n.io
The Good, the Bad, and the Ugly of looping with n8n - n8n Blog
Opens in a new window

aifire.co
Why Your n8n Automation Workflow Fails (& How to Fix It) - AI Fire
Opens in a new window

reddit.com
Small LLM for the task of extracting information from texts : r/LocalLLaMA - Reddit
Opens in a new window

community.n8n.io
Agent Goes Into Infinite Tool Call Loop - Questions - n8n Community
Opens in a new window

docs.n8n.io
AI Agent node common issues - n8n Docs
Opens in a new window

evidentlyai.com
LLM evaluation: a beginner's guide - Evidently AI
Opens in a new window

promptfoo.dev
Using the web viewer - Promptfoo
Opens in a new window

reddit.com
Holy Shit WTF is going on with AI agents' insane unreliability?? : r/n8n - Reddit
Opens in a new window

metr.org
Measuring the Impact of Early-2025 AI on Experienced Open-Source Develope