import type { ReactNode } from "react";
import Link from "next/link";

const GITHUB_URL = "https://github.com/AceTheCreator/apiuikit";
const WEB_COMPONENT_NPM_URL =
  "https://www.npmjs.com/package/@apiuikit/web-component";

const points: { title: string; description: ReactNode }[] = [
  {
    title: "Drop into an existing page",
    description:
      "No rewrite required: render one section standalone inside a page you already have, then add more as you need them.",
  },
  {
    title: "Not just React",
    description: (
      <>
        <Link
          href={WEB_COMPONENT_NPM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.95em] text-brand-600 underline underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-300"
        >
          @apiuikit/web-component
        </Link>{" "}
        bundles React internally and exposes plain custom elements for Vue,
        Angular, Svelte, or vanilla HTML.
      </>
    ),
  },
  {
    title: "Full TypeScript support",
    description:
      "Every component, config option, and helper is fully typed, including the AsyncAPI and OpenAPI document shapes themselves.",
  },
];

export default function Adoption() {
  return (
    // Its own top rule: the section before it has no bottom border, and every
    // section boundary on the page is a hairline.
    <section className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
          Getting it in
        </p>
        <div className="mt-4 max-w-4xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
          <h2 className="font-bold text-ink">Incremental, not all-or-nothing.</h2>
          <p className="text-ink-faint">
            Render one section inside a page you already have and ship it.
            Add the rest whenever you want them, or never.
          </p>
        </div>

        {/* divide-x for the internal verticals, border-t for the rule they
            terminate against — the stats row's construction. */}
        <div className="mt-14 grid grid-cols-1 border-t border-chrome-border sm:grid-cols-3 sm:divide-x sm:divide-chrome-border">
          {points.map(({ title, description }) => (
            <div
              key={title}
              className="border-t border-chrome-border py-8 first:border-t-0 sm:border-t-0 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <h3 className="font-medium text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink-faint">{description}</p>
            </div>
          ))}
        </div>

        {/* Inline color, not text-white — see Header.tsx's CTA for why. */}
        <Link
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-3 text-sm font-medium transition-colors hover:bg-brand-700"
          style={{ color: "#ffffff" }}
        >
          Go to the repo
          {/* Matches the hero CTA's arrow. */}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8h11M9.5 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
