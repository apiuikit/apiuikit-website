"use client";

import { OpenAPI } from "apiuikit";
import type { ConfigInterface } from "apiuikit";
import { petstore } from "@/data/examples";

export default function ThemedDocumentImpl({
  theme,
}: {
  theme: ConfigInterface["theme"];
}) {
  return (
    <OpenAPI
      openapi={petstore}
      config={{
        theme,
        // Side panels stay clipped to the frame instead of covering the page.
        sidePanel: { containment: "component" },
        // The sidebar's scroll-spy spine, the search toggle, and the
        // Copy-as-Markdown menu are fixed to the viewport, so inside a
        // scrolling frame they'd drift over the rest of the page.
        show: { sidebar: false, search: false, copyMarkdown: false },
      }}
    />
  );
}
