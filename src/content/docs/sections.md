# Composables

The `AsyncAPI` component renders a complete documentation page: sidebar, search, servers, operations, messages, schemas. If you want to build your own layout instead, render individual sections on their own, compose several of them together, or drop a single endpoint, operation, message, or schema into a page.

Every exported section. Each component name opens its live page in [Storybook](https://storybook.apiuikit.com/?path=/docs/introduction--docs). The singular components render one item inline; the rest render the whole collection.

| Component | Spec | Renders |
|---|---|---|
| [`AsyncAPIServers`](https://storybook.apiuikit.com/?path=/docs/asyncapi-servers--docs) | AsyncAPI | Servers |
| [`AsyncAPIOperations`](https://storybook.apiuikit.com/?path=/docs/asyncapi-operations--docs) | AsyncAPI | Operations |
| [`AsyncAPIOperation`](https://storybook.apiuikit.com/?path=/docs/asyncapi-operation--docs) | AsyncAPI | One operation, by its key under `operations` |
| [`AsyncAPIMessages`](https://storybook.apiuikit.com/?path=/docs/asyncapi-messages--docs) | AsyncAPI | Messages |
| [`AsyncAPIMessage`](https://storybook.apiuikit.com/?path=/docs/asyncapi-message--docs) | AsyncAPI | One message, by its key under `components.messages` |
| [`AsyncAPIInfo`](https://storybook.apiuikit.com/?path=/docs/asyncapi-info--docs) | AsyncAPI | Info block (title, description, license) |
| [`Schemas`](https://storybook.apiuikit.com/?path=/docs/asyncapi-schemas--docs) | Both | Component schemas (`components.schemas` — same shape in AsyncAPI and OpenAPI). [OpenAPI preview](https://storybook.apiuikit.com/?path=/docs/openapi-schemas--docs) |
| [`Schema`](https://storybook.apiuikit.com/?path=/docs/shared-schema--docs) | Both | One schema, by its key under `components.schemas` |
| [`OpenAPIServers`](https://storybook.apiuikit.com/?path=/docs/openapi-servers--docs) | OpenAPI | Servers |
| [`OpenAPIEndpoints`](https://storybook.apiuikit.com/?path=/docs/openapi-endpoints--docs) | OpenAPI | Paths / endpoints |
| [`OpenAPIEndpoint`](https://storybook.apiuikit.com/?path=/docs/openapi-endpoint--docs) | OpenAPI | One endpoint, by `operationId` or by `method` + `path` |
| [`OpenAPIWebhooks`](https://storybook.apiuikit.com/?path=/docs/openapi-webhooks--docs) | OpenAPI | OpenAPI 3.1 webhooks (renders nothing if the document declares none) |
| [`OpenAPIWebhook`](https://storybook.apiuikit.com/?path=/docs/openapi-webhook--docs) | OpenAPI | One webhook, by its key under `webhooks` |
| [`OpenAPIInfo`](https://storybook.apiuikit.com/?path=/docs/openapi-info--docs) | OpenAPI | Info block (title, description, tags, external docs) |

`AsyncAPISchemas` and `OpenAPISchemas` remain exported as deprecated aliases of `Schemas`.

Providers: `AsyncAPIProvider` and `OpenAPIProvider`. The matching custom elements for Vue, Angular, Svelte, or plain HTML are on [Web Components](./with-webcomponents.md).

## Rendering one section standalone

`AsyncAPIServers`, `AsyncAPIOperations`, `AsyncAPIMessages`, `Schemas`, and `AsyncAPIInfo` each render on their own. Pass a `document` and the section resolves it and sets up its own context internally, no provider needed. The OpenAPI set (`OpenAPIServers`, `OpenAPIEndpoints`, `OpenAPIWebhooks`, `OpenAPIInfo`) works the same way — and `Schemas` is shared by both specs, since `components.schemas` has the identical shape in either document type.

```tsx
import { AsyncAPIOperations } from "apiuikit";
import doc from "./asyncapi.json";

export default function OperationsPage() {
  // Prefer layout="stacked" when embedding a section alone so it fills the
  // container width instead of reserving the empty right gutter used for
  // alignment in the full widget.
  return <AsyncAPIOperations document={doc} layout="stacked" />;
}
```

### Props

| Prop       | Type                         | Required | Description                                                  |
|------------|------------------------------|----------|----------------------------------------------------------------|
| `document` | `AsyncAPIDocumentData`       | Yes*     | A pre-resolved AsyncAPI 3.0 document. *Not required when rendered inside `AsyncAPIProvider` (see below). For `Schemas`, either `AsyncAPIDocumentData` or `OpenAPIDocumentData`. |
| `config`   | `ConfigInterface`            | No       | UI configuration. Only applied when the section sets up its own context (standalone); ignored when composed under a provider. |
| `plugins`  | `ApiuikitPlugin[]`           | No       | Third-party plugins. Only applied standalone; composed under `AsyncAPIProvider`, that provider's own `plugins` apply instead. See [Plugins](./plugins.md). |
| `layout`   | `"columns"` \| `"stacked"`   | No       | Column geometry. `"columns"` (the default for list sections) keeps the reserved right gutter so sections align with Info/Servers in the full widget. `"stacked"` uses the full container width (no prose max-width), drops empty side space, and stacks Info/Servers side content below the main content. Prefer `"stacked"` when embedding a section alone. Single-item components default to `"stacked"`. |

## Composing several sections

To arrange multiple sections together, reordering them or interleaving your own components between them, wrap them in `AsyncAPIProvider` instead of passing `document` to each one individually. It resolves the document once and shares it with every section underneath, rather than each one resolving independently.

```tsx
import { AsyncAPIProvider, AsyncAPIServers, AsyncAPIOperations, Schemas } from "apiuikit";
import doc from "./asyncapi.json";

export default function CustomLayout() {
  return (
    <AsyncAPIProvider document={doc}>
      <MyPageHeader />
      <AsyncAPIServers />
      <AsyncAPIOperations />
      <MyCustomSidebar />
      <Schemas />
    </AsyncAPIProvider>
  );
}
```

Sections rendered inside `AsyncAPIProvider` ignore their own `document`/`config` props and read from the shared context instead.

## Replacing a section with your own component

Because composition doesn't rely on a slot API, dropping in a custom implementation for one part is just a matter of not using the built-in component for it:

```tsx
<AsyncAPIProvider document={doc}>
  <AsyncAPIServers />
  <MyCustomOperationsList />  {/* reads useAsyncAPIDocument() itself */}
  <Schemas />
</AsyncAPIProvider>
```

Any component rendered inside `AsyncAPIProvider` can call `useAsyncAPIDocument()` to read the resolved document, the same way the built-in sections do.

## OpenAPI sections

OpenAPI documents have their own set, used the same way: `OpenAPIServers`, `OpenAPIEndpoints`, `OpenAPIWebhooks`, and `OpenAPIInfo`, with `OpenAPIProvider` to share one resolved document between them. Use the shared `Schemas` section for component schemas — it works under either provider.

```tsx
import { OpenAPIProvider, OpenAPIServers, OpenAPIEndpoints, OpenAPIWebhooks, Schemas } from "apiuikit";

export default function CustomLayout() {
  return (
    <OpenAPIProvider document={doc}>
      <OpenAPIServers />
      <OpenAPIEndpoints layout="stacked" />
      <OpenAPIWebhooks layout="stacked" />
      <Schemas layout="stacked" />
    </OpenAPIProvider>
  );
}
```

## Rendering a single item

The sections above each render a whole collection. To show one endpoint, webhook, operation, message, or schema (next to the prose on a guide page, for example), use the singular component. It renders that item inline as a card: the same header and detail the list's side panel shows.

```tsx
import { OpenAPIEndpoint, OpenAPIWebhook, AsyncAPIOperation, AsyncAPIMessage, Schema } from "apiuikit";

<OpenAPIEndpoint document={petstore} operationId="createPet" />
<OpenAPIEndpoint document={petstore} method="get" path="/pets/{petId}" />
<OpenAPIWebhook document={petstore} name="newPet" />
<AsyncAPIOperation document={streetlights} operationId="receiveLightMeasurement" />
<AsyncAPIMessage document={streetlights} messageId="lightMeasured" />
<Schema document={petstore} name="Pet" />   // AsyncAPI or OpenAPI, like `Schemas`
```

They follow the same rules as the other sections: pass `document` when one stands alone, or put several inside a provider and pass `document` once to the provider. The provider form is the natural way to mix items into your own page:

```tsx
<OpenAPIProvider document={petstore}>
  <h2>Adding a pet</h2>
  <p>Send the new pet in the request body.</p>
  <OpenAPIEndpoint operationId="createPet" />
  <p>The body looks like this:</p>
  <Schema name="Pet" />
</OpenAPIProvider>
```

| Component           | Picks the item with                                      | Looks in                    |
|---------------------|----------------------------------------------------------|-----------------------------|
| `OpenAPIEndpoint`   | `operationId`, **or** `method` + `path`                  | `paths`                     |
| `OpenAPIWebhook`    | `name`, plus `method` if the webhook declares more than one | `webhooks`               |
| `AsyncAPIOperation` | `operationId` (the key under `operations`)               | `operations`                |
| `AsyncAPIMessage`   | `messageId`                                              | `components.messages`       |
| `Schema`            | `name`                                                   | `components.schemas`        |

They also take `config`, `plugins`, and `layout` like the other sections. `layout` defaults to `"stacked"` (full width), since a single item is usually embedded on its own. Pass `layout="columns"` when it needs to line up with Info and Servers.

`OpenAPIEndpoint` and `OpenAPIWebhook` take an optional `onNavigate(operationId)`. A response `link` that points at another operation calls it, so you can scroll or route to wherever your page shows that operation. Without a handler, those links render as plain text.

If nothing in the document matches, the component renders nothing and logs a `[apiuikit]` warning to the console.

## Error handling

Unlike `AsyncAPI` and `OpenAPI`, which wrap themselves in an error boundary, sections and providers render unwrapped. That's deliberate: you're building the layout, so where a failure should be contained (and what should show in its place) is your call, not the library's. A boundary the library forced around every section would also mean a malformed schema quietly renders a fallback card in the middle of your page, which may not be what you want.

The `ErrorBoundary` used by the full-page components is exported, so opt in wherever it suits your layout. Around everything, so one bad section doesn't take the page down:

```tsx
import { ErrorBoundary, AsyncAPIProvider, AsyncAPIServers, AsyncAPIOperations, Schemas } from "apiuikit";

<ErrorBoundary onError={(error, errorInfo) => reportToSentry(error, errorInfo)}>
  <AsyncAPIProvider document={doc}>
    <AsyncAPIServers />
    <AsyncAPIOperations />
    <Schemas />
  </AsyncAPIProvider>
</ErrorBoundary>
```

Or around a single section, so the rest of the page survives it:

```tsx
<AsyncAPIProvider document={doc}>
  <AsyncAPIServers />
  <ErrorBoundary fallback={<p>Couldn't render operations.</p>}>
    <AsyncAPIOperations />
  </ErrorBoundary>
  <Schemas />
</AsyncAPIProvider>
```

### `ErrorBoundary` props

| Prop       | Type                                        | Required | Description                                                        |
|------------|---------------------------------------------|----------|--------------------------------------------------------------------|
| `children` | `ReactNode`                                 | Yes      | The tree to protect                                                |
| `fallback` | `ReactNode \| (error, reset) => ReactNode`  | No       | UI shown after a caught error. Defaults to an alert with the message and a "Try again" button. The function form gets `reset`, which clears the error and re-renders the children |
| `onError`  | `(error, errorInfo) => void`                | No       | Called once when an error is caught, in addition to the library's own `console.error` |

Placement matters: React only catches errors thrown by a boundary's *descendants*. A section that resolves its document during its own render is covered only if the boundary sits above it, as in both examples here. Wrapping content *inside* a section doesn't protect that section.

This covers synchronous render errors, which is all a React error boundary can see. Failures while parsing a raw document surface through `AsyncAPIRenderer`'s `onDiagnostics` instead.

## When to use this entry

| Scenario                                                        | Use                                  |
|-------------------------------------------------------------------|---------------------------------------|
| Want the full documentation page, sidebar and search included   | `AsyncAPI` (see [no-parser](./no-parser.md) / [with-parser](./with-parser.md)) |
| Want one section in a page you're already building              | A standalone section, e.g. `<AsyncAPIOperations document={doc} />` |
| Want one endpoint, operation, message, or schema on its own     | A single-item component, e.g. `<OpenAPIEndpoint document={doc} operationId="createPet" />` |
| Want several sections in a custom layout                        | `AsyncAPIProvider` wrapping multiple sections |
| Want to replace one section with your own implementation         | `AsyncAPIProvider` + your component in place of the built-in one |
