"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Brain,
  Terminal,
  Zap,
  Users,
  Sparkles,
  Layout,
  Database,
  Layers,
  GitBranch,
  MonitorPlay,
  Bot,
  Clapperboard,
  Clipboard,
  Play,
  Server,
  Wind,
  Box,
  CircleDot,
  Shield,
} from "lucide-react";
import Diagram from "@/components/mdx/Diagram";

import { useAuth } from "@/context/AuthContext";
import ABTestShowcase from "@/components/ABTestShowcase";

export default function AboutPage() {
  const { user } = useAuth();
  const t = useTranslations("About");
  const locale = useLocale();

  // Timeline Data - Now using translations
  const timeline = [
    {
      year: "Nov 15, 2025",
      title: t("Timeline.spark_title"),
      desc: t("Timeline.spark_desc"),
      icon: <Brain className="w-5 h-5" />,
    },
    {
      year: "Nov 16-18, 2025",
      title: t("Timeline.crash_title"),
      desc: t("Timeline.crash_desc"),
      icon: <Zap className="w-5 h-5" />,
    },
    {
      year: "Nov 20, 2025",
      title: t("Timeline.hyperdrive_title"),
      desc: t("Timeline.hyperdrive_desc"),
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      year: "Nov 24, 2025",
      title: t("Timeline.weapon_title"),
      desc: t("Timeline.weapon_desc"),
      icon: <Terminal className="w-5 h-5" />,
    },
    {
      year: "Now",
      title: t("Timeline.vanguard_title"),
      desc: t("Timeline.vanguard_desc"),
      icon: <Users className="w-5 h-5" />,
    },
  ];

  // Tech Stack Data - Enhanced with translations
  const techStack = [
    {
      name: t("TechStack.nextjs_name"),
      icon: <Layout className="w-6 h-6" />,
      desc: t("TechStack.nextjs_desc"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: t("TechStack.tailwind_name"),
      icon: <Wind className="w-6 h-6" />,
      desc: t("TechStack.tailwind_desc"),
      color: "from-cyan-500 to-teal-500",
    },
    {
      name: t("TechStack.fastapi_name"),
      icon: <Zap className="w-6 h-6" />,
      desc: t("TechStack.fastapi_desc"),
      color: "from-green-500 to-emerald-500",
    },
    {
      name: t("TechStack.postgres_name"),
      icon: <Database className="w-6 h-6" />,
      desc: t("TechStack.postgres_desc"),
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: t("TechStack.sqlalchemy_name"),
      icon: <Layers className="w-6 h-6" />,
      desc: t("TechStack.sqlalchemy_desc"),
      color: "from-orange-500 to-red-500",
    },
    {
      name: t("TechStack.docker_name"),
      icon: <Box className="w-6 h-6" />,
      desc: t("TechStack.docker_desc"),
      color: "from-sky-500 to-blue-500",
    },
    {
      name: t("TechStack.redis_name"),
      icon: <CircleDot className="w-6 h-6" />,
      desc: t("TechStack.redis_desc"),
      color: "from-red-500 to-rose-500",
    },
    {
      name: t("TechStack.claude_name"),
      icon: <Bot className="w-6 h-6" />,
      desc: t("TechStack.claude_desc"),
      color: "from-orange-400 to-amber-500",
    },
    {
      name: t("TechStack.gemini_name"),
      icon: <Sparkles className="w-6 h-6" />,
      desc: t("TechStack.gemini_desc"),
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Edutainment features
  const edutainmentFeatures = [
    {
      title: t("edutainment_hook"),
      desc: t("edutainment_hook_desc"),
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: t("edutainment_cinematic"),
      desc: t("edutainment_cinematic_desc"),
      icon: <Clapperboard className="w-5 h-5" />,
    },
    {
      title: t("edutainment_labs"),
      desc: t("edutainment_labs_desc"),
      icon: <Clipboard className="w-5 h-5" />,
    },
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
            <span>{t("hero_subtitle")}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] pb-2">
            {t("hero_title")}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("hero_desc")}
          </p>
        </div>

        {/* NEW: Introduction Block (Why we are here) */}
        <div className="mb-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {t("intro_title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("intro_desc")}
            </p>
          </div>
        </div>

        {/* NEW: Edutainment Philosophy Section */}
        <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Card className="bg-gradient-to-br from-fuchsia-500/5 via-purple-500/5 to-indigo-500/5 dark:from-red-950/30 dark:via-red-900/10 dark:to-black border-purple-500/20 dark:border-red-900/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 dark:from-red-900 dark:via-red-700 dark:to-red-950" />
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 dark:bg-red-950/50 border border-fuchsia-500/20 dark:border-red-900/50 text-sm font-mono text-fuchsia-600 dark:text-red-500 mb-4">
                  <Play className="w-4 h-4" />
                  <span>Education + Entertainment</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {t("edutainment_title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("edutainment_desc")}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {edutainmentFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="text-center p-6 rounded-xl bg-background/50 border border-border/50 hover:border-purple-500/30 dark:hover:border-red-900/50 transition-colors"
                  >
                    <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 dark:from-red-950/50 dark:to-red-900/50 text-purple-600 dark:text-red-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Story / Genesis Section */}
        <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Card className="bg-card/30 backdrop-blur-md border-primary/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <Sparkles className="w-12 h-12 text-purple-600 dark:text-slate-200 mx-auto opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                {t("genesis_title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("genesis_desc")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Genesis Timeline */}
        <div className="mb-24 relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-border md:left-1/2 md:-ml-[1px]" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center md:justify-between ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
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
        <div id="cycle-35" className="mb-24 relative scroll-mt-40">
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-red-500/10 border border-purple-500/20 dark:border-red-500/20 text-sm font-mono text-purple-600 dark:text-red-400 mb-4">
              <MonitorPlay className="w-4 h-4" />
              <span>Cycle #35 Demo</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {t("cycle_context_title")}
            </h2>
            <p className="text-muted-foreground">{t("cycle_context_desc")}</p>
          </div>

          <ABTestShowcase locale={locale} />
        </div>

        {/* Multi-Agent CLI Workflow Section - Theme Aware */}
        <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-mono text-primary mb-4">
              <Terminal className="w-4 h-4" />
              <span>Claude Code CLI</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{t("multiagent_title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("multiagent_desc")}
            </p>
          </div>

          {/* NEW: Multi-Agent Workflow Diagram */}
          <div className="max-w-4xl mx-auto mb-12">
            <Diagram type="multi-agent-workflow" />
          </div>

          {/* CI/CD Pipeline */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/30 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{t("cicd_title")}</h3>
                    <p className="text-xs text-muted-foreground">
                      {t("cicd_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-border/30">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <code className="text-xs font-mono">
                      {t("cicd_precommit")}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      → {t("cicd_precommit_desc")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-border/30">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <code className="text-xs font-mono">
                      {t("cicd_github")}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      → {t("cicd_github_desc")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-green-500/30">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <code className="text-xs font-mono">
                      {t("cicd_verify")}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      → {t("cicd_verify_desc")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-purple-500/30">
                    <Shield className="w-3 h-3 text-purple-500" />
                    <code className="text-xs font-mono">
                      {t("cicd_dependabot")}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      → {t("cicd_dependabot_desc")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-orange-500/30">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <code className="text-xs font-mono">
                      {t("cicd_audit")}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      → {t("cicd_audit_desc")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tech Stack Grid - Enhanced */}
      <section className="w-full py-16 px-4 bg-gradient-to-b from-background to-slate-50/50 dark:to-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-mono text-blue-600 dark:text-blue-400 mb-4">
              <Server className="w-4 h-4" />
              <span>Full Stack</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{t("tech_stack_title")}</h2>
            <p className="text-muted-foreground">{t("tech_stack_desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/30"
              >
                {/* Gradient top border on hover */}
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                {/* Background icon */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity scale-150">
                  {tech.icon}
                </div>

                <div className="p-5">
                  <div className="flex flex-row items-center gap-3 mb-3">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${tech.color} text-white shadow-lg transition-transform group-hover:scale-110`}
                    >
                      {tech.icon}
                    </div>
                    <CardTitle className="text-base font-semibold">
                      {tech.name}
                    </CardTitle>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tech.desc}
                  </p>
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
          <h2 className="text-3xl font-bold">{t("workflow_title")}</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t("workflow_desc")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {["Plan", "Implement", "Validate", "Handoff"].map((step, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-center"
              >
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
          <h2 className="text-4xl font-bold">{t("join_us")}</h2>
          <p className="text-xl text-muted-foreground">{t("join_desc")}</p>
          <div className="pt-4">
            {user ? (
              <Link href="/">
                <Button
                  size="lg"
                  className="gap-2 text-lg px-8 h-12 rounded-full shadow-lg shadow-purple-500/20 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none transition-all"
                >
                  {t("hero_title")} <Rocket className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button
                  size="lg"
                  className="gap-2 text-lg px-8 h-12 rounded-full shadow-lg shadow-purple-500/20 bg-gradient-to-br from-purple-700 via-fuchsia-500 via-purple-400 to-purple-800 hover:opacity-90 text-white dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 border-none transition-all"
                >
                  {t("hero_title")} <Rocket className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
