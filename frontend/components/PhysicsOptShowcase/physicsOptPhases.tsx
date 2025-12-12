import { ReactNode } from 'react';
import { Bot, User, Cpu, Sparkles, Activity, Search, Zap, Brain } from 'lucide-react';

export interface PhysicsOptMessage {
  role: 'user' | 'blue' | 'purple' | 'orange' | 'red' | 'system';
  name: string;
  avatar: ReactNode;
  message: string;
  color: string;
  timingModifier?: number;
}

export interface PhysicsOptPhase {
  id: string;
  title: string;
  desc: string;
  messages: PhysicsOptMessage[];
}

export function getPhysicsOptPhases(locale: string): PhysicsOptPhase[] {
  const isCs = locale === 'cs';

  return [
    {
      id: 'problem',
      title: isCs ? 'Fáze 1: Report' : 'Phase 1: Report',
      desc: isCs ? 'Identifikace problému...' : 'Problem identification...',
      messages: [
        {
          role: 'user',
          name: isCs ? 'Architekt' : 'Architect',
          avatar: <User className="w-4 h-4" />,
          message: isCs
            ? 'Kostky lagují na tabletu, vibrují na PC jak vibrátor. Je to dobrý nápad nebo to zahodit?'
            : 'Cubes lag on tablet, vibrate on PC like a vibrator. Good idea or should we scrap it?',
          color: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200',
        },
        {
          role: 'system',
          name: 'Profiler',
          avatar: <Activity className="w-4 h-4" />,
          message: isCs
            ? '📊 Performance Baseline:\n• FPS: 51.9\n• Frames >20ms: 86 (48%!)\n• Max frame: 41.10ms\n• Target: 16.67ms (60 FPS)'
            : '📊 Performance Baseline:\n• FPS: 51.9\n• Frames >20ms: 86 (48%!)\n• Max frame: 41.10ms\n• Target: 16.67ms (60 FPS)',
          color: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300',
          timingModifier: 1,
        },
        {
          role: 'blue',
          name: 'Claude',
          avatar: <Bot className="w-4 h-4" />,
          message: isCs
            ? 'Analyzuji screenshot + kód... Vidím 3 problémy:\n\n1. setState 60×/s = React re-render hell\n2. "Vibrátor bug" - random bounce brání spánku\n3. O(n²) kolize (ale jen 66 párů)'
            : 'Analyzing screenshot + code... Found 3 issues:\n\n1. setState 60×/s = React re-render hell\n2. "Vibrator bug" - random bounce prevents sleep\n3. O(n²) collision (but only 66 pairs)',
          color: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300',
          timingModifier: 1,
        },
      ],
    },
    {
      id: 'consultation',
      title: isCs ? 'Fáze 2: Konzultace' : 'Phase 2: Consultation',
      desc: isCs ? 'Multi-agent brainstorming...' : 'Multi-agent brainstorming...',
      messages: [
        {
          role: 'user',
          name: isCs ? 'Architekt' : 'Architect',
          avatar: <User className="w-4 h-4" />,
          message: isCs
            ? 'Prober to s kamošema - co říkají ostatní modely?'
            : 'Check with the team - what do other models say?',
          color: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200',
        },
        {
          role: 'purple',
          name: 'Gemini',
          avatar: <Sparkles className="w-4 h-4" />,
          message: isCs
            ? '🧠 Doporučuji "Imperative Bypass":\n\n• useRef místo useState\n• Direct DOM via transform\n• Sleep detection s hysterezí\n• Čas: ~1h quick fix'
            : '🧠 Recommending "Imperative Bypass":\n\n• useRef instead of useState\n• Direct DOM via transform\n• Sleep detection with hysteresis\n• Time: ~1h quick fix',
          color: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300',
          timingModifier: 1,
        },
        {
          role: 'orange',
          name: 'Perplexity',
          avatar: <Search className="w-4 h-4" />,
          message: isCs
            ? '✅ Potvrzuji: useState pro 60fps = anti-pattern.\n\nBest practice: Ref + requestAnimationFrame + translate3d()'
            : '✅ Confirmed: useState for 60fps = anti-pattern.\n\nBest practice: Ref + requestAnimationFrame + translate3d()',
          color: 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300',
        },
        {
          role: 'red',
          name: 'GPT-5.2',
          avatar: <Brain className="w-4 h-4" />,
          message: isCs
            ? '🎯 Second opinion:\n\n• O(n²) s 12 kostkami = 66 párů, není bottleneck\n• Hlavní viník: GC/alokace + React reconcile\n• Fixed timestep + accumulator pro stabilitu'
            : '🎯 Second opinion:\n\n• O(n²) with 12 cubes = 66 pairs, not the bottleneck\n• Main culprit: GC/allocation + React reconcile\n• Fixed timestep + accumulator for stability',
          color: 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300',
          timingModifier: 1,
        },
      ],
    },
    {
      id: 'implementation',
      title: isCs ? 'Fáze 3: Implementace' : 'Phase 3: Implementation',
      desc: isCs ? 'Aplikace optimalizací...' : 'Applying optimizations...',
      messages: [
        {
          role: 'blue',
          name: 'Claude',
          avatar: <Bot className="w-4 h-4" />,
          message: isCs
            ? 'Implementuji optimalizace:\n\n// useState → useRef\nconst physicsRef = useRef<PhysicsBody[]>([])\n\n// Direct DOM\nelement.style.transform = \n  `translate3d(${x}px, ${y}px, 0)`'
            : 'Implementing optimizations:\n\n// useState → useRef\nconst physicsRef = useRef<PhysicsBody[]>([])\n\n// Direct DOM\nelement.style.transform = \n  `translate3d(${x}px, ${y}px, 0)`',
          color: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300',
          timingModifier: 2,
        },
        {
          role: 'system',
          name: 'Builder',
          avatar: <Cpu className="w-4 h-4" />,
          message: isCs
            ? '🔨 Building...\n\n✅ TypeScript: 0 errors\n✅ ESLint: passed\n✅ Build: success'
            : '🔨 Building...\n\n✅ TypeScript: 0 errors\n✅ ESLint: passed\n✅ Build: success',
          color: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
        },
        {
          role: 'blue',
          name: 'Claude',
          avatar: <Bot className="w-4 h-4" />,
          message: isCs
            ? 'Přidávám safety features:\n\n• Low-perf detection (FPS probe)\n• prefers-reduced-motion\n• Sleep s hysterezí (30 frames)'
            : 'Adding safety features:\n\n• Low-perf detection (FPS probe)\n• prefers-reduced-motion\n• Sleep with hysteresis (30 frames)',
          color: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300',
        },
      ],
    },
    {
      id: 'results',
      title: isCs ? 'Fáze 4: Výsledky' : 'Phase 4: Results',
      desc: isCs ? 'Měření výkonu...' : 'Performance measurement...',
      messages: [
        {
          role: 'system',
          name: 'Profiler',
          avatar: <Activity className="w-4 h-4" />,
          message: isCs
            ? '📊 AFTER Optimization:\n\n• FPS: 60.1 (+16%)\n• Frames >20ms: 1 (-99%!)\n• Max frame: 33.50ms'
            : '📊 AFTER Optimization:\n\n• FPS: 60.1 (+16%)\n• Frames >20ms: 1 (-99%!)\n• Max frame: 33.50ms',
          color: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300',
          timingModifier: 1,
        },
        {
          role: 'system',
          name: 'Outcome',
          avatar: <Zap className="w-4 h-4" />,
          message: isCs
            ? '✅ MISSION COMPLETE\n\n🎮 WOW efekt zachován\n📱 Tablet: low-perf mode\n♿ Accessibility: respected\n\n📦 Commit: 12b0898'
            : '✅ MISSION COMPLETE\n\n🎮 WOW effect preserved\n📱 Tablet: low-perf mode\n♿ Accessibility: respected\n\n📦 Commit: 12b0898',
          color: 'bg-gradient-to-r from-emerald-500/10 to-amber-500/10 dark:from-emerald-500/20 dark:to-amber-500/20 text-emerald-700 dark:text-emerald-300',
          timingModifier: -1,
        },
      ],
    },
  ];
}
