import Link from "next/link";

/**
 * Trimmed from a real `apiuikit generate` run: the box is drawn by the CLI
 * itself, so the glyphs are copied rather than approximated.
 */
const lines: { prompt?: boolean; text: string; tone?: "ok" | "dim" }[] = [
  { prompt: true, text: "npx @apiuikit/cli generate ./openapi.yaml" },
  { text: "╭───────────────────────────────────────────╮", tone: "dim" },
  { text: "│ ✔ Generated API documentation site        │", tone: "ok" },
  { text: "│                                           │", tone: "dim" },
  { text: "│ Spec type  OpenAPI                        │", tone: "dim" },
  { text: "│ Title      Swagger Petstore - OpenAPI 3.0 │", tone: "dim" },
  { text: "│ Output     apiuikit-docs                  │", tone: "dim" },
  { text: "╰───────────────────────────────────────────╯", tone: "dim" },
  { prompt: true, text: "npx @apiuikit/cli serve" },
  { text: "Serving on http://127.0.0.1:4300", tone: "dim" },
];

export default function CliSpotlight() {
  return (
    <section className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
              No build step
            </p>
            <div className="mt-4 font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
              <h2 className="font-bold text-ink">
                apiuikit from your terminal.
              </h2>
              <p className="text-ink-faint">
                Generate or serve API documentation directly from an AsyncAPI or
                OpenAPI document, without wiring up a React app.
              </p>
            </div>
            <p className="mt-6 max-w-md text-sm text-ink-faint">
              One command turns a spec file into a static site you can open from
              disk or publish anywhere — built for Spring, Go, and Python
              services, docs-only repos, and CI pipelines.
            </p>

            {/* Inline color, not text-white — see Header.tsx's CTA for why. */}
            <Link
              href="/docs/cli"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-3 text-sm font-medium transition-colors hover:bg-brand-700"
              style={{ color: "#ffffff" }}
            >
              Explore the CLI
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

          <div className="overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-chrome-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
            </div>
            {/* The CLI's box art only lines up at a fixed advance width, so the
                block scrolls on narrow screens rather than wrapping. */}
            <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
              <code>
                {lines.map(({ prompt, text, tone }, index) => (
                  <span key={index} className="block whitespace-pre">
                    {prompt && <span className="text-brand-600">$ </span>}
                    <span
                      className={
                        tone === "ok"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : tone === "dim"
                            ? "text-ink-faint"
                            : "text-ink"
                      }
                    >
                      {text}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
