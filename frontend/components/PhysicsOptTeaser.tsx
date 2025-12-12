"use client";

import { TrendingUp, ArrowRight, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function PhysicsOptTeaser() {
  const t = useTranslations('Home');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-12 mb-12">
      <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 dark:border-amber-500/30 bg-slate-50/80 dark:bg-slate-950/80 shadow-xl shadow-orange-900/10 dark:shadow-amber-900/10 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:border-orange-500/50 dark:hover:border-amber-500/50 group">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 dark:from-amber-600/5 via-transparent to-amber-600/5 dark:to-orange-600/5 pointer-events-none" />

        <div className="p-6 md:p-8 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* Left: Header & Metrics */}
          <div className="flex-1 w-full space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-white/10 shadow-md">
                <Zap className="w-6 h-6 text-orange-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold tracking-widest text-orange-600 dark:text-amber-400 uppercase mb-1">
                  {t('teaser2_title')}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {t('teaser2_subtitle')}
                </h3>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-200 dark:border-white/5 py-4">
              <div className="text-center md:text-left">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{t('teaser2_metric_fps')}</div>
                <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                  <span>+16%</span>
                </div>
              </div>
              <div className="text-center md:text-left border-l border-slate-200 dark:border-white/5 pl-4">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{t('teaser2_metric_dropped')}</div>
                <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-2xl font-bold text-slate-700 dark:text-slate-200">
                  <span className="text-red-600 dark:text-red-500">86</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-emerald-600 dark:text-emerald-400">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Description & CTA */}
          <div className="flex-1 w-full space-y-4">
            <h4 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              {t('teaser2_desc_title')}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('teaser2_desc')}
            </p>

            <div className="pt-2 flex justify-start">
              <Link href="/about#cycle-49">
                <Button className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-amber-700 dark:via-orange-600 dark:to-amber-800 hover:opacity-90 text-white border-0 shadow-lg shadow-orange-500/20 dark:shadow-amber-500/20 transition-all duration-300 group-hover:scale-105">
                  {t('teaser2_cta')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
