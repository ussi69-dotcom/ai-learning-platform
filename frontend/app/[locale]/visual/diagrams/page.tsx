"use client";

import Diagram, { DIAGRAM_TYPES } from "@/components/mdx/Diagram";

export default function DiagramGalleryPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Diagram Gallery</h1>
          <p className="text-sm text-slate-300">
            Internal visual QA page for mobile diagram rendering checks.
          </p>
        </header>
        <div className="grid gap-8">
          {DIAGRAM_TYPES.map((type) => (
            <section
              key={type}
              data-diagram={type}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg"
            >
              <div
                data-diagram-label
                className="text-xs uppercase tracking-[0.2em] text-slate-400"
              >
                {type}
              </div>
              <div data-diagram-content className="mt-3">
                <Diagram type={type} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
