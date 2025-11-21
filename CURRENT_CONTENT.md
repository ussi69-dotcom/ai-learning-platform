# CURRENT CONTENT DUMP

--- FILE: content/courses/advanced-ai-techniques/meta.json ---
```
{
  "title": "Advanced AI Techniques",
  "description": "Master advanced prompting: chain-of-thought, few-shot learning, and complex task decomposition.",
  "image_url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
  "difficulty_level": "COME_GET_SOME"
}

```

--- FILE: content/courses/advanced-ai-techniques/lessons/01-chain-of-thought/content.mdx ---
```
# Chain-of-Thought

Make AI show its work!

```

--- FILE: content/courses/advanced-ai-techniques/lessons/01-chain-of-thought/meta.json ---
```
{
  "title": "Chain-of-Thought Prompting",
  "description": "Make AI show its reasoning step-by-step.",
  "order": 1
}

```

--- FILE: content/courses/advanced-ai-techniques/lessons/02-few-shot/content.mdx ---
```
# Few-Shot Learning

Show AI examples of what you want.

```

--- FILE: content/courses/advanced-ai-techniques/lessons/02-few-shot/meta.json ---
```
{
  "title": "Few-Shot Learning",
  "description": "Teach AI by example.",
  "order": 2
}

```

--- FILE: content/courses/ai-basics-beginner/meta.json ---
```
{
  "title": "AI Basics for Absolute Beginners",
  "description": "Start your AI journey from zero. Learn what AI is, how it works, and how to use it in your daily life. Perfect for complete beginners!",
  "image_url": "/images/course-cover-beginner.png",
  "difficulty_level": "PIECE_OF_CAKE"
}

```

--- FILE: content/courses/ai-basics-beginner/lessons/01-what-is-ai/content.mdx ---
```
# Co je to vlastně AI? 🤖

<Callout type="info">
**Rychlý start:** V této lekci pochopíš rozdíl mezi "tupým" programem a "chytrou" AI.
⏳ **Čas na čtení:** 5 min | 📱 **Vhodné do vlaku**
</Callout>

Vítej! Právě začínáš cestu, která ti pravděpodobně změní kariéru. AI není jen "hype". Je to nová elektřina. A ty se právě učíš, jak zapojit zástrčku.

## Část 1: Teorie (Jak to funguje) 🧠

Představ si, že chceš naučit počítač rozeznat **psa** od **kočky**.

### Starý způsob (Programování)
V klasickém programování (to, co se dělá posledních 50 let) bys musel napsat přesná pravidla:
1. *Má to špičaté uši?*
2. *Má to svislé zorničky?*
3. *Dělá to Mňau?*

Je to jako psát recept na bábovku. Když se spleteš v gramáži, bábovka se nepovede. Když kočka na fotce nemá vidět uši, program selže.

### Nový způsob (Umělá Inteligence)
AI neprogramujeme pravidly. My ji **trénujeme**.
Ukážeme jí 10 000 fotek psů a 10 000 fotek koček a řekneš: *"Na, tohle se nauč."*

<ConceptCard title="Machine Learning (Strojové učení)">
Proces, kdy počítač sám hledá vzorce v datech, aniž by mu člověk musel říkat, co přesně má hledat. Je to statistika na steroidech.
</ConceptCard>

AI si sama najde pravidla, která by člověka ani nenapadla (např. poměr vzdálenosti očí k čumáku).

---

## Část 2: Praxe (Hands-on Lab) 🛠️

<Callout type="warning">
**Pozor:** Pro tuto část je lepší být u počítače nebo mít rozdělenou obrazovku. Budeme zkoušet AI v akci.
</Callout>

Pojďme si dokázat, že AI není magie, ale nástroj.

<Steps>
### Krok 1: Otevři si Chatbota
Jdi na ChatGPT nebo Google Gemini.

### Krok 2: Test "Halucinace"
Zeptej se AI na něco, co neexistuje, abys viděl, jak se snaží vyhovět.
**Prompt:** *"Napiš mi krátký životopis slavného českého vynálezce jménem 'Karel Vymyšlený', který v roce 1920 vynalezl nafukovací kladivo."*

### Krok 3: Analýza
Sleduj, jak AI suverénně lže. Proč? Protože ona "neví", co je pravda. Ona jen doplňuje slova, která statisticky patří k sobě.
</Steps>

### Co si z toho odnést?
AI je **generátor**, ne encyklopedie. Je to extrémně sečtělý papoušek, který umí skládat básně, programovat i lhát. Tvým úkolem je být ten, kdo ho hlídá.

<Callout type="tip">
**Pro pokročilé:** Zkus se AI zeptat na aktuální zprávy z dnešního dne. Všimni si, že většina modelů má "knowledge cutoff" - datum, za které nemají data.
</Callout>

```

--- FILE: content/courses/ai-basics-beginner/lessons/01-what-is-ai/meta.json ---
```
{
  "title": "What is Artificial Intelligence?",
  "description": "Understanding AI in simple terms - no tech jargon! Learn what AI really is and see real examples.",
  "video_url": "https://www.youtube.com/embed/ad79nYk2keg",
  "order": 1
}

```

--- FILE: content/courses/ai-basics-beginner/lessons/01-what-is-ai/quiz.json ---
```
[
  {
    "question": "What is Artificial Intelligence?",
    "options": [
      "A type of computer virus",
      "When computers can do things that need human intelligence",
      "A programming language",
      "A video game"
    ],
    "correct_answer": 1,
    "explanation": "AI is when computers can perform tasks that typically require human intelligence, like recognizing images, understanding speech, or making decisions."
  },
  {
    "question": "Which of these is an example of AI?",
    "options": [
      "A calculator adding numbers",
      "Microsoft Word spell checker",
      "Siri understanding your voice and answering questions",
      "A digital clock showing time"
    ],
    "correct_answer": 2,
    "explanation": "Siri uses AI to understand natural language, process meaning, and generate appropriate responses. A calculator just follows fixed mathematical rules."
  },
  {
    "question": "What makes AI different from regular computer programs?",
    "options": [
      "AI is more expensive to build",
      "AI learns patterns from data",
      "AI was invented more recently",
      "AI only works on smartphones"
    ],
    "correct_answer": 1,
    "explanation": "The key difference is that AI learns from data and can improve over time, while regular programs just follow pre-programmed rules that never change."
  },
  {
    "question": "When did ChatGPT launch and make AI mainstream?",
    "options": [
      "2018",
      "2020",
      "2022",
      "2024"
    ],
    "correct_answer": 2,
    "explanation": "ChatGPT launched in November 2022 and quickly became the fastest-growing consumer application in history, making AI accessible to millions of people."
  },
  {
    "question": "True or False: AI can learn patterns from data just like humans learn from experience.",
    "options": [
      "True",
      "False",
      "Only for image recognition",
      "Only for voice assistants"
    ],
    "correct_answer": 0,
    "explanation": "True! AI learns from data (examples) just like humans learn from experience. The more data it sees, the better it gets at recognizing patterns."
  }
]

```

--- FILE: content/courses/ai-basics-beginner/lessons/02-how-does-ai-learn/content.mdx ---
```
# How Does AI Learn? 🧠

Great question! This is where AI gets its "intelligence" from.

## The Big Secret: AI Learns Like You Do!

Remember how you learned to recognize a dog?
1. Someone showed you dogs
2. They said "This is a dog"
3. You saw many different dogs
4. Now you can spot a dog anywhere!

**AI does the EXACT same thing!**

## Machine Learning Explained Simply

**Machine Learning** is teaching a computer by showing it examples.

![Machine Learning Process](./images/ml-process.png)


### Example: Teaching AI to Recognize Cats 🐱

**Step 1: Show it LOTS of cat photos**
- 1,000 photos of cats
- All different: big cats, small cats, orange cats, black cats

**Step 2: Tell it "These are cats"**
- The AI doesn't know what a cat is
- It just looks for patterns in the photos

**Step 3: It learns patterns**
- "Cats have pointy ears"
- "Cats have whiskers"
- "Cats have this body shape"

**Step 4: Test it!**
- Show it a NEW cat photo
- It uses the patterns it learned
- "This has pointy ears + whiskers = It's a cat!"

## The Three Types of Learning

![Types of Machine Learning](./images/ml-types.png)


### 1. Supervised Learning 👨‍🏫
**Like having a teacher**

You show the AI examples WITH answers:
- Photo + "This is a cat"
- Email + "This is spam"
- X-ray + "This is healthy"

**Used for:**
- Email spam filters
- Medical diagnosis
- Voice recognition

### 2. Unsupervised Learning 🔍
**Like a detective finding patterns**

You give AI data WITHOUT answers:
- Customer shopping habits
- Website visitor behavior
- Music preferences

The AI finds groups and patterns on its own!

**Used for:**
- Netflix recommendations
- Spotify playlists
- Customer segmentation

### 3. Reinforcement Learning 🎮
**Like training a dog with treats**

The AI tries different things:
- ✅ Good action = Reward
- ❌ Bad action = Penalty

It learns by trial and error!

**Used for:**
- Game AI (like AlphaGo)
- Self-driving cars
- Robot control

## The Magic Ingredient: DATA! 📊

AI is ONLY as good as the data you feed it.

### Good Data = Smart AI ✅
- Lots of examples (thousands!)
- Diverse examples (different types)
- Accurate labels

### Bad Data = Dumb AI ❌
- Too few examples
- All examples look the same
- Wrong labels

**Real Example:**
If you only show AI photos of orange cats, it will think ALL cats are orange! 🐱🍊

## Training vs Running

### Training (Learning Phase) 🏋️
- Takes a long time (hours to weeks!)
- Uses LOTS of computer power
- Happens once (or occasionally)

**Example:** Training ChatGPT took months and cost millions!

### Running (Using Phase) ⚡
- Super fast (milliseconds!)
- Uses normal computer power
- Happens every time you use it

**Example:** Asking ChatGPT a question takes seconds!

## Why "Deep Learning"? 🕳️

You might hear about "Deep Learning" - it's just a type of machine learning that:
- Uses many layers of learning (like a cake with many layers!)
- Can handle very complex patterns
- Powers most modern AI (ChatGPT, image recognition, etc.)

Don't worry about the details - just know it's the current "best" way to do AI!

---

## 🎯 Try This!

Think about Spotify or Netflix recommendations.

**How did it learn your taste?**
1. What data did you give it?
2. How did it learn what you like?
3. Why does it get better over time?

---

## 💡 Key Takeaways

1. **AI learns from examples** - just like you!
2. **More data = smarter AI** (usually!)
3. **Three types of learning**: Supervised, Unsupervised, Reinforcement
4. **Training is slow, using is fast**
5. **Deep Learning** is the current best approach

Next up: Let's actually USE AI by learning how to talk to it! 🗣️

```

--- FILE: content/courses/ai-basics-beginner/lessons/02-how-does-ai-learn/meta.json ---
```
{
  "title": "How Does AI Learn?",
  "description": "Discover the secret behind AI - it's all about learning from examples! See how machine learning works in simple terms.",
  "video_url": "https://www.youtube.com/embed/ukzFI9rgwfU",
  "order": 2
}

```

--- FILE: content/courses/ai-basics-beginner/lessons/02-how-does-ai-learn/quiz.json ---
```
[
  {
    "question": "What is Machine Learning?",
    "options": [
      "Teaching humans about machines",
      "Teaching computers by showing them examples",
      "A type of robot",
      "A programming language"
    ],
    "correct_answer": 1,
    "explanation": "Machine Learning is teaching computers by showing them many examples, so they can learn patterns and make predictions on new data."
  },
  {
    "question": "Which type of learning uses examples WITH correct answers (labels)?",
    "options": [
      "Unsupervised Learning",
      "Reinforcement Learning",
      "Supervised Learning",
      "Deep Learning"
    ],
    "correct_answer": 2,
    "explanation": "Supervised Learning is like having a teacher - you show the AI examples WITH answers (e.g., 'This is a cat', 'This is spam') so it learns to label new examples."
  },
  {
    "question": "What type of learning do Netflix recommendations use?",
    "options": [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
      "None - it's random"
    ],
    "correct_answer": 1,
    "explanation": "Netflix uses Unsupervised Learning to find patterns in viewing habits without explicit labels, grouping similar users and recommending what they might like."
  },
  {
    "question": "Why is data quality important for AI?",
    "options": [
      "More data is always better regardless of quality",
      "Bad data leads to bad AI predictions",
      "Data quality doesn't matter",
      "Only the amount of data matters"
    ],
    "correct_answer": 1,
    "explanation": "'Garbage in, garbage out' - if you train AI on bad, biased, or incorrect data, it will make bad predictions. Quality matters more than quantity!"
  },
  {
    "question": "What's the difference between Training and Running (Using) AI?",
    "options": [
      "Training is fast, using is slow",
      "Training is slow and expensive, using is fast and cheap",
      "They're the same thing",
      "Training happens every time you use AI"
    ],
    "correct_answer": 1,
    "explanation": "Training AI takes a long time and lots of computing power (sometimes months!), but once trained, using it is very fast (milliseconds)."
  }
]

```

--- FILE: content/courses/ai-basics-beginner/lessons/03-your-first-prompt/content.mdx ---
```
# Talking to AI - Your First Prompt 🗣️

Now the FUN part - let's actually USE AI!

## What is a Prompt?

A **prompt** is how you talk to AI. It's your question or instruction.

Think of AI like a super-smart assistant:
- 👎 Bad prompt = Confused assistant = Bad answer
- 👍 Good prompt = Clear instructions = Great answer!

## The Anatomy of a Good Prompt

![Bad vs Good Prompt](./images/bad-vs-good-prompt.png)


### 🎯 Be Specific!

**Bad:** "Write about dogs"
- Too vague! What about dogs?

**Good:** "Write a 100-word description of Golden Retrievers for a pet adoption website"
- Clear goal + specific details = better result!

### 🎭 Give Context!

**Bad:** "Explain quantum physics"

**Good:** "I'm a 10-year-old. Explain quantum physics like I'm learning about it for the first time"
- AI knows how simple to make it!

### 📝 Specify Format!

**Bad:** "Tell me about healthy eating"

**Good:** "Create a bullet-point list of 5 healthy breakfast ideas"
- You get exactly what you need!

## The Secret Formula

Here's a simple formula for great prompts:

![Prompt Formula](./images/prompt-formula.png)


```
[Role] + [Task] + [Context] + [Format]
```

### Examples:

**Example 1:**
```
You are a fitness trainer. Create a 7-day workout plan 
for a beginner who wants to build strength. Format it 
as a table with: Day, Exercise, Sets, Reps.
```

**Example 2:**
```
You are a kindergarten teacher. Explain how rain works 
to a 5-year-old using simple words and a fun metaphor.
```

## Common Prompt Patterns

### 🎨 The Creative Pattern
"Write a [type] about [topic] in the style of [style]"

**Example:** "Write a funny poem about programming in the style of Dr. Seuss"

### 🔧 The Problem-Solver Pattern
"I have [problem]. Suggest [number] solutions that [criteria]"

**Example:** "I have trouble waking up early. Suggest 5 solutions that don't require buying anything"

### 📚 The Teacher Pattern
"Explain [concept] to me like I'm [level]. Use [method]"

**Example:** "Explain blockchain to me like I'm 12. Use a real-world analogy"

### ✍️ The Writer Pattern
"Create a [format] for [purpose] that [requirements]"

**Example:** "Create an email for asking my boss for a raise that sounds professional but friendly"

## Pro Tips! 🌟

### Tip 1: Ask for Improvements
If the first answer isn't perfect:
- "Make it simpler"
- "Make it longer"
- "Add more examples"
- "Use bullet points instead"

### Tip 2: Give Examples
Show AI what you want:
```
Write product descriptions like these:
Example 1: "Cozy cotton blanket - perfect for..."
Example 2: "Soft premium leather wallet - made from..."

Now write one for: Running shoes
```

### Tip 3: Chain Your Prompts
Build on previous answers:
1. "List 10 business ideas for pet lovers"
2. "Take idea #3 and create a business plan"
3. "What would be the first 3 steps to start this?"

### Tip 4: Set Constraints
- "In under 50 words..."
- "Without using jargon..."
- "For someone with no experience..."

## Let's Practice! 🎯

Try these prompts yourself (on ChatGPT, Claude, or Gemini):

### Beginner Prompts:
```
1. "Explain coffee to someone who has never had it"

2. "Create 3 healthy lunch ideas that take less than 10 minutes to make"

3. "Write a motivational message for someone starting their first day at a new job"
```

### Intermediate Prompts:
```
4. "You are a travel expert. Suggest a 3-day itinerary for Paris 
    on a budget of $500. Format as: Day, Morning, Afternoon, Evening"

5. "I'm learning to code. Explain what a 'variable' is using a 
    real-world analogy that doesn't involve computers"
```

### Advanced Prompts:
```
6. "You are a career counselor. I'm a teacher who wants to transition 
    into tech. Analyze my skills and suggest 3 career paths with: 
    required training, salary range, and job outlook"
```

## What AI Can (and Can't) Do

### ✅ AI is GREAT at:
- Writing and editing
- Explaining concepts
- Brainstorming ideas
- Translating languages
- Summarizing long texts
- Creating outlines/plans
- Answering questions
- Code help (even for beginners!)

### ❌ AI is NOT great at:
- Real-time information (it has a knowledge cutoff)
- Math calculations (unless it has a calculator tool)
- Personal opinions (it doesn't have feelings!)
- Knowing about YOU (unless you tell it)

## Your First Real-World Task! 🌍

Pick ONE of these and try it right now:

**Option A - Personal:**
Write a prompt to help you plan this week's meals

**Option B - Work:**
Create a prompt to help with an email you need to write

**Option C - Learning:**
Ask AI to explain something you've always wondered about

**Copy the prompt you used - we'll discuss them!**

---

## 💡 Key Takeaways

1. **Be specific** - vague in, vague out!
2. **Give context** - help AI understand your situation
3. **Use the formula**: Role + Task + Context + Format
4. **Iterate** - refine your prompt if needed
5. **Practice makes perfect** - the more you prompt, the better you get!

Ready to see AI in your daily life? Next lesson! 🚀

```

--- FILE: content/courses/ai-basics-beginner/lessons/03-your-first-prompt/meta.json ---
```
{
  "title": "Talking to AI - Your First Prompt",
  "description": "Learn the art of 'prompting' - how to ask AI for exactly what you want. Start using ChatGPT like a pro!",
  "video_url": "https://www.youtube.com/embed/jC4v5AS4RIM",
  "order": 3
}

```

--- FILE: content/courses/ai-basics-beginner/lessons/03-your-first-prompt/quiz.json ---
```
[
  {
    "question": "What is a 'prompt' in AI?",
    "options": [
      "A type of AI model",
      "Your question or instruction to AI",
      "An error message",
      "A programming language"
    ],
    "correct_answer": 1,
    "explanation": "A prompt is how you communicate with AI - it's your question, instruction, or request that tells the AI what you want it to do."
  },
  {
    "question": "According to the lesson, what makes a good prompt?",
    "options": [
      "Being as vague as possible",
      "Using technical jargon",
      "Being specific, giving context, and specifying format",
      "Making it as short as possible"
    ],
    "correct_answer": 2,
    "explanation": "Good prompts are specific (what you want), give context (who you are, what situation), and specify format (bullet points, table, etc.)."
  },
  {
    "question": "What is the 'Secret Formula' for effective prompts?",
    "options": [
      "Question + Answer + Format",
      "Role + Task + Context + Format",
      "Input + Output + Examples",
      "Subject + Verb + Object"
    ],
    "correct_answer": 1,
    "explanation": "The formula is: [Role] + [Task] + [Context] + [Format]. For example: 'You are a teacher (role). Explain quantum physics (task) to a 10-year-old (context) using a simple analogy (format).'"
  },
  {
    "question": "If AI's first answer isn't perfect, what should you do?",
    "options": [
      "Give up and start over",
      "Use a different AI tool",
      "Ask it to improve, simplify, or adjust the answer",
      "Accept it as-is"
    ],
    "correct_answer": 2,
    "explanation": "You can iterate! Ask AI to 'make it simpler', 'add more examples', 'make it longer', etc. Prompting is a conversation, not one-and-done."
  },
  {
    "question": "What can AI help you with?",
    "options": [
      "Only writing essays",
      "Only answering questions",
      "Writing, brainstorming, learning, translating, summarizing, and more",
      "Only coding"
    ],
    "correct_answer": 2,
    "explanation": "AI is incredibly versatile! It can help with writing, editing, brainstorming ideas, explaining concepts, translating, summarizing text, coding, and much more."
  }
]

```

--- FILE: content/courses/ai-basics-beginner/lessons/04-ai-in-daily-life/content.mdx ---
```
# AI in Your Daily Life 🌍

AI isn't science fiction - it's in your pocket, your car, and your home RIGHT NOW!

![AI in Daily Life Timeline](./images/ai-daily-timeline.png)


## Morning ☀️

### 7:00 AM - Wake Up
**Your Phone Alarm** 
- Learns when you actually get up (vs when alarm rings)
- Suggests better sleep schedules
- *AI: Pattern recognition*

**Weather App**
- Predicts rain using AI models
- Learns local weather patterns
- *AI: Predictive analytics*

### 7:30 AM - Getting Ready
**Smart Mirror/Skincare Apps**
- Analyzes your skin condition
- Recommends products
- *AI: Image recognition + recommendations*

**Email**
- Spam filter catches junk mail
- Smart compose suggests replies
- *AI: Natural language processing*

## Commute 🚗

### 8:00 AM - On The Road
**Google Maps / Waze**
- Predicts traffic
- Suggests fastest route
- Learns your common destinations
- *AI: Route optimization + predictions*

**Self-Driving Features** (if you have them)
- Lane assist
- Automatic braking
- Parking assist
- *AI: Computer vision + decision making*

**Music Apps (Spotify/Apple Music)**
- Creates your Daily Mix
- Discovers new songs you'll like
- *AI: Recommendation systems*

## Work/School 💼

### 9:00 AM - Productivity
**Email Smart Features**
- Priority inbox
- Auto-categorization
- Meeting schedules from emails
- *AI: Text understanding*

**Writing Tools**
- Grammarly fixes your grammar
- Autocomplete in Google Docs
- *AI: Language models*

**Search**
- Google understands your questions (not just keywords!)
- Autocomplete predictions
- *AI: Natural language understanding*

### 12:00 PM - Lunch
**Food Apps**
- DoorDash/Uber Eats delivery time estimates
- Restaurant recommendations
- *AI: Logistics optimization*

## Afternoon 🌤️

### 1:00 PM - Shopping
**Online Shopping**
- Amazon product recommendations
- "You might also like..."
- Size recommendations
- *AI: Collaborative filtering*

**Virtual Try-On**
- AR makeup apps
- Furniture in your room (IKEA app)
- *AI: Computer vision + AR*

### 3:00 PM - Social Media
**Instagram/TikTok**
- Your personalized feed
- Face filters
- Content recommendations
- *AI: Content ranking + computer vision*

**Facebook/LinkedIn**
- Friend suggestions
- Job recommendations (LinkedIn)
- *AI: Graph neural networks*

## Evening 🌙

### 6:00 PM - Home
**Smart Home**
- Alexa/Google Home understanding your commands
- Nest thermostats learning your temperature preferences
- Smart lights adjusting based on time
- *AI: Voice recognition + behavior learning*

### 7:00 PM - Entertainment
**Netflix/YouTube**
- "Because you watched..."
- Autoplay next episode
- Thumbnail personalization (different people see different thumbnails!)
- *AI: Deep learning recommendations*

**Gaming**
- NPC behavior (non-player characters)
- Difficulty adjustment
- *AI: Reinforcement learning*

### 10:00 PM - Before Bed
**Health Apps**
- Sleep tracking
- Fitness tracking (steps, heart rate)
- Health predictions
- *AI: Biometric analysis*

**Reading Apps**
- Kindle recommendations
- News personalization (Flipboard, Apple News)
- *AI: Preference learning*

## Surprising AI Uses You Might Not Know! 🤯

### 1. **Banking & Finance**
- Fraud detection (catches suspicious transactions)
- Credit score calculations
- Investment recommendations

### 2. **Healthcare**
- X-ray analysis
- Disease prediction
- Drug discovery
- Appointment scheduling

### 3. **Customer Service**
- Chatbots (90% of company websites)
- Automated phone menus that understand speech
- Ticket routing

### 4. **Agriculture**
- Crop disease detection
- Yield prediction
- Optimal watering schedules

### 5. **Environment**
- Wildlife tracking
- Climate modeling
- Energy optimization

## How to Use AI MORE in Your Life

### 🎯 Productivity
**ChatGPT / Claude / Gemini:**
- Draft emails
- Brainstorm ideas
- Learn new topics
- Get recipe ideas
- Plan your week

**Notion AI / Obsidian:**
- Organize notes
- Summarize meetings
- Create templates

### 🎨 Creativity
**Midjourney / DALL-E:**
- Create images for presentations
- Design logos
- Visualize ideas

**RunwayML:**
- Edit videos
- Background removal
- Style transfer

### 📚 Learning
**Khan Academy / Duolingo:**
- Personalized learning paths
- Adaptive difficulty

**ChatGPT:**
- Explain complex topics
- Practice conversations (language learning)
- Create study guides

### 🏋️ Personal
**MyFitnessPal:**
- Track calories with AI photo recognition

**Headspace / Calm:**
- Personalized meditation recommendations

## The Big Picture 🌐

**AI is already your assistant, you just didn't know it!**

Every day, AI:
- ✅ Saves you time (traffic predictions, smart replies)
- ✅ Protects you (fraud detection, spam filters)
- ✅ Entertains you (Netflix, Spotify)
- ✅ Helps you learn (adaptive learning)
- ✅ Keeps you healthy (fitness trackers)

**And this is just the beginning!**

---

## 🎯 Your Mission!

**AI Audit**: Track your day and count how many times you use AI!

Create a list:
```
Time | Activity | How AI helped
-----|----------|---------------
7:00 | Woke up  | Smart alarm learned my wake time
8:00 | Commute  | Google Maps predicted traffic
...
```

**Goal:** Find at least 10 uses!

---

## 💡 Key Takeaways

1. **AI is everywhere** - you use it dozens of times per day
2. **Most AI is invisible** - working behind the scenes
3. **It's getting better** - learns from your behavior
4. **You can use MORE** - ChatGPT, image tools, productivity apps
5. **This is just the start** - AI will be in even more places soon

Final lesson next: Let's test your AI knowledge! 🎓

```

--- FILE: content/courses/ai-basics-beginner/lessons/04-ai-in-daily-life/meta.json ---
```
{
  "title": "AI in Your Daily Life",
  "description": "Discover how AI is already helping you every day - and how to use it even more! Real examples and practical tips.",
  "video_url": "https://www.youtube.com/embed/Ok-mkIbCLj8",
  "order": 4
}

```

--- FILE: content/courses/ai-basics-beginner/lessons/04-ai-in-daily-life/quiz.json ---
```
[
  {
    "question": "How does Google Maps predict traffic?",
    "options": [
      "Random guessing",
      "AI analyzes patterns from millions of users' location data",
      "Traffic cameras only",
      "Government reports"
    ],
    "correct_answer": 1,
    "explanation": "Google Maps uses AI to analyze location data from millions of users in real-time, learning traffic patterns to predict delays and suggest faster routes."
  },
  {
    "question": "What AI technology powers email spam filters?",
    "options": [
      "Random selection",
      "Simple keyword matching",
      "Machine Learning that learns from examples of spam vs real emails",
      "Human reviewers checking every email"
    ],
    "correct_answer": 2,
    "explanation": "Spam filters use Machine Learning, trained on millions of examples of spam and legitimate emails, to recognize patterns and filter out junk automatically."
  },
  {
    "question": "According to the lesson, approximately how many times a day do you use AI?",
    "options": [
      "Once or twice",
      "5-10 times",
      "Dozens of times",
      "You don't use AI daily"
    ],
    "correct_answer": 2,
    "explanation": "From your morning alarm to bedtime apps, you use AI dozens of times daily - it's in your email, social media, navigation, music, shopping, banking, and more!"
  },
  {
    "question": "Which industry does NOT currently use AI significantly?",
    "options": [
      "Healthcare (disease diagnosis)",
      "Banking (fraud detection)",
      "Agriculture (crop monitoring)",
      "None - all these industries use AI extensively"
    ],
    "correct_answer": 3,
    "explanation": "AI is everywhere! Healthcare uses it for diagnosis, banking for fraud detection, agriculture for crop monitoring, and virtually every industry has AI applications."
  },
  {
    "question": "What determines which videos YouTube recommends to you?",
    "options": [
      "Random selection",
      "AI analyzing your watch history and behavior patterns",
      "Only what's popular globally",
      "The upload date of videos"
    ],
    "correct_answer": 1,
    "explanation": "YouTube uses AI to analyze what you watch, how long you watch, what you search for, and patterns of similar users to personalize recommendations just for you."
  }
]

```

--- FILE: content/courses/ai-basics-beginner/lessons/05-course-summary/content.mdx ---
```
# 🎓 Congratulations! You Did It!

You've completed **AI Basics for Absolute Beginners**!

Let's recap your journey and see where to go next.

---

## What You Learned 🧠

### Lesson 1: What is AI?
✅ AI is computers doing things that need intelligence  
✅ You use AI every day (voice assistants, photo recognition)  
✅ AI is different from regular programsagents  
✅ Understanding AI is like understanding the internet in the 90s

### Lesson 2: How Does AI Learn?
✅ AI learns from examples (like humans!)  
✅ Three types: Supervised, Unsupervised, Reinforcement  
✅ Data is the key - more data = smarter AI  
✅ Training is slow, using is fast

### Lesson 3: Talking to AI
✅ Prompts are how you communicate with AI  
✅ Good prompts = specific + context + format  
✅ You can iterate and improve answers  
✅ AI is great for writing, learning, and brainstorming

### Lesson 4: AI in Daily Life
✅ AI is in your phone, car, and home  
✅ From morning alarms to bedtime apps  
✅ Invisible AI: spam filters, traffic predictions, recommendations  
✅ You can use AI tools to boost productivity and creativity

---

## Your AI Superpowers 🦸

**You can now:**

1. **Recognize AI** when you see it
2. **Understand** how it works (at a basic level)
3. **Use AI tools** like ChatGPT effectively
4. **Spot AI** in your daily life
5. **Explain AI** to friends and family!

---

## Where to Go Next? 🚀

### 🎯 Keep Practicing
**Daily Challenge:**
- Use ChatGPT once a day for 30 days
- Try different prompts each time
- Document what works best

**Examples:**
- Day 1: Ask for meal planning help
- Day 2: Get help writing an email
- Day 3: Learn something new
- Day 4: Brainstorm ideas
- ...and so on!

### 📚 Level Up Your Skills

**Beginner → Intermediate:**
Move to our "**Practical Prompt Engineering**" course:
- Advanced prompting techniques
- Chain-of-thought reasoning
- Multi-step workflows
- Custom GPTs

**Explore AI Tools:**
- **Writing:** ChatGPT, Claude, Gemini
- **Images:** Midjourney, DALL-E, Stable Diffusion
- **Video:** RunwayML, Pika
- **Code:** GitHub Copilot, Cursor
- **Productivity:** Notion AI, Mem.ai

### 🌐 Join the Community

**Stay Updated:**
- r/ArtificialIntelligence (Reddit)
- AI newsletters (The Rundown, TLDR AI)
- YouTube channels (Two Minute Papers, AI Explained)

**Try Projects:**
- Create images with AI
- Build a simple chatbot
- Automate a boring task
- Write a short story with AI help

---

## The Bigger Picture 🌍

**You're not just learning about AI - you're preparing for the future!**

AI is transforming:
- 💼 **Work** - new jobs, new skills needed
- 🎓 **Education** - personalized learning
- 🏥 **Healthcare** - better diagnosis
- 🎨 **Creativity** - new art forms
- 🌱 **Environment** - climate solutions

**By understanding AI, you're:**
- ✅ Future-proofing your career
- ✅ Staying ahead of technology
- ✅ Able to use powerful tools
- ✅ Ready for what's next

---

## Final Thoughts 💭

**Remember:**

1. **AI is a tool** - like a hammer or calculator. It's what YOU do with it that matters.

2. **Everyone started where you are** - even AI experts were beginners once!

3. **Keep learning** - AI changes FAST. Stay curious!

4. **Use AI ethically** - be honest about when you use AI, verify important information, and use it to amplify (not replace) your creativity.

5. **Have fun!** - AI should make life easier and more interesting!

---

## 🎯 Your Final Challenge

**Create your AI learning plan:**

```
What I want to learn next:
_________________________________

Tools I want to try:
1. _________________________________
2. _________________________________
3. _________________________________

First project I'll do with AI:
_________________________________

How I'll use AI this week:
Monday: _________________________________
Tuesday: _________________________________
Wednesday: _________________________________
```

---

## 🏆 You're Now AI-Literate!

**Share your achievement!**
- Tell a friend what you learned
- Try AI in a new way today
- Review this course if it helped you!

**Next course recommended:**
👉 **"Practical Prompt Engineering"** (Let's Rock difficulty)

---

## Thank You! 🙏

You've taken the first step into a world of endless possibilities.

**The future is AI-powered, and now you're ready for it!**

*Keep learning, keep experimenting, keep growing.* 🌟

---

*Want more? Check out the other courses based on your interests:*

- **Want to get better at prompts?** → Practical Prompt Engineering
- **Want advanced techniques?** → Advanced AI Techniques  
- **Want to build AI systems?** → AI Engineering Deep Dive

**Your AI journey has just begun! 🚀**

```

--- FILE: content/courses/ai-basics-beginner/lessons/05-course-summary/meta.json ---
```
{
  "title": "Course Summary & Next Steps",
  "description": "Review everything you've learned and discover where to go next on your AI journey!",
  "video_url": null,
  "order": 5
}

```

--- FILE: content/courses/ai-basics-beginner/lessons/05-course-summary/quiz.json ---
```
[
  {
    "question": "What is the MOST important thing you learned from this course?",
    "options": [
      "AI is scary and complicated",
      "AI is a tool that anyone can learn to use effectively",
      "Only programmers can use AI",
      "AI will replace all jobs"
    ],
    "correct_answer": 1,
    "explanation": "The key takeaway: AI is a powerful tool that ANYONE can learn to use! You don't need to be a programmer - you just need to understand the basics and practice.human"
  },
  {
    "question": "What skill is most important for using AI effectively?",
    "options": [
      "Programming ability",
      "Mathematics knowledge",
      "Writing good prompts (prompt engineering)",
      "Expensive equipment"
    ],
    "correct_answer": 2,
    "explanation": "Prompt engineering - knowing how to ask AI for what you want - is the #1 skill. Anyone can learn it, and it doesn't require technical knowledge!"
  },
  {
    "question": "After this course, what should be your next step?",
    "options": [
      "Stop learning about AI",
      "Practice using AI tools daily for 30 days",
      "Wait until you forget everything",
      "Only read more theory"
    ],
    "correct_answer": 1,
    "explanation": "Practice makes perfect! The lesson recommends using AI daily for 30 days - try different prompts, explore tools, and build your skills through hands-on experience."
  },
  {
    "question": "Which statement about AI is TRUE?",
    "options": [
      "AI is perfect and never makes mistakes",
      "AI will replace human creativity",
      "AI is a tool to amplify human abilities, not replace them",
      "AI works without any human input"
    ],
    "correct_answer": 2,
    "explanation": "AI is best used to AMPLIFY human abilities - to make you more productive, creative, and effective. It's a tool to help you, not replace you!"
  },
  {
    "question": "What makes someone 'AI-literate' after this course?",
    "options": [
      "Knowing how to program AI",
      "Understanding what AI is, how it learns, and how to use it ethically",
      "Having expensive AI tools",
      "Working in tech"
    ],
    "correct_answer": 1,
    "explanation": "AI literacy means understanding the basics (what it is, how it works), being able to use AI tools effectively, and using them responsibly and ethically."
  }
]

```

--- FILE: content/courses/ai-engineering-deep-dive/meta.json ---
```
{
  "title": "AI Engineering Deep Dive",
  "description": "Production AI systems: RAG, fine-tuning, agents, and enterprise best practices.",
  "image_url": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
  "difficulty_level": "DAMN_IM_GOOD"
}

```

--- FILE: content/courses/ai-engineering-deep-dive/lessons/01-rag/content.mdx ---
```
# RAG

Build AI systems that know YOUR data!

```

--- FILE: content/courses/ai-engineering-deep-dive/lessons/01-rag/meta.json ---
```
{
  "title": "Retrieval-Augmented Generation (RAG)",
  "description": "Build AI systems that access external knowledge.",
  "order": 1
}

```

--- FILE: content/courses/ai-engineering-deep-dive/lessons/02-fine-tuning/content.mdx ---
```
# Fine-Tuning

Make AI speak YOUR language!

```

--- FILE: content/courses/ai-engineering-deep-dive/lessons/02-fine-tuning/meta.json ---
```
{
  "title": "Fine-Tuning Fundamentals",
  "description": "Customize LLMs for your specific use case.",
  "order": 2
}

```

--- FILE: content/courses/practical-prompt-engineering/meta.json ---
```
{
  "title": "Practical Prompt Engineering",
  "description": "Master the art of prompt engineering. Learn patterns, techniques, and best practices.",
  "image_url": "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop",
  "difficulty_level": "LETS_ROCK"
}

```

--- FILE: content/courses/practical-prompt-engineering/lessons/01-patterns/content.mdx ---
```
# Prompt Patterns

Templates save time and improve consistency.

```

--- FILE: content/courses/practical-prompt-engineering/lessons/01-patterns/meta.json ---
```
{
  "title": "Prompt Patterns and Templates",
  "description": "Learn reusable prompt structures.",
  "order": 1
}

```

--- FILE: content/courses/practical-prompt-engineering/lessons/02-context/content.mdx ---
```
# Context Management

Context is EVERYTHING in prompt engineering.

```

--- FILE: content/courses/practical-prompt-engineering/lessons/02-context/meta.json ---
```
{
  "title": "Context Management",
  "description": "How to give AI the right context.",
  "order": 2
}

```

