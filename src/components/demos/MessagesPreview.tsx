"use client";

import dynamic from "next/dynamic";

// See OperationsPreview.tsx for why this must be ssr:false.
const MessagesPreviewImpl = dynamic(() => import("./MessagesPreviewImpl"), {
  ssr: false,
});

export default function MessagesPreview() {
  return <MessagesPreviewImpl />;
}
