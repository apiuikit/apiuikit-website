/** A verified mark for plugins published by the apiuikit team. Hover shows
 *  the explanation; the same phrase is in a visually-hidden label so the
 *  wrapping card link announces it to screen readers. */
export default function OfficialBadge() {
  return (
    <span className="group/official relative inline-flex shrink-0">
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="h-4 w-4 text-brand-600"
      >
        <circle cx="10" cy="10" r="10" fill="currentColor" />
        <path
          fill="#fff"
          d="M14.3 7.2a.75.75 0 0 0-1.1-1.02L8.7 11.1 6.8 9.2a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.14-.09l4.92-5.47Z"
        />
      </svg>
      <span className="sr-only">Official apiuikit plugin</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-10 mt-1.5 -translate-x-1/2 rounded-md border border-chrome-border bg-chrome-surface px-2 py-1 text-xs font-normal whitespace-nowrap text-ink opacity-0 shadow-sm transition-opacity group-hover/official:opacity-100"
      >
        Made by the apiuikit team
      </span>
    </span>
  );
}
