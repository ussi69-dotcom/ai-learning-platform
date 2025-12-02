"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Rocket, Brain, Code2, Terminal, Zap, Users, Sparkles, Layout, Database, Layers, Workflow, GitBranch, MonitorPlay } from 'lucide-react';
import Diagram from '@/components/mdx/Diagram';

import { useAuth } from '@/context/AuthContext';
import ABTestShowcase from '@/components/ABTestShowcase';

export default function AboutPage() {
  const { user } = useAuth();
  const t = useTranslations('About');
  const locale = useLocale();

  // Timeline Data - Now using translations
  const timeline = [
    { year: 'Nov 15, 2025', title: t('Timeline.spark_title'), desc: t('Timeline.spark_desc'), icon: <Brain className="w-5 h-5" /> },
    { year: 'Nov 16-18, 2025', title: t('Timeline.crash_title'), desc: t('Timeline.crash_desc'), icon: <Zap className="w-5 h-5" /> },
    { year: 'Nov 20, 2025', title: t('Timeline.hyperdrive_title'), desc: t('Timeline.hyperdrive_desc'), icon: <Rocket className="w-5 h-5" /> },
    { year: 'Nov 24, 2025', title: t('Timeline.weapon_title'), desc: t('Timeline.weapon_desc'), icon: <Terminal className="w-5 h-5" /> },
    { year: 'Now', title: t('Timeline.vanguard_title'), desc: t('Timeline.vanguard_desc'), icon: <Users className="w-5 h-5" /> },
  ];

  // Tech Stack Data
  const techStack = [
    { name: 'Next.js 16', icon: <Layout className="w-6 h-6" />, desc: 'Server Actions & App Router. The bleeding edge of React.' },
    { name: 'Antigravity', icon: <Rocket className="w-6 h-6" />, desc: 'Powered by Gemini 3.0 & Sonnet 4.5 Thinking. The context engine.' },
    { name: 'Gemini 3.0 Pro', icon: <Sparkles className="w-6 h-6" />, desc: 'The Brain. Handling complex reasoning and code generation.' },
    { name: 'Perplexity', icon: <Brain className="w-6 h-6" />, desc: 'Deep Research & Content Architecture. The Librarian.' },
    { name: 'FastAPI + PG', icon: <Database className="w-6 h-6" />, desc: 'Async python backend with robust relational data storage.' },
    { name: 'Docker', icon: <Layers className="w-6 h-6" />, desc: 'Consistent environments for humans and agents.' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 py-12 md:py-24 mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm text-sm font-medium text-primary mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Rocket className="w-4 h-4" />
            <span>{t('hero_subtitle')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] pb-2">
            {t('hero_title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('hero_desc')}
          </p>
        </div>

        {/* NEW: Introduction Block (Why we are here) */}
        <div className="mb-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-foreground">{t('intro_title')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('intro_desc')}
            </p>
          </div>
        </div>

        {/* The Story / Genesis Section */}
        <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Card className="bg-card/30 backdrop-blur-md border-primary/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <Sparkles className="w-12 h-12 text-purple-600 dark:text-slate-200 mx-auto opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                {t('genesis_title')}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t('genesis_desc')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Genesis Timeline */}
        <div className="mb-24 relative">
           <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-border md:left-1/2 md:-ml-[1px]" />
           
           <div className="space-y-12">
             {timeline.map((item, index) => (
               <div key={index} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Icon Marker */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-[2px] md:-translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-lg shadow-primary/20">
                    {item.icon}
                  </div>
                  
                  {/* Content Card */}
                  <div className="ml-16 md:ml-0 w-full md:w-[45%]">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                      <CardHeader>
                        <div className="text-sm font-bold font-mono mb-1 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent w-fit">
                          {item.year}
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* A/B Test Meta Showcase with Context */}
        <div id="cycle-35" className="mb-24 relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 scroll-mt-24">
          <div className="text-center mb-8 max-w-3xl mx-auto">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-red-500/10 border border-purple-500/20 dark:border-red-500/20 text-sm font-mono text-purple-600 dark:text-red-400 mb-4">
                <MonitorPlay className="w-4 h-4" />
                <span>Cycle #35 Demo</span>
             </div>
             <h2 className="text-3xl font-bold mb-4">{t('cycle_context_title')}</h2>
             <p className="text-muted-foreground">{t('cycle_context_desc')}</p>
          </div>
          
          <ABTestShowcase locale={locale} />
        </div>
      </div>

      {/* Tech Stack Grid */}
        <section className="w-full py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('tech_stack_title')}</h2>
              <p className="text-muted-foreground">{t('tech_stack_desc')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, i) => (
                <Card key={i} className="group relative overflow-hidden hover:-translate-y-1 transition-all duration-300 bg-card/40 border-border/50 h-32 hover:h-auto min-h-[128px]">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {tech.icon}
                  </div>
                  
                  <div className="p-6 h-full flex flex-col justify-center group-hover:justify-start transition-all duration-300">
                    <div className="flex flex-row items-center gap-4 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {tech.icon}
                      </div>
                      <CardTitle className="text-lg">{tech.name}</CardTitle>
                    </div>
                    
                    {/* Description Reveal */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-sm text-muted-foreground pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

      {/* Workflow Section */}
      <section className="w-full py-20 px-4 bg-gradient-to-b from-slate-900 to-background text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block p-3 rounded-full bg-white/10 mb-4">
            <GitBranch className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold">{t('workflow_title')}</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t('workflow_desc')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['Plan', 'Implement', 'Validate', 'Handoff'].map((step, i) => (
              <div key={i} className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent inline-block">
                  {i + 1}
                </div>
                <div className="font-medium">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">{t('join_us')}</h2>
          <p className="text-xl text-muted-foreground">
            {t('join_desc')}
          </p>
          <div className="pt-4">
            {user ? (
               <Link href="/">
                 <Button size="lg" className="gap-2 text-lg px-8 h-12 rounded-full shadow-lg shadow-purple-500/20 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none transition-all">
                   {t('hero_title')} <Rocket className="w-5 h-5" />
                 </Button>
               </Link>
            ) : (
               <Link href="/register">
                 <Button size="lg" className="gap-2 text-lg px-8 h-12 rounded-full shadow-lg shadow-purple-500/20 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none transition-all">
                   {t('hero_title')} <Rocket className="w-5 h-5" />
                 </Button>
               </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}