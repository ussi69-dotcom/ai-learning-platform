"use client";

import React from 'react';
import { useLocale } from 'next-intl';

interface YouTubeProps {
  id: string;
  title: string;
  /** Force captions on with specific language (overrides locale detection) */
  captionLang?: string;
}

export const YouTube = ({ id, title, captionLang }: YouTubeProps) => {
  const locale = useLocale();

  // Build YouTube embed URL with caption parameters
  // cc_load_policy=1 forces captions on
  // cc_lang_pref sets preferred caption language
  // hl sets interface language
  const lang = captionLang || locale;
  const embedUrl = `https://www.youtube.com/embed/${id}?cc_load_policy=1&cc_lang_pref=${lang}&hl=${lang}`;

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl my-8 bg-black/50">
      <iframe
        className="w-full h-full"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
