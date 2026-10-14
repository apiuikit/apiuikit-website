"use client";

import { AsyncAPIOperation } from "apiuikit";
import { krakenWebsocket } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function OperationsPreviewImpl() {
  const theme = useDemoTheme();
  return (
    // A single operation renders its detail inline, with no list or side
    // panel, so unlike the full section it needs no min-height to open into.
    <AsyncAPIOperation
      document={krakenWebsocket}
      operationId="subscribe"
      config={{
        theme,
        // The point of the live spec: readers can connect and send frames.
        show: { tryIt: true },
      }}
    />
  );
}
