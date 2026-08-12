"use client";

import { OpenAPIEndpoints } from "apiuikit";
import { petstore } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function OpenAPIEndpointsPreviewImpl() {
  const theme = useDemoTheme();
  return (
    // Same reasoning as OperationsPreviewImpl: the min-height gives the
    // component-contained side panel somewhere to open into.
    <div className="flex min-h-[34rem] flex-col [&>*]:flex-1">
      <OpenAPIEndpoints
        document={petstore}
        config={{ theme, sidePanel: { containment: "component" } }}
        layout="stacked"
      />
    </div>
  );
}
