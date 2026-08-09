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
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-brand-600">Developer experience</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Three ways to use it
        </h2>
        <p className="mt-3 text-ink-muted">
          Start with the whole widget, drop down to one section, or compose
          several — the same API, at whatever granularity your layout needs.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setActiveId(tier.id)}
              aria-pressed={tier.id === activeId}
              className={`shrink-0 rounded-lg px-4 py-3 text-left transition-colors ${
                tier.id === activeId
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-muted hover:bg-chrome-surface"
              }`}
            >
              <p className="text-sm font-medium">{tier.label}</p>
              <p className="mt-0.5 hidden text-xs text-ink-faint lg:block">
                {tier.description}
              </p>
            </button>
          ))}
        </div>

        <pre className="overflow-x-auto rounded-xl bg-[#0d1117] p-6 text-sm leading-relaxed text-[#c9d1d9]">
          <code className="font-mono">{active.code}</code>
        </pre>
      </div>
    </section>
  );
}
