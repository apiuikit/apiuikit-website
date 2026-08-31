# Getting Started

Point apiuikit at an AsyncAPI or OpenAPI document and get a full interactive documentation UI covering servers, channels and endpoints, operations, messages, and schemas, with no manual mapping required.

## Install

```bash
npm install apiuikit
```

That is everything you need if you already have a parsed document object. If you want to hand the library a raw YAML or JSON string instead, also install the peer dependency for the spec you are rendering:

```bash
npm install @asyncapi/parser       # for AsyncAPI documents
npm install @scalar/openapi-parser # for OpenAPI documents
```

Avro and Protobuf message payloads work in both cases, with nothing extra to install.

## Render a document

Import the component and the stylesheet, and pass it your document. The stylesheet import is required; without it the widget renders unstyled.

```tsx
import { AsyncAPI } from "apiuikit";
import "apiuikit/style.css";
import doc from "./asyncapi.json";

export default function App() {
  return <AsyncAPI asyncapi={doc} />;
}
```

OpenAPI works the same way, through the `OpenAPI` component:

```tsx
import { OpenAPI } from "apiuikit";
import "apiuikit/style.css";
import doc from "./openapi.json";

export default function App() {
  return <OpenAPI openapi={doc} />;
}
```

If what you have is a raw string rather than a parsed object (something a user pasted in, or a file read at runtime), use `AsyncAPIRenderer` or `OpenAPIRenderer` instead. They parse and validate for you, and are covered in [With Parser](./with-parser.md).

## Render one section

You do not have to take the whole widget. Every section works standalone: pass it a `document` and drop it into a layout you already have.

```tsx
import { AsyncAPIOperations } from "apiuikit";
import doc from "./asyncapi.json";

export default function OperationsPage() {
  return <AsyncAPIOperations document={doc} layout="stacked" />;
}
```

`AsyncAPIServers`, `AsyncAPIOperations`, `AsyncAPIMessages`, `AsyncAPISchemas`, and `AsyncAPIInfo` all work this way, with `OpenAPIServers`, `OpenAPIEndpoints`, `OpenAPIWebhooks`, `OpenAPISchemas`, and `OpenAPIInfo` as the OpenAPI equivalents. Use `layout="stacked"` when a section is embedded on its own: it drops the reserved right-hand gutter that keeps sections aligned inside the full widget.

To place several sections in your own arrangement, wrap them in a provider so the document is resolved once and shared:

```tsx
import { AsyncAPIProvider, AsyncAPIServers, AsyncAPIOperations, AsyncAPISchemas } from "apiuikit";

export default function CustomLayout() {
  return (
    <AsyncAPIProvider document={doc}>
      <AsyncAPIServers />
      <AsyncAPIOperations layout="stacked" />
      <AsyncAPISchemas layout="stacked" />
    </AsyncAPIProvider>
  );
}
```

See [Composables](./sections.md) for the full list and their props.

## Configure it

Every component takes a `config` object. A few of the options you are most likely to reach for first:

```tsx
<AsyncAPI
  asyncapi={doc}
  config={{
    theme: { colors: { primary: { 600: "#1f6feb" } } },
    show: { sidebar: false, search: false },
    expand: { schemas: true },
    sidePanel: { containment: "component" },
  }}
/>
```

- `theme`: brand colour scales plus per-mode surface and text colours.
- `show`: switch individual sections and controls off, including the sidebar, search, code samples, and the Copy-for-LLM button.
- `expand`: whether schema trees and message examples start open.
- `sidePanel.containment`: `"viewport"` (default) lets an operation's side panel cover the browser window; `"component"` clips it to the widget's own root element, which is what you want when the widget is embedded in a page rather than being the page.

Every option is listed in [Configuration](./configuration.md).

## Using it outside React

For Vue, Angular, Svelte, or plain HTML, use the web component package. React and the parsers are bundled inside it, so consumers install nothing else.

```bash
npm install @apiuikit/web-component
```

```js
import "@apiuikit/web-component";
import "@apiuikit/web-component/style.css";

document.querySelector("#api-doc").spec = rawYamlOrJsonString;
```

[Web Components](./with-webcomponents.md) covers CDN usage, modular per-element imports, section elements, configuration, and framework integration.

## Server-side rendering

apiuikit is a client-side library: it bundles DOMPurify, which assigns to `self` at module scope, and `self` does not exist in Node. Importing `apiuikit` anywhere in a server render path will throw.

In Next.js, load it through a dynamic import with SSR disabled. Note that a `"use client"` directive alone is not enough, because the App Router still server-renders client components for the initial HTML.

```tsx
"use client";

import dynamic from "next/dynamic";

const ApiDocs = dynamic(() => import("./ApiDocs"), {
  ssr: false,
  loading: () => <div className="h-[640px] animate-pulse rounded-xl border" />,
});

export default function Page() {
  return <ApiDocs />;
}
```

Give the loading fallback the same dimensions as the widget so the page does not shift when the client chunk arrives.

## Where to go next

- [Composables](./sections.md): render and arrange sections yourself.
- [Without Parser](./no-parser.md) and [With Parser](./with-parser.md): both entry points in full, for AsyncAPI and OpenAPI alike.
- [Plugins](./plugins.md): add your own UI to a rendered document, like a "Try it" tab.
- [Extensions](./extensions.md): the `x-*` fields apiuikit renders, and how to switch them off.
- [AI Export](./ai-export.md): making your docs readable by agents and crawlers.
