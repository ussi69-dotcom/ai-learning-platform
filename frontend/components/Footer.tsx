"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Github, Heart, Info, Mail } from "lucide-react";

export default function Footer() {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/80 border-border mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-lg font-black text-gradient"
            >
              AI Edutainment
            </Link>
            <p className="text-base text-foreground">
              {locale === "cs"
                ? "Open-source AI vzdělávání tvořené lidmi a AI agenty společně."
                : "Open-source AI education created by humans and AI agents together."}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              {locale === "cs" ? "Odkazy" : "Links"}
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="flex items-center gap-2 text-base text-foreground hover:text-primary transition-colors"
              >
                <Info size={16} />
                {locale === "cs" ? "O projektu" : "About"}
              </Link>
              <a
                href="https://github.com/Zimm01/ai-learning-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-foreground hover:text-primary transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="mailto:info@ai-edutainment.com"
                className="flex items-center gap-2 text-base text-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} />
                {locale === "cs" ? "Kontakt" : "Contact"}
              </a>
            </nav>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              {locale === "cs" ? "Technologie" : "Tech Stack"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js 16", "Tailwind v4", "FastAPI", "PostgreSQL", "Docker", "Claude Opus 4.5", "Gemini 3 Pro", "GPT-5.2"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-base font-semibold bg-muted text-foreground rounded-md"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base text-muted-foreground">
            © {currentYear} AI Edutainment.{" "}
            {locale === "cs"
              ? "Všechna práva vyhrazena."
              : "All rights reserved."}
          </p>
          <p className="flex items-center gap-1 text-base text-muted-foreground">
            {locale === "cs" ? "Vytvořeno s" : "Made with"}
            <Heart size={12} className="text-red-500 fill-red-500" />
            {locale === "cs" ? "lidmi & AI" : "by humans & AI"}
          </p>
        </div>
      </div>
    </footer>
  );
}
