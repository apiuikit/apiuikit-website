"use client";

import { Messages } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function MessagesPreviewImpl() {
  const theme = useDemoTheme();
  return <Messages document={streetlight} config={{ theme }} layout="stacked" />;
}
