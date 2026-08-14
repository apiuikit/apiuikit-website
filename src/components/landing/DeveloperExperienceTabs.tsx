"use client";

import { useState } from "react";

export type Tier = {
  id: string;
  label: string;
  description: string;
  /** Pre-highlighted HTML, generated on the server. */
  html: string;
};

export default function DeveloperExperienceTabs({ tiers }: { tiers: Tier[] }) {
  const [activeId, setActiveId] = useState(tiers[0].id);
  const active = tiers.find((tier) => tier.id === activeId) ?? tiers[0];

  return (
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
        {/* Shiki's own theme (github-dark, fixed regardless of the site's
            light/dark toggle) supplies the token colours; only its default
            block chrome — margin, radius, border, background, padding — is
            overridden here since the wrapper above already provides it. */}
        <div
          className="overflow-x-auto text-sm leading-relaxed font-mono [&_.dx-code]:m-0 [&_.dx-code]:rounded-none [&_.dx-code]:border-0 [&_.dx-code]:bg-[#0d1117] [&_.dx-code]:p-6"
          dangerouslySetInnerHTML={{ __html: active.html }}
        />
      </div>
    </div>
  );
}
