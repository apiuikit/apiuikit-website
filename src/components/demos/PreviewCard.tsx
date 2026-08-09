import type { ReactNode } from "react";

interface PreviewCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * A real, live, clickable apiuikit component — not a screenshot. Renders at
 * its natural size (no scale-down, no height cap): one per row, taking
 * whatever space the component actually needs.
 */
export default function PreviewCard({ title, description, children }: PreviewCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-medium text-ink">{title}</h3>
        <p className="mt-1 text-sm text-ink-faint">{description}</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface shadow-sm">
        {children}
      </div>
    </div>
  );
}
