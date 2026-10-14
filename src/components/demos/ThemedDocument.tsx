"use client";

import dynamic from "next/dynamic";
import type { ConfigInterface } from "apiuikit";

// See OperationsPreview.tsx for why this must be ssr:false (apiuikit bundles
// dompurify, which touches `self` at module top level). The type import above
// is erased at build time, so it doesn't pull the bundle into the server.
const ThemedDocumentImpl = dynamic(() => import("./ThemedDocumentImpl"), {
  ssr: false,
});

export default function ThemedDocument(props: {
  theme: ConfigInterface["theme"];
}) {
  return <ThemedDocumentImpl {...props} />;
}
