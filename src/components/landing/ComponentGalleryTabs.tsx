"use client";

import Link from "next/link";
import { useState, type ComponentType, type ReactNode } from "react";
import OperationsPreview from "@/components/demos/OperationsPreview";
import OpenAPIEndpointsPreview from "@/components/demos/OpenAPIEndpointsPreview";
import ServersAuthPreview from "@/components/demos/ServersAuthPreview";
import MessagesPreview from "@/components/demos/MessagesPreview";
import SchemaTreePreview from "@/components/demos/SchemaTreePreview";

export type GalleryItem = {
  id: string;
  title: string;
  statement: string;
  body: string;
  /** Pre-highlighted HTML, generated on the server. */
  html: string;
};

// Kept on this side of the boundary: component references can't be passed as
// props from the server component that owns the copy.
const PREVIEWS: Record<string, ComponentType> = {
  operations: OperationsPreview,
  endpoints: OpenAPIEndpointsPreview,
  servers: ServersAuthPreview,
  messages: MessagesPreview,
  schemas: SchemaTreePreview,
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ICONS: Record<string, ReactNode> = {
  operations: (
    <Icon>
      <path d="M9 1.5 3.5 9H8l-1 5.5L12.5 7H8l1-5.5z" />
    </Icon>
  ),
  endpoints: (
    <Icon>
      <path d="M2.5 5h11M10.5 2l3 3-3 3M13.5 11h-11M5.5 8l-3 3 3 3" />
    </Icon>
  ),
  servers: (
    <Icon>
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </Icon>
  ),
  messages: (
    <Icon>
      <path d="M5.5 2.5c-1.5 0-2 .7-2 2V6c0 1-.5 2-1.5 2 1 0 1.5 1 1.5 2v1.5c0 1.3.5 2 2 2M10.5 2.5c1.5 0 2 .7 2 2V6c0 1 .5 2 1.5 2-1 0-1.5 1-1.5 2v1.5c0 1.3-.5 2-2 2" />
    </Icon>
  ),
  schemas: (
    <Icon>
      <rect x="1.5" y="1.5" width="5" height="3" rx="1" />
      <rect x="8.5" y="6.5" width="6" height="3" rx="1" />
      <rect x="8.5" y="11.5" width="6" height="3" rx="1" />
      <path d="M4 4.5V13h4.5M4 8h4.5" />
    </Icon>
  ),
};

export default function ComponentGalleryTabs({
  items,
}: {
  items: GalleryItem[];
}) {
  const [activeId, setActiveId] = useState(items[0].id);
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const Preview = PREVIEWS[active.id];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      {/* top-24 clears the sticky site header; the right column is far taller
          than this one, so the tiles stay in reach while you read a preview. */}
      <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
          Build your own
        </p>
        <h2 className="mt-4 font-display text-3xl leading-[1.15] font-bold tracking-tight text-pretty text-ink sm:text-4xl">
          <span className="text-brand-600">10+</span> building block sections,
          straight from your spec
        </h2>
        <p className="mt-3 text-ink-faint text-pretty">
          Use any of them into your own pages on their own.
        </p>

        <div
          role="group"
          aria-label="Build your own"
          className="mt-8 grid grid-cols-2 gap-3"
        >
          {items.map(({ id, title }) => {
            const isActive = id === activeId;
            return (
              // button, not an anchor: apiuikit ships an unlayered
              // `a { color: inherit }` rule that would beat the text colours.
              <button
                key={id}
                type="button"
                onClick={() => setActiveId(id)}
                aria-pressed={isActive}
                aria-controls="component-gallery-preview"
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  isActive
                    ? "border-brand-600 bg-brand-600/10 text-ink"
                    : "border-chrome-border bg-chrome-surface text-ink-muted hover:border-ink-faint hover:text-ink"
                }`}
              >
                <span className={isActive ? "text-brand-600" : "text-ink-faint"}>
                  {ICONS[id]}
                </span>
                {title}
              </button>
            );
          })}
          <Link
            href="/docs/sections"
            className="flex items-center gap-3 rounded-lg border border-dashed border-chrome-border px-4 py-3.5 text-sm font-medium transition-colors duration-150 hover:border-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            // Inline colour: apiuikit's unlayered `a { color: inherit }` would
            // otherwise beat a text-* utility here.
            style={{ color: "var(--color-brand-600)" }}
          >
            <Icon>
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 5v6M5 8h6" />
            </Icon>
            Much more
            <Icon>
              <path d="M6 4l4 4-4 4" />
            </Icon>
          </Link>
        </div>

        {/* The active tile's pitch. aria-live so switching tiles is announced
            along with the preview it brings in. */}
        <div aria-live="polite" className="mt-8 border-l-2 border-brand-600 pl-4">
          <h3 className="font-medium text-ink">{active.statement}</h3>
          <p className="mt-1 text-sm text-ink-faint">{active.body}</p>
        </div>
      </div>

      <div
        id="component-gallery-preview"
        className="min-w-0 overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface shadow-sm"
      >
        {/* Fixed height so the panel doesn't jump as tiles switch between
            short and tall widgets; 34rem also matches the min-height the
            operations and endpoints previews give their side panels. Keyed so
            each preview mounts fresh rather than inheriting scroll position. */}
        <div key={active.id} className="h-[34rem] overflow-auto p-4">
          <Preview />
        </div>

        <div className="border-t border-chrome-border">
          <div className="flex items-center justify-between gap-3 border-b border-chrome-border bg-chrome-bg px-4 py-2">
            <span className="font-mono text-xs text-ink-faint">
              {active.id}.tsx
            </span>
            <span className="rounded-full border border-brand-600/40 bg-brand-600/10 px-2.5 py-0.5 text-xs font-medium text-brand-600">
              {active.title}
            </span>
          </div>
          {/* `dx-block` strips shiki's prose chrome; see globals.css. */}
          <div
            className="dx-block overflow-x-auto font-mono text-sm"
            dangerouslySetInnerHTML={{ __html: active.html }}
          />
        </div>
      </div>
    </div>
  );
}
