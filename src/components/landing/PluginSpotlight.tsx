import Link from "next/link";
import PluginShowcase from "@/components/demos/PluginShowcase";

export default function PluginSpotlight() {
  return (
    <section className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
              Plugins
            </p>
            <div className="mt-4 font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
              <h2 className="font-bold text-ink">Endless possibilities.</h2>
              <p className="text-ink-faint">
                Add your own custom functionality to the doc using plugins.
              </p>
            </div>
            <p className="mt-6 max-w-md text-sm text-ink-faint">
              Drop your own React components into operation tabs, inline
              beside the reference, or the document top bar. The red button is
              one — go on, press it.
            </p>

            {/* Inline color, not text-white — see Header.tsx's CTA for why. */}
            <Link
              href="/docs/plugins"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-3 text-sm font-medium transition-colors hover:bg-brand-700"
              style={{ color: "#ffffff" }}
            >
              Write a plugin
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
            <PluginShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
