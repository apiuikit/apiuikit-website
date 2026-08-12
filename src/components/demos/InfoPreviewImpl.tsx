"use client";

import { Info } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function InfoPreviewImpl() {
  const theme = useDemoTheme();
  return (
    // Info's own Section adds no padding of its own, so it renders flush
    // against the card frame without this.
    <div className="p-6">
      <Info document={streetlight} config={{ theme }} />
    </div>
  );
}
