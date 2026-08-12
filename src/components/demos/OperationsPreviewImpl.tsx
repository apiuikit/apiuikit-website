"use client";

import { Operations } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function OperationsPreviewImpl() {
  const theme = useDemoTheme();
  return (
    // The section renders at its natural height, which is shorter than the
    // side panel an operation opens. Since containment is "component" the
    // panel is clipped to the widget's root, so the root needs the height:
    // the min-height sits on this wrapper and [&>*]:flex-1 stretches the
    // widget's own outermost element to fill it.
    <div className="flex min-h-[34rem] flex-col [&>*]:flex-1">
      <Operations
        document={streetlight}
        config={{ theme, sidePanel: { containment: "component" } }}
        layout="stacked"
      />
    </div>
  );
}
