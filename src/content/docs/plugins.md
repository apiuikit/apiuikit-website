# Plugins

Plugins let you add your own UI to a rendered document — from a separately-installed package — without that code living inside apiuikit's own bundle. The motivating example is "Try it": sending a real HTTP request from an OpenAPI operation is a feature plenty of consumers want, but forcing everyone to ship that code even when they don't need it isn't a good tradeoff. A plugin fills that gap only for the consumers who install it.

## Using a plugin

Install whichever plugin package you're using, then pass it to the `plugins` prop:

```tsx
import { OpenAPI } from "apiuikit";
import myPlugin from "@yourscope/apiuikit-plugin-whatever";
import "apiuikit/style.css";
import doc from "./openapi.json";

export default function App() {
  return <OpenAPI openapi={doc} plugins={[myPlugin]} />;
}
```

`plugins` is an array — register as many as you like. They render in registration order, wherever their slot(s) appear. Keep the array's identity stable across renders (define it at module scope, or memoize it) rather than passing a new array literal on every render.

It's available on `OpenAPI`, `OpenAPIRenderer`, `AsyncAPI`, and `AsyncAPIRenderer` (see [Without Parser](./no-parser.md) and [With Parser](./with-parser.md)), and on the standalone sections and providers described in [Composables](./sections.md):

```tsx
<OpenAPIProvider document={doc} plugins={[myPlugin]}>
  <OpenAPIServers />
  <OpenAPIEndpoints />
</OpenAPIProvider>
```

A section's standalone `document` prop form also accepts `plugins`. Composed under a provider, the provider's `plugins` apply instead and a section's own `plugins` prop is ignored — the same rule `config` already follows.

Plugins currently work only through the React API. The [web component](./with-webcomponents.md) custom elements don't support `plugins` yet: it's a live array of component references, not something a JSON or string attribute can carry.

## Where a plugin can render

Plugins fill named "slots" — fixed spots in the layout that apiuikit exposes on purpose. There's no arbitrary DOM injection; a plugin only ever appears where a slot exists.

| Slot | Where it renders | Filled with |
|---|---|---|
| `openapi.operation.tab` | A tab in the OpenAPI operation panel, alongside the built-in "Reference" tab | `{ label, component }` |
| `asyncapi.operation.tab` | A tab in the AsyncAPI operation panel, alongside "Reference" | `{ label, component }` |
| `openapi.operation.actions` | Inline, under each OpenAPI operation's documentation (after the code samples, before Authorization) | A bare component |
| `asyncapi.operation.actions` | Inline, under each AsyncAPI operation's documentation (after the code sample) | A bare component |

**A `*.operation.tab` plugin** gets its own tab. Selecting it hands the plugin the operation panel's entire body — apiuikit's own documentation content is unmounted while the plugin's tab is active. The built-in "Reference" tab is always first; plugin tabs follow in registration order. Switching operations always lands back on Reference, so a plugin's own tab state doesn't carry over between operations.

The screenshot below is the playground's `operationTabDemoPlugin.tsx` fixture with a tinted, thick dotted border added around its own wrapper, purely to make the slot's boundary visible — it's the entire operation panel, not just the space its own content happens to use:

![The `openapi.operation.tab` slot outlined in the playground: the "Demo" tab fills the whole operation panel](/docs/plugins/operation-tab-slot.png)

**A `*.operation.actions` plugin** renders inline instead, alongside apiuikit's own content. This is meant for something small and secondary — a button, say — that belongs next to the documentation rather than replacing it. Multiple plugins filling the same actions slot stack in registration order.

Here's the same treatment on a second playground fixture filling `openapi.operation.actions`, to show the contrast — a small inline element sitting between the code samples and Authorization, not a full panel:

![The `openapi.operation.actions` slot outlined in the playground: a small inline element amid the operation's own documentation](/docs/plugins/operation-actions-slot.png)

More slots may be added over time; a plugin only needs to fill the ones it cares about.

## Playground fixtures

The two screenshots above come from a pair of small, non-published dev fixtures in apiuikit's own playground: [`operationTabDemoPlugin.tsx`](https://github.com/AceTheCreator/apiuikit/blob/master/packages/playground/src/plugins/operationTabDemoPlugin.tsx) fills `openapi.operation.tab`, and [`operationActionsDemoPlugin.tsx`](https://github.com/AceTheCreator/apiuikit/blob/master/packages/playground/src/plugins/operationActionsDemoPlugin.tsx) fills `openapi.operation.actions`. Neither does anything functional — each just renders a labeled placeholder, outlined so its slot's boundary is visible while clicking around the playground. They exist to exercise the plugin system's slot contract, not as examples of a shippable plugin.

Building an actual "Try it" plugin — one that edits parameters/body and sends a real `fetch()` — is covered below, under "Sending a request". AsyncAPI documents aren't covered by that particular recipe; an equivalent for WebSocket/Kafka/MQTT plugins doesn't exist yet, though `asyncapi.operation.tab` is already defined and ready for one.

## Writing your own plugin

Plugin authors import from `apiuikit/plugin`, a separate entry point from the main `apiuikit` package, so you don't need any of the library's internals — just `definePlugin` and a component.

```tsx
import { definePlugin } from "apiuikit/plugin";
import type { OpenAPIOperationActionsContext } from "apiuikit/plugin";

function MyOperationPanel({ document, method, path }: OpenAPIOperationActionsContext) {
  const operation = document.paths?.[path]?.[method];
  if (!operation) return null;
  return (
    <div>
      {method.toUpperCase()} {path} — {operation.summary}
    </div>
  );
}

export default definePlugin({
  name: "my-plugin",
  slots: {
    "openapi.operation.tab": { label: "Try it", component: MyOperationPanel },
  },
});
```

Your component receives the whole document plus which operation this slot instance is for — not a pre-shaped bundle of parameters, request body, and security. Look the operation up yourself and resolve whatever your plugin needs:

```ts
interface OpenAPIOperationActionsContext {
  document: OpenAPIDocumentData;
  method: HttpMethod;
  path: string; // the operation's key in document.paths
}

interface AsyncAPIOperationActionsContext {
  document: AsyncAPIDocumentData;
  operationId: string; // the operation's key in document.operations
}
```

That keeps the slot contract stable no matter what a given plugin actually cares about.

### Sending a request

If your plugin needs to build a real HTTP request from an operation (the way "Try it" does), `apiuikit/plugin` exports `buildHarRequest` — the same request builder apiuikit's own code samples use for server URL templating, path/query substitution, and auth placeholders:

```tsx
import { buildHarRequest } from "apiuikit/plugin";
import type { OpenAPIOperationActionsContext } from "apiuikit/plugin";

function MyOperationPanel({ document, method, path }: OpenAPIOperationActionsContext) {
  const operation = document.paths?.[path]?.[method];
  if (!operation) return null;

  const harRequest = buildHarRequest({
    method,
    path,
    servers: document.servers,
    parameters: operation.parameters ?? [],
    security: operation.security ?? document.security ?? [],
    securitySchemes: document.components?.securitySchemes,
    media: null,
    resolvedBodyValue: undefined,
  });

  // fetch(harRequest.url, { method: harRequest.method, ... })
}
```

### Matching the host's theme

apiuikit resolves the host's `config.theme` (see [Configuration](./configuration.md)) into CSS custom properties on the document root — things like `--color-primary-600`, `--color-background`, `--color-border`, `--color-text-primary`. A plugin slot renders inside that tree, so these variables are already available. Reference them from your own styles instead of hardcoding colors, so your plugin follows whatever theme the host page set:

```tsx
const sendButtonStyle = {
  background: "rgb(var(--color-primary-600) / 1)",
  border: "1px solid rgb(var(--color-border) / 1)",
  color: "#fff",
};
```

### Error isolation

Each plugin filling a slot is wrapped in its own error boundary and `Suspense` — a broken or slow-loading plugin can't take down the document, or a sibling plugin filling the same slot. A plugin that throws during render is silently skipped (logged to the console) rather than shown; there's currently no user-facing fallback UI for a plugin crash.

## Publishing a plugin

Ship your plugin as its own package, with `apiuikit` and React as **peer dependencies** rather than bundled in:

```json
{
  "name": "@yourscope/apiuikit-plugin-whatever",
  "peerDependencies": {
    "apiuikit": "^1.5.0",
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

Also mark `react`, `react-dom`, `react/jsx-runtime`, and `apiuikit` / `apiuikit/plugin` as external in your bundler config. This matters for more than bundle size: hooks like `useDocumentContext` are re-exported from the `apiuikit` package itself rather than bundled fresh, so every plugin's context lookup needs to resolve to the *same* context object the host app's own `apiuikit` import provides. If your bundle carries its own copy of `apiuikit` instead of treating it as external, you get a second, disconnected context instance — and a hook like `useDocumentContext()` will throw "must be used within a document provider" even when it's correctly nested under one, because React resolves context by object identity, not by shape.

## Reference

| Export (from `apiuikit/plugin`) | What it's for |
|---|---|
| `definePlugin(plugin)` | Wraps your plugin object, typed as `ApiuikitPlugin`. |
| `buildHarRequest(...)`, `resolveServerBaseUrl(...)` | Builds a request (URL, method, headers) for a looked-up operation — server templating, path/query substitution, auth placeholders. |
| `useDocumentContext()` / `useAsyncAPIDocument()` | Ambient context (deref, theme/config-derived settings). Same hook, two names. You don't need this for the document itself — that's already handed to you on the slot context. |
| `ApiuikitPlugin`, `PluginSlotName`, `PluginSlotContextMap`, `PluginSlotComponent<N>` | Types for the plugin object and each slot's context. |
| `OpenAPIOperationActionsContext`, `AsyncAPIOperationActionsContext` | The context object your component receives — document, plus which operation this slot instance is for. |
| `HttpMethod`, `OpenAPIOperationData`, `OpenAPIPathItemData`, `OpenAPIParameterData`, `OpenAPIRequestBodyData`, `OpenAPISecuritySchemeData`, `OpenAPIServerData` | Document-shape types for resolving an operation out of the `document` a slot context hands you. |
| `ConfigInterface`, `ThemeConfig`, `ThemeColors` | Types for the host's `config` prop, available as `useDocumentContext().config`. |

## When to reach for a plugin

| Scenario | Use |
|---|---|
| Add a "Try it" style request-sending tab to an operation | A `*.operation.tab` plugin — see [Sending a request](#sending-a-request) |
| Add a small secondary action (a button, a link) next to an operation's docs | A `*.operation.actions` plugin |
| Replace or rearrange whole sections (Servers, Operations, Schemas, ...) | Compose your own layout instead — see [Composables](./sections.md) |
| Render your own UI from Vue, Angular, Svelte, or plain HTML | Not supported yet — plugins are React-only; see [Web Components](./with-webcomponents.md) |
