# Configuration

Every component (the full widget, a standalone section, or a provider) takes the same `config` object. What you pass is merged over the defaults, so you only specify what you want to change.

```tsx
import { AsyncAPI } from "apiuikit";

<AsyncAPI
  asyncapi={doc}
  config={{
    show: { sidebar: false },
    expand: { schemas: true },
    sidePanel: { containment: "component" },
  }}
/>;
```

The shape is exported as `ConfigInterface`, and the defaults are exported as `defaultConfig`, which is useful when you want to extend a value rather than replace it:

```tsx
import { defaultConfig, type ConfigInterface } from "apiuikit";

const config: ConfigInterface = {
  theme: { colors: { primary: defaultConfig.theme?.colors?.primary } },
};
```

## show

Switches individual sections and controls off. Everything listed here is on by default except `messageExamples`.

| Option | Default | What it controls |
| --- | --- | --- |
| `sidebar` | `true` | The widget's navigation sidebar. |
| `info` | `true` | The document's info block. |
| `servers` | `true` | The servers section. |
| `search` | `true` | Search, which lives in the sidebar. |
| `operations` | `true` | The operations section. |
| `messages` | `true` | The messages section. |
| `messageExamples` | `false` | Payload examples inside messages. |
| `schemas` | `true` | The schemas section. |
| `errors` | `true` | Parser and validation errors. |
| `endpoints` | `true` | OpenAPI only: the Endpoints tab. |
| `webhooks` | `true` | OpenAPI 3.1 only: the Webhooks tab. It only appears at all when the document declares `webhooks`. |
| `extensions` | `true` | Known `x-*` spec extensions. |
| `codeSamples` | `true` | OpenAPI only: per-operation cURL, JavaScript, and Python request examples. |
| `copyMarkdown` | `true` | The floating "Copy for LLM" / "View as Markdown" button. |

```tsx
config={{ show: { sidebar: false, search: false, codeSamples: false } }}
```

Switching the sidebar off also removes search, since search lives inside it.

## expand

Whether collapsible content starts open.

| Option | Default | What it controls |
| --- | --- | --- |
| `schemas` | `false` | Nested schema tree nodes: object properties, array items, and so on. The top level of each schema is always visible regardless. |
| `messageExamples` | `false` | Message example blocks. |

Leaving `schemas` collapsed is usually right for a page with several large schemas; expand it when a page documents one small payload and the extra clicks are just friction.

## sidePanel

Where an operation's side panel is clipped when it opens.

| Option | Default | Values |
| --- | --- | --- |
| `containment` | `"viewport"` | `"viewport"` \| `"component"` |

`"viewport"` lets the panel cover the whole browser window, which is what you want when the widget *is* the page. `"component"` clips it to the widget's own root element. Use it whenever the widget is embedded inside a page that has its own chrome, so the panel can't cover your header or escape its frame.

```tsx
config={{ sidePanel: { containment: "component" } }}
```

Note that the panel is clipped to the *widget's* root, not to whatever wrapper you put around it. If the widget renders at its natural height and that's shorter than the panel needs, give the widget height to fill.

## theme

Colours, in three parts: a brand scale applied in both modes, per-mode surface and text colours, and the schema tree's depth palette.

```tsx
config={{
  theme: {
    colors: {
      primary: { 50: "#ddf4ff", 300: "#54aeff", 600: "#1f6feb", 700: "#0d419d" },
    },
    light: {
      background: "#f8fafc",
      surface: "#ffffff",
      border: "#e2e8f0",
      textPrimary: "#1e293b",
      textSecondary: "#475569",
      textMuted: "#64748b",
    },
    depthColors: ["#14b8a6", "#22c55e", "#84cc16"],
  },
}}
```

- **`colors`** takes `primary`, `secondary`, and `neutral` scales, each with the steps `50`, `100`, `200`, `300`, `500`, `600`, `700`. They apply regardless of which mode is active.
- **`light` and `dark`** each take `background`, `surface`, `border`, `textPrimary`, `textSecondary`, and `textMuted`. **Pass only one of them.** If both are set, `light` wins outright, so to render dark, pass `dark` and leave `light` undefined rather than passing both and expecting the active mode to pick.
- **`depthColors`** colours the schema tree's depth-indicator lines and their labels, cycling by nesting level. Any length works; deeper nesting repeats the palette from the start. The default is teal, green, lime, blue, cyan, violet.

Because only one mode may be set, syncing with your own light/dark toggle means rebuilding the object when the theme changes:

```tsx
const config = {
  theme: {
    colors: { primary: defaultConfig.theme?.colors?.primary },
    ...(isDark
      ? { dark: defaultConfig.theme?.dark }
      : { light: defaultConfig.theme?.light }),
  },
};
```

## markdown

Controls what the "View as Markdown" button opens.

| Option | Default | Type |
| --- | --- | --- |
| `url` | none | `string \| (target: MarkdownTarget) => string \| null \| undefined` |

With nothing set, the button generates a throwaway `blob:` URL that is ephemeral, unshareable, and invisible to crawlers. Point it at a URL you serve instead:

```tsx
config={{ markdown: { url: "https://example.com/api/asyncapi.md" } }}
```

Pass a function to decide per target. It receives a `MarkdownTarget` that is either the whole document or a single operation, and returning `null` falls back to the generated blob URL for anything you don't serve:

```tsx
config={{
  markdown: {
    url: (target) => {
      if (target.kind === "document") return "/docs/api.md";
      if ("path" in target) return `/docs/api/${target.method}${target.path}.md`;
      return null;
    },
  },
}}
```

Operation targets are discriminated by spec: OpenAPI operations carry `method` and `path`, AsyncAPI operations carry `id`. See [AI Export](./ai-export.md) for the build-time helpers that generate those files.

## sidebar

| Option | Default | What it controls |
| --- | --- | --- |
| `useChannelAddressAsIdentifier` | `true` | Whether sidebar entries are labelled with the channel address rather than the channel key. |

## parserOptions

Passed through to the underlying parser by the `AsyncAPIRenderer` and `OpenAPIRenderer` entry points, which take a raw string. It has no effect on `AsyncAPI` and `OpenAPI`, which take an already-resolved document. See [With Parser](./with-parser.md).
