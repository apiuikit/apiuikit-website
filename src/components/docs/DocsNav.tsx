"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocMeta } from "@/lib/docs";

/** Same rail treatment as the landing page's component gallery: a hairline the
 *  list hangs off, with a brand accent marking the current page. */
export default function DocsNav({ docs }: { docs: DocMeta[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation">
      <p className="text-xs font-medium tracking-wide text-ink-faint uppercase lg:pl-4">
        Documentation
      </p>
      <ul className="mt-3 flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-x-visible lg:border-l lg:border-chrome-border">
        {docs.map(({ slug, title }) => {
          const href = `/docs/${slug}`;
          const isActive = pathname === href;
          return (
            <li key={slug} className="shrink-0">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                // The colour classes work here because .docs-nav-link is not
                // in play — these are Tailwind utilities on an <a>, which
                // apiuikit's unlayered `a { color: inherit }` would beat, so
                // the colour lives on the inner span instead.
                className={`block w-full rounded-r-md border-l-2 py-2.5 pr-4 pl-4 text-sm whitespace-nowrap transition-colors lg:-ml-px ${
                  isActive
                    ? "border-brand-600 bg-chrome-surface"
                    : "border-transparent hover:border-chrome-border hover:bg-chrome-surface"
                }`}
              >
                <span
                  className={
                    isActive ? "font-medium text-ink" : "text-ink-faint"
                  }
                >
                  {title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
