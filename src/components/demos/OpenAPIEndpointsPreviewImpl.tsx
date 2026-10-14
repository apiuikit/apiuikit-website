"use client";

import { OpenAPIEndpoint } from "apiuikit";
import { petstore } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function OpenAPIEndpointsPreviewImpl() {
  const theme = useDemoTheme();
  return (
    // Inline detail with no side panel, same as OperationsPreviewImpl.
    <OpenAPIEndpoint
      document={petstore}
      operationId="addPet"
      config={{ theme, show: { tryIt: true } }}
    />
  );
}
