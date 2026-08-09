"use client";

import { AsyncAPIProvider, SchemaTree } from "apiuikit";
import { torture } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

// SchemaTree resolves $refs via the ambient document context (see
// SchemaTree.tsx's useAsyncAPIDocument().deref), so it needs an
// AsyncAPIProvider ancestor even outside the full widget — the same way
// apiuikit's own Storybook stories wrap it in a document-context decorator.
//
// CardPayment (from the bundled "torture" example, built to exercise every
// schema keyword) composes PaymentBase via allOf, nests a "card" object,
// and gives "brand" a oneOf between an enum and a pattern-matched string —
// enough real nesting/$ref/oneOf to show what SchemaTree actually does,
// instead of a flat two-property payload.
export default function SchemaTreePreviewImpl() {
  const theme = useDemoTheme();
  const schema = torture.components?.schemas?.CardPayment;

  return (
    <AsyncAPIProvider document={torture} config={{ theme }}>
      <SchemaTree schema={schema} rootName="CardPayment" />
    </AsyncAPIProvider>
  );
}
