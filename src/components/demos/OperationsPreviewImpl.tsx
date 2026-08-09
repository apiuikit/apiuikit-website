"use client";

import { Operations } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function OperationsPreviewImpl() {
  const theme = useDemoTheme();
  return <Operations document={streetlight} config={{ theme, sidePanel: { containment: "viewport" } }} layout="stacked" />;
}
