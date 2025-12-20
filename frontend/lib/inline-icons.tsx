import React from "react";
import {
  Bot,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle,
  Clock,
  FlaskConical,
  Gem,
  GitMerge,
  Lightbulb,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

const INLINE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "🤖": Bot,
  "⏳": Clock,
  "🧪": FlaskConical,
  "🧠": Brain,
  "⚡": Zap,
  "⚡️": Zap,
  "🔌": Zap,
  "🔬": FlaskConical,
  "💡": Lightbulb,
  "🍳": Sparkles,
  "🛡": Shield,
  "🛡️": Shield,
  "💥": Zap,
  "📌": Target,
  "📊": TrendingUp,
  "🏗️": Briefcase,
  "🔒": Shield,
  "📈": TrendingUp,
  "🚀": Rocket,
  "🎓": BookOpen,
  "🔮": Sparkles,
  "💎": Gem,
  "🔑": Target,
  "🎯": Target,
  "✅": CheckCircle,
  "🏢": Briefcase,
  "📚": BookOpen,
  "🆚": GitMerge,
};

const iconTokens = Object.keys(INLINE_ICON_MAP);
const iconRegex = new RegExp(
  `(${iconTokens
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "gu"
);

export const renderTextWithIcons = (
  text: string,
  keyPrefix: string
): React.ReactNode[] => {
  if (!text) return [text];
  if (!iconTokens.length) return [text];

  return text.split(iconRegex).map((part, idx) => {
    const Icon = INLINE_ICON_MAP[part];
    if (Icon) {
      return (
        <span
          key={`${keyPrefix}-icon-${idx}`}
          className="inline-flex align-middle text-primary/80"
        >
          <Icon className="w-[1em] h-[1em]" />
        </span>
      );
    }
    return part;
  });
};

export const InlineIconText = ({
  text,
  className,
  prefix = "inline",
}: {
  text: string;
  className?: string;
  prefix?: string;
}) => <span className={className}>{renderTextWithIcons(text, prefix)}</span>;
