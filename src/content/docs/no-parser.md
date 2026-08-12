# Without Parser

Use this entry when you already hold a resolved document as a JavaScript object: fetched from your own API, bundled at build time, or processed server-side. No parser package is required, and none will ever be included in your bundle.

`AsyncAPI` renders AsyncAPI documents and `OpenAPI` renders OpenAPI 3.0 and 3.1 documents. The two behave identically apart from the prop that carries the document.

## `AsyncAPI` component

Pass a plain JavaScript object that matches the AsyncAPI 3.0 document shape.

### Props

| Prop      | Type                    | Required | Description                                         |
|-----------|-------------------------|----------|-----------------------------------------------------|
| `asyncapi`| `AsyncAPIDocumentData`  | Yes      | A pre-resolved AsyncAPI 3.0 document object         |
| `config`  | `ConfigInterface`       | No       | UI configuration (theme, show flags, sidebar, etc.) |
| `errorFallback` | `ReactNode \| (error, reset) => ReactNode` | No | Custom UI shown if rendering throws. Defaults to a built-in fallback |
| `onError` | `(error, errorInfo) => void` | No  | Called once when a render error is caught, e.g. to report it to your own telemetry |

### Error handling

The component wraps its own tree in an error boundary, so a render-time throw from a malformed or edge-case document is contained here instead of unmounting your application. The default fallback is an alert with the error message and a "Try again" button:

```tsx
<AsyncAPI
  asyncapi={doc}
  errorFallback={(error, reset) => <MyFallback message={error.message} onRetry={reset} />}
  onError={(error, errorInfo) => reportToSentry(error, errorInfo)}
/>
```

This only covers synchronous render errors, which is all a React error boundary can see. Parse failures surface through `AsyncAPIRenderer`'s `onDiagnostics` instead. The `ErrorBoundary` component is also exported on its own if you want to wrap composable sections in it.

### TypeScript

```tsx
import { AsyncAPI } from "apiuikit";
import type { ConfigInterface } from "apiuikit";
import doc from "./asyncapi.json";

const config: ConfigInterface = {
  show: { sidebar: true },
  theme: { dark: { background: "#0d1117", surface: "#161b22" } },
};

export default function App() {
  return <AsyncAPI asyncapi={doc} config={config} />;
}
```

### JavaScript

```jsx
import { AsyncAPI } from "apiuikit";
import doc from "./asyncapi.json";

export default function App() {
  return <AsyncAPI asyncapi={doc} />;
}
```

## `OpenAPI` component

The OpenAPI counterpart. Pass a resolved document as `openapi`; `@scalar/openapi-parser` is not required and never enters your bundle.

```tsx
import { OpenAPI } from "apiuikit";
import "apiuikit/style.css";
import doc from "./openapi.json";

export default function App() {
  return <OpenAPI openapi={doc} />;
}
```

`config`, `kind="resolved"`, `errorFallback`, and `onError` all work exactly as they do on `AsyncAPI` above.

### What gets rendered

- `info` (including `x-logo` and the known `x-*` catalog, see [Extensions](./extensions.md)), `tags`, `externalDocs`
- `servers`, with `{variable}` segments showing their description, default, and allowed values on hover
- `paths`: operations by method, with summary and description, deprecation badges, parameters (path and query on the address bar, header and cookie in the request card), `requestBody` with a media-type switcher, and per-status `responses` covering body, response `headers`, and `links`
- `webhooks` (3.1), in their own tab, using the same detail panel as endpoints
- `callbacks`, as a collapsible section on the operation that declares them, rendered through the same operation view
- Security: document-level and operation-level `security` resolved against `components.securitySchemes`, rendered as an Authorization card (API key, HTTP, OAuth2 flows and scopes, OpenID Connect)
- `components.schemas`, plus `$ref` resolution throughout

Callbacks nested inside a callback are the one deliberate stop: they render one level deep, since deeper nesting is vanishingly rare and a cyclic `$ref` would otherwise not terminate.

## Passing a parser-resolved document

If you run the AsyncAPI parser yourself upstream (e.g. in a build script or server), you can signal to the component that all `$ref`s have already been resolved:

```tsx
import { AsyncAPI } from "apiuikit";
import type { AsyncAPIDocumentData } from "apiuikit";

// document was fully dereferenced upstream
declare const resolvedDoc: AsyncAPIDocumentData;

export default function App() {
  return <AsyncAPI kind="resolved" asyncapi={resolvedDoc} />;
}
```

The `kind: "resolved"` variant uses the same `AsyncAPI` component, it is just a different prop shape that conveys the pre-resolved state.

Either way, the component verifies rather than trusts: documents are checked for `$ref`s with a cheap read-only scan, and a fully resolved document passes through untouched (no copy). If a document handed in as `kind="resolved"` still contains `$ref`s, they are resolved anyway and a console warning tells you the promise was false, so a broken upstream resolution step can't break the UI, but it also doesn't stay invisible.

## Multi-format schemas

Avro and Protobuf payloads and other multi-format wrappers are unwrapped (and converted) at render time. See [Avro Schemas](./avro.md) and [Protobuf Schemas](./protobuf.md) for more details.

## When to use this entry

| Scenario                                              | Use                      |
|-------------------------------------------------------|--------------------------|
| Document is a static JSON file bundled at build time  | `AsyncAPI` (no-parser)   |
| Document is fetched from your own backend (pre-parsed)| `AsyncAPI` (no-parser)   |
| Document is raw YAML/JSON entered by a user           | `AsyncAPIRenderer` / `OpenAPIRenderer` (see [With Parser](./with-parser.md)) |
| You run the parser yourself before rendering          | `AsyncAPI` / `OpenAPI` with `kind="resolved"` |
| The document is OpenAPI rather than AsyncAPI          | `OpenAPI` (no-parser)    |
