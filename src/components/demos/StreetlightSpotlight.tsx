"use client";

import dynamic from "next/dynamic";

// See DeepDiveWidget.tsx for why this must be ssr:false (apiuikit bundles
// dompurify, which touches `self` at module scope and so throws during SSR).
const StreetlightSpotlightImpl = dynamic(
  () => import("./StreetlightSpotlightImpl"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] animate-pulse rounded-xl border border-chrome-border bg-chrome-surface" />
    ),
  },
);

export default function StreetlightSpotlight() {
  return <StreetlightSpotlightImpl />;
}
