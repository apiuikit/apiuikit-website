import Link from "next/link";

/**
 * The rows the CLI prints inside its summary box after a successful generate.
 * The box itself is drawn with a real border rather than the CLI's box-drawing
 * glyphs: the ✔ is wider than one monospace cell in most fonts, so copying the
 * art verbatim leaves the right-hand edge a character out of line.
 */
const summaryRows: [string, string][] = [
  ["Spec type", "OpenAPI"],
  ["Title", "Swagger Petstore - OpenAPI 3.0"],
  ["Output", "apiuikit-docs"],
];

function Prompt({ children }: { children: string }) {
  return (
    <div className="whitespace-pre">
      <span className="text-brand-600">$ </span>
      <span className="text-ink">{children}</span>
    </div>
  );
}

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
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
              <Prompt>npx @apiuikit/cli generate ./openapi.yaml</Prompt>

              <div className="my-3 inline-block min-w-full rounded-md border border-chrome-border px-4 py-3">
                <div className="flex items-baseline gap-2 whitespace-pre text-emerald-600 dark:text-emerald-400">
                  <span aria-hidden>✔</span>
                  <span>Generated API documentation site</span>
                </div>
                <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-ink-faint">
                  {summaryRows.map(([label, value]) => (
                    <div key={label} className="col-span-2 grid grid-cols-subgrid">
                      <dt className="whitespace-pre">{label}</dt>
                      <dd className="whitespace-pre">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Prompt>npx @apiuikit/cli serve</Prompt>
              <div className="whitespace-pre text-ink-faint">
                Serving on http://127.0.0.1:4300
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
