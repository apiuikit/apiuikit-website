# Arazzo

[Arazzo](https://spec.openapis.org/arazzo/latest.html) documents describe workflows: a sequence of API calls where one step's output feeds the next. Each step calls an operation from an OpenAPI document.

apiuikit renders each workflow as its inputs, numbered steps, and outputs. Open a step to see the OpenAPI operation it calls. To try it without installing anything, open the [playground](https://playground.apiuikit.com) and pick **Pet coupons (Arazzo)** from the Examples menu.

Supports Arazzo 1.0.0, 1.0.1, and 1.1.0, with OpenAPI 3.0 or 3.1 sources.

## Quick start

```bash
npm install apiuikit
```

```tsx
import { Arazzo } from "apiuikit";
import "apiuikit/style.css";
import flows from "./flows.arazzo.json";
import petstore from "./petstore.json";

export default function App() {
  return <Arazzo arazzo={flows} sources={{ petstore }} />;
}
```

A workflow calls operations in other documents, so pass those in as `sources`. Each key must match a `name` under the workflow's `sourceDescriptions`.

## From YAML or JSON text

If your document is text rather than an object, install the parsers and use `ArazzoRenderer` with `raw`:

```bash
npm install @usearazzo/parser @scalar/openapi-parser
```

```tsx
import { ArazzoRenderer } from "apiuikit";
import "apiuikit/style.css";

<ArazzoRenderer raw={arazzoYaml} sources={{ petstore: petstoreYaml }} />;
```

If part of the document can't be loaded, for example a missing source, the affected steps show an **Unavailable** badge and the rest still renders. Pass `onDiagnostics` to get the list of problems.

## Loading sources from a URL

Instead of passing `sources`, you can let apiuikit fetch each source from its `url`. Set `baseUrl` so relative URLs can be resolved:

```tsx
<ArazzoRenderer raw={arazzoYaml} baseUrl="https://example.com/specs/flows.arazzo.yaml" />
```

The server must allow your origin (CORS). If fetching needs auth headers, pass `loadSource={async (url) => …}` and return the document text yourself. Anything you pass in `sources` is used first.

## Props

`Arazzo` and `ArazzoRenderer` take the same props, except that `ArazzoRenderer` takes `raw` instead of `arazzo`.

| Prop | Description |
|---|---|
| `arazzo` / `raw` | The Arazzo document, as an object or as text |
| `sources` | Source documents, keyed by name |
| `baseUrl` | Where relative source URLs are fetched from |
| `loadSource` | Load sources yourself, for example to add auth headers |
| `onDiagnostics` | Called with any problems found while loading |
| `config` | The same options as [Configuration](./configuration.md) |

They also accept `plugins`, `initialLocation`, `onLocationChange`, `errorFallback`, and `onError`, which work the same as on `OpenAPI`.

## Following data between steps

Values like `$inputs.petId` or `$steps.login.outputs.token` show up as chips. Click a chip to jump to where the value comes from. Hover over it to highlight every step that uses it.

## Other ways to use it

- **One workflow in your own layout:** `ArazzoWorkflowSection`. See [Composables](./sections.md#arazzo-sections).
- **Vue, Angular, Svelte, or plain HTML:** `<apiuikit-arazzo-renderer>`. See [Web Components](./with-webcomponents.md#arazzo-elements).
- **Markdown for LLMs:** see [AI Export](./ai-export.md#arazzo-workflows).
- **Links to a workflow or step:** see [Deep linking](./deep-linking.md).
