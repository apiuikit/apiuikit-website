"use client";

import dynamic from "next/dynamic";

// See DeepDiveWidget.tsx for why this must be ssr:false.
const SchemaTreePreviewImpl = dynamic(() => import("./SchemaTreePreviewImpl"), {
  ssr: false,
});

export default function SchemaTreePreview() {
  return <SchemaTreePreviewImpl />;
}
