"use client";

import { Info } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function InfoPreviewImpl() {
  const theme = useDemoTheme();
  return <Info document={streetlight} config={{ theme }} />;
}
