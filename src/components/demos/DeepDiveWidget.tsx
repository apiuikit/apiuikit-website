"use client";

import dynamic from "next/dynamic";

// apiuikit bundles dompurify, which does an unconditional
// `self.DOMPurify || (self.DOMPurify = ...)` at module top level — `self`
// doesn't exist in Node's SSR environment, so merely importing "apiuikit"
// anywhere in the server render path throws, even from a 'use client' file
// (App Router still SSRs client components for the initial HTML). `ssr:
// false` keeps the import client-only; the frame below renders on the
// server so there's no layout shift while the client chunk loads.
const DeepDiveWidgetImpl = dynamic(() => import("./DeepDiveWidgetImpl"), {
  ssr: false,
  loading: () => (
    <div className="h-[640px] animate-pulse rounded-xl border border-chrome-border bg-chrome-surface" />
  ),
});

export default function DeepDiveWidget() {
  return <DeepDiveWidgetImpl />;
}
