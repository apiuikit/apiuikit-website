# Plugins

Plugins add React UI to specific places in an apiuikit document. Use them for features such as a request-sending tab or a small action beside an operation.

## At a glance

| If you want to... | Use... |
| --- | --- |
| Add a full tab to every operation | An `*.operation.tab` slot |
| Add a small inline control to every operation | An `*.operation.actions` slot |
| Hide, reorder, or replace entire documentation sections | [Composable sections](./sections.md), not a plugin |
| Add UI to Vue, Angular, Svelte, or plain HTML | [Web Components](./with-webcomponents.md); plugins are React-only |

The available slots are:

| Slot | Placement |
| --- | --- |
| `openapi.operation.tab` | A tab beside the OpenAPI operation's built-in **Reference** tab |
| `asyncapi.operation.tab` | A tab beside the AsyncAPI operation's built-in **Reference** tab |
| `openapi.operation.actions` | Inline after code samples and before authorization |
| `asyncapi.operation.actions` | Inline after the code sample |

Plugins can fill more than one slot. If a plugin does not fill a slot, nothing is rendered there.

## Use a plugin

Install the plugin package, then pass it to the `plugins` prop:

```tsx
import { OpenAPI } from "apiuikit";
import requestPlugin from "@yourscope/apiuikit-request-plugin";
import "apiuikit/style.css";
import doc from "./openapi.json";

const plugins = [requestPlugin];

export default function App() {
  return <OpenAPI openapi={doc} plugins={plugins} />;
}
```

Keep the array stable by defining it outside the component or with `useMemo`. Creating a new array on every render re-registers the plugins and can reset the selected tab.

You can pass `plugins` to:

- `OpenAPI` and `AsyncAPI`
- `OpenAPIRenderer` and `AsyncAPIRenderer`
- `OpenAPIProvider` and `AsyncAPIProvider`
- A standalone section that receives a `document` prop

When a section is inside a provider, it uses the provider's plugins. Its own `plugins` prop is ignored, just like its own `config` prop.

```tsx
<OpenAPIProvider document={doc} plugins={plugins}>
  <OpenAPIServers />
  <OpenAPIEndpoints />
</OpenAPIProvider>
```

Multiple plugins render in registration order. Plugins currently work only with the React API because the `plugins` prop contains live component references, which cannot be passed through a custom-element string or JSON attribute.

## Write a plugin

A plugin needs a human-readable `name` and at least one slot:

```tsx
import { definePlugin } from "apiuikit/plugin";

export default definePlugin({
  name: "request-sender",
  slots: {
    "openapi.operation.tab": {
      label: "Try it",
      component: RequestPanel,
    },
  },
});
```

The name appears in error and debug messages and is used as the tab selection ID. It is not a registry key, so duplicate names are accepted, but unique names prevent duplicate tab IDs.

### Add a full operation tab

A tab slot takes a label and a component:

```tsx
export default definePlugin({
  name: "request-sender",
  slots: {
    "openapi.operation.tab": {
      label: "Try it",
      component: RequestPanel,
    },
  },
});
```

When the user selects the tab, your component replaces the operation panel's entire body. The built-in **Reference** tab remains first, and plugin tabs follow in registration order. Moving to another operation resets the selection to **Reference**.

![The `openapi.operation.tab` slot outlined in the playground: the "Demo" tab fills the whole operation panel](/docs/plugins/operation-tab-slot.png)

### Add an inline action

An actions slot takes a component directly, without a label:

```tsx
export default definePlugin({
  name: "copy-operation-link",
  slots: {
    "openapi.operation.actions": CopyOperationLink,
  },
});
```

Use this slot for small, secondary controls that should appear alongside the existing documentation. Multiple action plugins stack in registration order.

![The `openapi.operation.actions` slot outlined in the playground: a small inline element amid the operation's own documentation](/docs/plugins/operation-actions-slot.png)

## Read the current operation

apiuikit calls your component with the complete document and the identity of the current operation.

```ts
interface OpenAPIOperationActionsContext {
  document: OpenAPIDocumentData;
  method: HttpMethod;
  path: string;
}

interface AsyncAPIOperationActionsContext {
  document: AsyncAPIDocumentData;
  operationId: string;
}
```

Use those values to find the operation:

```ts
const operation = document.paths?.[path]?.[method]; // OpenAPI
const operation = document.operations?.[operationId]; // AsyncAPI
```

Here is a complete OpenAPI tab component:

```tsx
import { definePlugin } from "apiuikit/plugin";
import type { OpenAPIOperationActionsContext } from "apiuikit/plugin";

function OperationSummary({
  document,
  method,
  path,
}: OpenAPIOperationActionsContext) {
  const operation = document.paths?.[path]?.[method];
  if (!operation) return null;

  return (
    <div>
      {method.toUpperCase()} {path}: {operation.summary}
    </div>
  );
}

export default definePlugin({
  name: "operation-summary",
  slots: {
    "openapi.operation.tab": {
      label: "Summary",
      component: OperationSummary,
    },
  },
});
```

The context does not contain a pre-built bundle of parameters, request bodies, or security settings. Read the values your plugin needs from the operation. If the document still contains `$ref` values, resolve a JSON Pointer with `useDocumentContext().deref`.

### Sending a request

apiuikit does not currently ship a complete request-sending plugin.

To build a request-sending tab, read the operation's `parameters`, `requestBody`, and `security` fields, then construct a `fetch()` request or use your preferred HTTP client.

apiuikit does not export a request builder. Its code-sample helper produces snippet-oriented HAR data with placeholders and is not designed to execute requests.

The same approach can be used with `asyncapi.operation.tab`, but apiuikit does not currently provide an equivalent recipe for WebSocket, Kafka, or MQTT requests.

## Match the document theme

Plugin components inherit the host document's CSS custom properties. Use them instead of hardcoding colors:

```tsx
const sendButtonStyle = {
  background: "rgb(var(--color-primary-600) / 1)",
  border: "1px solid rgb(var(--color-border) / 1)",
  color: "#fff",
};
```

Available variables include:

- `--color-primary-{50,100,200,300,500,600,700}`
- `--color-secondary-{50,100,200,300,500,600,700}`
- `--color-neutral-{50,100,200,300,500,600,700}`
- `--color-background`, `--color-surface`, and `--color-border`
- `--color-text-primary`, `--color-text-secondary`, and `--color-text-muted`

Each variable contains RGB channels such as `"31 111 235"`. See [Configuration](./configuration.md) for theme options.

For other settings, `useDocumentContext().config` exposes the raw `ConfigInterface`. Prefer resolved context fields such as `showCodeSamples` and `deref` when they are available.

## Error handling

Each plugin instance has its own error boundary and `Suspense` boundary. A broken or slow plugin cannot take down the document or another plugin.

If a plugin throws during rendering, apiuikit skips it and logs an error in this format:

```text
[apiuikit] plugin error in slot "...":
```

There is currently no user-facing fallback for a failed plugin.

## Plugin API reference

Import the plugin API from `apiuikit/plugin`:

```ts
import { definePlugin } from "apiuikit/plugin";
import type { OpenAPIOperationActionsContext } from "apiuikit/plugin";
```

| Export | Purpose |
| --- | --- |
| `definePlugin(plugin)` | Returns the plugin unchanged and types it as `ApiuikitPlugin` |
| `ApiuikitPlugin`, `PluginSlotName`, `PluginSlotContextMap`, `PluginSlotComponent<N>` | Plugin and slot types |
| `OpenAPIOperationActionsContext`, `AsyncAPIOperationActionsContext` | Props passed to a slot component |
| `TabSlotName`, `PluginTabSlotFill<N>` | Tab slot names and the `{ label, component }` fill type |
| `HttpMethod`, `OpenAPIDocumentData`, and related OpenAPI types | Types for reading an OpenAPI operation and its data |
| `AsyncAPIDocumentData` | Type for reading an AsyncAPI operation |
| `useDocumentContext()` / `useAsyncAPIDocument()` | Access to `deref`, configuration, and other ambient document state |
| `ConfigInterface`, `ThemeConfig`, and related theme types | Types for the host configuration |

`PluginSlot`, `usePluginSlot`, and `useOperationTabPlugins` are also exported for components that host plugin slots. Most plugin components do not need them.

## Publish a plugin

Publish the plugin as its own package. Declare `apiuikit`, `react`, and `react-dom` as peer dependencies:

```json
{
  "name": "@yourscope/apiuikit-request-plugin",
  "peerDependencies": {
    "apiuikit": "^1.5.0",
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

Pin `apiuikit` to the major and minor version you developed against.

Mark these imports as external in your bundler configuration:

- `apiuikit`
- `apiuikit/plugin`
- `react`
- `react-dom`
- `react/jsx-runtime`

This is required for correct React context behavior, not just a smaller bundle. Bundling another copy of apiuikit creates a separate `DocumentContext`. In that case, `useDocumentContext()` can report that it must be used within a document provider even when the plugin is correctly nested inside one.

The playground includes two unpublished examples that outline the available space but do not implement real features:

- [`operationTabDemoPlugin.tsx`](https://github.com/AceTheCreator/apiuikit/blob/master/packages/playground/src/plugins/operationTabDemoPlugin.tsx)
- [`operationActionsDemoPlugin.tsx`](https://github.com/AceTheCreator/apiuikit/blob/master/packages/playground/src/plugins/operationActionsDemoPlugin.tsx)
