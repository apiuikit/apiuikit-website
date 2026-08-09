"use client";

import { OpenAPI } from "apiuikit";
import { petstore } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

// The floating Copy-for-LLM / View-as-Markdown button (MarkdownExportMenu)
// only renders unconditionally in the full widget's Layout — standalone
// sections only surface it inside a clicked operation's side panel. Sidebar
// and search are switched off so the button lands at its un-shifted left:12px
// slot (see index.css .panel-toggle-btn) instead of sharing the corner.
//
// Uses the OpenAPI petstore example (rather than the same AsyncAPI streetlight
// doc as the deep-dive section above) so this section doesn't just repeat the
// same widget twice in a row, and so OpenAPI support gets shown somewhere too.
export default function CopyMarkdownTeaserImpl() {
  const theme = useDemoTheme();
  return (
    <div className="h-[420px] overflow-auto rounded-xl border border-chrome-border bg-chrome-surface shadow-sm">
      <OpenAPI
        openapi={petstore}
        config={{ theme, show: { sidebar: false, search: false } }}
      />
    </div>
  );
}
