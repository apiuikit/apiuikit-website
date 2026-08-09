"use client";

import { OpenAPIEndpoints } from "apiuikit";
import { petstore } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function OpenAPIEndpointsPreviewImpl() {
  const theme = useDemoTheme();
  return <OpenAPIEndpoints document={petstore} config={{ theme }} layout="stacked" />;
}
