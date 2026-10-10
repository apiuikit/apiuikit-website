/** Marks a plugin that ships with apiuikit itself. Hover shows how to turn
 *  it on; the same phrase is in a visually-hidden label so the wrapping card
 *  link announces it to screen readers. */
export default function DefaultBadge() {
  return (
    <span className="group/default relative inline-flex shrink-0">
      <span
        aria-hidden
        className="rounded-full border border-chrome-border px-2 py-0.5 text-[11px] font-medium tracking-wide text-ink-muted uppercase"
      >
        Default
      </span>
      <span className="sr-only">
        Built into apiuikit, enabled with show.tryIt
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-10 mt-1.5 -translate-x-1/2 rounded-md border border-chrome-border bg-chrome-surface px-2 py-1 text-xs font-normal tracking-normal whitespace-nowrap text-ink normal-case opacity-0 shadow-sm transition-opacity group-hover/default:opacity-100"
      >
        Built into apiuikit — turn on with{" "}
        <code className="font-mono">show.tryIt</code>
      </span>
    </span>
  );
}
