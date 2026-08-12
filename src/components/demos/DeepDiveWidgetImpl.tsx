"use client";

import { OpenAPI } from "apiuikit";
import { petstore } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

// Fully interactive: not scaled, not pointer-events-disabled. Contained to a
// fixed-height scroll box so the full widget (sidebar, endpoints, schemas)
// can't blow out the page's height. The border and rounding live on the tabbed
// frame in ShowcaseTabs, not here.
//
// The height and the scrolling go on the widget's own root via [&>*], not on
// this wrapper. With containment: "component" the side panel is a fixed
// overlay clipped to that root's bounding rect — so if the root is left at its
// natural content height and a wrapper does the scrolling, the panel is
// clipped to the full document height and spills past the visible box.
export default function DeepDiveWidgetImpl() {
  const theme = useDemoTheme();
  return (
    <div className="h-[560px] [&>*]:h-full [&>*]:overflow-auto">
      <OpenAPI
        openapi={petstore}
        config={{
          theme,
          // Search and the Copy-as-Markdown button are off here: the adjacent
          // tab already shows what that button produces, and search inside an
          // embedded panel competes with the page's own scrolling.
          show: { search: false, copyMarkdown: false },
          sidePanel: { containment: "component" },
        }}
      />
    </div>
  );
}
