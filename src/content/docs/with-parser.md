# With Parser

The parser entry accepts a raw YAML or JSON string, validates it, and renders the UI. The parser package is loaded on demand via a dynamic import, so it never lands in your bundle unless this path is used.

`AsyncAPIRenderer` handles AsyncAPI documents and `OpenAPIRenderer` handles OpenAPI ones, each backed by its own parser.

## Prerequisites

Install the peer dependency for the spec you are rendering:

```bash
npm install @asyncapi/parser
```

## `AsyncAPIRenderer` component

The simplest way to use the parser entry. Pass a raw string and the component handles the async parse-and-render cycle internally.

### Props

| Prop             | Type                            | Required | Description                                          |
|------------------|---------------------------------|----------|------------------------------------------------------|
| `raw`            | `string`                        | Yes      | Raw AsyncAPI document (YAML or JSON)                 |
| `config`         | `ConfigInterface`               | No       | UI configuration (theme, show flags, sidebar, etc.)  |
| `onDiagnostics`  | `(d: unknown[]) => void`        | No       | Called after parsing with any validation diagnostics |
| `errorFallback`  | `ReactNode \| (error, reset) => ReactNode` | No | Forwarded to `AsyncAPI`: custom UI shown if rendering throws |
| `onError`        | `(error, errorInfo) => void`    | No       | Forwarded to `AsyncAPI`: called once when a render error is caught |

Parse failures and render failures are separate channels: `onDiagnostics` reports what the parser rejected, `onError` reports a throw during render. See [Error handling](./no-parser.md#error-handling).

### TypeScript

```tsx
import { AsyncAPIRenderer } from "apiuikit";

export default function App() {
  return (
    <AsyncAPIRenderer
      raw={rawYaml}
      onDiagnostics={(diagnostics) => console.log(diagnostics)}
    />
  );
}
```

### JavaScript

```jsx
import { AsyncAPIRenderer } from "apiuikit";

export default function App() {
  return <AsyncAPIRenderer raw={rawYaml} />;
}
```

## `parseAndRender` utility

Use this when you need access to diagnostics before deciding whether to render, or when you want to control the render yourself.

### Signature

```ts
function parseAndRender(
  raw: string,
  config?: ConfigInterface,
): Promise<{ diagnostics: unknown[]; view: React.ReactElement | null }>
```

- **`diagnostics`**: validation issues returned by the parser. An empty array means the document is valid.
- **`view`**: a ready-to-mount React element, or `null` if the document failed validation.

### TypeScript

```tsx
import { parseAndRender } from "apiuikit";
import type { ConfigInterface } from "apiuikit";

const config: ConfigInterface = {
  show: { schemas: false },
  theme: { dark: { background: "#0d1117", surface: "#161b22" } },
};

const { diagnostics, view } = await parseAndRender(rawYaml, config);

if (diagnostics.length) {
  console.warn("Validation issues:", diagnostics);
}

// view is null when the document is invalid
export default function App() {
  return view ?? <p>Invalid AsyncAPI document.</p>;
}
```

### JavaScript

```jsx
import { parseAndRender } from "apiuikit";

const { diagnostics, view } = await parseAndRender(rawYaml);

export default function App() {
  return view ?? <p>Invalid AsyncAPI document.</p>;
}
```

## `OpenAPIRenderer` component

The OpenAPI counterpart, backed by `@scalar/openapi-parser`.

It takes the same props as `AsyncAPIRenderer`: `config`, `onDiagnostics`, `errorFallback`, and `onError`. Diagnostics use the same shape for both specs (`{ message, path, severity }`, with `severity: 0` for errors), so one diagnostics panel can serve either.

### TypeScript

```tsx
import { OpenAPIRenderer } from "apiuikit";
import "apiuikit/style.css";
import type { ConfigInterface } from "apiuikit";

const config: ConfigInterface = {
  show: { endpoints: true, webhooks: false },
};

export default function App({ raw }: { raw: string }) {
  return (
    <OpenAPIRenderer
      raw={raw}
      config={config}
      onDiagnostics={(diagnostics) => console.log(diagnostics)}
    />
  );
}
```

### JavaScript

```jsx
import { OpenAPIRenderer } from "apiuikit";
import "apiuikit/style.css";

export default function App({ raw }) {
  return <OpenAPIRenderer raw={raw} />;
}
```

`parseAndRenderOpenAPI(raw, config)` is available for imperative use, mirroring `parseAndRender`.

## Multi-format schemas

Avro payloads (`schemaFormat: application/vnd.apache.avro…`) and Protobuf payloads (`schemaFormat: application/vnd.google.protobuf…`) are supported out of the box, with no extra install. See [Avro Schemas](./avro.md) and [Protobuf Schemas](./protobuf.md) for more details.

## Error handling

If `@asyncapi/parser` is not installed, `parseAndRender` (and by extension `AsyncAPIRenderer`) throws a readable error at call time:

```
[apiuikit] The parsed entry requires '@asyncapi/parser'.
Install it (`npm i @asyncapi/parser`), or use the `AsyncAPI` component with a pre-resolved document instead.
```
