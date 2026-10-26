"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import GitHubIcon from "./GitHubIcon";

export interface MobileMenuLink {
  label: string;
  href: string;
}

export default function MobileMenu({
  links,
  githubUrl,
}: {
  links: MobileMenuLink[];
  githubUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

  // Close on navigation. Adjusting state during render rather than in an
  // effect, so the old page's open panel never paints over the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-chrome-surface hover:text-ink"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          width={18}
          height={18}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Anchored to the sticky header (its nearest positioned ancestor), so
          the panel drops straight down from the bar's bottom rule. */}
      <nav
        id={panelId}
        aria-label="Site"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-chrome-border bg-chrome-bg shadow-lg"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-6 py-3">
          {links.map(({ label, href }) => {
            // Same rule as the footer: off-site links open in a new tab.
            const isExternal = href.startsWith("http");
            const isActive =
              !isExternal &&
              !href.includes("#") &&
              (pathname === href || pathname.startsWith(`${href}/`));
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition-colors hover:bg-chrome-surface"
                  {...(isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <span
                    className={
                      isActive ? "font-medium text-ink" : "text-ink-muted"
                    }
                  >
                    {label}
                  </span>
                  {isExternal && (
                    <span aria-hidden className="text-xs text-ink-faint">
                      ↗
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* The bar's CTA, moved here below md. Inline color for the same
            reason as in Header: apiuikit's unlayered `a { color: inherit }`
            beats Tailwind's text-white. */}
        <div className="mx-auto max-w-6xl px-6 pb-5">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-brand-700"
            style={{ color: "#ffffff" }}
          >
            <GitHubIcon className="h-4 w-4" />
            Star on GitHub
          </Link>
        </div>
      </nav>
    </div>
  );
}
