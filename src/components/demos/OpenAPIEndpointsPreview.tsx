"use client";

import dynamic from "next/dynamic";

// See DeepDiveWidget.tsx for why this must be ssr:false (apiuikit bundles
// dompurify, which touches `self` at module top level).
const OpenAPIEndpointsPreviewImpl = dynamic(() => import("./OpenAPIEndpointsPreviewImpl"), {
  ssr: false,
});

export default function OpenAPIEndpointsPreview() {
  return <OpenAPIEndpointsPreviewImpl />;
}
