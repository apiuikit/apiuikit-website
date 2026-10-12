"use client";

import dynamic from "next/dynamic";

// apiuikit bundles dompurify, which does an unconditional
// `self.DOMPurify || (self.DOMPurify = ...)` at module top level — `self`
// doesn't exist in Node's SSR environment, so merely importing "apiuikit"
// anywhere in the server render path throws, even from a 'use client' file
// (App Router still SSRs client components for the initial HTML). `ssr:
// false` keeps the import client-only. No loading fallback
// needed — PreviewCard's own bordered frame already fills the card while
// this chunk loads.
const OperationsPreviewImpl = dynamic(() => import("./OperationsPreviewImpl"), {
  ssr: false,
});

export default function OperationsPreview() {
  return <OperationsPreviewImpl />;
}
