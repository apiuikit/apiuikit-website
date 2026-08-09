"use client";

import dynamic from "next/dynamic";

// See DeepDiveWidget.tsx for why this must be ssr:false.
const InfoPreviewImpl = dynamic(() => import("./InfoPreviewImpl"), {
  ssr: false,
});

export default function InfoPreview() {
  return <InfoPreviewImpl />;
}
