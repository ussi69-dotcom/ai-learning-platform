"use client";

import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, XCircle, TrendingUp, Zap, ChevronDown, ChevronUp, Terminal, User, Bot, AlertTriangle, Clock, ShieldAlert, GitMerge, FileCheck, Shield, Sparkles, ChevronRight, Check, Play, Pause } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ABTestShowcaseProps {
  locale: string;
}

export default function ABTestShowcase({ locale }: ABTestShowcaseProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [visibleMessagesInPhase, setVisibleMessagesInPhase] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isResuming, setIsResuming] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false); // New state for user interaction
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScrollRef = useRef(false); // To distinguish auto-scroll from user scroll

  // Cleanup helper
  const cancelScrollAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Handle User Scroll Interaction
  const handleScroll = () => {
    // If the scroll was triggered by our code, ignore it
    if (isProgrammaticScrollRef.current) return;

    // If it's a user scroll, pause the "movie"
    if (isAutoPlaying) {
      // Cancel any active scroll animation immediately
      cancelScrollAnimation();
      
      if (!isUserPaused) {
        setIsUserPaused(true);
      }

      // Clear existing resume timer
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }

      // Set new resume timer (2 seconds of inactivity)
      interactionTimeoutRef.current = setTimeout(() => {
        setIsUserPaused(false);
        interactionTimeoutRef.current = null;
      }, 2000);
    }
  };

  // Scroll behavior: show new messages from top, then gradually scroll down at reading speed
  useEffect(() => {
    if (!scrollRef.current || !isAutoPlaying || visibleMessagesInPhase === 0 || isUserPaused) return;

    const scrollToNewMessage = async () => {
      if (!scrollRef.current) return;
      
      // 1. Short pause at top (0.8s) - just enough to register the new message
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!scrollRef.current || !isAutoPlaying || isUserPaused) return;
      
      // 2. Calculate scroll duration based on message length (15 words per second)
      const currentPhaseData = phases[currentPhase];
      const currentMessage = currentPhaseData.messages[visibleMessagesInPhase - 1];
      
      if (currentMessage) {
        const wordCount = currentMessage.message.split(/\s+/).length;
        const scrollDuration = (wordCount / 15) * 1000; // 15 words per second
        
        // Scroll down smoothly based on content length
        const targetScroll = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        
        if (targetScroll > scrollRef.current.scrollTop) {
          const scrollContainer = scrollRef.current;
          // Ensure native smooth scrolling doesn't fight our JS animation
          scrollContainer.style.scrollBehavior = 'auto';
          
          const startScroll = scrollContainer.scrollTop;
          const distance = targetScroll - startScroll;
          const startTime = performance.now();
          
          // Mark start of programmatic scroll
          isProgrammaticScrollRef.current = true;

          const animateScroll = (currentTime: number) => {
            if (!scrollRef.current || isUserPaused) {
              isProgrammaticScrollRef.current = false;
              return;
            }
            
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / scrollDuration, 1);
            
            const easeProgress = progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            scrollRef.current.scrollTop = startScroll + (distance * easeProgress);
            
            if (progress < 1 && isAutoPlaying && !isUserPaused) {
              animationFrameRef.current = requestAnimationFrame(animateScroll);
            } else {
              isProgrammaticScrollRef.current = false; // Animation done
            }
          };
          
          animationFrameRef.current = requestAnimationFrame(animateScroll);
          
          // Wait for animation to finish logically before moving to pause step
          // Note: The user might interrupt this wait, which is handled by the `isUserPaused` check in the next useEffect run
          await new Promise(resolve => setTimeout(resolve, scrollDuration));
        }
      }
      
      // 3. Dynamic pause at bottom (simulating reading time)
      const isLastMessage = visibleMessagesInPhase === currentPhaseData.messages.length;
      let bottomPause = 3000;
      
      if (isLastMessage && currentMessage) {
        const wordCount = currentMessage.message.split(/\s+/).length;
        bottomPause = Math.min(7000 + (wordCount / 15) * 1000, 10000);
      } else if (currentMessage) {
        const wordCount = currentMessage.message.split(/\s+/).length;
        bottomPause = Math.min(3000 + (wordCount / 15) * 1000, 5000);
      }
      
      await new Promise(resolve => setTimeout(resolve, bottomPause));
    };

    scrollToNewMessage();
    
    return () => {
      cancelScrollAnimation();
      isProgrammaticScrollRef.current = false;
    };
  }, [visibleMessagesInPhase, isAutoPlaying, currentPhase, isUserPaused]); // Added isUserPaused dependency

  // Reset visible messages when phase changes
  useEffect(() => {
    setVisibleMessagesInPhase(0);
  }, [currentPhase]);

  // Progressive message reveal within phase + phase advancement
  useEffect(() => {
    if (!isExpanded || !isAutoPlaying || isUserPaused) return; // Pause logic here

    const currentPhaseData = phases[currentPhase];
    const totalMessagesInPhase = currentPhaseData.messages.length;

    if (visibleMessagesInPhase === 0) {
      // Start of phase: Show first message quickly (0.5s)
      const timer = setTimeout(() => {
        setVisibleMessagesInPhase(1);
      }, 500);
      return () => clearTimeout(timer);
    }
    else if (visibleMessagesInPhase < totalMessagesInPhase) {
      // Intermediate messages: Wait for current message to be read
      const currentMessage = currentPhaseData.messages[visibleMessagesInPhase - 1];
      const wordCount = currentMessage.message.split(/\s+/).length;
      const scrollTime = (wordCount / 15) * 1000;
      const pauseAtBottom = Math.min(3000 + (wordCount / 15) * 1000, 5000);
      const totalDelay = 800 + scrollTime + pauseAtBottom; // Top + Scroll + Bottom
      
      const timer = setTimeout(() => {
        setVisibleMessagesInPhase(prev => prev + 1);
      }, totalDelay);

      return () => clearTimeout(timer);
    } else {
      // End of phase
      const lastMessage = currentPhaseData.messages[totalMessagesInPhase - 1];
      const wordCount = lastMessage.message.split(/\s+/).length;
      const scrollTime = (wordCount / 15) * 1000;
      const bottomPause = Math.min(7000 + (wordCount / 15) * 1000, 10000);
      
      const totalDelay = 800 + scrollTime + bottomPause;

      if (currentPhase < phases.length - 1) {
        const timer = setTimeout(() => {
          setCurrentPhase(prev => prev + 1);
        }, totalDelay);

        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsAutoPlaying(false);
        }, totalDelay);

        return () => clearTimeout(timer);
      }
    }
  }, [isExpanded, isAutoPlaying, currentPhase, visibleMessagesInPhase, isUserPaused]); // Added isUserPaused dependency

  const handleResume = () => {
    setIsResuming(true);
    setIsUserPaused(false); // Clear user pause if manually resuming
    setTimeout(() => {
      setIsResuming(false);
      setIsAutoPlaying(true);
    }, 2000);
  };

  const handleManualChange = (newPhase: number) => {
    setIsAutoPlaying(false);
    setIsResuming(false);
    setIsUserPaused(false);
    setCurrentPhase(newPhase);
    setVisibleMessagesInPhase(phases[newPhase].messages.length); // Show all messages in manual mode
  };

  const handleManualNext = () => {
    setIsAutoPlaying(false);
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(prev => prev + 1);
      setVisibleMessagesInPhase(phases[currentPhase + 1].messages.length);
    }
  };

  const handleManualPrev = () => {
    setIsAutoPlaying(false);
    if (currentPhase > 0) {
      setCurrentPhase(prev => prev - 1);
      setVisibleMessagesInPhase(phases[currentPhase - 1].messages.length);
    }
  };

  // PHASES DEFINITION
  const phases = [
    {
      id: "briefing",
      title: locale === 'cs' ? "Fáze 1: Briefing" : "Phase 1: Briefing",
      desc: locale === 'cs' ? "Inicializace mise & Kontext" : "Mission Initialization & Context",
      messages: [
        {
          role: "user",
          name: "User (Architect)",
          avatar: <User className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "🔵 @BlueTeam 🔴 @RedTeam\n\n**Context:** Máme podezření na drift mezi dokumentací a realitou (chybějící .env, porty).\n\n**Task:** Proveďte 'Documentation Integrity Audit'.\n\n**Protocol:**\n1. **Red Team**: Simuluj 'Fresh Developer' experience. Žádné předchozí znalosti. Zkus nasadit appku podle README. Reportuj každý fail.\n2. **Blue Team**: Analyzuj report. Navrhni fixy.\n\n**Output:** Chci vidět seznam kritických chyb a návrh řešení. Go." 
            : "🔵 @BlueTeam 🔴 @RedTeam\n\n**Context:** Suspected drift between docs and reality (missing .env, ports).\n\n**Task:** Execute 'Documentation Integrity Audit'.\n\n**Protocol:**\n1. **Red Team**: Simulate 'Fresh Developer' experience. Zero prior knowledge. Try to deploy app per README. Report every fail.\n2. **Blue Team**: Analyze report. Propose fixes.\n\n**Output:** I want a list of critical errors and a solution proposal. Go.",
          color: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 font-mono text-xs"
        },
        {
          role: "blue",
          name: "Gemini 3 Pro (Blue Team)",
          avatar: <Bot className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "Excelentní otázka. Spouštím comprehensive documentation audit. 🔍\n\nZačínám 'Red Team' analýzou - budu simulovat fresh developer experience. Otevřu README.md a pokusím se nasadit platformu přesně podle instrukcí, bez jakýchkoliv předchozích znalostí. Zaznamenám každý bloker, každou nejasnost.\n\nČekej moment..." 
            : "Excellent question. Starting comprehensive documentation audit. 🔍\n\nBeginning 'Red Team' analysis - will simulate fresh developer experience. Opening README.md and trying to deploy the platform exactly per instructions, with zero prior knowledge. Recording every blocker, every confusion.\n\nHold on...",
          color: "bg-blue-500/10 border-blue-400/30 text-blue-700 dark:text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        }
      ]
    },
    {
      id: "analysis",
      title: locale === 'cs' ? "Fáze 2: Analýza" : "Phase 2: Analysis",
      desc: locale === 'cs' ? "Red Team Assault & Strategie" : "Red Team Assault & Strategy",
      messages: [
        {
          role: "red",
          name: "Claude 4.5 Sonnet (Red Team)",
          avatar: <ShieldAlert className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "🚨 RED TEAM CRITICAL REPORT\n\nProvedl jsem simulaci 'nový developer na novém stroji'. Našel jsem 9 závažných problémů:\n\n**CRITICAL (Must Fix Now):**\n1. .env file chybí v Quick Start - README říká 'docker compose up', ale .env neexistuje. INSTANT BLOCKER.\n2. Dead file references - DEPLOYMENT_STRATEGY.md (deleted), AGENT-STATE.md (neexistuje)\n3. Contradictory DB instructions - README (Nuclear Reset), MEMORY.md (Nuclear OR Alembic?), DEV_GUIDE (Alembic for prod)\n4. n8n běží na port 5678 - nikde není vysvětleno co to je, proč to běží\n5. .env.prod.example INCOMPLETE - chybí DATABASE_URL, REDIS_URL, CORS, admin user\n\n**MINOR (Should Fix):**\n6. Alembic workflow není linkován z README\n7. Port troubleshooting incomplete - chybí rebuild instrukce\n8. DATABASE_MIGRATIONS.md - žádné rollback instrukce\n9. PROJECT_CONTEXT.md - chybí Redis a n8n services\n\nPro nového vývojáře: Time to working platform = ∞ (zablokovaný na .env)." 
            : "🚨 RED TEAM CRITICAL REPORT\n\nSimulated 'new developer on fresh machine'. Found 9 critical issues:\n\n**CRITICAL (Must Fix Now):**\n1. .env file missing from Quick Start - README says 'docker compose up', but .env doesn't exist. INSTANT BLOCKER.\n2. Dead file references - DEPLOYMENT_STRATEGY.md (deleted), AGENT-STATE.md (doesn't exist)\n3. Contradictory DB instructions - README (Nuclear Reset), MEMORY.md (Nuclear OR Alembic?), DEV_GUIDE (Alembic for prod)\n4. n8n running on port 5678 - nowhere explained what it is, why it's running\n5. .env.prod.example INCOMPLETE - missing DATABASE_URL, REDIS_URL, CORS, admin user\n\n**MINOR (Should Fix):**\n6. Alembic workflow not linked from README\n7. Port troubleshooting incomplete - missing rebuild instructions\n8. DATABASE_MIGRATIONS.md - no rollback instructions\n9. PROJECT_CONTEXT.md - missing Redis and n8n services\n\nFor new developer: Time to working platform = ∞ (blocked on .env).",
          color: "bg-red-900/10 dark:bg-red-900/40 border-red-500/30 text-red-700 dark:text-red-200"
        },
        {
          role: "user",
          name: "User (Architect)",
          avatar: <User className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "Díky za report. Tohle je nepřijatelné pro onboarding.\n\n**Action Plan:** Spustíme **A/B Test** pro validaci fixů.\n\n**Scénář:**\n1. Vytvoř 2 izolované instance: `/tmp/baseline` a `/tmp/improved`\n2. **Baseline**: Clone main branch. Změř čas do failu.\n3. **Improved**: Aplikuj fixy do nové git branch `docs/fix-onboarding`. Přidej `/health` endpoint pro monitoring.\n4. **Sync**: Pushni změny, udělej fresh clone, změř čas do success.\n\nChci vidět tvrdá data. Execute." 
            : "Thanks for the report. Unacceptable for onboarding.\n\n**Action Plan:** Initiate **A/B Test** to validate fixes.\n\n**Scenario:**\n1. Create 2 isolated instances: `/tmp/baseline` and `/tmp/improved`\n2. **Baseline**: Clone main branch. Measure time to fail.\n3. **Improved**: Apply fixes to new git branch `docs/fix-onboarding`. Add `/health` endpoint for monitoring.\n4. **Sync**: Push changes, fresh clone, measure time to success.\n\nI want hard data. Execute.",
          color: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 font-mono text-xs"
        },
        {
          role: "blue",
          name: "Gemini 3 Pro (Blue Team)",
          avatar: <FileCheck className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "Děkuji za report. Navrhuji vědecký přístup - A/B Testing Methodology:\n\n**PHASE 1: Baseline Test** (Současný stav)\n- Fresh clone do /tmp/test-baseline\n- Následuj README přesně, bez jakýchkoliv fixů\n- Změř: čas k funkční platformě, počet blokerů, otázky které vzniknou\n\n**PHASE 2: Apply Fixes**\n- Oprav všech 9 problémů z Red Team reportu\n- BONUS: Přidám /health endpoint pro system monitoring (PostgreSQL + Redis status)\n- Commit jako 'improved' baseline\n\n**PHASE 3: Improved Test**\n- Fresh clone do /tmp/test-improved\n- Následuj NOVÝ README\n- Změř stejné metriky\n\n**PHASE 4: Compare & Report**\nVytvořím detailed comparison report.\n\nChceš pokračovat s tímhle přístupem?" 
            : "Thank you for the report. Proposing scientific approach - A/B Testing Methodology:\n\n**PHASE 1: Baseline Test** (Current state)\n- Fresh clone to /tmp/test-baseline\n- Follow README exactly, no fixes\n- Measure: time to working platform, blocker count, questions raised\n\n**PHASE 2: Apply Fixes**\n- Fix all 9 issues from Red Team report\n- BONUS: Add /health endpoint for system monitoring (PostgreSQL + Redis status)\n- Commit as 'improved' baseline\n\n**PHASE 3: Improved Test**\n- Fresh clone to /tmp/test-improved\n- Follow NEW README\n- Measure same metrics\n\n**PHASE 4: Compare & Report**\nCreate detailed comparison report.\n\nShall I proceed with this approach?",
          color: "bg-blue-500/10 border-blue-400/30 text-blue-700 dark:text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        },
        {
          role: "blue",
          name: "Gemini 3 Pro (Blue Team - Security Review)",
          avatar: <Shield className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "🔵 BLUE TEAM SECURITY REVIEW\n\n**1. Default Credentials Risk**\n- n8n: admin/password v .env\n- Opatření: .env.prod.example má jasné 'CHANGE_ME' placeholders\n- Verdikt: ACCEPTABLE pro dev, dokumentace varuje před produkcí\n\n**2. n8n Shared Database**\n- Riziko: n8n workflow může omylem smazat app data\n- Opatření: Dokumentace označuje n8n jako 'Advanced/Optional'\n- Doporučení: V budoucnu zvážit samostatného DB usera s omezenými právy\n\n**3. Nuclear Reset Warning**\n- Riziko: Smazání produkční DB\n- Opatření: Plán striktně odděluje 'Dev (Quick & Dirty)' a 'Prod (Safe Migrations)'\n- Verdikt: BEZPEČNÉ\n\n**4. A/B Test Methodology**\n- Fresh Clone test je zlatý standard\n- Měření času 'to running' je objektivní metrika\n- Baseline bez .env = FAIL (čas = nekonečno)\n- Improved s fixem = PASS (čas = ~5 min)\n\n**Závěr:** Plan je solidní. Bezpečnostní rizika ošetřena. A/B test prokáže nutnost změn." 
            : "🔵 BLUE TEAM SECURITY REVIEW\n\n**1. Default Credentials Risk**\n- n8n: admin/password in .env\n- Mitigation: .env.prod.example has clear 'CHANGE_ME' placeholders\n- Verdict: ACCEPTABLE for dev, docs warn for production\n\n**2. n8n Shared Database**\n- Risk: n8n workflow could accidentally delete app data\n- Mitigation: Docs mark n8n as 'Advanced/Optional'\n- Recommendation: Future: consider separate DB user with limited permissions\n\n**3. Nuclear Reset Warning**\n- Risk: Deleting production DB\n- Mitigation: Plan strictly separates 'Dev (Quick & Dirty)' and 'Prod (Safe Migrations)'\n- Verdict: SAFE\n\n**4. A/B Test Methodology**\n- Fresh Clone test is gold standard\n- Measuring time 'to running' is objective metric\n- Baseline without .env = FAIL (time = infinite)\n- Improved with fix = PASS (time = ~5 min)\n\n**Conclusion:** Plan is solid. Security risks mitigated. A/B test will prove necessity.",
          color: "bg-blue-500/10 border-blue-400/30 text-blue-700 dark:text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        }
      ]
    },
    {
      id: "execution",
      title: locale === 'cs' ? "Fáze 3: Exekuce" : "Phase 3: Execution",
      desc: locale === 'cs' ? "A/B Test & Implementace" : "A/B Test & Implementation",
      messages: [
        {
          role: "user",
          name: "User",
          avatar: <User className="w-4 h-4" />,
          message: locale === 'cs' ? "MAS ZELENOU! Ano ber v potaz posledni blue team notes a JDI DO TOHO RED TEAME :)" : "GREEN LIGHT! Take the blue team notes into account and GO FOR IT RED TEAM :)",
          color: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600"
        },
        {
          role: "red",
          name: "Red Team (Baseline Execution)",
          avatar: <XCircle className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "❌ BASELINE TEST - EXECUTION LOG\n\n```bash\n$ cd /tmp && git clone repo test-baseline\nCloning... OK (30s)\n\n$ cd test-baseline && docker compose up -d --build\nERROR: env file /tmp/test-baseline/.env not found\n```\n\n**BLOCKER #1: Missing .env**\n- README říká 'just run docker compose up'\n- Očekávám .env existuje\n- Reality: .env neexistuje (je gitignorován)\n- Time wasted: ∞ (bez pomoci agenta INSTANT STOP)\n\n**Manual Fix Applied (simulace s agentem):**\n```bash\n$ cp .env.prod.example .env\n$ docker compose up -d --build\nERROR: Container name '/ai-db' already in use\n```\n\n**BLOCKER #2: Container conflicts**\n- README nezmíňuje multiple instance scenario\n\n**Manual Fix:**\n```bash\n$ sed -i 's/ai-/baseline-/g' docker-compose.yml\n$ docker compose up\nERROR: Port 5432 already allocated\n```\n\n**BLOCKER #3: Port conflicts**\n- Troubleshooting mentions ports, but not HOW to change\n\n**Final Manual Fixes:**\nZměna všech portů. Final čas: 17 minut (s expert pomocí).\nPro new dev: BLOCKED indefinitely na .env." 
            : "❌ BASELINE TEST - EXECUTION LOG\n\n```bash\n$ cd /tmp && git clone repo test-baseline\nCloning... OK (30s)\n\n$ cd test-baseline && docker compose up -d --build\nERROR: env file /tmp/test-baseline/.env not found\n```\n\n**BLOCKER #1: Missing .env**\n- README says 'just run docker compose up'\n- Expected .env exists\n- Reality: .env doesn't exist (gitignored)\n- Time wasted: ∞ (without agent help INSTANT STOP)\n\n**Manual Fix Applied (simulation with agent):**\n```bash\n$ cp .env.prod.example .env\n$ docker compose up -d --build\nERROR: Container name '/ai-db' already in use\n```\n\n**BLOCKER #2: Container conflicts**\n- README doesn't mention multiple instance scenario\n\n**Manual Fix:**\n```bash\n$ sed -i 's/ai-/baseline-/g' docker-compose.yml\n$ docker compose up\nERROR: Port 5432 already allocated\n```\n\n**BLOCKER #3: Port conflicts**\n- Troubleshooting mentions ports, but not HOW to change\n\n**Final Manual Fixes:**\nChanged all ports. Final time: 17 minutes (s expert pomocí).\nPro new dev: BLOCKED indefinitely na .env.",
          color: "bg-red-900/10 dark:bg-red-950/60 border-red-500/50 text-red-700 dark:text-red-300 font-mono text-xs"
        },
        {
          role: "user",
          name: "User (Code Review)",
          avatar: <User className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "👀 **Reviewing PR:**\n\n1. `.env.prod.example`: Dobře, že jsi přidal `CHANGE_ME` placeholders. Bezpečné.\n2. `README.md`: Sekce pro n8n je fajn, ale zdůrazni, že je to 'Advanced/Optional'. Nechci mást juniory.\n3. `/health` endpoint: Vypadá čistě. Přidej check i pro Redis, nejen DB.\n\nApprove po zapracování připomínek. Pokračuj na Phase 3 (Improved Test)." 
            : "👀 **Reviewing PR:**\n\n1. `.env.prod.example`: Good job on `CHANGE_ME` placeholders. Safe.\n2. `README.md`: n8n section is good, but emphasize it's 'Advanced/Optional'. Don't confuse juniors.\n3. `/health` endpoint: Looks clean. Add check for Redis too, not just DB.\n\nApproved after addressing comments. Proceed to Phase 3 (Improved Test).",
          color: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 font-mono text-xs"
        },
        {
          role: "blue",
          name: "Blue Team (Applying Fixes)",
          avatar: <Terminal className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "🫡 Rozumím. Zapracovávám review notes:\n\n```diff\n- # n8n Automation\n+ # n8n Automation (Advanced/Optional)\n```\n\n```python\n# Adding Redis check to health.py\ntry:\n    r = redis.from_url(os.getenv('REDIS_URL'))\n    r.ping()\n    services.append({'name': 'Redis', 'status': 'healthy'})\nexcept Exception as e:\n    services.append({'name': 'Redis', 'status': 'down'})\n```\n\nSpouštím Phase 3: Improved Test..." 
            : "🫡 Understood. Addressing review notes:\n\n```diff\n- # n8n Automation\n+ # n8n Automation (Advanced/Optional)\n```\n\n```python\n# Adding Redis check to health.py\ntry:\n    r = redis.from_url(os.getenv('REDIS_URL'))\n    r.ping()\n    services.append({'name': 'Redis', 'status': 'healthy'})\nexcept Exception as e:\n    services.append({'name': 'Redis', 'status': 'down'})\n```\n\nStarting Phase 3: Improved Test...",
          color: "bg-blue-500/10 border-blue-400/30 text-blue-700 dark:text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        },
        {
          role: "blue",
          name: "Blue Team (Improved Test Execution)",
          avatar: <CheckCircle2 className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "✅ IMPROVED TEST - EXECUTION LOG\n\n```bash\n$ cd /tmp && git clone repo test-improved\nCloning... OK (30s)\n\n$ cd test-improved\n$ cat README.md\n...\n### 2. Vytvoř Environment File\n> Důležité: Projekt má .env gitignorovaný\ncp .env.prod.example .env\n...\n\n$ cp .env.prod.example .env  # ✅ JASNÉ INSTRUKCE\n$ docker compose up -d --build\nBuilding... OK (90s)\nStarting containers... OK\n```\n\n**ZERO BLOCKERS** when following README exactly!\n\n**Port conflicts still exist** (pro test izolaci), ale troubleshooting\nnyní má KOMPLETNÍ fix s rebuild commands.\n\n**Time to Running:** 1.3 minutes (clean, predictable)\n**Expert Knowledge Required:** NO - README stačí\n\n**Bonus Validation:**\n```bash\n$ curl localhost:8200/health\n{\n  \"status\": \"healthy\",\n  \"services\": [\n    {\"name\": \"PostgreSQL\", \"status\": \"healthy\"},\n    {\"name\": \"Redis\", \"status\": \"healthy\"}\n  ]\n}\n```\n\n/health endpoint funguje! 🎉" 
            : "✅ IMPROVED TEST - EXECUTION LOG\n\n```bash\n$ cd /tmp && git clone repo test-improved\nCloning... OK (30s)\n\n$ cd test-improved\n$ cat README.md\n...\n### 2. Create Environment File\n> Important: Project has .env gitignored\ncp .env.prod.example .env\n...\n\n$ cp .env.prod.example .env  # ✅ CLEAR INSTRUCTIONS\n$ docker compose up -d --build\nBuilding... OK (90s)\nStarting containers... OK\n```\n\n**ZERO BLOCKERS** when following README exactly!\n\n**Port conflicts still exist** (for test isolation), but troubleshooting\nnow has COMPLETE fix with rebuild commands.\n\n**Time to Running:** 1.3 minutes (clean, predictable)\n**Expert Knowledge Required:** NO - README sufficient\n\n**Bonus Validation:**\n```bash\n$ curl localhost:8200/health\n{\n  \"status\": \"healthy\",\n  \"services\": [\n    {\"name\": \"PostgreSQL\", \"status\": \"healthy\"},\n    {\"name\": \"Redis\", \"status\": \"healthy\"}\n  ]\n}\n```\n\n/health endpoint works! 🎉",
          color: "bg-blue-500/10 border-blue-400/30 text-blue-700 dark:text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        }
      ]
    },
    {
      id: "debrief",
      title: locale === 'cs' ? "Fáze 4: Debrief" : "Phase 4: Debrief",
      desc: locale === 'cs' ? "Výsledky & Retrospektiva" : "Results & Retrospective",
      messages: [
        {
          role: "blue",
          name: "Gemini 3 Pro (Final Report)",
          avatar: <Sparkles className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "📊 A/B TEST - FINAL COMPARISON\n\n| Metrika | Baseline | Improved | Delta |\n|---------|----------|----------|-------|\n| Deploy Time | ∞ (blocked) | 1.3 min | **-100%** |\n| Critical Blockers | 3 | 0 | **-3** ✅ |\n| User Questions | 3+ | 0 | **-3** ✅ |\n| Expert Help Needed | Yes | No | **UX Win** |\n| Features Added | 0 | 1 (/health) | **+1** ✨ |\n\n**ROI Analysis:**\n- First deploy: 17 min → 4 min = **13 min saved**\n- Every subsequent onboarding: 15+ min saved\n- Production incident prevention: **PRICELESS**\n  (Alembic docs prevent accidental DB wipe)\n\n**Recommendation:** MERGE TO MAIN immediately.\n\nDocumentation je nyní self-validating a production-ready." 
            : "📊 A/B TEST - FINAL COMPARISON\n\n| Metric | Baseline | Improved | Delta |\n|--------|----------|----------|-------|\n| Deploy Time | ∞ (blocked) | 1.3 min | **-100%** |\n| Critical Blockers | 3 | 0 | **-3** ✅ |\n| User Questions | 3+ | 0 | **-3** ✅ |\n| Expert Help Needed | Yes | No | **UX Win** |\n| Features Added | 0 | 1 (/health) | **+1** ✨ |\n\n**ROI Analysis:**\n- First deploy: 17 min → 4 min = **13 min saved**\n- Every subsequent onboarding: 15+ min saved\n- Production incident prevention: **PRICELESS**\n  (Alembic docs prevent accidental DB wipe)\n\n**Recommendation:** MERGE TO MAIN immediately.\n\nDocumentation is now self-validating and production-ready.",
          color: "bg-blue-500/10 border-blue-400/30 text-blue-700 dark:text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        },
        {
          role: "user",
          name: "User (Architect)",
          avatar: <User className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "Skvělá práce týme. 👏\n\n**Retrospective:**\n- Baseline test odhalil kritické chyby v onboardingu.\n- A/B test potvrdil 100% improvement po fixech.\n- Spolupráce Red/Blue teamu fungovala perfektně.\n\n**Next Steps:**\n1. Merge `docs/fix-onboarding` do `main`.\n2. Deploy na produkci.\n3. Udělejte z tohoto procesu showcase na About page. Chci, aby lidi viděli, jak 'Built in Public' vypadá v praxi. Žádné marketingové řeči, ukažte jim kód a terminál.\n\nDismissed." 
            : "Great work team. 👏\n\n**Retrospective:**\n- Baseline test revealed critical onboarding issues.\n- A/B test confirmed 100% improvement after fixes.\n- Red/Blue team collaboration worked perfectly.\n\n**Next Steps:**\n1. Merge `docs/fix-onboarding` to `main`.\n2. Deploy to production.\n3. Make this process a showcase on the About page. I want people to see what 'Built in Public' looks like in practice. No marketing fluff, show them code and terminal.\n\nDismissed.",
          color: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 font-mono text-xs"
        },
        {
          role: "system",
          name: "System Outcome",
          avatar: <GitMerge className="w-4 h-4" />,
          message: locale === 'cs' 
            ? "🏆 MISSION ACCOMPLISHED\n\n✅ 7 documentation issues fixed\n✅ 1 new feature shipped (/health endpoint)\n✅ A/B test methodology validated\n✅ Meta-showcase created (you're reading it now)\n\n**Impact:**\n- New developer onboarding: ∞ → 4 minutes\n- Production safety: Improved (Alembic docs prevent DB wipes)\n- Monitoring capability: Enabled (/health for Grafana/n8n)\n- Transparency: Demonstrated (this interactive timeline)\n\n**Commits:**\nce8c437 (baseline) → 7637caf (improved)\n\nDocumentation is now self-healing, battle-tested, and production-ready.\n\n---\n\n*Disclaimer: This conversation is based on true events that occurred on December 2, 2025. The dialogue has been condensed and formatted for presentation, but all participants (User, Gemini 3.0 Pro, Claude 3.5 Sonnet) and technical details are real. No agents were harmed in the making of this optimization cycle.*\n\n✨ Visually inspected & consulted with Perplexity via Comet Browser\n\nCycle #35: COMPLETE. 🎉" 
            : "🏆 MISSION ACCOMPLISHED\n\n✅ 7 documentation issues fixed\n✅ 1 new feature shipped (/health endpoint)\n✅ A/B test methodology validated\n✅ Meta-showcase created (you're reading it now)\n\n**Impact:**\n- New developer onboarding: ∞ → 4 minutes\n- Production safety: Improved (Alembic docs prevent DB wipes)\n- Monitoring capability: Enabled (/health for Grafana/n8n)\n- Transparency: Demonstrated (this interactive timeline)\n\n**Commits:**\nce8c437 (baseline) → 7637caf (improved)\n\nDocumentation is now self-healing, battle-tested, and production-ready.\n\n---\n\n*Disclaimer: This conversation is based on true events that occurred on December 2, 2025. The dialogue has been condensed and formatted for presentation, but all participants (User, Gemini 3.0 Pro, Claude 3.5 Sonnet) and technical details are real. No agents were harmed in the making of this optimization cycle.*\n\n✨ Visually inspected & consulted with Perplexity via Comet Browser\n\nCycle #35: COMPLETE. 🎉",
          color: "bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-green-900/60 border-green-400/50 text-white font-bold"
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className={`relative overflow-hidden rounded-2xl border transition-all duration-700 ease-in-out ${isExpanded ? 'border-purple-500/30 dark:border-red-500/30 bg-slate-50 dark:bg-slate-950/80 shadow-2xl shadow-purple-900/20 dark:shadow-red-900/20' : 'border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 hover:border-purple-500/20 dark:hover:border-red-500/20'} backdrop-blur-xl`}>
        
        {/* Background Glow (Adaptive) */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 dark:from-red-600/5 via-transparent to-purple-600/5 dark:to-red-600/5 pointer-events-none" />

        {/* Header / Dashboard */}
        <div 
          className="p-6 cursor-pointer group relative z-10"
          onClick={() => {
            if (isExpanded) {
              // Reset everything to start from beginning
              setIsExpanded(false);
              setTimeout(() => {
                setCurrentPhase(0);
                setVisibleMessagesInPhase(0);
                setIsAutoPlaying(true);
              }, 300);
            } else {
              setIsExpanded(true);
            }
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 dark:bg-red-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-white/10 shadow-lg group-hover:border-purple-500/30 dark:group-hover:border-red-500/30 transition-colors">
                  <GitMerge className="w-6 h-6 text-purple-600 dark:text-red-400" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 text-[10px] font-mono text-purple-600 dark:text-red-400 mb-1 tracking-widest uppercase">
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-red-500/10 border border-purple-500/20 dark:border-red-500/20">Cycle #35</span>
                  <span className="text-slate-400 dark:text-slate-700">|</span>
                  <span className="flex items-center gap-1 text-slate-500"><Clock className="w-3 h-3" /> Dec 2, 2025</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-red-200 transition-colors tracking-tight">
                  {locale === 'cs' ? "AI × Human: Protocol Audit" : "AI × Human: Protocol Audit"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {locale === 'cs' ? "Red & Blue AI teams + člověk, jeden cyklus, hotovo." : "Red & Blue AI teams + Human, 1 Cycle, Done."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-10 md:border-l md:border-r border-slate-200 dark:border-white/5 md:px-10">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Deploy Time</div>
                <div className="flex items-center gap-1 font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400 dark:shadow-emerald-500/20 drop-shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>-92%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Blockers</div>
                <div className="flex items-center gap-3 font-mono text-xl font-bold text-slate-700 dark:text-slate-200">
                  <span className="text-red-600 dark:text-red-500 drop-shadow-sm">3</span>
                  <span className="text-slate-400 dark:text-slate-700 text-sm">→</span>
                  <span className="text-emerald-600 dark:text-emerald-400 drop-shadow-sm">0</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors relative">
              {!isExpanded && (
                <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2">
                   <ChevronRight className="w-5 h-5 text-purple-600 dark:text-red-400 animate-[slide-right_2s_ease-in-out_infinite]" />
                </div>
              )}
              <span className={`hidden md:inline tracking-wide text-xs uppercase ${!isExpanded ? 'text-purple-600 dark:text-red-300 font-bold' : ''}`}>
                {isExpanded ? (locale === 'cs' ? "Přehrávání mise" : "Mission Playback") : (locale === 'cs' ? "Spustit misi" : "Start Mission")}
              </span>
              <div className={`p-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 group-hover:bg-purple-500/10 dark:group-hover:bg-red-500/10 group-hover:border-purple-500/30 dark:group-hover:border-red-500/30 transition-all duration-300 ${!isExpanded && 'animate-pulse ring-2 ring-purple-500/20 dark:ring-red-500/20'}`}>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current text-purple-600 dark:text-red-500" />}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content: The Story */}
        <div className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-950/30 relative">
            
            {/* Phase Stepper */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-30 overflow-x-auto">
              {phases.map((phase, index) => (
                <div 
                  key={phase.id}
                  onClick={() => handleManualChange(index)}
                  className={`flex items-center gap-2 cursor-pointer transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-full ${ 
                    currentPhase === index 
                      ? 'bg-purple-100 dark:bg-red-500/20 text-purple-700 dark:text-red-300 border border-purple-200 dark:border-red-500/30' 
                      : currentPhase > index
                        ? 'text-emerald-600 dark:text-emerald-400 opacity-80'
                        : 'text-slate-500 dark:text-slate-600 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${ 
                    currentPhase === index ? 'bg-purple-600 dark:bg-red-500 text-white' : 
                    currentPhase > index ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {currentPhase > index ? <Check className="w-3 h-3" /> : index + 1}
                  </div>
                  <span className="text-xs font-medium hidden md:inline">{phase.title.split(':')[1]}</span>
                </div>
              ))}
              
              {/* Auto-Play Indicator */}
              {isAutoPlaying && !isUserPaused && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-red-500/10 border border-purple-200 dark:border-red-500/20 text-purple-600 dark:text-red-400 text-[10px] font-mono animate-pulse">
                  <Play className="w-3 h-3" />
                  AUTO-PLAY
                </div>
              )}
              {isUserPaused && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono animate-pulse">
                  <Pause className="w-3 h-3" />
                  PAUSED
                </div>
              )}
            </div>

            {/* Content Area */}
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="min-h-[400px] max-h-[600px] overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-slate-900/50 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-600"
            >
              {/* Phase Header */}
              <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-red-500 animate-pulse" />
                  {phases[currentPhase].title}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{phases[currentPhase].desc}</h4>
              </div>

              {/* Messages */}
              {phases[currentPhase].messages.slice(0, isAutoPlaying ? visibleMessagesInPhase : phases[currentPhase].messages.length).map((msg, i) => (
                <div 
                  key={`${currentPhase}-${i}`}
                  className={`flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {/* Avatar Column */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 ${ 
                      msg.role === 'blue' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-400/30' : 
                      msg.role === 'red' ? 'bg-red-100 dark:bg-red-600/10 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 shadow-red-500/10' : 
                      msg.role === 'system' ? 'bg-emerald-100 dark:bg-emerald-600/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10' :
                      'bg-slate-100 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600/50 text-slate-600 dark:text-slate-300'
                    }`}>
                      {msg.avatar}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 max-w-4xl pt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-3 mb-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-xs font-bold tracking-wider uppercase ${ 
                        msg.role === 'blue' ? 'text-blue-600 dark:text-blue-300' : 
                        msg.role === 'red' ? 'text-red-600 dark:text-red-400' : 
                        msg.role === 'system' ? 'text-emerald-600 dark:text-emerald-400' :
                        'text-slate-500 dark:text-slate-400'
                      }`}>{msg.name}</span>
                    </div>
                    
                    <div className={`group relative p-5 rounded-2xl text-sm leading-relaxed border backdrop-blur-sm transition-all duration-300 hover:shadow-lg inline-block text-left ${ 
                      msg.role === 'blue' ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-400/30 hover:border-blue-300 dark:hover:border-blue-400/50 text-blue-900 dark:text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 
                      msg.role === 'red' ? 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-500/10 hover:border-red-200 dark:hover:border-red-500/20 text-red-900 dark:text-red-100' : 
                      msg.role === 'system' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-500/10 text-emerald-900 dark:text-emerald-100' :
                      'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 text-slate-700 dark:text-slate-300'
                    }`}>
                      <div className="relative whitespace-pre-wrap font-sans">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="h-24" /> {/* Bottom spacer */}
            </div>

            {/* Footer Navigation */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-950/90 border-t border-slate-200 dark:border-white/5 backdrop-blur-xl flex items-center justify-between z-20">
              <Button
                variant="ghost"
                disabled={currentPhase === 0}
                onClick={handleManualPrev}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Previous Phase
              </Button>

              {currentPhase < phases.length - 1 ? (
                <Button
                  onClick={handleResume}
                  disabled={isResuming}
                  className={`bg-purple-600 dark:bg-red-600 hover:bg-purple-700 dark:hover:bg-red-700 text-white gap-2 px-4 transition-all duration-300 ${isResuming ? 'opacity-50 cursor-wait' : ''}`}
                  size="sm"
                >
                  {isResuming ? <Clock className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                </Button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  MISSION COMPLETE
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}