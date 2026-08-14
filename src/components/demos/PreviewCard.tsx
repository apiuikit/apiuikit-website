import type { ReactNode } from "react";

interface PreviewCardProps {
  /** Short name, shown in the frame's tab. */
  title: string;
  /** The bold opening line. Still an <h3> — it's the section's heading, just
   *  written and set as a sentence rather than a label. */
  statement: string;
  /** Continuation in muted grey at the same size, so the two read as one
   *  paragraph with the first sentence emphasised. */
  body: string;
  children: ReactNode;
}

/**
 * A real, live, clickable apiuikit component — not a screenshot. Renders at
 * its natural size (no scale-down, no height cap): one per row, taking
 * whatever space the component actually needs.
 */
export default function PreviewCard({
  title,
  statement,
  body,
  children,
}: PreviewCardProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* One type size, one leading, one family across both lines — the only
          thing separating them is weight and colour. */}
      <div className="max-w-4xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
        <h3 className="font-bold text-ink">{statement}</h3>
        <p className="text-ink-faint">{body}</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface shadow-sm">
        {/* Window chrome: dots, then a tab carrying the component's name. The
            bar sits on chrome-bg so the tab, which is chrome-surface like the
            widget below it, reads as the sheet in front. */}
        <div className="flex items-end gap-3 border-b border-chrome-border bg-chrome-bg pt-2.5 pl-4">
          <span aria-hidden className="flex shrink-0 items-center gap-1.5 pb-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          {/* -mb-px pulls the tab over the bar's bottom border, and the
              transparent bottom edge lets the tab read as continuous with the
              widget rather than boxed off from it. */}
          <span className="-mb-px rounded-t-md border border-b-transparent border-chrome-border bg-chrome-surface px-3 py-1.5 text-xs font-medium text-ink">
            {title}
          </span>
        </div>
        {/* One inset for all six previews. The widgets render flush to their
            own root otherwise, and apiuikit's own p-2 is not enough to keep
            content off the frame. */}
        <div className="overflow-x-auto p-4">{children}</div>
      </div>
    </div>
  );
}
