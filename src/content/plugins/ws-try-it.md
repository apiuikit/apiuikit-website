# WebSocket Try it

A "Try it out" plugin for AsyncAPI documents with WebSocket servers. Users connect to the server, compose and validate messages, and watch sent and received frames — from the docs.

## Built into apiuikit

apiuikit ships this panel and loads it on demand. Turn it on with `show.tryIt`:

```tsx
import { AsyncAPI } from "apiuikit";
import "apiuikit/style.css";
import doc from "./asyncapi.json";

const config = { show: { tryIt: true } };

export default function App() {
  return <AsyncAPI asyncapi={doc} config={config} />;
}
```

That puts a **Try it** button in the operation side panel's header. Operations with no `ws` or `wss` server show no button. There is nothing to install, and it is off by default. Read the [security note](/docs/configuration#try-it) before turning it on: connections go to whichever host your document's `servers` entry names.

The built-in panel uses the default options. Install the package when you want a different layout or need [options](#options) such as `allowedHosts` or a credential provider.

## Install

```sh
npm install @apiuikit/ws-try-it-plugin
```

Peer dependencies: `apiuikit` ^1.7, React 18+.

## Usage

Pick one of the two layouts, or register both.

### Tab

`createWsPlugin()` fills the [`asyncapi.operation.tab`](/docs/plugins#add-a-full-operation-tab) slot — a **Try it** tab next to the built-in Reference tab.

```tsx
import { AsyncAPI } from "apiuikit";
import { createWsPlugin } from "@apiuikit/ws-try-it-plugin";
import "apiuikit/style.css";
import doc from "./asyncapi.json";

const plugins = [createWsPlugin()];

export default function App() {
  return <AsyncAPI asyncapi={doc} plugins={plugins} />;
}
```

Keep the array stable by defining it outside the component or with `useMemo`. Creating a new array on every render re-registers the plugins and can reset the selected tab.

### Button

`createWsButtonPlugin()` adds a **Try it** button to the Reference panel that opens a modal.

```tsx
import { createWsButtonPlugin } from "@apiuikit/ws-try-it-plugin";

const plugins = [createWsButtonPlugin()];
```

When the document has several WebSocket operations, the modal shows them as tabs, so you can switch between send and receive operations without closing it. Drafts, server selections, and log filters are kept per operation.

Each layout keeps its own connection state. The panels use apiuikit's theme variables, so no extra stylesheet is needed.

## Features

- Connect and disconnect, pick a server, edit the URL, and set a handshake timeout.
- A query-parameter editor populated from `channel.bindings.ws.query`, with required markers and custom parameters.
- Send or receive direction derived from the operation's `action`.
- Message drafts from examples or generated from the schema, with live JSON Schema validation. Invalid messages can still be sent on purpose.
- A bounded frame log with message matching and reply correlation.
- API keys in the query string, optional credential providers, and optional authentication via subprotocols. Credentials stay in memory.

Supports AsyncAPI 3.x documents with local `$ref`s, operation and message traits, server variables, and channel parameters. Resolve external references before rendering.

## Options

Both factories accept the same options. All are optional; the values below are the defaults for the limits.

```tsx
createWsPlugin({
  allowedHosts: ["localhost:8787", "*.example.com"],
  allowUrlEditing: true,
  connectTimeoutMs: 10_000,
  maxFrames: 500,
  maxFrameLength: 1_000_000,
  maxLogLength: 10_000_000,
  auth: {
    credentials: async ({ serverId, scheme, signal }) => {
      // Return a credential from your application's session, or undefined.
      return undefined;
    },
  },
});
```

Hosts are unrestricted unless you set `allowedHosts`. `allowUrlEditing: false` locks both the URL and the query fields.

## Connections

Connections belong to the document viewer, not to an operation panel. Closing a modal or switching operations keeps the session, including messages received while no operation is open. Operations that resolve to the same URL share one connection. Disconnect to end it; unmounting the viewer or leaving the page closes it.

## Browser limits

Browsers cannot set arbitrary headers on a WebSocket handshake. Handshake headers from the binding are listed but not sent, and bindings with a method other than `GET` disable **Connect**. Configure your server for browser-compatible authentication, allow its host in your CSP `connect-src`, and use `wss` on HTTPS pages.

## Write your own

To add a different tab or inline control, see [Plugins](/docs/plugins) in the docs.
