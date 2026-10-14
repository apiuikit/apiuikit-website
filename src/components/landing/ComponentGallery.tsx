import { highlight } from "@/lib/highlight";
import ComponentGalleryTabs from "./ComponentGalleryTabs";

// The snippet under each preview is the call that renders it, minus the
// site-only config (theme sync, side-panel offsets), so what readers copy is
// what they'd actually write.
const SECTIONS = [
  {
    id: "operations",
    title: "Event APIs",
    statement: "Every event integrators can send or receive.",
    body: "Each one comes with its payload, examples, and replies attached, generated from the spec so the docs never drift from what you ship.",
    code: `import { AsyncAPIOperation } from "apiuikit";

<AsyncAPIOperation
  document={doc}
  operationId="subscribe"
  config={{ show: { tryIt: true } }}
/>`,
  },
  {
    id: "endpoints",
    title: "REST APIs",
    statement: "Every endpoint, with code ready to paste.",
    body: "Inputs, responses, and cURL, JavaScript, and Python samples, so integrators reach a first successful call without asking your team.",
    code: `import { OpenAPIEndpoint } from "apiuikit";

<OpenAPIEndpoint
  document={petstore}
  operationId="addPet"
  config={{ show: { tryIt: true } }}
/>`,
  },
  {
    id: "servers",
    title: "Authentication",
    statement: "How to connect, before anyone hits a 401.",
    body: "Environments and API key, HTTP, OAuth2, and OpenID Connect requirements, taken from the spec rather than a wiki page someone forgets to update.",
    code: `import { AsyncAPIServers } from "apiuikit";

<AsyncAPIServers document={doc} />`,
  },
  {
    id: "messages",
    title: "Examples",
    statement: "Real examples, right where they're needed.",
    body: "Readers see what valid data looks like next to the event that carries it. Avro and Protobuf work with nothing extra to install.",
    code: `import { AsyncAPIMessages } from "apiuikit";

<AsyncAPIMessages document={doc} layout="stacked" />`,
  },
  {
    id: "schemas",
    title: "Data models",
    statement: "Complex data, readable at a glance.",
    body: "Nested objects, variants, and shared definitions in an expandable tree, so readers find the field they need.",
    code: `import { AsyncAPIProvider, SchemaTree } from "apiuikit";

<AsyncAPIProvider document={doc}>
  <SchemaTree schema={cardPayment} rootName="CardPayment" />
</AsyncAPIProvider>`,
  },
];

export default async function ComponentGallery() {
  // Highlighted on the server with the same dual-theme highlighter as the
  // "How you use it" section, so no highlighter ships to the browser.
  const items = await Promise.all(
    SECTIONS.map(async ({ code, ...section }) => ({
      ...section,
      html: await highlight(code, "tsx"),
    })),
  );

  return (
    <section className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <ComponentGalleryTabs items={items} />
      </div>
    </section>
  );
}
