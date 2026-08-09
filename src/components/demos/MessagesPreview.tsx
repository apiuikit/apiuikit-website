"use client";

import dynamic from "next/dynamic";

// See DeepDiveWidget.tsx for why this must be ssr:false.
const MessagesPreviewImpl = dynamic(() => import("./MessagesPreviewImpl"), {
  ssr: false,
});

export default function MessagesPreview() {
  return <MessagesPreviewImpl />;
}
