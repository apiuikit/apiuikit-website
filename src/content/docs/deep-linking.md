# Deep linking

Give someone a URL that opens your docs on a specific endpoint, schema, or message — and keep the address bar in sync as they click around.

apiuikit does not invent a URL scheme. You pass in a `{ tab, key }` pair, and it tells you when the selection changes. How that pair shows up in the address bar is yours: a hash, a query string, or a path segment all work.

These two props are available on `<OpenAPI>`, `<AsyncAPI>`, `<OpenAPIRenderer>`, and `<AsyncAPIRenderer>`:

| Prop | What it does |
|---|---|
| `initialLocation` | Which tab and item to show first. Applied once, when the widget mounts. The matching item is scrolled into view. |
| `onLocationChange` | Called whenever the selection changes — a nav click, a tab click, a search result, and the initial seed. |

Both are optional. Leave them off and the widget behaves as it always has.

## A working example

This uses the URL hash (`#endpoints/get%20/pets`). Swap the two helpers if you prefer a query param or a path.

```tsx
import { useState } from "react";
import { OpenAPI } from "apiuikit";
import type { SpecLocation } from "apiuikit";
import doc from "./openapi.json";

type Tab = "endpoints" | "webhooks" | "schemas";

function parseHash(hash: string): SpecLocation<Tab> | null {
  const [tab, key] = hash.replace(/^#/, "").split("/");
  if (!tab) return null;
  return { tab: tab as Tab | "servers", key: key ? decodeURIComponent(key) : null };
}

function encodeHash(location: SpecLocation<Tab> | null): string {
  if (!location) return "";
  if (!location.key) return `#${location.tab}`;
  return `#${location.tab}/${encodeURIComponent(location.key)}`;
}

export default function App() {
  const [initialLocation] = useState(() => parseHash(window.location.hash));

  return (
    <OpenAPI
      openapi={doc}
      initialLocation={initialLocation}
      onLocationChange={(location) => {
        const next = encodeHash(location);
        if (window.location.hash === next) return;
        window.history.replaceState(null, "", next || window.location.pathname);
      }}
    />
  );
}
```

`<AsyncAPI>` is the same, with different tab names (see below). The renderer components (`OpenAPIRenderer`, `AsyncAPIRenderer`) take the same two props and apply them once the parsed document mounts.

`onLocationChange` uses `replaceState` rather than assigning `location.hash`, so clicking around the sidebar does not fill the browser history with every endpoint.

## What to put in `tab` and `key`

`tab` is a nav section. `key` is the item inside it, or `null` when the tab is open but nothing in it is selected.

| Spec | `tab` | `key` example |
|---|---|---|
| OpenAPI | `"endpoints"` | `"get /pets"` — method, a space, then the path |
| OpenAPI | `"webhooks"` | the webhook name |
| OpenAPI | `"schemas"` | `"Pet"` |
| OpenAPI | `"servers"` | the server URL |
| AsyncAPI | `"operations"` | `"receiveLightMeasurement"` — the operation id |
| AsyncAPI | `"messages"` | the message id |
| AsyncAPI | `"schemas"` | the schema name |
| AsyncAPI | `"servers"` | the server name |

An unknown `tab` (a stale bookmark, a typo, a hand-edited URL) falls back to the default tab instead of throwing. You can pass a value parsed straight from the address bar.

## Server-rendered pages (Next.js, Remix, …)

The URL fragment (`#...`) is never sent to the server. If the widget hydrates from server HTML, reading `window.location.hash` during render will mismatch that HTML.

The recommended Next.js path in [Getting Started](./getting-started.md#server-side-rendering) already loads the widget with `ssr: false`. In that case the first render is in the browser, and the example above is fine.

If the same component tree *does* hydrate, keep `initialLocation` `null` until after mount:

```tsx
const [initialLocation, setInitialLocation] = useState<SpecLocation<Tab> | null>(null);

useEffect(() => {
  setInitialLocation(parseHash(window.location.hash));
}, []);
```

That second render is when the hash is applied. Combine it with a `key` on the widget if you need the seed to take (see the next section).

## Links that change after the page has loaded

`initialLocation` is read once, on mount. A later hash change — the back button, a "Copy link" control elsewhere on the page, an in-page `<a href="#schemas/Pet">` — will not move the widget on its own.

Give the component a new `key` so it remounts with the new value:

```tsx
const [generation, setGeneration] = useState(0);

useEffect(() => {
  const onHashChange = () => setGeneration((n) => n + 1);
  window.addEventListener("hashchange", onHashChange);
  return () => window.removeEventListener("hashchange", onHashChange);
}, []);

<OpenAPI
  key={generation}
  openapi={doc}
  initialLocation={parseHash(window.location.hash)}
  onLocationChange={...}
/>
```

`history.replaceState` does not fire `hashchange`, so the writes from `onLocationChange` will not bounce the widget. Only real navigation (back/forward, clicking a hash link) will.
