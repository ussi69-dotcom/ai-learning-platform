"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Github, Heart, Info, Mail } from "lucide-react";

export default function Footer() {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-50/80 dark:bg-slate-950/90 border-slate-200 dark:border-slate-800 mt-auto">
      <div className="container mx-auto px-4 py-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-lg font-black bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-700 dark:from-red-600 dark:via-red-500 dark:to-red-800 bg-clip-text text-transparent"
            >
              AI Edutainment
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {locale === "cs"
                ? "Open-source AI vzdělávání tvořené lidmi a AI agenty společně."
                : "Open-source AI education created by humans and AI agents together."}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              {locale === "cs" ? "Odkazy" : "Links"}
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-red-500 transition-colors"
              >
                <Info size={16} />
                {locale === "cs" ? "O projektu" : "About"}
              </Link>
              <a
                href="https://github.com/Zimm01/ai-learning-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-red-500 transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="mailto:info@ai-edutainment.com"
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-red-500 transition-colors"
              >
                <Mail size={16} />
                {locale === "cs" ? "Kontakt" : "Contact"}
              </a>
            </nav>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              {locale === "cs" ? "Technologie" : "Tech Stack"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js 16", "Tailwind v4", "FastAPI", "PostgreSQL", "Docker", "Claude Opus 4.5", "Gemini 3 Pro", "GPT-5.2"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {currentYear} AI Edutainment.{" "}
            {locale === "cs"
              ? "Všechna práva vyhrazena."
              : "All rights reserved."}
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
            {locale === "cs" ? "Vytvořeno s" : "Made with"}
            <Heart size={12} className="text-red-500 fill-red-500" />
            {locale === "cs" ? "lidmi & AI" : "by humans & AI"}
          </p>
        </div>
      </div>
    </footer>
  );
}
