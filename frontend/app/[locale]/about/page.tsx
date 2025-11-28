"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Code2, 
  GitBranch, 
  Layers, 
  Rocket, 
  Users, 
  Workflow, 
  Zap, 
  Terminal,
  Database,
  Layout
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

export default function AboutPage() {
  const { user } = useAuth();
  const t = useTranslations('About');

  // Timeline Data
  const timeline = [
    { year: '2023-2024', title: 'The Research Phase', desc: 'Experiments with Galaxy AI & Gemini 2.5 Pro. Discovery of MCP.', icon: <Brain className="w-5 h-5" /> },
    { year: '2024', title: 'The Architect', desc: 'Perplexity integrated as Lead Architect. Structural planning.', icon: <Users className="w-5 h-5" /> },
    { year: '2025 (Early)', title: 'The Builders', desc: 'Antigravity IDE & Gemini CLI specialized tools created.', icon: <Terminal className="w-5 h-5" /> },
    { year: '2025 (Now)', title: 'The Ecosystem', desc: 'Cycle-based development, "Liquid Glass" UI, Multi-Agent orchestration.', icon: <Zap className="w-5 h-5" /> },
  ];

  // Tech Stack Data
  const techStack = [
    { name: 'Next.js 16', icon: <Layout className="w-6 h-6" />, desc: 'Server Actions, App Router' },
    { name: 'FastAPI', icon: <Zap className="w-6 h-6" />, desc: 'High-perf Async Backend' },
    { name: 'PostgreSQL', icon: <Database className="w-6 h-6" />, desc: 'Robust Data Persistence' },
    { name: 'Docker', icon: <Layers className="w-6 h-6" />, desc: 'Consistent Environments' },
    { name: 'MCP', icon: <Workflow className="w-6 h-6" />, desc: 'Model Context Protocol' },
    { name: 'MDX', icon: <Code2 className="w-6 h-6" />, desc: 'Content as Code' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/50 border border-border backdrop-blur-sm text-sm font-medium text-primary mb-4 animate-fade-in">
            <Rocket className="w-4 h-4" />
            <span>{t('hero_subtitle')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent drop-shadow-sm">
            {t('hero_title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('hero_desc')}
          </p>
        </div>
      </section>

      {/* Genesis Section (Timeline) */}
      <section className="w-full py-16 px-4 bg-card/30 border-y border-border/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('genesis_title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('genesis_desc')}</p>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-transparent md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 items-center md:items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 -translate-x-1/2">
                     {item.icon}
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0">
                    <Card className="hover:border-primary/50 transition-colors duration-300 bg-card/50 backdrop-blur-md">
                      <CardHeader>
                        <div className="text-sm text-primary font-mono mb-1">{item.year}</div>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="w-full py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('tech_stack_title')}</h2>
            <p className="text-muted-foreground">{t('tech_stack_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, i) => (
              <Card key={i} className="group hover:-translate-y-1 transition-transform duration-300 bg-card/40 border-border/50 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {tech.icon}
                </div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {tech.icon}
                  </div>
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                </CardContent>
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
                <div className="text-2xl font-bold text-primary mb-2">{i + 1}</div>
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
                 <Button size="lg" className="gap-2 text-lg px-8 h-12 rounded-full shadow-lg hover:shadow-primary/25 transition-shadow">
                   {t('hero_title')} <Rocket className="w-5 h-5" />
                 </Button>
               </Link>
            ) : (
               <Link href="/register">
                 <Button size="lg" className="gap-2 text-lg px-8 h-12 rounded-full shadow-lg hover:shadow-primary/25 transition-shadow">
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
