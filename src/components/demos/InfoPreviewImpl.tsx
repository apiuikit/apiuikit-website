"use client";

import { AsyncAPIInfo } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function InfoPreviewImpl() {
  const theme = useDemoTheme();
  return (
    <AsyncAPIInfo document={streetlight} config={{ theme }} />
  );
}
