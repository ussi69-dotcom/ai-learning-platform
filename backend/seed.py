import logging
from app.database import SessionLocal, engine, Base
from app.models import User, Course, Lesson, DifficultyLevel
from app.auth import get_password_hash

# Nastavení logování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def reset_db(db):
    """Vyčistí data v tabulkách."""
    logger.info("🗑️  Mažu stará data...")
    try:
        db.query(Lesson).delete()
        db.query(Course).delete()
        db.query(User).delete()
        db.commit()
    except Exception as e:
        logger.warning(f"Mazání přeskočeno: {e}")
        db.rollback()

def seed_data():
    logger.info("🏗️  Vytvářím strukturu databáze...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    reset_db(db)
    logger.info("🌱 Sázím nová data...")

    # Admin
    admin = User(
        email="admin@ai-platform.com",
        hashed_password=get_password_hash("admin123"),
        is_active=True,
        difficulty=DifficultyLevel.DAMN_IM_GOOD
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)

    # 🍰 PIECE OF CAKE - COMPREHENSIVE AI BASICS
    logger.info("🍰 Creating comprehensive PIECE_OF_CAKE course...")
    easy_course = Course(
        title="AI Basics for Absolute Beginners",
        description="Start your AI journey from zero. Learn what AI is, how it works, and how to use it in your daily life. Perfect for complete beginners!",
        image_url="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        owner_id=admin.id,
        difficulty_level=DifficultyLevel.PIECE_OF_CAKE
    )
    db.add(easy_course)
    db.commit()
    db.refresh(easy_course)

    easy_lessons = [
        # LESSON 1: What is AI?
        Lesson(
            title="What is Artificial Intelligence?",
            description="Understanding AI in simple terms - no tech jargon! Learn what AI really is and see real examples.",
            content=r"""# What is Artificial Intelligence? 🤖

Welcome! You're about to learn one of the most important technologies of our time - and it's easier than you think!

## What is AI?

**Artificial Intelligence (AI)** is when computers can do things that usually need human intelligence.

Think of it like this:
- A **calculator** can add numbers → That's just following rules
- **AI** can look at a photo and tell you what's in it → That's intelligence!

## Real Examples You Use Daily

You already use AI every day! Here are some examples:

### 🗣️ Voice Assistants
- **Siri** (Apple)
- **Alexa** (Amazon)
- **Google Assistant**

*What makes it AI?* They understand your voice, know what you mean, and can have a conversation!

### 📸 Photo Recognition
- Your phone organizing photos by people's faces
- Instagram filters that know where your eyes and mouth are
- Google Photos searching for "dog" or "beach"

*What makes it AI?* The computer "sees" and recognizes objects, just like you do!

### 🎬 Recommendations
- Netflix suggesting shows you'll love
- Spotify creating playlists for you
- YouTube knowing what videos you want to watch next

*What makes it AI?* It learns your preferences and predicts what you'll like!

## AI vs Regular Programs

Let's make this super clear:

| Regular Program | Artificial Intelligence |
|----------------|------------------------|
| Follows exact rules you program | Learns patterns from data |
| Always does the same thing | Gets better over time |
| Example: Calculator | Example: ChatGPT |

## Quick History Lesson 📚

- **1950s**: Alan Turing asks "Can machines think?"
- **1997**: IBM's Deep Blue beats world chess champion
- **2011**: IBM Watson wins Jeopardy!
- **2016**: AlphaGo beats world Go champion
- **2022**: ChatGPT launches - AI goes mainstream!
- **Now**: AI is everywhere!

## Why Should You Care?

AI is:
- ✅ Making our lives easier (like autocorrect!)
- ✅ Solving big problems (like finding diseases in X-rays)
- ✅ Creating new jobs and opportunities
- ✅ Changing how we work, learn, and create

**Bottom line**: Understanding AI is like understanding the internet in 1995 - it's going to be EVERYWHERE!

---

## 🎯 Your First Challenge!

Look around your home or check your phone. Can you find **3 examples of AI** that you use?

Think about:
- Apps that learn your habits
- Devices that understand your voice
- Features that predict what you want

Write them down - we'll talk about them in the next lesson!

---

## 💡 Key Takeaways

1. **AI = Computers doing things that need intelligence**
2. **You already use AI every day** (even if you didn't know it!)
3. **AI learns from data** (unlike regular programs that just follow rules)
4. **This is just the beginning!** AI is changing the world right now.

Ready for the next lesson? Let's learn HOW AI actually learns! 🚀
""",
            video_url="https://www.youtube.com/embed/ad79nYk2keg",  # "AI Explained" by CGP Grey
            order=1,
            course_id=easy_course.id
        ),

        # LESSON 2: How Does AI Learn?
        Lesson(
            title="How Does AI Learn?",
            description="Discover the secret behind AI - it's all about learning from examples! See how machine learning works in simple terms.",
            content=r"""# How Does AI Learn? 🧠

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
""",
            video_url="https://www.youtube.com/embed/ukzFI9rgwfU",  # "Machine Learning Explained"
            order=2,
            course_id=easy_course.id
        ),

        # LESSON 3: Your First Prompt
        Lesson(
            title="Talking to AI - Your First Prompt",
            description="Learn the art of 'prompting' - how to ask AI for exactly what you want. Start using ChatGPT like a pro!",
            content=r"""# Talking to AI - Your First Prompt 🗣️

Now the FUN part - let's actually USE AI!

## What is a Prompt?

A **prompt** is how you talk to AI. It's your question or instruction.

Think of AI like a super-smart assistant:
- 👎 Bad prompt = Confused assistant = Bad answer
- 👍 Good prompt = Clear instructions = Great answer!

## The Anatomy of a Good Prompt

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
""",
            video_url="https://www.youtube.com/embed/jC4v5AS4RIM",  # "Prompt Engineering Guide"
            order=3,
            course_id=easy_course.id
        ),

        # LESSON 4: AI in Everyday Life
        Lesson(
            title="AI in Your Daily Life",
            description="Discover how AI is already helping you every day - and how to use it even more! Real examples and practical tips.",
            content=r"""# AI in Your Daily Life 🌍

AI isn't science fiction - it's in your pocket, your car, and your home RIGHT NOW!

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
""",
            video_url="https://www.youtube.com/embed/Ok-mkIbCLj8",  # "AI in Daily Life"
            order=4,
            course_id=easy_course.id
        ),

        # LESSON 5: Final Challenge
        Lesson(
            title="Course Summary & Next Steps",
            description="Review everything you've learned and discover where to go next on your AI journey!",
            content=r"""# 🎓 Congratulations! You Did It!

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
""",
            order=5,
            course_id=easy_course.id
        ),
    ]
    db.add_all(easy_lessons)
    db.commit()

    # 🎸 LETS_ROCK
    logger.info("🎸 Creating LETS_ROCK course...")
    normal_course = Course(
        title="Practical Prompt Engineering",
        description="Master the art of prompt engineering. Learn patterns, techniques, and best practices.",
        image_url="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop",
        owner_id=admin.id,
        difficulty_level=DifficultyLevel.LETS_ROCK
    )
    db.add(normal_course)
    db.commit()
    db.refresh(normal_course)

    normal_lessons = [
        Lesson(
            title="Prompt Patterns and Templates",
            description="Learn reusable prompt structures.",
            content="# Prompt Patterns\n\nTemplates save time and improve consistency.",
            order=1,
            course_id=normal_course.id
        ),
        Lesson(
            title="Context Management",
            description="How to give AI the right context.",
            content="# Context Management\n\nContext is EVERYTHING in prompt engineering.",
            order=2,
            course_id=normal_course.id
        )
    ]
    db.add_all(normal_lessons)
    db.commit()

    # 💪 COME_GET_SOME
    logger.info("💪 Creating COME_GET_SOME course...")
    hard_course = Course(
        title="Advanced AI Techniques",
        description="Master advanced prompting: chain-of-thought, few-shot learning, and complex task decomposition.",
        image_url="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
        owner_id=admin.id,
        difficulty_level=DifficultyLevel.COME_GET_SOME
    )
    db.add(hard_course)
    db.commit()
    db.refresh(hard_course)

    hard_lessons = [
        Lesson(
            title="Chain-of-Thought Prompting",
            description="Make AI show its reasoning step-by-step.",
            content="# Chain-of-Thought\n\nMake AI show its work!",
            order=1,
            course_id=hard_course.id
        ),
        Lesson(
            title="Few-Shot Learning",
            description="Teach AI by example.",
            content="# Few-Shot Learning\n\nShow AI examples of what you want.",
            order=2,
            course_id=hard_course.id
        )
    ]
    db.add_all(hard_lessons)
    db.commit()

    # 🔥 DAMN_IM_GOOD
    logger.info("🔥 Creating DAMN_IM_GOOD course...")
    expert_course = Course(
        title="AI Engineering Deep Dive",
        description="Production AI systems: RAG, fine-tuning, agents, and enterprise best practices.",
        image_url="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
        owner_id=admin.id,
        difficulty_level=DifficultyLevel.DAMN_IM_GOOD
    )
    db.add(expert_course)
    db.commit()
    db.refresh(expert_course)

    expert_lessons = [
        Lesson(
            title="Retrieval-Augmented Generation (RAG)",
            description="Build AI systems that access external knowledge.",
            content="# RAG\n\nBuild AI systems that know YOUR data!",
            order=1,
            course_id=expert_course.id
        ),
        Lesson(
            title="Fine-Tuning Fundamentals",
            description="Customize LLMs for your specific use case.",
            content="# Fine-Tuning\n\nMake AI speak YOUR language!",
            order=2,
            course_id=expert_course.id
        )
    ]
    db.add_all(expert_lessons)
    db.commit()

    logger.info("✅ Hotovo! DB naplněna se všemi difficulty levely.")
    db.close()

if __name__ == "__main__":
    seed_data()