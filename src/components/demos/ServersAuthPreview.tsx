"use client";

import dynamic from "next/dynamic";

// See OperationsPreview.tsx for why this must be ssr:false.
const ServersAuthPreviewImpl = dynamic(() => import("./ServersAuthPreviewImpl"), {
  ssr: false,
});

export default function ServersAuthPreview() {
  return <ServersAuthPreviewImpl />;
}
