"use client";

import dynamic from "next/dynamic";

// See DeepDiveWidget.tsx for why this must be ssr:false (apiuikit bundles
// dompurify, which touches `self` at module top level). No loading fallback
// needed — PreviewCard's own bordered frame already fills the card while
// this chunk loads.
const OperationsPreviewImpl = dynamic(() => import("./OperationsPreviewImpl"), {
  ssr: false,
});

export default function OperationsPreview() {
  return <OperationsPreviewImpl />;
}
