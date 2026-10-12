"use client";

import dynamic from "next/dynamic";

// See OperationsPreview.tsx for why this must be ssr:false (apiuikit bundles
// dompurify, which touches `self` at module top level).
const PluginShowcaseImpl = dynamic(() => import("./PluginShowcaseImpl"), {
  ssr: false,
  loading: () => <div className="h-56 animate-pulse bg-chrome-surface" />,
});

export default function PluginShowcase() {
  return <PluginShowcaseImpl />;
}
