# Extensions

AsyncAPI and OpenAPI both let a document carry arbitrary `x-*` fields for vendor- or tool-specific data: a company logo, a social handle, anything the document's author wants to attach. apiuikit renders the ones it recognises and ignores the rest.

Nothing needs installing or registering. If a document contains a known `x-*` field, it renders.

## What renders today

| Field | Where it appears | Value |
| --- | --- | --- |
| `x-logo` | Top of the Info section's metadata column | A URL string, or an object carrying one |
| `x-x` | Icon row in the Info metadata | An X (Twitter) handle or profile URL |
| `x-linkedin` | Icon row in the Info metadata | A LinkedIn profile or company URL |

```yaml
info:
  title: Streetlights API
  version: 1.0.0
  x-logo: https://example.com/logo.svg
  x-x: acme_api
  x-linkedin: https://www.linkedin.com/company/acme
```

`x-logo` gets its own placement at the top of the metadata column rather than joining the icon row, because a logo is not an icon-sized link.

## Fields that are ignored

Anything else beginning with `x-` renders nothing at all. That is deliberate: a document carrying a dozen internal `x-*` keys for a CI pipeline should not spray them across your documentation.

Two prefixes are reserved and never rendered, even if a matching name were added later:

- `x-parser-*`, written into documents by the AsyncAPI parser
- `x-lib-*`, apiuikit's own internal markers

A malformed value renders nothing rather than throwing. An `x-logo` pointing at something that isn't a URL leaves the logo slot empty and the rest of the page intact.

## Turning them off

Extensions render by default. One flag disables all of them:

```tsx
<AsyncAPI asyncapi={doc} config={{ show: { extensions: false } }} />
```

Worth reaching for when you render a document you don't control and would rather not surface a third party's branding. See [Configuration](./configuration.md) for the rest of the `show` flags.

## Code splitting

Each extension is loaded lazily, and its code only reaches the browser when a document actually contains that field. A document with no `x-*` fields downloads none of it, so the catalog can grow without costing anything to consumers who don't use it.

## Adding one

The catalog lives in the library rather than in your application, so a new extension is a change to apiuikit itself, in `packages/x-tensions`. Adding one means writing a component that takes the field's raw value, validating that value and returning nothing if it doesn't look right, and registering it under the field name. If it needs a specific spot in the layout rather than the generic icon row, it is exported on its own and mounted where it belongs, the way `x-logo` is.

If you need a field that isn't listed above, open an issue on [the repository](https://github.com/AceTheCreator/apiuikit) describing the field and where it should appear.
