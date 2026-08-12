"use client";

import { OpenAPIEndpoints } from "apiuikit";
import { petstore } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";
import { HEADER_HEIGHT } from "@/lib/layout";

export default function OpenAPIEndpointsPreviewImpl() {
  const theme = useDemoTheme();
  return (
    // Same reasoning as OperationsPreviewImpl: the min-height gives the
    // component-contained side panel somewhere to open into.
    <div className="flex min-h-[34rem] flex-col [&>*]:flex-1">
      <OpenAPIEndpoints
        document={petstore}
        config={{
          theme,
          // Clears the site's sticky navbar.
          sidePanel: { containment: "component", topOffset: HEADER_HEIGHT },
        }}
        layout="stacked"
      />
    </div>
  );
}
