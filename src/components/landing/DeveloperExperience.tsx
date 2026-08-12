"use client";

import { useState } from "react";

// Code verbatim from apiuikit/README.md — the same "three ways to use it"
// story as packages/lib/src/stories/Introduction.mdx.
const tiers = [
  {
    id: "widget",
    label: "The whole widget",
    description:
      "The fastest path: hand it a document, get a full documentation page.",
    code: `import { AsyncAPI } from "apiuikit";
import "apiuikit/style.css";
import doc from "./asyncapi.json";

export default function App() {
  return <AsyncAPI asyncapi={doc} />;
}`,
  },
  {
    id: "section",
    label: "One section, standalone",
    description:
      "Prefer your own layout? Render a single section on its own.",
    code: `import { Operations } from "apiuikit";
import doc from "./asyncapi.json";

export default function OperationsPage() {
  return <Operations document={doc} layout="stacked" />;
}`,
  },
  {
    id: "composed",
    label: "Several sections, composed",
    description:
      "Arrange multiple sections in a custom layout, sharing one resolved document.",
    code: `import { AsyncAPIProvider, Servers, Operations, Schemas } from "apiuikit";

export default function CustomLayout() {
  return (
    <AsyncAPIProvider document={doc}>
      <Servers />
      <Operations layout="stacked" />
      <Schemas layout="stacked" />
    </AsyncAPIProvider>
  );
}`,
  },
];

export default function DeveloperExperience() {
  const [activeId, setActiveId] = useState(tiers[0].id);
  const active = tiers.find((tier) => tier.id === activeId) ?? tiers[0];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
        How you use it
      </p>
      <div className="mt-4 max-w-4xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
        <h2 className="font-bold text-ink">Three ways to use it.</h2>
        <p className="text-ink-faint">
          Start with the whole widget, drop down to a single section, or
          compose several. Same API, whatever granularity your layout needs.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Same rail treatment as the component gallery's nav: a hairline the
            list hangs off, with a brand accent marking the active row. */}
        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:border-l lg:border-chrome-border">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setActiveId(tier.id)}
              aria-pressed={tier.id === activeId}
              className={`shrink-0 cursor-pointer rounded-r-md border-l-2 px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:-ml-px ${
                tier.id === activeId
                  ? "border-brand-600 bg-chrome-surface text-ink"
                  : "border-transparent text-ink-muted hover:border-chrome-border hover:bg-chrome-surface"
              }`}
            >
              <p className="text-sm font-medium">{tier.label}</p>
              <p className="mt-0.5 text-xs text-ink-faint max-lg:hidden">
                {tier.description}
              </p>
            </button>
          ))}
        </div>

        {/* Deliberately dark in both themes, the way a code block usually is,
            with a mock chrome bar so it reads as an editor rather than a slab. */}
        <div className="overflow-hidden rounded-xl border border-chrome-border">
          <div className="flex items-center gap-1.5 border-b border-[#30363d] bg-[#161b22] px-4 py-2.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-[#6e7681]">
              {active.id}.tsx
            </span>
          </div>
          <pre className="overflow-x-auto bg-[#0d1117] p-6 text-sm leading-relaxed text-[#c9d1d9]">
            <code className="font-mono">{active.code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
