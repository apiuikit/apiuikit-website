"use client";

import { useState } from "react";
import DeepDiveWidget from "./DeepDiveWidget";

const TABS = [
  {
    id: "widget",
    label: "Petstore API",
    caption:
      "One OpenAPI file, rendered as a page you can browse: every endpoint grouped under its path, with parameters, responses, and ready-made request samples. Click an endpoint to open its details.",
  },
  {
    id: "markdown",
    label: "Copy for LLM",
    caption:
      "The same API, written out as plain text an AI assistant can read. One click copies the whole thing, and apiuikit can publish it alongside your docs so crawlers and agents find it on their own.",
  },
];

export default function ShowcaseTabs({
  markdownHtml,
}: {
  /** Pre-highlighted Markdown export, generated on the server. */
  markdownHtml: string;
}) {
  const [active, setActive] = useState(TABS[0].id);
  // Mount the widget tab on first visit and leave it mounted, so switching
  // back and forth doesn't re-parse the document.
  const [mounted, setMounted] = useState<string[]>([TABS[0].id]);

  function show(id: string) {
    setActive(id);
    setMounted((current) => (current.includes(id) ? current : [...current, id]));
  }

  const caption = TABS.find((tab) => tab.id === active)?.caption;

  return (
    // min-w-0 so this can be narrower than its widest child; without it the
    // Markdown panel sets the floor for the whole column.
    <div className="min-w-0">
      <div className="overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface shadow-sm">
        {/* Window chrome, same construction as the preview cards: dots, then
            tabs. Here the tabs are real controls rather than a static label. */}
        <div
          role="tablist"
          aria-label="Demo"
          className="no-scrollbar flex items-end gap-3 overflow-x-auto border-b border-chrome-border bg-chrome-bg pt-2.5 pl-4"
        >
          <span
            aria-hidden
            className="flex shrink-0 items-center gap-1.5 pb-2.5"
          >
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>

          {TABS.map(({ id, label }) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => show(id)}
                // -mb-px lays the active tab over the bar's bottom border so
                // it reads as continuous with the panel below it.
                className={`-mb-px shrink-0 cursor-pointer rounded-t-md border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  isActive
                    ? "border-chrome-border border-b-transparent bg-chrome-surface text-ink"
                    : "border-transparent text-ink-faint hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Inline display, not a utility class: this has to beat whatever
            display utility the panel's own wrapper carries. */}
        {mounted.includes("widget") && (
          <div style={{ display: active === "widget" ? undefined : "none" }}>
            <DeepDiveWidget />
          </div>
        )}

        <div
          style={{ display: active === "markdown" ? undefined : "none" }}
          className="h-[560px] min-w-0 overflow-auto bg-chrome-surface"
        >
          {/* [&_.shiki]:border-0 strips the standalone block's own frame — the
              tabbed window already provides one. */}
          <div
            className="[&_.shiki]:m-0 [&_.shiki]:rounded-none [&_.shiki]:border-0"
            dangerouslySetInnerHTML={{ __html: markdownHtml }}
          />
        </div>
      </div>

      {/* Rendered only when the active tab has one, so the widget tab doesn't
          reserve an empty strip below the frame.

          The negative margin cancels the cell's own padding so the rule runs
          wall to wall between the section's verticals, the way every other
          divider on the page does, while the text stays on the same measure
          as the frame above it. */}
      {caption && (
        <p className="mt-8 border-t border-chrome-border pt-6 text-sm text-ink-faint lg:-mx-10 lg:px-10">
          {caption}
        </p>
      )}
    </div>
  );
}
