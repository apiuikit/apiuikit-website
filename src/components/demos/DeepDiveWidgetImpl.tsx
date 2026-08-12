"use client";

import { OpenAPI } from "apiuikit";
import { petstore } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";
import { HEADER_HEIGHT } from "@/lib/layout";

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
          // Every floating control is off here. The sidebar's spine, the
          // search toggle, and the Copy-as-Markdown menu are all fixed to the
          // viewport and drift over the page as it scrolls, and the adjacent
          // tab already shows what that last one produces.
          show: { sidebar: false, search: false, copyMarkdown: false },
          // topOffset keeps the panel clear of the site's sticky navbar,
          // which a component-contained panel would otherwise open under.
          sidePanel: { containment: "component", topOffset: HEADER_HEIGHT },
        }}
      />
    </div>
  );
}
