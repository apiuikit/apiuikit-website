"use client";

import { useEffect, useState } from "react";
import type { DocHeading } from "@/lib/docs";

export default function DocsToc({ headings }: { headings: DocHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const nodes = headings
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    // Headings are single lines, so "how much is visible" says nothing useful
    // here. Instead: watch a band just under the sticky header and treat the
    // lowest heading that has crossed it as the section you're reading.
    const observer = new IntersectionObserver(
      () => {
        const marker = 96;
        const passed = nodes.filter(
          (node) => node.getBoundingClientRect().top <= marker,
        );
        const current = passed.at(-1) ?? nodes[0];
        setActive(current.id);
      },
      { rootMargin: "-96px 0px 0px 0px", threshold: [0, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [headings]);

  function goTo(id: string) {
    setActive(id);
    // replaceState, not pushState: a pushed hash would need a popstate handler
    // to scroll back on Back, and it would bury the previous page under one
    // entry per heading read. This keeps the address bar shareable without
    // touching the history stack.
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    // No sticky here — the caller owns it, since only the grid item has the
    // height to stick within. This also renders inside a <details> on narrow
    // screens, where sticky would be wrong anyway.
    <nav aria-label="On this page">
      <p className="text-xs font-medium tracking-wide text-ink-faint uppercase">
        On this page
      </p>
      <ul className="mt-3 flex flex-col border-l border-chrome-border">
        {headings.map(({ id, text, depth }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              {/* button, not an anchor: apiuikit ships an unlayered
                  `a { color: inherit }` rule that would beat these colours. */}
              <button
                type="button"
                onClick={() => goTo(id)}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px block w-full cursor-pointer border-l-2 py-1.5 pr-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  depth === 3 ? "pl-7" : "pl-4"
                } ${
                  isActive
                    ? "border-brand-600 font-medium text-ink"
                    : "border-transparent text-ink-faint hover:border-chrome-border hover:text-ink"
                }`}
              >
                {text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
