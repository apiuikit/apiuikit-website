"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PluginCatalogEntry } from "@/lib/plugins";

export default function PluginsNav({
  plugins,
}: {
  plugins: PluginCatalogEntry[];
}) {
  const pathname = usePathname();
  const overviewActive = pathname === "/plugins";

  return (
    <nav aria-label="Plugins">
      <p className="text-xs font-medium tracking-wide text-ink-faint uppercase lg:pl-4">
        Plugins
      </p>
      <ul className="mt-3 flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-x-visible lg:border-l lg:border-chrome-border">
        <li className="shrink-0">
          <Link
            href="/plugins"
            aria-current={overviewActive ? "page" : undefined}
            className={`block w-full rounded-r-md border-l-2 py-2.5 pr-4 pl-4 text-sm whitespace-nowrap transition-colors lg:-ml-px ${
              overviewActive
                ? "border-brand-600 bg-chrome-surface"
                : "border-transparent hover:border-chrome-border hover:bg-chrome-surface"
            }`}
          >
            <span
              className={
                overviewActive ? "font-medium text-ink" : "text-ink-faint"
              }
            >
              All plugins
            </span>
          </Link>
        </li>
        {plugins.map(({ slug, name, status }) => {
          const href = `/plugins/${slug}`;
          const isActive = pathname === href;
          const isComingSoon = status === "coming-soon";

          if (isComingSoon) {
            return (
              <li key={slug} className="shrink-0">
                <span className="block w-full rounded-r-md border-l-2 border-transparent py-2.5 pr-4 pl-4 text-sm whitespace-nowrap text-ink-faint lg:-ml-px">
                  {name}
                  <span className="ml-2 text-xs tracking-wide uppercase">
                    Soon
                  </span>
                </span>
              </li>
            );
          }

          return (
            <li key={slug} className="shrink-0">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`block w-full rounded-r-md border-l-2 py-2.5 pr-4 pl-4 text-sm whitespace-nowrap transition-colors lg:-ml-px ${
                  isActive
                    ? "border-brand-600 bg-chrome-surface"
                    : "border-transparent hover:border-chrome-border hover:bg-chrome-surface"
                }`}
              >
                <span
                  className={isActive ? "font-medium text-ink" : "text-ink-faint"}
                >
                  {name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
