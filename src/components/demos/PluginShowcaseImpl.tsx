"use client";

import { OpenAPI } from "apiuikit";
import type { OpenAPIDocumentData } from "apiuikit";
import { useDemoTheme } from "./DemoThemeSync";
import { rickRollPlugin } from "./RickRollPlugin";

// Next to empty on purpose: the plugin is the only thing worth looking at.
const document = {
  openapi: "3.1.0",
  info: {
    title: "Totally Serious API",
    version: "1.0.0",
    description: "Nothing to see here. Definitely don't press the red button.",
  },
  paths: {},
} as unknown as OpenAPIDocumentData;

// Module scope keeps the array stable across renders — a fresh one would
// re-register the plugin every time the theme flips.
const plugins = [rickRollPlugin];

export default function PluginShowcaseImpl() {
  const theme = useDemoTheme();
  return (
    <OpenAPI
      openapi={document}
      plugins={plugins}
      // With no paths or components, these sections would just be empty
      // accordions under the title.
      config={{
        theme,
        show: { sidebar: false, endpoints: false, schemas: false },
      }}
    />
  );
}
