import Link from "next/link";
import type { Metadata } from "next";
import OfficialBadge from "@/components/plugins/OfficialBadge";
import { getPublishedPlugins } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "Plugins | apiuikit",
  description:
    "Separately-installed plugins for apiuikit: OpenAPI Try it today, with an AsyncAPI plugin on the way.",
};

export default function PluginsIndexPage() {
  const plugins = getPublishedPlugins();

  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
        Plugins
      </p>
      <div className="mt-4 max-w-3xl font-display text-3xl leading-[1.25] tracking-tight text-pretty sm:text-4xl">
        <h1 className="font-bold text-ink">Add extra UI to a rendered document.</h1>
        <p className="text-ink-faint">
          Plugins are separately-installed packages that fill slots in an
          apiuikit document. Use a published one below, or read the{" "}
          <Link href="/docs/plugins">
            <span className="text-ink underline decoration-chrome-border underline-offset-2 hover:text-brand-600 hover:decoration-brand-600">
              plugin API
            </span>
          </Link>{" "}
          to write your own.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {plugins.map((plugin) => (
          <li key={plugin.slug}>
            <Link
              href={`/plugins/${plugin.slug}`}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface transition-colors hover:border-brand-300"
            >
              <div className="aspect-16/10 overflow-hidden border-b border-chrome-border bg-chrome-bg">
                {plugin.coverImage && (
                  <img
                    src={plugin.coverImage}
                    alt={plugin.coverAlt ?? plugin.name}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink">{plugin.name}</p>
                  {plugin.official && <OfficialBadge />}
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium tracking-wide text-brand-700 uppercase dark:bg-brand-700/20 dark:text-brand-300">
                    Available
                  </span>
                </div>
                {plugin.packageName && (
                  <p className="mt-1 font-mono text-xs text-ink-faint">
                    {plugin.packageName}
                  </p>
                )}
                <p className="mt-3 text-sm text-ink-faint">{plugin.summary}</p>
                <p className="mt-4 text-sm font-medium text-brand-600">
                  Read the docs →
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm text-ink-faint">
        Want to list your plugin here?{" "}
        <a href="mailto:ea.elegbede@gmail.com,mohdmehdi2003@gmail.com">
          <span className="underline decoration-chrome-border underline-offset-2 hover:text-ink hover:decoration-ink">
            Contact us
          </span>
        </a>
        .
      </p>
    </div>
  );
}
