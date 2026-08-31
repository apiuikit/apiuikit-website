"use client";

import { AsyncAPIMessages } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function MessagesPreviewImpl() {
  const theme = useDemoTheme();
  return <AsyncAPIMessages document={streetlight} config={{ theme }} layout="stacked" />;
}
