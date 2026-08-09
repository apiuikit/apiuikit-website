"use client";

import { AsyncAPI } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

// Fully interactive — unlike the hero's PreviewCard row, this isn't scaled or
// pointer-events-disabled. Contained to a fixed-height scroll frame so the
// full widget (sidebar, search, servers, operations, messages, schemas)
// can't blow out the surrounding page's height.
export default function DeepDiveWidgetImpl() {
  const theme = useDemoTheme();
  return (
    <div className="h-[640px] overflow-auto rounded-xl border border-chrome-border bg-chrome-surface shadow-sm">
      <AsyncAPI asyncapi={streetlight} config={{ theme }} />
    </div>
  );
}
