"use client";

import dynamic from "next/dynamic";

// See DeepDiveWidget.tsx for why this must be ssr:false (apiuikit bundles
// dompurify, which touches `self` at module top level).
const CopyMarkdownTeaserImpl = dynamic(() => import("./CopyMarkdownTeaserImpl"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] animate-pulse rounded-xl border border-chrome-border bg-chrome-surface" />
  ),
});

export default function CopyMarkdownTeaser() {
  return <CopyMarkdownTeaserImpl />;
}
