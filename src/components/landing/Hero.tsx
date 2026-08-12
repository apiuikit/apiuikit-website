import Link from "next/link";
import InstallCommand from "@/components/landing/InstallCommand";

const PLAYGROUND_URL = "https://playground.apiuikit.com";

export default function Hero() {
  return (
    // isolate: the backdrop's -z-10 stays inside this section's stacking
    // context instead of sliding behind the page background.
    <section className="relative isolate overflow-hidden px-6 pt-20 pb-16 text-center sm:pt-28">
      <div
        aria-hidden
        className="grid-backdrop pointer-events-none absolute inset-0 -z-10"
      />
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">
          Interactive API docs, rendered from your spec.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-ink-muted">
          apiuikit is a React component library for AsyncAPI and OpenAPI
          documents. Drop in the whole documentation page, one section on its
          own, or compose exactly the pieces your layout needs. No manual
          mapping, no renderer to maintain.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 sm:flex-row">
          {/* Inline color, not text-white: apiuikit/style.css sets a plain
              `a { color: inherit }` rule that can outrank a Tailwind
              utility depending on stylesheet order. Inline style is the
              one thing that reliably wins here. */}
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-3 text-sm font-medium transition-colors hover:bg-brand-700"
            style={{ color: "#ffffff" }}
          >
            Explore docs
            {/* stroke="currentColor" picks up the inline white above. */}
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
          <Link
            href={PLAYGROUND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-chrome-border bg-chrome-surface px-8 py-3 text-sm font-medium text-ink transition-colors hover:border-brand-300"
          >
            Open playground ↗
          </Link>
        </div>

        <div className="mt-10">
          <InstallCommand />
        </div>
      </div>
    </section>
  );
}
