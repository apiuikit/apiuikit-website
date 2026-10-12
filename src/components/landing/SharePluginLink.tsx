"use client";

import { useSharePluginLink } from "@/components/demos/useSharePluginLink";

export default function SharePluginLink() {
  const { share, copied } = useSharePluginLink(
    "There's a red button on the apiuikit homepage. Press it.",
  );

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share this section"
      title={copied ? "Link copied!" : "Share this section"}
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-chrome-surface hover:text-ink"
    >
      {copied ? (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8.5l3 3 7-7" />
        </svg>
      ) : (
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
          <path d="M8 10V2M5 5l3-3 3 3M3.5 8v4.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V8" />
        </svg>
      )}
      {/* The icon swap is visual only; this tells screen readers too. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </button>
  );
}
