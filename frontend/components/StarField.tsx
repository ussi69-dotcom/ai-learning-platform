"use client";

import { useEffect, useState } from "react";

/**
 * StarField - Animated cosmic background with parallax star layers
 *
 * Uses CSS-only parallax for performance (GPU accelerated).
 * Three layers with different speeds create depth illusion.
 * Respects prefers-reduced-motion for accessibility.
 */
export default function StarField() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className="star-field"
      aria-hidden="true"
      style={reducedMotion ? { animation: "none" } : undefined}
    >
      {/* Layer 1: Distant stars - slowest */}
      <div
        className="star-layer star-layer-1"
        style={reducedMotion ? { animation: "none" } : undefined}
      />

      {/* Layer 2: Mid-distance stars */}
      <div
        className="star-layer star-layer-2"
        style={reducedMotion ? { animation: "none" } : undefined}
      />

      {/* Layer 3: Near stars - fastest with twinkle */}
      <div
        className="star-layer star-layer-3"
        style={reducedMotion ? { animation: "none" } : undefined}
      />

      {/* Vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 50%,
              var(--background) 100%
            )
          `,
        }}
      />
    </div>
  );
}
